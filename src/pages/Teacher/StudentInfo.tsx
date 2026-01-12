import {
  Award,
  BookOpen,
  Calendar,
  ChevronLeft,
  Mail,
  Phone,
  Search,
  TrendingUp,
  User,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { useGetAttendanceStatsQuery } from "../../app/api/attendance";
import { useGetEnrolledStudentsQuery, useGetMyAssignedCoursesQuery } from "../../app/api/courses";
import type { EnrolledStudent } from "../../types/course";

interface StudentWithAttendance extends EnrolledStudent {
  attendancePercentage?: number;
}

export default function StudentInfo() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentWithAttendance | null>(null);

  // Fetch teacher's assigned courses
  const { data: coursesResponse, isLoading: coursesLoading, error: coursesError } = useGetMyAssignedCoursesQuery();
  const courses = coursesResponse?.data || [];

  // Set initial course selection
  if (!selectedCourseId && courses.length > 0) {
    setSelectedCourseId(courses[0].id);
  }

  // Fetch enrolled students for the selected course
  const { data: studentsResponse, isLoading: studentsLoading, error: studentsError } = useGetEnrolledStudentsQuery(
    selectedCourseId,
    { skip: !selectedCourseId }
  );
  const students = studentsResponse?.data || [];

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
      const query = searchQuery.toLowerCase();
      return fullName.includes(query) || student.email.toLowerCase().includes(query);
    });
  }, [students, searchQuery]);

  // Loading and error states
  if (coursesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-50 mx-auto mb-4"></div>
          <p className="text-primary-50">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (coursesError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold mb-2">Error loading courses</p>
          <p className="text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-primary-50">
          <p className="text-lg font-semibold mb-2">No courses assigned</p>
          <p className="text-sm">You don't have any courses assigned yet</p>
        </div>
      </div>
    );
  }

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-2 xxs:px-3 xs:px-4 sm:px-6 md:px-8 py-2 xxs:py-3 xs:py-4 sm:py-6 md:py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 mb-3 xxs:mb-4 xs:mb-5 sm:mb-6 transition-colors"
          style={{ color: "var(--color-primary-50)" }}
        >
          <ChevronLeft className="w-4 h-4 xxs:w-5 xxs:h-5" />
          <span className="text-xs xxs:text-sm sm:text-base font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xxs:gap-3 mb-3 xxs:mb-4 xs:mb-5 sm:mb-6">
          <h1 className="text-lg xxs:text-xl xs:text-2xl sm:text-3xl font-bold text-primary-50">
            👥 Student Information
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg xxs:rounded-xl shadow-sm p-2 xxs:p-3 sm:p-6 mb-3 xxs:mb-4 xs:mb-5 sm:mb-6 max-w-sm xxs:max-w-md sm:max-w-none mx-auto sm:mx-0">
          <div className="grid grid-cols-2 gap-1.5 xxs:gap-2 sm:gap-4">
            <div>
              <label className="block text-xs font-medium text-primary-50 mb-1 sm:mb-2">
                Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-1.5 xxs:px-2 py-1 xxs:py-1.5 sm:px-3 sm:py-2.5 border border-primary-50 text-primary-50 rounded text-xs sm:text-sm"
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-primary-50 mb-1 sm:mb-2">
                Search
              </label>
              <div className="relative">
                <Search
                  className="absolute left-1.5 xxs:left-2 sm:left-3 top-1/2 -translate-y-1/2 text-primary-50"
                  size={12}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full pl-5 xxs:pl-6 pr-1.5 xxs:pr-2 py-1 xxs:py-1.5 sm:pl-10 sm:pr-4 sm:py-2.5 border border-primary-50 text-primary-50 rounded text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-lg xxs:rounded-xl shadow-lg overflow-hidden">
          {studentsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-50 mx-auto mb-2"></div>
              <p className="text-primary-50 text-sm">Loading students...</p>
            </div>
          ) : studentsError ? (
            <div className="text-center py-12 text-red-600">
              <p className="text-sm">Error loading students</p>
            </div>
          ) : (
            <>
              <table className="w-full table-fixed">
                <thead
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-primary-50), var(--color-primary-50))",
                  }}
                >
                  <tr>
                    <th className="w-2/5 px-2 py-2 text-left text-xs font-bold text-white">
                      Student
                    </th>
                    <th className="w-1/6 px-1 py-2 text-left text-xs font-bold text-white">
                      Email
                    </th>
                    <th className="w-1/6 px-1 py-2 text-center text-xs font-bold text-white">
                      Attendance
                    </th>
                    <th className="w-1/6 px-1 py-2 text-center text-xs font-bold text-white">
                      Progress
                    </th>
                    <th className="w-1/6 px-1 py-2 text-center text-xs font-bold text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => {
                    const fullName = `${student.first_name} ${student.last_name}`;
                    const initials = `${student.first_name[0]}${student.last_name[0]}`;
                    
                    return (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-2 py-2">
                          <div className="flex items-center gap-2">
                            {student.avatar ? (
                              <img
                                src={student.avatar}
                                alt={fullName}
                                className="w-8 h-8 rounded-full flex-shrink-0"
                              />
                            ) : (
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                style={{ backgroundColor: "var(--color-primary-50)" }}
                              >
                                {initials}
                              </div>
                            )}
                            <span className="text-xs font-medium text-primary-50 truncate">
                              {fullName}
                            </span>
                          </div>
                        </td>
                        <td className="px-1 py-2 text-xs text-primary-50 truncate">
                          {student.email}
                        </td>
                        <td className="px-1 py-2 text-center">
                          <StudentAttendanceBadge studentId={student.id} courseId={selectedCourseId} />
                        </td>
                        <td className="px-1 py-2 text-center">
                          <span
                            className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: "var(--color-primary-100)",
                              color: "var(--color-primary-50)",
                            }}
                          >
                            {student.progress}%
                          </span>
                        </td>
                        <td className="px-1 py-2 text-center">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="px-2 py-1 rounded text-xs font-medium text-white transition-colors hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: "var(--color-primary-50)" }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredStudents.length === 0 && (
                <div className="text-center py-6 xxs:py-8 sm:py-12">
                  <p className="text-primary-50 text-xs xxs:text-sm">No students found</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          courseId={selectedCourseId}
          courseName={selectedCourse?.title || ''}
          onClose={() => setSelectedStudent(null)}
        />
      )}

    </div>
  );
}

