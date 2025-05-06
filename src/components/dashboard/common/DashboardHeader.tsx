import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, ChevronDown, Menu, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardHeaderProps {
  userType: 'guest' | 'host';
  onSwitchMode: () => void;
  switchButtonText: string;
  userName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userType,
  onSwitchMode,
  switchButtonText,
  userName = "User"
}) => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 text-black border-b border-gray-200 z-40 transition-colors duration-300 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/f7a07ac8-b117-41da-861e-b7150c7ecbdc.png" 
              alt="FlapaBay Logo" 
              className="w-16 h-16"
            />
          </Link>

          {/* Center - Switch Mode */}
          <div className="hidden md:flex items-center">
            <Button variant="outline" onClick={onSwitchMode} className="border-black/10 text-black hover:text-[#ffc500] hover:bg-white/30">
              {userType === 'guest' ? <User className="mr-2 h-4 w-4" /> : <User className="mr-2 h-4 w-4" />}
              {switchButtonText}
            </Button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-black hover:text-[#ffc500] hover:bg-white/20"
              onClick={() => navigate(`/dashboard/${userType}/messages`)}
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
                <Button variant="ghost" className="flex items-center text-black hover:text-[#ffc500] hover:bg-white/20">
                  <div className="hidden md:block mr-2 text-right">
                    <div className="text-sm font-medium">{userName}</div>
                    <div className="text-xs text-black/70 capitalize">{userType}</div>
                  </div>
                  <Avatar className="h-8 w-8 border border-black/10">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={userName} />
                    <AvatarFallback className="bg-white text-black">
                      {userName?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/dashboard/${userType}/profile`)}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSwitchMode}>
                  {switchButtonText}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden text-black hover:text-[#ffc500] hover:bg-white/20">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
