import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authStore";

const DboardMobileNavigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const isHosting = user?.role === 'host';

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

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
          href: "/dashboard/host/listings",
          icon: "flaticon-home",
          text: "My Properties",
        },
        {
          href: "/dashboard/host/profile",
          icon: "flaticon-user",
          text: "My Profile",
        },
        {
          href: "/dashboard/host/account",
          icon: "flaticon-user",
          text: "Account",
        },
        {
          onClick: handleLogout,
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
          href: "/dashboard/guest/messages",
          icon: "flaticon-chat-1",
          text: "Messages",
        },
        {
          href: "/dashboard/guest/profile",
          icon: "flaticon-user",
          text: "My Profile",
        },
        {
          onClick: handleLogout,
          icon: "flaticon-logout",
          text: "Logout",
        },
      ],
    },
  ];

  const currentSidebarItems = isHosting ? sidebarItems : travellingSidebarItems;

  return (
    <div className="dashboard_navigationbar d-block d-lg-none">
      <div className="dropdown">
        <button
          className="dropbtn"
          onClick={() => setIsDropdownOpen((prevOpen) => !prevOpen)}
        >
          <i className="fa fa-bars pr10" /> Dashboard Navigation
        </button>
        <div className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}>
          {currentSidebarItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.items.map((item, itemIndex) => (
                item.onClick ? (
                  <button
                    key={itemIndex}
                    className={`dropdown-item ${pathname === item.href ? "-is-active" : ""}`}
                    onClick={item.onClick}
                  >
                    <i className={`${item.icon} mr10`} />
                    {item.text}
                  </button>
                ) : (
                  <Link
                    key={itemIndex}
                    className={`dropdown-item ${pathname === item.href ? "-is-active" : ""}`}
                    to={item.href}
                  >
                    <i className={`${item.icon} mr10`} />
                    {item.text}
                  </Link>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DboardMobileNavigation;
