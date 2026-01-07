// Learning API Type Definitions

// --- Enums and Literal Types ---

export type LessonType = 'reading' | 'video' | 'interactive' | 'quiz';

// --- Core Interfaces ---

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderIndex: number;
  lessonCount?: number;
  createdAt?: string;
  updatedAt?: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  type: LessonType;
  duration?: number; // in minutes
  orderIndex: number;
  videoUrl?: string;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LessonProgress {
  id: string;
  lessonId: string;
  studentId: string;
  completed: boolean;
  timeSpent: number; // in seconds
  completedAt?: string;
}

export interface CourseProgress {
  courseId: string;
  studentId: string;
  totalModules: number;
  completedModules: number;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  lastAccessedAt?: string;
}

export interface Announcement {
  id: string;
  courseId: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CourseStructure {
  courseId: string;
  courseName: string;
  modules: Module[];
}

// --- DTOs (Data Transfer Objects) ---

export interface CreateModuleDto {
  title: string;
  description: string;
  orderIndex: number;
}

export interface UpdateModuleDto extends Partial<CreateModuleDto> {}

export interface CreateLessonDto {
  title: string;
  content: string;
  type: LessonType;
  duration?: number;
  orderIndex: number;
  videoUrl?: string;
}

export interface UpdateLessonDto extends Partial<CreateLessonDto> {}

export interface CompleteLessonDto {
  timeSpent: number; // in seconds
}

export interface CreateAnnouncementDto {
  title: string;
  content: string;
}
