// Assignment API Type Definitions

// --- Core Interfaces ---

export interface Assignment {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  submissionType: 'file' | 'text' | 'both';
  createdAt?: string;
  updatedAt?: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionText?: string;
  fileUrl?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
}

// --- DTOs (Data Transfer Objects) ---

export interface CreateAssignmentDto {
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  submissionType: 'file' | 'text' | 'both';
}

export interface SubmitAssignmentDto {
  submissionText?: string;
  file?: File;
}

export interface GradeSubmissionDto {
  grade: number;
  feedback?: string;
}
