
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 font-[Poppins] text-foreground leading-tight">
                Welcome to MarkNest
              </h1>
              
              <p className="text-indigo-400 text-lg md:text-xl mb-8 leading-relaxed">
                Organize, access, and explore your digital world with one click.
              </p>
              
              <p className="text-muted-foreground text-base mb-12 leading-relaxed">
                MarkNest helps you save, manage, and revisit your favorite content anytime. From videos to articles to tools, keep everything in one nest — beautifully encrypted and always at your fingertips.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="text-base py-6 px-7 rounded-xl gradient-primary w-full sm:w-auto min-w-[140px]"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                
                <Button 
                  variant="outline" 
                  className="text-base py-6 px-7 rounded-xl border-[1.5px] border-muted-foreground/30 hover:border-indigo-500/50 w-full sm:w-auto min-w-[140px] bg-transparent hover:bg-card/20"
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
          {/* Modern Dashboard Illustration with Glassmorphism */}
          <div className="w-[320px] h-[320px] bg-white/5 backdrop-blur-xl rounded-3xl flex flex-col border border-white/10 shadow-2xl shadow-purple-500/10 relative overflow-hidden group hover:shadow-purple-500/20 transition-all duration-300">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/5 rounded-3xl"></div>
            
            {/* Dashboard Header - More prominent */}
            <div className="relative z-10 w-full px-8 py-6 border-b border-white/10 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-xl font-semibold tracking-wide">Dashboard</span>
              </div>
            </div>
            
            {/* Modern Icon Grid - 2x2 layout with better spacing */}
            <div className="relative z-10 grid grid-cols-2 gap-8 mb-10 px-8">
              {/* Link/Connect Icon */}
              <div className="group/icon w-24 h-24 bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-200 hover:shadow-purple-500/20">
                <Link className="w-10 h-10 text-white/90 stroke-[1.5]" />
              </div>
              
              {/* Shield/Security Icon */}
              <div className="group/icon w-24 h-24 bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-200 hover:shadow-purple-500/20">
                <Shield className="w-10 h-10 text-white/90 stroke-[1.5]" />
              </div>
              
              {/* Speed/Boost Icon */}
              <div className="group/icon w-24 h-24 bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-200 hover:shadow-purple-500/20">
                <Zap className="w-10 h-10 text-white/90 stroke-[1.5]" />
              </div>
              
              {/* Device/Display Icon */}
              <div className="group/icon w-24 h-24 bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-200 hover:shadow-purple-500/20">
                <Monitor className="w-10 h-10 text-white/90 stroke-[1.5]" />
              </div>
            </div>
            
            {/* Elegant Progress Indicators */}
            <div className="relative z-10 space-y-4 w-full px-8">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="h-full bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full w-4/5 shadow-sm animate-pulse"></div>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full w-3/5 shadow-sm"></div>
              </div>
            </div>
            
            {/* Floating elements for depth */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/60 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-indigo-400/40 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-card/30 py-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground text-base">
              Simple, secure, and seamless organization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Link className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">Save your favorite links and files</h3>
              <p className="text-muted-foreground text-sm">Quickly bookmark any content with one click</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">Access them anywhere</h3>
              <p className="text-muted-foreground text-sm">Your bookmarks sync across all devices</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">Everything is encrypted</h3>
              <p className="text-muted-foreground text-sm">Your data is protected with end-to-end encryption</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">One-click smart dashboard</h3>
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
