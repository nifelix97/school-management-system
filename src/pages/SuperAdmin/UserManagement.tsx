import React, { useState } from "react";
import {
    IoAddOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoEllipsisVertical,
    IoEyeOutline,
    IoLockClosedOutline,
    IoPencilOutline,
    IoSearchOutline,
} from "react-icons/io5";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Blocked";
  lastLogin: string;
  avatar?: string;
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [users] = useState<User[]>([
    { id: "1", name: "Alice Johnson", email: "alice.j@school.edu", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
    { id: "2", name: "Dr. Robert Smith", email: "r.smith@school.edu", role: "Teacher", status: "Active", lastLogin: "1 day ago" },
    { id: "3", name: "Sarah Williams", email: "s.williams@student.edu", role: "Student", status: "Inactive", lastLogin: "1 week ago" },
    { id: "4", name: "James Brown", email: "j.brown@school.edu", role: "Registrar", status: "Blocked", lastLogin: "1 month ago" },
    { id: "5", name: "Emma Davis", email: "e.davis@school.edu", role: "Accountant", status: "Active", lastLogin: "10 mins ago" },
    { id: "6", name: "Michael Wilson", email: "m.wilson@school.edu", role: "Admin", status: "Active", lastLogin: "5 hours ago" },
    { id: "7", name: "Olivia Taylor", email: "o.taylor@school.edu", role: "Teacher", status: "Active", lastLogin: "3 hours ago" },
    { id: "8", name: "William Moore", email: "w.moore@student.edu", role: "Student", status: "Active", lastLogin: "2 days ago" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All Status" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const stats = [
    { label: "Total Users", value: "4,582", color: "text-primary-50", bg: "bg-primary-50/10" },
    { label: "Active Now", value: "1,124", color: "text-primary-100", bg: "bg-primary-100/10" },
    { label: "Pending Review", value: "12", color: "text-primary-300", bg: "bg-primary-300/10" },
    { label: "Security Alerts", value: "2", color: "text-primary-200", bg: "bg-primary-200/10" },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-50 text-green-600 border-green-100";
      case "Inactive": return "bg-gray-50 text-gray-500 border-gray-100";
      case "Blocked": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-blue-50 text-blue-600 border-blue-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-50 tracking-tight">User Management</h1>
          <p className="text-gray-500 mt-1">Oversee all user accounts, roles, and system access.</p>
        </div>
        <button 
          className="bg-primary-100 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all flex items-center gap-2 w-fit"
        >
          <IoAddOutline className="text-lg" />
          Create New User
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input 
            type="text" 
            placeholder="Search users by name, email, or ID..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-gray-50 border-none px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 outline-none focus:ring-2 focus:ring-primary-100/20"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option>All Roles</option>
            <option>Admin</option>
            <option>Teacher</option>
            <option>Student</option>
            <option>Registrar</option>
          </select>
          <select 
            className="bg-gray-50 border-none px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 outline-none focus:ring-2 focus:ring-primary-100/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Blocked</option>
          </select>
        </div>
      </div>

      {/* Users Table / Mobile Cards */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Last Activity</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-700">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusStyle(user.status)}`}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{user.lastLogin}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-primary-50 hover:bg-primary-50/10 rounded-lg transition-all" title="View Details">
                        <IoEyeOutline />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary-100 hover:bg-primary-100/10 rounded-lg transition-all" title="Edit User">
                        <IoPencilOutline />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Restrict Access">
                        <IoLockClosedOutline />
                      </button>
                    </div>
                    <button className="p-2 text-gray-400 group-hover:hidden transition-all">
                      <IoEllipsisVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {paginatedUsers.map((user) => (
            <div key={user.id} className="p-6 space-y-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold text-lg">
                    {user.name[0]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-700">{user.name}</h3>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusStyle(user.status)}`}>
                  {user.status.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm py-2 border-y border-gray-50">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Role</span>
                  <span className="font-semibold text-gray-600">{user.role}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Last Activity</span>
                  <span className="font-semibold text-gray-600">{user.lastLogin}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all border border-gray-100">
                  <IoEyeOutline /> View
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-50/5 text-primary-50 rounded-xl text-xs font-bold hover:bg-primary-50/10 transition-all border border-primary-50/10">
                  <IoPencilOutline /> Edit
                </button>
                <button className="p-2.5 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-100 transition-all border border-red-100">
                  <IoLockClosedOutline />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 bg-gray-50/30 flex items-center justify-between border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400">
            Showing <span className="text-primary-50">{Math.min(startIndex + 1, filteredUsers.length)}</span> to <span className="text-primary-50">{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of <span className="text-primary-50">{filteredUsers.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:text-primary-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <IoChevronBackOutline />
            </button>
            
            <div className="hidden sm:flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === i + 1 
                      ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" 
                      : "text-gray-500 hover:bg-white border border-transparent hover:border-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:text-primary-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <IoChevronForwardOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
