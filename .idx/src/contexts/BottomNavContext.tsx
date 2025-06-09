import React, { createContext, useContext, useState } from 'react';
// import { useAtom } from 'jotai'; // No longer needed directly for role switching
// import { userAtom } from '@/store/authStore'; // No longer needed directly for role switching

interface BottomNavContextType {
  showBottomNav: boolean;
  setShowBottomNav: (show: boolean) => void;
  // switchRole: () => void; // Removed switchRole
}

const BottomNavContext = createContext<BottomNavContextType | undefined>(undefined);

export const BottomNavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showBottomNav, setShowBottomNav] = useState(true);
  // const [user, setUser] = useAtom(userAtom); // No longer needed here

  // const switchRole = () => { // Removed switchRole implementation
  //   if (user) {
  //     const newRole = user.role === 'guest' ? 'host' : 'guest';
  //     const updatedUser = { ...user, role: newRole };
  //     setUser(updatedUser);
  //     localStorage.setItem('user_data', JSON.stringify(updatedUser));
  //   }
  // };

  return (
    <BottomNavContext.Provider value={{ showBottomNav, setShowBottomNav /* removed switchRole */ }}>
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