import React, { useState } from "react";
import {
    IoAddOutline,
    IoBookOutline,
    IoBriefcaseOutline,
    IoCallOutline,
    IoCloseOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoMailOutline,
    IoPencilOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoTrashOutline
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  teacherId: string;
  department: string;
  specialization: string;
  status: "active" | "on-leave" | "retired";
  joinDate: string;
  experience: number;
  coursesAssigned: number;
}

const TeacherManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // Mock teacher data
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "1",
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@school.edu",
      phone: "+250 788 111 222",
      teacherId: "TCH2024001",
      department: "Computer Science",
      specialization: "Artificial Intelligence",
      status: "active",
      joinDate: "2018-09-01",
      experience: 12,
      coursesAssigned: 3,
    },
    {
      id: "2",
      firstName: "Prof. Michael",
      lastName: "Chen",
      email: "michael.chen@school.edu",
      phone: "+250 788 222 333",
      teacherId: "TCH2024002",
      department: "Engineering",
      specialization: "Mechanical Engineering",
      status: "active",
      joinDate: "2015-09-01",
      experience: 15,
      coursesAssigned: 4,
    },
    {
      id: "3",
      firstName: "Dr. Emily",
      lastName: "Williams",
      email: "emily.w@school.edu",
      phone: "+250 788 333 444",
      teacherId: "TCH2024003",
      department: "Business",
      specialization: "Marketing",
      status: "active",
      joinDate: "2020-01-15",
      experience: 8,
      coursesAssigned: 2,
    },
    {
      id: "4",
      firstName: "Prof. James",
      lastName: "Anderson",
      email: "james.a@school.edu",
      phone: "+250 788 444 555",
      teacherId: "TCH2024004",
      department: "Medicine",
      specialization: "Cardiology",
      status: "on-leave",
      joinDate: "2012-09-01",
      experience: 18,
      coursesAssigned: 0,
    },
    {
      id: "5",
      firstName: "Dr. Lisa",
      lastName: "Martinez",
      email: "lisa.m@school.edu",
      phone: "+250 788 555 666",
      teacherId: "TCH2023050",
      department: "Arts",
      specialization: "Fine Arts",
      status: "retired",
      joinDate: "2005-09-01",
      experience: 25,
      coursesAssigned: 0,
    },
  ]);

  const [formData, setFormData] = useState<Partial<Teacher>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    specialization: "",
    status: "active",
  });

  // Filter teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" || teacher.department === filterDepartment;

    const matchesStatus = filterStatus === "all" || teacher.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Calculate statistics
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter((t) => t.status === "active").length;
  const onLeaveTeachers = teachers.filter((t) => t.status === "on-leave").length;
  const averageExperience = (
    teachers.reduce((sum, t) => sum + t.experience, 0) / teachers.length
  ).toFixed(1);

  const handleAddTeacher = () => {
    setModalMode("add");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      specialization: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setModalMode("edit");
    setSelectedTeacher(teacher);
    setFormData(teacher);
    setShowModal(true);
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setModalMode("view");
    setSelectedTeacher(teacher);
    setFormData(teacher);
    setShowModal(true);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((t) => t.id !== teacherId));
    }
  };

  const handleSaveTeacher = () => {
    if (modalMode === "add") {
      const newTeacher: Teacher = {
        id: String(teachers.length + 1),
        teacherId: `TCH2024${String(teachers.length + 1).padStart(3, "0")}`,
        joinDate: new Date().toISOString().split("T")[0],
        experience: 0,
        coursesAssigned: 0,
        ...formData,
      } as Teacher;
      setTeachers([...teachers, newTeacher]);
    } else if (modalMode === "edit" && selectedTeacher) {
      setTeachers(
        teachers.map((t) => (t.id === selectedTeacher.id ? { ...t, ...formData } : t))
      );
    }
    setShowModal(false);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = [
      "Teacher ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Department",
      "Specialization",
      "Status",
      "Join Date",
      "Experience (Years)",
      "Courses Assigned",
    ];

    const csvRows = [
      headers.join(","),
      ...filteredTeachers.map((teacher) =>
        [
          teacher.teacherId,
          teacher.firstName,
          teacher.lastName,
          teacher.email,
          teacher.phone,
          teacher.department,
          teacher.specialization,
          teacher.status,
          teacher.joinDate,
          teacher.experience,
          teacher.coursesAssigned,
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const dataBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `teachers_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary-300/20 text-primary-300";
      case "on-leave":
        return "bg-primary-200/20 text-primary-200";
      case "retired":
        return "bg-primary-50/20 text-primary-50";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          Teacher Management
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Manage teacher records, assignments, and information
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Total Teachers</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-50">{totalTeachers}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Active Teachers</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-300">{activeTeachers}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">On Leave</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-200">{onLeaveTeachers}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Avg Experience</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-100">{averageExperience} yrs</div>
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
                placeholder="Search by name, ID, email, or specialization..."
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
                onClick={handleAddTeacher}
                className="flex-1 xs:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                <IoAddOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Add Teacher</span>
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
                <option value="on-leave">On Leave</option>
                <option value="retired">Retired</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Teachers Table/Cards */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Teacher ID
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
                  Specialization
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Experience
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Courses
                </th>
                <th className="text-right py-4 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-primary-50">
                    {teacher.teacherId}
                  </td>
                  <td className="py-4 px-4 text-sm text-primary-50">
                    {teacher.firstName} {teacher.lastName}
                  </td>
                  <td className="py-4 px-4 text-sm text-primary-50/70">{teacher.email}</td>
                  <td className="py-4 px-4 text-sm text-primary-50">{teacher.department}</td>
                  <td className="py-4 px-4 text-sm text-primary-50">{teacher.specialization}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        teacher.status
                      )}`}
                    >
                      {teacher.status === "on-leave"
                        ? "On Leave"
                        : teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-primary-50">
                    {teacher.experience} yrs
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-primary-50">
                    {teacher.coursesAssigned}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewTeacher(teacher)}
                        className="p-2 text-primary-50 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <IoEyeOutline className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditTeacher(teacher)}
                        className="p-2 text-primary-100 hover:bg-primary-100/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <IoPencilOutline className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
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

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden divide-y divide-gray-100">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-primary-50 mb-1">
                    {teacher.firstName} {teacher.lastName}
                  </div>
                  <div className="text-xs text-primary-50/60">{teacher.teacherId}</div>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    teacher.status
                  )}`}
                >
                  {teacher.status === "on-leave"
                    ? "On Leave"
                    : teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm mb-3">
                <div className="flex items-center gap-2 text-primary-50/70">
                  <IoMailOutline className="w-4 h-4" />
                  {teacher.email}
                </div>
                <div className="flex items-center gap-2 text-primary-50/70">
                  <IoBookOutline className="w-4 h-4" />
                  {teacher.department} - {teacher.specialization}
                </div>
                <div className="flex items-center gap-2 text-primary-50">
                  <IoBriefcaseOutline className="w-4 h-4" />
                  <span className="font-medium">{teacher.experience} years experience</span>
                  <span className="text-primary-50/60">• {teacher.coursesAssigned} courses</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewTeacher(teacher)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <IoEyeOutline className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleEditTeacher(teacher)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  <IoPencilOutline className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTeacher(teacher.id)}
                  className="flex items-center justify-center px-3 py-2 border border-primary-200 text-primary-200 rounded-lg hover:bg-primary-200/10 transition-colors text-sm"
                >
                  <IoTrashOutline className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12 text-primary-50/60">
            No teachers found matching your criteria
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
                  ? "Add New Teacher"
                  : modalMode === "edit"
                  ? "Edit Teacher"
                  : "Teacher Details"}
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
                <Input
                  label="Specialization"
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoBookOutline className="w-4 h-4" />}
                  required
                />
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
                      <option value="on-leave">On Leave</option>
                      <option value="retired">Retired</option>
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
                  onClick={handleSaveTeacher}
                  className="px-6 py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {modalMode === "add" ? "Add Teacher" : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;
