import {
    AlertCircle,
    CheckCircle,
    Download,
    Filter,
    RefreshCw,
    Search,
    ThumbsDown,
    ThumbsUp,
    XCircle
} from "lucide-react";
import React, { useState } from "react";
import type { RefundRecord } from "../../types/financial";

const RefundPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock refund data - using state so we can update it
  const [refundRecords, setRefundRecords] = useState<RefundRecord[]>([
    {
      id: "REF001",
      studentName: "Nakato Sarah",
      studentId: "STU2024001",
      originalReceiptNumber: "RCP-2024-001",
      originalAmount: 1500000,
      refundAmount: 1500000,
      refundReason: "Course withdrawal - Medical reasons",
      requestDate: "2024-01-20",
      processedDate: "2024-01-22",
      status: "completed",
      paymentMethod: "Bank Transfer",
      refundReference: "REFUND-2024-001",
      approvedBy: "Dr. Musoke",
      notes: "Full refund approved due to medical documentation",
    },
    {
      id: "REF002",
      studentName: "Okello James",
      studentId: "STU2024002",
      originalReceiptNumber: "RCP-2024-002",
      originalAmount: 750000,
      refundAmount: 500000,
      refundReason: "Duplicate payment",
      requestDate: "2024-01-19",
      processedDate: "2024-01-21",
      status: "approved",
      paymentMethod: "Mobile Money",
      refundReference: "REFUND-2024-002",
      approvedBy: "Ms. Atim",
      notes: "Partial refund - processing fee deducted",
    },
    {
      id: "REF003",
      studentName: "Namukasa Grace",
      studentId: "STU2024003",
      originalReceiptNumber: "RCP-2024-003",
      originalAmount: 2000000,
      refundAmount: 2000000,
      refundReason: "Accommodation cancellation",
      requestDate: "2024-01-18",
      status: "pending",
      paymentMethod: "Cash",
      notes: "Awaiting approval from finance department",
    },
    {
      id: "REF004",
      studentName: "Musoke David",
      studentId: "STU2024004",
      originalReceiptNumber: "RCP-2024-004",
      originalAmount: 500000,
      refundAmount: 500000,
      refundReason: "System error - payment not recorded",
      requestDate: "2024-01-17",
      processedDate: "2024-01-17",
      status: "rejected",
      paymentMethod: "Bank Transfer",
      approvedBy: "Dr. Musoke",
      notes: "Payment was properly recorded - request denied",
    },
    {
      id: "REF005",
      studentName: "Atim Betty",
      studentId: "STU2024005",
      originalReceiptNumber: "RCP-2024-005",
      originalAmount: 1200000,
      refundAmount: 1200000,
      refundReason: "Course not available this semester",
      requestDate: "2024-01-16",
      status: "pending",
      paymentMethod: "Mobile Money",
      notes: "Pending verification of course availability",
    },
    {
      id: "REF006",
      studentName: "Kato Emmanuel",
      studentId: "STU2024006",
      originalReceiptNumber: "RCP-2024-006",
      originalAmount: 800000,
      refundAmount: 600000,
      refundReason: "Late enrollment - partial semester",
      requestDate: "2024-01-15",
      processedDate: "2024-01-19",
      status: "completed",
      paymentMethod: "Bank Transfer",
      refundReference: "REFUND-2024-003",
      approvedBy: "Ms. Atim",
      notes: "Pro-rated refund for missed weeks",
    },
  ]);

  // Handler for Approve button
  const handleApprove = (refundId: string) => {
    setRefundRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === refundId
          ? {
              ...record,
              status: "approved" as const,
              processedDate: new Date().toISOString().split('T')[0],
              approvedBy: "Accountant", // In real app, this would be the logged-in user
              refundReference: record.refundReference || `REFUND-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
            }
          : record
      )
    );
  };

  // Handler for Reject button
  const handleReject = (refundId: string) => {
    setRefundRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === refundId
          ? {
              ...record,
              status: "rejected" as const,
              processedDate: new Date().toISOString().split('T')[0],
              approvedBy: "Accountant", // In real app, this would be the logged-in user
            }
          : record
      )
    );
  };

  // Handler for Export button
  const handleExport = () => {
    const dataStr = JSON.stringify(filteredRefunds, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `refund_records_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  const statusColors = {
    completed: "bg-primary-100/20 text-primary-100",
    approved: "bg-primary-300/20 text-primary-300",
    pending: "bg-primary-200/20 text-primary-200",
    rejected: "bg-red-100 text-red-700",
  };

  const statusIcons = {
    completed: CheckCircle,
    approved: CheckCircle,
    pending: AlertCircle,
    rejected: XCircle,
  };

  // Filter refund records
  const filteredRefunds = refundRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.originalReceiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.refundReference?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesFilter = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const totalRefundRequests = refundRecords.length;
  const totalRefundAmount = refundRecords
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + r.refundAmount, 0);
  const pendingRequests = refundRecords.filter((r) => r.status === "pending").length;
  const pendingAmount = refundRecords
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.refundAmount, 0);

  const formatCurrency = (amount: number) => {
    return `FRW ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          Refund Management
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Process and track student refund requests
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Total Requests
            </div>
            <div className="bg-primary-100/10 p-2 rounded-lg">
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-primary-100" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-50">
            {totalRefundRequests}
          </div>
          <div className="text-xs sm:text-sm text-primary-100 mt-2">
            All time refund requests
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Total Refunded
            </div>
            <div className="bg-primary-100/10 p-2 rounded-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-100" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-50">
            {formatCurrency(totalRefundAmount)}
          </div>
          <div className="text-xs sm:text-sm text-primary-100 mt-2">
            Completed refunds
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Pending Requests
            </div>
            <div className="bg-primary-200/10 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-200" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-50">
            {pendingRequests}
          </div>
          <div className="text-xs sm:text-sm text-primary-200 mt-2">
            Awaiting approval
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Pending Amount
            </div>
            <div className="bg-primary-200/10 p-2 rounded-lg">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-200" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-50">
            {formatCurrency(pendingAmount)}
          </div>
          <div className="text-xs sm:text-sm text-primary-200 mt-2">
            To be processed
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
        {/* Filters and Actions */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <input
                type="text"
                placeholder="Search refunds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
              />
            </div>

            {/* Filter by Status */}
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                    Refund ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                    Student
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                    Original Receipt
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                    Refund Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                    Reason
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                    Request Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRefunds.map((record) => {
                  const StatusIcon = statusIcons[record.status];
                  return (
                    <tr
                      key={record.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm text-primary-50 font-medium">
                        {record.refundReference || record.id}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-primary-50 font-medium">
                          {record.studentName}
                        </div>
                        <div className="text-xs text-primary-50/60">
                          {record.studentId}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-primary-50">
                        {record.originalReceiptNumber}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-primary-50 font-semibold">
                          {formatCurrency(record.refundAmount)}
                        </div>
                        <div className="text-xs text-primary-50/60">
                          of {formatCurrency(record.originalAmount)}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-primary-50 max-w-xs truncate">
                        {record.refundReason}
                      </td>
                      <td className="py-4 px-4 text-sm text-primary-50">
                        {new Date(record.requestDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[record.status]
                          }`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {record.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(record.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-xs"
                              title="Approve refund"
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(record.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:opacity-90 transition-opacity text-xs"
                              title="Reject refund"
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-primary-50/40">
                            {record.status === "approved" && "Awaiting completion"}
                            {record.status === "completed" && "Processed"}
                            {record.status === "rejected" && "Rejected"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-3 sm:space-y-4">
            {filteredRefunds.map((record) => {
              const StatusIcon = statusIcons[record.status];
              return (
                <div
                  key={record.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm font-semibold text-primary-50 mb-1">
                        {record.studentName}
                      </div>
                      <div className="text-xs text-primary-50/60">
                        {record.studentId}
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        statusColors[record.status]
                      }`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <div className="text-primary-50/60 mb-1">Refund ID</div>
                      <div className="text-primary-50 font-medium">
                        {record.refundReference || record.id}
                      </div>
                    </div>
                    <div>
                      <div className="text-primary-50/60 mb-1">Original Receipt</div>
                      <div className="text-primary-50 font-medium">
                        {record.originalReceiptNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-primary-50/60 mb-1">Refund Amount</div>
                      <div className="text-primary-50 font-semibold">
                        {formatCurrency(record.refundAmount)}
                      </div>
                    </div>
                    <div>
                      <div className="text-primary-50/60 mb-1">Original Amount</div>
                      <div className="text-primary-50">
                        {formatCurrency(record.originalAmount)}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-primary-50/60 mb-1">Reason</div>
                      <div className="text-primary-50">{record.refundReason}</div>
                    </div>
                    <div>
                      <div className="text-primary-50/60 mb-1">Request Date</div>
                      <div className="text-primary-50">
                        {new Date(record.requestDate).toLocaleDateString()}
                      </div>
                    </div>
                    {record.processedDate && (
                      <div>
                        <div className="text-primary-50/60 mb-1">Processed Date</div>
                        <div className="text-primary-50">
                          {new Date(record.processedDate).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                    {record.approvedBy && (
                      <div className="col-span-2">
                        <div className="text-primary-50/60 mb-1">Approved By</div>
                        <div className="text-primary-50">{record.approvedBy}</div>
                      </div>
                    )}
                    {record.notes && (
                      <div className="col-span-2">
                        <div className="text-primary-50/60 mb-1">Notes</div>
                        <div className="text-primary-50 text-xs">{record.notes}</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons for Mobile */}
                  {record.status === "pending" && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                      <button
                        onClick={() => handleApprove(record.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(record.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredRefunds.length === 0 && (
            <div className="text-center py-12">
              <div className="text-primary-50/40 mb-2">No refund records found</div>
              <div className="text-sm text-primary-50/60">
                Try adjusting your search or filters
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RefundPage;
