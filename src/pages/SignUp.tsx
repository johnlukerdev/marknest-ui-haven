
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Sparkles, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-6 shadow-2xl shadow-purple-500/25">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Mark<span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">Nest</span>
          </h2>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">
              Join MarkNest Today
            </h1>
            <p className="text-slate-300 text-lg">
              Your privacy comes first:
            </p>
          </div>

          {/* Features Grid */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Everything encrypted with your Secret Key</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Access from any device securely</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">No tracking, no ads, no compromises</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 text-white border-0 rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02] focus:ring-0 focus:ring-offset-0"
            onClick={handleGetSecretKey}
          >
            <span className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Get Your Secret Key</span>
            </span>
          </Button>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <button
                onClick={handleSignIn}
                className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text hover:from-purple-300 hover:to-blue-300 font-medium transition-all duration-300 hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Secure • Private • Encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
