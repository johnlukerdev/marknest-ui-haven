
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { toast } from '@/hooks/use-toast';
import { Trash2, RotateCcw, CheckSquare, X, Link, Check } from 'lucide-react';

const Trash: React.FC = () => {
  const { trashBookmarks, restoreFromTrash, permanentlyDelete } = useBookmarkContext();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleRestore = (id: string, title: string) => {
    restoreFromTrash(id);
    toast({
      title: "Bookmark restored",
      description: `"${title}" has been restored to your bookmarks`
    });
  };

  const handleDeletePermanently = (id: string, title: string) => {
    permanentlyDelete(id);
    toast({
      title: "Bookmark deleted permanently",
      description: `"${title}" has been permanently removed`
    });
  };

  const handleCopyLink = (url: string, title: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: `The link for "${title}" has been copied to your clipboard`
    });
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedItems([]);
  };

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleBulkRestore = () => {
    selectedItems.forEach(id => {
      const bookmark = trashBookmarks.find(bookmark => bookmark.id === id);
      if (bookmark) {
        restoreFromTrash(bookmark.id);
      }
    });
    
    toast({
      title: "Bookmarks restored",
      description: `${selectedItems.length} bookmark(s) have been restored`
    });
    
    setIsSelectionMode(false);
    setSelectedItems([]);
  };

  const handleBulkDeletePermanently = () => {
    selectedItems.forEach(id => {
      permanentlyDelete(id);
    });
    
    toast({
      title: "Bookmarks deleted",
      description: `${selectedItems.length} bookmark(s) have been permanently deleted`
    });
    
    setIsSelectionMode(false);
    setSelectedItems([]);
  };

  const handleBulkCopyLinks = () => {
    const urls = selectedItems
      .map(id => trashBookmarks.find(bookmark => bookmark.id === id)?.url)
      .filter(Boolean)
      .join('\n');
    
    navigator.clipboard.writeText(urls);
    
    toast({
      title: "Links copied",
      description: `${selectedItems.length} link(s) have been copied to clipboard`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onAddBookmark={() => {}} />
      <main className="pt-8">
        <div className="container py-12 px-6 sm:px-8 mx-auto max-w-7xl">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Trash</h1>
              <p className="text-muted-foreground">Items in the trash will be automatically deleted after 30 days.</p>
            </div>
            
            <Button 
              variant={isSelectionMode ? "default" : "outline"} 
              size="sm"
              className="flex items-center gap-2"
              onClick={toggleSelectionMode}
            >
              {isSelectionMode ? (
                <>
                  <X className="h-4 w-4" />
                  <span className="sm:inline">Cancel</span>
                </>
              ) : (
                <>
                  <CheckSquare className="h-4 w-4" />
                  <span className="sm:inline">Select</span>
                </>
              )}
            </Button>
          </div>

          {trashBookmarks.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Trash is empty</h2>
              <p className="text-muted-foreground">Items you delete will appear here</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {trashBookmarks.map((bookmark) => (
                  <Card 
                    key={bookmark.id} 
                    className={`overflow-hidden hover-scale group card-enter flex flex-col h-full relative ${
                      isSelectionMode ? 'cursor-pointer' : ''
                    } ${
                      selectedItems.includes(bookmark.id) ? 'ring-2 ring-primary bg-selected' : ''
                    }`}
                    onClick={() => isSelectionMode && toggleSelectItem(bookmark.id)}
                  >
                    {isSelectionMode && (
                      <div className="absolute top-2 left-2 z-10">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          selectedItems.includes(bookmark.id) ? 'bg-primary text-white' : 'bg-background/80 border border-border'
                        }`}>
                          {selectedItems.includes(bookmark.id) && <Check className="h-4 w-4" />}
                        </div>
                      </div>
                    )}
                    
                    <div className="relative h-40 w-full overflow-hidden">
                      <img 
                        src={bookmark.imageUrl} 
                        alt={bookmark.title} 
                        className="h-full w-full object-cover opacity-70"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-background/40"></div>
                    </div>
                    <CardContent className="p-4 flex-grow">
                      <h3 className="mb-1 line-clamp-2 font-medium text-muted-foreground">{bookmark.title}</h3>
                      <p className="text-sm text-muted-foreground/70 mt-1 truncate">{new URL(bookmark.url).hostname}</p>
                    </CardContent>
                    <CardFooter className="border-t p-4 pt-3 flex justify-between items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyLink(bookmark.url, bookmark.title);
                        }}
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex gap-2 flex-1 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="transition-all duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestore(bookmark.id, bookmark.title);
                          }}
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Restore
                        </Button>
                        
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="transition-all duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePermanently(bookmark.id, bookmark.title);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Action Bar */}
              {isSelectionMode && selectedItems.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-center gap-3 animate-slide-in-up z-50">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={handleBulkCopyLinks}
                  >
                    <Link className="h-4 w-4" />
                    Copy Links
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={handleBulkRestore}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Restore
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={handleBulkDeletePermanently}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Forever
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Trash;
