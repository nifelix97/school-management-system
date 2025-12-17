
import React, { useState } from "react";
import {
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoCloseCircleOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoFilterOutline,
    IoInformationCircleOutline,
    IoPersonOutline,
    IoRefreshOutline,
    IoSearchOutline,
    IoServerOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWarningOutline,
} from "react-icons/io5";

// Types
interface SystemLog {
    id: string;
    timestamp: string;
    level: "Info" | "Success" | "Warning" | "Error" | "Critical";
    category: "Authentication" | "Database" | "API" | "Security" | "System" | "User Activity";
    user?: string;
    action: string;
    details: string;
    ipAddress?: string;
    module: string;
}

const SystemLogs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState<string>("All");
    const [filterCategory, setFilterCategory] = useState<string>("All");
    const [showFilters, setShowFilters] = useState(false);

    // Mock data
    const logs: SystemLog[] = [
        {
            id: "1",
            timestamp: "2024-12-17T09:45:23",
            level: "Success",
            category: "Authentication",
            user: "james.carter@university.edu",
            action: "User Login",
            details: "Successful login from Chrome browser",
            ipAddress: "192.168.1.105",
            module: "Auth Service"
        },
        {
            id: "2",
            timestamp: "2024-12-17T09:42:15",
            level: "Warning",
            category: "Security",
            user: "unknown",
            action: "Failed Login Attempt",
            details: "Multiple failed login attempts detected",
            ipAddress: "203.45.67.89",
            module: "Security Monitor"
        },
        {
            id: "3",
            timestamp: "2024-12-17T09:40:01",
            level: "Info",
            category: "Database",
            action: "Database Backup",
            details: "Scheduled database backup completed successfully",
            module: "Backup Service"
        },
        {
            id: "4",
            timestamp: "2024-12-17T09:35:47",
            level: "Error",
            category: "API",
            action: "API Request Failed",
            details: "External API timeout - Payment Gateway",
            module: "Payment Service"
        },
        {
            id: "5",
            timestamp: "2024-12-17T09:30:12",
            level: "Success",
            category: "User Activity",
            user: "sarah.johnson@university.edu",
            action: "Report Generated",
            details: "Financial audit report AR-2024-002 created",
            ipAddress: "192.168.1.112",
            module: "Report Service"
        },
        {
            id: "6",
            timestamp: "2024-12-17T09:25:33",
            level: "Critical",
            category: "Security",
            action: "Unauthorized Access Attempt",
            details: "Attempt to access restricted admin panel",
            ipAddress: "45.123.78.90",
            module: "Security Monitor"
        },
        {
            id: "7",
            timestamp: "2024-12-17T09:20:08",
            level: "Info",
            category: "System",
            action: "System Update",
            details: "Security patches applied successfully",
            module: "System Manager"
        },
        {
            id: "8",
            timestamp: "2024-12-17T09:15:45",
            level: "Warning",
            category: "Database",
            action: "High Query Load",
            details: "Database query response time exceeded threshold",
            module: "Database Monitor"
        },
        {
            id: "9",
            timestamp: "2024-12-17T09:10:22",
            level: "Success",
            category: "Authentication",
            user: "michael.chen@university.edu",
            action: "Password Changed",
            details: "User successfully updated password",
            ipAddress: "192.168.1.98",
            module: "Auth Service"
        },
        {
            id: "10",
            timestamp: "2024-12-17T09:05:17",
            level: "Info",
            category: "API",
            action: "API Health Check",
            details: "All API endpoints responding normally",
            module: "Health Monitor"
        },
        {
            id: "11",
            timestamp: "2024-12-17T09:00:00",
            level: "Success",
            category: "System",
            action: "Scheduled Task",
            details: "Daily maintenance tasks completed",
            module: "Task Scheduler"
        },
        {
            id: "12",
            timestamp: "2024-12-17T08:55:38",
            level: "Error",
            category: "Database",
            action: "Connection Pool Exhausted",
            details: "Database connection pool reached maximum capacity",
            module: "Database Service"
        }
    ];

    // Statistics
    const totalLogs = logs.length;
    const errorCount = logs.filter(l => l.level === "Error" || l.level === "Critical").length;
    const warningCount = logs.filter(l => l.level === "Warning").length;
    const successCount = logs.filter(l => l.level === "Success").length;

    const stats = [
        {
            title: "Total Logs",
            value: totalLogs.toString(),
            change: "+24",
            trend: "up",
            icon: <IoDocumentTextOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-blue-500 via-blue-600 to-blue-700",
        },
        {
            title: "Errors",
            value: errorCount.toString(),
            change: "-2",
            trend: "down",
            icon: <IoCloseCircleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-red-500 via-red-600 to-red-700",
        },
        {
            title: "Warnings",
            value: warningCount.toString(),
            change: "+1",
            trend: "up",
            icon: <IoWarningOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-amber-500 via-amber-600 to-amber-700",
        },
        {
            title: "Success",
            value: successCount.toString(),
            change: "+8",
            trend: "up",
            icon: <IoCheckmarkCircleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
        },
    ];

    // Filter logs
    const filteredLogs = logs.filter(log => {
        const matchesSearch = 
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesLevel = filterLevel === "All" || log.level === filterLevel;
        const matchesCategory = filterCategory === "All" || log.category === filterCategory;

        return matchesSearch && matchesLevel && matchesCategory;
    });

    // Helper functions
    const getLevelColor = (level: string) => {
        switch (level) {
            case "Success": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Info": return "bg-blue-50 text-blue-700 border-blue-200";
            case "Warning": return "bg-amber-50 text-amber-700 border-amber-200";
            case "Error": return "bg-red-50 text-red-700 border-red-200";
            case "Critical": return "bg-red-100 text-red-800 border-red-300";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const getLevelIcon = (level: string) => {
        switch (level) {
            case "Success": return <IoCheckmarkCircleOutline className="w-4 h-4" />;
            case "Info": return <IoInformationCircleOutline className="w-4 h-4" />;
            case "Warning": return <IoWarningOutline className="w-4 h-4" />;
            case "Error": return <IoCloseCircleOutline className="w-4 h-4" />;
            case "Critical": return <IoCloseCircleOutline className="w-4 h-4" />;
            default: return <IoInformationCircleOutline className="w-4 h-4" />;
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Authentication": return <IoShieldCheckmarkOutline className="w-4 h-4" />;
            case "Database": return <IoServerOutline className="w-4 h-4" />;
            case "User Activity": return <IoPersonOutline className="w-4 h-4" />;
            default: return <IoDocumentTextOutline className="w-4 h-4" />;
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
    };

    const exportLogs = () => {
        const csvData = [
            ['System Logs Export'],
            [''],
            ['Timestamp', 'Level', 'Category', 'User', 'Action', 'Details', 'IP Address', 'Module'],
            ...filteredLogs.map(log => [
                log.timestamp,
                log.level,
                log.category,
                log.user || 'System',
                log.action,
                log.details,
                log.ipAddress || 'N/A',
                log.module
            ])
        ];

        const csvContent = csvData.map(row => 
            row.map(cell => `"${cell}"`).join(',')
        ).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `system_logs_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">System Logs</h1>
                    <p className="text-sm sm:text-base text-primary-50/70">
                        Monitor and track all system activities and events.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                    >
                        <IoRefreshOutline className="w-5 h-5" />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                    <button
                        onClick={exportLogs}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors font-medium text-sm shadow-sm"
                    >
                        <IoDownloadOutline className="w-5 h-5" />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                </div>
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
                                    <span>{stat.change} today</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search logs by action, user, module, or details..."
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
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Log Level</label>
                            <select
                                value={filterLevel}
                                onChange={(e) => setFilterLevel(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Levels</option>
                                <option value="Success">Success</option>
                                <option value="Info">Info</option>
                                <option value="Warning">Warning</option>
                                <option value="Error">Error</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Categories</option>
                                <option value="Authentication">Authentication</option>
                                <option value="Database">Database</option>
                                <option value="API">API</option>
                                <option value="Security">Security</option>
                                <option value="System">System</option>
                                <option value="User Activity">User Activity</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Logs Timeline */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <IoDocumentTextOutline className="text-primary-50 w-5 h-5 sm:w-6 sm:h-6" />
                    Activity Timeline
                </h2>

                {filteredLogs.length === 0 ? (
                    <div className="p-8 sm:p-12 text-center">
                        <IoDocumentTextOutline className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No logs found</h3>
                        <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary-100 via-gray-200 to-gray-100 hidden sm:block"></div>

                        <div className="space-y-4">
                            {filteredLogs.map((log) => {
                                const { date, time } = formatTimestamp(log.timestamp);
                                
                                return (
                                    <div key={log.id} className="relative">
                                        {/* Timeline dot */}
                                        <div className={`absolute left-0 top-6 w-14 h-14 rounded-full border-4 border-white shadow-md hidden sm:flex items-center justify-center z-10 ${
                                            log.level === "Critical" || log.level === "Error" ? 'bg-red-500' :
                                            log.level === "Warning" ? 'bg-amber-500' :
                                            log.level === "Success" ? 'bg-emerald-500' :
                                            'bg-blue-500'
                                        }`}>
                                            <span className="text-white text-lg">
                                                {getLevelIcon(log.level)}
                                            </span>
                                        </div>

                                        {/* Log Card */}
                                        <div className="sm:ml-20 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-lg hover:border-primary-100 transition-all duration-300 group">
                                            {/* Header */}
                                            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border shadow-sm ${getLevelColor(log.level)}`}>
                                                        <span className="sm:hidden">{getLevelIcon(log.level)}</span>
                                                        {log.level}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 shadow-sm">
                                                        {getCategoryIcon(log.category)}
                                                        {log.category}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                                                    <IoTimeOutline className="w-4 h-4" />
                                                    <span className="font-semibold">{time}</span>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span className="hidden sm:inline">{date}</span>
                                                </div>
                                            </div>

                                            {/* Action */}
                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-100 transition-colors">
                                                {log.action}
                                            </h3>

                                            {/* Details */}
                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                                {log.details}
                                            </p>

                                            {/* Footer Info */}
                                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 border-t border-gray-100">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                    <IoServerOutline className="w-4 h-4 text-primary-50" />
                                                    <span className="font-medium">{log.module}</span>
                                                </div>
                                                {log.user && (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                        <IoPersonOutline className="w-4 h-4 text-primary-50" />
                                                        <span className="font-medium">{log.user}</span>
                                                    </div>
                                                )}
                                                {log.ipAddress && (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                                                        <span className="text-primary-50">IP:</span>
                                                        <span>{log.ipAddress}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Results Count */}
            {filteredLogs.length > 0 && (
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{filteredLogs.length}</span> of <span className="font-semibold text-gray-900">{totalLogs}</span> logs
                    </p>
                </div>
            )}
        </div>
    );
};

export default SystemLogs;
