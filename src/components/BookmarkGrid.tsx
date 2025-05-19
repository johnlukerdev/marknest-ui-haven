
import React from 'react';
import BookmarkCard from './BookmarkCard';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';

interface BookmarkGridProps {
  onAddBookmark?: (url: string) => void;
}

const BookmarkGrid: React.FC<BookmarkGridProps> = ({ onAddBookmark }) => {
  const { bookmarks } = useBookmarkContext();

  return (
    <div className="container py-8 sm:py-12 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 mx-auto w-full sm:grid-cols-2 lg:grid-cols-3 place-items-center sm:place-items-stretch">
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
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-2">No bookmarks yet</h2>
          <p className="text-muted-foreground">Add your first bookmark using the + button</p>
        </div>
      )}
    </div>
  );
};

export default BookmarkGrid;
