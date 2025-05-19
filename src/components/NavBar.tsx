
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, Plus, Search, MoreHorizontal, LogOut, Settings, Sun, Moon, Trash2, Archive, X } from "lucide-react";
import Logo from './Logo';
import AddBookmarkForm from './AddBookmarkForm';
import { useTheme } from '@/hooks/use-theme';
import BottomNavBar from './BottomNavBar';
import MobileSidebarDrawer from './MobileSidebarDrawer';

interface NavBarProps {
  onAddBookmark: (url: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onAddBookmark }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleClearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    setShowSearch(false);
  };

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };
  
  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-lg shadow-sm">
        <div className="container flex flex-col md:flex-row h-auto md:h-18 items-center py-3 px-4 sm:px-6 justify-center md:justify-between">
          {/* Mobile: Only Logo centered */}
          <div className="flex items-center justify-center w-full md:w-auto md:justify-start mb-3 md:mb-0">
            <Link to="/" className="group hover:bg-background/10 rounded-full p-2 transition-all duration-200">
              <Logo />
            </Link>
          </div>
          
          {/* Search bar shown when search is clicked on mobile */}
          {showSearch && (
            <div className="w-full mt-2 mb-3 animate-fade-in md:hidden">
              <div className="relative">
                <Input 
                  ref={searchInputRef}
                  className="w-full pr-8 shadow-sm h-12" 
                  placeholder="Search bookmarks..." 
                  autoFocus
                  onBlur={(e) => {
                    // Only close search if clicking outside the search area and not on related elements
                    if (!e.relatedTarget || !e.relatedTarget.closest('.search-container')) {
                      setShowSearch(false);
                    }
                  }}
                />
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
          
          {/* Desktop navigation controls */}
          <div className="hidden md:flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {showSearch ? (
                    <div className="relative animate-fade-in w-full max-w-[280px] md:max-w-none">
                      <Input 
                        ref={searchInputRef}
                        className="w-full md:w-[240px] pr-8 md:w-[300px] shadow-sm h-12" 
                        placeholder="Search bookmarks..." 
                        autoFocus
                        onBlur={(e) => {
                          // Prevent closing if user clicked within the search box
                          if (!e.relatedTarget || !e.relatedTarget.closest('.search-container')) {
                            setShowSearch(false);
                          }
                        }}
                      />
                      <button 
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={handleClearSearch}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setShowSearch(true)}
                      className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
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
            
            {/* Hide these buttons when search is open on desktop */}
            {(!showSearch || window.innerWidth > 768) && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={() => setAddDialogOpen(true)} 
                        className="flex items-center gap-1 gradient-primary hover:opacity-95 transition-all duration-200 hover:shadow-md px-5 py-6"
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
              </>
            )}
          </div>
        </div>
      </nav>
      
      {/* Mobile bottom navigation bar */}
      {!showSearch && (
        <BottomNavBar 
          onMenuClick={handleMenuClick} 
          onAddClick={() => setAddDialogOpen(true)} 
          onSearchClick={handleSearchClick}
        />
      )}

      {/* Sidebar drawer for mobile */}
      <MobileSidebarDrawer 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onSignOut={handleSignOut}
      />
      
      <AddBookmarkForm 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen} 
        onSubmit={onAddBookmark} 
      />
    </>
  );
};

export default NavBar;
