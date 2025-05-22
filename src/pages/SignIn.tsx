
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
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Logo and Branding */}
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          
          {/* Main Content */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 font-[Poppins]">
              Welcome to MarkNest
            </h1>
            
            <p className="text-center text-lg mb-8 text-muted-foreground">
              Your private, encrypted bookmark manager for digital organization
            </p>
            
            {/* CTA Buttons */}
            <div className="space-y-4 mt-8">
              <Button 
                className="w-full py-6 text-lg gradient-primary focus:ring-0"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full py-6 text-lg focus:ring-0"
                onClick={() => navigate('/secret-key')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
