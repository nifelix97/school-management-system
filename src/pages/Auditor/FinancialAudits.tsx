
import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWarningOutline
} from "react-icons/io5";

// Types
interface FinancialAudit {
    id: string;
    auditNumber: string;
    title: string;
    department: string;
    auditType: "Internal" | "External" | "Compliance" | "Operational";
    status: "Completed" | "In Progress" | "Pending" | "Flagged";
    startDate: string;
    endDate: string;
    auditor: string;
    findings: number;
    riskLevel: "Low" | "Medium" | "High" | "Critical";
    complianceScore: number;
    totalAmount: number;
    discrepancies: number;
}

const FinancialAudits: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("All");
    const [filterRisk, setFilterRisk] = useState<string>("All");
    const [filterType, setFilterType] = useState<string>("All");
    const [showFilters, setShowFilters] = useState(false);

    // Mock data
    const audits: FinancialAudit[] = [
        {
            id: "1",
            auditNumber: "FA-2024-001",
            title: "Q4 Financial Review",
            department: "Finance Department",
            auditType: "Internal",
            status: "Completed",
            startDate: "2024-10-01",
            endDate: "2024-11-15",
            auditor: "James Carter",
            findings: 3,
            riskLevel: "Low",
            complianceScore: 96,
            totalAmount: 2450000,
            discrepancies: 2
        },
        {
            id: "2",
            auditNumber: "FA-2024-002",
            title: "Procurement Audit",
            department: "Procurement",
            auditType: "Compliance",
            status: "In Progress",
            startDate: "2024-11-20",
            endDate: "2024-12-30",
            auditor: "Sarah Johnson",
            findings: 8,
            riskLevel: "Medium",
            complianceScore: 82,
            totalAmount: 1850000,
            discrepancies: 5
        },
        {
            id: "3",
            auditNumber: "FA-2024-003",
            title: "Payroll System Audit",
            department: "HR & Payroll",
            auditType: "Operational",
            status: "Flagged",
            startDate: "2024-09-15",
            endDate: "2024-10-20",
            auditor: "Michael Chen",
            findings: 12,
            riskLevel: "High",
            complianceScore: 68,
            totalAmount: 3200000,
            discrepancies: 9
        },
        {
            id: "4",
            auditNumber: "FA-2024-004",
            title: "Student Fees Reconciliation",
            department: "Student Affairs",
            auditType: "Internal",
            status: "Completed",
            startDate: "2024-08-01",
            endDate: "2024-09-10",
            auditor: "James Carter",
            findings: 1,
            riskLevel: "Low",
            complianceScore: 98,
            totalAmount: 5600000,
            discrepancies: 1
        },
        {
            id: "5",
            auditNumber: "FA-2024-005",
            title: "External Compliance Review",
            department: "All Departments",
            auditType: "External",
            status: "Pending",
            startDate: "2025-01-10",
            endDate: "2025-02-28",
            auditor: "External Auditor",
            findings: 0,
            riskLevel: "Medium",
            complianceScore: 0,
            totalAmount: 0,
            discrepancies: 0
        },
        {
            id: "6",
            auditNumber: "FA-2024-006",
            title: "IT Infrastructure Spending",
            department: "IT Department",
            auditType: "Operational",
            status: "In Progress",
            startDate: "2024-11-01",
            endDate: "2024-12-15",
            auditor: "Sarah Johnson",
            findings: 4,
            riskLevel: "Low",
            complianceScore: 89,
            totalAmount: 980000,
            discrepancies: 3
        },
        {
            id: "7",
            auditNumber: "FA-2023-012",
            title: "Library Budget Audit",
            department: "Library",
            auditType: "Internal",
            status: "Completed",
            startDate: "2023-12-01",
            endDate: "2024-01-20",
            auditor: "Michael Chen",
            findings: 2,
            riskLevel: "Low",
            complianceScore: 94,
            totalAmount: 450000,
            discrepancies: 1
        },
        {
            id: "8",
            auditNumber: "FA-2024-007",
            title: "Research Grants Compliance",
            department: "Research Department",
            auditType: "Compliance",
            status: "Flagged",
            startDate: "2024-10-15",
            endDate: "2024-11-30",
            auditor: "James Carter",
            findings: 15,
            riskLevel: "Critical",
            complianceScore: 54,
            totalAmount: 4200000,
            discrepancies: 12
        }
    ];

    // Statistics
    const stats = [
        {
            title: "Total Audits",
            value: audits.length.toString(),
            change: "+3",
            trend: "up",
            icon: <IoDocumentTextOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-blue-500 via-blue-600 to-blue-700",
        },
        {
            title: "In Progress",
            value: audits.filter(a => a.status === "In Progress").length.toString(),
            change: "+1",
            trend: "up",
            icon: <IoTimeOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-amber-500 via-amber-600 to-amber-700",
        },
        {
            title: "Flagged Issues",
            value: audits.filter(a => a.status === "Flagged").length.toString(),
            change: "-2",
            trend: "down",
            icon: <IoWarningOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-red-500 via-red-600 to-red-700",
        },
        {
            title: "Avg Compliance",
            value: `${Math.round(audits.reduce((acc, a) => acc + a.complianceScore, 0) / audits.length)}%`,
            change: "+4%",
            trend: "up",
            icon: <IoCheckmarkCircleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
        },
    ];

    // Filter audits
    const filteredAudits = audits.filter(audit => {
        const matchesSearch = 
            audit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            audit.auditNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            audit.department.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = filterStatus === "All" || audit.status === filterStatus;
        const matchesRisk = filterRisk === "All" || audit.riskLevel === filterRisk;
        const matchesType = filterType === "All" || audit.auditType === filterType;

        return matchesSearch && matchesStatus && matchesRisk && matchesType;
    });

    // Helper functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "In Progress": return "bg-blue-50 text-blue-700 border-blue-200";
            case "Pending": return "bg-gray-50 text-gray-700 border-gray-200";
            case "Flagged": return "bg-red-50 text-red-700 border-red-200";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case "Low": return "bg-emerald-100 text-emerald-800";
            case "Medium": return "bg-amber-100 text-amber-800";
            case "High": return "bg-orange-100 text-orange-800";
            case "Critical": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Completed": return <IoCheckmarkCircleOutline className="w-4 h-4" />;
            case "In Progress": return <IoTimeOutline className="w-4 h-4" />;
            case "Pending": return <IoAlertCircleOutline className="w-4 h-4" />;
            case "Flagged": return <IoWarningOutline className="w-4 h-4" />;
            default: return <IoDocumentTextOutline className="w-4 h-4" />;
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Financial Audits</h1>
                <p className="text-sm sm:text-base text-primary-50/70">
                    Comprehensive audit tracking and compliance monitoring.
                </p>
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
                                <div className="text-xs sm:text-sm text-gray-500 font-medium mb-2">{stat.title}</div>
                                <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.trend === 'up' ? <IoTrendingUpOutline /> : <IoTrendingDownOutline />}
                                    <span>{stat.change}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by audit number, title, or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent text-sm sm:text-base"
                        />
                    </div>

                    {/* Filter Toggle Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-50 text-white rounded-lg sm:rounded-xl hover:bg-primary-100 transition-colors font-medium text-sm sm:text-base shadow-sm"
                    >
                        <IoFilterOutline className="w-5 h-5" />
                        <span className="hidden xs:inline">Filters</span>
                        <IoChevronDownOutline className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Statuses</option>
                                <option value="Completed">Completed</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Pending">Pending</option>
                                <option value="Flagged">Flagged</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                            <select
                                value={filterRisk}
                                onChange={(e) => setFilterRisk(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Risk Levels</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Audit Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Types</option>
                                <option value="Internal">Internal</option>
                                <option value="External">External</option>
                                <option value="Compliance">Compliance</option>
                                <option value="Operational">Operational</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Audits Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {filteredAudits.length === 0 ? (
                    <div className="p-8 sm:p-12 text-center">
                        <IoDocumentTextOutline className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No audits found</h3>
                        <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Audit Details
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                                        Type
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                                        Period
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                                        Auditor
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Compliance
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                                        Findings
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredAudits.map((audit) => (
                                    <tr key={audit.id} className="hover:bg-gray-50 transition-colors group">
                                        {/* Audit Details */}
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-xs sm:text-sm font-mono text-primary-100 font-bold">
                                                        {audit.auditNumber}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getRiskColor(audit.riskLevel)}`}>
                                                        {audit.riskLevel}
                                                    </span>
                                                </div>
                                                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-primary-100 transition-colors">
                                                    {audit.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-500">{audit.department}</p>
                                                {/* Mobile-only info */}
                                                <div className="md:hidden mt-2 space-y-1">
                                                    <div className="text-xs text-gray-600">
                                                        <span className="font-semibold">Type:</span> {audit.auditType}
                                                    </div>
                                                    <div className="text-xs text-gray-600 sm:hidden">
                                                        <span className="font-semibold">Findings:</span> {audit.findings}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Type */}
                                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                                            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                                {audit.auditType}
                                            </span>
                                        </td>

                                        {/* Period */}
                                        <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                                <IoCalendarOutline className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <div className="font-medium">
                                                        {new Date(audit.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        to {new Date(audit.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Auditor */}
                                        <td className="px-4 sm:px-6 py-4 hidden xl:table-cell">
                                            <div className="text-sm font-medium text-gray-900">{audit.auditor}</div>
                                        </td>

                                        {/* Compliance */}
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="text-lg sm:text-xl font-bold text-primary-100">
                                                    {audit.complianceScore}%
                                                </div>
                                                <div className="w-full max-w-[80px] bg-gray-200 rounded-full h-1.5 mt-1">
                                                    <div 
                                                        className="bg-primary-100 h-1.5 rounded-full transition-all" 
                                                        style={{ width: `${audit.complianceScore}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Findings */}
                                        <td className="px-4 sm:px-6 py-4 text-center hidden sm:table-cell">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-lg sm:text-xl font-bold text-gray-900">{audit.findings}</span>
                                                {audit.discrepancies > 0 && (
                                                    <span className="text-xs text-red-600 font-semibold">
                                                        {audit.discrepancies} issues
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border whitespace-nowrap ${getStatusColor(audit.status)}`}>
                                                {getStatusIcon(audit.status)}
                                                <span className="hidden sm:inline">{audit.status}</span>
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    className="p-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-all group-hover:scale-110"
                                                    title="View Details"
                                                >
                                                    <IoEyeOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                                <button 
                                                    className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                                    title="Download Report"
                                                >
                                                    <IoDownloadOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
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
            {filteredAudits.length > 0 && (
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{filteredAudits.length}</span> of <span className="font-semibold text-gray-900">{audits.length}</span> audits
                    </p>
                </div>
            )}
        </div>
    );
};

export default FinancialAudits;
