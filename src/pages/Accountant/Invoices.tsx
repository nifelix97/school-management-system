import React, { useState } from "react";
import {
  IoSearchOutline,
  IoAddOutline,
  IoDownloadOutline,
  IoPrintOutline,
  IoEyeOutline,
  IoFilterOutline,
} from "react-icons/io5";

interface Invoice {
  id: string;
  studentName: string;
  studentId: string;
  amount: string;
  invoiceType: string;
  issueDate: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

const Invoices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const invoices: Invoice[] = [
    {
      id: "INV-2024-001",
      studentName: "Nakato Sarah",
      studentId: "STU2024001",
      amount: "UGX 1,500,000",
      invoiceType: "Tuition Fee - Semester 1",
      issueDate: "2024-01-01",
      dueDate: "2024-01-31",
      status: "paid",
    },
    {
      id: "INV-2024-002",
      studentName: "Okello James",
      studentId: "STU2024002",
      amount: "UGX 750,000",
      invoiceType: "Registration Fee",
      issueDate: "2024-01-05",
      dueDate: "2024-01-20",
      status: "pending",
    },
    {
      id: "INV-2024-003",
      studentName: "Namukasa Grace",
      studentId: "STU2024003",
      amount: "UGX 2,000,000",
      invoiceType: "Accommodation Fee",
      issueDate: "2024-01-03",
      dueDate: "2024-01-15",
      status: "overdue",
    },
    {
      id: "INV-2024-004",
      studentName: "Musoke David",
      studentId: "STU2024004",
      amount: "UGX 500,000",
      invoiceType: "Retake Module Fee",
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "pending",
    },
    {
      id: "INV-2024-005",
      studentName: "Atim Betty",
      studentId: "STU2024005",
      amount: "UGX 1,200,000",
      invoiceType: "Tuition Fee - Semester 1",
      issueDate: "2024-01-02",
      dueDate: "2024-01-31",
      status: "paid",
    },
  ];

  const statusColors = {
    paid: "bg-primary-100/20 text-primary-100",
    pending: "bg-primary-200/20 text-primary-200",
    overdue: "bg-primary-300/20 text-primary-300",
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-50 mb-2">Invoices Management</h1>
        <p className="text-primary-50/60">Create, manage and track student invoices</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-primary-50/60 text-sm mb-2">Total Invoices</p>
          <p className="text-3xl font-bold text-primary-50">245</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-primary-50/60 text-sm mb-2">Pending Amount</p>
          <p className="text-3xl font-bold text-primary-200">UGX 8.5M</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-primary-50/60 text-sm mb-2">Overdue Invoices</p>
          <p className="text-3xl font-bold text-primary-300">23</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 w-full md:w-auto">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
            />
          </div>

          {/* Filter & Actions */}
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <IoFilterOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors whitespace-nowrap"
            >
              <IoAddOutline className="text-xl" />
              <span>Create Invoice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table - Desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-50/5 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Invoice ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Invoice Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Issue Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary-50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-primary-50">{invoice.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-primary-50">{invoice.studentName}</p>
                      <p className="text-xs text-primary-50/60">{invoice.studentId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-primary-50">{invoice.invoiceType}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-primary-50">{invoice.amount}</td>
                  <td className="px-6 py-4 text-sm text-primary-50">{invoice.issueDate}</td>
                  <td className="px-6 py-4 text-sm text-primary-50">{invoice.dueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary-50 hover:text-primary-100 transition-colors" title="View">
                        <IoEyeOutline className="text-xl" />
                      </button>
                      <button className="text-primary-50 hover:text-primary-100 transition-colors" title="Download">
                        <IoDownloadOutline className="text-xl" />
                      </button>
                      <button className="text-primary-50 hover:text-primary-100 transition-colors" title="Print">
                        <IoPrintOutline className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoices Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredInvoices.map((invoice) => (
          <div key={invoice.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-primary-50 text-sm">{invoice.id}</p>
                <p className="font-medium text-primary-50 mt-1">{invoice.studentName}</p>
                <p className="text-xs text-primary-50/60">{invoice.studentId}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
                {invoice.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-3">
              <div>
                <p className="text-xs text-primary-50/60">Invoice Type</p>
                <p className="text-sm text-primary-50">{invoice.invoiceType}</p>
              </div>
              <div>
                <p className="text-xs text-primary-50/60">Amount</p>
                <p className="font-semibold text-primary-50">{invoice.amount}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-primary-50/60">Issue Date</p>
                  <p className="text-sm text-primary-50">{invoice.issueDate}</p>
                </div>
                <div>
                  <p className="text-xs text-primary-50/60">Due Date</p>
                  <p className="text-sm text-primary-50">{invoice.dueDate}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-50/10 text-primary-50 rounded-lg hover:bg-primary-50/20 transition-colors text-sm">
                <IoEyeOutline className="text-lg" />
                <span>View</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-50/10 text-primary-50 rounded-lg hover:bg-primary-50/20 transition-colors text-sm">
                <IoDownloadOutline className="text-lg" />
                <span>Download</span>
              </button>
              <button className="flex items-center justify-center px-3 py-2 bg-primary-50/10 text-primary-50 rounded-lg hover:bg-primary-50/20 transition-colors">
                <IoPrintOutline className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-primary-50 mb-4">Create New Invoice</h2>
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
                <label className="block text-sm font-medium text-primary-50 mb-1">Invoice Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50">
                  <option>Tuition Fee</option>
                  <option>Registration Fee</option>
                  <option>Accommodation Fee</option>
                  <option>Library Fine</option>
                  <option>Retake Module Fee</option>
                  <option>Examination Fee</option>
                  <option>Graduation Fee</option>
                </select>
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
                <label className="block text-sm font-medium text-primary-50 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-1">Description (Optional)</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50"
                  rows={3}
                  placeholder="Add invoice description..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-primary-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;