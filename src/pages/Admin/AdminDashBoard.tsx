import React from "react";
import {
  IoBookOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoSchoolOutline,
  IoTrendingDownOutline,
  IoTrendingUpOutline
} from "react-icons/io5";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
}

const AdminDashboard: React.FC = () => {
  // Statistics data
  const stats: StatCard[] = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: <IoSchoolOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-50",
    },
    {
      title: "Total Teachers",
      value: "156",
      change: "+3.2%",
      trend: "up",
      icon: <IoPeopleOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-100",
    },
    {
      title: "Active Courses",
      value: "89",
      change: "+5.8%",
      trend: "up",
      icon: <IoBookOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-200",
    },
    {
      title: "Upcoming Events",
      value: "24",
      change: "-2.1%",
      trend: "down",
      icon: <IoCalendarOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-300",
    },
  ];

  // System Users Data
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 8;

  const users = [
    { id: 1, name: "Dr. Sarah Wilson", email: "sarah.w@school.edu", role: "Teacher", status: "active", lastLogin: "2 mins ago", avatar: "SW" },
    { id: 2, name: "John Smith", email: "john.s@student.edu", role: "Student", status: "active", lastLogin: "1 hour ago", avatar: "JS" },
    { id: 3, name: "Admin User", email: "admin@school.edu", role: "Admin", status: "active", lastLogin: "Just now", avatar: "AD" },
    { id: 4, name: "Prof. Michael Brown", email: "m.brown@school.edu", role: "Teacher", status: "inactive", lastLogin: "2 days ago", avatar: "MB" },
    { id: 5, name: "Emma Davis", email: "emma.d@student.edu", role: "Student", status: "active", lastLogin: "5 hours ago", avatar: "ED" },
    { id: 6, name: "James Wilson", email: "j.wilson@school.edu", role: "Registrar", status: "active", lastLogin: "30 mins ago", avatar: "JW" },
    { id: 7, name: "Lisa Anderson", email: "l.anderson@school.edu", role: "Librarian", status: "offline", lastLogin: "1 day ago", avatar: "LA" },
    { id: 8, name: "Robert Taylor", email: "r.taylor@school.edu", role: "HOD", status: "active", lastLogin: "15 mins ago", avatar: "RT" },
    { id: 9, name: "Emily Johnson", email: "emily.j@student.edu", role: "Student", status: "active", lastLogin: "2 hours ago", avatar: "EJ" },
    { id: 10, name: "David Miller", email: "david.m@student.edu", role: "Student", status: "offline", lastLogin: "3 days ago", avatar: "DM" },
    { id: 11, name: "Jennifer Wu", email: "jennifer.w@teacher.edu", role: "Teacher", status: "active", lastLogin: "10 mins ago", avatar: "JW" },
    { id: 12, name: "Thomas Anderson", email: "thomas.a@student.edu", role: "Student", status: "inactive", lastLogin: "1 week ago", avatar: "TA" },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Overview of system users and key metrics.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
                  stat.trend === "up" ? "text-primary-300" : "text-primary-200"
                }`}
              >
                {stat.trend === "up" ? (
                  <IoTrendingUpOutline className="w-4 h-4" />
                ) : (
                  <IoTrendingDownOutline className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="text-xs sm:text-sm text-primary-50/60 mb-1">
              {stat.title}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-50">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* System Users Table */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50">
            System Users
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select 
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-50"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="registrar">Registrar</option>
              <option value="librarian">Librarian</option>
              <option value="hod">HOD</option>
            </select>
            <input 
              type="text" 
              placeholder="Search users..." 
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-50 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : user.status === 'offline' ? 'bg-gray-400' : 'bg-red-500'}`}></div>
                  <span className="text-primary-50/80 capitalize">{user.status}</span>
                </div>
                <span className="text-primary-50/60 text-xs">Login: {user.lastLogin}</span>
              </div>

              <button className="w-full py-2 text-primary-50 border border-primary-50/20 rounded-lg hover:bg-primary-50 hover:text-white transition-colors text-sm font-medium">
                View Details
              </button>
            </div>
          ))}
          {paginatedUsers.length === 0 && (
            <div className="p-8 text-center text-primary-50/60 text-sm">
              No users found matching your criteria.
            </div>
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-50 text-white flex items-center justify-center text-xs font-medium">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary-50">{user.name}</div>
                        <div className="text-xs text-primary-50/60">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50/10 text-primary-50 border border-primary-50/20">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : user.status === 'offline' ? 'bg-gray-400' : 'bg-red-500'}`}></div>
                      <span className="text-sm text-primary-50/80 capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-50/60">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-primary-50 hover:text-primary-100 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedUsers.length === 0 && (
            <div className="p-8 text-center text-primary-50/60 text-sm">
              No users found matching your criteria.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredUsers.length > 0 && (
          <div className="px-4 py-3 sm:px-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="text-xs sm:text-sm text-primary-50/60">
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)}</span> of <span className="font-medium">{filteredUsers.length}</span> users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 px-3 py-1.5 rounded-md border border-gray-200 bg-white text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-xs sm:text-sm"
              >
                Previous
              </button>
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-xs transition-colors ${
                      currentPage === page
                        ? "bg-primary-50 text-white"
                        : "text-primary-50/70 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 px-3 py-1.5 rounded-md border border-gray-200 bg-white text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-xs sm:text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
