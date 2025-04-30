import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import {
  BarChart2,
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  Calendar,
  ChevronDown,
  DollarSign,
  HelpCircle,
  List,
  LogOut,
  MapPin,
  Settings,
  Star
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/ui/sheet';

import { Button } from '@/ui/button';
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

const HostDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const handleSwitchToGuest = () => {
    toast({
      title: "Switching to guest mode",
      description: "Welcome to your traveler dashboard!",
    });
    navigate('/dashboard/guest');
  };
  
  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header now positioned above sidebar but with lower z-index */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 z-10 shadow-sm h-16 transition-none">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-full md:pl-64">
            {/* Right Side */}
            <div className="flex items-center space-x-1 md:space-x-4">
              <Button 
                variant="outline" 
                onClick={handleSwitchToGuest} 
                className="hidden md:flex items-center border-black/10 bg-white hover:bg-white/80"
              >
                Switch to Guest
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-black hover:text-[#ffc500] hover:bg-white/20"
                onClick={() => navigate(`/dashboard/host/messages`)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-black hover:text-[#ffc500] hover:bg-white/20"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center text-black hover:text-[#ffc500] hover:bg-white/20 p-2">
                    <Avatar className="h-8 w-8 border border-black/10">
                      <AvatarImage src={user?.user_metadata?.avatar_url || "/images/f7a07ac8-b117-41da-861e-b7150c7ecbdc.png"} alt="Profile" />
                      <AvatarFallback className="bg-white text-black">
                        {user?.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/dashboard/host/profile`)}>
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSwitchToGuest}>
                    <Button variant="outline" className="w-full border-black/10 bg-white hover:bg-white/90">
                      Switch to Guest
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      
      <main className="pt-16">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Desktop - Now protruding into header */}
          <aside className="hidden lg:block fixed top-0 left-0 h-full bg-[#ffc500] dark:bg-[#ffc500] text-black w-64 z-20">
            <div className="flex flex-col h-full overflow-auto">
              {/* Profile Section pushed up without logo */}
              <div className="flex flex-col items-center mb-6 pt-4 pb-6 border-b border-black/10">
                <div className="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
                  <Avatar className="h-20 w-20 border-2 border-white">
                    <AvatarImage src={user?.user_metadata?.avatar_url || "/images/f7a07ac8-b117-41da-861e-b7150c7ecbdc.png"} alt="Host" />
                    <AvatarFallback className="bg-white text-black text-xl">
                      {user?.email?.charAt(0).toUpperCase() || "H"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-medium text-base mt-3">Host Account</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-xs bg-white/20 hover:bg-white/30 border-black/10"
                  onClick={() => navigate('/dashboard/host/profile')}
                >
                  View Profile
                </Button>
              </div>
              
              <nav className="space-y-1 px-2">
                <SidebarNavLink to="/dashboard-host-dashboard" icon={<Briefcase />} label="Dashboard" />
                <SidebarNavLink to="/dashboard-host-listings" icon={<List />} label="Listings" />
                <SidebarNavLink to="/dashboard/host/reservations" icon={<BookOpen />} label="Reservations" />
                <SidebarNavLink to="/dashboard/host/calendar" icon={<Calendar />} label="Calendar" />
                <SidebarNavLink to="/dashboard/host/insights" icon={<BarChart2 />} label="Insights" />
                <SidebarNavLink to="/dashboard/host/experiences" icon={<MapPin />} label="Experiences" />
                <SidebarNavLink to="/dashboard/host/reviews" icon={<Star />} label="Reviews" />
                <SidebarNavLink to="/dashboard/host/ai-cohost" icon={<Bot />} label="AI Co-Host" />
                <SidebarNavLink to="/dashboard/host/settings" icon={<Settings />} label="Settings" />
                <SidebarNavLink to="/dashboard/host/payouts" icon={<DollarSign />} label="Payouts" />
                
                <hr className="my-4 border-black/10 dark:border-black/20" />
                
                <button 
                  className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-black/5"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
                
                <NavLink
                  to="/help-center"
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                      isActive ? 'bg-black/10 text-black' : 'hover:bg-black/5'
                    }`
                  }
                >
                  <HelpCircle className="w-5 h-5 mr-3" />
                  Help Center
                </NavLink>
                
                <button 
                  className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg text-red-800 hover:bg-black/5"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </nav>
              
              <div className="mt-auto p-4 text-xs text-center opacity-70">
                © 2023 FlapaBay. All rights reserved.
              </div>
            </div>
          </aside>
          
          {/* Sidebar - Mobile */}
          <div className="lg:hidden sticky top-0 z-30 bg-white dark:bg-gray-800 border-b dark:border-black mb-4">
            <div className="flex overflow-x-auto py-3 gap-2 px-1 no-scrollbar">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-[#ffc500] dark:bg-[#ffc500] text-black">
                  {/* Profile Section for Mobile */}
                  <div className="flex flex-col items-center mt-6 mb-6 pb-6 border-b border-black/10">
                    <div className="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
                      <Avatar className="h-20 w-20 border-2 border-white">
                        <AvatarImage src={user?.user_metadata?.avatar_url || "/images/f7a07ac8-b117-41da-861e-b7150c7ecbdc.png"} alt="Host" />
                        <AvatarFallback className="bg-white text-black text-xl">
                          {user?.email?.charAt(0).toUpperCase() || "H"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <h3 className="font-medium text-base mt-3">Host Account</h3>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs bg-white/20 hover:bg-white/30 border-black/10"
                        onClick={() => navigate('/dashboard/host/profile')}
                      >
                        View Profile
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs bg-white hover:bg-white/80 border-black/10"
                        onClick={handleSwitchToGuest}
                      >
                        Switch to Guest
                      </Button>
                    </div>
                  </div>
                  
                  <div className="py-6">
                    <nav className="space-y-1">
                      <SidebarNavLink to="/dashboard/host/dashboard" icon={<Briefcase />} label="Dashboard" />
                      <SidebarNavLink to="/dashboard/host/listings" icon={<List />} label="Listings" />
                      <SidebarNavLink to="/dashboard/host/reservations" icon={<BookOpen />} label="Reservations" />
                      <SidebarNavLink to="/dashboard/host/calendar" icon={<Calendar />} label="Calendar" />
                      <SidebarNavLink to="/dashboard/host/insights" icon={<BarChart2 />} label="Insights" />
                      <SidebarNavLink to="/dashboard/host/experiences" icon={<MapPin />} label="Experiences" />
                      <SidebarNavLink to="/dashboard/host/reviews" icon={<Star />} label="Reviews" />
                      <SidebarNavLink to="/dashboard/host/ai-cohost" icon={<Bot />} label="AI Co-Host" />
                      <SidebarNavLink to="/dashboard/host/settings" icon={<Settings />} label="Settings" />
                      <SidebarNavLink to="/dashboard/host/payouts" icon={<DollarSign />} label="Payouts" />
                      
                      <hr className="my-4 border-black/10 dark:border-black/20" />
                      
                      <button 
                        className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-black/5"
                        onClick={toggleTheme}
                      >
                        {theme === 'dark' ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </button>
                      
                      <NavLink
                        to="/help-center"
                        className={({ isActive }) => 
                          `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                            isActive ? 'bg-black/10 text-black' : 'hover:bg-black/5'
                          }`
                        }
                      >
                        <HelpCircle className="w-5 h-5 mr-3" />
                        Help Center
                      </NavLink>
                      
                      <button 
                        className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg text-red-800 hover:bg-black/5"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
              
              <NavPill to="/dashboard/host/dashboard" label="Dashboard" />
              <NavPill to="/dashboard/host/listings" label="Listings" />
              <NavPill to="/dashboard/host/reservations" label="Reservations" />
              <NavPill to="/dashboard/host/calendar" label="Calendar" />
              <NavPill to="/dashboard/host/insights" label="Insights" />
              <NavPill to="/dashboard/host/experiences" label="Experiences" />
              <NavPill to="/dashboard/host/reviews" label="Reviews" />
              <NavPill to="/dashboard/host/ai-cohost" label="AI Co-Host" />
              <NavPill to="/dashboard/host/payouts" label="Payouts" />
            </div>
          </div>
          
          {/* Main Content - Now with padding for sidebar */}
          <div className="flex-1 lg:pl-64">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="py-6 px-4 md:px-8"
            >
              <Outlet />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Create separate SidebarNavLink component with active state styling
const SidebarNavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
        isActive ? 'bg-black text-white' : 'hover:bg-black/5'
      }`
    }
  >
    <span className="w-5 h-5 mr-3">{icon}</span>
    {label}
  </NavLink>
);

// Keep existing NavPill component
const NavPill = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-full ${
        isActive ? 'bg-[#ffc500]/10 text-black dark:text-black' : 'border dark:border-black hover:bg-gray-100 dark:hover:bg-black'
      }`
    }
  >
    {label}
  </NavLink>
);

export default HostDashboard;
