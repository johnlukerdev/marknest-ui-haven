
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import BookmarkGrid from '@/components/BookmarkGrid';
import EmptyState from '@/components/EmptyState';
import BulkActionsBar from '@/components/BulkActionsBar';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { Button } from "@/components/ui/button";
import { CheckSquare, X, Archive, Trash2, Loader2 } from "lucide-react";
import { toast } from '@/hooks/use-toast';
import { useMobile } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  const { 
    bookmarks, 
    addBookmark, 
    selectedBookmarks, 
    isSelectMode, 
    toggleSelectMode, 
    bulkMoveToTrash, 
    bulkMoveToArchive 
  } = useBookmarkContext();

  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMobile();

  const handleAddBookmark = (url: string) => {
    addBookmark(url);
  };

  const handleBulkArchive = async () => {
    setIsLoading(true);
    try {
      await bulkMoveToArchive();
      toast({
        title: "Archived successfully!",
        description: `${selectedBookmarks.length} bookmark(s) moved to archive`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive some bookmarks",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    setIsLoading(true);
    try {
      await bulkMoveToTrash();
      toast({
        title: "Moved to trash!",
        description: `${selectedBookmarks.length} bookmark(s) moved to trash`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to move some bookmarks to trash",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onAddBookmark={handleAddBookmark} />
      <main className="pt-4 sm:pt-8">
        <div className="container py-8 sm:py-12 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2 sm:gap-3">
                <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-semibold">★</span>
                </div>
                My Bookmarks
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Your curated collection of saved links.
              </p>
            </div>
            
            {/* Desktop bulk actions */}
            {bookmarks.length > 0 && (
              <div className="hidden sm:flex items-center gap-2">
                {isSelectMode && selectedBookmarks.length > 0 && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="modern-btn-archive flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:border-orange-400/50 hover:text-orange-300 hover:shadow-lg hover:shadow-orange-500/25 backdrop-blur-sm"
                      onClick={handleBulkArchive}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Archive className="h-4 w-4" />}
                      Archive ({selectedBookmarks.length})
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="modern-btn-delete flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/25 backdrop-blur-sm"
                      onClick={handleBulkDelete}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      Delete ({selectedBookmarks.length})
                    </Button>
                  </>
                )}
                
                <Button 
                  variant={isSelectMode ? "default" : "outline"} 
                  size="sm"
                  className={`modern-btn-cancel flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm ${
                    isSelectMode 
                      ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 hover:bg-violet-500/30 hover:shadow-lg hover:shadow-violet-500/25' 
                      : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md'
                  }`}
                  onClick={toggleSelectMode}
                  disabled={isLoading}
                >
                  {isSelectMode ? (
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

          {/* Mobile bulk actions - moved to right side above cards */}
          {bookmarks.length > 0 && (
            <div className="flex sm:hidden justify-end items-center gap-2 mb-4">
              {isSelectMode && selectedBookmarks.length > 0 && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center justify-center w-10 h-10 p-0 rounded-full font-semibold transition-all duration-300 bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:border-orange-400/50 hover:text-orange-300 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95 backdrop-blur-sm"
                    onClick={handleBulkArchive}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Archive className="h-4 w-4" />}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center justify-center w-10 h-10 p-0 rounded-full font-semibold transition-all duration-300 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 active:scale-95 backdrop-blur-sm"
                    onClick={handleBulkDelete}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </>
              )}
              
              <Button 
                variant={isSelectMode ? "default" : "outline"} 
                size="sm"
                className={`flex items-center justify-center w-10 h-10 p-0 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95 ${
                  isSelectMode 
                    ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 hover:bg-violet-500/30 hover:shadow-lg hover:shadow-violet-500/25' 
                    : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md'
                }`}
                onClick={toggleSelectMode}
                disabled={isLoading}
              >
                {isSelectMode ? (
                  <X className="h-4 w-4" />
                ) : (
                  <CheckSquare className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}

          {bookmarks.length === 0 ? (
            <EmptyState onAddBookmark={handleAddBookmark} />
          ) : (
            <BookmarkGrid />
          )}
        </div>
      </main>
      
      <BulkActionsBar />
    </div>
  );
};

export default Index;
