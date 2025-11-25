import React, { useState } from "react";
import {
    IoAddOutline,
    IoCreateOutline,
    IoEllipsisVerticalOutline,
    IoMailOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline,
    IoTrashOutline
} from "react-icons/io5";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  avatar?: string;
  joinedDate: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  dashboardPath: string;
  color: string;
}

const RolesPermission: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showAddUser, setShowAddUser] = useState(false);
  
  // New user form state
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("student");

  // Available Roles in the System
  const roles: Role[] = [
    {
      id: "admin",
      name: "Admin",
      description: "Full administrative access to the system",
      dashboardPath: "/admin/dashboard",
      color: "bg-primary-50",
    },
    {
      id: "teacher",
      name: "Teacher",
      description: "Access to teaching and student management",
      dashboardPath: "/teacher/dashboard",
      color: "bg-primary-100",
    },
    {
      id: "student",
      name: "Student",
      description: "Access to student portal and courses",
      dashboardPath: "/student/dashboard",
      color: "bg-primary-50",
    },
    {
      id: "accountant",
      name: "Accountant",
      description: "Financial management and reporting",
      dashboardPath: "/accountant/dashboard",
      color: "bg-primary-100",
    },
    {
      id: "parent",
      name: "Parent",
      description: "View student progress and information",
      dashboardPath: "/parent/dashboard",
      color: "bg-primary-50",
    },
  ];

  // System Users with Assigned Roles
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@school.com",
      role: "admin",
      status: "active",
      joinedDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@school.com",
      role: "admin",
      status: "active",
      joinedDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Dr. Michael Brown",
      email: "m.brown@school.com",
      role: "teacher",
      status: "active",
      joinedDate: "2024-01-10",
    },
    {
      id: "4",
      name: "Prof. Emily Davis",
      email: "e.davis@school.com",
      role: "teacher",
      status: "active",
      joinedDate: "2024-03-05",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "r.wilson@school.com",
      role: "teacher",
      status: "active",
      joinedDate: "2024-02-15",
    },
    {
      id: "6",
      name: "Alice Cooper",
      email: "alice.c@student.school.com",
      role: "student",
      status: "active",
      joinedDate: "2024-09-01",
    },
    {
      id: "7",
      name: "Bob Martinez",
      email: "bob.m@student.school.com",
      role: "student",
      status: "active",
      joinedDate: "2024-09-01",
    },
    {
      id: "8",
      name: "Carol White",
      email: "carol.w@school.com",
      role: "accountant",
      status: "active",
      joinedDate: "2024-01-20",
    },
    {
      id: "9",
      name: "David Lee",
      email: "david.l@school.com",
      role: "accountant",
      status: "active",
      joinedDate: "2024-04-10",
    },
    {
      id: "10",
      name: "Emma Taylor",
      email: "emma.t@parent.school.com",
      role: "parent",
      status: "active",
      joinedDate: "2024-09-05",
    },
  ]);

  const changeUserRole = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "active",
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setUsers([...users, newUser]);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("student");
    setShowAddUser(false);
  };

  const getRoleInfo = (roleId: string) => {
    return roles.find(r => r.id === roleId);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getUserCountByRole = (roleId: string) => {
    return users.filter(u => u.role === roleId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2 flex items-center gap-3">
              <IoShieldCheckmarkOutline className="w-7 h-7 sm:w-8 sm:h-8" />
              User Roles Management
            </h1>
            <p className="text-sm sm:text-base text-primary-50/60">
              Assign roles to users to control their dashboard access
            </p>
          </div>

          <button
            onClick={() => setShowAddUser(!showAddUser)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium"
          >
            <IoAddOutline className="w-5 h-5" />
            Add New User
          </button>
        </div>
      </div>

      {/* Roles Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`${role.color} w-3 h-3 rounded-full`} />
              <h3 className="font-bold text-primary-50 text-sm">{role.name}</h3>
            </div>
            <div className="text-2xl font-bold text-primary-100 mb-1">
              {getUserCountByRole(role.id)}
            </div>
            <div className="text-xs text-primary-50/60">users</div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-50/40" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-primary-50">
            System Users
            <span className="text-sm font-normal text-primary-50/60 ml-2">
              ({filteredUsers.length} users)
            </span>
          </h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-50/60 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-50/60 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-50/60 uppercase tracking-wider">
                  Current Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-50/60 uppercase tracking-wider">
                  Change Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-50/60 uppercase tracking-wider">
                  Dashboard Access
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-50/60 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-50/60 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-50/10 flex items-center justify-center">
                          <IoPersonOutline className="w-5 h-5 text-primary-50" />
                        </div>
                        <div className="font-medium text-primary-50">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-primary-50/60">
                        <IoMailOutline className="w-4 h-4" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`${roleInfo?.color} w-2 h-2 rounded-full`} />
                        <span className="text-sm font-medium text-primary-50">
                          {roleInfo?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => changeUserRole(user.id, e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-50"
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-primary-50">
                        {roleInfo?.dashboardPath}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-primary-100/10 text-primary-100"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <IoCreateOutline className="w-4 h-4 text-primary-50" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 hover:bg-red-50 rounded transition-colors"
                        >
                          <IoTrashOutline className="w-4 h-4 text-primary-50" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4 space-y-4">
          {filteredUsers.map((user) => {
            const roleInfo = getRoleInfo(user.role);
            return (
              <div
                key={user.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-50/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-50/10 flex items-center justify-center">
                      <IoPersonOutline className="w-6 h-6 text-primary-50" />
                    </div>
                    <div>
                      <div className="font-bold text-primary-50">{user.name}</div>
                      <div className="text-xs text-primary-50/60">{user.email}</div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                      <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50/60" />
                    </button>
                    
                    <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[120px]">
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary-50 hover:bg-gray-50">
                        <IoCreateOutline className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary-50 hover:bg-gray-50"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-primary-50/60 mb-1">Role</div>
                    <select
                      value={user.role}
                      onChange={(e) => changeUserRole(user.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-50"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="text-xs text-primary-50/60 mb-1">Dashboard Access</div>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded text-primary-50 block">
                      {roleInfo?.dashboardPath}
                    </code>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-primary-50/60">Status</div>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-primary-100/10 text-primary-100"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {user.status}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <IoPersonOutline className="w-16 h-16 text-primary-50/20 mx-auto mb-4" />
            <p className="text-primary-50/60">No users found</p>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary-50 flex items-center gap-2">
                <IoAddOutline className="w-6 h-6" />
                Add New User
              </h2>
              <button
                onClick={() => setShowAddUser(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoTrashOutline className="w-5 h-5 text-primary-50/60" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                />
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Assign Role
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name} - {role.description}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-primary-50/60 mt-1">
                  Dashboard: {roles.find(r => r.id === newUserRole)?.dashboardPath}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddUser(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermission;
