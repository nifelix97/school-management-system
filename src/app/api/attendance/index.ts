import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

// --- Type Definitions ---

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  timetableId: string;
  attendanceDate: string; // YYYY-MM-DD
  sessionTime: string; // HH:mm-HH:mm
  status: AttendanceStatus;
  remarks?: string;
  markedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    registrationNumber?: string;
  };
}

export interface MarkAttendanceDto {
  studentId: string;
  courseId: string;
  timetableId: string;
  attendanceDate: string; // YYYY-MM-DD
  sessionTime: string; // HH:mm-HH:mm
  status: AttendanceStatus;
  remarks?: string;
}

export interface BulkAttendanceDto {
  courseId: string;
  timetableId: string;
  attendanceDate: string; // YYYY-MM-DD
  sessionTime: string; // HH:mm-HH:mm
  attendances: Array<{
    studentId: string;
    status: AttendanceStatus;
    remarks?: string;
  }>;
}

export interface UpdateAttendanceDto {
  status?: AttendanceStatus;
  remarks?: string;
}

export interface AttendanceFilters {
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  status?: AttendanceStatus;
  courseId?: string;
}

export interface AttendanceStats {
  studentId: string;
  courseId: string;
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendancePercentage: number;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    registrationNumber?: string;
  };
  course?: {
    id: string;
    code: string;
    title: string;
  };
}

export interface CourseAttendanceReport {
  courseId: string;
  courseName: string;
  courseCode: string;
  totalSessions: number;
  averageAttendance: number;
  students: Array<{
    studentId: string;
    studentName: string;
    registrationNumber?: string;
    totalClasses: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    attendancePercentage: number;
  }>;
}

// --- API Slice Injection ---

