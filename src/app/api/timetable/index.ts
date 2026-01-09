import type {
    CreateTimetableEntryDto,
    TimetableEntry,
    TimetableFilters,
    UpdateTimetableEntryDto
} from '../../../types/timetable';
import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

export const timetableApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentTimetable: builder.query<ApiResponse<TimetableEntry[]>, TimetableFilters>({
      query: (filters) => ({
        url: '/timetable/department',
        params: {
          academic_year: filters.academicYear,
          semester: filters.semester,
        },
      }),
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(entry => ({
          id: entry.id,
          courseId: entry.course_id,
          courseCode: entry.course?.code || entry.course_code,
          courseName: entry.course?.title || entry.course_name || entry.course_title,
          instructorId: entry.instructor_id,
          instructorName: entry.instructor ? `${entry.instructor.first_name || ''} ${entry.instructor.last_name || ''}`.trim() : entry.instructor_name,
          departmentId: entry.department_id,
          departmentName: entry.department?.name || entry.department_name,
          classCohortId: entry.class_cohort_id,
          academicYear: entry.academic_year,
          semester: entry.semester,
          level: entry.level,
          dayOfWeek: entry.day_of_week,
          startTime: entry.start_time,
          endTime: entry.end_time,
          room: entry.room,
          building: entry.building,
          type: entry.type,
          isRecurring: entry.is_recurring === 1 || entry.is_recurring === true,
          effectiveFrom: entry.effective_from,
          effectiveTo: entry.effective_to,
          notes: entry.notes,
          status: entry.status || 'pending',
          createdAt: entry.created_at,
          updatedAt: entry.updated_at
        })) as TimetableEntry[]
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Timetable' as const, id })),
              { type: 'Timetable', id: 'LIST' },
            ]
          : [{ type: 'Timetable', id: 'LIST' }],
    }),

    getTeacherTimetable: builder.query<ApiResponse<TimetableEntry[]>, TimetableFilters>({
      query: (filters) => ({
        url: '/timetable/teacher',
        params: {
          academic_year: filters.academicYear,
          semester: filters.semester,
        },
      }),
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(entry => ({
          id: entry.id,
          courseId: entry.course_id,
          courseCode: entry.course?.code || entry.course_code,
          courseName: entry.course?.title || entry.course_name || entry.course_title,
          instructorId: entry.instructor_id,
          instructorName: entry.instructor ? `${entry.instructor.first_name || ''} ${entry.instructor.last_name || ''}`.trim() : entry.instructor_name,
          departmentId: entry.department_id,
          classCohortId: entry.class_cohort_id,
          academicYear: entry.academic_year,
          semester: entry.semester,
          dayOfWeek: entry.day_of_week,
          startTime: entry.start_time,
          endTime: entry.end_time,
          room: entry.room,
          building: entry.building,
          type: entry.type,
          isRecurring: entry.is_recurring === 1 || entry.is_recurring === true,
          effectiveFrom: entry.effective_from,
          effectiveTo: entry.effective_to,
          notes: entry.notes,
          status: entry.status || 'pending'
        })) as TimetableEntry[]
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Timetable' as const, id })),
              { type: 'Timetable', id: 'LIST' },
            ]
          : [{ type: 'Timetable', id: 'LIST' }],
    }),

    getStudentTimetable: builder.query<ApiResponse<TimetableEntry[]>, TimetableFilters>({
      query: (filters) => ({
        url: '/timetable/student',
        params: {
          academic_year: filters.academicYear,
          semester: filters.semester,
        },
      }),
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(entry => ({
          id: entry.id,
          courseId: entry.course_id,
          courseCode: entry.course?.code || entry.course_code,
          courseName: entry.course?.title || entry.course_name || entry.course_title,
          instructorId: entry.instructor_id,
          instructorName: entry.instructor ? `${entry.instructor.first_name || ''} ${entry.instructor.last_name || ''}`.trim() : entry.instructor_name,
          departmentId: entry.department_id,
          classCohortId: entry.class_cohort_id,
          academicYear: entry.academic_year,
          semester: entry.semester,
          dayOfWeek: entry.day_of_week,
          startTime: entry.start_time,
          endTime: entry.end_time,
          room: entry.room,
          building: entry.building,
          type: entry.type,
          isRecurring: entry.is_recurring === 1 || entry.is_recurring === true,
          effectiveFrom: entry.effective_from,
          effectiveTo: entry.effective_to,
          notes: entry.notes,
          status: entry.status || 'pending'
        })) as TimetableEntry[]
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Timetable' as const, id })),
              { type: 'Timetable', id: 'LIST' },
            ]
          : [{ type: 'Timetable', id: 'LIST' }],
    }),

    createTimetable: builder.mutation<ApiResponse<TimetableEntry>, CreateTimetableEntryDto>({
      query: (newEntry) => ({
        url: '/timetable',
        method: 'POST',
        body: newEntry,
      }),
      invalidatesTags: [{ type: 'Timetable', id: 'LIST' }],
    }),

    updateTimetable: builder.mutation<ApiResponse<TimetableEntry>, { id: string; data: UpdateTimetableEntryDto }>({
      query: ({ id, data }) => ({
        url: `/timetable/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Timetable', id },
        { type: 'Timetable', id: 'LIST' },
      ],
    }),

    deleteTimetable: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/timetable/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Timetable', id },
        { type: 'Timetable', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetDepartmentTimetableQuery,
  useGetTeacherTimetableQuery,
  useGetStudentTimetableQuery,
  useCreateTimetableMutation,
  useUpdateTimetableMutation,
  useDeleteTimetableMutation,
} = timetableApi;
