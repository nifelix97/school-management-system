import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCallOutline,
    IoChatbubbleEllipsesOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoMailOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoWalkOutline
} from "react-icons/io5";

interface Enquiry {
  id: string;
  subject: string;
  source: "Phone" | "Email" | "Walk-in";
  contactName: string;
  contactInfo: string;
  date: string;
  priority: "High" | "Medium" | "Low";
  status: "New" | "In Progress" | "Resolved";
  assignedTo: string;
}

const Enquiries: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);

  // Mock Data
  const [enquiries, setEnquiries] = useState<Enquiry[]>([
    {
      id: "ENQ-001",
      subject: "Admission Process for Grade 1",
      source: "Phone",
      contactName: "Mrs. Sarah Connor",
      contactInfo: "555-0123",
      date: "2024-05-15",
      priority: "High",
      status: "New",
      assignedTo: "Admissions",
    },
    {
      id: "ENQ-002",
      subject: "Fee Structure Inquiry",
      source: "Email",
      contactName: "John Doe",
      contactInfo: "john.doe@email.com",
      date: "2024-05-14",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Finance",
    },
    {
      id: "ENQ-003",
      subject: "Bus Route Availability",
      source: "Walk-in",
      contactName: "Mike Ross",
      contactInfo: "On Campus",
      date: "2024-05-14",
      priority: "Low",
      status: "Resolved",
      assignedTo: "Transport",
    },
    {
      id: "ENQ-004",
      subject: "Hostel Facilities",
      source: "Email",
      contactName: "Emily Blunt",
      contactInfo: "emily.b@email.com",
      date: "2024-05-13",
      priority: "Medium",
      status: "New",
      assignedTo: "Warden",
    },
  ]);

  const [newEnquiry, setNewEnquiry] = useState<Partial<Enquiry>>({
    subject: "",
    source: "Phone",
    contactName: "",
    contactInfo: "",
    priority: "Medium",
    status: "New",
    assignedTo: "",
  });

  const handleCreateEnquiry = () => {
    if (!newEnquiry.subject || !newEnquiry.contactName) return;

    const enquiry: Enquiry = {
      id: `ENQ-${Date.now()}`,
      subject: newEnquiry.subject!,
      source: newEnquiry.source as any,
      contactName: newEnquiry.contactName!,
      contactInfo: newEnquiry.contactInfo || "N/A",
      date: new Date().toISOString().split('T')[0],
      priority: newEnquiry.priority as any,
      status: newEnquiry.status as any,
      assignedTo: newEnquiry.assignedTo || "Front Desk",
    };

    setEnquiries([enquiry, ...enquiries]);
    setShowModal(false);
    setNewEnquiry({
      subject: "",
      source: "Phone",
      contactName: "",
      contactInfo: "",
      priority: "Medium",
      status: "New",
      assignedTo: "",
    });
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Email": return <IoMailOutline />;
      case "Phone": return <IoCallOutline />;
      case "Walk-in": return <IoWalkOutline />;
      default: return <IoChatbubbleEllipsesOutline />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-50 border-red-100";
      case "Medium": return "text-amber-600 bg-amber-50 border-amber-100";
      case "Low": return "text-blue-600 bg-blue-50 border-blue-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-700 border-blue-200";
      case "In Progress": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Resolved": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || e.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Enquiries", value: enquiries.length, icon: <IoChatbubbleEllipsesOutline />, color: "bg-purple-500" },
    { label: "Pending Actions", value: enquiries.filter(e => e.status !== "Resolved").length, icon: <IoTimeOutline />, color: "bg-amber-500" },
    { label: "High Priority", value: enquiries.filter(e => e.priority === "High").length, icon: <IoAlertCircleOutline />, color: "bg-red-500" },
    { label: "Resolved Today", value: enquiries.filter(e => e.status === "Resolved").length, icon: <IoCheckmarkCircleOutline />, color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Enquiries</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage admission, general, and administrative inquiries
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-100 transition-all duration-300 transform hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>New Enquiry</span>
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
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 sticky top-0 z-10 w-full">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1 relative w-full">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by subject or name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto mt-2 sm:mt-0">
             <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 min-w-max">
              <IoFilterOutline className="w-4 h-4" />
              <span className="text-sm font-medium">Status:</span>
            </div>
            {["all", "New", "In Progress", "Resolved"].map((status) => (
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

      {/* Enquiry List */}
      <div className="space-y-4">
        {filteredEnquiries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <IoChatbubbleEllipsesOutline className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No enquiries found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            {/* Mobile View - Cards */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {filteredEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200`}>
                        {getSourceIcon(enquiry.source)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 line-clamp-1">{enquiry.subject}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            {enquiry.contactName} • {enquiry.date}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(enquiry.status)}`}>
                      {enquiry.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Contact Info</span>
                      <span className="font-medium text-gray-900 truncate">{enquiry.contactInfo}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Assigned To</span>
                      <span className="font-medium text-gray-900">{enquiry.assignedTo}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                     <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(enquiry.priority)}`}>
                        {enquiry.priority} Priority
                     </span>
                     <button className="text-sm font-medium text-primary-50 hover:text-primary-100">
                        View Details
                     </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject & Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Source & Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Assigned To</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                         <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs shrink-0">
                             {enquiry.contactName.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 line-clamp-1">{enquiry.subject}</div>
                            <div className="text-xs text-gray-500">{enquiry.contactName} ({enquiry.contactInfo})</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            {getSourceIcon(enquiry.source)}
                            <span>{enquiry.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{enquiry.assignedTo}</div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getPriorityColor(enquiry.priority)}`}>
                            {enquiry.priority}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(enquiry.status)}`}>
                          {enquiry.status}
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

      {/* New Enquiry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">New Enquiry</h2>
                <p className="text-sm text-gray-500">Record a new inquiry</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoCloseCircleOutline className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newEnquiry.subject}
                  onChange={(e) => setNewEnquiry({...newEnquiry, subject: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="e.g. Admission Question"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      value={newEnquiry.source}
                      onChange={(e) => setNewEnquiry({...newEnquiry, source: e.target.value as any})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none bg-white"
                    >
                        <option value="Phone">Phone</option>
                        <option value="Email">Email</option>
                        <option value="Walk-in">Walk-in</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newEnquiry.priority}
                      onChange={(e) => setNewEnquiry({...newEnquiry, priority: e.target.value as any})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none bg-white"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newEnquiry.contactName}
                  onChange={(e) => setNewEnquiry({...newEnquiry, contactName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="Name of enquirer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                <input
                  type="text"
                  value={newEnquiry.contactInfo}
                  onChange={(e) => setNewEnquiry({...newEnquiry, contactInfo: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="Phone or Email"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                <input
                  type="text"
                  value={newEnquiry.assignedTo}
                  onChange={(e) => setNewEnquiry({...newEnquiry, assignedTo: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="e.g. Finance Dept"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEnquiry}
                disabled={!newEnquiry.subject || !newEnquiry.contactName}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-50 hover:bg-primary-100 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
