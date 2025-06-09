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

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState("Search");

  return (
    <div className="md:hidden lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-yellow-400 z-50 shadow-lg flex justify-around py-3 rounded-2xl shadow-sm">
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
  );
}