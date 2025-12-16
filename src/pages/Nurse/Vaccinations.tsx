import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoEllipsisVerticalOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoMedkitOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline
} from "react-icons/io5";

interface Vaccination {
  id: string;
  studentName: string;
  studentId: string;
  vaccineName: string;
  doseNumber: number;
  totalDoses: number;
  dateAdministered?: string;
  scheduledDate: string;
  status: "Completed" | "Scheduled" | "Overdue";
  batchNumber?: string;
  administeredBy?: string;
}

const Vaccinations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [vaccinations, setVaccinations] = useState<Vaccination[]>([
    {
      id: "VAC-001",
      studentName: "Liam Johnson",
      studentId: "STU-2024-001",
      vaccineName: "Influenza (Flu)",
      doseNumber: 1,
      totalDoses: 1,
      dateAdministered: "2024-10-15",
      scheduledDate: "2024-10-15",
      status: "Completed",
      batchNumber: "FL-2024-X99",
      administeredBy: "Nurse Sarah",
    },
    {
      id: "VAC-002",
      studentName: "Olivia Smith",
      studentId: "STU-2024-002",
      vaccineName: "Meningococcal",
      doseNumber: 1,
      totalDoses: 2,
      scheduledDate: "2024-12-20",
      status: "Scheduled",
    },
    {
      id: "VAC-003",
      studentName: "Noah Williams",
      studentId: "STU-2024-003",
      vaccineName: "Tetanus Booster",
      doseNumber: 1,
      totalDoses: 1,
      scheduledDate: "2024-11-01",
      status: "Overdue",
    },
    {
      id: "VAC-004",
      studentName: "Emma Brown",
      studentId: "STU-2024-004",
      vaccineName: "HPV",
      doseNumber: 2,
      totalDoses: 3,
      dateAdministered: "2024-09-10",
      scheduledDate: "2024-09-10",
      status: "Completed",
      batchNumber: "HPV-992-A",
      administeredBy: "Dr. Wilson",
    },
    {
      id: "VAC-005",
      studentName: "James Jones",
      studentId: "STU-2024-005",
      vaccineName: "Hepatitis B",
      doseNumber: 3,
      totalDoses: 3,
      scheduledDate: "2024-12-25",
      status: "Scheduled",
    },
  ]);

  const [newVaccination, setNewVaccination] = useState<Partial<Vaccination>>({
    studentName: "",
    studentId: "",
    vaccineName: "",
    doseNumber: 1,
    totalDoses: 1,
    status: "Scheduled",
    scheduledDate: new Date().toISOString().split("T")[0],
    batchNumber: "",
    administeredBy: "",
  });

  const handleRecordVaccination = () => {
    if (!newVaccination.studentName || !newVaccination.vaccineName) return;

    const vaccination: Vaccination = {
      id: `VAC-${Date.now()}`,
      studentName: newVaccination.studentName!,
      studentId: newVaccination.studentId || "Unknown",
      vaccineName: newVaccination.vaccineName!,
      doseNumber: newVaccination.doseNumber || 1,
      totalDoses: newVaccination.totalDoses || 1,
      scheduledDate: newVaccination.scheduledDate!,
      dateAdministered: newVaccination.status === "Completed" ? newVaccination.scheduledDate : undefined,
      status: newVaccination.status as any,
      batchNumber: newVaccination.batchNumber,
      administeredBy: newVaccination.administeredBy,
    };

    setVaccinations([vaccination, ...vaccinations]);
    setShowAddModal(false);
    setNewVaccination({
      studentName: "",
      studentId: "",
      vaccineName: "",
      doseNumber: 1,
      totalDoses: 1,
      status: "Scheduled",
      scheduledDate: new Date().toISOString().split("T")[0],
      batchNumber: "",
      administeredBy: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredVaccinations = vaccinations.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vaccineName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Vaccinations", value: vaccinations.length, icon: <IoMedkitOutline />, color: "bg-purple-500" },
    { label: "Completed", value: vaccinations.filter(v => v.status === "Completed").length, icon: <IoShieldCheckmarkOutline />, color: "bg-green-500" },
    { label: "Scheduled", value: vaccinations.filter(v => v.status === "Scheduled").length, icon: <IoCalendarOutline />, color: "bg-blue-500" },
    { label: "Overdue", value: vaccinations.filter(v => v.status === "Overdue").length, icon: <IoAlertCircleOutline />, color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Vaccinations</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage student immunization records and schedules
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>Record Vaccination</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-50">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-50/60 font-medium">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
            <input
              type="text"
              placeholder="Search by student, ID, or vaccine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <IoFilterOutline className="w-5 h-5 text-primary-50/60" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vaccination List - Responsive View */}
      <div className="space-y-4">
        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Vaccine</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Dose Info</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVaccinations.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold">
                        {item.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-primary-50">{item.studentName}</div>
                        <div className="text-xs text-primary-50/60">{item.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-primary-50">{item.vaccineName}</div>
                    {item.batchNumber && (
                      <div className="text-xs text-primary-50/60">Batch: {item.batchNumber}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-primary-50/80">
                      Dose {item.doseNumber} of {item.totalDoses}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-primary-50/80">
                      <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                      {item.status === "Completed" ? item.dateAdministered : item.scheduledDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="View Details">
                      <IoEyeOutline className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredVaccinations.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold text-lg">
                    {item.studentName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-primary-50">{item.studentName}</div>
                    <div className="text-xs text-primary-50/60">{item.studentId}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                     <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50/60" />
                   </button>
                   <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusColor(item.status)}`}>
                      {item.status}
                   </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-primary-50">{item.vaccineName}</div>
                  <div className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-primary-50/70">
                    Dose {item.doseNumber}/{item.totalDoses}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-primary-50/60 mt-3 border-t border-gray-200 pt-3">
                   <div className="flex items-center gap-1">
                     <IoCalendarOutline className="w-3.5 h-3.5" />
                     {item.status === "Completed" ? `Administered: ${item.dateAdministered}` : `Due: ${item.scheduledDate}`}
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-end pt-2">
                 <button className="flex items-center gap-1 text-sm font-medium text-primary-50 hover:underline">
                   View Details
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-[scaleIn_0.2s_ease-out] overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-primary-50 mb-6 flex items-center gap-2">
              <IoShieldCheckmarkOutline className="w-7 h-7 text-primary-100" />
              Record Vaccination
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Student Name</label>
                  <input
                    type="text"
                    value={newVaccination.studentName}
                    onChange={(e) => setNewVaccination({ ...newVaccination, studentName: e.target.value })}
                    placeholder="Enter student name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Student ID</label>
                  <input
                    type="text"
                    value={newVaccination.studentId}
                    onChange={(e) => setNewVaccination({ ...newVaccination, studentId: e.target.value })}
                    placeholder="e.g. STU-2024-001"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Vaccine Name</label>
                  <input
                    type="text"
                    value={newVaccination.vaccineName}
                    onChange={(e) => setNewVaccination({ ...newVaccination, vaccineName: e.target.value })}
                    placeholder="e.g. Influenza"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Dose No.</label>
                    <input
                      type="number"
                      min="1"
                      value={newVaccination.doseNumber}
                      onChange={(e) => setNewVaccination({ ...newVaccination, doseNumber: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary-50/80">Total Doses</label>
                    <input
                      type="number"
                      min="1"
                      value={newVaccination.totalDoses}
                      onChange={(e) => setNewVaccination({ ...newVaccination, totalDoses: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Status</label>
                  <select
                    value={newVaccination.status}
                    onChange={(e) => setNewVaccination({ ...newVaccination, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-white"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Date</label>
                  <input
                    type="date"
                    value={newVaccination.scheduledDate}
                    onChange={(e) => setNewVaccination({ ...newVaccination, scheduledDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                {newVaccination.status === "Completed" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary-50/80">Batch Number</label>
                      <input
                        type="text"
                        value={newVaccination.batchNumber}
                        onChange={(e) => setNewVaccination({ ...newVaccination, batchNumber: e.target.value })}
                        placeholder="e.g. BATCH-001"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary-50/80">Administered By</label>
                      <input
                        type="text"
                        value={newVaccination.administeredBy}
                        onChange={(e) => setNewVaccination({ ...newVaccination, administeredBy: e.target.value })}
                        placeholder="Nurse Name"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 text-primary-50 font-semibold hover:bg-gray-50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleRecordVaccination}
                className="px-6 py-2.5 bg-primary-50 text-white font-semibold rounded-xl hover:bg-primary-100 transition-colors shadow-lg shadow-primary-50/30 flex items-center gap-2"
              >
                <IoShieldCheckmarkOutline className="w-5 h-5" />
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Vaccinations;
