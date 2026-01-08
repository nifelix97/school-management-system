import type {
    CreateDepartmentDto,
    Department,
    UpdateDepartmentDto,
} from '../../../types/department';
import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

// Re-export types for convenience
export type {
    CreateDepartmentDto, Department, UpdateDepartmentDto
};

// --- API Slice Injection ---

export const departmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all departments
    getDepartments: builder.query<ApiResponse<Department[]>, void>({
      query: () => '/departments',
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Departments' as const, id })),
              { type: 'Departments', id: 'LIST' },
            ]
          : [{ type: 'Departments', id: 'LIST' }],
    }),

    // Create a new department
    createDepartment: builder.mutation<ApiResponse<Department>, CreateDepartmentDto>({
      query: (data) => ({
        url: '/departments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Departments', id: 'LIST' }],
    }),

    // Update an existing department
    updateDepartment: builder.mutation<ApiResponse<Department>, { id: string; data: UpdateDepartmentDto }>({
      query: ({ id, data }) => ({
        url: `/departments/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Departments', id },
        { type: 'Departments', id: 'LIST' },
      ],
    }),

    // Delete a department
    deleteDepartment: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Departments', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApi;
