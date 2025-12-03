import React, { useCallback, useMemo, useState } from "react";
import {
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkDoneOutline,
    IoCloseOutline,
    IoDocumentTextOutline,
    IoFilterOutline,
    IoInformationCircleOutline,
    IoNotificationsOutline,
    IoPeopleOutline,
    IoTimeOutline,
    IoTrashOutline,
    IoWarningOutline,
} from "react-icons/io5";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "alert";
  category: "Academic" | "Financial" | "Administrative" | "Events" | "System";
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

const VcNotification: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Student Enrollment Record",
      message: "The university has reached a new enrollment milestone with 12,450 students registered for the current academic year. This represents a 12% increase from last year.",
      type: "success",
      category: "Academic",
      timestamp: "2024-12-03T08:30:00",
      read: false,
      priority: "high"
    },
    {
      id: "2",
      title: "Budget Review Meeting Scheduled",
      message: "Annual budget review meeting has been scheduled for December 15, 2024 at 10:00 AM in the Board Room. Please review the financial reports beforehand.",
      type: "info",
      category: "Financial",
      timestamp: "2024-12-03T07:15:00",
      read: false,
      priority: "high"
    },
    {
      id: "3",
      title: "Accreditation Deadline Approaching",
      message: "The accreditation renewal documentation is due in 30 days. Please ensure all departments submit their compliance reports by December 20, 2024.",
      type: "warning",
      category: "Administrative",
      timestamp: "2024-12-02T16:45:00",
      read: false,
      priority: "high"
    },
    {
      id: "4",
      title: "Research Grant Approved",
      message: "Congratulations! The research grant proposal for Advanced AI Studies has been approved with a funding of $2.5M over 3 years.",
      type: "success",
      category: "Academic",
      timestamp: "2024-12-02T14:20:00",
      read: true,
      priority: "medium"
    },
    {
      id: "5",
      title: "System Maintenance Scheduled",
      message: "The university management system will undergo scheduled maintenance on December 10, 2024 from 2:00 AM to 6:00 AM. Services may be temporarily unavailable.",
      type: "info",
      category: "System",
      timestamp: "2024-12-02T11:00:00",
      read: true,
      priority: "medium"
    },
    {
      id: "6",
      title: "Faculty Meeting Reminder",
      message: "Monthly faculty meeting is scheduled for tomorrow at 3:00 PM. Agenda includes curriculum updates and student performance review.",
      type: "info",
      category: "Events",
      timestamp: "2024-12-01T18:30:00",
      read: true,
      priority: "low"
    },
    {
      id: "7",
      title: "Low Attendance Alert",
      message: "Several courses have reported attendance rates below 75%. Immediate action required to address student engagement issues.",
      type: "alert",
      category: "Academic",
      timestamp: "2024-12-01T10:15:00",
      read: false,
      priority: "high"
    },
    {
      id: "8",
      title: "Scholarship Applications Open",
      message: "The scholarship application portal for the next academic year is now open. Deadline for submissions is January 31, 2025.",
      type: "info",
      category: "Financial",
      timestamp: "2024-11-30T09:00:00",
      read: true,
      priority: "low"
    },
  ]);

  const stats = useMemo(() => ({
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    high: notifications.filter(n => n.priority === "high").length,
    today: notifications.filter(n => {
      const today = new Date().toDateString();
      const notifDate = new Date(n.timestamp).toDateString();
      return today === notifDate;
    }).length,
  }), [notifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      const matchesFilter = 
        selectedFilter === "all" ? true :
        selectedFilter === "unread" ? !notification.read :
        notification.read;
      
      const matchesCategory = selectedCategory === "all" || notification.category === selectedCategory;
      
      return matchesFilter && matchesCategory;
    });
  }, [notifications, selectedFilter, selectedCategory]);

  const getNotificationIcon = useCallback((type: string) => {
    const icons = {
      "info": <IoInformationCircleOutline className="w-5 h-5" />,
      "success": <IoCheckmarkCircleOutline className="w-5 h-5" />,
      "warning": <IoWarningOutline className="w-5 h-5" />,
      "alert": <IoAlertCircleOutline className="w-5 h-5" />
    };
    return icons[type as keyof typeof icons];
  }, []);

  const getNotificationColor = useCallback((type: string) => {
    const colors = {
      "info": "bg-blue-100 text-blue-700",
      "success": "bg-green-100 text-green-700",
      "warning": "bg-yellow-100 text-yellow-700",
      "alert": "bg-red-100 text-red-700"
    };
    return colors[type as keyof typeof colors];
  }, []);

  const getCategoryIcon = useCallback((category: string) => {
    const icons = {
      "Academic": <IoDocumentTextOutline className="w-4 h-4" />,
      "Financial": <IoDocumentTextOutline className="w-4 h-4" />,
      "Administrative": <IoPeopleOutline className="w-4 h-4" />,
      "Events": <IoCalendarOutline className="w-4 h-4" />,
      "System": <IoInformationCircleOutline className="w-4 h-4" />
    };
    return icons[category as keyof typeof icons];
  }, []);

  const formatTimestamp = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  }, []);

  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const handleDelete = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (selectedNotification?.id === id) {
      setIsDetailModalOpen(false);
      setSelectedNotification(null);
    }
  }, [selectedNotification]);

  const handleNotificationClick = useCallback((notification: Notification) => {
    setSelectedNotification(notification);
    setIsDetailModalOpen(true);
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
  }, [handleMarkAsRead]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-comfortaa">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-50 mb-2">Notifications</h1>
            <p className="text-primary-50/70">Stay updated with important university announcements</p>
          </div>
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-100/90 transition-colors text-sm"
          >
            <IoCheckmarkDoneOutline className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-primary-50/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary-100/10 text-primary-100">
              <IoNotificationsOutline className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-primary-50">{stats.total}</div>
          </div>
          <div className="text-xs text-primary-50/60">Total Notifications</div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-primary-50/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <IoInformationCircleOutline className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-primary-50">{stats.unread}</div>
          </div>
          <div className="text-xs text-primary-50/60">Unread</div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-primary-50/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-red-100 text-red-700">
              <IoAlertCircleOutline className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-primary-50">{stats.high}</div>
          </div>
          <div className="text-xs text-primary-50/60">High Priority</div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-primary-50/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-100 text-green-700">
              <IoTimeOutline className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-primary-50">{stats.today}</div>
          </div>
          <div className="text-xs text-primary-50/60">Today</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-50/20 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-primary-50 mb-2">
              <IoFilterOutline className="inline w-4 h-4 mr-1" />
              Filter by Status
            </label>
            <div className="flex gap-2">
              {["all", "unread", "read"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter
                      ? "bg-primary-100 text-white"
                      : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-primary-50 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Financial">Financial</option>
              <option value="Administrative">Administrative</option>
              <option value="Events">Events</option>
              <option value="System">System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-50/20">
        <div className="p-4 border-b border-primary-50/20">
          <h2 className="text-lg font-semibold text-primary-50">
            {filteredNotifications.length} Notification{filteredNotifications.length !== 1 ? 's' : ''}
          </h2>
        </div>

        <div className="divide-y divide-primary-50/10">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-primary-50/60">
              <IoNotificationsOutline className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.read ? "bg-blue-50/30" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`text-sm font-medium text-primary-50 ${!notification.read ? "font-semibold" : ""}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="flex-shrink-0 w-2 h-2 bg-primary-100 rounded-full"></span>
                      )}
                    </div>

                    <p className="text-xs text-primary-50/70 line-clamp-2 mb-2">
                      {notification.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-primary-50/60">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(notification.category)}
                        <span>{notification.category}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <IoTimeOutline className="w-3 h-3" />
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                      {notification.priority === "high" && (
                        <>
                          <span>•</span>
                          <span className="text-red-600 font-medium">High Priority</span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(notification.id);
                    }}
                    className="flex-shrink-0 p-2 text-primary-50/40 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <IoTrashOutline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Notification Details</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded"
              >
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`flex-shrink-0 p-3 rounded-lg ${getNotificationColor(selectedNotification.type)}`}>
                  {getNotificationIcon(selectedNotification.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary-50 mb-2">
                    {selectedNotification.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-2 py-1 bg-gray-100 text-primary-50 rounded">
                      {selectedNotification.category}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      selectedNotification.priority === "high" ? "bg-red-100 text-red-700" :
                      selectedNotification.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {selectedNotification.priority.charAt(0).toUpperCase() + selectedNotification.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-primary-50/80 leading-relaxed">
                  {selectedNotification.message}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-primary-50/60 mb-6">
                <IoTimeOutline className="w-4 h-4" />
                <span>{new Date(selectedNotification.timestamp).toLocaleString()}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleDelete(selectedNotification.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  <IoTrashOutline className="w-4 h-4" />
                  Delete
                </button>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VcNotification;
