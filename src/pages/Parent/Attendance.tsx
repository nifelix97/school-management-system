import React, { useState } from "react";
import {
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoCloseCircleOutline,
    IoFilterOutline,
    IoStatsChartOutline,
    IoTimeOutline
} from "react-icons/io5";

interface AttendanceRecord {
  date: string;
  status: "Present" | "Absent" | "Late";
  subject: string;
  time: string;
}

interface ChildAttendance {
  id: string;
  name: string;
  overallPercentage: number;
  records: AttendanceRecord[];
}

const attendanceData: ChildAttendance[] = [
  {
    id: "STD-101",
    name: "John Doe",
    overallPercentage: 96,
    records: [
      { date: "2025-12-18", status: "Present", subject: "Mathematics", time: "08:00 AM" },
      { date: "2025-12-18", status: "Present", subject: "Science", time: "10:00 AM" },
      { date: "2025-12-17", status: "Late", subject: "English", time: "08:15 AM" },
      { date: "2025-12-16", status: "Present", subject: "History", time: "01:00 PM" },
      { date: "2025-12-15", status: "Absent", subject: "Physics", time: "09:00 AM" },
    ]
  },
  {
    id: "STD-202",
    name: "Jane Doe",
    overallPercentage: 94,
    records: [
      { date: "2025-12-18", status: "Present", subject: "Art", time: "09:00 AM" },
      { date: "2025-12-18", status: "Present", subject: "Biology", time: "11:00 AM" },
      { date: "2025-12-17", status: "Present", subject: "Geography", time: "10:00 AM" },
      { date: "2025-12-16", status: "Present", subject: "Music", time: "02:00 PM" },
      { date: "2025-12-15", status: "Present", subject: "Math", time: "08:00 AM" },
    ]
  }
];

const Attendance: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState(attendanceData[0]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "text-green-600 bg-green-50 border-green-100";
      case "Absent": return "text-red-600 bg-red-50 border-red-100";
      case "Late": return "text-amber-600 bg-amber-50 border-amber-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present": return <IoCheckmarkCircleOutline />;
      case "Absent": return <IoCloseCircleOutline />;
      case "Late": return <IoTimeOutline />;
      default: return null;
    }
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 2, selectedChild.records.length));
      setIsLoading(false);
    }, 800);
  };

  const visibleRecords = selectedChild.records.slice(0, visibleCount);
  const hasMore = visibleCount < selectedChild.records.length;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">Attendance Tracker</h1>
          <p className="text-gray-500 text-sm sm:text-base">Monitor your children's daily attendance and punctuality.</p>
        </div>
        
        <div className="w-full md:w-72 relative">
          <select 
            className="appearance-none w-full bg-white border-2 border-gray-100 text-gray-800 py-3 px-4 pr-10 rounded-2xl font-bold text-sm focus:outline-none focus:ring-4 focus:ring-primary-50/10 focus:border-primary-50 transition-all cursor-pointer shadow-sm hover:border-gray-200"
            onChange={(e) => {
              const child = attendanceData.find(c => c.id === e.target.value);
              if (child) {
                setSelectedChild(child);
                setVisibleCount(3); // Reset visible count when switching children
              }
            }}
            value={selectedChild.id}
          >
            {attendanceData.map(child => (
              <option key={child.id} value={child.id}>{child.name} - {child.id}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <IoChevronDownOutline className="text-lg" />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-50/10 text-primary-50 rounded-2xl">
              <IoStatsChartOutline className="text-2xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overall Rate</p>
              <p className="text-2xl font-black text-gray-800">{selectedChild.overallPercentage}%</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-gray-400">Monthly Progress</span>
              <span className="text-green-500">+2.4%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-primary-50 h-full rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(var(--color-primary-50),0.3)]" 
                style={{ width: `${selectedChild.overallPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary-100/10 text-primary-100 rounded-2xl">
              <IoCalendarOutline className="text-2xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">This Month</p>
              <p className="text-2xl font-black text-gray-800">20 Days Total</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50/50 p-3 rounded-2xl text-center">
              <p className="text-xl font-black text-green-600">18</p>
              <p className="text-[10px] font-bold text-green-600/70 uppercase">Present</p>
            </div>
            <div className="bg-amber-50/50 p-3 rounded-2xl text-center">
              <p className="text-xl font-black text-amber-600">1</p>
              <p className="text-[10px] font-bold text-amber-600/70 uppercase">Late</p>
            </div>
            <div className="bg-red-50/50 p-3 rounded-2xl text-center">
              <p className="text-xl font-black text-red-600">1</p>
              <p className="text-[10px] font-bold text-red-600/70 uppercase">Absent</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-300 to-primary-300/80 p-6 rounded-3xl text-white shadow-lg shadow-primary-300/20 hidden lg:flex flex-col justify-center relative overflow-hidden">
           <div className="relative z-10">
             <p className="text-lg font-bold leading-tight mb-2 opacity-90">
               "{selectedChild.name} is showing excellent consistency in attendance."
             </p>
             <p className="text-sm font-black uppercase tracking-widest text-white/60">— Counselor Note</p>
           </div>
           <IoCheckmarkCircleOutline className="absolute -bottom-4 -right-4 text-9xl opacity-10 rotate-12" />
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Attendance Log</h2>
          <button className="flex items-center gap-2 text-sm font-bold text-primary-50 bg-primary-50/5 px-4 py-2 rounded-xl hover:bg-primary-50/10 transition-colors">
            <IoFilterOutline /> <span className="hidden sm:inline">Detailed Filter</span>
          </button>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/30">
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Subject</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Time</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {visibleRecords.map((record, index) => (
                <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-sm text-gray-700 font-bold">{record.date}</td>
                  <td className="px-8 py-5 text-sm text-gray-600 font-medium">{record.subject}</td>
                  <td className="px-8 py-5 text-sm text-gray-500">
                    <span className="flex items-center gap-2 group-hover:text-primary-50 transition-colors"><IoTimeOutline className="text-lg" /> {record.time}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-gray-50">
          {visibleRecords.map((record, index) => (
            <div key={index} className="p-4 space-y-3 hover:bg-gray-50/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{record.date}</p>
                  <p className="text-base font-bold text-gray-800">{record.subject}</p>
                </div>
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(record.status)}`}>
                  {getStatusIcon(record.status)}
                  {record.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <IoTimeOutline className="text-lg text-primary-50" />
                <span>Scheduled at {record.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50/30 text-center border-t border-gray-50">
          {hasMore ? (
            <button 
              onClick={handleLoadMore}
              disabled={isLoading}
              className="text-sm font-black text-primary-50 uppercase tracking-widest hover:text-primary-600 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-50 border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : "Load More History"}
            </button>
          ) : (
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">End of History</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
