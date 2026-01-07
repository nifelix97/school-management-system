import type {
    Assignment,
    AssignmentSubmission,
    CreateAssignmentDto,
    GradeSubmissionDto,
    SubmitAssignmentDto,
} from '../../../types/assignment';
import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

// Re-export types for convenience
export type {
    Assignment,
    AssignmentSubmission,
    CreateAssignmentDto, GradeSubmissionDto, SubmitAssignmentDto
};

// --- API Slice Injection ---

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create assignment for a lesson
    createAssignment: builder.mutation<
      ApiResponse<Assignment>,
      { lessonId: string; data: CreateAssignmentDto }
    >({
      query: ({ lessonId, data }) => ({
        url: `/assignments/lessons/${lessonId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Assignments', id: 'LIST' }],
    }),

    // Get assignment details
    getAssignment: builder.query<ApiResponse<Assignment>, string>({
      query: (assignmentId) => `/assignments/${assignmentId}`,
      providesTags: (_result, _error, id) => [{ type: 'Assignments', id }],
    }),

    // Submit assignment
    submitAssignment: builder.mutation<
      ApiResponse<AssignmentSubmission>,
      { assignmentId: string; data: SubmitAssignmentDto }
    >({
      query: ({ assignmentId, data }) => ({
        url: `/assignments/${assignmentId}/submit`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { assignmentId }) => [
        { type: 'Assignments', id: assignmentId },
        { type: 'Assignments', id: 'SUBMISSIONS' },
      ],
    }),

    // Grade assignment submission
    gradeSubmission: builder.mutation<
      ApiResponse<AssignmentSubmission>,
      { submissionId: string; data: GradeSubmissionDto }
    >({
      query: ({ submissionId, data }) => ({
        url: `/assignments/submissions/${submissionId}/grade`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Assignments', id: 'SUBMISSIONS' }],
    }),

    // Get student's submission for an assignment
    getStudentSubmission: builder.query<ApiResponse<AssignmentSubmission>, string>({
      query: (assignmentId) => `/assignments/${assignmentId}/submission`,
      providesTags: (_result, _error, id) => [
        { type: 'Assignments', id },
        { type: 'Assignments', id: 'SUBMISSIONS' },
      ],
    }),

    // Get all submissions for an assignment (instructor view)
    getAllSubmissions: builder.query<ApiResponse<AssignmentSubmission[]>, string>({
      query: (assignmentId) => `/assignments/${assignmentId}/submissions`,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Assignments' as const, id })),
              { type: 'Assignments', id: 'SUBMISSIONS' },
            ]
          : [{ type: 'Assignments', id: 'SUBMISSIONS' }],
    }),

    // Get all assignments for a course
    getCourseAssignments: builder.query<ApiResponse<Assignment[]>, string>({
      query: (courseId) => `/assignments/courses/${courseId}`,
      providesTags: (result, _error, courseId) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Assignments' as const, id })),
              { type: 'Assignments', id: courseId },
              { type: 'Assignments', id: 'LIST' },
            ]
          : [
              { type: 'Assignments', id: courseId },
              { type: 'Assignments', id: 'LIST' },
            ],
    }),
  }),
});

export const {
  useCreateAssignmentMutation,
  useGetAssignmentQuery,
  useSubmitAssignmentMutation,
  useGradeSubmissionMutation,
  useGetStudentSubmissionQuery,
  useGetAllSubmissionsQuery,
  useGetCourseAssignmentsQuery,
} = assignmentsApi;
