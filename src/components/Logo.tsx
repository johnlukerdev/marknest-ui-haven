
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-9 w-9 overflow-hidden">
        <div className="absolute inset-0 gradient-primary rounded-lg"></div>
        <div className="absolute inset-[3px] bg-background rounded-md"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 gradient-primary rounded-sm rotate-45"></div>
        </div>
      </div>
      <span className="text-xl font-bold tracking-tight font-[Poppins]">MarkNest</span>
    </div>
  );
};

export default Logo;
