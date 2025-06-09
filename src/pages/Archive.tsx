
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Archive as ArchiveIcon, RotateCcw, CheckSquare, X, Link, Check, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Archive: React.FC = () => {
  const { archiveBookmarks, restoreFromArchive } = useBookmarkContext();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [copyingId, setCopyingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRestore = (id: string) => {
    restoreFromArchive(id);
    toast({
      title: "Restored!",
      description: "Bookmark moved back to My List",
      duration: 2000,
    });
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopyingId(id);
    
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
      duration: 2000,
    });
    
    setTimeout(() => {
      setCopyingId(null);
    }, 1000);
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

  const handleBulkRestore = async () => {
    setIsLoading(true);
    try {
      // Process all selected items
      for (const id of selectedItems) {
        const bookmark = archiveBookmarks.find(bookmark => bookmark.id === id);
        if (bookmark) {
          restoreFromArchive(bookmark.id);
        }
      }
      
      toast({
        title: "Restored successfully!",
        description: `${selectedItems.length} bookmark(s) moved back to My List`,
        duration: 3000,
      });
      
      setIsSelectionMode(false);
      setSelectedItems([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restore some bookmarks",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onAddBookmark={() => {}} />
      <main className="pt-4 sm:pt-8">
        <div className="container py-8 sm:py-12 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
          <div className="mb-6 sm:mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Archive</h1>
              <p className="text-muted-foreground">Bookmarks you've archived but might need later.</p>
            </div>
            
            {archiveBookmarks.length > 0 && (
              <div className="flex items-center gap-2">
                {isSelectionMode && selectedItems.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 focus:ring-0"
                    onClick={handleBulkRestore}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                    Restore ({selectedItems.length})
                  </Button>
                )}
                
                <Button 
                  variant={isSelectionMode ? "default" : "outline"} 
                  size="sm"
                  className="flex items-center gap-2 focus:ring-0"
                  onClick={toggleSelectionMode}
                  disabled={isLoading}
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
            )}
          </div>

          {archiveBookmarks.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ArchiveIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Archive is empty</h2>
              <p className="text-muted-foreground">Items you archive will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 w-full mx-auto sm:grid-cols-2 lg:grid-cols-3">
              {archiveBookmarks.map((bookmark) => (
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
                      className="h-full w-full object-cover opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/20"></div>
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <h3 className="mb-1 line-clamp-2 font-medium">{bookmark.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 truncate">{new URL(bookmark.url).hostname}</p>
                  </CardContent>
                  <CardFooter className="border-t p-4 pt-3 flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="px-2 focus:ring-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyLink(bookmark.url, bookmark.id);
                      }}
                    >
                      {copyingId === bookmark.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Link className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestore(bookmark.id);
                      }}
                      className="transition-all duration-200 focus:ring-0"
                      size="sm"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Restore
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Archive;
