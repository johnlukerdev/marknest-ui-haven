
import React, { useState } from 'react';
import { Plus, ArrowUp, ArrowDown, MoreHorizontal, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

interface ListItem {
  id: string;
  name: string;
  isDefault?: boolean;
}

const ListsSettings: React.FC = () => {
  const [lists, setLists] = useState<ListItem[]>([
    { id: '1', name: 'My List', isDefault: true },
    { id: '2', name: 'Archive' },
    { id: '3', name: 'Trash' }
  ]);

  const handleCreateList = () => {
    toast({
      title: "New List",
      description: "This would open a dialog to create a new list"
    });
  };

  const handleEditList = (list: ListItem) => {
    toast({
      title: "Edit List",
      description: `Editing ${list.name}`
    });
  };

  const moveList = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === lists.length - 1)
    ) {
      return;
    }

    const newLists = [...lists];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newLists[index], newLists[targetIndex]] = [newLists[targetIndex], newLists[index]];
    
    setLists(newLists);
    toast({
      title: "List Reordered",
      description: `${lists[index].name} moved ${direction}`
    });
  };

  const handleMoreActions = (list: ListItem) => {
    toast({
      title: "More Actions",
      description: `Options for ${list.name}`
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Lists</h2>
        <Button onClick={handleCreateList} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Create New List
        </Button>
      </div>

      <div className="space-y-2">
        {lists.map((list, index) => (
          <div 
            key={list.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="font-medium">{list.name}</span>
              {list.isDefault && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  Default
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleEditList(list)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => moveList(index, 'up')}
                disabled={index === 0}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => moveList(index, 'down')}
                disabled={index === lists.length - 1}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 animate-scale-in">
                  <DropdownMenuItem onClick={() => handleMoreActions(list)}>
                    Set as default
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleMoreActions(list)}>
                    Duplicate list
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleMoreActions(list)}
                    className="text-destructive"
                  >
                    Delete list
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsSettings;
