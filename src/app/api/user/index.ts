import type {
  EmergencyContact,
  StudentProfile,
  StudentProfileUpdate
} from '../../../types/StudentProfile';
import { apiSlice } from '../apiEntry';
import type { ApiResponse, User } from '../auth';

// --- Mapping Helpers ---

const mapBackendToProfile = (data: any): StudentProfile => ({
  id: data.id,
  profileImageUrl: data.profile_image_url || data.avatar || data.profileImageUrl,
  firstName: data.first_name || data.firstName || '',
  lastName: data.last_name || data.lastName || '',
  email: data.email || '',
  telephoneNumber: data.phone || data.telephoneNumber || '',
  registrationNumber: data.registration_number || data.registrationNumber || '',
  currentYear: data.current_year || data.currentYear || '',
  title: data.title,
  role: data.role,
  program: data.program,
  department: data.department,
  emergencyContacts: data.emergency_contacts?.map(mapBackendToEmergencyContact) || []
});

const mapBackendToEmergencyContact = (contact: any): EmergencyContact => ({
  id: contact.id,
  name: contact.name || '',
  priority: contact.priority === 1 ? 'Primary' : contact.priority === 2 ? 'Secondary' : contact.priority || 'Other',
  email: contact.email || '',
  phone: contact.phone || '',
  mobilePhone: contact.mobile_phone || contact.mobilePhone,
  workPhone: contact.work_phone || contact.workPhone,
  relation: contact.relation || '',
});

const mapProfileUpdateToBackend = (update: StudentProfileUpdate) => {
  const mapped: any = {};
  if (update.firstName !== undefined) mapped.first_name = update.firstName;
  if (update.lastName !== undefined) mapped.last_name = update.lastName;
  if (update.email !== undefined) mapped.email = update.email;
  if (update.telephoneNumber !== undefined) mapped.phone = update.telephoneNumber;
  if (update.registrationNumber !== undefined) mapped.registration_number = update.registrationNumber;
  if (update.currentYear !== undefined) mapped.current_year = update.currentYear;
  if (update.program !== undefined) mapped.program = update.program;
  if (update.department !== undefined) mapped.department = update.department;
  if (update.newPassword !== undefined) mapped.password = update.newPassword;
  return mapped;
};

const mapEmergencyContactToBackend = (contact: Partial<EmergencyContact>) => {
  const mapped: any = {};
  if (contact.name !== undefined) mapped.name = contact.name;
  if (contact.priority !== undefined) {
    mapped.priority = contact.priority === 'Primary' ? 1 : contact.priority === 'Secondary' ? 2 : contact.priority;
  }
  if (contact.email !== undefined) mapped.email = contact.email;
  if (contact.phone !== undefined) mapped.phone = contact.phone;
  if (contact.mobilePhone !== undefined) mapped.mobile_phone = contact.mobilePhone;
  if (contact.workPhone !== undefined) mapped.work_phone = contact.workPhone;
  if (contact.relation !== undefined) mapped.relation = contact.relation;
  return mapped;
};

// --- API Definition ---

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
    getProfile: builder.query<ApiResponse<StudentProfile>, void>({
      query: () => '/user/profile',
      transformResponse: (response: ApiResponse<any>) => ({
        ...response,
        data: response.data ? mapBackendToProfile(response.data) : undefined
      }),
      providesTags: ['Users'],
    }),

    updateProfile: builder.mutation<ApiResponse<StudentProfile>, StudentProfileUpdate>({
      query: (data) => ({
        url: '/user/profile',
        method: 'PATCH',
        body: mapProfileUpdateToBackend(data),
      }),
      transformResponse: (response: ApiResponse<any>) => ({
        ...response,
        data: response.data ? mapBackendToProfile(response.data) : undefined
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
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(mapBackendToEmergencyContact)
      }),
      providesTags: ['Users'],
    }),

    addEmergencyContact: builder.mutation<ApiResponse<EmergencyContact>, Partial<EmergencyContact>>({
      query: (data) => ({
        url: '/user/emergency-contacts',
        method: 'POST',
        body: mapEmergencyContactToBackend(data),
      }),
      transformResponse: (response: ApiResponse<any>) => ({
        ...response,
        data: response.data ? mapBackendToEmergencyContact(response.data) : undefined
      }),
      invalidatesTags: ['Users'],
    }),

    updateEmergencyContact: builder.mutation<ApiResponse<EmergencyContact>, { contactId: string | number; data: Partial<EmergencyContact> }>({
      query: ({ contactId, data }) => ({
        url: `/user/emergency-contacts/${contactId}`,
        method: 'PATCH',
        body: mapEmergencyContactToBackend(data),
      }),
      transformResponse: (response: ApiResponse<any>) => ({
        ...response,
        data: response.data ? mapBackendToEmergencyContact(response.data) : undefined
      }),
      invalidatesTags: ['Users'],
    }),

    deleteEmergencyContact: builder.mutation<ApiResponse<null>, string | number>({
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
