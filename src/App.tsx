import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, useEffect } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Admin from "./pages/Admin.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";


import About from "./pages/About.tsx";
import WhoHelps from "./pages/WhoHelps.tsx";
import HowToChoose from "./pages/HowToChoose.tsx";
import ThreeStages from "./pages/ThreeStages.tsx";
import HelpNearby from "./pages/HelpNearby.tsx";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          
          <Route path="/about" element={<About />} />
          <Route path="/articles/who-helps" element={<WhoHelps />} />
          <Route path="/articles/how-to-choose" element={<HowToChoose />} />
          <Route path="/articles/three-stages" element={<ThreeStages />} />
          <Route path="/help" element={<HelpNearby />} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
