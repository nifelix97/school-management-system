import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkDoneOutline,
    IoCloseCircleOutline,
    IoFilterOutline,
    IoInformationCircleOutline,
    IoMailOpenOutline,
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
  type: "info" | "success" | "warning" | "error" | "alert";
  category: string;
  timestamp: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
  sender: string;
  actionRequired?: boolean;
}

const PrincipalNotifications: React.FC = () => {
  const [activeView, setActiveView] = useState<"all" | "unread" | "read">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [notificationsList, setNotificationsList] = useState<Notification[]>([]);

  // Mock data
  const notifications: Notification[] = [
    {
      id: "1",
      title: "Budget Approval Required",
      message: "The Computer Science Department has submitted a budget request of $150,000 for new laboratory equipment. Your approval is required to proceed with the procurement process.",
      type: "alert",
      category: "Finance",
      timestamp: "2024-11-28T09:30:00",
      isRead: false,
      priority: "high",
      sender: "Finance Department",
      actionRequired: true,
    },
    {
      id: "2",
      title: "Faculty Meeting Scheduled",
      message: "A faculty meeting has been scheduled for December 5th at 2:00 PM in the Main Conference Hall. Agenda includes curriculum updates and strategic planning discussions.",
      type: "info",
      category: "Meetings",
      timestamp: "2024-11-28T08:15:00",
      isRead: false,
      priority: "medium",
      sender: "Academic Affairs",
      actionRequired: false,
    },
    {
      id: "3",
      title: "Student Enrollment Milestone Reached",
      message: "Congratulations! The university has reached 5,000 enrolled students for the Fall 2024 semester, exceeding our target by 8%. This is a significant achievement for our institution.",
      type: "success",
      category: "Enrollment",
      timestamp: "2024-11-27T16:45:00",
      isRead: true,
      priority: "low",
      sender: "Admissions Office",
      actionRequired: false,
    },
    {
      id: "4",
      title: "Security Alert: Campus Access System",
      message: "The campus access control system will undergo maintenance on November 30th from 1:00 AM to 5:00 AM. Alternative security measures will be in place during this period.",
      type: "warning",
      category: "Security",
      timestamp: "2024-11-27T14:20:00",
      isRead: false,
      priority: "high",
      sender: "Security Department",
      actionRequired: false,
    },
    {
      id: "5",
      title: "Research Grant Application Deadline",
      message: "Reminder: The deadline for submitting research grant applications for the Spring 2025 cycle is December 15th. Please review and approve faculty applications at your earliest convenience.",
      type: "info",
      category: "Research",
      timestamp: "2024-11-27T11:00:00",
      isRead: true,
      priority: "medium",
      sender: "Research Office",
      actionRequired: true,
    },
    {
      id: "6",
      title: "IT Infrastructure Upgrade Complete",
      message: "The campus-wide IT infrastructure upgrade has been successfully completed. All systems are now operational with improved performance and security features.",
      type: "success",
      category: "Technology",
      timestamp: "2024-11-26T18:30:00",
      isRead: true,
      priority: "low",
      sender: "IT Department",
      actionRequired: false,
    },
    {
      id: "7",
      title: "Critical: Accreditation Review Documents",
      message: "The accreditation review committee requires additional documentation by December 1st. Missing documents include faculty qualification records and program assessment reports.",
      type: "error",
      category: "Compliance",
      timestamp: "2024-11-26T10:15:00",
      isRead: false,
      priority: "high",
      sender: "Compliance Office",
      actionRequired: true,
    },
    {
      id: "8",
      title: "New Partnership Agreement Signed",
      message: "The university has successfully signed a partnership agreement with Tech Innovation Labs for collaborative research and student internship opportunities.",
      type: "success",
      category: "Partnerships",
      timestamp: "2024-11-25T15:45:00",
      isRead: true,
      priority: "medium",
      sender: "External Relations",
      actionRequired: false,
    },
    {
      id: "9",
      title: "Student Complaint Escalation",
      message: "A formal student complaint regarding course scheduling conflicts has been escalated to your office. The Student Affairs office requests your review and guidance on resolution.",
      type: "warning",
      category: "Student Affairs",
      timestamp: "2024-11-25T13:20:00",
      isRead: false,
      priority: "high",
      sender: "Student Affairs",
      actionRequired: true,
    },
    {
      id: "10",
      title: "Monthly Performance Report Available",
      message: "The monthly performance report for November 2024 is now available. The report includes enrollment statistics, financial summaries, and departmental performance metrics.",
      type: "info",
      category: "Reports",
      timestamp: "2024-11-25T09:00:00",
      isRead: true,
      priority: "low",
      sender: "Analytics Department",
      actionRequired: false,
    },
  ];

  const categories = ["all", "Finance", "Meetings", "Enrollment", "Security", "Research", "Technology", "Compliance", "Partnerships", "Student Affairs", "Reports"];

  // Initialize notifications list
  React.useEffect(() => {
    setNotificationsList(notifications);
  }, []);

  const filteredNotifications = notificationsList.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || notification.category === selectedCategory;
    const matchesView = activeView === "all" || 
                       (activeView === "unread" && !notification.isRead) ||
                       (activeView === "read" && notification.isRead);
    return matchesSearch && matchesCategory && matchesView;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return IoCheckmarkCircleOutline;
      case "error":
        return IoCloseCircleOutline;
      case "warning":
        return IoWarningOutline;
      case "alert":
        return IoAlertCircleOutline;
      case "info":
      default:
        return IoInformationCircleOutline;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "primary-300";
      case "error":
        return "primary-200";
      case "warning":
        return "primary-100";
      case "alert":
        return "primary-200";
      case "info":
      default:
        return "primary-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-primary-200/10 text-primary-200 border-primary-200/30";
      case "medium":
        return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "low":
        return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotificationsList(notificationsList.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const handleMarkAsUnread = (id: string) => {
    setNotificationsList(notificationsList.map(n => 
      n.id === id ? { ...n, isRead: false } : n
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      setNotificationsList(notificationsList.filter(n => n.id !== id));
      setSelectedNotifications(selectedNotifications.filter(sid => sid !== id));
    }
  };

  const handleMarkAllAsRead = () => {
    setNotificationsList(notificationsList.map(n => ({ ...n, isRead: true })));
  };

  const handleDeleteSelected = () => {
    if (selectedNotifications.length === 0) {
      alert("Please select notifications to delete.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${selectedNotifications.length} notification(s)?`)) {
      setNotificationsList(notificationsList.filter(n => !selectedNotifications.includes(n.id)));
      setSelectedNotifications([]);
    }
  };

  const toggleSelectNotification = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(sid => sid !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const totalNotifications = notificationsList.length;
  const unreadCount = notificationsList.filter(n => !n.isRead).length;
  const readCount = notificationsList.filter(n => n.isRead).length;
  const actionRequiredCount = notificationsList.filter(n => n.actionRequired && !n.isRead).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out_both]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Notifications
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Stay updated with important university notifications and alerts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md border border-gray-200"
            >
              <IoFilterOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button 
              onClick={handleMarkAllAsRead}
              className="px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2 shadow-md"
            >
              <IoCheckmarkDoneOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Mark All Read</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { Icon: IoNotificationsOutline, label: "Total Notifications", value: totalNotifications, color: "primary-50" },
          { Icon: IoMailOutline, label: "Unread", value: unreadCount, color: "primary-200" },
          { Icon: IoMailOpenOutline, label: "Read", value: readCount, color: "primary-300" },
          { Icon: IoAlertCircleOutline, label: "Action Required", value: actionRequiredCount, color: "primary-100" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color} mb-3 inline-block`}>
              <stat.Icon className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{stat.value}</div>
            <div className="text-sm font-semibold text-primary-50/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex flex-wrap gap-1 mb-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
        {[
          { id: "all", label: "All Notifications" },
          { id: "unread", label: "Unread" },
          { id: "read", label: "Read" },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeView === view.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 mb-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "300ms" }}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl font-semibold border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedNotifications.length > 0 && (
        <div className="bg-primary-50 text-white rounded-xl p-4 mb-6 shadow-lg animate-[slideUp_0.3s_ease-out_both]">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <IoCheckmarkCircleOutline className="w-5 h-5" />
              <span className="font-semibold">{selectedNotifications.length} notification(s) selected</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDeleteSelected}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <IoTrashOutline className="w-4 h-4" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedNotifications([])}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Select All Checkbox */}
      {filteredNotifications.length > 0 && (
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
              onChange={toggleSelectAll}
              className="w-5 h-5 rounded border-gray-300 text-primary-50 focus:ring-primary-50"
            />
            <span className="text-sm font-semibold text-primary-50">Select All Notifications</span>
          </label>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => {
            const NotificationIcon = getNotificationIcon(notification.type);
            const notificationColor = getNotificationColor(notification.type);
            
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both] ${
                  !notification.isRead ? "border-l-4 border-l-primary-50" : ""
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleSelectNotification(notification.id)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-50 focus:ring-primary-50"
                  />

                  {/* Icon */}
                  <div className={`p-3 rounded-xl bg-${notificationColor}/10 text-${notificationColor} flex-shrink-0`}>
                    <NotificationIcon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className={`text-lg font-bold ${!notification.isRead ? "text-primary-50" : "text-primary-50/70"}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-primary-50 rounded-full"></span>
                          )}
                          {notification.actionRequired && (
                            <span className="px-2 py-1 rounded-full bg-primary-200/10 text-primary-200 text-xs font-semibold border border-primary-200/30">
                              ACTION REQUIRED
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mb-3 ${!notification.isRead ? "text-primary-50/80" : "text-primary-50/60"}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4 flex-wrap text-xs text-primary-50/60">
                          <div className="flex items-center gap-1">
                            <IoTimeOutline className="w-4 h-4" />
                            <span>{formatTimestamp(notification.timestamp)}</span>
                          </div>
                          <span>•</span>
                          <span>{notification.sender}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notification.priority)}`}>
                            {notification.priority.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-primary-50/10 text-primary-50 text-xs font-semibold">
                            {notification.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      {!notification.isRead ? (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="px-4 py-2 bg-primary-300/10 text-primary-300 rounded-lg text-sm font-semibold hover:bg-primary-300/20 transition-colors flex items-center gap-2"
                        >
                          <IoCheckmarkCircleOutline className="w-4 h-4" />
                          Mark as Read
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkAsUnread(notification.id)}
                          className="px-4 py-2 bg-primary-50/10 text-primary-50 rounded-lg text-sm font-semibold hover:bg-primary-50/20 transition-colors flex items-center gap-2"
                        >
                          <IoMailOutline className="w-4 h-4" />
                          Mark as Unread
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="px-4 py-2 bg-primary-200/10 text-primary-200 rounded-lg text-sm font-semibold hover:bg-primary-200/20 transition-colors flex items-center gap-2"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
            <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
              <IoNotificationsOutline className="w-12 h-12 text-primary-50/30" />
            </div>
            <h3 className="text-xl font-bold text-primary-50 mb-2">No Notifications Found</h3>
            <p className="text-sm text-primary-50/60">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrincipalNotifications;
