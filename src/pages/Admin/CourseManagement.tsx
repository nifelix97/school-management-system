import React, { useState } from "react";
import {
    IoAddOutline,
    IoBookOutline,
    IoCloseOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoLayersOutline,
    IoPencilOutline,
    IoPersonOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  department: string;
  instructor: string;
  credits: number;
  capacity: number;
  enrolled: number;
  schedule: string;
  semester: string;
  status: "active" | "inactive" | "completed";
}

const CoursesManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Mock course data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      courseCode: "CS101",
      courseName: "Introduction to Programming",
      department: "Computer Science",
      instructor: "Dr. Sarah Johnson",
      credits: 3,
      capacity: 40,
      enrolled: 35,
      schedule: "Mon/Wed 9:00-10:30",
      semester: "Fall 2024",
      status: "active",
    },
    {
      id: "2",
      courseCode: "ENG201",
      courseName: "Mechanical Design",
      department: "Engineering",
      instructor: "Prof. Michael Chen",
      credits: 4,
      capacity: 30,
      enrolled: 28,
      schedule: "Tue/Thu 14:00-16:00",
      semester: "Fall 2024",
      status: "active",
    },
    {
      id: "3",
      courseCode: "BUS301",
      courseName: "Marketing Strategies",
      department: "Business",
      instructor: "Dr. Emily Williams",
      credits: 3,
      capacity: 50,
      enrolled: 42,
      schedule: "Mon/Wed/Fri 11:00-12:00",
      semester: "Fall 2024",
      status: "active",
    },
    {
      id: "4",
      courseCode: "MED401",
      courseName: "Clinical Practice",
      department: "Medicine",
      instructor: "Prof. James Anderson",
      credits: 5,
      capacity: 20,
      enrolled: 18,
      schedule: "Mon-Fri 8:00-12:00",
      semester: "Fall 2024",
      status: "active",
    },
    {
      id: "5",
      courseCode: "ART101",
      courseName: "Digital Art Fundamentals",
      department: "Arts",
      instructor: "Dr. Lisa Martinez",
      credits: 2,
      capacity: 25,
      enrolled: 25,
      schedule: "Wed/Fri 15:00-17:00",
      semester: "Spring 2024",
      status: "completed",
    },
  ]);

  const [formData, setFormData] = useState<Partial<Course>>({
    courseCode: "",
    courseName: "",
    department: "",
    instructor: "",
    credits: 3,
    capacity: 30,
    schedule: "",
    semester: "",
    status: "active",
  });

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" || course.department === filterDepartment;

    const matchesStatus = filterStatus === "all" || course.status === filterStatus;

    const matchesSemester = filterSemester === "all" || course.semester === filterSemester;

    return matchesSearch && matchesDepartment && matchesStatus && matchesSemester;
  });

  // Calculate statistics
  const totalCourses = courses.length;
  const activeCourses = courses.filter((c) => c.status === "active").length;
  const totalEnrolled = courses.reduce((sum, c) => sum + c.enrolled, 0);
  const averageEnrollment = (
    (courses.reduce((sum, c) => sum + (c.enrolled / c.capacity) * 100, 0) / courses.length) || 0
  ).toFixed(0);

  const handleAddCourse = () => {
    setModalMode("add");
    setFormData({
      courseCode: "",
      courseName: "",
      department: "",
      instructor: "",
      credits: 3,
      capacity: 30,
      schedule: "",
      semester: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEditCourse = (course: Course) => {
    setModalMode("edit");
    setSelectedCourse(course);
    setFormData(course);
    setShowModal(true);
  };

  const handleViewCourse = (course: Course) => {
    setModalMode("view");
    setSelectedCourse(course);
    setFormData(course);
    setShowModal(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== courseId));
    }
  };

  const handleSaveCourse = () => {
    if (modalMode === "add") {
      const newCourse: Course = {
        id: String(courses.length + 1),
        enrolled: 0,
        ...formData,
      } as Course;
      setCourses([...courses, newCourse]);
    } else if (modalMode === "edit" && selectedCourse) {
      setCourses(
        courses.map((c) => (c.id === selectedCourse.id ? { ...c, ...formData } : c))
      );
    }
    setShowModal(false);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = [
      "Course Code",
      "Course Name",
      "Department",
      "Instructor",
      "Credits",
      "Capacity",
      "Enrolled",
      "Enrollment %",
      "Schedule",
      "Semester",
      "Status",
    ];

    const csvRows = [
      headers.join(","),
      ...filteredCourses.map((course) =>
        [
          course.courseCode,
          `"${course.courseName}"`,
          course.department,
          `"${course.instructor}"`,
          course.credits,
          course.capacity,
          course.enrolled,
          `${((course.enrolled / course.capacity) * 100).toFixed(1)}%`,
          `"${course.schedule}"`,
          course.semester,
          course.status,
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const dataBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `courses_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary-300/20 text-primary-300";
      case "inactive":
        return "bg-primary-200/20 text-primary-200";
      case "completed":
        return "bg-primary-50/20 text-primary-50";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getEnrollmentColor = (percentage: number) => {
    if (percentage >= 90) return "text-primary-200";
    if (percentage >= 70) return "text-primary-300";
    return "text-primary-100";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          Course Management
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Manage courses, schedules, and enrollments
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Total Courses</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-50">{totalCourses}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Active Courses</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-300">{activeCourses}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Total Enrolled</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-100">{totalEnrolled}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Avg Enrollment</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-200">{averageEnrollment}%</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col gap-4">
          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
              <input
                type="text"
                placeholder="Search by course name, code, or instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex-1 xs:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 border border-primary-100 text-primary-100 rounded-lg hover:bg-primary-100/10 transition-colors text-sm sm:text-base"
              >
                <IoDownloadOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Export</span>
              </button>
              <button
                onClick={handleAddCourse}
                className="flex-1 xs:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                <IoAddOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Add Course</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="relative">
              <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Medicine">Medicine</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
            <div className="relative">
              <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <select
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
              >
                <option value="all">All Semesters</option>
                <option value="Fall 2024">Fall 2024</option>
                <option value="Spring 2024">Spring 2024</option>
                <option value="Summer 2024">Summer 2024</option>
              </select>
            </div>
            <div className="relative">
              <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Table/Cards */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Code
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Course Name
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Department
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Instructor
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Credits
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Enrollment
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-right py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => {
                const enrollmentPercentage = (course.enrolled / course.capacity) * 100;
                return (
                  <tr
                    key={course.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-primary-50">
                      {course.courseCode}
                    </td>
                    <td className="py-4 px-4 text-sm text-primary-50">{course.courseName}</td>
                    <td className="py-4 px-4 text-sm text-primary-50">{course.department}</td>
                    <td className="py-4 px-4 text-sm text-primary-50/70">{course.instructor}</td>
                    <td className="py-4 px-4 text-sm font-semibold text-primary-50">
                      {course.credits}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm font-semibold text-primary-50">
                        {course.enrolled}/{course.capacity}
                      </div>
                      <div
                        className={`text-xs font-medium ${getEnrollmentColor(
                          enrollmentPercentage
                        )}`}
                      >
                        {enrollmentPercentage.toFixed(0)}%
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          course.status
                        )}`}
                      >
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewCourse(course)}
                          className="p-2 text-primary-50 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <IoEyeOutline className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="p-2 text-primary-100 hover:bg-primary-100/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <IoPencilOutline className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 text-primary-200 hover:bg-primary-200/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <IoTrashOutline className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden divide-y divide-gray-100">
          {filteredCourses.map((course) => {
            const enrollmentPercentage = (course.enrolled / course.capacity) * 100;
            return (
              <div key={course.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-primary-50 mb-1">{course.courseName}</div>
                    <div className="text-xs text-primary-50/60">{course.courseCode}</div>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      course.status
                    )}`}
                  >
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm mb-3">
                  <div className="flex items-center gap-2 text-primary-50/70">
                    <IoSchoolOutline className="w-4 h-4" />
                    {course.department}
                  </div>
                  <div className="flex items-center gap-2 text-primary-50/70">
                    <IoPersonOutline className="w-4 h-4" />
                    {course.instructor}
                  </div>
                  <div className="flex items-center gap-2 text-primary-50/70">
                    <IoTimeOutline className="w-4 h-4" />
                    {course.schedule}
                  </div>
                  <div className="flex items-center gap-2 text-primary-50">
                    <IoLayersOutline className="w-4 h-4" />
                    <span className="font-medium">{course.credits} Credits</span>
                    <span className="text-primary-50/60">• {course.semester}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-50 font-semibold">
                      {course.enrolled}/{course.capacity} enrolled
                    </span>
                    <span
                      className={`font-medium ${getEnrollmentColor(enrollmentPercentage)}`}
                    >
                      ({enrollmentPercentage.toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewCourse(course)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <IoEyeOutline className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    <IoPencilOutline className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="flex items-center justify-center px-3 py-2 border border-primary-200 text-primary-200 rounded-lg hover:bg-primary-200/10 transition-colors text-sm"
                  >
                    <IoTrashOutline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-primary-50/60">
            No courses found matching your criteria
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary-50">
                {modalMode === "add"
                  ? "Add New Course"
                  : modalMode === "edit"
                  ? "Edit Course"
                  : "Course Details"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-primary-50/60 hover:text-primary-50 transition-colors"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Course Code"
                  type="text"
                  value={formData.courseCode}
                  onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoBookOutline className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Course Name"
                  type="text"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoBookOutline className="w-4 h-4" />}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    disabled={modalMode === "view"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-gray-50 disabled:opacity-60"
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>
                <Input
                  label="Instructor"
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoPersonOutline className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Credits"
                  type="number"
                  value={String(formData.credits)}
                  onChange={(e) =>
                    setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })
                  }
                  disabled={modalMode === "view"}
                  leftIcon={<IoLayersOutline className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Capacity"
                  type="number"
                  value={String(formData.capacity)}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })
                  }
                  disabled={modalMode === "view"}
                  leftIcon={<IoSchoolOutline className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Schedule"
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoTimeOutline className="w-4 h-4" />}
                  placeholder="e.g., Mon/Wed 9:00-10:30"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    disabled={modalMode === "view"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-gray-50 disabled:opacity-60"
                  >
                    <option value="">Select Semester</option>
                    <option value="Fall 2024">Fall 2024</option>
                    <option value="Spring 2024">Spring 2024</option>
                    <option value="Summer 2024">Summer 2024</option>
                  </select>
                </div>
                {modalMode !== "add" && (
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as any })
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-gray-50 disabled:opacity-60"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            {modalMode !== "view" && (
              <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 border border-gray-300 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCourse}
                  className="px-6 py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {modalMode === "add" ? "Add Course" : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesManagement;
