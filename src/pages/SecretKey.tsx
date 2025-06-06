
import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Copy, Check, HelpCircle, Key, Shield, Lock } from 'lucide-react';
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
  const location = useLocation();
  const [secretKey, setSecretKey] = useState('');
  
  // Check if we're coming from sign-in button
  const isSignIn = location.state?.isSignIn || false;
  
  const handleContinue = () => {
    // In a real app, you would validate the secret key here
    
    // Navigate to main app
    navigate('/');
  };
  
  // Sign-in layout with improved design
  if (isSignIn) {
    return (
      <div className="min-h-screen bg-background flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
          
          <div className="w-full max-w-lg relative z-10">
            {/* Logo and Branding */}
            <div className="flex justify-center mb-12">
              <Logo />
            </div>
            
            {/* Main Content */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full">
                  <Key className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 font-[Poppins] bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Your Secret Key
              </h1>
              
              <p className="text-center text-lg mb-8 text-muted-foreground">
                Enter your Secret Key below to sign in.
              </p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Enter your Secret Key"
                    className="py-10 text-xl rounded-xl border-2 border-border/50 bg-background/50 backdrop-blur-sm focus:border-indigo-500 transition-all duration-300 placeholder:text-muted-foreground/60"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="w-full py-8 text-xl gradient-primary focus:ring-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  onClick={handleContinue}
                  disabled={!secretKey.trim()}
                >
                  Continue
                </Button>
              </div>
              
              {/* Security indicators */}
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Illustration */}
        <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-slate-800 to-slate-900 items-center justify-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(120,119,198,0.3),_rgba(255,255,255,0))]"></div>
          </div>
          
          {/* Key illustration */}
          <div className="relative z-10 p-12 max-w-md">
            <div className="w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-3xl flex flex-col items-center justify-center mx-auto backdrop-blur-sm border border-white/10">
              <div className="mb-8">
                <Key className="w-24 h-24 text-indigo-300" />
              </div>
              <div className="space-y-3 w-full px-8">
                <div className="h-3 bg-indigo-300/40 rounded-full"></div>
                <div className="h-3 bg-purple-300/40 rounded-full w-3/4"></div>
                <div className="h-3 bg-indigo-300/40 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Original secret key generation page when coming from sign-up flow
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
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Logo and Branding */}
          <div className="flex justify-center mb-12">
            <Logo />
          </div>
          
          {/* Main Content */}
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full">
                <Key className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 font-[Poppins] bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
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
                className="relative p-1 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600"
              >
                <Card className="p-6 select-none animate-pulse rounded-xl bg-card/90 backdrop-blur-sm" style={{animationDuration: '3s'}}>
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
                className="w-full py-6 flex items-center justify-center gap-2 focus:ring-0 rounded-xl border-2 hover:scale-[1.02] transition-all duration-300"
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
                className="w-full py-6 text-xl gradient-primary focus:ring-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
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
