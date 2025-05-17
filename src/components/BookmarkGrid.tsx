
import React, { useState } from 'react';
import BookmarkCard from './BookmarkCard';

// Sample bookmark data
const INITIAL_BOOKMARKS = [
  {
    id: '1',
    title: 'The Ultimate Guide to Web Development in 2025',
    url: 'https://webdev.example.com/guide2025',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'How to Master React Hooks: Advanced Techniques',
    url: 'https://reactjs.org/advanced-hooks',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Productivity Tips for Remote Developers',
    url: 'https://productivity.dev/remote-tips',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '4',
    title: 'Building Scalable Backend Systems with Node.js',
    url: 'https://nodejs.org/scalable-systems',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '5',
    title: 'Design Patterns Every Developer Should Know',
    url: 'https://patterns.dev/essential',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '6',
    title: '10 VS Code Extensions That Will Change Your Life',
    url: 'https://vscode.tips/top-extensions',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000'
  },
];

interface BookmarkType {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
}

interface BookmarkGridProps {
  onAddBookmark?: (url: string) => void;
}

const BookmarkGrid: React.FC<BookmarkGridProps> = ({ onAddBookmark }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>(INITIAL_BOOKMARKS);

  // Function to handle adding a new bookmark (would typically connect to an API)
  const handleAddBookmark = (url: string) => {
    // This is a mock implementation, in a real app you'd fetch metadata from the URL
    const newBookmark: BookmarkType = {
      id: Math.random().toString(36).substring(7),
      title: `Bookmark for ${url}`,
      url,
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000'
    };
    
    setBookmarks([newBookmark, ...bookmarks]);
    
    if (onAddBookmark) {
      onAddBookmark(url);
    }
  };

  return (
    <div className="container py-12 px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((bookmark, index) => (
          <BookmarkCard
            key={bookmark.id}
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
