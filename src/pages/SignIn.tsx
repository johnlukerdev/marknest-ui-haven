
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';
import { Monitor, Shield, Zap, Link, Circle, Square, Triangle, Star } from 'lucide-react';

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
        
        {/* Right Section - Modern Dashboard Design */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 to-violet-900 items-center justify-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
          </div>
          
          {/* Modern Dashboard Container */}
          <div className="w-[360px] h-[360px] bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Top Bar */}
            <div className="h-16 bg-white/5 border-b border-white/10 flex items-center px-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-400/60 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Monitor className="w-4 h-4 text-white/60" />
                <span className="text-white/70 text-sm font-medium">Dashboard</span>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="p-6 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Link className="w-4 h-4 text-indigo-300" />
                    <span className="text-white/80 text-xs">Links</span>
                  </div>
                  <div className="text-white text-lg font-semibold">847</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-300" />
                    <span className="text-white/80 text-xs">Secure</span>
                  </div>
                  <div className="text-white text-lg font-semibold">100%</div>
                </div>
              </div>
              
              {/* Activity Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Recent Activity</span>
                  <Zap className="w-4 h-4 text-orange-400" />
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  <div className="aspect-square bg-white/10 rounded-lg border border-white/10 flex items-center justify-center group hover:bg-white/20 transition-all duration-300">
                    <Circle className="w-5 h-5 text-white/60 group-hover:text-white/80" />
                  </div>
                  <div className="aspect-square bg-white/10 rounded-lg border border-white/10 flex items-center justify-center group hover:bg-white/20 transition-all duration-300">
                    <Square className="w-5 h-5 text-white/60 group-hover:text-white/80" />
                  </div>
                  <div className="aspect-square bg-white/10 rounded-lg border border-white/10 flex items-center justify-center group hover:bg-white/20 transition-all duration-300">
                    <Triangle className="w-5 h-5 text-white/60 group-hover:text-white/80" />
                  </div>
                  <div className="aspect-square bg-white/10 rounded-lg border border-white/10 flex items-center justify-center group hover:bg-white/20 transition-all duration-300">
                    <Star className="w-5 h-5 text-white/60 group-hover:text-white/80" />
                  </div>
                </div>
              </div>
              
              {/* Progress Indicators */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Storage</span>
                  <span className="text-white/50 text-xs">75%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full w-3/4 transition-all duration-700"></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Sync</span>
                  <span className="text-white/50 text-xs">92%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full w-[92%] transition-all duration-700"></div>
                </div>
              </div>
            </div>
            
            {/* Bottom Glow Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-500/10 to-transparent"></div>
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
