import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from "@/components/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: { email: string; password: string; provider?: string }) => Promise<void>;
  signUp: (credentials: { email: string; password: string; phone?: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (credentials: { email: string; password: string; provider?: string }) => {
    setIsLoading(true);
    
    try {
      if (credentials.provider) {
        // Social login
        const { error } = await supabase.auth.signInWithOAuth({
          provider: credentials.provider as any,
        });
        
        if (error) throw error;
      } else {
        // Regular password login
        const { error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });
        
        if (error) throw error;
        
        toast({
          title: "Signed in successfully!",
          description: "Welcome back to FlapaBay.",
        });
      }
    } catch (error: any) {
      console.error('Error during sign in:', error.message);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: { email: string; password: string; phone?: string }) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        phone: credentials.phone,
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Please check your email for the confirmation link.",
      });
    } catch (error: any) {
      console.error('Error during sign up:', error.message);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Error during sign out:', error.message);
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, isLoading, signIn, signUp, signOut }}>
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
