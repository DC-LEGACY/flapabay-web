import { Link } from "react-router-dom";
import React from "react";
import { modeAtom } from "../../../context/atom";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";

const SidebarDashboard = () => {
  const { pathname } = useLocation();
  const [isHosting] = useAtom(modeAtom);

  const sidebarItems = [
    {
      items: [
        {
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "Today",
        },
        {
          href: "/dashboard-message",
          icon: "flaticon-chat-1",
          text: "Messages",
        },
        {
          // href: "/dashboard-my-properties",
          href: "/dashboard-calender",
          icon: "flaticon-home",
          text: "Calender",
        },
        {
          // href: "/dashboard-my-favourites",
          href: "/dashboard-my-favourites",
          icon: "flaticon-like",
          text: "Reservation",
        },
        {
          // href: "/dashboard-my-favourites",
          href: "/dashboard-host-Experiences",
          icon: "flaticon-like",
          text: "Experiences",
        },
        {
          // href: "/dashboard-saved-search",
          href: "/dashboard-saved-search",
          icon: "flaticon-search-2",
          text: "Listing",
        },
        {
          // href: "/dashboard-add-property",
          href: "/dashboard-earnings",
          icon: "flaticon-new-tab",
          text: "Earnings",
        },
        {
          // href: "/dashboard-reviews",
          href: "/dashboard-reviews",
          icon: "flaticon-review",
          text: "Insights",
        },
        {
          // href: "/dashboard-reviews",
          href: "/dashboard-host-reviews",
          icon: "flaticon-review",
          text: "Reviews",
        },
        {
          // href: "/dashboard-reviews",
          href: "/dashboard-host-aihost",
          icon: "flaticon-review",
          text: "AIHOST",
        },
        {
          // href: "/dashboard-add-property",
          href: "/create-listing",
          icon: "flaticon-new-tab",
          text: "Create new listings",
        },
        {
          href: "/dashboard-guidebook",
          // href: "/dashboard-my-package",
          icon: "flaticon-protection",
          text: "Guidbooks",
        },
        {
          href: "/dashboard-experience",
          // href: "/dashboard-my-package",
          icon: "flaticon-protection",
          text: "Host an experience",
        },
        {
          href: "/help-center",
          // href: "/dashboard-my-package",
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
          // href: "/dashboard-reviews",
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
          // href: "/dashboard-my-package",
          icon: "flaticon-protection",
          text: "Host an experience",
        },
        {
          href: "/help-center",
          // href: "/dashboard-my-package",
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
              <Link className="logo" to="/">
                <img style={{width: 134, paddingLeft:4}} src="/images/icon.svg" alt="Header Logo" />
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
    </div>
  );
};

export default SidebarDashboard;
