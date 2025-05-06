import React from 'react';
import { useBottomNav } from '@/contexts/BottomNavContext';
import {
    Calendar,
    Home2,
    HomeTrendUp,
    Message,
    ProfileCircle,
  } from "iconsax-react";
  
  import { Link } from "react-router-dom";
  import { useState } from "react";
  
  const tabs = [
    { name: "Search", icon: <Home2 size="24" variant="Bold" />, to: "/" },
    { name: "Wishlist", icon: <Calendar size="24" variant="Bold" />, to: "/whishlist-page" },
    { name: "Trips", icon: <HomeTrendUp size="24" variant="Bold" />, to: "/trip-page" },
    { name: "Messages", icon: <Message size="24" variant="Bold" />, to: "/dashboard-message" },
    { name: "Profile", icon: <ProfileCircle size="24" variant="Bold" />, to: "/account-page" },
  ];
  
  const BottomNav = () => {
    const { showBottomNav } = useBottomNav();
    const [activeTab, setActiveTab] = useState("Search");
  //  alert(showBottomNav);
    if (!showBottomNav) return null;
  
    return (
      <div className="z-10 fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-yellow-400 z-50 shadow-lg flex justify-around py-3 rounded-2xl shadow-sm">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.to}
              className="flex flex-col items-center text-white"
            >
              <button
                onClick={() => setActiveTab(tab.name)}
                className={`flex flex-col items-center text-[12px] transition-all duration-300 ease-in-out ${
                  activeTab === tab.name ? "text-black font-semibold" : "text-white opacity-80"
                }`}
              >
                <span className="text-[24px] mb-1">{tab.icon}</span>
                {tab.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  
  export default BottomNav;