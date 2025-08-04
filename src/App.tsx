
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SecretKey from "./pages/SecretKey";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/use-theme";
import Trash from "./pages/Trash";
import Archive from "./pages/Archive";
import Settings from "./pages/Settings";
import BillingHistory from "./pages/BillingHistory";
import ManageSubscription from "./pages/ManageSubscription";
import { BookmarkProvider } from "./hooks/useBookmarkContext";
import LoadingScreen from "./components/LoadingScreen";
import { useInitialLoad } from "./hooks/useInitialLoad";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = useInitialLoad();

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/secret-key" element={<SecretKey />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/billing-history" element={<BillingHistory />} />
            <Route path="/manage-subscription" element={<ManageSubscription />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BookmarkProvider>
          <AppContent />
        </BookmarkProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
