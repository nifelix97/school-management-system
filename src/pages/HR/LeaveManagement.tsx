import React, { useState } from "react";
import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoInformationCircleOutline
} from "react-icons/io5";

interface LeaveRequest {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const LeaveManagement: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    { id: "LR001", name: "John Doe", type: "Sick Leave", startDate: "2025-12-28", endDate: "2025-12-30", days: 3, reason: "Medical checkup", status: "Pending" },
    { id: "LR002", name: "Robert Musoke", type: "Annual Leave", startDate: "2026-01-05", endDate: "2026-01-15", days: 10, reason: "Family vacation", status: "Pending" },
    { id: "LR003", name: "Jane Smith", type: "Personal Leave", startDate: "2025-12-27", endDate: "2025-12-27", days: 1, reason: "Emergency", status: "Rejected" },
    { id: "LR004", name: "Sarah Nakato", type: "Maternity Leave", startDate: "2026-02-01", endDate: "2026-05-01", days: 90, reason: "Maternity", status: "Approved" },
  ]);

  const [notification, setNotification] = useState<{ show: boolean, msg: string, success: boolean }>({ show: false, msg: "", success: true });

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    setNotification({
      show: true,
      msg: `Leave request ${newStatus.toLowerCase()} successfully!`,
      success: newStatus === 'Approved'
    });
    setTimeout(() => setNotification({ show: false, msg: "", success: true }), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Dynamic Notification */}
      {notification.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
           <div className={`${notification.success ? 'bg-green-500' : 'bg-red-500'} text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold`}>
              {notification.success ? <IoCheckmarkCircleOutline className="text-2xl" /> : <IoCloseCircleOutline className="text-2xl" />}
              <span>{notification.msg}</span>
           </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-50 tracking-tight">Leave Management</h1>
        <p className="text-primary-50/40 font-bold uppercase text-[10px] tracking-widest mt-1">Review and manage staff leave applications</p>
      </div>

      {/* Leave Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-[11px] font-black text-primary-50/30 uppercase tracking-widest">Pending Requests</p>
            <h3 className="text-3xl font-black text-primary-50 mt-1">12</h3>
          </div>
          <div className="p-3 bg-yellow-50 rounded-xl">
            <IoInformationCircleOutline className="text-yellow-600 text-xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-[11px] font-black text-primary-50/30 uppercase tracking-widest">On Leave Now</p>
            <h3 className="text-3xl font-black text-primary-50 mt-1">8</h3>
          </div>
          <div className="p-3 bg-primary-50/5 rounded-xl">
            <IoCalendarOutline className="text-primary-50 text-xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-[11px] font-black text-primary-50/30 uppercase tracking-widest">Upcoming Leaves</p>
            <h3 className="text-3xl font-black text-primary-50 mt-1">5</h3>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
             <IoCalendarOutline className="text-green-600 text-xl" />
          </div>
        </div>
      </div>

      {/* Request List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/30">
          <h2 className="text-xl font-black text-primary-50">Leave Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Staff Name</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Duration</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-primary-50/50 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-primary-50">{request.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-primary-50/60 uppercase">{request.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-primary-50 uppercase tracking-tight">{request.days} Days</span>
                      <span className="text-[11px] font-bold text-primary-50/30 uppercase tracking-tighter">{request.startDate} to {request.endDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                      request.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {request.status === 'Pending' ? (
                        <>
                          <button 
                            onClick={() => handleAction(request.id, 'Approved')}
                            className="flex items-center gap-1.5 bg-green-500 text-white px-4 py-1.5 rounded-xl text-[10px] font-black hover:bg-green-600 transition-all shadow-sm active:scale-95 uppercase tracking-widest"
                          >
                            <IoCheckmarkCircleOutline className="text-sm" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleAction(request.id, 'Rejected')}
                            className="flex items-center gap-1.5 bg-red-500 text-white px-4 py-1.5 rounded-xl text-[10px] font-black hover:bg-red-600 transition-all shadow-sm active:scale-95 uppercase tracking-widest"
                          >
                            <IoCloseCircleOutline className="text-sm" />
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-black text-primary-50/20 uppercase tracking-widest px-4 py-1.5">Processed</span>
                      )}
                      <button className="p-2 hover:bg-gray-100 rounded-xl text-primary-50/40 transition-colors" title="View Details">
                        <IoInformationCircleOutline />
                      </button>
                    </div>
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

export default LeaveManagement;
