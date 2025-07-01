
import React, { useState } from 'react';
import { Plus, ArrowUp, ArrowDown, MoreHorizontal, Edit, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ListItem {
  id: string;
  name: string;
  isDefault?: boolean;
}

const ListsSettings: React.FC = () => {
  const [lists, setLists] = useState<ListItem[]>([
    { id: '1', name: 'Default List', isDefault: true },
    { id: '2', name: 'Videos', isDefault: false },
    { id: '3', name: 'Websites', isDefault: false }
  ]);

  const handleCreateList = () => {
    // Will be implemented in future
  };

  const handleEditList = (list: ListItem) => {
    // Will be implemented in future
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
  };

  const handleMoreActions = (list: ListItem) => {
    // Will be implemented in future
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Lists
        </h2>
        <Button 
          onClick={handleCreateList} 
          className="group relative overflow-hidden gradient-purple-blue hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 active:scale-95 rounded-xl px-6 py-2.5 font-medium"
        >
          <div className="relative z-10 flex items-center gap-2">
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
            <span>Add List</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </div>

      {/* Lists Grid */}
      <div className="space-y-3">
        {lists.map((list, index) => (
          <div 
            key={list.id}
            className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 hover:bg-card/80 hover:border-border hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:translate-y-[-1px]"
          >
            {/* Drag Handle - Desktop */}
            <div className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
            </div>

            <div className="flex items-center justify-between md:pl-6">
              {/* List Info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground text-lg">
                    {list.name}
                  </span>
                  {list.isDefault && (
                    <Badge 
                      variant="secondary" 
                      className="w-fit gradient-muted text-muted-foreground border-0 text-xs font-medium"
                    >
                      Default
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Edit Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEditList(list)}
                  className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 hover:scale-105"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                {/* Mobile: Stack vertically, Desktop: Horizontal */}
                <div className="flex md:flex-row flex-col gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => moveList(index, 'up')}
                    disabled={index === 0}
                    className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => moveList(index, 'down')}
                    disabled={index === lists.length - 1}
                    className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* More Actions Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 hover:scale-105"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 bg-card/95 backdrop-blur-lg border-border/50 shadow-xl rounded-xl animate-scale-in"
                  >
                    <DropdownMenuItem 
                      onClick={() => handleMoreActions(list)}
                      className="rounded-lg m-1 hover:bg-muted/60 transition-colors duration-200"
                    >
                      Set as default
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleMoreActions(list)}
                      className="rounded-lg m-1 hover:bg-muted/60 transition-colors duration-200"
                    >
                      Duplicate list
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleMoreActions(list)}
                      className="rounded-lg m-1 hover:bg-destructive/10 text-destructive hover:text-destructive transition-colors duration-200"
                    >
                      Delete list
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsSettings;
