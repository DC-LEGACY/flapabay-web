import api from '../core/api';
import { withTryCatch } from '../core/withTryCatch';
import { LoginRequest, RegisterRequest, VerifyOtpRequest } from '../types/apiTypes';

export const authService = {
  register: withTryCatch(async (data: RegisterRequest) => api.post('/register', data)),
  login: withTryCatch(async (data: LoginRequest) => api.post('/login', data)),
  getEmailOtp: withTryCatch(async (email: string) => api.post('/get-email-otp', { email })),
  getPhoneOtp: withTryCatch(async (phone: string) => api.post('/get-phone-otp', { phone })),
  verifyOtp: withTryCatch(async (data: VerifyOtpRequest) => api.get('/verify-otp', { params: data })),
  logout: withTryCatch(async () => api.post('/logout')),
  resetPassword: withTryCatch(async (data: { token: string; password: string }) => api.post('/reset-password', data)),
  forgotPassword: withTryCatch(async (email: string) => api.post('/forgot-password', { email })),
  googleSignIn: withTryCatch(async (token: string) => api.post('/google-signin', { token })),
  facebookSignIn: withTryCatch(async () => api.get('/facebook-signin')),
  getCategories: withTryCatch(async () => api.get('/categories')),
  addCategory: withTryCatch(async (data: {name: string}) => api.post('categories/add', data)),
};