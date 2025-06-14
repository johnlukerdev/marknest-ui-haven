
import React, { useState } from 'react';
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
} from "@/components/ui";
import { MoreHorizontal, Trash2, Link, Archive, Check, ExternalLink } from "lucide-react";
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { toast } from '@/hooks/use-toast';

interface BookmarkCardProps {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ id, title, url, imageUrl }) => {
  // Extract domain for display
  const displayUrl = new URL(url).hostname.replace('www.', '');
  const { 
    moveToTrash, 
    moveToArchive, 
    isSelectMode, 
    selectedBookmarks, 
    toggleSelectBookmark 
  } = useBookmarkContext();
  
  const [isCopying, setIsCopying] = useState(false);
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
    setIsCopying(true);
    toast({
      title: "Copied!",
      description: `Link copied to clipboard`,
      duration: 2000,
    });
    
    // Reset the copying state after 1 second
    setTimeout(() => {
      setIsCopying(false);
    }, 1000);
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

  const handleVisitSite = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
          <h3 className="mb-2 line-clamp-2 font-semibold text-foreground leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-auto">
            {displayUrl}
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 pt-3 flex justify-between items-center gap-2">
        <Button
          onClick={handleVisitSite}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Visit Site
        </Button>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full hover:bg-muted transition-all duration-200 focus:ring-0"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  side="bottom"
                  sideOffset={8}
                  className="w-48 p-2 bg-popover border border-border rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
                >
                  <div className="space-y-1">
                    <DropdownMenuItem 
                      onClick={handleDelete}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
                      <span className="font-medium text-sm">Delete</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={handleCopyLink}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    >
                      {isCopying ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Link className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                      <span className="font-medium text-sm">{isCopying ? "Copied!" : "Copy Link"}</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={handleArchive}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    >
                      <Archive className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium text-sm">Archive</span>
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
