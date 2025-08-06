
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tag, Plus, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const TagsSettings: React.FC = () => {
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState([
    { id: 1, name: 'Work', color: 'bg-blue-500', count: 12 },
    { id: 2, name: 'Personal', color: 'bg-green-500', count: 8 },
    { id: 3, name: 'Projects', color: 'bg-purple-500', count: 15 },
    { id: 4, name: 'Finance', color: 'bg-yellow-500', count: 5 },
  ]);

  const handleCreateTag = () => {
    if (newTag.trim()) {
      const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setTags([...tags, {
        id: Date.now(),
        name: newTag.trim(),
        color: randomColor,
        count: 0
      }]);
      
      setNewTag('');
      toast({
        title: "Tag created!",
        description: `"${newTag.trim()}" tag has been added successfully.`,
        duration: 2000,
      });
    }
  };

  const handleDeleteTag = (tagId: number) => {
    setTags(tags.filter(tag => tag.id !== tagId));
    toast({
      title: "Tag deleted",
      description: "Tag has been removed from your collection.",
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6 light:bg-gray-50 dark:bg-transparent p-4 rounded-lg">
        <div className="p-2 bg-green-500/10 rounded-lg">
          <Tag className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Organize with Tags</h2>
          <p className="text-muted-foreground">Sort and manage your saved lists with tags.</p>
        </div>
      </div>

      <Card className="light:bg-gray-50/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Tag
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter tag name (e.g., Work, Personal, Projects)"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateTag()}
              className="flex-1"
            />
            <Button onClick={handleCreateTag} disabled={!newTag.trim()}>
              ➕ Add Tag
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Use examples like Work, Personal, Projects, Finance to organize your bookmarks.
          </p>
        </CardContent>
      </Card>

      <Card className="light:bg-gray-50/70">
        <CardHeader>
          <CardTitle>Your Tags</CardTitle>
        </CardHeader>
        <CardContent>
          {tags.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${tag.color}`}></div>
                    <span className="font-medium">{tag.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {tag.count}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTag(tag.id)}
                    className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Tag className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No tags created yet. Add your first tag above!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TagsSettings;
