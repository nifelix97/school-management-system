import React, { useState } from "react";
import {
    IoCallOutline,
    IoCheckmarkCircleOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoGridOutline,
    IoListOutline,
    IoMailOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoTimeOutline
} from "react-icons/io5";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  extension: string;
  email: string;
  status: "Available" | "Busy" | "On Leave" | "Offline";
  onCampus: boolean;
  avatar?: string;
}

const StaffDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list"); // Specific for this page if we want toggle

  // Mock Data
  const [staffMembers] = useState<StaffMember[]>([
    {
      id: "STF-001",
      name: "Dr. Sarah Smith",
      role: "Dean of Science",
      department: "Science",
      extension: "101",
      email: "sarah.smith@school.edu",
      status: "Available",
      onCampus: true,
    },
    {
      id: "STF-002",
      name: "Mr. James Bond",
      role: "Security Head",
      department: "Security",
      extension: "007",
      email: "james.bond@school.edu",
      status: "Busy",
      onCampus: true,
    },
    {
      id: "STF-003",
      name: "Ms. Emily Blunt",
      role: "Senior Librarian",
      department: "Library",
      extension: "305",
      email: "emily.b@school.edu",
      status: "Available",
      onCampus: true,
    },
    {
      id: "STF-004",
      name: "Mr. John Doe",
      role: "Physics Teacher",
      department: "Science",
      extension: "202",
      email: "john.doe@school.edu",
      status: "On Leave",
      onCampus: false,
    },
    {
      id: "STF-005",
      name: "Mrs. Jane Austen",
      role: "Literature Teacher",
      department: "Arts",
      extension: "205",
      email: "jane.a@school.edu",
      status: "Offline",
      onCampus: false,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-700 border-green-200";
      case "Busy": return "bg-red-100 text-red-700 border-red-200";
      case "On Leave": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Offline": return "bg-gray-100 text-gray-600 border-gray-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          staff.extension.includes(searchQuery);
    const matchesFilter = filterDepartment === "all" || staff.department === filterDepartment;
    return matchesSearch && matchesFilter;
  });

  const uniqueDepartments = Array.from(new Set(staffMembers.map(s => s.department)));

  const stats = [
    { label: "Total Staff", value: staffMembers.length, icon: <IoPersonOutline />, color: "bg-blue-500" },
    { label: "On Campus", value: staffMembers.filter(s => s.onCampus).length, icon: <IoCheckmarkCircleOutline />, color: "bg-green-500" },
    { label: "Available Now", value: staffMembers.filter(s => s.status === "Available").length, icon: <IoCallOutline />, color: "bg-purple-500" },
    { label: "On Leave", value: staffMembers.filter(s => s.status === "On Leave").length, icon: <IoTimeOutline />, color: "bg-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Staff Directory</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Find contact details and availability of school staff
            </p>
          </div>
          <div className="hidden sm:flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
             <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-primary-50 text-white shadow" : "text-gray-400 hover:text-gray-600"}`}
             >
                <IoListOutline className="w-5 h-5" />
             </button>
             <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-primary-50 text-white shadow" : "text-gray-400 hover:text-gray-600"}`}
             >
                <IoGridOutline className="w-5 h-5" />
             </button>
          </div>
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
              placeholder="Search by name, role, extension..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto mt-2 sm:mt-0">
             <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 min-w-max">
              <IoFilterOutline className="w-4 h-4" />
              <span className="text-sm font-medium">Department:</span>
            </div>
            <button
                onClick={() => setFilterDepartment("all")}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filterDepartment === "all"
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
            </button>
            {uniqueDepartments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDepartment(dept)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filterDepartment === dept
                    ? "bg-primary-50 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="space-y-4">
        {filteredStaff.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <IoPersonOutline className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No staff members found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            {/* Grid View */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${viewMode === "list" ? "hidden" : ""}`}>
              {filteredStaff.map((staff) => (
                <div key={staff.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-sm">
                    {staff.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{staff.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{staff.role}</p>
                  <p className="text-xs text-primary-50 font-medium bg-primary-50/10 px-2 py-0.5 rounded-md mb-4">{staff.department}</p>
                  
                  <div className="w-full grid grid-cols-2 gap-2 mb-4">
                     <div className="bg-gray-50 rounded-lg p-2">
                        <span className="block text-xs text-gray-400 uppercase tracking-wider">Ext</span>
                        <span className="font-semibold text-gray-900">{staff.extension}</span>
                     </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <span className="block text-xs text-gray-400 uppercase tracking-wider">Status</span>
                        <span className={`text-xs font-semibold ${staff.status === "Available" ? "text-green-600" : "text-gray-600"}`}>{staff.status}</span>
                     </div>
                  </div>

                  <div className="flex gap-2 w-full mt-auto">
                    <button className="flex-1 py-2 rounded-xl bg-primary-50 text-white text-sm font-medium hover:bg-primary-100 transition-colors flex items-center justify-center gap-2">
                        <IoCallOutline /> Call
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <IoMailOutline /> Email
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* List View */}
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto ${viewMode === "grid" ? "hidden" : ""}`}>
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Staff Member</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role & Dept</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                             {staff.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{staff.name}</div>
                            {staff.onCampus ? (
                                <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">On Campus</span>
                            ) : (
                                <span className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">Off Campus</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">{staff.role}</div>
                        <div className="text-xs text-gray-500">{staff.department}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-900 flex items-center gap-1">
                                <IoCallOutline className="text-gray-400" /> Ext: <b>{staff.extension}</b>
                            </span>
                             <span className="text-xs text-gray-500 flex items-center gap-1">
                                <IoMailOutline className="text-gray-400" /> {staff.email}
                            </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(staff.status)}`}>
                          {staff.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Call Extension">
                                <IoCallOutline className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Send Email">
                                <IoMailOutline className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors" title="View Profile">
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
    </div>
  );
};

export default StaffDirectory;
