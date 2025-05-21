
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import ListsSettings from '@/components/settings/ListsSettings';
import AccountSettings from '@/components/settings/AccountSettings';
import AboutSettings from '@/components/settings/AboutSettings';
import NavBar from '@/components/NavBar';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTheme } from '@/hooks/use-theme';
import { useMobile } from '@/hooks/use-mobile';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isMobile = useMobile();
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Get tab from URL or default to "account"
    const tabFromUrl = location.hash.replace('#', '');
    return tabFromUrl || "account";
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

  // Update URL when tab changes
  useEffect(() => {
    const tabFromUrl = location.hash.replace('#', '');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [location.hash, activeTab]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar onAddBookmark={handleAddBookmark} />
      
      <div className="flex flex-1 w-full">
        {/* Settings Sidebar */}
        <SettingsSidebar activeTab={activeTab} onTabChange={handleTabChange} />
        
        {/* Main Content Area */}
        <div className="flex-1 md:px-8 pb-20 md:pb-8 w-full">
          <ScrollArea className={`h-[calc(100vh-${isMobile ? '72px' : '120px'})] ${isMobile ? 'px-4' : 'pr-4'}`}>
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="account" className="mt-0 w-full">
                <AccountSettings />
              </TabsContent>
              <TabsContent value="subscription" className="mt-0 w-full">
                <h2 className="text-2xl font-semibold mb-6">Subscription</h2>
                <p className="text-muted-foreground">Subscription settings will go here.</p>
              </TabsContent>
              <TabsContent value="data" className="mt-0 w-full">
                <h2 className="text-2xl font-semibold mb-6">Data</h2>
                <p className="text-muted-foreground">Data settings will go here.</p>
              </TabsContent>
              <TabsContent value="lists" className="mt-0 w-full">
                <ListsSettings />
              </TabsContent>
              <TabsContent value="tags" className="mt-0 w-full">
                <h2 className="text-2xl font-semibold mb-6">Tags</h2>
                <p className="text-muted-foreground">Tags settings will go here.</p>
              </TabsContent>
              <TabsContent value="misc" className="mt-0 w-full">
                <h2 className="text-2xl font-semibold mb-6">Miscellaneous</h2>
                <p className="text-muted-foreground">Miscellaneous settings will go here.</p>
              </TabsContent>
              <TabsContent value="about" className="mt-0 w-full">
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
