import React, { useEffect, useState } from "react";
import {
    IoAlertCircleOutline,
    IoChatbubblesOutline,
    IoCheckmarkCircleOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoEllipsisVertical,
    IoFlagOutline,
    IoHammerOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Grievance {
    id: string;
    studentName: string;
    category: "Academic" | "Facilities" | "Harassment" | "Financial" | "Other";
    subject: string;
    severity: "High" | "Medium" | "Low";
    status: "Pending" | "Investigating" | "Resolved" | "Closed";
    dateLogged: string;
}

const StudentGrievances: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Modals state
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
    const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);

    const [grievanceData, setGrievanceData] = useState<Grievance[]>([
        { id: "GRV-001", studentName: "Mugisha Eric", category: "Facilities", subject: "Inadequate Library Lighting", severity: "Medium", status: "Investigating", dateLogged: "2024-03-12" },
        { id: "GRV-002", studentName: "Inza Sarah", category: "Academic", subject: "Delayed Exam Feedback", severity: "High", status: "Pending", dateLogged: "2024-03-14" },
        { id: "GRV-003", studentName: "Kato John", category: "Financial", subject: "Tuition Refund Delay", severity: "High", status: "Investigating", dateLogged: "2024-03-10" },
        { id: "GRV-004", studentName: "Uwase Diane", category: "Harassment", subject: "Cyber-bullying Incident", severity: "High", status: "Resolved", dateLogged: "2024-03-08" },
        { id: "GRV-005", studentName: "Shema Jean", category: "Facilities", subject: "Wi-Fi Outage in Hostel 4", severity: "Medium", status: "Pending", dateLogged: "2024-03-15" },
        { id: "GRV-006", studentName: "Kirenga Paul", category: "Academic", subject: "Conflict with Faculty Head", severity: "Low", status: "Closed", dateLogged: "2024-03-05" },
        { id: "GRV-007", studentName: "Habimana Sam", category: "Other", subject: "Canteen Food Quality", severity: "Medium", status: "Investigating", dateLogged: "2024-03-16" },
        { id: "GRV-008", studentName: "Ishimwe Diane", category: "Academic", subject: "Missing Lab Equipment", severity: "High", status: "Pending", dateLogged: "2024-03-17" },
    ]);

    const stats = [
        { label: "Active Grievances", value: String(grievanceData.filter(g => g.status !== 'Closed' && g.status !== 'Resolved').length), trend: "12 Pending", icon: <IoAlertCircleOutline />, color: "text-red-500", bg: "bg-red-50" },
        { label: "Resolved This Week", value: String(grievanceData.filter(g => g.status === 'Resolved').length), trend: "+5% Efficiency", icon: <IoCheckmarkCircleOutline />, color: "text-green-500", bg: "bg-green-50" },
        { label: "Avg. Response Time", value: "48h", trend: "-6h Target", icon: <IoTimeOutline />, color: "text-primary-100", bg: "bg-primary-100/10" },
        { label: "Student Satisfaction", value: "88%", trend: "High Trust", icon: <IoChatbubblesOutline />, color: "text-primary-300", bg: "bg-primary-300/10" },
    ];

    const filteredGrievances = grievanceData.filter(g => 
        (activeFilter === "All" || g.status === activeFilter) &&
        (g.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || g.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeFilter]);

    const totalPages = Math.ceil(filteredGrievances.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedGrievances = filteredGrievances.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this grievance record? This action cannot be undone.")) {
            setGrievanceData(prev => prev.filter(g => g.id !== id));
            toast.success("Grievance record deleted successfully");
        }
    };

    const handleUpdateStatus = (id: string, newStatus: Grievance["status"]) => {
        setGrievanceData(prev => prev.map(g => g.id === id ? { ...g, status: newStatus } : g));
        toast.info(`Status updated to ${newStatus}`);
        setIsManageModalOpen(false);
    };

    const handleEscalate = () => {
        toast.warning("Critical case has been escalated to the Dean of Students and Legal Aid.");
        setIsEscalateModalOpen(false);
    };

    const handleDownloadReport = () => {
        toast.loading("Generating comprehensive grievance analytics...");
        setTimeout(() => {
            toast.dismiss();
            toast.success("Resolution Report (CSV) downloaded successfully");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
                        <IoHammerOutline className="text-primary-100" />
                        Student Grievance Portal
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Empowering student voices through structured resolution and advocacy.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    <button 
                        onClick={() => setIsEscalateModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all active:scale-95"
                    >
                        <IoFlagOutline className="text-base text-red-500" />
                        Escalate Critical Case
                    </button>
                    <button 
                        onClick={handleDownloadReport}
                        className="flex items-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95"
                    >
                        <IoStatsChartOutline className="text-base" />
                        Resolution Report
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
                            <div className={`text-[10px] font-black ${s.color} bg-gray-50 px-2 py-1 rounded-full uppercase tracking-widest`}>
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

            {/* Main Portal Area */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                {/* Search and Status Filter Toolbar */}
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 bg-primary-50/[0.01]">
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input 
                            type="text" 
                            placeholder="Find specific grievances or student records..." 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {["All", "Pending", "Investigating", "Resolved", "Closed"].map((status) => (
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

                {/* Grid View for Mobile / Desktop Table */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {paginatedGrievances.map((g) => (
                            <div key={g.id} className="p-6 rounded-[2rem] border border-gray-100 hover:border-primary-50/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all group bg-white relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg ${
                                            g.severity === 'High' ? 'bg-red-500' :
                                            g.severity === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'
                                        }`}>
                                            {g.severity.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-primary-50 uppercase tracking-tight line-clamp-1">{g.subject}</h3>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase italic">{g.id} • {g.dateLogged}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${
                                        g.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                        g.status === 'Pending' ? 'bg-red-100 text-red-700' :
                                        g.status === 'Closed' ? 'bg-gray-100 text-gray-500' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                        {g.status}
                                    </span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest py-3 border-y border-gray-50 group-hover:border-primary-50/10 transition-colors">
                                        <span className="text-gray-400">Student: <span className="text-primary-50">{g.studentName}</span></span>
                                        <span className="text-gray-400">Category: <span className="text-primary-300">{g.category}</span></span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between gap-3">
                                        <button 
                                            onClick={() => { setSelectedGrievance(g); setIsManageModalOpen(true); }}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-100/5 text-primary-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-100 hover:text-white transition-all"
                                        >
                                            Manage Case
                                            <IoChevronForwardOutline />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(g.id)}
                                            className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <IoTrashOutline />
                                        </button>
                                        <button className="p-3 text-gray-400 hover:text-primary-50 transition-colors">
                                            <IoEllipsisVertical />
                                        </button>
                                    </div>
                                </div>

                                <div className={`absolute top-0 right-0 w-1 h-full ${
                                    g.severity === 'High' ? 'bg-red-500' :
                                    g.severity === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'
                                } opacity-0 group-hover:opacity-100 transition-opacity`} />
                            </div>
                        ))}
                    </div>
                    {filteredGrievances.length === 0 && (
                        <div className="py-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300 text-4xl">
                                <IoSearchOutline />
                            </div>
                            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No grievances found matching your search.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic text-center sm:text-left">
                        Displaying {Math.min(startIndex + 1, filteredGrievances.length)} - {Math.min(startIndex + itemsPerPage, filteredGrievances.length)} of {filteredGrievances.length} Active Cases
                    </p>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-6 py-3 bg-white border border-gray-100 text-primary-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                        >
                            Prev
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

            {/* Support Notice */}
            {/* <div className="bg-primary-100 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary-100/20 group">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center text-3xl backdrop-blur-md group-hover:rotate-12 transition-transform">
                        <IoAlertCircleOutline />
                    </div>
                    <div>
                        <h4 className="text-xl font-black uppercase tracking-tight">Need Legal Advocacy?</h4>
                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Connect with the student legal aid committee for critical harassment cases.</p>
                    </div>
                </div>
                <button 
                    onClick={() => toast.info("Legal Aid Committee notified. They will contact you shortly.")}
                    className="px-8 py-4 bg-white text-primary-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap"
                >
                    Contact Legal Aid
                </button>
            </div> */}

            {/* Manage Case Modal */}
            {isManageModalOpen && selectedGrievance && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary-50/20 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-lg font-black text-primary-50 uppercase tracking-tight">Manage Grievance</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">{selectedGrievance.id}</p>
                            </div>
                            <button onClick={() => setIsManageModalOpen(false)} className="p-3 hover:bg-white rounded-2xl transition-colors">
                                <IoCloseOutline className="text-2xl text-gray-400" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject</label>
                                <p className="text-sm font-bold text-primary-50 bg-gray-50 p-4 rounded-2xl border border-gray-100">{selectedGrievance.subject}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logged Date</label>
                                    <p className="text-xs font-bold text-gray-600 px-4 py-3 bg-gray-50 rounded-xl">{selectedGrievance.dateLogged}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Initial Severity</label>
                                    <p className="text-xs font-bold text-gray-600 px-4 py-3 bg-gray-50 rounded-xl">{selectedGrievance.severity}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Resolution Status</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {(["Investigating", "Resolved", "Closed"] as Grievance["status"][]).map((status) => (
                                        <button 
                                            key={status}
                                            onClick={() => handleUpdateStatus(selectedGrievance.id, status)}
                                            className={`py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                                selectedGrievance.status === status 
                                                ? "bg-primary-100 border-primary-100 text-white shadow-lg shadow-primary-100/20" 
                                                : "bg-white border-gray-100 text-gray-400 hover:border-primary-100 hover:text-primary-100"
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex gap-3">
                            <button 
                                onClick={() => setIsManageModalOpen(false)}
                                className="flex-1 py-4 bg-white border border-gray-100 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 py-4 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90">
                                Save Notes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Escalate Modal */}
            {isEscalateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-red-500/10 backdrop-blur-md animate-fadeIn">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-red-50 overflow-hidden">
                        <div className="p-8 bg-red-50/50 border-b border-red-50 flex flex-col items-center text-center space-y-4">
                            <div className="w-20 h-20 bg-red-500 text-white rounded-[1.5rem] flex items-center justify-center text-4xl shadow-xl shadow-red-500/30 animate-pulse">
                                <IoFlagOutline />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-red-600 uppercase tracking-tight">Escalate Critical Grievance</h3>
                                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mt-1 px-8">High-level escalation notifies the Dean of Students, Legal Aid, and the Guild Executive Board immediately.</p>
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Case Urgency Level</label>
                                    <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-primary-50 focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all appearance-none cursor-pointer">
                                        <option>Immediate Danger / Safety Violation</option>
                                        <option>Major Academic Malpractice</option>
                                        <option>Systemic Financial Injustice</option>
                                        <option>Severe Harassment Case</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Escalation Brief (Internal)</label>
                                    <textarea 
                                        placeholder="Outline the critical reasons for this high-level escalation..."
                                        className="w-full h-32 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-primary-50 focus:outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-2">
                                <button 
                                    onClick={() => setIsEscalateModalOpen(false)}
                                    className="flex-1 py-4 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                                >
                                    Dismiss
                                </button>
                                <button 
                                    onClick={handleEscalate}
                                    className="flex-[2] py-4 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-500/30 hover:bg-red-600 transition-all active:scale-95"
                                >
                                    Confirm Escalation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentGrievances;
