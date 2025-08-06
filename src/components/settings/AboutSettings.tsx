
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const AboutSettings: React.FC = () => {
  return (
    <div className="animate-fade-in w-full pb-16">
      <h2 className="text-2xl font-semibold mb-8">About MarkNest</h2>
      
      <div className="space-y-8 pb-8 w-full">
        <div className="space-y-4 w-full light:bg-gray-50 dark:bg-transparent p-6 rounded-lg">
          <h3 className="text-xl font-medium text-primary">✨ Why MarkNest?</h3>
          <p className="text-muted-foreground leading-relaxed">
            While other bookmark managers get the job done, MarkNest is built for the modern web user — with a clean, 
            intuitive design, powerful features, and a focus on privacy. We go beyond saving links — we help you 
            organize, rediscover, and enjoy your saved content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div className="p-6 rounded-lg border border-border bg-card light:bg-gray-50/70 hover:bg-card/80 transition-colors">
            <h4 className="text-lg font-medium mb-2">🚀 Fast & Simple</h4>
            <p className="text-muted-foreground">
              Save, search, and manage with just a few clicks.
            </p>
          </div>
          
          <div className="p-6 rounded-lg border border-border bg-card light:bg-gray-50/70 hover:bg-card/80 transition-colors">
            <h4 className="text-lg font-medium mb-2">🎨 Modern UI</h4>
            <p className="text-muted-foreground">
              Clean, responsive design with light/dark mode.
            </p>
          </div>
          
          <div className="p-6 rounded-lg border border-border bg-card light:bg-gray-50/70 hover:bg-card/80 transition-colors">
            <h4 className="text-lg font-medium mb-2">🧠 Smart Features</h4>
            <p className="text-muted-foreground">
              Archive, trash, image previews, tagging, search, and more.
            </p>
          </div>
          
          <div className="p-6 rounded-lg border border-border bg-card light:bg-gray-50/70 hover:bg-card/80 transition-colors">
            <h4 className="text-lg font-medium mb-2">🔒 Private & Secure</h4>
            <p className="text-muted-foreground">
              Your data is encrypted and stays yours.
            </p>
          </div>
        </div>
        
        <div className="bg-card light:bg-gray-50 dark:bg-transparent p-6 rounded-lg border border-border w-full">
          <h3 className="text-xl font-medium text-primary mb-4">🛡️ Safe, Secure, and Open Source</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            We care about your privacy. That's why MarkNest is:
          </p>
          <ul className="space-y-3 pl-6 list-disc text-muted-foreground">
            <li className="pl-2">
              <span className="font-medium text-foreground">Encrypted:</span> Your bookmarks are stored securely, 
              protected with modern encryption.
            </li>
            <li className="pl-2">
              <span className="font-medium text-foreground">Open Source:</span> Our code is transparent and 
              available for anyone to inspect or contribute.
              <p className="mt-1 text-sm italic">
                (That means anyone can review how it works — no hidden data collection, no secrets.)
              </p>
            </li>
          </ul>
        </div>
        
        <div className="text-center py-6 w-full light:bg-gray-50 dark:bg-transparent p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            MarkNest © {new Date().getFullYear()} • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSettings;
