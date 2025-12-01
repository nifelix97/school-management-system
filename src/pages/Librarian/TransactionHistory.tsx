import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoArrowBackOutline,
    IoArrowForwardOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoDownloadOutline,
    IoFilterOutline,
    IoRefreshOutline,
    IoSearchOutline,
    IoSwapHorizontalOutline,
    IoTimeOutline
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface Transaction {
  id: string;
  type: "checkout" | "return" | "renew";
  studentId: string;
  studentName: string;
  bookTitle: string;
  bookIsbn: string;
  transactionDate: string;
  dueDate?: string;
  returnDate?: string;
  status: "completed" | "active" | "overdue";
  fine?: number;
  processedBy: string;
}

const TransactionHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Mock data
  const allTransactions: Transaction[] = [
    {
      id: "TXN20241201001",
      type: "checkout",
      studentId: "STU2024001",
      studentName: "John Doe",
      bookTitle: "Introduction to Algorithms",
      bookIsbn: "978-0262033848",
      transactionDate: "2024-11-15",
      dueDate: "2024-12-15",
      status: "active",
      processedBy: "Sarah Johnson",
    },
    {
      id: "TXN20241201002",
      type: "return",
      studentId: "STU2024002",
      studentName: "Jane Smith",
      bookTitle: "Clean Code",
      bookIsbn: "978-0132350884",
      transactionDate: "2024-11-20",
      dueDate: "2024-11-25",
      returnDate: "2024-11-28",
      status: "overdue",
      fine: 1.50,
      processedBy: "Michael Brown",
    },
    {
      id: "TXN20241201003",
      type: "return",
      studentId: "STU2024003",
      studentName: "Mike Johnson",
      bookTitle: "Design Patterns",
      bookIsbn: "978-0201633612",
      transactionDate: "2024-10-20",
      dueDate: "2024-11-20",
      returnDate: "2024-11-18",
      status: "completed",
      processedBy: "Sarah Johnson",
    },
    {
      id: "TXN20241201004",
      type: "renew",
      studentId: "STU2024004",
      studentName: "Sarah Williams",
      bookTitle: "The Lean Startup",
      bookIsbn: "978-0307887894",
      transactionDate: "2024-11-25",
      dueDate: "2024-12-25",
      status: "active",
      processedBy: "Emily Davis",
    },
    {
      id: "TXN20241201005",
      type: "checkout",
      studentId: "STU2024005",
      studentName: "David Brown",
      bookTitle: "Artificial Intelligence",
      bookIsbn: "978-0136042594",
      transactionDate: "2024-11-28",
      dueDate: "2024-12-28",
      status: "active",
      processedBy: "Michael Brown",
    },
    {
      id: "TXN20241201006",
      type: "return",
      studentId: "STU2024006",
      studentName: "Emily Wilson",
      bookTitle: "Database Systems",
      bookIsbn: "978-0078022159",
      transactionDate: "2024-11-10",
      dueDate: "2024-11-24",
      returnDate: "2024-11-22",
      status: "completed",
      processedBy: "Sarah Johnson",
    },
  ];

  const types = [
    { value: "all", label: "All Types" },
    { value: "checkout", label: "Checkout" },
    { value: "return", label: "Return" },
    { value: "renew", label: "Renew" },
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "overdue", label: "Overdue" },
  ];

  // Filter transactions
  const filteredTransactions = allTransactions.filter((txn) => {
    const matchesSearch =
      txn.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.bookIsbn.includes(searchQuery) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || txn.type === selectedType;
    const matchesStatus = selectedStatus === "all" || txn.status === selectedStatus;
    
    const matchesDateFrom = !dateFrom || new Date(txn.transactionDate) >= new Date(dateFrom);
    const matchesDateTo = !dateTo || new Date(txn.transactionDate) <= new Date(dateTo);
    
    return matchesSearch && matchesType && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "checkout":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "return":
        return "bg-green-50 text-green-600 border-green-200";
      case "renew":
        return "bg-purple-50 text-purple-600 border-purple-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "checkout":
        return <IoArrowForwardOutline className="w-4 h-4" />;
      case "return":
        return <IoArrowBackOutline className="w-4 h-4" />;
      case "renew":
        return <IoRefreshOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "completed":
        return "bg-green-50 text-green-600 border-green-200";
      case "overdue":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <IoTimeOutline className="w-4 h-4" />;
      case "completed":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "overdue":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleExport = () => {
    // Create CSV header
    const headers = [
      "Transaction ID",
      "Type",
      "Student ID",
      "Student Name",
      "Book Title",
      "ISBN",
      "Transaction Date",
      "Due Date",
      "Return Date",
      "Status",
      "Fine",
      "Processed By"
    ];

    // Create CSV rows
    const rows = filteredTransactions.map(txn => [
      txn.id,
      txn.type,
      txn.studentId,
      txn.studentName,
      `"${txn.bookTitle}"`, // Wrap in quotes to handle commas
      txn.bookIsbn,
      txn.transactionDate,
      txn.dueDate || "",
      txn.returnDate || "",
      txn.status,
      txn.fine ? `$${txn.fine.toFixed(2)}` : "",
      txn.processedBy
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `transaction_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Transaction History
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              View and manage all library transactions
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <IoDownloadOutline className="w-5 h-5" />
            Export to CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Transactions</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary-50">{allTransactions.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-50/80 rounded-xl">
              <IoSwapHorizontalOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Active</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {allTransactions.filter((t) => t.status === "active").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <IoTimeOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Completed</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {allTransactions.filter((t) => t.status === "completed").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <IoCheckmarkCircleOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Overdue</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {allTransactions.filter((t) => t.status === "overdue").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
              <IoAlertCircleOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <IoFilterOutline className="w-5 h-5 text-primary-50" />
          <h2 className="text-lg font-bold text-primary-50">Filters</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {/* Search */}
          <div>
            <Input
              type="text"
              placeholder="Search by student, book, ISBN, or transaction ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<IoSearchOutline className="w-5 h-5" />}
            />
          </div>
          
          {/* Type and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="date"
              placeholder="From"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              leftIcon={<IoCalendarOutline className="w-5 h-5" />}
            />
            <Input
              type="date"
              placeholder="To"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              leftIcon={<IoCalendarOutline className="w-5 h-5" />}
            />
          </div>
        </div>
      </div>

      {/* Transactions Display */}
      {paginatedTransactions.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100 mb-6">
          <IoSwapHorizontalOutline className="w-12 h-12 text-primary-50/30 mx-auto mb-3" />
          <p className="text-primary-50/60">No transactions found</p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4 mb-6">
            {paginatedTransactions.map((txn) => (
              <div key={txn.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-primary-50 mb-1">{txn.bookTitle}</h3>
                    <p className="text-sm text-primary-50/60">{txn.studentName}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getTypeColor(txn.type)}`}>
                      {getTypeIcon(txn.type)}
                      {txn.type}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(txn.status)}`}>
                      {getStatusIcon(txn.status)}
                      {txn.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Transaction ID:</span>
                    <span className="font-medium text-primary-50">{txn.id}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Date:</span>
                    <span className="font-medium text-primary-50">{txn.transactionDate}</span>
                  </div>
                  {txn.dueDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/60">Due Date:</span>
                      <span className="font-medium text-primary-50">{txn.dueDate}</span>
                    </div>
                  )}
                  {txn.returnDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/60">Returned:</span>
                      <span className="font-medium text-primary-50">{txn.returnDate}</span>
                    </div>
                  )}
                  {txn.fine && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/60">Fine:</span>
                      <span className="font-bold text-red-600">${txn.fine.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Processed By:</span>
                    <span className="font-medium text-primary-50">{txn.processedBy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Due/Return Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Processed By
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm font-semibold text-primary-50">{txn.id}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${getTypeColor(txn.type)}`}>
                        {getTypeIcon(txn.type)}
                        {txn.type}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-primary-50">{txn.studentName}</div>
                        <div className="text-sm text-primary-50/60">{txn.studentId}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-primary-50">{txn.bookTitle}</div>
                        <div className="text-sm text-primary-50/60">{txn.bookIsbn}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{txn.transactionDate}</td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        {txn.returnDate ? (
                          <div>
                            <div className="text-primary-50/70">{txn.returnDate}</div>
                            {txn.fine && (
                              <div className="text-red-600 font-bold">Fine: ${txn.fine.toFixed(2)}</div>
                            )}
                          </div>
                        ) : txn.dueDate ? (
                          <div className="text-primary-50/70">{txn.dueDate}</div>
                        ) : (
                          <span className="text-primary-50/40">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${getStatusColor(txn.status)}`}>
                        {getStatusIcon(txn.status)}
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{txn.processedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-primary-50/70">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <IoChevronBackOutline className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                      currentPage === page
                        ? "bg-primary-50 text-white"
                        : "hover:bg-gray-100 text-primary-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <IoChevronForwardOutline className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
