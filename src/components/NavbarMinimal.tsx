
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarMinimal = () => {
  return (
    <header className="py-4 px-6 border-b">
      <div className="container mx-auto">
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
      </div>
    </header>
  );
};

export default NavbarMinimal;
