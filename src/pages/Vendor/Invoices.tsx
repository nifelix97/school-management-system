import React, { useState } from "react";
import {
    IoAlertCircle,
    IoCalendarOutline,
    IoCheckmarkCircle,
    IoCloudDownloadOutline,
    IoDocumentTextOutline,
    IoEyeOutline,
    IoSearchOutline,
    IoTime,
    IoWallet
} from "react-icons/io5";

const VendorInvoices: React.FC = () => {
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Mock Data
    const invoices = [
        {
            id: "INV-2023-001",
            orderId: "#ORD-7829",
            customer: "Alice Freeman",
            date: "2023-12-19",
            dueDate: "2024-01-19",
            amount: 145.00,
            status: "Pending",
        },
        {
            id: "INV-2023-002",
            orderId: "#ORD-7828",
            customer: "John Cooper",
            date: "2023-12-18",
            dueDate: "2024-01-18",
            amount: 24.99,
            status: "Paid",
        },
        {
            id: "INV-2023-003",
            orderId: "#ORD-7827",
            customer: "Derrick Rose",
            date: "2023-12-18",
            dueDate: "2024-01-18",
            amount: 540.50,
            status: "Paid",
        },
        {
            id: "INV-2023-004",
            orderId: "#ORD-7824",
            customer: "Rachel Zane",
            date: "2023-11-20",
            dueDate: "2023-12-20",
            amount: 1200.00,
            status: "Overdue",
        },
        {
            id: "INV-2023-005",
            orderId: "#ORD-7826",
            customer: "Sarah Smith",
            date: "2023-12-17",
            dueDate: "2024-01-17",
            amount: 89.99,
            status: "Pending",
        }
    ];

    const stats = {
        totalInvoiced: invoices.reduce((acc, inv) => acc + inv.amount, 0),
        received: invoices.filter(i => i.status === "Paid").reduce((acc, inv) => acc + inv.amount, 0),
        pending: invoices.filter(i => i.status === "Pending").reduce((acc, inv) => acc + inv.amount, 0),
        overdue: invoices.filter(i => i.status === "Overdue").reduce((acc, inv) => acc + inv.amount, 0),
    };

    const statuses = ["All", "Paid", "Pending", "Overdue"];

    const filteredInvoices = invoices.filter(inv => {
        const matchesStatus = filterStatus === "All" || inv.status === filterStatus;
        const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              inv.customer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Paid": return "bg-green-100 text-green-700";
            case "Pending": return "bg-amber-100 text-amber-700";
            case "Overdue": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Paid": return <IoCheckmarkCircle className="w-4 h-4" />;
            case "Pending": return <IoTime className="w-4 h-4" />;
            case "Overdue": return <IoAlertCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const handleGenerateReport = () => {
        // Define CSV headers
        const headers = ["Invoice ID", "Order Ref", "Customer", "Date Issued", "Due Date", "Amount", "Status"];
        
        // Map data to rows
        const rows = filteredInvoices.map(inv => [
            inv.id,
            inv.orderId,
            inv.customer,
            inv.date,
            inv.dueDate,
            inv.amount.toFixed(2),
            inv.status
        ]);

        // Combine headers and rows
        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        // Create blob and download link
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        
        link.setAttribute("href", url);
        link.setAttribute("download", `Invoices_Report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = "hidden";
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Invoices</h1>
                    <p className="text-gray-500 mt-1">Manage and track your financial records</p>
                </div>
                <button 
                    onClick={handleGenerateReport}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors shadow-md"
                >
                    <IoDocumentTextOutline className="w-5 h-5" /> Generate Report
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <IoWallet className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Total Invoiced</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">${stats.totalInvoiced.toFixed(2)}</div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <IoCheckmarkCircle className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Paid Amount</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">${stats.received.toFixed(2)}</div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <IoTime className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Pending</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">${stats.pending.toFixed(2)}</div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <IoAlertCircle className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Overdue</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">${stats.overdue.toFixed(2)}</div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search Invoice ID or Customer..."
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

            {/* Invoices Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Ref</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Issued</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredInvoices.length > 0 ? (
                                filteredInvoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-100">
                                            {inv.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {inv.customer}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {inv.orderId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {inv.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <IoCalendarOutline className="text-gray-400" />
                                                {inv.dueDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            ${inv.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(inv.status)}`}>
                                                {getStatusIcon(inv.status)}
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-gray-400 hover:text-primary-100 hover:bg-primary-50/10 rounded-lg transition-colors" title="View Details">
                                                    <IoEyeOutline className="w-5 h-5" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Download PDF">
                                                    <IoCloudDownloadOutline className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <IoDocumentTextOutline className="w-12 h-12 text-gray-300 mb-2" />
                                            <p className="text-lg font-medium">No invoices found</p>
                                            <p className="text-sm">Try adjusting your search or filters</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VendorInvoices;
