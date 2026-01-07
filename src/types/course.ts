// Course API Type Definitions

// --- Enums and Literal Types ---

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Undergraduate' | 'Graduate';
export type CourseStatus = 'Pending' | 'Approved' | 'Rejected' | 'Needs Revision' | 'Active' | 'Inactive' | 'Archived';
export type EnrollmentStatus = 'enrolled' | 'completed' | 'dropped';

// --- Core Interfaces ---

export interface CourseResource {
  id: string;
  courseId?: string;
  name: string;
  type: string;
  size?: string;
  fileUrl?: string;
  url?: string;
  uploadDate?: string;
  createdAt?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  departmentId?: string;
  qualification?: string;
  specialization?: string;
  yearsOfExperience?: string;
  phone?: string;
  office?: string;
  bio?: string;
  rating?: number;
  image?: string;
  education?: string[];
  officeHours?: string;
  nextClass?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  name?: string; // Some parts of the UI might use 'name' instead of 'title'
  description: string;
  category: string;
  departmentId: string;
  classCohortId: string;
  instructorId: string;
  instructor?: Teacher;
  level: CourseLevel;
  credits: number;
  duration?: string;
  imageUrl?: string;
  isPublished: boolean;
  status: CourseStatus;
  resources?: CourseResource[];
  enrolledStudents?: number;
  maxCapacity?: number;
  passRate?: number;
  syllabus?: string;
  units?: number;
  semester?: string;
  lastActivity?: string;
  issues?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  status: EnrollmentStatus;
  progress: number;
  enrolledAt: string;
  completedAt?: string;
  course?: Course;
}

// --- DTOs (Data Transfer Objects) ---

export interface CourseFilters {
  departmentId?: string;
  category?: string;
  level?: CourseLevel;
  isPublished?: boolean;
}

export interface CreateCourseDto {
  code: string;
  title: string;
  description: string;
  category: string;
  departmentId: string;
  classCohortId: string;
  instructorId: string;
  level: CourseLevel;
  credits: number;
  duration?: string;
  image?: File;
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {
  isPublished?: boolean;
  status?: CourseStatus;
}

export interface AssignInstructorDto {
  instructorId: string;
}

export interface EnrollCourseDto {
  courseId: string;
}

export interface UpdateProgressDto {
  progress: number;
}

export interface AddResourceDto {
  name: string;
  type: string;
  file: File;
}
