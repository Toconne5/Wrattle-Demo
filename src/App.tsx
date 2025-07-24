import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import App from "./pages/App";  // Import App from pages folder
import Onboarding from "./pages/Onboarding";
import TransactionsPage from "@/pages/TransactionsPage";  // Correctly import TransactionsPage
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function AppRouter() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Define the routes for different pages */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/app" element={<App />} />
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Define the route for the transactions page */}
              {/* Pass onClose */}
              <Route
                path="/transactions"
                element={<TransactionsPage onClose={() => {}} />}
              />
              
              {/* Catch-all route for undefined paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default AppRouter;
