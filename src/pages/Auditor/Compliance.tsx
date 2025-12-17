
import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoBanOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoCloseCircleOutline,
    IoDocumentTextOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWarningOutline,
} from "react-icons/io5";

// Types
interface ComplianceRequirement {
    id: string;
    category: string;
    requirement: string;
    description: string;
    status: "Compliant" | "Non-Compliant" | "Partial" | "Under Review";
    priority: "Critical" | "High" | "Medium" | "Low";
    lastReviewed: string;
    nextReview: string;
    assignedTo: string;
    complianceScore: number;
    violations: number;
    documentationStatus: "Complete" | "Incomplete" | "Missing";
}

const Compliance: React.FC = () => {
    const [filterCategory, setFilterCategory] = useState<string>("All");
    const [filterStatus, setFilterStatus] = useState<string>("All");
    const [filterPriority, setFilterPriority] = useState<string>("All");
    const [showFilters, setShowFilters] = useState(false);

    // Mock data
    const requirements: ComplianceRequirement[] = [
        {
            id: "1",
            category: "Financial Reporting",
            requirement: "GAAP Compliance",
            description: "Adherence to Generally Accepted Accounting Principles",
            status: "Compliant",
            priority: "Critical",
            lastReviewed: "2024-11-15",
            nextReview: "2025-02-15",
            assignedTo: "James Carter",
            complianceScore: 98,
            violations: 0,
            documentationStatus: "Complete"
        },
        {
            id: "2",
            category: "Data Protection",
            requirement: "GDPR Compliance",
            description: "General Data Protection Regulation requirements",
            status: "Partial",
            priority: "Critical",
            lastReviewed: "2024-10-20",
            nextReview: "2025-01-20",
            assignedTo: "Sarah Johnson",
            complianceScore: 75,
            violations: 3,
            documentationStatus: "Incomplete"
        },
        {
            id: "3",
            category: "IT Security",
            requirement: "ISO 27001",
            description: "Information Security Management System standards",
            status: "Under Review",
            priority: "High",
            lastReviewed: "2024-11-01",
            nextReview: "2025-02-01",
            assignedTo: "Michael Chen",
            complianceScore: 85,
            violations: 2,
            documentationStatus: "Incomplete"
        },
        {
            id: "4",
            category: "HR & Payroll",
            requirement: "Labor Law Compliance",
            description: "Adherence to national labor laws and regulations",
            status: "Compliant",
            priority: "High",
            lastReviewed: "2024-11-10",
            nextReview: "2025-02-10",
            assignedTo: "James Carter",
            complianceScore: 92,
            violations: 0,
            documentationStatus: "Complete"
        },
        {
            id: "5",
            category: "Environmental",
            requirement: "Environmental Standards",
            description: "Campus environmental and sustainability compliance",
            status: "Non-Compliant",
            priority: "Medium",
            lastReviewed: "2024-09-15",
            nextReview: "2024-12-15",
            assignedTo: "Sarah Johnson",
            complianceScore: 58,
            violations: 7,
            documentationStatus: "Missing"
        },
        {
            id: "6",
            category: "Academic",
            requirement: "Accreditation Standards",
            description: "Higher education accreditation requirements",
            status: "Compliant",
            priority: "Critical",
            lastReviewed: "2024-11-20",
            nextReview: "2025-05-20",
            assignedTo: "Michael Chen",
            complianceScore: 96,
            violations: 0,
            documentationStatus: "Complete"
        },
        {
            id: "7",
            category: "Financial Reporting",
            requirement: "Tax Compliance",
            description: "Corporate tax filing and reporting requirements",
            status: "Under Review",
            priority: "Critical",
            lastReviewed: "2024-11-25",
            nextReview: "2025-01-25",
            assignedTo: "James Carter",
            complianceScore: 88,
            violations: 1,
            documentationStatus: "Incomplete"
        },
        {
            id: "8",
            category: "IT Security",
            requirement: "Network Security Policy",
            description: "Firewall and network protection standards",
            status: "Partial",
            priority: "High",
            lastReviewed: "2024-10-30",
            nextReview: "2025-01-30",
            assignedTo: "Michael Chen",
            complianceScore: 72,
            violations: 4,
            documentationStatus: "Incomplete"
        }
    ];

    // Statistics
    const totalRequirements = requirements.length;
    const compliantCount = requirements.filter(r => r.status === "Compliant").length;
    const nonCompliantCount = requirements.filter(r => r.status === "Non-Compliant").length;
    const totalViolations = requirements.reduce((sum, r) => sum + r.violations, 0);
    const avgComplianceScore = Math.round(requirements.reduce((sum, r) => sum + r.complianceScore, 0) / totalRequirements);

    const stats = [
        {
            title: "Overall Compliance",
            value: `${avgComplianceScore}%`,
            change: "+3%",
            trend: "up",
            icon: <IoShieldCheckmarkOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
        },
        {
            title: "Compliant",
            value: compliantCount.toString(),
            subtitle: `of ${totalRequirements}`,
            change: "+2",
            trend: "up",
            icon: <IoCheckmarkCircleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-green-500 via-green-600 to-green-700",
        },
        {
            title: "Non-Compliant",
            value: nonCompliantCount.toString(),
            subtitle: "requires action",
            change: "-1",
            trend: "down",
            icon: <IoCloseCircleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-red-500 via-red-600 to-red-700",
        },
        {
            title: "Total Violations",
            value: totalViolations.toString(),
            subtitle: "across all areas",
            change: "-3",
            trend: "down",
            icon: <IoWarningOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-orange-500 via-orange-600 to-orange-700",
        },
    ];

    // Category breakdown
    const categories = Array.from(new Set(requirements.map(r => r.category)));
    const categoryStats = categories.map(cat => {
        const catReqs = requirements.filter(r => r.category === cat);
        const avgScore = Math.round(catReqs.reduce((sum, r) => sum + r.complianceScore, 0) / catReqs.length);
        const compliant = catReqs.filter(r => r.status === "Compliant").length;
        const total = catReqs.length;
        return { category: cat, avgScore, compliant, total };
    });

    // Filter requirements
    const filteredRequirements = requirements.filter(req => {
        const matchesCategory = filterCategory === "All" || req.category === filterCategory;
        const matchesStatus = filterStatus === "All" || req.status === filterStatus;
        const matchesPriority = filterPriority === "All" || req.priority === filterPriority;
        return matchesCategory && matchesStatus && matchesPriority;
    });

    // Helper functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Compliant": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Non-Compliant": return "bg-red-50 text-red-700 border-red-200";
            case "Partial": return "bg-amber-50 text-amber-700 border-amber-200";
            case "Under Review": return "bg-blue-50 text-blue-700 border-blue-200";
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
            case "Compliant": return <IoCheckmarkCircleOutline className="w-4 h-4" />;
            case "Non-Compliant": return <IoCloseCircleOutline className="w-4 h-4" />;
            case "Partial": return <IoAlertCircleOutline className="w-4 h-4" />;
            case "Under Review": return <IoTimeOutline className="w-4 h-4" />;
            default: return <IoDocumentTextOutline className="w-4 h-4" />;
        }
    };

    const getDocStatusColor = (status: string) => {
        switch (status) {
            case "Complete": return "text-emerald-600";
            case "Incomplete": return "text-amber-600";
            case "Missing": return "text-red-600";
            default: return "text-gray-600";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Compliance Management</h1>
                <p className="text-sm sm:text-base text-primary-50/70">
                    Monitor and manage regulatory compliance across all departments.
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
                                <div className="text-xs sm:text-sm text-gray-500 font-medium mb-2">
                                    {stat.title}
                                    {stat.subtitle && <span className="block text-xs text-gray-400">{stat.subtitle}</span>}
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.trend === 'up' ? <IoTrendingUpOutline /> : <IoTrendingDownOutline />}
                                    <span>{stat.change}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Category Breakdown - Bar Chart */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                    <IoShieldCheckmarkOutline className="text-primary-50 w-5 h-5 sm:w-6 sm:h-6" />
                    Compliance by Category
                </h2>
                
                {/* Chart Container */}
                <div className="relative">
                    {/* Y-axis labels */}
                    <div className="flex items-end justify-between mb-2 px-2">
                        <span className="text-xs text-gray-400">0%</span>
                        <span className="text-xs text-gray-400">25%</span>
                        <span className="text-xs text-gray-400">50%</span>
                        <span className="text-xs text-gray-400">75%</span>
                        <span className="text-xs text-gray-400">100%</span>
                    </div>
                    
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex justify-between pointer-events-none">
                        {[0, 25, 50, 75, 100].map((val) => (
                            <div key={val} className="w-px h-full bg-gray-100"></div>
                        ))}
                    </div>
                    
                    {/* Bar Chart */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative pt-4">
                        {categoryStats.map((cat) => (
                            <div key={cat.category} className="flex flex-col items-center group">
                                {/* Bar container */}
                                <div className="w-full h-48 sm:h-56 bg-gray-50 rounded-lg relative overflow-hidden border border-gray-100 group-hover:border-primary-100 transition-colors">
                                    {/* Bar fill */}
                                    <div 
                                        className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 group-hover:opacity-90 ${
                                            cat.avgScore >= 90 ? 'bg-gradient-to-t from-emerald-500 to-emerald-400' :
                                            cat.avgScore >= 75 ? 'bg-gradient-to-t from-blue-500 to-blue-400' :
                                            cat.avgScore >= 60 ? 'bg-gradient-to-t from-amber-500 to-amber-400' :
                                            'bg-gradient-to-t from-red-500 to-red-400'
                                        }`}
                                        style={{ height: `${cat.avgScore}%` }}
                                    >
                                        {/* Score label on bar */}
                                        <div className="absolute top-2 left-0 right-0 text-center">
                                            <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">
                                                {cat.avgScore}%
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Hover tooltip */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm rounded-lg">
                                        <div className="text-center text-white p-2">
                                            <div className="text-xs font-semibold mb-1">Compliance</div>
                                            <div className="text-sm">{cat.compliant}/{cat.total} items</div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Category label */}
                                <div className="mt-3 text-center">
                                    <h4 className="font-bold text-xs sm:text-sm text-gray-800 line-clamp-2 group-hover:text-primary-100 transition-colors">
                                        {cat.category}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {cat.compliant}/{cat.total}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Legend */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span className="text-xs text-gray-600">Excellent (≥90%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-gray-600">Good (75-89%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span className="text-xs text-gray-600">Fair (60-74%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-xs text-gray-600">Poor (&lt;60%)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                        <IoDocumentTextOutline className="text-primary-50 w-5 h-5 sm:w-6 sm:h-6" />
                        Compliance Requirements
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
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
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
                                <option value="Compliant">Compliant</option>
                                <option value="Non-Compliant">Non-Compliant</option>
                                <option value="Partial">Partial</option>
                                <option value="Under Review">Under Review</option>
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

            {/* Requirements Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {filteredRequirements.length === 0 ? (
                    <div className="p-8 sm:p-12 text-center">
                        <IoBanOutline className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No requirements found</h3>
                        <p className="text-sm sm:text-base text-gray-500">Try adjusting your filter criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Requirement
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                                        Category
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Score
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                                        Violations
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                                        Next Review
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredRequirements.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50 transition-colors group">
                                        {/* Requirement */}
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-primary-100 transition-colors">
                                                        {req.requirement}
                                                    </h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getPriorityColor(req.priority)}`}>
                                                        {req.priority}
                                                    </span>
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-500">{req.description}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-xs font-semibold ${getDocStatusColor(req.documentationStatus)}`}>
                                                        {req.documentationStatus} Documentation
                                                    </span>
                                                </div>
                                                {/* Mobile-only info */}
                                                <div className="md:hidden mt-2 space-y-1">
                                                    <div className="text-xs text-gray-600">
                                                        <span className="font-semibold">Category:</span> {req.category}
                                                    </div>
                                                    <div className="text-xs text-gray-600 sm:hidden">
                                                        <span className="font-semibold">Violations:</span> {req.violations}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                                            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                                                {req.category}
                                            </span>
                                        </td>

                                        {/* Score */}
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className={`text-lg sm:text-xl font-bold ${
                                                    req.complianceScore >= 90 ? 'text-emerald-600' :
                                                    req.complianceScore >= 75 ? 'text-blue-600' :
                                                    req.complianceScore >= 60 ? 'text-amber-600' :
                                                    'text-red-600'
                                                }`}>
                                                    {req.complianceScore}%
                                                </div>
                                                <div className="w-full max-w-[80px] bg-gray-200 rounded-full h-1.5 mt-1">
                                                    <div 
                                                        className={`h-1.5 rounded-full transition-all ${
                                                            req.complianceScore >= 90 ? 'bg-emerald-500' :
                                                            req.complianceScore >= 75 ? 'bg-blue-500' :
                                                            req.complianceScore >= 60 ? 'bg-amber-500' :
                                                            'bg-red-500'
                                                        }`}
                                                        style={{ width: `${req.complianceScore}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Violations */}
                                        <td className="px-4 sm:px-6 py-4 text-center hidden sm:table-cell">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                                                req.violations === 0 ? 'bg-emerald-100 text-emerald-700' :
                                                req.violations <= 2 ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {req.violations}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 sm:px-6 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border whitespace-nowrap ${getStatusColor(req.status)}`}>
                                                {getStatusIcon(req.status)}
                                                <span className="hidden sm:inline">{req.status}</span>
                                            </span>
                                        </td>

                                        {/* Next Review */}
                                        <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                                <IoCalendarOutline className="w-4 h-4 text-gray-400" />
                                                <span className="font-medium">
                                                    {new Date(req.nextReview).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 sm:px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <button 
                                                    className="p-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-all group-hover:scale-110"
                                                    title="View Details"
                                                >
                                                    <IoEyeOutline className="w-4 h-4 sm:w-5 sm:h-5" />
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
            {filteredRequirements.length > 0 && (
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{filteredRequirements.length}</span> of <span className="font-semibold text-gray-900">{totalRequirements}</span> requirements
                    </p>
                </div>
            )}
        </div>
    );
};

export default Compliance;
