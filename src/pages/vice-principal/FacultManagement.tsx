import React, { useState } from "react";
import {
    IoAddOutline,
    IoCallOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoGridOutline,
    IoListOutline,
    IoMailOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

interface Faculty {
  id: string;
  name: string;
  hodName: string;
  hodEmail: string;
  hodPhone: string;
  hodImage: string;
  totalStaff: number;
  professors: number;
  associateProfessors: number;
  assistantProfessors: number;
  lecturers: number;
  students: number;
  courses: number;
  researchProjects: number;
  status: "excellent" | "good" | "needs-attention";
  budget: number;
  performance: number;
  trend: "up" | "down" | "stable";
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  facultyId: string;
  facultyName: string;
  position: "Professor" | "Associate Professor" | "Assistant Professor" | "Lecturer";
  specialization: string;
  yearsOfService: number;
  publications: number;
  status: "active" | "on-leave" | "sabbatical";
}

const FacultyManagement: React.FC = () => {
  const [activeView, setActiveView] = useState<"overview" | "faculties" | "staff" | "analytics">("overview");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterPosition, setFilterPosition] = useState<string>("all");

  // Mock data - in a real app, this would come from an API
  const faculties: Faculty[] = [
    {
      id: "1",
      name: "Faculty of Engineering",
      hodName: "Dr. Emily Rodriguez",
      hodEmail: "e.rodriguez@university.edu",
      hodPhone: "+1 (555) 123-4567",
      hodImage: "https://i.pravatar.cc/150?img=5",
      totalStaff: 42,
      professors: 12,
      associateProfessors: 15,
      assistantProfessors: 10,
      lecturers: 5,
      students: 580,
      courses: 68,
      researchProjects: 24,
      status: "excellent",
      budget: 2500000,
      performance: 92,
      trend: "up",
    },
    {
      id: "2",
      name: "Faculty of Computer Science",
      hodName: "Dr. Sarah Johnson",
      hodEmail: "s.johnson@university.edu",
      hodPhone: "+1 (555) 234-5678",
      hodImage: "https://i.pravatar.cc/150?img=10",
      totalStaff: 28,
      professors: 8,
      associateProfessors: 10,
      assistantProfessors: 7,
      lecturers: 3,
      students: 450,
      courses: 42,
      researchProjects: 18,
      status: "excellent",
      budget: 1800000,
      performance: 88,
      trend: "up",
    },
    {
      id: "3",
      name: "Faculty of Business Administration",
      hodName: "Prof. Michael Chen",
      hodEmail: "m.chen@university.edu",
      hodPhone: "+1 (555) 345-6789",
      hodImage: "https://i.pravatar.cc/150?img=12",
      totalStaff: 35,
      professors: 10,
      associateProfessors: 12,
      assistantProfessors: 9,
      lecturers: 4,
      students: 620,
      courses: 56,
      researchProjects: 15,
      status: "good",
      budget: 2000000,
      performance: 82,
      trend: "up",
    },
    {
      id: "4",
      name: "Faculty of Natural Sciences",
      hodName: "Dr. Lisa Anderson",
      hodEmail: "l.anderson@university.edu",
      hodPhone: "+1 (555) 456-7890",
      hodImage: "https://i.pravatar.cc/150?img=20",
      totalStaff: 31,
      professors: 9,
      associateProfessors: 11,
      assistantProfessors: 8,
      lecturers: 3,
      students: 410,
      courses: 48,
      researchProjects: 22,
      status: "excellent",
      budget: 2200000,
      performance: 90,
      trend: "up",
    },
    {
      id: "5",
      name: "Faculty of Arts & Humanities",
      hodName: "Prof. David Williams",
      hodEmail: "d.williams@university.edu",
      hodPhone: "+1 (555) 567-8901",
      hodImage: "https://i.pravatar.cc/150?img=33",
      totalStaff: 22,
      professors: 6,
      associateProfessors: 8,
      assistantProfessors: 6,
      lecturers: 2,
      students: 340,
      courses: 38,
      researchProjects: 10,
      status: "needs-attention",
      budget: 1500000,
      performance: 75,
      trend: "down",
    },
    {
      id: "6",
      name: "Faculty of Social Sciences",
      hodName: "Prof. James Taylor",
      hodEmail: "j.taylor@university.edu",
      hodPhone: "+1 (555) 678-9012",
      hodImage: "https://i.pravatar.cc/150?img=14",
      totalStaff: 26,
      professors: 7,
      associateProfessors: 9,
      assistantProfessors: 7,
      lecturers: 3,
      students: 380,
      courses: 44,
      researchProjects: 12,
      status: "good",
      budget: 1700000,
      performance: 78,
      trend: "stable",
    },
  ];

  const staffMembers: StaffMember[] = [
    { id: "1", name: "Dr. Robert Smith", email: "r.smith@university.edu", phone: "+1 (555) 111-2222", facultyId: "1", facultyName: "Faculty of Engineering", position: "Professor", specialization: "Mechanical Engineering", yearsOfService: 15, publications: 45, status: "active" },
    { id: "2", name: "Dr. Jennifer Brown", email: "j.brown@university.edu", phone: "+1 (555) 222-3333", facultyId: "2", facultyName: "Faculty of Computer Science", position: "Associate Professor", specialization: "Artificial Intelligence", yearsOfService: 8, publications: 32, status: "active" },
    { id: "3", name: "Dr. William Davis", email: "w.davis@university.edu", phone: "+1 (555) 333-4444", facultyId: "1", facultyName: "Faculty of Engineering", position: "Professor", specialization: "Civil Engineering", yearsOfService: 20, publications: 68, status: "active" },
    { id: "4", name: "Dr. Maria Garcia", email: "m.garcia@university.edu", phone: "+1 (555) 444-5555", facultyId: "3", facultyName: "Faculty of Business Administration", position: "Assistant Professor", specialization: "Marketing", yearsOfService: 5, publications: 18, status: "active" },
    { id: "5", name: "Dr. Thomas Wilson", email: "t.wilson@university.edu", phone: "+1 (555) 555-6666", facultyId: "4", facultyName: "Faculty of Natural Sciences", position: "Professor", specialization: "Physics", yearsOfService: 18, publications: 52, status: "sabbatical" },
    { id: "6", name: "Dr. Patricia Martinez", email: "p.martinez@university.edu", phone: "+1 (555) 666-7777", facultyId: "2", facultyName: "Faculty of Computer Science", position: "Lecturer", specialization: "Software Engineering", yearsOfService: 3, publications: 8, status: "active" },
  ];

  const filteredFaculties = selectedFaculty === "all"
    ? faculties
    : faculties.filter(faculty => faculty.id === selectedFaculty);

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = searchQuery === "" ||
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPosition = filterPosition === "all" || staff.position === filterPosition;
    const matchesFaculty = selectedFaculty === "all" || staff.facultyId === selectedFaculty;

    return matchesSearch && matchesPosition && matchesFaculty;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-50 text-green-600 border-green-200";
      case "good": return "bg-blue-50 text-blue-600 border-blue-200";
      case "needs-attention": return "bg-amber-50 text-amber-600 border-amber-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStaffStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-50 text-green-600 border-green-200";
      case "on-leave": return "bg-amber-50 text-amber-600 border-amber-200";
      case "sabbatical": return "bg-blue-50 text-blue-600 border-blue-200";
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

  const totalStaff = faculties.reduce((acc, faculty) => acc + faculty.totalStaff, 0);
  const totalStudents = faculties.reduce((acc, faculty) => acc + faculty.students, 0);
  const avgPerformance = Math.round(faculties.reduce((acc, faculty) => acc + faculty.performance, 0) / faculties.length);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Faculty Management
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage faculties, heads of departments, and academic staff
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md border border-gray-200">
              <IoDownloadOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2 shadow-md">
              <IoAddOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Add Staff</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-primary-50/10 text-primary-50">
              <IoSchoolOutline className="w-6 h-6" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{faculties.length}</div>
          <div className="text-sm font-semibold text-primary-50/70">Total Faculties</div>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-primary-100/10 text-primary-100">
              <IoPeopleOutline className="w-6 h-6" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{totalStaff}</div>
          <div className="text-sm font-semibold text-primary-50/70">Academic Staff</div>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-primary-200/10 text-primary-200">
              <IoPersonOutline className="w-6 h-6" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{totalStudents.toLocaleString()}</div>
          <div className="text-sm font-semibold text-primary-50/70">Total Students</div>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-primary-300/10 text-primary-300">
              <IoStatsChartOutline className="w-6 h-6" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{avgPerformance}%</div>
          <div className="text-sm font-semibold text-primary-50/70">Avg Performance</div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex flex-wrap gap-1 mb-6">
        {[
          { id: "overview", label: "Overview", icon: <IoGridOutline /> },
          { id: "faculties", label: "Faculties", icon: <IoSchoolOutline /> },
          { id: "staff", label: "Staff Directory", icon: <IoPeopleOutline /> },
          { id: "analytics", label: "Analytics", icon: <IoStatsChartOutline /> },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
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
          {/* Faculty List */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Faculty Overview</h2>
            <div className="space-y-6">
              {faculties.map((faculty, index) => (
                <div key={faculty.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0 animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={faculty.hodImage}
                      alt={faculty.hodName}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-primary-50/20"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                        <div>
                          <h3 className="font-bold text-primary-50 text-lg">{faculty.name}</h3>
                          <p className="text-sm text-primary-50/70">Head: {faculty.hodName}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(faculty.status)}`}>
                          {faculty.status.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-primary-50/60 mb-3">
                        <span className="flex items-center gap-1">
                          <IoPeopleOutline className="w-4 h-4" />
                          {faculty.totalStaff} staff
                        </span>
                        <span className="flex items-center gap-1">
                          <IoPersonOutline className="w-4 h-4" />
                          {faculty.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <IoDocumentTextOutline className="w-4 h-4" />
                          {faculty.courses} courses
                        </span>
                        <span className="flex items-center gap-1">
                          <IoStatsChartOutline className="w-4 h-4" />
                          {faculty.researchProjects} projects
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-primary-50/70">Performance</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary-50">{faculty.performance}%</span>
                          {getTrendIcon(faculty.trend)}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-linear-to-r ${getPerformanceColor(faculty.performance)} transition-all duration-500`}
                          style={{ width: `${faculty.performance}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HOD Quick Contact */}
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">HOD Quick Contact</h2>
              <div className="space-y-4">
                {faculties.slice(0, 4).map((faculty, index) => (
                  <div key={faculty.id} className="p-4 rounded-xl border border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100 + 300}ms` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={faculty.hodImage}
                        alt={faculty.hodName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-primary-50 text-sm truncate">{faculty.hodName}</h4>
                        <p className="text-xs text-primary-50/60 truncate">{faculty.name}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <a href={`mailto:${faculty.hodEmail}`} className="flex items-center gap-2 text-xs text-primary-50/70 hover:text-primary-50 transition-colors">
                        <IoMailOutline className="w-4 h-4 shrink-0" />
                        <span className="truncate">{faculty.hodEmail}</span>
                      </a>
                      <a href={`tel:${faculty.hodPhone}`} className="flex items-center gap-2 text-xs text-primary-50/70 hover:text-primary-50 transition-colors">
                        <IoCallOutline className="w-4 h-4 shrink-0" />
                        <span>{faculty.hodPhone}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff Distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">Staff Distribution</h2>
              <div className="space-y-4">
                {[
                  { label: "Professors", count: faculties.reduce((acc, f) => acc + f.professors, 0), color: "primary-50" },
                  { label: "Associate Professors", count: faculties.reduce((acc, f) => acc + f.associateProfessors, 0), color: "primary-100" },
                  { label: "Assistant Professors", count: faculties.reduce((acc, f) => acc + f.assistantProfessors, 0), color: "primary-200" },
                  { label: "Lecturers", count: faculties.reduce((acc, f) => acc + f.lecturers, 0), color: "primary-300" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-primary-50/70">{item.label}</span>
                      <span className="text-sm font-bold text-primary-50">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-${item.color}`}
                        style={{ width: `${(item.count / totalStaff) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Faculties View */}
      {activeView === "faculties" && (
        <div>
          {/* Faculty Filter */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap flex-1">
              <button
                onClick={() => setSelectedFaculty("all")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedFaculty === "all"
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                All Faculties
              </button>
              {faculties.map((faculty) => (
                <button
                  key={faculty.id}
                  onClick={() => setSelectedFaculty(faculty.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedFaculty === faculty.id
                      ? "bg-primary-50 text-white shadow-md"
                      : "bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {faculty.name.replace("Faculty of ", "")}
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

          {/* Faculty Cards */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredFaculties.map((faculty, index) => (
              <div key={faculty.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[scaleIn_0.4s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
                {/* HOD Info */}
                <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-100">
                  <img
                    src={faculty.hodImage}
                    alt={faculty.hodName}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-primary-50/20"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-primary-50 mb-1">{faculty.name}</h3>
                    <p className="text-sm text-primary-50/70 mb-2">HOD: {faculty.hodName}</p>
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(faculty.status)}`}>
                      {faculty.status.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <a href={`mailto:${faculty.hodEmail}`} className="flex items-center gap-2 text-sm text-primary-50/70 hover:text-primary-50 transition-colors">
                    <IoMailOutline className="w-4 h-4 shrink-0" />
                    <span className="truncate">{faculty.hodEmail}</span>
                  </a>
                  <a href={`tel:${faculty.hodPhone}`} className="flex items-center gap-2 text-sm text-primary-50/70 hover:text-primary-50 transition-colors">
                    <IoCallOutline className="w-4 h-4 shrink-0" />
                    <span>{faculty.hodPhone}</span>
                  </a>
                </div>

                {/* Performance */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary-50/70">Performance Score</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary-50">{faculty.performance}%</span>
                      {getTrendIcon(faculty.trend)}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${getPerformanceColor(faculty.performance)} transition-all duration-500`}
                      style={{ width: `${faculty.performance}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-primary-50/60 mb-1">Total Staff</div>
                    <div className="text-lg font-bold text-primary-50">{faculty.totalStaff}</div>
                  </div>
                  <div>
                    <div className="text-xs text-primary-50/60 mb-1">Students</div>
                    <div className="text-lg font-bold text-primary-50">{faculty.students}</div>
                  </div>
                  <div>
                    <div className="text-xs text-primary-50/60 mb-1">Courses</div>
                    <div className="text-lg font-bold text-primary-50">{faculty.courses}</div>
                  </div>
                  <div>
                    <div className="text-xs text-primary-50/60 mb-1">Research</div>
                    <div className="text-lg font-bold text-primary-50">{faculty.researchProjects}</div>
                  </div>
                </div>

                {/* Staff Breakdown */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs font-semibold text-primary-50/70 mb-3">Staff Composition</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-primary-50/60">Professors</span>
                      <span className="font-semibold text-primary-50">{faculty.professors}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-50/60">Associates</span>
                      <span className="font-semibold text-primary-50">{faculty.associateProfessors}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-50/60">Assistants</span>
                      <span className="font-semibold text-primary-50">{faculty.assistantProfessors}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-50/60">Lecturers</span>
                      <span className="font-semibold text-primary-50">{faculty.lecturers}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff Directory View */}
      {activeView === "staff" && (
        <div>
          {/* Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
              <input
                type="text"
                placeholder="Search staff by name, email, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white shadow-sm"
              />
            </div>

            {/* Position Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterPosition("all")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterPosition === "all"
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                All Positions
              </button>
              {["Professor", "Associate Professor", "Assistant Professor", "Lecturer"].map((position) => (
                <button
                  key={position}
                  onClick={() => setFilterPosition(position)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    filterPosition === position
                      ? "bg-primary-50 text-white shadow-md"
                      : "bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {position}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredStaff.map((staff, index) => (
              <div key={staff.id} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-primary-50 text-lg">{staff.name}</h3>
                    <p className="text-sm text-primary-50/70 mt-1">{staff.position}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStaffStatusColor(staff.status)}`}>
                    {staff.status.replace("-", " ").toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-50/60">Faculty</span>
                    <span className="text-sm font-semibold text-primary-50">{staff.facultyName.replace("Faculty of ", "")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-50/60">Specialization</span>
                    <span className="text-sm font-semibold text-primary-50">{staff.specialization}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-50/60">Experience</span>
                    <span className="text-sm font-semibold text-primary-50">{staff.yearsOfService} years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-50/60">Publications</span>
                    <span className="text-sm font-semibold text-primary-50">{staff.publications}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <a href={`mailto:${staff.email}`} className="flex items-center gap-2 text-sm text-primary-50/70 hover:text-primary-50 transition-colors">
                      <IoMailOutline className="w-4 h-4 shrink-0" />
                      <span className="truncate">{staff.email}</span>
                    </a>
                    <a href={`tel:${staff.phone}`} className="flex items-center gap-2 text-sm text-primary-50/70 hover:text-primary-50 transition-colors">
                      <IoCallOutline className="w-4 h-4 shrink-0" />
                      <span>{staff.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-[fadeIn_0.5s_ease-out_both]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Staff Member</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Faculty</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Specialization</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Publications</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStaff.map((staff, index) => (
                    <tr key={staff.id} className="hover:bg-gray-50 transition-colors animate-[slideUp_0.4s_ease-out_both]" style={{ animationDelay: `${index * 50}ms` }}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-primary-50">{staff.name}</div>
                          <a href={`mailto:${staff.email}`} className="text-sm text-primary-50/70 hover:text-primary-50">{staff.email}</a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-primary-50/70">{staff.facultyName.replace("Faculty of ", "")}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-primary-50">{staff.position}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-primary-50/70">{staff.specialization}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-primary-50">{staff.yearsOfService} yrs</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-primary-50">{staff.publications}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStaffStatusColor(staff.status)}`}>
                          {staff.status.replace("-", " ").toUpperCase()}
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

      {/* Analytics View */}
      {activeView === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Faculty Performance Comparison */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Faculty Performance</h2>
            <div className="space-y-5">
              {faculties.map((faculty, index) => (
                <div key={faculty.id} className="animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary-50 text-sm">{faculty.name.replace("Faculty of ", "")}</span>
                      {getTrendIcon(faculty.trend)}
                    </div>
                    <span className="text-sm font-bold text-primary-50">{faculty.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${getPerformanceColor(faculty.performance)} transition-all duration-500`}
                      style={{ width: `${faculty.performance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff-to-Student Ratio */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-bold text-primary-50 mb-6">Staff-to-Student Ratio</h2>
            <div className="space-y-4">
              {faculties.map((faculty, index) => {
                const ratio = Math.round(faculty.students / faculty.totalStaff);
                return (
                  <div key={faculty.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100 animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100 + 200}ms` }}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-primary-50 text-sm">{faculty.name.replace("Faculty of ", "")}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ratio <= 15 ? "bg-green-50 text-green-600" :
                        ratio <= 20 ? "bg-blue-50 text-blue-600" :
                        ratio <= 25 ? "bg-amber-50 text-amber-600" :
                        "bg-red-50 text-red-600"
                      }`}>
                        {ratio}:1
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-primary-50/60">Staff: </span>
                        <span className="font-semibold text-primary-50">{faculty.totalStaff}</span>
                      </div>
                      <div>
                        <span className="text-primary-50/60">Students: </span>
                        <span className="font-semibold text-primary-50">{faculty.students}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Research Output */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "400ms" }}>
            <h2 className="text-xl font-bold text-primary-50 mb-6">Research Projects by Faculty</h2>
            <div className="space-y-4">
              {faculties
                .sort((a, b) => b.researchProjects - a.researchProjects)
                .map((faculty, index) => (
                  <div key={faculty.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100 + 400}ms` }}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-gray-100 text-gray-700" :
                      index === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-blue-50 text-blue-600"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary-50 text-sm">{faculty.name.replace("Faculty of ", "")}</h4>
                      <p className="text-xs text-primary-50/60">HOD: {faculty.hodName}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary-50">{faculty.researchProjects}</div>
                      <div className="text-xs text-primary-50/60">Projects</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Budget Allocation */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "600ms" }}>
            <h2 className="text-xl font-bold text-primary-50 mb-6">Budget Allocation</h2>
            <div className="space-y-4">
              {faculties
                .sort((a, b) => b.budget - a.budget)
                .map((faculty, index) => {
                  const totalBudget = faculties.reduce((acc, f) => acc + f.budget, 0);
                  const percentage = Math.round((faculty.budget / totalBudget) * 100);
                  return (
                    <div key={faculty.id} className="animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100 + 600}ms` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-primary-50 text-sm">{faculty.name.replace("Faculty of ", "")}</span>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary-50">${(faculty.budget / 1000000).toFixed(1)}M</div>
                          <div className="text-xs text-primary-50/60">{percentage}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary-50 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyManagement;
