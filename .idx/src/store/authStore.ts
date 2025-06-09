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
    // Basic validation to ensure it looks like our User object
    if (parsedUser && typeof parsedUser.id === 'string' && parsedUser.user_metadata) {
      initialUser = parsedUser as User;
    } else {
      localStorage.removeItem("flapabay_user_session");
      localStorage.removeItem("auth_token");
    }
  } catch (e) {
    console.error("Error parsing stored user from localStorage:", e);
    localStorage.removeItem("flapabay_user_session");
    localStorage.removeItem("auth_token");
  }
}

// User state atom
export const userAtom = atom<User | null>(initialUser);

// Authentication state atom
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));

// Token atom
export const tokenAtom = atom<string | null>(
  typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
);

// Setter atom for user and token
export const setAuthAtom = atom(
  null,
  (get, set, { user, token }: { user: User | null; token: string | null }) => {
    set(userAtom, user);
    set(tokenAtom, token);
    
    if (user && token) {
      localStorage.setItem("flapabay_user_session", JSON.stringify(user));
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("flapabay_user_session");
      localStorage.removeItem("auth_token");
    }
  }
);

// Clear auth state
export const clearAuthAtom = atom(
  null,
  (get, set) => {
    set(userAtom, null);
    set(tokenAtom, null);
    localStorage.removeItem("flapabay_user_session");
    localStorage.removeItem("auth_token");
  }
); 