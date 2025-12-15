import React, { useState } from "react";
import {
    IoAddOutline,
    IoBookOutline,
    IoCheckmarkCircleOutline,
    IoDownloadOutline,
    IoFilterOutline,
    IoGridOutline,
    IoListOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWarningOutline
} from "react-icons/io5";

interface Department {
  id: string;
  name: string;
  head: string;
  students: number;
  faculty: number;
  courses: number;
  performance: number;
  status: "excellent" | "good" | "needs-attention" | "critical";
  trend: "up" | "down" | "stable";
}

interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  instructor: string;
  students: number;
  credits: number;
  semester: string;
  completionRate: number;
  averageGrade: number;
}

interface AcademicMetric {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "stable";
  icon: React.ReactNode;
  color: string;
}

const AcademicOversight: React.FC = () => {
  const [activeView, setActiveView] = useState<"overview" | "departments" | "courses" | "performance">("overview");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data - in a real app, this would come from an API
  const departments: Department[] = [
    {
      id: "1",
      name: "Computer Science",
      head: "Dr. Sarah Johnson",
      students: 450,
      faculty: 28,
      courses: 42,
      performance: 88,
      status: "excellent",
      trend: "up",
    },
    {
      id: "2",
      name: "Business Administration",
      head: "Prof. Michael Chen",
      students: 620,
      faculty: 35,
      courses: 56,
      performance: 82,
      status: "good",
      trend: "up",
    },
    {
      id: "3",
      name: "Engineering",
      head: "Dr. Emily Rodriguez",
      students: 580,
      faculty: 42,
      courses: 68,
      performance: 85,
      status: "excellent",
      trend: "stable",
    },
    {
      id: "4",
      name: "Arts & Humanities",
      head: "Prof. David Williams",
      students: 340,
      faculty: 22,
      courses: 38,
      performance: 75,
      status: "needs-attention",
      trend: "down",
    },
    {
      id: "5",
      name: "Natural Sciences",
      head: "Dr. Lisa Anderson",
      students: 410,
      faculty: 31,
      courses: 48,
      performance: 90,
      status: "excellent",
      trend: "up",
    },
    {
      id: "6",
      name: "Social Sciences",
      head: "Prof. James Taylor",
      students: 380,
      faculty: 26,
      courses: 44,
      performance: 78,
      status: "good",
      trend: "stable",
    },
  ];

  const courses: Course[] = [
    { id: "1", code: "CS301", name: "Data Structures & Algorithms", department: "Computer Science", instructor: "Dr. Smith", students: 85, credits: 4, semester: "Fall 2025", completionRate: 92, averageGrade: 3.6 },
    { id: "2", code: "BUS201", name: "Financial Accounting", department: "Business Administration", instructor: "Prof. Brown", students: 120, credits: 3, semester: "Fall 2025", completionRate: 88, averageGrade: 3.4 },
    { id: "3", code: "ENG401", name: "Advanced Thermodynamics", department: "Engineering", instructor: "Dr. Wilson", students: 65, credits: 4, semester: "Fall 2025", completionRate: 85, averageGrade: 3.5 },
    { id: "4", code: "ART101", name: "Introduction to Fine Arts", department: "Arts & Humanities", instructor: "Prof. Davis", students: 95, credits: 3, semester: "Fall 2025", completionRate: 94, averageGrade: 3.7 },
    { id: "5", code: "PHY302", name: "Quantum Mechanics", department: "Natural Sciences", instructor: "Dr. Martinez", students: 55, credits: 4, semester: "Fall 2025", completionRate: 90, averageGrade: 3.8 },
    { id: "6", code: "SOC201", name: "Social Psychology", department: "Social Sciences", instructor: "Prof. Garcia", students: 110, credits: 3, semester: "Fall 2025", completionRate: 91, averageGrade: 3.5 },
  ];

  const metrics: AcademicMetric[] = [
    {
      label: "Total Students",
      value: "2,780",
      change: 8.5,
      trend: "up",
      icon: <IoPeopleOutline className="w-6 h-6" />,
      color: "primary-50",
    },
    {
      label: "Active Courses",
      value: "296",
      change: 5.2,
      trend: "up",
      icon: <IoBookOutline className="w-6 h-6" />,
      color: "primary-100",
    },
    {
      label: "Faculty Members",
      value: "184",
      change: 3.1,
      trend: "up",
      icon: <IoSchoolOutline className="w-6 h-6" />,
      color: "primary-200",
    },
    {
      label: "Avg Performance",
      value: "83%",
      change: 2.4,
      trend: "up",
      icon: <IoStatsChartOutline className="w-6 h-6" />,
      color: "primary-300",
    },
  ];

  const filteredDepartments = selectedDepartment === "all"
    ? departments
    : departments.filter(dept => dept.id === selectedDepartment);

  const filteredCourses = searchQuery
    ? courses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courses;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-50 text-green-600 border-green-200";
      case "good": return "bg-blue-50 text-blue-600 border-blue-200";
      case "needs-attention": return "bg-amber-50 text-amber-600 border-amber-200";
      case "critical": return "bg-red-50 text-red-600 border-red-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <IoTrendingUpOutline className="w-4 h-4 text-green-500" />;
      case "down": return <IoTrendingDownOutline className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 border-t-2 border-gray-400" />;
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 85) return "from-green-500 to-emerald-500";
    if (performance >= 75) return "from-blue-500 to-cyan-500";
    if (performance >= 65) return "from-amber-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Academic Oversight
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Comprehensive view of academic performance and departmental metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md border border-gray-200">
              <IoDownloadOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Export Report</span>
            </button>
            <button className="px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2 shadow-md">
              <IoAddOutline className="w-5 h-5" />
              <span className="hidden sm:inline">New Course</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-${metric.color}/10 text-${metric.color}`}>
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-gray-600"}`}>
                {metric.trend === "up" ? "+" : metric.trend === "down" ? "-" : ""}
                {Math.abs(metric.change)}%
                {getTrendIcon(metric.trend)}
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{metric.value}</div>
            <div className="text-sm font-semibold text-primary-50/70">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex flex-wrap gap-1 mb-6">
        {[
          { id: "overview", label: "Overview", icon: <IoGridOutline /> },
          { id: "departments", label: "Departments", icon: <IoSchoolOutline /> },
          { id: "courses", label: "Courses", icon: <IoBookOutline /> },
          { id: "performance", label: "Performance", icon: <IoStatsChartOutline /> },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeView === view.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            {view.icon}
            {view.label}
          </button>
        ))}
      </div>

      {/* Overview View */}
      {activeView === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Performance */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary-50">Department Performance</h2>
              <button className="text-primary-50 hover:text-primary-100 transition-colors">
                <IoFilterOutline className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-5">
              {departments.map((dept) => (
                <div key={dept.id} className="border-b border-gray-100 last:border-0 pb-5 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-primary-50">{dept.name}</h3>
                        <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${getStatusColor(dept.status)}`}>
                          {dept.status.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-primary-50/60">
                        <span className="flex items-center gap-1">
                          <IoPeopleOutline className="w-4 h-4" />
                          {dept.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <IoSchoolOutline className="w-4 h-4" />
                          {dept.faculty} faculty
                        </span>
                        <span className="flex items-center gap-1">
                          <IoBookOutline className="w-4 h-4" />
                          {dept.courses} courses
                        </span>
                        <span className="flex items-center gap-1">
                          Head: {dept.head}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-primary-50">{dept.performance}%</div>
                      <div className="flex items-center gap-1 text-xs text-primary-50/60">
                        Performance {getTrendIcon(dept.trend)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${getPerformanceColor(dept.performance)} transition-all duration-500`}
                      style={{ width: `${dept.performance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats & Alerts */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">Recent Alerts</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="flex items-start gap-3">
                    <IoWarningOutline className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 text-sm mb-1">Low Enrollment</h4>
                      <p className="text-xs text-amber-700">Arts & Humanities department showing declining enrollment trend</p>
                      <span className="text-xs text-amber-600 mt-1 inline-block">2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <IoCheckmarkCircleOutline className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm mb-1">Accreditation Renewed</h4>
                      <p className="text-xs text-blue-700">Engineering program successfully renewed accreditation</p>
                      <span className="text-xs text-blue-600 mt-1 inline-block">1 day ago</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-start gap-3">
                    <IoTrendingUpOutline className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 text-sm mb-1">Performance Improvement</h4>
                      <p className="text-xs text-green-700">Natural Sciences showing 12% increase in student outcomes</p>
                      <span className="text-xs text-green-600 mt-1 inline-block">3 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">Upcoming Reviews</h2>
              <div className="space-y-3">
                {[
                  { dept: "Computer Science", date: "Dec 15, 2025", type: "Curriculum Review" },
                  { dept: "Business Admin", date: "Dec 20, 2025", type: "Faculty Evaluation" },
                  { dept: "Engineering", date: "Jan 5, 2026", type: "Program Assessment" },
                ].map((review, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-primary-50 text-sm">{review.dept}</h4>
                      <span className="text-xs text-primary-50/60">{review.date}</span>
                    </div>
                    <p className="text-xs text-primary-50/70">{review.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Departments View */}
      {activeView === "departments" && (
        <div>
          {/* Department Filter */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap flex-1">
              <button
                onClick={() => setSelectedDepartment("all")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedDepartment === "all"
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                All Departments
              </button>
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedDepartment === dept.id
                      ? "bg-primary-50 text-white shadow-md"
                      : "bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <IoGridOutline className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <IoListOutline className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Department Cards */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredDepartments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary-50/10 text-primary-50">
                      <IoSchoolOutline className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary-50">{dept.name}</h3>
                      <p className="text-xs text-primary-50/60">{dept.head}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(dept.status)}`}>
                    {dept.status.replace("-", " ").toUpperCase()}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary-50/70">Performance Score</span>
                    <span className="text-sm font-bold text-primary-50">{dept.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${getPerformanceColor(dept.performance)} transition-all duration-500`}
                      style={{ width: `${dept.performance}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary-50">{dept.students}</div>
                    <div className="text-xs text-primary-50/60">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary-50">{dept.faculty}</div>
                    <div className="text-xs text-primary-50/60">Faculty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary-50">{dept.courses}</div>
                    <div className="text-xs text-primary-50/60">Courses</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Courses View */}
      {activeView === "courses" && (
        <div>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
              <input
                type="text"
                placeholder="Search courses by name, code, or instructor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-primary-50 text-lg">{course.code}</h3>
                    <p className="text-sm text-primary-50/70 mt-1">{course.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    course.averageGrade >= 3.5 ? "bg-green-50 text-green-600" :
                    course.averageGrade >= 3.0 ? "bg-blue-50 text-blue-600" :
                    course.averageGrade >= 2.5 ? "bg-amber-50 text-amber-600" :
                    "bg-red-50 text-red-600"
                  }`}>
                    {course.averageGrade.toFixed(1)} GPA
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-50/60">Department</span>
                    <span className="text-sm font-semibold text-primary-50">{course.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-50/60">Instructor</span>
                    <span className="text-sm font-semibold text-primary-50">{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-50/60">Students</span>
                    <span className="text-sm font-semibold text-primary-50">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-50/60">Credits</span>
                    <span className="text-sm font-semibold text-primary-50">{course.credits}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary-50/60">Completion Rate</span>
                      <span className="text-sm font-semibold text-primary-50">{course.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-primary-50 to-primary-100"
                        style={{ width: `${course.completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Instructor</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Students</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Credits</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Completion</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Avg Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-primary-50">{course.code}</div>
                          <div className="text-sm text-primary-50/70">{course.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-primary-50/70">{course.department}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-primary-50/70">{course.instructor}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-primary-50">{course.students}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-primary-50">{course.credits}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-linear-to-r from-primary-50 to-primary-100"
                              style={{ width: `${course.completionRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-primary-50">{course.completionRate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          course.averageGrade >= 3.5 ? "bg-green-50 text-green-600" :
                          course.averageGrade >= 3.0 ? "bg-blue-50 text-blue-600" :
                          course.averageGrade >= 2.5 ? "bg-amber-50 text-amber-600" :
                          "bg-red-50 text-red-600"
                        }`}>
                          {course.averageGrade.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Performance View */}
      {activeView === "performance" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Performance Trends</h2>
            <div className="space-y-6">
              {departments.map((dept) => (
                <div key={dept.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary-50 text-sm">{dept.name}</span>
                      {getTrendIcon(dept.trend)}
                    </div>
                    <span className="text-sm font-bold text-primary-50">{dept.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${getPerformanceColor(dept.performance)} transition-all duration-500`}
                      style={{ width: `${dept.performance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Courses */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Top Performing Courses</h2>
            <div className="space-y-4">
              {courses
                .sort((a, b) => b.averageGrade - a.averageGrade)
                .slice(0, 6)
                .map((course, index) => (
                  <div key={course.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-gray-100 text-gray-700" :
                      index === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-blue-50 text-blue-600"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary-50 text-sm">{course.code} - {course.name}</h4>
                      <p className="text-xs text-primary-50/60">{course.instructor}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary-50">{course.averageGrade.toFixed(1)}</div>
                      <div className="text-xs text-primary-50/60">GPA</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Completion Rates */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Course Completion Rates</h2>
            <div className="space-y-4">
              {courses
                .sort((a, b) => b.completionRate - a.completionRate)
                .map((course) => (
                  <div key={course.id} className="p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-primary-50 text-sm">{course.code}</h4>
                      <span className="text-sm font-bold text-primary-50">{course.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-primary-50 to-primary-100 transition-all duration-500"
                        style={{ width: `${course.completionRate}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Department Comparison */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Department Comparison</h2>
            <div className="space-y-6">
              {departments.map((dept) => (
                <div key={dept.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <h3 className="font-bold text-primary-50 mb-3">{dept.name}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-primary-50/60 mb-1">Students</div>
                      <div className="text-lg font-bold text-primary-50">{dept.students}</div>
                    </div>
                    <div>
                      <div className="text-xs text-primary-50/60 mb-1">Faculty</div>
                      <div className="text-lg font-bold text-primary-50">{dept.faculty}</div>
                    </div>
                    <div>
                      <div className="text-xs text-primary-50/60 mb-1">Ratio</div>
                      <div className="text-lg font-bold text-primary-50">{Math.round(dept.students / dept.faculty)}:1</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicOversight;
