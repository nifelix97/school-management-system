import React, { useState } from "react";
import {
  IoAddOutline,
  IoBusOutline,
  IoCarSportOutline,
  IoCheckmarkCircleOutline,
  IoFilterOutline,
  IoPencilOutline,
  IoPeopleOutline,
  IoSearchOutline,
  IoSpeedometerOutline,
  IoTrashOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

const VehicleFleet = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Mock Data
  const stats = [
    {
      title: "Total Vehicles",
      value: "32",
      icon: <IoBusOutline className="w-6 h-6" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active on Route",
      value: "24",
      icon: <IoSpeedometerOutline className="w-6 h-6" />,
      color: "bg-green-500",
      lightColor: "bg-green-50 text-green-600",
    },
    {
      title: "Available",
      value: "5",
      icon: <IoCheckmarkCircleOutline className="w-6 h-6" />,
      color: "bg-purple-500",
      lightColor: "bg-purple-50 text-purple-600",
    },
    {
      title: "Maintenance",
      value: "3",
      icon: <IoWarningOutline className="w-6 h-6" />,
      color: "bg-amber-500",
      lightColor: "bg-amber-50 text-amber-600",
    },
  ];

  const vehicles = [
    {
      id: 1,
      vehicleId: "BUS-001",
      model: "Volvo 9700",
      type: "Bus",
      capacity: 50,
      licensePlate: "ABC-1234",
      driver: "John Doe",
      status: "Active",
      condition: "Excellent",
    },
    {
      id: 2,
      vehicleId: "VAN-005",
      model: "Toyota Coaster",
      type: "Van",
      capacity: 22,
      licensePlate: "XYZ-5678",
      driver: "Jane Smith",
      status: "Maintenance",
      condition: "Needs Repair",
    },
    {
      id: 3,
      vehicleId: "BUS-004",
      model: "Mercedes Sprinter",
      type: "Minibus",
      capacity: 18,
      licensePlate: "LMN-9012",
      driver: "Mike Johnson",
      status: "Active",
      condition: "Good",
    },
    {
      id: 4,
      vehicleId: "BUS-008",
      model: "Ford Transit",
      type: "Minibus",
      capacity: 15,
      licensePlate: "PQR-3456",
      driver: "Sarah Williams",
      status: "Available",
      condition: "Good",
    },
    {
      id: 5,
      vehicleId: "VAN-012",
      model: "Toyota HiAce",
      type: "Van",
      capacity: 12,
      licensePlate: "STU-7890",
      driver: "Unassigned",
      status: "Available",
      condition: "New",
    },
  ];

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || vehicle.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("New vehicle added to fleet successfully!");
    setShowAddModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm(`Are you sure you want to remove vehicle #${id} from the fleet?`)) {
      toast.info("Vehicle removed");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Maintenance":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Available":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 px-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Vehicle Fleet</h1>
          <p className="text-gray-500 text-sm">Manage school transport vehicles and assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary-50/30"
        >
          <IoAddOutline className="w-5 h-5" />
          Add Vehicle
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
                placeholder="Search by ID, model, or driver..."
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
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-primary-100 font-medium"
              >
                <option value="All">All Types</option>
                <option value="Bus">Bus</option>
                <option value="Van">Van</option>
                <option value="Minibus">Minibus</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Vehicle Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Capacity</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Assigned Driver</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">License Plate</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-xl">
                        {vehicle.type === 'Bus' ? <IoBusOutline /> : <IoCarSportOutline />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{vehicle.vehicleId}</p>
                        <p className="text-xs text-gray-500">{vehicle.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <IoPeopleOutline className="text-gray-400" />
                      {vehicle.capacity} Seats
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                     {vehicle.driver !== "Unassigned" ? (
                        <span className="font-medium text-gray-700">{vehicle.driver}</span>
                     ) : (
                        <span className="text-gray-400 italic">Unassigned</span>
                     )}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">
                    {vehicle.licensePlate}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusStyle(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Vehicle"
                        >
                            <IoPencilOutline size={18} />
                        </button>
                        <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove Vehicle"
                        >
                            <IoTrashOutline size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVehicles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No vehicles found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add New Vehicle</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Vehicle ID</label>
                        <input
                            type="text"
                            placeholder="e.g. BUS-004"
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                            required
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Vehicle Type</label>
                        <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100">
                            <option>Bus</option>
                            <option>Minibus</option>
                            <option>Van</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Model / Make</label>
                    <input
                        type="text"
                        placeholder="e.g. Volvo 9700"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">License Plate</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                            required
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Seating Capacity</label>
                         <input
                            type="number"
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                            required
                        />
                    </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Assign Driver (Optional)</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100">
                        <option value="">Unassigned</option>
                        <option>John Doe</option>
                        <option>Jane Smith</option>
                        <option>Mike Johnson</option>
                  </select>
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
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleFleet;
