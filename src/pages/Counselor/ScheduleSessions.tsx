import React, { useState } from "react";
import {
  IoAddOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoFilterOutline,
  IoPersonOutline,
  IoTimeOutline,
  IoTrashOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

const ScheduleSessions: React.FC = () => {
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [filterType, setFilterType] = useState("all");
    const [newSession, setNewSession] = useState({
        student: "",
        grade: "",
        type: "Academic",
        date: "",
        time: "",
        duration: "30",
        notes: ""
    });

    // Mock Data
    const upcomingSessions = [
        {
            id: 1,
            student: "Emma Johnson",
            grade: "Grade 11",
            type: "Academic",
            date: "2025-12-24",
            time: "10:00 AM",
            duration: "30 min",
            status: "Confirmed",
            notes: "Course selection discussion"
        },
        {
            id: 2,
            student: "Michael Chen",
            grade: "Grade 12",
            type: "Career",
            date: "2025-12-24",
            time: "2:00 PM",
            duration: "45 min",
            status: "Confirmed",
            notes: "University application review"
        },
        {
            id: 3,
            student: "Sarah Williams",
            grade: "Grade 10",
            type: "Personal",
            date: "2025-12-25",
            time: "9:30 AM",
            duration: "30 min",
            status: "Pending",
            notes: "Stress management techniques"
        },
        {
            id: 4,
            student: "David Martinez",
            grade: "Grade 12",
            type: "Career",
            date: "2025-12-25",
            time: "11:00 AM",
            duration: "30 min",
            status: "Confirmed",
            notes: "Career path exploration"
        },
        {
            id: 5,
            student: "Ryan Cooper",
            grade: "Grade 10",
            type: "Personal",
            date: "2025-12-26",
            time: "1:00 PM",
            duration: "45 min",
            status: "Confirmed",
            notes: "Follow-up on behavioral concerns"
        }
    ];

    const stats = [
        { title: "This Week", value: "12", color: "bg-blue-100 text-blue-600" },
        { title: "Today", value: "3", color: "bg-green-100 text-green-600" },
        { title: "Pending", value: "2", color: "bg-amber-100 text-amber-600" },
        { title: "Completed", value: "47", color: "bg-purple-100 text-purple-600" }
    ];

    const filteredSessions = upcomingSessions.filter(session => {
        if (filterType === "all") return true;
        return session.type.toLowerCase() === filterType.toLowerCase();
    });

    const handleScheduleSession = () => {
        setShowScheduleModal(true);
    };

    const handleSubmitSession = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSession.student || !newSession.grade || !newSession.date || !newSession.time) {
            toast.error("Please fill in all required fields");
            return;
        }
        toast.success("Session scheduled successfully!");
        setShowScheduleModal(false);
        setNewSession({
            student: "",
            grade: "",
            type: "Academic",
            date: "",
            time: "",
            duration: "30",
            notes: ""
        });
    };

    const handleCancelSession = (sessionId: number, studentName: string) => {
        toast.info(`Cancelling session #${sessionId} with ${studentName}...`);
        setTimeout(() => {
            toast.success(`Session #${sessionId} cancelled successfully!`);
        }, 1000);
    };

    const handleRescheduleSession = (sessionId: number, studentName: string) => {
        toast.info(`Opening reschedule dialog for session #${sessionId} with ${studentName}...`);
        setTimeout(() => {
            toast.success(`Reschedule request for session #${sessionId} sent!`);
        }, 1000);
    };

    const handleConfirmSession = (sessionId: number, studentName: string) => {
        toast.success(`Session #${sessionId} with ${studentName} confirmed!`);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Schedule Sessions</h1>
                    <p className="text-gray-500 mt-1">Schedule and manage counseling sessions with students.</p>
                </div>
                <button 
                    onClick={handleScheduleSession}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors shadow-md"
                >
                    <IoAddOutline className="w-5 h-5" /> Schedule New Session
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                        <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sessions List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Upcoming Sessions</h2>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-100 bg-white"
                            >
                                <option value="all">All Types</option>
                                <option value="academic">Academic</option>
                                <option value="career">Career</option>
                                <option value="personal">Personal</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            {filteredSessions.map((session) => (
                                <div key={session.id} className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                    session.type === "Academic" ? "bg-blue-100 text-blue-600" :
                                                    session.type === "Career" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
                                                }`}>
                                                    <IoPersonOutline className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{session.student}</h3>
                                                    <p className="text-xs text-gray-500">{session.grade}</p>
                                                </div>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    session.type === "Academic" ? "bg-blue-100 text-blue-700" :
                                                    session.type === "Career" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
                                                }`}>
                                                    {session.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                <span className="flex items-center gap-1">
                                                    <IoCalendarOutline className="w-4 h-4" /> {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <IoTimeOutline className="w-4 h-4" /> {session.time} ({session.duration})
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{session.notes}</p>
                                        </div>
                                        <div className="flex sm:flex-col gap-2">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                                                session.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                            }`}>
                                                {session.status}
                                            </span>
                                            <div className="flex gap-2">
                                                {session.status === "Pending" && (
                                                    <button
                                                        onClick={() => handleConfirmSession(session.id, session.student)}
                                                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                                        title="Confirm"
                                                    >
                                                        <IoCheckmarkCircleOutline className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleRescheduleSession(session.id, session.student)}
                                                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                                    title="Reschedule"
                                                >
                                                    <IoCalendarOutline className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleCancelSession(session.id, session.student)}
                                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                    title="Cancel"
                                                >
                                                    <IoTrashOutline className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredSessions.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p>No sessions found for this filter.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Quick Tips */}
                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-6 text-white shadow-lg shadow-primary-100/20">
                        <h3 className="text-lg font-bold mb-4">Session Tips</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-primary-200">•</span>
                                <span>Schedule sessions at least 24 hours in advance</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary-200">•</span>
                                <span>Allow 15 minutes between sessions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary-200">•</span>
                                <span>Send reminders 1 day before</span>
                            </li>
                        </ul>
                    </div>

                    {/* Session Types */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <IoFilterOutline className="text-primary-100" /> Session Types
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                                <span className="text-sm font-bold text-blue-900">Academic</span>
                                <span className="text-xs text-blue-600">Course & Study</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                                <span className="text-sm font-bold text-purple-900">Career</span>
                                <span className="text-xs text-purple-600">Future Planning</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                                <span className="text-sm font-bold text-green-900">Personal</span>
                                <span className="text-xs text-green-600">Well-being</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Schedule Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Schedule New Session</h2>
                            <button 
                                onClick={() => setShowScheduleModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <IoCloseOutline className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmitSession} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Student Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={newSession.student}
                                        onChange={(e) => setNewSession({...newSession, student: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                        placeholder="Enter student name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Grade <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={newSession.grade}
                                        onChange={(e) => setNewSession({...newSession, grade: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                        required
                                    >
                                        <option value="">Select grade</option>
                                        <option value="Grade 9">Grade 9</option>
                                        <option value="Grade 10">Grade 10</option>
                                        <option value="Grade 11">Grade 11</option>
                                        <option value="Grade 12">Grade 12</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Session Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={newSession.type}
                                    onChange={(e) => setNewSession({...newSession, type: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                    required
                                >
                                    <option value="Academic">Academic</option>
                                    <option value="Career">Career</option>
                                    <option value="Personal">Personal</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={newSession.date}
                                        onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        value={newSession.time}
                                        onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration
                                </label>
                                <select
                                    value={newSession.duration}
                                    onChange={(e) => setNewSession({...newSession, duration: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                >
                                    <option value="30">30 minutes</option>
                                    <option value="45">45 minutes</option>
                                    <option value="60">60 minutes</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Notes
                                </label>
                                <textarea
                                    value={newSession.notes}
                                    onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 resize-none"
                                    rows={3}
                                    placeholder="Session purpose or topics to discuss..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowScheduleModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors"
                                >
                                    Schedule Session
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleSessions;
