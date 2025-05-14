import React, { createContext, useContext, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/authStore';

interface BottomNavContextType {
  showBottomNav: boolean;
  setShowBottomNav: (show: boolean) => void;
  switchRole: () => void;
}

const BottomNavContext = createContext<BottomNavContextType | undefined>(undefined);

export const BottomNavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [user, setUser] = useAtom(userAtom);

  const switchRole = () => {
    if (user) {
      const newRole = user.role === 'guest' ? 'host' : 'guest';
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };

  return (
    <BottomNavContext.Provider value={{ showBottomNav, setShowBottomNav, switchRole }}>
      {children}
    </BottomNavContext.Provider>
  );
};

export const useBottomNav = () => {
  const context = useContext(BottomNavContext);
  if (context === undefined) {
    throw new Error('useBottomNav must be used within a BottomNavProvider');
  }
  return context;
}; 