
import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Copy, Check, HelpCircle, Key, Shield, Lock, AlertCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';

const SecretKey: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ALL HOOKS MUST BE AT THE TOP - BEFORE ANY CONDITIONAL LOGIC
  const [secretKey, setSecretKey] = useState('');
  const [showError, setShowError] = useState(false);
  const [copied, setCopied] = useState(false);
  const secretKeyRef = useRef<HTMLDivElement>(null);

  // Check if we're coming from sign-in button
  const isSignIn = location.state?.isSignIn || false;
  const handleContinue = () => {
    if (!secretKey.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    // In a real app, you would validate the secret key here

    // Navigate to main app
    navigate('/');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretKey(e.target.value);
    if (showError && e.target.value.trim()) {
      setShowError(false);
    }
  };
  const handleSignUp = () => {
    navigate('/signup');
  };
  const handleSignIn = () => {
    navigate('/secret-key', {
      state: {
        isSignIn: true
      }
    });
  };

  // Sample secret key words
  const secretKeyWords = ['lesson', 'stick', 'edit', 'clarify', 'ugly', 'outdoor', 'peanut', 'hotel', 'stand', 'enhance', 'ignore', 'favorite', 'push', 'title', 'rare', 'afford', 'cycle', 'mind', 'length', 'surprise', 'derive', 'dream', 'evoke', 'roast'];
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
      description: "Your secret key has been copied to your clipboard"
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
      origin: {
        y: 0.6
      }
    });

    // Navigate to main app
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  // Sign-in layout with redesigned modern style
  if (isSignIn) {
    return <div className="min-h-screen bg-background flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-12 relative">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/3 to-purple-500/3 rounded-none"></div>
          
          <div className="w-full max-w-md relative z-10">
            {/* Logo */}
            <div className="flex justify-center mb-12 sm:mb-16">
              <Logo />
            </div>
            
            {/* Modern Card Container */}
            <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/5">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 font-[Poppins]">
                  Access with Your Secret Key
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Enter code to secret continue
                </p>
              </div>
              
              {/* Input Section */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Input 
                    id="secret-key-input" 
                    type="text" 
                    placeholder="Enter your secret key…" 
                    value={secretKey} 
                    onChange={handleInputChange} 
                    autoComplete="off"
                    className="w-full aspect-square min-h-[200px] sm:min-h-[240px] md:min-h-[260px]\\n         text-sm sm:text-base font-['Inter'] font-normal leading-relaxed\\n         rounded-2xl border-2 border-border/40 bg-background/90 backdrop-blur-sm \\n         transition-all duration-200 shadow-sm hover:shadow-md\\n         resize-none\\n         placeholder:text-sm sm:placeholder:text-base placeholder:font-['Inter'] \\n         placeholder:text-muted-foreground/50 placeholder:font-normal\\n         focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-border/60\\n         dark:bg-card/50 dark:border-border/30 dark:hover:border-border/50\\n   light:border-gray-200 light:hover:border-gray-300" />
                  
                  {/* Error Message */}
                  {showError && <div className="flex items-center gap-2 text-red-500 text-sm animate-fade-in">
                      <AlertCircle className="w-4 h-4" />
                      <span>Please fill in the box</span>
                    </div>}
                </div>
                
                {/* Continue Button */}
                <Button className="w-full h-12 text-lg font-semibold gradient-primary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:ring-0" onClick={handleContinue}>
                  Continue
                </Button>

                {/* Don't have account text with Sign Up button - matching SignUp page style */}
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <button onClick={handleSignUp} className="text-primary hover:underline">
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
              
              {/* Security Indicators */}
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔒</span>
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡</span>
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Information Section */}
        <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 items-center justify-center relative overflow-hidden">
          {/* Soft background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl"></div>
          </div>
          
          {/* Content Container */}
          <div className="relative z-10 p-12 max-w-md">
            {/* Main Lock Icon */}
            <div className="mb-12 flex justify-center">
              <div className="p-6 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-2xl backdrop-blur-sm">
                <Lock className="w-20 h-20 text-white/80" />
              </div>
            </div>
            
            {/* Information Blocks */}
            <div className="space-y-8 animate-fade-in">
              {/* End-to-end encryption */}
              <div className="flex items-start gap-4">
                <div className="text-2xl">🔐</div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">End-to-end encryption</h3>
                  <p className="text-white/70 text-base leading-relaxed">Your data is protected by your secret key.</p>
                </div>
              </div>
              
              {/* Smart organizing */}
              <div className="flex items-start gap-4">
                <div className="text-2xl">📁</div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Smart organizing</h3>
                  <p className="text-white/70 text-base leading-relaxed">Organize your digital footprint with ease.</p>
                </div>
              </div>
            </div>
            
            {/* Security Badge */}
            <div className="mt-12 flex justify-center">
              <div className="px-6 py-3 bg-green-400/20 rounded-full border border-green-400/30">
                <span className="text-green-300 text-sm font-medium">Secured Access</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Information Section - Below the card */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-2xl p-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* End-to-end encryption */}
              <div className="flex items-start gap-3">
                <div className="text-xl">🔐</div>
                <div>
                  <h3 className="text-foreground font-bold text-sm mb-1">End-to-end encryption</h3>
                  <p className="text-muted-foreground text-xs">Your data is protected by your secret key.</p>
                </div>
              </div>
              
              {/* Smart organizing */}
              <div className="flex items-start gap-3">
                <div className="text-xl">📁</div>
                <div>
                  <h3 className="text-foreground font-bold text-sm mb-1">Smart organizing</h3>
                  <p className="text-muted-foreground text-xs">Organize your digital footprint with ease.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }

  // Original secret key generation page when coming from sign-up flow
  return <div className="min-h-screen bg-background flex flex-col relative">
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
              <div ref={secretKeyRef} className="relative p-1 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600">
                <Card className="p-6 select-none animate-pulse rounded-xl bg-card/90 backdrop-blur-sm" style={{
                animationDuration: '3s'
              }}>
                  <div className="grid grid-cols-6 gap-x-3 gap-y-4 sm:text-sm text-xs text-center">
                    {formatKeyWords().map((row, rowIndex) => <React.Fragment key={`row-${rowIndex}`}>
                        {row.map((word, wordIndex) => <div key={`word-${rowIndex}-${wordIndex}`} className="font-mono">
                            {word}
                          </div>)}
                      </React.Fragment>)}
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="space-y-4 mt-8">
              <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 focus:ring-0 rounded-xl border-2 hover:scale-[1.02] transition-all duration-300" onClick={handleCopyToClipboard}>
                {copied ? <>
                    <Check className="h-5 w-5" />
                    Copied!
                  </> : <>
                    <Copy className="h-5 w-5" />
                    Copy to Clipboard
                  </>}
              </Button>
              
              <Button className="w-full py-6 text-xl gradient-primary focus:ring-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]" onClick={handleSaved}>
                I've Saved It
              </Button>
            </div>

            {/* Already have account link */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button onClick={handleSignIn} className="text-primary hover:underline">
                  Sign In
                </button>
              </p>
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
    </div>;
};

export default SecretKey;
