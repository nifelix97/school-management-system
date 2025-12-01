import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoArrowBackOutline,
    IoArrowForwardOutline,
    IoBookOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoPersonOutline,
    IoRefreshOutline,
    IoSearchOutline,
    IoSwapHorizontalOutline,
    IoTimeOutline
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface Transaction {
  id: string;
  studentId: string;
  studentName: string;
  bookTitle: string;
  bookIsbn: string;
  type: "checkout" | "return" | "renew";
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
  status: "active" | "returned" | "overdue";
  fine?: number;
}

const Circulation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"checkout" | "return" | "renew">("checkout");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states
  const [checkoutForm, setCheckoutForm] = useState({
    studentId: "",
    bookIsbn: "",
  });

  const [returnForm, setReturnForm] = useState({
    transactionId: "",
  });

  // Mock data
  const transactions: Transaction[] = [
    {
      id: "TXN001",
      studentId: "STU2024001",
      studentName: "John Doe",
      bookTitle: "Introduction to Algorithms",
      bookIsbn: "978-0262033848",
      type: "checkout",
      checkoutDate: "2024-11-15",
      dueDate: "2024-12-15",
      status: "active",
    },
    {
      id: "TXN002",
      studentId: "STU2024002",
      studentName: "Jane Smith",
      bookTitle: "Clean Code",
      bookIsbn: "978-0132350884",
      type: "checkout",
      checkoutDate: "2024-11-10",
      dueDate: "2024-11-25",
      status: "overdue",
      fine: 5.00,
    },
    {
      id: "TXN003",
      studentId: "STU2024003",
      studentName: "Mike Johnson",
      bookTitle: "Design Patterns",
      bookIsbn: "978-0201633612",
      type: "return",
      checkoutDate: "2024-10-20",
      dueDate: "2024-11-20",
      returnDate: "2024-11-18",
      status: "returned",
    },
    {
      id: "TXN004",
      studentId: "STU2024004",
      studentName: "Sarah Williams",
      bookTitle: "The Lean Startup",
      bookIsbn: "978-0307887894",
      type: "checkout",
      checkoutDate: "2024-11-20",
      dueDate: "2024-12-20",
      status: "active",
    },
    {
      id: "TXN005",
      studentId: "STU2024005",
      studentName: "David Brown",
      bookTitle: "Artificial Intelligence",
      bookIsbn: "978-0136042594",
      type: "renew",
      checkoutDate: "2024-10-25",
      dueDate: "2024-12-25",
      status: "active",
    },
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "overdue", label: "Overdue" },
    { value: "returned", label: "Returned" },
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.bookIsbn.includes(searchQuery);
    const matchesStatus = selectedStatus === "all" || txn.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "overdue":
        return "bg-red-50 text-red-600 border-red-200";
      case "returned":
        return "bg-green-50 text-green-600 border-green-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <IoTimeOutline className="w-4 h-4" />;
      case "overdue":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      case "returned":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleCheckout = () => {
    // Implementation for checkout
    alert("Book checked out successfully!");
    setCheckoutForm({ studentId: "", bookIsbn: "" });
  };

  const handleReturn = () => {
    // Implementation for return
    alert("Book returned successfully!");
    setReturnForm({ transactionId: "" });
  };

  const handleRenew = (transactionId: string) => {
    // Implementation for renew
    alert(`Transaction ${transactionId} renewed successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
          Circulation Management
        </h1>
        <p className="text-sm sm:text-base text-primary-50/70">
          Manage book checkouts, returns, and renewals
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Active Loans</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {transactions.filter((t) => t.status === "active").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <IoSwapHorizontalOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Overdue</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {transactions.filter((t) => t.status === "overdue").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
              <IoAlertCircleOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Returned Today</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {transactions.filter((t) => t.status === "returned").length}
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
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Fines</p>
              <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                ${transactions.reduce((sum, t) => sum + (t.fine || 0), 0).toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
              <IoTimeOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("checkout")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            activeTab === "checkout"
              ? "bg-primary-50 text-white shadow-md"
              : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
          }`}
        >
          <IoArrowForwardOutline className="w-4 h-4" />
          Check Out
        </button>
        <button
          onClick={() => setActiveTab("return")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            activeTab === "return"
              ? "bg-primary-50 text-white shadow-md"
              : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
          }`}
        >
          <IoArrowBackOutline className="w-4 h-4" />
          Return
        </button>
        <button
          onClick={() => setActiveTab("renew")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
            activeTab === "renew"
              ? "bg-primary-50 text-white shadow-md"
              : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
          }`}
        >
          <IoRefreshOutline className="w-4 h-4" />
          Renew
        </button>
      </div>

      {/* Action Forms */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        {activeTab === "checkout" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-primary-50 mb-4">Check Out Book</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Student ID"
                type="text"
                placeholder="Enter student ID"
                value={checkoutForm.studentId}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, studentId: e.target.value })}
                leftIcon={<IoPersonOutline className="w-5 h-5" />}
                required
              />
              <Input
                label="Book ISBN"
                type="text"
                placeholder="Enter book ISBN"
                value={checkoutForm.bookIsbn}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, bookIsbn: e.target.value })}
                leftIcon={<IoBookOutline className="w-5 h-5" />}
                required
              />
            </div>
            <button
              onClick={handleCheckout}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              Check Out Book
            </button>
          </div>
        )}

        {activeTab === "return" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-primary-50 mb-4">Return Book</h2>
            <div className="max-w-md">
              <Input
                label="Transaction ID or Book ISBN"
                type="text"
                placeholder="Enter transaction ID or ISBN"
                value={returnForm.transactionId}
                onChange={(e) => setReturnForm({ transactionId: e.target.value })}
                leftIcon={<IoSearchOutline className="w-5 h-5" />}
                required
              />
            </div>
            <button
              onClick={handleReturn}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              Process Return
            </button>
          </div>
        )}

        {activeTab === "renew" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-primary-50 mb-4">Renew Book</h2>
            <p className="text-primary-50/70">
              Select a transaction from the list below to renew the loan period.
            </p>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by student, book, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<IoSearchOutline className="w-5 h-5" />}
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Display */}
      {paginatedTransactions.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100 mb-6">
          <IoBookOutline className="w-12 h-12 text-primary-50/30 mx-auto mb-3" />
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
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(txn.status)}`}>
                    {getStatusIcon(txn.status)}
                    {txn.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Student ID:</span>
                    <span className="font-medium text-primary-50">{txn.studentId}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Checkout:</span>
                    <span className="font-medium text-primary-50">{txn.checkoutDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Due Date:</span>
                    <span className="font-medium text-primary-50">{txn.dueDate}</span>
                  </div>
                  {txn.fine && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/60">Fine:</span>
                      <span className="font-bold text-red-600">${txn.fine.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {txn.status === "active" && (
                  <button
                    onClick={() => handleRenew(txn.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold"
                  >
                    <IoRefreshOutline className="w-4 h-4" />
                    Renew
                  </button>
                )}
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
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Checkout Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Fine
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm font-semibold text-primary-50">{txn.id}</td>
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
                    <td className="px-4 py-4 text-sm text-primary-50/70">{txn.checkoutDate}</td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{txn.dueDate}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${getStatusColor(txn.status)}`}>
                        {getStatusIcon(txn.status)}
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {txn.fine ? (
                        <span className="text-sm font-bold text-red-600">${txn.fine.toFixed(2)}</span>
                      ) : (
                        <span className="text-sm text-primary-50/40">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {txn.status === "active" && (
                        <button
                          onClick={() => handleRenew(txn.id)}
                          className="px-3 py-1.5 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold flex items-center gap-1"
                        >
                          <IoRefreshOutline className="w-4 h-4" />
                          Renew
                        </button>
                      )}
                    </td>
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

export default Circulation;
