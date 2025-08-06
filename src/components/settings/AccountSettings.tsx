
import React, { useState } from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const AccountSettings: React.FC = () => {
  const [confirmValue, setConfirmValue] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "If this were a real app, your account would be deleted.",
      variant: "destructive",
    });
    setShowDialog(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Account Settings</h2>

      {/* Delete Account Section */}
      <Card className="border-destructive/20">
        <CardHeader className="border-b border-destructive/20">
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>
            We're sorry to see you go. Before you delete your account, please read the information below carefully.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">What happens when you delete your account?</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>All your saved bookmarks, tags, and settings will be permanently deleted.</li>
                  <li>You will lose access immediately.</li>
                  <li>This action is irreversible — we can't recover your data after deletion.</li>
                  <li>Your email and login details will be fully removed from our system.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">Privacy First</h3>
                <p className="text-muted-foreground">
                  We do not store any of your personal data once you delete your account. 
                  Everything is erased — no tracking, no backups, no hidden storage.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Consider before deleting:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Want to take a break? Just log out — your data will be safe.</li>
                <li>You can archive bookmarks instead of deleting them.</li>
                <li>Having an issue? <Button variant="link" className="p-0 h-auto" onClick={() => window.location.href = '/contact-support'}>Contact support</Button> — we'd love to help.</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <h3 className="font-medium mb-3">Ready to delete?</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            If you're sure, click the button below.
            You may be asked to confirm your password for security reasons.
          </p>
          <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete My Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Your account and all your data will be permanently deleted.
                  <div className="mt-4">
                    <label htmlFor="confirm-delete" className="block text-sm font-medium mb-2">
                      To confirm, type "DELETE" below:
                    </label>
                    <Input 
                      id="confirm-delete"
                      value={confirmValue}
                      onChange={(e) => setConfirmValue(e.target.value)}
                      placeholder="Type DELETE to confirm"
                      className="mb-2"
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={confirmValue !== 'DELETE'}
                  onClick={handleDeleteAccount}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountSettings;
