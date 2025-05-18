
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, Plus, Search, MoreHorizontal, LogOut, Settings, Sun, Moon } from "lucide-react";
import Logo from './Logo';
import AddBookmarkForm from './AddBookmarkForm';
import { useTheme } from '@/hooks/use-theme';

interface NavBarProps {
  onAddBookmark: (url: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onAddBookmark }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Focus search input when it appears
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSignOut = () => {
    navigate('/signin');
  };
  
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-lg shadow-sm">
      <div className="container flex h-18 items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <Logo />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1">
                      My List <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48 animate-scale-in">
                    <DropdownMenuItem>My List</DropdownMenuItem>
                    <DropdownMenuItem>Trash</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>View your collections</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {showSearch ? (
                  <div className="relative animate-fade-in">
                    <Input 
                      ref={searchInputRef}
                      className="w-[220px] pr-8 md:w-[280px] shadow-sm" 
                      placeholder="Search bookmarks..." 
                      autoFocus
                      onBlur={() => setShowSearch(false)}
                    />
                    <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowSearch(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>Search bookmarks</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => setAddDialogOpen(true)} 
                  className="flex items-center gap-1 gradient-primary hover:opacity-95 transition-opacity px-5 py-6"
                >
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add new bookmark</p>
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
                  className="text-muted-foreground hover:text-foreground"
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 animate-scale-in">
                    <DropdownMenuItem className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
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
      
      <AddBookmarkForm 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen} 
        onSubmit={onAddBookmark} 
      />
    </nav>
  );
};

export default NavBar;
