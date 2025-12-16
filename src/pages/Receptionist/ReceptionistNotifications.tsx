import React, { useState } from "react";
import {
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkDoneOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCubeOutline,
    IoFilterOutline,
    IoInformationCircleOutline,
    IoNotificationsOutline,
    IoPersonOutline,
    IoTrashOutline
} from "react-icons/io5";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  category: "Visitor" | "Package" | "Appointment" | "System";
  timestamp: string;
  read: boolean;
}

const ReceptionistNotifications: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "unread" | "high_priority">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mock Data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Visitor Check-in",
      message: "John Doe has checked in to see Dr. Smith.",
      type: "info",
      category: "Visitor",
      timestamp: "10 mins ago",
      read: false,
    },
    {
      id: "2",
      title: "Package Delivered",
      message: "A package from Amazon has been delivered for the Science Dept.",
      type: "success",
      category: "Package",
      timestamp: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Appointment Cancelled",
      message: "Meeting with Parent (Mrs. Johnson) has been cancelled.",
      type: "warning",
      category: "Appointment",
      timestamp: "2 hours ago",
      read: true,
    },
    {
      id: "4",
      title: "System Update",
      message: "The visitor management system will be down for maintenance at 10 PM.",
      type: "error",
      category: "System",
      timestamp: "Yesterday",
      read: true,
    },
    {
      id: "5",
      title: "Urgent: Parent Waiting",
      message: "Mr. Brown has been waiting for 20 minutes.",
      type: "warning",
      category: "Visitor",
      timestamp: "Yesterday",
      read: true,
    },
    {
      id: "6",
      title: "Mail Collection",
      message: "Mail pile needs sorting before 3 PM.",
      type: "info",
      category: "Package",
      timestamp: "2 days ago",
      read: true,
    },
    {
      id: "7",
      title: "New Inquiry",
      message: "New admission inquiry from website.",
      type: "info",
      category: "System",
      timestamp: "3 days ago",
      read: true,
    },
  ]);

  const getIcon = (category: string) => {
    switch (category) {
      case "Visitor": return <IoPersonOutline />;
      case "Package": return <IoCubeOutline />;
      case "Appointment": return <IoCalendarOutline />;
      case "System": return <IoInformationCircleOutline />;
      default: return <IoNotificationsOutline />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info": return "bg-blue-100 text-blue-600";
      case "success": return "bg-green-100 text-green-600";
      case "warning": return "bg-amber-100 text-amber-600";
      case "error": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Filter Logic
  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter === "high_priority") return n.type === "warning" || n.type === "error";
    return true;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const currentNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Notifications</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Stay updated with alerts and activities
            </p>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium shadow-sm hover:bg-gray-50 transition-colors"
          >
            <IoCheckmarkDoneOutline className="w-5 h-5" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 min-w-max">
            <IoFilterOutline className="w-4 h-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          {[
            { id: "all", label: "All" },
            { id: "unread", label: "Unread" },
            { id: "high_priority", label: "High Priority" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => { setFilter(f.id as any); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filter === f.id
                  ? "bg-primary-50 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {currentNotifications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <IoNotificationsOutline className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No notifications found</h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          currentNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`group relative bg-white p-5 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md ${
                !notification.read ? "border-l-4 border-l-primary-50 border-gray-100 bg-blue-50/10" : "border-gray-100"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${getTypeColor(notification.type)}`}>
                  <div className="w-6 h-6">{getIcon(notification.category)}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`text-base font-semibold ${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{notification.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                      {notification.category}
                    </span>
                    {!notification.read && (
                       <span className="flex items-center gap-1 text-xs font-bold text-primary-50">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-50 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-50"></span>
                          </span>
                          New
                       </span>
                    )}
                  </div>
                </div>
              </div>

               {/* Actions */}
               <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity sm:flex-row sm:static sm:opacity-100 sm:mt-0 sm:ml-auto">
                   {/* Mobile View: Actions are hidden by default and shown on hover/tap */}
               </div>
               
               <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end gap-3 opacity-100 sm:opacity-0 sm:items-center sm:absolute sm:right-5 sm:top-1/2 sm:-translate-y-1/2 sm:flex sm:mt-0 sm:pt-0 sm:border-t-0 sm:group-hover:opacity-100 transition-opacity bg-white sm:bg-transparent pl-4">
                  {!notification.read && (
                    <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-sm text-primary-50 font-medium hover:text-primary-100 flex items-center gap-1 bg-primary-50/5 px-3 py-1.5 rounded-lg transition-colors"
                        title="Mark as read"
                    >
                        <IoCheckmarkCircleOutline className="w-4 h-4" />
                        <span className="sm:hidden">Mark Read</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <IoTrashOutline className="w-5 h-5" />
                  </button>
               </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-4xl mx-auto mt-8 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <IoChevronBackOutline className="w-5 h-5" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                currentPage === page
                  ? "bg-primary-50 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <IoChevronForwardOutline className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReceptionistNotifications;
