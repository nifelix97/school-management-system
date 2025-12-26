import React, { useState } from "react";
import {
  IoAlertCircleOutline,
  IoCashOutline,
  IoCheckmarkCircleOutline,
  IoDownloadOutline,
  IoTimeOutline
} from "react-icons/io5";

interface PayrollRecord {
  id: string;
  name: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Pending' | 'On Hold';
}

const PayrollManagement: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [records, setRecords] = useState<PayrollRecord[]>([
    { id: "PAY001", name: "John Doe", amount: "UGX 2,500,000", date: "2025-12-25", status: "Paid" },
    { id: "PAY002", name: "Jane Smith", amount: "UGX 1,800,000", date: "2025-12-25", status: "Paid" },
    { id: "PAY003", name: "Robert Musoke", amount: "UGX 2,200,000", date: "2025-12-25", status: "Pending" },
    { id: "PAY004", name: "Sarah Nakato", amount: "UGX 1,500,000", date: "2025-12-25", status: "Paid" },
    { id: "PAY005", name: "David Okello", amount: "UGX 2,800,000", date: "2025-12-25", status: "On Hold" },
  ]);

  const handleProcessPayroll = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setRecords(records.map((r: PayrollRecord) => r.status === 'Pending' ? { ...r, status: 'Paid' } : r));
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleDownloadReport = () => {
    const headers = ["Reference", "Employee", "Amount", "Date", "Status"];
    const csvContent = [
      headers.join(","),
      ...records.map((r: PayrollRecord) => `${r.id},${r.name},"${r.amount}",${r.date},${r.status}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `payroll_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
           <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold">
              <IoCheckmarkCircleOutline className="text-2xl" />
              <span>Payroll processed successfully for all pending staff!</span>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-50">Payroll Management</h1>
          <p className="text-primary-50/40 font-medium">Process salaries and track staff payment history.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handleDownloadReport}
             className="flex items-center gap-2 border border-gray-200 text-primary-50 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold shadow-sm bg-white"
           >
            <IoDownloadOutline className="text-xl" />
            <span>Download Report</span>
          </button>
          <button 
            disabled={isProcessing}
            onClick={handleProcessPayroll}
            className={`flex items-center gap-2 bg-primary-50 text-white px-6 py-2.5 rounded-xl transition-all font-bold shadow-md active:scale-95 ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-100 hover:shadow-lg'}`}
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <IoCashOutline className="text-xl" />
            )}
            <span>{isProcessing ? 'Processing...' : 'Process Payroll'}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-black text-primary-50/30 uppercase tracking-widest">Paid This Month</p>
            <div className="p-2 bg-green-50 rounded-xl">
              <IoCheckmarkCircleOutline className="text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-primary-50">UGX 45,200,000</h3>
          <p className="text-xs text-green-600 mt-2 font-bold uppercase tracking-tight">92% processed</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-black text-primary-50/30 uppercase tracking-widest">Pending Payments</p>
            <div className="p-2 bg-yellow-50 rounded-xl">
              <IoTimeOutline className="text-yellow-600" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-primary-50">UGX 8,500,000</h3>
          <p className="text-xs text-yellow-600 mt-2 font-bold uppercase tracking-tight">12 employees</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-black text-primary-50/30 uppercase tracking-widest">On Hold</p>
            <div className="p-2 bg-red-50 rounded-xl">
              <IoAlertCircleOutline className="text-red-600" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-primary-50">UGX 2,800,000</h3>
          <p className="text-xs text-red-600 mt-2 font-bold uppercase tracking-tight">1 pending review</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30">
          <h2 className="text-xl font-black text-primary-50">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Reference</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Employee</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((record: PayrollRecord) => (
                <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs text-primary-50/60 font-black">{record.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-primary-50">{record.name}</td>
                  <td className="px-6 py-4 text-sm font-black text-primary-50">{record.amount}</td>
                  <td className="px-6 py-4 text-xs font-bold text-primary-50/30 uppercase">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                      record.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                      record.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;
