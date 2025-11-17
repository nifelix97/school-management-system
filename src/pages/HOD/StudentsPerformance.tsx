import { useState } from "react";
import { 
  Search, 
  User, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  Download,
  Mail,
  BarChart3,
  Clock,
  FileText
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  studentId: string;
  level: string;
  coursesEnrolled: number;
  status: "Active" | "Inactive";
  gpa: number;
  overallGrade: number;
  attendanceRate: number;
  assignmentsSubmitted: number;
  assignmentsPending: number;
  semester: string;
  lastActivity: string;
  courses: StudentCourse[];
  isAtRisk: boolean;
}

interface StudentCourse {
  id: string;
  name: string;
  code: string;
  status: "Ongoing" | "Completed" | "Pending";
  grade: number;
  attendance: number;
  assignmentsSubmitted: number;
  assignmentsTotal: number;
  quizScores: number[];
  examScore: number;
}

export default function StudentsPerformance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const [attendanceFilter, setAttendanceFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const students: Student[] = [
    {
      id: "1",
      name: "John Doe",
      studentId: "STU001",
      level: "Year 2",
      coursesEnrolled: 5,
      status: "Active",
      gpa: 3.8,
      overallGrade: 85.2,
      attendanceRate: 92,
      assignmentsSubmitted: 18,
      assignmentsPending: 2,
      semester: "Fall 2024",
      lastActivity: "2 hours ago",
      isAtRisk: false,
      courses: [
        { id: "1", name: "Mathematics", code: "MATH201", status: "Ongoing", grade: 88, attendance: 95, assignmentsSubmitted: 4, assignmentsTotal: 5, quizScores: [85, 90, 82], examScore: 88 },
        { id: "2", name: "Physics", code: "PHYS201", status: "Ongoing", grade: 82, attendance: 88, assignmentsSubmitted: 3, assignmentsTotal: 4, quizScores: [78, 85, 80], examScore: 82 },
        { id: "3", name: "Chemistry", code: "CHEM201", status: "Completed", grade: 90, attendance: 96, assignmentsSubmitted: 5, assignmentsTotal: 5, quizScores: [88, 92, 89], examScore: 90 }
      ]
    },
    {
      id: "2",
      name: "Jane Smith",
      studentId: "STU002",
      level: "Year 3",
      coursesEnrolled: 4,
      status: "Active",
      gpa: 2.1,
      overallGrade: 58.5,
      attendanceRate: 65,
      assignmentsSubmitted: 8,
      assignmentsPending: 6,
      semester: "Fall 2024",
      lastActivity: "1 day ago",
      isAtRisk: true,
      courses: [
        { id: "4", name: "Machine Learning", code: "CS301", status: "Ongoing", grade: 55, attendance: 60, assignmentsSubmitted: 2, assignmentsTotal: 5, quizScores: [45, 58, 52], examScore: 55 },
        { id: "5", name: "Data Science", code: "CS302", status: "Ongoing", grade: 62, attendance: 70, assignmentsSubmitted: 3, assignmentsTotal: 4, quizScores: [60, 65, 58], examScore: 62 }
      ]
    },
    {
      id: "3",
      name: "Mike Johnson",
      studentId: "STU003",
      level: "Year 1",
      coursesEnrolled: 6,
      status: "Active",
      gpa: 3.5,
      overallGrade: 78.8,
      attendanceRate: 88,
      assignmentsSubmitted: 22,
      assignmentsPending: 3,
      semester: "Fall 2024",
      lastActivity: "3 hours ago",
      isAtRisk: false,
      courses: [
        { id: "6", name: "Programming", code: "CS101", status: "Ongoing", grade: 82, attendance: 90, assignmentsSubmitted: 4, assignmentsTotal: 5, quizScores: [80, 85, 78], examScore: 82 },
        { id: "7", name: "Web Development", code: "CS102", status: "Ongoing", grade: 75, attendance: 85, assignmentsSubmitted: 3, assignmentsTotal: 4, quizScores: [72, 78, 74], examScore: 75 }
      ]
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.courses.some(course => course.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesLevel = levelFilter === "all" || student.level === levelFilter;
    const matchesPerformance = performanceFilter === "all" || 
                              (performanceFilter === "high" && student.gpa >= 3.5) ||
                              (performanceFilter === "average" && student.gpa >= 2.5 && student.gpa < 3.5) ||
                              (performanceFilter === "low" && student.gpa < 2.5);
    const matchesAttendance = attendanceFilter === "all" ||
                             (attendanceFilter === "good" && student.attendanceRate >= 80) ||
                             (attendanceFilter === "poor" && student.attendanceRate < 80);
    
    return matchesSearch && matchesStatus && matchesLevel && matchesPerformance && matchesAttendance;
  });

  const getStatusColor = (status: string) => {
    return status === "Active" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50";
  };

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing": return "text-blue-600 bg-blue-50";
      case "Completed": return "text-green-600 bg-green-50";
      case "Pending": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 80) return "text-green-600";
    if (grade >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 80) return "text-green-600";
    if (attendance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const atRiskStudents = students.filter(student => student.isAtRisk);
  const avgGPA = students.reduce((sum, student) => sum + student.gpa, 0) / students.length;
  const avgAttendance = students.reduce((sum, student) => sum + student.attendanceRate, 0) / students.length;

  const handleExportData = () => {
    const csvData = filteredStudents.map(student => ({
      Name: student.name,
      StudentID: student.studentId,
      Level: student.level,
      GPA: student.gpa,
      OverallGrade: student.overallGrade,
      Attendance: student.attendanceRate,
      Status: student.status,
      CoursesEnrolled: student.coursesEnrolled,
      AssignmentsSubmitted: student.assignmentsSubmitted,
      AssignmentsPending: student.assignmentsPending,
      IsAtRisk: student.isAtRisk ? 'Yes' : 'No'
    }));
    
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students-performance-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Student performance data exported successfully!');
  };

  const handleSendNotification = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      const message = student.isAtRisk 
        ? `Academic Alert: ${student.name} requires immediate attention. GPA: ${student.gpa}, Attendance: ${student.attendanceRate}%`
        : `Performance Update: Notification sent to ${student.name}`;
      
      // Simulate sending notification
      setTimeout(() => {
        alert(`Notification sent to ${student.name} (${student.studentId})\n\nMessage: ${message}`);
      }, 500);
    }
  };

  const handleExportStudentReport = (student: Student) => {
    const reportData = {
      studentInfo: {
        name: student.name,
        studentId: student.studentId,
        level: student.level,
        gpa: student.gpa,
        overallGrade: student.overallGrade,
        attendanceRate: student.attendanceRate,
        status: student.status,
        isAtRisk: student.isAtRisk
      },
      courses: student.courses.map(course => ({
        code: course.code,
        name: course.name,
        status: course.status,
        grade: course.grade,
        attendance: course.attendance,
        assignmentsSubmitted: course.assignmentsSubmitted,
        assignmentsTotal: course.assignmentsTotal,
        quizAverage: course.quizScores.length > 0 ? 
          (course.quizScores.reduce((a, b) => a + b, 0) / course.quizScores.length).toFixed(1) : 'N/A',
        examScore: course.examScore
      }))
    };
    
    const jsonContent = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${student.studentId}-${student.name.replace(/\s+/g, '-')}-report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert(`Individual report for ${student.name} exported successfully!`);
  };

  const handleAcademicFollowUp = (student: Student) => {
    const followUpActions = [
      'Schedule academic counseling session',
      'Notify academic advisor',
      'Create improvement plan',
      'Monitor weekly progress',
      'Arrange tutoring support'
    ];
    
    const actionPlan = followUpActions.join('\n• ');
    
    alert(`Academic Follow-up Plan for ${student.name}:\n\n• ${actionPlan}\n\nThis plan has been logged and relevant staff will be notified.`);
  };

  const handleApplyFilters = () => {
    const activeFilters = [];
    if (statusFilter !== 'all') activeFilters.push(`Status: ${statusFilter}`);
    if (levelFilter !== 'all') activeFilters.push(`Level: ${levelFilter}`);
    if (performanceFilter !== 'all') activeFilters.push(`Performance: ${performanceFilter}`);
    if (attendanceFilter !== 'all') activeFilters.push(`Attendance: ${attendanceFilter}`);
    if (searchTerm) activeFilters.push(`Search: "${searchTerm}"`);
    
    const filterSummary = activeFilters.length > 0 
      ? `Applied filters:\n• ${activeFilters.join('\n• ')}\n\nShowing ${filteredStudents.length} of ${students.length} students`
      : `No filters applied. Showing all ${students.length} students`;
    
    alert(filterSummary);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Students Performance
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Monitor and analyze student academic performance across the department
          </p>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <User size={20} className="text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-50">{students.length}</div>
                <div className="text-sm text-primary-50/60">Total Students</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-50">{avgGPA.toFixed(1)}</div>
                <div className="text-sm text-primary-50/60">Average GPA</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Clock size={20} className="text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-50">{avgAttendance.toFixed(0)}%</div>
                <div className="text-sm text-primary-50/60">Avg Attendance</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-50">{atRiskStudents.length}</div>
                <div className="text-sm text-primary-50/60">At-Risk Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* At-Risk Students Alert */}
        {atRiskStudents.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-red-600" />
              <h3 className="font-semibold text-red-700">At-Risk Students</h3>
            </div>
            <div className="space-y-1">
              {atRiskStudents.map(student => (
                <div key={student.id} className="text-sm text-red-600">
                  {student.name} ({student.studentId}) - GPA: {student.gpa}, Attendance: {student.attendanceRate}%
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 xs:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={16} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
            >
              <option value="all">All Levels</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 4">Year 4</option>
            </select>
            <select
              value={performanceFilter}
              onChange={(e) => setPerformanceFilter(e.target.value)}
              className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
            >
              <option value="all">All Performance</option>
              <option value="high">High (GPA ≥ 3.5)</option>
              <option value="average">Average (2.5-3.4)</option>
              <option value="low">Low (GPA &lt; 2.5)</option>
            </select>
            <select
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
              className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
            >
              <option value="all">All Attendance</option>
              <option value="good">Good (≥80%)</option>
              <option value="poor">Poor (&lt;80%)</option>
            </select>
            <button
              onClick={handleApplyFilters}
              className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-xs xs:text-sm"
            >
              Apply Filters
            </button>
            <button
              onClick={handleExportData}
              className="px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 text-xs xs:text-sm"
            >
              <Download size={14} className="inline mr-1" />
              Export
            </button>
          </div>
        </div>

        {/* Students Cards - Mobile */}
        <div className="lg:hidden space-y-3 xs:space-y-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className={`bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 ${student.isAtRisk ? 'border-l-4 border-red-500' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-primary-50 text-sm xs:text-base">
                    {student.name}
                  </h3>
                  <p className="text-xs xs:text-sm text-primary-50/60">{student.studentId} • {student.level}</p>
                </div>
                <div className="flex items-center gap-2">
                  {student.isAtRisk && <AlertTriangle size={16} className="text-red-500" />}
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-xs xs:text-sm">
                <div className="flex items-center gap-2 text-primary-50/70">
                  <BookOpen size={14} />
                  <span>{student.coursesEnrolled} courses</span>
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <BarChart3 size={14} />
                  <span className={getGradeColor(student.overallGrade)}>GPA: {student.gpa}</span>
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <Clock size={14} />
                  <span className={getAttendanceColor(student.attendanceRate)}>{student.attendanceRate}% attendance</span>
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <FileText size={14} />
                  <span>{student.assignmentsSubmitted}/{student.assignmentsSubmitted + student.assignmentsPending} assignments</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowDetailsModal(true);
                  }}
                  className="flex-1 px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 text-sm"
                >
                  View Details
                </button>
                {student.isAtRisk && (
                  <button
                    onClick={() => handleSendNotification(student.id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                  >
                    <Mail size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Students Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Student</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Level</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Courses</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">GPA</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Attendance</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Assignments</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Status</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className={`hover:bg-gray-50 ${student.isAtRisk ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {student.isAtRisk && <AlertTriangle size={16} className="text-red-500" />}
                      <div>
                        <div className="font-medium text-primary-50">{student.name}</div>
                        <div className="text-sm text-primary-50/60">{student.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-primary-50">{student.level}</td>
                  <td className="px-4 py-3 text-center text-primary-50">{student.coursesEnrolled}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-medium ${getGradeColor(student.overallGrade)}`}>
                      {student.gpa}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-medium ${getAttendanceColor(student.attendanceRate)}`}>
                      {student.attendanceRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-primary-50">
                    {student.assignmentsSubmitted}/{student.assignmentsSubmitted + student.assignmentsPending}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowDetailsModal(true);
                        }}
                        className="px-3 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80"
                      >
                        <Eye size={12} className="inline mr-1" />
                        Details
                      </button>
                      {student.isAtRisk && (
                        <button
                          onClick={() => handleSendNotification(student.id)}
                          className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100"
                        >
                          <Mail size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Student Details Modal */}
        {showDetailsModal && selectedStudent && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-primary-50">{selectedStudent.name}</h2>
                    <p className="text-sm text-primary-50/60">{selectedStudent.studentId} • {selectedStudent.level}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Performance Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-semibold">{selectedStudent.gpa}</div>
                    <div className="text-xs text-blue-600">GPA</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-semibold">{selectedStudent.overallGrade}%</div>
                    <div className="text-xs text-green-600">Overall Grade</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-purple-600 font-semibold">{selectedStudent.attendanceRate}%</div>
                    <div className="text-xs text-purple-600">Attendance</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="text-orange-600 font-semibold">{selectedStudent.assignmentsSubmitted}</div>
                    <div className="text-xs text-orange-600">Assignments</div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="mb-6">
                  <h3 className="font-semibold text-primary-50 mb-3">Course Performance</h3>
                  <div className="space-y-3">
                    {selectedStudent.courses.map(course => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-medium text-primary-50">{course.code} - {course.name}</div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getCourseStatusColor(course.status)}`}>
                              {course.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-semibold ${getGradeColor(course.grade)}`}>
                              {course.grade}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-primary-50/60">Attendance</div>
                            <div className={`font-medium ${getAttendanceColor(course.attendance)}`}>
                              {course.attendance}%
                            </div>
                          </div>
                          <div>
                            <div className="text-primary-50/60">Assignments</div>
                            <div className="font-medium text-primary-50">
                              {course.assignmentsSubmitted}/{course.assignmentsTotal}
                            </div>
                          </div>
                          <div>
                            <div className="text-primary-50/60">Quiz Average</div>
                            <div className="font-medium text-primary-50">
                              {course.quizScores.length > 0 ? 
                                (course.quizScores.reduce((a, b) => a + b, 0) / course.quizScores.length).toFixed(1) : 
                                'N/A'
                              }%
                            </div>
                          </div>
                          <div>
                            <div className="text-primary-50/60">Exam Score</div>
                            <div className="font-medium text-primary-50">{course.examScore}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleExportStudentReport(selectedStudent)}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                  >
                    <Download size={16} className="inline mr-2" />
                    Export Report
                  </button>
                  <button 
                    onClick={() => handleSendNotification(selectedStudent.id)}
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm"
                  >
                    <Mail size={16} className="inline mr-2" />
                    Send Notification
                  </button>
                  {selectedStudent.isAtRisk && (
                    <button 
                      onClick={() => handleAcademicFollowUp(selectedStudent)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                    >
                      <AlertTriangle size={16} className="inline mr-2" />
                      Academic Follow-up
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}