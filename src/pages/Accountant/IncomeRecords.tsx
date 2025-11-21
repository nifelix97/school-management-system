import {
  Download,
  Filter,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import React, { useState } from "react";
import type { ExpenseRecord, IncomeRecord } from "../../types/financial";

type Tab = "income" | "expenses";

const IncomeRecords: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("income");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);

  // Handler for Add New button
  const handleAddNew = () => {
    setShowModal(true);
    console.log(`Opening modal to add new ${activeTab === "income" ? "income" : "expense"} record`);
  };

  // Handler for Export button
  const handleExport = () => {
    const dataToExport = activeTab === "income" ? filteredIncome : filteredExpenses;
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeTab}_records_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Mock income data
  const incomeRecords: IncomeRecord[] = [
    {
      id: "INC001",
      studentName: "Nakato Sarah",
      studentId: "STU2024001",
      amount: 1500000,
      paymentType: "Tuition Fee",
      date: "2024-01-15",
      status: "completed",
      method: "Bank Transfer",
      receiptNumber: "RCP-2024-001",
    },
    {
      id: "INC002",
      studentName: "Okello James",
      studentId: "STU2024002",
      amount: 750000,
      paymentType: "Registration Fee",
      date: "2024-01-14",
      status: "pending",
      method: "Mobile Money",
      receiptNumber: "RCP-2024-002",
    },
    {
      id: "INC003",
      studentName: "Namukasa Grace",
      studentId: "STU2024003",
      amount: 2000000,
      paymentType: "Accommodation Fee",
      date: "2024-01-13",
      status: "completed",
      method: "Cash",
      receiptNumber: "RCP-2024-003",
    },
    {
      id: "INC004",
      studentName: "Musoke David",
      studentId: "STU2024004",
      amount: 500000,
      paymentType: "Library Fee",
      date: "2024-01-12",
      status: "failed",
      method: "Bank Transfer",
      receiptNumber: "RCP-2024-004",
    },
    {
      id: "INC005",
      studentName: "Atim Betty",
      studentId: "STU2024005",
      amount: 1200000,
      paymentType: "Exam Fee",
      date: "2024-01-11",
      status: "completed",
      method: "Mobile Money",
      receiptNumber: "RCP-2024-005",
    },
  ];

  // Mock expense data
  const expenseRecords: ExpenseRecord[] = [
    {
      id: "EXP001",
      category: "Utilities",
      vendor: "Umeme Ltd",
      amount: 3500000,
      date: "2024-01-10",
      description: "Electricity bill for January 2024",
      status: "approved",
      paymentMethod: "Bank Transfer",
      invoiceNumber: "INV-UMEME-001",
    },
    {
      id: "EXP002",
      category: "Supplies",
      vendor: "Office Mart Uganda",
      amount: 1250000,
      date: "2024-01-09",
      description: "Office stationery and supplies",
      status: "approved",
      paymentMethod: "Cash",
      invoiceNumber: "INV-OM-2024-045",
    },
    {
      id: "EXP003",
      category: "Maintenance",
      vendor: "BuildCare Services",
      amount: 5000000,
      date: "2024-01-08",
      description: "Classroom renovation and repairs",
      status: "pending",
      paymentMethod: "Bank Transfer",
      invoiceNumber: "INV-BC-789",
    },
    {
      id: "EXP004",
      category: "Salaries",
      vendor: "Staff Payroll",
      amount: 45000000,
      date: "2024-01-05",
      description: "Monthly staff salaries - January 2024",
      status: "approved",
      paymentMethod: "Bank Transfer",
      invoiceNumber: "PAY-2024-01",
    },
    {
      id: "EXP005",
      category: "Technology",
      vendor: "Tech Solutions Ltd",
      amount: 8500000,
      date: "2024-01-07",
      description: "Computer lab equipment upgrade",
      status: "pending",
      paymentMethod: "Bank Transfer",
      invoiceNumber: "INV-TSL-156",
    },
  ];

  const incomeStatusColors = {
    completed: "bg-primary-100/20 text-primary-100",
    pending: "bg-primary-200/20 text-primary-200",
    failed: "bg-red-100 text-red-700",
  };

  const expenseStatusColors = {
    approved: "bg-primary-100/20 text-primary-100",
    pending: "bg-primary-200/20 text-primary-200",
    rejected: "bg-red-100 text-red-700",
  };

  // Filter income records
  const filteredIncome = incomeRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Filter expense records
  const filteredExpenses = expenseRecords.filter((record) => {
    const matchesSearch =
      record.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate totals
  const totalIncome = incomeRecords
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = expenseRecords
    .filter((r) => r.status === "approved")
    .reduce((sum, r) => sum + r.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) => {
    return `UGX ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
          Financial Records
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Track and manage income and expenses
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Total Income
            </div>
            <div className="bg-primary-100/10 p-2 rounded-lg">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary-100" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-50">
            {formatCurrency(totalIncome)}
          </div>
          <div className="text-xs sm:text-sm text-primary-100 mt-2">
            From student payments
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Total Expenses
            </div>
            <div className="bg-primary-200/10 p-2 rounded-lg">
              <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary-200" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-50">
            {formatCurrency(totalExpenses)}
          </div>
          <div className="text-xs sm:text-sm text-primary-200 mt-2">
            University expenses
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 xs:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs sm:text-sm text-primary-50/60 uppercase tracking-wide">
              Net Balance
            </div>
            <div className={`p-2 rounded-lg ${netBalance >= 0 ? 'bg-primary-100/10' : 'bg-red-100'}`}>
              <TrendingUp className={`w-4 h-4 sm:w-5 sm:h-5 ${netBalance >= 0 ? 'text-primary-100' : 'text-red-700'}`} />
            </div>
          </div>
          <div className={`text-xl sm:text-2xl lg:text-3xl font-bold ${netBalance >= 0 ? 'text-primary-50' : 'text-red-700'}`}>
            {formatCurrency(Math.abs(netBalance))}
          </div>
          <div className={`text-xs sm:text-sm mt-2 ${netBalance >= 0 ? 'text-primary-100' : 'text-red-700'}`}>
            {netBalance >= 0 ? 'Surplus' : 'Deficit'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("income")}
            className={`flex-1 min-w-[120px] px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${
              activeTab === "income"
                ? "text-primary-100 border-b-2 border-primary-100 bg-primary-100/5"
                : "text-primary-50/60 hover:text-primary-50 hover:bg-gray-50"
            }`}
          >
            Income Records
          </button>
          <button
            onClick={() => setActiveTab("expenses")}
            className={`flex-1 min-w-[120px] px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${
              activeTab === "expenses"
                ? "text-primary-100 border-b-2 border-primary-100 bg-primary-100/5"
                : "text-primary-50/60 hover:text-primary-50 hover:bg-gray-50"
            }`}
          >
            Expenses
          </button>
        </div>

        {/* Filters and Actions */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
              />
            </div>

            {/* Filter by Status */}
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary-50/40" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                {activeTab === "income" ? (
                  <>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </>
                ) : (
                  <>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </>
                )}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={handleAddNew}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Add New</span>
              </button>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-primary-100 text-primary-100 rounded-lg hover:bg-primary-100/10 transition-colors"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {activeTab === "income" ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Receipt #
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Student
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Payment Type
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Method
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncome.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-sm text-primary-50 font-medium">
                          {record.receiptNumber}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-primary-50 font-medium">
                            {record.studentName}
                          </div>
                          <div className="text-xs text-primary-50/60">
                            {record.studentId}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-primary-50">
                          {record.paymentType}
                        </td>
                        <td className="py-4 px-4 text-sm text-primary-50 font-semibold">
                          {formatCurrency(record.amount)}
                        </td>
                        <td className="py-4 px-4 text-sm text-primary-50">
                          {record.method}
                        </td>
                        <td className="py-4 px-4 text-sm text-primary-50">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              incomeStatusColors[record.status]
                            }`}
                          >
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden space-y-3 sm:space-y-4">
                {filteredIncome.map((record) => (
                  <div
                    key={record.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-sm font-semibold text-primary-50 mb-1">
                          {record.studentName}
                        </div>
                        <div className="text-xs text-primary-50/60">
                          {record.studentId}
                        </div>
                      </div>
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          incomeStatusColors[record.status]
                        }`}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div>
                        <div className="text-primary-50/60 mb-1">Receipt #</div>
                        <div className="text-primary-50 font-medium">
                          {record.receiptNumber}
                        </div>
                      </div>
                      <div>
                        <div className="text-primary-50/60 mb-1">Amount</div>
                        <div className="text-primary-50 font-semibold">
                          {formatCurrency(record.amount)}
                        </div>
                      </div>
                      <div>
                        <div className="text-primary-50/60 mb-1">Payment Type</div>
                        <div className="text-primary-50">{record.paymentType}</div>
                      </div>
                      <div>
                        <div className="text-primary-50/60 mb-1">Method</div>
                        <div className="text-primary-50">{record.method}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-primary-50/60 mb-1">Date</div>
                        <div className="text-primary-50">
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Desktop Table View for Expenses */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Invoice #
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Vendor
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-primary-50/60 uppercase tracking-wide">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-sm text-primary-50 font-medium">
                          {record.invoiceNumber}
                        </td>
                        <td className="py-4 px-4 text-sm text-primary-50">
                          {record.category}
                        </td>
                        <td className="py-4 px-4 text-sm text-primary-50">
                          {record.vendor}
                        </td>
                        <td className="py-4 px-4 text-sm text-primary-50 max-w-xs truncate">
                          {record.description}
                        </td>
                        <td className="py-4 px-4 text-sm text-primary-50 font-semibold">
                          {formatCurrency(record.amount)}
                        </td>
                        <td className="py-4 px-4 text-sm text-primary-50">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              expenseStatusColors[record.status]
                            }`}
                          >
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet Card View for Expenses */}
              <div className="lg:hidden space-y-3 sm:space-y-4">
                {filteredExpenses.map((record) => (
                  <div
                    key={record.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-sm font-semibold text-primary-50 mb-1">
                          {record.category}
                        </div>
                        <div className="text-xs text-primary-50/60">
                          {record.vendor}
                        </div>
                      </div>
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          expenseStatusColors[record.status]
                        }`}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div>
                        <div className="text-primary-50/60 mb-1">Invoice #</div>
                        <div className="text-primary-50 font-medium">
                          {record.invoiceNumber}
                        </div>
                      </div>
                      <div>
                        <div className="text-primary-50/60 mb-1">Amount</div>
                        <div className="text-primary-50 font-semibold">
                          {formatCurrency(record.amount)}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-primary-50/60 mb-1">Description</div>
                        <div className="text-primary-50">{record.description}</div>
                      </div>
                      <div>
                        <div className="text-primary-50/60 mb-1">Payment Method</div>
                        <div className="text-primary-50">{record.paymentMethod}</div>
                      </div>
                      <div>
                        <div className="text-primary-50/60 mb-1">Date</div>
                        <div className="text-primary-50">
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {((activeTab === "income" && filteredIncome.length === 0) ||
            (activeTab === "expenses" && filteredExpenses.length === 0)) && (
            <div className="text-center py-12">
              <div className="text-primary-50/40 mb-2">No records found</div>
              <div className="text-sm text-primary-50/60">
                Try adjusting your search or filters
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add New Record Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary-50">
                Add New {activeTab === "income" ? "Income" : "Expense"} Record
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-primary-50/60 hover:text-primary-50 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {activeTab === "income" ? (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Student Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                        placeholder="Enter student name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Student ID
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                        placeholder="Enter student ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Amount (UGX)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                        placeholder="Enter amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Payment Type
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent">
                        <option value="">Select payment type</option>
                        <option value="Tuition Fee">Tuition Fee</option>
                        <option value="Registration Fee">Registration Fee</option>
                        <option value="Accommodation Fee">Accommodation Fee</option>
                        <option value="Library Fee">Library Fee</option>
                        <option value="Exam Fee">Exam Fee</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Payment Method
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent">
                        <option value="">Select payment method</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Mobile Money">Mobile Money</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Receipt Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                        placeholder="Enter receipt number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Status
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent">
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </div>
                </form>
              ) : (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Category
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent">
                        <option value="">Select category</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Supplies">Supplies</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Salaries">Salaries</option>
                        <option value="Technology">Technology</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Vendor
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                        placeholder="Enter vendor name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Amount (UGX)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                        placeholder="Enter amount"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Payment Method
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent">
                        <option value="">Select payment method</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Mobile Money">Mobile Money</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Invoice Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                        placeholder="Enter invoice number"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                        placeholder="Enter description"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Status
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent">
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 border border-gray-300 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: Add logic to save the record
                  console.log("Saving record...");
                  setShowModal(false);
                }}
                className="px-6 py-2.5 bg-primary-100 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeRecords;