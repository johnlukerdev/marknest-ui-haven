
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";

interface BookmarkCardProps {
  title: string;
  url: string;
  imageUrl: string;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ title, url, imageUrl }) => {
  // Extract domain for display
  const displayUrl = new URL(url).hostname;
  
  return (
    <Card className="overflow-hidden hover-scale group">
      <div className="relative h-40 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mb-1 line-clamp-2 font-medium hover:underline"
        >
          {title}
        </a>
      </CardContent>
      <CardFooter className="border-t p-4 pt-3 flex justify-between items-center">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm text-muted-foreground hover:text-primary"
        >
          {displayUrl}
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default BookmarkCard;
