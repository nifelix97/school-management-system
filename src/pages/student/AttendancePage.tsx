import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Plus,
  Send,
  TrendingUp,
  X,
  XCircle
} from "lucide-react";
import React, { useMemo, useState } from "react";
import type { AttendanceRecord as APIAttendanceRecord } from "../../app/api/attendance";
import { useGetStudentAttendanceQuery } from "../../app/api/attendance";
import { useGetEnrolledCoursesQuery } from "../../app/api/courses";

// Local interface for UI display
interface AttendanceRecord {
  date: Date;
  status: "present" | "absent" | "absent-permission" | "late";
  subject: string;
  time: string;
  reason?: string;
  courseId: string;
}

export default function AttendancePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [leaveForm, setLeaveForm] = useState({
    studentName: "",
    email: "",
    studentCode: "",
    fromDate: "",
    toDate: "",
    reason: "",
    type: "personal" as "medical" | "personal" | "family" | "other"
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get current user from localStorage
  const userStr = localStorage.getItem('user');
  const currentUser = userStr ? JSON.parse(userStr) : null;
  const studentId = currentUser?.id?.toString() || "";

  // Fetch enrolled courses
  const { data: coursesResponse, isLoading: coursesLoading } = useGetEnrolledCoursesQuery(undefined, {
    skip: !studentId
  });
  const enrolledCourses = coursesResponse?.data || [];

  // Calculate date range for current month
  const startDate = useMemo(() => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
  }, [currentMonth, currentYear]);

  const endDate = useMemo(() => {
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    return `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
  }, [currentMonth, currentYear]);

  // Fetch attendance records for the current month
  const { data: attendanceResponse, isLoading: attendanceLoading, error: attendanceError } = useGetStudentAttendanceQuery(
    {
      studentId,
      filters: {
        startDate,
        endDate,
        ...(selectedSubject !== "all" && { courseId: selectedSubject })
      }
    },
    { skip: !studentId }
  );

  const apiAttendanceRecords = attendanceResponse?.data || [];

  // Transform API records to UI format
  const attendanceData: AttendanceRecord[] = useMemo(() => {
    return apiAttendanceRecords.map((record: APIAttendanceRecord) => {
      // Find the course for this record
      const course = enrolledCourses.find(c => c.course?.id === record.courseId);
      
      // Map API status to UI status
      let uiStatus: "present" | "absent" | "absent-permission" | "late";
      if (record.status === "excused") {
        uiStatus = "absent-permission";
      } else if (record.status === "late") {
        uiStatus = "late";
      } else {
        uiStatus = record.status as "present" | "absent";
      }

      return {
        date: new Date(record.attendanceDate),
        status: uiStatus,
        subject: course?.course?.title || "Unknown Course",
        time: record.sessionTime || "N/A",
        reason: record.remarks,
        courseId: record.courseId
      };
    });
  }, [apiAttendanceRecords, enrolledCourses]);



  const getFilteredData = () => {
    if (selectedSubject === "all") return attendanceData;
    return attendanceData.filter(record => record.courseId === selectedSubject);
  };

  const calculateStats = () => {
    const filtered = getFilteredData();
    const total = filtered.length;
    const present = filtered.filter(r => r.status === "present" || r.status === "late").length;
    const absent = filtered.filter(r => r.status === "absent").length;
    const absentWithPermission = filtered.filter(r => r.status === "absent-permission").length;

    return {
      total,
      present,
      absent,
      absentWithPermission,
      presentPercent: total > 0 ? Math.round((present / total) * 100) : 0,
      absentPercent: total > 0 ? Math.round((absent / total) * 100) : 0,
      absentPermissionPercent: total > 0 ? Math.round((absentWithPermission / total) * 100) : 0,
    };
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getAttendanceForDate = (date: Date) => {
    return attendanceData.filter(record => 
      record.date.toDateString() === date.toDateString()
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayAttendance = getAttendanceForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      const hasPresent = dayAttendance.some(r => r.status === "present");
      const hasLate = dayAttendance.some(r => r.status === "late");
      const hasAbsent = dayAttendance.some(r => r.status === "absent");
      const hasAbsentPermission = dayAttendance.some(r => r.status === "absent-permission");

      let bgColor = "";
      if (hasAbsent && (hasPresent || hasLate)) bgColor = "bg-yellow-100 border-yellow-300";
      else if (hasAbsent) bgColor = "bg-red-100 border-red-300";
      else if (hasAbsentPermission && (hasPresent || hasLate)) bgColor = "bg-blue-100 border-blue-300";
      else if (hasAbsentPermission) bgColor = "bg-orange-100 border-orange-300";
      else if (hasLate) bgColor = "bg-yellow-50 border-yellow-400";
      else if (hasPresent) bgColor = "bg-green-100 border-green-300";

      days.push(
        <div
          key={day}
          onClick={() => dayAttendance.length > 0 && setSelectedDate(date)}
          className={`aspect-square border border-gray-200 p-0.5 xs:p-1 sm:p-2 transition-all ${bgColor} ${
            isToday ? "ring-2 ring-blue-500" : ""
          } ${dayAttendance.length > 0 ? "cursor-pointer hover:shadow-md" : ""}`}
        >
          <div className={`text-xs sm:text-sm font-semibold mb-1 ${
            isToday ? "text-blue-600" : "text-gray-700"
          }`}>
            {day}
          </div>
          {dayAttendance.length > 0 && (
            <div className="space-y-0.5">
              {dayAttendance.slice(0, 2).map((record, idx) => (
                <div key={idx} className="flex items-center justify-center">
                  {record.status === "present" && <CheckCircle size={10} className="xs:w-3 xs:h-3 text-green-600" />}
                  {record.status === "absent" && <XCircle size={10} className="xs:w-3 xs:h-3 text-red-600" />}
                  {record.status === "absent-permission" && <AlertCircle size={10} className="xs:w-3 xs:h-3 text-orange-600" />}
                </div>
              ))}
              {dayAttendance.length > 2 && (
                <div className="text-[8px] xs:text-[10px] text-center text-gray-600">
                  +{dayAttendance.length - 2}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (send to API, etc.)
    setLeaveForm({ studentName: "", email: "", studentCode: "", fromDate: "", toDate: "", reason: "", type: "personal" });
    setShowLeaveModal(false);
    // Show success message or redirect
    alert("Leave request submitted successfully!");
  };



  const stats = calculateStats();

  // Loading state
  if (coursesLoading || attendanceLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-50 mx-auto mb-4"></div>
          <p className="text-primary-50">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (attendanceError) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold mb-2">Error loading attendance</p>
          <p className="text-sm">Please try again later</p>
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
            📊 Attendance Tracker
          </h1>
          <div className="flex items-center gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2 xs:px-3 py-1.5 xs:py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm"
              disabled={coursesLoading}
            >
              <option value="all">All Courses</option>
              {enrolledCourses.map(enrollment => (
                <option key={enrollment.course?.id} value={enrollment.course?.id}>
                  {enrollment.course?.title}
                </option>
              ))}
            </select>
            <button
              onClick={() => window.location.href = '/leave-requests'}
              className="px-2 xs:px-3 py-1.5 xs:py-2 rounded-lg text-xs sm:text-sm font-medium text-white transition-colors flex items-center gap-1.5"
              style={{backgroundColor: 'var(--color-primary-50)'}}
            >
              <FileText size={14} />
              <span className="hidden xs:inline">View Requests</span>
              <span className="xs:hidden">Requests</span>
            </button>
            <button
              onClick={() => setShowLeaveModal(true)}
              className="px-2 xs:px-3 py-1.5 xs:py-2 rounded-lg text-xs sm:text-sm font-medium text-white transition-colors flex items-center gap-1.5"
              style={{backgroundColor: 'var(--color-primary-50)'}}
            >
              <Plus size={14} />
              <span className="hidden xs:inline">Request Leave</span>
              <span className="xs:hidden">Leave</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-6">
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4 border-l-4 border-green-500">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <CheckCircle className="text-green-600" size={16} />
              <div>
                <p className="text-xs xs:text-sm text-primary-50">Present</p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary-50">{stats.presentPercent}%</p>
                <p className="text-[10px] xs:text-xs text-primary-50">{stats.present}/{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4 border-l-4 border-red-500">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <XCircle className="text-red-600" size={16} />
              <div>
                <p className="text-xs xs:text-sm text-primary-50">Absent</p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary-50">{stats.absentPercent}%</p>
                <p className="text-[10px] xs:text-xs text-primary-50">{stats.absent}/{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4 border-l-4 border-orange-500">
            <div className="flex items-center gap-1.5 xs:gap-2">
              <AlertCircle className="text-orange-600" size={16} />
              <div>
                <p className="text-xs xs:text-sm text-primary-50">Excused</p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary-50">{stats.absentPermissionPercent}%</p>
                <p className="text-[10px] xs:text-xs text-primary-50">{stats.absentWithPermission}/{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4 border-l-4" style={{borderColor: 'var(--color-primary-50)'}}>
            <div className="flex items-center gap-1.5 xs:gap-2">
              <TrendingUp style={{color: 'var(--color-primary-50)'}} size={16} />
              <div>
                <p className="text-xs xs:text-sm text-primary-50">Total</p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary-50">{stats.total}</p>
                <p className="text-[10px] xs:text-xs text-primary-50">Classes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-center mb-3 xs:mb-4 sm:mb-6 bg-white rounded-lg xs:rounded-xl shadow-sm p-2 xs:p-3 sm:p-4">
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-6">
            <button
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
              className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={16} className="xs:w-5 xs:h-5 text-primary-50" />
            </button>
            <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-primary-50 min-w-[140px] xs:min-w-[180px] sm:min-w-[200px] text-center">
              <span className="hidden xs:inline">{monthNames[currentMonth]} {currentYear}</span>
              <span className="xs:hidden">{monthNames[currentMonth].slice(0, 3)} {currentYear}</span>
            </h2>
            <button
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
              className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={16} className="xs:w-5 xs:h-5 text-primary-50" />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg overflow-hidden mb-3 xs:mb-4 sm:mb-6">
          <div className="grid grid-cols-7 gap-0" style={{background: 'linear-gradient(90deg, var(--color-primary-50), var(--color-primary-50))'}}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-1.5 xs:p-2 sm:p-3 lg:p-4 text-center font-bold text-white text-xs sm:text-sm"
              >
                <span className="hidden xs:inline">{day}</span>
                <span className="xs:hidden">{day[0]}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0">{renderCalendar()}</div>
        </div>

        {/* Attendance Details Modal */}
        {selectedDate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="p-4 xs:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg xs:text-xl font-bold text-primary-50">
                    Attendance Details
                  </h2>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-primary-50" />
                  </button>
                </div>
                <p className="text-xs xs:text-sm text-primary-50 mt-1">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="p-4 xs:p-6 space-y-3">
                {getAttendanceForDate(selectedDate).map((record, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {record.status === "present" && <CheckCircle className="text-green-600" size={20} />}
                      {record.status === "late" && <Clock className="text-yellow-600" size={20} />}
                      {record.status === "absent" && <XCircle className="text-red-600" size={20} />}
                      {record.status === "absent-permission" && <AlertCircle className="text-orange-600" size={20} />}
                      <div>
                        <p className="text-sm font-medium text-primary-50">{record.subject}</p>
                        <p className="text-xs text-primary-50">{record.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === "present" ? "bg-green-100 text-green-700" :
                        record.status === "late" ? "bg-yellow-100 text-yellow-700" :
                        record.status === "absent" ? "bg-red-100 text-red-700" :
                        "bg-orange-100 text-orange-700"
                      }`}>
                        {record.status === "present" ? "Present" :
                         record.status === "late" ? "Late" :
                         record.status === "absent" ? "Absent" : "Excused"}
                      </span>
                      {record.reason && (
                        <p className="text-xs text-gray-500 mt-1">{record.reason}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg p-3 xs:p-4 sm:p-5 lg:p-6 border" style={{background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderColor: 'var(--color-primary-50)'}}>
          <h3 className="text-sm xs:text-base sm:text-lg font-bold text-primary-50 mb-3 xs:mb-4 flex items-center gap-1.5 xs:gap-2">
            <FileText size={16} className="xs:w-5 xs:h-5" style={{color: 'var(--color-primary-50)'}} />
            Legend
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
            <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="text-green-600" size={16} />
              <span className="text-xs xs:text-sm font-medium text-primary-50">Present</span>
            </div>
            <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Clock className="text-yellow-600" size={16} />
              <span className="text-xs xs:text-sm font-medium text-primary-50">Late</span>
            </div>
            <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-red-50 rounded-lg border border-red-200">
              <XCircle className="text-red-600" size={16} />
              <span className="text-xs xs:text-sm font-medium text-primary-50">Absent (No Permission)</span>
            </div>
            <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-orange-50 rounded-lg border border-orange-200">
              <AlertCircle className="text-orange-600" size={16} />
              <span className="text-xs xs:text-sm font-medium text-primary-50">Absent (With Permission)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="p-4 xs:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg xs:text-xl font-bold text-primary-50">Request Leave</h2>
                <button
                  onClick={() => setShowLeaveModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-primary-50" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleLeaveSubmit} className="p-4 xs:p-6 space-y-4">
              {/* Student Information */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-primary-50 mb-1">
                    Student Name
                  </label>
                  <input
                    type="text"
                    required
                    value={leaveForm.studentName}
                    onChange={(e) => setLeaveForm({...leaveForm, studentName: e.target.value})}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg text-xs xs:text-sm "
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-primary-50 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={leaveForm.email}
                      onChange={(e) => setLeaveForm({...leaveForm, email: e.target.value})}
                      placeholder="student@email.com"
                      className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg text-xs xs:text-sm "
                    />
                  </div>
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-primary-50 mb-1">
                      Student Code
                    </label>
                    <input
                      type="text"
                      required
                      value={leaveForm.studentCode}
                      onChange={(e) => setLeaveForm({...leaveForm, studentCode: e.target.value})}
                      placeholder="STU001"
                      className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg text-xs xs:text-sm "
                    />
                  </div>
                </div>
              </div>

              {/* Leave Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-primary-50 mb-1">
                    From Date
                  </label>
                  <input
                    type="date"
                    required
                    value={leaveForm.fromDate}
                    onChange={(e) => setLeaveForm({...leaveForm, fromDate: e.target.value})}
                    className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg text-xs xs:text-sm "
                  />
                </div>
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-primary-50 mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    required
                    value={leaveForm.toDate}
                    onChange={(e) => setLeaveForm({...leaveForm, toDate: e.target.value})}
                    className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg text-xs xs:text-sm "
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs xs:text-sm font-medium text-primary-50 mb-1">
                  Leave Type
                </label>
                <select
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({...leaveForm, type: e.target.value as any})}
                  className="w-full px-3 py-2 border text-primary-50 border-primary-50 rounded-lg text-xs xs:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="personal" className="text-primary-50">Personal</option>
                  <option value="medical" className="text-primary-50">Medical</option>
                  <option value="family" className="text-primary-50">Family</option>
                  <option value="other" className="text-primary-50">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs xs:text-sm font-medium text-primary-50 mb-1">
                  Reason
                </label>
                <textarea
                  required
                  rows={5}
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                  placeholder="Please provide a detailed reason for your leave request..."
                  className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg text-xs xs:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="flex-1 px-4 py-2 border border-primary-50 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors text-xs xs:text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-white rounded-lg transition-colors text-xs xs:text-sm font-medium flex items-center justify-center gap-2"
                  style={{backgroundColor: 'var(--color-primary-50)'}}
                >
                  <Send size={14} />
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}