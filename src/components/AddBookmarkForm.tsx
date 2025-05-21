
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import { DrawerTitle, DrawerHeader } from '@/components/ui/drawer';

interface AddBookmarkFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (url: string) => void;
  drawerMode?: boolean;
}

const AddBookmarkForm: React.FC<AddBookmarkFormProps> = ({ 
  open, 
  onOpenChange, 
  onSubmit,
  drawerMode = false
}) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Clear error when user starts typing
  useEffect(() => {
    if (url.trim() && error) {
      setError(null);
    }
  }, [url, error]);
  
  // Focus the input field when the dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // Small delay to ensure the dialog is fully rendered
    }
  }, [open]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation for empty input
    if (!url || !url.trim()) {
      setError("Please enter a URL");
      inputRef.current?.focus();
      return;
    }
    
    try {
      // Ensure URL has a protocol
      let processedUrl = url.trim();
      if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
        processedUrl = 'https://' + processedUrl;
      }
      
      // Validate URL format
      new URL(processedUrl);
      
      setLoading(true);
      
      // Submit the URL
      onSubmit(processedUrl);
      
      // Reset form and close dialog
      setUrl('');
      setError(null);
      onOpenChange(false);
      
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid web address",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const FormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="url">URL</Label>
        <Input 
          id="url"
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          autoFocus
          ref={inputRef}
          className={`h-12 ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-2 animate-fade-in">
            {error}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          Enter the web address of the page you want to bookmark
        </p>
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setUrl('');
            setError(null);
            onOpenChange(false);
          }}
          className="flex-1 sm:flex-none"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
          className="flex-1 sm:flex-none"
        >
          {loading ? 'Adding...' : 'Add Bookmark'}
        </Button>
      </div>
    </form>
  );
  
  if (drawerMode) {
    return (
      <>
        <div className="drawer-handle"></div>
        <DrawerHeader>
          <DrawerTitle className="text-center text-xl">Add Bookmark</DrawerTitle>
        </DrawerHeader>
        <div className="px-1 py-4">
          <FormContent />
        </div>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Add Bookmark</DialogTitle>
        </DialogHeader>
        <FormContent />
      </DialogContent>
    </Dialog>
  );
};

export default AddBookmarkForm;
