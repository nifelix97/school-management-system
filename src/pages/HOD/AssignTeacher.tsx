import { useState } from "react";
import { 
  Search, 
  User, 
  BookOpen, 
  UserCheck, 
  UserX, 
  Eye, 
  MessageSquare,
  Clock,
  Award
} from "lucide-react";

interface Course {
  id: string;
  code: string;
  name: string;
  level: string;
  semester: string;
  units: number;
  teacher?: string;
  status: "Assigned" | "Unassigned";
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  specialization: string;
  qualification: string;
  status: "Active" | "Busy" | "Unavailable";
  workload: number;
  maxWorkload: number;
  experience: number;
  rating: number;
}

export default function AssignTeacher() {
  const [selectedTab, setSelectedTab] = useState<"courses" | "instructors">("courses");
  const [courseSearch, setCourseSearch] = useState("");
  const [teacherSearch, setTeacherSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [teacherFilter, setTeacherFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [reassignReason, setReassignReason] = useState("");

  const courses: Course[] = [
    { id: "1", code: "CS101", name: "Introduction to Programming", level: "Year 1", semester: "Fall 2024", units: 3, status: "Unassigned" },
    { id: "2", code: "CS201", name: "Data Structures", level: "Year 2", semester: "Fall 2024", units: 4, teacher: "Dr. Smith", status: "Assigned" },
    { id: "3", code: "CS301", name: "Machine Learning", level: "Year 3", semester: "Spring 2024", units: 3, status: "Unassigned" }
  ];

  const teachers: Teacher[] = [
    { id: "1", name: "Dr. Smith", email: "smith@university.edu", specialization: "Data Structures", qualification: "PhD Computer Science", status: "Active", workload: 2, maxWorkload: 4, experience: 8, rating: 4.5 },
    { id: "2", name: "Dr. Johnson", email: "johnson@university.edu", specialization: "Machine Learning", qualification: "PhD AI", status: "Busy", workload: 4, maxWorkload: 4, experience: 12, rating: 4.8 },
    { id: "3", name: "Dr. Brown", email: "brown@university.edu", specialization: "Programming", qualification: "PhD Software Engineering", status: "Active", workload: 1, maxWorkload: 4, experience: 5, rating: 4.2 }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(courseSearch.toLowerCase()) || course.code.toLowerCase().includes(courseSearch.toLowerCase());
    const matchesFilter = courseFilter === "all" || course.status === courseFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) || teacher.specialization.toLowerCase().includes(teacherSearch.toLowerCase());
    const matchesFilter = teacherFilter === "all" || teacher.status === teacherFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAssign = () => {
    if (selectedCourse && selectedTeacher) {
      console.log(`Assigning ${selectedTeacher.name} to ${selectedCourse.code}`);
      setShowAssignModal(false);
      setSelectedCourse(null);
      setSelectedTeacher(null);
    }
  };

  const handleUnassign = (courseId: string) => {
    console.log(`Unassigning teacher from course ${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Assign Teachers
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Manage teacher-course assignments for your department
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm mb-4 xs:mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setSelectedTab("courses")}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                selectedTab === "courses" ? "text-primary-50 border-b-2 border-primary-50" : "text-gray-500"
              }`}
            >
              <BookOpen size={16} className="inline mr-2" />
              Courses ({courses.length})
            </button>
            <button
              onClick={() => setSelectedTab("instructors")}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                selectedTab === "instructors" ? "text-primary-50 border-b-2 border-primary-50" : "text-gray-500"
              }`}
            >
              <User size={16} className="inline mr-2" />
              Teachers ({teachers.length})
            </button>
          </div>
        </div>

        {/* Courses Tab */}
        {selectedTab === "courses" && (
          <>
            {/* Course Filters */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4">
                <div className="relative flex-1 sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={16} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                  />
                </div>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                >
                  <option value="all">All Courses</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Unassigned">Unassigned</option>
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
                      <p className="text-xs xs:text-sm text-primary-50/60">
                        {course.level} • {course.semester} • {course.units} units
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      course.status === "Assigned" ? "text-green-600 bg-green-50" : "text-orange-600 bg-orange-50"
                    }`}>
                      {course.status}
                    </span>
                  </div>

                  {course.teacher && (
                    <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
                      <span className="text-primary-50/60">Teacher: </span>
                      <span className="font-medium text-primary-50">{course.teacher}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {course.status === "Unassigned" ? (
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowAssignModal(true);
                        }}
                        className="flex-1 px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 text-sm"
                      >
                        <UserCheck size={14} className="inline mr-1" />
                        Assign
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowAssignModal(true);
                          }}
                          className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                        >
                          Reassign
                        </button>
                        <button
                          onClick={() => handleUnassign(course.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                        >
                          <UserX size={14} />
                        </button>
                      </>
                    )}
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Level</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Semester</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Units</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Teacher</th>
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
                          <div className="text-sm text-primary-50/60">{course.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-primary-50">{course.level}</td>
                      <td className="px-4 py-3 text-primary-50">{course.semester}</td>
                      <td className="px-4 py-3 text-center text-primary-50">{course.units}</td>
                      <td className="px-4 py-3 text-primary-50">{course.teacher || "Not assigned"}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          course.status === "Assigned" ? "text-green-600 bg-green-50" : "text-orange-600 bg-orange-50"
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {course.status === "Unassigned" ? (
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setShowAssignModal(true);
                              }}
                              className="px-3 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80"
                            >
                              Assign
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedCourse(course);
                                  setShowAssignModal(true);
                                }}
                                className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100"
                              >
                                Reassign
                              </button>
                              <button
                                onClick={() => handleUnassign(course.id)}
                                className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100"
                              >
                                <UserX size={12} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Teachers Tab */}
        {selectedTab === "instructors" && (
          <>
            {/* Teacher Filters */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 xs:gap-4">
                <div className="relative flex-1 sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={16} />
                  <input
                    type="text"
                    placeholder="Search teachers..."
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                  />
                </div>
                <select
                  value={teacherFilter}
                  onChange={(e) => setTeacherFilter(e.target.value)}
                  className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Busy">Busy</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>

            {/* Teacher Cards - Mobile */}
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
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      teacher.status === "Active" ? "text-green-600 bg-green-50" :
                      teacher.status === "Busy" ? "text-yellow-600 bg-yellow-50" :
                      "text-red-600 bg-red-50"
                    }`}>
                      {teacher.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                    <div className="flex items-center gap-2 text-primary-50/70">
                      <Clock size={12} />
                      <span>{teacher.workload}/{teacher.maxWorkload} courses</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-50/70">
                      <Award size={12} />
                      <span>{teacher.rating}/5.0 rating</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setShowProfileModal(true);
                    }}
                    className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <Eye size={14} className="inline mr-1" />
                    View Profile
                  </button>
                </div>
              ))}
            </div>

            {/* Teacher Table - Desktop */}
            <div className="hidden lg:block bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Teacher</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Specialization</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Workload</th>
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
                          <div className="text-sm text-primary-50/60">{teacher.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-primary-50">{teacher.specialization}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-primary-50">{teacher.workload}/{teacher.maxWorkload}</div>
                        <div className="text-xs text-primary-50/60">courses</div>
                      </td>
                      <td className="px-4 py-3 text-center text-primary-50">{teacher.rating}/5.0</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          teacher.status === "Active" ? "text-green-600 bg-green-50" :
                          teacher.status === "Busy" ? "text-yellow-600 bg-yellow-50" :
                          "text-red-600 bg-red-50"
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setShowProfileModal(true);
                          }}
                          className="px-3 py-1 border border-primary-50 text-primary-50 rounded text-xs hover:bg-gray-50"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Assignment Modal */}
        {showAssignModal && selectedCourse && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-primary-50">
                  {selectedCourse.teacher ? "Reassign" : "Assign"} Teacher
                </h2>
                <p className="text-sm text-primary-50/60 mt-1">
                  {selectedCourse.code} - {selectedCourse.name}
                </p>
              </div>

              <div className="p-6">
                {selectedCourse.teacher && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      Currently assigned to: <strong>{selectedCourse.teacher}</strong>
                    </p>
                    <textarea
                      placeholder="Reason for reassignment (optional)..."
                      value={reassignReason}
                      onChange={(e) => setReassignReason(e.target.value)}
                      className="w-full mt-2 p-2 border border-yellow-200 rounded text-sm"
                      rows={2}
                    />
                  </div>
                )}

                <h3 className="font-semibold text-primary-50 mb-3">Select Teacher:</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {teachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      onClick={() => setSelectedTeacher(teacher)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedTeacher?.id === teacher.id
                          ? "border-primary-50 bg-primary-50/5"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-primary-50">{teacher.name}</div>
                          <div className="text-sm text-primary-50/60">{teacher.specialization}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-primary-50">{teacher.workload}/{teacher.maxWorkload} courses</div>
                          <div className={`text-xs ${
                            teacher.status === "Active" ? "text-green-600" :
                            teacher.status === "Busy" ? "text-yellow-600" :
                            "text-red-600"
                          }`}>
                            {teacher.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t flex gap-3">
                <button
                  onClick={handleAssign}
                  disabled={!selectedTeacher}
                  className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 disabled:opacity-50"
                >
                  <MessageSquare size={16} className="inline mr-2" />
                  Assign & Notify
                </button>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedCourse(null);
                    setSelectedTeacher(null);
                    setReassignReason("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Teacher Profile Modal */}
        {showProfileModal && selectedTeacher && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-primary-50">{selectedTeacher.name}</h2>
                <p className="text-sm text-primary-50/60">{selectedTeacher.email}</p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-primary-50 mb-2">Qualifications</h3>
                  <p className="text-sm text-primary-50/70">{selectedTeacher.qualification}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary-50 mb-2">Specialization</h3>
                  <p className="text-sm text-primary-50/70">{selectedTeacher.specialization}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-primary-50 mb-1">Experience</h3>
                    <p className="text-sm text-primary-50/70">{selectedTeacher.experience} years</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-50 mb-1">Rating</h3>
                    <p className="text-sm text-primary-50/70">{selectedTeacher.rating}/5.0</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-primary-50 mb-1">Current Workload</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-50 h-2 rounded-full" 
                        style={{ width: `${(selectedTeacher.workload / selectedTeacher.maxWorkload) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-primary-50/70">
                      {selectedTeacher.workload}/{selectedTeacher.maxWorkload}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t">
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setSelectedTeacher(null);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}