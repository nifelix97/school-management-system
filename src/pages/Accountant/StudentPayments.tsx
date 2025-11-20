import React, { useState } from "react";
import {
  IoSearchOutline,
  IoAddOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoFilterOutline,
} from "react-icons/io5";

interface Payment {
  id: string;
  studentName: string;
  studentId: string;
  amount: string;
  paymentType: string;
  date: string;
  status: "completed" | "pending" | "rejected";
  method: string;
}

const StudentPayments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showRecordModal, setShowRecordModal] = useState(false);

  const payments: Payment[] = [
    {
      id: "PAY001",
      studentName: "Nakato Sarah",
      studentId: "STU2024001",
      amount: "UGX 1,500,000",
      paymentType: "Tuition Fee",
      date: "2024-01-15",
      status: "completed",
      method: "Bank Transfer",
    },
    {
      id: "PAY002",
      studentName: "Okello James",
      studentId: "STU2024002",
      amount: "UGX 750,000",
      paymentType: "Registration Fee",
      date: "2024-01-14",
      status: "pending",
      method: "Mobile Money",
    },
    {
      id: "PAY003",
      studentName: "Namukasa Grace",
      studentId: "STU2024003",
      amount: "UGX 2,000,000",
      paymentType: "Accommodation Fee",
      date: "2024-01-13",
      status: "completed",
      method: "Cash",
    },
    {
      id: "PAY004",
      studentName: "Musoke David",
      studentId: "STU2024004",
      amount: "UGX 500,000",
      paymentType: "Library Fine",
      date: "2024-01-12",
      status: "rejected",
      method: "Bank Transfer",
    },
    {
      id: "PAY005",
      studentName: "Atim Betty",
      studentId: "STU2024005",
      amount: "UGX 1,200,000",
      paymentType: "Retake Module Fee",
      date: "2024-01-11",
      status: "completed",
      method: "Mobile Money",
    },
  ];

  const statusColors = {
    completed: "bg-primary-100/20 text-primary-100",
    pending: "bg-primary-200/20 text-primary-200",
    rejected: "bg-primary-300/20 text-primary-300",
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-50 mb-2">Student Payments</h1>
        <p className="text-primary-50/60">Manage and track all student payment transactions</p>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 w-full md:w-auto">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Record Payment Button */}
            <button
              onClick={() => setShowRecordModal(true)}
              className="flex items-center gap-2 bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors whitespace-nowrap"
            >
              <IoAddOutline className="text-xl" />
              <span>Record Payment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table - Desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-50/5 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Payment ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Payment Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-primary-50">{payment.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-primary-50">{payment.studentName}</p>
                      <p className="text-xs text-primary-50/60">{payment.studentId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-primary-50">{payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-primary-50">{payment.paymentType}</td>
                  <td className="px-6 py-4 text-sm text-primary-50">{payment.method}</td>
                  <td className="px-6 py-4 text-sm text-primary-50">{payment.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[payment.status]}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {payment.status === "pending" && (
                        <>
                          <button className="text-primary-100 hover:text-primary-100/80 transition-colors">
                            <IoCheckmarkCircleOutline className="text-xl" />
                          </button>
                          <button className="text-primary-300 hover:text-primary-300/80 transition-colors">
                            <IoCloseCircleOutline className="text-xl" />
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
      </div>

      {/* Payments Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredPayments.map((payment) => (
          <div key={payment.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-primary-50">{payment.studentName}</p>
                <p className="text-xs text-primary-50/60">{payment.studentId}</p>
                <p className="text-xs text-primary-50/60 mt-1">{payment.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[payment.status]}`}>
                {payment.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-primary-50/60">Amount</p>
                <p className="font-semibold text-primary-50">{payment.amount}</p>
              </div>
              <div>
                <p className="text-xs text-primary-50/60">Payment Type</p>
                <p className="text-sm text-primary-50">{payment.paymentType}</p>
              </div>
              <div>
                <p className="text-xs text-primary-50/60">Method</p>
                <p className="text-sm text-primary-50">{payment.method}</p>
              </div>
              <div>
                <p className="text-xs text-primary-50/60">Date</p>
                <p className="text-sm text-primary-50">{payment.date}</p>
              </div>
            </div>

            {payment.status === "pending" && (
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-100/20 text-primary-100 rounded-lg hover:bg-primary-100/30 transition-colors text-sm font-medium">
                  <IoCheckmarkCircleOutline className="text-lg" />
                  <span>Approve</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-300/20 text-primary-300 rounded-lg hover:bg-primary-300/30 transition-colors text-sm font-medium">
                  <IoCloseCircleOutline className="text-lg" />
                  <span>Reject</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-primary-50 mb-4">Record New Payment</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-1">Student ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                  placeholder="Enter student ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-1">Amount (UGX)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-1">Payment Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50">
                  <option>Tuition Fee</option>
                  <option>Registration Fee</option>
                  <option>Accommodation Fee</option>
                  <option>Library Fine</option>
                  <option>Retake Module Fee</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-1">Payment Method</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50">
                  <option>Bank Transfer</option>
                  <option>Mobile Money</option>
                  <option>Cash</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRecordModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-primary-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPayments;