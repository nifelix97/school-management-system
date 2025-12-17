import React from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoClipboardOutline,
    IoFitnessOutline,
    IoPeopleOutline,
    IoTimeOutline,
    IoTrendingUpOutline,
    IoTrophyOutline
} from "react-icons/io5";

const CoachDashboard: React.FC = () => {
    // Mock Data
    const stats = [
        { title: "Total Teams", value: "4", icon: <IoPeopleOutline className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
        { title: "Upcoming Matches", value: "3", icon: <IoTrophyOutline className="w-6 h-6" />, color: "bg-amber-100 text-amber-600" },
        { title: "Active Players", value: "86", icon: <IoFitnessOutline className="w-6 h-6" />, color: "bg-green-100 text-green-600" },
        { title: "Win Rate", value: "75%", icon: <IoTrendingUpOutline className="w-6 h-6" />, color: "bg-primary-100 text-white" },
    ];

    const upcomingSessions = [
        { id: 1, title: "Varsity Soccer Training", time: "14:00 - 16:00", date: "Today", location: "Main Field", type: "Training" },
        { id: 2, title: "Basketball Strategy Meeting", time: "10:00 - 11:30", date: "Tomorrow", location: "Gymnasium A", type: "Meeting" },
        { id: 3, title: "Swimming Squad Practice", time: "06:00 - 08:00", date: "Wed, Dec 20", location: "Aquatic Center", type: "Training" },
    ];

    const recentResults = [
        { id: 1, team: "Basketball (Boys A)", opponent: "St. Patrick's", result: "Win", score: "86 - 82", date: "Dec 15" },
        { id: 2, team: "Soccer (Girls B)", opponent: "North High", result: "Draw", score: "1 - 1", date: "Dec 14" },
        { id: 3, team: "Volleyball (Mixed)", opponent: "City College", result: "Loss", score: "2 - 3", date: "Dec 12" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back, Coach! 👋</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your teams today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors shadow-sm">
                        <IoClipboardOutline className="w-5 h-5" /> Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors shadow-md">
                        <IoAddOutline className="w-5 h-5" /> Schedule Session
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
                {/* Upcoming Schedule */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <IoCalendarOutline className="text-primary-100" /> Upcoming Schedule
                            </h2>
                            <button className="text-primary-100 text-sm font-medium hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {upcomingSessions.map((session) => (
                                <div key={session.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                                            session.type === "Training" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                                        }`}>
                                            {session.date === "Today" ? "18" : session.date === "Tomorrow" ? "19" : "20"}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{session.title}</h3>
                                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                                <IoTimeOutline className="w-4 h-4" /> {session.time} • {session.location}
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

                    {/* Team Performance */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <IoTrendingUpOutline className="text-primary-100" /> Recent Results
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 rounded-l-lg">Date</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Team</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Opponent</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500">Score</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 rounded-r-lg">Result</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentResults.map((match) => (
                                        <tr key={match.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-3 text-sm text-gray-500">{match.date}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{match.team}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{match.opponent}</td>
                                            <td className="px-4 py-3 text-sm font-bold text-gray-900">{match.score}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    match.result === "Win" ? "bg-green-100 text-green-700" :
                                                    match.result === "Loss" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
                                                }`}>
                                                    {match.result}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Quick Actions & Injuries */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-6 text-white shadow-lg shadow-primary-100/20">
                        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-2 border border-white/10">
                                <IoAddOutline className="w-6 h-6" />
                                <span className="text-xs font-bold">New Player</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-2 border border-white/10">
                                <IoCalendarOutline className="w-6 h-6" />
                                <span className="text-xs font-bold">New Event</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-2 border border-white/10">
                                <IoFitnessOutline className="w-6 h-6" />
                                <span className="text-xs font-bold">Training Plan</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-2 border border-white/10">
                                <IoTrophyOutline className="w-6 h-6" />
                                <span className="text-xs font-bold">Log Result</span>
                            </button>
                        </div>
                    </div>

                    {/* Injury Report (Mini) */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <IoAlertCircleOutline className="text-red-500" /> Injury Report
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Tom Brady</p>
                                    <p className="text-xs text-red-600">Sprained Ankle • 2 weeks out</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Sarah Connor</p>
                                    <p className="text-xs text-amber-600">Shoulder Strain • Day-to-day</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-4 text-center text-sm font-medium text-gray-500 hover:text-primary-100 transition-colors">
                            View Full Medical Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachDashboard;
