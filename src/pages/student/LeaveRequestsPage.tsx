import { useState } from "react";
import {
  ChevronLeft,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  Plus,
} from "lucide-react";

interface LeaveRequest {
  id: number;
  fromDate: Date;
  toDate: Date;
  reason: string;
  type: "medical" | "personal" | "family" | "emergency";
  status: "pending" | "approved" | "rejected";
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  comments?: string;
}

export default function LeaveRequestsPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");


  // My leave requests data
  const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      fromDate: new Date(2024, 11, 15),
      toDate: new Date(2024, 11, 16),
      reason: "Medical appointment with specialist doctor for routine checkup.",
      type: "medical",
      status: "approved",
      submittedAt: new Date(2024, 11, 10),
      reviewedAt: new Date(2024, 11, 11),
      reviewedBy: "Dr. Johnson",
      comments: "Medical certificate provided. Approved."
    },
    {
      id: 2,
      fromDate: new Date(2024, 11, 20),
      toDate: new Date(2024, 11, 20),
      reason: "Family wedding ceremony - cousin's wedding.",
      type: "family",
      status: "pending",
      submittedAt: new Date(2024, 11, 18)
    },
    {
      id: 3,
      fromDate: new Date(2024, 11, 25),
      toDate: new Date(2024, 11, 27),
      reason: "Personal emergency - family situation.",
      type: "emergency",
      status: "rejected",
      submittedAt: new Date(2024, 11, 22),
      reviewedAt: new Date(2024, 11, 23),
      reviewedBy: "Prof. Wilson",
      comments: "Please provide more documentation."
    },
    {
      id: 4,
      fromDate: new Date(2025, 0, 5),
      toDate: new Date(2025, 0, 7),
      reason: "Personal matters requiring attention.",
      type: "personal",
      status: "pending",
      submittedAt: new Date(2024, 11, 28)
    }
  ];

  const getFilteredRequests = () => {
    let filtered = leaveRequests;
    
    if (selectedStatus !== "all") {
      filtered = filtered.filter(req => req.status === selectedStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-700 border-green-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle size={16} className="text-green-600" />;
      case "rejected": return <XCircle size={16} className="text-red-600" />;
      default: return <AlertCircle size={16} className="text-yellow-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "medical": return "bg-blue-100 text-blue-700";
      case "family": return "bg-purple-100 text-purple-700";
      case "personal": return "bg-orange-100 text-orange-700";
      case "emergency": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const calculateDays = (fromDate: Date, toDate: Date) => {
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };



  const filteredRequests = getFilteredRequests();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Leave Requests</h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm sm:text-base">
            <Plus size={16} />
            <span className="hidden xs:inline">New Request</span>
            <span className="xs:hidden">New</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base min-w-[120px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-yellow-500">
            <div className="flex items-center gap-2 sm:gap-3">
              <AlertCircle className="text-yellow-600" size={18} />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Pending</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {leaveRequests.filter(r => r.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-green-500">
            <div className="flex items-center gap-2 sm:gap-3">
              <CheckCircle className="text-green-600" size={18} />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Approved</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {leaveRequests.filter(r => r.status === "approved").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4 border-red-500">
            <div className="flex items-center gap-2 sm:gap-3">
              <XCircle className="text-red-600" size={18} />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Rejected</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {leaveRequests.filter(r => r.status === "rejected").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border-l-4" style={{borderColor: 'var(--color-primary-50)'}}>
            <div className="flex items-center gap-2 sm:gap-3">
              <FileText style={{color: 'var(--color-primary-50)'}} size={18} />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{leaveRequests.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Cards */}
        <div className="space-y-3 sm:space-y-4 pb-6">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No leave requests found</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${getTypeColor(request.type)}`}>
                          {request.type}
                        </span>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">{request.reason}</p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Submitted</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-900">{request.submittedAt.toLocaleDateString()}</p>
                      {request.reviewedAt && (
                        <>
                          <p className="text-xs text-gray-400 mt-1">Reviewed by {request.reviewedBy}</p>
                          {request.comments && (
                            <p className="text-xs text-blue-600 mt-1 sm:max-w-xs">{request.comments}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{request.fromDate.toLocaleDateString()} - {request.toDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{calculateDays(request.fromDate, request.toDate)} day(s)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}