import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoCloudDownloadOutline,
    IoCloudUploadOutline,
    IoRefreshOutline,
    IoServerOutline,
    IoSettingsOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

interface Backup {
    id: string;
    name: string;
    size: string;
    date: string;
    type: "Manual" | "Auto";
    status: "Healthy" | "Corrupted" | "Processing";
}

const DatasRecovery: React.FC = () => {
    const [backups, setBackups] = useState<Backup[]>([
        { id: "BK-001", name: "System Snapshot - Pre Migration", size: "1.2 GB", date: "2024-12-18 10:30", type: "Manual", status: "Healthy" },
        { id: "BK-002", name: "Daily Auto Backup", size: "850 MB", date: "2024-12-17 00:05", type: "Auto", status: "Healthy" },
        { id: "BK-003", name: "User DB Purge Point", size: "920 MB", date: "2024-12-16 15:20", type: "Manual", status: "Healthy" },
        { id: "BK-004", name: "Emergency Rollback State", size: "1.1 GB", date: "2024-12-15 08:00", type: "Manual", status: "Corrupted" },
        { id: "BK-005", name: "End of Term Snapshot", size: "2.4 GB", date: "2024-12-14 18:45", type: "Auto", status: "Healthy" },
        { id: "BK-006", name: "Manual Data Patch", size: "150 MB", date: "2024-12-13 12:00", type: "Manual", status: "Healthy" },
        { id: "BK-007", name: "Security Audit Point", size: "1.3 GB", date: "2024-12-12 09:15", type: "Manual", status: "Healthy" },
        { id: "BK-008", name: "Weekly Archive", size: "4.2 GB", date: "2024-12-11 23:55", type: "Auto", status: "Healthy" },
        { id: "BK-009", name: "System Maintenance DB", size: "890 MB", date: "2024-12-10 14:30", type: "Manual", status: "Healthy" },
        { id: "BK-010", name: "Auto Backup - Daily", size: "900 MB", date: "2024-12-09 00:05", type: "Auto", status: "Healthy" },
        { id: "BK-011", name: "Pre-Update Snapshot", size: "1.1 GB", date: "2024-12-08 11:20", type: "Manual", status: "Healthy" },
        { id: "BK-012", name: "Post-Update Validation", size: "1.1 GB", date: "2024-12-08 16:45", type: "Manual", status: "Healthy" },
    ]);

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    
    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
    const [newSnapshotName, setNewSnapshotName] = useState("");
    const [autoBackupFreq, setAutoBackupFreq] = useState("Daily");

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = backups.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(backups.length / itemsPerPage);

    const stats = [
        { label: "Total Backups", value: backups.length.toString(), icon: <IoServerOutline />, color: "bg-blue-500" },
        { label: "Storage Used", value: "14.2 GB", icon: <IoShieldCheckmarkOutline />, color: "bg-emerald-500" },
        { label: "Last Auto Backup", value: "6h ago", icon: <IoTimeOutline />, color: "bg-amber-500" },
        { label: "System health", value: "98%", icon: <IoRefreshOutline />, color: "bg-indigo-500" },
    ];

    // Handlers
    const handleCreateSnapshot = () => {
        if (!newSnapshotName.trim()) {
            toast.error("Please enter a snapshot name");
            return;
        }
        const newBackup: Backup = {
            id: `BK-0${backups.length + 1}`,
            name: newSnapshotName,
            size: "0 MB",
            date: new Date().toLocaleString(),
            type: "Manual",
            status: "Processing"
        };
        setBackups([newBackup, ...backups]);
        setIsCreateModalOpen(false);
        setNewSnapshotName("");
        toast.info("Snapshot creation process started...");
        
        // Simulate processing complete
        setTimeout(() => {
            setBackups(prev => prev.map(b => b.id === newBackup.id ? { ...b, status: "Healthy", size: "124 MB" } : b));
            toast.success("Snapshot created successfully!");
        }, 5000);
    };

    const handleDeleteSnapshot = () => {
        if (!selectedBackup) return;
        setBackups(prev => prev.filter(b => b.id !== selectedBackup.id));
        setIsDeleteModalOpen(false);
        setSelectedBackup(null);
        toast.success("Snapshot deleted successfully");
    };

    const handleRestoreSnapshot = () => {
        if (!selectedBackup) return;
        setIsRestoreModalOpen(false);
        const restoreToast = toast.loading(`Restoring system from ${selectedBackup.name}...`);
        
        setTimeout(() => {
            toast.update(restoreToast, {
                render: "System restored successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000
            });
            setSelectedBackup(null);
        }, 4000);
    };

    const handleDownload = (backup: Backup) => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 2000)),
            {
                pending: `Preparing download: ${backup.name}...`,
                success: "Download started!",
                error: "Download failed"
            }
        );
    };

    // const handleGlobalDump = () => {
    //     const dumpToast = toast.loading("Analyzing system clusters for global export...");
        
    //     setTimeout(() => {
    //         toast.update(dumpToast, { render: "Compensating data integrity..." });
    //         setTimeout(() => {
    //             toast.update(dumpToast, {
    //                 render: "Global SQL Dump generated successfully!",
    //                 type: "success",
    //                 isLoading: false,
    //                 autoClose: 5000
    //             });
    //         }, 3000);
    //     }, 2000);
    // };

    return (
        <div className="min-h-screen bg-gray-50/50 p-3 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                <div>
                    <h1 className="text-xl sm:text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-2 sm:gap-3">
                        <IoServerOutline className="text-primary-100 text-2xl sm:text-3xl" />
                        Data Recovery & Backups
                    </h1>
                    <p className="text-gray-500 mt-1 text-xs sm:text-sm font-medium italic">Manage system snapshots, automated backups, and critical restoration points.</p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                    <button 
                        onClick={() => setIsConfigModalOpen(true)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-600 rounded-xl text-xs sm:text-sm font-bold border border-gray-100 shadow-sm hover:bg-gray-50 transition-all active:scale-95"
                    >
                        <IoSettingsOutline />
                        Config
                    </button>
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 bg-primary-100 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all active:scale-95"
                    >
                        <IoCloudUploadOutline className="text-sm sm:text-lg" />
                        Create Snapshot
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-5 sm:p-6 rounded-3xl sm:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                        <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                            <div className={`${stat.color} p-3 sm:p-4 rounded-xl sm:rounded-2xl text-white text-xl sm:text-2xl shadow-lg transition-transform group-hover:scale-110`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                                <p className="text-lg sm:text-xl font-bold text-primary-50">{stat.value}</p>
                            </div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 text-6xl sm:text-7xl text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 sm:p-10 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <h2 className="text-lg sm:text-xl font-black text-primary-50 flex items-center gap-2 sm:gap-3">
                        <IoTimeOutline className="text-primary-100" />
                        Snapshot History
                    </h2>
                    <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase text-gray-400">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Auto-Backup System: Active
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="block lg:hidden p-4 space-y-4">
                    {currentItems.map((backup) => (
                        <div key={backup.id} className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary-100 font-black text-xs shadow-sm">
                                        {backup.id.split('-')[1]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{backup.name}</p>
                                        <p className="text-[10px] text-gray-400 font-medium">{backup.date}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-wider ${
                                    backup.type === 'Manual' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                    {backup.type}
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="text-[8px] font-black uppercase text-gray-400">Size</p>
                                        <p className="text-xs font-bold text-gray-600">{backup.size}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black uppercase text-gray-400">Status</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className={`w-1.5 h-1.5 rounded-full ${
                                                backup.status === 'Healthy' ? 'bg-emerald-500' : backup.status === 'Corrupted' ? 'bg-red-500' : 'bg-blue-500 animate-pulse'
                                            }`}></div>
                                            <span className="text-[11px] font-bold text-gray-600">{backup.status}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-1.5">
                                    <button 
                                        onClick={() => handleDownload(backup)}
                                        className="p-2 rounded-lg bg-white text-gray-600 shadow-sm border border-gray-100" title="Download"
                                    >
                                        <IoCloudDownloadOutline className="text-base" />
                                    </button>
                                    <button 
                                        onClick={() => { setSelectedBackup(backup); setIsRestoreModalOpen(true); }}
                                        className="p-2 rounded-lg bg-white text-emerald-600 shadow-sm border border-gray-100" title="Restore"
                                    >
                                        <IoRefreshOutline className="text-base" />
                                    </button>
                                    <button 
                                        onClick={() => { setSelectedBackup(backup); setIsDeleteModalOpen(true); }}
                                        className="p-2 rounded-lg bg-white text-red-600 shadow-sm border border-gray-100" title="Delete"
                                    >
                                        <IoTrashOutline className="text-base" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-gray-400 uppercase">Snapshot Details</th>
                                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-gray-400 uppercase">Size</th>
                                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-gray-400 uppercase">Type</th>
                                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-gray-400 uppercase">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentItems.map((backup) => (
                                <tr key={backup.id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary-50/5 flex items-center justify-center text-primary-100 font-black text-xs">
                                                {backup.id.split('-')[1]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{backup.name}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">{backup.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-bold text-gray-600">{backup.size}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                            backup.type === 'Manual' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            {backup.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${
                                                backup.status === 'Healthy' ? 'bg-emerald-500' : backup.status === 'Corrupted' ? 'bg-red-500' : 'bg-blue-500 animate-pulse'
                                            }`}></div>
                                            <span className="text-xs font-bold text-gray-600">{backup.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleDownload(backup)}
                                                className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-primary-100 hover:text-white transition-all shadow-sm" title="Download"
                                            >
                                                <IoCloudDownloadOutline className="text-lg" />
                                            </button>
                                            <button 
                                                onClick={() => { setSelectedBackup(backup); setIsRestoreModalOpen(true); }}
                                                className="p-2.5 rounded-xl bg-gray-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm" title="Restore"
                                            >
                                                <IoRefreshOutline className="text-lg" />
                                            </button>
                                            <button 
                                                onClick={() => { setSelectedBackup(backup); setIsDeleteModalOpen(true); }}
                                                className="p-2.5 rounded-xl bg-gray-50 text-red-600 hover:bg-red-500 hover:text-white transition-all shadow-sm" title="Delete"
                                            >
                                                <IoTrashOutline className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="px-6 sm:px-8 py-5 sm:py-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left">
                            Page {currentPage} of {totalPages} <span className="hidden sm:inline">• {backups.length} Snapshots</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg sm:rounded-xl transition-all border ${
                                    currentPage === 1 
                                    ? "bg-gray-50 text-gray-300 border-gray-100 pointer-events-none" 
                                    : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50 active:scale-95"
                                }`}
                            >
                                <IoChevronBackOutline className="text-lg" />
                            </button>
                            
                            <div className="hidden xs:flex items-center gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl text-xs font-black transition-all ${
                                            currentPage === i + 1
                                            ? "bg-primary-100 text-white shadow-lg shadow-primary-100/20"
                                            : "bg-white text-gray-400 hover:bg-gray-50 border border-transparent"
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg sm:rounded-xl transition-all border ${
                                    currentPage === totalPages 
                                    ? "bg-gray-50 text-gray-300 border-gray-100 pointer-events-none" 
                                    : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50 active:scale-95"
                                }`}
                            >
                                <IoChevronForwardOutline className="text-lg" />
                            </button>
                        </div>
                    </div>
                )}

                {/* <div className="p-6 sm:p-10 bg-primary-50 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="absolute right-0 top-0 text-[10rem] sm:text-[15rem] opacity-5 -translate-y-1/4 translate-x-1/4 pointer-events-none">
                        <IoServerOutline />
                    </div>
                    <div className="relative z-10 text-center md:text-left space-y-1">
                        <h3 className="text-lg sm:text-xl font-black tracking-tight">Need a full database export?</h3>
                        <p className="text-primary-100/60 text-[10px] sm:text-xs font-bold">Generate a comprehensive SQL dump for external storage.</p>
                    </div>
                    <button 
                        onClick={handleGlobalDump}
                        className="relative z-10 w-full md:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-primary-50 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-gray-50 transition-all shadow-xl shadow-black/20 active:scale-95"
                    >
                        Download Global SQL Dump
                    </button>
                </div> */}
            </div>

            {/* Modals - Simplified for Mobile */}
            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
                    <div className="absolute inset-0 bg-primary-50/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsCreateModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-slideUp">
                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl sm:text-2xl font-black text-primary-50 tracking-tight">New Snapshot</h3>
                                <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <IoCloseOutline className="text-2xl text-gray-400" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Snapshot Label</label>
                                <input 
                                    type="text" 
                                    value={newSnapshotName}
                                    onChange={(e) => setNewSnapshotName(e.target.value)}
                                    placeholder="Enter identifier..."
                                    className="w-full px-5 py-3.5 sm:px-6 sm:py-4 bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 outline-none transition-all font-bold text-sm"
                                />
                            </div>
                            <button 
                                onClick={handleCreateSnapshot}
                                className="w-full py-4 bg-primary-100 text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-xl shadow-primary-100/20 active:scale-[0.98]"
                            >
                                Initiate Backup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && selectedBackup && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
                    <div className="absolute inset-0 bg-red-50/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsDeleteModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-slideUp">
                        <div className="p-6 sm:p-8 text-center space-y-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                                <IoTrashOutline className="text-3xl sm:text-4xl" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl sm:text-2xl font-black text-primary-50 tracking-tight">Delete Snapshot?</h3>
                                <p className="text-gray-500 text-xs sm:text-sm font-medium px-4 leading-relaxed">You are about to permanently remove <span className="font-bold text-red-500 block sm:inline">{selectedBackup.name}</span>. This action cannot be reversed.</p>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3.5 bg-gray-50 text-gray-500 rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                                <button onClick={handleDeleteSnapshot} className="flex-1 py-3.5 bg-red-500 text-white rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-[0.98]">Delete Forever</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Restore Confirmation Modal */}
            {isRestoreModalOpen && selectedBackup && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
                    <div className="absolute inset-0 bg-emerald-50/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsRestoreModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-slideUp">
                        <div className="p-6 sm:p-8 text-center space-y-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                                <IoRefreshOutline className="text-3xl sm:text-4xl animate-spin-slow" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl sm:text-2xl font-black text-primary-50 tracking-tight">Restore System?</h3>
                                <p className="text-gray-500 text-xs sm:text-sm font-medium px-4 leading-relaxed">All current data will be overwritten with the state from <span className="font-bold text-emerald-500 block sm:inline">{selectedBackup.name}</span>.</p>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setIsRestoreModalOpen(false)} className="flex-1 py-3.5 bg-gray-50 text-gray-500 rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">Abort</button>
                                <button onClick={handleRestoreSnapshot} className="flex-1 py-3.5 bg-emerald-500 text-white rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.98]">Confirm Restore</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Config Modal */}
            {isConfigModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
                    <div className="absolute inset-0 bg-primary-50/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsConfigModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-slideUp">
                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl sm:text-2xl font-black text-primary-50 tracking-tight">Backup Config</h3>
                                <button onClick={() => setIsConfigModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <IoCloseOutline className="text-2xl text-gray-400" />
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">Auto-Backup Frequency</label>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {["Daily", "Weekly", "Bi-Weekly", "Monthly"].map(freq => (
                                            <button 
                                                key={freq}
                                                onClick={() => setAutoBackupFreq(freq)}
                                                className={`py-3 rounded-xl text-[10px] sm:text-xs font-black transition-all border-2 ${
                                                    autoBackupFreq === freq 
                                                    ? "bg-primary-100 border-primary-100 text-white shadow-lg shadow-primary-100/20" 
                                                    : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                                                }`}
                                            >
                                                {freq}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6 bg-blue-50/50 rounded-2xl flex gap-3 sm:gap-4 items-start border border-blue-50">
                                    <IoAlertCircleOutline className="text-blue-500 text-xl sm:text-2xl shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-blue-600">Pro-Tip</p>
                                        <p className="text-[10px] sm:text-[11px] font-medium text-blue-900 leading-relaxed italic">Daily backups are recommended for high-traffic school databases to ensure zero data loss.</p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => { setIsConfigModalOpen(false); toast.success("Configuration updated!"); }}
                                className="w-full py-4 bg-primary-100 text-white rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-95 transition-all shadow-xl shadow-primary-100/20 active:scale-[0.98]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatasRecovery;
