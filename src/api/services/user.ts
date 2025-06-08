import { api } from '../api';
import { User } from '../types';

export const userService = {
  /**
   * Get user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/user/profile');
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/user/profile', data);
    return response.data;
  },

  /**
   * Complete user registration
   */
  completeRegistration: async (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }): Promise<User> => {
    const response = await api.post<User>('/user/complete-registration', data);
    return response.data;
  }
};