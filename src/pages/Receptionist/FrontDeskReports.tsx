import React, { useState } from "react";
import {
    IoBarChartOutline,
    IoCalendarOutline,
    IoClipboardOutline,
    IoCloudDownloadOutline,
    IoFilterOutline,
    IoPeopleOutline,
    IoPieChartOutline,
    IoPrintOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingUpOutline,
} from "react-icons/io5";

interface ReportLog {
  id: string;
  date: string;
  totalVisitors: number;
  totalCalls: number;
  topInquiry: string;
  avgWaitTime: string;
  status: "Completed" | "Pending Review";
}

const FrontDeskReports: React.FC = () => {
  const [filterRange, setFilterRange] = useState("Weekly");

  // Mock Data
  const reportLogs: ReportLog[] = [
    {
      id: "REP-001",
      date: "May 13 - May 19",
      totalVisitors: 145,
      totalCalls: 320,
      topInquiry: "Admissions",
      avgWaitTime: "4m 30s",
      status: "Completed",
    },
    {
      id: "REP-002",
      date: "May 06 - May 12",
      totalVisitors: 132,
      totalCalls: 298,
      topInquiry: "Tuition Fees",
      avgWaitTime: "5m 15s",
      status: "Completed",
    },
    {
      id: "REP-003",
      date: "Apr 29 - May 05",
      totalVisitors: 156,
      totalCalls: 345,
      topInquiry: "Admissions",
      avgWaitTime: "6m 00s",
      status: "Completed",
    },
    {
      id: "REP-004",
      date: "Apr 22 - Apr 28",
      totalVisitors: 110,
      totalCalls: 210,
      topInquiry: "Events",
      avgWaitTime: "3m 45s",
      status: "Completed",
    },
  ];

  const stats = [
    { label: "Peek Traffic Hour", value: "10:00 AM", subtext: "+15% vs last week", icon: <IoTimeOutline />, color: "bg-amber-500" },
    { label: "Avg. Wait Time", value: "4m 12s", subtext: "-30s improvement", icon: <IoStatsChartOutline />, color: "bg-green-500" },
    { label: "Most Common Inquiry", value: "Admissions", subtext: "45% of all queries", icon: <IoPeopleOutline />, color: "bg-blue-500" },
    { label: "Total Interactions", value: "854", subtext: "Visitors + Calls", icon: <IoBarChartOutline />, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Front Desk Reports</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Analytics and insights for reception operations
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-all">
                <IoPrintOutline className="w-5 h-5" />
                <span>Print</span>
            </button>
             <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-100 transition-all">
                <IoCloudDownloadOutline className="w-5 h-5" />
                <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color} text-white shadow-md`}>
                    <div className="w-6 h-6">{stat.icon}</div>
                </div>
                {stat.subtext.includes('+') ? (
                    <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <IoTrendingUpOutline className="mr-1" /> {stat.subtext.split(' ')[0]}
                    </span>
                ) : (
                     <span className="flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                         {stat.subtext.split(' ')[0]}
                    </span>
                )}
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
        {/* Visitor Traffic Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <IoBarChartOutline className="text-primary-50" />
                    Visitor Traffic Trends
                </h3>
                 <select className="bg-gray-50 border-none text-sm font-semibold text-gray-600 rounded-lg py-1 px-3 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                </select>
            </div>
            
            {/* Visual Bar Chart Representation */}
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2">
                {[45, 60, 35, 80, 55, 90, 40].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2 group h-full">
                        <div 
                            className="w-full bg-primary-50 rounded-t-lg transition-all duration-500 hover:bg-primary-100 relative group-hover:scale-y-105 origin-bottom" 
                            style={{ height: `${h}%`, opacity: 0.7 + (i * 0.05) }}
                        >
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg transition-opacity">
                                {h * 2}
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* Inquiry Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <IoPieChartOutline className="text-primary-50" />
                    Inquiry Types
                </h3>
            </div>
            <div className="space-y-4">
                {[
                    { label: "Admissions", val: 45, color: "bg-blue-500" },
                    { label: "Fees & Finance", val: 25, color: "bg-green-500" },
                    { label: "Events", val: 15, color: "bg-purple-500" },
                    { label: "General Info", val: 15, color: "bg-amber-500" },
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
                    <strong>Insight:</strong> Admissions inquiries spiked by 12% this week due to the upcoming scholarship deadline.
                </p>
            </div>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
             <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <IoClipboardOutline className="text-primary-50" />
                Weekly Performance Logs
            </h3>
             <div className="flex items-center gap-3 w-full sm:w-auto">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 text-sm">
                    <IoFilterOutline className="w-4 h-4" />
                    <span>Filter:</span>
                 </div>
                 <select 
                    value={filterRange}
                    onChange={(e) => setFilterRange(e.target.value)}
                    className="bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg py-1.5 px-3 outline-none"
                >
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                </select>
             </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Range</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Visitors</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Calls</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Inquiry</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg. Wait Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {reportLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <IoCalendarOutline className="text-gray-400" />
                            <span className="text-sm font-semibold text-gray-900">{log.date}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{log.totalVisitors}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{log.totalCalls}</td>
                    <td className="px-6 py-4">
                        <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                            {log.topInquiry}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{log.avgWaitTime}</td>
                    <td className="px-6 py-4">
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-200">
                            {log.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                         <button className="text-primary-50 hover:text-primary-100 text-sm font-medium transition-colors">
                            View Details
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

export default FrontDeskReports;
