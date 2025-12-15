import React from "react";
import { IoFilterOutline, IoTrendingUpOutline, IoWarningOutline } from "react-icons/io5";

const StudentOversight: React.FC = () => {
    // Mock data for "CSS charts"
    const performanceData = [
        { label: "Year 1", value: 85, color: "bg-blue-500" },
        { label: "Year 2", value: 78, color: "bg-purple-500" },
        { label: "Year 3", value: 92, color: "bg-green-500" },
        { label: "Year 4", value: 88, color: "bg-orange-500" },
    ];

    const atRiskStudents = [
        { id: 1, name: "John Doe", idNumber: "ST-2023-001", gpa: 1.8, issue: "Low Attendance", year: 1 },
        { id: 2, name: "Jane Smith", idNumber: "ST-2022-045", gpa: 2.1, issue: "Failed Midterms", year: 2 },
        { id: 3, name: "Michael Johnson", idNumber: "ST-2021-112", gpa: 1.9, issue: "Academic Probation", year: 3 },
    ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-primary-50">Student Oversight</h1>
            <p className="text-gray-500 text-sm mt-1">Monitor student performance and retention</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
          <IoFilterOutline /> Filter View
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex justify-between items-start">
                <div>
                     <p className="text-sm text-gray-500 font-medium">Total Enrollment</p>
                     <p className="text-3xl font-bold text-primary-50 mt-2">3,450</p>
                </div>
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <IoTrendingUpOutline className="w-5 h-5" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600 font-medium">
                <span>+12% from last semester</span>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-green-50 rounded-full opacity-50" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
             <div className="flex justify-between items-start">
                <div>
                     <p className="text-sm text-gray-500 font-medium">Dean's List</p>
                     <p className="text-3xl font-bold text-primary-50 mt-2">850</p>
                </div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <IoTrendingUpOutline className="w-5 h-5" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-blue-600 font-medium">
                <span>Top 25% of students</span>
            </div>
             <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-50 rounded-full opacity-50" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
             <div className="flex justify-between items-start">
                <div>
                     <p className="text-sm text-gray-500 font-medium">At Risk</p>
                     <p className="text-3xl font-bold text-primary-50 mt-2">42</p>
                </div>
                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <IoWarningOutline className="w-5 h-5" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-red-600 font-medium">
                <span>Requires immediate attention</span>
            </div>
             <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-red-50 rounded-full opacity-50" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart Mockup */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-primary-50 mb-6">Average GPA by Year</h2>
            <div className="h-64 flex items-end justify-around gap-4 px-4 pb-4 border-b border-gray-100">
                {performanceData.map((data, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 w-full group">
                        <div className="relative w-full max-w-[60px] h-full flex items-end">
                            <div 
                                className={`w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80 ${data.color}`} 
                                style={{ height: `${data.value}%` }} 
                            />
                             <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                {(data.value / 25).toFixed(1)}
                            </span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{data.label}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* At Risk List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h2 className="text-lg font-bold text-primary-50 mb-4">Students Requiring Attention</h2>
             <div className="space-y-4">
                {atRiskStudents.map(student => (
                    <div key={student.id} className="p-3 rounded-lg border border-red-100 bg-red-50/30 flex items-start gap-3">
                        <div className="w-1.5 h-1.5 mt-2 rounded bg-red-500 shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-primary-50">{student.name} <span className="text-xs font-normal text-gray-500">({student.idNumber})</span></p>
                            <p className="text-xs text-red-600 font-medium mt-0.5">{student.issue}</p>
                            <div className="flex gap-2 mt-2">
                                <span className="text-[10px] px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-600">GPA: {student.gpa}</span>
                                <span className="text-[10px] px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-600">Year {student.year}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="w-full py-2 text-sm text-center text-primary-50 hover:bg-primary-50/5 rounded-lg transition-colors">
                    View All At-Risk Students
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOversight;
