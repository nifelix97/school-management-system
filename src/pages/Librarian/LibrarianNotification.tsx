import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoBookOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkDoneOutline,
    IoCloseCircleOutline,
    IoEllipsisVerticalOutline,
    IoFilterOutline,
    IoNotificationsOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashOutline,
    IoWarningOutline
} from "react-icons/io5";

interface Notification {
  id: string;
  type: "overdue" | "return" | "reservation" | "system" | "fine" | "new_member";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
  relatedUser?: string;
  relatedBook?: string;
}

const LibrarianNotification: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "overdue",
      title: "Overdue Book Alert",
      message: "John Doe has an overdue book: 'Introduction to Algorithms'. Due date was 3 days ago.",
      timestamp: "2 hours ago",
      isRead: false,
      priority: "high",
      relatedUser: "John Doe",
      relatedBook: "Introduction to Algorithms",
    },
    {
      id: "2",
      type: "reservation",
      title: "New Book Reservation",
      message: "Sarah Smith has reserved 'Clean Code' by Robert C. Martin.",
      timestamp: "4 hours ago",
      isRead: false,
      priority: "medium",
      relatedUser: "Sarah Smith",
      relatedBook: "Clean Code",
    },
    {
      id: "3",
      type: "return",
      title: "Book Returned",
      message: "Michael Johnson returned 'Design Patterns' in good condition.",
      timestamp: "5 hours ago",
      isRead: true,
      priority: "low",
      relatedUser: "Michael Johnson",
      relatedBook: "Design Patterns",
    },
    {
      id: "4",
      type: "fine",
      title: "Fine Payment Received",
      message: "Emma Wilson paid $15.50 in late fees for overdue books.",
      timestamp: "1 day ago",
      isRead: true,
      priority: "medium",
      relatedUser: "Emma Wilson",
    },
    {
      id: "5",
      type: "new_member",
      title: "New Library Member",
      message: "David Brown has registered as a new library member.",
      timestamp: "1 day ago",
      isRead: false,
      priority: "low",
      relatedUser: "David Brown",
    },
    {
      id: "6",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled system maintenance on Saturday, 2:00 AM - 4:00 AM.",
      timestamp: "2 days ago",
      isRead: true,
      priority: "high",
    },
    {
      id: "7",
      type: "overdue",
      title: "Multiple Overdue Items",
      message: "Lisa Anderson has 3 overdue books. Total fine accumulated: $22.50.",
      timestamp: "2 days ago",
      isRead: false,
      priority: "high",
      relatedUser: "Lisa Anderson",
    },
    {
      id: "8",
      type: "reservation",
      title: "Reservation Ready",
      message: "The reserved book 'Artificial Intelligence' is now available for pickup by James Miller.",
      timestamp: "3 days ago",
      isRead: true,
      priority: "medium",
      relatedUser: "James Miller",
      relatedBook: "Artificial Intelligence",
    },
  ]);

  const filterOptions = [
    { value: "all", label: "All Notifications", icon: IoNotificationsOutline },
    { value: "overdue", label: "Overdue", icon: IoAlertCircleOutline },
    { value: "return", label: "Returns", icon: IoCheckmarkCircleOutline },
    { value: "reservation", label: "Reservations", icon: IoBookOutline },
    { value: "fine", label: "Fines", icon: IoWarningOutline },
    { value: "new_member", label: "New Members", icon: IoPersonOutline },
    { value: "system", label: "System", icon: IoNotificationsOutline },
  ];

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "overdue":
        return IoAlertCircleOutline;
      case "return":
        return IoCheckmarkCircleOutline;
      case "reservation":
        return IoBookOutline;
      case "fine":
        return IoWarningOutline;
      case "new_member":
        return IoPersonOutline;
      case "system":
        return IoNotificationsOutline;
      default:
        return IoNotificationsOutline;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "overdue":
        return "from-red-500 to-red-600";
      case "return":
        return "from-green-500 to-green-600";
      case "reservation":
        return "from-blue-500 to-blue-600";
      case "fine":
        return "from-amber-500 to-amber-600";
      case "new_member":
        return "from-purple-500 to-purple-600";
      case "system":
        return "from-primary-50 to-primary-100";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getPriorityBadge = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-600 border-blue-200";
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    const matchesFilter = selectedFilter === "all" || notif.type === selectedFilter;
    const matchesReadStatus = !showUnreadOnly || !notif.isRead;
    const matchesSearch =
      searchQuery === "" ||
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.relatedUser?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.relatedBook?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesReadStatus && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const highPriorityCount = notifications.filter((n) => n.priority === "high" && !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    setShowActionMenu(null);
  };

  const handleMarkAsUnread = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: false } : n))
    );
    setShowActionMenu(null);
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    setShowActionMenu(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all notifications?")) {
      setNotifications([]);
    }
  };

  const handleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedNotifications.length} selected notifications?`)) {
      setNotifications(notifications.filter((n) => !selectedNotifications.includes(n.id)));
      setSelectedNotifications([]);
    }
  };

  const handleBulkMarkAsRead = () => {
    setNotifications(
      notifications.map((n) =>
        selectedNotifications.includes(n.id) ? { ...n, isRead: true } : n
      )
    );
    setSelectedNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Notifications
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Stay updated with library activities and alerts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-100 animate-[slideUp_0.6s_ease-out]">
              <IoNotificationsOutline className="w-5 h-5 text-primary-50" />
              <span className="text-sm font-semibold text-primary-50">
                {unreadCount} Unread
              </span>
            </div>
            {highPriorityCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg relative overflow-hidden animate-bounce">
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-xl bg-red-500 animate-ping opacity-20"></div>
                <IoAlertCircleOutline className="w-5 h-5 text-white animate-pulse relative z-10" />
                <span className="text-sm font-semibold text-white relative z-10">
                  {highPriorityCount} Urgent
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

       {/* Summary Stats */}
      {notifications.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 animate-[slideUp_0.5s_ease-out] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <p className="text-xs text-primary-50/60 font-medium mb-1">Total</p>
            <p className="text-2xl font-bold text-primary-50">{notifications.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 animate-[slideUp_0.6s_ease-out] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <p className="text-xs text-primary-50/60 font-medium mb-1">Unread</p>
            <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 animate-[slideUp_0.7s_ease-out] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <p className="text-xs text-primary-50/60 font-medium mb-1">High Priority</p>
            <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 animate-[slideUp_0.8s_ease-out] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <p className="text-xs text-primary-50/60 font-medium mb-1">Filtered</p>
            <p className="text-2xl font-bold text-primary-50">
              {filteredNotifications.length}
            </p>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5 mb-6 animate-[scaleIn_0.5s_ease-out]">
        <div className="flex items-center gap-2 mb-4">
          <IoFilterOutline className="w-5 h-5 text-primary-50" />
          <h2 className="text-lg font-bold text-primary-50">Filters</h2>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filterOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedFilter === option.value
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Toggle Unread Only */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary-50 focus:ring-primary-50"
            />
            <span className="text-sm font-medium text-primary-50">
              Show unread only
            </span>
          </label>

          <div className="flex items-center gap-2">
            {selectedNotifications.length > 0 && (
              <>
                <button
                  onClick={handleBulkMarkAsRead}
                  className="px-3 py-1.5 bg-green-100 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-200 transition-all"
                >
                  Mark Read ({selectedNotifications.length})
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-all"
                >
                  Delete ({selectedNotifications.length})
                </button>
              </>
            )}
            <button
              onClick={handleMarkAllAsRead}
              className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-all flex items-center gap-1"
              title="Mark all as read"
            >
              <IoCheckmarkDoneOutline className="w-4 h-4" />
            </button>
            <button
              onClick={handleDeleteAll}
              className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-all flex items-center gap-1"
              title="Delete all notifications"
            >
              <IoTrashOutline className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center animate-[fadeIn_0.5s_ease-out]">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-gray-100 rounded-full animate-pulse">
                <IoNotificationsOutline className="w-12 h-12 text-primary-50/40" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-50 mb-2">
                  No notifications found
                </h3>
                <p className="text-primary-50/60">
                  {searchQuery
                    ? "Try adjusting your search or filters"
                    : "You're all caught up!"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const isSelected = selectedNotifications.includes(notification.id);

            return (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-md border transition-all hover:shadow-lg animate-[slideUp_0.5s_ease-out] hover:-translate-y-1 ${
                  notification.isRead
                    ? "border-gray-100"
                    : "border-primary-50/30 bg-gradient-to-r from-primary-50/5 to-transparent"
                } ${isSelected ? "ring-2 ring-primary-50" : ""}`}
                style={{ animationDelay: `${filteredNotifications.indexOf(notification) * 0.05}s` }}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start gap-4">
                    {/* Selection Checkbox */}
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectNotification(notification.id)}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-50 focus:ring-primary-50 cursor-pointer"
                    />

                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 p-3 bg-gradient-to-br ${getNotificationColor(
                        notification.type
                      )} rounded-xl shadow-md`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-primary-50">
                              {notification.title}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getPriorityBadge(
                                notification.priority
                              )}`}
                            >
                              {notification.priority}
                            </span>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-primary-50 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-primary-50/70 mb-3">
                            {notification.message}
                          </p>

                          {/* Related Info */}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-primary-50/60">
                            <div className="flex items-center gap-1">
                              <IoTimeOutline className="w-4 h-4" />
                              <span>{notification.timestamp}</span>
                            </div>
                            {notification.relatedUser && (
                              <div className="flex items-center gap-1">
                                <IoPersonOutline className="w-4 h-4" />
                                <span>{notification.relatedUser}</span>
                              </div>
                            )}
                            {notification.relatedBook && (
                              <div className="flex items-center gap-1">
                                <IoBookOutline className="w-4 h-4" />
                                <span className="truncate max-w-[200px]">
                                  {notification.relatedBook}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Menu */}
                        <div className="relative flex-shrink-0">
                          <button
                            onClick={() =>
                              setShowActionMenu(
                                showActionMenu === notification.id ? null : notification.id
                              )
                            }
                            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                          >
                            <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50" />
                          </button>

                          {showActionMenu === notification.id && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10">
                              {!notification.isRead ? (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="w-full px-4 py-2 text-left text-sm font-medium text-primary-50 hover:bg-gray-50 flex items-center gap-2 transition-all"
                                >
                                  <IoCheckmarkCircleOutline className="w-4 h-4" />
                                  Mark as read
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleMarkAsUnread(notification.id)}
                                  className="w-full px-4 py-2 text-left text-sm font-medium text-primary-50 hover:bg-gray-50 flex items-center gap-2 transition-all"
                                >
                                  <IoCloseCircleOutline className="w-4 h-4" />
                                  Mark as unread
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(notification.id)}
                                className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-all"
                              >
                                <IoTrashOutline className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

     
    </div>
  );
};

export default LibrarianNotification;
