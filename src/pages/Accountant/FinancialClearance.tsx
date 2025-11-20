import React, { useState } from "react";
import {
  IoSearchOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoFilterOutline,
  IoSchoolOutline,
  IoDocumentTextOutline,
  IoCalendarOutline,
} from "react-icons/io5";

interface ClearanceRequest {
  id: string;
  studentName: string;
  studentId: string;
  clearanceType: string;
  requestDate: string;
  balance: string;
  status: "approved" | "pending" | "rejected";
  reason?: string;
}

const FinancialClearance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const clearanceRequests: ClearanceRequest[] = [
    {
      id: "CLR-001",
      studentName: "Nakato Sarah",
      studentId: "STU2024001",
      clearanceType: "Examination",
      requestDate: "2024-01-15",
      balance: "UGX 0",
      status: "approved",
    },
    {
      id: "CLR-002",
      studentName: "Okello James",
      studentId: "STU2024002",
      clearanceType: "Registration",
      requestDate: "2024-01-14",
      balance: "UGX 500,000",
      status: "pending",
    },
    {
      id: "CLR-003",
      studentName: "Namukasa Grace",
      studentId: "STU2024003",
      clearanceType: "Graduation",
      requestDate: "2024-01-13",
      balance: "UGX 0",
      status: "approved",
    },
    {
      id: "CLR-004",
      studentName: "Musoke David",
      studentId: "STU2024004",
      clearanceType: "Transcript",
      requestDate: "2024-01-12",
      balance: "UGX 1,200,000",
      status: "rejected",
      reason: "Outstanding balance",
    },
    {
      id: "CLR-005",
      studentName: "Atim Betty",
      studentId: "STU2024005",
      clearanceType: "Examination",
      requestDate: "2024-01-11",
      balance: "UGX 0",
      status: "approved",
    },
  ];

  const statusColors = {
    approved: "bg-primary-100/20 text-primary-100",
    pending: "bg-primary-200/20 text-primary-200",
    rejected: "bg-primary-300/20 text-primary-300",
  };

  const filteredRequests = clearanceRequests.filter((request) => {
    const matchesSearch =
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || request.status === filterStatus;
    const matchesType = filterType === "all" || request.clearanceType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-50 mb-2">Financial Clearance</h1>
        <p className="text-primary-50/60">Approve or reject student financial clearance requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <IoSchoolOutline className="text-2xl text-primary-100" />
            <p className="text-primary-50/60 text-sm">Total Requests</p>
          </div>
          <p className="text-3xl font-bold text-primary-50">156</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <IoCheckmarkCircleOutline className="text-2xl text-primary-100" />
            <p className="text-primary-50/60 text-sm">Approved</p>
          </div>
          <p className="text-3xl font-bold text-primary-100">98</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <IoCalendarOutline className="text-2xl text-primary-200" />
            <p className="text-primary-50/60 text-sm">Pending</p>
          </div>
          <p className="text-3xl font-bold text-primary-200">45</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <IoCloseCircleOutline className="text-2xl text-primary-300" />
            <p className="text-primary-50/60 text-sm">Rejected</p>
          </div>
          <p className="text-3xl font-bold text-primary-300">13</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full md:w-auto">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 md:flex-initial px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50 appearance-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="Examination">Examination</option>
              <option value="Registration">Registration</option>
              <option value="Graduation">Graduation</option>
              <option value="Transcript">Transcript</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clearance Requests Table - Desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-50/5 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Request ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Clearance Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Request Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Balance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-primary-50">{request.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-primary-50">{request.studentName}</p>
                      <p className="text-xs text-primary-50/60">{request.studentId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <IoDocumentTextOutline className="text-primary-50" />
                      <span className="text-sm text-primary-50">{request.clearanceType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-primary-50">{request.requestDate}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${request.balance === "UGX 0" ? "text-primary-100" : "text-primary-300"}`}>
                      {request.balance}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                      {request.status}
                    </span>
                    {request.reason && (
                      <p className="text-xs text-primary-50/60 mt-1">{request.reason}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 bg-primary-100/20 text-primary-100 rounded hover:bg-primary-100/30 transition-colors text-sm font-medium"
                          title="Approve"
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 bg-primary-300/20 text-primary-300 rounded hover:bg-primary-300/30 transition-colors text-sm font-medium"
                          title="Reject"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clearance Requests Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-primary-50 text-sm">{request.id}</p>
                <p className="font-medium text-primary-50 mt-1">{request.studentName}</p>
                <p className="text-xs text-primary-50/60">{request.studentId}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                {request.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                <IoDocumentTextOutline className="text-primary-50" />
                <div>
                  <p className="text-xs text-primary-50/60">Clearance Type</p>
                  <p className="text-sm text-primary-50 font-medium">{request.clearanceType}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-primary-50/60">Request Date</p>
                  <p className="text-sm text-primary-50">{request.requestDate}</p>
                </div>
                <div>
                  <p className="text-xs text-primary-50/60">Balance</p>
                  <p className={`text-sm font-semibold ${request.balance === "UGX 0" ? "text-primary-100" : "text-primary-300"}`}>
                    {request.balance}
                  </p>
                </div>
              </div>

              {request.reason && (
                <div className="bg-primary-300/10 rounded p-2">
                  <p className="text-xs text-primary-50/60">Reason</p>
                  <p className="text-sm text-primary-50">{request.reason}</p>
                </div>
              )}
            </div>

            {request.status === "pending" && (
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-100/20 text-primary-100 rounded-lg hover:bg-primary-100/30 transition-colors text-sm font-medium">
                  <IoCheckmarkCircleOutline className="text-lg" />
                  <span>Approve</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-300/20 text-primary-300 rounded-lg hover:bg-primary-300/30 transition-colors text-sm font-medium">
                  <IoCloseCircleOutline className="text-lg" />
                  <span>Reject</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialClearance;