import { useState } from "react";
import { Search, BookOpen, Users, Clock, Award, Eye } from "lucide-react";

interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  syllabus: string;
  units: number;
  level: string;
  semester: string;
  teacher: string;
  status: string;
  enrolledStudents: number;
  maxCapacity: number;
}

export default function DepartmentCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: "1",
      code: "CS101",
      name: "Introduction to Programming",
      description: "Basic programming concepts using Python. Covers variables, loops, functions, and object-oriented programming.",
      syllabus: "Week 1-2: Variables and Data Types, Week 3-4: Control Structures, Week 5-6: Functions, Week 7-8: OOP Concepts",
      units: 3,
      level: "Undergraduate",
      semester: "Fall 2024",
      teacher: "Dr. Smith",
      status: "Active",
      enrolledStudents: 45,
      maxCapacity: 50
    },
    {
      id: "2",
      code: "CS201",
      name: "Data Structures",
      description: "Advanced data structures and algorithms. Arrays, linked lists, trees, graphs, and their applications.",
      syllabus: "Week 1-2: Arrays and Lists, Week 3-4: Stacks and Queues, Week 5-6: Trees, Week 7-8: Graphs and Algorithms",
      units: 4,
      level: "Undergraduate",
      semester: "Spring 2024",
      teacher: "Dr. Johnson",
      status: "Active",
      enrolledStudents: 38,
      maxCapacity: 40
    },
    {
      id: "3",
      code: "CS301",
      name: "Machine Learning",
      description: "Introduction to machine learning algorithms and applications. Supervised and unsupervised learning.",
      syllabus: "Week 1-2: ML Fundamentals, Week 3-4: Supervised Learning, Week 5-6: Unsupervised Learning, Week 7-8: Neural Networks",
      units: 3,
      level: "Graduate",
      semester: "Fall 2024",
      teacher: "Dr. Brown",
      status: "Active",
      enrolledStudents: 25,
      maxCapacity: 30
    },
    {
      id: "4",
      code: "CS401",
      name: "Advanced Algorithms",
      description: "Complex algorithmic techniques and analysis. Dynamic programming, graph algorithms, and optimization.",
      syllabus: "Week 1-2: Algorithm Analysis, Week 3-4: Dynamic Programming, Week 5-6: Graph Algorithms, Week 7-8: Optimization",
      units: 4,
      level: "Graduate",
      semester: "Spring 2024",
      teacher: "Dr. Davis",
      status: "Inactive",
      enrolledStudents: 15,
      maxCapacity: 25
    }
  ];

  const teachers = [...new Set(courses.map(c => c.teacher))];
  const semesters = [...new Set(courses.map(c => c.semester))];
  const levels = [...new Set(courses.map(c => c.level))];
  const statuses = [...new Set(courses.map(c => c.status))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === "all" || course.semester === selectedSemester;
    const matchesTeacher = selectedTeacher === "all" || course.teacher === selectedTeacher;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;

    return matchesSearch && matchesSemester && matchesTeacher && matchesLevel && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-600 bg-green-50";
      case "Inactive": return "text-red-600 bg-red-50";
      case "Pending": return "text-yellow-600 bg-yellow-50";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Department Courses
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Manage and view all courses in your department
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 xs:gap-4">
            {/* Search */}
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

            {/* Filter Dropdowns */}
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
                {teachers.map(teacher => (
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2 xs:px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
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
                    {course.name}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs xs:text-sm text-primary-50/70">
                  <Users size={14} />
                  <span>{course.enrolledStudents}/{course.maxCapacity}</span>
                </div>
                <div className="flex items-center gap-2 text-xs xs:text-sm text-primary-50/70">
                  <Clock size={14} />
                  <span>{course.units} units</span>
                </div>
                <div className="flex items-center gap-2 text-xs xs:text-sm text-primary-50/70">
                  <Award size={14} />
                  <span>{course.teacher}</span>
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
                      <div className="text-sm text-primary-50/60">{course.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-primary-50">{course.teacher}</td>
                  <td className="px-4 py-3 text-center text-primary-50">{course.units}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="text-primary-50">
                      {course.enrolledStudents}/{course.maxCapacity}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary-50 h-2 rounded-full" 
                        style={{ width: `${(course.enrolledStudents / course.maxCapacity) * 100}%` }}
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

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 xs:p-4">
            <div className="bg-white rounded-lg xs:rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 xs:p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg xs:text-xl font-bold text-primary-50 mb-1">
                      {selectedCourse.code} - {selectedCourse.name}
                    </h2>
                    <p className="text-sm text-primary-50/60">
                      {selectedCourse.teacher} • {selectedCourse.semester}
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
                      {selectedCourse.units}
                    </div>
                    <div className="text-xs xs:text-sm text-primary-50/60">Units</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg xs:text-xl font-bold text-primary-50">
                      {selectedCourse.enrolledStudents}
                    </div>
                    <div className="text-xs xs:text-sm text-primary-50/60">Enrolled</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg xs:text-xl font-bold text-primary-50">
                      {selectedCourse.maxCapacity}
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
      </div>
    </div>
  );
}