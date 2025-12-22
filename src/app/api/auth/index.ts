import { apiSlice } from '../apiEntry';

// Types based on Backend Controller
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  name: string;
  phone: string;
  status: 'pending' | 'active' | 'suspended';
  [key: string]: any; 
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  department?: string;
  specialization?: string;
  qualification?: string;
  yearsOfExperience?: string;
  yearLevel?: string;
  program?: string;
  studentName?: string;
  relationship?: string;
  emergencyContact?: string;
  librarySection?: string;
  licenseNumber?: string;
  contractDocument?: string | File;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    register: builder.mutation<ApiResponse<any>, FormData | RegisterRequest>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),

    forgotPassword: builder.mutation<ApiResponse<null>, { email: string }>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    verifyOTP: builder.mutation<ApiResponse<null>, { email: string; otp: string }>({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation<ApiResponse<null>, { email: string; newPassword: string }>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    refreshToken: builder.mutation<ApiResponse<{ token: string }>, { refreshToken: string }>({
      query: (data) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: data,
      }),
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
