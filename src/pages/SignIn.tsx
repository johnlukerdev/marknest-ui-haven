
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';
import { Shield, Lock, Key, Bookmark, ArrowRight } from 'lucide-react';
import { Label } from '@/components/ui/label';

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
      {/* Left Section - Modern Design */}
      <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-20 justify-center relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(120,119,198,0.1),_rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="relative z-10">
          <div className="mb-12">
            <Logo />
          </div>
          
          <div className="space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-[Poppins] bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            
            <p className="text-indigo-400 text-xl md:text-2xl mb-6 leading-relaxed">
              Your digital nest awaits. Access your bookmarks securely.
            </p>
            
            <div className="space-y-6 mt-8">
              {/* Feature highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card/30 backdrop-blur-sm p-4 rounded-xl border border-indigo-500/10 flex items-start gap-3">
                  <div className="p-2 rounded-full bg-indigo-500/10">
                    <Shield className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">End-to-end encryption</h3>
                    <p className="text-sm text-muted-foreground">Your data is protected by your secret key</p>
                  </div>
                </div>
                
                <div className="bg-card/30 backdrop-blur-sm p-4 rounded-xl border border-purple-500/10 flex items-start gap-3">
                  <div className="p-2 rounded-full bg-purple-500/10">
                    <Bookmark className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Smart organizing</h3>
                    <p className="text-sm text-muted-foreground">Organize your digital footprint</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                className="text-lg py-7 px-8 rounded-xl gradient-primary w-full sm:w-auto min-w-[180px] group flex items-center gap-2"
                onClick={() => navigate('/secret-key', { state: { isSignIn: true } })}
              >
                Sign In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                className="text-lg py-7 px-8 rounded-xl border-[1.5px] border-indigo-500/20 hover:border-indigo-500/50 w-full sm:w-auto min-w-[180px] bg-transparent hover:bg-card/30"
                onClick={() => navigate('/signup')}
              >
                Create Account
              </Button>
            </div>
            
            <p className="text-muted-foreground text-sm mt-4">
              First time? Start by <a className="text-indigo-400 hover:underline cursor-pointer" onClick={() => navigate('/signup')}>creating your account</a> and getting your secret key.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Section - Dark Shade Design */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center justify-center relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(120,119,198,0.15),_rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_rgba(147,51,234,0.15),_rgba(255,255,255,0))]"></div>
        </div>
        
        {/* Floating elements - Enhanced */}
        <div className="absolute top-[15%] left-[20%] w-20 h-20 bg-indigo-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-[40%] right-[10%] w-16 h-16 bg-purple-500/20 rounded-full blur-lg animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-[20%] left-[15%] w-24 h-24 bg-indigo-400/10 rounded-full blur-xl"></div>
        
        {/* Main 3D illustration container - Enhanced */}
        <div className="relative z-10 w-[350px] h-[350px] perspective-1000">
          <div className="w-full h-full relative transform-style-3d animate-float">
            {/* Front facing card */}
            <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-slate-700/40 to-slate-800/60 rounded-3xl flex flex-col items-center justify-center backdrop-blur-sm border border-slate-600/30 shadow-2xl transform translate-z-20 rotate-y-0 transition-all duration-500">
              {/* Top section with security icons */}
              <div className="flex gap-6 mb-8">
                <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-400/30 hover:scale-105 transition-transform cursor-pointer">
                  <Shield className="w-8 h-8 text-indigo-300" />
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-400/30 hover:scale-105 transition-transform cursor-pointer">
                  <Lock className="w-8 h-8 text-purple-300" />
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30 hover:scale-105 transition-transform cursor-pointer">
                  <Key className="w-8 h-8 text-blue-300" />
                </div>
              </div>
              
              {/* Central bookmark icon */}
              <div className="p-6 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl mb-8 border border-indigo-400/20 hover:scale-105 transition-transform cursor-pointer">
                <Bookmark className="w-16 h-16 text-indigo-200" />
              </div>
              
              {/* Bottom decorative elements */}
              <div className="space-y-3 w-full px-8">
                <div className="h-2 bg-gradient-to-r from-indigo-400/40 to-purple-400/40 rounded-full"></div>
                <div className="h-2 bg-gradient-to-r from-purple-400/40 to-indigo-400/40 rounded-full w-3/4"></div>
                <div className="h-2 bg-gradient-to-r from-indigo-400/40 to-blue-400/40 rounded-full w-1/2"></div>
              </div>
            </div>
            
            {/* Floating elements behind main card */}
            <div className="absolute w-[280px] h-[280px] bg-slate-900/50 rounded-3xl border border-slate-700/20 transform translate-z-[-40px] translate-x-16 translate-y-8 rotate-y-[-8deg] blur-[1px]"></div>
            <div className="absolute w-[260px] h-[260px] bg-slate-900/30 rounded-3xl border border-slate-700/10 transform translate-z-[-80px] translate-x-24 translate-y-12 rotate-y-[-12deg] blur-[2px]"></div>
          </div>
        </div>
        
        {/* Bottom text */}
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <p className="text-slate-300 text-lg font-medium mb-2">Secure Storage for Your Digital Life</p>
          <p className="text-slate-400 text-sm">Protected by end-to-end encryption</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
