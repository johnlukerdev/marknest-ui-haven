
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
        
        {/* Right Section - Modern Futuristic Design */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 to-violet-900 items-center justify-center relative overflow-hidden">
          {/* Animated Background Elements with Dark Shading */}
          <div className="absolute inset-0">
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-800/30"></div>
            
            {/* Dark geometric shapes */}
            <div className="absolute top-20 left-20 w-40 h-40 bg-slate-900/30 rounded-2xl blur-2xl rotate-12 animate-pulse"></div>
            <div className="absolute bottom-32 right-16 w-28 h-28 bg-slate-800/40 rounded-full blur-xl animate-pulse delay-700"></div>
            
            {/* Original light elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-lg animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-indigo-400/10 rounded-full blur-md animate-pulse delay-500"></div>
            
            {/* Additional dark accent elements */}
            <div className="absolute top-1/3 right-20 w-20 h-20 bg-slate-700/25 rounded-lg blur-lg rotate-45 animate-pulse delay-300"></div>
            <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-slate-900/20 rounded-full blur-2xl animate-pulse delay-1500"></div>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 text-center space-y-12 px-8">
            {/* Hero Text */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-wide">
                Your Digital
                <span className="block bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent font-medium">
                  Universe
                </span>
              </h2>
              <p className="text-xl text-white/70 font-light max-w-md mx-auto leading-relaxed">
                Seamlessly organize, access, and discover everything that matters to you
              </p>
            </div>

            {/* Modern Feature Grid */}
            <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
              <div className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-white text-sm font-medium mb-2">Secure</h3>
                <p className="text-white/60 text-xs leading-relaxed">End-to-end encrypted</p>
              </div>

              <div className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-indigo-300" />
                </div>
                <h3 className="text-white text-sm font-medium mb-2">Fast</h3>
                <p className="text-white/60 text-xs leading-relaxed">Lightning quick access</p>
              </div>

              <div className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Monitor className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-white text-sm font-medium mb-2">Anywhere</h3>
                <p className="text-white/60 text-xs leading-relaxed">Cross-device sync</p>
              </div>

              <div className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Link className="w-6 h-6 text-indigo-300" />
                </div>
                <h3 className="text-white text-sm font-medium mb-2">Smart</h3>
                <p className="text-white/60 text-xs leading-relaxed">AI-powered organization</p>
              </div>
            </div>

            {/* Floating Accent Elements */}
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-1 h-16 bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
              <div className="absolute -top-8 -right-8 w-1 h-16 bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent"></div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
            </div>
          </div>

          {/* Corner Accent Lines */}
          <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/20 rounded-tr-2xl"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/20 rounded-bl-2xl"></div>
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
