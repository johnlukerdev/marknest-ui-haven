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
import { ChevronDown, Plus, Search, MoreHorizontal, LogOut, Settings, Sun, Moon, Trash2, Archive, X, Menu, Loader2 } from "lucide-react";
import Logo from './Logo';
import AddBookmarkForm from './AddBookmarkForm';
import { useTheme } from '@/hooks/use-theme';
import { useMobile } from '@/hooks/use-mobile';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { toast } from '@/hooks/use-toast';

interface CustomBottomButton {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface CustomBottomBar {
  leftButton?: CustomBottomButton;
  centerButton?: CustomBottomButton;
  rightButton?: CustomBottomButton;
}

interface NavBarProps {
  onAddBookmark: (url: string) => void;
  onMobileMenuToggle?: () => void;
  customBottomBar?: CustomBottomBar;
}

const NavBar: React.FC<NavBarProps> = ({ onAddBookmark, onMobileMenuToggle, customBottomBar }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isMobile = useMobile();
  
  // Safely get bookmark context - handle case where provider might not be ready
  let bookmarkContext;
  try {
    bookmarkContext = useBookmarkContext();
  } catch (error) {
    // Context not available yet, use default values
    bookmarkContext = {
      searchQuery: '',
      setSearchQuery: () => {},
      isSelectMode: false,
      selectedBookmarks: [],
      bulkMoveToTrash: () => {},
      bulkMoveToArchive: () => {},
      toggleSelectMode: () => {}
    };
  }
  
  const { 
    searchQuery, 
    setSearchQuery, 
    isSelectMode, 
    selectedBookmarks, 
    bulkMoveToTrash, 
    bulkMoveToArchive,
    toggleSelectMode 
  } = bookmarkContext;
  
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
    setMainMenuOpen(false);
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
    setMainMenuOpen(false);
  };

  const handleMobileMenuClick = () => {
    if (onMobileMenuToggle) {
      onMobileMenuToggle();
    } else {
      setMainMenuOpen(true);
    }
  };

  // Handle bottom bar Archive button click - REMOVED navigation
  const handleBottomBarArchive = () => {
    if (selectedBookmarks.length > 0) {
      bulkMoveToArchive();
      // REMOVED: toast notification
    }
  };

  // Handle bottom bar Delete button click - REMOVED navigation
  const handleBottomBarDelete = () => {
    if (selectedBookmarks.length > 0) {
      bulkMoveToTrash();
      // REMOVED: toast notification
    }
  };

  const mainMenuItems = [
    { id: 'home', label: 'My List', path: '/' },
    { id: 'trash', label: 'Trash', path: '/trash' },
    { id: 'archive', label: 'Archive', path: '/archive' },
    { id: 'settings', label: 'Settings', path: '/settings' },
  ];

  const handleMainMenuNavigation = (path: string) => {
    navigate(path);
    setMainMenuOpen(false);
  };
  
