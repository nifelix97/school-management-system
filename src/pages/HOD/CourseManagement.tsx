import {
    AlertTriangle,
    Archive,
    Award,
    BarChart3,
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    Edit,
    Eye,
    FileText,
    MessageSquare,
    Search,
    Settings,
    Trash2,
    Upload,
    UserCheck,
    Users,
    XCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import type {
    Course,
    Teacher
} from "../../app/api/courses";
import {
    useAssignInstructorMutation,
    useCreateCourseMutation,
    useDeleteCourseMutation,
    useGetCoursesByDepartmentQuery,
    useGetTeachersByDepartmentQuery,
    useUpdateCourseMutation,
} from "../../app/api/courses";

export default function CourseManagement() {
  const [activeTab, setActiveTab] = useState<"manage" | "catalog">("manage");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [actionModal, setActionModal] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: "",
    title: "",
    description: "",
    instructorId: "",
    units: 3,
    level: "Undergraduate" as any,
    semester: "Fall 2024",
    maxCapacity: 30,
    credits: 3
  });

  // API Hooks
  const { data: coursesData, isLoading: isLoadingCourses, isError: isErrorCourses } = useGetCoursesByDepartmentQuery();
  const { data: teachersData } = useGetTeachersByDepartmentQuery();
  
  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const [assignInstructor] = useAssignInstructorMutation();

  const courses: Course[] = coursesData?.data || [];
  const teachers: Teacher[] = teachersData?.data || [];
  
  const semesters = [...new Set(courses.map(c => c.semester).filter(Boolean))];
  const levels = [...new Set(courses.map(c => c.level).filter(Boolean))];
  const courseTeachers = [...new Set(courses.map(c => c.instructor?.name).filter(Boolean))];

  const filteredCourses = courses.filter(course => {
    const courseTitle = course.title || course.name || "";
    const instructorName = course.instructor?.name || "";
    const matchesSearch = courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    const matchesSemester = selectedSemester === "all" || course.semester === selectedSemester;
    const matchesTeacher = selectedTeacher === "all" || instructorName === selectedTeacher;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    
    return matchesSearch && matchesStatus && matchesSemester && matchesTeacher && matchesLevel;
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

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Undergraduate": return "text-blue-600 bg-blue-50";
      case "Graduate": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const handleAction = async (action: string, courseId: string) => {
    try {
      if (action === "approve") {
        await updateCourse({ id: courseId, data: { status: "Approved" } }).unwrap();
        toast.success("Course approved successfully");
      } else if (action === "reject") {
        await updateCourse({ id: courseId, data: { status: "Rejected" } }).unwrap();
        toast.success("Course rejected");
      } else if (action === "revision") {
        await updateCourse({ id: courseId, data: { status: "Needs Revision" } }).unwrap();
        toast.success("Course marked for revision");
      } else if (action === "archive") {
        await updateCourse({ id: courseId, data: { status: "Archived" } }).unwrap();
        toast.success("Course archived");
      } else if (action === "delete") {
        await deleteCourse(courseId).unwrap();
        toast.success("Course deleted successfully");
        if (selectedCourse?.id === courseId) setSelectedCourse(null);
      } else if (action === "assign") {
        const instructorId = (document.getElementById("teacher-select") as HTMLSelectElement)?.value;
        if (instructorId) {
          await assignInstructor({ courseId, instructorId }).unwrap();
          toast.success("Instructor assigned successfully");
        }
      }
      setActionModal(null);
      setRejectReason("");
      setAnnouncement("");
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${action} course`);
    }
  };

  if (isLoadingCourses) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-50"></div>
      </div>
    );
  }

  if (isErrorCourses) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md">
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Courses</h2>
          <p className="text-gray-600 mb-6">We couldn't load the courses for your department. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Course Management
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Manage, approve, and view all department courses
          </p>
        </div>

        {/* Create Course Button - Only in Manage Tab */}
        {activeTab === "manage" && (
          <div className="mb-4 xs:mb-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 flex items-center gap-2"
            >
              <BookOpen size={16} />
              Create New Course
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm mb-4 xs:mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === "manage" ? "text-primary-50 border-b-2 border-primary-50" : "text-gray-500"
              }`}
            >
              <Settings size={16} className="inline mr-2" />
              Manage Courses
            </button>
            <button
              onClick={() => setActiveTab("catalog")}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === "catalog" ? "text-primary-50 border-b-2 border-primary-50" : "text-gray-500"
              }`}
            >
              <BookOpen size={16} className="inline mr-2" />
              Course Catalog
            </button>
          </div>
        </div>

        {/* Manage Courses Tab */}
        {activeTab === "manage" && (
          <>
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
                        {course.code} - {course.title || course.name}
                      </h3>
                      <p className="text-xs xs:text-sm text-primary-50/60">{course.instructor?.name || "No teacher assigned"}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3 text-xs xs:text-sm">
                    <div className="flex items-center gap-2 text-primary-50/70">
                      <Users size={14} />
                      <span>{course.enrolledStudents || 0} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-50/70">
                      <BarChart3 size={14} />
                      <span>{course.passRate || 0}% pass rate</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-50/70">
                      <FileText size={14} />
                      <span>Resources available</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-50/70">
                      <AlertTriangle size={14} />
                      <span>{course.issues || 0} issues</span>
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
                          <div className="text-sm text-primary-50/60">{course.title || course.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-primary-50">{course.instructor?.name || "N/A"}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-primary-50">{course.enrolledStudents || 0}</td>
                      <td className="px-4 py-3 text-center text-primary-50">{course.passRate || 0}%</td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-primary-50">{course.resources?.length || 0}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {(course.issues || 0) > 0 ? (
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
          </>
        )}

        {/* Course Catalog Tab */}
        {activeTab === "catalog" && (
          <>
            {/* Enhanced Filters */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 xs:gap-4">
                <div className="relative flex-1 lg:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={16} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-2 xs:gap-3">
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="px-2 xs:px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                  >
                    <option value="all">All Semesters</option>
                    {semesters.map(semester => (
                      <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>

                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="px-2 xs:px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                  >
                    <option value="all">All Teachers</option>
                    {courseTeachers.map(teacher => (
                      <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                  </select>

                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-2 xs:px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                  >
                    <option value="all">All Levels</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-2 xs:px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Course Grid - Mobile Cards */}
            <div className="lg:hidden grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-primary-50 text-sm xs:text-base mb-1">
                        {course.code}
                      </h3>
                      <p className="text-xs xs:text-sm text-primary-50/60 line-clamp-2">
                        {course.title || course.name}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-xs xs:text-sm text-primary-50/70">
                      <Users size={14} />
                      <span>{course.enrolledStudents || 0}/{course.maxCapacity || "-"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs xs:text-sm text-primary-50/70">
                      <Clock size={14} />
                      <span>{course.units || course.credits || 0} units</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs xs:text-sm text-primary-50/70">
                      <Award size={14} />
                      <span>{course.instructor?.name || "N/A"}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-3 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80 flex items-center gap-1"
                    >
                      <Eye size={12} />
                      View
                    </button>
                  </div>
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
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Units</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Enrollment</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Level</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-primary-50">{course.code}</div>
                          <div className="text-sm text-primary-50/60">{course.title || course.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-primary-50">{course.instructor?.name || "N/A"}</td>
                      <td className="px-4 py-3 text-center text-primary-50">{course.units || course.credits || 0}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-primary-50">
                          {course.enrolledStudents || 0}/{course.maxCapacity || "-"}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary-50 h-2 rounded-full" 
                            style={{ width: `${((course.enrolledStudents || 0) / (course.maxCapacity || 1)) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                          {course.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(course.status)}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="px-3 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80 flex items-center gap-1 mx-auto"
                        >
                          <Eye size={12} />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* No Results */}
            {filteredCourses.length === 0 && (
              <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-6 xs:p-8 text-center">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-primary-50 mb-2">No Courses Found</h3>
                <p className="text-primary-50/60">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </>
        )}

        {/* Course Modal - Shows different content based on active tab */}
        {selectedCourse && activeTab === "manage" && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 xs:p-4">
            <div className="bg-white rounded-lg xs:rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 xs:p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-1">
                      {selectedCourse.code} - {selectedCourse.title || selectedCourse.name}
                    </h2>
                    <p className="text-sm text-primary-50/60">
                      {selectedCourse.instructor?.name || "No teacher assigned"} • {selectedCourse.enrolledStudents || 0} students
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
                        <div className="text-lg font-bold text-primary-50">{selectedCourse.enrolledStudents || 0}</div>
                        <div className="text-xs text-primary-50/60">Students</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary-50">{selectedCourse.passRate || 0}%</div>
                        <div className="text-xs text-primary-50/60">Pass Rate</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary-50">{selectedCourse.resources?.length || 0}</div>
                        <div className="text-xs text-primary-50/60">Materials</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary-50">{selectedCourse.issues || 0}</div>
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
                          <div className="text-xs text-primary-50/60">{selectedCourse.resources?.length || 0} total</div>
                        </div>
                      </button>
                      <button
                        onClick={() => setActionModal("exams")}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <Calendar size={16} className="text-primary-50" />
                        <div>
                          <div className="text-sm font-medium text-primary-50">Manage Exams</div>
                          <div className="text-xs text-primary-50/60">Status: {selectedCourse.status}</div>
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

        {/* Course Details Modal - Catalog View */}
        {selectedCourse && activeTab === "catalog" && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 xs:p-4">
            <div className="bg-white rounded-lg xs:rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 xs:p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-1">
                      {selectedCourse.code} - {selectedCourse.title || selectedCourse.name}
                    </h2>
                    <p className="text-sm text-primary-50/60">
                      {selectedCourse.instructor?.name || "No teacher assigned"} • {selectedCourse.semester || "N/A"}
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

              <div className="p-4 xs:p-6 space-y-4 xs:space-y-6">
                <div>
                  <h3 className="font-semibold text-primary-50 mb-2">Description</h3>
                  <p className="text-sm xs:text-base text-primary-50/70">
                    {selectedCourse.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary-50 mb-2">Syllabus</h3>
                  <p className="text-sm xs:text-base text-primary-50/70">
                    {selectedCourse.syllabus}
                  </p>
                </div>

                <div className="grid grid-cols-2 xs:grid-cols-4 gap-3 xs:gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg xs:text-xl font-bold text-primary-50">
                      {selectedCourse.units || selectedCourse.credits || 0}
                    </div>
                    <div className="text-xs xs:text-sm text-primary-50/60">Units</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg xs:text-xl font-bold text-primary-50">
                      {selectedCourse.enrolledStudents || 0}
                    </div>
                    <div className="text-xs xs:text-sm text-primary-50/60">Enrolled</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg xs:text-xl font-bold text-primary-50">
                      {selectedCourse.maxCapacity || "-"}
                    </div>
                    <div className="text-xs xs:text-sm text-primary-50/60">Capacity</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(selectedCourse.status)}`}>
                      {selectedCourse.status}
                    </div>
                    <div className="text-xs xs:text-sm text-primary-50/60 mt-1">Status</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Course Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 xs:p-4">
            <div className="bg-white rounded-lg xs:rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 xs:p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-1">
                      Create New Course
                    </h2>
                    <p className="text-sm text-primary-50/60">
                      Fill in the course details below
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setNewCourse({
                        code: "",
                        title: "",
                        description: "",
                        instructorId: "",
                        units: 3,
                        level: "Undergraduate" as any,
                        semester: "Fall 2024",
                        maxCapacity: 30,
                        credits: 3
                      });
                    }}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-4 xs:p-6">
                <form className="space-y-4">
                  {/* Course Code and Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Course Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., CS101"
                        value={newCourse.code}
                        onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Course Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Introduction to Programming"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Course description..."
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                      rows={3}
                      required
                    />
                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Units <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={newCourse.units}
                        onChange={(e) => setNewCourse({...newCourse, units: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newCourse.level}
                        onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                        required
                      >
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Graduate">Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Semester <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newCourse.semester}
                        onChange={(e) => setNewCourse({...newCourse, semester: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                        required
                      >
                        <option value="Fall 2024">Fall 2024</option>
                        <option value="Spring 2024">Spring 2024</option>
                        <option value="Summer 2024">Summer 2024</option>
                      </select>
                    </div>
                  </div>

                  {/* Teacher and Max Capacity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Assign Teacher (Optional)
                      </label>
                      <select
                        value={newCourse.instructorId}
                        onChange={(e) => setNewCourse({...newCourse, instructorId: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                      >
                        <option value="">-- Select Teacher --</option>
                        {teachers.map(teacher => (
                          <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Max Capacity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="200"
                        value={newCourse.maxCapacity}
                        onChange={(e) => setNewCourse({...newCourse, maxCapacity: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-4 xs:p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={async () => {
                    try {
                      await createCourse({
                        ...newCourse,
                        category: "General", // Default category
                        departmentId: (courses[0]?.departmentId) || "", // Try to get dept ID from existing courses
                        classCohortId: "default", // Default cohort
                        credits: newCourse.units
                      }).unwrap();
                      toast.success("Course created successfully");
                      setShowCreateModal(false);
                      setNewCourse({
                        code: "",
                        title: "",
                        description: "",
                        instructorId: "",
                        units: 3,
                        level: "Undergraduate" as any,
                        semester: "Fall 2024",
                        maxCapacity: 30,
                        credits: 3
                      });
                    } catch (error: any) {
                      toast.error(error?.data?.message || "Failed to create course");
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80"
                >
                  Create Course
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewCourse({
                      code: "",
                      title: "",
                      description: "",
                      instructorId: "",
                      units: 3,
                      level: "Undergraduate" as any,
                      semester: "Fall 2024",
                      maxCapacity: 30,
                      credits: 3
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
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
                  <select id="teacher-select" className="w-full p-3 border border-gray-300 rounded-lg mb-4">
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
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

              {(actionModal === "materials" || actionModal === "exams" || actionModal === "analytics" || actionModal === "issues") && (
                <>
                  <h3 className="text-lg font-semibold text-primary-50 mb-4">
                    {actionModal === "materials" && "Review Materials"}
                    {actionModal === "exams" && "Manage Exams"}
                    {actionModal === "analytics" && "Course Analytics"}
                    {actionModal === "issues" && "Handle Issues"}
                  </h3>
                  <p className="text-sm text-primary-50/60 mb-4">
                    This feature will be implemented in the full version.
                  </p>
                  <button
                    onClick={() => setActionModal(null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}