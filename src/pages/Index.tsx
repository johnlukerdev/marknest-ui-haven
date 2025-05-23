
import React from 'react';
import NavBar from '@/components/NavBar';
import BookmarkGrid from '@/components/BookmarkGrid';
import BulkActionsBar from '@/components/BulkActionsBar';
import { toast } from '@/hooks/use-toast';
import { useMobile } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  const isMobile = useMobile();
  
  const handleAddBookmark = (url: string) => {
    // In a real application, this would call an API to save the bookmark
    toast({
      title: "Bookmark added",
      description: `Added bookmark: ${url}`
    });
  };

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'pb-16' : ''}`}>
      <NavBar onAddBookmark={handleAddBookmark} />
      <main className="pt-8 pb-16">
        <BookmarkGrid onAddBookmark={handleAddBookmark} />
        <BulkActionsBar />
      </main>
    </div>
  );
};

export default Index;
