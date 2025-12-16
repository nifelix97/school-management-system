import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoCloseCircleOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";

interface Appointment {
  id: string;
  visitorName: string;
  hostName: string;
  hostDept: string;
  date: string;
  time: string;
  purpose: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  type: "In-Person" | "Online";
}

const Appointments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);

  // Mock Data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "APT-001",
      visitorName: "Robert Fox",
      hostName: "Dr. Smith",
      hostDept: "Science Dept",
      date: "2024-05-20",
      time: "10:00 AM",
      purpose: "Lab Equipment Demo",
      status: "Scheduled",
      type: "In-Person",
    },
    {
      id: "APT-002",
      visitorName: "Jenny Wilson",
      hostName: "Mrs. Davis",
      hostDept: "HR",
      date: "2024-05-20",
      time: "02:30 PM",
      purpose: "Job Interview",
      status: "Scheduled",
      type: "In-Person",
    },
    {
      id: "APT-003",
      visitorName: "Guy Hawkins",
      hostName: "Mr. Johnson",
      hostDept: "Administration",
      date: "2024-05-19",
      time: "11:15 AM",
      purpose: "Policy Review",
      status: "Completed",
      type: "Online",
    },
    {
      id: "APT-004",
      visitorName: "Kristin Watson",
      hostName: "Principal",
      hostDept: "Management",
      date: "2024-05-21",
      time: "09:00 AM",
      purpose: "Parent Meeting",
      status: "Cancelled",
      type: "In-Person",
    },
  ]);

  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    visitorName: "",
    hostName: "",
    date: "",
    time: "",
    purpose: "",
    status: "Scheduled",
    type: "In-Person",
  });

  const handleCreateAppointment = () => {
    if (!newAppointment.visitorName || !newAppointment.hostName || !newAppointment.date) return;

    const appointment: Appointment = {
      id: `APT-${Date.now()}`,
      visitorName: newAppointment.visitorName!,
      hostName: newAppointment.hostName!,
      hostDept: "General", // Default for mock
      date: newAppointment.date!,
      time: newAppointment.time || "09:00 AM",
      purpose: newAppointment.purpose || "Meeting",
      status: "Scheduled",
      type: newAppointment.type as any,
    };

    setAppointments([appointment, ...appointments]);
    setShowModal(false);
    setNewAppointment({
      visitorName: "",
      hostName: "",
      date: "",
      time: "",
      purpose: "",
      status: "Scheduled",
      type: "In-Person",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Completed": return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = a.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.hostName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || a.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Appointments", value: appointments.length, icon: <IoCalendarOutline />, color: "bg-blue-500" },
    { label: "Today's Schedule", value: appointments.filter(a => a.date === "2024-05-20").length, icon: <IoTimeOutline />, color: "bg-green-500" },
    { label: "Pending", value: appointments.filter(a => a.status === "Scheduled").length, icon: <IoPersonOutline />, color: "bg-purple-500" },
    { label: "Cancelled", value: appointments.filter(a => a.status === "Cancelled").length, icon: <IoCloseCircleOutline />, color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Appointments</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Schedule and manage campus visits and meetings
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-xl font-semibold shadow-lg hover:bg-primary-100 transition-all duration-300 transform hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>Book Appointment</span>
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
              placeholder="Search visitor or host..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
             <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 min-w-max">
              <IoFilterOutline className="w-4 h-4" />
              <span className="text-sm font-medium">Status:</span>
            </div>
            {["all", "Scheduled", "Completed", "Cancelled"].map((status) => (
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

      {/* Appointment List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <IoCalendarOutline className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No appointments found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            {/* Mobile View - Cards */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {filteredAppointments.map((apt) => (
                <div key={apt.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 font-bold text-center min-w-[3.5rem]">
                        <span className="block text-xs uppercase">{new Date(apt.date).toLocaleString('default', { month: 'short' })}</span>
                        <span className="block text-xl">{new Date(apt.date).getDate()}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{apt.visitorName}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            {apt.time} • {apt.type}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Meeting With</span>
                      <span className="font-medium text-gray-900">{apt.hostName}</span>
                    </div>
                     <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="block text-xs text-gray-500 mb-1">Purpose</span>
                      <span className="font-medium text-gray-900">{apt.purpose}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                     <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <IoTrashOutline className="w-5 h-5" />
                     </button>
                     <button className="text-sm font-medium text-primary-50 hover:text-primary-100 bg-primary-50/10 px-4 py-2 rounded-lg transition-colors">
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
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Visitor</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Host (Staff)</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 text-blue-600 rounded-lg p-2 text-center text-xs font-bold">
                                <div>{new Date(apt.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                                <div className="text-lg">{new Date(apt.date).getDate()}</div>
                            </div>
                            <div className="text-sm text-gray-900 font-medium">{apt.time}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{apt.visitorName}</div>
                        <div className="text-xs text-gray-500">{apt.type}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{apt.hostName}</div>
                        <div className="text-xs text-gray-500">{apt.hostDept}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{apt.purpose}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors">
                            <IoEyeOutline className="w-5 h-5" />
                          </button>
                           <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <IoTrashOutline className="w-5 h-5" />
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

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
                <p className="text-sm text-gray-500">Schedule a new visit</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newAppointment.visitorName}
                  onChange={(e) => setNewAppointment({...newAppointment, visitorName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="Full Name"
                />
              </div>

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting With (Host) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newAppointment.hostName}
                  onChange={(e) => setNewAppointment({...newAppointment, hostName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                  placeholder="Staff Name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                    />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value as any})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none bg-white"
                    >
                        <option value="In-Person">In-Person</option>
                        <option value="Online">Online</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                    <input
                      type="text"
                      value={newAppointment.purpose}
                      onChange={(e) => setNewAppointment({...newAppointment, purpose: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none"
                      placeholder="e.g. Interview"
                    />
                  </div>
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
                onClick={handleCreateAppointment}
                disabled={!newAppointment.visitorName || !newAppointment.hostName || !newAppointment.date}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-50 hover:bg-primary-100 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
