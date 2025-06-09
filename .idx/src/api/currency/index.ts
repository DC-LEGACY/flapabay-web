import { apiClient } from '../config/axios';
import { Currency } from '../types';

export const currencyApi = {
  /**
   * Get all available currencies
   */
  getCurrencies: async (): Promise<Currency[]> => {
    const response = await apiClient.get<Currency[]>('/supported-lang');
    return response.data;
  },

  /**
   * Get currency by code
   */
  getCurrencyByCode: async (code: string): Promise<Currency> => {
    const response = await apiClient.get<Currency>(`/currencies/${code}`);
    return response.data;
  },

  /**
   * Set default currency
   */
  setDefaultCurrency: async (code: string): Promise<Currency> => {
    const response = await apiClient.put<Currency>(`/currencies/${code}/default`);
    return response.data;
  },

  /**
   * Update currency rates
   */
  updateRates: async (): Promise<Currency[]> => {
    const response = await apiClient.post<Currency[]>('/currencies/update-rates');
    return response.data;
  }
}; 