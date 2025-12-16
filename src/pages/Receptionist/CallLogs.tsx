import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoArrowRedoOutline,
    IoArrowUndoOutline,
    IoCall,
    IoCallOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoPersonOutline,
    IoPhonePortraitOutline,
    IoSearchOutline,
    IoTimeOutline,
} from "react-icons/io5";

interface CallLog {
  id: string;
  callerName: string;
  phoneNumber: string;
  type: "Incoming" | "Outgoing" | "Missed";
  timestamp: string;
  duration: string;
  purpose: string;
  status: "Completed" | "No Answer" | "Follow-up Required";
  handledBy: string;
}

const CallLogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showLogModal, setShowLogModal] = useState(false);

  // Mock Data
  const [calls, setCalls] = useState<CallLog[]>([
    {
      id: "CALL-001",
      callerName: "John Smith (Parent)",
      phoneNumber: "(555) 123-4567",
      type: "Incoming",
      timestamp: "09:15 AM",
      duration: "4m 30s",
      purpose: "Tuition Inquiry",
      status: "Completed",
      handledBy: "Sarah J.",
    },
    {
      id: "CALL-002",
      callerName: "City Supplies Ltd",
      phoneNumber: "(555) 987-6543",
      type: "Missed",
      timestamp: "10:00 AM",
      duration: "-",
      purpose: "Unknown",
      status: "Follow-up Required",
      handledBy: "-",
    },
    {
      id: "CALL-003",
      callerName: "Dr. Emily White",
      phoneNumber: "(555) 456-7890",
      type: "Outgoing",
      timestamp: "11:30 AM",
      duration: "2m 15s",
      purpose: "Appointment Confirmation",
      status: "Completed",
      handledBy: "Sarah J.",
    },
    {
      id: "CALL-004",
      callerName: "Mark Johnson",
      phoneNumber: "(555) 222-3333",
      type: "Incoming",
      timestamp: "01:45 PM",
      duration: "1m 00s",
      purpose: "General Inquiry",
      status: "Completed",
      handledBy: "Mike R.",
    },
  ]);

  const [newCall, setNewCall] = useState<Partial<CallLog>>({
    callerName: "",
    phoneNumber: "",
    type: "Incoming",
    purpose: "",
    status: "Completed",
    duration: "",
  });

  const handleLogCall = () => {
    if (!newCall.callerName || !newCall.phoneNumber) return;

    const call: CallLog = {
      id: `CALL-${Date.now()}`,
      callerName: newCall.callerName!,
      phoneNumber: newCall.phoneNumber!,
      type: newCall.type as any,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: newCall.duration || "-",
      purpose: newCall.purpose || "General",
      status: newCall.status as any,
      handledBy: "Sarah J.", // Mock current user
    };

    setCalls([call, ...calls]);
    setShowLogModal(false);
    setNewCall({ callerName: "", phoneNumber: "", type: "Incoming", purpose: "", status: "Completed", duration: "" });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Incoming": return <IoArrowUndoOutline className="rotate-45" />;
      case "Outgoing": return <IoArrowRedoOutline className="-rotate-45" />;
      case "Missed": return <IoCloseCircleOutline />;
      default: return <IoCallOutline />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Incoming": return "text-green-600 bg-green-50 border-green-100";
      case "Outgoing": return "text-blue-600 bg-blue-50 border-blue-100";
      case "Missed": return "text-red-600 bg-red-50 border-red-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700 border-green-200";
      case "Follow-up Required": return "bg-amber-100 text-amber-700 border-amber-200";
      case "No Answer": return "bg-gray-100 text-gray-600 border-gray-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredCalls = calls.filter(c => {
    const matchesSearch = c.callerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.phoneNumber.includes(searchQuery);
    const matchesFilter = filterType === "all" || c.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Calls Today", value: calls.length, icon: <IoCall />, color: "bg-blue-500" },
    { label: "Missed Calls", value: calls.filter(c => c.type === "Missed").length, icon: <IoAlertCircleOutline />, color: "bg-red-500" },
    { label: "Completed", value: calls.filter(c => c.status === "Completed").length, icon: <IoCheckmarkCircleOutline />, color: "bg-green-500" },
    { label: "Follow-up Pending", value: calls.filter(c => c.status === "Follow-up Required").length, icon: <IoTimeOutline />, color: "bg-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Call Logs</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Track incoming, outgoing, and missed calls
            </p>
          </div>
          <button
            onClick={() => setShowLogModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-100 transition-all duration-300 transform hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>Log New Call</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color} text-white shadow-md`}>
                <div className="w-6 h-6">{stat.icon}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 sticky top-0 z-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 min-w-max">
              <IoFilterOutline className="w-4 h-4" />
              <span className="text-sm font-medium">Filter Type:</span>
            </div>
            {["all", "Incoming", "Outgoing", "Missed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filterType === type
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Call List */}
      <div className="space-y-4">
        {filteredCalls.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <IoCallOutline className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No calls found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            {/* Mobile View - Cards */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {filteredCalls.map((call) => (
                <div key={call.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getTypeColor(call.type)}`}>
                        {getTypeIcon(call.type)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{call.callerName}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <IoPhonePortraitOutline className="w-3 h-3" /> {call.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(call.status)}`}>
                      {call.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Purpose</span>
                      <span className="font-medium text-gray-900">{call.purpose}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Duration</span>
                      <span className="font-medium text-gray-900">{call.duration}</span>
                    </div>
                     <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Time</span>
                      <span className="font-medium text-gray-900 flex items-center gap-1">
                        <IoTimeOutline className="w-3 h-3" /> {call.timestamp}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Handled By</span>
                      <span className="font-medium text-gray-900">{call.handledBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Caller</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCalls.map((call) => (
                    <tr key={call.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                             <IoPersonOutline />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{call.callerName}</div>
                            <div className="text-xs text-gray-500">{call.phoneNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <span className={`p-1.5 rounded-full border ${getTypeColor(call.type)}`}>
                                {getTypeIcon(call.type)}
                            </span>
                            <span className="text-sm text-gray-600">{call.timestamp}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{call.purpose}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{call.duration}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(call.status)}`}>
                          {call.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors">
                            <IoEyeOutline className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Log Call Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Log Call</h2>
                <p className="text-sm text-gray-500">Record call details</p>
              </div>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoCloseCircleOutline className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Call Type</label>
                    <select
                      value={newCall.type}
                      onChange={(e) => setNewCall({...newCall, type: e.target.value as any})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none bg-white"
                    >
                        <option value="Incoming">Incoming</option>
                        <option value="Outgoing">Outgoing</option>
                        <option value="Missed">Missed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newCall.status}
                      onChange={(e) => setNewCall({...newCall, status: e.target.value as any})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none bg-white"
                    >
                        <option value="Completed">Completed</option>
                        <option value="No Answer">No Answer</option>
                        <option value="Follow-up Required">Follow-up Required</option>
                    </select>
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caller Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newCall.callerName}
                  onChange={(e) => setNewCall({...newCall, callerName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="Name of caller"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  value={newCall.phoneNumber}
                  onChange={(e) => setNewCall({...newCall, phoneNumber: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="(555) 000-0000"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Call</label>
                <input
                  type="text"
                  value={newCall.purpose}
                  onChange={(e) => setNewCall({...newCall, purpose: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="e.g. Scheduling Appointment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={newCall.duration}
                  onChange={(e) => setNewCall({...newCall, duration: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="e.g. 5m 30s (Optional)"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
              <button
                onClick={() => setShowLogModal(false)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogCall}
                disabled={!newCall.callerName || !newCall.phoneNumber}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-50 hover:bg-primary-100 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallLogs;
