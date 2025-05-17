
import React from 'react';
import BookmarkCard from './BookmarkCard';

// Sample bookmark data
const BOOKMARKS = [
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

const BookmarkGrid: React.FC = () => {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BOOKMARKS.map((bookmark) => (
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
