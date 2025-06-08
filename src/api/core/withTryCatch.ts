import { AxiosError, AxiosResponse } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export const withTryCatch = <T extends (...args: any[]) => Promise<AxiosResponse<ApiResponse<any>>>>(
  apiFunction: T
) => {
  return async (...args: Parameters<T>): Promise<[ApiResponse<any> | null, ApiError | null]> => {
    try {
      const response = await apiFunction(...args);
      
      // Check if the response indicates failure
      if (!response.data.success) {
        return [null, {
          message: response.data.message || 'Operation failed',
          status: response.status,
          code: 'API_ERROR',
          details: response.data
        }];
      }

      return [response.data, null];
    } catch (error) {
      const apiError: ApiError = {
        message: 'An unexpected error occurred',
        status: 500,
      };

      if (error instanceof AxiosError) {
        // Handle network errors
        if (!error.response) {
          apiError.message = 'Network error. Please check your connection.';
          apiError.code = 'ERR_NETWORK';
          apiError.status = 0;
        } else {
          // Handle API errors
          const responseData = error.response.data;
          apiError.message = responseData?.message || error.message;
          apiError.status = error.response.status;
          apiError.code = responseData?.code || error.code;
          apiError.details = responseData;
        }
      } else if (error instanceof Error) {
        apiError.message = error.message;
      }

      console.error('API Error:', apiError);
      return [null, apiError];
    }
  };
};