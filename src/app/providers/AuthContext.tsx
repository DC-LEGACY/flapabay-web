import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AuthService,
  User,
  Session,
  // AuthError, // Not directly used in context state, but methods return it
  // UserResponse, // Handled by method returns
  // SessionResponse // Handled by method returns
} from '@/services/authService'; // Adjust path as needed

// Import the concrete implementation of the AuthService
import { mockAuthService } from "@/components/integrations/supabase/client"; // Adjust path as needed
import { useToast } from '@/hooks/use-toast';
import { useSetAtom } from 'jotai'; // Import useSetAtom
import { setUserAtom } from '@/store/authStore'; // Import the setUserAtom

// Use the imported auth service instance
const authService: AuthService = mockAuthService;

// Remove local User and Session interfaces if they were defined here previously,
// as they are now imported from authService.ts

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: { email: string; password: string; provider?: string }) => Promise<void>;
  signUp: (credentials: { email: string; password: string; phone?: string; fullName?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserRole: (newRole: 'guest' | 'host') => Promise<void>;
  // Add other auth methods if they become part of the context, e.g., verifyOtp, updateUser from AuthProvider
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUserState] = useState<User | null>(null); // Renamed to avoid conflict with jotai setUser
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const setJotaiUser = useSetAtom(setUserAtom); // Get the setter for userAtom

  useEffect(() => {
    const subscription = authService.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed via authService:', event, currentSession);
        const currentUser = currentSession?.user ?? null;
        setSession(currentSession);
        setUserState(currentUser); // Update AuthContext state
        setJotaiUser(currentUser); // Update Jotai userAtom
        setIsLoading(false);
      }
    );

    authService.getSession().then(({ data }) => {
      const currentUser = data.session?.user ?? null;
      if (data.session) {
        setSession(data.session);
        setUserState(currentUser);
        setJotaiUser(currentUser); // Update Jotai userAtom
      }
      setIsLoading(false);
    }).catch(error => {
      console.error("Error getting initial session:", error);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setJotaiUser]); // Add setJotaiUser to dependency array

  const signIn = async (credentials: { email: string; password: string; provider?: string }) => {
    setIsLoading(true);
    try {
      if (credentials.provider) {
        const { error } = await authService.signInWithOAuth({
          provider: credentials.provider as any, 
        });
        if (error) throw error;
        // User state will be updated by onAuthStateChange, which calls setJotaiUser
      } else {
        const { data, error } = await authService.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });
        if (error) throw error;
        // User state will be updated by onAuthStateChange, which calls setJotaiUser
        if (data?.session) {
            toast({
                title: "Signed in successfully!",
                description: "Welcome back to FlapaBay.",
            });
        }
      }
    } catch (error: any) {
      console.error('Error during sign in:', error.message);
      toast({
        title: "Sign in failed",
        description: error.message || 'An unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: { email: string; password: string; phone?: string; fullName?: string }) => {
    setIsLoading(true);
    try {
      const { error } = await authService.signUp({
        email: credentials.email,
        password: credentials.password,
        phone: credentials.phone,
        fullName: credentials.fullName,
      });
      if (error) throw error;
      // User state will be updated by onAuthStateChange, which calls setJotaiUser
      toast({
        title: "Account created!",
        description: "Please check your email for the confirmation link (if applicable).",
      });
    } catch (error: any) {
      console.error('Error during sign up:', error.message);
      toast({
        title: "Sign up failed",
        description: error.message || 'An unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await authService.signOut();
      if (error) throw error;
      // User state (including Jotai userAtom) will be cleared by onAuthStateChange
    } catch (error: any) {
      console.error('Error during sign out:', error.message);
      toast({
        title: "Sign out failed",
        description: error.message || 'An unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (newRole: 'guest' | 'host') => {
    if (!user) {
      toast({ title: "Not logged in", description: "Cannot switch roles.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      // Pass the role in the `data` object as expected by our mockAuthService.updateUser
      const { data, error } = await authService.updateUser({ data: { role: newRole } });
      if (error) throw error;
      if (data?.user) {
        // onAuthStateChange should handle updating context state and Jotai atom
        // due to USER_UPDATED event triggered by mockAuthService.
        toast({
          title: "Role switched successfully!",
          description: `You are now in ${newRole === 'host' ? 'Hosting' : 'Travelling'} mode.`,
        });
      } else {
        // This case might indicate an issue if updateUser resolves but doesn't return a user
        throw new Error("User data not returned after role update.");
      }
    } catch (error: any) {
      console.error('Error switching role:', error.message);
      toast({
        title: "Role switch failed",
        description: error.message || 'An unknown error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // TODO: Expose other methods like verifyOtp, updateUser if needed by components via useAuth()

  return (
    // Pass AuthContext's own user state (userState) to the provider value
    <AuthContext.Provider value={{ session, user: userState, isLoading, signIn, signUp, signOut, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
