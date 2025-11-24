import React, { useState } from "react";
import {
    IoAddOutline,
    IoBookOutline,
    IoBriefcaseOutline,
    IoCloseOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoPencilOutline,
    IoPersonOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoTrashOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  status: "active" | "inactive";
  established: string;
}

const DepartmentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  // Mock department data
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Computer Science",
      code: "CS",
      head: "Dr. Sarah Johnson",
      totalStudents: 645,
      totalTeachers: 28,
      totalCourses: 42,

      status: "active",
      established: "2005-09-01",
    },
    {
      id: "2",
      name: "Engineering",
      code: "ENG",
      head: "Prof. Michael Chen",
      totalStudents: 523,
      totalTeachers: 35,
      totalCourses: 38,

      status: "active",
      established: "2000-09-01",
    },
    {
      id: "3",
      name: "Business Administration",
      code: "BUS",
      head: "Dr. Emily Williams",
      totalStudents: 487,
      totalTeachers: 22,
      totalCourses: 35,

      status: "active",
      established: "2008-09-01",
    },
    {
      id: "4",
      name: "Medicine",
      code: "MED",
      head: "Prof. James Anderson",
      totalStudents: 412,
      totalTeachers: 45,
      totalCourses: 52,

      status: "active",
      established: "1995-09-01",
    },
    {
      id: "5",
      name: "Arts & Humanities",
      code: "ART",
      head: "Dr. Lisa Martinez",
      totalStudents: 356,
      totalTeachers: 18,
      totalCourses: 28,

      status: "active",
      established: "2010-09-01",
    },
  ]);

  const [formData, setFormData] = useState<Partial<Department>>({
    name: "",
    code: "",
    head: "",
    status: "active",
  });

  // Filter departments
  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || dept.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalDepartments = departments.length;
  const activeDepartments = departments.filter((d) => d.status === "active").length;
  const totalStudents = departments.reduce((sum, d) => sum + d.totalStudents, 0);
  const totalTeachers = departments.reduce((sum, d) => sum + d.totalTeachers, 0);

  const handleAddDepartment = () => {
    setModalMode("add");
    setFormData({
      name: "",
      code: "",
      head: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEditDepartment = (department: Department) => {
    setModalMode("edit");
    setSelectedDepartment(department);
    setFormData(department);
    setShowModal(true);
  };

  const handleViewDepartment = (department: Department) => {
    setModalMode("view");
    setSelectedDepartment(department);
    setFormData(department);
    setShowModal(true);
  };

  const handleDeleteDepartment = (departmentId: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((d) => d.id !== departmentId));
    }
  };

  const handleSaveDepartment = () => {
    if (modalMode === "add") {
      const newDepartment: Department = {
        id: String(departments.length + 1),
        totalStudents: 0,
        totalTeachers: 0,
        totalCourses: 0,
        established: new Date().toISOString().split("T")[0],
        ...formData,
      } as Department;
      setDepartments([...departments, newDepartment]);
    } else if (modalMode === "edit" && selectedDepartment) {
      setDepartments(
        departments.map((d) => (d.id === selectedDepartment.id ? { ...d, ...formData } : d))
      );
    }
    setShowModal(false);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = [
      "Department Code",
      "Department Name",
      "Department Head",
      "Total Students",
      "Total Teachers",
      "Total Courses",
      "Status",
      "Established",
    ];

    const csvRows = [
      headers.join(","),
      ...filteredDepartments.map((dept) =>
        [
          dept.code,
          `"${dept.name}"`,
          `"${dept.head}"`,
          dept.totalStudents,
          dept.totalTeachers,
          dept.totalCourses,
          dept.status,
          dept.established,
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const dataBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `departments_${new Date().toISOString().split("T")[0]}.csv`;
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
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-RW", {
//       style: "currency",
//       currency: "RWF",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          Department Management
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Manage academic departments and their resources
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Total Departments</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-50">{totalDepartments}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Active Departments</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-300">{activeDepartments}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Total Students</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-100">{totalStudents.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-xs sm:text-sm text-primary-50/60 mb-2">Total Teachers</div>
          <div className="text-2xl sm:text-3xl font-bold text-primary-200">{totalTeachers}</div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col gap-4">
          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
              <input
                type="text"
                placeholder="Search by department name, code, or head..."
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
                onClick={handleAddDepartment}
                className="flex-1 xs:flex-none flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                <IoAddOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Add Department</span>
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-64">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Departments Grid/List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredDepartments.map((department) => (
          <div
            key={department.id}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            {/* Department Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary-50 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                  {department.code}
                </div>
                <div>
                  <h3 className="font-bold text-primary-50 text-sm sm:text-base">
                    {department.name}
                  </h3>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(
                      department.status
                    )}`}
                  >
                    {department.status.charAt(0).toUpperCase() + department.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Department Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-50/70">
                <IoPersonOutline className="w-4 h-4 text-primary-50" />
                <span className="font-medium">Head:</span>
                <span>{department.head}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center justify-center gap-1 text-primary-100 mb-1">
                    <IoSchoolOutline className="w-4 h-4" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-primary-50">
                    {department.totalStudents}
                  </div>
                  <div className="text-xs text-primary-50/60">Students</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center justify-center gap-1 text-primary-300 mb-1">
                    <IoBriefcaseOutline className="w-4 h-4" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-primary-50">
                    {department.totalTeachers}
                  </div>
                  <div className="text-xs text-primary-50/60">Teachers</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center justify-center gap-1 text-primary-200 mb-1">
                    <IoBookOutline className="w-4 h-4" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-primary-50">
                    {department.totalCourses}
                  </div>
                  <div className="text-xs text-primary-50/60">Courses</div>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleViewDepartment(department)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <IoEyeOutline className="w-4 h-4" />
                View
              </button>
              <button
                onClick={() => handleEditDepartment(department)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-opacity text-sm"
              >
                <IoPencilOutline className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteDepartment(department.id)}
                className="flex items-center justify-center px-3 py-2 border border-primary-200 text-primary-200 rounded-lg hover:bg-primary-200/10 transition-colors text-sm"
              >
                <IoTrashOutline className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12 text-primary-50/60 bg-white rounded-xl">
          No departments found matching your criteria
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary-50">
                {modalMode === "add"
                  ? "Add New Department"
                  : modalMode === "edit"
                  ? "Edit Department"
                  : "Department Details"}
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
                  label="Department Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoSchoolOutline className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Department Code"
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  disabled={modalMode === "view"}
                  leftIcon={<IoSchoolOutline className="w-4 h-4" />}
                  placeholder="e.g., CS, ENG"
                  required
                />
                <div className="sm:col-span-2">
                  <Input
                    label="Department Head"
                    type="text"
                    value={formData.head}
                    onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                    disabled={modalMode === "view"}
                    leftIcon={<IoPersonOutline className="w-4 h-4" />}
                    required
                  />
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
                  onClick={handleSaveDepartment}
                  className="px-6 py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {modalMode === "add" ? "Add Department" : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsManagement;
