import React from "react";
import {
    IoBookOutline,
    IoClipboardOutline,
    IoPeopleOutline,
    IoSchoolOutline,
} from "react-icons/io5";

const DeanDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary-50 mb-6">Dean Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-50/10 flex items-center justify-center text-primary-50">
            <IoPeopleOutline className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Faculty</p>
            <p className="text-2xl font-bold text-primary-50">124</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <IoSchoolOutline className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Students</p>
            <p className="text-2xl font-bold text-primary-50">3,450</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <IoBookOutline className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Programs</p>
            <p className="text-2xl font-bold text-primary-50">18</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <IoClipboardOutline className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Avg Grade</p>
            <p className="text-2xl font-bold text-primary-50">3.4 GPA</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-primary-50 mb-4">
            Recent Activities
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-2 h-2 mt-2 rounded-full bg-primary-50 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-primary-50">
                    Curriculum review meeting scheduled
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-primary-50 mb-4">
             Upcoming Events
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg border border-gray-100"
              >
                <div className="text-center px-3 py-1 bg-gray-50 rounded-lg">
                  <p className="text-xs font-bold text-primary-50">DEC</p>
                  <p className="text-lg font-bold text-primary-50">{10 + i}</p>
                </div>
                 <div>
                  <p className="text-sm font-medium text-primary-50">
                    Departmental Board Meeting
                  </p>
                  <p className="text-xs text-gray-500">10:00 AM - 12:00 PM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeanDashboard;
