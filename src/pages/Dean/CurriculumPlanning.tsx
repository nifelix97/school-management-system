import React, { useState } from "react";
import { IoAddCircleOutline, IoBookOutline, IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";

const CurriculumPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  // Mock Data
  const courses = [
    { id: "CS101", title: "Intro to Computer Science", credits: 4, status: "Active" },
    { id: "CS202", title: "Data Structures", credits: 4, status: "Active" },
    { id: "ENG101", title: "English Composition", credits: 3, status: "Under Review" },
  ];

  const proposals = [
    { id: 1, title: "New Course: AI Ethics", submittedBy: "Dr. A. Smith", date: "2024-12-01", status: "Pending" },
    { id: 2, title: "Syllabus Update: Physics 101", submittedBy: "Prof. B. Jones", date: "2024-12-05", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-50">
            Curriculum Planning
          </h1>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold self-end sm:self-auto">
            <IoAddCircleOutline className="w-5 h-5" />
            <span className="text-sm">New Proposal</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6 overflow-x-auto">
        {[
          { id: "Overview", icon: <IoBookOutline /> },
          { id: "Courses", icon: <IoBookOutline /> },
          { id: "New Proposals", icon: <IoAddCircleOutline /> },
          { id: "Review History", icon: <IoCheckmarkCircleOutline /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.id}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Overview" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              <div className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-primary-50/80 opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-2 sm:p-2.5 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                      <IoBookOutline className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-blue-800">Total Courses</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-900">48</p>
                </div>
              </div>

              <div className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-100/80 opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-2 sm:p-2.5 bg-orange-50 rounded-lg text-orange-600 shrink-0">
                      <IoTimeOutline className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-orange-800">Pending Reviews</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-900">5</p>
                </div>
              </div>

              <div className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200 to-primary-200/80 opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-2 sm:p-2.5 bg-green-50 rounded-lg text-green-600 shrink-0">
                      <IoCheckmarkCircleOutline className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-green-800">Approved This Year</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-900">12</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-100">
              <h3 className="font-bold text-primary-50 mb-3 text-sm sm:text-base">Curriculum Goal Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 h-2.5 rounded-full transition-all duration-700" style={{ width: "70%" }}></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">70% of annual curriculum updates completed</p>
            </div>
          </div>
        )}

        {activeTab === "Courses" && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-primary-50 px-2 sm:px-0">Course List</h2>
            
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-primary-50 text-base mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.id}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${course.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-600">{course.credits} Credits</span>
                    <button className="text-primary-50 hover:underline text-sm font-semibold">Edit</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                    <th className="px-6 py-4 text-left">Course ID</th>
                    <th className="px-6 py-4 text-left">Title</th>
                    <th className="px-6 py-4 text-left">Credits</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-primary-50 text-sm">{course.id}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{course.title}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{course.credits}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${course.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary-50 hover:underline text-sm font-semibold">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "New Proposals" && (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 sm:p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-primary-50 text-base sm:text-lg mb-1 truncate">{proposal.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">Submitted by {proposal.submittedBy} on {proposal.date}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors whitespace-nowrap">Approve</button>
                    <button className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors whitespace-nowrap">Reject</button>
                    <button className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap">View Details</button>
                  </div>
                </div>
              </div>
            ))}
            {proposals.length === 0 && <p className="text-gray-500 text-sm text-center py-8">No pending proposals.</p>}
          </div>
        )}

        {activeTab === "Review History" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center">
            <p className="text-gray-500 text-sm sm:text-base">No review history available for this semester.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumPlanning;
