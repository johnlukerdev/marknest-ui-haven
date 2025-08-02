import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import Logo from '@/components/Logo';
import { useTheme } from '@/hooks/use-theme';
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {
    theme,
    setTheme
  } = useTheme();

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
    navigate('/signin');
  };
  return <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Logo and Branding */}
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          
          {/* Main Content */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 font-[Poppins]">
              🚀 Get Started with MarkNest
            </h1>
            
            {/* Quick Start Info */}
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">
                You'll receive a unique key that instantly encrypts your data.
              </p>
            </div>
            
            {/* Value Proposition */}
            <div className="mb-8 text-center">
              <ul className="space-y-4 text-left max-w-md mx-auto">
                <li className="flex items-start">
                  <span className="mr-3 mt-1 text-lg">🔐</span>
                  <div>
                    <div className="font-semibold text-foreground text-base">Guarantees Your Privacy </div>
                    <div className="text-muted-foreground text-base">MarkNest won't be able to see, access,  your content  </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 text-lg">🌍</span>
                  <div>
                    <div className="font-semibold text-foreground text-base">Access from Anywhere</div>
                    <div className="text-muted-foreground text-base">Syncs across all your devices, automatically.</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 text-lg">🚫</span>
                  <div>
                    <div className="font-semibold text-foreground text-base">No Ads, No Spying</div>
                    <div className="text-muted-foreground text-base">We never track or sell your data — ever.</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1 text-lg">🛡️</span>
                  <div>
                    <div className="font-semibold text-foreground text-base">Private by Design</div>
                    <div className="text-muted-foreground text-base">Your secret key encrypts everything you save.</div>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* CTA Buttons */}
            <div className="space-y-4 mt-8">
              <Button className="w-full py-6 text-lg gradient-primary focus:ring-0" onClick={handleGetSecretKey}>
                Get Your Secret Key
              </Button>
            </div>
            
            {/* Link to Sign In */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button onClick={handleSignIn} className="text-primary hover:underline">
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default SignUp;