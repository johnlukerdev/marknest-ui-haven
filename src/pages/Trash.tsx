
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Trash2, RotateCcw, CheckSquare, X, Link, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Trash: React.FC = () => {
  const { trashBookmarks, restoreFromTrash, permanentlyDelete } = useBookmarkContext();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<string | null>(null);

  const handleRestore = (id: string) => {
    restoreFromTrash(id);
  };

  const handleInitiateDelete = (id: string) => {
    setBookmarkToDelete(id);
    setShowDeleteWarning(true);
  };

  const handleDeletePermanently = () => {
    if (bookmarkToDelete) {
      permanentlyDelete(bookmarkToDelete);
      setShowDeleteWarning(false);
      setBookmarkToDelete(null);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
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
    
    setIsSelectionMode(false);
    setSelectedItems([]);
  };

  const handleCancelDelete = () => {
    setShowDeleteWarning(false);
    setBookmarkToDelete(null);
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
            
            {trashBookmarks.length > 0 && (
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
            )}
          </div>

          {showDeleteWarning && (
            <Alert className="mb-6 border-yellow-600/30 bg-yellow-600/10">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="flex flex-wrap justify-between items-center">
                <span className="mr-4">Permanent deletion cannot be undone.</span>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleDeletePermanently}
                  >
                    Confirm Delete
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

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
                          handleCopyLink(bookmark.url);
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
                            handleRestore(bookmark.id);
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
                            handleInitiateDelete(bookmark.id);
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
                    onClick={handleBulkRestore}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Restore
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
