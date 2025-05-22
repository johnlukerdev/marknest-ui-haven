
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { 
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Checkbox
} from "@/components/ui";
import { MoreHorizontal, Trash2, Link, Archive, Check } from "lucide-react";
import { useBookmarkContext } from '@/hooks/useBookmarkContext';

interface BookmarkCardProps {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ id, title, url, imageUrl }) => {
  // Extract domain for display
  const displayUrl = new URL(url).hostname;
  const { 
    moveToTrash, 
    moveToArchive, 
    isSelectMode, 
    selectedBookmarks, 
    toggleSelectBookmark 
  } = useBookmarkContext();
  
  const isSelected = selectedBookmarks.includes(id);
  
  const handleDelete = () => {
    // Add the animate-slide-out class to the card element
    const cardElement = document.getElementById(`card-${id}`);
    if (cardElement) {
      cardElement.classList.add('animate-slide-out');
      
      // Wait for the animation to complete before moving to trash
      setTimeout(() => {
        moveToTrash(id);
      }, 300); // 300ms matches the animation duration
    } else {
      // Fallback if the element isn't found
      moveToTrash(id);
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
  };
  
  const handleArchive = () => {
    // Add the animate-slide-out class to the card element
    const cardElement = document.getElementById(`card-${id}`);
    if (cardElement) {
      cardElement.classList.add('animate-slide-out');
      
      // Wait for the animation to complete before moving to archive
      setTimeout(() => {
        moveToArchive(id);
      }, 300); // 300ms matches the animation duration
    } else {
      // Fallback if the element isn't found
      moveToArchive(id);
    }
  };
  
  const handleCardClick = () => {
    if (isSelectMode) {
      toggleSelectBookmark(id);
    }
  };
  
  return (
    <Card 
      id={`card-${id}`} 
      className={`overflow-hidden hover-scale group card-enter flex flex-col h-full relative ${
        isSelectMode ? 'cursor-pointer' : ''
      } ${
        isSelected ? 'ring-2 ring-primary bg-selected' : ''
      }`}
      onClick={isSelectMode ? handleCardClick : undefined}
    >
      {isSelectMode && (
        <div className="absolute top-2 left-2 z-10">
          <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
            isSelected ? 'bg-primary text-white' : 'bg-background/80 border border-border'
          }`}>
            {isSelected && <Check className="h-4 w-4" />}
          </div>
        </div>
      )}
      <div className="relative h-40 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex flex-col flex-grow">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mb-1 line-clamp-2 font-medium transition-colors hover:text-primary cursor-pointer"
            onClick={(e) => isSelectMode && e.preventDefault()}
          >
            {title}
          </a>
          <p className="text-sm text-muted-foreground mt-1 truncate">
            {displayUrl}
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 pt-3 flex justify-between items-center">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm text-muted-foreground hover:text-primary transition-colors hover:cursor-pointer"
          onClick={(e) => isSelectMode && e.preventDefault()}
        >
          Visit site
        </a>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full hover:bg-muted transition-all duration-200"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#2E2E2E] p-1.5 rounded-lg shadow-md border-0 animate-scale-in">
                  <div className="flex flex-col gap-1">
                    <DropdownMenuItem 
                      onClick={handleDelete}
                      className="flex items-center gap-2 py-2.5 px-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-[#1F1F1F] hover:scale-[1.03] active:scale-[0.97] text-[#E0E0E0] hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="font-medium">Delete</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={handleCopyLink}
                      className="flex items-center gap-2 py-2.5 px-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-[#1F1F1F] hover:scale-[1.03] active:scale-[0.97] text-[#E0E0E0] hover:text-white"
                    >
                      <Link className="h-4 w-4" />
                      <span className="font-medium">Copy Link</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={handleArchive}
                      className="flex items-center gap-2 py-2.5 px-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-[#1F1F1F] hover:scale-[1.03] active:scale-[0.97] text-[#E0E0E0] hover:text-white"
                    >
                      <Archive className="h-4 w-4" />
                      <span className="font-medium">Archive</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default BookmarkCard;
