
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';
import { Grid3x3 } from 'lucide-react';

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
      {/* Left Section - Content */}
      <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-20 justify-center">
        <div className="max-w-xl">
          <div className="mb-12">
            <Logo />
          </div>
          
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 font-[Poppins] text-foreground leading-tight">
              Welcome to MarkNest
            </h1>
            
            <p className="text-indigo-400 text-xl md:text-2xl mb-8 leading-relaxed">
              Organize, access, and explore your digital world with one click.
            </p>
            
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              MarkNest helps you save, manage, and revisit your favorite content anytime. From videos to articles to tools, keep everything in one nest — beautifully encrypted and always at your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="text-lg py-7 px-8 rounded-xl gradient-primary w-full sm:w-auto min-w-[140px]"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              
              <Button 
                variant="outline" 
                className="text-lg py-7 px-8 rounded-xl border-[1.5px] border-muted-foreground/30 hover:border-indigo-500/50 w-full sm:w-auto min-w-[140px] bg-transparent hover:bg-card/20"
                onClick={() => navigate('/secret-key', { state: { isSignIn: true } })}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section - Clean Purple with Minimal Dashboard */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-purple-600 to-purple-700 items-center justify-center relative">
        {/* Minimal Dashboard Illustration */}
        <div className="w-[280px] h-[280px] bg-slate-800/30 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/10">
          {/* Clean dashboard grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center">
                <Grid3x3 className="w-6 h-6 text-white/60" />
              </div>
            ))}
          </div>
          
          {/* Dashboard title */}
          <div className="text-center">
            <h3 className="text-white/80 text-lg font-medium mb-3">Dashboard</h3>
            <div className="space-y-2 w-full px-8">
              <div className="h-1.5 bg-white/20 rounded-full"></div>
              <div className="h-1.5 bg-white/15 rounded-full w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
