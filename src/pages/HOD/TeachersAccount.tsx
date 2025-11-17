import { useState } from "react";
import { 
  Search, 
  User, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Calendar,
  UserCheck,
  UserX
} from "lucide-react";

interface PendingTeacher {
  id: string;
  fullName: string;
  email: string;
  department: string;
  position: string;
  registrationDate: string;
  status: "Pending" | "Approved" | "Rejected";
  gender: string;
  subjects: string[];
  documents: string[];
  phone?: string;
}

export default function TeachersAccount() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState<PendingTeacher | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);

  const pendingTeachers: PendingTeacher[] = [
    {
      id: "1",
      fullName: "Dr. Sarah Wilson",
      email: "sarah.wilson@email.com",
      department: "Computer Science",
      position: "Subject Teacher",
      registrationDate: "2024-01-15",
      status: "Pending",
      gender: "Female",
      subjects: ["Data Structures", "Algorithms", "Programming"],
      documents: ["CV.pdf", "Certificates.pdf"],
      phone: "+1234567890"
    },
    {
      id: "2",
      fullName: "Prof. Michael Chen",
      email: "michael.chen@email.com",
      department: "Mathematics",
      position: "P.O.",
      registrationDate: "2024-01-14",
      status: "Pending",
      gender: "Male",
      subjects: ["Calculus", "Linear Algebra", "Statistics"],
      documents: ["Resume.pdf", "PhD_Certificate.pdf", "Experience_Letter.pdf"],
      phone: "+1234567891"
    },
    {
      id: "3",
      fullName: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      department: "Physics",
      position: "Subject Teacher",
      registrationDate: "2024-01-13",
      status: "Pending",
      gender: "Female",
      subjects: ["Quantum Physics", "Thermodynamics"],
      documents: ["CV.pdf"],
      phone: "+1234567892"
    },
    {
      id: "4",
      fullName: "Mr. James Thompson",
      email: "james.thompson@email.com",
      department: "Computer Science",
      position: "Subject Teacher",
      registrationDate: "2024-01-12",
      status: "Approved",
      gender: "Male",
      subjects: ["Web Development", "Database Systems"],
      documents: ["Resume.pdf", "Certificates.pdf"]
    },
    {
      id: "5",
      fullName: "Dr. Lisa Park",
      email: "lisa.park@email.com",
      department: "Chemistry",
      position: "Subject Teacher",
      registrationDate: "2024-01-10",
      status: "Rejected",
      gender: "Female",
      subjects: ["Organic Chemistry"],
      documents: ["CV.pdf"]
    }
  ];

  const filteredTeachers = pendingTeachers.filter(teacher => {
    const matchesSearch = teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || teacher.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || teacher.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "text-yellow-600 bg-yellow-50";
      case "Approved": return "text-green-600 bg-green-50";
      case "Rejected": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const pendingCount = pendingTeachers.filter(t => t.status === "Pending").length;
  const approvedCount = pendingTeachers.filter(t => t.status === "Approved").length;
  const rejectedCount = pendingTeachers.filter(t => t.status === "Rejected").length;

  const handleApprove = (teacherId: string) => {
    const teacher = pendingTeachers.find(t => t.id === teacherId);
    if (teacher) {
      alert(`✅ ${teacher.fullName} has been approved!\n\nAccount Status: Active\nEmail notification sent to: ${teacher.email}\nDepartment: ${teacher.department}`);
    }
  };

  const handleReject = () => {
    if (selectedTeacher && rejectReason) {
      const reason = rejectReason === "other" ? customReason : rejectReason;
      alert(`❌ ${selectedTeacher.fullName} has been rejected.\n\nReason: ${reason}\nRejection notification sent to: ${selectedTeacher.email}`);
      setShowRejectModal(false);
      setRejectReason("");
      setCustomReason("");
      setSelectedTeacher(null);
    }
  };

  const handleBulkApprove = () => {
    if (selectedTeachers.length > 0) {
      const teachers = pendingTeachers.filter(t => selectedTeachers.includes(t.id));
      const teacherNames = teachers.map(t => t.fullName).join(", ");
      alert(`✅ Bulk Approval Successful!\n\n${selectedTeachers.length} teachers approved:\n${teacherNames}\n\nAll teachers have been notified via email.`);
      setSelectedTeachers([]);
    }
  };

  const handleBulkReject = () => {
    if (selectedTeachers.length > 0) {
      const teachers = pendingTeachers.filter(t => selectedTeachers.includes(t.id));
      const teacherNames = teachers.map(t => t.fullName).join(", ");
      alert(`❌ Bulk Rejection Initiated!\n\n${selectedTeachers.length} teachers selected:\n${teacherNames}\n\nPlease provide individual rejection reasons for each teacher.`);
    }
  };

  const toggleTeacherSelection = (teacherId: string) => {
    setSelectedTeachers(prev => 
      prev.includes(teacherId) 
        ? prev.filter(id => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const rejectReasons = [
    "Wrong information provided",
    "Duplicate account detected",
    "Unauthorized registration",
    "Incomplete documentation",
    "Department mismatch",
    "other"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Teachers Account Management
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Review and approve teacher registrations for system access
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <User size={20} className="text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-50">{pendingCount}</div>
                <div className="text-sm text-primary-50/60">Pending Teachers</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <UserCheck size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-50">{approvedCount}</div>
                <div className="text-sm text-primary-50/60">Approved Teachers</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <UserX size={20} className="text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-50">{rejectedCount}</div>
                <div className="text-sm text-primary-50/60">Rejected Teachers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Bulk Actions */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={16} />
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>
            
            {selectedTeachers.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleBulkApprove}
                  className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-xs xs:text-sm"
                >
                  <CheckCircle size={14} className="inline mr-1" />
                  Approve ({selectedTeachers.length})
                </button>
                <button
                  onClick={handleBulkReject}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-xs xs:text-sm"
                >
                  <XCircle size={14} className="inline mr-1" />
                  Reject ({selectedTeachers.length})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Teachers Cards - Mobile */}
        <div className="lg:hidden space-y-3 xs:space-y-4">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedTeachers.includes(teacher.id)}
                    onChange={() => toggleTeacherSelection(teacher.id)}
                    className="mt-1"
                  />
                  <div>
                    <h3 className="font-semibold text-primary-50 text-sm xs:text-base">
                      {teacher.fullName}
                    </h3>
                    <p className="text-xs xs:text-sm text-primary-50/60">{teacher.email}</p>
                    <p className="text-xs text-primary-50/60">{teacher.department} • {teacher.position}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(teacher.status)}`}>
                  {teacher.status}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3 text-xs text-primary-50/60">
                <Calendar size={12} />
                <span>Registered: {new Date(teacher.registrationDate).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    setShowDetailsModal(true);
                  }}
                  className="flex-1 px-3 py-2 border border-primary-50 text-primary-50 rounded-lg hover:bg-gray-50 text-sm"
                >
                  <Eye size={14} className="inline mr-1" />
                  Details
                </button>
                {teacher.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(teacher.id)}
                      className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm"
                    >
                      <CheckCircle size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setShowRejectModal(true);
                      }}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                    >
                      <XCircle size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Teachers Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTeachers(filteredTeachers.map(t => t.id));
                      } else {
                        setSelectedTeachers([]);
                      }
                    }}
                    checked={selectedTeachers.length === filteredTeachers.length && filteredTeachers.length > 0}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Teacher</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Department</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Position</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Registration Date</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Status</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTeachers.includes(teacher.id)}
                      onChange={() => toggleTeacherSelection(teacher.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-primary-50">{teacher.fullName}</div>
                      <div className="text-sm text-primary-50/60">{teacher.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-primary-50">{teacher.department}</td>
                  <td className="px-4 py-3 text-primary-50">{teacher.position}</td>
                  <td className="px-4 py-3 text-center text-primary-50">
                    {new Date(teacher.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(teacher.status)}`}>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setShowDetailsModal(true);
                        }}
                        className="px-3 py-1 border border-primary-50 text-primary-50 rounded text-xs hover:bg-gray-50"
                      >
                        <Eye size={12} className="inline mr-1" />
                        Details
                      </button>
                      {teacher.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(teacher.id)}
                            className="px-3 py-1 bg-green-50 text-green-600 rounded text-xs hover:bg-green-100"
                          >
                            <CheckCircle size={12} className="inline mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setSelectedTeacher(teacher);
                              setShowRejectModal(true);
                            }}
                            className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100"
                          >
                            <XCircle size={12} className="inline mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Teacher Details Modal */}
        {showDetailsModal && selectedTeacher && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-primary-50">{selectedTeacher.fullName}</h2>
                    <p className="text-sm text-primary-50/60">{selectedTeacher.email}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-primary-50 mb-2">Personal Information</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-primary-50/60">Gender:</span> {selectedTeacher.gender}</div>
                      <div><span className="text-primary-50/60">Phone:</span> {selectedTeacher.phone || 'Not provided'}</div>
                      <div><span className="text-primary-50/60">Department:</span> {selectedTeacher.department}</div>
                      <div><span className="text-primary-50/60">Position:</span> {selectedTeacher.position}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-50 mb-2">Registration Details</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-primary-50/60">Date:</span> {new Date(selectedTeacher.registrationDate).toLocaleDateString()}</div>
                      <div><span className="text-primary-50/60">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedTeacher.status)}`}>
                          {selectedTeacher.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-primary-50 mb-2">Subjects to Teach</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTeacher.subjects.map((subject, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-primary-50 mb-2">Uploaded Documents</h3>
                  <div className="space-y-2">
                    {selectedTeacher.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-primary-50/70">
                        <span>📄</span>
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedTeacher.status === "Pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        handleApprove(selectedTeacher.id);
                        setShowDetailsModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                    >
                      <CheckCircle size={16} className="inline mr-2" />
                      Approve Teacher
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setShowRejectModal(true);
                      }}
                      className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <XCircle size={16} className="inline mr-2" />
                      Reject Teacher
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reject Modal */}
        {showRejectModal && selectedTeacher && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-primary-50">Reject Teacher</h2>
                <p className="text-sm text-primary-50/60 mt-1">{selectedTeacher.fullName}</p>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-primary-50 mb-3">Select Rejection Reason:</h3>
                <div className="space-y-2 mb-4">
                  {rejectReasons.map((reason) => (
                    <label key={reason} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rejectReason"
                        value={reason}
                        checked={rejectReason === reason}
                        onChange={(e) => setRejectReason(e.target.value)}
                      />
                      <span className="text-sm text-primary-50">
                        {reason === "other" ? "Other (specify below)" : reason}
                      </span>
                    </label>
                  ))}
                </div>

                {rejectReason === "other" && (
                  <textarea
                    placeholder="Please specify the reason..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                    rows={3}
                  />
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleReject}
                    disabled={!rejectReason || (rejectReason === "other" && !customReason)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    <XCircle size={16} className="inline mr-2" />
                    Reject Teacher
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                      setRejectReason("");
                      setCustomReason("");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}