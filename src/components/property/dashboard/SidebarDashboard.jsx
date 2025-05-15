import { Link } from "react-router-dom";
import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authStore";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
          icon: "flaticon-discovery",
          text: "Today",
        },
        {
          href: "/dashboard/guest/messages",
          icon: "flaticon-chat-1",
          text: "Messages",
        },
        {
          href: "/dashboard/host/calendar",
          icon: "flaticon-home",
          text: "Calendar",
        },
        {
          href: "/dashboard/host/experiences",
          icon: "flaticon-like",
          text: "Experiences",
        },
        {
          href: "/dashboard/host/listings",
          icon: "flaticon-search-2",
          text: "Listing",
        },
        {
          href: "/dashboard/host/earnings",
          icon: "flaticon-new-tab",
          text: "Earnings",
        },
        {
          href: "/dashboard/host/profile",
          icon: "flaticon-review",
          text: "Profile",
        },
        {
          href: "/dashboard/add-property",
          icon: "flaticon-new-tab",
          text: "Create new listings",
        },
        {
          href: "/help-center",
          icon: "flaticon-protection",
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
          icon: "flaticon-home-1",
          text: "Explore",
        },
        {
          href: "/dashboard/guest",
          icon: "flaticon-discovery",
          text: "Today",
        },
        {
          href: "/dashboard/guest/wishlist",
          icon: "flaticon-home-1",
          text: "Wishlist",
        },
        {
          href: "/dashboard/guest/reviews",
          icon: "flaticon-review",
          text: "Reviews",
        },
        {
          href: "/dashboard/guest/trips",
          icon: "flaticon-home-1",
          text: "Trips",
        },
        {
          href: "/dashboard/guest/messages",
          icon: "flaticon-chat-1",
          text: "Messages",
        },
        {
          href: "/help-center",
          icon: "flaticon-protection",
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
            {currentItemsToRender.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                <Link
                  to={item.href}
                  className={`items-center ${getActiveClass(item.href)}`}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))}
            <div className="sidebar_list_item">
              <button
                onClick={async () => await signOut()}
                className="items-center"
              >
                <i className="flaticon-logout mr15" />
                Logout
              </button>
            </div>
        </div>
      </div>
      <button 
        onClick={async () => {
          const newRole = user?.role === 'guest' ? 'host' : 'guest';
          await updateUserRole(newRole);
        }}
        className="font-medium py-2 px-4 my-4 mx-auto block border rounded hover:bg-gray-100 active:bg-gray-200"
      >
        Switch to {user?.role === 'guest' ? 'Hosting' : 'Travelling'}
      </button>
    </div>
  );
};

export default SidebarDashboard;
