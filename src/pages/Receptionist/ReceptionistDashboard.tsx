import React from "react";
import {
    IoCalendarOutline,
    IoCallOutline,
    IoCheckmarkCircleOutline,
    IoClipboardOutline,
    IoGridOutline,
    IoHelpCircleOutline,
    IoMailOutline,
    IoPeopleOutline,
    IoPersonAddOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrendingUpOutline
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ReceptionistDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Statistics Data
  const stats = [
    {
      title: "Daily Visitors",
      value: "124",
      change: "+12%",
      trend: "up",
      icon: <IoPeopleOutline className="w-8 h-8" />,
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      textColor: "text-blue-600",
    },
    {
      title: "Pending Inquiries",
      value: "8",
      change: "-5%",
      trend: "down",
      icon: <IoHelpCircleOutline className="w-8 h-8" />,
      gradient: "from-amber-500 via-amber-600 to-amber-700",
      textColor: "text-amber-600",
    },
    {
      title: "Today's Appointments",
      value: "32",
      change: "+8%",
      trend: "up",
      icon: <IoCalendarOutline className="w-8 h-8" />,
      gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
      textColor: "text-emerald-600",
    },
    {
      title: "Unread Messages",
      value: "15",
      change: "+2%",
      trend: "up",
      icon: <IoMailOutline className="w-8 h-8" />,
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      textColor: "text-purple-600",
    },
  ];

  // Recent Activity Data
  const recentActivities = [
    {
      id: 1,
      type: "Visitor Check-in",
      detail: "John Doe (Parent) checked in for meeting with Principal",
      time: "5 mins ago",
      icon: <IoPersonAddOutline className="w-5 h-5" />,
      status: "success",
    },
    {
      id: 2,
      type: "Incoming Call",
      detail: "Inquiry about admission process from +1 (555) 000-1234",
      time: "15 mins ago",
      icon: <IoCallOutline className="w-5 h-5" />,
      status: "info",
    },
    {
      id: 3,
      type: "Package Delivery",
      detail: "FedEx package received for IT Department",
      time: "1 hour ago",
      icon: <IoClipboardOutline className="w-5 h-5" />,
      status: "warning",
    },
    {
      id: 4,
      type: "Appointment",
      detail: "Ms. Sarah Smith arrived for interivew",
      time: "2 hours ago",
      icon: <IoCalendarOutline className="w-5 h-5" />,
      status: "success",
    },
  ];

  // Today's Schedule Data
  const todaySchedule = [
    { time: "09:00 AM", event: "Staff Meeting", location: "Conference Room A", status: "Completed" },
    { time: "10:30 AM", event: "Parent-Teacher Conference", location: "Room 101", status: "In Progress" },
    { time: "01:00 PM", event: "Vendor Delivery", location: "Front Desk", status: "Upcoming" },
    { time: "03:00 PM", event: "Board Meeting Setup", location: "Main Hall", status: "Upcoming" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-100 text-green-600";
      case "warning": return "bg-amber-100 text-amber-600";
      case "info": return "bg-blue-100 text-blue-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getScheduleStatusStyle = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      case "Upcoming": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-50 text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-lg">
              <IoGridOutline className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary-50">Reception</h1>
              <p className="text-sm sm:text-base text-primary-50/70">Front Desk Overview & Management</p>
            </div>
          </div>
          <div className="bg-white rounded-xl px-6 py-3 shadow-md border border-gray-100 min-w-[200px]">
            <p className="text-xs text-primary-50/60 mb-1">Current Time</p>
            <p className="text-xl font-bold text-primary-50 flex items-center gap-2">
              <IoTimeOutline className="w-5 h-5 text-primary-100" />
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xs text-primary-50/50 mt-1">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
             {/* Animated gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            
            <div className="relative flex flex-col items-start gap-4">
               <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
               </div>
               
               <div className="min-w-0 w-full">
                 <div className="text-3xl font-bold text-primary-50 mb-1">{stat.value}</div>
                 <div className="text-sm text-primary-50/60 font-medium break-words">{stat.title}</div>
               </div>

               <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                 <IoTrendingUpOutline />
                 <span>{stat.change} vs yesterday</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both] delay-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary-50 flex items-center gap-2">
              <IoClipboardOutline className="w-6 h-6 text-primary-100" />
              Recent Activity
            </h2>
            <button className="text-sm text-primary-100 font-semibold hover:text-primary-50 transition-colors">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100 group">
                <div className={`p-2.5 rounded-lg shrink-0 ${getStatusColor(activity.status)}`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                     <h3 className="font-bold text-primary-50 text-sm sm:text-base">{activity.type}</h3>
                     <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{activity.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Widget */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both] delay-200">
          <h2 className="text-xl font-bold text-primary-50 mb-6 flex items-center gap-2">
            <IoCalendarOutline className="w-6 h-6 text-primary-100" />
            Today's Schedule
          </h2>
          <div className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div key={index} className="relative pl-6 pb-4 border-l-2 border-gray-100 last:pb-0 last:border-l-0">
                <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-primary-100 ring-4 ring-white"></div>
                <div className="bg-gray-50 rounded-lg p-3 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-primary-100">{item.time}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${getScheduleStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                   </div>
                   <h4 className="font-bold text-primary-50 text-sm mb-1">{item.event}</h4>
                   <div className="flex items-center gap-1 text-xs text-gray-500">
                      <IoGridOutline className="w-3 h-3" />
                      {item.location}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

       {/* Quick Actions */}
       <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both] delay-300">
        <h2 className="text-xl font-bold text-primary-50 mb-6 flex items-center gap-2">
           <IoCheckmarkCircleOutline className="w-6 h-6 text-primary-100" />
           Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
           {[
             { label: "Add Visitor", icon: <IoPersonAddOutline className="w-6 h-6" />, color: "from-blue-500 to-blue-600", path: "/receptionist/visitors" },
             { label: "Log Call", icon: <IoCallOutline className="w-6 h-6" />, color: "from-emerald-500 to-emerald-600", path: "/receptionist/calls" },
             { label: "New Inquiry", icon: <IoHelpCircleOutline className="w-6 h-6" />, color: "from-amber-500 to-amber-600", path: "/receptionist/inquiries" },
             { label: "Book Appt", icon: <IoCalendarOutline className="w-6 h-6" />, color: "from-purple-500 to-purple-600", path: "/receptionist/appointments" },
             { label: "Check Mail", icon: <IoMailOutline className="w-6 h-6" />, color: "from-rose-500 to-rose-600", path: "/receptionist/mail" },
             { label: "Lookup Staff", icon: <IoSearchOutline className="w-6 h-6" />, color: "from-indigo-500 to-indigo-600", path: "/receptionist/directory" },
           ].map((action, index) => (
             <button
               key={index}
               onClick={() => navigate(action.path)}
               className="group flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 border-2 border-transparent hover:border-primary-50/10 hover:bg-white hover:shadow-lg transition-all duration-300"
             >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-md group-hover:scale-110 transition-transform mb-3`}>
                  {action.icon}
                </div>
                <span className="text-sm font-semibold text-primary-50 text-center">{action.label}</span>
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
