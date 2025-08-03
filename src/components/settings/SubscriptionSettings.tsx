
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionSettings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/10 rounded-lg">
          <CreditCard className="h-6 w-6 text-purple-500" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Your Subscription</h2>
          <p className="text-muted-foreground">Stay organized all year long with MarkNest Pro!</p>
        </div>
      </div>

      <Card className="border-purple-200/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            MarkNest Pro
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 border-purple-200">
              Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We charge ₹315/year for access to powerful features like data sync, cloud backups, 
            and early access to new tools. ✨ No hidden fees. Just clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Manage Subscription
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/billing-history')}
            >
              View Billing History
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-3 bg-background/50 rounded-lg border">
              <h4 className="font-medium">🌐 Data Sync</h4>
              <p className="text-sm text-muted-foreground">Access from anywhere</p>
            </div>
            <div className="p-3 bg-background/50 rounded-lg border">
              <h4 className="font-medium">☁️ Cloud Backups</h4>
              <p className="text-sm text-muted-foreground">Never lose your data</p>
            </div>
            <div className="p-3 bg-background/50 rounded-lg border">
              <h4 className="font-medium">⚡ Early Access</h4>
              <p className="text-sm text-muted-foreground">Latest features first</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSettings;
