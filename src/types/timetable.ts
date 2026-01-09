export interface TimetableEntry {
  id: string;
  courseId: string;
  courseCode?: string;
  courseName?: string;
  instructorId: string;
  instructorName?: string;
  departmentId: string;
  departmentName?: string;
  classCohortId: string;
  academicYear: string;
  semester: 'First' | 'Second' | 'Summer';
  level?: string;
  dayOfWeek: number; // 1=Monday to 7=Sunday
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  room?: string;
  building?: string;
  type?: string; // e.g., "Lecture", "Lab"
  isRecurring: boolean;
  effectiveFrom?: string;
  effectiveTo?: string;
  notes?: string;
  status: 'active' | 'pending' | 'conflict';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTimetableEntryDto {
  courseId: string;
  instructorId: string;
  departmentId: string;
  classCohortId: string;
  academicYear: string;
  semester: 'First' | 'Second' | 'Summer';
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room?: string;
  building?: string;
  type?: string;
  isRecurring: boolean;
  effectiveFrom?: string;
  effectiveTo?: string;
  notes?: string;
}

export interface UpdateTimetableEntryDto extends Partial<CreateTimetableEntryDto> {
  status?: 'active' | 'pending' | 'conflict';
}

export interface TimetableFilters {
  academicYear: string;
  semester: 'First' | 'Second' | 'Summer';
}

export interface ExamEntry {
  id: string;
  courseId: string;
  courseName: string;
  examDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  isOnline: boolean;
  invigilatorId?: string;
  invigilatorName?: string;
  semester: string;
  level: string;
  status: 'scheduled' | 'pending' | 'approved' | 'rejected';
}

export interface Instructor {
  id: string;
  name: string;
  email?: string;
  department?: string;
  courses?: string[];
}

export interface ConflictInfo {
  type: 'time_overlap' | 'instructor_conflict' | 'room_conflict' | 'student_conflict';
  message: string;
  affectedEntries: string[];
}