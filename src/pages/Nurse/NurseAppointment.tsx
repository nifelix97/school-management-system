import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseCircleOutline,
    IoEllipsisVerticalOutline,
    IoFilterOutline,
    IoSearchOutline,
    IoTimeOutline
} from "react-icons/io5";

interface Appointment {
  id: string;
  patientName: string;
  studentId: string;
  date: string;
  time: string;
  type: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  reason: string;
  notes?: string;
}

const NurseAppointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: "1",
      patientName: "Sarah Johnson",
      studentId: "STU-2024-001",
      date: "2025-12-16",
      time: "09:00",
      type: "Routine Checkup",
      status: "scheduled",
      reason: "Annual health screening",
    },
    {
      id: "2",
      patientName: "Michael Chen",
      studentId: "STU-2024-002",
      date: "2025-12-16",
      time: "10:30",
      type: "Vaccination",
      status: "scheduled",
      reason: "Flu shot",
    },
    {
      id: "3",
      patientName: "Emily Davis",
      studentId: "STU-2024-003",
      date: "2025-12-16",
      time: "11:00",
      type: "Follow-up",
      status: "completed",
      reason: "Post-treatment checkup",
      notes: "Patient recovering well",
    },
    {
      id: "4",
      patientName: "James Wilson",
      studentId: "STU-2024-004",
      date: "2025-12-16",
      time: "14:00",
      type: "Consultation",
      status: "scheduled",
      reason: "Allergy symptoms",
    },
    {
      id: "5",
      patientName: "Lisa Anderson",
      studentId: "STU-2024-005",
      date: "2025-12-16",
      time: "15:30",
      type: "Lab Results",
      status: "scheduled",
      reason: "Blood test results review",
    },
    {
      id: "6",
      patientName: "David Brown",
      studentId: "STU-2024-006",
      date: "2025-12-15",
      time: "10:00",
      type: "Emergency",
      status: "completed",
      reason: "Sports injury",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      scheduled: "bg-blue-100 text-blue-700 border-blue-200",
      completed: "bg-green-100 text-green-700 border-green-200",
      cancelled: "bg-red-100 text-red-700 border-red-200",
      "no-show": "bg-gray-100 text-gray-700 border-gray-200",
    };
    return styles[status as keyof typeof styles] || styles.scheduled;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "cancelled":
        return <IoCloseCircleOutline className="w-4 h-4" />;
      case "no-show":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      default:
        return <IoTimeOutline className="w-4 h-4" />;
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const todayAppointments = filteredAppointments.filter(
    (apt) => apt.date === new Date().toISOString().split("T")[0]
  );

  const stats = [
    { label: "Today's Appointments", value: todayAppointments.length, color: "bg-blue-500" },
    { label: "Scheduled", value: appointments.filter((a) => a.status === "scheduled").length, color: "bg-emerald-500" },
    { label: "Completed", value: appointments.filter((a) => a.status === "completed").length, color: "bg-green-500" },
    { label: "Cancelled", value: appointments.filter((a) => a.status === "cancelled").length, color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Appointments</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage student health appointments and schedules
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>New Appointment</span>
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
            <div className="flex items-center justify-between mb-3">
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              <div className="text-3xl font-bold text-primary-50">{stat.value}</div>
            </div>
            <div className="text-xs sm:text-sm text-primary-50/60 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
            <input
              type="text"
              placeholder="Search by patient name or student ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
            />
          </div>

          {/* Filter by Status */}
          <div className="flex items-center gap-2">
            <IoFilterOutline className="w-5 h-5 text-primary-50/60" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === "list"
                  ? "bg-white text-primary-50 shadow-sm"
                  : "text-primary-50/60 hover:text-primary-50"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === "calendar"
                  ? "bg-white text-primary-50 shadow-sm"
                  : "text-primary-50/60 hover:text-primary-50"
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {viewMode === "list" && (
        <>
          {/* Desktop Table View - Hidden on Mobile */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <IoCalendarOutline className="w-12 h-12 text-primary-50/20" />
                        <p className="text-primary-50/60">No appointments found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-white font-semibold">
                            {appointment.patientName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-primary-50">
                              {appointment.patientName}
                            </div>
                            <div className="text-xs text-primary-50/60">
                              {appointment.studentId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-primary-50/80">
                          <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                          <span>
                            {new Date(appointment.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-primary-50/60 mt-1">
                          <IoTimeOutline className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-primary-50/10 text-primary-50 text-xs font-semibold">
                          {appointment.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-primary-50/80 max-w-xs truncate">
                          {appointment.reason}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                            appointment.status
                          )}`}
                        >
                          {getStatusIcon(appointment.status)}
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50/60" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View - Visible on Mobile Only */}
          <div className="lg:hidden space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
                <div className="flex flex-col items-center gap-3">
                  <IoCalendarOutline className="w-12 h-12 text-primary-50/20" />
                  <p className="text-primary-50/60">No appointments found</p>
                </div>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300"
                >
                  {/* Patient Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-white font-semibold text-lg">
                        {appointment.patientName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-primary-50">
                          {appointment.patientName}
                        </div>
                        <div className="text-xs text-primary-50/60">
                          {appointment.studentId}
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50/60" />
                    </button>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                      <span className="text-sm text-primary-50/80">
                        {new Date(appointment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-primary-50/40">•</span>
                      <IoTimeOutline className="w-4 h-4 text-primary-100" />
                      <span className="text-sm text-primary-50/80">{appointment.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary-50/10 text-primary-50 text-xs font-semibold">
                        {appointment.type}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                          appointment.status
                        )}`}
                      >
                        {getStatusIcon(appointment.status)}
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="text-xs text-primary-50/60 mb-1">Reason</div>
                      <div className="text-sm text-primary-50/80">{appointment.reason}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary-50">
              {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setSelectedDate(
                    new Date(selectedDate.setMonth(selectedDate.getMonth() - 1))
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoChevronBackOutline className="w-5 h-5 text-primary-50" />
              </button>
              <button
                onClick={() =>
                  setSelectedDate(
                    new Date(selectedDate.setMonth(selectedDate.getMonth() + 1))
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoChevronForwardOutline className="w-5 h-5 text-primary-50" />
              </button>
            </div>
          </div>

          <div className="text-center py-12">
            <IoCalendarOutline className="w-16 h-16 text-primary-50/20 mx-auto mb-4" />
            <p className="text-primary-50/60">Calendar view coming soon</p>
            <p className="text-sm text-primary-50/40 mt-2">
              Full calendar integration with appointment scheduling
            </p>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-primary-50 mb-6">
                Schedule New Appointment
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter patient name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">
                      Student ID
                    </label>
                    <input
                      type="text"
                      placeholder="STU-2024-XXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">
                      Appointment Type
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all">
                      <option>Routine Checkup</option>
                      <option>Vaccination</option>
                      <option>Follow-up</option>
                      <option>Consultation</option>
                      <option>Lab Results</option>
                      <option>Emergency</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Reason</label>
                    <textarea
                      placeholder="Describe the reason for appointment..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-primary-50 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NurseAppointment;
