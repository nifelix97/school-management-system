export interface ExamMonitoring {
  id: string;
  title: string;
  course: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  totalStudents: number;
  loggedInStudents: number;
  submittedStudents: number;
  teacher: string;
  teacherId: string;
  invigilators: string[];
  type: 'online' | 'offline';
}

export interface StudentParticipation {
  id: string;
  name: string;
  rollNumber: string;
  status: 'joined' | 'not-joined' | 'disconnected' | 'submitted';
  loginTime?: string;
  submitTime?: string;
  lastActivity?: string;
  ipAddress?: string;
  flagged: boolean;
}

export interface IntegrityAlert {
  id: string;
  studentId: string;
  studentName: string;
  type: 'tab-switch' | 'multiple-login' | 'ip-change' | 'suspicious-activity';
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface ExamAnalytics {
  examId: string;
  attendance: number;
  submissionRate: number;
  averageScore?: number;
  flaggedStudents: number;
  completionTime: number;
}