import api from '../core/api';
import { withTryCatch } from '../core/withTryCatch';
import { AxiosResponse } from 'axios';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  code: string;
  name: string;
  native_name: string;
}

export interface Translation {
  key: string;
  value: string;
  language_code: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

type ApiResult<T> = Promise<[AxiosResponse<ApiResponse<T>> | null, any]>;

export const currencyService = {
  getSupportedCurrencies: (): ApiResult<Currency[]> => 
    withTryCatch(() => api.get<ApiResponse<Currency[]>>('/get-supported-currencies'))(),

  getSupportedLanguages: (): ApiResult<Language[]> => 
    withTryCatch(() => api.get<ApiResponse<Language[]>>('/supported-lang'))(),

  setUserCurrency: (currencyCode: string): ApiResult<void> => 
    withTryCatch(() => api.post<ApiResponse<void>>('/set-user-currency', { currency_code: currencyCode }))(),

  setUserLanguage: (languageCode: string): ApiResult<void> => 
    withTryCatch(() => api.post<ApiResponse<void>>('/set-user-language', { language_code: languageCode }))(),

  getTranslations: (languageCode: string): ApiResult<Translation[]> => 
    withTryCatch(() => api.get<ApiResponse<Translation[]>>('/translations', {
      params: { language_code: languageCode }
    }))()
}; 