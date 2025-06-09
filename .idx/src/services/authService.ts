// src/services/authService.ts

// Define User and Session interfaces (similar to what was in AuthContext)
export interface User {
  id: string;
  app_metadata: { provider?: string; providers?: string[] };
  user_metadata: { [key: string]: any; name?: string; picture?: string };
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  email?: string;
  phone?: string;
  created_at: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string; // e.g., 'guest', 'host', 'admin'
  updated_at?: string;
  identities?: any[];
  factors?: any[];
  is_anonymous?: boolean;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  user: User;
}

// Define generic error structure
export interface AuthError {
  message: string;
  status?: number; // Optional: for HTTP status codes from a REST API
}

// Define Auth response structures
export interface AuthResponseBase {
  error: AuthError | null;
}

export interface UserResponse extends AuthResponseBase {
  data: { user: User | null };
}

export interface SessionResponse extends AuthResponseBase {
  data: { session: Session | null; user?: User | null }; // user is often part of session response
}

export interface OAuthResponse extends AuthResponseBase {
  data: { provider?: string; url?: string };
}

// Define the AuthService interface
export interface AuthService {
  signInWithPassword: (credentials: { email: string; password: string }) => Promise<SessionResponse>;
  signUp: (credentials: { email: string; password: string; phone?: string; fullName?: string; [key: string]: any }) => Promise<SessionResponse>; // Allow additional options for metadata
  signInWithOAuth: (options: { provider: 'google' | 'facebook' | string }) => Promise<OAuthResponse | SessionResponse>; // OAuth might return URL or directly a session
  signInWithOtp: (options: { email?: string; phone?: string; options?: any }) => Promise<SessionResponse | AuthResponseBase>; // OTP might not return session immediately
  verifyOtp: (options: { phone?: string; email?: string; token: string; type?: string }) => Promise<SessionResponse>;
  signOut: () => Promise<AuthResponseBase>;
  onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
    unsubscribe: () => void;
  };
  getUser: () => Promise<UserResponse>;
  getSession: () => Promise<SessionResponse>;
  updateUser: (attributes: { data: Partial<User['user_metadata']> & { [key: string]: any }, password?: string }) => Promise<UserResponse>;
  // Add other methods like resetPasswordForEmail, etc., as needed
}

// If you have data operations currently mocked in the supabase client (from, storage)
// you might want to define separate service interfaces for those as well, e.g., DataService, StorageService.
// For now, focusing on Auth. 