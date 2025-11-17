import { useState } from "react";
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Users, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Calendar, 
  Archive, 
  Trash2,
  UserCheck,
  Upload,
  AlertTriangle
} from "lucide-react";

interface Course {
  id: string;
  code: string;
  name: string;
  teacher: string;
  status: "Pending" | "Approved" | "Rejected" | "Needs Revision" | "Active" | "Inactive" | "Archived";
  enrolledStudents: number;
  passRate: number;
  materials: number;
  pendingMaterials: number;
  examsStatus: "Pending" | "Approved" | "Rejected";
  lastActivity: string;
  issues: number;
}

export default function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [actionModal, setActionModal] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const courses: Course[] = [
    {
      id: "1",
      code: "CS101",
      name: "Introduction to Programming",
      teacher: "Dr. Smith",
      status: "Pending",
      enrolledStudents: 45,
      passRate: 85,
      materials: 12,
      pendingMaterials: 3,
      examsStatus: "Pending",
      lastActivity: "2 hours ago",
      issues: 1
    },
    {
      id: "2",
      code: "CS201",
      name: "Data Structures",
      teacher: "Dr. Johnson",
      status: "Active",
      enrolledStudents: 38,
      passRate: 78,
      materials: 15,
      pendingMaterials: 0,
      examsStatus: "Approved",
      lastActivity: "1 day ago",
      issues: 0
    },
    {
      id: "3",
      code: "CS301",
      name: "Machine Learning",
      teacher: "Dr. Brown",
      status: "Needs Revision",
      enrolledStudents: 25,
      passRate: 92,
      materials: 8,
      pendingMaterials: 2,
      examsStatus: "Rejected",
      lastActivity: "3 hours ago",
      issues: 2
    }
  ];

  const teachers = ["Dr. Smith", "Dr. Johnson", "Dr. Brown", "Dr. Davis", "Dr. Wilson"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "text-yellow-600 bg-yellow-50";
      case "Approved": return "text-green-600 bg-green-50";
      case "Active": return "text-blue-600 bg-blue-50";
      case "Rejected": return "text-red-600 bg-red-50";
      case "Needs Revision": return "text-orange-600 bg-orange-50";
      case "Inactive": return "text-gray-600 bg-gray-50";
      case "Archived": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const handleAction = (action: string, courseId: string) => {
    console.log(`${action} course ${courseId}`);
    setActionModal(null);
    setRejectReason("");
    setAnnouncement("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Course Management
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Approve, manage, and monitor all department courses
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={16} />
              <input
                type="text"
                placeholder="Search courses..."
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
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Active">Active</option>
              <option value="Needs Revision">Needs Revision</option>
              <option value="Rejected">Rejected</option>
              <option value="Inactive">Inactive</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Course Cards - Mobile */}
        <div className="lg:hidden space-y-3 xs:space-y-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-primary-50 text-sm xs:text-base">
                    {course.code} - {course.name}
                  </h3>
                  <p className="text-xs xs:text-sm text-primary-50/60">{course.teacher}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-xs xs:text-sm">
                <div className="flex items-center gap-2 text-primary-50/70">
                  <Users size={14} />
                  <span>{course.enrolledStudents} students</span>
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <BarChart3 size={14} />
                  <span>{course.passRate}% pass rate</span>
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <FileText size={14} />
                  <span>{course.materials} materials</span>
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <AlertTriangle size={14} />
                  <span>{course.issues} issues</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCourse(course)}
                className="w-full px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 text-sm"
              >
                Manage Course
              </button>
            </div>
          ))}
        </div>

        {/* Course Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Course</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Teacher</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Status</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Students</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Pass Rate</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Materials</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Issues</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-primary-50">{course.code}</div>
                      <div className="text-sm text-primary-50/60">{course.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-primary-50">{course.teacher}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-primary-50">{course.enrolledStudents}</td>
                  <td className="px-4 py-3 text-center text-primary-50">{course.passRate}%</td>
                  <td className="px-4 py-3 text-center">
                    <div className="text-primary-50">{course.materials}</div>
                    {course.pendingMaterials > 0 && (
                      <div className="text-xs text-orange-600">+{course.pendingMaterials} pending</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {course.issues > 0 ? (
                      <span className="text-red-600 font-medium">{course.issues}</span>
                    ) : (
                      <span className="text-green-600">0</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-3 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Course Management Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 xs:p-4">
            <div className="bg-white rounded-lg xs:rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 xs:p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-1">
                      {selectedCourse.code} - {selectedCourse.name}
                    </h2>
                    <p className="text-sm text-primary-50/60">
                      {selectedCourse.teacher} • {selectedCourse.enrolledStudents} students
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-4 xs:p-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <button
                    onClick={() => setActionModal("approve")}
                    className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>
                  <button
                    onClick={() => setActionModal("reject")}
                    className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                  <button
                    onClick={() => setActionModal("revision")}
                    className="flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 text-sm"
                  >
                    <Edit size={16} />
                    Needs Revision
                  </button>
                  <button
                    onClick={() => setActionModal("assign")}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                  >
                    <UserCheck size={16} />
                    Assign Teacher
                  </button>
                </div>

                {/* Management Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Course Status & Performance */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-primary-50">Course Overview</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary-50">{selectedCourse.enrolledStudents}</div>
                        <div className="text-xs text-primary-50/60">Students</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary-50">{selectedCourse.passRate}%</div>
                        <div className="text-xs text-primary-50/60">Pass Rate</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary-50">{selectedCourse.materials}</div>
                        <div className="text-xs text-primary-50/60">Materials</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary-50">{selectedCourse.issues}</div>
                        <div className="text-xs text-primary-50/60">Issues</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Management Actions */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-primary-50">Management Actions</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setActionModal("materials")}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <Upload size={16} className="text-primary-50" />
                        <div>
                          <div className="text-sm font-medium text-primary-50">Review Materials</div>
                          <div className="text-xs text-primary-50/60">{selectedCourse.pendingMaterials} pending review</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setActionModal("exams")}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <Calendar size={16} className="text-primary-50" />
                        <div>
                          <div className="text-sm font-medium text-primary-50">Manage Exams</div>
                          <div className="text-xs text-primary-50/60">Status: {selectedCourse.examsStatus}</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setActionModal("announcement")}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <MessageSquare size={16} className="text-primary-50" />
                        <div>
                          <div className="text-sm font-medium text-primary-50">Send Announcement</div>
                          <div className="text-xs text-primary-50/60">Notify students & teacher</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setActionModal("analytics")}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <BarChart3 size={16} className="text-primary-50" />
                        <div>
                          <div className="text-sm font-medium text-primary-50">View Analytics</div>
                          <div className="text-xs text-primary-50/60">Performance & activity</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setActionModal("issues")}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <AlertTriangle size={16} className="text-primary-50" />
                        <div>
                          <div className="text-sm font-medium text-primary-50">Handle Issues</div>
                          <div className="text-xs text-primary-50/60">{selectedCourse.issues} open issues</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-red-600 mb-3">Danger Zone</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActionModal("archive")}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 text-sm"
                    >
                      <Archive size={16} />
                      Archive Course
                    </button>
                    <button
                      onClick={() => setActionModal("delete")}
                      className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                    >
                      <Trash2 size={16} />
                      Delete Course
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Modals */}
        {actionModal && (
          <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              {actionModal === "reject" && (
                <>
                  <h3 className="text-lg font-semibold text-primary-50 mb-4">Reject Course</h3>
                  <textarea
                    placeholder="Reason for rejection..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    rows={4}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAction("reject", selectedCourse?.id || "")}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject Course
                    </button>
                    <button
                      onClick={() => setActionModal(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {actionModal === "assign" && (
                <>
                  <h3 className="text-lg font-semibold text-primary-50 mb-4">Assign Teacher</h3>
                  <select className="w-full p-3 border border-gray-300 rounded-lg mb-4">
                    {teachers.map(teacher => (
                      <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                  </select>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAction("assign", selectedCourse?.id || "")}
                      className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80"
                    >
                      Assign Teacher
                    </button>
                    <button
                      onClick={() => setActionModal(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {actionModal === "announcement" && (
                <>
                  <h3 className="text-lg font-semibold text-primary-50 mb-4">Send Announcement</h3>
                  <textarea
                    placeholder="Announcement message..."
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    rows={4}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAction("announcement", selectedCourse?.id || "")}
                      className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80"
                    >
                      Send Announcement
                    </button>
                    <button
                      onClick={() => setActionModal(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {actionModal === "materials" && (
                <>
                  <h3 className="text-lg font-semibold text-primary-50 mb-4">Review Materials</h3>
                  <div className="space-y-3 mb-4">
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Lecture Notes - Week 5</span>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">Approve</button>
                          <button className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">Reject</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActionModal(null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </>
              )}

              {actionModal === "exams" && (
                <>
                  <h3 className="text-lg font-semibold text-primary-50 mb-4">Manage Exams</h3>
                  <div className="space-y-3 mb-4">
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Midterm Exam</span>
                        <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Pending</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-50 text-green-600 rounded text-xs">Approve</button>
                        <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs">Reject</button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActionModal(null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </>
              )}

              {actionModal === "analytics" && (
                <>
                  <h3 className="text-lg font-semibold text-primary-50 mb-4">Course Analytics</h3>
                  <div className="space-y-4 mb-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-blue-600">{selectedCourse?.enrolledStudents}</div>
                        <div className="text-xs text-blue-600">Students</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-green-600">{selectedCourse?.passRate}%</div>
                        <div className="text-xs text-green-600">Pass Rate</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActionModal(null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </>
              )}

              {actionModal === "issues" && (
                <>
                  <h3 className="text-lg font-semibold text-primary-50 mb-4">Handle Issues</h3>
                  <div className="space-y-3 mb-4">
                    {(selectedCourse?.issues || 0) > 0 ? (
                      <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-red-700">Grade Dispute</span>
                          <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">High</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-red-600 text-white rounded text-xs">Resolve</button>
                          <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-xs">Escalate</button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-green-50 rounded-lg text-center">
                        <p className="text-sm text-green-600">No open issues</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setActionModal(null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </>
              )}

              {(actionModal === "approve" || actionModal === "revision" || actionModal === "archive" || actionModal === "delete") && (
                <>
                  <h3 className="text-lg font-semibold text-primary-50 mb-4">
                    {actionModal === "approve" && "Approve Course"}
                    {actionModal === "revision" && "Mark as Needs Revision"}
                    {actionModal === "archive" && "Archive Course"}
                    {actionModal === "delete" && "Delete Course"}
                  </h3>
                  <p className="text-primary-50/70 mb-4">
                    Are you sure you want to {actionModal} this course?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAction(actionModal, selectedCourse?.id || "")}
                      className={`flex-1 px-4 py-2 rounded-lg text-white ${
                        actionModal === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-primary-50 hover:bg-opacity-80"
                      }`}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setActionModal(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}