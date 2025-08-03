import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, CreditCard, Calendar, Star, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ManageSubscription: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Up to 100 bookmarks',
        'Basic organization',
        'Web access only',
        'Community support'
      ],
      current: false,
      popular: false,
      buttonText: 'Current Plan',
      buttonVariant: 'outline' as const,
    },
    {
      id: 'pro',
      name: 'MarkNest Pro',
      price: '₹315',
      period: 'year',
      description: 'Everything you need to stay organized',
      features: [
        'Unlimited bookmarks',
        'Advanced tagging & search',
        'Cloud sync across devices',
        'Automatic backups',
        'Priority support',
        'Dark mode',
        'Export/Import data'
      ],
      current: true,
      popular: true,
      buttonText: 'Current Plan',
      buttonVariant: 'default' as const,
    },
    {
      id: 'team',
      name: 'Team',
      price: '₹999',
      period: 'year',
      description: 'For teams and power users',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Shared bookmark collections',
        'Admin dashboard',
        'Custom branding',
        'API access',
        'Advanced analytics'
      ],
      current: false,
      popular: false,
      buttonText: 'Upgrade to Team',
      buttonVariant: 'outline' as const,
    }
  ];

  const handlePlanAction = async (planId: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Plan action for: ${planId}`);
    }, 2000);
  };

  const handleCancelSubscription = () => {
    console.log('Cancel subscription');
  };

  const handleUpdatePayment = () => {
    console.log('Update payment method');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/settings#subscription')}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Manage Subscription</h1>
              <p className="text-muted-foreground">Upgrade, downgrade, or manage your plan</p>
            </div>
          </div>
        </div>

        {/* Current Subscription Info */}
        <Card className="mb-8 border-purple-200/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-500" />
              Your Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">MarkNest Pro</h3>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/10 text-green-600 border-green-200">
                    Active
                  </Badge>
                  <span className="text-sm text-muted-foreground">₹315/year</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Next Billing
                </h4>
                <p className="text-sm text-muted-foreground">January 15, 2025</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Payment Method
                </h4>
                <p className="text-sm text-muted-foreground">•••• •••• •••• 4532</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Comparison */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative transition-all duration-300 hover:shadow-lg ${
                  plan.current ? 'ring-2 ring-purple-500/30 shadow-md' : ''
                } ${plan.popular ? 'border-purple-200/50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">
                      {plan.price}
                      <span className="text-base font-normal text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.current ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                    variant={plan.buttonVariant}
                    onClick={() => handlePlanAction(plan.id)}
                    disabled={plan.current || isLoading}
                  >
                    {isLoading ? 'Processing...' : plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscription Management Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4532</p>
                    <p className="text-sm text-muted-foreground">Expires 12/26</p>
                  </div>
                </div>
                <Badge variant="secondary">Default</Badge>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleUpdatePayment}
              >
                Update Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Download Invoice
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Usage Statistics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Contact Support
              </Button>
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Alert className="border-blue-200/30 bg-blue-500/5">
          <AlertDescription>
            💡 <strong>Need help?</strong> Our support team is here to assist you with any subscription questions. 
            Changes to your subscription will be reflected in your next billing cycle.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ManageSubscription;