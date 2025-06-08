import { apiClient } from '../config/axios';
import { Currency } from '../types';

export const currencyApi = {
  /**
   * Get all available currencies
   */
  getCurrencies: async (): Promise<Currency[]> => {
    return apiClient.get<Currency[]>('/currencies');
  },

  /**
   * Get currency by code
   */
  getCurrencyByCode: async (code: string): Promise<Currency> => {
    return apiClient.get<Currency>(`/currencies/${code}`);
  },

  /**
   * Set default currency
   */
  setDefaultCurrency: async (code: string): Promise<Currency> => {
    return apiClient.put<Currency>(`/currencies/${code}/default`);
  },

  /**
   * Update currency rates
   */
  updateRates: async (): Promise<Currency[]> => {
    return apiClient.post<Currency[]>('/currencies/update-rates');
  }
}; 