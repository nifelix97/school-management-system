import React, { useEffect, useState } from "react";
import {
    IoAddOutline,
    IoEllipsisVertical,
    IoPeopleOutline,
    IoRocketOutline,
    IoSearchOutline,
    IoShapesOutline,
    IoStatsChartOutline,
    // IoTimeOutline,
    IoTrashOutline,
    IoTrophyOutline
} from "react-icons/io5";

interface Association {
    id: string;
    name: string;
    category: "Academic" | "Sports" | "Culture" | "Technology" | "Social";
    members: number;
    president: string;
    status: "Active" | "Probation" | "Awaiting Renewal" | "Inactive";
    founded: string;
}

const ClubsAndAssociations: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const stats = [
        { label: "Registered Clubs", value: "48", trend: "+4 this sem", icon: <IoShapesOutline />, color: "text-primary-50", bg: "bg-primary-50/10" },
        { label: "Active Members", value: "2,400+", trend: "65% of students", icon: <IoPeopleOutline />, color: "text-primary-100", bg: "bg-primary-100/10" },
        { label: "Outstanding Awards", value: "15", trend: "Annual Gala", icon: <IoTrophyOutline />, color: "text-primary-300", bg: "bg-primary-300/10" },
        { label: "Engagement Rate", value: "78%", trend: "High", icon: <IoRocketOutline />, color: "text-primary-200", bg: "bg-primary-200/10" },
    ];

    const associations: Association[] = [
        { id: "CLB-001", name: "CS Innovation Hub", category: "Technology", members: 150, president: "Uwase Alice", status: "Active", founded: "2020" },
        { id: "CLB-002", name: "Debate Society", category: "Academic", members: 85, president: "Mugisha John", status: "Active", founded: "2018" },
        { id: "CLB-003", name: "Traditional Dance Troupe", category: "Culture", members: 120, president: "Kato Eric", status: "Active", founded: "2015" },
        { id: "CLB-004", name: "Eco Warriors", category: "Social", members: 210, president: "Inza Bella", status: "Probation", founded: "2021" },
        { id: "CLB-005", name: "University Basketball Club", category: "Sports", members: 45, president: "Shema Jean", status: "Active", founded: "2012" },
        { id: "CLB-006", name: "Photography Club", category: "Culture", members: 30, president: "Kirenga Paul", status: "Awaiting Renewal", founded: "2022" },
        { id: "CLB-007", name: "AI Research Group", category: "Technology", members: 60, president: "Habimana Sam", status: "Active", founded: "2023" },
        { id: "CLB-008", name: "Model United Nations", category: "Academic", members: 110, president: "Ishimwe Diane", status: "Active", founded: "2019" },
    ];

    const filteredClubs = associations.filter(a => 
        (activeCategory === "All" || a.category === activeCategory) &&
        (a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.president.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeCategory]);

    const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedClubs = filteredClubs.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
                        <IoShapesOutline className="text-primary-100" />
                        Associations & Clubs Registry
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Fostering vibrant student life through diverse non-academic engagement.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all active:scale-95">
                        <IoStatsChartOutline className="text-base text-primary-100" />
                        Engagement Report
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95">
                        <IoAddOutline className="text-base" />
                        Register New Club
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

            {/* Management Portal */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                {/* Search and Category Filter Toolbar */}
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 bg-primary-50/[0.01]">
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input 
                            type="text" 
                            placeholder="Search by club name or president..." 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {["All", "Academic", "Sports", "Culture", "Technology", "Social"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    activeCategory === cat ? "bg-primary-100 text-white shadow-lg shadow-primary-100/20" : "bg-gray-50 text-gray-400 hover:text-primary-50"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Club ID / Name</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">President</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Member Count</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedClubs.map((club) => (
                                <tr key={club.id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-primary-100/5 rounded-2xl flex items-center justify-center text-primary-100 font-black text-xs border border-primary-100/5 group-hover:scale-105 transition-transform">
                                                {club.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-primary-50 group-hover:text-primary-100 transition-colors uppercase tracking-tight">{club.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase italic tracking-wider">{club.id} • Founded {club.founded}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-black text-primary-300 uppercase tracking-widest">{club.category}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{club.president}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-primary-100 rounded-full"
                                                    style={{ width: `${Math.min((club.members / 250) * 100, 100)}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-black text-primary-50">{club.members}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                                            club.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            club.status === 'Probation' ? 'bg-orange-100 text-orange-700' :
                                            club.status === 'Inactive' ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {club.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-white text-gray-400 hover:text-primary-50 rounded-xl shadow-sm border border-gray-100 hover:border-primary-50 transition-all">
                                                <IoSearchOutline />
                                            </button>
                                            <button className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm border border-gray-100 hover:border-red-500 transition-all">
                                                <IoTrashOutline />
                                            </button>
                                            <button className="p-3 bg-white text-gray-400 hover:text-primary-100 rounded-xl shadow-sm border border-gray-100 hover:border-primary-100 transition-all">
                                                <IoEllipsisVertical />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                        Displaying {Math.min(startIndex + 1, filteredClubs.length)} - {Math.min(startIndex + itemsPerPage, filteredClubs.length)} of {filteredClubs.length} Active Organizations
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

            {/* Quick Actions / Featured Clubs Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { title: "Club Sponsorships", desc: "Apply for guild funding and event grants.", icon: <IoRocketOutline />, color: "bg-primary-100" },
                    { title: "Member Directory", desc: "Access the unified student engagement database.", icon: <IoPeopleOutline />, color: "bg-primary-50" },
                    { title: "Upcoming Galas", desc: "Monitor social event calendars and deadlines.", icon: <IoTimeOutline />, color: "bg-primary-300" },
                ].map((action, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-start gap-6 hover:shadow-xl transition-all group">
                        <div className={`shrink-0 w-16 h-16 ${action.color} text-white rounded-[1.5rem] flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:scale-110`}>
                            {action.icon}
                        </div>
                        <div className="space-y-2 flex-1">
                            <h3 className="text-lg font-black text-primary-50">{action.title}</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{action.desc}</p>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default ClubsAndAssociations;
