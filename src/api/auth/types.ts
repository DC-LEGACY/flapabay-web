import { User } from '../types';

export interface AuthUser extends User {
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  user_metadata: {
    [key: string]: any;
    name?: string;
    picture?: string;
  };
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  phone?: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
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
  user: AuthUser;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthResponseBase {
  error: AuthError | null;
}

export interface UserResponse extends AuthResponseBase {
  data: { user: AuthUser | null };
}

export interface SessionResponse extends AuthResponseBase {
  data: { session: Session | null; user?: AuthUser | null };
}

export interface OAuthResponse extends AuthResponseBase {
  data: { provider?: string; url?: string };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  phone?: string;
  fullName?: string;
  [key: string]: any;
}

export interface OAuthRequest {
  provider: 'google' | 'facebook' | string;
}

export interface OtpRequest {
  email?: string;
  phone?: string;
  options?: any;
}

export interface VerifyOtpRequest {
  phone?: string;
  email?: string;
  token: string;
  type?: string;
}

export interface UpdateUserRequest {
  data: Partial<AuthUser['user_metadata']> & { [key: string]: any };
  password?: string;
} 