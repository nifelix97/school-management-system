import {
  Users,
//   BookOpen,
//   GraduationCap,
  AlertCircle,
  TrendingUp,
  Calendar,
  FileText,
  CheckCircle,
//   Clock,
  Award,
  IdCard
} from "lucide-react";

export default function RegistrarDashboard() {
  const stats = [
    { title: "Total Students", value: "1245", icon: <Users size={20} />, color: "bg-primary-50" },
    { title: "Pending Registrations", value: "23", icon: <AlertCircle size={20} />, color: "bg-primary-50" },
    { title: "Issued Student IDs", value: "892", icon: <IdCard size={20} />, color: "bg-primary-50" },
    { title: "Generated Letters", value: "156", icon: <FileText size={20} />, color: "bg-primary-50" },
  ];

  const recentActivities = [
    { id: 1, type: "Registration Approval", message: "John Doe's registration approved", time: "2 hours ago", status: "approved" },
    { id: 2, type: "ID Issuance", message: "Student ID issued to Jane Smith", time: "4 hours ago", status: "issued" },
    { id: 3, type: "Admission Letter", message: "Admission letter generated for Bob Johnson", time: "6 hours ago", status: "generated" },
    { id: 4, type: "Promotion Update", message: "Semester promotion processed for 45 students", time: "1 day ago", status: "completed" },
  ];

  const pendingTasks = [
    { id: 1, task: "Review 15 pending registration applications", priority: "high", dueDate: "Today" },
    { id: 2, task: "Issue student IDs for new enrollees", priority: "medium", dueDate: "Tomorrow" },
    { id: 3, task: "Generate admission letters for approved students", priority: "high", dueDate: "Today" },
    { id: 4, task: "Process semester promotions", priority: "low", dueDate: "This week" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Registration Deadline", date: "Dec 15", time: "5:00 PM" },
    { id: 2, title: "ID Card Distribution", date: "Dec 16", time: "10:00 AM" },
    { id: 3, title: "Admission Letter Review", date: "Dec 18", time: "2:00 PM" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle size={16} className="text-green-500" />;
      case "issued": return <IdCard size={16} className="text-blue-500" />;
      case "generated": return <FileText size={16} className="text-purple-500" />;
      case "completed": return <CheckCircle size={16} className="text-blue-500" />;
      default: return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Registrar Dashboard
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Student registration and records management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 xs:mb-3">
                <div className={`${stat.color} text-white p-2 rounded-lg`}>
                  {stat.icon}
                </div>
                <TrendingUp size={16} className="text-green-500 hidden xs:block" />
              </div>
              <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
                {stat.value}
              </div>
              <div className="text-xs xs:text-sm text-primary-50/60">
                {stat.title}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 xs:mb-4">
              <h2 className="text-base xs:text-lg font-semibold text-primary-50">Recent Activities</h2>
              <button className="text-xs xs:text-sm text-primary-50 hover:text-opacity-80">
                View All
              </button>
            </div>
            <div className="space-y-3 xs:space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2 xs:p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 xs:gap-2">
                      <p className="text-xs xs:text-sm font-medium text-primary-50">
                        {activity.type}
                      </p>
                      <span className="text-xs text-primary-50/60">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-xs xs:text-sm text-primary-50/70 mt-1">
                      {activity.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 xs:mb-4">
              <h2 className="text-base xs:text-lg font-semibold text-primary-50">Upcoming Events</h2>
              <Calendar size={18} className="text-primary-50/60" />
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-2 xs:p-3 border border-gray-200 rounded-lg">
                  <h3 className="text-xs xs:text-sm font-medium text-primary-50 mb-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-primary-50/60">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="mt-4 xs:mt-6 bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 xs:mb-4">
            <h2 className="text-base xs:text-lg font-semibold text-primary-50">Pending Tasks</h2>
            <Award size={18} className="text-primary-50/60" />
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-primary-50 flex-1">
                    {task.task}
                  </p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-primary-50/60">Due: {task.dueDate}</p>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-primary-50">Task</th>
                  <th className="text-center py-2 text-sm font-medium text-primary-50">Priority</th>
                  <th className="text-center py-2 text-sm font-medium text-primary-50">Due Date</th>
                  <th className="text-center py-2 text-sm font-medium text-primary-50">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm text-primary-50">{task.task}</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 text-center text-sm text-primary-50/60">{task.dueDate}</td>
                    <td className="py-3 text-center">
                      <button className="px-3 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}