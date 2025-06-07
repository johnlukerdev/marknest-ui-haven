
import React, { useState } from 'react';
import { User, CreditCard, Database, Tags, Settings, Info, List, X, Menu } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerClose } from '@/components/ui/drawer';

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { id: 'about', label: 'About', icon: <Info className="h-4 w-4" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'data', label: 'Data', icon: <Database className="h-4 w-4" /> },
    { id: 'lists', label: 'Lists', icon: <List className="h-4 w-4" /> },
    { id: 'tags', label: 'Tags', icon: <Tags className="h-4 w-4" /> },
    { id: 'misc', label: 'Misc.', icon: <Settings className="h-4 w-4" /> },
    { id: 'account', label: 'Account', icon: <User className="h-4 w-4" /> },
  ];

  const handleItemClick = (id: string) => {
    onTabChange(id);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Desktop sidebar
  if (!isMobile) {
    return (
      <aside className="hidden md:flex flex-col w-56 border-r border-border p-4 h-[calc(100vh-120px)]">
        <h3 className="font-medium text-sm mb-4 text-muted-foreground px-2">SETTINGS</h3>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    );
  }

  // Mobile - only show floating menu button, no top bar
  return (
    <>
      {/* Floating menu button for mobile */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-20 left-4 z-50 md:hidden shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[85vh]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-sm text-muted-foreground">SETTINGS</h3>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SettingsSidebar;
