
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
import { useBookmarkContext } from '@/hooks/useBookmarkContext';

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
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isMobile = useMobile();
  const { searchQuery, setSearchQuery } = useBookmarkContext();
  
  // Check if we're on the settings page
  const isSettingsPage = location.pathname === '/settings';
  
  // Focus search input when it appears
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    if (mobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  const handleSignOut = () => {
    navigate('/signin');
    setMobileMenuOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
  };

  const handleMobileClearSearch = () => {
    setSearchQuery('');
    setMobileSearchOpen(false);
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
  
  // On mobile/tablet settings page, show a fixed navbar with sidebar icon, logo, and right controls
  if (isMobile && isSettingsPage) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg shadow-sm">
        <div className="flex h-16 items-center justify-between py-3 px-4">
          {/* Left section - Sidebar Icon + Logo */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleMobileMenuClick}
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 hover:bg-transparent text-foreground"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="group hover:bg-background/10 rounded-full p-2 transition-all duration-200">
              <Logo />
            </Link>
          </div>
          
          {/* Right section - My List Dropdown and Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* My List Dropdown */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-1 hover:bg-muted transition-all duration-200 text-sm">
                        My List <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="w-48 bg-background border border-border rounded-lg shadow-lg p-1"
                    >
                      <DropdownMenuItem asChild className="px-3 py-2.5 rounded-md cursor-pointer focus:bg-muted hover:bg-muted transition-colors">
                        <Link to="/" className="flex items-center w-full text-foreground">
                          My List
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="px-3 py-2.5 rounded-md cursor-pointer focus:bg-muted hover:bg-muted transition-colors">
                        <Link to="/trash" className="flex items-center w-full text-foreground">
                          <Trash2 className="mr-3 h-4 w-4" />
                          Trash
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="px-3 py-2.5 rounded-md cursor-pointer focus:bg-muted hover:bg-muted transition-colors">
                        <Link to="/archive" className="flex items-center w-full text-foreground">
                          <Archive className="mr-3 h-4 w-4" />
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

            {/* Theme Toggle */}
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
          </div>
        </div>
      </nav>
    );
  }
  
  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-lg shadow-sm">
        <div className="container flex h-16 items-center justify-between py-3 px-4 sm:px-6">
          {/* Left section - Logo + My List Dropdown */}
          <div className="flex items-center gap-3">
            <Link to="/" className="group hover:bg-background/10 rounded-full p-2 transition-all duration-200">
              <Logo />
            </Link>
            
            {/* My List Dropdown - Desktop only, hidden on mobile */}
            {!isMobile && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-1 hover:bg-muted transition-all duration-200 text-sm sm:text-base">
                          My List <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="start" 
                        className="w-48 bg-background border border-border rounded-lg shadow-lg p-1"
                      >
                        <DropdownMenuItem asChild className="px-3 py-2.5 rounded-md cursor-pointer focus:bg-muted hover:bg-muted transition-colors">
                          <Link to="/" className="flex items-center w-full text-foreground">
                            My List
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="px-3 py-2.5 rounded-md cursor-pointer focus:bg-muted hover:bg-muted transition-colors">
                          <Link to="/trash" className="flex items-center w-full text-foreground">
                            <Trash2 className="mr-3 h-4 w-4" />
                            Trash
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="px-3 py-2.5 rounded-md cursor-pointer focus:bg-muted hover:bg-muted transition-colors">
                          <Link to="/archive" className="flex items-center w-full text-foreground">
                            <Archive className="mr-3 h-4 w-4" />
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
          </div>
          
          {/* Mobile Header - Modern redesign */}
          {isMobile && !isSettingsPage && (
            <div className="flex items-center gap-3">
              {/* Search Icon with Expansion */}
              <div className="relative">
                {mobileSearchOpen ? (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <div className="relative">
                      <Input 
                        ref={mobileSearchInputRef}
                        className="w-48 pl-10 pr-10 h-10 rounded-full border-2 border-primary/20 bg-background/80 backdrop-blur-sm shadow-lg shadow-primary/10 focus:border-primary/40 focus:shadow-xl focus:shadow-primary/20 transition-all duration-300" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <button 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => {
                          setSearchQuery('');
                          setMobileSearchOpen(false);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMobileSearchOpen(true)}
                    className="h-10 w-10 rounded-full bg-muted/50 hover:bg-muted transition-all duration-200 hover:scale-105"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </div>

              {/* Three Dots Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-10 w-10 rounded-full bg-muted/50 hover:bg-muted transition-all duration-200 hover:scale-105"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto pb-16 rounded-t-xl bg-background/95 backdrop-blur-lg border-t border-border/50">
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
                      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    >
                      {theme === 'light' ? <Moon className="mr-2 h-5 w-5" /> : <Sun className="mr-2 h-5 w-5" />}
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
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
          
          {/* Right section - Desktop controls */}
          {!isMobile && (
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {showSearch ? (
                      <div className="relative animate-fade-in w-full max-w-[280px] md:max-w-none">
                        <Input 
                          ref={searchInputRef}
                          className="w-full md:w-[240px] pr-8 md:w-[300px] shadow-sm h-12" 
                          placeholder="Search bookmarks..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                          onBlur={(e) => {
                            // Prevent closing if user clicked within the search box
                            if (!e.relatedTarget || !e.relatedTarget.closest('.search-container')) {
                              if (!searchQuery) {
                                setShowSearch(false);
                              }
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
                  
                  {/* Theme Toggle - Now positioned after Add button */}
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
                          <DropdownMenuContent 
                            align="end" 
                            className="w-48 bg-background border border-border rounded-lg shadow-lg p-1"
                          >
                            <DropdownMenuItem 
                              onClick={goToSettings} 
                              className="px-3 py-2.5 rounded-md cursor-pointer focus:bg-muted hover:bg-muted transition-colors text-foreground"
                            >
                              <Settings className="mr-3 h-4 w-4" />
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={handleSignOut} 
                              className="px-3 py-2.5 rounded-md cursor-pointer focus:bg-muted hover:bg-muted transition-colors text-foreground"
                            >
                              <LogOut className="mr-3 h-4 w-4" />
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
      
      {/* Mobile Bottom Navigation with Floating Add Button */}
      {isMobile && !isSettingsPage && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t border-border/50 flex justify-center items-center h-20">
          {/* Floating Add Button */}
          <Drawer open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DrawerTrigger asChild>
              <Button 
                className="floating-add-btn h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Plus className="h-7 w-7 text-white" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 bg-background/95 backdrop-blur-lg">
              <AddBookmarkForm 
                open={addDialogOpen} 
                onOpenChange={setAddDialogOpen} 
                onSubmit={onAddBookmark} 
                drawerMode={true}
              />
            </DrawerContent>
          </Drawer>
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
