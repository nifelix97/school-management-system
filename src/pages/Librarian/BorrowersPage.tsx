import React, { useState } from "react";
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
    IoSearchOutline,
    IoTimeOutline
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface Borrower {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
  registrationDate: string;
  activeLoans: number;
  totalBorrowed: number;
  overdueBooks: number;
  status: "active" | "suspended" | "inactive";
}

interface Loan {
  bookTitle: string;
  isbn: string;
  checkoutDate: string;
  dueDate: string;
  status: "active" | "overdue";
}

const BorrowersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const [borrowers] = useState<Borrower[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@university.edu",
      phone: "+1 (555) 123-4567",
      studentId: "STU2024001",
      department: "Computer Science",
      year: "3rd Year",
      registrationDate: "2024-01-15",
      activeLoans: 3,
      totalBorrowed: 45,
      overdueBooks: 0,
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      phone: "+1 (555) 234-5678",
      studentId: "STU2024002",
      department: "Engineering",
      year: "2nd Year",
      registrationDate: "2024-02-20",
      activeLoans: 2,
      totalBorrowed: 28,
      overdueBooks: 1,
      status: "active",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@university.edu",
      phone: "+1 (555) 345-6789",
      studentId: "STU2024003",
      department: "Business",
      year: "4th Year",
      registrationDate: "2024-03-10",
      activeLoans: 0,
      totalBorrowed: 67,
      overdueBooks: 0,
      status: "active",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@university.edu",
      phone: "+1 (555) 456-7890",
      studentId: "STU2024004",
      department: "Medicine",
      year: "1st Year",
      registrationDate: "2024-04-05",
      activeLoans: 5,
      totalBorrowed: 15,
      overdueBooks: 2,
      status: "suspended",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david.brown@university.edu",
      phone: "+1 (555) 567-8901",
      studentId: "STU2024005",
      department: "Computer Science",
      year: "3rd Year",
      registrationDate: "2024-05-12",
      activeLoans: 1,
      totalBorrowed: 32,
      overdueBooks: 0,
      status: "active",
    },
  ]);

  const departments = ["all", "Computer Science", "Engineering", "Business", "Medicine", "Arts & Literature"];
  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "suspended", label: "Suspended" },
    { value: "inactive", label: "Inactive" },
  ];

  // Mock loan data for details modal
  const mockLoans: Loan[] = [
    {
      bookTitle: "Introduction to Algorithms",
      isbn: "978-0262033848",
      checkoutDate: "2024-11-15",
      dueDate: "2024-12-15",
      status: "active",
    },
    {
      bookTitle: "Clean Code",
      isbn: "978-0132350884",
      checkoutDate: "2024-11-10",
      dueDate: "2024-11-25",
      status: "overdue",
    },
  ];

  // Filter borrowers
  const filteredBorrowers = borrowers.filter((borrower) => {
    const matchesSearch =
      borrower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrower.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrower.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || borrower.status === selectedStatus;
    const matchesDepartment = selectedDepartment === "all" || borrower.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBorrowers.length / itemsPerPage);
  const paginatedBorrowers = filteredBorrowers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-600 border-green-200";
      case "suspended":
        return "bg-red-50 text-red-600 border-red-200";
      case "inactive":
        return "bg-gray-50 text-gray-600 border-gray-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "suspended":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      case "inactive":
        return <IoTimeOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleViewDetails = (borrower: Borrower) => {
    setSelectedBorrower(borrower);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
          Borrowers Management
        </h1>
        <p className="text-sm sm:text-base text-primary-50/70">
          View and manage library borrowers and their activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Borrowers</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary-50">{borrowers.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-50/80 rounded-xl">
              <IoPersonOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Active Borrowers</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {borrowers.filter((b) => b.status === "active").length}
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
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Active Loans</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {borrowers.reduce((sum, b) => sum + b.activeLoans, 0)}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <IoBookOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Overdue Books</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {borrowers.reduce((sum, b) => sum + b.overdueBooks, 0)}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
              <IoAlertCircleOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by name, email, or student ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<IoSearchOutline className="w-5 h-5" />}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-auto">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
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
        </div>
      </div>

      {/* Borrowers Display */}
      {paginatedBorrowers.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100 mb-6">
          <IoPersonOutline className="w-12 h-12 text-primary-50/30 mx-auto mb-3" />
          <p className="text-primary-50/60">No borrowers found</p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4 mb-6">
            {paginatedBorrowers.map((borrower) => (
              <div key={borrower.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-primary-50 mb-1">{borrower.name}</h3>
                    <p className="text-sm text-primary-50/60">{borrower.studentId}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(borrower.status)}`}>
                    {getStatusIcon(borrower.status)}
                    {borrower.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Department:</span>
                    <span className="font-medium text-primary-50">{borrower.department}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Active Loans:</span>
                    <span className="font-semibold text-blue-600">{borrower.activeLoans}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Overdue:</span>
                    <span className={`font-semibold ${borrower.overdueBooks > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {borrower.overdueBooks}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50/60">Total Borrowed:</span>
                    <span className="font-medium text-primary-50">{borrower.totalBorrowed}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(borrower)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold"
                >
                  <IoEyeOutline className="w-4 h-4" />
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Borrower
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Active Loans
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Overdue
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Total Borrowed
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBorrowers.map((borrower) => (
                  <tr key={borrower.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-primary-50">{borrower.name}</div>
                        <div className="text-sm text-primary-50/60">{borrower.studentId}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="text-primary-50/70">{borrower.email}</div>
                        <div className="text-primary-50/60">{borrower.phone}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-primary-50">{borrower.department}</div>
                        <div className="text-sm text-primary-50/60">{borrower.year}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-lg font-bold text-blue-600">{borrower.activeLoans}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-lg font-bold ${borrower.overdueBooks > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {borrower.overdueBooks}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-primary-50">{borrower.totalBorrowed}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${getStatusColor(borrower.status)}`}>
                        {getStatusIcon(borrower.status)}
                        {borrower.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleViewDetails(borrower)}
                        className="px-3 py-1.5 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold flex items-center gap-1"
                      >
                        <IoEyeOutline className="w-4 h-4" />
                        View
                      </button>
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
              {Math.min(currentPage * itemsPerPage, filteredBorrowers.length)} of {filteredBorrowers.length} borrowers
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

      {/* Borrower Details Modal */}
      {showDetailsModal && selectedBorrower && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-50">Borrower Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>

            <div className="p-6">
              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoPersonOutline className="w-5 h-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Full Name</label>
                    <p className="text-base font-semibold text-primary-50">{selectedBorrower.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Student ID</label>
                    <p className="text-base text-primary-50">{selectedBorrower.studentId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Email</label>
                    <p className="text-base text-primary-50">{selectedBorrower.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Phone</label>
                    <p className="text-base text-primary-50">{selectedBorrower.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Department</label>
                    <p className="text-base text-primary-50">{selectedBorrower.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Year</label>
                    <p className="text-base text-primary-50">{selectedBorrower.year}</p>
                  </div>
                </div>
              </div>

              {/* Borrowing Statistics */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoBookOutline className="w-5 h-5" />
                  Borrowing Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                    <p className="text-sm text-blue-600/80 mb-1">Active Loans</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedBorrower.activeLoans}</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                    <p className="text-sm text-red-600/80 mb-1">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">{selectedBorrower.overdueBooks}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                    <p className="text-sm text-green-600/80 mb-1">Total Borrowed</p>
                    <p className="text-2xl font-bold text-green-600">{selectedBorrower.totalBorrowed}</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                    <p className="text-sm text-purple-600/80 mb-1">Member Since</p>
                    <p className="text-sm font-bold text-purple-600">{selectedBorrower.registrationDate}</p>
                  </div>
                </div>
              </div>

              {/* Active Loans */}
              <div>
                <h3 className="text-lg font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoCalendarOutline className="w-5 h-5" />
                  Active Loans
                </h3>
                <div className="space-y-3">
                  {mockLoans.map((loan, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-primary-100/30 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-primary-50">{loan.bookTitle}</h4>
                          <p className="text-sm text-primary-50/60">ISBN: {loan.isbn}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          loan.status === "overdue" 
                            ? "bg-red-50 text-red-600 border-red-200" 
                            : "bg-blue-50 text-blue-600 border-blue-200"
                        }`}>
                          {loan.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-primary-50/70">
                        <span>Checkout: {loan.checkoutDate}</span>
                        <span>•</span>
                        <span>Due: {loan.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowersPage;
