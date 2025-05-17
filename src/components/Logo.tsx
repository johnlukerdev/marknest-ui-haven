
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-primary rounded-md rotate-45 transform-origin-center"></div>
        <div className="absolute inset-1 bg-background rounded-sm rotate-45 transform-origin-center"></div>
        <div className="absolute inset-[40%] bg-primary rounded-sm rotate-45 transform-origin-center"></div>
      </div>
      <span className="text-xl font-bold tracking-tight">MarkNest</span>
    </div>
  );
};

export default Logo;
