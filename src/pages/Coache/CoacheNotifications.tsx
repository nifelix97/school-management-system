import React, { useState } from "react";
import {
    IoCalendarOutline,
    IoCheckmarkDoneOutline,
    IoInformationCircleOutline,
    IoMailOutline,
    IoNotificationsOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashOutline,
    IoWarningOutline
} from "react-icons/io5";

interface Notification {
    id: string;
    title: string;
    message: string;
    type: "Info" | "Alert" | "Success" | "Reminder";
    date: string;
    time: string;
    isRead: boolean;
}

const CoacheNotifications: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<string>("All");
    
    // Mock Data
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "NOT-001",
            title: "New Match Schedule",
            message: "The away game against Riverdale High has been rescheduled to next Friday.",
            type: "Info",
            date: "Today",
            time: "10:30 AM",
            isRead: false
        },
        {
            id: "NOT-002",
            title: "Player Injury Update",
            message: "Michael Jordan (Varsity Basketball) has been cleared for light training.",
            type: "Success",
            date: "Yesterday",
            time: "4:15 PM",
            isRead: true
        },
        {
            id: "NOT-003",
            title: "Equipment Maintenance",
            message: "Annual gym equipment inspection is scheduled for this weekend. Please clear the area.",
            type: "Alert",
            date: "2 days ago",
            time: "09:00 AM",
            isRead: false
        },
        {
            id: "NOT-004",
            title: "Training Plan Due",
            message: "Reminder to submit the training plan for next month by EOD.",
            type: "Reminder",
            date: "3 days ago",
            time: "11:45 AM",
            isRead: true
        }
    ]);

    const handleMarkAsRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const handleDelete = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const getTypeIcon = (type: string) => {
        switch(type) {
            case "Info": return <IoInformationCircleOutline className="text-blue-500 w-6 h-6" />;
            case "Alert": return <IoWarningOutline className="text-red-500 w-6 h-6" />;
            case "Success": return <IoCheckmarkDoneOutline className="text-green-500 w-6 h-6" />;
            case "Reminder": return <IoCalendarOutline className="text-orange-500 w-6 h-6" />;
            default: return <IoNotificationsOutline className="text-gray-500 w-6 h-6" />;
        }
    };

    const filteredNotifications = notifications.filter(notif => 
        (filterType === "All" || 
         (filterType === "Unread" ? !notif.isRead : notif.type === filterType)) &&
        (notif.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         notif.message.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <IoNotificationsOutline className="text-primary-100" /> Notifications
                        </h1>
                        <p className="text-gray-500 mt-1">Stay updated with important alerts and messages.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                            <IoMailOutline className="text-gray-400" />
                            <span className="text-sm font-bold text-gray-700">{unreadCount} Unread</span>
                        </div>
                        <button 
                            onClick={handleMarkAllRead}
                            className="px-4 py-2 text-sm font-bold text-primary-100 bg-primary-100/10 hover:bg-primary-100/20 rounded-xl transition-colors whitespace-nowrap"
                        >
                            Mark all as read
                        </button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-2 sm:pb-0">
                        {(["All", "Unread", "Info", "Alert", "Success", "Reminder"] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors whitespace-nowrap ${
                                    filterType === type 
                                    ? "bg-gray-900 text-white border-gray-900" 
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full sm:w-72">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-100 transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notif) => (
                            <div 
                                key={notif.id} 
                                className={`group relative bg-white p-5 rounded-2xl border transition-all duration-200 hover:shadow-md ${
                                    notif.isRead ? "border-gray-100" : "border-l-4 border-l-primary-100 border-y-gray-100 border-r-gray-100 bg-blue-50/10"
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                                        notif.isRead ? "bg-gray-50" : "bg-white shadow-sm border border-gray-100"
                                    }`}>
                                        {getTypeIcon(notif.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-1">
                                            <h3 className={`text-base sm:text-lg font-bold truncate ${notif.isRead ? "text-gray-700" : "text-gray-900"}`}>
                                                {notif.title}
                                            </h3>
                                            <span className="flex items-center gap-1 text-xs font-medium text-gray-400 whitespace-nowrap">
                                                <IoTimeOutline /> {notif.date} at {notif.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-3 sm:mb-0">
                                            {notif.message}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Actions */}
                                <div className="flex items-center justify-end gap-2 mt-4 sm:mt-0 sm:absolute sm:top-5 sm:right-5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                    {!notif.isRead && (
                                        <button 
                                            onClick={() => handleMarkAsRead(notif.id)}
                                            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-primary-100 hover:bg-primary-50 transition-colors shadow-sm"
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleDelete(notif.id)}
                                        className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-colors shadow-sm"
                                        title="Delete"
                                    >
                                        <IoTrashOutline className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 border-dashed">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <IoNotificationsOutline className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No notifications found</h3>
                            <p className="text-gray-500">You're all caught up!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoacheNotifications;
