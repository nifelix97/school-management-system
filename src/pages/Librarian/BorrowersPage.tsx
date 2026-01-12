import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
    IoAlertCircleOutline,
    IoBookOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoEyeOutline,
    IoPersonOutline,
    IoReturnDownBackOutline,
    IoSearchOutline
} from "react-icons/io5";
import {
    useGetActiveBorrowingsQuery,
    useReturnBookMutation,
    type Borrowing,
} from "../../app/api/library";
import Input from "../../components/ui/Input";

const BorrowersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBorrowing, setSelectedBorrowing] = useState<Borrowing | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnCondition, setReturnCondition] = useState<"good" | "damaged" | "lost">("good");
  const [fineAmount, setFineAmount] = useState("");
  const itemsPerPage = 10;

  // API hooks
  const { data: borrowingsResponse, isLoading, error } = useGetActiveBorrowingsQuery();
  const [returnBook, { isLoading: isReturning }] = useReturnBookMutation();

  const borrowings: Borrowing[] = borrowingsResponse?.data || [];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "issued", label: "Active" },
    { value: "overdue", label: "Overdue" },
  ];

  // Filter borrowings
  const filteredBorrowings = borrowings.filter((borrowing) => {
    const matchesSearch =
      borrowing.book?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrowing.user?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrowing.user?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrowing.user?.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || borrowing.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBorrowings.length / itemsPerPage);
  const paginatedBorrowings = filteredBorrowings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus]);

  // Calculate statistics
  const stats = {
    totalBorrowings: borrowings.length,
    activeBorrowings: borrowings.filter(b => b.status === "issued").length,
    overdueBorrowings: borrowings.filter(b => b.status === "overdue").length,
    uniqueBorrowers: new Set(borrowings.map(b => b.userId)).size,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "issued":
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
      case "issued":
        return <IoBookOutline className="w-4 h-4" />;
      case "overdue":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      case "returned":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "issued":
        return "Active";
      case "overdue":
        return "Overdue";
      case "returned":
        return "Returned";
      default:
        return status;
    }
  };

  const handleViewDetails = (borrowing: Borrowing) => {
    setSelectedBorrowing(borrowing);
    setShowDetailsModal(true);
  };

  const handleReturnClick = (borrowing: Borrowing) => {
    setSelectedBorrowing(borrowing);
    setReturnCondition("good");
    setFineAmount("");
    setShowReturnModal(true);
  };

  const handleReturnBook = async () => {
    if (!selectedBorrowing) return;

    try {
      const returnData = {
        condition: returnCondition,
        fineAmount: fineAmount ? parseFloat(fineAmount) : undefined,
      };

      await returnBook({ 
        borrowingId: selectedBorrowing.id, 
        data: returnData 
      }).unwrap();
      
      setShowReturnModal(false);
      setSelectedBorrowing(null);
      alert("Book returned successfully!");
    } catch (error) {
      console.error("Failed to return book:", error);
      alert("Failed to return book. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = now.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-50" />
        <span className="ml-2 text-primary-50">Loading borrowings...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex flex-col items-center justify-center p-4">
        <IoAlertCircleOutline className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-primary-50 mb-2">Error Loading Borrowings</h2>
        <p className="text-primary-50 text-center">
          We encountered an error while loading the borrowings. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
          Active Borrowings
        </h1>
        <p className="text-sm sm:text-base text-primary-50/70">
          View and manage active book borrowings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Borrowings</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary-50">{stats.totalBorrowings}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-50/80 rounded-xl">
              <IoBookOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Active</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {stats.activeBorrowings}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <IoCheckmarkCircleOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Overdue</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {stats.overdueBorrowings}
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
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Borrowers</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                {stats.uniqueBorrowers}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <IoPersonOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by book title, borrower name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<IoSearchOutline className="w-5 h-5" />}
            />
          </div>
          <div className="sm:w-64">
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

      {/* Borrowings Display */}
      {paginatedBorrowings.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100 mb-6">
          <IoBookOutline className="w-12 h-12 text-primary-50/30 mx-auto mb-3" />
          <p className="text-primary-50/60">
            {searchQuery || selectedStatus !== "all"
              ? "No borrowings found matching your search"
              : "No active borrowings"}
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4 mb-6">
            {paginatedBorrowings.map((borrowing) => {
              const daysOverdue = getDaysOverdue(borrowing.dueDate);
              
              return (
                <div key={borrowing.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-primary-50 mb-1">{borrowing.book?.title || "Unknown Book"}</h3>
                      <p className="text-sm text-primary-50/60">
                        {borrowing.user?.firstName} {borrowing.user?.lastName}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(borrowing.status)}`}>
                      {getStatusIcon(borrowing.status)}
                      {getStatusLabel(borrowing.status)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/60">Issue Date:</span>
                      <span className="font-medium text-primary-50">{formatDate(borrowing.issueDate)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/60">Due Date:</span>
                      <span className={`font-semibold ${isOverdue(borrowing.dueDate) ? 'text-red-600' : 'text-primary-50'}`}>
                        {formatDate(borrowing.dueDate)}
                      </span>
                    </div>
                    {daysOverdue > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary-50/60">Days Overdue:</span>
                        <span className="font-bold text-red-600">{daysOverdue} days</span>
                      </div>
                    )}
                    {borrowing.fineAmount && borrowing.fineAmount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary-50/60">Fine:</span>
                        <span className="font-bold text-red-600">${borrowing.fineAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleViewDetails(borrowing)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold"
                    >
                      <IoEyeOutline className="w-4 h-4" />
                      View
                    </button>
                    {borrowing.status !== "returned" && (
                      <button
                        onClick={() => handleReturnClick(borrowing)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold"
                      >
                        <IoReturnDownBackOutline className="w-4 h-4" />
                        Return
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Borrower
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Issue Date
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
                {paginatedBorrowings.map((borrowing) => {
                  const daysOverdue = getDaysOverdue(borrowing.dueDate);
                  
                  return (
                    <tr key={borrowing.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-primary-50">{borrowing.book?.title || "Unknown"}</div>
                        <div className="text-sm text-primary-50/60">{borrowing.book?.author || "N/A"}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-primary-50">
                          {borrowing.user?.firstName} {borrowing.user?.lastName}
                        </div>
                        <div className="text-sm text-primary-50/60">{borrowing.user?.email}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-primary-50/70">
                        {formatDate(borrowing.issueDate)}
                      </td>
                      <td className="px-4 py-4">
                        <div className={`text-sm font-semibold ${isOverdue(borrowing.dueDate) ? 'text-red-600' : 'text-primary-50'}`}>
                          {formatDate(borrowing.dueDate)}
                        </div>
                        {daysOverdue > 0 && (
                          <div className="text-xs text-red-600 font-semibold mt-1">
                            {daysOverdue} days overdue
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${getStatusColor(borrowing.status)}`}>
                          {getStatusIcon(borrowing.status)}
                          {getStatusLabel(borrowing.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {borrowing.fineAmount && borrowing.fineAmount > 0 ? (
                          <span className="text-sm font-bold text-red-600">
                            ${borrowing.fineAmount.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(borrowing)}
                            className="px-3 py-1.5 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold flex items-center gap-1"
                          >
                            <IoEyeOutline className="w-4 h-4" />
                            View
                          </button>
                          {borrowing.status !== "returned" && (
                            <button
                              onClick={() => handleReturnClick(borrowing)}
                              className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold flex items-center gap-1"
                            >
                              <IoReturnDownBackOutline className="w-4 h-4" />
                              Return
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
              {Math.min(currentPage * itemsPerPage, filteredBorrowings.length)} of {filteredBorrowings.length} borrowings
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

      {/* Borrowing Details Modal */}
      {showDetailsModal && selectedBorrowing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-50">Borrowing Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>

            <div className="p-6">
              {/* Book Information */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoBookOutline className="w-5 h-5" />
                  Book Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Title</label>
                    <p className="text-base font-semibold text-primary-50">{selectedBorrowing.book?.title || "N/A"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Author</label>
                      <p className="text-base text-primary-50">{selectedBorrowing.book?.author || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-primary-50/60 mb-1 block">ISBN</label>
                      <p className="text-base text-primary-50">{selectedBorrowing.book?.isbn || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Borrower Information */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoPersonOutline className="w-5 h-5" />
                  Borrower Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Name</label>
                    <p className="text-base font-semibold text-primary-50">
                      {selectedBorrowing.user?.firstName} {selectedBorrowing.user?.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Email</label>
                    <p className="text-base text-primary-50">{selectedBorrowing.user?.email || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Borrowing Details */}
              <div>
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoCalendarOutline className="w-5 h-5" />
                  Borrowing Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-blue-600/80 mb-1">Issue Date</p>
                    <p className="text-lg font-bold text-blue-600">{formatDate(selectedBorrowing.issueDate)}</p>
                  </div>
                  <div className={`rounded-xl p-4 border ${isOverdue(selectedBorrowing.dueDate) ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <p className={`text-sm mb-1 ${isOverdue(selectedBorrowing.dueDate) ? 'text-red-600/80' : 'text-green-600/80'}`}>Due Date</p>
                    <p className={`text-lg font-bold ${isOverdue(selectedBorrowing.dueDate) ? 'text-red-600' : 'text-green-600'}`}>
                      {formatDate(selectedBorrowing.dueDate)}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <p className="text-sm text-purple-600/80 mb-1">Status</p>
                    <p className="text-lg font-bold text-purple-600 capitalize">{getStatusLabel(selectedBorrowing.status)}</p>
                  </div>
                  {selectedBorrowing.fineAmount && selectedBorrowing.fineAmount > 0 && (
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                      <p className="text-sm text-red-600/80 mb-1">Fine Amount</p>
                      <p className="text-lg font-bold text-red-600">${selectedBorrowing.fineAmount.toFixed(2)}</p>
                    </div>
                  )}
                  {selectedBorrowing.condition && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-sm text-gray-600/80 mb-1">Condition</p>
                      <p className="text-lg font-bold text-gray-600 capitalize">{selectedBorrowing.condition}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return Book Modal */}
      {showReturnModal && selectedBorrowing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary-50">Return Book</h2>
              <button
                onClick={() => setShowReturnModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-primary-50/70 mb-2">Book:</p>
                <p className="font-semibold text-primary-50">{selectedBorrowing.book?.title}</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Book Condition <span className="text-red-500">*</span>
                </label>
                <select
                  value={returnCondition}
                  onChange={(e) => setReturnCondition(e.target.value as "good" | "damaged" | "lost")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
                >
                  <option value="good">Good Condition</option>
                  <option value="damaged">Damaged</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              {(returnCondition === "damaged" || returnCondition === "lost") && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Fine Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={fineAmount}
                    onChange={(e) => setFineAmount(e.target.value)}
                    placeholder="Enter fine amount"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
                  />
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-primary-50 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReturnBook}
                  disabled={isReturning}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isReturning ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Returning...
                    </>
                  ) : (
                    <>
                      <IoReturnDownBackOutline className="w-5 h-5" />
                      Return Book
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowersPage;
