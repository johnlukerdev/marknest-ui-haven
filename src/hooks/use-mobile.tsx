
import { useState, useEffect } from 'react';

export const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [breakpoint]);

  return isMobile;
};

export default useMobile;