// Component to fetch and display attendance badge
function StudentAttendanceBadge({ studentId, courseId }: { studentId: string; courseId: string }) {
  const { data: statsResponse, isLoading } = useGetAttendanceStatsQuery(
    { studentId, courseId },
    { skip: !studentId || !courseId }
  );

  if (isLoading) {
    return (
      <span className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500">
        ...
      </span>
    );
  }

  const percentage = Number(statsResponse?.data?.attendancePercentage) || 0;
  const bgColor = percentage >= 75 ? 'bg-green-100 text-green-700' : percentage >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';

  return (
    <span className={`inline-flex items-center px-1 py-0.5 rounded-full text-xs font-bold ${bgColor}`}>
      {percentage.toFixed(0)}%
    </span>
  );
}

// Student Detail Modal Component
function StudentDetailModal({
  student,
  courseId,
  courseName,
  onClose,
}: {
  student: StudentWithAttendance;
  courseId: string;
  courseName: string;
  onClose: () => void;
}) {
  const fullName = `${student.first_name} ${student.last_name}`;
  const initials = `${student.first_name[0]}${student.last_name[0]}`;

  // Fetch attendance stats
  const { data: statsResponse, isLoading: statsLoading } = useGetAttendanceStatsQuery(
    { studentId: student.id, courseId },
    { skip: !student.id || !courseId }
  );

  const stats = statsResponse?.data;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div
          className="sticky top-0 p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between z-10"
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary-50), var(--color-primary-50))",
          }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={fullName}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-white"
              />
            ) : (
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center text-base sm:text-xl font-bold"
                style={{ color: "var(--color-primary-50)" }}
              >
                {initials}
              </div>
            )}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {fullName}
              </h2>
              <p className="text-xs sm:text-sm text-white opacity-90">
                {student.email}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors active:scale-95"
          >
            <X size={22} className="text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Course Info */}
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="text-blue-600" size={18} />
              <p className="text-xs sm:text-sm text-primary-50 font-semibold">
                Course
              </p>
            </div>
            <p className="text-base sm:text-lg font-bold text-blue-600">
              {courseName}
            </p>
          </div>

          {/* Stats */}
          {statsLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-50 mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="text-green-600" size={18} />
                  <p className="text-xs sm:text-sm text-primary-50">
                    Attendance
                  </p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  {Number(stats?.attendancePercentage || 0).toFixed(0)}%
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {stats?.present || 0} / {stats?.totalClasses || 0} classes
                </p>
              </div>

              <div
                className="p-4 rounded-lg border-l-4"
                style={{
                  backgroundColor: "var(--color-primary-100)",
                  borderColor: "var(--color-primary-50)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Award
                    size={18}
                    style={{ color: "var(--color-primary-50)" }}
                  />
                  <p className="text-xs sm:text-sm text-primary-50">Progress</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-primary-50">
                  {student.progress}%
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {student.completed_lessons} / {student.total_lessons} lessons
                </p>
              </div>
            </div>
          )}

          {/* Attendance Breakdown */}
          {stats && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm sm:text-base font-bold text-primary-50 mb-3">
                Attendance Breakdown
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                  <p className="text-xs text-gray-600">Present</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                  <p className="text-xs text-gray-600">Absent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
                  <p className="text-xs text-gray-600">Late</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{stats.excused}</p>
                  <p className="text-xs text-gray-600">Excused</p>
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm sm:text-base font-bold text-primary-50 mb-3 flex items-center gap-2">
              <User size={18} />
              Personal Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail
                  size={16}
                  className="text-primary-50 mt-0.5 flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs text-primary-50">Email</p>
                  <p className="text-sm font-medium text-primary-50 break-words">
                    {student.email}
                  </p>
                </div>
              </div>
              {student.phone && (
                <div className="flex items-start gap-3">
                  <Phone
                    size={16}
                    className="text-primary-50 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs text-primary-50">Phone</p>
                    <p className="text-sm font-medium text-primary-50">
                      {student.phone}
                    </p>
                  </div>
                </div>
              )}
              {student.department && (
                <div className="flex items-start gap-3">
                  <BookOpen
                    size={16}
                    className="text-primary-50 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs text-primary-50">Department</p>
                    <p className="text-sm font-medium text-primary-50">
                      {student.department}
                    </p>
                  </div>
                </div>
              )}
              {student.year_level && (
                <div className="flex items-start gap-3">
                  <Calendar
                    size={16}
                    className="text-primary-50 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs text-primary-50">Year Level</p>
                    <p className="text-sm font-medium text-primary-50">
                      {student.year_level}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enrollment Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm sm:text-base font-bold text-primary-50 mb-3">
              Enrollment Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-primary-50">Enrollment Date</p>
                <p className="text-sm font-medium text-primary-50">
                  {new Date(student.enrollment_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-primary-50">Status</p>
                <p className="text-sm font-medium text-primary-50 capitalize">
                  {student.enrollment_status}
                </p>
              </div>
              {student.last_accessed_at && (
                <div>
                  <p className="text-xs text-primary-50">Last Accessed</p>
                  <p className="text-sm font-medium text-primary-50">
                    {new Date(student.last_accessed_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
