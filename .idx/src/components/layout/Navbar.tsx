import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProfileButton } from '@/components/auth/ProfileButton';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-4"
    >
      <div className="flapabay-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus:outline-none" 
            aria-label="FlapaBay Logo"
          >
            <img 
              src="/lovable-uploads/f7a07ac8-b117-41da-861e-b7150c7ecbdc.png" 
              alt="FlapaBay Logo" 
              className="w-16 h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-black hover:text-[#ffc500] transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/experiences" 
              className="text-black hover:text-[#ffc500] transition-colors duration-200"
            >
              Experiences
            </Link>
            <Link 
              to="/help-center" 
              className="text-black hover:text-[#ffc500] transition-colors duration-200"
            >
              Help Center
            </Link>
            <Link 
              to="/about" 
              className="text-black hover:text-[#ffc500] transition-colors duration-200"
            >
              About
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="p-2 rounded-full text-black hover:text-[#ffc500] transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <ProfileButton />
            <Link 
              to="/host" 
              className="primary-button"
            >
              FlapaBay Your Home
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-black hover:text-[#ffc500] transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-black hover:text-[#ffc500] transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/experiences" 
                className="text-black hover:text-[#ffc500] transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                Experiences
              </Link>
              <Link 
                to="/help-center" 
                className="text-black hover:text-[#ffc500] transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                Help Center
              </Link>
              <Link 
                to="/about" 
                className="text-black hover:text-[#ffc500] transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <ProfileButton />
              </div>
              <Link 
                to="/host" 
                className="primary-button w-full text-center"
                onClick={toggleMobileMenu}
              >
                FlapaBay Your Home
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
