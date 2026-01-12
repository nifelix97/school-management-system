import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  IoAlertCircleOutline,
  IoArrowForwardOutline,
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoSwapHorizontalOutline,
  IoTimeOutline
} from "react-icons/io5";
import {
  useGetActiveBorrowingsQuery,
  useGetBooksQuery,
  useIssueBookMutation,
  type Book,
} from "../../app/api/library";
import Input from "../../components/ui/Input";

const Circulation: React.FC = () => {
  const [searchBookQuery, setSearchBookQuery] = useState("");
  const [searchTransactionQuery, setSearchTransactionQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states
  const [checkoutForm, setCheckoutForm] = useState({
    userId: "",
    bookId: "",
    dueDate: "",
  });

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showBookSearch, setShowBookSearch] = useState(false);

  // API hooks
  const { data: booksResponse, isLoading: booksLoading } = useGetBooksQuery({
    search: searchBookQuery || undefined,
  });
  
  const { data: borrowingsResponse, isLoading: borrowingsLoading, error: borrowingsError } = useGetActiveBorrowingsQuery();
  const [issueBook, { isLoading: isIssuing }] = useIssueBookMutation();

  const books: Book[] = booksResponse?.data || [];
  const borrowings = borrowingsResponse?.data || [];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "issued", label: "Active" },
    { value: "overdue", label: "Overdue" },
    { value: "returned", label: "Returned" },
  ];

  // Filter borrowings
  const filteredBorrowings = borrowings.filter((borrowing) => {
    const matchesSearch =
      borrowing.book?.title.toLowerCase().includes(searchTransactionQuery.toLowerCase()) ||
      borrowing.user?.firstName.toLowerCase().includes(searchTransactionQuery.toLowerCase()) ||
      borrowing.user?.lastName.toLowerCase().includes(searchTransactionQuery.toLowerCase()) ||
      borrowing.book?.isbn.includes(searchTransactionQuery);
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
  }, [searchTransactionQuery, selectedStatus]);

  // Calculate statistics
  const stats = {
    activeLoans: borrowings.filter(b => b.status === "issued").length,
    overdue: borrowings.filter(b => b.status === "overdue").length,
    returnedToday: borrowings.filter(b => b.status === "returned" && b.returnDate && isToday(b.returnDate)).length,
    totalFines: borrowings.reduce((sum, b) => sum + (b.fineAmount || 0), 0),
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
        return <IoTimeOutline className="w-4 h-4" />;
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

  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setCheckoutForm({ ...checkoutForm, bookId: book.id });
    setShowBookSearch(false);
    setSearchBookQuery("");
  };

  const handleCheckout = async () => {
    if (!checkoutForm.userId || !checkoutForm.bookId) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const issueData = {
        userId: checkoutForm.userId,
        bookId: checkoutForm.bookId,
        dueDate: checkoutForm.dueDate || getDefaultDueDate(),
      };

      await issueBook(issueData).unwrap();
      alert("Book issued successfully!");
      
      // Reset form
      setCheckoutForm({ userId: "", bookId: "", dueDate: "" });
      setSelectedBook(null);
    } catch (error) {
      console.error("Failed to issue book:", error);
      alert("Failed to issue book. Please try again.");
    }
  };

  // Get default due date (14 days from now)
  const getDefaultDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split('T')[0];
  };

  // Loading state
  if (borrowingsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-50" />
        <span className="ml-2 text-primary-50">Loading circulation data...</span>
      </div>
    );
  }

  // Error state
  if (borrowingsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex flex-col items-center justify-center p-4">
        <IoAlertCircleOutline className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-primary-50 mb-2">Error Loading Data</h2>
        <p className="text-primary-50 text-center">
          We encountered an error while loading circulation data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
          Circulation Management
        </h1>
        <p className="text-sm sm:text-base text-primary-50/70">
          Issue books and manage circulation
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Active Loans</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {stats.activeLoans}
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
                {stats.overdue}
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
                {stats.returnedToday}
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
                ${stats.totalFines.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
              <IoTimeOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Issue Book Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <IoArrowForwardOutline className="w-6 h-6 text-primary-50" />
          <h2 className="text-xl font-bold text-primary-50">Issue Book</h2>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="User ID"
              type="text"
              placeholder="Enter user ID (student/teacher)"
              value={checkoutForm.userId}
              onChange={(e) => setCheckoutForm({ ...checkoutForm, userId: e.target.value })}
              leftIcon={<IoPersonOutline className="w-5 h-5" />}
              required
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Book <span className="text-red-500">*</span>
              </label>
              {selectedBook ? (
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex-1">
                    <p className="font-semibold text-primary-50">{selectedBook.title}</p>
                    <p className="text-sm text-primary-50/60">{selectedBook.author} - {selectedBook.isbn}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBook(null);
                      setCheckoutForm({ ...checkoutForm, bookId: "" });
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowBookSearch(true)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 hover:border-primary-50 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50 text-left text-primary-50/60"
                >
                  Click to search for a book...
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={checkoutForm.dueDate || getDefaultDueDate()}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, dueDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
              />
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isIssuing || !checkoutForm.userId || !checkoutForm.bookId}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isIssuing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Issuing...
              </>
            ) : (
              <>
                <IoArrowForwardOutline className="w-5 h-5" />
                Issue Book
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search transactions by student, book, or ISBN..."
              value={searchTransactionQuery}
              onChange={(e) => setSearchTransactionQuery(e.target.value)}
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

      {/* Recent Transactions */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-primary-50">Recent Transactions</h3>
      </div>

      {paginatedBorrowings.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100 mb-6">
          <IoBookOutline className="w-12 h-12 text-primary-50/30 mx-auto mb-3" />
          <p className="text-primary-50/60">
            {searchTransactionQuery || selectedStatus !== "all"
              ? "No transactions found matching your search"
              : "No transactions yet"}
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4 mb-6">
            {paginatedBorrowings.map((borrowing) => (
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Issue Date:</span>
                    <span className="font-medium text-primary-50">{formatDate(borrowing.issueDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Due Date:</span>
                    <span className="font-medium text-primary-50">{formatDate(borrowing.dueDate)}</span>
                  </div>
                  {borrowing.fineAmount && borrowing.fineAmount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/60">Fine:</span>
                      <span className="font-bold text-red-600">${borrowing.fineAmount.toFixed(2)}</span>
                    </div>
                  )}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBorrowings.map((borrowing) => (
                  <tr key={borrowing.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-primary-50">{borrowing.book?.title || "Unknown"}</div>
                      <div className="text-sm text-primary-50/60">{borrowing.book?.isbn || "N/A"}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-primary-50">
                        {borrowing.user?.firstName} {borrowing.user?.lastName}
                      </div>
                      <div className="text-sm text-primary-50/60">{borrowing.user?.email}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{formatDate(borrowing.issueDate)}</td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{formatDate(borrowing.dueDate)}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${getStatusColor(borrowing.status)}`}>
                        {getStatusIcon(borrowing.status)}
                        {getStatusLabel(borrowing.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {borrowing.fineAmount && borrowing.fineAmount > 0 ? (
                        <span className="text-sm font-bold text-red-600">${borrowing.fineAmount.toFixed(2)}</span>
                      ) : (
                        <span className="text-sm text-primary-50/40">-</span>
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
              {Math.min(currentPage * itemsPerPage, filteredBorrowings.length)} of {filteredBorrowings.length} transactions
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

      {/* Book Search Modal */}
      {showBookSearch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary-50">Search Books</h2>
              <button
                onClick={() => setShowBookSearch(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <Input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchBookQuery}
                onChange={(e) => setSearchBookQuery(e.target.value)}
                leftIcon={<IoSearchOutline className="w-5 h-5" />}
              />

              <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
                {booksLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary-50" />
                  </div>
                ) : books.length === 0 ? (
                  <p className="text-center text-primary-50/60 py-8">No books found</p>
                ) : (
                  books
                    .filter(book => book.availableCopies > 0)
                    .map((book) => (
                      <button
                        key={book.id}
                        onClick={() => handleSelectBook(book)}
                        className="w-full p-3 rounded-lg border border-gray-200 hover:border-primary-50 hover:bg-gray-50 transition-all text-left"
                      >
                        <p className="font-semibold text-primary-50">{book.title}</p>
                        <p className="text-sm text-primary-50/60">
                          {book.author} - {book.isbn} ({book.availableCopies} available)
                        </p>
                      </button>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Circulation;
