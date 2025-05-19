
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
import { Trash2, RotateCcw } from 'lucide-react';

const Trash: React.FC = () => {
  const { trashBookmarks, restoreFromTrash, permanentlyDelete } = useBookmarkContext();

  const handleRestore = (id: string, title: string) => {
    restoreFromTrash(id);
    toast({
      title: "Bookmark restored",
      description: `"${title}" has been restored to your bookmarks`
    });
  };

  const handleDeletePermanently = (id: string, title: string) => {
    permanentlyDelete(id);
    toast({
      title: "Bookmark deleted permanently",
      description: `"${title}" has been permanently removed`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar onAddBookmark={() => {}} />
      <main className="pt-8">
        <div className="container py-12 px-6 sm:px-8 mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Trash</h1>
            <p className="text-muted-foreground">Items in the trash will be automatically deleted after 30 days.</p>
          </div>

          {trashBookmarks.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Trash is empty</h2>
              <p className="text-muted-foreground">Items you delete will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {trashBookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="overflow-hidden hover-scale group card-enter flex flex-col h-full">
                  <div className="relative h-40 w-full overflow-hidden">
                    <img 
                      src={bookmark.imageUrl} 
                      alt={bookmark.title} 
                      className="h-full w-full object-cover opacity-70"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/40"></div>
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <h3 className="mb-1 line-clamp-2 font-medium text-muted-foreground">{bookmark.title}</h3>
                    <p className="text-sm text-muted-foreground/70 mt-1 truncate">{new URL(bookmark.url).hostname}</p>
                  </CardContent>
                  <CardFooter className="border-t p-4 pt-3 flex justify-between items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 transition-all duration-200"
                      onClick={() => handleRestore(bookmark.id, bookmark.title)}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Restore
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="flex-1 transition-all duration-200"
                      onClick={() => handleDeletePermanently(bookmark.id, bookmark.title)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
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

export default Trash;
