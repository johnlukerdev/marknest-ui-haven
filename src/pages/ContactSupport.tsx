import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail, MessageCircle, Bug, Lightbulb, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactSupport = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const categories = [
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'bg-red-500' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'bg-yellow-500' },
    { id: 'help', label: 'General Help', icon: HelpCircle, color: 'bg-blue-500' },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle, color: 'bg-green-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the form data to your support system
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Contact Support</h1>
            <p className="text-muted-foreground">
              We're here to help! Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Send us a message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Button
                          key={category.id}
                          type="button"
                          variant={formData.category === category.id ? "default" : "outline"}
                          onClick={() => handleInputChange('category', category.id)}
                          className="justify-start h-auto p-3"
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {category.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Please describe your issue or question in detail..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ and Quick Help */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
                <CardDescription>
                  Common issues and solutions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-1">Can't access my bookmarks?</h4>
                    <p className="text-sm text-muted-foreground">
                      Make sure you're using the correct secret key. Check your password manager or written backup.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-1">Lost my secret key</h4>
                    <p className="text-sm text-muted-foreground">
                      Unfortunately, we cannot recover lost secret keys as they're encrypted locally. You'll need to create a new account.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-1">Bookmark not saving</h4>
                    <p className="text-sm text-muted-foreground">
                      Check your internet connection and try again. Clear your browser cache if the issue persists.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bug Reports</span>
                  <Badge variant="destructive">4-8 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">General Support</span>
                  <Badge variant="secondary">12-24 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feature Requests</span>
                  <Badge variant="outline">1-3 days</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  For urgent issues or business inquiries, you can also reach us at:
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Email:</strong> support@bookmarkapp.com
                  </p>
                  <p className="text-sm">
                    <strong>Business:</strong> business@bookmarkapp.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;