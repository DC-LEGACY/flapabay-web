import { useState, useEffect } from "react";

let globalIsMobile = false;

export const isMobile = () => globalIsMobile;

export const useScreenSize = () => {
  const [isMobileState, setIsMobileState] = useState(globalIsMobile);

  const checkScreenSize = () => {
    globalIsMobile = window.innerWidth <= 760; // Update global state
    setIsMobileState(globalIsMobile); // Update local state for reactivity
  };

  useEffect(() => {
    checkScreenSize(); // Check on initial load
    window.addEventListener("resize", checkScreenSize); // Listen for resize
    return () => {
      window.removeEventListener("resize", checkScreenSize); // Cleanup
    };
  }, []);

  return isMobileState; // Return the current state
};
