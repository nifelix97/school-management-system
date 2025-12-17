
import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkDoneOutline,
    IoChevronDownOutline,
    IoDocumentTextOutline,
    IoFilterOutline,
    IoInformationCircleOutline,
    IoMailOpenOutline,
    IoMailOutline,
    IoNotificationsOutline,
    IoShieldCheckmarkOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrashOutline,
    IoWarningOutline
} from "react-icons/io5";

// Types
interface Notification {
    id: string;
    title: string;
    message: string;
    type: "Info" | "Success" | "Warning" | "Alert";
    category: "Audit" | "Compliance" | "Report" | "Security" | "System";
    timestamp: string;
    isRead: boolean;
    priority: "High" | "Medium" | "Low";
    actionUrl?: string;
}

const AuditorNotification: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            title: "New Compliance Report Available",
            message: "GDPR Compliance Assessment report has been published and is ready for review.",
            type: "Info",
            category: "Report",
            timestamp: "2024-12-17T09:30:00",
            isRead: false,
            priority: "High",
            actionUrl: "/auditor/reports"
        },
        {
            id: "2",
            title: "Audit Deadline Approaching",
            message: "Q4 2024 Financial Audit is due in 3 days. Please ensure all findings are documented.",
            type: "Warning",
            category: "Audit",
            timestamp: "2024-12-17T08:45:00",
            isRead: false,
            priority: "High"
        },
        {
            id: "3",
            title: "Security Alert: Unauthorized Access Attempt",
            message: "Multiple failed login attempts detected from IP 45.123.78.90. Immediate review recommended.",
            type: "Alert",
            category: "Security",
            timestamp: "2024-12-17T08:15:00",
            isRead: false,
            priority: "High",
            actionUrl: "/auditor/logs"
        },
        {
            id: "4",
            title: "Compliance Score Updated",
            message: "Overall compliance score has improved to 98%. Great work on addressing the recent findings!",
            type: "Success",
            category: "Compliance",
            timestamp: "2024-12-17T07:20:00",
            isRead: true,
            priority: "Medium",
            actionUrl: "/auditor/compliance"
        },
        {
            id: "5",
            title: "New Audit Request Assigned",
            message: "You have been assigned to conduct a Network Security Assessment for the IT Department.",
            type: "Info",
            category: "Audit",
            timestamp: "2024-12-16T16:30:00",
            isRead: true,
            priority: "High"
        },
        {
            id: "6",
            title: "System Maintenance Scheduled",
            message: "Scheduled system maintenance on Dec 20, 2024 from 2:00 AM to 4:00 AM. Plan accordingly.",
            type: "Info",
            category: "System",
            timestamp: "2024-12-16T14:00:00",
            isRead: true,
            priority: "Low"
        },
        {
            id: "7",
            title: "Report Approval Required",
            message: "Procurement Process Audit report is pending your approval before publication.",
            type: "Warning",
            category: "Report",
            timestamp: "2024-12-16T11:45:00",
            isRead: true,
            priority: "Medium",
            actionUrl: "/auditor/reports"
        },
        {
            id: "8",
            title: "Compliance Violation Detected",
            message: "Data retention policy violation found in Student Affairs department. Investigation needed.",
            type: "Alert",
            category: "Compliance",
            timestamp: "2024-12-16T09:30:00",
            isRead: true,
            priority: "High",
            actionUrl: "/auditor/compliance"
        }
    ]);

    const [filterType, setFilterType] = useState<string>("All");
    const [filterCategory, setFilterCategory] = useState<string>("All");
    const [showFilters, setShowFilters] = useState(false);
    const [showOnlyUnread, setShowOnlyUnread] = useState(false);

    // Statistics
    const totalNotifications = notifications.length;
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const highPriorityCount = notifications.filter(n => n.priority === "High" && !n.isRead).length;
    const alertCount = notifications.filter(n => n.type === "Alert" && !n.isRead).length;

    const stats = [
        {
            title: "Total",
            value: totalNotifications.toString(),
            icon: <IoNotificationsOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-blue-500 via-blue-600 to-blue-700",
        },
        {
            title: "Unread",
            value: unreadCount.toString(),
            icon: <IoMailOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-purple-500 via-purple-600 to-purple-700",
        },
        {
            title: "High Priority",
            value: highPriorityCount.toString(),
            icon: <IoWarningOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-amber-500 via-amber-600 to-amber-700",
        },
        {
            title: "Alerts",
            value: alertCount.toString(),
            icon: <IoAlertCircleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-red-500 via-red-600 to-red-700",
        },
    ];

    // Filter notifications
    const filteredNotifications = notifications.filter(notification => {
        const matchesType = filterType === "All" || notification.type === filterType;
        const matchesCategory = filterCategory === "All" || notification.category === filterCategory;
        const matchesReadStatus = !showOnlyUnread || !notification.isRead;
        return matchesType && matchesCategory && matchesReadStatus;
    });

    // Helper functions
    const getTypeColor = (type: string) => {
        switch (type) {
            case "Success": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Info": return "bg-blue-50 text-blue-700 border-blue-200";
            case "Warning": return "bg-amber-50 text-amber-700 border-amber-200";
            case "Alert": return "bg-red-50 text-red-700 border-red-200";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Success": return <IoCheckmarkCircleOutline className="w-5 h-5" />;
            case "Info": return <IoInformationCircleOutline className="w-5 h-5" />;
            case "Warning": return <IoWarningOutline className="w-5 h-5" />;
            case "Alert": return <IoAlertCircleOutline className="w-5 h-5" />;
            default: return <IoInformationCircleOutline className="w-5 h-5" />;
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Audit": return <IoStatsChartOutline className="w-4 h-4" />;
            case "Compliance": return <IoShieldCheckmarkOutline className="w-4 h-4" />;
            case "Report": return <IoDocumentTextOutline className="w-4 h-4" />;
            case "Security": return <IoShieldCheckmarkOutline className="w-4 h-4" />;
            case "System": return <IoInformationCircleOutline className="w-4 h-4" />;
            default: return <IoInformationCircleOutline className="w-4 h-4" />;
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, isRead: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Notifications</h1>
                    <p className="text-sm sm:text-base text-primary-50/70">
                        Stay updated with important alerts and system notifications.
                    </p>
                </div>
                <button
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-all shadow-md hover:shadow-lg font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <IoCheckmarkDoneOutline className="w-5 h-5" />
                    Mark All Read
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
                                <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">All Notifications</h2>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showOnlyUnread}
                                onChange={(e) => setShowOnlyUnread(e.target.checked)}
                                className="w-4 h-4 text-primary-50 border-gray-300 rounded focus:ring-2 focus:ring-primary-100"
                            />
                            <span className="text-sm text-gray-600 font-medium">Unread only</span>
                        </label>
                    </div>
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
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Types</option>
                                <option value="Success">Success</option>
                                <option value="Info">Info</option>
                                <option value="Warning">Warning</option>
                                <option value="Alert">Alert</option>
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
                                <option value="Audit">Audit</option>
                                <option value="Compliance">Compliance</option>
                                <option value="Report">Report</option>
                                <option value="Security">Security</option>
                                <option value="System">System</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Notifications List */}
            <div className="space-y-3 sm:space-y-4">
                {filteredNotifications.length === 0 ? (
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                        <IoNotificationsOutline className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No notifications found</h3>
                        <p className="text-sm sm:text-base text-gray-500">Try adjusting your filter criteria.</p>
                    </div>
                ) : (
                    filteredNotifications.map((notification) => (
                        <div 
                            key={notification.id}
                            className={`bg-white rounded-xl sm:rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-lg group ${
                                notification.isRead 
                                    ? 'border-gray-100' 
                                    : 'border-primary-100 bg-gradient-to-r from-primary-50/5 to-transparent'
                            }`}
                        >
                            <div className="p-4 sm:p-6">
                                <div className="flex gap-4">
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${getTypeColor(notification.type)} shadow-sm`}>
                                        {getTypeIcon(notification.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <h3 className={`text-base sm:text-lg font-bold ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                                                        {notification.title}
                                                    </h3>
                                                    {!notification.isRead && (
                                                        <span className="w-2 h-2 bg-primary-100 rounded-full"></span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                                                        {getCategoryIcon(notification.category)}
                                                        {notification.category}
                                                    </span>
                                                    {notification.priority === "High" && (
                                                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-800">
                                                            High Priority
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <IoTimeOutline className="w-4 h-4" />
                                                <span className="whitespace-nowrap">{formatTimestamp(notification.timestamp)}</span>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <p className={`text-sm mb-4 leading-relaxed ${notification.isRead ? 'text-gray-600' : 'text-gray-700'}`}>
                                            {notification.message}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {notification.actionUrl && (
                                                <button
                                                    onClick={() => window.location.href = notification.actionUrl!}
                                                    className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                                                >
                                                    View Details
                                                </button>
                                            )}
                                            {!notification.isRead && (
                                                <button
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2"
                                                >
                                                    <IoMailOpenOutline className="w-4 h-4" />
                                                    Mark as Read
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteNotification(notification.id)}
                                                className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-2"
                                            >
                                                <IoTrashOutline className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Results Count */}
            {filteredNotifications.length > 0 && (
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{filteredNotifications.length}</span> of <span className="font-semibold text-gray-900">{totalNotifications}</span> notifications
                    </p>
                </div>
            )}
        </div>
    );
};

export default AuditorNotification;
