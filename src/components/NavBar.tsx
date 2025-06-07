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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ChevronDown, Plus, Search, MoreHorizontal, LogOut, Settings, Sun, Moon, Trash2, Archive, X, Menu } from "lucide-react";
import Logo from './Logo';
import AddBookmarkForm from './AddBookmarkForm';
import { useTheme } from '@/hooks/use-theme';
import { useMobile } from '@/hooks/use-mobile';

interface NavBarProps {
  onAddBookmark: (url: string) => void;
  onMobileMenuToggle?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onAddBookmark, onMobileMenuToggle }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isMobile = useMobile();
  
  // Focus search input when it appears
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSignOut = () => {
    navigate('/signin');
    setMobileMenuOpen(false);
  };

  const handleClearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    setShowSearch(false);
  };

  const goToSettings = () => {
    navigate('/settings');
    setMobileMenuOpen(false);
  };

  const handleMobileMenuClick = () => {
    if (onMobileMenuToggle) {
      onMobileMenuToggle();
    }
  };
  
  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-lg shadow-sm">
        <div className="container flex flex-col md:flex-row h-auto md:h-18 items-center justify-between py-3 px-4 sm:px-6">
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start mb-3 md:mb-0">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger menu - only show on mobile */}
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleMobileMenuClick}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              
              <Link to="/" className="group hover:bg-background/10 rounded-full p-2 transition-all duration-200">
                <Logo />
              </Link>
            </div>
            
            {!isMobile && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-1 hover:bg-muted transition-all duration-200">
                          My List <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48 animate-scale-in">
                        <DropdownMenuItem asChild className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900">
                          <Link to="/">My List</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900">
                          <Link to="/trash">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Trash
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900">
                          <Link to="/archive">
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View your collections</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {isMobile && (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 hover:bg-muted transition-all duration-200">
                      My List <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48 animate-scale-in">
                    <DropdownMenuItem asChild className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900">
                      <Link to="/">My List</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900">
                      <Link to="/trash">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Trash
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900">
                      <Link to="/archive">
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
              </div>
            )}
          </div>
          
          {!isMobile && (
            <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
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
                            <DropdownMenuItem 
                              onClick={goToSettings} 
                              className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={handleSignOut} 
                              className="px-4 py-2 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                            >
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
          )}
        </div>
      </nav>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex justify-around items-center h-16">
          <Drawer open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DrawerTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-full w-1/3 flex flex-col items-center justify-center rounded-none"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <Plus className="h-6 w-6 text-white" />
                </div>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
              <AddBookmarkForm 
                open={addDialogOpen} 
                onOpenChange={setAddDialogOpen} 
                onSubmit={onAddBookmark} 
                drawerMode={true}
              />
            </DrawerContent>
          </Drawer>

          <Drawer open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
            <DrawerTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-full w-1/3 flex items-center justify-center rounded-none"
              >
                <Search className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-center">Search</h2>
                <Input 
                  className="w-full shadow-sm" 
                  placeholder="Search bookmarks..." 
                  autoFocus
                />
              </div>
            </DrawerContent>
          </Drawer>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-full w-1/3 flex items-center justify-center rounded-none"
              >
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto pb-16 rounded-t-xl">
              <div className="grid gap-4 py-4">
                <Button 
                  variant="ghost" 
                  className="flex justify-start" 
                  onClick={goToSettings}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex justify-start" 
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
      
      {!isMobile && (
        <AddBookmarkForm 
          open={addDialogOpen} 
          onOpenChange={setAddDialogOpen} 
          onSubmit={onAddBookmark} 
        />
      )}
    </>
  );
};

export default NavBar;
