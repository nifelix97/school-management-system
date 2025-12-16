import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoDocumentTextOutline,
    IoEllipsisVerticalOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoMedkitOutline,
    IoPencilOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoWarningOutline
} from "react-icons/io5";

interface MedicalRecord {
  id: string;
  studentName: string;
  studentId: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  genotype: string;
  allergies: string[];
  chronicConditions: string[];
  lastCheckup: string;
  status: "Healthy" | "Under Observation" | "Critical" | "Recovery";
}

const HealthRecord: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock Data
  const records: MedicalRecord[] = [
    {
      id: "REC-001",
      studentName: "Sarah Johnson",
      studentId: "STU-2024-001",
      age: 20,
      gender: "Female",
      bloodGroup: "O+",
      genotype: "AA",
      allergies: ["Penicillin", "Peanuts"],
      chronicConditions: ["Asthma"],
      lastCheckup: "2024-03-15",
      status: "Under Observation",
    },
    {
      id: "REC-002",
      studentName: "Michael Chen",
      studentId: "STU-2024-002",
      age: 21,
      gender: "Male",
      bloodGroup: "A+",
      genotype: "AS",
      allergies: [],
      chronicConditions: [],
      lastCheckup: "2024-02-28",
      status: "Healthy",
    },
    {
      id: "REC-003",
      studentName: "Emily Davis",
      studentId: "STU-2024-003",
      age: 19,
      gender: "Female",
      bloodGroup: "B-",
      genotype: "AA",
      allergies: ["Dust Mites"],
      chronicConditions: ["Migraine"],
      lastCheckup: "2024-03-10",
      status: "Recovery",
    },
    {
      id: "REC-004",
      studentName: "James Wilson",
      studentId: "STU-2024-004",
      age: 22,
      gender: "Male",
      bloodGroup: "AB+",
      genotype: "AA",
      allergies: [],
      chronicConditions: ["Diabetes Type 1"],
      lastCheckup: "2024-03-01",
      status: "Critical",
    },
    {
      id: "REC-005",
      studentName: "Lisa Anderson",
      studentId: "STU-2024-005",
      age: 20,
      gender: "Female",
      bloodGroup: "O-",
      genotype: "AA",
      allergies: ["Latex"],
      chronicConditions: [],
      lastCheckup: "2024-01-20",
      status: "Healthy",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-green-100 text-green-700 border-green-200";
      case "Under Observation":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "Recovery":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Students", value: records.length, icon: <IoPersonOutline />, color: "bg-blue-500" },
    { label: "Critical Cases", value: records.filter(r => r.status === "Critical").length, icon: <IoWarningOutline />, color: "bg-red-500" },
    { label: "With Allergies", value: records.filter(r => r.allergies.length > 0).length, icon: <IoMedkitOutline />, color: "bg-amber-500" },
    { label: "Active Plans", value: records.filter(r => r.chronicConditions.length > 0).length, icon: <IoDocumentTextOutline />, color: "bg-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Health Records</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Comprehensive student medical history and health status
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>New Record</span>
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
              <option value="Healthy">Healthy</option>
              <option value="Under Observation">Under Observation</option>
              <option value="Critical">Critical</option>
              <option value="Recovery">Recovery</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records List - Responsive View */}
      <div className="space-y-4">
        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Blood & Genotype</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Medical Alerts</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Last Checkup</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold">
                        {record.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-primary-50">{record.studentName}</div>
                        <div className="text-xs text-primary-50/60">{record.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-primary-50/60 mb-0.5">Blood</span>
                        <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 text-xs font-bold border border-red-100">{record.bloodGroup}</span>
                      </div>
                      <div className="w-px h-8 bg-gray-100"></div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-primary-50/60 mb-0.5">Type</span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">{record.genotype}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {record.allergies.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-amber-600">
                          <IoWarningOutline />
                          <span className="truncate max-w-[120px]">{record.allergies.join(", ")}</span>
                        </div>
                      )}
                      {record.chronicConditions.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-600">
                          <IoMedkitOutline />
                          <span className="truncate max-w-[120px]">{record.chronicConditions.join(", ")}</span>
                        </div>
                      )}
                      {record.allergies.length === 0 && record.chronicConditions.length === 0 && (
                        <span className="text-xs text-gray-400 italic">None recorded</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-primary-50/80">
                      <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                      {new Date(record.lastCheckup).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="View Details">
                        <IoEyeOutline className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="Edit Record">
                        <IoPencilOutline className="w-5 h-5" />
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
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50 font-bold text-lg">
                    {record.studentName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-primary-50">{record.studentName}</div>
                    <div className="text-xs text-primary-50/60">{record.studentId}</div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <IoEllipsisVerticalOutline className="w-5 h-5 text-primary-50/60" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="text-xs text-primary-50/60 mb-1">Blood & Genotype</div>
                  <div className="flex gap-2">
                    <span className="font-bold text-primary-50">{record.bloodGroup}</span>
                    <span className="text-gray-300">|</span>
                    <span className="font-bold text-primary-50">{record.genotype}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="text-xs text-primary-50/60 mb-1">Status</div>
                  <div className={`text-xs font-bold ${
                    record.status === "Healthy" ? "text-green-600" :
                    record.status === "Critical" ? "text-red-600" :
                    "text-amber-600"
                  }`}>
                    {record.status}
                  </div>
                </div>
              </div>

              {(record.allergies.length > 0 || record.chronicConditions.length > 0) && (
                <div className="mb-4 space-y-2">
                  {record.allergies.length > 0 && (
                    <div className="flex items-start gap-2 text-xs">
                      <IoWarningOutline className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600"><span className="font-semibold">Allergies:</span> {record.allergies.join(", ")}</span>
                    </div>
                  )}
                  {record.chronicConditions.length > 0 && (
                    <div className="flex items-start gap-2 text-xs">
                      <IoMedkitOutline className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600"><span className="font-semibold">Conditions:</span> {record.chronicConditions.join(", ")}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-primary-50/60">
                  Last checkup: {new Date(record.lastCheckup).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-primary-50 text-white text-xs font-semibold rounded-lg hover:bg-primary-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredRecords.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="inline-flex p-4 rounded-full bg-gray-50 mb-4">
            <IoSearchOutline className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-primary-50 mb-2">No records found</h3>
          <p className="text-primary-50/60">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-[scaleIn_0.2s_ease-out]">
            <h2 className="text-2xl font-bold text-primary-50 mb-4">Add New Medical Record</h2>
            <p className="text-gray-500 mb-6">Form implementation would go here...</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-primary-50 font-semibold hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary-50 text-white font-semibold rounded-lg hover:bg-primary-50/90 transition-colors">
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecord;
