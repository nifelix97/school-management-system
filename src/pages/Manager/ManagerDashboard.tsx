import React from "react";
import {
    IoCalendarOutline,
    IoCashOutline,
    IoCheckmarkCircleOutline,
    IoDocumentTextOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingUpOutline,
    IoWarningOutline
} from "react-icons/io5";

const ManagerDashboard: React.FC = () => {
  // Statistics Data
  const stats = [
    {
      title: "Total Students",
      value: "1,245",
      change: "+45",
      trend: "up",
      icon: <IoSchoolOutline className="w-8 h-8" />,
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      textColor: "text-blue-600",
    },
    {
      title: "Total Staff",
      value: "84",
      change: "+2",
      trend: "up",
      icon: <IoPeopleOutline className="w-8 h-8" />,
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      textColor: "text-purple-600",
    },
    {
      title: "Monthly Revenue",
      value: "$124k",
      change: "+12%",
      trend: "up",
      icon: <IoCashOutline className="w-8 h-8" />,
      gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
      textColor: "text-emerald-600",
    },
    {
      title: "Pending Tasks",
      value: "12",
      change: "-3",
      trend: "down",
      icon: <IoDocumentTextOutline className="w-8 h-8" />,
      gradient: "from-amber-500 via-amber-600 to-amber-700",
      textColor: "text-amber-600",
    },
  ];

  // Recent Activity Data
  const recentActivities = [
    {
      id: 1,
      type: "New Hire",
      detail: "Sarah Johnson joined as Senior Lecturer (CS Dept)",
      time: "2 hours ago",
      icon: <IoPeopleOutline className="w-5 h-5" />,
      status: "success",
    },
    {
      id: 2,
      type: "Budget Approval",
      detail: "Library renovation budget pending approval ($15,000)",
      time: "4 hours ago",
      icon: <IoCashOutline className="w-5 h-5" />,
      status: "warning",
    },
    {
      id: 3,
      type: "Policy Update",
      detail: "Updated Hostel Safety Guidelines published",
      time: "Yesterday",
      icon: <IoDocumentTextOutline className="w-5 h-5" />,
      status: "info",
    },
    {
      id: 4,
      type: "System Alert",
      detail: "Maintenance scheduled for weekend",
      time: "Yesterday",
      icon: <IoWarningOutline className="w-5 h-5" />,
      status: "error",
    },
  ];

  // Department Performance (Mock)
  const departments = [
    { name: "Science", performance: 92, students: 450, staff: 24, color: "bg-blue-500" },
    { name: "Arts", performance: 88, students: 320, staff: 18, color: "bg-purple-500" },
    { name: "Commerce", performance: 85, students: 280, staff: 15, color: "bg-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Manager Overview</h1>
          <p className="text-sm sm:text-base text-primary-50/70">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-2 text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
            <IoCalendarOutline className="w-5 h-5 text-primary-50" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="relative flex flex-col items-start gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="w-full">
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.title}</div>
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                <IoTrendingUpOutline className={stat.trend === 'down' ? "rotate-180" : ""} />
                <span>{stat.change} vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Department Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <IoStatsChartOutline className="text-primary-50 w-5 h-5" />
                    Department Performance
                </h3>
                <button className="text-sm text-primary-50 font-semibold hover:underline">View All</button>
            </div>
            
            <div className="space-y-6">
                {departments.map((dept) => (
                    <div key={dept.name}>
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <h4 className="font-bold text-gray-800">{dept.name}</h4>
                                <p className="text-xs text-gray-500">{dept.students} Students • {dept.staff} Staff</p>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{dept.performance}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div className={`h-full rounded-full ${dept.color}`} style={{ width: `${dept.performance}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-50">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">92%</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Avg Attendance</div>
                </div>
                <div className="text-center border-l border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">B+</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Avg Grade</div>
                </div>
                <div className="text-center border-l border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Satisfaction</div>
                </div>
            </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <IoTimeOutline className="text-primary-50 w-5 h-5" />
                    Recent Activity
                </h3>
            </div>
            
            <div className="space-y-6 relative">
                 {/* Timeline line */}
                 <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100 z-0"></div>

                 {recentActivities.map((activity) => (
                     <div key={activity.id} className="relative z-10 flex gap-4">
                         <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow-sm shrink-0 
                            ${activity.status === 'success' ? 'bg-green-100 text-green-600' : 
                              activity.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                              activity.status === 'error' ? 'bg-red-100 text-red-600' :
                              'bg-blue-100 text-blue-600'
                            }`}
                        >
                             {activity.icon}
                         </div>
                         <div>
                             <p className="text-sm font-bold text-gray-900">{activity.type}</p>
                             <p className="text-xs text-gray-500 line-clamp-1 mb-1">{activity.detail}</p>
                             <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{activity.time}</span>
                         </div>
                     </div>
                 ))}
                 
                 <button className="w-full text-center text-sm font-semibold text-gray-500 hover:text-primary-50 py-2 mt-2 transition-colors">
                     View All Activity
                 </button>
            </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
         {[
             { label: "Add Staff", icon: <IoPeopleOutline />, color: "text-blue-600", bg: "bg-blue-50" },
             { label: "New Event", icon: <IoCalendarOutline />, color: "text-purple-600", bg: "bg-purple-50" },
             { label: "Budget Request", icon: <IoCashOutline />, color: "text-emerald-600", bg: "bg-emerald-50" },
             { label: "Broadcast", icon: <IoCheckmarkCircleOutline />, color: "text-amber-600", bg: "bg-amber-50" }
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

export default ManagerDashboard;
