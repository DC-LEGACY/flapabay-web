import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ProfileButton } from "@/components/auth/ProfileButton";
import SidebarPanel from "@/components/common/sidebar-panel";
import { modeAtom } from "@/store/bookingStore";
import { useAtom, useSetAtom } from "jotai";
import { 
  Home2, 
  Message, 
  Calendar, 
  Heart, 
  AddSquare, 
  Profile2User, 
  User, 
  Setting2, 
  Logout,
  Notification
} from "iconsax-react";
import NotificationsDropdown, { NotificationType } from "./NotificationsDropdown";

interface MenuItem {
  icon: React.ReactNode;
  text: string;
  href?: string;
  onClick?: () => void;
}

interface MenuSection {
  items: MenuItem[];
}

const mockNotifications: NotificationType[] = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Dennis Nedry",
    message: "has just paid for your property in Livingstone plot no 12",
    time: "Last Wednesday at 9:42 AM",
    bold: "Livingstone plot no 12",
    unread: true,
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Dennis Nedry",
    message: "replied your message on INV NO 21",
    time: "Last Wednesday at 9:42 AM",
    bold: "message on INV NO 21",
    reply: "Oh, I finished will get back as soon as possible!.",
    unread: true,
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Mulenga Nedry",
    message: "likes your property",
    time: "Last Wednesday at 9:42 AM",
    bold: "likes your property",
    unread: false,
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Dennis Nedry",
    message: "requested access to Book your space in Ndola plot No4",
    time: "Last Wednesday at 9:42 AM",
    bold: "Book your space in Ndola plot No4",
    unread: true,
    actions: true,
  },
];

const DashboardHeader: React.FC = () => {
  const [isHosting, setIsHosting] = useAtom(modeAtom);
  const setMode = useSetAtom(modeAtom);
  const { signOut, user, switchRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
  const notifRef = useRef<HTMLDivElement>(null);

  // Handle outside click to close dropdown
  useEffect(() => {
    if (!showNotifications) return;
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showNotifications]);

  // Toggle dropdown on bell click
  const handleNotifButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowNotifications((v) => !v);
  };

  const handleSwitch = (): void => {
    setMode(!isHosting);
  };

  const handleLogout = async (): Promise<void> => {
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

  return (
    <>
      <header className="sticky top-0 z-50 header-nav nav-homepage-style light-header bg-white menu-home4 main-menu shadow-md">

        <nav className="relative">
          <div className="container container-fluid pr30 pr15-xs pl30 posr menu_bdrt1 mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link className="flex items-center" to="/">
                  <img src="/images/logo.svg" alt="Header Logo" className="h-8" />
                </Link>
              </div>

              <div className="hidden lg:block">
                {/* Main Menu */}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={switchRole}
                  className="font-medium"
                >
                  Switch to {user?.role === 'guest' ? 'Hosting' : 'Travelling'}
                </button>
                <div className="flex items-center space-x-4">
                  <div className="relative" ref={notifRef}>
                    <button
                      className="p-2.5 rounded-full bg-flapabay-yellow text-white hover:bg-gray-100"
                      onClick={handleNotifButton}
                      tabIndex={0}
                    >
                      <Notification size={20} />
                    </button>
                    {showNotifications && (
                      <NotificationsDropdown
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        notifications={mockNotifications}
                      />
                    )}
                  </div>
                  <ProfileButton />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
    </>
  );
};

export default DashboardHeader; 