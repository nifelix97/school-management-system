import type {
    Announcement,
    CompleteLessonDto,
    CourseProgress,
    CourseStructure,
    CreateAnnouncementDto,
    CreateLessonDto,
    CreateModuleDto,
    Lesson,
    LessonProgress,
    Module,
    UpdateLessonDto,
    UpdateModuleDto,
} from '../../../types/learning';
import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

// Re-export types for convenience
export type {
    Announcement, CompleteLessonDto, CourseProgress, CourseStructure, CreateAnnouncementDto, CreateLessonDto, CreateModuleDto, Lesson,
    LessonProgress, Module, UpdateLessonDto, UpdateModuleDto
};

// --- API Slice Injection ---

export const learningApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Module Management
    createModule: builder.mutation<
      ApiResponse<Module>,
      { courseId: string; data: CreateModuleDto }
    >({
      query: ({ courseId, data }) => ({
        url: `/learning/courses/${courseId}/modules`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { courseId }) => [
        { type: 'Learning', id: courseId },
        { type: 'Learning', id: 'MODULES' },
      ],
    }),

    getCourseModules: builder.query<ApiResponse<Module[]>, string>({
      query: (courseId) => `/learning/courses/${courseId}/modules`,
      providesTags: (result, _error, courseId) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Learning' as const, id })),
              { type: 'Learning', id: courseId },
              { type: 'Learning', id: 'MODULES' },
            ]
          : [
              { type: 'Learning', id: courseId },
              { type: 'Learning', id: 'MODULES' },
            ],
    }),

    updateModule: builder.mutation<
      ApiResponse<Module>,
      { moduleId: string; data: UpdateModuleDto }
    >({
      query: ({ moduleId, data }) => ({
        url: `/learning/modules/${moduleId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { moduleId }) => [
        { type: 'Learning', id: moduleId },
        { type: 'Learning', id: 'MODULES' },
      ],
    }),

    deleteModule: builder.mutation<ApiResponse<void>, string>({
      query: (moduleId) => ({
        url: `/learning/modules/${moduleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Learning', id: 'MODULES' }],
    }),

    // Lesson Management
    createLesson: builder.mutation<
      ApiResponse<Lesson>,
      { moduleId: string; data: CreateLessonDto }
    >({
      query: ({ moduleId, data }) => ({
        url: `/learning/modules/${moduleId}/lessons`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { moduleId }) => [
        { type: 'Learning', id: moduleId },
        { type: 'Learning', id: 'LESSONS' },
      ],
    }),

    getModuleLessons: builder.query<ApiResponse<Lesson[]>, string>({
      query: (moduleId) => `/learning/modules/${moduleId}/lessons`,
      providesTags: (result, _error, moduleId) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Learning' as const, id })),
              { type: 'Learning', id: moduleId },
              { type: 'Learning', id: 'LESSONS' },
            ]
          : [
              { type: 'Learning', id: moduleId },
              { type: 'Learning', id: 'LESSONS' },
            ],
    }),

    getLesson: builder.query<ApiResponse<Lesson>, string>({
      query: (lessonId) => `/learning/lessons/${lessonId}`,
      providesTags: (_result, _error, id) => [{ type: 'Learning', id }],
    }),

    updateLesson: builder.mutation<
      ApiResponse<Lesson>,
      { lessonId: string; data: UpdateLessonDto }
    >({
      query: ({ lessonId, data }) => ({
        url: `/learning/lessons/${lessonId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { lessonId }) => [
        { type: 'Learning', id: lessonId },
        { type: 'Learning', id: 'LESSONS' },
      ],
    }),

    deleteLesson: builder.mutation<ApiResponse<void>, string>({
      query: (lessonId) => ({
        url: `/learning/lessons/${lessonId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Learning', id: 'LESSONS' }],
    }),

    // Lesson Progress
    completeLesson: builder.mutation<
      ApiResponse<LessonProgress>,
      { lessonId: string; data: CompleteLessonDto }
    >({
      query: ({ lessonId, data }) => ({
        url: `/learning/lessons/${lessonId}/complete`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { lessonId }) => [
        { type: 'Learning', id: lessonId },
        { type: 'Learning', id: 'PROGRESS' },
      ],
    }),

    // Announcements
    createAnnouncement: builder.mutation<
      ApiResponse<Announcement>,
      { courseId: string; data: CreateAnnouncementDto }
    >({
      query: ({ courseId, data }) => ({
        url: `/learning/courses/${courseId}/announcements`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { courseId }) => [
        { type: 'Learning', id: `${courseId}-announcements` },
      ],
    }),

    getCourseAnnouncements: builder.query<ApiResponse<Announcement[]>, string>({
      query: (courseId) => `/learning/courses/${courseId}/announcements`,
      providesTags: (_result, _error, courseId) => [
        { type: 'Learning', id: `${courseId}-announcements` },
      ],
    }),

    // Course Progress
    getCourseProgress: builder.query<ApiResponse<CourseProgress>, string>({
      query: (courseId) => `/learning/courses/${courseId}/progress`,
      providesTags: (_result, _error, courseId) => [
        { type: 'Learning', id: `${courseId}-progress` },
        { type: 'Learning', id: 'PROGRESS' },
      ],
    }),

    // Course Structure
    getCourseStructure: builder.query<ApiResponse<CourseStructure>, string>({
      query: (courseId) => `/learning/courses/${courseId}/structure`,
      providesTags: (_result, _error, courseId) => [
        { type: 'Learning', id: courseId },
        { type: 'Learning', id: 'STRUCTURE' },
      ],
    }),
  }),
});

export const {
  useCreateModuleMutation,
  useGetCourseModulesQuery,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  useCreateLessonMutation,
  useGetModuleLessonsQuery,
  useGetLessonQuery,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useCompleteLessonMutation,
  useCreateAnnouncementMutation,
  useGetCourseAnnouncementsQuery,
  useGetCourseProgressQuery,
  useGetCourseStructureQuery,
} = learningApi;
