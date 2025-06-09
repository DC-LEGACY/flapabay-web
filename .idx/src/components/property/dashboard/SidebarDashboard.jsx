import { Link } from "react-router-dom";
import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authStore";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home2, Message, Calendar, Like1, SearchNormal1, Chart, Profile2User, AddSquare, InfoCircle, Home, Heart, MessageText1, Logout, ArrowSwapHorizontal } from 'iconsax-react';

const SidebarDashboard = () => {
  const { pathname } = useLocation();
  const [user] = useAtom(userAtom);
  const { signOut, updateUserRole } = useAuth();
  const isHosting = user?.role === 'host';

  const sidebarItems = [
    {
      items: [
        {
          href: "/dashboard/host",
          icon: Home2,
          text: "Today",
        },
       
        {
          href: "/dashboard/host/messages",
          icon: Message,
          text: "Messages",
        },
        {
          href: "/dashboard/host/calendar",
          icon: Calendar,
          text: "Calendar",
        },
        {
          href: "/dashboard/host/experiences",
          icon: Like1,
          text: "Experiences",
        },
        {
          href: "/dashboard/host/listings",
          icon: SearchNormal1,
          text: "Listing",
        },
        {
          href: "/dashboard/host/earnings",
          icon: Chart,
          text: "Earnings",
        },
        {
          href: "/dashboard/host/payments",
          icon: Chart,
          text: "Payments",
        },
        {
          href: "/dashboard/host/profile",
          icon: Profile2User,
          text: "Profile",
        },
        {
          href: "/dashboard/add-property",
          icon: AddSquare,
          text: "Create new listings",
        },
        {
          href: "/help-center",
          icon: InfoCircle,
          text: "Help Center",
        },
      ],
    },
  ];

  const travellingSidebarItems = [
    {
      items: [
        {
          href: "/",
          icon: Home,
          text: "Explore",
        },
        {
          href: "/dashboard/guest",
          icon: Home2,
          text: "Today",
        },
        {
          href: "/dashboard/guest/wishlist",
          icon: Heart,
          text: "Wishlist",
        },
        {
          href: "/dashboard/guest/reviews",
          icon: Like1,
          text: "Reviews",
        },
        {
          href: "/dashboard/guest/trips",
          icon: Home,
          text: "Trips",
        },
        {
          href: "/dashboard/guest/messages",
          icon: MessageText1,
          text: "Messages",
        },
        {
          href: "/help-center",
          icon: InfoCircle,
          text: "Help Center",
        },
      ],
    },
  ];

  let currentItemsToRender = isHosting ? sidebarItems[0].items : travellingSidebarItems[0].items;
  
  currentItemsToRender = currentItemsToRender.filter(item => item.text !== "Logout");

  const getActiveClass = (href) => {
    if (!isHosting && href === "/dashboard/guest/messages") {
      return "-is-active";
    }
    return pathname === href ? "-is-active" : "";
  };

  return (
    <div className="dashboard__sidebar Z-100 d-none d-lg-block">
      <div className="container">
        <div className="col-12 col-lg-auto">
          <div className="pb-5 text-center right-4 w-30 text-lg-center d-flex align-items-center">
            <div className="me-2 me-xl-5">
              <Link className="w-9 h-9" to="/">
                <img className="w-full h-full" src="/images/icon-alt.svg" alt="Header Logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard_sidebar_list">
        <div>
            {currentItemsToRender.map((item, itemIndex) => {
              const IconComponent = item.icon;
              return (
                <div key={itemIndex} className="sidebar_list_item">
                  <Link
                    to={item.href}
                    className={`items-center ${getActiveClass(item.href)}`}
                  >
                    <IconComponent className="mr15" size={24} />
                    {item.text}
                  </Link>
                </div>
              );
            })}
            <div className="sidebar_list_item">
              <Link
                onClick={async () => await signOut()}
                className="items-center"
              >
                <Logout className="mr15" size={24} />
                Logout
              </Link>
            </div>
            
        </div>
      </div>
      <button 
        onClick={async () => {
          const newRole = user?.role === 'host' ? 'guest' : 'host';
          await updateUserRole(newRole);
        }}
        className="fixed bottom-8 font-medium bg-flapabay-black text-white border-3 rounded-2xl mx-auto block w-full border-flapabay-yellow border px-4 py-4 flex items-center gap-2 relative"
      >
        <ArrowSwapHorizontal size={30} className="w-8 h-8 text-white" />
        <span>{user?.role === 'host' ? 'Hosting' : 'Travelling'}</span>
        <div className={`absolute w-3 h-3 rounded-full animate-pulse ${user?.role === 'host' ? 'bg-yellow-400' : 'bg-green-500'} right-4 top-1/2 transform -translate-y-1/2`} />
      </button>
    </div>
  );
};

export default SidebarDashboard;
