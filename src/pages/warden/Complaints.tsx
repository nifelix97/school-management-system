import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkDoneCircleOutline,
    IoFilterOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";

type Severity = "High" | "Medium" | "Low";
type Status = "Pending" | "In Progress" | "Resolved";
type Tags = "Maintenance" | "Noise" | "Hygiene" | "Discipline" | "Other";

interface Complaint {
  id: string;
  studentName: string;
  roomNumber: string;
  date: string;
  type: Tags;
  subject: string;
  description: string;
  severity: Severity;
  status: Status;
}

const Complaints: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterSeverity, setFilterSeverity] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Data
  const [complaints, setComplaints] = useState<Complaint[]>([
    { 
      id: "C-2024-001", 
      studentName: "John Doe", 
      roomNumber: "101 - Block A", 
      date: "2024-03-15", 
      type: "Maintenance", 
      subject: "Leaking Tap in Bathroom", 
      description: "The tap in the shared bathroom has been leaking for 2 days causing water wastage.", 
      severity: "Medium", 
      status: "Pending" 
    },
    { 
      id: "C-2024-002", 
      studentName: "Mike Smith", 
      roomNumber: "205 - Block B", 
      date: "2024-03-14", 
      type: "Discipline", 
      subject: "Loud Music Late Night", 
      description: "Neighbors in Room 206 play loud music after 11 PM regularly.", 
      severity: "High", 
      status: "In Progress" 
    },
    { 
      id: "C-2024-003", 
      studentName: "Sarah Connor", 
      roomNumber: "102 - Block A", 
      date: "2024-03-10", 
      type: "Hygiene", 
      subject: "Trash not collected", 
      description: "Corridor trash bins are overflowing and haven't been cleared.", 
      severity: "Low", 
      status: "Resolved" 
    },
  ]);

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-700 border-red-200";
      case "Medium": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Low": return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Pending": return "bg-gray-100 text-gray-700 border-gray-200";
      case "In Progress": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Resolved": return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesStatus = filterStatus === "All" || c.status === filterStatus;
    const matchesSeverity = filterSeverity === "All" || c.severity === filterSeverity;
    const matchesSearch = c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: Status) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if(confirm("Are you sure you want to delete this complaint record?")) {
        setComplaints(prev => prev.filter(c => c.id !== id));
        setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Complaints</h1>
        <p className="text-sm sm:text-base text-primary-50/70">Manage and resolve student grievances and maintenance issues</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Complaints", value: complaints.length, icon: <IoAlertCircleOutline />, color: "bg-blue-50 text-blue-600" },
          { label: "Pending", value: complaints.filter(c => c.status === "Pending").length, icon: <IoTimeOutline />, color: "bg-amber-50 text-amber-600" },
          { label: "In Progress", value: complaints.filter(c => c.status === "In Progress").length, icon: <IoCheckmarkCircleOutline />, color: "bg-purple-50 text-purple-600" },
          { label: "Resolved", value: complaints.filter(c => c.status === "Resolved").length, icon: <IoCheckmarkDoneCircleOutline />, color: "bg-green-50 text-green-600" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
             <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary-50">{stat.value}</h3>
             </div>
             <div className={`p-3 rounded-xl ${stat.color} text-xl`}>
                {stat.icon}
             </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
             <div className="relative">
                <select 
                    className="w-full sm:w-40 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none appearance-none cursor-pointer"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
                <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             </div>
             <div className="relative">
                <select 
                    className="w-full sm:w-40 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none appearance-none cursor-pointer"
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                >
                    <option value="All">All Severities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <IoAlertCircleOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             </div>
        </div>
        <div className="relative w-full md:w-64">
             <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
             <input 
                 type="text" 
                 placeholder="Search by name, subject..." 
                 className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-50/20 outline-none"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
             />
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint) => (
                <div 
                    key={complaint.id} 
                    className="group bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-50/30 transition-all cursor-pointer flex flex-col sm:flex-row gap-4 sm:items-center"
                    onClick={() => { setSelectedComplaint(complaint); setIsModalOpen(true); }}
                >
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider border ${getStatusColor(complaint.status)}`}>
                                {complaint.status}
                            </span>
                            <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider border ${getSeverityColor(complaint.severity)}`}>
                                {complaint.severity} Priority
                            </span>
                            <span className="text-xs text-gray-400 font-medium ml-auto sm:ml-0">{complaint.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-primary-50 mb-1 group-hover:text-primary-100 transition-colors">
                            {complaint.subject}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1 mb-2">{complaint.description}</p>
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                            <span>{complaint.studentName}</span>
                            <span>•</span>
                            <span>{complaint.roomNumber}</span>
                            <span>•</span>
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{complaint.type}</span>
                        </div>
                    </div>
                    <div className="hidden sm:flex text-gray-300">
                        <IoCheckmarkCircleOutline className="w-6 h-6" />
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                 <div className="bg-gray-50 p-4 rounded-full inline-block mb-3">
                    <IoSearchOutline className="w-8 h-8 text-gray-400" />
                 </div>
                 <p className="text-gray-500 font-medium">No complaints found</p>
                 <button 
                    className="mt-3 text-sm text-primary-100 font-semibold hover:underline"
                    onClick={() => { setFilterStatus("All"); setFilterSeverity("All"); setSearchQuery(""); }}
                 >
                    Clear Filters
                 </button>
            </div>
        )}
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl scale-100 animate-scale-up">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-primary-50 mb-1">Complaint Details</h2>
                        <span className="text-xs text-gray-400 uppercase font-mono">{selectedComplaint.id}</span>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex gap-2">
                             <span className={`px-2.5 py-1 text-xs font-bold rounded border ${getStatusColor(selectedComplaint.status)}`}>
                                {selectedComplaint.status}
                            </span>
                            <span className={`px-2.5 py-1 text-xs font-bold rounded border ${getSeverityColor(selectedComplaint.severity)}`}>
                                {selectedComplaint.severity} Priority
                            </span>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">{selectedComplaint.date}</span>
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{selectedComplaint.subject}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{selectedComplaint.description}</p>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
                        <div>
                            <span className="block text-gray-400 text-xs mb-1">Student Name</span>
                            <span className="font-semibold text-gray-700">{selectedComplaint.studentName}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 text-xs mb-1">Room Number</span>
                            <span className="font-semibold text-gray-700">{selectedComplaint.roomNumber}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 text-xs mb-1">Category</span>
                            <span className="font-semibold text-gray-700">{selectedComplaint.type}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        {selectedComplaint.status !== "Resolved" && (
                            <button 
                                onClick={() => handleUpdateStatus(selectedComplaint.id, "Resolved")}
                                className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                            >
                                <IoCheckmarkDoneCircleOutline />
                                Mark as Resolved
                            </button>
                        )}
                        {selectedComplaint.status === "Pending" && (
                            <button 
                                onClick={() => handleUpdateStatus(selectedComplaint.id, "In Progress")}
                                className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                            >
                                <IoTimeOutline />
                                Mark In Progress
                            </button>
                        )}
                        <button 
                            onClick={() => handleDelete(selectedComplaint.id)}
                            className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                        >
                            <IoTrashOutline />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
