import React, { useState } from "react";
import { IoCalendarOutline, IoDocumentTextOutline, IoDownloadOutline } from "react-icons/io5";

const DeanReports: React.FC = () => {
    const [selectedReport, setSelectedReport] = useState("Enrollment");

    // Mock chart data (CSS)
    const enrollmentData = [65, 78, 80, 50, 90, 85, 70];
    const facultyData = [40, 55, 60, 45, 95, 75, 80];

    const currentData = selectedReport === "Enrollment" ? enrollmentData : facultyData;
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <div className="p-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
            <h1 className="text-2xl font-bold text-primary-50">Reports & Analytics</h1>
            <p className="text-gray-500 text-sm mt-1">Generate and view department performance reports</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 bg-white">
                <IoCalendarOutline /> This Semester
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-primary-50 text-white bg-primary-50 rounded-lg hover:bg-primary-50/90 shadow-sm">
                <IoDownloadOutline /> Export PDF
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {["Enrollment", "Faculty Perf.", "Budget", "Research"].map(reportType => (
              <button 
                key={reportType}
                onClick={() => setSelectedReport(reportType)}
                className={`p-4 rounded-xl border text-left transition-all ${
                    selectedReport === reportType 
                    ? "border-primary-50 bg-primary-50/5 ring-1 ring-primary-50" 
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                  <p className={`text-sm font-medium ${selectedReport === reportType ? "text-primary-50" : "text-gray-500"}`}>{reportType} Report</p>
                  <p className="text-lg font-bold text-primary-50 mt-1">View Details</p>
              </button>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-primary-50 mb-6">{selectedReport} Trends</h2>
            <div className="h-64 flex items-end justify-between gap-4 px-2">
                {currentData.map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                        <div className="relative w-full bg-gray-100 rounded-t-lg h-full overflow-hidden">
                            <div 
                                className="absolute bottom-0 left-0 right-0 bg-primary-50 transition-all duration-700 ease-out group-hover:bg-primary-50/80"
                                style={{ height: `${val}%` }}
                            />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {val}%
                            </div>
                        </div>
                        <span className="text-xs font-medium text-gray-500">{labels[i]}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Quick Downloads */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-primary-50 mb-4">Available Reports</h2>
            <div className="space-y-3">
                {[
                    { title: "Semester Summary Q4", size: "2.4 MB", date: "Dec 10, 2024" },
                    { title: "Faculty Activity Log", size: "1.1 MB", date: "Dec 08, 2024" },
                    { title: "Student Retention Analysis", size: "3.5 MB", date: "Nov 30, 2024" },
                    { title: "Budget Utilization", size: "850 KB", date: "Nov 15, 2024" },
                ].map((file, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                            <IoDocumentTextOutline className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-primary-50">{file.title}</p>
                            <p className="text-xs text-gray-500">{file.date} • {file.size}</p>
                        </div>
                        <button className="text-gray-400 hover:text-primary-50">
                            <IoDownloadOutline />
                        </button>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                View All Files
            </button>
        </div>
      </div>
    </div>
  );
};

export default DeanReports;
