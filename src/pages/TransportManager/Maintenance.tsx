import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoBuildOutline,
    IoCalendarOutline,
    IoCarSportOutline,
    IoCheckmarkDoneOutline,
    IoFilterOutline,
    IoSearchOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

const Maintenance = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Mock Data
  const stats = [
    {
      title: "In Service",
      value: "28",
      total: "/ 32 Vehicles",
      icon: <IoCarSportOutline className="w-6 h-6" />,
      color: "bg-green-500",
      lightColor: "bg-green-50 text-green-600",
    },
    {
      title: "Under Maintenance",
      value: "3",
      total: "Est. Return: 2 Days",
      icon: <IoBuildOutline className="w-6 h-6" />,
      color: "bg-amber-500",
      lightColor: "bg-amber-50 text-amber-600",
    },
    {
      title: "Scheduled Service",
      value: "5",
      total: "Next 7 Days",
      icon: <IoCalendarOutline className="w-6 h-6" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Critical Issues",
      value: "1",
      total: "Immediate Action",
      icon: <IoAlertCircleOutline className="w-6 h-6" />,
      color: "bg-red-500",
      lightColor: "bg-red-50 text-red-600",
    },
  ];

  const maintenanceLogs = [
    {
      id: 1,
      vehicleId: "BUS-004",
      model: "Mercedes Sprinter",
      issue: "Brake Pad Replacement",
      type: "Routine",
      status: "In Progress",
      scheduledDate: "2024-12-22",
      estimatedCost: "$450",
      mechanic: "City Auto Services",
    },
    {
      id: 2,
      vehicleId: "VAN-012",
      model: "Toyota HiAce",
      issue: "Oil Change & Inspection",
      type: "Routine",
      status: "Scheduled",
      scheduledDate: "2024-12-24",
      estimatedCost: "$120",
      mechanic: "Internal",
    },
    {
      id: 3,
      vehicleId: "BUS-001",
      model: "Volvo 9700",
      issue: "Engine Overheating",
      type: "Repair",
      status: "Critical",
      scheduledDate: "2024-12-20",
      estimatedCost: "$2,200",
      mechanic: "Volvo Specialist",
    },
    {
      id: 4,
      vehicleId: "BUS-008",
      model: "Ford Transit",
      issue: "Tire Rotation",
      type: "Routine",
      status: "Completed",
      scheduledDate: "2024-12-18",
      estimatedCost: "$80",
      mechanic: "Internal",
    },
    {
      id: 5,
      vehicleId: "VAN-005",
      model: "Toyota Coaster",
      issue: "AC Repair",
      type: "Repair",
      status: "In Progress",
      scheduledDate: "2024-12-21",
      estimatedCost: "$350",
      mechanic: "CoolAir Systems",
    },
  ];

  const filteredLogs = maintenanceLogs.filter((log) => {
    const matchesSearch =
      log.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.issue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleScheduleService = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Service scheduled successfully!");
    setShowScheduleModal(false);
  };

  const handleMarkComplete = (id: number) => {
    toast.success(`Service record #${id} marked as completed`);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Vehicle Maintenance</h1>
          <p className="text-gray-500 text-sm">Track repairs, service schedules, and vehicle health</p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary-50/30"
        >
          <IoAddOutline className="w-5 h-5" />
          Schedule Service
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-2">
              <div className={`p-3 rounded-xl ${stat.lightColor}`}>{stat.icon}</div>
              <span className={`h-2 w-2 rounded-full ${stat.color}`}></span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.total}</p>
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
                placeholder="Search vehicle ID or issue..."
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-primary-100 font-medium"
              >
                <option value="All">All Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Critical">Critical</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Vehicle Info</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Service Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Mechanic</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                        <IoCarSportOutline />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{log.vehicleId}</p>
                        <p className="text-xs text-gray-500">{log.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800 text-sm">{log.issue}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="capitalize">{log.type}</span>
                        <span>•</span>
                        <span className="font-semibold text-gray-600">{log.estimatedCost}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {log.mechanic}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <IoCalendarOutline className="text-gray-400" />
                      {log.scheduledDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusStyle(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {log.status !== "Completed" && (
                         <button
                            onClick={() => handleMarkComplete(log.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title="Mark as Completed"
                        >
                            <IoCheckmarkDoneOutline size={18} />
                        </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No maintenance records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Schedule Service</h2>
              <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleService} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Vehicle ID</label>
                        <input
                            type="text"
                            placeholder="e.g. BUS-001"
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                            required
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Service Type</label>
                        <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100">
                            <option>Routine Maintenance</option>
                            <option>Repair</option>
                            <option>Inspection</option>
                            <option>Cleaning</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Issue / Service Description</label>
                    <textarea
                        placeholder="Describe the issue or required service..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 resize-none"
                        required
                    />
                </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                    required
                  />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">Est. Cost</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                            type="number"
                            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                        />
                    </div>
                </div>
              </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Assigned Mechanic / Shop</label>
                  <input
                    type="text"
                    placeholder="e.g. City Auto Services"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                    required
                  />
                </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-100 text-white rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg shadow-primary-50/25"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
