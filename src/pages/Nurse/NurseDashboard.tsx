import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoArrowForwardOutline,
    IoCalendarOutline,
    IoClipboardOutline,
    IoDocumentTextOutline,
    IoFitnessOutline,
    IoFlaskOutline,
    IoHeartOutline,
    IoMedkitOutline,
    IoPeopleOutline,
    IoPulseOutline,
    IoShieldCheckmarkOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWarningOutline
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
  status: "success" | "warning" | "info" | "urgent";
  icon: React.ReactNode;
}

const NurseDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState(0);

  // Health center statistics with enhanced design
  const stats: StatCard[] = [
    {
      title: "Daily Appointments",
      value: "47",
      change: "+8.3%",
      trend: "up",
      icon: <IoCalendarOutline className="w-8 h-8" />,
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      textColor: "text-blue-600",
    },
    {
      title: "Active Patients",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: <IoPeopleOutline className="w-8 h-8" />,
      gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
      textColor: "text-emerald-600",
    },
    {
      title: "Emergency Cases",
      value: "3",
      change: "-15.2%",
      trend: "down",
      icon: <IoWarningOutline className="w-8 h-8" />,
      gradient: "from-amber-500 via-amber-600 to-amber-700",
      textColor: "text-amber-600",
    },
    {
      title: "Vaccinations Today",
      value: "28",
      change: "+24.8%",
      trend: "up",
      icon: <IoShieldCheckmarkOutline className="w-8 h-8" />,
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      textColor: "text-purple-600",
    },
  ];

  // Recent health center activities with icons
  const recentActivities: Activity[] = [
    {
      id: "1",
      type: "Emergency Response",
      description: "Student athlete treated for ankle sprain - Ice and compression applied",
      time: "10 min ago",
      status: "urgent",
      icon: <IoWarningOutline className="w-5 h-5" />,
    },
    {
      id: "2",
      type: "Vaccination Drive",
      description: "Flu shots administered to 28 students - Fall immunization program ongoing",
      time: "45 min ago",
      status: "success",
      icon: <IoShieldCheckmarkOutline className="w-5 h-5" />,
    },
    {
      id: "3",
      type: "Lab Results Ready",
      description: "Blood work completed for 5 students - All results within normal range",
      time: "1 hour ago",
      status: "info",
      icon: <IoFlaskOutline className="w-5 h-5" />,
    },
    {
      id: "4",
      type: "Prescription Filled",
      description: "Chronic medication refill for asthma patient - 30-day supply dispensed",
      time: "2 hours ago",
      status: "success",
      icon: <IoClipboardOutline className="w-5 h-5" />,
    },
    {
      id: "5",
      type: "Health Alert",
      description: "High pollen count advisory - Students with allergies notified",
      time: "3 hours ago",
      status: "warning",
      icon: <IoAlertCircleOutline className="w-5 h-5" />,
    },
    {
      id: "6",
      type: "Wellness Workshop",
      description: "Mental health session scheduled - 52 students registered for tomorrow",
      time: "4 hours ago",
      status: "info",
      icon: <IoFitnessOutline className="w-5 h-5" />,
    },
  ];

  // Health metrics with better visualization
  const healthMetrics = [
    { label: "Vaccination Coverage", value: 89, icon: <IoShieldCheckmarkOutline className="w-6 h-6" />, color: "bg-blue-500" },
    { label: "Health Checkups", value: 76, icon: <IoHeartOutline className="w-6 h-6" />, color: "bg-emerald-500" },
    { label: "Response Time", value: 94, icon: <IoPulseOutline className="w-6 h-6" />, color: "bg-amber-500" },
    { label: "Satisfaction Rate", value: 92, icon: <IoPeopleOutline className="w-6 h-6" />, color: "bg-purple-500" },
  ];

  // Today's schedule
  const todaySchedule = [
    { time: "09:00", patient: "Sarah Johnson", type: "Routine Checkup", status: "completed" },
    { time: "10:30", patient: "Michael Chen", type: "Vaccination", status: "in-progress" },
    { time: "14:00", patient: "Emily Davis", type: "Follow-up Visit", status: "upcoming" },
    { time: "15:30", patient: "James Wilson", type: "Lab Results Review", status: "upcoming" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />;
      case "warning":
        return <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />;
      case "urgent":
        return <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />;
    }
  };

  const getScheduleStatus = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Completed</span>;
      case "in-progress":
        return <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">In Progress</span>;
      default:
        return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">Upcoming</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Enhanced Header */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-lg">
                <IoMedkitOutline className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-50">
                  Health Center
                </h1>
                <p className="text-sm sm:text-base text-primary-50/70">
                  Student Wellness & Medical Services
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-md border border-gray-100">
            <p className="text-xs text-primary-50/60 mb-1">Today's Date</p>
            <p className="text-lg font-bold text-primary-50">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-3xl sm:text-4xl font-bold text-primary-50 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-primary-50/60 font-medium">
                  {stat.title}
                </div>
              </div>

              <div className={`flex items-center gap-1.5 text-xs font-semibold ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.trend === "up" ? (
                  <IoTrendingUpOutline className="w-4 h-4" />
                ) : (
                  <IoTrendingDownOutline className="w-4 h-4" />
                )}
                <span>{stat.change} from last week</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Health Metrics - Redesigned */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-50">
              Performance Metrics
            </h2>
            <button className="text-primary-100 hover:text-primary-50 text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50/5 transition-colors">
              View Report
              <IoArrowForwardOutline className="w-4 h-4" />
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {healthMetrics.map((metric, index) => (
              <div
                key={index}
                onClick={() => setSelectedMetric(index)}
                className={`group cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedMetric === index
                    ? "border-primary-100 bg-primary-50/5 shadow-lg"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${metric.color} text-white`}>
                    {metric.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-50">{metric.value}%</div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm font-semibold text-primary-50 mb-2">{metric.label}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`${metric.color} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-primary-50/60">
                  <div className={`w-1.5 h-1.5 rounded-full ${metric.color}`}></div>
                  <span>Target: 85%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "100ms" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6">
            Today's Schedule
          </h2>
          <div className="space-y-4">
            {todaySchedule.map((appointment, index) => (
              <div
                key={index}
                className="group p-4 rounded-xl border border-gray-100 hover:border-primary-100/30 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50/30"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary-50 text-white px-3 py-1.5 rounded-lg text-sm font-bold shrink-0">
                    {appointment.time}
                  </div>
                  {getScheduleStatus(appointment.status)}
                </div>
                <div className="text-sm font-semibold text-primary-50 mb-1">
                  {appointment.patient}
                </div>
                <div className="text-xs text-primary-50/60">
                  {appointment.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities - Redesigned */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 mb-8 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6">
          Recent Activities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentActivities.slice(0, 6).map((activity) => (
            <div
              key={activity.id}
              className="group p-5 rounded-xl border border-gray-100 hover:border-primary-100/30 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50/30"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  activity.status === "urgent" ? "bg-red-100 text-red-600" :
                  activity.status === "warning" ? "bg-amber-100 text-amber-600" :
                  activity.status === "success" ? "bg-green-100 text-green-600" :
                  "bg-blue-100 text-blue-600"
                }`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(activity.status)}
                    <span className="text-xs text-primary-50/50 font-medium">{activity.time}</span>
                  </div>
                  <div className="text-sm font-semibold text-primary-50 mb-1.5">
                    {activity.type}
                  </div>
                  <div className="text-xs text-primary-50/70 line-clamp-2">
                    {activity.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions - Redesigned */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "300ms" }}>
        <h2 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: <IoCalendarOutline className="w-6 h-6" />, label: "Appointments", color: "from-blue-500 to-blue-600", path: "/nurse/appointments" },
            { icon: <IoMedkitOutline className="w-6 h-6" />, label: "Inventory", color: "from-emerald-500 to-emerald-600", path: "/nurse/medical-inventory" },
            { icon: <IoClipboardOutline className="w-6 h-6" />, label: "Prescriptions", color: "from-amber-500 to-amber-600", path: "/nurse/prescriptions" },
            { icon: <IoFlaskOutline className="w-6 h-6" />, label: "Lab Tests", color: "from-purple-500 to-purple-600", path: "/nurse/lab-tests" },
            { icon: <IoShieldCheckmarkOutline className="w-6 h-6" />, label: "Vaccinations", color: "from-pink-500 to-pink-600", path: "/nurse/vaccinations" },
            { icon: <IoDocumentTextOutline className="w-6 h-6" />, label: "Reports", color: "from-indigo-500 to-indigo-600", path: "/nurse/health-reports" },
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="group flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 bg-white hover:scale-105"
            >
              <div className={`p-4 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                {action.icon}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-primary-50 text-center">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;
