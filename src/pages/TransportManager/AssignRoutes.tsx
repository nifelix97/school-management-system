import React, { useState } from "react";
import {
  IoAddOutline,
  IoBusOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoFilterOutline,
  IoLocationOutline,
  IoMapOutline,
  IoPencilOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoSearchOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

const AssignRoutes = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Mock Data
  const stats = [
    {
      title: "Total Routes",
      value: "14",
      icon: <IoMapOutline className="w-6 h-6" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Today",
      value: "12",
      icon: <IoBusOutline className="w-6 h-6" />,
      color: "bg-green-500",
      lightColor: "bg-green-50 text-green-600",
    },
    {
      title: "Students Assigned",
      value: "450",
      icon: <IoPeopleOutline className="w-6 h-6" />,
      color: "bg-purple-500",
      lightColor: "bg-purple-50 text-purple-600",
    },
    {
      title: "Pending Sync",
      value: "2",
      icon: <IoLocationOutline className="w-6 h-6" />,
      color: "bg-amber-500",
      lightColor: "bg-amber-50 text-amber-600",
    },
  ];

  const routes = [
    {
      id: 1,
      name: "North Route A",
      area: "Downtown & Midtown",
      driver: "John Thompson",
      vehicle: "BUS-001",
      students: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "East Route B",
      area: "Riverside Park",
      driver: "Sarah Jenkins",
      vehicle: "VAN-005",
      students: 22,
      status: "Active",
    },
    {
      id: 3,
      name: "West Route C",
      area: "Oakwood Hills",
      driver: "Michael Ross",
      vehicle: "BUS-004",
      students: 48,
      status: "Inactive",
    },
    {
      id: 4,
      name: "South Route D",
      area: "Lincoln Square",
      driver: "Emily Davis",
      vehicle: "BUS-008",
      students: 35,
      status: "Active",
    },
    {
      id: 5,
      name: "School Special",
      area: "Central Hub",
      driver: "David Wilson",
      vehicle: "VAN-012",
      students: 12,
      status: "Active",
    },
  ];

  const mockStudents = [
    { id: 1, name: "Alice Johnson", grade: "10th", assignedRouteId: 1 },
    { id: 2, name: "Bob Smith", grade: "9th", assignedRouteId: 1 },
    { id: 3, name: "Charlie Brown", grade: "11th", assignedRouteId: 2 },
    { id: 4, name: "David Miller", grade: "10th", assignedRouteId: null },
    { id: 5, name: "Eva Wilson", grade: "12th", assignedRouteId: null },
    { id: 6, name: "Frank Thomas", grade: "8th", assignedRouteId: 4 },
    { id: 7, name: "Grace Lee", grade: "9th", assignedRouteId: 4 },
    { id: 8, name: "Henry Ford", grade: "11th", assignedRouteId: null },
  ];

  const filteredRoutes = routes.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredStudents = mockStudents.filter((s) =>
    s.name.toLowerCase().includes(studentSearchTerm.toLowerCase())
  );

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("New route assigned successfully!");
    setShowAddModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm(`Are you sure you want to delete route #${id}?`)) {
      toast.info("Route deleted");
    }
  };

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    toast.success(`Route #${id} status updated to ${newStatus}`);
  };

  const handleAssignStudent = (studentId: number) => {
    toast.success(`Student #${studentId} assigned to ${selectedRoute?.name}`);
  };

  const handleRemoveStudent = (studentId: number) => {
    toast.info(`Student #${studentId} removed from ${selectedRoute?.name}`);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Inactive":
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
          <h1 className="text-2xl font-bold text-gray-800">Route Assignment</h1>
          <p className="text-gray-500 text-sm">Designate transport routes and assign students</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary-50/30"
        >
          <IoAddOutline className="w-5 h-5" />
          Assign New Route
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
                placeholder="Search route name, area, or driver..."
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Route Info</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Area / Coverage</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Driver & Vehicle</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">Students</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-xl">
                        <IoMapOutline />
                      </div>
                      <div className="font-bold text-gray-800 text-sm">{route.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <IoLocationOutline className="text-gray-400" />
                      {route.area}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-700">{route.driver}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <IoBusOutline size={12} />
                      {route.vehicle}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs">
                      {route.students}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusStyle(route.status)}`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setSelectedRoute(route);
                          setShowStudentModal(true);
                        }}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Manage Students"
                      >
                        <IoPeopleOutline size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(route.id, route.status)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Toggle Status"
                      >
                        <IoCheckmarkCircleOutline size={18} />
                      </button>
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Route"
                      >
                        <IoPencilOutline size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(route.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Route"
                      >
                        <IoTrashOutline size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRoutes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No routes found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Route Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Assign New Route</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <IoCloseOutline size={24} />
              </button>
            </div>

            <form onSubmit={handleAddRoute} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Route Name</label>
                <input
                  type="text"
                  placeholder="e.g. North Route A"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Area / Coverage</label>
                <textarea
                  placeholder="List major stops or neighborhoods..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Assign Driver</label>
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
                  Create Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Students Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Manage Students</h2>
                <p className="text-sm text-gray-500">Route: {selectedRoute?.name}</p>
              </div>
              <button 
                onClick={() => {
                    setShowStudentModal(false);
                    setStudentSearchTerm("");
                }} 
                className="text-gray-400 hover:text-gray-600"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search students to assign..."
                        value={studentSearchTerm}
                        onChange={(e) => setStudentSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 transition-colors"
                    />
                </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {filteredStudents.map((student) => {
                    const isAssignedToThisRoute = student.assignedRouteId === selectedRoute?.id;
                    const isAssignedElsewhere = !!student.assignedRouteId && !isAssignedToThisRoute;
                    
                    return (
                        <div key={student.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                                    {student.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-sm">{student.name}</p>
                                    <p className="text-xs text-gray-500">Grade: {student.grade}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {isAssignedToThisRoute ? (
                                    <button
                                        onClick={() => handleRemoveStudent(student.id)}
                                        className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        Remove
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAssignStudent(student.id)}
                                        disabled={isAssignedElsewhere}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                                            isAssignedElsewhere 
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                            : "bg-primary-100/10 text-primary-100 hover:bg-primary-100/20"
                                        }`}
                                    >
                                        {isAssignedElsewhere ? "Active elsewhere" : (
                                            <>
                                                <IoPersonAddOutline size={14} />
                                                Assign
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
                {filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No students found matching your search.
                    </div>
                )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                <button
                    onClick={() => {
                        setShowStudentModal(false);
                        setStudentSearchTerm("");
                    }}
                    className="px-6 py-2 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors"
                >
                    Done
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRoutes;
