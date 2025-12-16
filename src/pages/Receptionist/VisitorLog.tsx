import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoCloseCircleOutline,
    IoEnterOutline,
    IoExitOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoIdCardOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoTimeOutline
} from "react-icons/io5";

interface Visitor {
  id: string;
  name: string;
  host: string;
  purpose: string;
  checkInTime: string;
  checkOutTime: string | null;
  badgeNumber: string;
  status: "Active" | "Checked Out" | "Pre-registered";
  contact: string;
  type: "Guest" | "Vendor" | "Parent" | "Official";
}

const VisitorLog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  // Mock Data
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: "VIS-001",
      name: "Alice Johnson",
      host: "Dr. Smith (Dean)",
      purpose: "Official Meeting",
      checkInTime: "09:15 AM",
      checkOutTime: null,
      badgeNumber: "BADGE-101",
      status: "Active",
      contact: "555-0101",
      type: "Official",
    },
    {
      id: "VIS-002",
      name: "Bob Williams",
      host: "Maintenance Dept",
      purpose: "AC Repair",
      checkInTime: "08:30 AM",
      checkOutTime: "10:45 AM",
      badgeNumber: "BADGE-102",
      status: "Checked Out",
      contact: "555-0102",
      type: "Vendor",
    },
    {
      id: "VIS-003",
      name: "Carol Davis",
      host: "Registrar Office",
      purpose: "Student Admission",
      checkInTime: "11:00 AM",
      checkOutTime: null,
      badgeNumber: "BADGE-103",
      status: "Active",
      contact: "555-0103",
      type: "Parent",
    },
    {
      id: "VIS-004",
      name: "David Brown",
      host: "HR Department",
      purpose: "Interview",
      checkInTime: "10:00 AM",
      checkOutTime: null,
      badgeNumber: "BADGE-104",
      status: "Pre-registered",
      contact: "555-0104",
      type: "Guest",
    },
  ]);

  const [newVisitor, setNewVisitor] = useState<Partial<Visitor>>({
    name: "",
    host: "",
    purpose: "",
    badgeNumber: "",
    contact: "",
    type: "Guest",
  });

  const handleCheckIn = () => {
    if (!newVisitor.name || !newVisitor.host) return;

    const visitor: Visitor = {
      id: `VIS-${Date.now()}`,
      name: newVisitor.name!,
      host: newVisitor.host!,
      purpose: newVisitor.purpose || "Visit",
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      checkOutTime: null,
      badgeNumber: newVisitor.badgeNumber || `BADGE-${Math.floor(Math.random() * 1000)}`,
      status: "Active",
      contact: newVisitor.contact || "",
      type: newVisitor.type as any || "Guest",
    };

    setVisitors([visitor, ...visitors]);
    setShowCheckInModal(false);
    setNewVisitor({ name: "", host: "", purpose: "", badgeNumber: "", contact: "", type: "Guest" });
  };

  const handleCheckOut = (id: string) => {
    setVisitors(visitors.map(v => 
      v.id === id 
        ? { ...v, status: "Checked Out", checkOutTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } 
        : v
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200";
      case "Checked Out": return "bg-gray-100 text-gray-600 border-gray-200";
      case "Pre-registered": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredVisitors = visitors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || v.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Visitors Today", value: visitors.length, icon: <IoPersonOutline />, color: "bg-blue-500" },
    { label: "Currently On Campus", value: visitors.filter(v => v.status === "Active").length, icon: <IoEnterOutline />, color: "bg-green-500" },
    { label: "Checked Out", value: visitors.filter(v => v.status === "Checked Out").length, icon: <IoExitOutline />, color: "bg-gray-500" },
    { label: "Pre-registered", value: visitors.filter(v => v.status === "Pre-registered").length, icon: <IoCalendarOutline />, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Visitor Log</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Track and manage campus visitors, guests, and vendors
            </p>
          </div>
          <button
            onClick={() => setShowCheckInModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-100 transition-all duration-300 transform hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>Log Visitor</span>
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
              placeholder="Search by name or badge #..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 min-w-max">
              <IoFilterOutline className="w-4 h-4" />
              <span className="text-sm font-medium">Filter Status:</span>
            </div>
            {["all", "Active", "Checked Out", "Pre-registered"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filterStatus === status
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visitor List */}
      <div className="space-y-4">
        {filteredVisitors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <IoPersonOutline className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No visitors found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            {/* Mobile View - Cards */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {filteredVisitors.map((visitor) => (
                <div key={visitor.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-white font-bold">
                        {visitor.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{visitor.name}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <IoIdCardOutline className="w-3 h-3" /> {visitor.badgeNumber}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(visitor.status)}`}>
                      {visitor.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Visiting</span>
                      <span className="font-medium text-gray-900">{visitor.host}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Purpose</span>
                      <span className="font-medium text-gray-900">{visitor.purpose}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Check In</span>
                      <span className="font-medium text-gray-900 flex items-center gap-1">
                        <IoTimeOutline className="w-3 h-3" /> {visitor.checkInTime}
                      </span>
                    </div>
                     <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Type</span>
                      <span className="font-medium text-gray-900">{visitor.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:text-primary-50 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-2">
                       <IoEyeOutline /> View
                    </button>
                    {visitor.status === "Active" && (
                         <button 
                            onClick={() => handleCheckOut(visitor.id)}
                            className="flex-1 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                         >
                            <IoExitOutline /> Check Out
                        </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Visitor</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Host & Purpose</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredVisitors.map((visitor) => (
                    <tr key={visitor.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-white font-bold text-sm">
                            {visitor.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{visitor.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                {visitor.type} • {visitor.badgeNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">{visitor.host}</div>
                        <div className="text-xs text-gray-500">{visitor.purpose}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-900 bg-green-50 px-2 py-0.5 rounded w-fit flex items-center gap-1">
                                <IoEnterOutline className="text-green-600" /> {visitor.checkInTime}
                            </div>
                            {visitor.checkOutTime && (
                                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded w-fit flex items-center gap-1">
                                    <IoExitOutline /> {visitor.checkOutTime}
                                </div>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(visitor.status)}`}>
                          {visitor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors">
                            <IoEyeOutline className="w-5 h-5" />
                          </button>
                            {visitor.status === "Active" && (
                                <button 
                                    onClick={() => handleCheckOut(visitor.id)}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Check Out"
                                >
                                    <IoExitOutline className="w-5 h-5" />
                                </button>
                            )}
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

      {/* Check In Modal */}
      {showCheckInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Log New Visitor</h2>
                <p className="text-sm text-gray-500">Enter visitor details for check-in</p>
              </div>
              <button
                onClick={() => setShowCheckInModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoCloseCircleOutline className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newVisitor.name}
                  onChange={(e) => setNewVisitor({...newVisitor, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="Full Name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Badge Number</label>
                    <input
                      type="text"
                      value={newVisitor.badgeNumber}
                      onChange={(e) => setNewVisitor({...newVisitor, badgeNumber: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                      placeholder="Optional"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Type</label>
                    <select
                      value={newVisitor.type}
                      onChange={(e) => setNewVisitor({...newVisitor, type: e.target.value as any})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none bg-white"
                    >
                        <option value="Guest">Guest</option>
                        <option value="Vendor">Vendor</option>
                        <option value="Parent">Parent</option>
                        <option value="Official">Official</option>
                    </select>
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visiting (Host) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newVisitor.host}
                  onChange={(e) => setNewVisitor({...newVisitor, host: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="Department or Person"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Visit</label>
                <input
                  type="text"
                  value={newVisitor.purpose}
                  onChange={(e) => setNewVisitor({...newVisitor, purpose: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="e.g. Meeting, Delivery"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  value={newVisitor.contact}
                  onChange={(e) => setNewVisitor({...newVisitor, contact: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
              <button
                onClick={() => setShowCheckInModal(false)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckIn}
                disabled={!newVisitor.name || !newVisitor.host}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-50 hover:bg-primary-100 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check In Visitor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorLog;
