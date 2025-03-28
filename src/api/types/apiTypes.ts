// Authentication
export interface LoginRequest {
    email?: string;
    phone?: string;
    password?: string;
  }
  
  export interface RegisterRequest {
    name: string;
    email?: string;
    phone?: string;
    password?: string;
  }
  
  export interface VerifyOtpRequest {
    email?: string;
    phone?: string;
    otp: string;
  }
  
  // User
  export interface UserUpdateRequest {
    name?: string;
    email?: string;
    phone?: string;
    // ... other user update properties
  }
  
  export interface PropertyRequest {
      title: string;
      description: string;
      price: number;
      location_id: number;
      property_type_id: number;
      category_id: number;
      // ...other properties
  }
  
  export interface BookingRequest {
    property_id: number;
    start_date: string;
    end_date: string;
    guest_count: number;
  }
  // ... add other interfaces for requests and responses