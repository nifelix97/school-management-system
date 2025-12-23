import React, { useState } from "react";
import {
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoCloseOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoPrintOutline,
    IoSparklesOutline,
    IoStatsChartOutline,
    IoTrendingUpOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

const GenerateReports: React.FC = () => {
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [selectedReportType, setSelectedReportType] = useState("");
    const [reportParams, setReportParams] = useState({
        dateFrom: "",
        dateTo: "",
        studentGrade: "all",
        reportFormat: "pdf"
    });

    // Mock Data
    const reportTypes = [
        {
            id: "session-summary",
            title: "Session Summary Report",
            description: "Overview of all counseling sessions with statistics and trends",
            icon: <IoDocumentTextOutline className="w-8 h-8" />,
            gradient: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            estimatedTime: "2-3 min",
            badge: "Popular"
        },
        {
            id: "student-progress",
            title: "Student Progress Report",
            description: "Track individual student progress and outcomes over time",
            icon: <IoTrendingUpOutline className="w-8 h-8" />,
            gradient: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            estimatedTime: "3-5 min",
            badge: "Detailed"
        },
        {
            id: "behavioral-analysis",
            title: "Behavioral Analysis Report",
            description: "Comprehensive analysis of student behavioral patterns",
            icon: <IoCheckmarkCircleOutline className="w-8 h-8" />,
            gradient: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            estimatedTime: "4-6 min",
            badge: "Comprehensive"
        },
        {
            id: "monthly-summary",
            title: "Monthly Summary Report",
            description: "Monthly overview of counseling activities and metrics",
            icon: <IoCalendarOutline className="w-8 h-8" />,
            gradient: "from-amber-500 to-amber-600",
            bgColor: "bg-amber-50",
            borderColor: "border-amber-200",
            estimatedTime: "2-3 min",
            badge: "Quick"
        },
        {
            id: "intervention-outcomes",
            title: "Intervention Outcomes Report",
            description: "Effectiveness of counseling interventions and strategies",
            icon: <IoStatsChartOutline className="w-8 h-8" />,
            gradient: "from-rose-500 to-rose-600",
            bgColor: "bg-rose-50",
            borderColor: "border-rose-200",
            estimatedTime: "5-7 min",
            badge: "Advanced"
        },
        {
            id: "career-guidance",
            title: "Career Guidance Report",
            description: "Summary of career counseling sessions and student interests",
            icon: <IoSparklesOutline className="w-8 h-8" />,
            gradient: "from-indigo-500 to-indigo-600",
            bgColor: "bg-indigo-50",
            borderColor: "border-indigo-200",
            estimatedTime: "3-4 min",
            badge: "Insightful"
        }
    ];

    const recentReports = [
        { name: "November Session Summary", date: "Dec 1, 2025", type: "PDF", size: "2.4 MB", status: "Ready" },
        { name: "Student Progress Q4", date: "Nov 28, 2025", type: "Excel", size: "1.8 MB", status: "Ready" },
        { name: "Behavioral Analysis Oct", date: "Nov 15, 2025", type: "PDF", size: "3.1 MB", status: "Ready" }
    ];

    const stats = [
        { 
            title: "Reports Generated", 
            value: "47", 
            icon: <IoDocumentTextOutline className="w-6 h-6" />,
            gradient: "from-blue-500 to-blue-600",
            change: "+12%"
        },
        { 
            title: "This Month", 
            value: "12", 
            icon: <IoCalendarOutline className="w-6 h-6" />,
            gradient: "from-green-500 to-green-600",
            change: "+8%"
        },
        { 
            title: "Pending", 
            value: "3", 
            icon: <IoStatsChartOutline className="w-6 h-6" />,
            gradient: "from-amber-500 to-amber-600",
            change: "-2"
        }
    ];

    const handleSelectReport = (reportId: string) => {
        setSelectedReportType(reportId);
        setShowGenerateModal(true);
    };

    const handleGenerateReport = (e: React.FormEvent) => {
        e.preventDefault();
        const reportType = reportTypes.find(r => r.id === selectedReportType);
        
        if (!reportParams.dateFrom || !reportParams.dateTo) {
            toast.error("Please select date range");
            return;
        }

        toast.info(`Generating ${reportType?.title}...`);
        
        setTimeout(() => {
            toast.success(`${reportType?.title} generated successfully!`);
            setShowGenerateModal(false);
            setReportParams({
                dateFrom: "",
                dateTo: "",
                studentGrade: "all",
                reportFormat: "pdf"
            });
        }, 2000);
    };

    const handleDownloadReport = (reportName: string) => {
        toast.info(`Downloading ${reportName}...`);
        setTimeout(() => {
            toast.success(`${reportName} downloaded successfully!`);
        }, 1000);
    };

    const handlePreviewReport = (reportName: string) => {
        toast.info(`Opening preview for ${reportName}...`);
        setTimeout(() => {
            toast.success(`Preview loaded!`);
        }, 1000);
    };

    const handlePrintReport = (reportName: string) => {
        toast.info(`Preparing ${reportName} for printing...`);
        setTimeout(() => {
            toast.success(`Print dialog opened!`);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 lg:p-8">
            {/* Header with Gradient */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center shadow-lg shadow-primary-100/30">
                        <IoDocumentTextOutline className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Generate Reports
                        </h1>
                        <p className="text-gray-500 text-sm">Create professional counseling reports and analytics</p>
                    </div>
                </div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
                        <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                                    {stat.icon}
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Professional Report Types */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Available Reports</h2>
                            <span className="text-sm text-gray-500">{reportTypes.length} templates</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {reportTypes.map((report) => (
                                <div
                                    key={report.id}
                                    onClick={() => handleSelectReport(report.id)}
                                    className="relative group cursor-pointer"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${report.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity blur-xl`}></div>
                                    <div className={`relative p-5 ${report.bgColor} border-2 ${report.borderColor} rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]`}>
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${report.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                                {report.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-1">
                                                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{report.title}</h3>
                                                    <span className="text-xs font-bold text-primary-100 bg-white px-2 py-1 rounded-full shadow-sm">
                                                        {report.badge}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-600 leading-relaxed">{report.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <IoCalendarOutline className="w-3.5 h-3.5" />
                                                <span className="font-medium">Est. {report.estimatedTime}</span>
                                            </div>
                                            <span className="text-xs font-bold text-primary-100 group-hover:translate-x-1 transition-transform">
                                                Generate →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Professional Recent Reports */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
                            <button className="text-sm text-primary-100 hover:text-primary-50 font-medium">
                                View All
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentReports.map((report, index) => (
                                <div key={index} className="group p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-primary-100 hover:shadow-lg transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <IoDocumentTextOutline className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 text-sm mb-1">{report.name}</h3>
                                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                                    <span>{report.date}</span>
                                                    <span>•</span>
                                                    <span className="font-medium text-primary-100">{report.type}</span>
                                                    <span>•</span>
                                                    <span>{report.size}</span>
                                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold">
                                                        {report.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handlePreviewReport(report.name)}
                                                className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors shadow-sm"
                                                title="Preview"
                                            >
                                                <IoEyeOutline className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDownloadReport(report.name)}
                                                className="p-2.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors shadow-sm"
                                                title="Download"
                                            >
                                                <IoDownloadOutline className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handlePrintReport(report.name)}
                                                className="p-2.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors shadow-sm"
                                                title="Print"
                                            >
                                                <IoPrintOutline className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enhanced Right Sidebar */}
                <div className="space-y-6">
                    {/* Premium Tips Card */}
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-primary-100 opacity-90"></div>
                        <div className="relative p-6 text-white">
                            <div className="flex items-center gap-2 mb-4">
                                <IoSparklesOutline className="w-6 h-6" />
                                <h3 className="text-lg font-bold">Pro Tips</h3>
                            </div>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                                    <span className="text-primary-200 font-bold">1.</span>
                                    <span>Select appropriate date ranges for accurate data analysis</span>
                                </li>
                                <li className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                                    <span className="text-primary-200 font-bold">2.</span>
                                    <span>PDF format recommended for professional sharing</span>
                                </li>
                                <li className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                                    <span className="text-primary-200 font-bold">3.</span>
                                    <span>Excel format ideal for detailed data analysis</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Professional Export Formats */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Export Formats</h3>
                        <div className="space-y-3">
                            <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-2 border-red-200 hover:shadow-lg transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-red-900">PDF Document</span>
                                    <IoDocumentTextOutline className="w-5 h-5 text-red-600" />
                                </div>
                                <p className="text-xs text-red-700">Universal format for sharing</p>
                            </div>
                            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-green-900">Excel Spreadsheet</span>
                                    <IoStatsChartOutline className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-xs text-green-700">Advanced data analysis</p>
                            </div>
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-blue-900">CSV File</span>
                                    <IoDownloadOutline className="w-5 h-5 text-blue-600" />
                                </div>
                                <p className="text-xs text-blue-700">Raw data export</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Generate Report Modal */}
            {showGenerateModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-primary-100 to-primary-50 p-6 flex items-center justify-between rounded-t-3xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    {reportTypes.find(r => r.id === selectedReportType)?.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-white">
                                    {reportTypes.find(r => r.id === selectedReportType)?.title}
                                </h2>
                            </div>
                            <button 
                                onClick={() => setShowGenerateModal(false)}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                            >
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleGenerateReport} className="p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        From Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={reportParams.dateFrom}
                                        onChange={(e) => setReportParams({...reportParams, dateFrom: e.target.value})}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        To Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={reportParams.dateTo}
                                        onChange={(e) => setReportParams({...reportParams, dateTo: e.target.value})}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Student Grade
                                </label>
                                <select
                                    value={reportParams.studentGrade}
                                    onChange={(e) => setReportParams({...reportParams, studentGrade: e.target.value})}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 transition-colors bg-white"
                                >
                                    <option value="all">All Grades</option>
                                    <option value="9">Grade 9</option>
                                    <option value="10">Grade 10</option>
                                    <option value="11">Grade 11</option>
                                    <option value="12">Grade 12</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Export Format
                                </label>
                                <select
                                    value={reportParams.reportFormat}
                                    onChange={(e) => setReportParams({...reportParams, reportFormat: e.target.value})}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 transition-colors bg-white"
                                >
                                    <option value="pdf">📄 PDF Document</option>
                                    <option value="excel">📊 Excel Spreadsheet</option>
                                    <option value="csv">📋 CSV File</option>
                                </select>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <IoCalendarOutline className="w-6 h-6 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-blue-900">Estimated Generation Time</p>
                                        <p className="text-xs text-blue-700 mt-1">
                                            {reportTypes.find(r => r.id === selectedReportType)?.estimatedTime}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowGenerateModal(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-100 to-primary-50 text-white rounded-xl hover:shadow-lg font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    <IoDownloadOutline className="w-5 h-5" />
                                    Generate Report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateReports;


