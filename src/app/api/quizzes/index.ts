import type {
    AddQuestionDto,
    CreateQuizDto,
    Quiz,
    QuizAttempt,
    QuizQuestion,
    QuizResults,
    SubmitAnswerDto,
} from '../../../types/quiz';
import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

// Re-export types for convenience
export type {
    AddQuestionDto, CreateQuizDto, Quiz, QuizAttempt, QuizQuestion, QuizResults, SubmitAnswerDto
};

// --- API Slice Injection ---

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create quiz for a lesson
    createQuiz: builder.mutation<
      ApiResponse<Quiz>,
      { lessonId: string; data: CreateQuizDto }
    >({
      query: ({ lessonId, data }) => ({
        url: `/quizzes/lessons/${lessonId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Quizzes', id: 'LIST' }],
    }),

    // Add question to quiz
    addQuestion: builder.mutation<
      ApiResponse<QuizQuestion>,
      { quizId: string; data: AddQuestionDto }
    >({
      query: ({ quizId, data }) => ({
        url: `/quizzes/${quizId}/questions`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { quizId }) => [
        { type: 'Quizzes', id: quizId },
      ],
    }),

    // Get quiz with questions
    getQuiz: builder.query<ApiResponse<Quiz>, string>({
      query: (quizId) => `/quizzes/${quizId}`,
      providesTags: (_result, _error, id) => [{ type: 'Quizzes', id }],
    }),

    // Start quiz attempt
    startQuizAttempt: builder.mutation<ApiResponse<QuizAttempt>, string>({
      query: (quizId) => ({
        url: `/quizzes/${quizId}/start`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, quizId) => [
        { type: 'Quizzes', id: quizId },
        { type: 'Quizzes', id: 'ATTEMPTS' },
      ],
    }),

    // Submit answer for a question
    submitAnswer: builder.mutation<
      ApiResponse<void>,
      { attemptId: string; data: SubmitAnswerDto }
    >({
      query: ({ attemptId, data }) => ({
        url: `/quizzes/attempts/${attemptId}/answer`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { attemptId }) => [
        { type: 'Quizzes', id: attemptId },
      ],
    }),

    // Complete attempt and get score
    completeAttempt: builder.mutation<ApiResponse<QuizResults>, string>({
      query: (attemptId) => ({
        url: `/quizzes/attempts/${attemptId}/complete`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, attemptId) => [
        { type: 'Quizzes', id: attemptId },
        { type: 'Quizzes', id: 'ATTEMPTS' },
        { type: 'Quizzes', id: 'RESULTS' },
      ],
    }),

    // Get quiz results
    getQuizResults: builder.query<ApiResponse<QuizResults>, string>({
      query: (attemptId) => `/quizzes/attempts/${attemptId}/results`,
      providesTags: (_result, _error, id) => [
        { type: 'Quizzes', id },
        { type: 'Quizzes', id: 'RESULTS' },
      ],
    }),

    // Get all quizzes for a course
    getCourseQuizzes: builder.query<ApiResponse<Quiz[]>, string>({
      query: (courseId) => `/quizzes/courses/${courseId}`,
      providesTags: (result, _error, courseId) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Quizzes' as const, id })),
              { type: 'Quizzes', id: courseId },
              { type: 'Quizzes', id: 'LIST' },
            ]
          : [
              { type: 'Quizzes', id: courseId },
              { type: 'Quizzes', id: 'LIST' },
            ],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useAddQuestionMutation,
  useGetQuizQuery,
  useStartQuizAttemptMutation,
  useSubmitAnswerMutation,
  useCompleteAttemptMutation,
  useGetQuizResultsQuery,
  useGetCourseQuizzesQuery,
} = quizzesApi;
