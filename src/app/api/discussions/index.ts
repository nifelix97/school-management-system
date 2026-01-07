import type {
    CreateDiscussionDto,
    CreateReplyDto,
    Discussion,
    DiscussionReply,
} from '../../../types/discussion';
import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

// Re-export types for convenience
export type {
    CreateDiscussionDto,
    CreateReplyDto, Discussion,
    DiscussionReply
};

// --- API Slice Injection ---

export const discussionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a discussion topic
    createDiscussion: builder.mutation<
      ApiResponse<Discussion>,
      { courseId: string; data: CreateDiscussionDto }
    >({
      query: ({ courseId, data }) => ({
        url: `/discussions/courses/${courseId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { courseId }) => [
        { type: 'Discussions', id: courseId },
        { type: 'Discussions', id: 'LIST' },
      ],
    }),

    // Get all discussions for a course
    getCourseDiscussions: builder.query<ApiResponse<Discussion[]>, string>({
      query: (courseId) => `/discussions/courses/${courseId}`,
      providesTags: (result, _error, courseId) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Discussions' as const, id })),
              { type: 'Discussions', id: courseId },
              { type: 'Discussions', id: 'LIST' },
            ]
          : [
              { type: 'Discussions', id: courseId },
              { type: 'Discussions', id: 'LIST' },
            ],
    }),

    // Get discussion with all replies
    getDiscussion: builder.query<ApiResponse<Discussion>, string>({
      query: (discussionId) => `/discussions/${discussionId}`,
      providesTags: (_result, _error, id) => [{ type: 'Discussions', id }],
    }),

    // Reply to a discussion
    replyToDiscussion: builder.mutation<
      ApiResponse<DiscussionReply>,
      { discussionId: string; data: CreateReplyDto }
    >({
      query: ({ discussionId, data }) => ({
        url: `/discussions/${discussionId}/reply`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { discussionId }) => [
        { type: 'Discussions', id: discussionId },
      ],
    }),
  }),
});

export const {
  useCreateDiscussionMutation,
  useGetCourseDiscussionsQuery,
  useGetDiscussionQuery,
  useReplyToDiscussionMutation,
} = discussionsApi;
