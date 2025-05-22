
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';
import { Input } from '@/components/ui/input';

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
              Sign In
            </h1>
            
            {/* Secret Key Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">Enter your Secret Key</label>
              <Input
                type="password"
                placeholder="Enter your 24-word secret key"
                className="w-full p-4 h-auto"
              />
            </div>
            
            {/* Animated Lock Icon */}
            <div className="flex justify-center my-8">
              <div className="p-6 bg-background/50 rounded-full hover:scale-105 transition-all duration-300 group">
                <Lock 
                  size={64} 
                  className="text-primary group-hover:rotate-360 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="space-y-4 mt-8">
              <Button 
                className="w-full py-6 text-lg gradient-primary focus:ring-0"
                onClick={() => navigate('/')}
              >
                Sign In
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full py-6 text-lg focus:ring-0"
              >
                Sign in with Stacks Wallet
              </Button>
            </div>
            
            {/* Link to Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <a 
                  href="/signup"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/signup');
                  }}
                  className="text-primary hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
