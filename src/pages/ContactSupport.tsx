import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Clock } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const ContactSupport: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ContactFormData>();

  const selectedTopic = watch('topic');

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          to: 'johnluker26@gmail.com'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setIsSubmitted(true);
      toast({
        title: "Thanks! We've received your message and will be in touch soon.",
        description: "We usually reply within 24 hours.",
      });
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly at johnluker26@gmail.com",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4">
        <div className="max-w-2xl mx-auto pt-16">
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="text-6xl">✅</div>
              <h1 className="text-2xl font-semibold">Thanks! We've received your message and will be in touch soon.</h1>
              <p className="text-muted-foreground">We usually reply within 24 hours.</p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                Send Another Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-2xl mx-auto pt-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">We're Here to Help</CardTitle>
            <p className="text-center text-muted-foreground mt-4">
              Have a question, ran into an issue, or just need a hand? Fill out the form below and we'll get back to you as soon as we can — usually within 24 hours.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select onValueChange={(value) => setValue('topic', value)} value={selectedTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account-login">Account/Login Issue</SelectItem>
                    <SelectItem value="lost-secret-key">Lost Secret Key</SelectItem>
                    <SelectItem value="feature-request">Feature Request</SelectItem>
                    <SelectItem value="bug-report">Bug Report</SelectItem>
                    <SelectItem value="general-help">General Help</SelectItem>
                  </SelectContent>
                </Select>
                {errors.topic && (
                  <p className="text-sm text-destructive">{errors.topic.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  {...register('message', { required: 'Message is required' })}
                  placeholder="Please describe your question or issue in detail..."
                  className="min-h-[120px]"
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Response Time: We usually reply within 24 hours (excluding weekends).</span>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Request
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Need urgent help? We're not online 24/7 yet, but we're working on adding live chat soon.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactSupport;