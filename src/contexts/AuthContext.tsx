import React, { createContext, useContext, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAtom } from 'jotai';
import { userAtom, setAuthAtom, clearAuthAtom } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/services/authService';
import { authService } from '@/api/services/auth';
import { 
  OtpRequest, 
  LoginWithOtpRequest,
  SignupOtpRequest,
  VerifyOtpRequest,
  RegisterUserDetailsRequest
} from '@/api/types/apiTypes';
import { AxiosResponse } from 'axios';

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
        };
        setUser(userData);
      } catch (err) {
        console.error('Failed to parse stored user data:', err);
        clearAuth();
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [setUser, clearAuth]);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setLoading(true);
        setError(null);

        // Get user info from Google
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        }).then(res => res.json());

        // Send Google token to our backend for verification
        const { data } = await authService.googleAuth(response.access_token, userInfo);
        
        // Update auth state with backend token and user
        setAuth({
          user: data.user,
          token: data.token
        });
        
        toast({
          title: "Welcome to FlapaBay!",
          description: "You have successfully signed in.",
        });
      } catch (err) {
        console.error('Failed to authenticate:', err);
        setError('Failed to authenticate');
        toast({
          title: "Sign in failed",
          description: "Failed to authenticate with the server",
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
      await authService.logout();
      clearAuth();
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

  const switchRole = async () => {
    if (user) {
      try {
        setLoading(true);
        const newRole = user.role === 'guest' ? 'host' : 'guest';
        const { data } = await authService.switchRole(newRole);
        
        setAuth({
          user: data.user,
          token: localStorage.getItem('auth_token')
        });
        
        toast({
          title: `Switched to ${newRole}`,
          description: `You are now in ${newRole} mode.`,
        });
      } catch (err) {
        console.error('Failed to switch role:', err);
        toast({
          title: "Role switch failed",
          description: "Failed to switch role",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getOtp = async (data: OtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      const [response, error] = await authService.getEmailOrPhoneOtp(data);
      
      if (error) throw error;
      
      toast({
        title: "OTP Sent",
        description: "Please check your email or phone for the OTP code.",
      });
    } catch (err: any) {
      console.error('Failed to send OTP:', err);
      setError(err.message || 'Failed to send OTP');
      toast({
        title: "OTP Request Failed",
        description: err.message || 'Failed to send OTP',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithOtp = async (data: LoginWithOtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      const [response, error] = await authService.loginWithOtp(data);
      
      if (error) throw error;
      
      if (response && 'data' in response) {
        const authResponse = response as AxiosResponse<{ data: { user: User; token: string } }>;
        setAuth({
          user: authResponse.data.data.user,
          token: authResponse.data.data.token
        });
        
        toast({
          title: "Welcome to FlapaBay!",
          description: "You have successfully signed in.",
        });
      }
    } catch (err: any) {
      console.error('Failed to login with OTP:', err);
      setError(err.message || 'Failed to login with OTP');
      toast({
        title: "Login Failed",
        description: err.message || 'Failed to login with OTP',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Signup Process Methods
  const getSignupPhoneOtp = async (data: SignupOtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      const [response, error] = await authService.getSignupPhoneOtp(data);
      
      if (error) throw error;
      
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the OTP code.",
      });
    } catch (err: any) {
      console.error('Failed to send phone OTP:', err);
      setError(err.message || 'Failed to send OTP');
      toast({
        title: "OTP Request Failed",
        description: err.message || 'Failed to send OTP',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSignupEmailOtp = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      const [response, error] = await authService.getSignupEmailOtp({ email });
      
      if (error) throw error;
      
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP code.",
      });
    } catch (err: any) {
      console.error('Failed to send email OTP:', err);
      setError(err.message || 'Failed to send OTP');
      toast({
        title: "OTP Request Failed",
        description: err.message || 'Failed to send OTP',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpByPhone = async (data: VerifyOtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      const [response, error] = await authService.verifyOtpByPhone(data);
      
      if (error) throw error;
      
      toast({
        title: "OTP Verified",
        description: "Phone number verified successfully.",
      });
    } catch (err: any) {
      console.error('Failed to verify phone OTP:', err);
      setError(err.message || 'Failed to verify OTP');
      toast({
        title: "Verification Failed",
        description: err.message || 'Failed to verify OTP',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpByEmail = async (data: VerifyOtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      const [response, error] = await authService.verifyOtpByEmail(data);
      
      if (error) throw error;
      
      toast({
        title: "OTP Verified",
        description: "Email verified successfully.",
      });
    } catch (err: any) {
      console.error('Failed to verify email OTP:', err);
      setError(err.message || 'Failed to verify OTP');
      toast({
        title: "Verification Failed",
        description: err.message || 'Failed to verify OTP',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const registerUserDetails = async (data: RegisterUserDetailsRequest) => {
    try {
      setLoading(true);
      setError(null);
      const [response, error] = await authService.registerUserDetails(data);
      
      if (error) throw error;
      
      if (response && 'data' in response) {
        const authResponse = response as AxiosResponse<{ data: { user: User; token: string } }>;
        setAuth({
          user: authResponse.data.data.user,
          token: authResponse.data.data.token
        });
        
        toast({
          title: "Welcome to FlapaBay!",
          description: "Your account has been created successfully.",
        });
      }
    } catch (err: any) {
      console.error('Failed to register user:', err);
      setError(err.message || 'Failed to register user');
      toast({
        title: "Registration Failed",
        description: err.message || 'Failed to register user',
        variant: "destructive",
      });
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
        registerUserDetails
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