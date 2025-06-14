import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Trash2, RotateCcw, CheckSquare, X, Link, Check, AlertTriangle, Loader2, Plus, Search, MoreHorizontal } from 'lucide-react';
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
import { useMobile } from '@/hooks/use-mobile';

const Trash: React.FC = () => {
  const { trashBookmarks, restoreFromTrash, permanentlyDelete } = useBookmarkContext();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMobile();

  const handleRestore = (id: string) => {
    restoreFromTrash(id);
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
    if (selectedItems.length === 0) return;
    
    setIsLoading(true);
    try {
      // Restore all selected bookmarks
      selectedItems.forEach(id => {
        restoreFromTrash(id);
      });
      
      setIsSelectionMode(false);
      setSelectedItems([]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    setShowDeleteDialog(true);
    setBookmarkToDelete('bulk');
  };
  
  const confirmBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    
    setIsLoading(true);
    try {
      // Delete all selected bookmarks permanently
      selectedItems.forEach(id => {
        permanentlyDelete(id);
      });
      
      setShowDeleteDialog(false);
      setBookmarkToDelete(null);
      setIsSelectionMode(false);
      setSelectedItems([]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle add bookmark action - matches bookmark page behavior
  const handleAddBookmark = (url: string) => {
    toast({
      title: "Bookmark added",
      description: `Added bookmark: ${url}`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onAddBookmark={handleAddBookmark} />
      <main className="pt-4 sm:pt-8">
        <div className="container py-8 sm:py-12 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">Trash</h1>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-[95%] break-words">
                  Items in the trash will be automatically deleted after 30 days.
                </p>
              </div>
              
              {/* Desktop bulk actions - only show on desktop */}
              {trashBookmarks.length > 0 && !isMobile && (
                <div className="flex items-center gap-2">
                  {isSelectionMode && selectedItems.length > 0 && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 backdrop-blur-sm"
                        onClick={handleBulkRestore}
                        disabled={isLoading || selectedItems.length === 0}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                        Restore ({selectedItems.length})
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 active:scale-95 backdrop-blur-sm"
                        onClick={handleBulkDelete}
                        disabled={isLoading || selectedItems.length === 0}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        Delete ({selectedItems.length})
                      </Button>
                    </>
                  )}
                  <Button 
                    variant={isSelectionMode ? "default" : "outline"} 
                    size="sm"
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95 focus:ring-0 ${
                      isSelectionMode 
                        ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 hover:bg-violet-500/30 hover:shadow-lg hover:shadow-violet-500/25' 
                        : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md'
                    }`}
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

              {/* Mobile select button - only show on mobile */}
              {trashBookmarks.length > 0 && isMobile && (
                <div className="flex justify-end items-center">
                  <Button 
                    variant={isSelectionMode ? "default" : "outline"} 
                    size="sm"
                    className={`flex items-center justify-center w-10 h-10 p-0 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95 focus:ring-0 ${
                      isSelectionMode 
                        ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 hover:bg-violet-500/30 hover:shadow-lg hover:shadow-violet-500/25' 
                        : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md'
                    }`}
                    onClick={toggleSelectionMode}
                    disabled={isLoading}
                  >
                    {isSelectionMode ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <CheckSquare className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Delete Confirmation Dialog - Fixed responsive overflow */}
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent className="bg-slate-900 border-red-500/40 w-[90%] max-w-sm mx-auto p-4 rounded-xl overflow-hidden box-border">
              <AlertDialogHeader className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <AlertDialogTitle className="text-lg font-semibold text-white">Confirm Permanent Deletion</AlertDialogTitle>
                <AlertDialogDescription className="text-center text-sm text-slate-300 mt-2 mb-4 break-words">
                  Permanent deletion cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row">
                <AlertDialogCancel 
                  className="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md hover:scale-105 active:scale-95 backdrop-blur-sm border-0"
                  aria-label="Cancel deletion"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 active:scale-95 backdrop-blur-sm border-0"
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
                    
                    {/* Only show restore and delete buttons if card is not selected OR if not in selection mode on mobile */}
                    {(!selectedItems.includes(bookmark.id) && !(isSelectionMode && isMobile)) && (
                      <div className="flex gap-2 flex-1 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 backdrop-blur-sm focus:ring-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestore(bookmark.id);
                          }}
                        >
                          <RotateCcw className="h-4 w-4" />
                          Restore
                        </Button>
                        
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 active:scale-95 backdrop-blur-sm focus:ring-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInitiateDelete(bookmark.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation - Updated to work like bookmark page */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex justify-around items-center h-16">
          {/* Use NavBar component for consistent bottom bar behavior */}
          <NavBar onAddBookmark={handleAddBookmark} />
        </div>
      )}
    </div>
  );
};

export default Trash;
