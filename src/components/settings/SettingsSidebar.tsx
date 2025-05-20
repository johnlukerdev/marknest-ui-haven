
import React from 'react';
import { User, CreditCard, Database, Tags, Settings, Info, List } from 'lucide-react';

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'account', label: 'Account', icon: <User className="h-4 w-4" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'data', label: 'Data', icon: <Database className="h-4 w-4" /> },
    { id: 'lists', label: 'Lists', icon: <List className="h-4 w-4" /> },
    { id: 'tags', label: 'Tags', icon: <Tags className="h-4 w-4" /> },
    { id: 'misc', label: 'Misc.', icon: <Settings className="h-4 w-4" /> },
    { id: 'about', label: 'About', icon: <Info className="h-4 w-4" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-56 border-r border-border p-4 h-[calc(100vh-120px)]">
      <h3 className="font-medium text-sm mb-4 text-muted-foreground px-2">SETTINGS</h3>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
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
      
      {/* Mobile Settings Navigation (visible on small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-20 p-2">
        <div className="flex justify-around">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-md ${
                activeTab === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SettingsSidebar;
