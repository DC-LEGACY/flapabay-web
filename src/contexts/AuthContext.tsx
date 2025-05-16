import React, { createContext, useContext, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => void;
  signOut: () => Promise<void>;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  // Initialize user from localStorage on mount
  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem('flapabay_user_session');
    if (storedUser) {
      try {
        let userData = JSON.parse(storedUser);
        // Map to the User interface from authService
        userData = {
          id: userData.id || '',
          app_metadata: userData.app_metadata || {},
          user_metadata: userData.user_metadata || { name: userData.user_metadata?.name, picture: userData.user_metadata?.picture },
          aud: userData.aud || 'authenticated',
          email: typeof userData.email === 'string' ? userData.email : '',
          role: userData.role || 'guest',
          created_at: userData.created_at || new Date().toISOString(),
          // Add any other required fields with sensible defaults
        };
        setUser(userData);
      } catch (err) {
        console.error('Failed to parse stored user data:', err);
        localStorage.removeItem('flapabay_user_session');
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [setUser]);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setLoading(true);
        setError(null);

        // Get user info from Google
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        }).then(res => res.json());

        console.log('Google user info:', userInfo);

        const userData: User = {
          id: userInfo.sub,
          app_metadata: {},
          user_metadata: { name: userInfo.name, picture: userInfo.picture },
          aud: 'authenticated',
          email: typeof userInfo.email === 'string' ? userInfo.email : '',
          role: 'guest', // Default role for new users
          created_at: new Date().toISOString(),
        };

        console.log('Storing user data:', userData);

        // Store token and user data
        localStorage.setItem('auth_token', response.access_token);
        localStorage.setItem('flapabay_user_session', JSON.stringify(userData));

        setUser(userData);
        
        toast({
          title: "Welcome to FlapaBay!",
          description: "You have successfully signed in.",
        });
      } catch (err) {
        console.error('Failed to get user info:', err);
        setError('Failed to get user information');
        toast({
          title: "Sign in failed",
          description: "Failed to get user information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Failed to sign in with Google');
      setLoading(false);
      toast({
        title: "Sign in failed",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
    },
  });

  const signOut = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('flapabay_user_session');
      setUser(null);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (err) {
      console.error('Sign out failed:', err);
      setError('Failed to sign out');
      toast({
        title: "Sign out failed",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const switchRole = () => {
    if (user) {
      const newRole = user.role === 'guest' ? 'host' : 'guest';
      const updatedUser = {
        ...user,
        role: newRole,
        app_metadata: user.app_metadata || {},
        user_metadata: user.user_metadata || {},
        aud: user.aud || 'authenticated',
        created_at: user.created_at || new Date().toISOString(),
      };
      setUser(updatedUser);
      localStorage.setItem('flapabay_user_session', JSON.stringify(updatedUser));
      toast({
        title: `Switched to ${newRole}`,
        description: `You are now in ${newRole} mode.`,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signInWithGoogle: login, signOut, switchRole }}>
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