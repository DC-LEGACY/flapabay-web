import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export const withTryCatch = <T extends (...args: any[]) => Promise<any>>(
    apiFunction: T
  ) => {
    return async (...args: Parameters<T>): Promise<[ReturnType<T> | null, ApiError | null]> => {
      try {
        const result = await apiFunction(...args);
        return [result, null];
      } catch (error) {
        const apiError: ApiError = {
          message: 'An unexpected error occurred',
          status: 500,
        };

        if (error instanceof AxiosError) {
          apiError.message = error.response?.data?.message || error.message;
          apiError.status = error.response?.status;
          apiError.code = error.code;
          apiError.details = error.response?.data;
        } else if (error instanceof Error) {
          apiError.message = error.message;
        }

        console.error('API Error:', apiError);
        return [null, apiError];
      }
    };
  };