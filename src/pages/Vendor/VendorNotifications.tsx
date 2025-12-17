import React, { useState } from "react";
import {
    // IoFilterOutline,
    IoCartOutline,
    IoCheckmarkDoneOutline,
    IoCubeOutline,
    IoInformationCircleOutline,
    IoNotificationsOutline,
    IoTrashOutline,
    IoWalletOutline,
} from "react-icons/io5";

interface Notification {
    id: number;
    title: string;
    message: string;
    type: "order" | "finance" | "inventory" | "system";
    date: string;
    read: boolean;
}

const VendorNotifications: React.FC = () => {
    // Mock Data
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: "New Order Received",
            message: "You have received a new order #ORD-7830 from St. Mary's School for 15 Interactive Boards.",
            type: "order",
            date: "2 hours ago",
            read: false
        },
        {
            id: 2,
            title: "Low Stock Alert",
            message: "Stock for 'Student Tablets (Bulk Pack)' has fallen below the threshold level of 5 units.",
            type: "inventory",
            date: "5 hours ago",
            read: false
        },
        {
            id: 3,
            title: "Payment Received",
            message: "Invoice #INV-2023-003 has been paid successfully. Amount: $540.50",
            type: "finance",
            date: "1 day ago",
            read: true
        },
        {
            id: 4,
            title: "System Maintenance",
            message: "The vendor portal will undergo scheduled maintenance on Dec 20th from 2 AM to 4 AM EST.",
            type: "system",
            date: "2 days ago",
            read: true
        },
        {
            id: 5,
            title: "Order Shipped",
            message: "Order #ORD-7827 status has been updated to 'Shipped'.",
            type: "order",
            date: "3 days ago",
            read: true
        }
    ]);

    const [filter, setFilter] = useState<"all" | "unread" | "order" | "finance" | "inventory">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPerPage = 4;

    // Filter Logic
    const filteredNotifications = notifications.filter(notif => {
        if (filter === "all") return true;
        if (filter === "unread") return !notif.read;
        return notif.type === filter;
    });

    // Pagination Logic
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);
    const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Handlers
    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const handleFilterChange = (newFilter: any) => {
        setFilter(newFilter);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    // Helper for icons and colors
    const getTypeStyles = (type: string) => {
        switch (type) {
            case "order": return { icon: <IoCartOutline className="w-6 h-6" />, bg: "bg-blue-100", text: "text-blue-600" };
            case "finance": return { icon: <IoWalletOutline className="w-6 h-6" />, bg: "bg-green-100", text: "text-green-600" };
            case "inventory": return { icon: <IoCubeOutline className="w-6 h-6" />, bg: "bg-amber-100", text: "text-amber-600" };
            case "system": return { icon: <IoInformationCircleOutline className="w-6 h-6" />, bg: "bg-purple-100", text: "text-purple-600" };
            default: return { icon: <IoNotificationsOutline className="w-6 h-6" />, bg: "bg-gray-100", text: "text-gray-600" };
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                                    {unreadCount} New
                                </span>
                            )}
                        </h1>
                        <p className="text-gray-500 mt-1">Stay updated with your orders and account activity</p>
                    </div>
                    <button 
                        onClick={markAllAsRead}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors shadow-sm"
                    >
                        <IoCheckmarkDoneOutline className="w-5 h-5 text-primary-100" /> Mark all as read
                    </button>
                </div>

                {/* Filters */}
                <div className="flex overflow-x-auto pb-2 mb-6 gap-2 no-scrollbar">
                    {["all", "unread", "order", "finance", "inventory"].map((f) => (
                        <button
                            key={f}
                            onClick={() => handleFilterChange(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-all ${
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
                        currentNotifications.map((notification) => {
                            const styles = getTypeStyles(notification.type);
                            return (
                                <div 
                                    key={notification.id} 
                                    className={`relative bg-white rounded-2xl p-5 border transition-all hover:shadow-md ${
                                        notification.read ? "border-gray-100 opacity-90" : "border-primary-100/30 shadow-sm ring-1 ring-primary-100/5"
                                    }`}
                                >
                                    <div className="flex gap-4">
                                        {/* Icon */}
                                        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${styles.bg} ${styles.text}`}>
                                            {styles.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className={`font-bold text-lg truncate pr-8 ${notification.read ? "text-gray-700" : "text-gray-900"}`}>
                                                    {notification.title}
                                                </h3>
                                                <span className="text-xs font-medium text-gray-400 whitespace-nowrap shrink-0">
                                                    {notification.date}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                                {notification.message}
                                            </p>
                                            
                                            {/* Actions */}
                                            <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
                                                {!notification.read && (
                                                    <button 
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-xs font-semibold text-primary-100 hover:text-primary-100/80 flex items-center gap-1 transition-colors"
                                                    >
                                                        <IoCheckmarkDoneOutline /> Mark as read
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-xs font-semibold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors ml-auto"
                                                >
                                                    <IoTrashOutline /> Remove
                                                </button>
                                            </div>
                                        </div>

                                        {/* Unread Indicator Dot */}
                                        {!notification.read && (
                                            <div className="absolute top-5 right-5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <IoNotificationsOutline className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No notifications found</h3>
                            <p className="text-gray-500 mt-1">We'll let you know when something arrives</p>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {filteredNotifications.length > notificationsPerPage && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                currentPage === 1
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                            }`}
                        >
                            Previous
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                                    currentPage === number
                                        ? "bg-primary-100 text-white shadow-md shadow-primary-100/20"
                                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                }`}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                currentPage === totalPages
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VendorNotifications;
