import React, { useState } from "react";
import { IoCheckmarkDoneOutline, IoTrashOutline } from "react-icons/io5";

const DeanNotifications: React.FC = () => {
    const [notifications] = useState([
        { id: 1, title: "Curriculum Approval Needed", message: "Please review the new CS curriculum proposal.", time: "2 hrs ago", unread: true },
        { id: 2, title: "Faculty Meeting", message: "Reminder: Monthly faculty meeting tomorrow at 10 AM.", time: "1 day ago", unread: false },
    ]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-50">Notifications</h1>
         <div className="flex gap-2">
            <button className="p-2 text-gray-500 hover:text-primary-50" title="Mark all as read"><IoCheckmarkDoneOutline className="w-5 h-5" /></button>
            <button className="p-2 text-gray-500 hover:text-red-500" title="Clear all"><IoTrashOutline className="w-5 h-5" /></button>
         </div>
      </div>

      <div className="space-y-3">
        {notifications.map(notif => (
            <div key={notif.id} className={`p-4 rounded-xl border ${notif.unread ? "bg-white border-primary-50/30 shadow-sm" : "bg-gray-50 border-gray-100"}`}>
                <div className="flex justify-between items-start">
                    <h3 className={`font-semibold ${notif.unread ? "text-gray-900" : "text-gray-600"}`}>{notif.title}</h3>
                    <span className="text-xs text-gray-400">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default DeanNotifications;
