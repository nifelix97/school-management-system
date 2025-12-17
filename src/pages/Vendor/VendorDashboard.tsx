import React from "react";
import {
    IoAlertCircleOutline,
    IoArrowForward,
    IoCartOutline,
    IoCashOutline,
    IoCheckmarkCircleOutline,
    IoCubeOutline,
    IoTimeOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

const VendorDashboard: React.FC = () => {
    // Mock Data
    const stats = [
        {
            title: "Total Revenue",
            value: "$12,450",
            change: "+15%",
            isPositive: true,
            icon: <IoCashOutline className="w-6 h-6 text-green-600" />,
            bg: "bg-green-50",
            color: "text-green-600"
        },
        {
            title: "Active Orders",
            value: "24",
            change: "+5",
            isPositive: true,
            icon: <IoCartOutline className="w-6 h-6 text-blue-600" />,
            bg: "bg-blue-50",
            color: "text-blue-600"
        },
        {
            title: "Total Products",
            value: "156",
            change: "+12",
            isPositive: true,
            icon: <IoCubeOutline className="w-6 h-6 text-purple-600" />,
            bg: "bg-purple-50",
            color: "text-purple-600"
        },
        {
            title: "Avg. Rating",
            value: "4.8",
            change: "+0.2",
            isPositive: true,
            icon: <IoTrendingUpOutline className="w-6 h-6 text-amber-600" />,
            bg: "bg-amber-50",
            color: "text-amber-600"
        }
    ];

    const recentOrders = [
        { id: "#ORD-7829", customer: "Alice Freeman", items: 3, total: "$145.00", status: "Pending", time: "10 mins ago" },
        { id: "#ORD-7828", customer: "John Cooper", items: 1, total: "$24.99", status: "Completed", time: "2 hours ago" },
        { id: "#ORD-7827", customer: "Derrick Rose", items: 5, total: "$540.50", status: "Shipped", time: "5 hours ago" },
        { id: "#ORD-7826", customer: "Sarah Smith", items: 2, total: "$89.99", status: "Completed", time: "1 day ago" },
        { id: "#ORD-7825", customer: "Mike Ross", items: 1, total: "$12.00", status: "Cancelled", time: "1 day ago" },
    ];

    const lowStockItems = [
        { name: "Wireless Headphones", stock: 2, threshold: 5 },
        { name: "USB-C Adapter", stock: 4, threshold: 10 },
        { name: "Laptop Stand", stock: 1, threshold: 5 },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed": return "bg-green-100 text-green-700";
            case "Pending": return "bg-amber-100 text-amber-700";
            case "Shipped": return "bg-blue-100 text-blue-700";
            case "Cancelled": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back, TechSolutions Inc.</p>
                </div>
                <button className="px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 transition-colors shadow-md text-sm font-medium">
                    + Add New Product
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                {stat.icon}
                            </div>
                            <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                        <button className="text-primary-100 text-sm font-medium hover:underline flex items-center gap-1">
                            View All <IoArrowForward />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-100">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {order.customer}
                                            <span className="text-gray-400 text-xs ml-1">({order.items} items)</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            {order.total}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <IoTimeOutline /> {order.time}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Side Widgets */}
                <div className="space-y-8">
                    {/* Low Stock Alert */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <IoAlertCircleOutline className="w-5 h-5 text-red-500" />
                            <h3 className="font-bold text-gray-900">Low Stock Alert</h3>
                        </div>
                        <div className="space-y-4">
                            {lowStockItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-red-50/50 rounded-xl border border-red-100">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                        <p className="text-xs text-red-600 font-medium">Only {item.stock} left</p>
                                    </div>
                                    <button className="text-xs bg-white border border-red-200 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium">
                                        Restock
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats/Completion */}
                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold">Profile Completion</h3>
                                <p className="text-primary-50/90 text-sm">Complete your vendor profile to reach more customers.</p>
                            </div>
                            <div className="p-2 bg-white/20 rounded-lg">
                                <IoCheckmarkCircleOutline className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-100 bg-white">
                                        80%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-black/20">
                                <div style={{ width: "80%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
                            </div>
                        </div>
                        <button className="w-full py-2.5 bg-white text-primary-100 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-md">
                            Complete Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
