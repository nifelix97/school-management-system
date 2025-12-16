import React, { useState } from "react";
import {
    IoAddCircleOutline,
    IoCheckmarkCircleOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoStatsChartOutline,
    IoTimerOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWalletOutline,
    IoWarningOutline
} from "react-icons/io5";

type TransactionStatus = "Completed" | "Pending" | "Failed";
type TransactionType = "Income" | "Expense";

interface Transaction {
    id: string;
    description: string;
    category: string;
    amount: number;
    date: string;
    type: TransactionType;
    status: TransactionStatus;
}

const Financials: React.FC = () => {
    // Mock Data
    const [transactions] = useState<Transaction[]>([
        { id: "TXN-001", description: "Tuition Fees - Grade 10", category: "Tuition", amount: 45000, date: "2024-03-15", type: "Income", status: "Completed" },
        { id: "TXN-002", description: "Laboratory Equipment", category: "Infrastructure", amount: 12500, date: "2024-03-14", type: "Expense", status: "Completed" },
        { id: "TXN-003", description: "Library Books Purchase", category: "Resources", amount: 3200, date: "2024-03-12", type: "Expense", status: "Pending" },
        { id: "TXN-004", description: "Cafeteria Revenue", category: "Services", amount: 8500, date: "2024-03-10", type: "Income", status: "Completed" },
        { id: "TXN-005", description: "Staff Salary Processing", category: "Payroll", amount: 150000, date: "2024-03-01", type: "Expense", status: "Completed" },
    ]);

    const budgets = [
        { department: "Science Dept", allocated: 50000, spent: 35000, color: "bg-blue-500" },
        { department: "Sports Complex", allocated: 30000, spent: 12000, color: "bg-emerald-500" },
        { department: "IT Infrastructure", allocated: 80000, spent: 75000, color: "bg-purple-500" },
        { department: "Library", allocated: 15000, spent: 5000, color: "bg-amber-500" },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 sm:p-6 lg:p-8 font-sans text-gray-800">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-50 to-primary-100 mb-2">
                        Financial Overview
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Monitor revenue, expenses, and budget allocation.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white text-primary-600 font-bold rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <IoDownloadOutline className="w-5 h-5" />
                        <span className="hidden sm:inline">Export Report</span>
                    </button>
                    <button className="px-5 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2">
                        <IoAddCircleOutline className="w-5 h-5" />
                        <span>Record Expense</span>
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Total Revenue", value: 854000, icon: <IoWalletOutline />, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", trend: "+8.5%" },
                    { label: "Total Expenses", value: 320000, icon: <IoTrendingDownOutline />, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", trend: "-2.1%" },
                    { label: "Net Profit", value: 534000, icon: <IoStatsChartOutline />, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", trend: "+12.4%" },
                    { label: "Outstanding Fees", value: 45000, icon: <IoTimerOutline />, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", trend: "Due > 30 Days" }
                ].map((stat, index) => (
                    <div key={index} className={`bg-white p-5 rounded-2xl shadow-sm border ${stat.border} hover:shadow-md transition-all duration-300 group`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                {React.cloneElement(stat.icon, { className: "w-6 h-6" })}
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.color.replace('text-', 'bg-').replace('600', '50')} ${stat.color}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-900 mb-1">{formatCurrency(stat.value)}</div>
                            <div className="text-sm text-gray-500 font-semibold">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Transaction History */}
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-100/50 flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <IoDocumentTextOutline className="text-primary-500" />
                            Recent Transactions
                        </h2>
                        <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                    <th className="p-6">Description</th>
                                    <th className="p-6">Date</th>
                                    <th className="p-6">Amount</th>
                                    <th className="p-6 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="p-6">
                                            <div className="font-bold text-gray-900">{txn.description}</div>
                                            <div className="text-xs text-gray-500">{txn.category}</div>
                                        </td>
                                        <td className="p-6 text-sm text-gray-500">{txn.date}</td>
                                        <td className={`p-6 font-bold ${txn.type === 'Income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                                            {txn.type === 'Income' ? '+' : '-'}{formatCurrency(txn.amount)}
                                        </td>
                                        <td className="p-6 text-right">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                                txn.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                                txn.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                                                'bg-red-50 text-red-700 border-red-100'
                                            }`}>
                                                {txn.status === 'Completed' ? <IoCheckmarkCircleOutline className="w-3.5 h-3.5" /> :
                                                 txn.status === 'Pending' ? <IoTimerOutline className="w-3.5 h-3.5" /> : 
                                                 <IoWarningOutline className="w-3.5 h-3.5" />}
                                                {txn.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Budget Overview */}
                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-100/50 h-fit">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                             <IoTrendingUpOutline className="text-primary-500" />
                            Budget Utilization
                        </h2>
                    </div>
                    <div className="p-6 space-y-6">
                        {budgets.map((budget, index) => {
                            const percentage = Math.min((budget.spent / budget.allocated) * 100, 100);
                            return (
                                <div key={index}>
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">{budget.department}</div>
                                            <div className="text-xs text-gray-500 font-medium">
                                                {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
                                            </div>
                                        </div>
                                        <div className="text-xs font-bold text-gray-500">{percentage.toFixed(0)}%</div>
                                    </div>
                                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${percentage > 90 ? 'bg-red-500' : budget.color}`} 
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                        <button className="w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                            Manage Budgets
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Financials;
