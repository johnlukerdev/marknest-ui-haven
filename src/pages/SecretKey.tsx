
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Copy, Check, HelpCircle } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';

const SecretKey: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const secretKeyRef = useRef<HTMLDivElement>(null);
  
  // Sample secret key words
  const secretKeyWords = [
    'lesson', 'stick', 'edit', 'clarify', 'ugly', 'outdoor',
    'peanut', 'hotel', 'stand', 'enhance', 'ignore', 'favorite',
    'push', 'title', 'rare', 'afford', 'cycle', 'mind',
    'length', 'surprise', 'derive', 'dream', 'evoke', 'roast'
  ];
  
  const formatKeyWords = () => {
    const rows = [];
    for (let i = 0; i < secretKeyWords.length; i += 6) {
      rows.push(secretKeyWords.slice(i, i + 6));
    }
    return rows;
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(secretKeyWords.join(' '));
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Your secret key has been copied to your clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleSaved = () => {
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    // Navigate to main app
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Logo and Branding */}
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          
          {/* Main Content */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 font-[Poppins]">
              Your Secret Key
            </h1>
            
            {/* Description */}
            <div className="mb-6 text-center">
              <p className="text-lg text-foreground mb-4">
                These 24 words are your password. Save them securely:
              </p>
              <ul className="space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5">✏️</span>
                  <span>Write them down</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5">📦</span>
                  <span>Store in a password manager</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5">🔥</span>
                  <span>Never share digitally</span>
                </li>
              </ul>
            </div>
            
            {/* Secret Key Card */}
            <div className="my-8">
              <div 
                ref={secretKeyRef} 
                className="relative p-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600"
              >
                <Card className="p-6 select-none animate-pulse" style={{animationDuration: '3s'}}>
                  <div className="grid grid-cols-6 gap-x-3 gap-y-4 sm:text-sm text-xs text-center">
                    {formatKeyWords().map((row, rowIndex) => (
                      <React.Fragment key={`row-${rowIndex}`}>
                        {row.map((word, wordIndex) => (
                          <div key={`word-${rowIndex}-${wordIndex}`} className="font-mono">
                            {word}
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="space-y-4 mt-8">
              <Button 
                variant="outline" 
                className="w-full py-5 flex items-center justify-center gap-2 focus:ring-0"
                onClick={handleCopyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
              
              <Button 
                className="w-full py-5 text-lg gradient-primary focus:ring-0"
                onClick={handleSaved}
              >
                I've Saved It
              </Button>
            </div>
            
            {/* FAQ Section */}
            <div className="mt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="lost-key">
                  <AccordionTrigger className="text-left flex items-center">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      <span>What if I lose my Secret Key?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      If you lose your Secret Key, we cannot recover it for you. Your data is encrypted with this key, and without it, your bookmarks cannot be accessed. This is why it's crucial to store it securely offline or in a password manager. MarkNest prioritizes your privacy, which means we don't have access to your data.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretKey;
