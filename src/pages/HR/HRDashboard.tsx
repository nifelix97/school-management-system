import React from "react";
import {
  IoArrowForwardOutline,
  IoCalendarOutline,
  IoCashOutline,
  IoExitOutline,
  IoPeopleOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp, bgColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-primary-50 text-sm font-medium mb-2 truncate" title={title}>{title}</p>
          <h3 className="text-2xl font-bold text-primary-50 mb-1">{value}</h3>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trendUp ? 'text-primary-100' : 'text-primary-200'}`}>
              <IoTrendingUpOutline className={trendUp ? '' : 'rotate-180'} />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ title: string; icon: React.ReactNode; onClick: () => void }> = ({ title, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-all border border-gray-200 hover:border-primary-50 w-full text-left group"
    >
      <div className="text-primary-50 text-2xl">{icon}</div>
      <span className="font-medium text-primary-50 flex-1">{title}</span>
      <IoArrowForwardOutline className="text-gray-400 group-hover:text-primary-50 transition-colors" />
    </button>
  );
};

const HRDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Employees",
      value: "156",
      icon: <IoPeopleOutline className="text-xl text-primary-100" />,
      trend: "+4 this month",
      trendUp: true,
      bgColor: "bg-primary-100/10",
    },
    {
      title: "Attendance Rate",
      value: "94.5%",
      icon: <IoCalendarOutline className="text-xl text-primary-200" />,
      trend: "-1.2% from last week",
      trendUp: false,
      bgColor: "bg-primary-200/10",
    },
    {
      title: "Pending Leave Requests",
      value: "12",
      icon: <IoExitOutline className="text-xl text-primary-300" />,
      trend: "5 urgent",
      trendUp: false,
      bgColor: "bg-primary-300/10",
    },
    {
      title: "Total Payroll (Month)",
      value: "UGX 85,400,000",
      icon: <IoCashOutline className="text-xl text-primary-100" />,
      trend: "+2.3% this month",
      trendUp: true,
      bgColor: "bg-primary-100/10",
    },
  ];

  // Donut Chart Data
  const donutData = [
    { label: "Teaching", value: 65, color: "#1E3A8A" },
    { label: "Admin", value: 20, color: "#3B82F6" },
    { label: "Support", value: 15, color: "#93C5FD" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mb-8 font-primary">
        <h1 className="text-3xl font-bold text-primary-50 mb-2 tracking-tight">HR Dashboard</h1>
        <p className="text-primary-50/40 font-medium">Manage your workforce, payroll, and recruitment from one place.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-primary-50">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Attendance Analysis (Area Chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-primary-50">Attendance Analysis</h2>
              <p className="text-xs text-primary-50/40 font-medium">Comparative workforce trend</p>
            </div>
            <div className="flex items-center gap-4">
               {/* Controls from image */}
               <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded border border-gray-100 flex items-center justify-center text-gray-400 text-sm hover:bg-gray-50 cursor-pointer">+</div>
                  ))}
               </div>
            </div>
          </div>
          
          <div className="h-64 relative">
            <svg viewBox="0 0 120 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              {/* Horizontal Grid */}
              {[0, 20, 40, 60, 80, 100].map(y => (
                <line key={y} x1="0" y1={y} x2="120" y2={y} stroke="#F3F4F6" strokeWidth="0.5" />
              ))}
              
              {/* Actual Data (Gray-Blue) */}
              <path
                d="M 0 100 L 0 90 L 20 80 L 40 75 L 60 40 L 80 30 L 100 25 L 120 30 L 120 100 Z"
                fill="#fde409ff"
                fillOpacity="0.7"
              />
              {/* Target Data (Maroon) */}
              <path
                d="M 0 100 L 0 98 L 20 95 L 40 85 L 60 80 L 80 60 L 100 45 L 120 28 L 120 100 Z"
                fill="#1E3A8A"
                fillOpacity="0.8"
              />

              {/* Data Points for Actual (on top for hover) */}
              {[90, 80, 75, 40, 30, 25, 30].map((v, i) => (
                <g key={`act-${i}`} className="group/dot cursor-pointer origin-center">
                  <circle cx={i * 20} cy={v} r="1.5" fill="#3B82F6" stroke="white" strokeWidth="0.5" />
                  <g className="opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none">
                    <rect x={i * 20 - 10} y={v - 12} width="20" height="8" rx="2" fill="#1E3A8A" />
                    <text x={i * 20} y={v - 6.5} fontSize="4" fontWeight="bold" fill="white" textAnchor="middle">
                      {100 - v}%
                    </text>
                  </g>
                </g>
              ))}

              {/* Data Points for Target */}
              {[98, 95, 85, 80, 60, 45, 28].map((v, i) => (
                <g key={`tar-${i}`} className="group/dot cursor-pointer origin-center">
                  <circle cx={i * 20} cy={v} r="1.5" fill="#3B82F6" stroke="white" strokeWidth="0.5" />
                  <g className="opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none">
                    <rect x={i * 20 - 10} y={v - 12} width="20" height="8" rx="2" fill="#991B1B" />
                    <text x={i * 20} y={v - 6.5} fontSize="4" fontWeight="bold" fill="white" textAnchor="middle">
                      {100 - v}%
                    </text>
                  </g>
                </g>
              ))}
            </svg>
            
            {/* Axis Labels - Days of the Week */}
            <div className="flex justify-between items-center mt-6 px-1">
              {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((label, idx) => (
                <span key={idx} className="text-[9px] font-black text-primary-50/40 tracking-tighter w-[40px] text-center">{label}</span>
              ))}
            </div>

            {/* Legend inspired by image */}
            <div className="flex justify-center gap-8 mt-12 pb-4">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary-50 rounded-sm"></div>
                  <span className="text-[11px] font-bold text-primary-50/60 uppercase tracking-widest">Actual Present</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary-100 rounded-sm"></div>
                  <span className="text-[11px] font-bold text-primary-50/60 uppercase tracking-widest">Target Trend</span>
               </div>
            </div>
          </div>
        </div>

        {/* Staff Distribution (Donut Chart) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-xl font-bold text-primary-50 mb-1">Staff Composition</h2>
          <p className="text-xs text-primary-50/40 font-medium mb-8">Departmental breakdown</p>
          
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg viewBox="0 0 32 32" className="w-full h-full transform -rotate-90">
              <circle r="16" cx="16" cy="16" fill="transparent" stroke="#F3F4F6" strokeWidth="4" />
              {donutData.reduce((acc: any, curr, i) => {
                const offset = i === 0 ? 0 : acc.reduce((sum: number, prev: any) => sum + prev.value, 0);
                const strokeDasharray = `${curr.value} 100`;
                acc.push({ ...curr, offset, strokeDasharray });
                return acc;
              }, []).map((segment: any, i: number) => (
                <circle
                  key={i}
                  r="16"
                  cx="16"
                  cy="16"
                  fill="transparent"
                  stroke={segment.color}
                  strokeWidth="4"
                  strokeDasharray={segment.strokeDasharray}
                  strokeDashoffset={-segment.offset}
                  className="hover:opacity-80 transition-opacity cursor-pointer shadow-inner"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-primary-50">156</span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-primary-50/30">Total</span>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            {donutData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs font-bold text-primary-50/70">{item.label}</span>
                </div>
                <span className="text-xs font-black text-primary-50">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
         {/* Recent Activities */}
         <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-xl font-bold text-primary-50">Activity Timeline</h2>
             <button className="text-xs font-bold text-primary-100 hover:underline">View History</button>
           </div>
           <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[1px] before:bg-gray-100">
             {[
               { text: "New staff 'David Okonkwo' was added to Science Dept.", time: "2 hours ago", color: "bg-blue-500" },
               { text: "Leave request for 'Jane Smith' was approved.", time: "4 hours ago", color: "bg-green-500" },
               { text: "Monthly payroll for Dec 2025 was processed.", time: "Yesterday", color: "bg-purple-500" },
               { text: "3 new applications received for 'Math Teacher'.", time: "3 days ago", color: "bg-orange-500" },
             ].map((activity, i) => (
               <div key={i} className="relative pl-8 group">
                 <div className={`absolute left-0 top-1 w-[23px] h-[23px] rounded-xl border-4 border-white shadow-sm ${activity.color}`}></div>
                 <div>
                   <p className="text-sm text-primary-50 font-bold leading-tight">{activity.text}</p>
                   <p className="text-[11px] font-bold text-primary-50/30 mt-1 uppercase tracking-wide">{activity.time}</p>
                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* Priority Actions */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Priority Tasks</h2>
            <div className="space-y-4">
              <QuickAction title="Staff Management" icon={<IoPeopleOutline />} onClick={() => navigate("/hr/staff-management")} />
              <QuickAction title="Payroll Process" icon={<IoCashOutline />} onClick={() => navigate("/hr/payroll")} />
              <QuickAction title="Leave Approvals" icon={<IoExitOutline />} onClick={() => navigate("/hr/leave-management")} />
            </div>
         </div>
      </div>
    </div>
  );
};

export default HRDashboard;
