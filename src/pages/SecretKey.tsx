
import React, { useState, useRef, useEffect } from 'react';
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
  const [secretKeyWords, setSecretKeyWords] = useState<string[]>([]);
  const secretKeyRef = useRef<HTMLDivElement>(null);

  // Check if we're coming from sign-in button
  const isSignIn = location.state?.isSignIn || false;

  // Word pool for generating random secret keys
  const wordPool = [
    'lesson', 'stick', 'edit', 'clarify', 'ugly', 'outdoor', 'peanut', 'hotel', 
    'stand', 'enhance', 'ignore', 'favorite', 'push', 'title', 'rare', 'afford', 
    'cycle', 'mind', 'length', 'surprise', 'derive', 'dream', 'evoke', 'roast',
    'bridge', 'forest', 'ocean', 'mountain', 'valley', 'river', 'sunset', 'dawn',
    'whisper', 'thunder', 'gentle', 'fierce', 'calm', 'storm', 'bright', 'shadow',
    'mirror', 'crystal', 'marble', 'silver', 'golden', 'bronze', 'copper', 'steel'
  ];

  // Generate random secret key words on component mount
  useEffect(() => {
    const generateRandomWords = () => {
      const shuffled = [...wordPool].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 24);
    };
    setSecretKeyWords(generateRandomWords());
  }, []);

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
    return (
      <div className="min-h-screen bg-background flex">
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
                    className="w-full aspect-square min-h-[200px] sm:min-h-[240px] md:min-h-[260px] text-lg sm:text-xl font-['Inter'] font-normal leading-relaxed rounded-2xl border-2 border-border/40 bg-background/90 backdrop-blur-sm transition-all duration-200 shadow-sm hover:shadow-md resize-none placeholder:text-lg sm:placeholder:text-xl placeholder:font-['Inter'] placeholder:text-muted-foreground/50 placeholder:font-normal focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-border/60 dark:bg-card/50 dark:border-border/30 dark:hover:border-border/50 light:border-gray-200 light:hover:border-gray-300 p-6 sm:p-8" />
                  
                  {/* Error Message */}
                  {showError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm animate-fade-in">
                      <AlertCircle className="w-4 h-4" />
                      <span>Please fill in the box</span>
                    </div>
                  )}
                </div>
                
                {/* Continue Button */}
                <Button 
                  className="w-full h-12 text-lg font-semibold gradient-primary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:ring-0" 
                  onClick={handleContinue}
                >
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
          
          <div className="relative z-10 p-12 max-w-md">
            <div className="mb-12 flex justify-center">
              <div className="p-6 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-2xl backdrop-blur-sm">
                <Lock className="w-20 h-20 text-white/80" />
              </div>
            </div>
            
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="text-2xl">🔐</div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">End-to-end encryption</h3>
                  <p className="text-white/70 text-base leading-relaxed">Your data is protected by your secret key.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-2xl">📁</div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Smart organizing</h3>
                  <p className="text-white/70 text-base leading-relaxed">Organize your digital footprint with ease.</p>
                </div>
              </div>
            </div>
            
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
              <div className="flex items-start gap-3">
                <div className="text-xl">🔐</div>
                <div>
                  <h3 className="text-foreground font-bold text-sm mb-1">End-to-end encryption</h3>
                  <p className="text-muted-foreground text-xs">Your data is protected by your secret key.</p>
                </div>
              </div>
              
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
      </div>
    );
  }

  // Original secret key generation page with modern sleek design
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-950 flex flex-col relative overflow-hidden">
      {/* Futuristic background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-4xl">
          {/* Logo */}
          <div className="flex justify-center mb-16">
            <Logo />
          </div>
          
          {/* Main Container */}
          <div className="relative group">
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse blur-sm"></div>
            
            {/* Main content container */}
            <div className="relative bg-gradient-to-br from-gray-900/90 via-indigo-950/90 to-purple-950/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 md:p-12 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full backdrop-blur-sm border border-purple-500/30">
                    <Key className="w-10 h-10 text-purple-400" />
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono tracking-tight">
                  Your Secret Key
                </h1>
                
                <p className="text-xl text-gray-300 mb-8 font-light">
                  24 words that secure your digital vault
                </p>
              </div>
              
              {/* Secret Key Grid */}
              <div className="mb-12">
                <div className="relative p-1 rounded-xl bg-gradient-to-r from-purple-600/30 via-blue-500/30 to-purple-600/30">
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 md:p-10">
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 md:gap-6 animate-fade-in">
                      {secretKeyWords.map((word, index) => (
                        <div
                          key={`${word}-${index}`}
                          className="group/word relative p-3 md:p-4 bg-gray-900/60 backdrop-blur-sm border border-purple-500/20 rounded-lg hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300 cursor-default"
                        >
                          <div className="text-center">
                            <span className="block text-xs text-gray-500 mb-1 font-mono">
                              {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <span className="block text-white font-mono text-sm md:text-base font-medium group-hover/word:text-purple-300 transition-colors duration-300">
                              {word}
                            </span>
                          </div>
                          
                          {/* Hover glow effect */}
                          <div className="absolute inset-0 bg-purple-400/0 group-hover/word:bg-purple-400/5 rounded-lg transition-all duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full py-6 flex items-center justify-center gap-3 bg-gray-900/60 backdrop-blur-sm border-purple-500/30 text-white hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300 rounded-xl font-mono text-lg group"
                  onClick={handleCopyToClipboard}
                >
                  {copied ? (
                    <>
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-green-400">Copied to Vault</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5 group-hover:text-purple-300 transition-colors" />
                      <span className="group-hover:text-purple-300 transition-colors">Copy to Clipboard</span>
                    </>
                  )}
                </Button>
                
                <Button 
                  className="w-full py-6 text-xl font-semibold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 text-white border-0 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] font-mono"
                  onClick={handleSaved}
                >
                  Secure & Continue
                </Button>
              </div>

              {/* Already have account link */}
              <div className="mt-8 text-center">
                <p className="text-gray-400 font-mono">
                  Already have an account?{" "}
                  <button onClick={handleSignIn} className="text-purple-400 hover:text-purple-300 transition-colors underline">
                    Sign In
                  </button>
                </p>
              </div>
              
              {/* Security Notice */}
              <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-yellow-400 font-semibold mb-2 font-mono">Security Notice</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Store these words safely offline. Without them, your data cannot be recovered. 
                      MarkNest cannot access or restore your secret key.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretKey;
