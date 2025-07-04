import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { linkPreviewService, LinkPreviewData } from '@/services/linkPreviewService';
import { toast } from '@/hooks/use-toast';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  imageUrl?: string;
  description?: string;
  domain: string;
  isLoading?: boolean;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  filteredBookmarks: Bookmark[];
  trashBookmarks: Bookmark[];
  archiveBookmarks: Bookmark[];
  selectedBookmarks: string[];
  isSelectMode: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addBookmark: (url: string) => void;
  moveToTrash: (id: string) => void;
  restoreFromTrash: (id: string) => void;
  moveToArchive: (id: string) => void;
  restoreFromArchive: (id: string) => void;
  permanentlyDelete: (id: string) => void;
  toggleSelectMode: () => void;
  toggleSelectBookmark: (id: string) => void;
  clearSelectedBookmarks: () => void;
  bulkMoveToTrash: () => void;
  bulkMoveToArchive: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

interface BookmarkProviderProps {
  children: ReactNode;
  initialBookmarks?: Bookmark[];
}

// Sample bookmark data
const INITIAL_BOOKMARKS: Bookmark[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Web Development in 2025',
    url: 'https://webdev.example.com/guide2025',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000',
    domain: 'webdev.example.com',
    description: 'Complete guide to modern web development'
  },
  {
    id: '2',
    title: 'How to Master React Hooks: Advanced Techniques',
    url: 'https://reactjs.org/advanced-hooks',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
    domain: 'reactjs.org',
    description: 'Advanced React hooks techniques and patterns'
  },
  {
    id: '3',
    title: 'Productivity Tips for Remote Developers',
    url: 'https://productivity.dev/remote-tips',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
    domain: 'productivity.dev',
    description: 'Tips to boost productivity while working remotely'
  },
  {
    id: '4',
    title: 'Building Scalable Backend Systems with Node.js',
    url: 'https://nodejs.org/scalable-systems',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000',
    domain: 'nodejs.org',
    description: 'Learn to build scalable backend architectures'
  },
  {
    id: '5',
    title: 'Design Patterns Every Developer Should Know',
    url: 'https://patterns.dev/essential',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    domain: 'patterns.dev',
    description: 'Essential design patterns for software development'
  },
  {
    id: '6',
    title: '10 VS Code Extensions That Will Change Your Life',
    url: 'https://vscode.tips/top-extensions',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000',
    domain: 'vscode.tips',
    description: 'Must-have VS Code extensions for developers'
  },
];

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ 
  children, 
  initialBookmarks = INITIAL_BOOKMARKS 
}) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [trashBookmarks, setTrashBookmarks] = useState<Bookmark[]>([]);
  const [archiveBookmarks, setArchiveBookmarks] = useState<Bookmark[]>([]);
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter bookmarks based on search query
  const filteredBookmarks = useMemo(() => {
    if (!searchQuery.trim()) {
      return bookmarks;
    }
    
    return bookmarks.filter(bookmark =>
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bookmarks, searchQuery]);
  
  const moveToTrash = (id: string) => {
    const bookmarkToTrash = bookmarks.find(b => b.id === id);
    if (bookmarkToTrash) {
      setBookmarks(bookmarks.filter(b => b.id !== id));
      setTrashBookmarks([...trashBookmarks, bookmarkToTrash]);
    }
  };
  
  const restoreFromTrash = (id: string) => {
    const bookmarkToRestore = trashBookmarks.find(b => b.id === id);
    if (bookmarkToRestore) {
      setTrashBookmarks(trashBookmarks.filter(b => b.id !== id));
      setBookmarks([...bookmarks, bookmarkToRestore]);
    }
  };
  
  const moveToArchive = (id: string) => {
    const bookmarkToArchive = bookmarks.find(b => b.id === id);
    if (bookmarkToArchive) {
      setBookmarks(bookmarks.filter(b => b.id !== id));
      setArchiveBookmarks([...archiveBookmarks, bookmarkToArchive]);
    }
  };
  
  const restoreFromArchive = (id: string) => {
    const bookmarkToRestore = archiveBookmarks.find(b => b.id === id);
    if (bookmarkToRestore) {
      setArchiveBookmarks(archiveBookmarks.filter(b => b.id !== id));
      setBookmarks([...bookmarks, bookmarkToRestore]);
    }
  };
  
  const permanentlyDelete = (id: string) => {
    setTrashBookmarks(trashBookmarks.filter(b => b.id !== id));
  };
  
  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    if (isSelectMode) {
      setSelectedBookmarks([]);
    }
  };
  
  const toggleSelectBookmark = (id: string) => {
    if (selectedBookmarks.includes(id)) {
      setSelectedBookmarks(selectedBookmarks.filter(bookmarkId => bookmarkId !== id));
    } else {
      setSelectedBookmarks([...selectedBookmarks, id]);
    }
  };
  
  const clearSelectedBookmarks = () => {
    setSelectedBookmarks([]);
  };
  
  const bulkMoveToTrash = () => {
    const bookmarksToTrash = bookmarks.filter(bookmark => 
      selectedBookmarks.includes(bookmark.id)
    );
    
    setBookmarks(bookmarks.filter(bookmark => 
      !selectedBookmarks.includes(bookmark.id)
    ));
    
    setTrashBookmarks([...trashBookmarks, ...bookmarksToTrash]);
    setSelectedBookmarks([]);
    setIsSelectMode(false);
  };
  
  const bulkMoveToArchive = () => {
    const bookmarksToArchive = bookmarks.filter(bookmark => 
      selectedBookmarks.includes(bookmark.id)
    );
    
    setBookmarks(bookmarks.filter(bookmark => 
      !selectedBookmarks.includes(bookmark.id)
    ));
    
    setArchiveBookmarks([...archiveBookmarks, ...bookmarksToArchive]);
    setSelectedBookmarks([]);
    setIsSelectMode(false);
  };

  const addBookmark = async (url: string) => {
    const domain = new URL(url).hostname.replace('www.', '');
    const bookmarkId = Date.now().toString();
    
    // Create placeholder bookmark that shows loading state
    const placeholderBookmark: Bookmark = {
      id: bookmarkId,
      title: 'Loading...',
      url: url,
      domain: domain,
      isLoading: true,
      imageUrl: undefined
    };
    
    // Add placeholder immediately for instant feedback
    setBookmarks([placeholderBookmark, ...bookmarks]);
    
    try {
      // Fetch preview data
      const previewData = await linkPreviewService.fetchPreview(url);
      
      // Update with real data
      const finalBookmark: Bookmark = {
        id: bookmarkId,
        title: previewData.title,
        url: previewData.url,
        imageUrl: previewData.image,
        description: previewData.description,
        domain: previewData.domain,
        isLoading: false
      };
      
      setBookmarks(prevBookmarks => 
        prevBookmarks.map(bookmark => 
          bookmark.id === bookmarkId ? finalBookmark : bookmark
        )
      );
      
      // Show success toast
      toast({
        title: "Bookmark added",
        description: `Added "${previewData.title}"`
      });
      
    } catch (error) {
      // Create fallback bookmark on error
      const fallbackBookmark: Bookmark = {
        id: bookmarkId,
        title: domain.charAt(0).toUpperCase() + domain.slice(1),
        url: url,
        domain: domain,
        isLoading: false,
        imageUrl: undefined,
        description: 'Failed to fetch preview'
      };
      
      setBookmarks(prevBookmarks => 
        prevBookmarks.map(bookmark => 
          bookmark.id === bookmarkId ? fallbackBookmark : bookmark
        )
      );
      
      toast({
        title: "Bookmark added",
        description: "Preview could not be fetched",
        variant: "default"
      });
    }
  };
  
  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      filteredBookmarks,
      trashBookmarks,
      archiveBookmarks,
      selectedBookmarks,
      isSelectMode,
      searchQuery,
      setSearchQuery,
      addBookmark,
      moveToTrash,
      restoreFromTrash,
      moveToArchive,
      restoreFromArchive,
      permanentlyDelete,
      toggleSelectMode,
      toggleSelectBookmark,
      clearSelectedBookmarks,
      bulkMoveToTrash,
      bulkMoveToArchive
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarkContext must be used within a BookmarkProvider');
  }
  return context;
};

export default BookmarkProvider;
