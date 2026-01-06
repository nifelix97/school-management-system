import type {
    Class,
    ClassFilters,
    CreateClassDto,
    UpdateClassDto,
} from '../../../types/class';
import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

// Re-export types for convenience
export type {
    Class, ClassFilters, CreateClassDto,
    UpdateClassDto
};

// --- API Slice Injection ---

export const classesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all classes
    getClasses: builder.query<ApiResponse<Class[]>, ClassFilters | void>({
      query: (filters) => ({
        url: '/classes',
        params: filters || {},
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Classes' as const, id })),
              { type: 'Classes', id: 'LIST' },
            ]
          : [{ type: 'Classes', id: 'LIST' }],
    }),

    // Create a new class
    createClass: builder.mutation<ApiResponse<Class>, CreateClassDto>({
      query: (data) => ({
        url: '/classes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Classes', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useCreateClassMutation,
} = classesApi;
