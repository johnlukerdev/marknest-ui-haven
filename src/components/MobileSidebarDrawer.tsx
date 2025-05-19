
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose
} from "@/components/ui/drawer";
import { 
  Home, 
  Trash2, 
  Archive, 
  Settings as SettingsIcon, 
  LogOut, 
  X
} from 'lucide-react';
import { Button } from './ui/button';
import Logo from './Logo';

interface MobileSidebarDrawerProps {
  open: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

const MobileSidebarDrawer: React.FC<MobileSidebarDrawerProps> = ({ open, onClose, onSignOut }) => {
  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DrawerContent className="h-[85vh] max-h-[85vh]">
        <DrawerHeader className="border-b pb-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
            onClick={onClose}
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">My List</span>
          </Link>
          
          <Link
            to="/trash"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
            onClick={onClose}
          >
            <Trash2 className="h-5 w-5" />
            <span className="font-medium">Trash</span>
          </Link>
          
          <Link
            to="/archive"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
            onClick={onClose}
          >
            <Archive className="h-5 w-5" />
            <span className="font-medium">Archive</span>
          </Link>
          
          <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors cursor-pointer">
            <SettingsIcon className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </div>
          
          <div 
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
              onSignOut();
              onClose();
            }}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebarDrawer;
