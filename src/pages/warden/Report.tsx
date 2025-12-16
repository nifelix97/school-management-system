import React, { useState } from "react";
import {
    IoBarChartOutline,
    IoCalendarOutline,
    IoCheckmarkDoneCircleOutline,
    IoClipboardOutline,
    IoCloudDownloadOutline,
    IoFilterOutline,
    IoHomeOutline,
    IoPieChartOutline,
    IoPrintOutline,
    IoStatsChartOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWarningOutline,
} from "react-icons/io5";

interface ReportLog {
  id: string;
  date: string;
  type: string;
  generatedBy: string;
  status: "Available" | "Pending";
}

const Report: React.FC = () => {
  const [filterRange, setFilterRange] = useState("Monthly");

  // Mock Data
  const reportLogs: ReportLog[] = [
    { id: "REP-W-2024-001", date: "March 2024", type: "Monthly Occupancy Analysis", generatedBy: "System", status: "Available" },
    { id: "REP-W-2024-002", date: "March 2024", type: "Maintenance & Repairs Log", generatedBy: "Warden", status: "Available" },
    { id: "REP-W-2024-003", date: "Feb 2024", type: "Student Attendance Summary", generatedBy: "System", status: "Available" },
    { id: "REP-W-2024-004", date: "Feb 2024", type: "Draft: Q1 Inventory Audit", generatedBy: "Warden", status: "Pending" },
  ];

  const stats = [
    { label: "Occupancy Rate", value: "92%", subtext: "+2% vs last month", icon: <IoHomeOutline />, color: "bg-blue-500", trend: "up" },
    { label: "Resolved Complaints", value: "85%", subtext: "+5% efficiency", icon: <IoCheckmarkDoneCircleOutline />, color: "bg-green-500", trend: "up" },
    { label: "Active Maintenance", value: "12", subtext: "-3 vs last week", icon: <IoWarningOutline />, color: "bg-amber-500", trend: "down" },
    { label: "Total Students", value: "450", subtext: "Full Capacity: 480", icon: <IoStatsChartOutline />, color: "bg-purple-500", trend: "neutral" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Hostel Reports</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Operational analytics and performance summaries
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-all">
                <IoPrintOutline className="w-5 h-5" />
                <span>Print</span>
            </button>
             <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-100 transition-all">
                <IoCloudDownloadOutline className="w-5 h-5" />
                <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color} text-white shadow-md`}>
                    <div className="w-6 h-6">{stat.icon}</div>
                </div>
                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'text-green-600 bg-green-50' : 
                    stat.trend === 'down' ? 'text-green-600 bg-green-50' : // Down is good for maintenance
                    'text-blue-600 bg-blue-50'
                }`}>
                    {stat.trend === 'up' && <IoTrendingUpOutline className="mr-1" />}
                    {stat.trend === 'down' && <IoTrendingDownOutline className="mr-1" />}
                    {stat.subtext.split(' ')[0]}
                </span>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section (Mock Visuals) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Occupancy Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <IoBarChartOutline className="text-primary-50" />
                    Block Occupancy Trends
                </h3>
            </div>
            
            {/* Visual Bar Chart Representation */}
            <div className="h-64 flex items-end justify-between gap-8 px-4">
                {[
                    { label: 'Block A', val: 95 },
                    { label: 'Block B', val: 88 },
                    { label: 'Block C', val: 92 },
                    { label: 'Block D', val: 75 }
                ].map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2 group h-full">
                        <div 
                            className="w-full max-w-[60px] bg-primary-50 rounded-t-lg transition-all duration-500 hover:bg-primary-100 relative group-hover:scale-y-105 origin-bottom" 
                            style={{ height: `${item.val}%` }}
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg transition-opacity">
                                {item.val}%
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* Complaint Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <IoPieChartOutline className="text-primary-50" />
                    Complaint Categories
                </h3>
            </div>
            <div className="space-y-4">
                {[
                    { label: "Maintenance", val: 55, color: "bg-blue-500" },
                    { label: "Hygiene", val: 25, color: "bg-green-500" },
                    { label: "Discipline", val: 15, color: "bg-amber-500" },
                    { label: "Other", val: 5, color: "bg-gray-400" },
                ].map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm font-medium mb-1">
                            <span className="text-gray-700">{item.label}</span>
                            <span className="text-gray-900">{item.val}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-center text-gray-500 leading-relaxed">
                    <strong>Insight:</strong> Maintenance requests have decreased by 15% following the recent renovation of Block D bathrooms.
                </p>
            </div>
        </div>
      </div>

      {/* Report History Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
             <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <IoClipboardOutline className="text-primary-50" />
                Generated Reports
            </h3>
             <div className="flex items-center gap-3 w-full sm:w-auto">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 text-sm">
                    <IoFilterOutline className="w-4 h-4" />
                    <span>Filter:</span>
                 </div>
                 <select 
                    value={filterRange}
                    onChange={(e) => setFilterRange(e.target.value)}
                    className="bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg py-1.5 px-3 outline-none cursor-pointer"
                >
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                </select>
             </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Report ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Report Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Generated By</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {reportLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{log.id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{log.type}</td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <IoCalendarOutline className="text-gray-400" />
                            <span className="text-sm text-gray-600">{log.date}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{log.generatedBy}</td>
                    <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                            log.status === 'Available' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                            {log.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                         <button 
                            className="text-primary-50 hover:text-primary-100 text-sm font-bold transition-colors flex items-center justify-end gap-1 ml-auto"
                            disabled={log.status !== 'Available'}
                        >
                            <IoCloudDownloadOutline />
                            Download
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
