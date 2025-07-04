
import React, { useState } from 'react';
import { User, CreditCard, Database, Tags, Settings, Info, List, X, Home, ArrowLeft } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { useNavigate } from 'react-router-dom';

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
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
        {/* Home Button */}
        <div className="mb-6">
          <Button
            onClick={() => navigate('/')}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 rounded-full px-4 py-2 h-10 w-fit transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95"
          >
            <div className="relative z-10 flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium">Home</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
        
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

  // Mobile - no hamburger button, just the drawer
  return (
    <>
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
              {/* Home Button - Mobile Only */}
              <button
                onClick={() => navigate('/')}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 rounded-full px-4 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95 w-full flex items-center justify-center space-x-3"
              >
                <div className="relative z-10 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span className="text-sm font-medium">Home</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
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
