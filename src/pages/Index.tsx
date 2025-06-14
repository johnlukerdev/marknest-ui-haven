
import React from 'react';
import NavBar from '@/components/NavBar';
import BookmarkGrid from '@/components/BookmarkGrid';
import BulkActionsBar from '@/components/BulkActionsBar';
import { Button } from '@/components/ui/button';
import { Archive, Trash2, Plus, Search, MoreHorizontal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useMobile } from '@/hooks/use-mobile';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';

const Index: React.FC = () => {
  const isMobile = useMobile();
  const { 
    isSelectMode, 
    selectedBookmarks, 
    bulkMoveToArchive, 
    bulkMoveToTrash 
  } = useBookmarkContext();
  
  const handleAddBookmark = (url: string) => {
    // In a real application, this would call an API to save the bookmark
    toast({
      title: "Bookmark added",
      description: `Added bookmark: ${url}`
    });
  };

  // Create custom bottom bar for mobile selection mode
  const customBottomBar = isMobile && isSelectMode ? {
    leftButton: {
      icon: Archive,
      label: 'Archive',
      onClick: bulkMoveToArchive,
      disabled: selectedBookmarks.length === 0
    },
    centerButton: {
      icon: Trash2,
      label: 'Delete', 
      onClick: bulkMoveToTrash,
      disabled: selectedBookmarks.length === 0
    }
  } : undefined;

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'pb-16' : ''}`}>
      <NavBar 
        onAddBookmark={handleAddBookmark} 
        customBottomBar={customBottomBar}
      />
      <main className="pt-8 pb-16">
        <BookmarkGrid onAddBookmark={handleAddBookmark} />
        <BulkActionsBar />
      </main>
    </div>
  );
};

export default Index;
