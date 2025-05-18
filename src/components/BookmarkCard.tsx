
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
  TooltipTrigger
} from "@/components/ui";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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
  const { moveToTrash } = useBookmarkContext();
  
  const handleDelete = () => {
    // Add the animate-slide-out class to the card element
    const cardElement = document.getElementById(`card-${id}`);
    if (cardElement) {
      cardElement.classList.add('animate-slide-out');
      
      // Wait for the animation to complete before moving to trash
      setTimeout(() => {
        moveToTrash(id);
        toast({
          title: "Moved to trash",
          description: `"${title}" has been moved to trash`,
        });
      }, 300); // 300ms matches the animation duration
    } else {
      // Fallback if the element isn't found
      moveToTrash(id);
      toast({
        title: "Moved to trash",
        description: `"${title}" has been moved to trash`,
      });
    }
  };
  
  return (
    <Card id={`card-${id}`} className="overflow-hidden hover-scale group card-enter flex flex-col h-full">
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
            className="mb-1 line-clamp-2 font-medium transition-colors hover:text-primary hover:underline"
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
                    className="h-8 w-8 rounded-full hover:bg-muted transition-all duration-200 hover:cursor-pointer"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 animate-scale-in">
                  <DropdownMenuItem 
                    onClick={handleDelete}
                    className="group bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md font-medium text-[15px] cursor-pointer transition-all duration-200 hover:shadow-md flex items-center"
                  >
                    <Trash2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Delete
                  </DropdownMenuItem>
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
