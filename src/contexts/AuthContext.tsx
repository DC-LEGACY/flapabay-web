import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // TODO: Validate token with your backend
          const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
          setUser(userData);
        }
      } catch (err) {
        console.error('Session check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load the Google API
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });

      // Initialize Google Sign-In
      const client = google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: async (response: any) => {
          if (response.access_token) {
            try {
              // Get user info from Google
              const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${response.access_token}` },
              }).then(res => res.json());

              // Store token and user data
              localStorage.setItem('auth_token', response.access_token);
              localStorage.setItem('user_data', JSON.stringify({
                id: userInfo.sub,
                email: userInfo.email,
                name: userInfo.name,
                picture: userInfo.picture,
              }));

              setUser({
                id: userInfo.sub,
                email: userInfo.email,
                name: userInfo.name,
                picture: userInfo.picture,
              });
            } catch (err) {
              console.error('Failed to get user info:', err);
              setError('Failed to get user information');
            }
          }
        },
      });

      client.requestAccessToken();
    } catch (err) {
      console.error('Google sign-in failed:', err);
      setError('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // Clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setUser(null);
    } catch (err) {
      console.error('Sign out failed:', err);
      setError('Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signInWithGoogle, signOut }}>
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