
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import Logo from '@/components/Logo';
import { useTheme } from '@/hooks/use-theme';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Force dark mode
  useEffect(() => {
    if (theme !== 'dark') {
      setTheme('dark');
    }
  }, [theme, setTheme]);
  
  const handleGetSecretKey = () => {
    navigate('/secret-key');
  };

  const handleSignIn = () => {
    navigate('/secret-key', { state: { isSignIn: true } });
  };
  
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
              Join MarkNest Today
            </h1>
            
            {/* Value Proposition */}
            <div className="mb-8 text-center">
              <p className="text-lg text-foreground mb-4">Your privacy comes first:</p>
              <ul className="space-y-3 text-left max-w-md mx-auto">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">🔒</span>
                  <span>Everything encrypted with your Secret Key</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">🌐</span>
                  <span>Access from any device securely</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">🚫</span>
                  <span>No tracking, no ads, no compromises</span>
                </li>
              </ul>
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
                onClick={handleGetSecretKey}
              >
                Get Your Secret Key
              </Button>

              <Button 
                variant="outline"
                className="w-full py-6 text-lg border-2 border-border/50 hover:border-purple-500/50 transition-all duration-300 focus:ring-0"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </div>
            
            {/* Link to Sign In */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={handleSignIn}
                  className="text-primary hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
