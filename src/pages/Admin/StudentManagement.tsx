import React, { useState } from "react";
import {
    IoAddOutline,
    IoCallOutline,
    IoCloseOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoMailOutline,
    IoPencilOutline,
    IoPersonOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoTrashOutline
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
  status: "active" | "inactive" | "graduated";
  enrollmentDate: string;
  gpa: number;
}

const StudentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mock student data
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@student.edu",
      phone: "+250 788 123 456",
      studentId: "STU2024001",
      department: "Computer Science",
      year: "3rd Year",
      status: "active",
      enrollmentDate: "2022-09-01",
      gpa: 3.8,
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@student.edu",
      phone: "+250 788 234 567",
      studentId: "STU2024002",
      department: "Engineering",
      year: "2nd Year",
      status: "active",
      enrollmentDate: "2023-09-01",
      gpa: 3.6,
    },
    {
      id: "3",
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.j@student.edu",
      phone: "+250 788 345 678",
      studentId: "STU2024003",
      department: "Business",
      year: "4th Year",
      status: "active",
      enrollmentDate: "2021-09-01",
      gpa: 3.9,
    },
    {
      id: "4",
      firstName: "Sarah",
      lastName: "Williams",
      email: "sarah.w@student.edu",
      phone: "+250 788 456 789",
      studentId: "STU2024004",
      department: "Medicine",
      year: "1st Year",
      status: "active",
      enrollmentDate: "2024-09-01",
      gpa: 3.7,
    },
    {
      id: "5",
      firstName: "David",
      lastName: "Brown",
      email: "david.b@student.edu",
      phone: "+250 788 567 890",
      studentId: "STU2023050",
      department: "Computer Science",
      year: "Graduated",
      status: "graduated",
      enrollmentDate: "2020-09-01",
      gpa: 3.5,
    },
  ]);

  const [formData, setFormData] = useState<Partial<Student>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    status: "active",
  });

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" || student.department === filterDepartment;

    const matchesStatus = filterStatus === "all" || student.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Calculate statistics
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "active").length;
  const graduatedStudents = students.filter((s) => s.status === "graduated").length;
  const averageGPA = (
    students.reduce((sum, s) => sum + s.gpa, 0) / students.length
  ).toFixed(2);

  const handleAddStudent = () => {
    setModalMode("add");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      year: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setModalMode("edit");
    setSelectedStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleViewStudent = (student: Student) => {
    setModalMode("view");
    setSelectedStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== studentId));
    }
  };

  const handleSaveStudent = () => {
    if (modalMode === "add") {
      const newStudent: Student = {
        id: String(students.length + 1),
        studentId: `STU2024${String(students.length + 1).padStart(3, "0")}`,
        enrollmentDate: new Date().toISOString().split("T")[0],
        gpa: 0,
        ...formData,
      } as Student;
      setStudents([...students, newStudent]);
    } else if (modalMode === "edit" && selectedStudent) {
      setStudents(
        students.map((s) => (s.id === selectedStudent.id ? { ...s, ...formData } : s))
      );
    }
    setShowModal(false);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = [
      "Student ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Department",
      "Year",
      "Status",
      "Enrollment Date",
      "GPA",
    ];

    const csvRows = [
      headers.join(","),
      ...filteredStudents.map((student) =>
        [
          student.studentId,
          student.firstName,
          student.lastName,
          student.email,
          student.phone,
          student.department,
          student.year,
          student.status,
          student.enrollmentDate,
          student.gpa,
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const dataBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `students_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary-300/20 text-primary-300";
      case "inactive":
        return "bg-primary-200/20 text-primary-200";
      case "graduated":
        return "bg-primary-100/20 text-primary-100";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          Student Management
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Manage student records, enrollments, and information
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Total Students</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-50">{totalStudents}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Active Students</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-300">{activeStudents}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Graduated</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-100">{graduatedStudents}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Average GPA</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-200">{averageGPA}</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col gap-4">
          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex-1 xs:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 border border-primary-100 text-primary-100 rounded-lg hover:bg-primary-100/10 transition-colors text-sm sm:text-base"
              >
                <IoDownloadOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Export</span>
              </button>
              <button
                onClick={handleAddStudent}
                className="flex-1 xs:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                <IoAddOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Add Student</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col xs:flex-row gap-3">
            <div className="flex-1 relative">
              <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Medicine">Medicine</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
            <div className="flex-1 relative">
              <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table/Cards */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Student ID
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Email
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Department
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Year
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  GPA
                </th>
                <th className="text-right py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-primary-50">
                    {student.studentId}
                  </td>
                  <td className="py-4 px-4 text-sm text-primary-50">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="py-4 px-4 text-sm text-primary-50/70">{student.email}</td>
                  <td className="py-4 px-4 text-sm text-primary-50">{student.department}</td>
                  <td className="py-4 px-4 text-sm text-primary-50">{student.year}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        student.status
                      )}`}
                    >
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-primary-50">
                    {student.gpa.toFixed(1)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewStudent(student)}
                        className="p-2 text-primary-50 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <IoEyeOutline className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="p-2 text-primary-100 hover:bg-primary-100/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <IoPencilOutline className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="p-2 text-primary-200 hover:bg-primary-200/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredStudents.map((student) => (
            <div key={student.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-primary-50 mb-1">
                    {student.firstName} {student.lastName}
                  </div>
                  <div className="text-xs text-primary-50/60">{student.studentId}</div>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    student.status
                  )}`}
                >
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm mb-3">
                <div className="flex items-center gap-2 text-primary-50/70">
                  <IoMailOutline className="w-4 h-4" />
                  {student.email}
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <IoSchoolOutline className="w-4 h-4" />
                  {student.department} - {student.year}
                </div>
                <div className="flex items-center gap-2 text-primary-50">
                  <span className="font-medium">GPA:</span>
                  <span className="font-bold">{student.gpa.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewStudent(student)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <IoEyeOutline className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleEditStudent(student)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  <IoPencilOutline className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="flex items-center justify-center px-3 py-2 border border-primary-200 text-primary-200 rounded-lg hover:bg-primary-200/10 transition-colors text-sm"
                >
                  <IoTrashOutline className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-primary-50/60">
            No students found matching your criteria
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary-50">
                {modalMode === "add"
                  ? "Add New Student"
                  : modalMode === "edit"
                  ? "Edit Student"
                  : "Student Details"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-primary-50/60 hover:text-primary-50 transition-colors"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoPersonOutline className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoPersonOutline className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoMailOutline className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoCallOutline className="w-4 h-4" />}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    disabled={modalMode === "view"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-gray-50 disabled:opacity-60"
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    disabled={modalMode === "view"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-gray-50 disabled:opacity-60"
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                {modalMode !== "add" && (
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as any })
                      }
                      disabled={modalMode === "view"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent bg-gray-50 disabled:opacity-60"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="graduated">Graduated</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            {modalMode !== "view" && (
              <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 border border-gray-300 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveStudent}
                  className="px-6 py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {modalMode === "add" ? "Add Student" : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
