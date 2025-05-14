import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from "@/components/common/default-footer/";
import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu/";
import BottomNav from '@/components/bottom-nav/bottom-mobile-menu';

import { useBottomNav } from '@/contexts/BottomNavContext';
import { useScreenSize } from '@/utilis/screenUtils';



const WebsiteLayout = () => {
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

    <div className="min-h-screen flex flex-col">
      <DefaultHeader />
      <MobileMenu />
      {showBottomNav && <BottomNav />}
      

      <main className="flex-grow">
        <Outlet />
      </main>
      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>

    </div>
    </>
  );
};

export default WebsiteLayout; 