import React from "react";
import { IoBookOutline, IoCalendarOutline, IoPeopleOutline, IoWalletOutline } from "react-icons/io5";

const ParentDashboard: React.FC = () => {
  const stats = [
    { label: "My Children", value: "2", icon: <IoPeopleOutline />, color: "bg-blue-500" },
    { label: "Attendance", value: "95%", icon: <IoBookOutline />, color: "bg-green-500" },
    { label: "Next Payment", value: "Jan 15", icon: <IoWalletOutline />, color: "bg-purple-500" },
    { label: "Next Event", value: "Dec 22", icon: <IoCalendarOutline />, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
        <p className="text-gray-500">Welcome back, Parent!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`${stat.color} p-3 rounded-lg text-white text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Children's Performance</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span>John Doe (Grade 10)</span>
              <span className="text-green-600 font-semibold">A-</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Jane Doe (Grade 8)</span>
              <span className="text-blue-600 font-semibold">B+</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              <p className="font-semibold">Parent-Teacher Meeting</p>
              <p className="text-gray-500 text-xs">Scheduled for next Friday at 3:00 PM</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              <p className="font-semibold">Tuition Fee Due</p>
              <p className="text-gray-500 text-xs">Payment for Q1 is due by the end of the month.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
