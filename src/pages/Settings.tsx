
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import ListsSettings from '@/components/settings/ListsSettings';
import AboutSettings from '@/components/settings/AboutSettings';
import NavBar from '@/components/NavBar';
import { toast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Get tab from URL or default to "lists"
    const tabFromUrl = location.hash.replace('#', '');
    return tabFromUrl || "lists";
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/settings#${tab}`, { replace: true });
  };

  const handleAddBookmark = (url: string) => {
    toast({
      title: "Bookmark added",
      description: `Added bookmark: ${url}`
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar onAddBookmark={handleAddBookmark} />
      
      <div className="flex flex-1 pt-4 md:pt-8">
        {/* Settings Sidebar */}
        <SettingsSidebar activeTab={activeTab} onTabChange={handleTabChange} />
        
        {/* Main Content Area */}
        <div className="flex-1 px-4 md:px-8 pb-20 md:pb-8">
          <ScrollArea className="h-[calc(100vh-120px)] pr-4">
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="lists" className="mt-0">
                <ListsSettings />
              </TabsContent>
              <TabsContent value="account" className="mt-0">
                <h2 className="text-2xl font-semibold mb-6">Account</h2>
                <p className="text-muted-foreground">Account settings will go here.</p>
              </TabsContent>
              <TabsContent value="subscription" className="mt-0">
                <h2 className="text-2xl font-semibold mb-6">Subscription</h2>
                <p className="text-muted-foreground">Subscription settings will go here.</p>
              </TabsContent>
              <TabsContent value="data" className="mt-0">
                <h2 className="text-2xl font-semibold mb-6">Data</h2>
                <p className="text-muted-foreground">Data settings will go here.</p>
              </TabsContent>
              <TabsContent value="tags" className="mt-0">
                <h2 className="text-2xl font-semibold mb-6">Tags</h2>
                <p className="text-muted-foreground">Tags settings will go here.</p>
              </TabsContent>
              <TabsContent value="misc" className="mt-0">
                <h2 className="text-2xl font-semibold mb-6">Miscellaneous</h2>
                <p className="text-muted-foreground">Miscellaneous settings will go here.</p>
              </TabsContent>
              <TabsContent value="about" className="mt-0">
                <AboutSettings />
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Settings;
