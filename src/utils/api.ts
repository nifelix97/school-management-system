const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface LoginData {
  email: string;
  password: string;
  role: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  [key: string]: any; // For role-specific fields
}

export const authAPI = {
  login: async (data: LoginData): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  register: async (data: RegisterData): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  forgotPassword: async (email: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  verifyOTP: async (email: string, otp: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    return response.json();
  },

  resetPassword: async (email: string, newPassword: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });
    return response.json();
  },
};