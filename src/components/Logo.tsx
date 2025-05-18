
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2.5 transition-all duration-200 hover:cursor-pointer">
      <div className="relative h-10 w-10 overflow-hidden">
        <div className="absolute inset-0 gradient-primary rounded-full"></div>
        <div className="absolute inset-[3px] bg-background rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3.5 w-3.5 gradient-primary rounded-sm rotate-45"></div>
        </div>
      </div>
      <span className="text-xl font-bold tracking-tight font-[Poppins]">MarkNest</span>
    </div>
  );
};

export default Logo;
