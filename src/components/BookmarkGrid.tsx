import React from 'react';
import BookmarkCard from './BookmarkCard';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { Button } from './ui/button';
import { CheckSquare, X, Archive, Trash2, Bookmark } from 'lucide-react';
import EmptyState from './EmptyState';

interface BookmarkGridProps {
  onAddBookmark?: (url: string) => void;
}

const BookmarkGrid: React.FC<BookmarkGridProps> = ({ onAddBookmark }) => {
  const { 
    bookmarks,
    filteredBookmarks,
    searchQuery,
    isSelectMode, 
    toggleSelectMode, 
    selectedBookmarks,
    bulkMoveToArchive,
    bulkMoveToTrash
  } = useBookmarkContext();

  // Use filteredBookmarks for display, but check original bookmarks length for showing controls
  const displayBookmarks = filteredBookmarks;
  const hasBookmarks = bookmarks.length > 0;
  const hasResults = displayBookmarks.length > 0;

  return (
    <div className="container py-8 sm:py-12 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 mb-8">
        {/* Header with icon and title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bookmark className="h-7 w-7 text-primary transition-transform duration-300 hover:scale-110 hover:rotate-12" />
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-muted-foreground bg-clip-text text-transparent font-['Inter','Poppins','DM_Sans',sans-serif]">
              {searchQuery ? `Search Results (${displayBookmarks.length})` : 'My Bookmarks'}
            </h2>
          </div>

          {/* Select/Cancel button - positioned on the right */}
          {hasBookmarks && (
            <Button 
              variant={isSelectMode ? "default" : "outline"}
              size="sm"
              onClick={toggleSelectMode}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95 ${
                isSelectMode 
                  ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 hover:bg-violet-500/30 hover:shadow-lg hover:shadow-violet-500/25' 
                  : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md'
              }`}
            >
              {isSelectMode ? (
                <>
                  <X className="h-4 w-4" />
                  <span className="hidden sm:inline">Cancel</span>
                </>
              ) : (
                <>
                  <CheckSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Select</span>
                </>
              )}
            </Button>
          )}
        </div>

        {/* Bulk action buttons - show below header when items are selected */}
        {isSelectMode && selectedBookmarks.length > 0 && (
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={bulkMoveToArchive}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 backdrop-blur-sm w-full sm:w-auto"
            >
              <Archive className="h-4 w-4" />
              <span>Archive</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={bulkMoveToTrash}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 active:scale-95 backdrop-blur-sm w-full sm:w-auto"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        )}
      </div>
      
      {hasResults ? (
        <div className="grid grid-cols-1 gap-8 mx-auto w-full sm:grid-cols-2 lg:grid-cols-3">
          {displayBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              id={bookmark.id}
              title={bookmark.title}
              url={bookmark.url}
              imageUrl={bookmark.imageUrl}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={<Archive className="h-16 w-16 text-muted-foreground" />}
          title={searchQuery ? "No results found" : "No bookmarks yet"}
          description={searchQuery ? `No bookmarks match "${searchQuery}". Try a different search term.` : "Save articles, tools, or anything inspiring. Start collecting the web you love."}
        />
      )}
    </div>
  );
};

export default BookmarkGrid;