export const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mark single student attendance
    markAttendance: builder.mutation<ApiResponse<AttendanceRecord>, MarkAttendanceDto>({
      query: (data) => ({
        url: '/attendance',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Attendance', id: 'LIST' },
        { type: 'Attendance', id: `COURSE-${arg.courseId}` },
        { type: 'Attendance', id: `STUDENT-${arg.studentId}` },
      ],
    }),

    // Mark multiple students attendance (bulk)
    markBulkAttendance: builder.mutation<ApiResponse<AttendanceRecord[]>, BulkAttendanceDto>({
      query: (data) => ({
        url: '/attendance/bulk',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Attendance', id: 'LIST' },
        { type: 'Attendance', id: `COURSE-${arg.courseId}` },
      ],
    }),

    // Get attendance records for a course
    getCourseAttendance: builder.query<
      ApiResponse<AttendanceRecord[]>,
      { courseId: string; filters?: Omit<AttendanceFilters, 'courseId'> }
    >({
      query: ({ courseId, filters }) => ({
        url: `/attendance/course/${courseId}`,
        params: filters || {},
      }),
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map((record) => ({
          id: record.id,
          studentId: record.student_id || record.studentId,
          courseId: record.course_id || record.courseId,
          timetableId: record.timetable_id || record.timetableId,
          attendanceDate: record.attendance_date || record.attendanceDate,
          sessionTime: record.session_time || record.sessionTime,
          status: record.status,
          remarks: record.remarks,
          markedBy: record.marked_by || record.markedBy,
          createdAt: record.created_at || record.createdAt,
          updatedAt: record.updated_at || record.updatedAt,
          student: record.student
            ? {
                id: record.student.id,
                firstName: record.student.first_name || record.student.firstName,
                lastName: record.student.last_name || record.student.lastName,
                email: record.student.email,
                registrationNumber:
                  record.student.registration_number || record.student.registrationNumber,
              }
            : undefined,
        })) as AttendanceRecord[],
      }),
      providesTags: (_result, _error, { courseId }) => [
        { type: 'Attendance', id: `COURSE-${courseId}` },
        { type: 'Attendance', id: 'LIST' },
      ],
    }),

    // Get attendance records for a student
    getStudentAttendance: builder.query<
      ApiResponse<AttendanceRecord[]>,
      { studentId: string; filters?: Omit<AttendanceFilters, 'studentId'> }
    >({
      query: ({ studentId, filters }) => ({
        url: `/attendance/student/${studentId}`,
        params: filters || {},
      }),
      transformResponse: (response: ApiResponse<any[]>) => ({
        ...response,
        data: response.data?.map((record) => ({
          id: record.id,
          studentId: record.student_id || record.studentId,
          courseId: record.course_id || record.courseId,
          timetableId: record.timetable_id || record.timetableId,
          attendanceDate: record.attendance_date || record.attendanceDate,
          sessionTime: record.session_time || record.sessionTime,
          status: record.status,
          remarks: record.remarks,
          markedBy: record.marked_by || record.markedBy,
          createdAt: record.created_at || record.createdAt,
          updatedAt: record.updated_at || record.updatedAt,
        })) as AttendanceRecord[],
      }),
      providesTags: (_result, _error, { studentId }) => [
        { type: 'Attendance', id: `STUDENT-${studentId}` },
        { type: 'Attendance', id: 'LIST' },
      ],
    }),

    // Get attendance statistics for a student in a specific course
    getAttendanceStats: builder.query<
      ApiResponse<AttendanceStats>,
      { studentId: string; courseId: string }
    >({
      query: ({ studentId, courseId }) => `/attendance/stats/${studentId}/${courseId}`,
      transformResponse: (response: ApiResponse<any>) => ({
        ...response,
        data: {
          studentId: response.data.student_id || response.data.studentId,
          courseId: response.data.course_id || response.data.courseId,
          totalClasses: response.data.total_classes || response.data.totalClasses || 0,
          present: response.data.present || 0,
          absent: response.data.absent || 0,
          late: response.data.late || 0,
          excused: response.data.excused || 0,
          attendancePercentage:
            response.data.attendance_percentage || response.data.attendancePercentage || 0,
          student: response.data.student
            ? {
                id: response.data.student.id,
                firstName: response.data.student.first_name || response.data.student.firstName,
                lastName: response.data.student.last_name || response.data.student.lastName,
                email: response.data.student.email,
                registrationNumber:
                  response.data.student.registration_number ||
                  response.data.student.registrationNumber,
              }
            : undefined,
          course: response.data.course
            ? {
                id: response.data.course.id,
                code: response.data.course.code,
                title: response.data.course.title,
              }
            : undefined,
        } as AttendanceStats,
      }),
      providesTags: (_result, _error, { studentId, courseId }) => [
        { type: 'Attendance', id: `STATS-${studentId}-${courseId}` },
      ],
    }),

    // Get attendance report for a course
    getCourseAttendanceReport: builder.query<
      ApiResponse<CourseAttendanceReport>,
      { courseId: string; filters?: Pick<AttendanceFilters, 'startDate' | 'endDate'> }
    >({
      query: ({ courseId, filters }) => ({
        url: `/attendance/report/${courseId}`,
        params: filters || {},
      }),
      transformResponse: (response: ApiResponse<any>) => ({
        ...response,
        data: {
          courseId: response.data.course_id || response.data.courseId,
          courseName: response.data.course_name || response.data.courseName,
          courseCode: response.data.course_code || response.data.courseCode,
          totalSessions: response.data.total_sessions || response.data.totalSessions || 0,
          averageAttendance:
            response.data.average_attendance || response.data.averageAttendance || 0,
          students: (response.data.students || []).map((student: any) => ({
            studentId: student.student_id || student.studentId,
            studentName: student.student_name || student.studentName,
            registrationNumber: student.registration_number || student.registrationNumber,
            totalClasses: student.total_classes || student.totalClasses || 0,
            present: student.present || 0,
            absent: student.absent || 0,
            late: student.late || 0,
            excused: student.excused || 0,
            attendancePercentage: student.attendance_percentage || student.attendancePercentage || 0,
          })),
        } as CourseAttendanceReport,
      }),
      providesTags: (_result, _error, { courseId }) => [
        { type: 'Attendance', id: `REPORT-${courseId}` },
      ],
    }),

    // Update attendance record
    updateAttendance: builder.mutation<
      ApiResponse<AttendanceRecord>,
      { id: string; data: UpdateAttendanceDto }
    >({
      query: ({ id, data }) => ({
        url: `/attendance/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Attendance', id },
        { type: 'Attendance', id: 'LIST' },
      ],
    }),

    // Delete attendance record
    deleteAttendance: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/attendance/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Attendance', id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useMarkAttendanceMutation,
  useMarkBulkAttendanceMutation,
  useGetCourseAttendanceQuery,
  useGetStudentAttendanceQuery,
  useGetAttendanceStatsQuery,
  useGetCourseAttendanceReportQuery,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceApi;
