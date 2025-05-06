
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-flapabay-black text-white pt-16 pb-8">
      <div className="flapabay-container">
        {/* Upper Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and About */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">
                Flapa<span className="text-flapabay-yellow">Bay</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Find the perfect vacation rental for your next trip. With thousands of properties worldwide, we make it easy to find your dream getaway.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-flapabay-yellow hover:text-flapabay-black">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-flapabay-yellow hover:text-flapabay-black">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-flapabay-yellow hover:text-flapabay-black">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-flapabay-yellow hover:text-flapabay-black">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-1/2 after:h-0.5 after:bg-flapabay-yellow pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-flapabay-yellow transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/experiences" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Experiences</Link>
              </li>
              <li>
                <Link to="/help-center" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/host" className="text-gray-400 hover:text-flapabay-yellow transition-colors">FlapaBay Your Home</Link>
              </li>
              <li>
                <Link to="/help/neighborhood" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Report Neighborhood Concern</Link>
              </li>
              <li>
                <Link to="/help/countries" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Supported Countries</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/help/faqs" className="text-gray-400 hover:text-flapabay-yellow transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/help/cancellation" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Cancellation Options</Link>
              </li>
              <li>
                <Link to="/media" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Media Room</Link>
              </li>
            </ul>
          </div>
          
          {/* Top Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-1/2 after:h-0.5 after:bg-flapabay-yellow pb-2">
              Top Destinations
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/destinations/miami" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Miami, FL</Link>
              </li>
              <li>
                <Link to="/destinations/newyork" className="text-gray-400 hover:text-flapabay-yellow transition-colors">New York, NY</Link>
              </li>
              <li>
                <Link to="/destinations/losangeles" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Los Angeles, CA</Link>
              </li>
              <li>
                <Link to="/destinations/chicago" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Chicago, IL</Link>
              </li>
              <li>
                <Link to="/destinations/orlando" className="text-gray-400 hover:text-flapabay-yellow transition-colors">Orlando, FL</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-1/2 after:h-0.5 after:bg-flapabay-yellow pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-flapabay-yellow mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Vacation Street, Suite 456<br />Miami, FL 33101</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-flapabay-yellow mr-3" />
                <a href="tel:+1-305-555-0123" className="text-gray-400 hover:text-flapabay-yellow transition-colors">+1 (305) 555-0123</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-flapabay-yellow mr-3" />
                <a href="mailto:info@flapabay.com" className="text-gray-400 hover:text-flapabay-yellow transition-colors">info@flapabay.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-white/10 my-8"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} FlapaBay. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/help-center" className="text-gray-500 hover:text-white transition-colors">Help Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
