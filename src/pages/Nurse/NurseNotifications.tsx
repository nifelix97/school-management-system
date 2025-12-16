import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoCheckmarkDoneOutline,
    IoInformationCircleOutline,
    IoMedkitOutline,
    IoNotificationsOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "urgent" | "info" | "reminder" | "system";
  time: string;
  isRead: boolean;
  date: string;
}

const NurseNotifications: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "unread" | "urgent">("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Emergency Alert: Student Fainting",
      message: "A student has fainted in the Science Lab pending immediate attention. Please respond.",
      type: "urgent",
      time: "2 mins ago",
      date: "Today",
      isRead: false,
    },
    {
      id: "2",
      title: "Medication Stock Low",
      message: "The stock for Paracetamol 500mg is running low (below 20 units). Please restock.",
      type: "system",
      time: "1 hour ago",
      date: "Today",
      isRead: false,
    },
    {
      id: "3",
      title: "Vaccination Schedule Reminder",
      message: "Upcoming vaccination drive for Grade 5 students scheduled for next Monday.",
      type: "reminder",
      time: "3 hours ago",
      date: "Today",
      isRead: true,
    },
    {
      id: "4",
      title: "Monthly Health Report Generated",
      message: "The health summary report for October 2024 has been successfully generated.",
      type: "info",
      time: "Yesterday",
      date: "Yesterday",
      isRead: true,
    },
    {
      id: "5",
      title: "Flu Season Advisory",
      message: "Please distribute the new flu prevention guidelines to all class teachers.",
      type: "info",
      time: "2 days ago",
      date: "Oct 24",
      isRead: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <IoAlertCircleOutline className="w-6 h-6 text-red-500" />;
      case "reminder":
        return <IoCalendarOutline className="w-6 h-6 text-amber-500" />;
      case "system":
        return <IoMedkitOutline className="w-6 h-6 text-blue-500" />;
      default:
        return <IoInformationCircleOutline className="w-6 h-6 text-primary-50" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-red-50";
      case "reminder":
        return "bg-amber-50";
      case "system":
        return "bg-blue-50";
      default:
        return "bg-primary-50/5";
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "urgent") return notification.type === "urgent";
    return true;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 flex items-center gap-3">
              <IoNotificationsOutline />
              Notifications
              {unreadCount > 0 && (
                <span className="text-sm font-medium bg-red-500 text-white px-3 py-1 rounded-full shadow-sm">
                  {unreadCount} New
                </span>
              )}
            </h1>
            <p className="text-sm text-primary-50/70 mt-1">
              Stay updated with alerts, reminders, and system messages
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-auto">
             <button 
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 text-primary-50 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all text-sm font-semibold"
                disabled={unreadCount === 0}
              >
                <IoCheckmarkDoneOutline className="w-5 h-5" />
                <span className="hidden xs:inline">Mark all read</span>
              </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide max-w-4xl mx-auto">
        <button
          onClick={() => { setFilter("all"); setCurrentPage(1); }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            filter === "all" 
              ? "bg-primary-50 text-white shadow-lg shadow-primary-50/30" 
              : "bg-white text-primary-50 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          All Notifications
        </button>
        <button
          onClick={() => { setFilter("unread"); setCurrentPage(1); }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
            filter === "unread" 
              ? "bg-primary-50 text-white shadow-lg shadow-primary-50/30" 
              : "bg-white text-primary-50 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Unread Only
        </button>
        <button
          onClick={() => { setFilter("urgent"); setCurrentPage(1); }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
             filter === "urgent"
              ? "bg-red-500 text-white shadow-lg shadow-red-500/30" 
              : "bg-white text-primary-50 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Urgent Alerts
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {paginatedNotifications.length > 0 ? (
          <>
            {paginatedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 animate-[fadeIn_0.3s_ease-out_both]
                ${notification.isRead 
                  ? "bg-white border-gray-100 opacity-90" 
                  : "bg-white border-primary-50/20 shadow-md ring-1 ring-primary-50/5"
                } hover:shadow-lg`}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                    <h3 className={`text-base sm:text-lg font-bold truncate pr-8 ${notification.isRead ? "text-gray-700" : "text-primary-50"}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-primary-50/50 whitespace-nowrap shrink-0">
                      <IoTimeOutline />
                      {notification.time}
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-3 break-words ${notification.isRead ? "text-gray-500" : "text-gray-600 font-medium"}`}>
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-500">
                      {notification.type.toUpperCase()}
                    </span>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete"
                    >
                      <IoTrashOutline className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Unread Indicator */}
                {!notification.isRead && (
                  <div className="absolute top-5 right-5 w-3 h-3 bg-red-500 rounded-full shadow-sm animate-pulse" />
                )}
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-primary-50 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-primary-50 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <IoNotificationsOutline className="w-8 h-8" />
             </div>
             <p className="text-lg font-semibold text-primary-50/70">No notifications found</p>
             <p className="text-sm text-gray-400">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NurseNotifications;
