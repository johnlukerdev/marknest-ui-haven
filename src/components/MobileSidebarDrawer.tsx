
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  ListIcon, 
  Trash2, 
  Archive, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react";
import { useTheme } from '@/hooks/use-theme';

interface MobileSidebarDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileSidebarDrawer: React.FC<MobileSidebarDrawerProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleNavigation = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  const handleSignOut = () => {
    navigate('/signin');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[260px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-left mb-4">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 mt-2">
          <Button 
            variant="ghost" 
            className="justify-start px-2 py-6" 
            onClick={() => handleNavigation('/')}
          >
            <ListIcon className="mr-3 h-5 w-5" />
            My List
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start px-2 py-6" 
            onClick={() => handleNavigation('/trash')}
          >
            <Trash2 className="mr-3 h-5 w-5" />
            Trash
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start px-2 py-6" 
            onClick={() => handleNavigation('/archive')}
          >
            <Archive className="mr-3 h-5 w-5" />
            Archive
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start px-2 py-6" 
            onClick={() => handleNavigation('/settings')}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start px-2 py-6" 
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebarDrawer;
