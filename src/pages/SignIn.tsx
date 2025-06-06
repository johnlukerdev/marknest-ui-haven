
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Force dark mode
  useEffect(() => {
    if (theme !== 'dark') {
      setTheme('dark');
    }
  }, [theme, setTheme]);
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Section */}
      <div className="flex-1 flex flex-col p-8 md:p-16 lg:p-24 justify-center">
        <div className="mb-16">
          <Logo />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-[Poppins]">
          Welcome to MarkNest
        </h1>
        
        <p className="text-indigo-400 text-xl md:text-2xl mb-6">
          Organize, access, and explore your digital world with one click.
        </p>
        
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-12">
          MarkNest helps you save, manage, and revisit your favorite 
          content anytime. From videos to articles to tools, keep 
          everything in one nest — beautifully encrypted and always 
          at your fingertips.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button 
            className="text-lg py-6 gradient-primary w-full sm:w-auto min-w-[150px]"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
          
          <Button 
            variant="outline" 
            className="text-lg py-6 border-border w-full sm:w-auto min-w-[150px]"
            onClick={() => navigate('/secret-key')}
          >
            Sign In
          </Button>
        </div>
      </div>
      
      {/* Right Section - Purple Gradient with Illustration */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-indigo-700 to-purple-800 items-center justify-center">
        <div className="p-12 max-w-md">
          {/* Simplified bookmark icon illustration */}
          <div className="w-48 h-48 bg-background/10 rounded-lg flex flex-col items-center justify-center mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-indigo-300/70 rounded-full"></div>
              ))}
            </div>
            <div className="w-32 h-2 bg-indigo-300/70 rounded-full mb-3"></div>
            <div className="w-24 h-2 bg-indigo-300/70 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
