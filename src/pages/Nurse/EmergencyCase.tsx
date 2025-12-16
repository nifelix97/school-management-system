import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoEllipsisVerticalOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoLocationOutline,
    IoMedkitOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoWarningOutline,
} from "react-icons/io5";

interface EmergencyCase {
  id: string;
  studentName: string;
  studentId: string;
  type: string;
  severity: "Critical" | "Moderate" | "Mild";
  location: string;
  timeReported: string;
  status: "Active" | "Resolved" | "Transported";
  description: string;
}

const EmergencyCase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [emergencyCases, setEmergencyCases] = useState<EmergencyCase[]>([
    {
      id: "EMG-001",
      studentName: "John Doe",
      studentId: "STU-2024-101",
      type: "Severe Allergic Reaction",
      severity: "Critical",
      location: "Cafeteria",
      timeReported: "10:15 AM",
      status: "Transported",
      description: "Student ingested peanuts, causing anaphylaxis.",
    },
    {
      id: "EMG-002",
      studentName: "Jane Smith",
      studentId: "STU-2024-102",
      type: "Fainting Spell",
      severity: "Moderate",
      location: "Assembly Hall",
      timeReported: "09:30 AM",
      status: "Resolved",
      description: "Student fainted during assembly due to dehydration.",
    },
    {
      id: "EMG-003",
      studentName: "Mike Ross",
      studentId: "STU-2024-103",
      type: "Sports Injury",
      severity: "Moderate",
      location: "Basketball Court",
      timeReported: "11:45 AM",
      status: "Active",
      description: "Sprained ankle during PE class.",
    },
    {
      id: "EMG-004",
      studentName: "Sarah Connor",
      studentId: "STU-2024-104",
      type: "Minor Cut",
      severity: "Mild",
      location: "Art Room",
      timeReported: "01:20 PM",
      status: "Resolved",
      description: "Cut finger with paper cutter.",
    },
    {
      id: "EMG-005",
      studentName: "Bruce Wayne",
      studentId: "STU-2024-105",
      type: "Asthma Attack",
      severity: "Critical",
      location: "Playground",
      timeReported: "02:10 PM",
      status: "Active",
      description: "Difficulty breathing after running.",
    },
  ]);

  const [newCase, setNewCase] = useState<Partial<EmergencyCase>>({
    studentName: "",
    studentId: "",
    type: "",
    severity: "Moderate",
    location: "",
    status: "Active",
    description: "",
  });

  const handleReportEmergency = () => {
    if (!newCase.studentName || !newCase.type || !newCase.location) return;

    const emergency: EmergencyCase = {
      id: `EMG-${Date.now()}`,
      studentName: newCase.studentName!,
      studentId: newCase.studentId || "Unknown",
      type: newCase.type!,
      severity: newCase.severity as any,
      location: newCase.location!,
      timeReported: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: newCase.status as any,
      description: newCase.description || "",
    };

    setEmergencyCases([emergency, ...emergencyCases]);
    setShowAddModal(false);
    setNewCase({
      studentName: "",
      studentId: "",
      type: "",
      severity: "Moderate",
      location: "",
      status: "Active",
      description: "",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "Moderate":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Mild":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-red-50 text-red-600 border-red-100";
      case "Resolved":
        return "bg-green-50 text-green-600 border-green-100";
      case "Transported":
        return "bg-purple-50 text-purple-600 border-purple-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const filteredCases = emergencyCases.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === "all" || item.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const stats = [
    { label: "Active Emergencies", value: emergencyCases.filter(c => c.status === "Active").length, icon: <IoWarningOutline />, color: "bg-red-500" },
    { label: "Critical Cases", value: emergencyCases.filter(c => c.severity === "Critical").length, icon: <IoAlertCircleOutline />, color: "bg-red-600" },
    { label: "Transported", value: emergencyCases.filter(c => c.status === "Transported").length, icon: <IoMedkitOutline />, color: "bg-purple-500" },
    { label: "Resolved Today", value: emergencyCases.filter(c => c.status === "Resolved").length, icon: <IoCheckmarkCircleOutline />, color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Emergency Cases</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Real-time emergency incident tracking and management
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>Report Emergency</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-50">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-50/60 font-medium">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
            <input
              type="text"
              placeholder="Search by student or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <IoFilterOutline className="w-5 h-5 text-primary-50/60" />
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
            >
              <option value="all">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="Moderate">Moderate</option>
              <option value="Mild">Mild</option>
            </select>
          </div>
        </div>
      </div>

      {/* Emergency List - Responsive View */}
      <div className="space-y-4">
        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Type & Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Location & Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCases.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold">
                        {item.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-primary-50">{item.studentName}</div>
                        <div className="text-xs text-primary-50/60">{item.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-primary-50">{item.type}</div>
                    <div className="text-xs text-primary-50/60 truncate max-w-xs">{item.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(item.severity)}`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                       <div className="flex items-center gap-2 text-sm text-primary-50/80">
                         <IoLocationOutline className="w-4 h-4 text-primary-100" />
                         {item.location}
                       </div>
                       <div className="flex items-center gap-2 text-xs text-primary-50/60">
                         <IoTimeOutline className="w-3.5 h-3.5" />
                         {item.timeReported}
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="View Details">
                      <IoEyeOutline className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredCases.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold text-lg">
                    {item.studentName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-primary-50">{item.studentName}</div>
                    <div className="text-xs text-primary-50/60">{item.studentId}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                     <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50/60" />
                   </button>
                   <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getSeverityColor(item.severity)}`}>
                      {item.severity}
                   </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                <div className="font-semibold text-primary-50 mb-1">{item.type}</div>
                <div className="text-sm text-primary-50/70 mb-3">{item.description}</div>
                
                <div className="flex items-center gap-4 text-xs text-primary-50/60">
                   <div className="flex items-center gap-1">
                     <IoLocationOutline className="w-3.5 h-3.5" />
                     {item.location}
                   </div>
                   <div className="flex items-center gap-1">
                     <IoTimeOutline className="w-3.5 h-3.5" />
                     {item.timeReported}
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                 <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                    {item.status}
                 </span>
                 <button className="flex items-center gap-1 text-sm font-medium text-primary-50 hover:underline">
                   View Details
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-[scaleIn_0.2s_ease-out] overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <IoWarningOutline className="w-7 h-7" />
              Report Emergency
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Student Name</label>
                  <input
                    type="text"
                    value={newCase.studentName}
                    onChange={(e) => setNewCase({ ...newCase, studentName: e.target.value })}
                    placeholder="Enter student name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Student ID</label>
                  <input
                    type="text"
                    value={newCase.studentId}
                    onChange={(e) => setNewCase({ ...newCase, studentId: e.target.value })}
                    placeholder="e.g. STU-2024-101"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Emergency Type</label>
                  <input
                    type="text"
                    value={newCase.type}
                    onChange={(e) => setNewCase({ ...newCase, type: e.target.value })}
                    placeholder="e.g. Allergic Reaction"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Location</label>
                  <div className="relative">
                    <IoLocationOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={newCase.location}
                      onChange={(e) => setNewCase({ ...newCase, location: e.target.value })}
                      placeholder="Where did it happen?"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Severity</label>
                  <select
                    value={newCase.severity}
                    onChange={(e) => setNewCase({ ...newCase, severity: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
                  >
                    <option value="Critical">Critical</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Mild">Mild</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Initial Status</label>
                  <select
                    value={newCase.status}
                    onChange={(e) => setNewCase({ ...newCase, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Transported">Transported</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Description</label>
                  <textarea
                    value={newCase.description}
                    onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                    placeholder="Describe the incident..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 text-primary-50 font-semibold hover:bg-gray-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReportEmergency}
                className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 flex items-center gap-2"
              >
                <IoWarningOutline className="w-5 h-5" />
                Submit and Alert
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmergencyCase;
