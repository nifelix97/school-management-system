import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoFlaskOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoTimeOutline
} from "react-icons/io5";

interface LabTest {
  id: string;
  studentName: string;
  studentId: string;
  testName: string;
  category: string;
  requestDate: string;
  resultDate?: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  priority: "Normal" | "Urgent";
  doctorName: string;
  resultSummary?: string;
}

const LabTests: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock Data
  const labTests: LabTest[] = [
    {
      id: "LAB-001",
      studentName: "Lucas Grey",
      studentId: "STU-2024-008",
      testName: "Complete Blood Count (CBC)",
      category: "Hematology",
      requestDate: "2024-10-20",
      status: "Pending",
      priority: "Normal",
      doctorName: "Dr. Smith",
    },
    {
      id: "LAB-002",
      studentName: "Sophia Turner",
      studentId: "STU-2024-012",
      testName: "Urinalysis",
      category: "Clinical Microscopy",
      requestDate: "2024-10-18",
      resultDate: "2024-10-19",
      status: "Completed",
      priority: "Urgent",
      doctorName: "Dr. Wilson",
      resultSummary: "Normal findings",
    },
    {
      id: "LAB-003",
      studentName: "Ethan Hunt",
      studentId: "STU-2024-015",
      testName: "Blood Glucose",
      category: "Biochemistry",
      requestDate: "2024-10-21",
      status: "In Progress",
      priority: "Urgent",
      doctorName: "Dr. Adams",
    },
    {
      id: "LAB-004",
      studentName: "Mia Wong",
      studentId: "STU-2024-022",
      testName: "Lipid Profile",
      category: "Biochemistry",
      requestDate: "2024-10-15",
      resultDate: "2024-10-16",
      status: "Completed",
      priority: "Normal",
      doctorName: "Dr. Smith",
      resultSummary: "Elevated LDL cholesterol",
    },
    {
      id: "LAB-005",
      studentName: "Noah Clark",
      studentId: "STU-2024-030",
      testName: "X-Ray Chest",
      category: "Radiology",
      requestDate: "2024-10-19",
      status: "Cancelled",
      priority: "Normal",
      doctorName: "Dr. House",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === "Urgent" 
      ? "text-red-600 bg-red-50 border-red-100" 
      : "text-gray-600 bg-gray-50 border-gray-100";
  };

  const filteredTests = labTests.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.testName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Requests", value: labTests.length, icon: <IoFlaskOutline />, color: "bg-purple-500" },
    { label: "Pending Analysis", value: labTests.filter(t => t.status === "Pending").length, icon: <IoTimeOutline />, color: "bg-amber-500" },
    { label: "Completed", value: labTests.filter(t => t.status === "Completed").length, icon: <IoCheckmarkCircleOutline />, color: "bg-green-500" },
    { label: "Urgent Cases", value: labTests.filter(t => t.priority === "Urgent").length, icon: <IoCloseCircleOutline />, color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">Lab Tests</h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage laboratory test requests and results
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <IoAddOutline className="w-5 h-5" />
            <span>Request New Test</span>
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
              placeholder="Search by student, ID, or test name..."
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
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lab Tests List - Responsive View */}
      <div className="space-y-4">
        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Test Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-primary-50/80 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTests.map((item) => (
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
                    <div className="font-medium text-primary-50">{item.testName}</div>
                    <div className="text-xs text-primary-50/60">Category: {item.category}</div>
                    <div className="text-xs text-primary-50/60 mt-0.5">Dr: {item.doctorName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs text-primary-50/80">
                      <div className="flex items-center gap-1">
                        <span className="text-primary-50/50">Req:</span> {item.requestDate}
                      </div>
                      {item.resultDate && (
                        <div className="flex items-center gap-1">
                          <span className="text-primary-50/50">Res:</span> {item.resultDate}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="View Details">
                        <IoEyeOutline className="w-5 h-5" />
                      </button>
                      {item.status === "Completed" && (
                        <button className="p-2 text-primary-50 hover:bg-primary-50/10 rounded-lg transition-colors" title="Download Report">
                          <IoDownloadOutline className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredTests.map((item) => (
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
                   <span className={`px-2 py-1 rounded text-[10px] font-medium border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                   </span>
                   <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusColor(item.status)}`}>
                      {item.status}
                   </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                     <div className="font-semibold text-primary-50">{item.testName}</div>
                     <div className="text-xs text-primary-50/60">{item.category}</div>
                  </div>
                  <div className="flex items-center text-xs text-primary-50/60 gap-1 bg-white px-2 py-1 rounded border border-gray-200">
                    <IoPersonOutline className="w-3 h-3" />
                     {item.doctorName}
                  </div>
                </div>
                
                {item.resultSummary && (
                   <div className="mt-2 text-sm text-primary-50/70 border-l-2 border-primary-50/20 pl-2">
                      <span className="font-medium text-xs uppercase text-primary-50/50 block">Result Summary:</span>
                      {item.resultSummary}
                   </div>
                )}
                
                <div className="flex items-center gap-4 text-xs text-primary-50/60 mt-3 border-t border-gray-200 pt-3">
                   <div className="flex items-center gap-1">
                     <IoCalendarOutline className="w-3.5 h-3.5" />
                     Req: {item.requestDate}
                   </div>
                   {item.resultDate && (
                      <div className="flex items-center gap-1">
                        <IoCheckmarkCircleOutline className="w-3.5 h-3.5 text-green-500" />
                        Res: {item.resultDate}
                      </div>
                   )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                 {item.status === "Completed" && (
                    <button className="flex items-center gap-1 text-sm font-medium text-primary-50 hover:underline">
                      <IoDownloadOutline className="w-4 h-4" /> Download
                    </button>
                 )}
                 <button className="flex items-center gap-1 text-sm font-medium text-primary-50 hover:underline">
                   View Details
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 animate-[scaleIn_0.2s_ease-out]">
            <h2 className="text-2xl font-bold text-primary-50 mb-1">Request Lab Test</h2>
            <p className="text-gray-500 mb-6 text-sm">Create a new laboratory test request for a student.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-primary-50 font-semibold hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary-50 text-white font-semibold rounded-lg hover:bg-primary-100 transition-colors shadow-md">
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabTests;
