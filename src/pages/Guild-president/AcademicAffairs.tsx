import React, { useEffect, useState } from "react";
import {
    IoBookOutline,
    IoChatbubblesOutline,
    IoDocumentAttachOutline,
    IoEllipsisVertical,
    IoFileTrayFullOutline,
    IoFlaskOutline,
    IoLibraryOutline,
    // IoPersonOutline,
    IoSearchOutline,
    IoTrendingUpOutline,
    IoWarningOutline
} from "react-icons/io5";

interface AcademicAppeal {
    id: string;
    studentName: string;
    type: "Grade Remarking" | "Missing Marks" | "Retake Request" | "Special Exam";
    department: string;
    priority: "High" | "Medium" | "Low";
    status: "In Review" | "Forwarded to Dean" | "Resolved" | "Rejected";
    dateSubmitted: string;
}

const AcademicAffairs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");

    const stats = [
        { label: "Active Appeals", value: "84", trend: "+5.4%", icon: <IoFileTrayFullOutline />, color: "text-primary-50", bg: "bg-primary-50/10" },
        { label: "Library Engagement", value: "88%", trend: "+2%", icon: <IoLibraryOutline />, color: "text-primary-100", bg: "bg-primary-100/10" },
        { label: "Research Grants", value: "12", trend: "0%", icon: <IoFlaskOutline />, color: "text-primary-300", bg: "bg-primary-300/10" },
        { label: "Graduation Prep", value: "92%", trend: "On Track", icon: <IoBookOutline />, color: "text-primary-200", bg: "bg-primary-200/10" },
    ];

    const appeals: AcademicAppeal[] = [
        { id: "ACC-2024-01", studentName: "Shema Jean", type: "Grade Remarking", department: "Computer Science", priority: "High", status: "Forwarded to Dean", dateSubmitted: "2024-03-12" },
        { id: "ACC-2024-02", studentName: "Inza Sarah", type: "Missing Marks", department: "Business Admin", priority: "Medium", status: "In Review", dateSubmitted: "2024-03-14" },
        { id: "ACC-2024-03", studentName: "Kanimba Eric", type: "Special Exam", department: "Engineering", priority: "High", status: "Resolved", dateSubmitted: "2024-03-10" },
        { id: "ACC-2024-04", studentName: "Uwase Diane", type: "Retake Request", department: "Journalism", priority: "Low", status: "In Review", dateSubmitted: "2024-03-15" },
    ];

    const filteredAppeals = appeals.filter(a => 
        (filterType === "All" || a.type === filterType) &&
        (a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || a.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterType]);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredAppeals.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedAppeals = filteredAppeals.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
                        <IoBookOutline className="text-primary-100" />
                        Academic Affairs Liaison
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Maintaining academic excellence and protecting student educational rights.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all active:scale-95">
                        <IoDocumentAttachOutline className="text-base text-primary-100" />
                        Academic Policy Handbook
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95">
                        <IoFlaskOutline className="text-base" />
                        Initiate Research Call
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

            {/* Main Application Area */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                {/* Search and Category Filter Toolbar */}
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 bg-primary-50/[0.01]">
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input 
                            type="text" 
                            placeholder="Find student appeals or liaison records..." 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {["All", "Grade Remarking", "Missing Marks", "Retake Request", "Special Exam"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    filterType === type ? "bg-primary-100 text-white shadow-lg shadow-primary-100/20" : "bg-gray-50 text-gray-400 hover:text-primary-50"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Appeal ID / Student</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Appeal Type</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Department</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Priority</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Liaison Status</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedAppeals.map((a) => (
                                <tr key={a.id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-primary-100/5 rounded-2xl flex items-center justify-center text-primary-100 font-black text-xs border border-primary-100/5 group-hover:scale-105 transition-transform">
                                                {a.studentName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-primary-50 group-hover:text-primary-100 transition-colors uppercase tracking-tight">{a.studentName}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase italic tracking-wider">{a.id} • {a.dateSubmitted}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <IoWarningOutline className={`text-sm ${
                                                a.type === 'Missing Marks' ? 'text-red-500' : 'text-blue-500'
                                            }`} />
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{a.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-black text-primary-300 uppercase tracking-widest">{a.department}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                                            a.priority === 'High' ? 'text-red-600 bg-red-50 border border-red-100' :
                                            a.priority === 'Medium' ? 'text-orange-600 bg-orange-50 border border-orange-100' :
                                            'text-blue-600 bg-blue-50 border border-blue-100'
                                        }`}>
                                            {a.priority}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                                                a.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                                a.status === 'Forwarded to Dean' ? 'bg-purple-100 text-purple-700' :
                                                a.status === 'In Review' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-500'
                                            }`}>
                                                {a.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-white text-gray-400 hover:text-primary-50 rounded-xl shadow-sm border border-gray-100 hover:border-primary-50 transition-all" title="View Detail">
                                                <IoSearchOutline />
                                            </button>
                                            <button className="p-3 bg-white text-gray-400 hover:text-primary-100 rounded-xl shadow-sm border border-gray-100 hover:border-primary-100 transition-all" title="Liaison Chat">
                                                <IoChatbubblesOutline />
                                            </button>
                                            <button className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm border border-gray-100 hover:border-red-500 transition-all" title="More Options">
                                                <IoEllipsisVertical />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Info */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                        Displaying {Math.min(startIndex + 1, filteredAppeals.length)} - {Math.min(startIndex + itemsPerPage, filteredAppeals.length)} of {filteredAppeals.length} Tracked Cases
                    </p>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-6 py-3 bg-white border border-gray-100 text-primary-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <div className="flex gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
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
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-6 py-3 bg-white border border-gray-100 text-primary-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Liaison Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
               {[
                   { title: "Registrar's Office", 담당: "Dr. Kamali P.", email: "registrar@school.edu", icon: <IoPersonOutline />, bg: "bg-blue-500" },
                   { title: "Dean of Students", 담당: "Prof. Mutoni R.", email: "dos@school.edu", icon: <IoChatbubblesOutline />, bg: "bg-primary-100" },
                   { title: "Exam Board", 담당: "Secretariat", email: "exams@school.edu", icon: <IoFileTrayFullOutline />, bg: "bg-primary-50" },
               ].map((liaison, idx) => (
                   <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all">
                       <div className={`${liaison.bg} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:rotate-6 transition-transform`}>
                           {liaison.icon}
                       </div>
                       <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-black text-primary-50 truncate uppercase tracking-tight">{liaison.title}</h4>
                           <p className="text-[10px] font-bold text-gray-400">{liaison.담당}</p>
                           <p className="text-[10px] font-black text-primary-100 hover:underline cursor-pointer">{liaison.email}</p>
                       </div>
                   </div>
               ))}
            </div> */}
        </div>
    );
};

export default AcademicAffairs;
