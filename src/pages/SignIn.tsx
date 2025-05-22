import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Github, Twitter, Instagram } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/components/Logo';

const SignIn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [showScrollInfo, setShowScrollInfo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    why: false,
    features: false,
    security: false,
    cta: false
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  
  const sectionRefs = {
    why: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    security: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null)
  };

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Show after scrolling 100px
        setShowScrollInfo(true);
      } else {
        setShowScrollInfo(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle intersection observer for animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.5 }
        );
        
        observer.observe(ref.current);
        observers.push(observer);
      }
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

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

  const featureItems = [
    { icon: '🗂️', title: 'Organize', description: 'Smart folders & tags' },
    { icon: '🌙', title: 'Dark/Light Mode', description: 'Easy on your eyes' },
    { icon: '🔍', title: 'Visual Search', description: 'Find bookmarks instantly' },
    { icon: '🛡️', title: 'Encrypted', description: 'Your data stays yours' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top section - Keep existing welcome section intact */}
      <div className="w-full flex flex-col md:flex-row">
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
      </div>

      {/* New Scrollable Content Below */}
      <div className="w-full">
        {/* Why MarkNest Section */}
        <div
          ref={sectionRefs.why}
          className={`w-full px-6 py-12 md:py-24 bg-background transition-opacity duration-500 ${
            visibleSections.why ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[Poppins]">Why MarkNest?</h2>
            <p className="text-xl md:text-2xl leading-relaxed">
              The bookmark manager that finally gets it right:
            </p>
            <div className="mt-8 space-y-6 text-lg md:text-xl">
              <p className="flex items-center justify-center gap-3">
                <span className="text-2xl">✨</span> One-click magic – Save links faster than you can say 'bookmark'
              </p>
              <p className="flex items-center justify-center gap-3">
                <span className="text-2xl">🔒</span> Private by design – No tracking, no ads, no nonsense
              </p>
              <p className="flex items-center justify-center gap-3">
                <span className="text-2xl">😊</span> Feels like home – Clean, intuitive, and stress-free
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div 
          ref={sectionRefs.features}
          className={`w-full px-6 py-12 md:py-16 bg-background/50 transition-opacity duration-500 ${
            visibleSections.features ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featureItems.map((feature, index) => (
                <Card 
                  key={feature.title} 
                  className={`transition-all duration-500 hover:shadow-md bg-card ${
                    visibleSections.features 
                      ? `opacity-100 translate-y-0` 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <span className="text-4xl mb-4">{feature.icon}</span>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div 
          ref={sectionRefs.security}
          className={`w-full px-6 py-12 md:py-16 bg-background transition-all duration-500 ${
            visibleSections.security 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: visibleSections.security ? '400ms' : '0ms' }}
        >
          <div className="max-w-3xl mx-auto text-center p-8 border border-border rounded-xl bg-card/50">
            <h3 className="text-2xl font-bold mb-3">Safe. Private. Yours.</h3>
            <p className="text-muted-foreground">
              End-to-end encryption • Open-source code • No data mining
            </p>
          </div>
        </div>

        {/* CTA Footer */}
        <div 
          ref={sectionRefs.cta}
          className={`w-full px-6 py-12 md:py-24 bg-background/80 transition-opacity duration-500 ${
            visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <Button 
              className="gradient-primary text-white font-medium py-6 px-8 text-lg w-full md:w-auto hover:opacity-90 transition-all duration-200 hover:shadow-md"
              onClick={handleGetStarted}
            >
              Start Your Journey
            </Button>
            <div className="mt-12 flex justify-center space-x-6">
              <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={24} />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default SignIn;
