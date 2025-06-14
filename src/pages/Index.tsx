
import React from 'react';
import NavBar from '@/components/NavBar';
import BookmarkGrid from '@/components/BookmarkGrid';
import BulkActionsBar from '@/components/BulkActionsBar';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { toast } from '@/hooks/use-toast';
import { useMobile } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  const isMobile = useMobile();
  const { addBookmark } = useBookmarkContext();
  
  const handleAddBookmark = async (url: string) => {
    try {
      await addBookmark(url);
      toast({
        title: "Bookmark added",
        description: `Successfully bookmarked: ${url}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add bookmark. Please try again.",
        variant: "destructive"
      });
    }
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
