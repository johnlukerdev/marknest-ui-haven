
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  trashBookmarks: Bookmark[];
  archiveBookmarks: Bookmark[];
  moveToTrash: (id: string) => void;
  restoreFromTrash: (id: string) => void;
  moveToArchive: (id: string) => void;
  restoreFromArchive: (id: string) => void;
  permanentlyDelete: (id: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

interface BookmarkProviderProps {
  children: ReactNode;
  initialBookmarks?: Bookmark[];
}

// Sample bookmark data
const INITIAL_BOOKMARKS = [
  {
    id: '1',
    title: 'The Ultimate Guide to Web Development in 2025',
    url: 'https://webdev.example.com/guide2025',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'How to Master React Hooks: Advanced Techniques',
    url: 'https://reactjs.org/advanced-hooks',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'Productivity Tips for Remote Developers',
    url: 'https://productivity.dev/remote-tips',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '4',
    title: 'Building Scalable Backend Systems with Node.js',
    url: 'https://nodejs.org/scalable-systems',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '5',
    title: 'Design Patterns Every Developer Should Know',
    url: 'https://patterns.dev/essential',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '6',
    title: '10 VS Code Extensions That Will Change Your Life',
    url: 'https://vscode.tips/top-extensions',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000'
  },
];

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ 
  children, 
  initialBookmarks = INITIAL_BOOKMARKS 
}) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [trashBookmarks, setTrashBookmarks] = useState<Bookmark[]>([]);
  const [archiveBookmarks, setArchiveBookmarks] = useState<Bookmark[]>([]);
  
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
  
  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      trashBookmarks,
      archiveBookmarks,
      moveToTrash,
      restoreFromTrash,
      moveToArchive,
      restoreFromArchive,
      permanentlyDelete
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
