import React, { useEffect, useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoCloseOutline,
    IoEllipsisVertical,
    IoEyeOutline,
    IoInformationCircleOutline,
    IoMegaphoneOutline,
    IoPeopleOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Announcement {
    id: string;
    title: string;
    content: string;
    category: "Academic" | "Social" | "Emergency" | "Financial";
    priority: "High" | "Medium" | "Low";
    audience: "All Students" | "Faculty Specific" | "Guild Members";
    status: "Published" | "Scheduled" | "Draft";
    date: string;
    views: number;
}

const GuildAnnouncements: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Modals state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

    // Form state for new announcement
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: "",
        content: "",
        category: "Academic" as Announcement["category"],
        priority: "Medium" as Announcement["priority"],
        audience: "All Students" as Announcement["audience"],
        status: "Published" as Announcement["status"]
    });

    const [announcements, setAnnouncements] = useState<Announcement[]>([
        { 
            id: "ANN-2024-001", 
            title: "Semester Break Dates Confirmed", 
            content: "The University Senate has approved the break starting from March 20th. All students are advised to clear their hostel accommodations accordingly.",
            category: "Academic", 
            priority: "High", 
            audience: "All Students",
            status: "Published", 
            date: "2024-03-12",
            views: 1240
        },
        { 
            id: "ANN-2024-002", 
            title: "Guild Cultural Gala Night", 
            content: "Join us for a night of diversity and celebration at the Main Square. Free entry for all guild members.",
            category: "Social", 
            priority: "Medium", 
            audience: "All Students",
            status: "Scheduled", 
            date: "2024-03-25",
            views: 0
        },
        { 
            id: "ANN-2024-003", 
            title: "Emergency Maintenance: Library Wi-Fi", 
            content: "Expected downtime for ICT infrastructure between 2 PM and 5 PM today due to fiber optic upgrades.",
            category: "Emergency", 
            priority: "High", 
            audience: "All Students",
            status: "Published", 
            date: "2024-03-15",
            views: 3450
        },
        { 
            id: "ANN-2024-004", 
            title: "Bursary Application Extension", 
            content: "Deadline for guild-sponsored support has been moved to Friday. Ensure all documents are uploaded to the portal.",
            category: "Financial", 
            priority: "High", 
            audience: "Guild Members",
            status: "Published", 
            date: "2024-03-10",
            views: 890
        },
        { 
            id: "ANN-2024-005", 
            title: "New Student Union Guidelines", 
            content: "Updated conduct policies for all registered associations. Download the full PDF from the resources center.",
            category: "Academic", 
            priority: "Low", 
            audience: "Guild Members",
            status: "Draft", 
            date: "2024-03-18",
            views: 0
        }
    ]);

    const stats = [
        { label: "Active Broadcasts", value: String(announcements.filter(a => a.status === 'Published').length), trend: "+2 today", icon: <IoMegaphoneOutline />, color: "text-primary-100", bg: "bg-primary-100/10" },
        { label: "Total Reach", value: "8.2k", trend: "92% Open rate", icon: <IoPeopleOutline />, color: "text-primary-300", bg: "bg-primary-300/10" },
        { label: "Scheduled", value: String(announcements.filter(a => a.status === 'Scheduled').length), trend: "Next: 6 PM", icon: <IoCalendarOutline />, color: "text-primary-200", bg: "bg-primary-200/10" },
        { label: "Emergency Alerts", value: String(announcements.filter(a => a.category === 'Emergency').length), trend: "Resolved", icon: <IoAlertCircleOutline />, color: "text-red-500", bg: "bg-red-50" },
    ];

    const filtered = announcements.filter(a => 
        (activeTab === "All" || a.status === activeTab) &&
        (a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeTab]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = (id: string) => {
        if(window.confirm("Archive this announcement? It will be removed from the public feed.")) {
            setAnnouncements(prev => prev.filter(a => a.id !== id));
            toast.success("Announcement archived successfully");
        }
    };

    const handleCreateAnnouncement = (e: React.FormEvent) => {
        e.preventDefault();
        const id = `ANN-${new Date().getFullYear()}-${String(announcements.length + 1).padStart(3, '0')}`;
        const date = new Date().toISOString().split('T')[0];
        const newEntry: Announcement = {
            ...newAnnouncement,
            id,
            date,
            views: 0
        };
        setAnnouncements([newEntry, ...announcements]);
        setIsCreateModalOpen(false);
        setNewAnnouncement({
            title: "",
            content: "",
            category: "Academic",
            priority: "Medium",
            audience: "All Students",
            status: "Published"
        });
        toast.success("New announcement broadcasted successfully!");
    };

    const handleViewAnnouncement = (a: Announcement) => {
        setSelectedAnnouncement(a);
        setIsViewModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
                        <IoMegaphoneOutline className="text-primary-100 animate-bounce" />
                        Guild Announcements Hub
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Broadcast critical updates and campus news to the student community.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    <button onClick={() => toast.info("Audit log access is restricted to the Executive Board.")} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all active:scale-95">
                        <IoTimeOutline className="text-base text-primary-100" />
                        View Broadcast History
                    </button>
                    <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95">
                        <IoAddOutline className="text-base" />
                        Create Announcement
                    </button>
                </div>
            </div>

            {/* Stats */}
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
                    </div>
                ))}
            </div>

            {/* Management Feed */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 bg-primary-50/[0.01]">
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input 
                            type="text" 
                            placeholder="Filter by title, category, or keyword..." 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 bg-gray-50 p-1.5 rounded-[1.5rem]">
                        {["All", "Published", "Scheduled", "Draft"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeTab === tab ? "bg-white text-primary-50 shadow-sm border border-gray-100" : "text-gray-400 hover:text-primary-50"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/30">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Post Info</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Audience</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Priority</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Analytics</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginated.map((a) => (
                                <tr key={a.id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg group-hover:rotate-6 transition-transform ${
                                                a.category === 'Emergency' ? 'bg-red-500 text-white shadow-red-500/20' : 
                                                a.category === 'Academic' ? 'bg-primary-50 text-white shadow-primary-50/20' : 
                                                'bg-primary-100 text-white shadow-primary-100/20'
                                            }`}>
                                                {a.category === 'Emergency' ? <IoAlertCircleOutline /> : 
                                                 a.category === 'Academic' ? <IoInformationCircleOutline /> : <IoMegaphoneOutline />}
                                            </div>
                                            <div className="max-w-[300px]">
                                                <p className="text-sm font-black text-primary-50 line-clamp-1 uppercase tracking-tight">{a.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase italic">{a.id}</span>
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                    <span className="text-[10px] font-black text-primary-100 uppercase tracking-widest">{a.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] font-black text-gray-600 bg-gray-100 px-3 py-1 rounded-lg uppercase tracking-widest whitespace-nowrap">
                                            {a.audience}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                                            a.priority === 'High' ? 'bg-red-100 text-red-700' :
                                            a.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {a.priority} Priority
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                            <IoEyeOutline className="text-primary-100 text-sm" />
                                            {a.views.toLocaleString()} Reads
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleViewAnnouncement(a)} className="p-3 bg-white text-gray-400 hover:text-primary-50 rounded-xl shadow-sm border border-gray-100 hover:border-primary-50 transition-all">
                                                <IoEyeOutline className="text-lg" />
                                            </button>
                                            <button onClick={() => handleDelete(a.id)} className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm border border-gray-100 hover:border-red-500 transition-all">
                                                <IoTrashOutline className="text-lg" />
                                            </button>
                                            <button className="p-3 bg-white text-gray-400 hover:text-primary-100 rounded-xl shadow-sm border border-gray-100 hover:border-primary-100 transition-all">
                                                <IoEllipsisVertical className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="py-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300 text-4xl">
                                <IoSearchOutline />
                            </div>
                            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No announcements found matching your search.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                        Displaying {Math.min(startIndex + 1, filtered.length)} - {Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length} Digital Broadcasts
                    </p>
                    <div className="flex gap-2">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            className="px-6 py-3 bg-white border border-gray-100 text-primary-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 disabled:opacity-50 transition-all"
                        >
                            Prev
                        </button>
                        <button 
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            className="px-6 py-3 bg-primary-50 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary-50/20 hover:opacity-90 disabled:opacity-50 transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Support Notice */}
            {/* <div className="bg-primary-50 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary-50/20 group relative overflow-hidden">
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center text-3xl backdrop-blur-md group-hover:rotate-12 transition-transform">
                        <IoMegaphoneOutline />
                    </div>
                    <div>
                        <h4 className="text-xl font-black uppercase tracking-tight">Need Urgent Assistance?</h4>
                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Connect with the guild communication team for emergency media releases.</p>
                    </div>
                </div>
                <button onClick={() => toast.info("Guild Media Team has been notified.")} className="px-8 py-4 bg-white text-primary-50 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap relative z-10">
                    Request Emergency Portal
                </button>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            </div> */}

            {/* Create Announcement Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary-50/20 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                        <form onSubmit={handleCreateAnnouncement}>
                            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary-50 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">
                                        <IoAddOutline />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-primary-50 uppercase tracking-tight">New Broadcast</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Announcement Composer</p>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="p-3 hover:bg-white rounded-2xl transition-colors">
                                    <IoCloseOutline className="text-2xl text-gray-400" />
                                </button>
                            </div>
                            
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto no-scrollbar">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Announcement Title</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Enter a compelling headline..."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-primary-50 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all"
                                        value={newAnnouncement.title}
                                        onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Category</label>
                                    <select 
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-primary-50 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all appearance-none cursor-pointer"
                                        value={newAnnouncement.category}
                                        onChange={(e) => setNewAnnouncement({...newAnnouncement, category: e.target.value as any})}
                                    >
                                        <option>Academic</option>
                                        <option>Social</option>
                                        <option>Emergency</option>
                                        <option>Financial</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Priority Level</label>
                                    <select 
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-primary-50 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all appearance-none cursor-pointer"
                                        value={newAnnouncement.priority}
                                        onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value as any})}
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Target Audience</label>
                                    <select 
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-primary-50 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all appearance-none cursor-pointer"
                                        value={newAnnouncement.audience}
                                        onChange={(e) => setNewAnnouncement({...newAnnouncement, audience: e.target.value as any})}
                                    >
                                        <option>All Students</option>
                                        <option>Faculty Specific</option>
                                        <option>Guild Members</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Initial Status</label>
                                    <select 
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-primary-50 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all appearance-none cursor-pointer"
                                        value={newAnnouncement.status}
                                        onChange={(e) => setNewAnnouncement({...newAnnouncement, status: e.target.value as any})}
                                    >
                                        <option>Published</option>
                                        <option>Scheduled</option>
                                        <option>Draft</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Main Content</label>
                                    <textarea 
                                        required
                                        placeholder="Draft your detailed message here..."
                                        className="w-full h-32 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-primary-50 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all resize-none"
                                        value={newAnnouncement.content}
                                        onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="flex-1 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                                >
                                    Discard Draft
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-[2] py-4 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95"
                                >
                                    Confirm & Broadcast
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Announcement Modal */}
            {isViewModalOpen && selectedAnnouncement && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary-50/20 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="p-8 bg-gray-50/50 border-b border-gray-50 relative">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl ${
                                    selectedAnnouncement.category === 'Emergency' ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-primary-50 text-white shadow-primary-50/20'
                                }`}>
                                    {selectedAnnouncement.category === 'Emergency' ? <IoAlertCircleOutline /> : <IoMegaphoneOutline />}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-black text-primary-50 leading-tight pr-8 uppercase tracking-tight">{selectedAnnouncement.title}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${
                                            selectedAnnouncement.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-primary-100/10 text-primary-100'
                                        }`}>
                                            {selectedAnnouncement.priority} Priority
                                        </span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase italic">• {selectedAnnouncement.date}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsViewModalOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-white rounded-2xl transition-colors">
                                <IoCloseOutline className="text-2xl text-gray-400" />
                            </button>
                        </div>
                        
                        <div className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="text-sm font-bold text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                                    {selectedAnnouncement.content}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Audience</p>
                                        <p className="text-xs font-black text-primary-50 uppercase">{selectedAnnouncement.audience}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Reach</p>
                                        <p className="text-xs font-black text-primary-50 uppercase">{selectedAnnouncement.views.toLocaleString()} Readers</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => { toast.info("Link copied to clipboard!"); setIsViewModalOpen(false); }}
                                    className="flex-1 py-4 bg-white border border-gray-100 text-primary-50 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                                >
                                    Copy Hub Link
                                </button>
                                <button 
                                    onClick={() => { toast.success("Announcement updated!"); setIsViewModalOpen(false); }}
                                    className="flex-1 py-4 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95"
                                >
                                    Verify Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuildAnnouncements;
