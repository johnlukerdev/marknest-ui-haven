
import React from 'react';
import NavBar from '@/components/NavBar';
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar onAddBookmark={() => {}} />
      <main className="pt-4 sm:pt-8">
        <div className="container py-8 sm:py-12 px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
          <div className="mb-6 sm:mb-8 text-center sm:text-left">
            <h1 className="text-2xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          <div className="text-center py-16">
            <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <SettingsIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Settings Coming Soon</h2>
            <p className="text-muted-foreground mb-4">This feature is under development</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
