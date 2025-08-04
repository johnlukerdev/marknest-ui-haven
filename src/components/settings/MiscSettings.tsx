
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Moon, Sun, Globe, Mail, Bell, Settings } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { toast } from '@/hooks/use-toast';

const MiscSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleSettingChange = (setting: string, value: any) => {
    toast({
      title: "Setting updated",
      description: `${setting} has been changed successfully.`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/10 rounded-lg">
          <Settings className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">More Settings</h2>
          <p className="text-muted-foreground">Extra user preferences and app behavior controls.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">🌙 Dark Mode</p>
              <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => {
                setTheme(checked ? 'dark' : 'light');
                handleSettingChange('Theme', checked ? 'Dark' : 'Light');
              }}
            />
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">🔔 Push Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified about important updates</p>
            </div>
            <Switch
              defaultChecked={false}
              onCheckedChange={(checked) => handleSettingChange('Push Notifications', checked ? 'Enabled' : 'Disabled')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">📱 App Behavior</p>
              <p className="text-sm text-muted-foreground">Auto-save and sync preferences</p>
            </div>
            <Switch
              defaultChecked={true}
              onCheckedChange={(checked) => handleSettingChange('Auto-save', checked ? 'Enabled' : 'Disabled')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            🔄 Reset All Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            🗑️ Clear Cache
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiscSettings;
