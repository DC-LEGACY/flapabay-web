import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

interface ErrorResponse {
  message?: string;
  status?: number;
  code?: string;
  details?: any;
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.flapabay.com/api/v1';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 seconds
  // Removed withCredentials: true to use same-origin by default
});

// Helper function to convert object to FormData
const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};

// Request interceptor for adding auth token and handling request errors
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // Log request details
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
      params: config.params
    });

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Convert object to FormData for POST/PUT/PATCH requests
    if (config.data && !(config.data instanceof FormData) && typeof config.data === 'object') {
      if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
        config.data = createFormData(config.data);
        config.headers['Content-Type'] = 'multipart/form-data';
      }
    }

    // Add request timestamp to prevent caching
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('Request Error:', {
      message: error.message,
      code: error.code,
      config: error.config
    });
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses and errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful response
    console.log('Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    // Log detailed error information
    console.error('Response Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data,
        params: error.config?.params
      }
    });

    // Handle network errors
    if (!error.response) {
      console.error('Network Error Details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });

      toast.error('Network error. Please check your connection.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
        code: 'ERR_NETWORK'
      });
    }

    // Handle specific error cases
    switch (error.response.status) {
      case 401:
        // Token expired or invalid
        localStorage.removeItem('auth_token');
        localStorage.removeItem('flapabay_user_session');
        window.location.href = '/auth/login';
        break;
      case 403:
        toast.error('You do not have permission to perform this action.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      case 404:
        toast.error('The requested resource was not found.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      case 500:
        toast.error('An internal server error occurred. Please try again later.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      default:
        const errorMessage = error.response.data?.message || 'An error occurred';
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
    }

    return Promise.reject({
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
      code: error.code,
      details: error.response.data
    });
  }
);

// Add retry logic for failed requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

api.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    
    // If no config or already retried, reject
    if (!config || config.__retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    // Set retry count
    config.__retryCount = config.__retryCount || 0;
    config.__retryCount++;

    console.log(`Retrying request (${config.__retryCount}/${MAX_RETRIES}):`, {
      url: config.url,
      method: config.method
    });

    // Create new promise with exponential backoff
    const backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve(null);
      }, RETRY_DELAY * config.__retryCount);
    });

    // Wait for backoff and retry
    await backoff;
    return api(config);
  }
);

export default api;