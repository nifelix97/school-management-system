import React, { useState } from "react";
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoEllipsisVerticalOutline,
  IoFilterOutline,
  IoInformationCircleOutline,
  IoMailOpenOutline,
  IoMailOutline,
  IoNotificationsOutline,
  IoTimeOutline,
  IoTrashOutline,
} from "react-icons/io5";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
  time: string;
  read: boolean;
  category: string;
}

const AdminNotifications: React.FC = () => {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<string>("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Student Registration",
      message: "John Doe has successfully registered for Computer Science program",
      type: "success",
      time: "5 minutes ago",
      read: false,
      category: "students",
    },
    {
      id: "2",
      title: "Payment Pending",
      message: "15 student payments are pending approval for this semester",
      type: "warning",
      time: "30 minutes ago",
      read: false,
      category: "finance",
    },
    {
      id: "3",
      title: "System Maintenance",
      message: "Scheduled system maintenance on Sunday, 2:00 AM - 4:00 AM",
      type: "info",
      time: "1 hour ago",
      read: true,
      category: "system",
    },
    {
      id: "4",
      title: "Course Assignment Failed",
      message: "Unable to assign teacher to Mathematics 301 - Conflict detected",
      type: "error",
      time: "2 hours ago",
      read: false,
      category: "courses",
    },
    {
      id: "5",
      title: "New Teacher Onboarded",
      message: "Dr. Sarah Johnson has been successfully added to the faculty",
      type: "success",
      time: "3 hours ago",
      read: true,
      category: "teachers",
    },
    {
      id: "6",
      title: "Low Attendance Alert",
      message: "Class CS-101 has attendance below 70% for the past week",
      type: "warning",
      time: "5 hours ago",
      read: false,
      category: "attendance",
    },
    {
      id: "7",
      title: "Exam Schedule Updated",
      message: "Final exam schedule has been published for all departments",
      type: "info",
      time: "1 day ago",
      read: true,
      category: "exams",
    },
    {
      id: "8",
      title: "Database Backup Completed",
      message: "Daily database backup completed successfully at 3:00 AM",
      type: "success",
      time: "1 day ago",
      read: true,
      category: "system",
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <IoCheckmarkCircleOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary-100" />;
      case "warning":
        return <IoAlertCircleOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary-100" />;
      case "error":
        return <IoCloseCircleOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary-50" />;
      case "info":
      default:
        return <IoInformationCircleOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary-50" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-primary-100/10";
      case "warning":
        return "bg-primary-100/10";
      case "error":
        return "bg-primary-50/10";
      case "info":
      default:
        return "bg-primary-50/10";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return notif.type === filter;
  });

  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page on filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2 flex items-center gap-3">
              <IoNotificationsOutline className="w-7 h-7 sm:w-8 sm:h-8" />
              Notifications
            </h1>
            <p className="text-sm sm:text-base text-primary-50/60">
              Stay updated with all system activities and alerts
            </p>
          </div>

          {/* Mark All as Read Button */}
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium"
            >
              <IoMailOpenOutline className="w-4 h-4" />
              Mark All as Read
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-xs sm:text-sm text-primary-50/60 mb-1">Total</div>
            <div className="text-xl sm:text-2xl font-bold text-primary-50">
              {notifications.length}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-xs sm:text-sm text-primary-50/60 mb-1">Unread</div>
            <div className="text-xl sm:text-2xl font-bold text-primary-100">
              {unreadCount}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-xs sm:text-sm text-primary-50/60 mb-1">Read</div>
            <div className="text-xl sm:text-2xl font-bold text-primary-50">
              {notifications.length - unreadCount}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="text-xs sm:text-sm text-primary-50/60 mb-1">Today</div>
            <div className="text-xl sm:text-2xl font-bold text-primary-50">
              {notifications.filter((n) => n.time.includes("minutes") || n.time.includes("hour")).length}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <IoFilterOutline className="w-5 h-5 text-primary-50" />
          <h2 className="text-lg font-bold text-primary-50">Filter Notifications</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[
            { value: "all", label: "All" },
            { value: "unread", label: "Unread" },
            { value: "read", label: "Read" },
            { value: "success", label: "Success" },
            { value: "warning", label: "Warning" },
            { value: "error", label: "Error" },
            { value: "info", label: "Info" },
          ].map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                filter === filterOption.value
                  ? "bg-primary-50 text-white"
                  : "bg-gray-100 text-primary-50 hover:bg-gray-200"
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 sm:mb-6">
          {filter === "all" && "All Notifications"}
          {filter === "unread" && "Unread Notifications"}
          {filter === "read" && "Read Notifications"}
          {filter === "success" && "Success Notifications"}
          {filter === "warning" && "Warning Notifications"}
          {filter === "error" && "Error Notifications"}
          {filter === "info" && "Info Notifications"}
          <span className="text-sm font-normal text-primary-50/60 ml-2">
            ({filteredNotifications.length})
          </span>
        </h2>

        {paginatedNotifications.length === 0 ? (
          <div className="text-center py-12">
            <IoNotificationsOutline className="w-16 h-16 text-primary-50/20 mx-auto mb-4" />
            <p className="text-primary-50/60">No notifications found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {paginatedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative flex gap-3 sm:gap-4 p-4 rounded-lg border transition-all ${
                  notification.read
                    ? "border-gray-200 bg-white"
                    : "border-primary-50/20 bg-primary-50/5"
                }`}
              >
                {/* Unread Indicator */}
                {!notification.read && (
                  <div className="absolute top-4 left-0 w-1 h-12 bg-primary-100 rounded-r" />
                )}

                {/* Icon */}
                <div className={`shrink-0 ${getNotificationBgColor(notification.type)} p-3 rounded-lg`}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className={`text-sm sm:text-base font-bold mb-1 ${
                        notification.read ? "text-primary-50/70" : "text-primary-50"
                      }`}>
                        {notification.title}
                      </h3>
                      <p className={`text-xs sm:text-sm ${
                        notification.read ? "text-primary-50/50" : "text-primary-50/70"
                      }`}>
                        {notification.message}
                      </p>
                    </div>

                    {/* Actions Dropdown */}
                    <div className="relative group">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50/60" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[150px]">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-primary-50 hover:bg-gray-50 transition-colors"
                          >
                            <IoMailOpenOutline className="w-4 h-4" />
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-primary-50 hover:bg-gray-50 transition-colors"
                        >
                          <IoTrashOutline className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-3 text-xs text-primary-50/50">
                    <span className="flex items-center gap-1">
                      <IoTimeOutline className="w-3 h-3" />
                      {notification.time}
                    </span>
                    <span className="px-2 py-0.5 bg-primary-50/10 text-primary-50 rounded text-xs">
                      {notification.category}
                    </span>
                    {!notification.read && (
                      <span className="flex items-center gap-1 text-primary-100">
                        <IoMailOutline className="w-3 h-3" />
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {filteredNotifications.length > ITEMS_PER_PAGE && (
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-xs sm:text-sm text-primary-50 hover:text-primary-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium px-3 py-1 bg-gray-50 rounded-lg"
              >
                Previous
              </button>
              <span className="text-xs sm:text-sm text-primary-50/60">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-xs sm:text-sm text-primary-50 hover:text-primary-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium px-3 py-1 bg-gray-50 rounded-lg"
              >
                Next
              </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
