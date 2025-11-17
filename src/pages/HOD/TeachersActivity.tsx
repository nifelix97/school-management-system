import { useState } from "react";
import { 
  Search, 
  BookOpen, 
  Clock, 
  MessageSquare, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Filter,
  Bell,
  TrendingUp
} from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  assignedCourses: number;
  totalHours: number;
  lecturesDelivered: number;
  materialsUploaded: number;
  assignmentsCreated: number;
  onlineSessionsHeld: number;
  messagesReplied: number;
  forumActivity: number;
  feedbackSubmitted: number;
  avgStudentGrade: number;
  passRate: number;
  attendanceRate: number;
  completionRate: number;
  performanceRating: number;
  semester: string;
  lastActivity: string;
  courses: Course[];
}

interface Course {
  id: string;
  name: string;
  code: string;
  status: "Active" | "Pending" | "Completed";
  students: number;
}

export default function TeachersActivity() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const teachers: Teacher[] = [
    {
      id: "1",
      name: "Dr. Smith",
      email: "smith@university.edu",
      status: "Active",
      assignedCourses: 3,
      totalHours: 45,
      lecturesDelivered: 28,
      materialsUploaded: 15,
      assignmentsCreated: 8,
      onlineSessionsHeld: 12,
      messagesReplied: 156,
      forumActivity: 23,
      feedbackSubmitted: 45,
      avgStudentGrade: 85.2,
      passRate: 92,
      attendanceRate: 88,
      completionRate: 94,
      performanceRating: 4.5,
      semester: "Fall 2024",
      lastActivity: "2 hours ago",
      courses: [
        { id: "1", name: "Mathematics", code: "MATH101", status: "Active", students: 45 },
        { id: "2", name: "Physics", code: "PHYS201", status: "Active", students: 38 },
        { id: "3", name: "Calculus", code: "MATH201", status: "Pending", students: 32 }
      ]
    },
    {
      id: "2",
      name: "Dr. Johnson",
      email: "johnson@university.edu",
      status: "Active",
      assignedCourses: 4,
      totalHours: 60,
      lecturesDelivered: 35,
      materialsUploaded: 8,
      assignmentsCreated: 12,
      onlineSessionsHeld: 18,
      messagesReplied: 89,
      forumActivity: 15,
      feedbackSubmitted: 52,
      avgStudentGrade: 78.5,
      passRate: 85,
      attendanceRate: 82,
      completionRate: 88,
      performanceRating: 4.2,
      semester: "Fall 2024",
      lastActivity: "1 day ago",
      courses: [
        { id: "4", name: "Machine Learning", code: "CS301", status: "Active", students: 25 },
        { id: "5", name: "Data Science", code: "CS302", status: "Active", students: 30 },
        { id: "6", name: "AI Fundamentals", code: "CS303", status: "Completed", students: 28 },
        { id: "7", name: "Deep Learning", code: "CS401", status: "Pending", students: 22 }
      ]
    },
    {
      id: "3",
      name: "Dr. Brown",
      email: "brown@university.edu",
      status: "Inactive",
      assignedCourses: 2,
      totalHours: 30,
      lecturesDelivered: 18,
      materialsUploaded: 5,
      assignmentsCreated: 4,
      onlineSessionsHeld: 8,
      messagesReplied: 34,
      forumActivity: 8,
      feedbackSubmitted: 22,
      avgStudentGrade: 72.8,
      passRate: 78,
      attendanceRate: 75,
      completionRate: 82,
      performanceRating: 3.8,
      semester: "Fall 2024",
      lastActivity: "5 days ago",
      courses: [
        { id: "8", name: "Programming", code: "CS101", status: "Active", students: 40 },
        { id: "9", name: "Web Development", code: "CS102", status: "Pending", students: 35 }
      ]
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.courses.some(course => course.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || teacher.status === statusFilter;
    const matchesCourses = courseFilter === "all" || 
                          (courseFilter === "1-2" && teacher.assignedCourses <= 2) ||
                          (courseFilter === "3-4" && teacher.assignedCourses >= 3 && teacher.assignedCourses <= 4) ||
                          (courseFilter === "5+" && teacher.assignedCourses >= 5);
    const matchesSemester = semesterFilter === "all" || teacher.semester === semesterFilter;
    
    return matchesSearch && matchesStatus && matchesCourses && matchesSemester;
  });

  const getStatusColor = (status: string) => {
    return status === "Active" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50";
  };

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-600 bg-green-50";
      case "Pending": return "text-yellow-600 bg-yellow-50";
      case "Completed": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getWorkloadColor = (courses: number) => {
    if (courses >= 5) return "text-red-600 bg-red-50";
    if (courses >= 3) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const notifications = [
    { id: 1, teacher: "Dr. Brown", message: "No materials uploaded in 7 days", type: "warning" },
    { id: 2, teacher: "Dr. Johnson", message: "Low student engagement (65%)", type: "alert" },
    { id: 3, teacher: "Dr. Smith", message: "Assignment deadline approaching", type: "info" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Teachers Activity
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Monitor and track teaching activities across the department
          </p>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 mb-4 xs:mb-6">
          <h3 className="font-semibold text-primary-50 mb-3 flex items-center gap-2">
            <Bell size={16} />
            Recent Alerts
          </h3>
          <div className="space-y-2">
            {notifications.map(notification => (
              <div key={notification.id} className={`p-2 rounded-lg text-sm ${
                notification.type === "warning" ? "bg-yellow-50 text-yellow-700" :
                notification.type === "alert" ? "bg-red-50 text-red-700" :
                "bg-blue-50 text-blue-700"
              }`}>
                <strong>{notification.teacher}:</strong> {notification.message}
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 xs:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={16} />
              <input
                type="text"
                placeholder="Search teachers..."
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
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
            >
              <option value="all">All Courses</option>
              <option value="1-2">1-2 Courses</option>
              <option value="3-4">3-4 Courses</option>
              <option value="5+">5+ Courses</option>
            </select>
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
            >
              <option value="all">All Semesters</option>
              <option value="Fall 2024">Fall 2024</option>
              <option value="Spring 2024">Spring 2024</option>
            </select>
            <button className="px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 text-xs xs:text-sm">
              <Filter size={14} className="inline mr-1" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Teachers Cards - Mobile */}
        <div className="lg:hidden space-y-3 xs:space-y-4">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-primary-50 text-sm xs:text-base">
                    {teacher.name}
                  </h3>
                  <p className="text-xs xs:text-sm text-primary-50/60">{teacher.email}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(teacher.status)}`}>
                  {teacher.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-xs xs:text-sm">
                <div className="flex items-center gap-2 text-primary-50/70">
                  <BookOpen size={14} />
                  <span>{teacher.assignedCourses} courses</span>
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <Clock size={14} />
                  <span>{teacher.totalHours}h taught</span>
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <BarChart3 size={14} />
                  <span>{teacher.avgStudentGrade}% avg grade</span>
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <TrendingUp size={14} />
                  <span>{teacher.passRate}% pass rate</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTeacher(teacher);
                  setShowDetailsModal(true);
                }}
                className="w-full px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 text-sm"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Teachers Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Teacher</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Status</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Courses</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Hours</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Performance</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Activity</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-primary-50">{teacher.name}</div>
                      <div className="text-sm text-primary-50/60">{teacher.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(teacher.status)}`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getWorkloadColor(teacher.assignedCourses)}`}>
                      {teacher.assignedCourses}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-primary-50">{teacher.totalHours}h</td>
                  <td className="px-4 py-3 text-center">
                    <div className="text-primary-50">{teacher.avgStudentGrade}%</div>
                    <div className="text-xs text-primary-50/60">{teacher.passRate}% pass</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="text-primary-50">{teacher.lecturesDelivered}</div>
                    <div className="text-xs text-primary-50/60">lectures</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setShowDetailsModal(true);
                      }}
                      className="px-3 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80"
                    >
                      <Eye size={12} className="inline mr-1" />
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Teacher Details Modal */}
        {showDetailsModal && selectedTeacher && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-primary-50">{selectedTeacher.name}</h2>
                    <p className="text-sm text-primary-50/60">{selectedTeacher.email}</p>
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
                {/* Activity Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-semibold">{selectedTeacher.lecturesDelivered}</div>
                    <div className="text-xs text-blue-600">Lectures</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-semibold">{selectedTeacher.materialsUploaded}</div>
                    <div className="text-xs text-green-600">Materials</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-purple-600 font-semibold">{selectedTeacher.assignmentsCreated}</div>
                    <div className="text-xs text-purple-600">Assignments</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="text-orange-600 font-semibold">{selectedTeacher.messagesReplied}</div>
                    <div className="text-xs text-orange-600">Messages</div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="mb-6">
                  <h3 className="font-semibold text-primary-50 mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-primary-50/60">Average Grade</div>
                      <div className="text-lg font-semibold text-primary-50">{selectedTeacher.avgStudentGrade}%</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-primary-50/60">Pass Rate</div>
                      <div className="text-lg font-semibold text-primary-50">{selectedTeacher.passRate}%</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-primary-50/60">Attendance</div>
                      <div className="text-lg font-semibold text-primary-50">{selectedTeacher.attendanceRate}%</div>
                    </div>
                  </div>
                </div>

                {/* Assigned Courses */}
                <div className="mb-6">
                  <h3 className="font-semibold text-primary-50 mb-3">Assigned Courses</h3>
                  <div className="space-y-2">
                    {selectedTeacher.courses.map(course => (
                      <div key={course.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-primary-50">{course.code} - {course.name}</div>
                          <div className="text-sm text-primary-50/60">{course.students} students</div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCourseStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm">
                    <CheckCircle size={16} className="inline mr-2" />
                    Approve Materials
                  </button>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm">
                    <MessageSquare size={16} className="inline mr-2" />
                    Send Feedback
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm">
                    <AlertTriangle size={16} className="inline mr-2" />
                    Flag Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}