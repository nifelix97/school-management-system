import { apiSlice } from '../apiEntry';
import type { ApiResponse, User } from '../auth';

// Additional Types for User API
export interface EmergencyContact {
  id: number;
  student_id: number;
  name: string;
  priority: number;
  email: string;
  phone: string;
  mobile_phone?: string;
  work_phone?: string;
  relation: string;
}

export interface StudentProfileUpdateDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentYear?: string;
  program?: string;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Profile Management
    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => '/user/profile',
      providesTags: ['Users'],
    }),

    updateProfile: builder.mutation<ApiResponse<User>, StudentProfileUpdateDto>({
      query: (data) => ({
        url: '/user/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

    changePassword: builder.mutation<ApiResponse<null>, any>({
      query: (data) => ({
        url: '/user/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    uploadAvatar: builder.mutation<ApiResponse<{ profileImageUrl: string }>, FormData>({
      query: (formData) => ({
        url: '/user/avatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Users'],
    }),

    // Emergency Contacts
    getEmergencyContacts: builder.query<ApiResponse<EmergencyContact[]>, void>({
      query: () => '/user/emergency-contacts',
      providesTags: ['Users'],
    }),

    addEmergencyContact: builder.mutation<ApiResponse<EmergencyContact>, Partial<EmergencyContact>>({
      query: (data) => ({
        url: '/user/emergency-contacts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

    updateEmergencyContact: builder.mutation<ApiResponse<EmergencyContact>, { contactId: number; data: Partial<EmergencyContact> }>({
      query: ({ contactId, data }) => ({
        url: `/user/emergency-contacts/${contactId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

    deleteEmergencyContact: builder.mutation<ApiResponse<null>, number>({
      query: (contactId) => ({
        url: `/user/emergency-contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    // User Administration (Admin Only)
    getAllUsers: builder.query<ApiResponse<PaginatedUsers>, UserFilters>({
      query: (filters) => ({
        url: '/user/all',
        params: filters,
      }),
      providesTags: ['Users'],
    }),

    getPendingUsers: builder.query<ApiResponse<User[]>, void>({
      query: () => '/user/pending',
      providesTags: ['Users'],
    }),

    activateUser: builder.mutation<ApiResponse<null>, number>({
      query: (userId) => ({
        url: `/user/${userId}/activate`,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),

    deactivateUser: builder.mutation<ApiResponse<null>, number>({
      query: (userId) => ({
        url: `/user/${userId}/deactivate`,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),

    approveUser: builder.mutation<ApiResponse<null>, number>({
      query: (userId) => ({
        url: `/user/${userId}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),

    rejectUser: builder.mutation<ApiResponse<null>, number>({
      query: (userId) => ({
        url: `/user/${userId}/reject`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    changeRole: builder.mutation<ApiResponse<null>, { userId: number; role: string }>({
      query: ({ userId, role }) => ({
        url: `/user/${userId}/role`,
        method: 'PUT',
        body: { role },
      }),
      invalidatesTags: ['Users'],
    }),

    getRoles: builder.query<ApiResponse<string[]>, void>({
      query: () => '/user/roles',
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
  useGetEmergencyContactsQuery,
  useAddEmergencyContactMutation,
  useUpdateEmergencyContactMutation,
  useDeleteEmergencyContactMutation,
  useGetAllUsersQuery,
  useGetPendingUsersQuery,
  useActivateUserMutation,
  useDeactivateUserMutation,
  useApproveUserMutation,
  useRejectUserMutation,
  useChangeRoleMutation,
  useGetRolesQuery,
} = userApi;
