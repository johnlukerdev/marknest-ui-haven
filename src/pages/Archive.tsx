
import React from 'react';
import NavBar from '@/components/NavBar';
import { useBookmarkContext } from '@/hooks/useBookmarkContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { toast } from '@/hooks/use-toast';
import { Archive as ArchiveIcon, RotateCcw } from 'lucide-react';

const Archive: React.FC = () => {
  const { archiveBookmarks, restoreFromArchive } = useBookmarkContext();

  const handleRestore = (id: string, title: string) => {
    restoreFromArchive(id);
    toast({
      title: "Bookmark restored",
      description: `"${title}" has been restored to your bookmarks`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onAddBookmark={() => {}} />
      <main className="pt-8">
        <div className="container py-12 px-6 sm:px-8 mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Archive</h1>
            <p className="text-muted-foreground">Bookmarks you've archived but might need later.</p>
          </div>

          {archiveBookmarks.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ArchiveIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Archive is empty</h2>
              <p className="text-muted-foreground">Items you archive will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {archiveBookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="overflow-hidden hover-scale group card-enter flex flex-col h-full">
                  <div className="relative h-40 w-full overflow-hidden">
                    <img 
                      src={bookmark.imageUrl} 
                      alt={bookmark.title} 
                      className="h-full w-full object-cover opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/20"></div>
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <h3 className="mb-1 line-clamp-2 font-medium">{bookmark.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 truncate">{new URL(bookmark.url).hostname}</p>
                  </CardContent>
                  <CardFooter className="border-t p-4 pt-3 flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => handleRestore(bookmark.id, bookmark.title)}
                      className="w-full transition-all duration-200"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Restore
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Archive;
