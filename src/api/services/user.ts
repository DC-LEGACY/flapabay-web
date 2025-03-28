import api from '../core/api';
import { withTryCatch } from '../core/withTryCatch';
import { RegisterRequest, UserUpdateRequest } from '../types/apiTypes';

export const userService = {
  getUser: withTryCatch(async (userId: number) => api.get(`/users/${userId}`)),
  updateUser: withTryCatch(async (userId: number, data: UserUpdateRequest) => api.put(`/users/${userId}`, data)),
  updateProfilePicture: withTryCatch(async (userId: number, formData: FormData) => api.post(`/users/${userId}/profile-picture`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })),
  getUserReviews: withTryCatch(async (userId: number) => api.get(`/users/${userId}/reviews`)),
  registerHost: withTryCatch(async (data: RegisterRequest) => api.post('/host/signup', data)),
};