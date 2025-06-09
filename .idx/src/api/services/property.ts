import api from '../core/api';
import { withTryCatch } from '../core/withTryCatch';
import { PropertyRequest } from '../types/apiTypes';

export const propertyService = {
  getProperties: withTryCatch(async () => api.get('/properties')),
  createProperties: withTryCatch(async (data: PropertyRequest) => api.post('/properties', data)),
  updateProperties: withTryCatch(async (data: PropertyRequest) => api.post('/update-properties', data)),
  getProperty: withTryCatch(async (propertyId: number) => api.get(`/properties/${propertyId}`)),
  deleteProperty: withTryCatch(async (propertyId: number) => api.delete(`/properties/${propertyId}`)),
  getPropertyReviews: withTryCatch(async (propertyId: number) => api.get(`/properties/${propertyId}/reviews`)),
  getPropertyDescription: withTryCatch(async (propertyId: number) => api.get(`/properties/${propertyId}/description`)),
  getPropertyPriceDetails: withTryCatch(async (propertyId: number) => api.get(`/properties/${propertyId}/price-details`)),
  getPropertyAmenities: withTryCatch(async (propertyId: number) => api.get(`/properties/${propertyId}/amenities`)),
  getAvailabilityDates: withTryCatch(async (propertyId: number) => api.get(`/properties/${propertyId}/availability`)),
};