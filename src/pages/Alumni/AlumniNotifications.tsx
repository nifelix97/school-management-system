import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoBriefcaseOutline,
    IoCalendarOutline,
    IoCheckmarkDoneOutline,
    IoMailOpenOutline,
    IoNotificationsOutline,
    IoPersonOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";

// Types
interface Notification {
    id: string;
    title: string;
    message: string;
    type: "event" | "career" | "mentorship" | "system" | "general";
    timestamp: string;
    isRead: boolean;
    actionLink?: string;
}

const AlumniNotifications: React.FC = () => {
    const [filter, setFilter] = useState<"all" | "unread" | "event" | "mentorship">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 4;
    
    // Mock Data
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            title: "Mentorship Request Accepted",
            message: "Sarah Johnson has accepted your mentorship request. You can now schedule your first meeting.",
            type: "mentorship",
            timestamp: "2 hours ago",
            isRead: false,
            actionLink: "/alumni/mentorship"
        },
        {
            id: "2",
            title: "New Event: Annual Alumni Gala",
            message: "Registration is now open for the Annual Alumni Gala. Early bird tickets available until Friday.",
            type: "event",
            timestamp: "5 hours ago",
            isRead: false,
            actionLink: "/alumni/events"
        },
        {
            id: "3",
            title: "New Job Match Found",
            message: "A new 'Senior Software Engineer' role at Tech Corp matches your profile preferences.",
            type: "career",
            timestamp: "1 day ago",
            isRead: true,
            actionLink: "/alumni/career"
        },
        {
            id: "4",
            title: "System Maintenance",
            message: "The alumni portal will be undergoing scheduled maintenance on Saturday (Dec 20) from 2 AM to 4 AM.",
            type: "system",
            timestamp: "2 days ago",
            isRead: true
        },
        {
            id: "5",
            title: "Profile Update Reminder",
            message: "It's been a while since you updated your profile. Add your latest achievements to stay relevant.",
            type: "general",
            timestamp: "3 days ago",
            isRead: true,
            actionLink: "/alumni/profile"
        },
        {
            id: "6",
            title: "Upcoming Webinar: Future of AI",
            message: "Don't miss our exclusive webinar with Dr. Alan Grant regarding the future of Artificial Intelligence.",
            type: "event",
            timestamp: "4 days ago",
            isRead: true,
            actionLink: "/alumni/events"
        }
    ]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    // Filter Logic
    const filteredNotifications = notifications.filter(notification => {
        if (filter === "all") return true;
        if (filter === "unread") return !notification.isRead;
        return notification.type === filter;
    });

    // Pagination Logic
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);
    const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);

    const changePage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Actions
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

    const getIcon = (type: string) => {
        switch (type) {
            case "event": return <IoCalendarOutline className="w-5 h-5 text-amber-500" />;
            case "career": return <IoBriefcaseOutline className="w-5 h-5 text-blue-500" />;
            case "mentorship": return <IoPersonOutline className="w-5 h-5 text-purple-500" />;
            case "system": return <IoAlertCircleOutline className="w-5 h-5 text-red-500" />;
            default: return <IoNotificationsOutline className="w-5 h-5 text-primary-100" />;
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case "event": return "bg-amber-50";
            case "career": return "bg-blue-50";
            case "mentorship": return "bg-purple-50";
            case "system": return "bg-red-50";
            default: return "bg-primary-50/10";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base mt-1">
                            Manage your alerts and updates
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <button 
                            onClick={markAllAsRead}
                            className="flex items-center gap-2 text-primary-100 font-medium hover:text-primary-50 transition-colors text-sm sm:text-base"
                        >
                            <IoCheckmarkDoneOutline className="w-5 h-5" />
                            Mark all as read
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {["all", "unread", "event", "mentorship"].map((f) => (
                        <button
                            key={f}
                            onClick={() => { setFilter(f as any); setCurrentPage(1); }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                                filter === f
                                    ? "bg-primary-100 text-white shadow-md shadow-primary-100/20"
                                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {currentNotifications.length > 0 ? (
                        <>
                            {currentNotifications.map((notification) => (
                                <div 
                                    key={notification.id} 
                                    className={`bg-white rounded-xl p-4 sm:p-5 border transition-all duration-300 hover:shadow-md group ${
                                        notification.isRead ? "border-gray-100" : "border-l-4 border-l-primary-100 border-gray-100 shadow-sm"
                                    }`}
                                >
                                    <div className="flex gap-4">
                                        {/* Icon */}
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notification.type)}`}>
                                            {getIcon(notification.type)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className={`font-semibold text-gray-900 mb-1 ${!notification.isRead ? "text-primary-100" : ""}`}>
                                                    {notification.title}
                                                </h3>
                                                <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1">
                                                    <IoTimeOutline /> {notification.timestamp}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed truncate sm:whitespace-normal sm:overflow-visible">
                                                {notification.message}
                                            </p>
                                            
                                            {/* Actions Footer */}
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                                                <div className="flex gap-2">
                                                    {notification.actionLink && (
                                                        <a href={notification.actionLink} className="text-primary-100 text-xs font-semibold hover:underline">
                                                            View Details
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {!notification.isRead && (
                                                        <button 
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="p-1.5 text-gray-400 hover:text-primary-100 hover:bg-primary-50/10 rounded-full transition-colors"
                                                            title="Mark as read"
                                                        >
                                                            <IoMailOpenOutline className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button 
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                        title="Delete"
                                                    >
                                                        <IoTrashOutline className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8 pt-4">
                                    <button
                                        onClick={() => changePage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            currentPage === 1
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => changePage(page)}
                                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                                                currentPage === page
                                                    ? "bg-primary-100 text-white shadow-md shadow-primary-100/20"
                                                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => changePage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            currentPage === totalPages
                                                ? "text-gray-300 cursor-not-allowed"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-dashed border-gray-200 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <IoNotificationsOutline className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No notifications</h3>
                            <p className="text-gray-500 text-sm max-w-xs">
                                {filter === "all" 
                                    ? "You're all caught up! Check back later for updates." 
                                    : `You have no ${filter} notifications at the moment.`}
                            </p>
                            {filter !== "all" && (
                                <button 
                                    onClick={() => setFilter("all")}
                                    className="mt-4 text-primary-100 text-sm font-medium hover:underline"
                                >
                                    View all notifications
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlumniNotifications;
