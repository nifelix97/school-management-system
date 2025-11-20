import React, { useState, useMemo } from "react";
import { FileText, Eye, Download, Upload, CheckCircle, XCircle, Search, Settings, Users, Clock } from "lucide-react";

interface StudentAdmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  previousSchool: string;
  program: string;
  entryMode: string;
  admissionCategory: "Government-sponsored" | "Private" | "International";
  admissionStatus: "accepted" | "pending_documents" | "rejected";
  letterStatus: "not_generated" | "generated" | "approved" | "rejected";
  letterGeneratedDate?: string;
  letterApprovedDate?: string;
  signedLetterUploaded?: boolean;
}

const AdmissionLetters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentAdmission | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [template, setTemplate] = useState({
    introduction: "Dear [Student Name],\n\nCongratulations on your admission to [University Name] for the [Program] program.",
    conditions: "You must meet the following conditions:\n- Submit all required documents\n- Pay admission fees\n- Attend orientation",
    feeStructure: "Tuition Fee: $5000\nRegistration Fee: $200\nTotal: $5200",
    reportingDate: "Reporting Date: August 15, 2025",
  });

  const [students, setStudents] = useState<StudentAdmission[]>([
    {
      id: "stu001",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      previousSchool: "High School A",
      program: "Computer Science",
      entryMode: "Direct Entry",
      admissionCategory: "Private",
      admissionStatus: "accepted",
      letterStatus: "approved",
      letterGeneratedDate: "2024-11-15",
      letterApprovedDate: "2024-11-16",
      signedLetterUploaded: true,
    },
    {
      id: "stu002",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@email.com",
      previousSchool: "College B",
      program: "Business Administration",
      entryMode: "Transfer",
      admissionCategory: "Government-sponsored",
      admissionStatus: "pending_documents",
      letterStatus: "generated",
      letterGeneratedDate: "2024-11-14",
    },
    {
      id: "stu003",
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@email.com",
      previousSchool: "High School C",
      program: "Engineering",
      entryMode: "Direct Entry",
      admissionCategory: "International",
      admissionStatus: "accepted",
      letterStatus: "not_generated",
    },
  ]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.program.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [students, searchTerm]);

  const handleGenerateLetter = (id: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id
          ? { ...student, letterStatus: "generated" as const, letterGeneratedDate: new Date().toISOString().split('T')[0] }
          : student
      )
    );
  };

  const handleApproveLetter = (id: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id
          ? { ...student, letterStatus: "approved" as const, letterApprovedDate: new Date().toISOString().split('T')[0] }
          : student
      )
    );
  };

  const handleRejectLetter = (id: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, letterStatus: "rejected" as const } : student
      )
    );
  };

  const handleStatusChange = (id: string, newStatus: "accepted" | "pending_documents" | "rejected") => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, admissionStatus: newStatus } : student
      )
    );
  };

  const handleUploadSigned = (id: string) => {
    // Simulate file upload
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, signedLetterUploaded: true } : student
      )
    );
  };

  const handleViewLetter = (student: StudentAdmission) => {
    setSelectedStudent(student);
    setShowLetterModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "text-green-600 bg-green-50";
      case "pending_documents": return "text-yellow-600 bg-yellow-50";
      case "rejected": return "text-red-600 bg-red-50";
      case "approved": return "text-blue-600 bg-blue-50";
      case "generated": return "text-purple-600 bg-purple-50";
      case "not_generated": return "text-gray-600 bg-gray-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const generateLetterContent = (student: StudentAdmission) => {
    return `${template.introduction.replace('[Student Name]', `${student.firstName} ${student.lastName}`).replace('[Program]', student.program)}

${template.conditions}

${template.feeStructure}

${template.reportingDate}

Best regards,
University Registrar`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
              Admission Letters Management
            </h1>
            <p className="text-xs xs:text-sm text-primary-50/60">
              Generate, approve, and manage admission letters for students
            </p>
          </div>
          <button
            onClick={() => setShowTemplateModal(true)}
            className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 flex items-center gap-2"
          >
            <Settings size={16} />
            Edit Template
          </button>
        </div>

        {/* Search and Bulk Actions */}
        <div className="mb-4 xs:mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
              Bulk Generate
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Bulk Approve
            </button>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 p-3 xs:p-4 sm:p-6">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
                        <p className="text-xs text-primary-50/60">{student.admissionCategory}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(student.admissionStatus)}`}>
                          {student.admissionStatus.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(student.letterStatus)}`}>
                          {student.letterStatus.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-primary-50/70">Previous School:</span>
                        <span>{student.previousSchool}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary-50/70">Entry Mode:</span>
                        <span>{student.entryMode}</span>
                      </div>
                      {student.letterGeneratedDate && (
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-gray-400" />
                          <span>Generated: {student.letterGeneratedDate}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={student.admissionStatus}
                        onChange={(e) => handleStatusChange(student.id, e.target.value as "accepted" | "pending_documents" | "rejected")}
                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                      >
                        <option value="accepted">Accepted</option>
                        <option value="pending_documents">Pending Documents</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      {student.admissionStatus === "accepted" && student.letterStatus === "not_generated" && (
                        <button
                          onClick={() => handleGenerateLetter(student.id)}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-xs hover:bg-blue-200"
                        >
                          Generate
                        </button>
                      )}
                      {student.letterStatus === "generated" && (
                        <>
                          <button
                            onClick={() => handleApproveLetter(student.id)}
                            className="px-3 py-1 bg-green-100 text-green-600 rounded text-xs hover:bg-green-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectLetter(student.id)}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded text-xs hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {student.letterStatus === "approved" && (
                        <button
                          onClick={() => handleViewLetter(student)}
                          className="px-3 py-1 bg-purple-100 text-purple-600 rounded text-xs hover:bg-purple-200"
                        >
                          View Letter
                        </button>
                      )}
                      <button
                        onClick={() => handleUploadSigned(student.id)}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200"
                      >
                        Upload Signed
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
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Program</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Admission Status</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Letter Status</th>
                      <th className="text-left py-3 text-sm font-medium text-primary-50">Category</th>
                      <th className="text-center py-3 text-sm font-medium text-primary-50">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 text-sm text-primary-50 font-medium">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="py-3 text-sm text-primary-50/70">{student.program}</td>
                        <td className="py-3 text-sm">
                          <select
                            value={student.admissionStatus}
                            onChange={(e) => handleStatusChange(student.id, e.target.value as "accepted" | "pending_documents" | "rejected")}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="accepted">Accepted</option>
                            <option value="pending_documents">Pending Documents</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(student.letterStatus)}`}>
                            {student.letterStatus.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-primary-50/70">{student.admissionCategory}</td>
                        <td className="py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {student.admissionStatus === "accepted" && student.letterStatus === "not_generated" && (
                              <button
                                onClick={() => handleGenerateLetter(student.id)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                title="Generate Letter"
                              >
                                <FileText size={16} />
                              </button>
                            )}
                            {student.letterStatus === "generated" && (
                              <>
                                <button
                                  onClick={() => handleApproveLetter(student.id)}
                                  className="p-1 text-green-600 hover:bg-green-50 rounded"
                                  title="Approve"
                                >
                                  <CheckCircle size={16} />
                                </button>
                                <button
                                  onClick={() => handleRejectLetter(student.id)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                                  title="Reject"
                                >
                                  <XCircle size={16} />
                                </button>
                              </>
                            )}
                            {student.letterStatus === "approved" && (
                              <button
                                onClick={() => handleViewLetter(student)}
                                className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                                title="View Letter"
                              >
                                <Eye size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleUploadSigned(student.id)}
                              className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                              title="Upload Signed"
                            >
                              <Upload size={16} />
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

      {/* Template Edit Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg shadow-primary-50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary-50">Edit Admission Letter Template</h2>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Introduction</label>
                  <textarea
                    value={template.introduction}
                    onChange={(e) => setTemplate(prev => ({ ...prev, introduction: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Conditions of Admission</label>
                  <textarea
                    value={template.conditions}
                    onChange={(e) => setTemplate(prev => ({ ...prev, conditions: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Fee Structure</label>
                  <textarea
                    value={template.feeStructure}
                    onChange={(e) => setTemplate(prev => ({ ...prev, feeStructure: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">Reporting Date</label>
                  <input
                    type="text"
                    value={template.reportingDate}
                    onChange={(e) => setTemplate(prev => ({ ...prev, reportingDate: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Letter View Modal */}
      {showLetterModal && selectedStudent && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg shadow-primary-50 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary-50">
                  Admission Letter - {selectedStudent.firstName} {selectedStudent.lastName}
                </h2>
                <button
                  onClick={() => setShowLetterModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border">
                <pre className="whitespace-pre-wrap text-sm text-primary-50 font-mono">
                  {generateLetterContent(selectedStudent)}
                </pre>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Download size={16} />
                  Download PDF
                </button>
                <button
                  onClick={() => setShowLetterModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
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

export default AdmissionLetters;