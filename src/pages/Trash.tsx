import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Trash2, RotateCcw, CheckSquare, X, Link, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';

const Trash: React.FC = () => {
  const { trashBookmarks, restoreFromTrash, permanentlyDelete } = useBookmarkContext();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRestore = (id: string) => {
    restoreFromTrash(id);
    toast({
      title: "Restored!",
      description: "Bookmark moved back to My List",
      duration: 2000,
    });
  };

  const handleInitiateDelete = (id: string) => {
    setBookmarkToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeletePermanently = () => {
    if (bookmarkToDelete) {
      permanentlyDelete(bookmarkToDelete);
      setShowDeleteDialog(false);
      setBookmarkToDelete(null);
      toast({
        title: "Deleted permanently",
        description: "Bookmark has been permanently deleted",
        duration: 2000,
      });
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
      duration: 2000,
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

  const handleBulkRestore = async () => {
    setIsLoading(true);
    try {
      // Process all selected items
      for (const id of selectedItems) {
        const bookmark = trashBookmarks.find(bookmark => bookmark.id === id);
        if (bookmark) {
          restoreFromTrash(bookmark.id);
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
  
  const handleBulkDelete = () => {
    setShowDeleteDialog(true);
    setBookmarkToDelete('bulk');
  };
  
  const confirmBulkDelete = async () => {
    setIsLoading(true);
    try {
      // Process all selected items
      for (const id of selectedItems) {
        permanentlyDelete(id);
      }
      
      toast({
        title: "Deleted permanently",
        description: `${selectedItems.length} bookmark(s) permanently deleted`,
        duration: 3000,
      });
      
      setShowDeleteDialog(false);
      setBookmarkToDelete(null);
      setIsSelectionMode(false);
      setSelectedItems([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete some bookmarks",
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
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">Trash</h1>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-[95%]">
                  Items in the trash will be automatically deleted after 30 days.
                </p>
              </div>
              
              {trashBookmarks.length > 0 && (
                <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                  {/* Mobile: Show bulk actions in organized layout when items are selected */}
                  {isSelectionMode && selectedItems.length > 0 && (
                    <div className="flex flex-col items-center gap-3 w-full sm:hidden">
                      <div className="flex items-center justify-center gap-3 w-full">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2 flex-1 max-w-[200px]"
                          onClick={handleBulkRestore}
                          disabled={isLoading}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                          Restore ({selectedItems.length})
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2 flex-1 max-w-[200px]"
                          onClick={handleBulkDelete}
                          disabled={isLoading}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          Delete ({selectedItems.length})
                        </Button>
                      </div>
                      
                      <Button 
                        variant="default" 
                        size="sm"
                        className="flex items-center gap-2 w-full max-w-[200px] justify-center"
                        onClick={toggleSelectionMode}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  )}
                  
                  {/* Desktop: Show bulk actions in horizontal layout */}
                  <div className="hidden sm:flex items-center gap-2">
                    {isSelectionMode && selectedItems.length > 0 && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={handleBulkRestore}
                          disabled={isLoading}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                          Restore ({selectedItems.length})
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={handleBulkDelete}
                          disabled={isLoading}
                        >
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          Delete ({selectedItems.length})
                        </Button>
                      </>
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
                          <span>Cancel</span>
                        </>
                      ) : (
                        <>
                          <CheckSquare className="h-4 w-4" />
                          <span>Select</span>
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {/* Mobile: Show only Select/Cancel button when no items selected */}
                  {(!isSelectionMode || selectedItems.length === 0) && (
                    <div className="flex sm:hidden w-full justify-center">
                      <Button 
                        variant={isSelectionMode ? "default" : "outline"} 
                        size="sm"
                        className="flex items-center gap-2 focus:ring-0 w-full max-w-[200px] justify-center"
                        onClick={toggleSelectionMode}
                        disabled={isLoading}
                      >
                        {isSelectionMode ? (
                          <>
                            <X className="h-4 w-4" />
                            <span>Cancel</span>
                          </>
                        ) : (
                          <>
                            <CheckSquare className="h-4 w-4" />
                            <span>Select</span>
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Delete Confirmation Dialog */}
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent className="bg-slate-900 border-red-500/40 p-6 mx-4 max-w-sm w-[95%] rounded-xl">
              <AlertDialogHeader className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <AlertDialogTitle className="text-lg font-semibold text-white">Confirm Permanent Deletion</AlertDialogTitle>
                <AlertDialogDescription className="text-center text-sm text-slate-300 mt-2 mb-4">
                  Permanent deletion cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                <AlertDialogCancel 
                  className="bg-slate-800 hover:bg-slate-700 text-white border-0 transition-all duration-200"
                  aria-label="Cancel deletion"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700 text-white border-0 transition-all duration-200"
                  onClick={bookmarkToDelete === 'bulk' ? confirmBulkDelete : handleDeletePermanently}
                  aria-label="Confirm permanent deletion"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Confirm Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {trashBookmarks.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Trash is empty</h2>
              <p className="text-muted-foreground">Items you delete will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 w-full mx-auto sm:grid-cols-2 lg:grid-cols-3">
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
                      className="px-2 focus:ring-0"
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
                        className="transition-all duration-200 focus:ring-0"
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
                        className="transition-all duration-200 focus:ring-0"
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
          )}
        </div>
      </main>
    </div>
  );
};

export default Trash;
