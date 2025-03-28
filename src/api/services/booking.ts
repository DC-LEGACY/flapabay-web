import api from '../core/api';
import { withTryCatch } from '../core/withTryCatch';
import { BookingRequest } from '../types/apiTypes';

export const bookingService = {
  createBooking: withTryCatch(async (data: BookingRequest) => api.post('/booking', data)),
  getBookings: withTryCatch(async () => api.get('/bookings')),
  getBooking: withTryCatch(async (bookId: number) => api.get(`/booking/${bookId}`)),
  cancelBooking: withTryCatch(async (bookId: number) => api.put(`/booking/${bookId}/cancel`)),
  generateInvoice: withTryCatch(async (bookingId: number) => api.post(`/bookings/${bookingId}/invoice`)),
};