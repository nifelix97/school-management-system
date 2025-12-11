import {
    Award,
    BookOpen,
    Building2,
    CheckCircle,
    Clock,
    Eye,
    Search,
    Trash2,
    UserPlus,
    Users
} from "lucide-react";
import { useState } from "react";

interface Teacher {
  id: string;
  name: string;
  email: string;
  specialization: string;
  qualification: string;
  status: "Active" | "Busy" | "Unavailable";
  department: string;
  assignedCourses: string[];
  workload: number;
  maxWorkload: number;
  experience: number;
  rating: number;
}

interface Department {
  id: string;
  name: string;
  code: string;
  teacherCount: number;
  hod?: string;
}

interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  level: string;
  semester: string;
  units: number;
  year: string;
  assignedTeacher?: string;
}

export default function AssignTeachers() {
  const [activeTab, setActiveTab] = useState<"departments" | "courses">("departments");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [assignmentType, setAssignmentType] = useState<"department" | "course">("department");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [showCreateDeptModal, setShowCreateDeptModal] = useState(false);
  const [selectedTeacherForCourse, setSelectedTeacherForCourse] = useState("");
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    code: "",
    teacherCount: 0,
    selectedTeachers: [] as string[],
    hod: ""
  });

  const [departments, setDepartments] = useState<Department[]>([
    { id: "1", name: "Computer Science", code: "CS", teacherCount: 12 },
    { id: "2", name: "Mathematics", code: "MATH", teacherCount: 8 },
    { id: "3", name: "Physics", code: "PHY", teacherCount: 6 },
    { id: "4", name: "Engineering", code: "ENG", teacherCount: 10 }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    { id: "1", code: "CS101", name: "Introduction to Programming", department: "Computer Science", level: "Undergraduate", semester: "Fall 2024", units: 3, year: "Year 1", assignedTeacher: "Dr. John Smith" },
    { id: "2", code: "CS201", name: "Data Structures", department: "Computer Science", level: "Undergraduate", semester: "Spring 2024", units: 4, year: "Year 2", assignedTeacher: "Dr. John Smith" },
    { id: "3", code: "MATH101", name: "Calculus I", department: "Mathematics", level: "Undergraduate", semester: "Fall 2024", units: 4, year: "Year 1", assignedTeacher: "Dr. Emily Davis" },
    { id: "4", code: "PHY101", name: "Physics I", department: "Physics", level: "Undergraduate", semester: "Fall 2024", units: 3, year: "Year 1" },
    { id: "5", code: "CS301", name: "Machine Learning", department: "Computer Science", level: "Graduate", semester: "Fall 2024", units: 3, year: "Year 3" },
    { id: "6", code: "CS202", name: "Algorithms", department: "Computer Science", level: "Undergraduate", semester: "Spring 2024", units: 4, year: "Year 2" }
  ]);

  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "1",
      name: "Dr. John Smith",
      email: "john.smith@university.edu",
      specialization: "Data Structures & Algorithms",
      qualification: "PhD Computer Science",
      status: "Active",
      department: "Computer Science",
      assignedCourses: ["CS201"],
      workload: 1,
      maxWorkload: 4,
      experience: 8,
      rating: 4.5
    },
    {
      id: "2",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      specialization: "Machine Learning",
      qualification: "PhD AI",
      status: "Busy",
      department: "Computer Science",
      assignedCourses: ["CS301", "CS401"],
      workload: 2,
      maxWorkload: 3,
      experience: 12,
      rating: 4.8
    },
    {
      id: "3",
      name: "Dr. Michael Brown",
      email: "michael.brown@university.edu",
      specialization: "Programming",
      qualification: "PhD Software Engineering",
      status: "Active",
      department: "Unassigned",
      assignedCourses: [],
      workload: 0,
      maxWorkload: 4,
      experience: 5,
      rating: 4.2
    },
    {
      id: "4",
      name: "Dr. Emily Davis",
      email: "emily.davis@university.edu",
      specialization: "Calculus",
      qualification: "PhD Mathematics",
      status: "Active",
      department: "Mathematics",
      assignedCourses: ["MATH101"],
      workload: 1,
      maxWorkload: 4,
      experience: 10,
      rating: 4.6
    }
  ]);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-600 bg-green-50";
      case "Busy": return "text-yellow-600 bg-yellow-50";
      case "Unavailable": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const handleAssignment = () => {
    if (!selectedTeacher) return;

    if (assignmentType === "department") {
      // Assign to department
      const dept = departments.find(d => d.id === selectedDepartmentId);
      if (dept) {
        setTeachers(prevTeachers =>
          prevTeachers.map(t =>
            t.id === selectedTeacher.id
              ? { ...t, department: dept.name }
              : t
          )
        );
        console.log(`Assigned ${selectedTeacher.name} to ${dept.name}`);
      }
    } else {
      // Assign to course
      const course = courses.find(c => c.id === selectedCourseId);
      if (course && !selectedTeacher.assignedCourses.includes(course.code)) {
        setTeachers(prevTeachers =>
          prevTeachers.map(t =>
            t.id === selectedTeacher.id
              ? {
                  ...t,
                  assignedCourses: [...t.assignedCourses, course.code],
                  workload: t.workload + 1,
                  status: t.workload + 1 >= t.maxWorkload ? "Busy" : t.status
                }
              : t
          )
        );
        console.log(`Assigned ${selectedTeacher.name} to ${course.code}`);
      }
    }

    setShowAssignModal(false);
    setSelectedTeacher(null);
    setSelectedDepartmentId("");
    setSelectedCourseId("");
  };

  const handleRemoveCourse = (teacherId: string, courseCode: string) => {
    setTeachers(prevTeachers =>
      prevTeachers.map(t =>
        t.id === teacherId
          ? {
              ...t,
              assignedCourses: t.assignedCourses.filter(c => c !== courseCode),
              workload: Math.max(0, t.workload - 1),
              status: t.workload - 1 < t.maxWorkload ? "Active" : t.status
            }
          : t
      )
    );
  };

  const handleCreateDepartment = () => {
    if (!newDepartment.name || !newDepartment.code) {
      alert("Please fill in all required fields");
      return;
    }

    const newDept: Department = {
      id: String(departments.length + 1),
      name: newDepartment.name,
      code: newDepartment.code.toUpperCase(),
      teacherCount: newDepartment.selectedTeachers.length,
      hod: newDepartment.hod || undefined
    };

    setDepartments(prev => [...prev, newDept]);
    
    // Assign selected teachers to the new department
    if (newDepartment.selectedTeachers.length > 0) {
      setTeachers(prevTeachers =>
        prevTeachers.map(t =>
          newDepartment.selectedTeachers.includes(t.id)
            ? { ...t, department: newDept.name }
            : t
        )
      );
    }
    
    console.log("Created department:", newDept);
    console.log("Assigned teachers:", newDepartment.selectedTeachers);
    
    setShowCreateDeptModal(false);
    setNewDepartment({ name: "", code: "", teacherCount: 0, selectedTeachers: [], hod: "" });
  };

  const handleCourseAssignment = (courseId: string) => {
    if (!selectedTeacherForCourse) return;

    const teacher = teachers.find(t => t.id === selectedTeacherForCourse);
    const course = courses.find(c => c.id === courseId);
    
    if (!teacher || !course) return;

    // Update course with assigned teacher
    setCourses(prevCourses =>
      prevCourses.map(c =>
        c.id === courseId
          ? { ...c, assignedTeacher: teacher.name }
          : c
      )
    );

    // Update teacher's assigned courses and workload
    if (!teacher.assignedCourses.includes(course.code)) {
      setTeachers(prevTeachers =>
        prevTeachers.map(t =>
          t.id === selectedTeacherForCourse
            ? {
                ...t,
                assignedCourses: [...t.assignedCourses, course.code],
                workload: t.workload + 1,
                status: t.workload + 1 >= t.maxWorkload ? "Busy" : t.status
              }
            : t
        )
      );
    }

    console.log(`Assigned ${course.code} to ${teacher.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Assign Teachers
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Assign teachers to departments and courses
          </p>
        </div>

        {/* Create Department Button */}
        <div className="mb-4 xs:mb-6">
          <button
            onClick={() => setShowCreateDeptModal(true)}
            className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 flex items-center gap-2"
          >
            <Building2 size={16} />
            Create Department
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm mb-4 xs:mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("departments")}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === "departments" ? "text-primary-50 border-b-2 border-primary-50" : "text-gray-500"
              }`}
            >
              <Building2 size={16} className="inline mr-2" />
              Assign to Departments
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === "courses" ? "text-primary-50 border-b-2 border-primary-50" : "text-gray-500"
              }`}
            >
              <BookOpen size={16} className="inline mr-2" />
              Assign to Courses
            </button>
          </div>
        </div>

        {/* Department Assignment Tab */}
        {activeTab === "departments" && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4">
                <div className="relative flex-1 sm:max-w-md">
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
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                  <option value="Unassigned">Unassigned</option>
                </select>
              </div>
            </div>

            {/* Teachers List */}
            <div className="space-y-4">
          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3 xs:space-y-4">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-primary-50 text-sm xs:text-base">
                      {teacher.name}
                    </h3>
                    <p className="text-xs xs:text-sm text-primary-50/60">{teacher.specialization}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(teacher.status)}`}>
                    {teacher.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                  <div className="flex items-center gap-2 text-primary-50/70">
                    <Building2 size={12} />
                    <span>{teacher.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-50/70">
                    <Clock size={12} />
                    <span>{teacher.workload}/{teacher.maxWorkload} courses</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-50/70">
                    <Award size={12} />
                    <span>{teacher.rating}/5.0</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-50/70">
                    <Users size={12} />
                    <span>{teacher.experience} yrs exp</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setAssignmentType(activeTab === "departments" ? "department" : "course");
                      setShowAssignModal(true);
                    }}
                    className="flex-1 px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 text-sm flex items-center justify-center gap-1"
                  >
                    <UserPlus size={14} />
                    Assign
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setShowViewModal(true);
                    }}
                    className="px-3 py-2 border border-primary-50 text-primary-50 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Teacher</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Department</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Workload</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Courses</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Rating</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-primary-50">{teacher.name}</div>
                        <div className="text-sm text-primary-50/60">{teacher.specialization}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-primary-50">{teacher.department}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="text-primary-50">{teacher.workload}/{teacher.maxWorkload}</div>
                      <div className="text-xs text-primary-50/60">courses</div>
                    </td>
                    <td className="px-4 py-3 text-center text-primary-50">{teacher.assignedCourses.length}</td>
                    <td className="px-4 py-3 text-center text-primary-50">{teacher.rating}/5.0</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(teacher.status)}`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setAssignmentType(activeTab === "departments" ? "department" : "course");
                            setShowAssignModal(true);
                          }}
                          className="px-3 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80"
                        >
                          Assign
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setShowViewModal(true);
                          }}
                          className="px-3 py-1 border border-primary-50 text-primary-50 rounded text-xs hover:bg-gray-50"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {/* Course Assignment Tab */}
        {activeTab === "courses" && (
          <>
            {/* Teacher Selection */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
              <div className="max-w-xl">
                <label className="block text-sm xs:text-base font-medium text-primary-50 mb-2">
                  Select Teacher
                </label>
                <select
                  value={selectedTeacherForCourse}
                  onChange={(e) => setSelectedTeacherForCourse(e.target.value)}
                  className="w-full px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 sm:py-3 border border-primary-50 rounded-lg text-xs xs:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-50"
                >
                  <option value="">-- Select Teacher --</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id} className="text-xs xs:text-sm sm:text-base">
                      {teacher.name} ({teacher.workload}/{teacher.maxWorkload})
                    </option>
                  ))}
                </select>
                <p className="text-xs xs:text-sm text-primary-50/60 mt-2">
                  Select a teacher to view and assign courses
                </p>
              </div>
            </div>

            {/* Courses List */}
            {selectedTeacherForCourse && (
              <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-primary-50">
                    Assign Courses to {teachers.find(t => t.id === selectedTeacherForCourse)?.name}
                  </h3>
                  <p className="text-sm text-primary-50/60">
                    Select courses to assign to this teacher
                  </p>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden p-4 space-y-3">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-primary-50 text-sm">{course.code}</h4>
                          <p className="text-xs text-primary-50/60">{course.name}</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                          {course.year}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-primary-50/70 mb-3">
                        <div>Department: {course.department}</div>
                        <div>Units: {course.units}</div>
                      </div>
                      {course.assignedTeacher ? (
                        <div className="text-xs text-green-600 mb-2">
                          Assigned to: {course.assignedTeacher}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500 mb-2">Not assigned</div>
                      )}
                      <button
                        onClick={() => handleCourseAssignment(course.id)}
                        className="w-full px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={course.assignedTeacher === teachers.find(t => t.id === selectedTeacherForCourse)?.name}
                      >
                        {course.assignedTeacher === teachers.find(t => t.id === selectedTeacherForCourse)?.name
                          ? "Already Assigned"
                          : "Assign Course"}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Course Code</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Course Name</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Year</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Units</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Department</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Assigned To</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {courses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-primary-50">{course.code}</td>
                          <td className="px-4 py-3 text-primary-50">{course.name}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                              {course.year}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-primary-50">{course.units}</td>
                          <td className="px-4 py-3 text-center text-primary-50">{course.department}</td>
                          <td className="px-4 py-3 text-center">
                            {course.assignedTeacher ? (
                              <span className="text-sm text-green-600">{course.assignedTeacher}</span>
                            ) : (
                              <span className="text-sm text-gray-500">Not assigned</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleCourseAssignment(course.id)}
                              className="px-3 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed"
                              disabled={course.assignedTeacher === teachers.find(t => t.id === selectedTeacherForCourse)?.name}
                            >
                              {course.assignedTeacher === teachers.find(t => t.id === selectedTeacherForCourse)?.name
                                ? "Assigned"
                                : "Assign"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!selectedTeacherForCourse && (
              <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-8 text-center">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-primary-50 mb-2">Select a Teacher</h3>
                <p className="text-primary-50/60">
                  Please select a teacher from the dropdown above to assign courses
                </p>
              </div>
            )}
          </>
        )}

        {/* Assignment Modal */}
        {showAssignModal && selectedTeacher && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-primary-50">
                  {assignmentType === "department" ? "Assign to Department" : "Assign to Course"}
                </h2>
                <p className="text-sm text-primary-50/60 mt-1">
                  {selectedTeacher.name}
                </p>
              </div>

              <div className="p-6">
                {assignmentType === "department" ? (
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Select Department
                    </label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={selectedDepartmentId}
                      onChange={(e) => setSelectedDepartmentId(e.target.value)}
                    >
                      <option value="">-- Select Department --</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Select Course
                    </label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg mb-3"
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                    >
                      <option value="">-- Select Course --</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.code} - {course.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-primary-50/60">
                      Teacher can be assigned to multiple courses
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t flex gap-3">
                <button
                  onClick={handleAssignment}
                  className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80"
                >
                  <CheckCircle size={16} className="inline mr-2" />
                  Confirm Assignment
                </button>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedTeacher(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Teacher Modal */}
        {showViewModal && selectedTeacher && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-primary-50">{selectedTeacher.name}</h2>
                    <p className="text-sm text-primary-50/60">{selectedTeacher.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setSelectedTeacher(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-primary-50/60">Department</div>
                    <div className="font-medium text-primary-50">{selectedTeacher.department}</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-50/60">Qualification</div>
                    <div className="font-medium text-primary-50">{selectedTeacher.qualification}</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-50/60">Specialization</div>
                    <div className="font-medium text-primary-50">{selectedTeacher.specialization}</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-50/60">Experience</div>
                    <div className="font-medium text-primary-50">{selectedTeacher.experience} years</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-50/60">Workload</div>
                    <div className="font-medium text-primary-50">{selectedTeacher.workload}/{selectedTeacher.maxWorkload} courses</div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-50/60">Rating</div>
                    <div className="font-medium text-primary-50">{selectedTeacher.rating}/5.0</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-primary-50 mb-2">Assigned Courses</h3>
                  {selectedTeacher.assignedCourses.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTeacher.assignedCourses.map((courseCode, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                          <span className="text-sm text-primary-50">{courseCode}</span>
                          <button 
                            onClick={() => handleRemoveCourse(selectedTeacher.id, courseCode)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-primary-50/60 italic">No courses assigned yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Create Department Modal */}
        {showCreateDeptModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-2xl w-full">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-primary-50">Create New Department</h2>
                  <button
                    onClick={() => {
                      setShowCreateDeptModal(false);
                      setNewDepartment({ name: "", code: "", teacherCount: 0, selectedTeachers: [], hod: "" });
                    }}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCreateDepartment}
                    className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80"
                  >
                    <CheckCircle size={16} className="inline mr-2" />
                    Create Department
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateDeptModal(false);
                      setNewDepartment({ name: "", code: "", teacherCount: 0, selectedTeachers: [], hod: "" });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Department Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Computer Science"
                        value={newDepartment.name}
                        onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Department Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., CS"
                        value={newDepartment.code}
                        onChange={(e) => setNewDepartment({...newDepartment, code: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Head of Department (Optional)
                      </label>
                      <select
                        value={newDepartment.hod}
                        onChange={(e) => setNewDepartment({...newDepartment, hod: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                      >
                        <option value="">-- Select HOD --</option>
                        {teachers.map(teacher => (
                          <option key={teacher.id} value={teacher.name}>
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Assign Teacher (Optional)
                      </label>
                      <select
                        value={newDepartment.selectedTeachers[0] || ""}
                        onChange={(e) => {
                          const teacherId = e.target.value;
                          setNewDepartment({
                            ...newDepartment, 
                            selectedTeachers: teacherId ? [teacherId] : []
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                      >
                        <option value="">-- Select Teacher --</option>
                        {teachers.filter(t => t.department === "Unassigned").map(teacher => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
