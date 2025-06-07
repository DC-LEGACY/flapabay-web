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
  RegisterUserDetailsRequest
} from '../types/apiTypes';

export const authService = {
  // Regular authentication
  login: withTryCatch(async (data: LoginRequest) => 
    api.post<{ data: AuthResponse }>('/login', data)
  ),
  
  register: withTryCatch(async (data: RegisterRequest) => 
    api.post<{ data: AuthResponse }>('/register', data)
  ),

  // Google OAuth
  googleAuth: withTryCatch(async (googleToken: string, userInfo: any) => 
    api.post<{ data: AuthResponse }>('/google-auth', { googleToken, userInfo })
  ),

  // OTP verification
  getEmailOtp: withTryCatch(async (email: string) => 
    api.post('/get-email-otp', { email })
  ),
  
  getPhoneOtp: withTryCatch(async (phone: string) => 
    api.post('/get-phone-otp', { phone })
  ),
  
  verifyOtp: withTryCatch(async (data: VerifyOtpRequest) => 
    api.get<{ data: AuthResponse }>('/verify-otp', { params: data })
  ),

  // Password management
  forgotPassword: withTryCatch(async (email: string) => 
    api.post('/forgot-password', { email })
  ),
  
  resetPassword: withTryCatch(async (data: { token: string; password: string }) => 
    api.post('/reset-password', data)
  ),

  // Session management
  logout: withTryCatch(async () => 
    api.post('/logout')
  ),

  // User management
  updateUser: withTryCatch(async (data: Partial<UserResponse>) => 
    api.put<{ data: { user: UserResponse } }>('/user', data)
  ),

  // Role management
  switchRole: withTryCatch(async (role: 'guest' | 'host') => 
    api.put<{ data: { user: UserResponse } }>('/user/role', { role })
  ),

  // Additional services
  getCategories: withTryCatch(async () => api.get('/categories')),
  addCategory: withTryCatch(async (data: {name: string}) => api.post('categories/add', data)),

  // New OTP-based Authentication
  getEmailOrPhoneOtp: withTryCatch(async (data: OtpRequest) => 
    api.post<{ data: OtpResponse }>('/get-email-phone-otp', data)
  ),

  loginWithOtp: withTryCatch(async (data: LoginWithOtpRequest) => 
    api.post<{ data: AuthResponse }>('/login-with-otp', data)
  ),

  // Signup Process
  getSignupPhoneOtp: withTryCatch(async (data: SignupOtpRequest) => 
    api.post<{ data: OtpResponse }>('/get-phone-otp', data)
  ),

  getSignupEmailOtp: withTryCatch(async (data: { email: string }) => 
    api.post<{ data: OtpResponse }>('/get-email-otp', data)
  ),

  verifyOtpByPhone: withTryCatch(async (data: VerifyOtpRequest) => 
    api.post<{ data: OtpResponse }>('/verify-otp-byphone', data)
  ),

  verifyOtpByEmail: withTryCatch(async (data: VerifyOtpRequest) => 
    api.post<{ data: OtpResponse }>('/verify-otp-byemail', data)
  ),

  registerUserDetails: withTryCatch(async (data: RegisterUserDetailsRequest) => 
    api.post<{ data: AuthResponse }>('/register-user-details', data)
  ),
};