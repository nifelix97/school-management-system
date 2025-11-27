import React, { useState } from "react";
import {
    IoAddOutline,
    IoCallOutline,
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

interface Department {
  id: string;
  name: string;
  faculty: string;
  headName: string;
  headEmail: string;
  headPhone: string;
  headImage: string;
  staffCount: number;
  studentCount: number;
  coursesCount: number;
  budget: number;
  performance: number;
  status: "excellent" | "good" | "needs-attention" | "critical";
  trend: "up" | "down" | "stable";
  appointmentDate: string;
  yearsInRole: number;
}

const DepartmentsHeads: React.FC = () => {
  const [activeView, setActiveView] = useState<"overview" | "list" | "performance">("overview");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data
  const departments: Department[] = [
    {
      id: "1",
      name: "Computer Science",
      faculty: "Engineering",
      headName: "Dr. Alan Turing",
      headEmail: "a.turing@university.edu",
      headPhone: "+1 (555) 010-1010",
      headImage: "https://i.pravatar.cc/150?img=11",
      staffCount: 25,
      studentCount: 450,
      coursesCount: 30,
      budget: 1200000,
      performance: 94,
      status: "excellent",
      trend: "up",
      appointmentDate: "2020-09-01",
      yearsInRole: 5,
    },
    {
      id: "2",
      name: "Mechanical Engineering",
      faculty: "Engineering",
      headName: "Dr. Nikola Tesla",
      headEmail: "n.tesla@university.edu",
      headPhone: "+1 (555) 020-2020",
      headImage: "https://i.pravatar.cc/150?img=12",
      staffCount: 20,
      studentCount: 380,
      coursesCount: 25,
      budget: 1100000,
      performance: 88,
      status: "good",
      trend: "stable",
      appointmentDate: "2019-01-15",
      yearsInRole: 6,
    },
    {
      id: "3",
      name: "Business Administration",
      faculty: "Business",
      headName: "Prof. Grace Hopper",
      headEmail: "g.hopper@university.edu",
      headPhone: "+1 (555) 030-3030",
      headImage: "https://i.pravatar.cc/150?img=5",
      staffCount: 18,
      studentCount: 500,
      coursesCount: 35,
      budget: 950000,
      performance: 91,
      status: "excellent",
      trend: "up",
      appointmentDate: "2021-08-20",
      yearsInRole: 4,
    },
    {
      id: "4",
      name: "Psychology",
      faculty: "Social Sciences",
      headName: "Dr. Sigmund Freud",
      headEmail: "s.freud@university.edu",
      headPhone: "+1 (555) 040-4040",
      headImage: "https://i.pravatar.cc/150?img=8",
      staffCount: 15,
      studentCount: 320,
      coursesCount: 20,
      budget: 750000,
      performance: 85,
      status: "good",
      trend: "down",
      appointmentDate: "2018-05-10",
      yearsInRole: 7,
    },
    {
      id: "5",
      name: "Physics",
      faculty: "Natural Sciences",
      headName: "Dr. Marie Curie",
      headEmail: "m.curie@university.edu",
      headPhone: "+1 (555) 050-5050",
      headImage: "https://i.pravatar.cc/150?img=9",
      staffCount: 22,
      studentCount: 280,
      coursesCount: 28,
      budget: 1300000,
      performance: 96,
      status: "excellent",
      trend: "up",
      appointmentDate: "2022-01-05",
      yearsInRole: 3,
    },
    {
      id: "6",
      name: "History",
      faculty: "Arts & Humanities",
      headName: "Prof. Herodotus",
      headEmail: "herodotus@university.edu",
      headPhone: "+1 (555) 060-6060",
      headImage: "https://i.pravatar.cc/150?img=3",
      staffCount: 12,
      studentCount: 200,
      coursesCount: 18,
      budget: 600000,
      performance: 78,
      status: "needs-attention",
      trend: "stable",
      appointmentDate: "2023-09-01",
      yearsInRole: 2,
    },
  ];

  const faculties = Array.from(new Set(departments.map((d) => d.faculty)));

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.headName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFaculty = selectedFaculty === "all" || dept.faculty === selectedFaculty;
    return matchesSearch && matchesFaculty;
  });

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
    if (performance >= 90) return "from-green-500 to-emerald-500";
    if (performance >= 80) return "from-blue-500 to-cyan-500";
    if (performance >= 70) return "from-amber-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  const totalStaff = departments.reduce((acc, d) => acc + d.staffCount, 0);
  const totalStudents = departments.reduce((acc, d) => acc + d.studentCount, 0);
  const avgPerformance = Math.round(departments.reduce((acc, d) => acc + d.performance, 0) / departments.length);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out_both]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Departments & Heads
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Overview of university departments and leadership
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md border border-gray-200">
              <IoDownloadOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Export Report</span>
            </button>
            <button className="px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2 shadow-md">
              <IoAddOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Add Department</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { Icon: IoSchoolOutline, label: "Departments", value: departments.length, color: "primary-50" },
          { Icon: IoPeopleOutline, label: "Total Staff", value: totalStaff, color: "primary-100" },
          { Icon: IoPersonOutline, label: "Total Students", value: totalStudents.toLocaleString(), color: "primary-200" },
          { Icon: IoStatsChartOutline, label: "Avg Performance", value: `${avgPerformance}%`, color: "primary-300" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color}`}>
                <stat.Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{stat.value}</div>
            <div className="text-sm font-semibold text-primary-50/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex flex-wrap gap-1 mb-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
        {[
          { id: "overview", label: "Overview", icon: <IoGridOutline /> },
          { id: "list", label: "Department List", icon: <IoListOutline /> },
          { id: "performance", label: "Performance", icon: <IoStatsChartOutline /> },
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
          {/* Top Departments */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Top Performing Departments</h2>
            <div className="space-y-6">
              {departments
                .sort((a, b) => b.performance - a.performance)
                .slice(0, 5)
                .map((dept, index) => (
                  <div key={dept.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0 animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={dept.headImage}
                        alt={dept.headName}
                        className="w-14 h-14 rounded-xl object-cover border-2 border-primary-50/20"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                          <div>
                            <h3 className="font-bold text-primary-50 text-lg">{dept.name}</h3>
                            <p className="text-sm text-primary-50/70">Head: {dept.headName}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(dept.status)}`}>
                            {dept.status.replace("-", " ").toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-primary-50/70">Performance</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-primary-50">{dept.performance}%</span>
                            {getTrendIcon(dept.trend)}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-linear-to-r ${getPerformanceColor(dept.performance)} transition-all duration-500`}
                            style={{ width: `${dept.performance}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">Department Status</h2>
              <div className="space-y-4">
                {[
                  { label: "Excellent", count: departments.filter(d => d.status === "excellent").length, color: "green-500" },
                  { label: "Good", count: departments.filter(d => d.status === "good").length, color: "blue-500" },
                  { label: "Needs Attention", count: departments.filter(d => d.status === "needs-attention").length, color: "amber-500" },
                  { label: "Critical", count: departments.filter(d => d.status === "critical").length, color: "red-500" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${idx * 100 + 200}ms` }}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${item.color}`} />
                      <span className="text-sm font-semibold text-primary-50/70">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-primary-50">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">Recent Appointments</h2>
              <div className="space-y-4">
                {departments
                  .sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime())
                  .slice(0, 3)
                  .map((dept, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${idx * 100 + 400}ms` }}>
                      <img src={dept.headImage} alt={dept.headName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="font-semibold text-primary-50 text-sm">{dept.headName}</h4>
                        <p className="text-xs text-primary-50/60">{dept.name}</p>
                        <p className="text-[10px] text-primary-50/50 mt-0.5">Appointed: {dept.appointmentDate}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {activeView === "list" && (
        <div>
          {/* Filters */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap animate-[fadeIn_0.5s_ease-out_both]">
            <div className="flex-1 min-w-[200px] relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
              <input
                type="text"
                placeholder="Search departments or heads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white shadow-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
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
                  key={faculty}
                  onClick={() => setSelectedFaculty(faculty)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedFaculty === faculty
                      ? "bg-primary-50 text-white shadow-md"
                      : "bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {faculty}
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
            {filteredDepartments.map((dept, index) => (
              <div key={dept.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[scaleIn_0.4s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={dept.headImage}
                      alt={dept.headName}
                      className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-primary-50">{dept.name}</h3>
                      <p className="text-xs text-primary-50/60">{dept.faculty}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(dept.status)}`}>
                    {dept.status.replace("-", " ").toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-primary-50/80">
                    <IoPersonOutline className="w-4 h-4 text-primary-50/50" />
                    <span className="font-semibold">{dept.headName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-50/70">
                    <IoMailOutline className="w-4 h-4 text-primary-50/50" />
                    <a href={`mailto:${dept.headEmail}`} className="hover:text-primary-50">{dept.headEmail}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-50/70">
                    <IoCallOutline className="w-4 h-4 text-primary-50/50" />
                    <a href={`tel:${dept.headPhone}`} className="hover:text-primary-50">{dept.headPhone}</a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-50">{dept.staffCount}</div>
                    <div className="text-xs text-primary-50/60">Staff</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-50">{dept.studentCount}</div>
                    <div className="text-xs text-primary-50/60">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-50">{dept.performance}%</div>
                    <div className="text-xs text-primary-50/60">Perf.</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance View */}
      {activeView === "performance" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-[fadeIn_0.5s_ease-out_both]">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Performance Ranking</h2>
            <div className="space-y-5">
              {departments
                .sort((a, b) => b.performance - a.performance)
                .map((dept, index) => (
                  <div key={dept.id} className="animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                          index < 3 ? "bg-primary-50 text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          {index + 1}
                        </span>
                        <span className="font-semibold text-primary-50 text-sm">{dept.name}</span>
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

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Budget vs Performance</h2>
            <div className="space-y-6">
              {departments.map((dept, index) => (
                <div key={dept.id} className="animate-[slideUp_0.5s_ease-out_both]" style={{ animationDelay: `${index * 100 + 200}ms` }}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-primary-50 text-sm">{dept.name}</span>
                    <span className="text-xs text-primary-50/60">${(dept.budget / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-100">
                    <div
                      className="bg-primary-100 h-full"
                      style={{ width: `${(dept.budget / 1500000) * 100}%` }}
                      title="Budget"
                    />
                    <div
                      className="bg-primary-50 h-full"
                      style={{ width: `${dept.performance}%` }}
                      title="Performance"
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-primary-50/50">
                    <span>Budget Util.</span>
                    <span>Performance</span>
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

export default DepartmentsHeads;
