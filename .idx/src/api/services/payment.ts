import api from '../core/api';
import { withTryCatch } from '../core/withTryCatch';

export const paymentService = {
  checkout: withTryCatch(async (data: any) => api.post('/payments/checkout', data)),
  getStatus: withTryCatch(async () => api.get('/payments/status')),
  getOptions: withTryCatch(async () => api.get('/payments/payout-options')),
  addOption: withTryCatch(async (data: any) => api.post('/payments/create-payout-options', data))
}
