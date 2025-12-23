import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoFilterOutline,
    IoLocationOutline,
    IoPencilOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

const DriverSchedules = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterShift, setFilterShift] = useState("All");

  // Mock Data
  const stats = [
    {
      title: "Total Drivers",
      value: "45",
      icon: <IoPersonOutline className="w-6 h-6" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "On Duty",
      value: "18",
      icon: <IoTimeOutline className="w-6 h-6" />,
      color: "bg-green-500",
      lightColor: "bg-green-50 text-green-600",
    },
    {
      title: "Off Duty",
      value: "22",
      icon: <IoCalendarOutline className="w-6 h-6" />,
      color: "bg-amber-500",
      lightColor: "bg-amber-50 text-amber-600",
    },
    {
      title: "Active Routes",
      value: "12",
      icon: <IoLocationOutline className="w-6 h-6" />,
      color: "bg-purple-500",
      lightColor: "bg-purple-50 text-purple-600",
    },
  ];

  const schedules = [
    {
      id: 1,
      driverName: "John Thompson",
      vehicleId: "BUS-001",
      route: "Route A (North)",
      shift: "Morning",
      status: "On Duty",
      time: "06:00 AM - 02:00 PM",
    },
    {
      id: 2,
      driverName: "Sarah Jenkins",
      vehicleId: "VAN-005",
      route: "Route B (East)",
      shift: "Afternoon",
      status: "Scheduled",
      time: "02:00 PM - 10:00 PM",
    },
    {
      id: 3,
      driverName: "Michael Ross",
      vehicleId: "BUS-004",
      route: "Route C (West)",
      shift: "Morning",
      status: "On Duty",
      time: "06:00 AM - 02:00 PM",
    },
    {
      id: 4,
      driverName: "Emily Davis",
      vehicleId: "BUS-008",
      route: "Route D (South)",
      shift: "Evening",
      status: "Scheduled",
      time: "04:00 PM - 12:00 AM",
    },
    {
      id: 5,
      driverName: "David Wilson",
      vehicleId: "VAN-012",
      route: "School Special",
      shift: "Morning",
      status: "Off Duty",
      time: "07:30 AM - 09:30 AM",
    },
  ];

  const filteredSchedules = schedules.filter((s) => {
    const matchesSearch =
      s.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.vehicleId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShift = filterShift === "All" || s.shift === filterShift;
    return matchesSearch && matchesShift;
  });

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Schedule assigned successfully!");
    setShowAddModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm(`Are you sure you want to remove schedule #${id}?`)) {
      toast.info("Schedule removed");
    }
  };

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "On Duty" ? "Off Duty" : "On Duty";
    toast.success(`Driver #${id} status updated to ${newStatus}`);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "On Duty":
        return "bg-green-100 text-green-700 border-green-200";
      case "Scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Off Duty":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 px-6 py-6 font-primary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Driver Schedules</h1>
          <p className="text-gray-500 text-sm">Manage driver shifts, routes, and duty status</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary-50/30"
        >
          <IoAddOutline className="w-5 h-5" />
          Assign Schedule
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-2">
              <div className={`p-3 rounded-xl ${stat.lightColor}`}>{stat.icon}</div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search driver, route, or vehicle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500">
                <IoFilterOutline />
              </div>
              <select
                value={filterShift}
                onChange={(e) => setFilterShift(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-primary-100 font-medium"
              >
                <option value="All">All Shifts</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Driver & Vehicle</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Route</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Shift</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-xl">
                        <IoPersonOutline />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{schedule.driverName}</p>
                        <p className="text-xs text-gray-500">{schedule.vehicleId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <IoLocationOutline className="text-gray-400" />
                      {schedule.route}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">{schedule.shift}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <IoTimeOutline className="text-gray-400" />
                      {schedule.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusStyle(schedule.status)}`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleToggleStatus(schedule.id, schedule.status)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Toggle Duty Status"
                      >
                        <IoCheckmarkCircleOutline size={18} />
                      </button>
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Schedule"
                      >
                        <IoPencilOutline size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(schedule.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Schedule"
                      >
                        <IoTrashOutline size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSchedules.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No schedules found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Assign New Schedule</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSchedule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Driver Name</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100">
                    <option>Select Driver</option>
                    <option>John Thompson</option>
                    <option>Sarah Jenkins</option>
                    <option>Michael Ross</option>
                    <option>Emily Davis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Vehicle</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100">
                    <option>Select Vehicle</option>
                    <option>BUS-001</option>
                    <option>VAN-005</option>
                    <option>BUS-004</option>
                    <option>BUS-008</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Route</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100">
                  <option>Select Route</option>
                  <option>Route A (North)</option>
                  <option>Route B (East)</option>
                  <option>Route C (West)</option>
                  <option>Route D (South)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Shift</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100">
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-100 text-white rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg shadow-primary-50/25"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverSchedules;
