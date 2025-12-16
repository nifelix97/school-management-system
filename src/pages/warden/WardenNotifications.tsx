import React, { useState } from "react";
import {
  IoCalendarOutline,
  IoCheckmarkDoneOutline,
  IoInformationCircleOutline,
  IoNotificationsOutline,
  IoTrashOutline,
  IoWarningOutline
} from "react-icons/io5";

type NotificationType = "System" | "Emergency" | "General";
type Priority = "High" | "Normal" | "Low";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  time: string;
  type: NotificationType;
  priority: Priority;
  isRead: boolean;
}

const WardenNotifications: React.FC = () => {
  const [filter, setFilter] = useState<"All" | "Unread">("All");

  // Mock Data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Emergency Fire Drill",
      message: "Scheduled fire drill next Friday at 10:00 AM. Ensure all students evacuate.",
      date: "2024-03-20",
      time: "09:30 AM",
      type: "Emergency",
      priority: "High",
      isRead: false,
    },
    {
      id: "2",
      title: "System Maintenance",
      message: "The hostel management system will be down for maintenance tonight from 2 AM to 4 AM.",
      date: "2024-03-19",
      time: "02:00 PM",
      type: "System",
      priority: "Normal",
      isRead: false,
    },
    {
      id: "3",
      title: "New Student Assignments",
      message: "5 new students have been assigned to Block A. Please review their profiles.",
      date: "2024-03-18",
      time: "11:15 AM",
      type: "General",
      priority: "Normal",
      isRead: true,
    },
    {
      id: "4",
      title: "Inventory Alert",
      message: "Cleaning supplies stock is running low. Please restock soon.",
      date: "2024-03-17",
      time: "04:45 PM",
      type: "System",
      priority: "High",
      isRead: true,
    },
  ]);

  const filteredNotifications = notifications.filter(n => 
    filter === "All" ? true : !n.isRead
  );

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

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
        case "Emergency": return <IoWarningOutline className="w-6 h-6 text-red-500" />;
        case "System": return <IoInformationCircleOutline className="w-6 h-6 text-blue-500" />;
        default: return <IoNotificationsOutline className="w-6 h-6 text-gray-500" />;
    }
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
        case "Emergency": return "bg-red-50 border-red-100";
        case "System": return "bg-blue-50 border-blue-100";
        default: return "bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Notifications</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
                Stay updated with hostel alerts and system messages
            </p>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={markAllAsRead}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-primary-50 border border-primary-50/20 rounded-xl text-sm font-semibold hover:bg-primary-50 hover:text-white transition-all shadow-sm"
                >
                    <IoCheckmarkDoneOutline className="w-5 h-5" />
                    Mark all as read
                </button>
            </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 bg-white p-1.5 rounded-xl w-fit border border-gray-100 shadow-sm">
            <button 
                onClick={() => setFilter("All")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === "All" ? "bg-primary-50 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}
            >
                All
            </button>
            <button 
                onClick={() => setFilter("Unread")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === "Unread" ? "bg-primary-50 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}
            >
                Unread
            </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                    <div 
                        key={notification.id} 
                        className={`relative p-4 sm:p-6 rounded-2xl border transition-all hover:shadow-md ${getTypeColor(notification.type)} ${!notification.isRead ? "border-l-4 border-l-primary-50" : ""}`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm shrink-0">
                                {getTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h3 className={`font-bold text-lg ${!notification.isRead ? "text-gray-900" : "text-gray-600"}`}>
                                        {notification.title}
                                    </h3>
                                    {!notification.isRead && (
                                        <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary-50 text-white rounded-full">
                                            New
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                                    {notification.message}
                                </p>
                                <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <IoCalendarOutline />
                                        {notification.date}
                                    </span>
                                    <span>•</span>
                                    <span>{notification.time}</span>
                                    <span>•</span>
                                    <span className={`uppercase ${notification.priority === 'High' ? 'text-red-500' : 'text-gray-400'}`}>
                                        {notification.priority} Priority
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0 ml-2">
                                {!notification.isRead && (
                                    <button 
                                        onClick={() => markAsRead(notification.id)}
                                        className="p-2 text-primary-50 hover:bg-white rounded-lg transition-colors"
                                        title="Mark as read"
                                    >
                                        <IoCheckmarkDoneOutline className="w-5 h-5" />
                                    </button>
                                )}
                                <button 
                                    onClick={() => deleteNotification(notification.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <IoTrashOutline className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <IoNotificationsOutline className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No notifications</h3>
                    <p className="text-gray-500 text-sm">You're all caught up! Check back later for updates.</p>
                    {filter !== "All" && (
                        <button 
                            onClick={() => setFilter("All")}
                            className="mt-4 text-primary-50 font-semibold text-sm hover:underline"
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

export default WardenNotifications;
