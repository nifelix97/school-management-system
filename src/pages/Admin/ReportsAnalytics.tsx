import React, { useState } from "react";
import {
  IoBarChartOutline,
  IoCalendarOutline,
  IoCloudDownloadOutline,
  IoDownloadOutline,
  IoFilterOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoSearchOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "offline";
  joinDate: string;
  lastLogin: string;
  avatar: string;
}

interface RegistrationStat {
  month: string;
  count: number;
}

const ReportsAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"trends" | "directory">("trends");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  // Mock Data: User Registrations (Bar Chart)
  const registrationStats: RegistrationStat[] = [
    { month: "Jan", count: 45 },
    { month: "Feb", count: 52 },
    { month: "Mar", count: 38 },
    { month: "Apr", count: 65 },
    { month: "May", count: 48 },
    { month: "Jun", count: 72 },
  ];

  // Mock Data: Users List
  const users: UserData[] = [
    { id: 1, name: "Dr. Sarah Wilson", email: "sarah.w@school.edu", role: "Teacher", status: "active", joinDate: "2024-01-15", lastLogin: "2 mins ago", avatar: "SW" },
    { id: 2, name: "John Smith", email: "john.s@student.edu", role: "Student", status: "active", joinDate: "2024-02-10", lastLogin: "1 hour ago", avatar: "JS" },
    { id: 3, name: "Admin User", email: "admin@school.edu", role: "Admin", status: "active", joinDate: "2023-11-05", lastLogin: "Just now", avatar: "AD" },
    { id: 4, name: "Prof. Michael Brown", email: "m.brown@school.edu", role: "Teacher", status: "inactive", joinDate: "2024-01-20", lastLogin: "2 days ago", avatar: "MB" },
    { id: 5, name: "Emma Davis", email: "emma.d@student.edu", role: "Student", status: "active", joinDate: "2024-03-12", lastLogin: "5 hours ago", avatar: "ED" },
    { id: 6, name: "James Wilson", email: "j.wilson@school.edu", role: "Registrar", status: "active", joinDate: "2023-12-01", lastLogin: "30 mins ago", avatar: "JW" },
    { id: 7, name: "Lisa Anderson", email: "l.anderson@school.edu", role: "Librarian", status: "offline", joinDate: "2024-02-28", lastLogin: "1 day ago", avatar: "LA" },
    { id: 8, name: "Robert Taylor", email: "r.taylor@school.edu", role: "HOD", status: "active", joinDate: "2024-01-10", lastLogin: "15 mins ago", avatar: "RT" },
    { id: 9, name: "Emily Johnson", email: "emily.j@student.edu", role: "Student", status: "active", joinDate: "2024-04-05", lastLogin: "2 hours ago", avatar: "EJ" },
    { id: 10, name: "David Miller", email: "david.m@student.edu", role: "Student", status: "offline", joinDate: "2024-04-18", lastLogin: "3 days ago", avatar: "DM" },
    { id: 11, name: "Jennifer Wu", email: "jennifer.w@teacher.edu", role: "Teacher", status: "active", joinDate: "2024-02-15", lastLogin: "10 mins ago", avatar: "JW" },
    { id: 12, name: "Thomas Anderson", email: "thomas.a@student.edu", role: "Student", status: "inactive", joinDate: "2024-03-22", lastLogin: "1 week ago", avatar: "TA" },
  ];

  // Logic for Directory Tab
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter]);

  const handleDownloadCSV = () => {
    alert("Downloading user_report.csv...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          User Analytics
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Monitor user growth and manage system access.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-100 w-fit mb-6 sm:mb-8">
        <button
          onClick={() => setActiveTab("trends")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "trends"
              ? "bg-primary-50 text-white shadow-sm"
              : "text-primary-50/60 hover:bg-gray-50"
          }`}
        >
          <IoBarChartOutline className="w-4 h-4" />
          Trend Analysis
        </button>
        <button
          onClick={() => setActiveTab("directory")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "directory"
              ? "bg-primary-50 text-white shadow-sm"
              : "text-primary-50/60 hover:bg-gray-50"
          }`}
        >
          <IoPeopleOutline className="w-4 h-4" />
          User Directory
        </button>
      </div>

      {/* TABS CONTENT */}
      {activeTab === "trends" ? (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <IoPeopleOutline className="w-6 h-6" />
                </div>
                <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <IoTrendingUpOutline className="mr-1" /> +12%
                </span>
              </div>
              <h3 className="text-primary-50/60 text-sm font-medium">Total Users</h3>
              <p className="text-2xl font-bold text-primary-50">2,847</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                  <IoPersonAddOutline className="w-6 h-6" />
                </div>
                <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <IoTrendingUpOutline className="mr-1" /> +5%
                </span>
              </div>
              <h3 className="text-primary-50/60 text-sm font-medium">New This Month</h3>
              <p className="text-2xl font-bold text-primary-50">142</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                  <IoCloudDownloadOutline className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-primary-50/60 text-sm font-medium">Active Now</h3>
              <p className="text-2xl font-bold text-primary-50">894</p>
            </div>
          </div>

          {/* Registration Bar Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-primary-50 mb-6">User Registration Trends</h2>
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2">
              {registrationStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center gap-2 w-full group h-full">
                  <div className="relative w-full bg-gray-100 rounded-t-lg flex-1 flex items-end overflow-hidden">
                    <div 
                      className="w-full bg-primary-50 group-hover:bg-gradient-to-r from-primary-50 to-primary-100 transition-all duration-500 rounded-t-lg relative"
                      style={{ height: `${(stat.count / 100) * 100}%` }}
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary-50 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {stat.count}
                        </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-primary-50/60">{stat.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* User Directory Tab */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
             <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-50/5 rounded-lg">
                    <IoFilterOutline className="w-5 h-5 text-primary-50" />
                </div>
                <h2 className="text-lg font-bold text-primary-50">User List</h2>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <select 
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-50"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select>
                <div className="relative">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-50 w-full sm:w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button 
                    onClick={handleDownloadCSV}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium"
                >
                    <IoDownloadOutline className="w-4 h-4" />
                    Export CSV
                </button>
             </div>
          </div>

          {/* Mobile View: Cards */}
          <div className="md:hidden">
            {paginatedUsers.map((user) => (
              <div key={user.id} className="p-4 border-b border-gray-100 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-50 text-white flex items-center justify-center text-sm font-medium">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary-50">{user.name}</div>
                      <div className="text-xs text-primary-50/60">{user.email}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                    user.role === 'Admin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                    user.role === 'Teacher' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    user.role === 'Student' ? 'bg-green-50 text-green-600 border-green-100' :
                    'bg-gray-50 text-gray-600 border-gray-100'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-1">
                    <div className="flex flex-col">
                        <span className="text-xs text-primary-50/40">Status</span>
                        <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <span className="text-primary-50/80 capitalize">{user.status}</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-primary-50/40">Joined</span>
                        <span className="text-primary-50/80">{user.joinDate}</span>
                    </div>
                </div>
              </div>
            ))}
             {paginatedUsers.length === 0 && (
                <div className="p-8 text-center text-primary-50/60 text-sm">
                   No users found.
                </div>
             )}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-primary-50 uppercase tracking-wider">User Profile</th>
                  <th className="px-6 py-4 text-xs font-semibold text-primary-50 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-primary-50 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-primary-50 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-primary-50 uppercase tracking-wider text-right">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-50 text-white flex items-center justify-center text-sm font-medium shadow-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-primary-50">{user.name}</div>
                          <div className="text-xs text-primary-50/60">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                        user.role === 'Admin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                        user.role === 'Teacher' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-gray-50 text-gray-600 border-gray-100'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : user.status === 'offline' ? 'bg-gray-400' : 'bg-red-500'}`}></div>
                        <span className="text-sm text-primary-50/80 capitalize">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-primary-50/70 text-sm">
                        <div className="flex items-center gap-2">
                            <IoCalendarOutline className="w-4 h-4 text-primary-50/40" />
                            {user.joinDate}
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-primary-50/60">
                      {user.lastLogin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
             {paginatedUsers.length === 0 && (
                <div className="p-8 text-center text-primary-50/60 text-sm">
                   No users found matching filters.
                </div>
             )}
          </div>
          
           {/* Pagination Controls */}
          {filteredUsers.length > 0 && (
            <div className="px-4 py-3 sm:px-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="text-xs sm:text-sm text-primary-50/60">
                <span className="hidden sm:inline">Showing </span>
                <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)}</span> of <span className="font-medium">{filteredUsers.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-md border border-gray-200 bg-white text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-md border border-gray-200 bg-white text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;
