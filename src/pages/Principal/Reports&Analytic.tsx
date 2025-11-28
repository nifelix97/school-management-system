import React, { useState } from "react";
import {
    IoBarChartOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoCloseOutline,
    IoCloudDownloadOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoListOutline,
    IoPieChartOutline,
    IoPrintOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

interface Report {
  id: string;
  title: string;
  category: string;
  description: string;
  type: "academic" | "financial" | "operational" | "strategic";
  format: "PDF" | "Excel" | "CSV";
  generatedDate: string;
  period: string;
  size: string;
  status: "ready" | "generating" | "scheduled";
}

interface AnalyticsDashboard {
  id: string;
  name: string;
  description: string;
  metrics: number;
  lastUpdated: string;
  category: string;
}

const ReportAnalytics: React.FC = () => {
  const [activeView, setActiveView] = useState<"reports" | "analytics" | "scheduled">("reports");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<AnalyticsDashboard | null>(null);

  // Mock data
  const reports: Report[] = [
    {
      id: "1",
      title: "Annual Academic Performance Report",
      category: "Academic",
      description: "Comprehensive analysis of student performance, graduation rates, and academic achievements for the academic year",
      type: "academic",
      format: "PDF",
      generatedDate: "2024-11-25",
      period: "2023-2024 Academic Year",
      size: "2.4 MB",
      status: "ready",
    },
    {
      id: "2",
      title: "Financial Summary Report Q4",
      category: "Financial",
      description: "Quarterly financial overview including budget utilization, revenue, expenses, and financial projections",
      type: "financial",
      format: "Excel",
      generatedDate: "2024-11-24",
      period: "Q4 2024",
      size: "1.8 MB",
      status: "ready",
    },
    {
      id: "3",
      title: "Faculty Performance Analysis",
      category: "Human Resources",
      description: "Detailed analysis of faculty performance metrics, teaching evaluations, and professional development",
      type: "operational",
      format: "PDF",
      generatedDate: "2024-11-23",
      period: "Fall Semester 2024",
      size: "3.1 MB",
      status: "ready",
    },
    {
      id: "4",
      title: "Student Enrollment Trends",
      category: "Academic",
      description: "Analysis of enrollment patterns, demographics, and retention rates across all programs",
      type: "academic",
      format: "Excel",
      generatedDate: "2024-11-22",
      period: "2024",
      size: "1.2 MB",
      status: "ready",
    },
    {
      id: "5",
      title: "Research Output & Publications",
      category: "Research",
      description: "Comprehensive report on research activities, publications, citations, and grant funding",
      type: "academic",
      format: "PDF",
      generatedDate: "2024-11-21",
      period: "2024",
      size: "2.7 MB",
      status: "ready",
    },
    {
      id: "6",
      title: "Strategic Plan Progress Report",
      category: "Strategic Planning",
      description: "Progress update on strategic initiatives, goals achievement, and future planning",
      type: "strategic",
      format: "PDF",
      generatedDate: "2024-11-20",
      period: "2024",
      size: "1.9 MB",
      status: "ready",
    },
    {
      id: "7",
      title: "Campus Facilities Utilization",
      category: "Operations",
      description: "Analysis of campus facilities usage, maintenance records, and optimization recommendations",
      type: "operational",
      format: "Excel",
      generatedDate: "2024-11-19",
      period: "November 2024",
      size: "1.5 MB",
      status: "ready",
    },
    {
      id: "8",
      title: "Monthly Compliance Report",
      category: "Compliance",
      description: "Regulatory compliance status, audit findings, and corrective actions",
      type: "operational",
      format: "PDF",
      generatedDate: "2024-11-27",
      period: "November 2024",
      size: "0.8 MB",
      status: "generating",
    },
  ];

  const analyticsDashboards: AnalyticsDashboard[] = [
    {
      id: "1",
      name: "Student Success Analytics",
      description: "Real-time metrics on student performance, retention, and graduation rates",
      metrics: 12,
      lastUpdated: "2024-11-27 14:30",
      category: "Academic",
    },
    {
      id: "2",
      name: "Financial Performance Dashboard",
      description: "Live financial data including budget tracking, revenue streams, and expense analysis",
      metrics: 15,
      lastUpdated: "2024-11-27 16:00",
      category: "Financial",
    },
    {
      id: "3",
      name: "Faculty & Staff Analytics",
      description: "Workforce metrics including performance, satisfaction, and development tracking",
      metrics: 10,
      lastUpdated: "2024-11-27 10:15",
      category: "Human Resources",
    },
    {
      id: "4",
      name: "Research Impact Dashboard",
      description: "Research productivity metrics, publication impact, and funding analysis",
      metrics: 8,
      lastUpdated: "2024-11-27 12:45",
      category: "Research",
    },
    {
      id: "5",
      name: "Operational Efficiency Metrics",
      description: "Campus operations analytics including facilities, resources, and service delivery",
      metrics: 14,
      lastUpdated: "2024-11-27 15:20",
      category: "Operations",
    },
    {
      id: "6",
      name: "Strategic Goals Tracker",
      description: "Progress monitoring for strategic initiatives and institutional objectives",
      metrics: 9,
      lastUpdated: "2024-11-27 11:00",
      category: "Strategic",
    },
  ];

  const categories = ["all", "Academic", "Financial", "Human Resources", "Research", "Operations", "Strategic Planning", "Compliance"];
  const types = ["all", "academic", "financial", "operational", "strategic"];

  const filteredReports = reports.filter((report) => {
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory;
    const matchesType = selectedType === "all" || report.type === selectedType;
    return matchesCategory && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-primary-50/10 text-primary-50 border-primary-50/30";
      case "financial":
        return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      case "operational":
        return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "strategic":
        return "bg-primary-200/10 text-primary-200 border-primary-200/30";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      case "generating":
        return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "scheduled":
        return "bg-primary-50/10 text-primary-50 border-primary-50/30";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const handleDownload = (report: Report) => {
    setSelectedReport(report);
    setShowDownloadModal(true);
  };

  const handleView = (report: Report) => {
    setSelectedReport(report);
    setShowViewModal(true);
  };

  const handlePrint = (report: Report) => {
    setSelectedReport(report);
    setShowPrintModal(true);
  };

  const handleViewDashboard = (dashboard: AnalyticsDashboard) => {
    setSelectedDashboard(dashboard);
    setShowDashboardModal(true);
  };

  const closeModals = () => {
    setShowDownloadModal(false);
    setShowViewModal(false);
    setShowPrintModal(false);
    setShowDashboardModal(false);
    setSelectedReport(null);
    setSelectedDashboard(null);
  };

  const totalReports = reports.length;
  const readyReports = reports.filter(r => r.status === "ready").length;
  const generatingReports = reports.filter(r => r.status === "generating").length;
  const totalDashboards = analyticsDashboards.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out_both]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Reports & Analytics
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Access comprehensive reports and real-time analytics dashboards
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md border border-gray-200">
              <IoCalendarOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Schedule</span>
            </button>
            <button className="px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2 shadow-md">
              <IoDocumentTextOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { Icon: IoDocumentTextOutline, label: "Total Reports", value: totalReports, color: "primary-50" },
          { Icon: IoCheckmarkCircleOutline, label: "Ready to Download", value: readyReports, color: "primary-300" },
          { Icon: IoTimeOutline, label: "Generating", value: generatingReports, color: "primary-100" },
          { Icon: IoPieChartOutline, label: "Analytics Dashboards", value: totalDashboards, color: "primary-200" },
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
          { id: "reports", label: "Reports Library", icon: IoListOutline },
          { id: "analytics", label: "Analytics Dashboards", icon: IoStatsChartOutline },
          { id: "scheduled", label: "Scheduled Reports", icon: IoCalendarOutline },
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

      {/* Reports View */}
      {activeView === "reports" && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <div className="flex items-center gap-4 flex-wrap">
              <IoFilterOutline className="w-5 h-5 text-primary-50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl font-semibold border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl font-semibold border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map((report, index) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[scaleIn_0.4s_ease-out_both]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getTypeColor(report.type)}`}>
                        {report.type.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(report.status)}`}>
                        {report.status.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                        {report.format}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-50 mb-2">{report.title}</h3>
                    <p className="text-sm text-primary-50/70 mb-3 line-clamp-2">{report.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-primary-50/60 mb-1">Period</div>
                    <div className="font-semibold text-primary-50">{report.period}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-primary-50/60 mb-1">Generated</div>
                    <div className="font-semibold text-primary-50">{report.generatedDate}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-primary-50/60 mb-1">Category</div>
                    <div className="font-semibold text-primary-50">{report.category}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-primary-50/60 mb-1">File Size</div>
                    <div className="font-semibold text-primary-50">{report.size}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleView(report)}
                    disabled={report.status !== "ready"}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                      report.status === "ready"
                        ? "bg-primary-50/10 text-primary-50 hover:bg-primary-50/20"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <IoEyeOutline className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(report)}
                    disabled={report.status !== "ready"}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                      report.status === "ready"
                        ? "bg-primary-300/10 text-primary-300 hover:bg-primary-300/20"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <IoDownloadOutline className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handlePrint(report)}
                    disabled={report.status !== "ready"}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      report.status === "ready"
                        ? "bg-primary-100/10 text-primary-100 hover:bg-primary-100/20"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <IoPrintOutline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics View */}
      {activeView === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {analyticsDashboards.map((dashboard, index) => (
            <div
              key={dashboard.id}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[scaleIn_0.4s_ease-out_both]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-4 bg-primary-50/10 rounded-xl">
                  <IoBarChartOutline className="w-8 h-8 text-primary-50" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary-50 mb-2">{dashboard.name}</h3>
                  <p className="text-sm text-primary-50/70">{dashboard.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-xs text-primary-50/60 mb-1">Active Metrics</div>
                  <div className="text-2xl font-bold text-primary-50">{dashboard.metrics}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-xs text-primary-50/60 mb-1">Last Updated</div>
                  <div className="text-sm font-semibold text-primary-50">{dashboard.lastUpdated}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleViewDashboard(dashboard)}
                  className="flex-1 px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center justify-center gap-2"
                >
                  <IoStatsChartOutline className="w-5 h-5" />
                  Open Dashboard
                </button>
                <button className="px-4 py-2.5 bg-primary-300/10 text-primary-300 rounded-xl font-semibold hover:bg-primary-300/20 transition-colors">
                  <IoCloudDownloadOutline className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scheduled Reports View */}
      {activeView === "scheduled" && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
          <h2 className="text-xl font-bold text-primary-50 mb-6">Scheduled Reports</h2>
          <div className="space-y-4">
            {[
              { title: "Weekly Performance Summary", frequency: "Every Monday 8:00 AM", nextRun: "2024-12-02 08:00", format: "PDF" },
              { title: "Monthly Financial Report", frequency: "1st of each month", nextRun: "2024-12-01 09:00", format: "Excel" },
              { title: "Quarterly Academic Review", frequency: "End of each quarter", nextRun: "2024-12-31 10:00", format: "PDF" },
              { title: "Daily Attendance Report", frequency: "Every day 6:00 PM", nextRun: "2024-11-28 18:00", format: "CSV" },
            ].map((scheduled, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all animate-[slideUp_0.5s_ease-out_both]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-primary-50 mb-1">{scheduled.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-primary-50/60">
                    <span>Frequency: {scheduled.frequency}</span>
                    <span>•</span>
                    <span>Format: {scheduled.format}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-primary-50/60 mb-1">Next Run</div>
                  <div className="text-sm font-semibold text-primary-50">{scheduled.nextRun}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <button className="px-6 py-3 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center justify-center gap-2 mx-auto">
              <IoCalendarOutline className="w-5 h-5" />
              Schedule New Report
            </button>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && selectedReport && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-[fadeIn_0.3s_ease-out_both]" onClick={closeModals} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto animate-[scaleIn_0.3s_ease-out_both]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-primary-50">Download Report</h2>
                <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <IoCloseOutline className="w-6 h-6 text-primary-50" />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-bold text-primary-50 mb-2">{selectedReport.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-50/60">Format:</span>
                      <span className="font-semibold text-primary-50">{selectedReport.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-50/60">Size:</span>
                      <span className="font-semibold text-primary-50">{selectedReport.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-50/60">Period:</span>
                      <span className="font-semibold text-primary-50">{selectedReport.period}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={closeModals} className="flex-1 px-4 py-2.5 bg-gray-100 text-primary-50 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center justify-center gap-2">
                    <IoDownloadOutline className="w-5 h-5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* View Modal */}
      {showViewModal && selectedReport && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-[fadeIn_0.3s_ease-out_both]" onClick={closeModals} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto animate-[scaleIn_0.3s_ease-out_both]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-primary-50">{selectedReport.title}</h2>
                <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <IoCloseOutline className="w-6 h-6 text-primary-50" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
                <div className="bg-gray-50 rounded-xl p-8 mb-6">
                  <div className="text-center text-primary-50/60">
                    <IoDocumentTextOutline className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Report Preview</p>
                    <p className="text-sm mt-2">This would display the report content in a viewer</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-primary-50/60 mb-1">Category</div>
                    <div className="font-semibold text-primary-50">{selectedReport.category}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-primary-50/60 mb-1">Period</div>
                    <div className="font-semibold text-primary-50">{selectedReport.period}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-primary-50/60 mb-1">Generated</div>
                    <div className="font-semibold text-primary-50">{selectedReport.generatedDate}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-primary-50/60 mb-1">Format</div>
                    <div className="font-semibold text-primary-50">{selectedReport.format}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 p-6 border-t border-gray-200">
                <button onClick={() => handleDownload(selectedReport)} className="flex-1 px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center justify-center gap-2">
                  <IoDownloadOutline className="w-5 h-5" />
                  Download
                </button>
                <button onClick={() => handlePrint(selectedReport)} className="flex-1 px-4 py-2.5 bg-primary-100/10 text-primary-100 rounded-xl font-semibold hover:bg-primary-100/20 transition-colors flex items-center justify-center gap-2">
                  <IoPrintOutline className="w-5 h-5" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Print Modal */}
      {showPrintModal && selectedReport && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-[fadeIn_0.3s_ease-out_both]" onClick={closeModals} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto animate-[scaleIn_0.3s_ease-out_both]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-primary-50">Print Report</h2>
                <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <IoCloseOutline className="w-6 h-6 text-primary-50" />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-bold text-primary-50 mb-4">{selectedReport.title}</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="printOption" defaultChecked className="w-4 h-4" />
                      <span className="text-sm font-semibold text-primary-50">Print entire report</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="printOption" className="w-4 h-4" />
                      <span className="text-sm font-semibold text-primary-50">Print summary only</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={closeModals} className="flex-1 px-4 py-2.5 bg-gray-100 text-primary-50 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center justify-center gap-2">
                    <IoPrintOutline className="w-5 h-5" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Dashboard Modal */}
      {showDashboardModal && selectedDashboard && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-[fadeIn_0.3s_ease-out_both]" onClick={closeModals} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col pointer-events-auto animate-[scaleIn_0.3s_ease-out_both]" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-bold text-primary-50">{selectedDashboard.name}</h2>
                  <p className="text-sm text-primary-50/60 mt-1">{selectedDashboard.description}</p>
                </div>
                <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <IoCloseOutline className="w-6 h-6 text-primary-50" />
                </button>
              </div>
              
              {/* Modal Content - Scrollable */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {Array.from({ length: selectedDashboard.metrics }).map((_, idx) => (
                    <div key={idx} className="p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <IoBarChartOutline className="w-6 h-6 text-primary-50" />
                        <span className="text-xs text-primary-50/60">Metric {idx + 1}</span>
                      </div>
                      <div className="text-3xl font-bold text-primary-50 mb-1">{Math.floor(Math.random() * 100)}%</div>
                      <div className="text-sm text-primary-50/70">Sample Metric</div>
                      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                        <div className="h-full bg-primary-50 rounded-full" style={{ width: `${Math.floor(Math.random() * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-sm text-primary-50/60">
                  Last updated: {selectedDashboard.lastUpdated}
                </div>
              </div>
              
              {/* Modal Footer - Fixed at bottom */}
              <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200 flex-shrink-0">
                <button className="flex-1 px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center justify-center gap-2">
                  <IoTrendingUpOutline className="w-5 h-5" />
                  <span>View Full Analytics</span>
                </button>
                <button className="flex-1 px-4 py-2.5 bg-primary-300/10 text-primary-300 rounded-xl font-semibold hover:bg-primary-300/20 transition-colors flex items-center justify-center gap-2">
                  <IoCloudDownloadOutline className="w-5 h-5" />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportAnalytics;
