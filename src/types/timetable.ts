export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  courseId?: string;
  instructorId?: string;
  classroom?: string;
  virtualLink?: string;
}

export interface TimetableEntry {
  id: string;
  courseId: string;
  courseName: string;
  instructorId: string;
  instructorName: string;
  day: string;
  startTime: string;
  endTime: string;
  classroom?: string;
  virtualLink?: string;
  semester: string;
  level: string;
  status: 'active' | 'pending' | 'conflict';
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
  email: string;
  department: string;
  courses: string[];
}

export interface ConflictInfo {
  type: 'time_overlap' | 'instructor_conflict' | 'room_conflict' | 'student_conflict';
  message: string;
  affectedEntries: string[];
}