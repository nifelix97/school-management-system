import React, { useState } from "react";
import {
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoCloudDownloadOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoInformationCircleOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline,
    IoWarningOutline,
} from "react-icons/io5";

interface AuditLog {
  id: string;
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  action: "create" | "update" | "delete" | "login" | "error";
  module: string;
  target: string;
  timestamp: string;
  details: string;
  ipAddress: string;
  status: "success" | "failure" | "warning";
}

const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModule, setFilterModule] = useState("all");
  const [filterAction, setFilterAction] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Mock Data
  const [logs] = useState<AuditLog[]>([
    {
      id: "LOG-001",
      user: { name: "Dr. Sarah Admin", role: "Principal" },
      action: "update",
      module: "students",
      target: "Student: John Doe (ST-2024-001)",
      timestamp: "2024-03-15 10:30:00",
      details: "Updated grade for Mathematics 101 from B to A",
      ipAddress: "192.168.1.15",
      status: "success",
    },
    {
      id: "LOG-002",
      user: { name: "System", role: "Automated" },
      action: "create",
      module: "finance",
      target: "Invoice #INV-2024-889",
      timestamp: "2024-03-15 09:15:00",
      details: "Generated monthly tuition invoice for All Students",
      ipAddress: "127.0.0.1",
      status: "success",
    },
    {
      id: "LOG-003",
      user: { name: "Mr. James Smith", role: "Teacher" },
      action: "delete",
      module: "exams",
      target: "Quiz: Physics Ch.3",
      timestamp: "2024-03-14 14:20:00",
      details: "Deleted scheduled quiz for Class 10-A",
      ipAddress: "192.168.1.42",
      status: "warning",
    },
    {
      id: "LOG-004",
      user: { name: "Unknown", role: "Guest" },
      action: "login",
      module: "auth",
      target: "Login Page",
      timestamp: "2024-03-14 03:45:00",
      details: "Failed login attempt (Invalid Password)",
      ipAddress: "45.23.12.99",
      status: "failure",
    },
    {
      id: "LOG-005",
      user: { name: "Mrs. Linda White", role: "Accountant" },
      action: "update",
      module: "finance",
      target: "Fee Structure 2024",
      timestamp: "2024-03-13 11:00:00",
      details: "Updated late fee penalty from $10 to $15",
      ipAddress: "192.168.1.20",
      status: "success",
    },
    {
      id: "LOG-006",
      user: { name: "Dr. Sarah Admin", role: "Principal" },
      action: "create",
      module: "staff",
      target: "Staff: Michael Brown",
      timestamp: "2024-03-13 09:30:00",
      details: "Registered new library assistant",
      ipAddress: "192.168.1.15",
      status: "success",
    },
  ]);

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "text-green-600 bg-green-50 border-green-200";
      case "update":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "delete":
        return "text-red-600 bg-red-50 border-red-200";
      case "login":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "error":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <IoCheckmarkCircleOutline className="w-5 h-5 text-green-500" />;
      case "failure":
        return <IoCloseCircleOutline className="w-5 h-5 text-red-500" />;
      case "warning":
        return <IoWarningOutline className="w-5 h-5 text-orange-500" />;
      default:
        return <IoInformationCircleOutline className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = filterModule === "all" || log.module === filterModule;
    const matchesAction = filterAction === "all" || log.action === filterAction;
    return matchesSearch && matchesModule && matchesAction;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2 flex items-center gap-3">
              <IoShieldCheckmarkOutline className="w-7 h-7 sm:w-8 sm:h-8" />
              Audit Logs & Security
            </h1>
            <p className="text-sm sm:text-base text-primary-50/60">
              Track and monitor all system activities and security events.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium">
            <IoCloudDownloadOutline className="w-5 h-5" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm"
            />
          </div>

          {/* Module Filter */}
          <div className="relative">
            <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm appearance-none bg-white"
            >
              <option value="all">All Modules</option>
              <option value="auth">Authentication</option>
              <option value="students">Students</option>
              <option value="finance">Finance</option>
              <option value="exams">Exams</option>
              <option value="staff">Staff</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Action Filter */}
          <div className="relative">
            <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm appearance-none bg-white"
            >
              <option value="all">All Actions</option>
              <option value="create">Created</option>
              <option value="update">Updated</option>
              <option value="delete">Deleted</option>
              <option value="login">Login Attempts</option>
              <option value="error">Errors</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="relative">
            <IoCalendarOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm appearance-none bg-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table (Desktop) */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider">
                  Module & Target
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-primary-50/50">
                    No logs found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedLog(log)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary-50">{log.timestamp}</div>
                      <div className="text-xs text-primary-50/50 font-mono mt-0.5">{log.ipAddress}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100/10 flex items-center justify-center text-primary-100 font-bold text-xs ring-2 ring-white">
                          {log.user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-primary-50">{log.user.name}</div>
                          <div className="text-xs text-primary-50/50">{log.user.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getActionColor(
                          log.action
                        )}`}
                      >
                        {log.action.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-primary-50">{log.target}</div>
                      <div className="text-xs text-primary-50/50 uppercase tracking-wide mt-0.5">
                        {log.module}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(log.status)}
                        <span className="text-sm text-primary-50 capitalize">{log.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary-100 hover:text-primary-100/80 transition-colors p-1.5 hover:bg-primary-100/5 rounded-full">
                        <IoEyeOutline className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
         <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="text-xs text-primary-50/60">
                Showing {filteredLogs.length} of {logs.length} entries
            </div>
            <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-medium text-primary-50 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 text-xs font-medium text-primary-50 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
            </div>
         </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-primary-50/50 border border-gray-100">
            No logs found.
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow active:scale-[0.99]"
              onClick={() => setSelectedLog(log)}
            >
              <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100/10 flex items-center justify-center text-primary-100 font-bold">
                        {log.user.name.charAt(0)}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-primary-50">{log.user.name}</div>
                        <div className="text-xs text-primary-50/60">{log.user.role}</div>
                    </div>
                 </div>
                 <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${getActionColor(
                      log.action
                    )}`}
                  >
                    {log.action.toUpperCase()}
                  </span>
              </div>
              
              <div className="space-y-2 mb-3">
                  <div>
                      <div className="text-xs text-primary-50/50 uppercase tracking-wide">Target</div>
                      <div className="text-sm text-primary-50">{log.target}</div>
                  </div>
                  <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-primary-50/50 uppercase tracking-wide">Module</div>
                        <div className="text-sm text-primary-50 capitalize">{log.module}</div>
                      </div>
                      <div className="text-right">
                          <div className="text-xs text-primary-50/50 uppercase tracking-wide">Status</div>
                          <div className="flex items-center justify-end gap-1.5">
                             {getStatusIcon(log.status)}
                             <span className="text-sm text-primary-50 capitalize">{log.status}</span>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-primary-50/50">
                  <span>{log.timestamp}</span>
                  <button className="flex items-center gap-1 text-primary-100 font-medium">
                      Details <IoEyeOutline className="w-4 h-4" />
                  </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-lg font-bold text-primary-50 flex items-center gap-2">
                <IoInformationCircleOutline className="w-5 h-5 text-primary-100" />
                Log Details
              </h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-primary-50/50 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
              >
                <IoCloseCircleOutline className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-primary-50/50 uppercase tracking-wide mb-1">Log ID</div>
                  <div className="text-sm font-mono bg-gray-50 px-2 py-1 rounded border border-gray-100 text-primary-50">
                    {selectedLog.id}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-primary-50/50 uppercase tracking-wide mb-1">Timestamp</div>
                  <div className="text-sm font-medium text-primary-50">{selectedLog.timestamp}</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100/10 flex items-center justify-center text-primary-100 font-bold">
                        {selectedLog.user.name.charAt(0)}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-primary-50">{selectedLog.user.name}</div>
                        <div className="text-xs text-primary-50/60">{selectedLog.user.role} • {selectedLog.ipAddress}</div>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                        <span className="text-primary-50/60 min-w-[60px]">Action:</span>
                        <span className={`font-medium ${getActionColor(selectedLog.action).split(' ')[0]}`}>{selectedLog.action.toUpperCase()}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-primary-50/60 min-w-[60px]">Module:</span>
                        <span className="text-primary-50">{selectedLog.module}</span>
                    </div>
                     <div className="flex gap-2">
                        <span className="text-primary-50/60 min-w-[60px]">Target:</span>
                        <span className="font-medium text-primary-50">{selectedLog.target}</span>
                    </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-primary-50/50 uppercase tracking-wide mb-2">Full Details</div>
                <div className="p-3 bg-primary-50/5 rounded-lg border border-primary-50/10 text-sm text-primary-50/80 leading-relaxed">
                  {selectedLog.details}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs text-primary-50/50">Status:</span>
                  <div className="flex items-center gap-1 text-sm font-medium">
                      {getStatusIcon(selectedLog.status)}
                      <span className="capitalize text-primary-50">{selectedLog.status}</span>
                  </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-white border border-gray-200 text-primary-50 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
