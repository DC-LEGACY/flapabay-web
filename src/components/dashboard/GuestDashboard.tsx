import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Heart, HelpCircle, LogOut, MessageSquare, Settings, Star, User } from 'lucide-react';
import { Moon, Sun } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import DashboardHeader from '../common/DashboardHeader';
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

const GuestDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const handleSwitchToHost = () => {
    toast({
      title: "Switching to host mode",
      description: "Welcome to your hosting dashboard!",
    });
    navigate('/dashboard/host');
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
      <DashboardHeader 
        userType="guest" 
        onSwitchMode={handleSwitchToHost} 
        switchButtonText="Switch to Host"
        userName={user?.email || "Guest"}
      />
      
      <main className="container mx-auto px-4 pt-24 pb-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-[#ffc500] dark:bg-[#ffc500]/90 text-black rounded-2xl shadow-sm p-4 sticky top-24">
              {/* Profile Section */}
              <div className="flex flex-col items-center mb-6 pb-6 border-b border-black/10">
                <div className="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
                  <Avatar className="h-20 w-20 border-2 border-white">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || "Guest"} />
                    <AvatarFallback className="bg-white text-black text-xl">
                      {user?.email?.charAt(0).toUpperCase() || "G"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-medium text-base mt-3">{user?.email || "Guest"}</h3>
                <p className="text-xs opacity-70">Guest Account</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-xs bg-white/20 hover:bg-white/30 border-black/10"
                  onClick={() => navigate('/dashboard/guest/profile')}
                >
                  View Profile
                </Button>
              </div>
              
              <nav className="space-y-1">
                <NavLinkItem to="/dashboard/guest/dashboard" icon={<Briefcase />} label="Dashboards" />
                <NavLinkItem to="/dashboard/guest/trips" icon={<Briefcase />} label="Trips" />
                <NavLinkItem to="/dashboard/guest/wishlist" icon={<Heart />} label="Wishlist" />
                <NavLinkItem to="/dashboard/guest/reviews" icon={<Star />} label="Reviews" />
                <NavLinkItem to="/dashboard/guest/messages" icon={<MessageSquare />} label="Messages" />
                
                <hr className="my-4 border-black/10 dark:border-black/20" />
                
                <button 
                  className="flex items-center w-full px-4 py-2.5 text-left text-sm font-medium rounded-lg hover:bg-black/5"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
                
                <NavLinkItem to="/help-center" icon={<HelpCircle />} label="Help Center" />
                <NavLinkItem to="/settings" icon={<Settings />} label="Account Settings" />
                
                <button 
                  className="flex items-center w-full px-4 py-2.5 text-left text-sm font-medium rounded-lg text-red-800 hover:bg-black/5"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>
          
          {/* Sidebar - Mobile */}
          <div className="lg:hidden sticky top-[73px] z-30 bg-white dark:bg-gray-800 border-b dark:border-black mb-4">
            <div className="flex overflow-x-auto py-3 gap-2 px-1 no-scrollbar">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-[#ffc500] dark:bg-[#ffc500]/90 text-black">
                  {/* Profile Section for Mobile */}
                  <div className="flex flex-col items-center mt-6 mb-6 pb-6 border-b border-black/10">
                    <div className="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
                      <Avatar className="h-20 w-20 border-2 border-white">
                        <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || "Guest"} />
                        <AvatarFallback className="bg-white text-black text-xl">
                          {user?.email?.charAt(0).toUpperCase() || "G"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <h3 className="font-medium text-base mt-3">{user?.email || "Guest"}</h3>
                    <p className="text-xs opacity-70">Guest Account</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 text-xs bg-white/20 hover:bg-white/30 border-black/10"
                      onClick={() => navigate('/dashboard/guest/profile')}
                    >
                      View Profile
                    </Button>
                  </div>
                  
                  <div className="py-6">
                    <nav className="space-y-1">
                      <NavLinkItem to="/dashboard/guest/dashboard" icon={<Briefcase />} label="Dashboard" />
                      <NavLinkItem to="/dashboard/guest/trips" icon={<Briefcase />} label="Trips" />
                      <NavLinkItem to="/dashboard/guest/wishlist" icon={<Heart />} label="Wishlist" />
                      <NavLinkItem to="/dashboard/guest/reviews" icon={<Star />} label="Reviews" />
                      <NavLinkItem to="/dashboard/guest/messages" icon={<MessageSquare />} label="Messages" />
                      
                      <hr className="my-4 border-black/10 dark:border-black/20" />
                      
                      <button 
                        className="flex items-center w-full px-4 py-2.5 text-left text-sm font-medium rounded-lg hover:bg-black/5"
                        onClick={toggleTheme}
                      >
                        {theme === 'dark' ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </button>
                      
                      <NavLinkItem to="/help-center" icon={<HelpCircle />} label="Help Center" />
                      <NavLinkItem to="/settings" icon={<Settings />} label="Account Settings" />
                      
                      <button 
                        className="flex items-center w-full px-4 py-2.5 text-left text-sm font-medium rounded-lg text-red-800 hover:bg-black/5"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
              
              <NavPill to="/dashboard/guest/dashboard" label="Dashboard" />
              <NavPill to="/dashboard/guest/trips" label="Trips" />
              <NavPill to="/dashboard/guest/wishlist" label="Wishlist" />
              <NavPill to="/dashboard/guest/reviews" label="Reviews" />
              <NavPill to="/dashboard/guest/messages" label="Messages" />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper components
const NavLinkItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
        isActive ? 'bg-black/10 text-black' : 'hover:bg-black/5'
      }`
    }
  >
    <span className="w-5 h-5 mr-3">{icon}</span>
    {label}
  </NavLink>
);

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

export default GuestDashboard;
