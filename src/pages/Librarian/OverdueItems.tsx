import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoBookOutline,
    IoCalendarOutline,
    IoCashOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoMailOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoSendOutline,
    IoTimeOutline,
    IoWarningOutline
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface OverdueItem {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  bookTitle: string;
  bookIsbn: string;
  checkoutDate: string;
  dueDate: string;
  daysOverdue: number;
  fine: number;
  remindersSent: number;
  lastReminderDate?: string;
}

const OverdueItems: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OverdueItem | null>(null);
  const [reminderItem, setReminderItem] = useState<OverdueItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const [overdueItems] = useState<OverdueItem[]>([
    {
      id: "OVD001",
      studentId: "STU2024001",
      studentName: "John Doe",
      studentEmail: "john.doe@university.edu",
      studentPhone: "+1 (555) 123-4567",
      bookTitle: "Introduction to Algorithms",
      bookIsbn: "978-0262033848",
      checkoutDate: "2024-10-15",
      dueDate: "2024-11-15",
      daysOverdue: 16,
      fine: 8.00,
      remindersSent: 2,
      lastReminderDate: "2024-11-25",
    },
    {
      id: "OVD002",
      studentId: "STU2024002",
      studentName: "Jane Smith",
      studentEmail: "jane.smith@university.edu",
      studentPhone: "+1 (555) 234-5678",
      bookTitle: "Clean Code",
      bookIsbn: "978-0132350884",
      checkoutDate: "2024-10-20",
      dueDate: "2024-11-20",
      daysOverdue: 11,
      fine: 5.50,
      remindersSent: 1,
      lastReminderDate: "2024-11-22",
    },
    {
      id: "OVD003",
      studentId: "STU2024003",
      studentName: "Mike Johnson",
      studentEmail: "mike.johnson@university.edu",
      studentPhone: "+1 (555) 345-6789",
      bookTitle: "Design Patterns",
      bookIsbn: "978-0201633612",
      checkoutDate: "2024-09-25",
      dueDate: "2024-10-25",
      daysOverdue: 37,
      fine: 18.50,
      remindersSent: 4,
      lastReminderDate: "2024-11-28",
    },
    {
      id: "OVD004",
      studentId: "STU2024004",
      studentName: "Sarah Williams",
      studentEmail: "sarah.williams@university.edu",
      studentPhone: "+1 (555) 456-7890",
      bookTitle: "The Lean Startup",
      bookIsbn: "978-0307887894",
      checkoutDate: "2024-11-05",
      dueDate: "2024-11-25",
      daysOverdue: 6,
      fine: 3.00,
      remindersSent: 1,
      lastReminderDate: "2024-11-27",
    },
    {
      id: "OVD005",
      studentId: "STU2024005",
      studentName: "David Brown",
      studentEmail: "david.brown@university.edu",
      studentPhone: "+1 (555) 567-8901",
      bookTitle: "Database Systems",
      bookIsbn: "978-0078022159",
      checkoutDate: "2024-09-10",
      dueDate: "2024-10-10",
      daysOverdue: 52,
      fine: 26.00,
      remindersSent: 5,
      lastReminderDate: "2024-11-30",
    },
  ]);

  const severities = [
    { value: "all", label: "All Items" },
    { value: "low", label: "Low (1-7 days)" },
    { value: "medium", label: "Medium (8-14 days)" },
    { value: "high", label: "High (15-30 days)" },
    { value: "critical", label: "Critical (30+ days)" },
  ];

  const getSeverity = (daysOverdue: number): string => {
    if (daysOverdue <= 7) return "low";
    if (daysOverdue <= 14) return "medium";
    if (daysOverdue <= 30) return "high";
    return "critical";
  };

  // Filter items
  const filteredItems = overdueItems.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bookIsbn.includes(searchQuery);
    
    const itemSeverity = getSeverity(item.daysOverdue);
    const matchesSeverity = selectedSeverity === "all" || itemSeverity === selectedSeverity;
    
    return matchesSearch && matchesSeverity;
  });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getSeverityColor = (daysOverdue: number) => {
    if (daysOverdue <= 7) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (daysOverdue <= 14) return "bg-orange-50 text-orange-700 border-orange-200";
    if (daysOverdue <= 30) return "bg-red-50 text-red-700 border-red-200";
    return "bg-purple-50 text-purple-700 border-purple-200";
  };

  const getSeverityLabel = (daysOverdue: number) => {
    if (daysOverdue <= 7) return "Low";
    if (daysOverdue <= 14) return "Medium";
    if (daysOverdue <= 30) return "High";
    return "Critical";
  };

  const handleSendReminder = (itemId: string) => {
    const item = overdueItems.find(i => i.id === itemId);
    if (item) {
      setReminderItem(item);
      setShowReminderModal(true);
    }
  };

  const confirmSendReminder = () => {
    // In a real application, this would call an API to send an email/SMS to the student
    setShowReminderModal(false);
    setReminderItem(null);
  };

  const handleViewDetails = (item: OverdueItem) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const totalFines = overdueItems.reduce((sum, item) => sum + item.fine, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
          Overdue Items
        </h1>
        <p className="text-sm sm:text-base text-primary-50/70">
          Track and manage overdue books and fines
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Overdue</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">{overdueItems.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
              <IoAlertCircleOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Low (1-7d)</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                {overdueItems.filter((i) => getSeverity(i.daysOverdue) === "low").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
              <IoTimeOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Medium (8-14d)</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                {overdueItems.filter((i) => getSeverity(i.daysOverdue) === "medium").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
              <IoWarningOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">High (15-30d)</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {overdueItems.filter((i) => getSeverity(i.daysOverdue) === "high").length}
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
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Fines</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">${totalFines.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <IoCashOutline className="w-6 h-6 text-white" />
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
              placeholder="Search by student, book, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<IoSearchOutline className="w-5 h-5" />}
            />
          </div>
          <div className="sm:w-64">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
            >
              {severities.map((severity) => (
                <option key={severity.value} value={severity.value}>
                  {severity.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Overdue Items Display */}
      {paginatedItems.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100 mb-6">
          <IoAlertCircleOutline className="w-12 h-12 text-primary-50/30 mx-auto mb-3" />
          <p className="text-primary-50/60">No overdue items found</p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4 mb-6">
            {paginatedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-primary-50 mb-1">{item.bookTitle}</h3>
                    <p className="text-sm text-primary-50/60">{item.studentName}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(item.daysOverdue)}`}>
                    {getSeverityLabel(item.daysOverdue)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Days Overdue:</span>
                    <span className="font-bold text-red-600">{item.daysOverdue} days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Fine:</span>
                    <span className="font-bold text-green-600">${item.fine.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Due Date:</span>
                    <span className="font-medium text-primary-50">{item.dueDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Reminders:</span>
                    <span className="font-medium text-primary-50">{item.remindersSent}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleSendReminder(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold"
                  >
                    <IoSendOutline className="w-4 h-4" />
                    Send Reminder
                  </button>
                  <button
                    onClick={() => handleViewDetails(item)}
                    className="px-3 py-2 bg-gray-100 text-primary-50 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
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
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Days Overdue
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Fine
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Reminders
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-primary-50">{item.studentName}</div>
                        <div className="text-sm text-primary-50/60">{item.studentId}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-primary-50">{item.bookTitle}</div>
                        <div className="text-sm text-primary-50/60">{item.bookIsbn}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-primary-50/70">{item.dueDate}</td>
                    <td className="px-4 py-4">
                      <span className="text-lg font-bold text-red-600">{item.daysOverdue}</span>
                      <span className="text-sm text-primary-50/60 ml-1">days</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-base font-bold text-green-600">${item.fine.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="font-semibold text-primary-50">{item.remindersSent}</div>
                        {item.lastReminderDate && (
                          <div className="text-xs text-primary-50/60">Last: {item.lastReminderDate}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(item.daysOverdue)}`}>
                        {getSeverityLabel(item.daysOverdue)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSendReminder(item.id)}
                          className="px-3 py-1.5 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold flex items-center gap-1"
                        >
                          <IoSendOutline className="w-4 h-4" />
                          Remind
                        </button>
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="px-3 py-1.5 bg-gray-100 text-primary-50 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                        >
                          Details
                        </button>
                      </div>
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
              {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length} items
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

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-50">Overdue Item Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>

            <div className="p-6">
              {/* Severity Alert */}
              <div className={`mb-6 p-4 rounded-xl border-2 ${getSeverityColor(selectedItem.daysOverdue)}`}>
                <div className="flex items-center gap-3">
                  <IoAlertCircleOutline className="w-6 h-6" />
                  <div>
                    <p className="font-bold">{getSeverityLabel(selectedItem.daysOverdue)} Priority</p>
                    <p className="text-sm">{selectedItem.daysOverdue} days overdue • Fine: ${selectedItem.fine.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Student Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoPersonOutline className="w-5 h-5" />
                  Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Name</label>
                    <p className="text-base font-semibold text-primary-50">{selectedItem.studentName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Student ID</label>
                    <p className="text-base text-primary-50">{selectedItem.studentId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Email</label>
                    <p className="text-base text-primary-50">{selectedItem.studentEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Phone</label>
                    <p className="text-base text-primary-50">{selectedItem.studentPhone}</p>
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoBookOutline className="w-5 h-5" />
                  Book Information
                </h3>
                <div className="grid grid-cols-1 gap-4 bg-gray-50 rounded-xl p-4">
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Title</label>
                    <p className="text-base font-semibold text-primary-50">{selectedItem.bookTitle}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">ISBN</label>
                    <p className="text-base text-primary-50">{selectedItem.bookIsbn}</p>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoCalendarOutline className="w-5 h-5" />
                  Loan Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-blue-600/80 mb-1">Checkout Date</p>
                    <p className="text-lg font-bold text-blue-600">{selectedItem.checkoutDate}</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <p className="text-sm text-red-600/80 mb-1">Due Date</p>
                    <p className="text-lg font-bold text-red-600">{selectedItem.dueDate}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <p className="text-sm text-orange-600/80 mb-1">Days Overdue</p>
                    <p className="text-lg font-bold text-orange-600">{selectedItem.daysOverdue} days</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <p className="text-sm text-green-600/80 mb-1">Fine Amount</p>
                    <p className="text-lg font-bold text-green-600">${selectedItem.fine.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Reminder History */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoMailOutline className="w-5 h-5" />
                  Reminder History
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-primary-50/60">Reminders Sent</p>
                      <p className="text-2xl font-bold text-primary-50">{selectedItem.remindersSent}</p>
                    </div>
                    {selectedItem.lastReminderDate && (
                      <div className="text-right">
                        <p className="text-sm text-primary-50/60">Last Reminder</p>
                        <p className="text-base font-semibold text-primary-50">{selectedItem.lastReminderDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleSendReminder(selectedItem.id);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  <IoSendOutline className="w-5 h-5" />
                  Send Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && reminderItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center gap-3 text-white">
                <IoSendOutline className="w-6 h-6" />
                <h2 className="text-xl font-bold">Send Reminder</h2>
              </div>
            </div>

            <div className="p-6">
              <p className="text-primary-50/70 mb-6">
                You are about to send an overdue reminder to the following student:
              </p>

              {/* Student Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <IoPersonOutline className="w-5 h-5 text-primary-50 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-primary-50/60 mb-1">Student</p>
                    <p className="font-bold text-primary-50">{reminderItem.studentName}</p>
                    <p className="text-sm text-primary-50/70">{reminderItem.studentEmail}</p>
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <IoBookOutline className="w-5 h-5 text-primary-50 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-primary-50/60 mb-1">Book</p>
                    <p className="font-bold text-primary-50">{reminderItem.bookTitle}</p>
                    <p className="text-sm text-primary-50/70">ISBN: {reminderItem.bookIsbn}</p>
                  </div>
                </div>
              </div>

              {/* Overdue Info */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-red-50 rounded-xl p-3 border border-red-200">
                  <p className="text-xs text-red-600/80 mb-1">Days Overdue</p>
                  <p className="text-xl font-bold text-red-600">{reminderItem.daysOverdue}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                  <p className="text-xs text-green-600/80 mb-1">Fine Amount</p>
                  <p className="text-xl font-bold text-green-600">${reminderItem.fine.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <IoMailOutline className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-600 mb-1">Email Notification</p>
                    <p className="text-sm text-blue-600/80">
                      An email will be sent to the student with details about the overdue book and instructions to return it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowReminderModal(false);
                    setReminderItem(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-primary-50 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSendReminder}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  <IoSendOutline className="w-5 h-5" />
                  Send Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverdueItems;
