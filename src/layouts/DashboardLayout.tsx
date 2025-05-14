import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/feedback/tooltip';

import BottomNav from '@/components/bottom-nav/bottom-mobile-menu';

import { useBottomNav } from '@/contexts/BottomNavContext';
import { useScreenSize } from '@/utilis/screenUtils';

const DashboardLayout = () => {
  const { setShowBottomNav, showBottomNav } = useBottomNav(); 
  useEffect(() => {
    // Show BottomNav on the landing page
    setShowBottomNav(true);
    // Cleanup: hide BottomNav when leaving the page 
    return () => setShowBottomNav(false);
  }, [setShowBottomNav]);
  const isMobile = useScreenSize();

  return (
    <>
    {showBottomNav && <BottomNav />}
    <TooltipProvider>
      <Outlet />
    </TooltipProvider>
    </>
  );
};

export default DashboardLayout; 