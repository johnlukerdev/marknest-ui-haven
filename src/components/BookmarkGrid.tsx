
import React from 'react';
import BookmarkCard from './BookmarkCard';
import BulkActionsBar from './BulkActionsBar';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { Button } from './ui/button';
import { CheckSquare, X, Trash2, Archive } from 'lucide-react';

interface BookmarkGridProps {
  onAddBookmark?: (url: string) => void;
}

const BookmarkGrid: React.FC<BookmarkGridProps> = ({ onAddBookmark }) => {
  const { 
    bookmarks, 
    isSelectMode, 
    toggleSelectMode, 
    selectedBookmarks,
    bulkMoveToTrash,
    bulkMoveToArchive
  } = useBookmarkContext();

  return (
    <div className="container py-8 sm:py-12 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Bookmarks</h2>
        <div className="flex items-center gap-2">
          {isSelectMode && selectedBookmarks.length > 0 && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={bulkMoveToArchive}
                className="rounded-full px-4 py-1.5 text-sm font-semibold flex items-center gap-1.5 select-action-btn"
              >
                <Archive className="h-3.5 w-3.5" />
                Archive
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={bulkMoveToTrash}
                className="rounded-full px-4 py-1.5 text-sm font-semibold flex items-center gap-1.5 select-action-btn"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </>
          )}
          <Button 
            variant={isSelectMode ? "default" : "outline"}
            size="sm"
            onClick={toggleSelectMode}
            className="flex items-center gap-2"
          >
            {isSelectMode ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <CheckSquare className="h-4 w-4" />
                Select
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:gap-8 mx-auto w-full sm:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            id={bookmark.id}
            title={bookmark.title}
            url={bookmark.url}
            imageUrl={bookmark.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkGrid;
