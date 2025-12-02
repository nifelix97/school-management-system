import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoMedalOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingUpOutline,
    IoWarningOutline
} from "react-icons/io5";

interface AccreditationProgram {
  id: string;
  program: string;
  department: string;
  accreditingBody: string;
  status: "Accredited" | "In Review" | "Pending Submission" | "Expired" | "Conditional";
  validUntil: string;
  lastReview: string;
  complianceScore: number;
}

interface Standard {
  id: string;
  category: string;
  standard: string;
  complianceLevel: number;
  status: "Met" | "Partially Met" | "Not Met";
  lastAssessed: string;
}

interface Document {
  id: string;
  title: string;
  type: "Report" | "Certificate" | "Self-Study" | "Evidence";
  uploadDate: string;
  status: "Approved" | "Under Review" | "Rejected" | "Pending";
  size: string;
}

const Accreditation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "programs" | "standards" | "documents">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<AccreditationProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Mock data for Accreditation Programs
  const programs: AccreditationProgram[] = [
    {
      id: "1",
      program: "Bachelor of Computer Science",
      department: "Computer Science",
      accreditingBody: "ABET",
      status: "Accredited",
      validUntil: "2026-12-31",
      lastReview: "2020-06-15",
      complianceScore: 98
    },
    {
      id: "2",
      program: "Master of Business Administration",
      department: "Business",
      accreditingBody: "AACSB",
      status: "Accredited",
      validUntil: "2025-08-30",
      lastReview: "2019-05-20",
      complianceScore: 95
    },
    {
      id: "3",
      program: "Bachelor of Civil Engineering",
      department: "Engineering",
      accreditingBody: "ABET",
      status: "In Review",
      validUntil: "2024-12-31",
      lastReview: "2018-09-10",
      complianceScore: 88
    },
    {
      id: "4",
      program: "Doctor of Medicine",
      department: "Medical School",
      accreditingBody: "LCME",
      status: "Accredited",
      validUntil: "2029-06-30",
      lastReview: "2021-04-25",
      complianceScore: 99
    },
    {
      id: "5",
      program: "Bachelor of Nursing",
      department: "Nursing",
      accreditingBody: "CCNE",
      status: "Conditional",
      validUntil: "2025-03-31",
      lastReview: "2023-11-15",
      complianceScore: 82
    },
    {
      id: "6",
      program: "Master of Education",
      department: "Education",
      accreditingBody: "CAEP",
      status: "Pending Submission",
      validUntil: "N/A",
      lastReview: "N/A",
      complianceScore: 0
    },
  ];

  // Mock data for Standards
  const standards: Standard[] = [
    {
      id: "1",
      category: "Academic Quality",
      standard: "Faculty Qualifications & Development",
      complianceLevel: 95,
      status: "Met",
      lastAssessed: "2024-01-15"
    },
    {
      id: "2",
      category: "Infrastructure",
      standard: "Library & Learning Resources",
      complianceLevel: 88,
      status: "Met",
      lastAssessed: "2024-02-10"
    },
    {
      id: "3",
      category: "Student Services",
      standard: "Student Support & Counseling",
      complianceLevel: 72,
      status: "Partially Met",
      lastAssessed: "2024-03-05"
    },
    {
      id: "4",
      category: "Governance",
      standard: "Institutional Effectiveness",
      complianceLevel: 92,
      status: "Met",
      lastAssessed: "2024-01-20"
    },
  ];

  // Mock data for Documents
  const documents: Document[] = [
    {
      id: "1",
      title: "Institutional Self-Study Report 2024",
      type: "Self-Study",
      uploadDate: "2024-08-15",
      status: "Approved",
      size: "12.5 MB"
    },
    {
      id: "2",
      title: "Computer Science Accreditation Certificate",
      type: "Certificate",
      uploadDate: "2020-07-01",
      status: "Approved",
      size: "2.3 MB"
    },
    {
      id: "3",
      title: "Faculty Credentials Report",
      type: "Evidence",
      uploadDate: "2024-09-01",
      status: "Under Review",
      size: "8.7 MB"
    },
  ];

  // Statistics
  const stats = [
    {
      title: "Accredited Programs",
      value: "42/48",
      change: "+3",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoMedalOutline className="w-7 h-7" />,
      gradient: "from-primary-50 to-primary-50/80",
    },
    {
      title: "Compliance Score",
      value: "94.5%",
      change: "+2.1%",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoShieldCheckmarkOutline className="w-7 h-7" />,
      gradient: "from-primary-100 to-primary-100/80",
    },
    {
      title: "Pending Reviews",
      value: "5",
      change: "-2",
      trend: "down" as "up" | "down" | "neutral",
      icon: <IoTimeOutline className="w-7 h-7" />,
      gradient: "from-primary-200 to-primary-200/80",
    },
    {
      title: "Documents Submitted",
      value: "128",
      change: "+15",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoDocumentTextOutline className="w-7 h-7" />,
      gradient: "from-primary-300 to-primary-300/80",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accredited":
      case "Met":
      case "Approved":
        return "bg-green-100 text-green-600 border-green-200";
      case "In Review":
      case "Partially Met":
      case "Under Review":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Pending Submission":
      case "Pending":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "Expired":
      case "Not Met":
      case "Rejected":
        return "bg-red-100 text-red-600 border-red-200";
      case "Conditional":
        return "bg-orange-100 text-orange-600 border-orange-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || program.status === selectedStatus;
    return matchesSearch && matchesStatus;
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
              Accreditation Management
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Monitor program accreditation status, compliance standards, and documentation
            </p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <IoCheckmarkCircleOutline className="w-5 h-5" />
            Review Applications
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
          { id: "programs", label: "Programs", icon: <IoMedalOutline /> },
          { id: "standards", label: "Standards", icon: <IoShieldCheckmarkOutline /> },
          { id: "documents", label: "Documents", icon: <IoDocumentTextOutline /> },
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
              <h2 className="text-xl font-bold text-primary-50 mb-6">Accreditation Status by Body</h2>
              <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-2 border-b border-gray-100">
                {[
                  { body: "ABET", programs: 12, color: "bg-primary-50" },
                  { body: "AACSB", programs: 8, color: "bg-primary-100" },
                  { body: "LCME", programs: 5, color: "bg-primary-200" },
                  { body: "Others", programs: 17, color: "bg-primary-300" },
                ].map((item, index) => {
                  const maxPrograms = 20;
                  const heightPercentage = (item.programs / maxPrograms) * 100;
                  
                  return (
                    <div key={index} className="flex flex-col items-center gap-2 w-full group">
                      <div className="relative w-full flex justify-center items-end h-48">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${item.color} opacity-90 group-hover:opacity-100 relative group-hover:scale-y-105 origin-bottom`}
                          style={{ height: `${heightPercentage}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.programs} Programs
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-primary-50">{item.body}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Upcoming Reviews & Deadlines</h2>
              <div className="space-y-4">
                {[
                  { program: "Civil Engineering - ABET", date: "Dec 15, 2024", priority: "high", icon: <IoWarningOutline /> },
                  { program: "MBA - AACSB Renewal", date: "Jan 30, 2025", priority: "medium", icon: <IoAlertCircleOutline /> },
                  { program: "Nursing Self-Study Submission", date: "Feb 15, 2025", priority: "medium", icon: <IoDocumentTextOutline /> },
                  { program: "Law School - ABA Review", date: "Mar 20, 2025", priority: "low", icon: <IoCalendarOutline /> },
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
                  {["all", "Accredited", "In Review", "Conditional", "Pending Submission"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedStatus(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedStatus === filter
                          ? "bg-primary-50 text-white shadow-md"
                          : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                      }`}
                    >
                      {filter === "all" ? "All Status" : filter}
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
                      <h3 className="text-lg font-bold text-primary-50 mb-1 line-clamp-2">{program.program}</h3>
                      <p className="text-sm text-primary-50/60">{program.department}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Accrediting Body:</span>
                      <span className="font-semibold text-primary-50">{program.accreditingBody}</span>
                    </div>
                    {program.status !== "Pending Submission" && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-primary-50/70">Valid Until:</span>
                          <span className="font-semibold text-primary-50">{new Date(program.validUntil).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-primary-50/70">Compliance:</span>
                          <span className="font-semibold text-primary-50">{program.complianceScore}%</span>
                        </div>
                      </>
                    )}
                  </div>

                  {program.complianceScore > 0 && (
                    <div className="mb-4">
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
                  )}

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

        {activeTab === "standards" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Accreditation Standards Compliance</h2>
            <div className="space-y-6">
              {standards.map((standard) => (
                <div
                  key={standard.id}
                  className="p-6 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/30"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-primary-50">{standard.standard}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(standard.status)}`}>
                          {standard.status}
                        </span>
                      </div>
                      <p className="text-sm text-primary-50/60">Category: {standard.category}</p>
                      <p className="text-xs text-primary-50/50 mt-1">Last Assessed: {new Date(standard.lastAssessed).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-primary-50">Compliance Level</span>
                      <span className="text-sm font-bold text-primary-50">{standard.complianceLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          standard.complianceLevel >= 90 ? 'bg-green-500' :
                          standard.complianceLevel >= 70 ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: `${standard.complianceLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Accreditation Documents</h2>
            <div className="grid grid-cols-1 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-primary-50/10 rounded-lg">
                        <IoDocumentTextOutline className="w-6 h-6 text-primary-50" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-primary-50 mb-1">{doc.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-primary-50/70">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                          <span className="flex items-center gap-1">
                            <IoCalendarOutline className="w-4 h-4" />
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </span>
                          <span>{doc.size}</span>
                          <span className="px-2 py-1 bg-gray-200 rounded text-xs font-semibold">{doc.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-all flex items-center gap-2">
                        <IoDownloadOutline className="w-4 h-4" />
                        Download
                      </button>
                      <button className="px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold text-sm hover:bg-primary-100 transition-all">
                        View
                      </button>
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedProgram.program}</h2>
                <p className="text-white/90 text-sm">{selectedProgram.department} • {selectedProgram.accreditingBody}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(selectedProgram.status)}`}>
                  {selectedProgram.status}
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                  {selectedProgram.accreditingBody}
                </span>
              </div>

              {selectedProgram.status !== "Pending Submission" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-sm text-primary-50/60 mb-1">Valid Until</div>
                    <div className="font-bold text-primary-50">{new Date(selectedProgram.validUntil).toLocaleDateString()}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-sm text-primary-50/60 mb-1">Last Review</div>
                    <div className="font-bold text-primary-50">{new Date(selectedProgram.lastReview).toLocaleDateString()}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 col-span-2">
                    <div className="text-sm text-primary-50/60 mb-1">Compliance Score</div>
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-primary-50 text-xl">{selectedProgram.complianceScore}%</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            selectedProgram.complianceScore >= 90 ? 'bg-green-500' :
                            selectedProgram.complianceScore >= 80 ? 'bg-blue-500' :
                            'bg-amber-500'
                          }`}
                          style={{ width: `${selectedProgram.complianceScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-bold text-primary-50 mb-2">Accreditation Summary</h3>
                <p className="text-sm text-primary-50/70 leading-relaxed">
                  The {selectedProgram.program} program is currently {selectedProgram.status.toLowerCase()} by {selectedProgram.accreditingBody}.
                  {selectedProgram.status !== "Pending Submission" && 
                    ` The accreditation is valid until ${new Date(selectedProgram.validUntil).toLocaleDateString()} with a compliance score of ${selectedProgram.complianceScore}%.`
                  }
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-100 transition-colors">
                  View Documents
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Applications Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl flex justify-between items-center sticky top-0">
              <h2 className="text-xl font-bold">Pending Accreditation Applications</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {[
                {
                  program: "Bachelor of Data Science",
                  department: "Computer Science",
                  accreditingBody: "ABET",
                  submittedBy: "Dr. Sarah Johnson (HOD)",
                  submittedDate: "2024-11-15",
                  targetDate: "2025-03-01"
                },
                {
                  program: "Master of Public Health",
                  department: "Health Sciences",
                  accreditingBody: "CEPH",
                  submittedBy: "Prof. Michael Brown (HOD)",
                  submittedDate: "2024-11-20",
                  targetDate: "2025-04-15"
                },
                {
                  program: "Bachelor of Architecture",
                  department: "Architecture & Design",
                  accreditingBody: "NAAB",
                  submittedBy: "Dr. Emma Wilson (HOD)",
                  submittedDate: "2024-11-25",
                  targetDate: "2025-05-01"
                },
              ].map((application, index) => (
                <div key={index} className="p-5 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 bg-gradient-to-br from-white to-gray-50/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-50 mb-1">{application.program}</h3>
                      <p className="text-sm text-primary-50/70">{application.department}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-600 border border-amber-200">
                      Pending Review
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <span className="text-primary-50/60">Accrediting Body:</span>
                      <p className="font-semibold text-primary-50">{application.accreditingBody}</p>
                    </div>
                    <div>
                      <span className="text-primary-50/60">Submitted By:</span>
                      <p className="font-semibold text-primary-50">{application.submittedBy}</p>
                    </div>
                    <div>
                      <span className="text-primary-50/60">Submitted Date:</span>
                      <p className="font-semibold text-primary-50">{new Date(application.submittedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-primary-50/60">Target Date:</span>
                      <p className="font-semibold text-primary-50">{new Date(application.targetDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-all">
                      Approve
                    </button>
                    <button className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold text-sm hover:bg-amber-600 transition-all">
                      Request Changes
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              ))}

              {/* No applications message */}
              {false && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IoCheckmarkCircleOutline className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No pending applications at the moment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accreditation;
