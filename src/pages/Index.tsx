
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import BookmarkGrid from '@/components/BookmarkGrid';
import ThemeToggle from '@/components/ThemeToggle';
import { toast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const handleAddBookmark = (url: string) => {
    // In a real application, this would call an API to save the bookmark
    toast({
      title: "Bookmark added",
      description: `Added bookmark: ${url}`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onAddBookmark={handleAddBookmark} />
      <BookmarkGrid onAddBookmark={handleAddBookmark} />
      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Index;
