import type {
  Course,
  CourseFilters,
  CourseLevel,
  CourseResource,
  CourseStatus,
  CreateCourseDto,
  Enrollment,
  Teacher,
  UpdateCourseDto,
} from '../../../types/course';
import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

// Re-export types for convenience
export type {
  Course, CourseFilters, CourseLevel, CourseResource, CourseStatus, CreateCourseDto, Enrollment, Teacher, UpdateCourseDto
};

// --- API Slice Injection ---

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // General Course Management
    getCourses: builder.query<ApiResponse<Course[]>, CourseFilters | void>({
      query: (filters) => ({
        url: '/courses',
        params: filters || {},
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Courses' as const, id })),
              { type: 'Courses', id: 'LIST' },
            ]
          : [{ type: 'Courses', id: 'LIST' }],
    }),

    getCourseById: builder.query<ApiResponse<Course>, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Courses', id }],
    }),

    createCourse: builder.mutation<ApiResponse<Course>, FormData | CreateCourseDto>({
      query: (data) => ({
        url: '/courses',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
    }),

    updateCourse: builder.mutation<ApiResponse<Course>, { id: string; data: FormData | UpdateCourseDto }>({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Courses', id },
        { type: 'Courses', id: 'LIST' },
      ],
    }),

    deleteCourse: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
    }),

    // Instructor Management
    getTeachers: builder.query<ApiResponse<Teacher[]>, void>({
      query: () => '/courses/teachers',
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(teacher => ({
          id: teacher.id,
          name: `${teacher.first_name || ''} ${teacher.last_name || ''}`.trim(),
          email: teacher.email,
          departmentId: teacher.department_id || teacher.department,
          qualification: teacher.qualification,
          specialization: teacher.specialization,
          yearsOfExperience: teacher.years_of_experience,
          phone: teacher.phone,
          office: teacher.office,
          bio: teacher.bio,
          rating: teacher.rating,
          image: teacher.avatar || teacher.image_url,
          education: Array.isArray(teacher.education) ? teacher.education : [],
          officeHours: teacher.office_hours,
          nextClass: teacher.next_class
        })) as Teacher[]
      }),
    }),

    assignInstructor: builder.mutation<ApiResponse<Course>, { courseId: string; instructorId: string }>({
      query: ({ courseId, instructorId }) => ({
        url: `/courses/${courseId}/assign-instructor`,
        method: 'PUT',
        body: { instructorId },
      }),
      invalidatesTags: (_result, _error, { courseId }) => [{ type: 'Courses', id: courseId }],
    }),

    // Resource Management
    addResource: builder.mutation<ApiResponse<CourseResource>, { courseId: string; data: FormData }>({
      query: ({ courseId, data }) => ({
        url: `/courses/${courseId}/resources`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { courseId }) => [{ type: 'Courses', id: courseId }],
    }),

    deleteResource: builder.mutation<ApiResponse<void>, string>({
      query: (resourceId) => ({
        url: `/courses/resources/${resourceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Courses'], // Invalidate all courses as we don't know which one this resource belonged to easily
    }),

    // Student & Enrollment Endpoints
    getAvailableCourses: builder.query<ApiResponse<Course[]>, void>({
      query: () => '/courses/my-available',
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(course => ({
          id: course.id,
          code: course.code,
          title: course.title,
          description: course.description,
          category: course.category,
          departmentId: course.department_id,
          classCohortId: course.class_cohort_id,
          instructorId: course.instructor_id,
          duration: course.duration,
          level: course.level,
          isPublished: course.is_published === 1,
          imageUrl: course.image_url,
          credits: course.credits,
          status: 'Active', // Default status for courses
          instructor: course.instructor ? {
            id: course.instructor.id,
            name: `${course.instructor.firstName} ${course.instructor.lastName}`,
            email: course.instructor.email
          } : undefined,
          createdAt: course.created_at,
          updatedAt: course.updated_at
        })) as Course[]
      }),
      providesTags: [{ type: 'Courses', id: 'AVAILABLE' }],
    }),

    getEnrolledCourses: builder.query<ApiResponse<Enrollment[]>, void>({
      query: () => '/courses/my-enrolled',
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map(item => ({
          id: item.enrollment_id,
          status: item.enrollment_status,
          progress: item.progress,
          enrolledAt: item.enrollment_date,
          courseId: item.id,
          studentId: '', // API doesn't return studentId here, using placeholder to satisfy type
          course: {
            id: item.id,
            code: item.code,
            title: item.title,
            description: item.description,
            category: item.category,
            departmentId: item.department_id,
            classCohortId: item.class_cohort_id,
            instructorId: item.instructor_id,
            duration: item.duration,
            level: item.level,
            isPublished: item.is_published === 1,
            imageUrl: item.image_url,
            credits: item.credits,
            status: 'Active',
            instructor: item.instructor ? {
              id: item.instructor.id,
              name: `${item.instructor.firstName} ${item.instructor.lastName}`,
              email: item.instructor.email
            } : undefined,
            createdAt: item.created_at,
            updatedAt: item.updated_at
          }
        })) as Enrollment[]
      }),
      providesTags: ['Courses'],
    }),

    enrollInCourse: builder.mutation<ApiResponse<Enrollment>, string>({
      query: (courseId) => ({
        url: '/courses/enroll',
        method: 'POST',
        body: { courseId },
      }),
      invalidatesTags: ['Courses'],
    }),

    updateCourseProgress: builder.mutation<ApiResponse<Enrollment>, { enrollmentId: string; progress: number }>({
      query: ({ enrollmentId, progress }) => ({
        url: `/courses/progress/${enrollmentId}`,
        method: 'PUT',
        body: { progress },
      }),
      invalidatesTags: ['Courses'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetTeachersQuery,
  useAssignInstructorMutation,
  useAddResourceMutation,
  useDeleteResourceMutation,
  useGetAvailableCoursesQuery,
  useGetEnrolledCoursesQuery,
  useEnrollInCourseMutation,
  useUpdateCourseProgressMutation,
} = coursesApi;
