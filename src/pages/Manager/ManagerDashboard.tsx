import React, { useState } from "react";
import {
  IoCalendarOutline,
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoPeopleOutline,
  IoSchoolOutline,
  IoTimeOutline,
  // IoTrendingUpOutline,
  IoWarningOutline
} from "react-icons/io5";

const ManagerDashboard: React.FC = () => {
  const [showFullFeed, setShowFullFeed] = useState(false);
  // Statistics Data
  const stats = [
    {
      title: "Active Students",
      value: "1,245",
      change: "+4.5%",
      trend: "up",
      icon: <IoSchoolOutline className="w-6 h-6" />,
      accent: "border-blue-500",
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Faculty Staff",
      value: "84",
      change: "+2.1%",
      trend: "up",
      icon: <IoPeopleOutline className="w-6 h-6" />,
      accent: "border-purple-500",
      iconBg: "bg-purple-50 text-purple-600",
    },
    {
      title: "Monthly Revenue",
      value: "$124,500",
      change: "+12.3%",
      trend: "up",
      icon: <IoCashOutline className="w-6 h-6" />,
      accent: "border-emerald-500",
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Tasks",
      value: "12",
      change: "-15%",
      trend: "down",
      icon: <IoDocumentTextOutline className="w-6 h-6" />,
      accent: "border-amber-500",
      iconBg: "bg-amber-50 text-amber-600",
    },
  ];

  // Recent Activity Data
  const recentActivities = [
    {
      id: 1,
      type: "Human Resources",
      detail: "Sarah Johnson joined as Senior Lecturer (Comp Sci Dept)",
      time: "2 hours ago",
      icon: <IoPeopleOutline className="w-5 h-5" />,
      status: "success",
    },
    {
      id: 2,
      type: "Financial Services",
      detail: "Library renovation budget pending final approval",
      time: "4 hours ago",
      icon: <IoCashOutline className="w-5 h-5" />,
      status: "warning",
    },
    {
      id: 3,
      type: "Administration",
      detail: "Updated Institutional Safety Guidelines published",
      time: "Yesterday",
      icon: <IoDocumentTextOutline className="w-5 h-5" />,
      status: "info",
    },
    {
      id: 4,
      type: "Security Ops",
      detail: "Unauthorized login attempt flagged by system",
      time: "Yesterday",
      icon: <IoWarningOutline className="w-5 h-5" />,
      status: "error",
    },
  ];

  // Operational Health Matrix
  const departments = [
    { name: "Science & Technology", performance: 92, students: 450, staff: 24, status: "Optimal" },
    { name: "Fine Arts & Humanities", performance: 88, students: 320, staff: 18, status: "Good" },
    { name: "Business & Commerce", performance: 85, students: 280, staff: 15, status: "Stable" },
  ];


  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Professional Header */}
      <header className="bg-white border-b border-slate-200 px-6 sm:px-10 py-8 mb-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
             <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                <span>Portal Management</span>
                <span className="text-slate-200">/</span>
                <span className="text-slate-900">Dashboard</span>
             </div>
             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">System Overview</h1>
             <p className="text-slate-500 text-sm">Real-time indicators for Excellence Academy operations</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right mr-4">
               <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync Active
               </div>
               <div className="text-slate-400 text-[9px] uppercase font-bold tracking-tighter">Updated: {new Date().toLocaleTimeString()}</div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl px-4 py-2.5">
               <IoCalendarOutline className="w-5 h-5 text-slate-400" />
               <span className="text-sm font-semibold text-slate-700">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
               </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 pb-20 space-y-10">
        {/* KPI Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <article key={idx} className={`bg-white rounded-2xl p-6 border-t-4 ${stat.accent} border-x border-b border-slate-200 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center transition-transform hover:scale-110`}>
                  {stat.icon}
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
              <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.title}</h2>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Operational Health Matrix */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
               <header className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <h3 className="font-bold text-slate-900 flex items-center gap-3">
                     <div className="w-1 h-5 bg-primary-50 rounded-full" />
                     Departmental Performance Matrix
                  </h3>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-50 shadow-sm shadow-primary-50/30" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Performance Score</span>
                     </div>
                  </div>
               </header>

               <div className="p-12">
                  {/* Custom SVG Bar Chart for Departments */}
                  <div className="relative h-72 w-full mb-10 group">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 600 240">
                      {[0, 25, 50, 75, 100].map((line) => (
                        <line key={line} x1="0" y1={220 - (line * 2)} x2="600" y2={220 - (line * 2)} stroke="#F1F5F9" strokeWidth="1" />
                      ))}
                      {departments.map((dept, i) => {
                        const barWidth = 80;
                        const spacing = 600 / departments.length;
                        const x = i * spacing + (spacing - barWidth) / 2;
                        const height = dept.performance * 2;
                        return (
                          <g key={i}>
                            <rect
                              x={x}
                              y={220 - height}
                              width={barWidth}
                              height={height}
                              fill="var(--color-primary-50)"
                              rx="10"
                              className="transition-all duration-500 hover:opacity-80 cursor-pointer shadow-sm"
                            />
                            <text
                              x={x + barWidth / 2}
                              y={220 - height - 15}
                              textAnchor="middle"
                              className="text-[14px] font-bold fill-slate-800"
                            >
                              {dept.performance}%
                            </text>
                            <text
                              x={x + barWidth / 2}
                              y={240}
                              textAnchor="middle"
                              className="text-[10px] font-bold fill-slate-400 uppercase tracking-widest"
                            >
                              {dept.name.split(' & ')[0]}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                    <div className="flex justify-between mt-8 px-4 opacity-0 h-0 overflow-hidden">
                      {/* Hidden but kept for semantic consistency if needed elsewhere */}
                      {departments.map((dept, i) => (
                        <div key={i} className="text-center w-32">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block leading-tight">
                            {dept.name.split(' & ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/30">
                  {[
                    { label: "Attendance", value: "94.2%" },
                    { label: "Efficiency", value: "88.1%" },
                    { label: "Health Index", value: "92/100" }
                  ].map((item, i) => (
                    <div key={i} className="py-6 px-4 text-center">
                       <p className="text-lg font-bold text-slate-900 mb-0.5">{item.value}</p>
                       <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Hub Actions */}
            <div>
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-6 px-2">Institutional Hub</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Faculty Onboarding", icon: <IoPeopleOutline />, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Digital Broadcast", icon: <IoCheckmarkCircleOutline />, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Budgetary Review", icon: <IoCashOutline />, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Academic Planner", icon: <IoCalendarOutline />, color: "text-amber-600", bg: "bg-amber-50" },
                  ].map((action, i) => (
                    <button key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 group text-left space-y-4">
                       <div className={`w-10 h-10 rounded-xl ${action.bg} ${action.color} flex items-center justify-center transition-transform group-hover:rotate-6`}>
                          {action.icon}
                       </div>
                       <div className="font-bold text-slate-700 text-xs leading-tight">{action.label}</div>
                    </button>
                  ))}
               </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 h-fit relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                     <IoTimeOutline className="text-primary-50 w-5 h-5" />
                     Pulse Feed
                  </h3>
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded">LIVE</span>
               </div>

               <div className="space-y-8 relative">
                  <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-100" />
                  {(showFullFeed ? recentActivities : recentActivities.slice(0, 3)).map((log) => (
                    <div key={log.id} className="relative z-10 flex gap-4 group">
                       <div className={`w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0 transition-transform group-hover:scale-110
                          ${log.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 
                            log.status === 'warning' ? 'bg-amber-100 text-amber-600' :
                            log.status === 'error' ? 'bg-red-100 text-red-600' :
                            'bg-blue-100 text-blue-600'
                          }`}
                       >
                          {log.icon}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{log.type}</span>
                             <span className="text-[9px] text-slate-300 font-medium">{log.time}</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700 leading-relaxed truncate group-hover:text-primary-50 transition-colors">{log.detail}</p>
                       </div>
                    </div>
                  ))}
               </div>

               <button 
                 onClick={() => setShowFullFeed(!showFullFeed)}
                 className="w-full mt-10 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-slate-200"
               >
                  {showFullFeed ? "Show Less" : "Full Institutional Logs"}
               </button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default ManagerDashboard;