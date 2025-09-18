
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Globe, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

const DataSettings: React.FC = () => {
  const handleDataAction = (action: string) => {
    toast({
      title: `${action} initiated`,
      description: `Your ${action.toLowerCase()} request is being processed.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Database className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Manage Your Data</h2>
          <p className="text-muted-foreground">Everything you've stored, all in one place.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-blue-500" />
              Access Data Server
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect to your cloud data server for real-time syncing.
            </p>
            <Button 
              className="w-full"
              onClick={() => handleDataAction('Server Access')}
            >
              🌐 Connect Server
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="h-5 w-5 text-green-500" />
              Import Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your bookmarks from other apps or backup files.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleDataAction('Data Import')}
            >
              📥 Import Files
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Download className="h-5 w-5 text-purple-500" />
              Export All Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Download a complete backup of all your saved content.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleDataAction('Data Export')}
            >
              📤 Export Data
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-red-200/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete All Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently remove all your data. This action cannot be undone.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="w-full"
                >
                  ❌ Delete Everything
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Delete All Data
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-left">
                    Are you absolutely sure you want to delete all your data? This action is permanent and cannot be undone. All your bookmarks, lists, tags, and saved content will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                  <AlertDialogCancel className="w-full sm:w-auto">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    onClick={() => handleDataAction('Data Deletion')}
                  >
                    Delete Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>

      <Alert className="border-yellow-200/30 bg-yellow-500/5">
        <AlertDescription>
          💡 <strong>Tip:</strong> Regular exports help keep your data safe. We recommend exporting your data monthly.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DataSettings;
