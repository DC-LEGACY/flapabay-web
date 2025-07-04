import api from '../core/api';
import { withTryCatch } from '../core/withTryCatch';
import { 
  LoginRequest, 
  RegisterRequest, 
  VerifyOtpRequest,
  AuthResponse,
  UserResponse,
  OtpRequest,
  OtpResponse,
  LoginWithOtpRequest,
  SignupOtpRequest,
  RegisterUserDetailsRequest,
  loginWithPassword
} from '../types/apiTypes';

export const authService = {
  // Regular authentication
  login: withTryCatch(async (data: LoginRequest) => 
    api.post<AuthResponse>('/auth/login', data)
  ),
  //login with password
  loginwithpassword: withTryCatch(async (data: loginWithPassword) =>
    api.post<AuthResponse>('/auth/loginWithPassword', data)
  ),
  
  register: withTryCatch(async (data: RegisterRequest) => 
    api.post<AuthResponse>('/auth/register', data)
  ),

  // Google OAuth
  googleAuth: withTryCatch(async (googleToken: string, userInfo: any) => 
    api.post<AuthResponse>('/auth/google-auth', { googleToken, userInfo })
  ),

  // OTP verification
  getEmailOtp: withTryCatch(async (email: string) => 
    api.post<OtpResponse>('/auth/get-email-otp', { email })
  ),
  
  getPhoneOtp: withTryCatch(async (phone: string) => 
    api.post<OtpResponse>('/auth/get-phone-otp', { phone })
  ),
  
  verifyOtp: withTryCatch(async (data: VerifyOtpRequest) => 
    api.post<AuthResponse>('/auth/verify-otp', data)
  ),

  // Password management
  forgotPassword: withTryCatch(async (email: string) => 
    api.post<{ message: string }>('/auth/forgot-password', { email })
  ),
  
  resetPassword: withTryCatch(async (data: { token: string; password: string }) => 
    api.post<{ message: string }>('/auth/reset-password', data)
  ),

  // Session management
  logout: withTryCatch(async () => 
    api.post<{ message: string }>('/auth/logout')
  ),

  // User management
  updateUser: withTryCatch(async (data: Partial<UserResponse>) => 
    api.put<{ user: UserResponse }>('/auth/user', data)
  ),

  // Role management
  switchRole: withTryCatch(async (role: 'guest' | 'host') => 
    api.put<{ user: UserResponse }>('/auth/user/role', { role })
  ),

  // Additional services
  getCategories: withTryCatch(async () => api.get('/categories')),
  addCategory: withTryCatch(async (data: {name: string}) => api.post('categories/add', data)),

  // OTP-based Authentication
  getEmailOrPhoneOtp: withTryCatch(async (data: OtpRequest) => 
    api.post<OtpResponse>('/auth/get-email-phone-otp', data)
  ),

  loginWithOtp: withTryCatch(async (data: LoginWithOtpRequest) => 
    api.post<AuthResponse>('/auth/login-with-otp', data)
  ),

  // Signup Process
  getSignupPhoneOtp: withTryCatch(async (data: SignupOtpRequest) => 
    api.post<OtpResponse>('/auth/get-phone-otp', data)
  ),

  getSignupEmailOtp: withTryCatch(async (data: { email: string }) => 
    api.post<OtpResponse>('/auth/get-email-otp', data)
  ),

  verifyOtpByPhone: withTryCatch(async (data: VerifyOtpRequest) => 
    api.post<OtpResponse>('/auth/verify-otp-byphone', data)
  ),

  verifyOtpByEmail: withTryCatch(async (data: VerifyOtpRequest) => 
    api.post<OtpResponse>('/auth/verify-otp-byemail', data)
  ),

  registerUserDetails: withTryCatch(async (data: RegisterUserDetailsRequest) => 
    api.post<AuthResponse>('/auth/register-user-details', data)
  ),
};


