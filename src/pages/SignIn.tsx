
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';

const SignIn: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                className="w-full p-4 min-h-[300px] text-lg shadow-sm border-2 focus:border-primary rounded-md resize-none bg-background"
                required
              />
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
