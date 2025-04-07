import "aos/dist/aos.css";
import "@/scss/main.scss";

import * as DashboardRoutes from "@/routes/DashboardRoutes";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Aos from "aos";
import { AuthProvider } from "@/components/contexts/AuthContext";
import PublicRoutes from "@/routes/PublicRoutes";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import { ThemeProvider } from "./components/contexts/ThemeContext";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { userAtom } from "./context/atom";

// Import route groups



if (typeof window !== "undefined") {
  import("bootstrap");
}

function App() {
  const setUser = useSetAtom(userAtom);
  const queryClient = new QueryClient();

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <div className="wrapper ovh">
            <BrowserRouter>
              <ScrollTopBehaviour />
              <Routes>
                <Route path="/">
                  <PublicRoutes />
                  {/* <DashboardRoutes /> */}
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
