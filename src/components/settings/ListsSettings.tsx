
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreateList = () => {
    const newId = (lists.length + 1).toString();
    const newList: ListItem = {
      id: newId,
      name: `New List ${newId}`,
      isDefault: false
    };
    setLists([...lists, newList]);
    setEditingId(newId);
    setEditingName(newList.name);
    toast({
      title: "List created",
      description: "Your new list has been created successfully.",
    });
  };

  const handleEditStart = (list: ListItem) => {
    setEditingId(list.id);
    setEditingName(list.name);
  };

  const handleEditSave = (id: string) => {
    if (editingName.trim()) {
      setLists(lists.map(list => 
        list.id === id ? { ...list, name: editingName.trim() } : list
      ));
      toast({
        title: "List renamed",
        description: "Your list has been renamed successfully.",
      });
    }
    setEditingId(null);
    setEditingName('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleDelete = (id: string) => {
    setLists(lists.filter(list => list.id !== id));
    setShowDeleteConfirm(null);
    toast({
      title: "List deleted",
      description: "Your list has been deleted successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Lists
          </h2>
          <p className="text-muted-foreground mt-1">
            Organize your bookmarks with custom lists
          </p>
        </div>
        <Button 
          onClick={handleCreateList} 
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add List</span>
        </Button>
      </div>

      {/* Lists Grid */}
      <div className="grid gap-4">
        {lists.map((list) => (
          <Card 
            key={list.id}
            className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* List Name */}
                  {editingId === list.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEditSave(list.id);
                          if (e.key === 'Escape') handleEditCancel();
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleEditSave(list.id)}
                        className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleEditCancel}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-lg text-foreground truncate">
                          {list.name}
                        </h3>
                        {list.isDefault && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                              Default List
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Cannot be renamed or deleted
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {!list.isDefault && editingId !== list.id && (
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditStart(list)}
                      className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    
                    <Dialog open={showDeleteConfirm === list.id} onOpenChange={(open) => setShowDeleteConfirm(open ? list.id : null)}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Delete List</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete "{list.name}"? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-3 mt-6">
                          <Button
                            variant="outline"
                            onClick={() => setShowDeleteConfirm(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(list.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
            
            {/* Subtle bottom border for visual separation */}
            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {lists.length === 1 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No custom lists yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first custom list to organize your bookmarks
          </p>
          <Button onClick={handleCreateList} className="px-8">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First List
          </Button>
        </div>
      )}
    </div>
  );
};

export default ListsSettings;
