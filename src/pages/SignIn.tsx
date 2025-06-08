
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';
import { Monitor, Shield, Zap, Link } from 'lucide-react';

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
    <div className="min-h-screen bg-background">
      {/* Main Hero Section */}
      <div className="flex min-h-screen">
        {/* Left Section - Content */}
        <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-20 justify-center">
          <div className="max-w-xl">
            <div className="mb-12">
              <Logo />
            </div>
            
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 font-[Poppins] text-foreground leading-tight">
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
        
        {/* Right Section - Clean Modern Design */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 to-violet-900 items-center justify-center relative">
          {/* Flat Dashboard Illustration */}
          <div className="w-[320px] h-[320px] bg-slate-800/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border border-white/10">
            {/* Dashboard Header */}
            <div className="w-full px-8 py-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-white/80" />
                <span className="text-white/80 text-lg font-medium">Dashboard</span>
              </div>
            </div>
            
            {/* Clean grid layout */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="w-20 h-20 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center">
                <Link className="w-8 h-8 text-white/70" />
              </div>
              <div className="w-20 h-20 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white/70" />
              </div>
              <div className="w-20 h-20 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white/70" />
              </div>
              <div className="w-20 h-20 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center">
                <Monitor className="w-8 h-8 text-white/70" />
              </div>
            </div>
            
            {/* Status bars */}
            <div className="space-y-3 w-full px-8">
              <div className="h-2 bg-white/20 rounded-full">
                <div className="h-full bg-white/40 rounded-full w-3/4"></div>
              </div>
              <div className="h-2 bg-white/20 rounded-full">
                <div className="h-full bg-white/30 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-card/30 py-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg">
              Simple, secure, and seamless organization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Link className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Save your favorite links and files</h3>
              <p className="text-muted-foreground text-sm">Quickly bookmark any content with one click</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Access them anywhere</h3>
              <p className="text-muted-foreground text-sm">Your bookmarks sync across all devices</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Everything is encrypted</h3>
              <p className="text-muted-foreground text-sm">Your data is protected with end-to-end encryption</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">One-click smart dashboard</h3>
              <p className="text-muted-foreground text-sm">Intelligent organization at your fingertips</p>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-20">
          <div className="text-center text-muted-foreground text-sm">
            © 2025 MarkNest · All rights reserved · Privacy · Terms
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
