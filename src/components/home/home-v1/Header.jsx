import React, { useEffect, useRef, useState } from "react";

import CurrencyModal from "./CurrencyModal";
import { Link } from "react-router-dom";
import LoginSignupModal from "@/components/common/login-signup-modal";
import MainMenu from "@/components/common/MainMenu";
import { RiGlobalLine } from "react-icons/ri";
import SidebarPanel from "@/components/common/sidebar-panel";
import { modeAtom } from "../../../context/atom";
import { useAtom } from "jotai";
import { userAtom } from "../../../context/atom";



const Header = () => {
  const [navbar, setNavbar] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const [isHosting, setIsHosting] = useAtom(modeAtom); // Get the current mode and setter function

  const handleSwitch = () => {
    setIsHosting(!isHosting); // Toggle the mode state
  };

  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style main-menu  ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
      >
        <nav className="posr">
          <div className="container-fluid container-fluidest posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" to="/">
                      <img src="/images/logo.svg" alt="Main Header Logo" />
                    </Link>
                    <Link className="header-logo logo2" to="/">
                      <img src="/images/logo.svg" alt="Secondary Header Logo" />
                    </Link>
                  </div>
                  {/* End Logo */}
                  <MainMenu />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  {user ? (
                    <Link
                      onClick={handleSwitch}
                      className="font-medium "
                      to="/dashboard-home"
                    >
                      {isHosting ? "Switch to Travelling" : "Switch to Hosting"}
                    </Link>
                  ) : (
                    <Link to={"/flapabay-your-home"} className="font-medium">Flapabay your home</Link>
                  )}

                  <div className="flex items-center">
                    {/* Global Icon to Open Modal */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="p-2 text-xl"
                    >
                      <RiGlobalLine />
                    </button>
                  </div>

                  <div className="relative">
                    {user ? (
                      <>
                        <span className="font-medium">{user?.fname}</span>
                        <div className="relative w-10 h-10 bg-gray-500 rounded-full">
                          <img
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-10 h-10 rounded-full cursor-pointer"
                            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                            alt="User Avatar"
                          />
                        </div>

                        {/* Dropdown Modal */}
                        {isDropdownOpen && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                          >
                            <button className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                              <Link to={"/dashboard-home"} className="font-medium ">
                                Dashboard
                              </Link>
                            </button>
                            <button className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                              <Link to={"/dashboard-message"} className="font-medium ">
                                Message
                              </Link>
                            </button>
                            <button className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                              <Link to={"/trip-page"} className="font-medium ">
                                Trips
                              </Link>
                            </button>
                            <button className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                              <Link to={"/whishlist-page"} className="font-medium ">
                                Wishlists
                              </Link>
                            </button>
                            <button className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                              <Link to={"/create-listing"} className="font-medium ">
                                Create new listing
                              </Link>
                            </button>
                            <button className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                              <Link to={"/dashboard-experience"} className="font-medium ">
                                Host an experience
                              </Link>
                            </button>
                            <button className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                              <Link to={"/dashboard-my-profile"} className="font-medium ">
                                My Profile
                              </Link>
                            </button>
                            <button className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                              <Link to={"/account-page"} className="font-medium ">
                                Account
                              </Link>
                            </button>
                            <button className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                              <Link to={"/"} onClick={handleLogout} className="font-medium ">
                                Logout
                              </Link>
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href="#"
                        className="mx-2 login-info d-flex align-items-center ud-btn add-property menu-btn bdrs60 mx-xl-4"
                        data-bs-toggle="modal"
                        data-bs-target="#loginSignupModal"
                        role="button"
                      >
                        Login / Signup
                        <i className="fal fa-arrow-right-long" />
                      </a>
                    )}
                  </div>

                  <a
                    className="sidemenu-btn filter-btn-right"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <img
                      className="img-1"
                      src="/images/icon/nav-icon-white.svg"
                      alt="Hamburger Menu Icon"
                    />
                    <img
                      className="img-2"
                      src="/images/icon/nav-icon-dark.svg"
                      alt="Hamburger Menu Icon"
                    />
                  </a>
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      <CurrencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(currency) => setSelectedCurrency(currency)}
      />

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

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

export default Header;
