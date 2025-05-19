
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
