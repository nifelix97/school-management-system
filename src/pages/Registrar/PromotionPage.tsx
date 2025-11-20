import React, { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, BookOpen, CreditCard, FileText, Info, Eye, Search } from "lucide-react";

interface StudentPromotion {
  id: string;
  firstName: string;
  lastName: string;
  studentCode: string;
  currentYear: string;
  currentLevel: string;
  promotionStatus: "promoted" | "not_promoted" | "conditional";
  newYear?: string;
  newLevel?: string;
  hasRetakes: boolean;
  paymentCleared: boolean;
}

const PromotionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentPromotion | null>(null);

  // Mock data for demonstration
  const students: StudentPromotion[] = [
    {
      id: "stu001",
      firstName: "John",
      lastName: "Doe",
      studentCode: "STU24001",
      currentYear: "Year 1",
      currentLevel: "Level 4",
      promotionStatus: "promoted",
      newYear: "Year 2",
      newLevel: "Level 5",
      hasRetakes: false,
      paymentCleared: true,
    },
    {
      id: "stu002",
      firstName: "Jane",
      lastName: "Smith",
      studentCode: "STU24002",
      currentYear: "Year 1",
      currentLevel: "Level 4",
      promotionStatus: "conditional",
      newYear: "Year 2",
      newLevel: "Level 5",
      hasRetakes: true,
      paymentCleared: true,
    },
    {
      id: "stu003",
      firstName: "Bob",
      lastName: "Johnson",
      studentCode: "STU24003",
      currentYear: "Year 1",
      currentLevel: "Level 4",
      promotionStatus: "not_promoted",
      hasRetakes: true,
      paymentCleared: false,
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentCode.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleViewDetails = (student: StudentPromotion) => {
    setSelectedStudent(student);
  };

  const handleStatusChange = (id: string, newStatus: "promoted" | "not_promoted" | "conditional") => {
    // In real app, update via API
    console.log(`Updating student ${id} to ${newStatus}`);
  };

  const promotionData = selectedStudent ? {
    studentName: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
    studentCode: selectedStudent.studentCode,
    currentYear: selectedStudent.currentYear,
    currentLevel: selectedStudent.currentLevel,
    promotionStatus: selectedStudent.promotionStatus,
    newYear: selectedStudent.newYear,
    newLevel: selectedStudent.newLevel,
    allowedModules: selectedStudent.promotionStatus === "promoted" || selectedStudent.promotionStatus === "conditional" ? [
      { code: "CS201", name: "Data Structures", type: "new" },
      { code: "CS202", name: "Algorithms", type: "new" },
      { code: "CS203", name: "Database Systems", type: "new" },
      ...(selectedStudent.hasRetakes ? [{ code: "CS101", name: "Programming Fundamentals", type: "retake" }] : []),
    ] : [],
    retakes: selectedStudent.hasRetakes ? [
      { code: "CS101", name: "Programming Fundamentals", deadline: "2025-01-15", fee: "$50" },
    ] : [],
    paymentStatus: {
      outstandingBalance: selectedStudent.paymentCleared ? "$0" : "$200",
      dueDate: "2024-12-31",
      isCleared: selectedStudent.paymentCleared,
    },
    enrollmentConfirmed: selectedStudent.promotionStatus === "promoted" && selectedStudent.paymentCleared,
    notes: [
      "You must complete all retake modules before graduation.",
      "Late registration will attract a $25 penalty.",
      "Promotion is provisional until fees are cleared.",
    ],
  } : null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "promoted":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "not_promoted":
        return <XCircle className="w-6 h-6 text-red-500" />;
      case "conditional":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "promoted":
        return "text-green-600 bg-green-50";
      case "not_promoted":
        return "text-red-600 bg-red-50";
      case "conditional":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getModuleTypeColor = (type: string) => {
    return type === "new" ? "text-blue-600 bg-blue-50" : "text-orange-600 bg-orange-50";
  };

  if (!selectedStudent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          {/* Header */}
          <div className="mb-4 xs:mb-6">
            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
              Student Promotions
            </h1>
            <p className="text-xs xs:text-sm text-primary-50/60">
              Manage student promotion statuses
            </p>
          </div>

          {/* Search */}
          <div className="mb-4 xs:mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or student code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
              />
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
                          <p className="text-sm text-gray-600">{student.studentCode}</p>
                          <p className="text-xs text-primary-50/60">{student.currentYear} - {student.currentLevel}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(student.promotionStatus)}`}>
                          {student.promotionStatus.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        {student.hasRetakes && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                        <span className="text-xs text-primary-50/70">
                          {student.hasRetakes ? 'Has retakes' : 'No retakes'}
                        </span>
                        <span className={`text-xs ${student.paymentCleared ? 'text-green-600' : 'text-red-600'}`}>
                          {student.paymentCleared ? 'Paid' : 'Unpaid'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={student.promotionStatus}
                          onChange={(e) => handleStatusChange(student.id, e.target.value as "promoted" | "not_promoted" | "conditional")}
                          className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="promoted">Promoted</option>
                          <option value="conditional">Conditional</option>
                          <option value="not_promoted">Not Promoted</option>
                        </select>
                        <button
                          onClick={() => handleViewDetails(student)}
                          className="px-3 py-1 bg-primary-50 text-white rounded text-sm hover:bg-primary-100"
                        >
                          <Eye size={14} />
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
                        <th className="text-left py-3 text-sm font-medium text-primary-50">Student Code</th>
                        <th className="text-left py-3 text-sm font-medium text-primary-50">Current Year/Level</th>
                        <th className="text-left py-3 text-sm font-medium text-primary-50">Status</th>
                        <th className="text-left py-3 text-sm font-medium text-primary-50">Retakes</th>
                        <th className="text-left py-3 text-sm font-medium text-primary-50">Payment</th>
                        <th className="text-center py-3 text-sm font-medium text-primary-50">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 text-sm text-primary-50 font-medium">
                            {student.firstName} {student.lastName}
                          </td>
                          <td className="py-3 text-sm text-primary-50/70">{student.studentCode}</td>
                          <td className="py-3 text-sm text-primary-50/70">{student.currentYear} - {student.currentLevel}</td>
                          <td className="py-3 text-sm">
                            <select
                              value={student.promotionStatus}
                              onChange={(e) => handleStatusChange(student.id, e.target.value as "promoted" | "not_promoted" | "conditional")}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="promoted">Promoted</option>
                              <option value="conditional">Conditional</option>
                              <option value="not_promoted">Not Promoted</option>
                            </select>
                          </td>
                          <td className="py-3 text-sm text-primary-50/70">
                            {student.hasRetakes ? <AlertTriangle className="w-4 h-4 text-yellow-500 inline" /> : 'None'}
                          </td>
                          <td className="py-3 text-sm">
                            <span className={`font-medium ${student.paymentCleared ? 'text-green-600' : 'text-red-600'}`}>
                              {student.paymentCleared ? 'Cleared' : 'Pending'}
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            <button
                              onClick={() => handleViewDetails(student)}
                              className="p-1 text-primary-50 hover:bg-primary-50/10 rounded"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
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
      </div>
    );
  }

  // Details view
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <button
            onClick={() => setSelectedStudent(null)}
            className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            ← Back to List
          </button>
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Student Promotion Status
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            {promotionData!.studentName} - {promotionData!.studentCode}
          </p>
        </div>

        {/* Promotion Status */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base xs:text-lg font-semibold text-primary-50">Promotion Status</h2>
            {getStatusIcon(promotionData!.promotionStatus)}
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(promotionData!.promotionStatus)}`}>
            {promotionData!.promotionStatus.replace('_', ' ').toUpperCase()}
          </div>
          {promotionData!.promotionStatus === "conditional" && (
            <p className="text-sm text-primary-50/70 mt-2">
              Allowed to continue but must retake failed modules.
            </p>
          )}
        </div>

        {/* Academic Year & Level Upgrade */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base xs:text-lg font-semibold text-primary-50">Academic Year & Level Upgrade</h2>
            <BookOpen className="w-5 h-5 text-primary-50/60" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-primary-50/60">Current Year</p>
              <p className="text-lg font-medium text-primary-50">{promotionData!.currentYear}</p>
            </div>
            <div>
              <p className="text-sm text-primary-50/60">New Year</p>
              <p className="text-lg font-medium text-primary-50">{promotionData!.newYear}</p>
            </div>
            <div>
              <p className="text-sm text-primary-50/60">Current Level</p>
              <p className="text-lg font-medium text-primary-50">{promotionData!.currentLevel}</p>
            </div>
            <div>
              <p className="text-sm text-primary-50/60">New Level</p>
              <p className="text-lg font-medium text-primary-50">{promotionData!.newLevel}</p>
            </div>
          </div>
          <p className="text-sm text-primary-50/70 mt-4">
            You are confirmed to continue in your current program.
          </p>
        </div>

        {/* List of Courses/Modules Allowed */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base xs:text-lg font-semibold text-primary-50">Allowed Courses/Modules</h2>
            <BookOpen className="w-5 h-5 text-primary-50/60" />
          </div>
          <div className="space-y-3">
            {promotionData!.allowedModules.map((module) => (
              <div key={module.code} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-primary-50">{module.code} - {module.name}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getModuleTypeColor(module.type)}`}>
                    {module.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Retakes */}
        {promotionData!.retakes.length > 0 && (
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-base xs:text-lg font-semibold text-primary-50">Pending Retakes</h2>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-3">
              {promotionData!.retakes.map((retake) => (
                <div key={retake.code} className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <p className="font-medium text-primary-50">{retake.code} - {retake.name}</p>
                  <p className="text-sm text-primary-50/70">Deadline: {retake.deadline}</p>
                  <p className="text-sm text-primary-50/70">Fee: {retake.fee}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Requirements */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base xs:text-lg font-semibold text-primary-50">Payment Requirements</h2>
            <CreditCard className="w-5 h-5 text-primary-50/60" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-primary-50">Outstanding Balance</span>
              <span className={`font-medium ${promotionData!.paymentStatus.isCleared ? 'text-green-600' : 'text-red-600'}`}>
                {promotionData!.paymentStatus.outstandingBalance}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-50">Due Date</span>
              <span className="text-primary-50/70">{promotionData!.paymentStatus.dueDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-50">Status</span>
              <span className={`font-medium ${promotionData!.paymentStatus.isCleared ? 'text-green-600' : 'text-red-600'}`}>
                {promotionData!.paymentStatus.isCleared ? 'Cleared' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Admission/Enrollment Confirmation */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base xs:text-lg font-semibold text-primary-50">Enrollment Confirmation</h2>
            <FileText className="w-5 h-5 text-primary-50/60" />
          </div>
          <div className="flex items-center gap-3">
            {promotionData!.enrollmentConfirmed ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-500" />
                <p className="text-primary-50">You are officially enrolled for the next academic year.</p>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-500" />
                <p className="text-primary-50">Enrollment pending payment clearance.</p>
              </>
            )}
          </div>
          {promotionData!.enrollmentConfirmed && (
            <button className="mt-4 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100">
              Print Promotion Letter
            </button>
          )}
        </div>

        {/* Notes & Warnings */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base xs:text-lg font-semibold text-primary-50">Notes & Warnings</h2>
            <Info className="w-5 h-5 text-primary-50/60" />
          </div>
          <ul className="space-y-2">
            {promotionData!.notes.map((note, index) => (
              <li key={index} className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-primary-50/70">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PromotionPage;