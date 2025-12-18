import React, { useState } from "react";
import {
    IoCardOutline,
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoDownloadOutline,
    IoInformationCircleOutline,
    IoPrintOutline,
    IoReceiptOutline,
    IoWalletOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  method: string;
  child: string;
}

interface ChildFee {
  id: string;
  name: string;
  tuition: number;
  transport: number;
  activities: number;
  totalPaid: number;
  totalDue: number;
}

const feeData: ChildFee[] = [
  {
    id: "STD-101",
    name: "John Doe",
    tuition: 2500,
    transport: 300,
    activities: 200,
    totalPaid: 2000,
    totalDue: 1000,
  },
  {
    id: "STD-202",
    name: "Jane Doe",
    tuition: 2500,
    transport: 0,
    activities: 150,
    totalPaid: 2650,
    totalDue: 0,
  }
];

const paymentHistory: PaymentRecord[] = [
  { id: "PAY-9921", date: "2025-12-10", amount: 1000, status: "Completed", method: "Credit Card", child: "John Doe" },
  { id: "PAY-9884", date: "2025-11-15", amount: 2650, status: "Completed", method: "Bank Transfer", child: "Jane Doe" },
  { id: "PAY-9730", date: "2025-10-12", amount: 1000, status: "Completed", method: "Credit Card", child: "John Doe" },
];

const ParentFees: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState(feeData[0]);
  const [isPaying, setIsPaying] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);

  const handlePayment = () => {
    setIsPaying(true);
    toast.info(`Processing payment for ${selectedChild.name}...`, {
      icon: <IoCardOutline className="text-primary-50" />
    });
    
    setTimeout(() => {
      setIsPaying(false);
      toast.success("Payment successful! Receipt has been sent to your email.");
    }, 2500);
  };

  const handlePrint = (payId: string) => {
    toast.info(`Opening print dialog for ${payId}...`, {
      icon: <IoPrintOutline className="text-gray-500" />
    });
    // Simulating print dialog
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleExportHistory = () => {
    toast.info("Preparing transaction history CSV...");
    setTimeout(() => {
      toast.success("Transactions exported successfully!");
    }, 1500);
  };

  const displayedHistory = showAllHistory 
    ? [...paymentHistory, ...paymentHistory] // Doubling for demo
    : paymentHistory;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">Fees & Payments</h1>
          <p className="text-gray-500 text-sm sm:text-base">Manage tuition fees and view payment history.</p>
        </div>
        
        <div className="w-full md:w-72 relative">
          <select 
            className="appearance-none w-full bg-white border-2 border-gray-100 text-gray-800 py-3 px-4 pr-10 rounded-2xl font-bold text-sm focus:outline-none focus:ring-4 focus:ring-primary-50/10 focus:border-primary-50 transition-all cursor-pointer shadow-sm"
            value={selectedChild.id}
            onChange={(e) => {
              const child = feeData.find(c => c.id === e.target.value);
              if (child) setSelectedChild(child);
            }}
          >
            {feeData.map(c => (
              <option key={c.id} value={c.id}>{c.name}'s Finances</option>
            ))}
          </select>
          <IoChevronDownOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
              <IoWalletOutline className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Outstanding</p>
              <p className="text-3xl font-black text-gray-800">${selectedChild.totalDue}</p>
            </div>
          </div>
          {selectedChild.totalDue > 0 ? (
            <button 
              onClick={handlePayment}
              disabled={isPaying}
              className="w-full py-3 bg-primary-100 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {isPaying ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><IoCardOutline className="text-lg" /> Pay Now</>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-green-500 font-bold bg-green-50 p-3 rounded-2xl justify-center text-sm">
              <IoCheckmarkCircleOutline className="text-lg" /> Fully Paid
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-50 text-green-500 rounded-2xl">
              <IoCheckmarkCircleOutline className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Paid</p>
              <p className="text-3xl font-black text-gray-800">${selectedChild.totalPaid}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium">For Academic Year 2025/2026</p>
        </div>

        <div className="bg-primary-50/5 p-6 rounded-3xl border border-dashed border-primary-50/20 flex flex-col justify-center">
          <div className="flex items-start gap-3">
             <IoInformationCircleOutline className="text-2xl text-primary-50 shrink-0 mt-1" />
             <div className="space-y-1">
               <p className="font-bold text-gray-800 text-sm">Automated Payments</p>
               <p className="text-xs text-gray-500 leading-relaxed">Enroll in auto-pay to avoid late fees. Next installment is due by Jan 15th.</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Breakdown */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-lg font-bold text-gray-800">Fee Breakdown</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: "Tuition Fees", value: selectedChild.tuition },
              { label: "Transport Services", value: selectedChild.transport },
              { label: "Extracurricular Activities", value: selectedChild.activities },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-medium">{item.label}</span>
                <span className="font-bold text-gray-800">${item.value}</span>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 -mx-6 px-6 py-4">
              <span className="font-black text-gray-800 uppercase text-xs tracking-widest">Total Fee Amount</span>
              <span className="text-xl font-black text-primary-50">${selectedChild.tuition + selectedChild.transport + selectedChild.activities}</span>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
            <button 
              onClick={handleExportHistory}
              className="text-xs font-black text-primary-50 uppercase tracking-widest hover:underline"
            >
              <IoDownloadOutline className="inline mr-1" /> Export CSV
            </button>
          </div>
          
          <div className="divide-y divide-gray-50 max-h-[300px] overflow-y-auto no-scrollbar">
            {displayedHistory.map((pay, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 text-gray-600 rounded-2xl">
                    <IoReceiptOutline className="text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{pay.id}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{pay.date} • {pay.method}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-gray-800">${pay.amount}</span>
                  <button 
                    onClick={() => handlePrint(pay.id)}
                    className="p-2 text-gray-400 hover:text-primary-50 hover:bg-primary-50/10 rounded-xl transition-all"
                  >
                    <IoPrintOutline className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-gray-50/50 text-center border-t border-gray-50">
            <button 
              onClick={() => setShowAllHistory(!showAllHistory)}
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-primary-50 transition-colors"
            >
              {showAllHistory ? "Show Less History" : "View All Transaction History"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentFees;
