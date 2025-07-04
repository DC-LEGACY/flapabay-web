import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAtom } from 'jotai';
import { userAtom, setAuthAtom, clearAuthAtom } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/services/authService';
import { authService } from '@/services/authService';
import { 
  OtpRequest, 
  LoginWithOtpRequest,
  SignupOtpRequest,
  VerifyOtpRequest,
  RegisterUserDetailsRequest,
  loginWithPassword
} from '@/api/types/apiTypes';

import { set } from 'date-fns';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => void;
  signOut: () => Promise<void>;
  switchRole: () => void;
  getOtp: (data: OtpRequest) => Promise<void>;
  loginWithOtp: (data: LoginWithOtpRequest) => Promise<void>;
  getSignupPhoneOtp: (data: SignupOtpRequest) => Promise<void>;
  getSignupEmailOtp: (email: string) => Promise<void>;
  verifyOtpByPhone: (data: VerifyOtpRequest) => Promise<void>;
  verifyOtpByEmail: (data: VerifyOtpRequest) => Promise<void>;
  registerUserDetails: (data: RegisterUserDetailsRequest) => Promise<void>;
  loginWithPassword: (data: loginWithPassword) => Promise<loginWithPassword>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [, setAuth] = useAtom(setAuthAtom);
  const [, clearAuth] = useAtom(clearAuthAtom);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('flapabay_user_session');
      if (storedUser) {
        try {
          let userData = JSON.parse(storedUser);
          userData = {
            id: userData.id || '',
            app_metadata: userData.app_metadata || {},
            user_metadata: userData.user_metadata || { name: userData.user_metadata?.name, picture: userData.user_metadata?.picture },
            aud: userData.aud || 'authenticated',
            email: typeof userData.email === 'string' ? userData.email : '',
            role: userData.role || 'guest',
            created_at: userData.created_at || new Date().toISOString(),
          };
          setUser(userData);
        } catch (err) {
          console.error('Failed to parse stored user data:', err);
          clearAuth();
        }
      } else {
        setUser(null);
      }
    };

    initializeAuth();
  }, [setUser, clearAuth]);

  const handleAuthError = useCallback((err: Error | unknown, defaultMessage: string) => {
    console.error(defaultMessage, err);
    const errorMessage = err instanceof Error ? err.message : defaultMessage;
    setError(errorMessage);
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  }, [toast]);

  const login = useGoogleLogin({
    onSuccess: async (googleResponse) => {
      try {
        setLoading(true);
        setError(null);

        //onSuccess: async (googleResponse) comes from the @react-oauth/google library. This hook helps you sign in with Google using OAuth 2.0.

        // Get user info from Google
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${googleResponse.access_token}` },
        }).then(res => res.json());

        // Use service layer for Google auth
        const result = await authService.signInWithGoogle(googleResponse.access_token, userInfo);
        
        setAuth({
          user: result.user,
          token: result.token
        });
        
        toast({
          title: "Welcome to FlapaBay!",
          description: "You have successfully signed in.",
        });
      } catch (err) {
        handleAuthError(err, 'Failed to authenticate');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      handleAuthError(new Error('Google sign in failed'), 'Failed to sign in with Google');
      setLoading(false);
    },
  });

  const signOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      clearAuth();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (err) {
      handleAuthError(err, 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const switchRole = async () => {
    if (user) {
      try {
        setLoading(true);
        const newRole = user.role === 'guest' ? 'host' : 'guest';
        const result = await authService.switchRole(newRole);
        
        setAuth({
          user: result.user,
          token: localStorage.getItem('auth_token')
        });
        
        toast({
          title: `Switched to ${newRole}`,
          description: `You are now in ${newRole} mode.`,
        });
      } catch (err) {
        handleAuthError(err, 'Failed to switch role');
      } finally {
        setLoading(false);
      }
    }
  };

  const getOtp = async (data: OtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      await authService.getOtp(data);
      
      toast({
        title: "OTP Sent",
        description: "Please check your email or phone for the OTP code.",
      });
    } catch (err) {
      handleAuthError(err, 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const loginWithOtp = async (data: LoginWithOtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authService.loginWithOtp(data);
      
      setAuth({
        user: result.user,
        token: result.token
      });
      
      toast({
        title: "Welcome to FlapaBay!",
        description: "You have successfully signed in.",
      });
    } catch (err) {
      handleAuthError(err, 'Failed to login with OTP');
    } finally {
      setLoading(false);
    }
  };

  const getSignupPhoneOtp = async (data: SignupOtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      await authService.getSignupPhoneOtp(data);
      
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the OTP code.",
      });
    } catch (err) {
      handleAuthError(err, 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const getSignupEmailOtp = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await authService.getSignupEmailOtp(email);
      
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP code.",
      });
    } catch (err) {
      handleAuthError(err, 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpByPhone = async (data: VerifyOtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      await authService.verifyOtpByPhone(data);
      
      toast({
        title: "OTP Verified",
        description: "Phone number verified successfully.",
      });
    } catch (err) {
      handleAuthError(err, 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpByEmail = async (data: VerifyOtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      await authService.verifyOtpByEmail(data);
      
      toast({
        title: "OTP Verified",
        description: "Email verified successfully.",
      });
    } catch (err) {
      handleAuthError(err, 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const registerUserDetails = async (data: RegisterUserDetailsRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authService.registerUserDetails(data);
      
      setAuth({
        user: result.user,
        token: result.token
      });
      
      toast({
        title: "Welcome to FlapaBay!",
        description: "Your account has been created successfully.",
      });
    } catch (err) {
      handleAuthError(err, 'Failed to register user');
    } finally {
      setLoading(false);
    }
  };

const loginWithPassword = async (data: loginWithPassword) => {
  try {
    setLoading(true);
    setError(null);

    const result = await authService.loginWithPassword(data);

    setAuth({
      user: result.user,
      token: result.token
    });

    toast({
      title: "Login Successful",
      description: "You have successfully logged in.",
    });


    return {
      success: true,
      user: result.user,
      token: result.token
    }; // ✅ Return this

  } catch (err) {
    handleAuthError(err, 'Failed to login with password');
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Login failed',
    }; // ✅ Also return on error
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        signInWithGoogle: login, 
        signOut, 
        switchRole,
        getOtp,
        loginWithOtp,
        getSignupPhoneOtp,
        getSignupEmailOtp,
        verifyOtpByPhone,
        verifyOtpByEmail,
        registerUserDetails,
        loginWithPassword
      }}
    >
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

