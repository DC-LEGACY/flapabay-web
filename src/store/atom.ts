import { atom } from "jotai";

// Atom to hold the "mode" (Hosting or Travelling)
export const modeAtom = atom(true); // true represents Hosting, false represents Travelling
export const guestAtom = atom({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });



  export const authAtom = atom(null); // null means not logged in
  
  export const isModalOpenAtom = atom(false);



  interface User {
    fname: string;
    email: string;
  }
  
  const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  
  export const userAtom = atom<User | null>(storedUser ? JSON.parse(storedUser) : null);
  export const translationsAtom = atom({});
