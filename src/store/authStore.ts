// authStore.ts - Handles authentication state (user, isAuthenticated)
import { atom } from "jotai";

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  role: 'host' | 'guest';
}

// Initialize user from localStorage if available
const storedUser = typeof window !== "undefined" ? localStorage.getItem("user_data") : null;
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const userAtom = atom<User | null>(initialUser, (get, set, newValue: User | null) => {
  set(userAtom, newValue);
  if (newValue) {
    localStorage.setItem("user_data", JSON.stringify(newValue));
  } else {
    localStorage.removeItem("user_data");
  }
});
export const isAuthenticatedAtom = atom((get) => !!get(userAtom)); 