
import React from "react";
import {
    IoAlertCircleOutline,
    IoAnalyticsOutline,
    IoCheckmarkCircleOutline,
    IoClipboardOutline,
    IoDocumentTextOutline,
    IoEyeOutline,
    IoFileTrayFullOutline,
    IoFlagOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWarningOutline
} from "react-icons/io5";

const AuditorDashboard: React.FC = () => {
  // Statistics Data
  const stats = [
    {
      title: "Total Audits Completed",
      value: "142",
      change: "+8",
      trend: "up",
      icon: <IoCheckmarkCircleOutline className="w-8 h-8" />,
      gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
      textColor: "text-emerald-600",
    },
    {
      title: "Open Issues",
      value: "23",
      change: "-5",
      trend: "down", // a down trend is good for issues, but visually we might want to show it positively
      trendColor: "green", 
      icon: <IoAlertCircleOutline className="w-8 h-8" />,
      gradient: "from-red-500 via-red-600 to-red-700",
      textColor: "text-red-600",
    },
    {
      title: "Compliance Score",
      value: "94%",
      change: "+2%",
      trend: "up",
      icon: <IoAnalyticsOutline className="w-8 h-8" />,
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      textColor: "text-blue-600",
    },
    {
      title: "Pending Reviews",
      value: "7",
      change: "+2",
      trend: "up", // up is bad for pending reviews usually, but neutral here
      trendColor: "red",
      icon: <IoFileTrayFullOutline className="w-8 h-8" />,
      gradient: "from-amber-500 via-amber-600 to-amber-700",
      textColor: "text-amber-600",
    },
  ];

  // Recent Logs / Activity
  const recentLogs = [
    {
      id: 1,
      type: "Financial Record Update",
      detail: "Tuition fee structure modified by Admin",
      time: "45 mins ago",
      icon: <IoDocumentTextOutline className="w-5 h-5" />,
      status: "info",
    },
    {
      id: 2,
      type: "Security Alert",
      detail: "Multiple failed login attempts detected (User: J. Doe)",
      time: "2 hours ago",
      icon: <IoWarningOutline className="w-5 h-5" />,
      status: "error", // Critical
    },
    {
      id: 3,
      type: "Audit Flag Resolved",
      detail: "Missing invoice #4421 uploaded and verified",
      time: "5 hours ago",
      icon: <IoCheckmarkCircleOutline className="w-5 h-5" />,
      status: "success",
    },
    {
      id: 4,
      type: "System Backup",
      detail: "Daily database backup completed successfully",
      time: "Yesterday",
      icon: <IoTimeOutline className="w-5 h-5" />,
      status: "neutral",
    },
  ];

  // Audit ProgressCategories
  const auditCategories = [
    { name: "Financial Aid", completion: 98, status: "Evaluated", issues: 0, color: "bg-emerald-500" },
    { name: "Procurement", completion: 75, status: "In Progress", issues: 3, color: "bg-blue-500" },
    { name: "HR & Payroll", completion: 45, status: "Ongoing", issues: 1, color: "bg-amber-500" },
    { name: "IT Security", completion: 30, status: "Scheduled", issues: 0, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Auditor Dashboard</h1>
          <p className="text-sm sm:text-base text-primary-50/70">
            System overview and compliance monitoring.
          </p>
        </div>
        <div className="flex gap-2 text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
            <IoTimeOutline className="w-5 h-5 text-primary-50" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => {
             // Determine trend color based on trend direction and custom override
             const isPositive = stat.trend === 'up';
             const isGood = stat.trendColor === 'green' || (isPositive && stat.trendColor !== 'red');
             const trendColorClass = isGood ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
             
             return (
          <div key={index} className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="relative flex flex-col items-start gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="w-full">
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.title}</div>
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trendColorClass}`}>
                {stat.trend === 'up' ? <IoTrendingUpOutline /> : <IoTrendingDownOutline />}
                <span>{stat.change} vs last month</span>
              </div>
            </div>
          </div>
        )})}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Audit Status Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <IoClipboardOutline className="text-primary-50 w-5 h-5" />
                    Audit Cycle Status
                </h3>
                <button className="text-sm text-primary-50 font-semibold hover:underline">View All Cycles</button>
            </div>
            
            <div className="space-y-6">
                {auditCategories.map((cat) => (
                    <div key={cat.name}>
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <h4 className="font-bold text-gray-800">{cat.name}</h4>
                                <p className="text-xs text-gray-500">{cat.status} • {cat.issues} Issues Found</p>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{cat.completion}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.completion}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-50">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">4</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Active Audits</div>
                </div>
                <div className="text-center border-l border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Reports Due</div>
                </div>
                <div className="text-center border-l border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Critical Errors</div>
                </div>
            </div>
        </div>

        {/* Recent System Logs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <IoEyeOutline className="text-primary-50 w-5 h-5" />
                    Recent System Logs
                </h3>
            </div>
            
            <div className="space-y-6 relative">
                 {/* Timeline line */}
                 <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100 z-0"></div>

                 {recentLogs.map((log) => (
                     <div key={log.id} className="relative z-10 flex gap-4">
                         <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow-sm shrink-0 
                            ${log.status === 'success' ? 'bg-green-100 text-green-600' : 
                              log.status === 'error' ? 'bg-red-100 text-red-600' :
                              log.status === 'info' ? 'bg-blue-100 text-blue-600' :
                              'bg-gray-100 text-gray-600'
                            }`}
                        >
                             {log.icon}
                         </div>
                         <div>
                             <p className="text-sm font-bold text-gray-900">{log.type}</p>
                             <p className="text-xs text-gray-500 line-clamp-1 mb-1">{log.detail}</p>
                             <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{log.time}</span>
                         </div>
                     </div>
                 ))}
                 
                 <button className="w-full text-center text-sm font-semibold text-gray-500 hover:text-primary-50 py-2 mt-2 transition-colors">
                     View All Logs
                 </button>
            </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
         {[
             { label: "New Audit", icon: <IoClipboardOutline />, color: "text-blue-600", bg: "bg-blue-50" },
             { label: "Flag Transaction", icon: <IoFlagOutline />, color: "text-red-600", bg: "bg-red-50" },
             { label: "Generate Report", icon: <IoDocumentTextOutline />, color: "text-emerald-600", bg: "bg-emerald-50" },
             { label: "Deep Scan", icon: <IoSearchOutline />, color: "text-purple-600", bg: "bg-purple-50" }
         ].map((action, idx) => (
             <button key={idx} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 text-left group">
                 <div className={`p-2.5 rounded-lg ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                     {action.icon}
                 </div>
                 <span className="font-semibold text-gray-700 text-sm">{action.label}</span>
             </button>
         ))}
      </div>
    </div>
  );
};

export default AuditorDashboard;