  // On mobile/tablet settings page, show a fixed navbar with sidebar icon, logo, and right controls
  if (isMobile && isSettingsPage) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg shadow-sm">
        <div className="flex h-16 items-center justify-between py-3 px-4">
          {/* Left section - Sidebar Icon + Logo */}
          <div className="flex items-center gap-1">
            <Button
              onClick={handleMobileMenuClick}
              variant="ghost"
              size="icon"
              className={`h-10 w-10 p-0 hover:bg-muted/50 transition-all duration-200 rounded-md md:hidden ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Link to="/" className="group hover:bg-background/10 rounded-full p-2 transition-all duration-200">
              <Logo />
            </Link>
          </div>
          
          {/* Right section - Theme Toggle only on mobile settings */}
          <div className="flex items-center gap-2">
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
        <div className="w-full flex h-16 items-center justify-between py-3 px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Left section - Hamburger + Logo + My List Dropdown */}
          <div className="flex items-center gap-1">
            {/* White Hamburger Menu Button - Only show on mobile/tablet */}
            <Sheet open={mainMenuOpen} onOpenChange={setMainMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 p-0 hover:bg-muted/50 transition-all duration-200 rounded-md md:hidden ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-6">MENU</h2>
                  <nav className="space-y-2">
                    {mainMenuItems.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() => handleMainMenuNavigation(item.path)}
                        variant="ghost"
                        className={`w-full justify-start text-left p-3 h-auto ${
                          location.pathname === item.path
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <span>{item.label}</span>
                      </Button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link to="/" className="group hover:bg-background/10 rounded-full p-2 transition-all duration-200">
              <Logo />
            </Link>
            
            {/* My List Dropdown - Hidden on mobile, visible on tablet and desktop */}
            <div className="hidden md:block">
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
            </div>
          </div>
          
          {/* Mobile Right section - Theme Toggle only (removed My List dropdown) */}
          {isMobile && !isSettingsPage && (
            <div className="flex items-center gap-2">
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
                          className="w-full md:w-[240px] pr-8 md:w-[300px] shadow-sm h-12 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
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
                          <Plus className="h-12 w-12 text-foreground" /> Add
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
      
      {/* Mobile Bottom Navigation */}
      {isMobile && !isSettingsPage && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex justify-around items-center h-16">
          {/* Handle custom bottom bar or default behavior */}
          {customBottomBar ? (
            // Custom bottom bar for specific pages (like Archive in selection mode)
            <>
              {/* Left button */}
              {customBottomBar.leftButton && (
                <Button 
                  variant="ghost" 
                  className="h-full w-1/3 flex flex-col items-center justify-center rounded-none gap-1"
                  onClick={customBottomBar.leftButton.onClick}
                  disabled={customBottomBar.leftButton.disabled}
                >
                  {customBottomBar.leftButton.loading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-foreground" />
                  ) : (
                    <customBottomBar.leftButton.icon className="h-6 w-6 text-foreground" />
                  )}
                  <span className="text-xs text-foreground">{customBottomBar.leftButton.label}</span>
                </Button>
              )}
              
              {/* Center button */}
              {customBottomBar.centerButton && (
                <Button 
                  variant="ghost" 
                  className="h-full w-1/3 flex flex-col items-center justify-center rounded-none gap-1"
                  onClick={customBottomBar.centerButton.onClick}
                  disabled={customBottomBar.centerButton.disabled}
                >
                  {customBottomBar.centerButton.loading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-foreground" />
                  ) : (
                    <customBottomBar.centerButton.icon className="h-6 w-6 text-foreground" />
                  )}
                  <span className="text-xs text-foreground">{customBottomBar.centerButton.label}</span>
                </Button>
              )}
              
              {/* Right button - Always show 3 dots menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-full w-1/3 flex items-center justify-center rounded-none"
                  >
                    <MoreHorizontal className="h-8 w-8" />
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
            </>
          ) : (
            // Default bottom bar behavior
            <>
              {/* Left button - Add (normal) or Archive (select mode) */}
              {!isSelectMode ? (
                <Drawer open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DrawerTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-full w-1/3 flex flex-col items-center justify-center rounded-none"
                    >
                      <Plus className="h-18 w-18 text-foreground" />
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
              ) : (
                // In select mode, show Archive button only on bookmark and trash pages, hide on archive page
                location.pathname !== '/archive' && (
                  <Button 
                    variant="ghost" 
                    className="h-full w-1/3 flex flex-col items-center justify-center rounded-none gap-1"
                    onClick={handleBottomBarArchive}
                    disabled={selectedBookmarks.length === 0}
                  >
                    <Archive className="h-6 w-6 text-foreground" />
                    <span className="text-xs text-foreground">Archive</span>
                  </Button>
                )
              )}

              {/* Middle button - Search (normal) or Delete (select mode on bookmark/trash pages) or hidden (select mode on archive page) */}
              {!isSelectMode ? (
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
                      <div className="relative">
                        <Input 
                          ref={mobileSearchInputRef}
                          className="w-full shadow-sm pr-8 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                          placeholder="Search bookmarks..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                        {searchQuery && (
                          <button 
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={handleMobileClearSearch}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              ) : (
                // In select mode, show Delete button only on bookmark and trash pages, hide on archive page
                location.pathname !== '/archive' && (
                  <Button 
                    variant="ghost" 
                    className="h-full w-1/3 flex flex-col items-center justify-center rounded-none gap-1"
                    onClick={handleBottomBarDelete}
                    disabled={selectedBookmarks.length === 0}
                  >
                    <Trash2 className="h-6 w-6 text-foreground" />
                    <span className="text-xs text-foreground">Delete</span>
                  </Button>
                )
              )}

              {/* Right button - Three dots menu (always visible) */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-full w-1/3 flex items-center justify-center rounded-none"
                  >
                    <MoreHorizontal className={`${isSelectMode ? 'h-8 w-8' : 'h-6 w-6'}`} />
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
            </>
          )}
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
