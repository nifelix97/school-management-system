import React, { useState } from "react";
import {
    IoInformationCircleOutline,
    IoPeopleOutline,
    IoRefreshOutline,
    IoSaveOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoSettingsOutline,
    IoShieldCheckmarkOutline,
    IoStatsChartOutline,
    IoWalletOutline
} from "react-icons/io5";
import { ALL_ROLES } from "../../utils/roles";

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface PermissionGroup {
  category: string;
  icon: React.ReactNode;
  permissions: Permission[];
}

const RolesPermissions: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState(ALL_ROLES[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([
    {
      category: "User & Access Management",
      icon: <IoPeopleOutline />,
      permissions: [
        { id: "u_view", name: "View All Users", description: "Ability to see the list of all users in the system.", enabled: true },
        { id: "u_create", name: "Create Users", description: "Create new user accounts for any role.", enabled: false },
        { id: "u_edit", name: "Edit User Data", description: "Modify profile and professional data of users.", enabled: false },
        { id: "u_delete", name: "Suspend/Delete Users", description: "Deactivate or remove users from the system.", enabled: false },
      ],
    },
    {
      category: "Academic Control",
      icon: <IoSchoolOutline />,
      permissions: [
        { id: "a_manage", name: "Manage Curriculum", description: "Define courses, departments, and course materials.", enabled: true },
        { id: "a_grades", name: "View Global Grades", description: "Access academic performance data across the institution.", enabled: true },
        { id: "a_exams", name: "Exam Coordination", description: "Schedule and manage institutional examinations.", enabled: false },
      ],
    },
    {
      category: "Financial Operations",
      icon: <IoWalletOutline />,
      permissions: [
        { id: "f_view", name: "View Revenue Reports", description: "See institution-wide financial reports.", enabled: false },
        { id: "f_manage", name: "Manage Budgets", description: "Allocate and track departmental budgets.", enabled: false },
        { id: "f_payroll", name: "Payroll Access", description: "Process and view employee salary data.", enabled: false },
      ],
    },
    {
      category: "System & Infrastructure",
      icon: <IoSettingsOutline />,
      permissions: [
        { id: "s_config", name: "General Settings", description: "Modify global system preferences.", enabled: false },
        { id: "s_backup", name: "Data Maintenance", description: "Trigger system backups and maintenance mode.", enabled: false },
        { id: "s_audit", name: "View Audit Logs", description: "Monitor all administrative actions.", enabled: true },
      ],
    },
  ]);

  const togglePermission = (groupIdx: number, permId: string) => {
    const newGroups = [...permissionGroups];
    const perm = newGroups[groupIdx].permissions.find((p) => p.id === permId);
    if (perm) perm.enabled = !perm.enabled;
    setPermissionGroups(newGroups);
  };

  const filteredRoles = ALL_ROLES.filter((role) =>
    role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
            <IoShieldCheckmarkOutline className="text-primary-100" />
            Roles & Permissions
          </h1>
          <p className="text-gray-500 mt-1 italic font-medium">Fine-tune system access for {ALL_ROLES.length} global roles.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-600 rounded-xl text-sm font-bold border border-gray-100 shadow-sm hover:bg-gray-50 transition-all">
            <IoRefreshOutline className="text-lg" />
            Reset Defaults
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-primary-100 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-100/20 hover:opacity-90 transition-all">
            <IoSaveOutline className="text-lg" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Role Selection Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[70vh]">
          <div className="p-6 border-b border-gray-50">
            <div className="relative">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search roles..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-primary-100 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
            {filteredRoles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all ${
                  selectedRole === role
                    ? "bg-primary-50/10 text-primary-50 font-bold"
                    : "text-gray-500 hover:bg-gray-50 font-medium"
                }`}
              >
                <span>{role}</span>
                {selectedRole === role && <div className="w-2 h-2 rounded-full bg-primary-100" />}
              </button>
            ))}
          </div>
        </div>

        {/* Permission Matrix Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-primary-300 text-white p-6 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl text-2xl tracking-tight">
              <IoStatsChartOutline />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Configuration For</p>
              <h2 className="text-2xl font-bold">{selectedRole}</h2>
            </div>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin">
            {permissionGroups.map((group, gIdx) => (
              <div key={gIdx} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-2.5 bg-primary-50/10 text-primary-50 rounded-xl text-xl">
                    {group.icon}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">{group.category}</h3>
                </div>
                
                <div className="grid gap-4">
                  {group.permissions.map((perm) => (
                    <div key={perm.id} className="flex items-start justify-between p-4 rounded-2xl border border-gray-50 hover:border-primary-100/30 hover:bg-primary-50/5 transition-all group">
                      <div className="max-w-[80%]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-gray-700">{perm.name}</span>
                          <IoInformationCircleOutline className="text-gray-300 hover:text-primary-100 cursor-help transition-colors" />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed font-normal">{perm.description}</p>
                      </div>
                      
                      <button
                        onClick={() => togglePermission(gIdx, perm.id)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                          perm.enabled ? "bg-primary-100" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            perm.enabled ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissions;
