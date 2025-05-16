import React, { useState } from 'react';
import { useBottomNav } from '@/contexts/BottomNavContext';
import {
  Calendar,
  Home2,
  HomeTrendUp,
  Message,
  ProfileCircle,
  Heart,
  Briefcase, ArrowSwapHorizontal,
} from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import { useAtom } from 'jotai';
import { userAtom } from '@/store/authStore';
import { useAuth } from '@/contexts/AuthContext';

const BottomNav = () => {
  const { showBottomNav } = useBottomNav();
  const { switchRole } = useAuth();
  const [user] = useAtom(userAtom);
  const location = useLocation();

  if (!showBottomNav) return null;

  // Define tabs based on user state and role
  const getTabs = () => {
    if (!user) {
      // Not logged in
      return [
        { name: "Search", icon: <Home2 size="24" variant="Outline" strokeWidth={2} />, to: "/" },
        { name: "Wishlist", icon: <Heart size="24" variant="Outline" strokeWidth={2} />, to: "#", onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          const modal = document.getElementById('loginSignupModal');
          if (modal) {
            const bsModal = new (window as any).bootstrap.Modal(modal);
            bsModal.show();
          }
        }},
        { name: "Profile", icon: <ProfileCircle size="24" variant="Outline" strokeWidth={2} />, to: "#", onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          const modal = document.getElementById('loginSignupModal');
          if (modal) {
            const bsModal = new (window as any).bootstrap.Modal(modal);
            bsModal.show();
          }
        }},
      ];
    }

    if (user.role === 'host') {
      // Host mode
      return [
        { name: "Today", icon: <Home2 size="24" variant="Outline" strokeWidth={2} />, to: "/dashboard/host" },
        { name: "Messages", icon: <Message size="24" variant="Outline" strokeWidth={2} />, to: "/dashboard/guest/messages" },
        { name: "Calendar", icon: <Calendar size="24" variant="Outline" strokeWidth={2} />, to: "/dashboard/host/calendar" },
        { name: "Listings", icon: <Briefcase size="24" variant="Outline" strokeWidth={2} />, to: "/dashboard/host/listings" },
        { name: "Profile", icon: <ProfileCircle size="24" variant="Outline" strokeWidth={2} />, to: "/dashboard/host/profile" },
      ];
    }

    // Guest mode
    return [
      { name: "Search", icon: <Home2 size="24" variant="Outline" strokeWidth={2} />, to: "/" },
      { name: "Wishlist", icon: <Heart size="24" variant="Outline" strokeWidth={2} />, to: "/dashboard/guest/wishlist" },
      { name: "Trips", icon: <HomeTrendUp size="24" variant="Outline" strokeWidth={2} />, to: "/dashboard/guest/trips" },
      { name: "Messages", icon: <Message size="24" variant="Outline" strokeWidth={2} />, to: "/dashboard/guest/messages" },
      { name: "Profile", icon: <ProfileCircle size="24" variant="Outline" strokeWidth={2} />, to: "/dashboard/guest/profile" },
    ];
  };

  const tabs = getTabs();

  return (
    <div className="fixed rounded-2xl bottom-4 left-1/2 transform -translate-x-1/2 right-0 w-[97%] z-50 bg-transparent md:hidden">
      <div className="w-full rounded-2xl bg-flapabay-yellow shadow-md flex justify-around py-3">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          return (
            <Link
              key={tab.name}
              to={tab.to}
              onClick={tab.onClick}
              className={`flex flex-col items-center text-[12px] transition-all duration-200 ${
                isActive ? "text-white font-semibold [&_svg]:text-white" : "text-black [&_svg]:text-black"
              }`}
            >
              <span className="text-[24px] mb-1">{React.cloneElement(tab.icon, { variant: isActive ? "Bold" : "Outline" })}</span>
              {tab.name}
            </Link>
          );
        })}
        {user && (
          <button 
            onClick={switchRole}
            className="font-medium text-sm bg-flapabay-black text-white rounded-2xl px-3 py-2 flex items-center gap-2"
          >
            <ArrowSwapHorizontal className="w-4 h-4 text-white" />
            <span>{user?.role === 'host' ? 'Travelling' : 'Hosting'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
