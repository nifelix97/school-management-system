import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoCardOutline,
    IoCashOutline,
    IoCloudDownloadOutline,
    IoFilterOutline,
    IoPrintOutline,
    IoSearchOutline,
    IoTimeOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

const TransportFees = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Mock Data
  const stats = [
    {
      title: "Total Revenue",
      value: "$124,500",
      target: "Target: $150k",
      icon: <IoCardOutline className="w-6 h-6" />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-600",
      progress: 82,
    },
    {
      title: "Collected This Month",
      value: "$12,450",
      target: "vs last month: +8%",
      icon: <IoCashOutline className="w-6 h-6" />,
      color: "bg-green-500",
      lightColor: "bg-green-50 text-green-600",
      progress: 65,
    },
    {
      title: "Pending Payments",
      value: "$8,200",
      target: "45 Students",
      icon: <IoTimeOutline className="w-6 h-6" />,
      color: "bg-amber-500",
      lightColor: "bg-amber-50 text-amber-600",
      progress: 35,
    },
    {
      title: "Overdue Alerts",
      value: "12",
      target: "Urgent Action Required",
      icon: <IoAlertCircleOutline className="w-6 h-6" />,
      color: "bg-red-500",
      lightColor: "bg-red-50 text-red-600",
      progress: 100,
    },
  ];

  const feeRecords = [
    {
      id: 1,
      studentName: "John Smith",
      studentId: "ST-2024-001",
      grade: "Grade 10",
      route: "Route A - North City",
      amount: 450,
      status: "Paid",
      dueDate: "2024-12-01",
      lastPayment: "2024-11-28",
    },
    {
      id: 2,
      studentName: "Emma Wilson",
      studentId: "ST-2024-045",
      grade: "Grade 8",
      route: "Route B - West End",
      amount: 450,
      status: "Pending",
      dueDate: "2024-12-01",
      lastPayment: "2024-10-30",
    },
    {
      id: 3,
      studentName: "Michael Brown",
      studentId: "ST-2024-089",
      grade: "Grade 12",
      route: "Route C - Downtown",
      amount: 500,
      status: "Overdue",
      dueDate: "2024-11-15",
      lastPayment: "2024-09-15",
    },
    {
      id: 4,
      studentName: "Sarah Davis",
      studentId: "ST-2024-112",
      grade: "Grade 11",
      route: "Route A - North City",
      amount: 450,
      status: "Paid",
      dueDate: "2024-12-01",
      lastPayment: "2024-12-01",
    },
    {
      id: 5,
      studentName: "James Johnson",
      studentId: "ST-2024-156",
      grade: "Grade 9",
      route: "Route B - West End",
      amount: 450,
      status: "Pending",
      dueDate: "2024-12-05",
      lastPayment: "-",
    },
  ];

  // Logic
  const filteredRecords = feeRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Payment recorded for ${selectedStudent?.studentName || "Student"}`);
    setShowPaymentModal(false);
  };

  const handleExport = () => {
    toast.info("Exporting financial report...");
    setTimeout(() => toast.success("Report downloaded successfully!"), 1500);
  };

  const handleGenerateInvoice = (studentName: string) => {
    toast.success(`Invoice generated for ${studentName}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 py-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transport Fees</h1>
          <p className="text-gray-500 text-sm">Manage student transport payments and billing</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={handleExport}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
                <IoCloudDownloadOutline className="w-5 h-5" />
                Export Repot
            </button>
            <button 
                onClick={() => {
                    setSelectedStudent(null);
                    setShowPaymentModal(true);
                }}
                className="px-4 py-2 bg-primary-100 text-white rounded-xl hover:bg-primary-50 font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary-50/30"
            >
                <IoAddOutline className="w-5 h-5" />
                Record Payment
            </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.lightColor}`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">{stat.title}</p>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-gray-400">{stat.target}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full ${stat.color}`} 
                    style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Search by student ID or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500">
                        <IoFilterOutline />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-primary-100 font-medium"
                    >
                        <option value="All">All Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Student Details</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Route Info</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Fee Amount</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-white font-bold text-xs">
                                        {record.studentName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">{record.studentName}</p>
                                        <p className="text-xs text-gray-500">{record.studentId}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-600 font-medium">{record.route}</div>
                                <div className="text-xs text-gray-400">{record.grade}</div>
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-gray-800">
                                ${record.amount}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusColor(record.status)}`}>
                                    {record.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1.5">
                                    <IoCalendarOutline className="text-gray-400" />
                                    {record.dueDate}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleGenerateInvoice(record.studentName)}
                                        className="p-2 text-gray-500 hover:text-primary-100 hover:bg-primary-50/10 rounded-lg transition-colors"
                                        title="Download Invoice"
                                    >
                                        <IoPrintOutline size={18} />
                                    </button>
                                    {record.status !== 'Paid' && (
                                        <button 
                                            onClick={() => {
                                                setSelectedStudent(record);
                                                setShowPaymentModal(true);
                                            }}
                                            className="px-3 py-1.5 bg-primary-100 text-white rounded-lg text-xs font-bold hover:bg-primary-50 transition-colors shadow-sm"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filteredRecords.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                No fee records found matching your filters.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>

        {/* Payment Modal */}
        {showPaymentModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
                <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Record Payment</h2>
                        <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleRecordPayment} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Student ID / Name</label>
                            <input 
                                type="text" 
                                defaultValue={selectedStudent?.studentName || ""}
                                placeholder="Enter student details"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                required 
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input 
                                        type="number" 
                                        defaultValue={selectedStudent?.amount || ""}
                                        className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                                        required 
                                    />
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Method</label>
                                <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100">
                                    <option>Cash</option>
                                    <option>Bank Transfer</option>
                                    <option>Card</option>
                                    <option>Check</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Transaction Ref (Optional)</label>
                            <input 
                                type="text" 
                                placeholder="e.g. TXN-12345678"
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-100"
                            />
                        </div>
                         
                         <div className="pt-4 flex gap-3">
                            <button 
                                type="button" 
                                onClick={() => setShowPaymentModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 px-4 py-2 bg-primary-100 text-white rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg shadow-primary-50/25"
                            >
                                Confirm Payment
                            </button>
                         </div>
                    </form>
                </div>
            </div>
        )}

    </div>
  );
};

export default TransportFees;
