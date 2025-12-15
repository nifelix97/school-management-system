import React, { useState } from "react";
import {
    IoBarChartOutline,
    IoCheckmarkCircleOutline,
    IoDownloadOutline,
    IoFilterOutline,
    IoGridOutline,
    IoSchoolOutline,
    IoStatsChartOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoTrophyOutline,
    IoWarningOutline
} from "react-icons/io5";

interface PerformanceMetric {
  id: string;
  category: string;
  metric: string;
  currentValue: number;
  previousValue: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
  status: "excellent" | "good" | "warning" | "critical";
}

interface DepartmentPerformance {
  id: string;
  name: string;
  overallScore: number;
  academicExcellence: number;
  studentSatisfaction: number;
  researchOutput: number;
  facultyPerformance: number;
  trend: "up" | "down" | "stable";
}

const PerformanceReports: React.FC = () => {
  const [activeView, setActiveView] = useState<"overview" | "departments" | "trends">("overview");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("2024");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when view or category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeView, selectedCategory]);

  // Mock data
  const performanceMetrics: PerformanceMetric[] = [
    {
      id: "1",
      category: "Academic",
      metric: "Overall Student Performance",
      currentValue: 85.5,
      previousValue: 82.3,
      target: 88,
      unit: "%",
      trend: "up",
      status: "good",
    },
    {
      id: "2",
      category: "Academic",
      metric: "Graduation Rate",
      currentValue: 92.8,
      previousValue: 91.5,
      target: 95,
      unit: "%",
      trend: "up",
      status: "excellent",
    },
    {
      id: "3",
      category: "Academic",
      metric: "Student Retention Rate",
      currentValue: 88.2,
      previousValue: 89.1,
      target: 90,
      unit: "%",
      trend: "down",
      status: "warning",
    },
    {
      id: "4",
      category: "Faculty",
      metric: "Faculty Satisfaction",
      currentValue: 78.5,
      previousValue: 75.2,
      target: 85,
      unit: "%",
      trend: "up",
      status: "good",
    },
    {
      id: "5",
      category: "Faculty",
      metric: "Teaching Quality Score",
      currentValue: 4.3,
      previousValue: 4.1,
      target: 4.5,
      unit: "/5",
      trend: "up",
      status: "good",
    },
    {
      id: "6",
      category: "Research",
      metric: "Research Publications",
      currentValue: 245,
      previousValue: 198,
      target: 300,
      unit: "",
      trend: "up",
      status: "good",
    },
    {
      id: "7",
      category: "Research",
      metric: "Grant Funding Secured",
      currentValue: 2.8,
      previousValue: 2.3,
      target: 3.5,
      unit: "M",
      trend: "up",
      status: "good",
    },
    {
      id: "8",
      category: "Student Affairs",
      metric: "Student Engagement Rate",
      currentValue: 72.5,
      previousValue: 74.8,
      target: 80,
      unit: "%",
      trend: "down",
      status: "warning",
    },
    {
      id: "9",
      category: "Operations",
      metric: "Budget Utilization",
      currentValue: 94.2,
      previousValue: 96.5,
      target: 95,
      unit: "%",
      trend: "down",
      status: "excellent",
    },
    {
      id: "10",
      category: "Operations",
      metric: "Facility Utilization",
      currentValue: 81.3,
      previousValue: 79.8,
      target: 85,
      unit: "%",
      trend: "up",
      status: "good",
    },
  ];

  const departments: DepartmentPerformance[] = [
    {
      id: "1",
      name: "Computer Science",
      overallScore: 88.5,
      academicExcellence: 90,
      studentSatisfaction: 85,
      researchOutput: 92,
      facultyPerformance: 87,
      trend: "up",
    },
    {
      id: "2",
      name: "Engineering",
      overallScore: 86.2,
      academicExcellence: 88,
      studentSatisfaction: 83,
      researchOutput: 89,
      facultyPerformance: 85,
      trend: "up",
    },
    {
      id: "3",
      name: "Business Administration",
      overallScore: 84.7,
      academicExcellence: 85,
      studentSatisfaction: 86,
      researchOutput: 82,
      facultyPerformance: 86,
      trend: "stable",
    },
    {
      id: "4",
      name: "Medicine",
      overallScore: 91.3,
      academicExcellence: 93,
      studentSatisfaction: 88,
      researchOutput: 94,
      facultyPerformance: 90,
      trend: "up",
    },
    {
      id: "5",
      name: "Arts & Humanities",
      overallScore: 79.8,
      academicExcellence: 81,
      studentSatisfaction: 82,
      researchOutput: 75,
      facultyPerformance: 81,
      trend: "down",
    },
    {
      id: "6",
      name: "Natural Sciences",
      overallScore: 87.4,
      academicExcellence: 89,
      studentSatisfaction: 84,
      researchOutput: 90,
      facultyPerformance: 86,
      trend: "up",
    },
  ];

  const categories = ["all", "Academic", "Faculty", "Research", "Student Affairs", "Operations"];

  const filteredMetrics = performanceMetrics.filter((metric) => {
    const matchesCategory = selectedCategory === "all" || metric.category === selectedCategory;
    return matchesCategory;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentMetrics = filteredMetrics.slice(indexOfFirstItem, indexOfLastItem);
  const currentDepartments = departments
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPagesMetrics = Math.ceil(filteredMetrics.length / itemsPerPage);
  const totalPagesDepartments = Math.ceil(departments.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const PaginationControls = ({ totalPages }: { totalPages: number }) => (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => paginate(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => paginate(i + 1)}
          className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
            currentPage === i + 1
              ? "bg-primary-50 text-white"
              : "hover:bg-gray-50 text-primary-50/70"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      case "good":
        return "bg-primary-50/10 text-primary-50 border-primary-50/30";
      case "warning":
        return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "critical":
        return "bg-primary-200/10 text-primary-200 border-primary-200/30";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <IoTrendingUpOutline className="w-4 h-4 text-primary-300" />;
      case "down":
        return <IoTrendingDownOutline className="w-4 h-4 text-primary-200" />;
      default:
        return <div className="w-4 h-4 border-t-2 border-primary-100" />;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "from-green-500 to-emerald-500";
    if (percentage >= 75) return "from-blue-500 to-cyan-500";
    if (percentage >= 60) return "from-amber-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  const excellentMetrics = performanceMetrics.filter(m => m.status === "excellent").length;
  const goodMetrics = performanceMetrics.filter(m => m.status === "good").length;
  const warningMetrics = performanceMetrics.filter(m => m.status === "warning").length;
  const criticalMetrics = performanceMetrics.filter(m => m.status === "critical").length;

  const avgDepartmentScore = Math.round(
    departments.reduce((sum, d) => sum + d.overallScore, 0) / departments.length
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out_both]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Performance Reports
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Comprehensive performance analytics and institutional metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all shadow-sm"
            >
              <option value="2024">FY 2024</option>
              <option value="2023">FY 2023</option>
              <option value="2022">FY 2022</option>
            </select>
            <button className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md border border-gray-200">
              <IoDownloadOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { Icon: IoCheckmarkCircleOutline, label: "Excellent", value: excellentMetrics, color: "primary-300" },
          { Icon: IoTrophyOutline, label: "Good", value: goodMetrics, color: "primary-50" },
          { Icon: IoWarningOutline, label: "Needs Attention", value: warningMetrics, color: "primary-100" },
          { Icon: IoBarChartOutline, label: "Critical", value: criticalMetrics, color: "primary-200" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color} mb-3 inline-block`}>
              <stat.Icon className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{stat.value}</div>
            <div className="text-sm font-semibold text-primary-50/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex flex-wrap gap-1 mb-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
        {[
          { id: "overview", label: "Overview", icon: IoGridOutline },
          { id: "departments", label: "Departments", icon: IoSchoolOutline },
          { id: "trends", label: "Trends & Analysis", icon: IoStatsChartOutline },
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
            <view.icon className="w-5 h-5" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Overview View */}
      {activeView === "overview" && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <div className="flex items-center gap-4">
              <IoFilterOutline className="w-5 h-5 text-primary-50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl font-semibold border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Metrics Grid */}
          {/* Metrics Table - Responsive */}
          <div className="bg-transparent md:bg-white md:rounded-xl md:shadow-lg md:border md:border-gray-100 overflow-hidden animate-[fadeIn_0.5s_ease-out_both]">
            <div className="w-full">
              <table className="w-full text-left border-collapse block md:table">
                <thead className="hidden md:table-header-group">
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-xs text-primary-50/60 uppercase tracking-wider">
                    <th className="p-4 font-semibold">Metric</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Current</th>
                    <th className="p-4 font-semibold">Previous</th>
                    <th className="p-4 font-semibold">Target</th>
                    <th className="p-4 font-semibold">Trend</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold min-w-[150px]">Progress</th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group space-y-4 md:space-y-0">
                  {currentMetrics.map((metric, index) => (
                    <tr
                      key={metric.id}
                      className="block md:table-row bg-white rounded-2xl md:rounded-none p-4 md:p-0 shadow-sm md:shadow-none border border-gray-100 md:border-0 md:border-b hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Metric</span>
                        <span className="font-semibold text-primary-50">
                          {metric.metric}
                        </span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Category</span>
                        <span className="px-2.5 py-1 rounded-full bg-gray-100 text-primary-50/70 text-xs font-semibold">
                          {metric.category}
                        </span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Current</span>
                        <span className="font-bold text-primary-50">
                          {metric.currentValue}{metric.unit}
                        </span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Previous</span>
                        <span className="text-primary-50/60">
                          {metric.previousValue}{metric.unit}
                        </span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Target</span>
                        <span className="text-primary-50/60">
                          {metric.target}{metric.unit}
                        </span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Trend</span>
                        <div className="flex items-center gap-1.5">
                          {getTrendIcon(metric.trend)}
                          <span className={`text-xs font-semibold ${
                            metric.trend === "up" ? "text-primary-300" : metric.trend === "down" ? "text-primary-200" : "text-primary-100"
                          }`}>
                            {calculateChange(metric.currentValue, metric.previousValue)}%
                          </span>
                        </div>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Status</span>
                        <span className={`px-2.5 py-1 rounded-full border text-xs font-bold ${getStatusColor(metric.status)}`}>
                          {metric.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="flex justify-between items-center gap-4 md:gap-0 md:table-cell p-2 md:p-4 border-b md:border-none last:border-0">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase min-w-fit">Progress</span>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-linear-to-r ${getProgressColor((metric.currentValue / metric.target) * 100)}`}
                              style={{ width: `${Math.min((metric.currentValue / metric.target) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-primary-50/70">
                            {Math.round((metric.currentValue / metric.target) * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredMetrics.length === 0 && (
              <div className="p-8 text-center text-primary-50/60">
                No metrics found matching your criteria.
              </div>
            )}
          </div>
          {totalPagesMetrics > 1 && <PaginationControls totalPages={totalPagesMetrics} />}
        </div>
      )}

      {/* Departments View */}
      {activeView === "departments" && (
        <div className="space-y-6">
          {/* Average Score Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-primary-50 mb-2">University-Wide Performance</h2>
                <p className="text-sm text-primary-50/60">Average score across all departments</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-primary-50">{avgDepartmentScore}%</div>
                <div className={`text-sm font-semibold mt-2 ${getStatusColor(
                  avgDepartmentScore >= 90 ? "excellent" : avgDepartmentScore >= 80 ? "good" : "warning"
                )}`}>
                  {avgDepartmentScore >= 90 ? "Excellent" : avgDepartmentScore >= 80 ? "Good" : "Needs Improvement"}
                </div>
              </div>
            </div>
          </div>

          {/* Departments Table - Responsive */}
          <div className="bg-transparent md:bg-white md:rounded-xl md:shadow-lg md:border md:border-gray-100 overflow-hidden animate-[fadeIn_0.5s_ease-out_both]">
            <div className="w-full">
              <table className="w-full text-left border-collapse block md:table">
                <thead className="hidden md:table-header-group">
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-xs text-primary-50/60 uppercase tracking-wider">
                    <th className="p-4 font-semibold text-center w-16">Rank</th>
                    <th className="p-4 font-semibold">Department</th>
                    <th className="p-4 font-semibold text-center">Academic</th>
                    <th className="p-4 font-semibold text-center">Satisfaction</th>
                    <th className="p-4 font-semibold text-center">Research</th>
                    <th className="p-4 font-semibold text-center">Faculty</th>
                    <th className="p-4 font-semibold text-right">Overall Score</th>
                    <th className="p-4 font-semibold text-center">Trend</th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group space-y-4 md:space-y-0">
                  {currentDepartments.map((dept, index) => (
                    <tr
                      key={dept.id}
                      className="block md:table-row bg-white rounded-2xl md:rounded-none p-4 md:p-0 shadow-sm md:shadow-none border border-gray-100 md:border-0 md:border-b hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0 md:text-center">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Rank</span>
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          index < 3 
                            ? "bg-primary-300 text-white shadow-sm" 
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {indexOfFirstItem + index + 1}
                        </span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Department</span>
                        <span className="font-bold text-primary-50">{dept.name}</span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0 md:text-center">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Academic</span>
                        <span className="font-semibold text-primary-50/80">{dept.academicExcellence}%</span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0 md:text-center">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Satisfaction</span>
                        <span className="font-semibold text-primary-50/80">{dept.studentSatisfaction}%</span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0 md:text-center">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Research</span>
                        <span className="font-semibold text-primary-50/80">{dept.researchOutput}%</span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0 md:text-center">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Faculty</span>
                        <span className="font-semibold text-primary-50/80">{dept.facultyPerformance}%</span>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0 md:text-right">
                        <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Overall Score</span>
                        <div className="flex flex-col items-end">
                          <span className="text-lg font-bold text-primary-50">{dept.overallScore}%</span>
                          <span className={`text-xs font-semibold ${getStatusColor(
                            dept.overallScore >= 90 ? "excellent" : dept.overallScore >= 80 ? "good" : "warning"
                          )} px-2 py-0.5 rounded-full border`}>
                             {dept.overallScore >= 90 ? "Excellent" : dept.overallScore >= 80 ? "Good" : "Needs Work"}
                          </span>
                        </div>
                      </td>
                      <td className="flex justify-between items-center md:table-cell p-2 md:p-4 border-b md:border-none last:border-0 md:text-center">
                         <span className="md:hidden text-xs font-semibold text-primary-50/60 uppercase">Trend</span>
                         <div className="inline-flex">
                           {getTrendIcon(dept.trend)}
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {totalPagesDepartments > 1 && <PaginationControls totalPages={totalPagesDepartments} />}
        </div>
      )}

      {/* Trends View */}
      {activeView === "trends" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Performance Trends</h2>
            <div className="space-y-4">
              {[
                { label: "Improving Metrics", count: performanceMetrics.filter(m => m.trend === "up").length, color: "primary-300" },
                { label: "Declining Metrics", count: performanceMetrics.filter(m => m.trend === "down").length, color: "primary-200" },
                { label: "Stable Metrics", count: performanceMetrics.filter(m => m.trend === "stable").length, color: "primary-100" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all animate-[slideUp_0.5s_ease-out_both]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-sm font-semibold text-primary-50">{item.label}</span>
                  <span className={`px-4 py-2 rounded-full text-lg font-bold bg-${item.color}/10 text-${item.color}`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-bold text-primary-50 mb-6">Top Performing Departments</h2>
            <div className="space-y-3">
              {departments
                .sort((a, b) => b.overallScore - a.overallScore)
                .slice(0, 5)
                .map((dept, index) => (
                  <div
                    key={dept.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all animate-[slideUp_0.5s_ease-out_both]"
                    style={{ animationDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                      index === 0 ? "bg-primary-300" : index === 1 ? "bg-primary-50" : "bg-primary-100"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-primary-50">{dept.name}</div>
                      <div className="text-xs text-primary-50/60">Overall Score</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary-50">{dept.overallScore}%</div>
                      {getTrendIcon(dept.trend)}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "400ms" }}>
            <h2 className="text-xl font-bold text-primary-50 mb-6">Key Insights & Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Strong Academic Performance",
                  description: "Graduation rate and overall student performance are trending positively, exceeding previous year benchmarks.",
                  type: "success",
                  icon: IoCheckmarkCircleOutline,
                },
                {
                  title: "Student Engagement Concern",
                  description: "Student engagement rate has declined. Recommend implementing new extracurricular programs and campus activities.",
                  type: "warning",
                  icon: IoWarningOutline,
                },
                {
                  title: "Research Excellence",
                  description: "Research publications and grant funding show significant growth. Continue supporting research initiatives.",
                  type: "success",
                  icon: IoTrophyOutline,
                },
                {
                  title: "Retention Improvement Needed",
                  description: "Student retention rate requires attention. Consider enhanced academic support and mentoring programs.",
                  type: "warning",
                  icon: IoWarningOutline,
                },
              ].map((insight, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-xl border-2 ${
                    insight.type === "success" 
                      ? "border-primary-300/30 bg-primary-300/5" 
                      : "border-primary-100/30 bg-primary-100/5"
                  } animate-[scaleIn_0.4s_ease-out_both]`}
                  style={{ animationDelay: `${index * 100 + 400}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      insight.type === "success" ? "bg-primary-300/10 text-primary-300" : "bg-primary-100/10 text-primary-100"
                    }`}>
                      <insight.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary-50 mb-2">{insight.title}</h3>
                      <p className="text-sm text-primary-50/70">{insight.description}</p>
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

export default PerformanceReports;
