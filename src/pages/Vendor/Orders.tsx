import React, { useState } from "react";
import {
    IoCarOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoEyeOutline,
    IoSearchOutline
} from "react-icons/io5";

// Types
interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    customer: string;
    date: string;
    amount: number;
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    items: OrderItem[];
    paymentMethod: string;
}

const Orders: React.FC = () => {
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Mock Data
    const [orders, setOrders] = useState<Order[]>([
        {
            id: "#ORD-7829",
            customer: "Alice Freeman",
            date: "2023-12-19",
            amount: 145.00,
            status: "Pending",
            paymentMethod: "Credit Card",
            items: [
                { name: "Wireless Mouse", quantity: 2, price: 25.00 },
                { name: "Mechanical Keyboard", quantity: 1, price: 95.00 }
            ]
        },
        {
            id: "#ORD-7828",
            customer: "John Cooper",
            date: "2023-12-18",
            amount: 24.99,
            status: "Delivered",
            paymentMethod: "PayPal",
            items: [
                { name: "USB-C Cable", quantity: 1, price: 24.99 }
            ]
        },
        {
            id: "#ORD-7827",
            customer: "Derrick Rose",
            date: "2023-12-18",
            amount: 540.50,
            status: "Shipped",
            paymentMethod: "Credit Card",
            items: [
                { name: "27-inch Monitor", quantity: 2, price: 270.25 }
            ]
        },
        {
            id: "#ORD-7826",
            customer: "Sarah Smith",
            date: "2023-12-17",
            amount: 89.99,
            status: "Delivered",
            paymentMethod: "Credit Card",
            items: [
                { name: "Webcam HD", quantity: 1, price: 89.99 }
            ]
        },
        {
            id: "#ORD-7825",
            customer: "Mike Ross",
            date: "2023-12-16",
            amount: 12.00,
            status: "Cancelled",
            paymentMethod: "Debit Card",
            items: [
                { name: "Screen Cleaning Kit", quantity: 1, price: 12.00 }
            ]
        },
        {
            id: "#ORD-7824",
            customer: "Rachel Zane",
            date: "2023-12-16",
            amount: 1200.00,
            status: "Processing",
            paymentMethod: "Bank Transfer",
            items: [
                { name: "Office Chair", quantity: 4, price: 300.00 }
            ]
        }
    ]);

    const statuses = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === "All" || order.status === filterStatus;
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              order.customer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered": return "bg-green-100 text-green-700";
            case "Shipped": return "bg-blue-100 text-blue-700";
            case "Processing": return "bg-purple-100 text-purple-700";
            case "Pending": return "bg-amber-100 text-amber-700";
            case "Cancelled": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const handleUpdateStatus = (id: string, newStatus: Order['status']) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        setSelectedOrder(prev => prev && prev.id === id ? { ...prev, status: newStatus } : prev);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Orders Management</h1>
                <p className="text-gray-500 mt-1">Track and manage customer orders</p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by Order ID or Customer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all"
                    />
                </div>

                {/* Filters */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                filterStatus === status
                                    ? "bg-primary-100 text-white shadow-md shadow-primary-100/20"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-100">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {order.customer}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            ${order.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.paymentMethod}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button 
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-gray-400 hover:text-primary-100 transition-colors p-2 hover:bg-primary-50/10 rounded-lg"
                                            >
                                                <IoEyeOutline className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <IoSearchOutline className="w-12 h-12 text-gray-300 mb-2" />
                                            <p className="text-lg font-medium">No orders found</p>
                                            <p className="text-sm">Try adjusting your search or filters</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{selectedOrder.id}</h2>
                                <p className="text-sm text-gray-500">Placed on {selectedOrder.date}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <IoCloseCircleOutline className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto">
                            {/* Status Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-500">Current Status:</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedOrder.status)}`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-500">Update:</span>
                                    <div className="flex gap-1">
                                        {selectedOrder.status !== "Cancelled" && selectedOrder.status !== "Delivered" && (
                                            <>
                                                {selectedOrder.status === "Pending" && (
                                                     <button 
                                                        onClick={() => handleUpdateStatus(selectedOrder.id, "Processing")}
                                                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold hover:bg-purple-200 transition-colors"
                                                    >
                                                        Process
                                                    </button>
                                                )}
                                                {(selectedOrder.status === "Pending" || selectedOrder.status === "Processing") && (
                                                     <button 
                                                        onClick={() => handleUpdateStatus(selectedOrder.id, "Shipped")}
                                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200 transition-colors flex items-center gap-1"
                                                    >
                                                        <IoCarOutline /> Ship
                                                    </button>
                                                )}
                                                {selectedOrder.status === "Shipped" && (
                                                     <button 
                                                        onClick={() => handleUpdateStatus(selectedOrder.id, "Delivered")}
                                                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200 transition-colors flex items-center gap-1"
                                                    >
                                                        <IoCheckmarkCircleOutline /> Complete
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleUpdateStatus(selectedOrder.id, "Cancelled")}
                                                    className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors border border-red-100"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Customer & Payment Info */}
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Customer Details</h3>
                                    <p className="text-gray-900 font-medium">{selectedOrder.customer}</p>
                                    <p className="text-gray-500 text-sm">customer@example.com</p>
                                    <p className="text-gray-500 text-sm">+1 (555) 000-0000</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Payment Info</h3>
                                    <p className="text-gray-900 font-medium">{selectedOrder.paymentMethod}</p>
                                    <p className="text-gray-500 text-sm">Transaction ID: #TXN-998822</p>
                                </div>
                            </div>

                            {/* Items */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Order Items</h3>
                                <div className="border border-gray-100 rounded-xl overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-xs font-semibold text-gray-500">Product</th>
                                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-center">Qty</th>
                                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-right">Price</th>
                                                <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {selectedOrder.items.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600 text-right">${item.price.toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                            <tr className="bg-gray-50/50">
                                                <td colSpan={3} className="px-4 py-3 text-right text-sm font-bold text-gray-900">Total Amount</td>
                                                <td className="px-4 py-3 text-right text-base font-bold text-primary-100">${selectedOrder.amount.toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                                <span className="flex items-center gap-2"><IoCloseCircleOutline /> Close</span>
                            </button>
                            <button className="px-4 py-2 bg-primary-100 text-white rounded-xl text-sm font-medium hover:bg-primary-50 transition-colors shadow-md">
                                Download Invoice
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
