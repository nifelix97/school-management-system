import React, { useState, useMemo } from "react";
import { Search, Eye,  AlertTriangle, Download, Upload, User, BookOpen, DollarSign } from "lucide-react";

interface StudentRecord {
  id: string;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  program: string;
  department: string;
  currentLevel: string;
  currentYear: string;
  currentSemester: string;
  enrollmentStatus: "active" | "suspended" | "withdrawn" | "deferred" | "graduated" | "dismissed";
  campus: string;
  entryYear: string;
  academicRecords: {
    modules: Array<{
      code: string;
      name: string;
      semester: string;
      grade: string;
      status: "passed" | "failed" | "retake" | "supplementary";
    }>;
    gpa: number;
    cgpa: number;
    promotionHistory: string[];
  };
  documents: Array<{
    type: string;
    status: "approved" | "pending" | "rejected";
    uploadedDate?: string;
  }>;
  fees: {
    total: number;
    paid: number;
    balance: number;
    clearanceStatus: "cleared" | "pending";
    paymentHistory: Array<{
      date: string;
      amount: number;
      description: string;
    }>;
  };
  disciplinaryActions: Array<{
    type: string;
    startDate: string;
    endDate?: string;
    reason: string;
    status: "active" | "completed";
  }>;
  registeredCourses: Array<{
    code: string;
    name: string;
    semester: string;
    status: "approved" | "pending" | "rejected";
  }>;
}

const StudentRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [activeTab, setActiveTab] = useState<string>("profile");

  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: "stu001",
      registrationNumber: "REG2024001",
      firstName: "John",
      lastName: "Doe",
      nationalId: "123456789",
      gender: "Male",
      dob: "2000-05-15",
      email: "john.doe@university.edu",
      phone: "+1234567890",
      address: "123 Main St, City, Country",
      guardianName: "Jane Doe",
      guardianPhone: "+1234567891",
      program: "Computer Science",
      department: "Information Technology",
      currentLevel: "Level 5",
      currentYear: "Year 2",
      currentSemester: "Semester 1",
      enrollmentStatus: "active",
      campus: "Main Campus",
      entryYear: "2024",
      academicRecords: {
        modules: [
          { code: "CS101", name: "Programming Fundamentals", semester: "2024S1", grade: "A", status: "passed" },
          { code: "CS102", name: "Data Structures", semester: "2024S1", grade: "B+", status: "passed" },
          { code: "CS201", name: "Algorithms", semester: "2024S2", grade: "B", status: "passed" },
        ],
        gpa: 3.5,
        cgpa: 3.4,
        promotionHistory: ["Year 1 → Year 2"],
      },
      documents: [
        { type: "Admission Letter", status: "approved", uploadedDate: "2024-08-01" },
        { type: "National ID", status: "approved", uploadedDate: "2024-08-01" },
        { type: "Medical Form", status: "pending" },
      ],
      fees: {
        total: 5000,
        paid: 4000,
        balance: 1000,
        clearanceStatus: "pending",
        paymentHistory: [
          { date: "2024-09-01", amount: 2000, description: "Semester 1 Fees" },
          { date: "2024-01-15", amount: 2000, description: "Semester 2 Fees" },
        ],
      },
      disciplinaryActions: [],
      registeredCourses: [
        { code: "CS301", name: "Database Systems", semester: "2025S1", status: "approved" },
        { code: "CS302", name: "Software Engineering", semester: "2025S1", status: "pending" },
      ],
    },
    {
      id: "stu002",
      registrationNumber: "REG2024002",
      firstName: "Jane",
      lastName: "Smith",
      nationalId: "987654321",
      gender: "Female",
      dob: "2001-03-20",
      email: "jane.smith@university.edu",
      phone: "+1234567892",
      address: "456 Oak St, City, Country",
      guardianName: "Bob Smith",
      guardianPhone: "+1234567893",
      program: "Business Administration",
      department: "Business Studies",
      currentLevel: "Level 4",
      currentYear: "Year 1",
      currentSemester: "Semester 2",
      enrollmentStatus: "suspended",
      campus: "Main Campus",
      entryYear: "2024",
      academicRecords: {
        modules: [
          { code: "BA101", name: "Business Principles", semester: "2024S1", grade: "C+", status: "passed" },
          { code: "BA102", name: "Accounting Basics", semester: "2024S1", grade: "D", status: "retake" },
        ],
        gpa: 2.8,
        cgpa: 2.8,
        promotionHistory: [],
      },
      documents: [
        { type: "Admission Letter", status: "approved", uploadedDate: "2024-08-01" },
        { type: "National ID", status: "approved", uploadedDate: "2024-08-01" },
      ],
      fees: {
        total: 4500,
        paid: 4500,
        balance: 0,
        clearanceStatus: "cleared",
        paymentHistory: [
          { date: "2024-09-01", amount: 2250, description: "Semester 1 Fees" },
          { date: "2025-01-15", amount: 2250, description: "Semester 2 Fees" },
        ],
      },
      disciplinaryActions: [
        {
          type: "Academic Misconduct",
          startDate: "2024-11-01",
          endDate: "2024-12-01",
          reason: "Plagiarism in assignment",
          status: "completed",
        },
      ],
      registeredCourses: [
        { code: "BA201", name: "Marketing", semester: "2025S1", status: "approved" },
      ],
    },
  ]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nationalId.includes(searchTerm);

      const matchesStatus = statusFilter === "all" || student.enrollmentStatus === statusFilter;
      const matchesProgram = programFilter === "all" || student.program === programFilter;

      return matchesSearch && matchesStatus && matchesProgram;
    });
  }, [students, searchTerm, statusFilter, programFilter]);

  const handleStatusChange = (id: string, newStatus: StudentRecord["enrollmentStatus"]) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, enrollmentStatus: newStatus } : student
      )
    );
  };

  const handleDocumentStatusChange = (studentId: string, docType: string, newStatus: "approved" | "pending" | "rejected") => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId
          ? {
              ...student,
              documents: student.documents.map(doc =>
                doc.type === docType ? { ...doc, status: newStatus } : doc
              ),
            }
          : student
      )
    );
  };

  const handleCourseStatusChange = (studentId: string, courseCode: string, newStatus: "approved" | "pending" | "rejected") => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId
          ? {
              ...student,
              registeredCourses: student.registeredCourses.map(course =>
                course.code === courseCode ? { ...course, status: newStatus } : course
              ),
            }
          : student
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-50";
      case "suspended": return "text-yellow-600 bg-yellow-50";
      case "withdrawn": return "text-gray-600 bg-gray-50";
      case "deferred": return "text-blue-600 bg-blue-50";
      case "graduated": return "text-purple-600 bg-purple-50";
      case "dismissed": return "text-red-600 bg-red-50";
      case "approved": return "text-green-600 bg-green-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "rejected": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          {/* Header */}
          <div className="mb-4 xs:mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
                Student Record Details
              </h1>
              <p className="text-xs xs:text-sm text-primary-50/60">
                {selectedStudent.firstName} {selectedStudent.lastName} -{" "}
                {selectedStudent.registrationNumber}
              </p>
            </div>
            <button
              onClick={() => setSelectedStudent(null)}
              className="px-4 py-2 bg-gray-200 text-primary-50 rounded-lg hover:bg-gray-300"
            >
              ← Back to List
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-6 text-xs sm:text-sm md:text-base overflow-x-auto no-scrollbar">
            {[
              "profile",
              "academic",
              "documents",
              "courses",
              "disciplinary",
            ].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-2 whitespace-nowrap bg-transparent border-none cursor-pointer capitalize ${
                    isActive
                      ? "text-primary-100 font-semibold"
                      : "text-primary-50/60 hover:text-primary-50"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-primary-100 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-primary-50">
                    Personal Information
                  </h2>
                  <select
                    value={selectedStudent.enrollmentStatus}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedStudent.id,
                        e.target.value as StudentRecord["enrollmentStatus"]
                      )
                    }
                    className="px-3 py-1 border border-gray-300 rounded text-sm text-primary-50"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="withdrawn">Withdrawn</option>
                    <option value="deferred">Deferred</option>
                    <option value="graduated">Graduated</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-primary-50">
                  <div className="space-y-3">
                    <div>
                      <strong>Registration Number:</strong>{" "}
                      {selectedStudent.registrationNumber}
                    </div>
                    <div>
                      <strong>National ID:</strong> {selectedStudent.nationalId}
                    </div>
                    <div>
                      <strong>Gender:</strong> {selectedStudent.gender}
                    </div>
                    <div>
                      <strong>Date of Birth:</strong> {selectedStudent.dob}
                    </div>
                    <div>
                      <strong>Email:</strong> {selectedStudent.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {selectedStudent.phone}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <strong>Address:</strong> {selectedStudent.address}
                    </div>
                    <div>
                      <strong>Guardian:</strong> {selectedStudent.guardianName}
                    </div>
                    <div>
                      <strong>Guardian Phone:</strong>{" "}
                      {selectedStudent.guardianPhone}
                    </div>
                    <div>
                      <strong>Program:</strong> {selectedStudent.program}
                    </div>
                    <div>
                      <strong>Department:</strong> {selectedStudent.department}
                    </div>
                    <div>
                      <strong>Campus:</strong> {selectedStudent.campus}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t text-primary-50">
                  <div>
                    <strong>Current Level:</strong>{" "}
                    {selectedStudent.currentLevel}
                  </div>
                  <div>
                    <strong>Current Year:</strong> {selectedStudent.currentYear}
                  </div>
                  <div>
                    <strong>Current Semester:</strong>{" "}
                    {selectedStudent.currentSemester}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "academic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedStudent.academicRecords.gpa}
                    </div>
                    <div className="text-sm text-blue-600">Current GPA</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedStudent.academicRecords.cgpa}
                    </div>
                    <div className="text-sm text-green-600">CGPA</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedStudent.academicRecords.modules.length}
                    </div>
                    <div className="text-sm text-purple-600">Total Modules</div>
                  </div>
                </div>
                <div className="text-primary-50">
                  <h3 className="text-lg font-semibold mb-4">Module History</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download size={16} className="inline mr-2" />
                      Generate Transcript
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <Download size={16} className="inline mr-2" />
                      Progress Report
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Code</th>
                          <th className="text-left py-2">Name</th>
                          <th className="text-left py-2">Semester</th>
                          <th className="text-left py-2">Grade</th>
                          <th className="text-left py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.academicRecords.modules.map(
                          (module) => (
                            <tr key={module.code} className="border-b">
                              <td className="py-2">{module.code}</td>
                              <td className="py-2">{module.name}</td>
                              <td className="py-2">{module.semester}</td>
                              <td className="py-2">{module.grade}</td>
                              <td className="py-2 capitalize">
                                {module.status}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="text-primary-50">
                  <h3 className="text-lg font-semibold mb-4">
                    Promotion History
                  </h3>
                  <ul className="list-disc list-inside">
                    {selectedStudent.academicRecords.promotionHistory.map(
                      (promotion, index) => (
                        <li key={index}>{promotion}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-4 text-primary-50">
                {selectedStudent.documents.map((doc) => (
                  <div
                    key={doc.type}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{doc.type}</div>
                      <div className="text-sm text-primary-50/60">
                        Status:{" "}
                        <span
                          className={`capitalize ${getStatusColor(
                            doc.status
                          )} px-2 py-1 rounded text-xs`}
                        >
                          {doc.status}
                        </span>
                      </div>
                      {doc.uploadedDate && (
                        <div className="text-sm text-primary-50/60">
                          Uploaded: {doc.uploadedDate}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={doc.status}
                        onChange={(e) =>
                          handleDocumentStatusChange(
                            selectedStudent.id,
                            doc.type,
                            e.target.value as
                              | "approved"
                              | "pending"
                              | "rejected"
                          )
                        }
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="approved">Approve</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Reject</option>
                      </select>
                      <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200">
                        <Upload size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-4 text-primary-50">
                <h3 className="text-lg font-semibold">Registered Courses</h3>
                {selectedStudent.registeredCourses.map((course) => (
                  <div
                    key={course.code}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">
                        {course.code} - {course.name}
                      </div>
                      <div className="text-sm text-primary-50/60">
                        Semester: {course.semester}
                      </div>
                    </div>
                    <select
                      value={course.status}
                      onChange={(e) =>
                        handleCourseStatusChange(
                          selectedStudent.id,
                          course.code,
                          e.target.value as "approved" | "pending" | "rejected"
                        )
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* {activeTab === "fees" && (
              <div className="space-y-6 text-primary-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">${selectedStudent.fees.total}</div>
                    <div className="text-sm text-blue-600">Total Fees</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">${selectedStudent.fees.paid}</div>
                    <div className="text-sm text-green-600">Paid</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-xl font-bold text-red-600">${selectedStudent.fees.balance}</div>
                    <div className="text-sm text-red-600">Balance</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600 capitalize">{selectedStudent.fees.clearanceStatus}</div>
                    <div className="text-sm text-yellow-600">Clearance</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                  <div className="space-y-2">
                    {selectedStudent.fees.paymentHistory.map((payment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <div className="font-medium">{payment.description}</div>
                          <div className="text-sm text-gray-600">{payment.date}</div>
                        </div>
                        <div className="font-medium text-green-600">${payment.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )} */}

            {activeTab === "disciplinary" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary-50">
                  Disciplinary Actions
                </h3>
                {selectedStudent.disciplinaryActions.length === 0 ? (
                  <p className="text-sm text-primary-50/60">
                    No disciplinary actions recorded.
                  </p>
                ) : (
                  selectedStudent.disciplinaryActions.map((action, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium capitalize">
                          {action.type}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${getStatusColor(
                            action.status
                          )}`}
                        >
                          {action.status}
                        </span>
                      </div>
                      <div className="text-sm text-primary-50/60 mb-2">
                        {action.reason}
                      </div>
                      <div className="text-sm text-primary-50/60">
                        <span>Start: {action.startDate}</span>
                        {action.endDate && (
                          <span> | End: {action.endDate}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Add Disciplinary Action
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Student Records Management
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            View and manage comprehensive student records
          </p>
        </div>

        {/* Filters */}
        <div className="mb-4 xs:mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, reg number, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="withdrawn">Withdrawn</option>
            <option value="deferred">Deferred</option>
            <option value="graduated">Graduated</option>
            <option value="dismissed">Dismissed</option>
          </select>
          <select
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Programs</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business Administration">Business Administration</option>
          </select>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
                        <p className="text-sm text-gray-600">{student.registrationNumber}</p>
                        <p className="text-xs text-primary-50/60">{student.program} - {student.currentYear}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(student.enrollmentStatus)}`}>
                        {student.enrollmentStatus}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-gray-400" />
                        <span>CGPA: {student.academicRecords.cgpa}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} className="text-gray-400" />
                        <span>Balance: ${student.fees.balance}</span>
                      </div>
                      {student.disciplinaryActions.some(a => a.status === "active") && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle size={14} className="text-red-400" />
                          <span className="text-red-600">Active Suspension</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => setSelectedStudent(student)}
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
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Name</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Reg Number</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Program</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Year/Level</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">CGPA</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Fee Balance</th>
                      <th className="text-center py-3 text-sm font-medium text-primary-50">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 text-sm text-primary-50 font-medium">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="py-3 text-sm text-primary-50/70">{student.registrationNumber}</td>
                        <td className="py-3 text-sm text-primary-50/70">{student.program}</td>
                        <td className="py-3 text-sm text-primary-50/70">{student.currentYear} - {student.currentLevel}</td>
                        <td className="py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(student.enrollmentStatus)}`}>
                            {student.enrollmentStatus}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-primary-50/70">{student.academicRecords.cgpa}</td>
                        <td className="py-3 text-sm text-primary-50/70">${student.fees.balance}</td>
                        <td className="py-3 text-center">
                          <button
                            onClick={() => setSelectedStudent(student)}
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
};

export default StudentRecords;