import React, { useState } from "react";
import {
  IoAddOutline,
  IoAlertCircleOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoDownloadOutline,
  IoFilterOutline,
  IoSearchOutline,
  IoStatsChartOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

const StudentBehavior: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [showNewReportModal, setShowNewReportModal] = useState(false);
    const [newReport, setNewReport] = useState({
        student: "",
        grade: "",
        type: "Positive",
        incident: "",
        reportedBy: ""
    });

    // Mock Data
    const stats = [
        { title: "Total Reports", value: "47", icon: <IoStatsChartOutline className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
        { title: "Positive", value: "32", icon: <IoCheckmarkCircleOutline className="w-6 h-6" />, color: "bg-green-100 text-green-600" },
        { title: "Needs Attention", value: "12", icon: <IoWarningOutline className="w-6 h-6" />, color: "bg-amber-100 text-amber-600" },
        { title: "Critical", value: "3", icon: <IoAlertCircleOutline className="w-6 h-6" />, color: "bg-red-100 text-red-600" },
    ];

    const behavioralReports = [
        { 
            id: 1, 
            student: "Emma Johnson", 
            grade: "Grade 11", 
            type: "Positive", 
            incident: "Helped classmate with assignment", 
            date: "Dec 22, 2025", 
            reportedBy: "Ms. Anderson",
            severity: "low",
            status: "Acknowledged"
        },
        { 
            id: 2, 
            student: "Michael Chen", 
            grade: "Grade 12", 
            type: "Concern", 
            incident: "Late to class multiple times", 
            date: "Dec 21, 2025", 
            reportedBy: "Mr. Thompson",
            severity: "medium",
            status: "In Progress"
        },
        { 
            id: 3, 
            student: "Ryan Cooper", 
            grade: "Grade 10", 
            type: "Critical", 
            incident: "Disruptive behavior in class", 
            date: "Dec 20, 2025", 
            reportedBy: "Dr. Martinez",
            severity: "high",
            status: "Action Required"
        },
        { 
            id: 4, 
            student: "Sarah Williams", 
            grade: "Grade 10", 
            type: "Positive", 
            incident: "Outstanding participation", 
            date: "Dec 20, 2025", 
            reportedBy: "Ms. Davis",
            severity: "low",
            status: "Acknowledged"
        },
        { 
            id: 5, 
            student: "Alex Thompson", 
            grade: "Grade 9", 
            type: "Concern", 
            incident: "Incomplete homework submissions", 
            date: "Dec 19, 2025", 
            reportedBy: "Mr. Wilson",
            severity: "medium",
            status: "Monitoring"
        },
    ];

    const recentIncidents = [
        { date: "Dec 22", count: 3, positive: 2, concern: 1, critical: 0 },
        { date: "Dec 21", count: 5, positive: 3, concern: 1, critical: 1 },
        { date: "Dec 20", count: 4, positive: 2, concern: 2, critical: 0 },
        { date: "Dec 19", count: 6, positive: 4, concern: 2, critical: 0 },
    ];

    const filteredReports = behavioralReports.filter(report => {
        const matchesSearch = report.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            report.incident.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === "all" || report.type.toLowerCase() === filterType.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const handleNewReport = () => {
        setShowNewReportModal(true);
    };

    const handleSubmitReport = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReport.student || !newReport.grade || !newReport.incident || !newReport.reportedBy) {
            toast.error("Please fill in all required fields");
            return;
        }
        toast.success("Behavioral report submitted successfully!");
        setShowNewReportModal(false);
        setNewReport({
            student: "",
            grade: "",
            type: "Positive",
            incident: "",
            reportedBy: ""
        });
    };

    const handleGenerateReport = () => {
        toast.info("Generating comprehensive behavior report...");
        setTimeout(() => {
            toast.success("Behavior report generated successfully!");
        }, 1500);
    };

    const handleScheduleMeeting = () => {
        toast.info("Opening parent meeting scheduler...");
        setTimeout(() => {
            toast.success("Meeting request sent to parent portal!");
        }, 1500);
    };

    const handleExportData = () => {
        // Create CSV content
        const csvContent = [
            ["Student", "Grade", "Type", "Incident", "Date", "Reported By", "Status"],
            ...behavioralReports.map(report => [
                report.student,
                report.grade,
                report.type,
                report.incident,
                report.date,
                report.reportedBy,
                report.status
            ])
        ].map(row => row.join(",")).join("\n");

        // Create blob and download
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `behavioral_reports_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast.success("Behavioral data exported successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Track Student Behavior</h1>
                    <p className="text-gray-500 mt-1">Monitor and track student behavioral patterns and incidents.</p>
                </div>
                <button 
                    onClick={handleNewReport}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors shadow-md"
                >
                    <IoAddOutline className="w-5 h-5" /> New Report
                </button>
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
                {/* Behavioral Reports */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Behavioral Reports</h2>
                            
                            {/* Search and Filter */}
                            <div className="flex gap-3">
                                <div className="relative flex-1 sm:flex-initial">
                                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-100 w-full sm:w-48"
                                    />
                                </div>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-100 bg-white"
                                >
                                    <option value="all">All Types</option>
                                    <option value="positive">Positive</option>
                                    <option value="concern">Concern</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {filteredReports.map((report) => (
                                <div key={report.id} className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-bold text-gray-900">{report.student}</h3>
                                                <span className="text-xs text-gray-500">{report.grade}</span>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    report.type === "Positive" ? "bg-green-100 text-green-700" :
                                                    report.type === "Concern" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                                                }`}>
                                                    {report.type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{report.incident}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <IoCalendarOutline className="w-4 h-4" /> {report.date}
                                                </span>
                                                <span>Reported by: {report.reportedBy}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                report.status === "Acknowledged" ? "bg-gray-100 text-gray-700" :
                                                report.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                                                report.status === "Monitoring" ? "bg-purple-100 text-purple-700" : "bg-red-100 text-red-700"
                                            }`}>
                                                {report.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredReports.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p>No reports found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <IoStatsChartOutline className="text-primary-100" /> Recent Activity
                        </h3>
                        <div className="space-y-3">
                            {recentIncidents.map((incident, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold text-gray-900">{incident.date}</span>
                                        <span className="text-xs text-gray-500">{incident.count} reports</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">
                                            +{incident.positive}
                                        </span>
                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                                            ⚠{incident.concern}
                                        </span>
                                        {incident.critical > 0 && (
                                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">
                                                !{incident.critical}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-6 text-white shadow-lg shadow-primary-100/20">
                        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <button 
                                onClick={handleGenerateReport}
                                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all text-left border border-white/10"
                            >
                                <span className="text-sm font-bold">Generate Behavior Report</span>
                            </button>
                            <button 
                                onClick={handleScheduleMeeting}
                                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all text-left border border-white/10"
                            >
                                <span className="text-sm font-bold">Schedule Parent Meeting</span>
                            </button>
                            <button 
                                onClick={handleExportData}
                                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all text-left border border-white/10 flex items-center gap-2"
                            >
                                <IoDownloadOutline className="w-4 h-4" />
                                <span className="text-sm font-bold">Export Data</span>
                            </button>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                            <IoFilterOutline className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold text-gray-900">Pro Tip</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Document both positive and concerning behaviors to get a complete picture of student development.
                        </p>
                    </div>
                </div>
            </div>

            {/* New Report Modal */}
            {showNewReportModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">New Behavioral Report</h2>
                            <button 
                                onClick={() => setShowNewReportModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <IoCloseOutline className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmitReport} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Student Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={newReport.student}
                                        onChange={(e) => setNewReport({...newReport, student: e.target.value})}
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
                                        value={newReport.grade}
                                        onChange={(e) => setNewReport({...newReport, grade: e.target.value})}
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
                                    Report Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={newReport.type}
                                    onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                    required
                                >
                                    <option value="Positive">Positive</option>
                                    <option value="Concern">Concern</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Incident Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={newReport.incident}
                                    onChange={(e) => setNewReport({...newReport, incident: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 resize-none"
                                    rows={4}
                                    placeholder="Describe the incident or behavior..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Reported By <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newReport.reportedBy}
                                    onChange={(e) => setNewReport({...newReport, reportedBy: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                    placeholder="Your name"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowNewReportModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors"
                                >
                                    Submit Report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentBehavior;
