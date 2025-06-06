
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';
import { Shield, Lock, Key, Bookmark } from 'lucide-react';

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
            onClick={() => navigate('/secret-key', { state: { isSignIn: true } })}
          >
            Sign In
          </Button>
        </div>
      </div>
      
      {/* Right Section - Dark Shade Design */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center justify-center relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(120,119,198,0.15),_rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_rgba(147,51,234,0.15),_rgba(255,255,255,0))]"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-12 w-16 h-16 bg-indigo-500/20 rounded-full blur-sm"></div>
        <div className="absolute top-40 right-16 w-12 h-12 bg-purple-500/20 rounded-full blur-sm"></div>
        <div className="absolute bottom-32 left-8 w-20 h-20 bg-indigo-400/10 rounded-full blur-lg"></div>
        
        <div className="relative z-10 p-12 max-w-md">
          {/* Main illustration container */}
          <div className="w-72 h-72 bg-gradient-to-br from-slate-700/40 to-slate-800/60 rounded-3xl flex flex-col items-center justify-center mx-auto backdrop-blur-sm border border-slate-600/30 shadow-2xl">
            {/* Top section with security icons */}
            <div className="flex gap-6 mb-8">
              <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-400/30">
                <Shield className="w-8 h-8 text-indigo-300" />
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30">
                <Lock className="w-8 h-8 text-purple-300" />
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
                <Key className="w-8 h-8 text-blue-300" />
              </div>
            </div>
            
            {/* Central bookmark icon */}
            <div className="p-6 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl mb-8 border border-indigo-400/20">
              <Bookmark className="w-12 h-12 text-indigo-200" />
            </div>
            
            {/* Bottom decorative lines */}
            <div className="space-y-3 w-full px-8">
              <div className="h-2 bg-gradient-to-r from-indigo-400/40 to-purple-400/40 rounded-full"></div>
              <div className="h-2 bg-gradient-to-r from-purple-400/40 to-indigo-400/40 rounded-full w-3/4"></div>
              <div className="h-2 bg-gradient-to-r from-indigo-400/40 to-blue-400/40 rounded-full w-1/2"></div>
            </div>
          </div>
          
          {/* Bottom text */}
          <div className="mt-8 text-center">
            <p className="text-slate-300 text-lg font-medium mb-2">Secure & Private</p>
            <p className="text-slate-400 text-sm">Your data, encrypted and protected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
