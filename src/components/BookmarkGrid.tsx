
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
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {searchQuery ? `Search Results (${displayBookmarks.length})` : 'My Bookmarks'}
            </h2>
          </div>
        </div>
        {hasBookmarks && (
          <div className="flex items-center gap-3 flex-wrap justify-end">
            {isSelectMode && selectedBookmarks.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={bulkMoveToArchive}
                  className="modern-btn-archive rounded-full px-6 py-2 text-sm font-semibold flex items-center gap-2 bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 backdrop-blur-sm"
                >
                  <Archive className="h-4 w-4" />
                  Archive
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={bulkMoveToTrash}
                  className="modern-btn-delete rounded-full px-6 py-2 text-sm font-semibold flex items-center gap-2 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 backdrop-blur-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            )}
            <Button 
              variant={isSelectMode ? "default" : "outline"}
              size="sm"
              onClick={toggleSelectMode}
              className={`modern-btn-cancel rounded-full px-6 py-2 text-sm font-semibold flex items-center gap-2 transition-all duration-300 backdrop-blur-sm ${
                isSelectMode 
                  ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 hover:bg-violet-500/30 hover:shadow-lg hover:shadow-violet-500/25' 
                  : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md'
              }`}
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
