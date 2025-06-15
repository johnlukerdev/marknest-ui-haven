
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Logo from '@/components/Logo';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Force dark mode
  useEffect(() => {
    if (theme !== 'dark') {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 bg-background">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="mb-12">
            <Logo />
          </div>
          
          {/* Form */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Sign In
              </h1>
              <p className="text-muted-foreground text-lg">
                Welcome back! Please sign in to your account.
              </p>
            </div>
            
            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
                    required
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </button>
              </div>
              
              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
              >
                Sign In
              </Button>
              
              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-muted-foreground">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Right Section - Dark Gradient Design */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Main Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
        {/* Secondary Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-blue-900/20" />
        
        {/* Abstract Shapes */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tl from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12">
          <div className="max-w-md space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm" />
            </div>
            
            <h2 className="text-3xl font-bold text-white">
              Welcome to MarkNest
            </h2>
            
            <p className="text-lg text-gray-300">
              Your digital sanctuary for organizing and accessing your favorite content with ultimate security and elegance.
            </p>
            
            <div className="flex justify-center space-x-2 pt-4">
              <div className="w-2 h-2 bg-white/40 rounded-full" />
              <div className="w-2 h-2 bg-white/60 rounded-full" />
              <div className="w-2 h-2 bg-white/80 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
