
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Globe, Download, Upload, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
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
import { useBookmarkContext } from '@/hooks/useBookmarkContext';

const DataSettings: React.FC = () => {
  const { bookmarks, trashBookmarks, archiveBookmarks } = useBookmarkContext();
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [exportStats, setExportStats] = useState<{
    totalBookmarks: number;
    activeBookmarks: number;
    archivedBookmarks: number;
    trashedBookmarks: number;
  } | null>(null);

  const handleDataAction = (action: string) => {
    toast({
      title: `${action} initiated`,
      description: `Your ${action.toLowerCase()} request is being processed.`,
      duration: 3000,
    });
  };

  const generateExportData = () => {
    const activeCount = bookmarks.length;
    const archivedCount = archiveBookmarks.length;
    const trashedCount = trashBookmarks.length;
    const totalCount = activeCount + archivedCount + trashedCount;
    
    const exportDate = new Date().toISOString().split('T')[0];
    
    let exportContent = `BOOKMARK DATA EXPORT\n`;
    exportContent += `Generated on: ${exportDate}\n`;
    exportContent += `=====================================\n\n`;
    
    exportContent += `EXPORT SUMMARY\n`;
    exportContent += `Total Bookmarks: ${totalCount}\n`;
    exportContent += `Active Bookmarks: ${activeCount}\n`;
    exportContent += `Archived Bookmarks: ${archivedCount}\n`;
    exportContent += `Trashed Bookmarks: ${trashedCount}\n\n`;
    
    if (activeCount > 0) {
      exportContent += `ACTIVE BOOKMARKS (${activeCount})\n`;
      exportContent += `=====================================\n`;
      bookmarks.forEach((bookmark, index) => {
        exportContent += `${index + 1}. ${bookmark.title}\n`;
        exportContent += `   URL: ${bookmark.url}\n`;
        exportContent += `   Domain: ${bookmark.domain}\n`;
        if (bookmark.description) {
          exportContent += `   Description: ${bookmark.description}\n`;
        }
        exportContent += `\n`;
      });
    }
    
    if (archivedCount > 0) {
      exportContent += `ARCHIVED BOOKMARKS (${archivedCount})\n`;
      exportContent += `=====================================\n`;
      archiveBookmarks.forEach((bookmark, index) => {
        exportContent += `${index + 1}. ${bookmark.title}\n`;
        exportContent += `   URL: ${bookmark.url}\n`;
        exportContent += `   Domain: ${bookmark.domain}\n`;
        if (bookmark.description) {
          exportContent += `   Description: ${bookmark.description}\n`;
        }
        exportContent += `\n`;
      });
    }
    
    if (trashedCount > 0) {
      exportContent += `TRASHED BOOKMARKS (${trashedCount})\n`;
      exportContent += `=====================================\n`;
      trashBookmarks.forEach((bookmark, index) => {
        exportContent += `${index + 1}. ${bookmark.title}\n`;
        exportContent += `   URL: ${bookmark.url}\n`;
        exportContent += `   Domain: ${bookmark.domain}\n`;
        if (bookmark.description) {
          exportContent += `   Description: ${bookmark.description}\n`;
        }
        exportContent += `\n`;
      });
    }
    
    return {
      content: exportContent,
      stats: {
        totalBookmarks: totalCount,
        activeBookmarks: activeCount,
        archivedBookmarks: archivedCount,
        trashedBookmarks: trashedCount
      }
    };
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportComplete(false);
    
    // Simulate export process with delay for UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { content, stats } = generateExportData();
    const filename = `bookmarks-export-${new Date().toISOString().split('T')[0]}.txt`;
    
    downloadFile(content, filename);
    
    setExportStats(stats);
    setIsExporting(false);
    setExportComplete(true);
    
    toast({
      title: "Export completed successfully!",
      description: `Downloaded ${stats.totalBookmarks} bookmarks as ${filename}`,
      duration: 5000,
    });
  };

  const resetExportState = () => {
    setExportComplete(false);
    setExportStats(null);
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  📤 Export Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-semibold mb-4">
                    {exportComplete ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        Export Complete
                      </span>
                    ) : (
                      "Export All Data"
                    )}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-left space-y-4">
                    {exportComplete ? (
                      <div className="space-y-3">
                        <p className="text-base text-green-600 font-medium">
                          ✓ Your data has been successfully exported!
                        </p>
                        {exportStats && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                            <p className="text-sm font-medium text-green-800">Export Summary:</p>
                            <div className="text-sm text-green-700 space-y-1">
                              <div>Total Items: {exportStats.totalBookmarks}</div>
                              <div>Active Bookmarks: {exportStats.activeBookmarks}</div>
                              <div>Archived: {exportStats.archivedBookmarks}</div>
                              <div>Trash: {exportStats.trashedBookmarks}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : isExporting ? (
                      <div className="space-y-3">
                        <p className="text-base text-blue-600 font-medium">
                          🔄 Exporting your data...
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-700">
                            Please wait while we prepare your data for download. This may take a few moments.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-base text-muted-foreground">
                          Export all your data from the server to your device as a text file.
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                          <p className="text-sm font-medium text-gray-800">Your Data Summary:</p>
                          <div className="text-sm text-gray-700 space-y-1">
                            <div>Active Bookmarks: {bookmarks.length}</div>
                            <div>Archived: {archiveBookmarks.length}</div>
                            <div>Trash: {trashBookmarks.length}</div>
                            <div className="font-medium">Total: {bookmarks.length + archiveBookmarks.length + trashBookmarks.length}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          It may take several minutes to export all your data.
                        </p>
                      </>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-6">
                  {exportComplete ? (
                    <AlertDialogCancel onClick={resetExportState} className="w-full">
                      Close
                    </AlertDialogCancel>
                  ) : (
                    <>
                      <AlertDialogCancel className="w-full sm:w-auto" disabled={isExporting}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="w-full sm:w-auto bg-transparent border border-input text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                        onClick={handleExport}
                        disabled={isExporting}
                      >
                        {isExporting ? "Exporting..." : "Export All My Data"}
                      </AlertDialogAction>
                    </>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
