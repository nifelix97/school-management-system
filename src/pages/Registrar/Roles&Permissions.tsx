import React, { useState } from "react";
import {
    IoAddOutline,
    IoCheckmarkOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoEllipsisVerticalOutline,
    IoMailOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline,
    IoTrashOutline
} from "react-icons/io5";
import {
    useActivateUserMutation,
    useApproveUserMutation,
    useChangeRoleMutation,
    useDeactivateUserMutation,
    useGetAllUsersQuery,
    useGetRolesQuery,
    useRejectUserMutation,
} from "../../app/api/user";
import { ROLE_DASHBOARDS } from "../../utils/roles";

interface User {
  id: number;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  status: "active" | "inactive" | "suspended" | "pending";
  created_at: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  dashboardPath: string;
  color: string;
}

const RolePermission: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showAddUser, setShowAddUser] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // New user form state
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("student");

  // API Queries
  const { data: rolesData, isLoading: rolesLoading } = useGetRolesQuery();
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery || undefined,
    role: filterRole !== "all" ? filterRole : undefined,
  });

  // API Mutations
  const [changeRole] = useChangeRoleMutation();
  const [activateUser] = useActivateUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const [approveUser] = useApproveUserMutation();
  const [rejectUser] = useRejectUserMutation();

  // Map API roles to Role objects for UI
  const roles: Role[] = (rolesData?.data || []).map((roleName) => ({
    id: roleName.toLowerCase(),
    name: roleName,
    description: `Access to ${roleName} specialized features`,
    dashboardPath: ROLE_DASHBOARDS[roleName] || "/dashboard",
    color: getRoleColor(roleName),
  }));

  function getRoleColor(role: string): string {
    const colors: Record<string, string> = {
      Admin: "bg-red-500",
      Principal: "bg-blue-600",
      Teacher: "bg-green-500",
      Student: "bg-yellow-500",
      Accountant: "bg-purple-500",
      Registrar: "bg-indigo-500",
    };
    return colors[role] || "bg-gray-400";
  }

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await changeRole({ userId, role: newRole }).unwrap();
    } catch (error) {
      console.error("Failed to change role:", error);
      alert("Failed to update role");
    }
  };

  const handleStatusChange = async (userId: number, newStatus: string) => {
    try {
      if (newStatus === "active") {
        await activateUser(userId).unwrap();
      } else {
        await deactivateUser(userId).unwrap();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    }
  };

  const handleApprove = async (userId: number) => {
    if (confirm("Are you sure you want to approve this user?")) {
      try {
        await approveUser(userId).unwrap();
      } catch (error) {
        console.error("Failed to approve user:", error);
        alert("Failed to approve user");
      }
    }
  };

  const handleReject = async (userId: number) => {
    if (confirm("Are you sure you want to reject this user? This action cannot be undone.")) {
      try {
        await rejectUser(userId).unwrap();
      } catch (error) {
        console.error("Failed to reject user:", error);
        alert("Failed to reject user");
      }
    }
  };

  const handleAddUser = () => {
    alert("User addition functionality is currently handled via Registration.");
    setShowAddUser(false);
  };

  const getRoleInfo = (roleName: string) => {
    return roles.find(r => r.name === roleName) || {
      name: roleName,
      color: "bg-gray-400"
    };
  };

  const users = (usersData?.data?.users as unknown as User[]) || [];
  const totalUsers = usersData?.data?.total || 0;
  const totalPages = usersData?.data?.totalPages || 1;

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterRole]);

  if (rolesLoading || usersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-50"></div>
      </div>
    );
  }

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
        {roles.slice(0, 5).map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`${role.color} w-3 h-3 rounded-full`} />
              <h3 className="font-bold text-primary-50 text-sm">{role.name}</h3>
            </div>
            <div className="text-2xl font-bold text-primary-100 mb-1">
              -
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
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
          >
            <option value="all">All Roles</option>
            {rolesData?.data?.map((roleName) => (
              <option key={roleName} value={roleName}>
                {roleName}
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
              ({totalUsers} users)
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
                  Current Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-50/60 uppercase tracking-wider">
                  Change Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-50/60 uppercase tracking-wider">
                  Change Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-50/60 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-50/10 flex items-center justify-center">
                          <IoPersonOutline className="w-5 h-5 text-primary-50" />
                        </div>
                        <div className="font-medium text-primary-50">{`${user.first_name} ${user.last_name}`}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-primary-50/60 break-all">
                        <IoMailOutline className="w-4 h-4" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`${roleInfo?.color} w-2 h-2 rounded-full`} />
                        <span className="text-sm font-medium text-primary-50">
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-primary-100/10 text-primary-100"
                          : "bg-gray-200 text-gray-600"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="w-full min-w-[120px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-50 bg-white"
                      >
                        {rolesData?.data?.map((roleName) => (
                          <option key={roleName} value={roleName}>
                            {roleName}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className="w-full min-w-[120px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-50 bg-white"
                      >
                        <option value="active">Active</option>
                        <option value="suspended">Deactivated</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {user.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(user.id)}
                              className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                              title="Approve User"
                            >
                              <IoCheckmarkOutline className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleReject(user.id)}
                              className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Reject User"
                            >
                              <IoCloseOutline className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        <button
                          className="p-2 hover:bg-red-50 rounded transition-colors"
                          title="Delete User"
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
          {users.map((user) => {
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
                      <div className="font-bold text-primary-50">{`${user.first_name} ${user.last_name}`}</div>
                      <div className="text-xs text-primary-50/60">{user.email}</div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                      <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50/60" />
                    </button>
                    
                    <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[120px]">
                      <button
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
                    <div className="text-xs text-primary-50/60 mb-1">Current Role</div>
                    <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-primary-50 font-medium">
                      {user.role}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-primary-50/60 mb-1">Current Status</div>
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                        user.status === "active"
                          ? "bg-primary-100/10 text-primary-100"
                          : "bg-gray-200 text-gray-600"
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-primary-50/60 mb-1">Change Role</div>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-50"
                    >
                      {rolesData?.data?.map((roleName) => (
                        <option key={roleName} value={roleName}>
                          {roleName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="text-xs text-primary-50/60 mb-1">Change Status</div>
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-50"
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Deactivated</option>
                    </select>
                  </div>

                  {user.status === "pending" && (
                    <div className="pt-2 border-t border-gray-100 flex gap-2">
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                      >
                        <IoCheckmarkOutline className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        <IoCloseOutline className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <IoPersonOutline className="w-16 h-16 text-primary-50/20 mx-auto mb-4" />
            <p className="text-primary-50/60">No users found</p>
          </div>
        )}

        {/* Pagination Controls */}
        {users.length > 0 && totalPages > 1 && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Page Info */}
              <div className="text-sm text-primary-50/60">
                Showing Page <span className="font-medium text-primary-50">{currentPage}</span> of{" "}
                <span className="font-medium text-primary-50">{totalPages}</span>
                <span className="ml-2">({totalUsers} total users)</span>
              </div>

              {/* Pagination Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <IoChevronBackOutline className="w-5 h-5 text-primary-50" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage = 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1);
                    
                    const showEllipsis = 
                      (page === currentPage - 2 && currentPage > 3) ||
                      (page === currentPage + 2 && currentPage < totalPages - 2);

                    if (showEllipsis) {
                      return (
                        <span key={page} className="px-2 text-primary-50/40">
                          ...
                        </span>
                      );
                    }

                    if (!showPage) return null;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-primary-50 text-white"
                            : "border border-gray-200 text-primary-50 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <IoChevronForwardOutline className="w-5 h-5 text-primary-50" />
                </button>
              </div>
            </div>
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

export default RolePermission;
