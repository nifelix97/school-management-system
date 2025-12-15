import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoAnalyticsOutline,
    IoArrowForwardOutline,
    IoBookOutline,
    IoBriefcaseOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoDocumentTextOutline,
    IoMegaphoneOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoTrophyOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
  status: "success" | "warning" | "info";
}

interface QuickStat {
  label: string;
  value: number;
  total: number;
  color: string;
  gradient: string;
}


const VicePrincipalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activityPage, setActivityPage] = useState(1);
  const itemsPerPage = 2;
  // Principal-specific statistics with gradients
  const stats: StatCard[] = [
    {
      title: "Total Enrollment",
      value: "3,245",
      change: "+8.3%",
      trend: "up",
      icon: <IoSchoolOutline className="w-7 h-7 sm:w-9 sm:h-9" />,
      gradient: "from-primary-50 to-primary-50/80",
      iconBg: "bg-gradient-to-br from-primary-50 to-primary-50/90",
    },
    {
      title: "Faculty Members",
      value: "187",
      change: "+4.5%",
      trend: "up",
      icon: <IoPeopleOutline className="w-7 h-7 sm:w-9 sm:h-9" />,
      gradient: "from-primary-100 to-primary-100/80",
      iconBg: "bg-gradient-to-br from-primary-100 to-primary-100/90",
    },
    {
      title: "Academic Programs",
      value: "42",
      change: "+2.4%",
      trend: "up",
      icon: <IoBookOutline className="w-7 h-7 sm:w-9 sm:h-9" />,
      gradient: "from-primary-200 to-primary-200/80",
      iconBg: "bg-gradient-to-br from-primary-200 to-primary-200/90",
    },
    {
      title: "Pending Approvals",
      value: "18",
      change: "-15.2%",
      trend: "down",
      icon: <IoCheckmarkCircleOutline className="w-7 h-7 sm:w-9 sm:h-9" />,
      gradient: "from-primary-300 to-primary-300/80",
      iconBg: "bg-gradient-to-br from-primary-300 to-primary-300/90",
    },
  ];

  // Recent activities for principal
  const recentActivities: Activity[] = [
    {
      id: "1",
      type: "Budget Approval",
      description: "Department of Engineering budget proposal submitted for review",
      time: "10 minutes ago",
      status: "warning",
    },
    {
      id: "2",
      type: "Faculty Appointment",
      description: "New professor approved for Computer Science department",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: "3",
      type: "Policy Update",
      description: "Academic integrity policy revision pending your review",
      time: "2 hours ago",
      status: "info",
    },
    {
      id: "4",
      type: "Strategic Meeting",
      description: "Board of Trustees meeting scheduled for next Monday at 10 AM",
      time: "4 hours ago",
      status: "info",
    },
    {
      id: "5",
      type: "Performance Report",
      description: "Q4 institutional performance report is now available",
      time: "6 hours ago",
      status: "success",
    },
  ];

  // Institutional performance metrics with gradients
  const performanceMetrics: QuickStat[] = [
    { 
      label: "Student Satisfaction", 
      value: 87, 
      total: 100, 
      color: "bg-primary-50",
      gradient: "from-primary-50 to-primary-50/70"
    },
    { 
      label: "Faculty Retention", 
      value: 94, 
      total: 100, 
      color: "bg-primary-100",
      gradient: "from-primary-100 to-primary-100/70"
    },
    { 
      label: "Research Output", 
      value: 78, 
      total: 100, 
      color: "bg-primary-200",
      gradient: "from-primary-200 to-primary-200/70"
    },
    { 
      label: "Budget Utilization", 
      value: 82, 
      total: 100, 
      color: "bg-primary-300",
      gradient: "from-primary-300 to-primary-300/70"
    },
  ];

  // Department performance
  const departmentPerformance = [
    { name: "Engineering", performance: 92, budget: 85, students: 645, color: "bg-primary-50" },
    { name: "Computer Science", performance: 89, budget: 90, students: 523, color: "bg-primary-100" },
    { name: "Business", performance: 86, budget: 78, students: 487, color: "bg-primary-200" },
    { name: "Medicine", performance: 94, budget: 95, students: 412, color: "bg-primary-300" },
    { name: "Arts & Humanities", performance: 81, budget: 72, students: 356, color: "bg-primary-50" },
    { name: "Natural Sciences", performance: 88, budget: 88, students: 424, color: "bg-primary-100" },
  ];

  // Upcoming strategic events
  const upcomingEvents = [
    { title: "Board of Trustees Meeting", date: "Nov 28, 2025", time: "10:00 AM", type: "Governance", priority: "high" },
    { title: "Faculty Senate Session", date: "Nov 30, 2025", time: "2:00 PM", type: "Academic", priority: "medium" },
    { title: "Budget Review Committee", date: "Dec 2, 2025", time: "9:00 AM", type: "Finance", priority: "high" },
    { title: "Accreditation Review", date: "Dec 5, 2025", time: "11:00 AM", type: "Quality", priority: "high" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <IoCheckmarkCircleOutline className="w-5 h-5 text-green-500" />;
      case "warning":
        return <IoAlertCircleOutline className="w-5 h-5 text-amber-500" />;
      default:
        return <IoTimeOutline className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-600 border-red-200";
      case "medium":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "bg-blue-50 text-blue-600 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Enhanced Header */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Executive Dashboard
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Strategic insights and institutional performance overview
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs sm:text-sm text-primary-50/60">Last updated</p>
            <p className="text-sm sm:text-base font-semibold text-primary-50">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Cards with Gradients */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            {/* Gradient Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-5">
                <div className={`${stat.iconBg} p-3.5 rounded-xl text-white shadow-md`}>
                  {stat.icon}
                </div>
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                    stat.trend === "up" 
                      ? "bg-green-50 text-green-600" 
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <IoTrendingUpOutline className="w-4 h-4" />
                  ) : (
                    <IoTrendingDownOutline className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-primary-50/60 mb-2 font-medium uppercase tracking-wide">
                {stat.title}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-primary-50">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Enhanced Institutional Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-50">
              Institutional Performance
            </h2>
            <button className="text-primary-100 hover:text-primary-50 text-sm font-medium flex items-center gap-1 transition-colors">
              View Details
              <IoArrowForwardOutline className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-12">
            {/* Large Circular Progress */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
                {performanceMetrics.map((metric, index) => {
                  const radius = 120 - index * 25;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDashoffset = circumference - (metric.value / 100) * circumference;
                  
                  return (
                    <React.Fragment key={index}>
                      {/* Background Circle */}
                      <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="transparent"
                        className="text-gray-50"
                      />
                      {/* Progress Circle */}
                      <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="16"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                        style={{ 
                          color: index === 0 ? '#1e3a8a' : // primary-300
                                 index === 1 ? '#3b82f6' : // primary-200
                                 index === 2 ? '#60a5fa' : // primary-100
                                 '#93c5fd'                 // primary-50
                        }}
                      >
                        <animate 
                          attributeName="stroke-dashoffset" 
                          from={circumference} 
                          to={strokeDashoffset} 
                          dur="1.5s" 
                          fill="freeze" 
                        />
                      </circle>
                    </React.Fragment>
                  );
                })}
              </svg>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-5xl font-bold text-primary-50">
                  {Math.round(performanceMetrics.reduce((acc, curr) => acc + curr.value, 0) / performanceMetrics.length)}%
                </span>
                <span className="text-sm text-primary-50/60 font-medium uppercase tracking-wider mt-2">
                  Overall Score
                </span>
              </div>
            </div>

            {/* Legend / Metrics List */}
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-primary-100/20 transition-all duration-300">
                  <div 
                    className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                    style={{ 
                      backgroundColor: index === 0 ? '#1e3a8a' : // primary-300
                                     index === 1 ? '#3b82f6' : // primary-200
                                     index === 2 ? '#60a5fa' : // primary-100
                                     '#93c5fd'                 // primary-50
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-base font-semibold text-primary-50">{metric.label}</span>
                      <span className="text-lg font-bold text-primary-50">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${metric.value}%`,
                          backgroundColor: index === 0 ? '#1e3a8a' : // primary-300
                                         index === 1 ? '#3b82f6' : // primary-200
                                         index === 2 ? '#60a5fa' : // primary-100
                                         '#93c5fd'                 // primary-50
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Recent Activities */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6 sm:mb-8">
            Recent Activities
          </h2>
          <div className="space-y-5">
            {recentActivities
              .slice((activityPage - 1) * itemsPerPage, activityPage * itemsPerPage)
              .map((activity) => (
              <div
                key={activity.id}
                className="group flex gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0 hover:bg-gray-50/50 -mx-2 px-2 py-2 rounded-lg transition-colors"
              >
                <div className="shrink-0 mt-0.5">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-base font-semibold text-primary-50 mb-1.5">
                    {activity.type}
                  </div>
                  <div className="text-xs sm:text-sm text-primary-50/70 mb-2 line-clamp-2">
                    {activity.description}
                  </div>
                  <div className="text-xs text-primary-50/50 font-medium">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setActivityPage(p => Math.max(1, p - 1))}
              disabled={activityPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <IoChevronBackOutline className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-primary-50">
              Page {activityPage} of {Math.ceil(recentActivities.length / itemsPerPage)}
            </span>
            <button
              onClick={() => setActivityPage(p => Math.min(Math.ceil(recentActivities.length / itemsPerPage), p + 1))}
              disabled={activityPage === Math.ceil(recentActivities.length / itemsPerPage)}
              className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <IoChevronForwardOutline className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Department Performance */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6 sm:mb-8">
          Department Performance Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departmentPerformance.map((dept, index) => (
            <div key={index} className="group p-5 rounded-xl border-2 border-gray-100 hover:border-primary-100/30 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50/30">
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-primary-50 text-base">{dept.name}</div>
                <div className="text-xs font-semibold text-primary-50/60 bg-gray-100 px-2.5 py-1 rounded-full">
                  {dept.students} students
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-primary-50/70 font-medium">
                      Academic Performance
                    </span>
                    <span className="text-sm sm:text-base font-bold text-primary-50">
                      {dept.performance}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${dept.color} h-full rounded-full transition-all duration-700 shadow-sm`}
                      style={{ width: `${dept.performance}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-primary-50/70 font-medium">
                      Budget Utilization
                    </span>
                    <span className="text-sm sm:text-base font-bold text-primary-50">
                      {dept.budget}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary-200 to-primary-300 h-full rounded-full transition-all duration-700 shadow-sm"
                      style={{ width: `${dept.budget}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid - Enhanced Events and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Upcoming Strategic Events */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6 sm:mb-8">
            Upcoming Strategic Events
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-primary-50/5 hover:to-primary-100/5 border border-gray-100 hover:border-primary-100/30 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="text-sm sm:text-base font-semibold text-primary-50 mb-1.5">
                    {event.title}
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-primary-50/60">
                    <span className="flex items-center gap-1">
                      <IoCalendarOutline className="w-3.5 h-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <IoTimeOutline className="w-3.5 h-3.5" />
                      {event.time}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${getPriorityColor(event.priority)}`}>
                  {event.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6 sm:mb-8">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <IoAnalyticsOutline />, label: "Strategic Plan", color: "from-primary-50 to-primary-50/80", path: "/principal/strategic-planning" },
              { icon: <IoBriefcaseOutline />, label: "Dept. Heads", color: "from-primary-100 to-primary-100/80", path: "/principal/department-heads" },
              { icon: <IoDocumentTextOutline />, label: "Reports", color: "from-primary-200 to-primary-200/80", path: "/principal/reports" },
              { icon: <IoMegaphoneOutline />, label: "Announce", color: "from-primary-300 to-primary-300/80", path: "/principal/announcements" },
              { icon: <IoTrophyOutline />, label: "Performance", color: "from-primary-50 to-primary-50/80", path: "/principal/performance" },
              { icon: <IoStatsChartOutline />, label: "Analytics", color: "from-primary-100 to-primary-100/80", path: "/principal/reports" },
            ].map((action, index) => (
              <button 
                key={index}
                onClick={() => navigate(action.path)}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50"
              >
                <div className={`bg-gradient-to-br ${action.color} p-3.5 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  {React.cloneElement(action.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 sm:w-7 sm:h-7" })}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-primary-50 text-center group-hover:text-primary-100 transition-colors">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VicePrincipalDashboard;
