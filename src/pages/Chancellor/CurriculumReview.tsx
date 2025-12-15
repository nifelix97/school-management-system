import React, { useState } from "react";
import {
    IoBookOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoDocumentTextOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingUpOutline,
    IoWarningOutline,
} from "react-icons/io5";

interface CurriculumProgram {
  id: string;
  programName: string;
  department: string;
  level: "Undergraduate" | "Graduate" | "Doctoral";
  lastReview: string;
  nextReview: string;
  status: "Current" | "Pending Review" | "Under Revision" | "Approved";
  complianceScore: number;
  credits: number;
}

interface ReviewRequest {
  id: string;
  programName: string;
  department: string;
submittedBy: string;
  submittedDate: string;
  type: "Major Update" | "Minor Revision" | "New Program" | "Deactivation";
  reason: string;
  urgency: "High" | "Medium" | "Low";
}

const CurriculumReview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "programs" | "requests" | "compliance">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<CurriculumProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ReviewRequest | null>(null);
  const [isRequestDetailsModalOpen, setIsRequestDetailsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Mock data for Curriculum Programs
  const programs: CurriculumProgram[] = [
    {
      id: "1",
      programName: "Bachelor of Computer Science",
      department: "Computer Science",
      level: "Undergraduate",
      lastReview: "2022-09-15",
      nextReview: "2025-09-15",
      status: "Current",
      complianceScore: 95,
      credits: 120
    },
    {
      id: "2",
      programName: "Master of Business Administration",
      department: "Business",
      level: "Graduate",
      lastReview: "2023-01-20",
      nextReview: "2026-01-20",
      status: "Current",
      complianceScore: 92,
      credits: 60
    },
    {
      id: "3",
      programName: "Bachelor of Nursing",
      department: "Nursing",
      level: "Undergraduate",
      lastReview: "2021-06-10",
      nextReview: "2024-12-31",
      status: "Pending Review",
      complianceScore: 88,
      credits: 128
    },
    {
      id: "4",
      programName: "PhD in Engineering",
      department: "Engineering",
      level: "Doctoral",
      lastReview: "2023-03-15",
      nextReview: "2026-03-15",
     status: "Under Revision",
      complianceScore: 90,
      credits: 90
    },
    {
      id: "5",
      programName: "Bachelor of Arts in Psychology",
      department: "Psychology",
      level: "Undergraduate",
      lastReview: "2023-08-01",
      nextReview: "2026-08-01",
      status: "Approved",
      complianceScore: 94,
      credits: 120
    },
  ];

  // Mock data for Review Requests
  const reviewRequests: ReviewRequest[] = [
    {
      id: "1",
      programName: "Bachelor of Data Science",
      department: "Computer Science",
      submittedBy: "Dr. Sarah Johnson (Department Head)",
      submittedDate: "2024-11-15",
      type: "New Program",
      reason: "Growing industry demand for data science professionals",
      urgency: "High"
    },
    {
      id: "2",
      programName: "Master of Artificial Intelligence",
      department: "Computer Science",
      submittedBy: "Prof. Michael Chen (Program Coordinator)",
      submittedDate: "2024-11-20",
      type: "Major Update",
      reason: "Integration of latest AI technologies and frameworks",
      urgency: "Medium"
    },
    {
      id: "3",
      programName: "Bachelor of Environmental Science",
      department: "Environmental Studies",
      submittedBy: "Dr. Emma Wilson (Department Head)",
      submittedDate: "2024-11-25",
      type: "Minor Revision",
      reason: "Updated course materials and learning outcomes",
      urgency: "Low"
    },
  ];

  // Statistics
  const stats = [
    {
      title: "Active Programs",
      value: "156",
      change: "+12",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoSchoolOutline className="w-7 h-7" />,
      gradient: "from-primary-50 to-primary-50/80",
    },
    {
      title: "Pending Reviews",
      value: "8",
      change: "+3",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoTimeOutline className="w-7 h-7" />,
      gradient: "from-primary-100 to-primary-100/80",
    },
    {
      title: "Compliance Rate",
      value: "94%",
      change: "+2%",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoShieldCheckmarkOutline className="w-7 h-7" />,
      gradient: "from-primary-200 to-primary-200/80",
    },
    {
      title: "Total Credits",
      value: "18,240",
      change: "+480",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoBookOutline className="w-7 h-7" />,
      gradient: "from-primary-300 to-primary-300/80",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current":
      case "Approved":
        return "bg-green-100 text-green-600 border-green-200";
      case "Pending Review":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "Under Revision":
        return "bg-blue-100 text-blue-600 border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Undergraduate":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "Graduate":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Doctoral":
        return "bg-green-100 text-green-600 border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-600 border-red-200";
      case "Medium":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "Low":
        return "bg-blue-100 text-blue-600 border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "all" || program.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Curriculum Review & Management
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Oversee academic programs, review curriculum changes, and ensure educational quality
            </p>
          </div>
          <button 
            onClick={() => setIsRequestModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <IoCheckmarkCircleOutline className="w-5 h-5" />
            Review Requests
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl text-white shadow-md`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    stat.trend === 'up' ? 'bg-green-50 text-green-600' : 
                    stat.trend === 'down' ? 'bg-red-50 text-red-600' : 
                    'bg-gray-50 text-gray-600'
                }`}>
                  <IoTrendingUpOutline className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  {stat.change}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-primary-50/60 mb-1 font-medium uppercase tracking-wide">
                {stat.title}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary-50">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6 overflow-x-auto animate-[slideUp_0.6s_ease-out]">
        {[
          { id: "overview", label: "Overview", icon: <IoStatsChartOutline /> },
          { id: "programs", label: "Programs", icon: <IoSchoolOutline /> },
          { id: "requests", label: "Review Requests", icon: <IoDocumentTextOutline /> },
          { id: "compliance", label: "Compliance", icon: <IoShieldCheckmarkOutline /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-[scaleIn_0.5s_ease-out]">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Programs by Level</h2>
              <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-2 border-b border-gray-100">
                {[
                  { level: "Undergraduate", count: 85, color: "bg-purple-500" },
                  { level: "Graduate", count: 52, color: "bg-blue-500" },
                  { level: "Doctoral", count: 19, color: "bg-green-500" },
                ].map((item, index) => {
                  const maxCount = 100;
                  const heightPercentage = (item.count / maxCount) * 100;
                  
                  return (
                    <div key={index} className="flex flex-col items-center gap-2 w-full group">
                      <div className="relative w-full flex justify-center items-end h-48">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${item.color} opacity-90 group-hover:opacity-100 relative group-hover:scale-y-105 origin-bottom`}
                          style={{ height: `${heightPercentage}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.count} Programs
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-primary-50">{item.level}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Upcoming Reviews</h2>
              <div className="space-y-4">
                {[
                  { program: "Bachelor of Nursing", date: "Dec 31, 2024", priority: "high", icon: <IoWarningOutline /> },
                  { program: "Master of Education", date: "Jan 15, 2025", priority: "medium", icon: <IoTimeOutline /> },
                  { program: "PhD in Physics", date: "Feb 20, 2025", priority: "low", icon: <IoCalendarOutline /> },
                  { program: "Bachelor of Economics", date: "Mar 10, 2025", priority: "low", icon: <IoCalendarOutline /> },
                ].map((review, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                    <div className={`p-3 rounded-full h-fit ${
                      review.priority === 'high' ? 'bg-red-100 text-red-600' :
                      review.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {review.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-primary-50">{review.program}</h4>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          review.priority === 'high' ? 'bg-red-100 text-red-600' :
                          review.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {review.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-primary-50/70">
                        <IoCalendarOutline className="w-4 h-4" />
                        {review.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "programs" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["all", "Undergraduate", "Graduate", "Doctoral"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedLevel(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedLevel === filter
                          ? "bg-primary-50 text-white shadow-md"
                          : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                      }`}
                    >
                      {filter === "all" ? "All Levels" : filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-50 mb-1 line-clamp-2">{program.programName}</h3>
                      <p className="text-sm text-primary-50/60">{program.department}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(program.level)}`}>
                      {program.level}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="text-primary-50/70">Credits:</span>
                      <p className="font-semibold text-primary-50">{program.credits}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-primary-50/70">Next Review:</span>
                      <p className="font-semibold text-primary-50">{new Date(program.nextReview).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-primary-50/70">Compliance</span>
                      <span className="font-bold text-primary-50">{program.complianceScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          program.complianceScore >= 90 ? 'bg-green-500' :
                          program.complianceScore >= 80 ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: `${program.complianceScore}%` }}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedProgram(program);
                      setIsModalOpen(true);
                    }}
                    className="w-full py-2 bg-gray-100 hover:bg-primary-50 hover:text-white text-primary-50 rounded-lg font-semibold text-sm transition-all"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white rounded-xl shadow-md border border-gray-100 p-4">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IoChevronBackOutline className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-primary-50">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <IoChevronForwardOutline className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "requests" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Pending Curriculum Review Requests</h2>
            <div className="space-y-4">
              {reviewRequests.map((request) => (
                <div key={request.id} className="p-5 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 bg-gradient-to-br from-white to-gray-50/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-50 mb-1">{request.programName}</h3>
                      <p className="text-sm text-primary-50/70">{request.department}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <span className="text-primary-50/60">Type:</span>
                      <p className="font-semibold text-primary-50">{request.type}</p>
                    </div>
                    <div>
                      <span className="text-primary-50/60">Submitted By:</span>
                      <p className="font-semibold text-primary-50">{request.submittedBy}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-primary-50/60">Reason:</span>
                      <p className="font-semibold text-primary-50">{request.reason}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        alert(`Request "${request.programName}" has been approved!`);
                      }}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-all"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => {
                        alert(`Request changes for "${request.programName}"`);
                      }}
                      className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold text-sm hover:bg-amber-600 transition-all"
                    >
                      Request Revision
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedRequest(request);
                        setIsRequestDetailsModalOpen(true);
                      }}
                      className="flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Curriculum Compliance Standards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { standard: "Learning Outcomes Alignment", score: 96, status: "Excellent" },
                { standard: "Credit Hour Distribution", score: 92, status: "Good" },
                { standard: "Faculty Qualifications", score: 88, status: "Good" },
                { standard: "Course Prerequisites", score: 94, status: "Excellent" },
                { standard: "Assessment Methods", score: 90, status: "Good" },
                { standard: "Industry Relevance", score: 85, status: "Satisfactory" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-primary-50">{item.standard}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.score >= 90 ? 'bg-green-100 text-green-600' :
                      item.score >= 80 ? 'bg-blue-100 text-blue-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-primary-50/70">Compliance Score</span>
                      <span className="font-bold text-primary-50">{item.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          item.score >= 90 ? 'bg-green-500' :
                          item.score >= 80 ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Program Details Modal */}
      {isModalOpen && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-4 sm:p-6 rounded-t-2xl flex justify-between items-start sticky top-0">
              <div className="flex-1 pr-2">
                <h2 className="text-lg sm:text-2xl font-bold mb-1">{selectedProgram.programName}</h2>
                <p className="text-white/90 text-xs sm:text-sm">{selectedProgram.department} • {selectedProgram.level}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <IoCloseOutline className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(selectedProgram.status)}`}>
                  {selectedProgram.status}
                </span>
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getLevelColor(selectedProgram.level)}`}>
                  {selectedProgram.level}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Total Credits</div>
                  <div className="font-bold text-primary-50">{selectedProgram.credits}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Compliance Score</div>
                  <div className="font-bold text-primary-50">{selectedProgram.complianceScore}%</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Last Review</div>
                  <div className="font-bold text-primary-50">{new Date(selectedProgram.lastReview).toLocaleDateString()}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Next Review</div>
                  <div className="font-bold text-primary-50">{new Date(selectedProgram.nextReview).toLocaleDateString()}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-primary-50 mb-2">Program Overview</h3>
                <p className="text-sm text-primary-50/70 leading-relaxed">
                  The {selectedProgram.programName} is a comprehensive {selectedProgram.level.toLowerCase()} program 
                  in the {selectedProgram.department} department, requiring {selectedProgram.credits} credit hours for completion.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button className="w-full sm:flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-100 transition-colors">
                  View Curriculum
                </button>
                <button className="w-full sm:flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Requests Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl flex justify-between items-center sticky top-0">
              <h2 className="text-xl font-bold">Review Curriculum Requests</h2>
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-primary-50/70 mb-6">
                You have {reviewRequests.length} curriculum review requests awaiting your approval.
              </p>
              <button 
                onClick={() => {
                  setIsRequestModalOpen(false);
                  setActiveTab("requests");
                }}
                className="w-full px-4 py-3 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-100 transition-colors"
              >
                View All Requests
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {isRequestDetailsModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-4 sm:p-6 rounded-t-2xl flex justify-between items-start sticky top-0">
              <div className="flex-1 pr-2">
                <h2 className="text-lg sm:text-2xl font-bold mb-1">Curriculum Review Request</h2>
                <p className="text-white/90 text-xs sm:text-sm line-clamp-2">{selectedRequest.programName}</p>
              </div>
              <button
                onClick={() => setIsRequestDetailsModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <IoCloseOutline className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="flex gap-2">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getUrgencyColor(selectedRequest.urgency)}`}>
                  {selectedRequest.urgency} Priority
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Department</div>
                  <div className="font-bold text-primary-50">{selectedRequest.department}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Request Type</div>
                  <div className="font-bold text-primary-50">{selectedRequest.type}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 col-span-full">
                  <div className="text-sm text-primary-50/60 mb-1">Submitted By</div>
                  <div className="font-bold text-primary-50">{selectedRequest.submittedBy}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm sm:text-base text-primary-50 mb-2">Request Reason</h3>
                <p className="text-xs sm:text-sm text-primary-50/70 leading-relaxed">
                  {selectedRequest.reason}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs sm:text-sm font-semibold text-primary-50 mb-3">Decision Required:</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button 
                    onClick={() => {
                      alert(`Request "${selectedRequest.programName}" has been approved!`);
                      setIsRequestDetailsModalOpen(false);
                    }}
                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <IoCheckmarkCircleOutline className="w-5 h-5" />
                    Approve Request
                  </button>
                  <button 
                    onClick={() => {
                      alert(`Request revision for "${selectedRequest.programName}"`);
                      setIsRequestDetailsModalOpen(false);
                    }}
                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-amber-500 text-white rounded-lg font-semibold text-sm hover:bg-amber-600 transition-colors"
                  >
                    Request Revision
                  </button>
                  <button 
                    onClick={() => setIsRequestDetailsModalOpen(false)}
                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumReview;
