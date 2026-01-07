// Discussion API Type Definitions

// --- Core Interfaces ---

export interface Discussion {
  id: string;
  courseId: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  replyCount?: number;
  createdAt: string;
  updatedAt?: string;
  replies?: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  discussionId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

// --- DTOs (Data Transfer Objects) ---

export interface CreateDiscussionDto {
  title: string;
  content: string;
}

export interface CreateReplyDto {
  content: string;
}
