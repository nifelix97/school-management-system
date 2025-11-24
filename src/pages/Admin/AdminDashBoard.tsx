import React from "react";
import {
    IoAlertCircleOutline,
    IoBookOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoTimeOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
} from "react-icons/io5";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
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
}

const AdminDashboard: React.FC = () => {
  // Statistics data
  const stats: StatCard[] = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: <IoSchoolOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-50",
    },
    {
      title: "Total Teachers",
      value: "156",
      change: "+3.2%",
      trend: "up",
      icon: <IoPeopleOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-100",
    },
    {
      title: "Active Courses",
      value: "89",
      change: "+5.8%",
      trend: "up",
      icon: <IoBookOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-200",
    },
    {
      title: "Upcoming Events",
      value: "24",
      change: "-2.1%",
      trend: "down",
      icon: <IoCalendarOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-300",
    },
  ];

  // Recent activities
  const recentActivities: Activity[] = [
    {
      id: "1",
      type: "Student Registration",
      description: "New student enrolled: John Doe (STU2024150)",
      time: "5 minutes ago",
      status: "success",
    },
    {
      id: "2",
      type: "Course Update",
      description: "Computer Science 101 syllabus updated",
      time: "1 hour ago",
      status: "info",
    },
    {
      id: "3",
      type: "Payment Alert",
      description: "15 pending payment approvals",
      time: "2 hours ago",
      status: "warning",
    },
    {
      id: "4",
      type: "Teacher Assignment",
      description: "Dr. Sarah assigned to Mathematics 201",
      time: "3 hours ago",
      status: "success",
    },
    {
      id: "5",
      type: "System Update",
      description: "Academic calendar updated for next semester",
      time: "5 hours ago",
      status: "info",
    },
  ];

  // Quick stats for progress bars
  const quickStats: QuickStat[] = [
    { label: "Students Enrolled", value: 2847, total: 3000, color: "bg-primary-50" },
    { label: "Teachers Active", value: 156, total: 180, color: "bg-primary-100" },
    { label: "Courses Running", value: 89, total: 100, color: "bg-primary-200" },
    { label: "Attendance Rate", value: 92, total: 100, color: "bg-primary-300" },
  ];

  // Department breakdown
  const departments = [
    { name: "Computer Science", students: 645, color: "bg-primary-50" },
    { name: "Engineering", students: 523, color: "bg-primary-100" },
    { name: "Business", students: 487, color: "bg-primary-200" },
    { name: "Medicine", students: 412, color: "bg-primary-300" },
    { name: "Arts", students: 356, color: "bg-primary-50" },
    { name: "Sciences", students: 424, color: "bg-primary-100" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <IoCheckmarkCircleOutline className="w-5 h-5 text-primary-300" />;
      case "warning":
        return <IoAlertCircleOutline className="w-5 h-5 text-primary-200" />;
      default:
        return <IoTimeOutline className="w-5 h-5 text-primary-100" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Welcome back! Here's what's happening in your school today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
                  stat.trend === "up" ? "text-primary-300" : "text-primary-200"
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
            <div className="text-xs sm:text-sm text-primary-50/60 mb-1">
              {stat.title}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-50">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Quick Stats */}
        <div className="lg:col-span-2 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 sm:mb-6">
            Quick Statistics
          </h2>
          <div className="space-y-4 sm:space-y-5">
            {quickStats.map((stat, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm sm:text-base font-medium text-primary-50">
                    {stat.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-primary-50">
                    {stat.value}
                    {stat.label === "Attendance Rate" ? "%" : ` / ${stat.total}`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
                  <div
                    className={`${stat.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${(stat.value / stat.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 sm:mb-6">
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="shrink-0 mt-1">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-medium text-primary-50 mb-1">
                    {activity.type}
                  </div>
                  <div className="text-xs text-primary-50/70 mb-1 line-clamp-2">
                    {activity.description}
                  </div>
                  <div className="text-xs text-primary-50/50">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 sm:mb-6">
          Students by Department
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept, index) => {
            const maxStudents = Math.max(...departments.map((d) => d.students));
            const percentage = (dept.students / maxStudents) * 100;

            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary-50">
                    {dept.name}
                  </span>
                  <span className="text-sm font-bold text-primary-50">
                    {dept.students}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${dept.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 sm:mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-primary-100 hover:bg-primary-100/5 transition-all">
            <IoSchoolOutline className="w-6 h-6 sm:w-8 sm:h-8 text-primary-100" />
            <span className="text-xs sm:text-sm font-medium text-primary-50 text-center">
              Add Student
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-primary-100 hover:bg-primary-100/5 transition-all">
            <IoPeopleOutline className="w-6 h-6 sm:w-8 sm:h-8 text-primary-100" />
            <span className="text-xs sm:text-sm font-medium text-primary-50 text-center">
              Add Teacher
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-primary-100 hover:bg-primary-100/5 transition-all">
            <IoBookOutline className="w-6 h-6 sm:w-8 sm:h-8 text-primary-100" />
            <span className="text-xs sm:text-sm font-medium text-primary-50 text-center">
              Add Course
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-primary-100 hover:bg-primary-100/5 transition-all">
            <IoCalendarOutline className="w-6 h-6 sm:w-8 sm:h-8 text-primary-100" />
            <span className="text-xs sm:text-sm font-medium text-primary-50 text-center">
              Schedule Event
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-primary-100 hover:bg-primary-100/5 transition-all">
            <IoCheckmarkCircleOutline className="w-6 h-6 sm:w-8 sm:h-8 text-primary-100" />
            <span className="text-xs sm:text-sm font-medium text-primary-50 text-center">
              Approvals
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-primary-100 hover:bg-primary-100/5 transition-all">
            <IoAlertCircleOutline className="w-6 h-6 sm:w-8 sm:h-8 text-primary-100" />
            <span className="text-xs sm:text-sm font-medium text-primary-50 text-center">
              View Alerts
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
