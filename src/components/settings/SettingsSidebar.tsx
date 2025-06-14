
import React, { useState } from 'react';
import { User, CreditCard, Database, Tags, Settings, Info, List, X } from 'lucide-react';
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

  // Mobile - 3-bar hamburger icon button
  return (
    <>
      {/* 3-bar hamburger menu button for mobile */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden w-12 h-12 rounded-full bg-transparent hover:bg-transparent"
      >
        <div className="flex flex-col gap-1">
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </div>
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[85vh]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg text-foreground">Settings</h3>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </DrawerClose>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl text-sm transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-600 border border-purple-200 font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
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
