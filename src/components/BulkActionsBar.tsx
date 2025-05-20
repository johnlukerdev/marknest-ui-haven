
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, Archive, X } from "lucide-react";
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { toast } from '@/hooks/use-toast';

const BulkActionsBar: React.FC = () => {
  const { 
    selectedBookmarks, 
    isSelectMode, 
    toggleSelectMode, 
    bulkMoveToTrash, 
    bulkMoveToArchive 
  } = useBookmarkContext();
  
  const selectedCount = selectedBookmarks.length;
  
  const handleBulkDelete = () => {
    if (selectedCount > 0) {
      bulkMoveToTrash();
      toast({
        title: `${selectedCount} bookmarks moved to trash`,
        description: "You can restore them from the trash later"
      });
    }
  };
  
  const handleBulkArchive = () => {
    if (selectedCount > 0) {
      bulkMoveToArchive();
      toast({
        title: `${selectedCount} bookmarks archived`,
        description: "You can find them in your archive"
      });
    }
  };
  
  if (!isSelectMode) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm shadow-lg border-t border-border animate-slide-in-up p-4 z-30 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSelectMode} 
          className="mr-2"
        >
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <span className="text-sm font-medium">
          {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
        </span>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBulkArchive} 
          disabled={selectedCount === 0}
        >
          <Archive className="h-4 w-4 mr-1" />
          Archive
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleBulkDelete} 
          disabled={selectedCount === 0}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;
