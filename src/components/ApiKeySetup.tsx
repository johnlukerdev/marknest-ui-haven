import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Key, Info } from "lucide-react";
import { linkPreviewService } from "@/services/linkPreviewService";

interface ApiKeySetupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onKeySet: () => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ open, onOpenChange, onKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [hasExistingKey, setHasExistingKey] = useState(false);

  useEffect(() => {
    if (open) {
      const existingKey = linkPreviewService.getApiKey();
      setHasExistingKey(!!existingKey);
      setApiKey('');
    }
  }, [open]);

  const handleSave = () => {
    if (apiKey.trim()) {
      linkPreviewService.setApiKey(apiKey.trim());
      onKeySet();
      onOpenChange(false);
    }
  };

  const handleRemove = () => {
    linkPreviewService.clearApiKey();
    setHasExistingKey(false);
    onKeySet();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Key Setup
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              To enable rich bookmark previews, you need a free API key from LinkPreview.net or use the free Microlink.io service.
            </AlertDescription>
          </Alert>

          {hasExistingKey && (
            <Alert>
              <AlertDescription className="text-green-600 dark:text-green-400">
                ✓ API key is already configured
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Label htmlFor="apiKey">LinkPreview.net API Key (Optional)</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Get a free API key at{' '}
              <a 
                href="https://my.linkpreview.net/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                LinkPreview.net
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            {hasExistingKey && (
              <Button
                variant="outline"
                onClick={handleRemove}
                className="text-destructive hover:text-destructive"
              >
                Remove Key
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {hasExistingKey ? 'Cancel' : 'Skip for Now'}
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!apiKey.trim()}
            >
              Save Key
            </Button>
          </div>
          
          <Alert>
            <AlertDescription className="text-xs">
              Without an API key, bookmarks will use fallback previews. Your API key is stored locally in your browser.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySetup;