import React from "react";
import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoChevronForwardOutline, IoSearchOutline } from "react-icons/io5";

const AssessmentsGrading: React.FC = () => {
    const gradeSubmissions = [
        { id: 1, course: "CS101 - Intro to CS", instructor: "Dr. Sarah Wilson", submitted: "2 days ago", status: "Pending Approval", progress: 100 },
        { id: 2, course: "ENG202 - Creative Writing", instructor: "Prof. John Doe", submitted: "5 hours ago", status: "Pending Approval", progress: 100 },
        { id: 3, course: "MATH301 - Linear Algebra", instructor: "Dr. Emily Davis", submitted: "1 week ago", status: "Approved", progress: 100 },
    ];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-primary-50 mb-6">Assessments & Grading</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Pending Approvals</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-50 mt-1">12</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                <IoAlertCircleOutline className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Grades Finalized</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-50 mt-1">85%</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-green-100 text-green-600 rounded-lg">
                <IoCheckmarkCircleOutline className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
        </div>
         <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Grade Appeals</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-50 mt-1">3</p>
            </div>
            <div className="p-1.5 sm:p-2 bg-blue-100 text-blue-600 rounded-lg">
                <IoAlertCircleOutline className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-3 sm:p-4 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <h2 className="text-base sm:text-lg font-bold text-primary-50">Grade Submissions</h2>
            <div className="relative w-full sm:w-64">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search course or instructor..."
                    className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-50/20"
                />
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase font-semibold">
                        <th className="px-3 sm:px-6 py-3 sm:py-4">Course</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">Instructor</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">Submitted</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4">Status</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {gradeSubmissions.map(sub => (
                        <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-primary-50 text-sm">
                                {sub.course}
                                <p className="text-xs text-gray-500 md:hidden mt-0.5">{sub.instructor}</p>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-sm hidden md:table-cell">{sub.instructor}</td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 text-xs sm:text-sm hidden sm:table-cell">{sub.submitted}</td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    sub.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {sub.status}
                                </span>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                                <button className="text-gray-400 hover:text-primary-50 transition-colors">
                                    <IoChevronForwardOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
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

export default AssessmentsGrading;
