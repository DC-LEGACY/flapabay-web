import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/authStore';
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
  CloseCircle
} from "iconsax-react";

interface ProfileDropdownProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: <Home2 size={20} /> },
  { label: 'Messages', to: '/dashboard-message', icon: <Message size={20} /> },
  { label: 'Trips', to: '/trip-page', icon: <Calendar size={20} /> },
  { label: 'Wishlists', to: '/whishlist-page', icon: <Heart size={20} /> },
  { label: 'Create new listings', to: '/create-listing', icon: <AddSquare size={20} /> },
  { label: 'Host an experience', to: '/dashboard-experience', icon: <Profile2User size={20} /> },
  { label: 'My Profile', to: '/dashboard-my-profile', icon: <User size={20} /> },
  { label: 'Account', to: '/account-page', icon: <Setting2 size={20} /> },
];

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ open, onClose }) => {
  const [user] = useAtom(userAtom);
  const { signOut } = useAuth();

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay for mobile to close dropdown */}
      <div
        className="fixed inset-0 z-[9999] !important md:hidden bg-black/30"
        onClick={onClose}
      />
      <div
        className={
          `z-[9999] !important ${
            // Mobile: fixed top, full width; Desktop: absolute left with negative margin
            'md:absolute right-0 md:mt-16 md:w-64 md:rounded-xl md:shadow-lg md:border md:bg-white' +
            ' fixed top-0 right-0 w-full md:static bg-white' +
            ' transition-all duration-200'
          }
          ${open ? 'block' : 'hidden'}
        `
        }
        style={{
          maxWidth: '100vw',
        }}
      >
        <div className="px-4 py-4 border-b border-gray-100 md:rounded-t-xl flex justify-between items-center">
          <div>
            <div className="font-medium text-black text-base md:text-sm">{user?.name}</div>
            <div className="text-xs  text-gray-500 break-all">{user?.email}</div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close menu"
          >
            <CloseCircle size={24} />
          </button>
        </div>
        <div className="flex flex-col divide-y divide-gray-100">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-2.5 text-left text-gray-700 hover:bg-gray-100 text-sm md:text-xs flex items-center"
              onClick={onClose}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => { signOut(); onClose(); }}
            className="px-4 py-2.5 text-left text-red-600 hover:bg-gray-100 text-sm md:text-xs flex items-center"
          >
            <span className="mr-3"><Logout size={20} /></span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown; 