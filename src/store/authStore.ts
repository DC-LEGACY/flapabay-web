// authStore.ts - Handles authentication state (user, isAuthenticated)
import { atom } from "jotai";
import type { User } from '@/services/authService'; // Import User from authService

// Initialize user from localStorage if available
// The structure in localStorage should match the new User interface from authService
const storedUserString = typeof window !== "undefined" ? localStorage.getItem("flapabay_user_session") : null; // Changed key for clarity
let initialUser: User | null = null;

if (storedUserString) {
  try {
    const parsedUser = JSON.parse(storedUserString);
    // Basic validation to ensure it looks like our User object (optional but good practice)
    if (parsedUser && typeof parsedUser.id === 'string' && parsedUser.user_metadata) {
      initialUser = parsedUser as User;
    } else {
      localStorage.removeItem("flapabay_user_session"); // Clear invalid data
    }
  } catch (e) {
    console.error("Error parsing stored user from localStorage:", e);
    localStorage.removeItem("flapabay_user_session"); // Clear corrupted data
  }
}

// This atom will now primarily be a derived/synced atom from AuthContext
// The localStorage persistence here can be a secondary backup or be handled by the authService mock more explicitly.
// For now, we keep its localStorage logic but change the key.
export const userAtom = atom<User | null>(initialUser);

// Atom to manually set the user, which also updates localStorage.
// AuthContext will call this.
export const setUserAtom = atom(
  null, // initial value for setter-only atom is null
  (get, set, newUser: User | null) => {
    set(userAtom, newUser);
    if (newUser) {
      localStorage.setItem("flapabay_user_session", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("flapabay_user_session");
    }
  }
);

export const isAuthenticatedAtom = atom((get) => !!get(userAtom)); 