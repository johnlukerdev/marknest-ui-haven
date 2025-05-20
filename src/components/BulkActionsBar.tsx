
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
  
  // Since we're implementing our own selection UI at the top of the screen,
  // we're going to hide this component completely
  return null;
};

export default BulkActionsBar;
