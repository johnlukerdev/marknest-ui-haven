
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LogoProps {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  // Check if we're inside a Router context by trying to use the hooks safely
  let navigate, location;
  try {
    navigate = useNavigate();
    location = useLocation();
  } catch (error) {
    // We're outside Router context, hooks will be undefined
    navigate = undefined;
    location = undefined;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (navigate && location) {
      // If we're already on the main page, just refresh content without changing URL
      if (location.pathname === '/') {
        window.location.reload();
      } else {
        // Otherwise, navigate to the main page
        navigate('/');
      }
    }
    // If no navigate function available, do nothing (loading screen case)
  };

  return (
    <div 
      className={`flex items-center gap-1 transition-all duration-200 ${navigate ? 'hover:cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <div className="relative h-8 w-8 overflow-hidden">
        <div className="absolute inset-0 gradient-primary rounded-full"></div>
        <div className="absolute inset-[2px] bg-background rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2.5 w-2.5 gradient-primary rounded-sm rotate-45"></div>
        </div>
      </div>
      <span className="text-lg font-bold tracking-tight font-[Poppins]">MarkNest</span>
    </div>
  );
};

export default Logo;
