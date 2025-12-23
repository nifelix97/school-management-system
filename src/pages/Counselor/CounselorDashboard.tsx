import React from "react";
import {
  IoAddOutline,
  IoAlertCircleOutline,
  IoCalendarOutline,
  IoDocumentTextOutline,
  IoHeartOutline,
  IoPeopleOutline,
  IoSchoolOutline,
  IoStatsChartOutline,
  IoTimeOutline
} from "react-icons/io5";

const CounselorDashboard: React.FC = () => {
    // Mock Data
    const stats = [
        { title: "Total Sessions", value: "42", icon: <IoCalendarOutline className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
        { title: "Active Cases", value: "18", icon: <IoPeopleOutline className="w-6 h-6" />, color: "bg-amber-100 text-amber-600" },
        { title: "This Week", value: "7", icon: <IoTimeOutline className="w-6 h-6" />, color: "bg-green-100 text-green-600" },
        { title: "Success Rate", value: "92%", icon: <IoStatsChartOutline className="w-6 h-6" />, color: "bg-primary-100 text-white" },
    ];

    const upcomingSessions = [
        { id: 1, student: "Emma Johnson", grade: "Grade 11", time: "10:00 AM", date: "Today", type: "Academic", concern: "Course Selection" },
        { id: 2, student: "Michael Chen", grade: "Grade 12", time: "2:00 PM", date: "Today", type: "Career", concern: "University Applications" },
        { id: 3, student: "Sarah Williams", grade: "Grade 10", time: "9:30 AM", date: "Tomorrow", type: "Personal", concern: "Stress Management" },
        { id: 4, student: "David Martinez", grade: "Grade 12", time: "11:00 AM", date: "Wed, Dec 25", type: "Career", concern: "Career Path Guidance" },
    ];

    const recentCases = [
        { id: 1, student: "Alex Thompson", grade: "Grade 9", issue: "Behavioral", status: "In Progress", lastSession: "Dec 20", priority: "Medium" },
        { id: 2, student: "Jessica Lee", grade: "Grade 11", issue: "Academic Stress", status: "Monitoring", lastSession: "Dec 19", priority: "Low" },
        { id: 3, student: "Ryan Cooper", grade: "Grade 10", issue: "Social Anxiety", status: "Active", lastSession: "Dec 18", priority: "High" },
    ];

    const priorityAlerts = [
        { id: 1, student: "Ryan Cooper", alert: "Follow-up session needed", severity: "high" },
        { id: 2, student: "Emma Johnson", alert: "Parent meeting scheduled", severity: "medium" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back, Counselor! 👋</h1>
                    <p className="text-gray-500 mt-1">Here's an overview of your counseling activities today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors shadow-sm">
                        <IoDocumentTextOutline className="w-5 h-5" /> Reports
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors shadow-md">
                        <IoAddOutline className="w-5 h-5" /> New Session
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.color} transition-transform group-hover:scale-110`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Sessions */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <IoCalendarOutline className="text-primary-100" /> Upcoming Sessions
                            </h2>
                            <button className="text-primary-100 text-sm font-medium hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {upcomingSessions.map((session) => (
                                <div key={session.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                                            session.type === "Academic" ? "bg-blue-100 text-blue-600" : 
                                            session.type === "Career" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
                                        }`}>
                                            {session.type.slice(0, 3).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{session.student}</h3>
                                            <p className="text-sm text-gray-500">{session.grade} • {session.concern}</p>
                                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                <IoTimeOutline className="w-4 h-4" /> {session.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="sm:ml-auto">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            session.date === "Today" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                                        }`}>
                                            {session.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Cases */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <IoPeopleOutline className="text-primary-100" /> Active Cases
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 rounded-l-lg">Student</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Issue</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Last Session</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Priority</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 rounded-r-lg">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentCases.map((caseItem) => (
                                        <tr key={caseItem.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-3">
                                                <p className="text-sm font-medium text-gray-900">{caseItem.student}</p>
                                                <p className="text-xs text-gray-500">{caseItem.grade}</p>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{caseItem.issue}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{caseItem.lastSession}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    caseItem.priority === "High" ? "bg-red-100 text-red-700" :
                                                    caseItem.priority === "Medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                                                }`}>
                                                    {caseItem.priority}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    caseItem.status === "Active" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                                                }`}>
                                                    {caseItem.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Quick Actions & Alerts */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-6 text-white shadow-lg shadow-primary-100/20">
                        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-2 border border-white/10">
                                <IoAddOutline className="w-6 h-6" />
                                <span className="text-xs font-bold">New Case</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-2 border border-white/10">
                                <IoCalendarOutline className="w-6 h-6" />
                                <span className="text-xs font-bold">Schedule</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-2 border border-white/10">
                                <IoSchoolOutline className="w-6 h-6" />
                                <span className="text-xs font-bold">Career Guide</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-2 border border-white/10">
                                <IoDocumentTextOutline className="w-6 h-6" />
                                <span className="text-xs font-bold">Reports</span>
                            </button>
                        </div>
                    </div>

                    {/* Priority Alerts */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <IoAlertCircleOutline className="text-amber-500" /> Priority Alerts
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {priorityAlerts.map((alert) => (
                                <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-xl border ${
                                    alert.severity === "high" ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"
                                }`}>
                                    <div className={`w-2 h-2 rounded-full ${
                                        alert.severity === "high" ? "bg-red-500" : "bg-amber-500"
                                    }`} />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{alert.student}</p>
                                        <p className={`text-xs ${
                                            alert.severity === "high" ? "text-red-600" : "text-amber-600"
                                        }`}>{alert.alert}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 text-center text-sm font-medium text-gray-500 hover:text-primary-100 transition-colors">
                            View All Alerts
                        </button>
                    </div>

                    {/* Wellness Tip */}
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                        <div className="flex items-center gap-2 mb-3">
                            <IoHeartOutline className="w-5 h-5 text-green-600" />
                            <h3 className="font-bold text-gray-900">Wellness Tip</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Remember to take breaks between sessions. Your mental health is just as important as your students'.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounselorDashboard;
