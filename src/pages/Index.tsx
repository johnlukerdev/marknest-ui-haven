
import React from 'react';
import NavBar from '@/components/NavBar';
import BookmarkGrid from '@/components/BookmarkGrid';
import ThemeToggle from '@/components/ThemeToggle';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <BookmarkGrid />
      <ThemeToggle />
    </div>
  );
};

export default Index;
