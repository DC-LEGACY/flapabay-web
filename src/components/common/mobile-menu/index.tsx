import React from 'react';
import ContactInfo from "./ContactInfo";
import { Link } from "react-router-dom";
import ProSidebarContent from "./ProSidebarContent";
import Social from "./Social";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authStore";
import { ProfileButton } from "@/components/auth/ProfileButton";

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

const MobileMenu: React.FC = () => {
  const [user] = useAtom<User | null>(userAtom);

  return (
    <div className="mobilie_header_nav stylehome1">
      <div className="mobile-menu">
        <div className="header innerpage-style">
          <div className="menu_and_widgets">
            <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
              <button
                className="menubar border-0 bg-transparent"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
                aria-label="Open mobile menu"
              >
                <img
                  src="/images/mobile-dark-nav-icon.svg"
                  alt="mobile icon"
                />
              </button>
              <Link className="mobile_logo" to="/">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                />
              </Link>
              {user ? (
                <ProfileButton />
              ) : (
                <Link 
                  to="#" 
                  data-bs-toggle="modal" 
                  data-bs-target="#loginSignupModal"
                  className="text-black hover:text-[#ffc500] transition-colors duration-200"
                  aria-label="Sign in or sign up"
                >
                  <span className="icon fz18 far fa-user-circle" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start mobile_menu-canvas"
        tabIndex={-1}
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true"
      >
        <div className="rightside-hidden-bar">
          <div className="hsidebar-header">
            <button
              className="sidebar-close-icon border-0 bg-transparent"
              data-bs-dismiss="offcanvas"
              aria-label="Close mobile menu"
            >
              <span className="far fa-times"></span>
            </button>
            <h4 className="title">Welcome to flapabay</h4>
          </div>

          <div className="hsidebar-content">
            <div className="hiddenbar_navbar_content">
              <ProSidebarContent />

              <div className="hiddenbar_footer position-relative bdrt1">
                <div className="row pt45 pb30 pl30">
                  <ContactInfo />
                </div>

                <div className="row pt30 pb30 bdrt1">
                  <div className="col-auto">
                    <div className="social-style-sidebar d-flex align-items-center pl30">
                      <h6 className="mb-0 me-4">Follow us</h6>
                      <Social />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 