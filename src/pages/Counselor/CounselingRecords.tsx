import React, { useState } from "react";
import {
    IoAddOutline,
    IoArchiveOutline,
    IoCalendarOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoDocumentTextOutline,
    IoEyeOutline,
    IoLockClosedOutline,
    IoPencilOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

const CounselingRecords: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [showAddNoteModal, setShowAddNoteModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [newNote, setNewNote] = useState({
        title: "",
        content: "",
        category: "Session Note"
    });

    // Mock Data
    const studentRecords = [
        {
            id: 1,
            student: "Emma Johnson",
            grade: "Grade 11",
            totalSessions: 8,
            lastSession: "Dec 22, 2025",
            status: "Active",
            notes: 12,
            concerns: ["Academic Performance", "Course Selection"]
        },
        {
            id: 2,
            student: "Michael Chen",
            grade: "Grade 12",
            totalSessions: 15,
            lastSession: "Dec 21, 2025",
            status: "Active",
            notes: 18,
            concerns: ["Career Planning", "University Applications"]
        },
        {
            id: 3,
            student: "Sarah Williams",
            grade: "Grade 10",
            totalSessions: 6,
            lastSession: "Dec 20, 2025",
            status: "Active",
            notes: 9,
            concerns: ["Stress Management", "Social Adjustment"]
        },
        {
            id: 4,
            student: "Ryan Cooper",
            grade: "Grade 10",
            totalSessions: 10,
            lastSession: "Dec 15, 2025",
            status: "Monitoring",
            notes: 14,
            concerns: ["Behavioral Issues", "Academic Support"]
        },
        {
            id: 5,
            student: "David Martinez",
            grade: "Grade 12",
            totalSessions: 5,
            lastSession: "Nov 30, 2025",
            status: "Archived",
            notes: 7,
            concerns: ["Career Exploration"]
        }
    ];

    const stats = [
        { title: "Total Records", value: "47", icon: <IoDocumentTextOutline className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
        { title: "Active Cases", value: "18", icon: <IoShieldCheckmarkOutline className="w-6 h-6" />, color: "bg-green-100 text-green-600" },
        { title: "This Month", value: "23", icon: <IoCalendarOutline className="w-6 h-6" />, color: "bg-purple-100 text-purple-600" },
        { title: "Archived", value: "12", icon: <IoArchiveOutline className="w-6 h-6" />, color: "bg-gray-100 text-gray-600" }
    ];

    const filteredRecords = studentRecords.filter(record => {
        const matchesSearch = record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            record.concerns.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = filterStatus === "all" || record.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterStatus]);

    const handleViewRecord = (studentId: number, studentName: string) => {
        toast.info(`Opening detailed record for ${studentName}...`);
        setTimeout(() => {
            toast.success(`Record #${studentId} loaded successfully!`);
        }, 1000);
    };

    const handleAddNote = (studentName: string) => {
        setSelectedStudent(studentName);
        setShowAddNoteModal(true);
    };

    const handleSubmitNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNote.title || !newNote.content) {
            toast.error("Please fill in all required fields");
            return;
        }
        toast.success(`Note added to ${selectedStudent}'s record!`);
        setShowAddNoteModal(false);
        setNewNote({
            title: "",
            content: "",
            category: "Session Note"
        });
        setSelectedStudent(null);
    };

    const handleEditRecord = (studentId: number, studentName: string) => {
        toast.info(`Opening edit mode for ${studentName}'s record...`);
        setTimeout(() => {
            toast.success(`Record #${studentId} ready for editing!`);
        }, 1000);
    };

    const handleArchiveRecord = (studentId: number, studentName: string) => {
        toast.info(`Archiving record for ${studentName}...`);
        setTimeout(() => {
            toast.success(`Record #${studentId} archived successfully!`);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Counseling Records</h1>
                    <p className="text-gray-500 mt-1">Maintain confidential counseling records and session notes.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
                    <IoLockClosedOutline className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-medium text-amber-900">Confidential</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.color} transition-transform group-hover:scale-110`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Records List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Student Records</h2>
                            
                            {/* Search and Filter */}
                            <div className="flex gap-3">
                                <div className="relative flex-1 sm:flex-initial">
                                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-100 w-full sm:w-48"
                                    />
                                </div>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-100 bg-white"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="monitoring">Monitoring</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {paginatedRecords.map((record) => (
                                <div key={record.id} className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 rounded-lg bg-primary-100 text-white flex items-center justify-center font-bold">
                                                    {record.student.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{record.student}</h3>
                                                    <p className="text-xs text-gray-500">{record.grade}</p>
                                                </div>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    record.status === "Active" ? "bg-green-100 text-green-700" :
                                                    record.status === "Monitoring" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"
                                                }`}>
                                                    {record.status}
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                                                <div className="text-sm">
                                                    <span className="text-gray-500">Sessions:</span>
                                                    <span className="font-bold text-gray-900 ml-1">{record.totalSessions}</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="text-gray-500">Notes:</span>
                                                    <span className="font-bold text-gray-900 ml-1">{record.notes}</span>
                                                </div>
                                                <div className="text-sm col-span-2 sm:col-span-1">
                                                    <span className="text-gray-500">Last:</span>
                                                    <span className="font-bold text-gray-900 ml-1">{record.lastSession}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {record.concerns.map((concern, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                                                        {concern}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex sm:flex-col gap-2">
                                            <button
                                                onClick={() => handleViewRecord(record.id, record.student)}
                                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                                title="View Record"
                                            >
                                                <IoEyeOutline className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleAddNote(record.student)}
                                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                                title="Add Note"
                                            >
                                                <IoAddOutline className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEditRecord(record.id, record.student)}
                                                className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                                                title="Edit Record"
                                            >
                                                <IoPencilOutline className="w-4 h-4" />
                                            </button>
                                            {record.status !== "Archived" && (
                                                <button
                                                    onClick={() => handleArchiveRecord(record.id, record.student)}
                                                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                                    title="Archive"
                                                >
                                                    <IoArchiveOutline className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredRecords.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p>No records found matching your criteria.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredRecords.length > 0 && (
                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Show</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                        className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-100 bg-white"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </select>
                                    <span className="text-sm text-gray-600">
                                        per page • Showing {startIndex + 1}-{Math.min(endIndex, filteredRecords.length)} of {filteredRecords.length}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <IoChevronBackOutline className="w-4 h-4" />
                                    </button>
                                    
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                                    currentPage === page
                                                        ? "bg-primary-100 text-white"
                                                        : "border border-gray-200 hover:bg-gray-50"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <IoChevronForwardOutline className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Privacy Notice */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                        <div className="flex items-center gap-2 mb-3">
                            <IoLockClosedOutline className="w-5 h-5 text-amber-600" />
                            <h3 className="font-bold text-gray-900">Privacy & Security</h3>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            All counseling records are confidential and protected under FERPA regulations. Access is restricted to authorized personnel only.
                        </p>
                    </div>

                    {/* Record Categories */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Record Categories</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                                <span className="text-sm font-bold text-blue-900">Session Notes</span>
                                <span className="text-xs text-blue-600">32</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                                <span className="text-sm font-bold text-purple-900">Assessments</span>
                                <span className="text-xs text-purple-600">18</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                                <span className="text-sm font-bold text-green-900">Action Plans</span>
                                <span className="text-xs text-green-600">24</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                                <span className="text-sm font-bold text-amber-900">Follow-ups</span>
                                <span className="text-xs text-amber-600">15</span>
                            </div>
                        </div>
                    </div>

                    {/* Best Practices */}
                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-6 text-white shadow-lg shadow-primary-100/20">
                        <h3 className="text-lg font-bold mb-4">Best Practices</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-primary-200">•</span>
                                <span>Document sessions within 24 hours</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary-200">•</span>
                                <span>Use objective, factual language</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary-200">•</span>
                                <span>Review records before sessions</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Add Note Modal */}
            {showAddNoteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Add Note - {selectedStudent}</h2>
                            <button 
                                onClick={() => setShowAddNoteModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <IoCloseOutline className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmitNote} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Note Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={newNote.category}
                                    onChange={(e) => setNewNote({...newNote, category: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                    required
                                >
                                    <option value="Session Note">Session Note</option>
                                    <option value="Assessment">Assessment</option>
                                    <option value="Action Plan">Action Plan</option>
                                    <option value="Follow-up">Follow-up</option>
                                    <option value="Parent Contact">Parent Contact</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                    placeholder="Brief title for this note"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Note Content <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={newNote.content}
                                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 resize-none"
                                    rows={8}
                                    placeholder="Document session details, observations, interventions, and follow-up actions..."
                                    required
                                />
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <div className="flex items-start gap-2">
                                    <IoLockClosedOutline className="w-5 h-5 text-amber-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-amber-900">Confidential Record</p>
                                        <p className="text-xs text-amber-700 mt-1">This note will be stored securely and is only accessible to authorized counseling staff.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddNoteModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors"
                                >
                                    Save Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CounselingRecords;
