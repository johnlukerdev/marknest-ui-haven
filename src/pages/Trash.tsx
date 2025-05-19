
import React from 'react';
import NavBar from '@/components/NavBar';
import BookmarkGrid from '@/components/BookmarkGrid';
import { toast } from '@/hooks/use-toast';

const Trash: React.FC = () => {
  const handleAddBookmark = (url: string) => {
    toast({
      title: "Bookmark added",
      description: `Added bookmark: ${url}`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onAddBookmark={handleAddBookmark} />
      <main className="pt-4 md:pt-8 pb-16 md:pb-0">
        <BookmarkGrid onAddBookmark={handleAddBookmark} />
      </main>
    </div>
  );
};

export default Trash;
