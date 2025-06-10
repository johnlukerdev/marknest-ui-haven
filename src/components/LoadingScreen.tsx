
import React from 'react';
import Logo from './Logo';

interface LoadingScreenProps {
  isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6 text-center px-6">
        {/* Animated Logo */}
        <div className="animate-pulse hover:animate-none">
          <Logo />
        </div>
        
        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-8 h-8 border-2 border-primary/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-8 h-8 border-2 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2 animate-fade-in">
          <h2 className="text-xl font-semibold text-foreground font-[Poppins]">
            Just a sec...
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            We're setting things up for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
