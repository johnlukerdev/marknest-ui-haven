
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, CreditCard, Database, Tags, Settings as SettingsIcon, Info, List } from 'lucide-react';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import ListsSettings from '@/components/settings/ListsSettings';
import AccountSettings from '@/components/settings/AccountSettings';
import AboutSettings from '@/components/settings/AboutSettings';
import SubscriptionSettings from '@/components/settings/SubscriptionSettings';
import DataSettings from '@/components/settings/DataSettings';
import TagsSettings from '@/components/settings/TagsSettings';
import MiscSettings from '@/components/settings/MiscSettings';
import NavBar from '@/components/NavBar';
import { useTheme } from '@/hooks/use-theme';
import { useMobile } from '@/hooks/use-mobile';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isMobile = useMobile();
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Get tab from URL or default to "about"
    const tabFromUrl = location.hash.replace('#', '');
    return tabFromUrl || "about";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'about', label: 'About', icon: <Info className="h-4 w-4" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'data', label: 'Data', icon: <Database className="h-4 w-4" /> },
    { id: 'lists', label: 'Lists', icon: <List className="h-4 w-4" /> },
    { id: 'tags', label: 'Tags', icon: <Tags className="h-4 w-4" /> },
    { id: 'misc', label: 'Misc.', icon: <SettingsIcon className="h-4 w-4" /> },
    { id: 'account', label: 'Account', icon: <User className="h-4 w-4" /> },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/settings#${tab}`, { replace: true });
    setMobileMenuOpen(false);
  };

  const handleAddBookmark = (url: string) => {
    // Functionality remains but toast removed
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
      {/* Show NavBar on both desktop and mobile */}
      <NavBar 
        onAddBookmark={handleAddBookmark} 
        onMobileMenuToggle={() => setMobileMenuOpen(true)} 
      />
      
      {/* Mobile/Tablet Floating Hamburger Button */}
      {isMobile && (
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 h-12 w-12 bg-transparent hover:bg-muted/20 text-white transition-all duration-200 rounded-md md:hidden"
            >
              <Menu className="h-7 w-7" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6">SETTINGS</h2>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    variant="ghost"
                    className={`w-full justify-start text-left p-3 h-auto ${
                      activeTab === item.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Button>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      )}
      
      <div className={`flex flex-1 w-full ${isMobile ? 'pt-16' : ''}`}>
        {/* Settings Sidebar - Desktop only */}
        {!isMobile && <SettingsSidebar activeTab={activeTab} onTabChange={handleTabChange} />}
        
        {/* Main Content Area - Full width on mobile */}
        <div className={`flex-1 w-full ${isMobile ? '' : 'border-l border-border'}`}>
          <ScrollArea className={`h-[calc(100vh-${isMobile ? '64px' : '120px'})] w-full px-4 md:px-8`}>
            {/* Remove extra top padding on mobile since we now have fixed navbar */}
            <div className="pt-4">
              <Tabs value={activeTab} className="w-full max-w-full">
                <TabsContent value="about" className="mt-0 w-full">
                  <AboutSettings />
                </TabsContent>
                <TabsContent value="subscription" className="mt-0 w-full">
                  <SubscriptionSettings />
                </TabsContent>
                <TabsContent value="data" className="mt-0 w-full">
                  <DataSettings />
                </TabsContent>
                <TabsContent value="lists" className="mt-0 w-full">
                  <ListsSettings />
                </TabsContent>
                <TabsContent value="tags" className="mt-0 w-full">
                  <TagsSettings />
                </TabsContent>
                <TabsContent value="misc" className="mt-0 w-full">
                  <MiscSettings />
                </TabsContent>
                <TabsContent value="account" className="mt-0 w-full">
                  <AccountSettings />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Settings;
