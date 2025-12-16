import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoDocumentTextOutline,
    IoEllipsisVerticalOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoPaperPlaneOutline,
    IoPrintOutline,
    IoSearchOutline,
    IoTimeOutline,
} from "react-icons/io5";

interface Prescription {
  id: string;
  studentName: string;
  studentId: string;
  doctorName: string;
  medications: string[];
  dateIssued: string;
  status: "Active" | "Completed" | "Pending" | "Cancelled";
  duration: string;
  notes?: string;
}

const Prescriptions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "PRE-001",
      studentName: "Sarah Johnson",
      studentId: "STU-2024-001",
      doctorName: "Dr. Emily Smith",
      medications: ["Amoxicillin 500mg", "Paracetamol 500mg"],
      dateIssued: "2024-03-15",
      status: "Active",
      duration: "7 days",
      notes: "Take with food",
    },
    {
      id: "PRE-002",
      studentName: "Michael Chen",
      studentId: "STU-2024-002",
      doctorName: "Dr. James Wilson",
      medications: ["Ibuprofen 400mg"],
      dateIssued: "2024-03-14",
      status: "Completed",
      duration: "3 days",
    },
    {
      id: "PRE-003",
      studentName: "Emily Davis",
      studentId: "STU-2024-003",
      doctorName: "Dr. Emily Smith",
      medications: ["Cetirizine 10mg", "Salbutamol Inhaler"],
      dateIssued: "2024-03-16",
      status: "Active",
      duration: "30 days",
      notes: "Inhaler as needed",
    },
    {
      id: "PRE-004",
      studentName: "David Brown",
      studentId: "STU-2024-004",
      doctorName: "Dr. Sarah Lee",
      medications: ["Ciprofloxacin 500mg"],
      dateIssued: "2024-03-16",
      status: "Pending",
      duration: "5 days",
    },
    {
      id: "PRE-005",
      studentName: "Lisa Anderson",
      studentId: "STU-2024-005",
      doctorName: "Dr. James Wilson",
      medications: ["Multivitamins"],
      dateIssued: "2024-03-10",
      status: "Cancelled",
      duration: "30 days",
      notes: "Patient allergy",
    },
  ]);

  const [newPrescription, setNewPrescription] = useState<Partial<Prescription>>({
    studentName: "",
    studentId: "",
    doctorName: "",
    medications: [],
    dateIssued: new Date().toISOString().split("T")[0],
    status: "Active",
    duration: "",
    notes: "",
  });

  const [medicationInput, setMedicationInput] = useState("");

  const handleAddMedication = () => {
    if (medicationInput.trim()) {
      setNewPrescription({
        ...newPrescription,
        medications: [...(newPrescription.medications || []), medicationInput],
      });
      setMedicationInput("");
    }
  };

  const handleAddPrescription = () => {
    if (!newPrescription.studentName || !newPrescription.studentId || !newPrescription.doctorName) return;

    const prescription: Prescription = {
      id: `PRE-${Date.now()}`,
      studentName: newPrescription.studentName!,
      studentId: newPrescription.studentId!,
      doctorName: newPrescription.doctorName!,
      medications: newPrescription.medications || [],
      dateIssued: newPrescription.dateIssued!,
      status: newPrescription.status as any,
      duration: newPrescription.duration || "7 days",
      notes: newPrescription.notes,
    };

    setPrescriptions([prescription, ...prescriptions]);
    setShowAddModal(false);
    setNewPrescription({
      studentName: "",
      studentId: "",
      doctorName: "",
      medications: [],
      dateIssued: new Date().toISOString().split("T")[0],
      status: "Active",
      duration: "",
      notes: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredPrescriptions = prescriptions.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Prescriptions", value: prescriptions.length, icon: <IoDocumentTextOutline />, color: "bg-blue-500" },
    { label: "Active", value: prescriptions.filter(p => p.status === "Active").length, icon: <IoTimeOutline />, color: "bg-blue-600" },
    { label: "Completed", value: prescriptions.filter(p => p.status === "Completed").length, icon: <IoCheckmarkCircleOutline />, color: "bg-green-500" },
    { label: "Pending", value: prescriptions.filter(p => p.status === "Pending").length, icon: <IoAlertCircleOutline />, color: "bg-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Prescriptions</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage student prescriptions and medication records
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>New Prescription</span>
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
              placeholder="Search by student name or ID..."
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
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prescription List - Responsive View */}
      <div className="space-y-4">
        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Medications</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Prescribed By</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Date Issued</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPrescriptions.map((prescription) => (
                <tr key={prescription.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold">
                        {prescription.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-primary-50">{prescription.studentName}</div>
                        <div className="text-xs text-primary-50/60">{prescription.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {prescription.medications.map((med, idx) => (
                        <div key={idx} className="text-sm text-primary-50/80 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-50/40"></div>
                          {med}
                        </div>
                      ))}
                      <div className="text-xs text-primary-50/60 mt-1">
                        Duration: {prescription.duration}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-primary-50/80 font-medium">{prescription.doctorName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-primary-50/80">
                      <IoTimeOutline className="w-4 h-4 text-primary-100" />
                      {new Date(prescription.dateIssued).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(prescription.status)}`}>
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="View Details">
                        <IoEyeOutline className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="Print Prescription">
                        <IoPrintOutline className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <div key={prescription.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold text-lg">
                    {prescription.studentName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-primary-50">{prescription.studentName}</div>
                    <div className="text-xs text-primary-50/60">{prescription.studentId}</div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50/60" />
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                <div className="text-xs text-primary-50/60 mb-2 uppercase tracking-wide font-semibold">Medications</div>
                <div className="space-y-2">
                  {prescription.medications.map((med, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-medium text-primary-50">
                      <IoCheckmarkCircleOutline className="w-4 h-4 text-green-500" />
                      {med}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center text-xs">
                  <span className="text-primary-50/60">Duration: <span className="text-primary-50 font-semibold">{prescription.duration}</span></span>
                  <span className="text-primary-50/60">Dr: <span className="text-primary-50 font-semibold">{prescription.doctorName}</span></span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                 <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(prescription.status)}`}>
                      {prescription.status}
                    </span>
                    <span className="text-xs text-primary-50/60">
                      {new Date(prescription.dateIssued).toLocaleDateString()}
                    </span>
                 </div>
                 <div className="flex gap-2">
                   <button className="p-2 bg-primary-50/5 text-primary-50 rounded-lg hover:bg-primary-50/10">
                     <IoPrintOutline className="w-5 h-5" />
                   </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-[scaleIn_0.2s_ease-out] overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-primary-50 mb-6">New Prescription</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Student Name</label>
                  <input
                    type="text"
                    value={newPrescription.studentName}
                    onChange={(e) => setNewPrescription({ ...newPrescription, studentName: e.target.value })}
                    placeholder="Enter student name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Student ID</label>
                  <input
                    type="text"
                    value={newPrescription.studentId}
                    onChange={(e) => setNewPrescription({ ...newPrescription, studentId: e.target.value })}
                    placeholder="e.g. STU-2024-001"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Prescribed By</label>
                  <input
                    type="text"
                    value={newPrescription.doctorName}
                    onChange={(e) => setNewPrescription({ ...newPrescription, doctorName: e.target.value })}
                    placeholder="Dr. Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Duration</label>
                  <input
                    type="text"
                    value={newPrescription.duration}
                    onChange={(e) => setNewPrescription({ ...newPrescription, duration: e.target.value })}
                    placeholder="e.g. 7 days"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Medications</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={medicationInput}
                      onChange={(e) => setMedicationInput(e.target.value)}
                      placeholder="Type medication and press Add"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddMedication()}
                    />
                    <button
                      onClick={handleAddMedication}
                      type="button"
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newPrescription.medications?.map((med, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50/10 text-primary-50 rounded-full text-sm">
                        {med}
                        <button
                          onClick={() => setNewPrescription({
                            ...newPrescription,
                            medications: newPrescription.medications?.filter((_, i) => i !== idx)
                          })}
                          className="hover:text-red-500"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-primary-50/80">Notes</label>
                  <textarea
                    value={newPrescription.notes}
                    onChange={(e) => setNewPrescription({ ...newPrescription, notes: e.target.value })}
                    placeholder="Instruction notes..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all resize-none"
                  />
                </div>
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
                onClick={handleAddPrescription}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
              >
                <IoPaperPlaneOutline className="w-4 h-4" />
                Issue Prescription
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Prescriptions;
