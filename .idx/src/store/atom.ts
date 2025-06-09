// DEPRECATED: Use modular store files (authStore.ts, bookingStore.ts, modalStore.ts, languageStore.ts) instead.
// This file is kept for reference during migration and will be removed.

import { atom } from "jotai";

// Atom to hold the "mode" (Hosting or Travelling)
export const modeAtom = atom(true); // true represents Hosting, false represents Travelling
export const guestAtom = atom({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

// Initialize user from localStorage if available
const storedUser = typeof window !== "undefined" ? localStorage.getItem("user_data") : null;
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const userAtom = atom<User | null>(initialUser);
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));

export const isModalOpenAtom = atom(false);
export const translationsAtom = atom({});
