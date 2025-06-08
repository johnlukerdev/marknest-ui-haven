
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';
import { Shield, Lock, Grid3x3 } from 'lucide-react';

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
      <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-20 justify-center relative">
        {/* Background gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(120,119,198,0.1),_rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="relative z-10 max-w-xl">
          <div className="mb-12">
            <Logo />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-[Poppins] text-foreground">
              Welcome to MarkNest
            </h1>
            
            <p className="text-indigo-400 text-xl md:text-2xl mb-8 leading-relaxed">
              Organize, access, and explore your digital world with one click.
            </p>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              MarkNest helps you save, manage, and revisit your favorite content anytime. From videos to articles to tools, keep everything in one nest — beautifully encrypted and always at your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                className="text-lg py-7 px-8 rounded-xl gradient-primary w-full sm:w-auto min-w-[140px] group"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              
              <Button 
                variant="outline" 
                className="text-lg py-7 px-8 rounded-xl border-[1.5px] border-muted-foreground/20 hover:border-indigo-500/50 w-full sm:w-auto min-w-[140px] bg-transparent hover:bg-card/30"
                onClick={() => navigate('/secret-key', { state: { isSignIn: true } })}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section - Purple with Dashboard Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 items-center justify-center relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.1),_rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_rgba(255,255,255,0.08),_rgba(255,255,255,0))]"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-[15%] left-[20%] w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-[40%] right-[10%] w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-[20%] left-[15%] w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        
        {/* 3D Dashboard Illustration */}
        <div className="relative z-10 w-[300px] h-[300px] perspective-1000">
          <div className="w-full h-full relative transform-style-3d animate-float">
            {/* Main dashboard card */}
            <div className="absolute w-[280px] h-[280px] bg-slate-800/40 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/10 shadow-2xl transform translate-z-20">
              {/* Dashboard grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-12 h-12 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-xl border border-white/20 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                    <Grid3x3 className="w-6 h-6 text-white/60" />
                  </div>
                ))}
              </div>
              
              {/* Dashboard title */}
              <div className="text-center mb-6">
                <h3 className="text-white/80 text-lg font-medium mb-2">Dashboard</h3>
                <div className="space-y-2 w-full px-8">
                  <div className="h-1.5 bg-gradient-to-r from-indigo-400/40 to-purple-400/40 rounded-full"></div>
                  <div className="h-1.5 bg-gradient-to-r from-purple-400/40 to-indigo-400/40 rounded-full w-3/4 mx-auto"></div>
                </div>
              </div>
            </div>
            
            {/* Floating cards behind */}
            <div className="absolute w-[260px] h-[260px] bg-slate-900/30 rounded-3xl border border-white/5 transform translate-z-[-40px] translate-x-16 translate-y-8 rotate-y-[-8deg] blur-[1px]"></div>
            <div className="absolute w-[240px] h-[240px] bg-slate-900/20 rounded-3xl border border-white/5 transform translate-z-[-80px] translate-x-24 translate-y-12 rotate-y-[-12deg] blur-[2px]"></div>
          </div>
        </div>
        
        {/* Bottom feature cards */}
        <div className="absolute bottom-12 left-8 right-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 flex items-start gap-3">
              <div className="p-2 rounded-full bg-white/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-1 text-white">End-to-end encryption</h3>
                <p className="text-sm text-white/70">Your data is protected by your secret key</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 flex items-start gap-3">
              <div className="p-2 rounded-full bg-white/20">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-1 text-white">Smart organizing</h3>
                <p className="text-sm text-white/70">Organize your digital footprint</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
