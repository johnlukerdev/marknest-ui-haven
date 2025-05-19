
import React from 'react';
import { 
  Menu, 
  Plus, 
  Sun, 
  Moon, 
  Search, 
  MoreHorizontal,
  Settings,
  LifeBuoy
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from '@/hooks/use-theme';

interface BottomNavBarProps {
  onMenuClick: () => void;
  onAddClick: () => void;
  onSearchClick: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ 
  onMenuClick,
  onAddClick,
  onSearchClick
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t shadow-sm py-2 px-4 md:hidden">
      <div className="flex justify-around items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Menu</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onAddClick}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add bookmark</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle {theme === 'light' ? 'dark' : 'light'} mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onSearchClick}
                className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                <Search className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 animate-scale-in">
                  <DropdownMenuItem className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900 flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900 flex items-center">
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    Support
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>More options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default BottomNavBar;
