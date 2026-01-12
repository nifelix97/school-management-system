import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  Download,
  Filter,
  Loader2,
  Save,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  useGetCourseAttendanceQuery,
  useMarkBulkAttendanceMutation,
  type AttendanceStatus
} from "../../app/api/attendance";
import { useGetEnrolledStudentsQuery, useGetMyAssignedCoursesQuery } from "../../app/api/courses";
import { useGetTeacherTimetableQuery } from "../../app/api/timetable";

interface Student {
  id: string;
  name: string;
  code: string;
  avatar?: string;
}

export default function ManageAttendance() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedTimetableId, setSelectedTimetableId] = useState<string>("");
  const [sessionTime, setSessionTime] = useState<string>("");
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  // Fetch teacher's assigned courses
  const { data: coursesData, isLoading: coursesLoading } = useGetMyAssignedCoursesQuery();
  
  // Fetch teacher's timetable to get session times
  const { data: timetableData } = useGetTeacherTimetableQuery({
    academicYear: new Date().getFullYear().toString(),
    semester: "First"
  });

  // Fetch enrolled students for selected course
  const { data: studentsData, isLoading: studentsLoading } = useGetEnrolledStudentsQuery(
    selectedCourseId,
    { skip: !selectedCourseId }
  );

  // Fetch existing attendance for selected date and course
  const { data: existingAttendanceData } = useGetCourseAttendanceQuery(
    {
      courseId: selectedCourseId,
      filters: {
        startDate: currentDate.toISOString().split('T')[0],
        endDate: currentDate.toISOString().split('T')[0],
      }
    },
    { skip: !selectedCourseId }
  );

  // Bulk attendance mutation
  const [markBulkAttendance, { isLoading: isSaving }] = useMarkBulkAttendanceMutation();

  const courses = coursesData?.data || [];
  const students: Student[] = (studentsData?.data || []).map(student => ({
    id: student.id,
    name: `${student.first_name || ''} ${student.last_name || ''}`.trim(),
    code: student.id,
    avatar: student.avatar
  }));

  // Auto-select first course when courses load
  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(courses[0].id);
    }
  }, [courses, selectedCourseId]);

  // Find matching timetable entry for selected course and date
  useEffect(() => {
    if (selectedCourseId && timetableData?.data) {
      // Convert JavaScript day (0=Sunday to 6=Saturday) to ISO day (1=Monday to 7=Sunday)
      const jsDay = currentDate.getDay(); // 0-6
      const dayOfWeek = jsDay === 0 ? 7 : jsDay; // Convert to 1-7 (1=Monday, 7=Sunday)
      
      const matchingEntry = timetableData.data.find(
        entry => entry.courseId === selectedCourseId && entry.dayOfWeek === dayOfWeek
      );
      
      if (matchingEntry) {
        setSelectedTimetableId(matchingEntry.id);
        setSessionTime(`${matchingEntry.startTime}-${matchingEntry.endTime}`);
      } else {
        // Default session time if no timetable entry found
        setSessionTime("08:00-10:00");
      }
    }
  }, [selectedCourseId, currentDate, timetableData]);

  // Load existing attendance records
  useEffect(() => {
    if (existingAttendanceData?.data) {
      const attendanceMap: Record<string, AttendanceStatus> = {};
      existingAttendanceData.data.forEach(record => {
        attendanceMap[record.studentId] = record.status;
      });
      setAttendance(attendanceMap);
    } else {
      // Clear attendance when changing date/course
      setAttendance({});
    }
  }, [existingAttendanceData]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = async () => {
    if (!selectedCourseId || students.length === 0) {
      alert("Please select a course with students");
      return;
    }

    try {
      const attendanceRecords = students.map(student => ({
        studentId: student.id,
        status: attendance[student.id] || 'absent' as AttendanceStatus,
        remarks: attendance[student.id] ? undefined : 'Not marked'
      }));

      await markBulkAttendance({
        courseId: selectedCourseId,
        timetableId: selectedTimetableId || selectedCourseId,
        attendanceDate: currentDate.toISOString().split('T')[0],
        sessionTime: sessionTime,
        attendances: attendanceRecords
      }).unwrap();

      setShowSaveConfirm(false);
      alert("Attendance saved successfully!");
    } catch (error: any) {
      console.error("Failed to save attendance:", error);
      alert(`Failed to save attendance: ${error?.data?.message || 'Unknown error'}`);
    }
  };

  const getStats = () => {
    const total = students.length;
    const present = Object.values(attendance).filter(s => s === "present").length;
    const absent = Object.values(attendance).filter(s => s === "absent").length;
    const excused = Object.values(attendance).filter(s => s === "excused").length;
    const late = Object.values(attendance).filter(s => s === "late").length;
    const unmarked = total - present - absent - excused - late;
    return { total, present, absent, excused, late, unmarked };
  };

  const handleDownloadAttendance = () => {
    const selectedCourse = courses.find(c => c.id === selectedCourseId);
    const csvData = [];
    csvData.push(['Student Code', 'Student Name', 'Status', 'Date', 'Course', 'Session Time']);
    
    students.forEach(student => {
      const status = attendance[student.id] || 'Unmarked';
      const statusText = status === 'present' ? 'Present' : 
                        status === 'absent' ? 'Absent' : 
                        status === 'excused' ? 'Excused' :
                        status === 'late' ? 'Late' : 'Unmarked';
      csvData.push([
        student.code,
        student.name,
        statusText,
        currentDate.toLocaleDateString(),
        selectedCourse?.title || 'Unknown Course',
        sessionTime
      ]);
    });

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_${selectedCourse?.code}_${currentDate.toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = getStats();
  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  if (coursesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{color: 'var(--color-primary-50)'}} />
          <p className="text-primary-50 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-orange-500" />
          <h2 className="text-2xl font-bold text-primary-50 mb-2">No Courses Assigned</h2>
          <p className="text-primary-50">You don't have any courses assigned yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 py-2 xs:py-3 sm:py-4 md:py-6 lg:py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 mb-3 xs:mb-4 transition-colors"
          style={{color: 'var(--color-primary-50)'}}
        >
          <ChevronLeft size={16} className="xs:w-5 xs:h-5" />
          <span className="text-xs xs:text-sm sm:text-base font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-primary-50">
            📋 Manage Attendance
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAttendance}
              className="px-3 xs:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-white transition-colors flex items-center gap-2"
              style={{backgroundColor: 'var(--color-primary-50)'}}
            >
              <Download size={16} />
              <span className="hidden xs:inline">Download</span>
            </button>
            <button
              onClick={() => setShowSaveConfirm(true)}
              disabled={Object.keys(attendance).length === 0}
              className="px-3 xs:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-white transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{backgroundColor: 'var(--color-primary-50)'}}
            >
              <Save size={16} />
              Save Attendance
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-6">
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4 border-l-4" style={{borderColor: 'var(--color-primary-50)'}}>
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Users style={{color: 'var(--color-primary-50)'}} size={16} />
              <div>
                <p className="text-xs xs:text-sm text-primary-50">Total</p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary-50">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4 border-l-4 border-green-500">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <CheckCircle className="text-green-600" size={16} />
              <div>
                <p className="text-xs xs:text-sm text-primary-50">Present</p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary-50">{stats.present}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4 border-l-4 border-red-500">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <XCircle className="text-red-600" size={16} />
              <div>
                <p className="text-xs xs:text-sm text-primary-50">Absent</p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary-50">{stats.absent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4 border-l-4 border-yellow-500">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <AlertCircle className="text-yellow-600" size={16} />
              <div>
                <p className="text-xs xs:text-sm text-primary-50">Late</p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary-50">{stats.late}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4 border-l-4 border-orange-500">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <AlertCircle className="text-orange-600" size={16} />
              <div>
                <p className="text-xs xs:text-sm text-primary-50">Excused</p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary-50">{stats.excused}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4 border-l-4 border-gray-400">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Filter className="text-gray-600" size={16} />
              <div>
                <p className="text-xs xs:text-sm text-primary-50">Unmarked</p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary-50">{stats.unmarked}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-3 xs:mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
            <div>
              <label className="block text-xs xs:text-sm font-medium text-primary-50 mb-2">
                <Calendar size={14} className="inline mr-1" />
                Date
              </label>
              <input
                type="date"
                value={currentDate.toISOString().split('T')[0]}
                onChange={(e) => setCurrentDate(new Date(e.target.value))}
                className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg text-xs xs:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs xs:text-sm font-medium text-primary-50 mb-2">
                Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg text-xs xs:text-sm"
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Session Time Display */}
          {sessionTime && (
            <div className="mt-3 p-2 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Session Time:</strong> {sessionTime}
              </p>
            </div>
          )}
        </div>

        {/* Student List */}
        <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="p-3 xs:p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-primary-50">
                  Student Attendance - {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>
                <p className="text-xs xs:text-sm text-primary-50 mt-1">
                  {selectedCourse?.code} - {selectedCourse?.title}
                </p>
              </div>
              {studentsLoading && (
                <Loader2 className="w-5 h-5 animate-spin text-primary-50" />
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{background: 'linear-gradient(90deg, var(--color-primary-50), var(--color-primary-50))'}}>
                <tr>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs xs:text-sm font-bold text-white">
                    Student Code
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-left text-xs xs:text-sm font-bold text-white">
                    Student Name
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-center text-xs xs:text-sm font-bold text-white">
                    Attendance Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-xs xs:text-sm font-medium text-primary-50">
                      {student.code}
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 text-xs xs:text-sm text-primary-50">
                      {student.name}
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleStatusChange(student.id, "present")}
                          className={`p-2 xs:p-3 rounded-lg transition-all ${
                            attendance[student.id] === "present"
                              ? "bg-green-100 ring-2 ring-green-500"
                              : "bg-gray-100 hover:bg-green-50"
                          }`}
                          title="Present"
                        >
                          <CheckCircle
                            size={16}
                            className={`xs:w-5 xs:h-5 ${
                              attendance[student.id] === "present" ? "text-green-600" : "text-gray-400"
                            }`}
                          />
                        </button>

                        <button
                          onClick={() => handleStatusChange(student.id, "absent")}
                          className={`p-2 xs:p-3 rounded-lg transition-all ${
                            attendance[student.id] === "absent"
                              ? "bg-red-100 ring-2 ring-red-500"
                              : "bg-gray-100 hover:bg-red-50"
                          }`}
                          title="Absent"
                        >
                          <XCircle
                            size={16}
                            className={`xs:w-5 xs:h-5 ${
                              attendance[student.id] === "absent" ? "text-red-600" : "text-gray-400"
                            }`}
                          />
                        </button>

                        <button
                          onClick={() => handleStatusChange(student.id, "late")}
                          className={`p-2 xs:p-3 rounded-lg transition-all ${
                            attendance[student.id] === "late"
                              ? "bg-yellow-100 ring-2 ring-yellow-500"
                              : "bg-gray-100 hover:bg-yellow-50"
                          }`}
                          title="Late"
                        >
                          <AlertCircle
                            size={16}
                            className={`xs:w-5 xs:h-5 ${
                              attendance[student.id] === "late" ? "text-yellow-600" : "text-gray-400"
                            }`}
                          />
                        </button>

                        <button
                          onClick={() => handleStatusChange(student.id, "excused")}
                          className={`p-2 xs:p-3 rounded-lg transition-all ${
                            attendance[student.id] === "excused"
                              ? "bg-orange-100 ring-2 ring-orange-500"
                              : "bg-gray-100 hover:bg-orange-50"
                          }`}
                          title="Excused"
                        >
                          <AlertCircle
                            size={16}
                            className={`xs:w-5 xs:h-5 ${
                              attendance[student.id] === "excused" ? "text-orange-600" : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 xs:mt-4 sm:mt-6 bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
          <h3 className="text-sm xs:text-base font-bold text-primary-50 mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const newAttendance: Record<string, AttendanceStatus> = {};
                students.forEach(s => newAttendance[s.id] = "present");
                setAttendance(newAttendance);
              }}
              className="px-3 xs:px-4 py-2 bg-green-100 text-green-700 rounded-lg text-xs xs:text-sm font-medium hover:bg-green-200 transition-colors"
            >
              Mark All Present
            </button>
            <button
              onClick={() => {
                const newAttendance: Record<string, AttendanceStatus> = {};
                students.forEach(s => newAttendance[s.id] = "absent");
                setAttendance(newAttendance);
              }}
              className="px-3 xs:px-4 py-2 bg-red-100 text-red-700 rounded-lg text-xs xs:text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Mark All Absent
            </button>
            <button
              onClick={() => setAttendance({})}
              className="px-3 xs:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs xs:text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Save Confirmation Modal */}
      {showSaveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-4 xs:p-6">
              <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-4">
                Confirm Save Attendance
              </h2>
              <p className="text-xs xs:text-sm text-primary-50 mb-6">
                Are you sure you want to save attendance for {selectedCourse?.code} - {selectedCourse?.title} on{" "}
                {currentDate.toLocaleDateString()}?
              </p>
              <div className="space-y-2 mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-xs xs:text-sm">
                  <span className="text-primary-50">Present:</span>
                  <span className="font-bold text-green-600">{stats.present}</span>
                </div>
                <div className="flex justify-between text-xs xs:text-sm">
                  <span className="text-primary-50">Absent:</span>
                  <span className="font-bold text-red-600">{stats.absent}</span>
                </div>
                <div className="flex justify-between text-xs xs:text-sm">
                  <span className="text-primary-50">Late:</span>
                  <span className="font-bold text-yellow-600">{stats.late}</span>
                </div>
                <div className="flex justify-between text-xs xs:text-sm">
                  <span className="text-primary-50">Excused:</span>
                  <span className="font-bold text-orange-600">{stats.excused}</span>
                </div>
                <div className="flex justify-between text-xs xs:text-sm">
                  <span className="text-primary-50">Unmarked:</span>
                  <span className="font-bold text-gray-600">{stats.unmarked}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSaveConfirm(false)}
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 border border-primary-50 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors text-xs xs:text-sm font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAttendance}
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 text-white rounded-lg transition-colors text-xs xs:text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{backgroundColor: 'var(--color-primary-50)'}}
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
