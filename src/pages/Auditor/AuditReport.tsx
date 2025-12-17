
import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoShareSocialOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

// Types
interface AuditReport {
    id: string;
    reportNumber: string;
    title: string;
    reportType: "Financial" | "Compliance" | "Operational" | "IT Security" | "Risk Assessment";
    status: "Draft" | "Under Review" | "Approved" | "Published";
    createdDate: string;
    publishedDate?: string;
    author: string;
    department: string;
    findings: number;
    recommendations: number;
    priority: "Critical" | "High" | "Medium" | "Low";
    fileSize: string;
    pages: number;
}

const AuditReport: React.FC = () => {
    const [filterType, setFilterType] = useState<string>("All");
    const [filterStatus, setFilterStatus] = useState<string>("All");
    const [filterPriority, setFilterPriority] = useState<string>("All");
    const [showFilters, setShowFilters] = useState(false);
    const [showNewReportModal, setShowNewReportModal] = useState(false);

    // Mock data
    const reports: AuditReport[] = [
        {
            id: "1",
            reportNumber: "AR-2024-001",
            title: "Q4 2024 Financial Audit Report",
            reportType: "Financial",
            status: "Published",
            createdDate: "2024-11-01",
            publishedDate: "2024-11-20",
            author: "James Carter",
            department: "Finance Department",
            findings: 8,
            recommendations: 12,
            priority: "High",
            fileSize: "2.4 MB",
            pages: 45
        },
        {
            id: "2",
            reportNumber: "AR-2024-002",
            title: "GDPR Compliance Assessment",
            reportType: "Compliance",
            status: "Under Review",
            createdDate: "2024-11-15",
            author: "Sarah Johnson",
            department: "IT Department",
            findings: 15,
            recommendations: 18,
            priority: "Critical",
            fileSize: "3.1 MB",
            pages: 62
        },
        {
            id: "3",
            reportNumber: "AR-2024-003",
            title: "Procurement Process Audit",
            reportType: "Operational",
            status: "Approved",
            createdDate: "2024-10-20",
            publishedDate: "2024-11-10",
            author: "Michael Chen",
            department: "Procurement",
            findings: 6,
            recommendations: 9,
            priority: "Medium",
            fileSize: "1.8 MB",
            pages: 38
        },
        {
            id: "4",
            reportNumber: "AR-2024-004",
            title: "Network Security Assessment",
            reportType: "IT Security",
            status: "Published",
            createdDate: "2024-09-15",
            publishedDate: "2024-10-05",
            author: "Sarah Johnson",
            department: "IT Department",
            findings: 12,
            recommendations: 15,
            priority: "Critical",
            fileSize: "4.2 MB",
            pages: 78
        },
        {
            id: "5",
            reportNumber: "AR-2024-005",
            title: "Student Data Privacy Review",
            reportType: "Compliance",
            status: "Draft",
            createdDate: "2024-11-25",
            author: "James Carter",
            department: "Student Affairs",
            findings: 4,
            recommendations: 6,
            priority: "High",
            fileSize: "1.2 MB",
            pages: 28
        },
        {
            id: "6",
            reportNumber: "AR-2024-006",
            title: "Enterprise Risk Assessment 2024",
            reportType: "Risk Assessment",
            status: "Under Review",
            createdDate: "2024-11-10",
            author: "Michael Chen",
            department: "All Departments",
            findings: 22,
            recommendations: 28,
            priority: "Critical",
            fileSize: "5.6 MB",
            pages: 95
        },
        {
            id: "7",
            reportNumber: "AR-2024-007",
            title: "Payroll System Audit",
            reportType: "Financial",
            status: "Published",
            createdDate: "2024-08-15",
            publishedDate: "2024-09-10",
            author: "James Carter",
            department: "HR & Payroll",
            findings: 5,
            recommendations: 7,
            priority: "Medium",
            fileSize: "1.9 MB",
            pages: 34
        },
        {
            id: "8",
            reportNumber: "AR-2023-012",
            title: "Library Operations Review",
            reportType: "Operational",
            status: "Published",
            createdDate: "2023-12-01",
            publishedDate: "2024-01-15",
            author: "Michael Chen",
            department: "Library",
            findings: 3,
            recommendations: 5,
            priority: "Low",
            fileSize: "1.1 MB",
            pages: 22
        }
    ];

    // Statistics
    const totalReports = reports.length;
    const publishedCount = reports.filter(r => r.status === "Published").length;
    const underReviewCount = reports.filter(r => r.status === "Under Review").length;
    const totalFindings = reports.reduce((sum, r) => sum + r.findings, 0);

    const stats = [
        {
            title: "Total Reports",
            value: totalReports.toString(),
            change: "+2",
            trend: "up",
            icon: <IoDocumentTextOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-blue-500 via-blue-600 to-blue-700",
        },
        {
            title: "Published",
            value: publishedCount.toString(),
            subtitle: "available",
            change: "+1",
            trend: "up",
            icon: <IoCheckmarkCircleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
        },
        {
            title: "Under Review",
            value: underReviewCount.toString(),
            subtitle: "pending",
            change: "+1",
            trend: "up",
            icon: <IoTimeOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-amber-500 via-amber-600 to-amber-700",
        },
        {
            title: "Total Findings",
            value: totalFindings.toString(),
            subtitle: "across all reports",
            change: "+8",
            trend: "up",
            icon: <IoStatsChartOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-purple-500 via-purple-600 to-purple-700",
        },
    ];

    // Filter reports
    const filteredReports = reports.filter(report => {
        const matchesType = filterType === "All" || report.reportType === filterType;
        const matchesStatus = filterStatus === "All" || report.status === filterStatus;
        const matchesPriority = filterPriority === "All" || report.priority === filterPriority;
        return matchesType && matchesStatus && matchesPriority;
    });

    // Helper functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Published": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Approved": return "bg-blue-50 text-blue-700 border-blue-200";
            case "Under Review": return "bg-amber-50 text-amber-700 border-amber-200";
            case "Draft": return "bg-gray-50 text-gray-700 border-gray-200";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Critical": return "bg-red-100 text-red-800";
            case "High": return "bg-orange-100 text-orange-800";
            case "Medium": return "bg-amber-100 text-amber-800";
            case "Low": return "bg-blue-100 text-blue-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Published": return <IoCheckmarkCircleOutline className="w-4 h-4" />;
            case "Approved": return <IoCheckmarkCircleOutline className="w-4 h-4" />;
            case "Under Review": return <IoTimeOutline className="w-4 h-4" />;
            case "Draft": return <IoAlertCircleOutline className="w-4 h-4" />;
            default: return <IoDocumentTextOutline className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Financial": return "bg-green-50 text-green-700 border-green-200";
            case "Compliance": return "bg-purple-50 text-purple-700 border-purple-200";
            case "Operational": return "bg-blue-50 text-blue-700 border-blue-200";
            case "IT Security": return "bg-red-50 text-red-700 border-red-200";
            case "Risk Assessment": return "bg-orange-50 text-orange-700 border-orange-200";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Audit Reports</h1>
                    <p className="text-sm sm:text-base text-primary-50/70">
                        Generate, manage, and publish comprehensive audit reports.
                    </p>
                </div>
                <button
                    onClick={() => setShowNewReportModal(true)}
                    className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-all shadow-md hover:shadow-lg font-medium text-sm sm:text-base active:scale-95"
                >
                    <IoAddOutline className="w-5 h-5" />
                    New Report
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md w-fit group-hover:scale-110 transition-transform duration-300`}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-500 font-medium mb-2">
                                    {stat.title}
                                    {stat.subtitle && <span className="block text-xs text-gray-400">{stat.subtitle}</span>}
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.trend === 'up' ? <IoTrendingUpOutline /> : <IoTrendingDownOutline />}
                                    <span>{stat.change} this month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                        <IoDocumentTextOutline className="text-primary-50 w-5 h-5 sm:w-6 sm:h-6" />
                        All Reports
                    </h2>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                    >
                        <IoFilterOutline className="w-4 h-4" />
                        <span className="hidden xs:inline">Filters</span>
                        <IoChevronDownOutline className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pb-4 border-b border-gray-100">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Report Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Types</option>
                                <option value="Financial">Financial</option>
                                <option value="Compliance">Compliance</option>
                                <option value="Operational">Operational</option>
                                <option value="IT Security">IT Security</option>
                                <option value="Risk Assessment">Risk Assessment</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Published">Published</option>
                                <option value="Approved">Approved</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Priorities</option>
                                <option value="Critical">Critical</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {filteredReports.length === 0 ? (
                    <div className="p-8 sm:p-12 text-center">
                        <IoDocumentTextOutline className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No reports found</h3>
                        <p className="text-sm sm:text-base text-gray-500">Try adjusting your filter criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Report Details
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                                        Type
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                                        Findings
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                                        Author
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                                        Date
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-50 transition-colors group">
                                        {/* Report Details */}
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-xs sm:text-sm font-mono text-primary-100 font-bold">
                                                        {report.reportNumber}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getPriorityColor(report.priority)}`}>
                                                        {report.priority}
                                                    </span>
                                                </div>
                                                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-primary-100 transition-colors">
                                                    {report.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-500">{report.department}</p>
                                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                                    <span>{report.pages} pages</span>
                                                    <span>•</span>
                                                    <span>{report.fileSize}</span>
                                                </div>
                                                {/* Mobile-only info */}
                                                <div className="md:hidden mt-2 space-y-1">
                                                    <div className="text-xs text-gray-600">
                                                        <span className="font-semibold">Type:</span> {report.reportType}
                                                    </div>
                                                    <div className="text-xs text-gray-600 sm:hidden">
                                                        <span className="font-semibold">Created:</span> {new Date(report.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Type */}
                                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold border ${getTypeColor(report.reportType)}`}>
                                                {report.reportType}
                                            </span>
                                        </td>

                                        {/* Findings */}
                                        <td className="px-4 sm:px-6 py-4 text-center hidden lg:table-cell">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-lg font-bold text-gray-900">{report.findings}</span>
                                                <span className="text-xs text-gray-500">{report.recommendations} recs</span>
                                            </div>
                                        </td>

                                        {/* Author */}
                                        <td className="px-4 sm:px-6 py-4 hidden xl:table-cell">
                                            <div className="text-sm font-medium text-gray-900">{report.author}</div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border whitespace-nowrap ${getStatusColor(report.status)}`}>
                                                {getStatusIcon(report.status)}
                                                <span className="hidden sm:inline">{report.status}</span>
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                                <IoCalendarOutline className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <div className="font-medium">
                                                        {report.publishedDate 
                                                            ? new Date(report.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                            : new Date(report.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                        }
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {report.publishedDate ? 'Published' : 'Created'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => {
                                                        alert(`Viewing report: ${report.title}\n\nReport Number: ${report.reportNumber}\nStatus: ${report.status}\nAuthor: ${report.author}`);
                                                    }}
                                                    className="p-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-all group-hover:scale-110"
                                                    title="View Report"
                                                >
                                                    <IoEyeOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        // Generate CSV data for Excel
                                                        const csvData = [
                                                            ['Audit Report Export'],
                                                            [''],
                                                            ['Report Information'],
                                                            ['Report Number', report.reportNumber],
                                                            ['Title', report.title],
                                                            ['Report Type', report.reportType],
                                                            ['Status', report.status],
                                                            ['Priority', report.priority],
                                                            [''],
                                                            ['Details'],
                                                            ['Department', report.department],
                                                            ['Author', report.author],
                                                            ['Created Date', new Date(report.createdDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
                                                            ['Published Date', report.publishedDate ? new Date(report.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not Published'],
                                                            [''],
                                                            ['Metrics'],
                                                            ['Findings', report.findings.toString()],
                                                            ['Recommendations', report.recommendations.toString()],
                                                            ['Pages', report.pages.toString()],
                                                            ['File Size', report.fileSize],
                                                        ];

                                                        // Convert to CSV string
                                                        const csvContent = csvData.map(row => 
                                                            row.map(cell => `"${cell}"`).join(',')
                                                        ).join('\n');

                                                        // Create blob and download
                                                        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                                                        const link = document.createElement('a');
                                                        const url = URL.createObjectURL(blob);
                                                        link.setAttribute('href', url);
                                                        link.setAttribute('download', `${report.reportNumber}_${report.title.replace(/\s+/g, '_')}.csv`);
                                                        link.style.visibility = 'hidden';
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    }}
                                                    className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                                    title="Export to Excel"
                                                >
                                                    <IoDownloadOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                                {report.status === "Published" && (
                                                    <button 
                                                        onClick={() => {
                                                            // Simulate share functionality
                                                            const shareUrl = `${window.location.origin}/reports/${report.id}`;
                                                            if (navigator.share) {
                                                                navigator.share({
                                                                    title: report.title,
                                                                    text: `Check out this audit report: ${report.title}`,
                                                                    url: shareUrl,
                                                                }).catch(() => {
                                                                    // Fallback if share fails
                                                                    navigator.clipboard.writeText(shareUrl);
                                                                    alert(`Share link copied to clipboard!\n\n${shareUrl}`);
                                                                });
                                                            } else {
                                                                // Fallback for browsers that don't support Web Share API
                                                                navigator.clipboard.writeText(shareUrl);
                                                                alert(`Share link copied to clipboard!\n\n${shareUrl}`);
                                                            }
                                                        }}
                                                        className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
                                                        title="Share Report"
                                                    >
                                                        <IoShareSocialOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Results Count */}
            {filteredReports.length > 0 && (
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{filteredReports.length}</span> of <span className="font-semibold text-gray-900">{totalReports}</span> reports
                    </p>
                </div>
            )}

            {/* New Report Modal */}
            {showNewReportModal && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setShowNewReportModal(false)}
                >
                    <div 
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Audit Report</h3>
                            <p className="text-sm text-gray-500 mt-1">Fill in the details to generate a new audit report</p>
                        </div>

                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const reportData = {
                                    title: formData.get('title'),
                                    reportType: formData.get('reportType'),
                                    department: formData.get('department'),
                                    priority: formData.get('priority'),
                                    description: formData.get('description'),
                                };
                                console.log('New Report Data:', reportData);
                                alert(`Report "${reportData.title}" created successfully!`);
                                setShowNewReportModal(false);
                            }}
                            className="p-6 space-y-6"
                        >
                            {/* Report Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Report Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    placeholder="e.g., Q1 2025 Financial Audit Report"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>

                            {/* Report Type and Priority */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="reportType" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Report Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="reportType"
                                        name="reportType"
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent text-sm sm:text-base"
                                    >
                                        <option value="">Select type...</option>
                                        <option value="Financial">Financial</option>
                                        <option value="Compliance">Compliance</option>
                                        <option value="Operational">Operational</option>
                                        <option value="IT Security">IT Security</option>
                                        <option value="Risk Assessment">Risk Assessment</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Priority <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        required
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent text-sm sm:text-base"
                                    >
                                        <option value="">Select priority...</option>
                                        <option value="Critical">Critical</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                            </div>

                            {/* Department */}
                            <div>
                                <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    required
                                    placeholder="e.g., Finance Department"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="Provide a brief description of the audit scope and objectives..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent text-sm sm:text-base resize-none"
                                ></textarea>
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex gap-3">
                                    <IoAlertCircleOutline className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-blue-800">
                                        <p className="font-semibold mb-1">Report Generation</p>
                                        <p className="text-blue-700">
                                            Once created, the report will be saved as a draft. You can add findings, recommendations, and attachments before publishing.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowNewReportModal(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors font-medium shadow-sm hover:shadow-md"
                                >
                                    Create Report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuditReport;
