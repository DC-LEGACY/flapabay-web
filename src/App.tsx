import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import BottomNav from '@/components/bottom-nav/bottom-mobile-menu';
import { Toaster as Sonner } from 'sonner';
import { AppRoutes } from '@/routes/AppRoutes';
import Preloader from '@/components/common/Preloader';
import { BottomNavProvider } from '@/contexts/BottomNavContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "aos/dist/aos.css";
import "@/scss/main.scss";

if (typeof window !== "undefined") {
  import("bootstrap");
}

// Create a client
const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setResourcesLoaded(true);
    };

    // Check if the document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Wait for all resources to load
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (resourcesLoaded) {
      // Ensure loader shows for at least 2 seconds
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [resourcesLoaded]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <BottomNavProvider>
            <Toaster />
            {/* <Sonner /> */}
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </BottomNavProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default App;