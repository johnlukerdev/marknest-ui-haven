
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { Github, Twitter, ArrowRight } from 'lucide-react';

const SignIn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [showScrollInfo, setShowScrollInfo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  
  // Visible sections tracking for animation
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionsRef = useRef<{[key: string]: HTMLElement | null}>({
    about: null,
    why: null,
    privacy: null,
    opensource: null,
    features: null,
    start: null,
    social: null
  });

  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      // Show scroll info message
      if (window.scrollY > 100) {
        setShowScrollInfo(true);
      } else {
        setShowScrollInfo(false);
      }
      
      // Check each section for visibility
      Object.entries(sectionsRef.current).forEach(([key, ref]) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !visibleSections.includes(key)) {
          setVisibleSections(prev => [...prev, key]);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  // Clear error when user starts typing
  useEffect(() => {
    if (secretKey.trim() && error) {
      setError(null);
    }
  }, [secretKey, error]);

  // Focus textarea when modal opens
  useEffect(() => {
    if (isModalOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!secretKey || !secretKey.trim()) {
      setError("Please enter your secret key");
      textareaRef.current?.focus();
      return;
    }
    
    // Handle authentication logic here
    console.log('Authenticating with:', secretKey);
    setIsModalOpen(false);
    navigate('/');
  };

  const handleGetStarted = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left side - Content */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">
        <div className="mb-8 group hover:bg-background/10 hover:cursor-pointer inline-flex w-fit rounded-full p-2 transition-all duration-200">
          <Logo />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight mb-3 font-[Poppins]">
          Welcome to MarkNest
        </h1>
        
        <p className="text-xl text-primary mb-4 font-medium">
          Organize, access, and explore your digital world with one click.
        </p>
        
        <p className="text-muted-foreground mb-10 max-w-md">
          MarkNest helps you save, manage, and revisit your favorite content anytime. 
          From videos to articles to tools, keep everything in one nest — beautifully 
          encrypted and always at your fingertips.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button 
            className="gradient-primary text-white font-medium py-6 px-8 text-lg hover:opacity-90 hover:cursor-pointer transition-all duration-200 hover:shadow-md"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          
          <Button 
            variant="outline" 
            className="border-gray-500 hover:bg-muted py-6 px-8 text-lg hover:cursor-pointer transition-all duration-200 hover:shadow-sm"
            onClick={() => setIsModalOpen(true)}
          >
            Sign In
          </Button>
        </div>

        {/* Scroll info message */}
        <div 
          className={`fixed bottom-8 left-0 right-0 mx-auto w-full max-w-md bg-background/90 backdrop-blur-md rounded-lg shadow-lg p-4 transform transition-all duration-300 z-50 ${
            showScrollInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">What is MarkNest?</h3>
            <p className="text-muted-foreground">
              MarkNest is your personal web library.<br/>
              Save, organize, and revisit the things that matter to you — all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="flex-1 bg-gradient-to-br from-indigo-800 to-violet-900 p-12 hidden md:flex md:items-center md:justify-center">
        <div className="max-w-md">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25"></div>
            <div className="relative bg-card p-8 rounded-xl shadow-2xl">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-video rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-md bg-indigo-500/50"></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                <div className="h-2 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => {
        setIsModalOpen(open);
        if (!open) setError(null);
      }}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Sign In to MarkNest</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label htmlFor="secret-key" className="text-base font-medium block">
                Secret Key
              </label>
              <textarea
                id="secret-key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter your secret key"
                className={`w-full p-4 min-h-[300px] text-lg shadow-sm border-2 focus:border-primary rounded-md resize-none bg-background ${
                  error ? 'border-red-500 focus:border-red-500 focus-visible:ring-red-500' : ''
                }`}
                ref={textareaRef}
                required
              />
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2 animate-fade-in">
                  {error}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Enter your secret key to access your bookmarks
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full gradient-primary hover:opacity-90 hover:cursor-pointer transition-all duration-200 hover:shadow-md py-6 text-base"
            >
              Continue
            </Button>
            
            <div className="text-center space-y-4">
              <Button 
                variant="outline" 
                className="w-full border-gray-500 hover:bg-muted hover:cursor-pointer transition-all duration-200 py-5"
              >
                Sign in with Stacks Wallet
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="#" className="text-primary hover:underline transition-colors">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Scroll-revealed detailed information section */}
      <section className="w-full bg-gradient-to-b from-background to-muted/30 py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-24">
          {/* What is MarkNest section */}
          <div 
            ref={el => sectionsRef.current.about = el}
            className={`transition-all duration-700 transform ${
              visibleSections.includes('about') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                🐦
              </div>
              <h2 className="text-3xl font-bold">What is MarkNest?</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              MarkNest is your modern, secure, and beautifully designed bookmark manager — built to help you save, organize, and rediscover the content that matters most to you.
            </p>
          </div>
          
          {/* Why MarkNest section */}
          <div 
            ref={el => sectionsRef.current.why = el}
            className={`transition-all duration-700 transform ${
              visibleSections.includes('why') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                🌟
              </div>
              <h2 className="text-3xl font-bold">Why MarkNest?</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Most bookmark tools are clunky or outdated. MarkNest is built for today — with a clean design, smart features, and a user-friendly experience that actually makes managing links enjoyable.
            </p>
          </div>
          
          {/* Privacy section */}
          <div 
            ref={el => sectionsRef.current.privacy = el}
            className={`transition-all duration-700 transform ${
              visibleSections.includes('privacy') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                🔐
              </div>
              <h2 className="text-3xl font-bold">Safe. Private. Yours.</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Your bookmarks are encrypted, never tracked, and completely yours. We don't store anything unnecessary — your digital world stays in your hands.
            </p>
          </div>
          
          {/* Open Source section */}
          <div 
            ref={el => sectionsRef.current.opensource = el}
            className={`transition-all duration-700 transform ${
              visibleSections.includes('opensource') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                💻
              </div>
              <h2 className="text-3xl font-bold">Open Source & Transparent</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              MarkNest is fully open source — meaning anyone can see how it works. No hidden code. No hidden tricks. Just honesty and full control for you.
            </p>
          </div>
          
          {/* Features section */}
          <div 
            ref={el => sectionsRef.current.features = el}
            className={`transition-all duration-700 transform ${
              visibleSections.includes('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                🚀
              </div>
              <h2 className="text-3xl font-bold">Smart Features That Make a Difference</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <div className="text-xl mt-1">🔗</div>
                <p className="text-muted-foreground">Add & organize your links with one click</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl mt-1">📂</div>
                <p className="text-muted-foreground">Archive, trash, or search instantly</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl mt-1">🌙</div>
                <p className="text-muted-foreground">Light & dark mode for all environments</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl mt-1">🧠</div>
                <p className="text-muted-foreground">Visual previews of saved websites</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-xl mt-1">✨</div>
                <p className="text-muted-foreground">Built with a clean, modern UI that feels like home</p>
              </div>
            </div>
          </div>
          
          {/* Start journey section */}
          <div 
            ref={el => sectionsRef.current.start = el}
            className={`transition-all duration-700 transform ${
              visibleSections.includes('start') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                ✅
              </div>
              <h2 className="text-3xl font-bold">Start Your Journey</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              No accounts. No tracking. Just a secret sentence to get you in — simple, secure, and ready when you are.
            </p>
            <Button 
              className="gradient-primary text-white font-medium py-6 px-8 text-lg hover:opacity-90 transition-all duration-200 hover:shadow-md flex items-center gap-2"
              onClick={handleGetStarted}
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Social links section */}
          <div 
            ref={el => sectionsRef.current.social = el}
            className={`flex justify-center gap-6 pt-16 border-t border-border transition-all duration-700 transform ${
              visibleSections.includes('social') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <Link to="#github" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-8 w-8" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link to="#twitter" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-8 w-8" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#threads" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide"
              >
                <path d="M12 2c-1.7 0-5 5-5 5l2.5-1.5L7 9.5c0 2.5 2.5 2.5 2.5 2.5V22" />
                <path d="M12 17c3.33 0 5-3 5-6s-1-5-5-5" />
                <path d="M15 17c2 0 5-1.5 5-6s-2-9-5-9" />
              </svg>
              <span className="sr-only">Threads</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
