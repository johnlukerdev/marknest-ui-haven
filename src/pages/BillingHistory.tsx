import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BillingHistory: React.FC = () => {
  const navigate = useNavigate();

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: '₹315',
      description: 'MarkNest Pro - Annual Subscription',
      status: 'Paid',
      invoiceNumber: 'INV-2024-001',
    },
    {
      id: 2,
      date: '2023-01-15',
      amount: '₹315',
      description: 'MarkNest Pro - Annual Subscription',
      status: 'Paid',
      invoiceNumber: 'INV-2023-001',
    },
    {
      id: 3,
      date: '2022-01-15',
      amount: '₹315',
      description: 'MarkNest Pro - Annual Subscription',
      status: 'Paid',
      invoiceNumber: 'INV-2022-001',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
              <Receipt className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Billing History</h1>
              <p className="text-muted-foreground">View and download your past invoices</p>
            </div>
          </div>
        </div>

        {/* Billing Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-200/20">
                <h3 className="font-semibold text-green-700">Current Plan</h3>
                <p className="text-lg font-bold text-green-800">MarkNest Pro</p>
                <p className="text-sm text-green-600">Active until Jan 15, 2025</p>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-200/20">
                <h3 className="font-semibold text-blue-700">Total Spent</h3>
                <p className="text-lg font-bold text-blue-800">₹945</p>
                <p className="text-sm text-blue-600">Since 2022</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-200/20">
                <h3 className="font-semibold text-purple-700">Payment Method</h3>
                <p className="text-lg font-bold text-purple-800">•••• 4532</p>
                <p className="text-sm text-purple-600">Expires 12/26</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingHistory.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{transaction.description}</h3>
                      <Badge 
                        variant="secondary" 
                        className="bg-green-500/10 text-green-600 border-green-200"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Invoice: {transaction.invoiceNumber}</p>
                      <p>Date: {new Date(transaction.date).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <span className="text-lg font-semibold">{transaction.amount}</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">Need help with billing?</h3>
              <p className="text-muted-foreground">
                Contact our support team if you have questions about your subscription or billing.
              </p>
              <Button variant="outline" className="mt-4">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingHistory;