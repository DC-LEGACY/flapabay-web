import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import SidebarPanel from "@/components/common/sidebar-panel";
import { modeAtom } from "@/store/atom";
import { useAtom } from "jotai";

// import MainMenu from "@/components/common/MainMenu";




const DashboardHeader = () => {
  const [isHosting, setIsHosting] = useAtom(modeAtom); // Get the current mode and setter function

  const handleSwitch = () => {
    setIsHosting(!isHosting); // Toggle the mode state
  };
  const { pathname } = useLocation();

  const menuItems = [
    {
      
      items: [
        {
          icon: "flaticon-discovery",
          text: "Dashboard",
          href: "/dashboard-home",
        },
        {
          icon: "flaticon-chat-1",
          text: "Messages",
          href: "/dashboard-message",
        },
        {
          icon: "flaticon-chat-1",
          text: "Trips",
          href: "/trip-page",
        },
        {
          icon: "flaticon-chat-1",
          text: "Wishlists",
          href: "/whishlist-page",
        },
      ],
    },
    {
      
      items: [
        {
          // href: "/dashboard-add-property",
          href: "/create-listing",
          icon: "flaticon-new-tab",
          text: "Create new listings",
        },
        {
          href: "/dashboard-experience",
          // href: "/dashboard-my-package",
          icon: "flaticon-protection",
          text: "Host an experience",
        },
      ],
    },
    {
      
      items: [
        
        {
          icon: "flaticon-user",
          text: "My Profile",
          href: "/dashboard-my-profile",
        },
        {
          icon: "flaticon-user",
          text: "Account",
          href: "/account-page",
        },
        { icon: "flaticon-exit", text: "Logout", href: "/login" },
      ],
    },
  ];

  return (
    <>
      <header className="header-nav nav-homepage-style light-header position-fixed menu-home4 main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link className="logo" to="/">
                      <img src="/images/logo.svg" alt="Header Logo" />
                    </Link>
                  </div>
                  {/* End Logo */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="d-none d-lg-block col-lg-auto">
                {/* End Main Menu */}
              </div>
              {/* End d-none d-lg-block */}

              <div className="flex items-center col-6 col-lg-auto">
                <Link
                  onClick={handleSwitch}
                  className="mb-2 mr-5 font-medium "
                  
                  // to="/wizards"
                >
                  {isHosting ? "Switch to Travelling" : "Switch to Hosting"}
                  {/* <i className="fal fa-arrow-right-long" /> */}
                </Link>
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="p-0 mb0 d-flex justify-content-center justify-content-sm-end">
                    <li className="d-none d-sm-block">
                      {/* <Link className="text-center mr15" to="/login">
                        <span className="flaticon-email" />
                      </Link> */}
                    </li>
                    {/* End email box */}

                    <li className="d-none d-sm-block">
                      <a className="text-center mr20 notif" href="#">
                        <span className="flaticon-bell" />
                      </a>
                    </li>

                    {/* End notification icon */}

                    <li className=" user_setting">
                      <div className="dropdown">
                        <a className="btn" href="#" data-bs-toggle="dropdown">
                          <img src="/images/resource/user.png" alt="user.png" />
                        </a>
                        <div className="dropdown-menu">
                          <div className="user_setting_content">
                            {menuItems.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                {/* <p
                                  className={`fz15 fw400 ff-heading ${
                                    sectionIndex === 0 ? "mb20" : "mt30"
                                  }`}
                                >
                                  {section.title}
                                </p> */}
                                {section.items.map((item, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    className={`dropdown-item ${
                                      pathname == item.href ? "-is-active" : ""
                                    } `}
                                    to={item.href}
                                  >
                                    <i className={`${item.icon} mr10`} />
                                    {item.text}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* End avatar dropdown */}
                  </ul>
                </div>
              </div>
              {/* End .col-6 */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default DashboardHeader;
