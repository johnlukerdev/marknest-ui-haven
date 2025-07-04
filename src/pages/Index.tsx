
import React from 'react';
import NavBar from '@/components/NavBar';
import BookmarkGrid from '@/components/BookmarkGrid';
import BulkActionsBar from '@/components/BulkActionsBar';
import { toast } from '@/hooks/use-toast';
import { useMobile } from '@/hooks/use-mobile';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';

const Index: React.FC = () => {
  const isMobile = useMobile();
  const { addBookmark } = useBookmarkContext();
  
  const handleAddBookmark = (url: string) => {
    addBookmark(url);
    toast({
      title: "Bookmark added",
      description: `Successfully added bookmark`
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
