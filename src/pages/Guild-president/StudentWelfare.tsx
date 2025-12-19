import React, { useState } from "react";
import {
    IoAddOutline,
    // IoCallOutline,
    IoCheckmarkCircleOutline,
    IoClipboardOutline,
    IoEllipsisVertical,
    IoHeartOutline,
    // IoLocationOutline,
    IoMailOutline,
    IoMedicalOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline,
    IoTrendingUpOutline,
    IoWarningOutline
} from "react-icons/io5";

interface WelfareCase {
    id: string;
    studentName: string;
    studentId: string;
    category: "Medical" | "Financial" | "Accommodation" | "Social";
    urgency: "High" | "Medium" | "Low";
    status: "Pending" | "Active" | "Resolved" | "Escalated";
    dateSubmitted: string;
    description: string;
}

const StudentWelfare: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const stats = [
        { label: "Active Support Cases", value: "142", trend: "+12%", icon: <IoHeartOutline />, color: "text-primary-50", bg: "bg-primary-50/10" },
        { label: "Emergency Funds Disbursed", value: "FRW 4.2M", trend: "Q4", icon: <IoShieldCheckmarkOutline />, color: "text-primary-100", bg: "bg-primary-100/10" },
        { label: "Resolved This Month", value: "89", trend: "94%", icon: <IoCheckmarkCircleOutline />, color: "text-primary-300", bg: "bg-primary-300/10" },
        { label: "Pending Health Alerts", value: "5", trend: "-20%", icon: <IoWarningOutline />, color: "text-primary-200", bg: "bg-primary-200/10" },
    ];

    const welfareCases: WelfareCase[] = [
        { id: "WLF-001", studentName: "Mugisha Kevin", studentId: "STU-2023-01", category: "Medical", urgency: "High", status: "Active", dateSubmitted: "2024-03-15", description: "Severe malaria case requiring hospitalization support." },
        { id: "WLF-002", studentName: "Umuhoza Alice", studentId: "STU-2023-22", category: "Financial", urgency: "Medium", status: "Pending", dateSubmitted: "2024-03-16", description: "Tuition balance emergency request." },
        { id: "WLF-003", studentName: "Kato Ivan", studentId: "STU-2023-45", category: "Accommodation", urgency: "Low", status: "Resolved", dateSubmitted: "2024-03-10", description: "Hostel transfer due to accessibility needs." },
        { id: "WLF-004", studentName: "Irakoze Bella", studentId: "STU-2023-89", category: "Social", urgency: "Medium", status: "Escalated", dateSubmitted: "2024-03-14", description: "Mentorship program placement request." },
    ];

    const filteredCases = welfareCases.filter(c => 
        (activeCategory === "All" || c.category === activeCategory) &&
        (c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
                        <IoHeartOutline className="text-primary-100" />
                        Student Welfare Hub
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Advocating for student health, financial stability, and living standards.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all">
                        <IoMedicalOutline className="text-base text-primary-100" />
                        Health Directory
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95">
                        <IoAddOutline className="text-base" />
                        New Assistance Case
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group overflow-hidden relative">
                        <div className="flex items-start justify-between relative z-10">
                            <div className={`${s.bg} ${s.color} p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110`}>
                                <span className="text-2xl">{s.icon}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">
                                <IoTrendingUpOutline />
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

            {/* Main Content Area */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                {/* Search and Category Filter Toolbar */}
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 bg-primary-50/[0.02]">
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input 
                            type="text" 
                            placeholder="Find students or case tracks..." 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {["All", "Medical", "Financial", "Accommodation", "Social"].map((cat) => (
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
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Case ID / Student</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Urgency</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tracking Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Timeline</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredCases.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-primary-50/5 rounded-2xl flex items-center justify-center text-primary-50 font-black text-xs border border-primary-50/5 group-hover:scale-105 transition-transform">
                                                {c.studentName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-primary-50 group-hover:text-primary-100 transition-colors uppercase tracking-tight">{c.studentName}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">{c.id} • {c.studentId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${
                                                c.category === 'Medical' ? 'bg-red-400' :
                                                c.category === 'Financial' ? 'bg-green-400' :
                                                c.category === 'Accommodation' ? 'bg-blue-400' : 'bg-purple-400'
                                            } animate-pulse`} />
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{c.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                                            c.urgency === 'High' ? 'text-red-600 bg-red-50 border border-red-100' :
                                            c.urgency === 'Medium' ? 'text-orange-600 bg-orange-50 border border-orange-100' :
                                            'text-blue-600 bg-blue-50 border border-blue-100'
                                        }`}>
                                            {c.urgency}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                                                c.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                                c.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                                                c.status === 'Escalated' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-500'
                                            }`}>
                                                {c.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                            <IoTimeOutline className="text-sm" />
                                            {c.dateSubmitted}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-white text-gray-400 hover:text-primary-50 rounded-xl shadow-sm border border-gray-100 hover:border-primary-50 transition-all">
                                                <IoClipboardOutline />
                                            </button>
                                            <button className="p-3 bg-white text-gray-400 hover:text-primary-100 rounded-xl shadow-sm border border-gray-100 hover:border-primary-100 transition-all">
                                                <IoMailOutline />
                                            </button>
                                            <button className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm border border-gray-100 hover:border-red-500 transition-all">
                                                <IoEllipsisVertical />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Information Footer */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Displaying 1 - {filteredCases.length} of {welfareCases.length} Registered Cases</p>
                    <div className="flex gap-2">
                        <button className="px-6 py-3 bg-white border border-gray-100 text-primary-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white shadow-sm transition-all active:scale-95 disabled:opacity-50">Previous</button>
                        <button className="px-6 py-3 bg-white border border-gray-100 text-primary-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white shadow-sm transition-all active:scale-95 disabled:opacity-50">Next Area</button>
                    </div>
                </div>
            </div>

            {/* Emergency Contacts Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "University Clinic", phone: "+250 788 111 222", location: "Block C, 1st Floor", icon: <IoMedicalOutline />, color: "bg-red-500" },
                    { title: "Student Counseling", phone: "+250 788 333 444", location: "Wellness Center", icon: <IoHeartOutline />, color: "bg-blue-500" },
                    { title: "Guild Emergency Fund", phone: "+250 788 555 666", location: "President's Wing", icon: <IoShieldCheckmarkOutline />, color: "bg-green-500" },
                ].map((contact, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-start gap-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                        <div className={`shrink-0 w-16 h-16 ${contact.color} text-white rounded-[1.5rem] flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                            {contact.icon}
                        </div>
                        <div className="space-y-2 flex-1">
                            <h3 className="text-lg font-black text-primary-50">{contact.title}</h3>
                            <div className="space-y-1">
                                <p className="flex items-center gap-2 text-[10px] font-black text-primary-100 uppercase tracking-widest">
                                    <IoCallOutline className="text-sm" /> {contact.phone}
                                </p>
                                <p className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <IoLocationOutline className="text-sm" /> {contact.location}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default StudentWelfare;
