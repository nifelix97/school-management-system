import React, { useState } from "react";
import {
  IoCalendarOutline,
  IoFilterOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoSearchOutline,
  IoStatsChartOutline
} from "react-icons/io5";

interface AttendanceRecord {
  id: string;
  name: string;
  department: string;
  clockIn: string;
  clockOut: string | null;
  status: 'Late' | 'On Time' | 'Absent';
}

const AttendanceManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const [records] = useState<AttendanceRecord[]>([
    { id: "STAFF001", name: "John Doe", department: "Science", clockIn: "07:45 AM", clockOut: "04:30 PM", status: "On Time" },
    { id: "STAFF002", name: "Jane Smith", department: "Administration", clockIn: "08:15 AM", clockOut: null, status: "Late" },
    { id: "STAFF004", name: "Sarah Nakato", department: "Library", clockIn: "07:55 AM", clockOut: "05:00 PM", status: "On Time" },
    { id: "STAFF005", name: "David Okello", department: "Security", clockIn: "06:00 AM", clockOut: "06:00 PM", status: "On Time" },
    { id: "STAFF006", name: "Alex Mukasa", department: "Science", clockIn: "07:30 AM", clockOut: "04:00 PM", status: "On Time" },
    { id: "STAFF007", name: "Mary Atieno", department: "ICT", clockIn: "09:00 AM", clockOut: null, status: "Late" },
  ]);

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || record.status === statusFilter;
    const matchesDept = deptFilter === "All" || record.department === deptFilter;
    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-primary-50 tracking-tight">Attendance</h1>
          <p className="text-primary-50/40 font-bold uppercase text-[10px] tracking-widest mt-1">Monitor daily clock-in/out and staff activity</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 bg-white border border-gray-100 text-primary-50 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all shadow-sm font-black uppercase text-[10px] tracking-widest active:scale-95">
            <IoCalendarOutline className="text-lg" />
            <span>Today, Dec 26</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
          <p className="text-[10px] font-black text-primary-50/20 uppercase tracking-widest mb-1.5 leading-none">Present Today</p>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-primary-50">142</h3>
            <span className="text-[10px] font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-lg">+4</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
          <p className="text-[10px] font-black text-primary-50/20 uppercase tracking-widest mb-1.5 leading-none">Late Arrival</p>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-primary-50">8</h3>
            <span className="text-[10px] font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-lg">-2</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
          <p className="text-[10px] font-black text-primary-50/20 uppercase tracking-widest mb-1.5 leading-none">Absent</p>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-primary-50">6</h3>
            <span className="text-[10px] font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg uppercase">avg</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-[10px] font-black text-primary-50/20 uppercase tracking-widest mb-1 leading-none">On Leave</p>
            <h3 className="text-2xl font-black text-primary-50">5</h3>
          </div>
          <IoStatsChartOutline className="text-primary-50/10 text-2xl" />
        </div>
      </div>

      {/* Attendance Log Section */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <h2 className="text-xl font-black text-primary-50">Live Attendance Log</h2>
                <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                  Rolling
                </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative group">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-50/20 group-focus-within:text-primary-50 transition-colors" />
              <input
                type="text"
                placeholder="Search staff name..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold text-primary-50 focus:ring-4 focus:ring-primary-50/5 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select 
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold text-primary-50 appearance-none cursor-pointer focus:ring-4 focus:ring-primary-50/5"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="On Time">On Time</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>
              </select>
              <IoFilterOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-50/20 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold text-primary-50 appearance-none cursor-pointer focus:ring-4 focus:ring-primary-50/5"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                <option value="All">All Departments</option>
                <option value="Science">Science</option>
                <option value="Administration">Administration</option>
                <option value="Library">Library</option>
                <option value="Security">Security</option>
                <option value="ICT">ICT</option>
              </select>
              <IoFilterOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-50/20 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/40 border-b border-gray-100">
                <th className="px-8 py-5 text-[11px] font-black text-primary-50/30 uppercase tracking-widest">Staff Identification</th>
                <th className="px-8 py-5 text-[11px] font-black text-primary-50/30 uppercase tracking-widest">Department</th>
                <th className="px-8 py-5 text-[11px] font-black text-primary-50/30 uppercase tracking-widest">Clock In</th>
                <th className="px-8 py-5 text-[11px] font-black text-primary-50/30 uppercase tracking-widest">Clock Out</th>
                <th className="px-8 py-5 text-[11px] font-black text-primary-50/30 uppercase tracking-widest">Current Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRecords.length > 0 ? filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/50 transition-all duration-300 group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-primary-50/5 border border-primary-50/10 flex items-center justify-center text-primary-50 text-xs font-black shadow-inner shadow-primary-50/5 group-hover:scale-110 transition-transform">
                        {record.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-primary-50 tracking-tight leading-none mb-1">{record.name}</span>
                        <span className="text-[10px] font-black text-primary-50/20 tracking-widest">{record.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-black text-primary-50/40 uppercase tracking-wider">{record.department}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3 text-sm font-bold text-primary-50">
                      <div className="p-1.5 bg-green-50 rounded-lg text-green-500">
                        <IoLogInOutline />
                      </div>
                      <span className="tracking-tighter">{record.clockIn}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3 text-sm font-bold text-primary-50">
                      <div className={`p-1.5 rounded-lg ${record.clockOut ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-200"}`}>
                        <IoLogOutOutline />
                      </div>
                      <span className={`tracking-tighter ${!record.clockOut && "text-gray-200"}`}>{record.clockOut || "No Activity"}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      record.status === 'On Time' ? 'bg-green-100 text-green-700 shadow-sm shadow-green-100/50' : 
                      record.status === 'Absent' ? 'bg-red-100 text-red-700 shadow-sm shadow-red-100/50' : 
                      'bg-yellow-100 text-yellow-700 shadow-sm shadow-yellow-100/50'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center">
                    <p className="text-sm font-bold text-primary-50/20 uppercase tracking-widest">No attendance records found matching your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
