import { Link } from "react-router-dom";
import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authStore";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SidebarDashboard = () => {
  const { pathname } = useLocation();
  const [user] = useAtom(userAtom);
  const { switchRole } = useAuth();
  const isHosting = user?.role === 'host';

  const sidebarItems = [
    {
      items: [
        {
          href: "/dashboard",
          icon: "flaticon-discovery",
          text: "Today",
        },
        {
          href: "/dashboard-message",
          icon: "flaticon-chat-1",
          text: "Messages",
        },
        {
          href: "/dashboard-calender",
          icon: "flaticon-home",
          text: "Calender",
        },
        {
          href: "/dashboard-my-favourites",
          icon: "flaticon-like",
          text: "Reservation",
        },
        {
          href: "/dashboard-host-Experiences",
          icon: "flaticon-like",
          text: "Experiences",
        },
        {
          href: "/dashboard-saved-search",
          icon: "flaticon-search-2",
          text: "Listing",
        },
        {
          href: "/dashboard-earnings",
          icon: "flaticon-new-tab",
          text: "Earnings",
        },
        {
          href: "/dashboard-reviews",
          icon: "flaticon-review",
          text: "Insights",
        },
        {
          href: "/dashboard-host-reviews",
          icon: "flaticon-review",
          text: "Reviews",
        },
        {
          href: "/dashboard-host-aihost",
          icon: "flaticon-review",
          text: "AIHOST",
        },
        {
          href: "/create-listing",
          icon: "flaticon-new-tab",
          text: "Create new listings",
        },
        {
          href: "/dashboard-guidebook",
          icon: "flaticon-protection",
          text: "Guidbooks",
        },
        {
          href: "/dashboard-experience",
          icon: "flaticon-protection",
          text: "Host an experience",
        },
        {
          href: "/help-center",
          icon: "flaticon-protection",
          text: "Help Center",
        },
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "Logout",
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
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "Today",
        },
        {
          href: "/whishlist-page",
          icon: "flaticon-home-1",
          text: "Wishlist",
        },
        {
          href: "/dashboard-host-reviews",
          icon: "flaticon-review",
          text: "Reviews",
        },
        {
          href: "/whishlist-page",
          icon: "flaticon-home-1",
          text: "Trips",
        },
        {
          href: "/dashboard-message",
          icon: "flaticon-chat-1",
          text: "Messages",
        },
        {
          href: "/dashboard-experience",
          icon: "flaticon-protection",
          text: "Host an experience",
        },
        {
          href: "/help-center",
          icon: "flaticon-protection",
          text: "Help Center",
        },
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "Logout",
        },
      ],
    },
  ];

  const currentSidebarItems = isHosting ? sidebarItems : travellingSidebarItems;

  const getActiveClass = (href) => {
    if (!isHosting && href === "/dashboard-message") {
      return "-is-active"; // Automatically set as active when in Travelling mode
    }
    return pathname === href ? "-is-active" : ""; // Set as active based on pathname
  };

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="container">
        <div className="col-12 col-lg-auto">
          <div className="pb-5 text-center right-4 w-30 text-lg-center d-flex align-items-center">
            <div className="me-2 me-xl-5">
              <Link className="w-9 h-9" to="/">
                <img className="w-full h-full" src="/images/icon-alt.svg" alt="Header Logo" />
              </Link>
            </div>
            {/* End Logo */}
          </div>
        </div>
      </div>
      <div className="dashboard_sidebar_list">
        {currentSidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${
                sectionIndex === 0 ? "mt-0" : "mt30"
              }`}
            >
              {section.title}
            </p>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                <Link
                  to={item.href} // Path to navigate to
                  className={`items-center ${getActiveClass(item.href)}`} // Get the active class
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={switchRole} className="font-medium">
        Switch to {user?.role === 'guest' ? 'Hosting' : 'Travelling'}
      </button>
    </div>
  );
};

export default SidebarDashboard;
