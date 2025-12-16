import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTimeOutline
} from "react-icons/io5";

interface HealthReport {
  id: string;
  title: string;
  type: "Monthly" | "Annual" | "Incident" | "Vaccination" | "Inventory";
  dateGenerated: string;
  generatedBy: string;
  status: "Ready" | "Processing" | "Failed";
  size: string;
  summary: string;
}

const HealthReport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock Data
  const reports: HealthReport[] = [
    {
      id: "REP-2024-001",
      title: "Monthly Health Summary - Oct 2024",
      type: "Monthly",
      dateGenerated: "2024-11-01",
      generatedBy: "System",
      status: "Ready",
      size: "2.4 MB",
      summary: "Overview of student visits, common ailments, and treatments.",
    },
    {
      id: "REP-2024-002",
      title: "Annual Vaccination Audit",
      type: "Vaccination",
      dateGenerated: "2024-10-15",
      generatedBy: "Nurse Joy",
      status: "Ready",
      size: "1.8 MB",
      summary: "Compliance report for student immunizations.",
    },
    {
      id: "REP-2024-003",
      title: "Medical Inventory Low Stock",
      type: "Inventory",
      dateGenerated: "2024-11-10",
      generatedBy: "System",
      status: "Processing",
      size: "-",
      summary: "List of medications and supplies below minimum stock levels.",
    },
    {
      id: "REP-2024-004",
      title: "Emergency Incidents Q3",
      type: "Incident",
      dateGenerated: "2024-10-01",
      generatedBy: "Dr. Sarah Wilson",
      status: "Ready",
      size: "4.2 MB",
      summary: "Detailed report of emergency cases and responses in Q3.",
    },
    {
      id: "REP-2024-005",
      title: "Staff Health Checkup Results",
      type: "Monthly",
      dateGenerated: "2024-09-20",
      generatedBy: "Nurse Joy",
      status: "Failed",
      size: "0 KB",
      summary: "Error generating report due to missing data.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-700 border-green-200";
      case "Processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredReports = reports.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const stats = [
    { label: "Total Reports", value: reports.length, icon: <IoDocumentTextOutline />, color: "bg-purple-500" },
    { label: "Generated This Month", value: 3, icon: <IoStatsChartOutline />, color: "bg-blue-500" },
    { label: "Processing", value: reports.filter(r => r.status === "Processing").length, icon: <IoTimeOutline />, color: "bg-amber-500" },
    { label: "Failed", value: reports.filter(r => r.status === "Failed").length, icon: <IoAlertCircleOutline />, color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Health Reports</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Generate and view detailed health and administrative reports
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <IoStatsChartOutline className="w-5 h-5" />
            <span>Generate New Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-start gap-3">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
              </div>
              <div className="min-w-0 w-full">
                <div className="text-2xl font-bold text-primary-50">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-50/60 font-medium break-words">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
            <input
              type="text"
              placeholder="Search reports by title or summary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <IoFilterOutline className="w-5 h-5 text-primary-50/60" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
            >
              <option value="all">All Types</option>
              <option value="Monthly">Monthly</option>
              <option value="Annual">Annual</option>
              <option value="Incident">Incident</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Inventory">Inventory</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List - Responsive View */}
      <div className="space-y-4">
        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Report Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Generated Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Generated By</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReports.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-50/10 flex items-center justify-center text-primary-50 text-xl font-bold">
                        <IoDocumentTextOutline />
                      </div>
                      <div>
                        <div className="font-semibold text-primary-50">{item.title}</div>
                        <div className="text-xs text-primary-50/60">{item.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-primary-50/80">{item.dateGenerated}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-primary-50/80">{item.generatedBy}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="View">
                        <IoEyeOutline className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="Download">
                        <IoDownloadOutline className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredReports.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-primary-50/10 flex items-center justify-center text-primary-50 text-xl font-bold shrink-0">
                    <IoDocumentTextOutline />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-primary-50 truncate">{item.title}</div>
                    <div className="text-xs text-primary-50/60">{item.type}</div>
                  </div>
                </div>
                <span className={`shrink-0 ml-2 px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusColor(item.status)}`}>
                   {item.status}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                <div className="text-sm text-primary-50/80 mb-3">{item.summary}</div>
                
                <div className="flex items-center justify-between text-xs text-primary-50/60 border-t border-gray-200 pt-3">
                   <div className="flex items-center gap-1">
                     <IoTimeOutline className="w-3.5 h-3.5" />
                     {item.dateGenerated}
                   </div>
                   <div>By: {item.generatedBy}</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                 <button className="flex items-center gap-1 text-sm font-medium text-primary-50 hover:underline">
                   View
                 </button>
                 <button className="flex items-center gap-1 text-sm font-medium text-primary-50 hover:underline">
                   <IoDownloadOutline /> Download
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthReport;
