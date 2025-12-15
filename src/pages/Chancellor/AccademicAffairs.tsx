import React, { useState } from "react";
import {
    IoAddOutline,
    IoBookOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoDocumentTextOutline,
    IoFilterOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTrendingUpOutline,
    IoWarningOutline,
} from "react-icons/io5";

interface Program {
  id: string;
  name: string;
  department: string;
  level: string;
  students: number;
  faculty: number;
  status: "Active" | "Under Review" | "Pending Approval";
  accreditation: string;
}

interface FacultyMember {
  id: string;
  name: string;
  department: string;
  position: string;
  courses: number;
  students: number;
  rating: number;
}

const AcademicAffair: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"programs" | "faculty" | "performance" | "curriculum">("programs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Mock data for academic programs
  const programs: Program[] = [
    {
      id: "1",
      name: "Computer Science",
      department: "Engineering",
      level: "Bachelor",
      students: 450,
      faculty: 28,
      status: "Active",
      accreditation: "ABET"
    },
    {
      id: "2",
      name: "Business Administration",
      department: "Business",
      level: "Master",
      students: 320,
      faculty: 22,
      status: "Active",
      accreditation: "AACSB"
    },
    {
      id: "3",
      name: "Medicine",
      department: "Health Sciences",
      level: "Doctorate",
      students: 280,
      faculty: 45,
      status: "Active",
      accreditation: "LCME"
    },
    {
      id: "4",
      name: "Civil Engineering",
      department: "Engineering",
      level: "Bachelor",
      students: 380,
      faculty: 25,
      status: "Under Review",
      accreditation: "ABET"
    },
    {
      id: "5",
      name: "Data Science",
      department: "Engineering",
      level: "Master",
      students: 210,
      faculty: 18,
      status: "Pending Approval",
      accreditation: "Pending"
    },
    {
      id: "6",
      name: "Psychology",
      department: "Arts & Sciences",
      level: "Bachelor",
      students: 290,
      faculty: 20,
      status: "Active",
      accreditation: "APA"
    },
  ];

  // Mock data for faculty
  const faculty: FacultyMember[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      department: "Computer Science",
      position: "Professor",
      courses: 3,
      students: 180,
      rating: 4.8
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      department: "Business",
      position: "Associate Professor",
      courses: 4,
      students: 160,
      rating: 4.6
    },
    {
      id: "3",
      name: "Dr. Emily Brown",
      department: "Medicine",
      position: "Professor",
      courses: 2,
      students: 90,
      rating: 4.9
    },
    {
      id: "4",
      name: "Dr. David Wilson",
      department: "Engineering",
      position: "Assistant Professor",
      courses: 3,
      students: 120,
      rating: 4.5
    },
  ];

  // Statistics
  const stats = [
    {
      title: "Total Programs",
      value: "48",
      change: "+3",
      trend: "up" as const,
      icon: <IoSchoolOutline className="w-7 h-7" />,
      gradient: "from-primary-50 to-primary-50/80",
    },
    {
      title: "Active Students",
      value: "12,450",
      change: "+8.5%",
      trend: "up" as const,
      icon: <IoPeopleOutline className="w-7 h-7" />,
      gradient: "from-primary-100 to-primary-100/80",
    },
    {
      title: "Faculty Members",
      value: "847",
      change: "+12",
      trend: "up" as const,
      icon: <IoBookOutline className="w-7 h-7" />,
      gradient: "from-primary-200 to-primary-200/80",
    },
    {
      title: "Avg. Performance",
      value: "87.5%",
      change: "+2.3%",
      trend: "up" as const,
      icon: <IoStatsChartOutline className="w-7 h-7" />,
      gradient: "from-primary-300 to-primary-300/80",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600 border-green-200";
      case "Under Review":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "Pending Approval":
        return "bg-blue-100 text-blue-600 border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || program.level === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Academic Affairs
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage academic programs, faculty, and institutional excellence
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
            <IoAddOutline className="w-5 h-5" />
            New Program
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl text-white shadow-md`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                  <IoTrendingUpOutline className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-primary-50/60 mb-1 font-medium uppercase tracking-wide">
                {stat.title}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary-50">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6 overflow-x-auto animate-[slideUp_0.6s_ease-out]">
        {[
          { id: "programs", label: "Programs", icon: <IoSchoolOutline /> },
          { id: "faculty", label: "Faculty", icon: <IoPeopleOutline /> },
          { id: "performance", label: "Performance", icon: <IoStatsChartOutline /> },
          { id: "curriculum", label: "Curriculum", icon: <IoDocumentTextOutline /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-[scaleIn_0.5s_ease-out]">
        {activeTab === "programs" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <IoFilterOutline className="w-5 h-5 text-primary-50" />
                <h2 className="text-lg font-bold text-primary-50">Filter Programs</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="relative">
                  <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>

                {/* Filter by Level */}
                <div className="flex flex-wrap gap-2">
                  {["all", "Bachelor", "Master", "Doctorate"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedFilter === filter
                          ? "bg-primary-50 text-white shadow-md"
                          : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                      }`}
                    >
                      {filter === "all" ? "All Levels" : filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPrograms.map((program, index) => (
                <div
                  key={program.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-50 mb-1">{program.name}</h3>
                      <p className="text-sm text-primary-50/60">{program.department}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Level:</span>
                      <span className="font-semibold text-primary-50">{program.level}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Students:</span>
                      <span className="font-semibold text-primary-50">{program.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Faculty:</span>
                      <span className="font-semibold text-primary-50">{program.faculty}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Accreditation:</span>
                      <span className="font-semibold text-primary-50">{program.accreditation}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedProgram(program);
                      setIsModalOpen(true);
                    }}
                    className="w-full py-2 bg-gray-100 hover:bg-primary-50 hover:text-white text-primary-50 rounded-lg font-semibold text-sm transition-all"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white rounded-xl shadow-md border border-gray-100 p-4">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IoChevronBackOutline className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-primary-50">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IoChevronForwardOutline className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "faculty" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Faculty Overview</h2>
            <div className="space-y-4">
              {faculty.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all bg-gradient-to-r from-gray-50 to-white"
                >
                  <div className="flex-1 mb-4 sm:mb-0">
                    <h3 className="text-base font-bold text-primary-50 mb-1">{member.name}</h3>
                    <p className="text-sm text-primary-50/60 mb-2">{member.position} • {member.department}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-primary-50/70">
                      <span>{member.courses} Courses</span>
                      <span>•</span>
                      <span>{member.students} Students</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        {member.rating}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary-50 text-white rounded-lg text-sm font-semibold hover:bg-primary-100 transition-colors">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Student Performance Metrics</h2>
              <div className="space-y-4">
                {[
                  { label: "Overall GPA", value: 3.45, max: 4.0, color: "bg-primary-50" },
                  { label: "Graduation Rate", value: 87, max: 100, color: "bg-primary-100" },
                  { label: "Retention Rate", value: 92, max: 100, color: "bg-primary-200" },
                  { label: "Employment Rate", value: 85, max: 100, color: "bg-primary-300" },
                ].map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-primary-50">{metric.label}</span>
                      <span className="text-sm font-bold text-primary-50">
                        {metric.value}{metric.max === 4.0 ? '' : '%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${metric.color} h-full rounded-full transition-all duration-700`}
                        style={{ width: `${(metric.value / metric.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Recent Achievements</h2>
              <div className="space-y-4">
                {[
                  { icon: <IoCheckmarkCircleOutline />, text: "5 new programs accredited", color: "text-green-500" },
                  { icon: <IoTrendingUpOutline />, text: "15% increase in enrollment", color: "text-blue-500" },
                  { icon: <IoWarningOutline />, text: "2 programs under review", color: "text-amber-500" },
                  { icon: <IoCalendarOutline />, text: "Academic year planning complete", color: "text-purple-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={`${item.color} text-2xl`}>{item.icon}</div>
                    <span className="text-sm text-primary-50">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Curriculum Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Pending Reviews", count: 8, color: "from-amber-500 to-amber-600", icon: <IoDocumentTextOutline /> },
                { title: "Approved Updates", count: 15, color: "from-green-500 to-green-600", icon: <IoCheckmarkCircleOutline /> },
                { title: "In Development", count: 5, color: "from-blue-500 to-blue-600", icon: <IoBookOutline /> },
                { title: "Scheduled Reviews", count: 12, color: "from-purple-500 to-purple-600", icon: <IoCalendarOutline /> },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/30"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary-50">{item.count}</div>
                      <div className="text-sm text-primary-50/60">{item.title}</div>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-gray-100 hover:bg-primary-50 hover:text-white text-primary-50 rounded-lg font-semibold text-sm transition-all">
                    View All
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Program Details Modal */}
      {isModalOpen && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedProgram.name}</h2>
                  <p className="text-white/90">{selectedProgram.department}</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <IoCloseOutline className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status and Quick Info */}
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(selectedProgram.status)}`}>
                  {selectedProgram.status}
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-primary-50/10 text-primary-50 border border-primary-50/20">
                  {selectedProgram.level} Degree
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-primary-100/10 text-primary-100 border border-primary-100/20">
                  {selectedProgram.accreditation} Accredited
                </span>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50/5 to-primary-50/10 border border-primary-50/20">
                  <div className="text-3xl font-bold text-primary-50">{selectedProgram.students}</div>
                  <div className="text-sm text-primary-50/70 mt-1">Students</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/5 to-primary-100/10 border border-primary-100/20">
                  <div className="text-3xl font-bold text-primary-100">{selectedProgram.faculty}</div>
                  <div className="text-sm text-primary-50/70 mt-1">Faculty</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary-200/5 to-primary-200/10 border border-primary-200/20">
                  <div className="text-3xl font-bold text-primary-200">4</div>
                  <div className="text-sm text-primary-50/70 mt-1">Years</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary-300/5 to-primary-300/10 border border-primary-300/20">
                  <div className="text-3xl font-bold text-primary-300">120</div>
                  <div className="text-sm text-primary-50/70 mt-1">Credits</div>
                </div>
              </div>

              {/* Program Description */}
              <div>
                <h3 className="text-lg font-bold text-primary-50 mb-3 flex items-center gap-2">
                  <IoDocumentTextOutline className="w-5 h-5" />
                  Program Description
                </h3>
                <p className="text-primary-50/70 leading-relaxed">
                  This comprehensive {selectedProgram.level.toLowerCase()} program in {selectedProgram.name} is designed to provide students with 
                  cutting-edge knowledge and practical skills. The curriculum combines theoretical foundations with hands-on experience, 
                  preparing graduates for successful careers in their field.
                </p>
              </div>

              {/* Core Courses */}
              <div>
                <h3 className="text-lg font-bold text-primary-50 mb-3 flex items-center gap-2">
                  <IoBookOutline className="w-5 h-5" />
                  Core Courses
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Introduction to " + selectedProgram.name,
                    "Advanced Theory and Practice",
                    "Research Methodology",
                    "Professional Ethics",
                    "Capstone Project",
                    "Industry Practicum"
                  ].map((course, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <IoCheckmarkCircleOutline className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-primary-50">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admission Requirements */}
              <div>
                <h3 className="text-lg font-bold text-primary-50 mb-3 flex items-center gap-2">
                  <IoSchoolOutline className="w-5 h-5" />
                  Admission Requirements
                </h3>
                <ul className="space-y-2">
                  {[
                    selectedProgram.level === "Bachelor" ? "High School Diploma or equivalent" : "Bachelor's degree in related field",
                    "Minimum GPA of 3.0",
                    "Letters of recommendation",
                    "Statement of purpose",
                    selectedProgram.level !== "Bachelor" ? "GRE/GMAT scores" : "SAT/ACT scores"
                  ].map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-primary-50/70">
                      <span className="text-primary-100 mt-0.5">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Career Outcomes */}
              <div>
                <h3 className="text-lg font-bold text-primary-50 mb-3 flex items-center gap-2">
                  <IoPeopleOutline className="w-5 h-5" />
                  Career Outcomes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-xs text-green-700 mt-1">Employment Rate</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">$75K</div>
                    <div className="text-xs text-blue-700 mt-1">Avg. Starting Salary</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">95%</div>
                    <div className="text-xs text-purple-700 mt-1">Graduate Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Apply Now
                </button>
                <button className="flex-1 px-4 py-3 bg-gray-100 text-primary-50 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicAffair;
