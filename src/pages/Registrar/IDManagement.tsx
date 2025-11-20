import React, { useState, useMemo } from "react";
import { IdCard, Eye, Search,  Mail, Phone, Calendar, Download, Printer, CheckCircle } from "lucide-react";

interface StudentID {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  studentCode: string;
  registrationDate: string;
  cardStatus: "not_generated" | "generated" | "printed" | "issued";
  cardNumber?: string;
}

const IDManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<StudentID[]>([
    {
      id: "stu001",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@email.com",
      phone: "+1234567891",
      program: "Business Administration",
      studentCode: "STU24001",
      registrationDate: "2024-11-14",
      cardStatus: "not_generated",
    },
    {
      id: "stu002",
      firstName: "Alice",
      lastName: "Williams",
      email: "alice.williams@email.com",
      phone: "+1234567893",
      program: "Medicine",
      studentCode: "STU24002",
      registrationDate: "2024-11-12",
      cardStatus: "generated",
      cardNumber: "IDC24001",
    },
    {
      id: "stu003",
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@email.com",
      phone: "+1234567892",
      program: "Engineering",
      studentCode: "STU24003",
      registrationDate: "2024-11-10",
      cardStatus: "printed",
      cardNumber: "IDC24002",
    },
    {
      id: "stu004",
      firstName: "Charlie",
      lastName: "Brown",
      email: "charlie.brown@email.com",
      phone: "+1234567894",
      program: "Law",
      studentCode: "STU24004",
      registrationDate: "2024-11-08",
      cardStatus: "issued",
      cardNumber: "IDC24003",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentID | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentCode.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [students, searchTerm]);

  const handleGenerateCard = (id: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id
          ? {
              ...student,
              cardStatus: "generated" as const,
              cardNumber: 'IDC' + Date.now().toString().slice(-6)
            }
          : student
      )
    );
  };

  const handlePrintCard = (id: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, cardStatus: "printed" as const } : student
      )
    );
  };

  const handleIssueCard = (id: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, cardStatus: "issued" as const } : student
      )
    );
  };

  const handleViewDetails = (id: string) => {
    const student = students.find(s => s.id === id);
    if (student) {
      setSelectedStudent(student);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not_generated": return "text-gray-600 bg-gray-100";
      case "generated": return "text-blue-600 bg-blue-100";
      case "printed": return "text-yellow-600 bg-yellow-100";
      case "issued": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Student ID Management
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Generate, print, and issue student ID cards
          </p>
        </div>

        {/* Search */}
        <div className="mb-4 xs:mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, program, or student code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <IdCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No students found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-primary-50">
                          {student.firstName} {student.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{student.program}</p>
                        <p className="text-xs text-primary-50/60">Code: {student.studentCode}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(student.cardStatus)}`}>
                        {student.cardStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-gray-400" />
                        <span>{student.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        <span>Registered: {student.registrationDate}</span>
                      </div>
                      {student.cardNumber && (
                        <div className="flex items-center gap-2">
                          <IdCard size={14} className="text-gray-400" />
                          <span>Card: {student.cardNumber}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-2">
                      {student.cardStatus === "not_generated" && (
                        <button
                          onClick={() => handleGenerateCard(student.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded text-xs hover:bg-blue-200"
                        >
                          <Download size={12} />
                          Generate
                        </button>
                      )}
                      {student.cardStatus === "generated" && (
                        <button
                          onClick={() => handlePrintCard(student.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-600 rounded text-xs hover:bg-yellow-200"
                        >
                          <Printer size={12} />
                          Print
                        </button>
                      )}
                      {student.cardStatus === "printed" && (
                        <button
                          onClick={() => handleIssueCard(student.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded text-xs hover:bg-green-200"
                        >
                          <CheckCircle size={12} />
                          Issue
                        </button>
                      )}
                      <button
                        onClick={() => handleViewDetails(student.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200"
                      >
                        <Eye size={12} />
                        Details
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
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Name</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Email</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Program</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Student Code</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Card Status</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Card Number</th>
                      <th className="text-center py-3 text-sm font-medium text-primary-50">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 text-sm text-primary-50 font-medium">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="py-3 text-sm text-primary-50/70">{student.email}</td>
                        <td className="py-3 text-sm text-primary-50/70">{student.program}</td>
                        <td className="py-3 text-sm text-primary-50/70">{student.studentCode}</td>
                        <td className="py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(student.cardStatus)}`}>
                            {student.cardStatus.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-primary-50/70">{student.cardNumber || '-'}</td>
                        <td className="py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {student.cardStatus === "not_generated" && (
                              <button
                                onClick={() => handleGenerateCard(student.id)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                title="Generate Card"
                              >
                                <Download size={16} />
                              </button>
                            )}
                            {student.cardStatus === "generated" && (
                              <button
                                onClick={() => handlePrintCard(student.id)}
                                className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
                                title="Print Card"
                              >
                                <Printer size={16} />
                              </button>
                            )}
                            {student.cardStatus === "printed" && (
                              <button
                                onClick={() => handleIssueCard(student.id)}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                                title="Issue Card"
                              >
                                <CheckCircle size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleViewDetails(student.id)}
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
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg shadow-primary-50 max-w-md w-full max-h-[90vh] overflow-y-auto">
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
                        {selectedStudent.firstName} {selectedStudent.lastName}
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Email
                      </div>
                      <div className="text-lg font-medium text-primary-50">
                        {selectedStudent.email}
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Phone
                      </div>
                      <div className="text-lg font-medium text-primary-50">
                        {selectedStudent.phone}
                      </div>
                    </div>
                    <div className="py-3">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Program
                      </div>
                      <div className="text-lg font-medium text-primary-50">
                        {selectedStudent.program}
                      </div>
                    </div>
                  </>
                )}
                {currentPage === 2 && (
                  <>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Student Code
                      </div>
                      <div className="text-lg font-medium text-primary-50">
                        {selectedStudent.studentCode}
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Registration Date
                      </div>
                      <div className="text-lg font-medium text-primary-50">
                        {selectedStudent.registrationDate}
                      </div>
                    </div>
                    <div className="py-3 border-b border-gray-100">
                      <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                        Card Status
                      </div>
                      <div className="text-lg font-medium text-primary-50 capitalize">
                        {selectedStudent.cardStatus.replace('_', ' ')}
                      </div>
                    </div>
                    {selectedStudent.cardNumber && (
                      <div className="py-3">
                        <div className="text-xs uppercase tracking-wide text-primary-50/60 mb-2">
                          Card Number
                        </div>
                        <div className="text-lg font-medium text-primary-50">
                          {selectedStudent.cardNumber}
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
              <div className="mt-4 flex justify-end">
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

export default IDManagement;