import { apiClient } from '../config/axios';
import { User, UserUpdateRequest } from '../types';

export const usersApi = {
  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    return apiClient.get<User>('/users/profile');
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: UserUpdateRequest): Promise<User> => {
    return apiClient.put<User>('/users/profile', data);
  },

  /**
   * Update user profile picture
   */
  updateProfilePicture: async (formData: FormData): Promise<User> => {
    return apiClient.put<User>('/users/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId: number): Promise<User> => {
    return apiClient.get<User>(`/users/${userId}`);
  },

  /**
   * Get user reviews
   */
  getUserReviews: async (userId: number): Promise<any> => {
    return apiClient.get(`/users/${userId}/reviews`);
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
    return apiClient.post<User>('/users/complete-registration', data);
  }
}; 