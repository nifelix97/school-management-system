import React, { useEffect, useState } from "react";
import {
    IoAddOutline,
    IoArrowDownOutline,
    IoArrowUpOutline,
    IoCardOutline,
    IoCashOutline,
    IoDownloadOutline,
    IoEllipsisVertical,
    IoPieChartOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoWalletOutline
} from "react-icons/io5";

interface Transaction {
    id: string;
    description: string;
    category: "Welfare" | "Academic" | "Social" | "Sports" | "Administrative";
    amount: number;
    type: "Income" | "Expense";
    status: "Approved" | "Pending" | "Denied";
    date: string;
}

const GuildBudgetAndFunds: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const stats = [
        { label: "Total Treasury", value: "FRW 12.5M", trend: "+15%", icon: <IoWalletOutline />, color: "text-primary-50", bg: "bg-primary-50/10" },
        { label: "Quarterly Allocation", value: "FRW 4.8M", trend: "Q4", icon: <IoCashOutline />, color: "text-primary-100", bg: "bg-primary-100/10" },
        { label: "Emergency Reserve", value: "FRW 1.2M", trend: "Safe", icon: <IoCardOutline />, color: "text-primary-300", bg: "bg-primary-300/10" },
        { label: "Burn Rate", value: "12% / Mo", trend: "Stable", icon: <IoStatsChartOutline />, color: "text-primary-200", bg: "bg-primary-200/10" },
    ];

    const categories = [
        { name: "Student Welfare", allocated: 2500000, spent: 1800000, color: "bg-primary-100" },
        { name: "Academic Liaison", allocated: 1500000, spent: 400000, color: "bg-primary-50" },
        { name: "Sports & Culture", allocated: 3000000, spent: 2800000, color: "bg-primary-200" },
        { name: "Social Events", allocated: 2000000, spent: 1200000, color: "bg-primary-300" },
    ];

    const transactions: Transaction[] = [
        { id: "TRX-401", description: "Inter-campus Sports Gala Funding", category: "Sports", amount: 800000, type: "Expense", status: "Approved", date: "2024-03-10" },
        { id: "TRX-402", description: "Emergency Medical Subsidy - STU-09", category: "Welfare", amount: 150000, type: "Expense", status: "Approved", date: "2024-03-12" },
        { id: "TRX-403", description: "Quarterly Guild Grant Disbursement", category: "Administrative", amount: 4800000, type: "Income", status: "Approved", date: "2024-03-01" },
        { id: "TRX-404", description: "Debate Championship Hosting", category: "Academic", amount: 300000, type: "Expense", status: "Pending", date: "2024-03-14" },
        { id: "TRX-405", description: "Freshers Night Decoration", category: "Social", amount: 500000, type: "Expense", status: "Denied", date: "2024-03-08" },
        { id: "TRX-406", description: "Office Stationery Restock", category: "Administrative", amount: 45000, type: "Expense", status: "Approved", date: "2024-03-15" },
        { id: "TRX-407", description: "Bursary Support for Finalists", category: "Welfare", amount: 1200000, type: "Expense", status: "Pending", date: "2024-03-16" },
        { id: "TRX-408", description: "Cultural Week Logistics", category: "Social", amount: 750000, type: "Expense", status: "Approved", date: "2024-03-05" },
    ];

    const filteredTransactions = transactions.filter(t => 
        (activeFilter === "All" || t.status === activeFilter) &&
        (t.description.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeFilter]);

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
                        <IoWalletOutline className="text-primary-100" />
                        Guild Treasury & Budget
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Transparent financial oversight and strategic resource allocation.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all active:scale-95">
                        <IoDownloadOutline className="text-base text-primary-100" />
                        Export Audit CSV
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95">
                        <IoAddOutline className="text-base" />
                        Requisition Fund
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group overflow-hidden relative">
                        <div className="flex items-start justify-between relative z-10">
                            <div className={`${s.bg} ${s.color} p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110`}>
                                <span className="text-2xl">{s.icon}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">
                                <IoArrowUpOutline />
                                {s.trend}
                            </div>
                        </div>
                        <div className="mt-6 relative z-10">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</h3>
                            <p className="text-2xl font-black text-primary-50 tracking-tight">{s.value}</p>
                        </div>
                        <div className={`absolute -right-4 -bottom-4 text-7xl ${s.color} opacity-5 transition-transform group-hover:scale-110`}>
                            {s.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Budget Breakdown */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 space-y-8 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-primary-50 flex items-center gap-3 mb-6">
                            <IoPieChartOutline className="text-primary-100" />
                            Budget Utilization
                        </h2>
                        <div className="space-y-6">
                            {categories.map((cat, idx) => {
                                const percentage = (cat.spent / cat.allocated) * 100;
                                return (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-gray-500">{cat.name}</span>
                                            <span className="text-primary-50">{percentage.toFixed(0)}% Spent</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${cat.color} rounded-full transition-all duration-1000 shadow-sm`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center text-[9px] font-bold text-gray-400">
                                            <span>FRW {(cat.spent / 1000000).toFixed(1)}M</span>
                                            <span>Total: FRW {(cat.allocated / 1000000).toFixed(1)}M</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="pt-6 border-t border-gray-50">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center italic">Financial Year 2024 Audit Clear</p>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all">
                    {/* Toolbar */}
                    <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 bg-primary-50/[0.01]">
                        <div className="flex-1 relative">
                            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input 
                                type="text" 
                                placeholder="Search transaction history..." 
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all text-sm font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                            {["All", "Approved", "Pending", "Denied"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setActiveFilter(status)}
                                    className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                        activeFilter === status ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" : "bg-gray-50 text-gray-400 hover:text-primary-50"
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">ID / Description</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Amount</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {paginatedTransactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50/50 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-transform group-hover:scale-110 ${
                                                    t.type === 'Income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                    {t.type === 'Income' ? <IoArrowDownOutline /> : <IoArrowUpOutline />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-primary-50 group-hover:text-primary-100 transition-colors uppercase tracking-tight">{t.description}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <p className={`text-sm font-black ${t.type === 'Income' ? 'text-green-600' : 'text-primary-50'}`}>
                                                {t.type === 'Income' ? '+' : '-'} FRW {(t.amount / 1000).toLocaleString()}k
                                            </p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t.category}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                                                t.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                t.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                                <IoTimeOutline className="text-sm" />
                                                {t.date}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-3 bg-white text-gray-400 hover:text-primary-50 rounded-xl shadow-sm border border-gray-100 hover:border-primary-50 transition-all opacity-0 group-hover:opacity-100">
                                                <IoEllipsisVertical />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                            Displaying {Math.min(startIndex + 1, filteredTransactions.length)} - {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} Records
                        </p>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-6 py-3 bg-white border border-gray-100 text-primary-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <div className="flex gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${
                                            currentPage === i + 1 
                                                ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" 
                                                : "bg-white text-gray-400 border border-gray-100 hover:text-primary-50"
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="px-6 py-3 bg-white border border-gray-100 text-primary-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuildBudgetAndFunds;
