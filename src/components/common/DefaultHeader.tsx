import React, { useState } from "react";
import { ArrowRight } from "iconsax-react";
import CurrencyModal from "../home/home-v1/CurrencyModal";
import { Link } from "react-router-dom";
import LoginSignupModal from "@/components/auth/login-signup-modal";
import MainMenu from "@/components/common/MainMenu";
import { RiGlobalLine } from "react-icons/ri";
import SidebarPanel from "@/components/common/sidebar-panel";
import { modeAtom } from "@/store/bookingStore";
import { useAtom, useSetAtom } from "jotai";
import { userAtom } from "@/store/authStore";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/app/providers/ThemeContext";
import { ProfileButton } from "@/components/auth/ProfileButton";

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  role: string;
}

const DefaultHeader: React.FC = () => {
  const [navbar, setNavbar] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [isHosting, setIsHosting] = useAtom(modeAtom);
  const setMode = useSetAtom(modeAtom);
  const [user] = useAtom<User | null>(userAtom);
  const { switchRole } = useAuth();

  const handleSwitch = (): void => {
    setMode(!isHosting);
  };

  return (
    <>
      <header
        className={`header-nav nav-homepage-style main-menu ${
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
                  <MainMenu className="md:hidden" />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center space-x-4">
                  {user ? (
                    <button onClick={switchRole} className="font-medium hover:text-[#ffc500] transition-colors duration-200">
                      Switch to {user?.role === 'guest' ? 'Hosting' : 'Travelling'}
                    </button>
                  ) : (
                    <Link 
                      to="/flapabay-your-home" 
                      className="font-medium hover:text-[#ffc500] transition-colors duration-200"
                    >
                      Flapabay your home
                    </Link>
                  )}

                  <div className="flex items-center">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="p-2 text-xl hover:text-[#ffc500] transition-colors duration-200"
                      aria-label="Change currency"
                    >
                      <RiGlobalLine />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <ProfileButton />
                  </div>

                  <button
                    className="sidemenu-btn filter-btn-right"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                    aria-label="Open sidebar menu"
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
                  </button>
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
        onSelect={(currency: string) => setSelectedCurrency(currency)}
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
        tabIndex={-1}
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default DefaultHeader; 