import React, { useState, useMemo } from "react";
import { CheckCircle, XCircle, Eye, Search, User, Mail, Phone, Calendar } from "lucide-react";

interface StudentApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  applicationDate: string;
  status: "pending" | "approved" | "rejected";
  studentCode?: string;
  paymentStatus: "paid" | "pending";
}

const tabs = ["Pending Registrations", "Registered Students"] as const;
type Tab = (typeof tabs)[number];

const PendingRegistration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Pending Registrations");
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState<StudentApplication[]>([
    {
      id: "app001",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      phone: "+1234567890",
      program: "Computer Science",
      applicationDate: "2024-11-15",
      status: "pending",
      paymentStatus: "paid",
    },
    {
      id: "app002",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@email.com",
      phone: "+1234567891",
      program: "Business Administration",
      applicationDate: "2024-11-14",
      status: "approved",
      studentCode: "STU24001",
      paymentStatus: "paid",
    },
    {
      id: "app003",
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@email.com",
      phone: "+1234567892",
      program: "Engineering",
      applicationDate: "2024-11-13",
      status: "pending",
      paymentStatus: "pending",
    },
    {
      id: "app004",
      firstName: "Alice",
      lastName: "Williams",
      email: "alice.williams@email.com",
      phone: "+1234567893",
      program: "Medicine",
      applicationDate: "2024-11-12",
      status: "approved",
      studentCode: "STU24002",
      paymentStatus: "paid",
    },
    {
      id: "app005",
      firstName: "Charlie",
      lastName: "Brown",
      email: "charlie.brown@email.com",
      phone: "+1234567894",
      program: "Law",
      applicationDate: "2024-11-11",
      status: "rejected",
      paymentStatus: "paid",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<StudentApplication | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.program.toLowerCase().includes(searchTerm.toLowerCase());

      if (activeTab === "Pending Registrations") {
        return matchesSearch && app.status === "pending";
      } else {
        return matchesSearch && app.status === "approved";
      }
    });
  }, [applications, searchTerm, activeTab]);

  const handleApprove = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id
          ? { ...app, status: "approved" as const, studentCode: 'STU' + Date.now().toString().slice(-6) }
          : app
      )
    );
  };

  const handleReject = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "rejected" as const } : app
      )
    );
  };

  const handleViewDetails = (id: string) => {
    const app = applications.find(a => a.id === id);
    if (app) {
      setSelectedApplication(app);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Student Registrations
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Manage pending and registered student applications
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-4 xs:mb-6 text-xs sm:text-sm md:text-base overflow-x-auto no-scrollbar">
          {tabs.map((t) => {
            const isActive = activeTab === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTab(t)}
                className={`relative pb-2 whitespace-nowrap bg-transparent border-none cursor-pointer ${
                  isActive
                    ? "text-primary-100 font-semibold"
                    : "text-primary-50/60 hover:text-primary-50"
                }`}
              >
                {t}
                {isActive && (
                  <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-primary-100 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="mb-4 xs:mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No {activeTab.toLowerCase()} found
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4">
                {filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-primary-50">
                          {app.firstName} {app.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{app.program}</p>
                      </div>
                      {activeTab === "Pending Registrations" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(app.id)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleReject(app.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span>{app.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-gray-400" />
                        <span>{app.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        <span>Applied: {app.applicationDate}</span>
                      </div>
                      {app.studentCode && (
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-gray-400" />
                          <span>Student Code: {app.studentCode}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => handleViewDetails(app.id)}
                        className="flex items-center gap-2 text-primary-50 hover:text-primary-100"
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-primary-50">
                        Name
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">
                        Email
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">
                        Phone
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">
                        Program
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">
                        Applied Date
                      </th>
                      {activeTab === "Registered Students" && (
                        <th className="text-left py-3 text-sm font-medium text-primary-50">
                          Student Code
                        </th>
                      )}
                      <th className="text-center py-3 text-sm font-medium text-primary-50">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 text-sm text-primary-50 font-medium">
                          {app.firstName} {app.lastName}
                        </td>
                        <td className="py-3 text-sm text-primary-50/70">
                          {app.email}
                        </td>
                        <td className="py-3 text-sm text-primary-50/70">
                          {app.phone}
                        </td>
                        <td className="py-3 text-sm text-primary-50/70">
                          {app.program}
                        </td>
                        <td className="py-3 text-sm text-primary-50/70">
                          {app.applicationDate}
                        </td>
                        {activeTab === "Registered Students" && (
                          <td className="py-3 text-sm text-primary-50/70">
                            {app.studentCode}
                          </td>
                        )}
                        <td className="py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {activeTab === "Pending Registrations" ? (
                              <>
                                <button
                                  onClick={() => handleApprove(app.id)}
                                  className="p-1 text-green-600 hover:bg-green-50 rounded"
                                  title="Approve"
                                >
                                  <CheckCircle size={16} />
                                </button>
                                <button
                                  onClick={() => handleReject(app.id)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                                  title="Reject"
                                >
                                  <XCircle size={16} />
                                </button>
                              </>
                            ) : null}
                            <button
                              onClick={() => handleViewDetails(app.id)}
                              className="p-1 text-primary-50 hover:bg-primary-50/10 rounded"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 ">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-primary-50">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary-50">
                  Student Details
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                {currentPage === 1 && (
                  <>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Full Name
                      </div>
                      <div className="text-lg font-medium text-primary-50">
                        {selectedApplication.firstName}{" "}
                        {selectedApplication.lastName}
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Email
                      </div>
                      <div className="text-lg font-medium text-primary-50">
                        {selectedApplication.email}
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Phone
                      </div>
                      <div className="text-lg font-medium text-primary-50">
                        {selectedApplication.phone}
                      </div>
                    </div>
                    <div className="py-3">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Program
                      </div>
                      <div className="text-lg font-medium text-primary-50">
                        {selectedApplication.program}
                      </div>
                    </div>
                  </>
                )}
                {currentPage === 2 && (
                  <>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Application Date
                      </div>
                      <div className="text-lg font-medium text-primary-50">
                        {selectedApplication.applicationDate}
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Status
                      </div>
                      <div className="text-lg font-medium text-primary-50 capitalize">
                        {selectedApplication.status}
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Payment Status
                      </div>
                      <div className="text-lg font-medium text-primary-50 capitalize">
                        {selectedApplication.paymentStatus}
                      </div>
                    </div>
                    {selectedApplication.studentCode && (
                      <div className="py-3">
                        <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                          Student Code
                        </div>
                        <div className="text-lg font-medium text-primary-50">
                          {selectedApplication.studentCode}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                >
                  Previous
                </button>
                <span className="text-sm text-primary-50/60">
                  Page {currentPage} of 2
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, 2))}
                  disabled={currentPage === 2}
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRegistration;