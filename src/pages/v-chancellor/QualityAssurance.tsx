import React, { useState } from "react";
import {
    IoAlertCircleOutline,
    IoAnalyticsOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoMedalOutline,
    IoPeopleOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline,
    IoStatsChartOutline,
    IoTrendingUpOutline,
    IoWarningOutline
} from "react-icons/io5";

interface Audit {
  id: string;
  title: string;
  type: "Internal" | "External";
  department: string;
  date: string;
  status: "Completed" | "In Progress" | "Scheduled" | "Pending Action";
  score: number | null;
  auditor: string;
}

interface Accreditation {
  id: string;
  program: string;
  body: string;
  status: "Accredited" | "In Review" | "Conditional" | "Expired";
  lastReview: string;
  nextReview: string;
  complianceLevel: number;
}

const QualityAssurance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "accreditation" | "audits" | "feedback">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Mock data for Audits
  const audits: Audit[] = [
    {
      id: "1",
      title: "Annual Academic Quality Audit",
      type: "Internal",
      department: "Computer Science",
      date: "2024-02-15",
      status: "Completed",
      score: 94,
      auditor: "Internal QA Committee"
    },
    {
      id: "2",
      title: "ISO 9001 Compliance Check",
      type: "External",
      department: "Administration",
      date: "2024-03-10",
      status: "In Progress",
      score: null,
      auditor: "Bureau Veritas"
    },
    {
      id: "3",
      title: "Research Ethics Review",
      type: "Internal",
      department: "Medical School",
      date: "2024-01-20",
      status: "Completed",
      score: 98,
      auditor: "Ethics Board"
    },
    {
      id: "4",
      title: "Financial Processes Audit",
      type: "External",
      department: "Finance",
      date: "2024-04-05",
      status: "Scheduled",
      score: null,
      auditor: "Deloitte"
    },
    {
      id: "5",
      title: "Student Services Evaluation",
      type: "Internal",
      department: "Student Affairs",
      date: "2023-11-15",
      status: "Pending Action",
      score: 78,
      auditor: "Internal QA Committee"
    },
    {
      id: "6",
      title: "Engineering Labs Safety Audit",
      type: "Internal",
      department: "Engineering",
      date: "2024-02-28",
      status: "Completed",
      score: 88,
      auditor: "Safety Office"
    },
  ];

  // Mock data for Accreditation
  const accreditations: Accreditation[] = [
    {
      id: "1",
      program: "Bachelor of Computer Science",
      body: "ABET",
      status: "Accredited",
      lastReview: "2020",
      nextReview: "2026",
      complianceLevel: 100
    },
    {
      id: "2",
      program: "Master of Business Administration",
      body: "AACSB",
      status: "Accredited",
      lastReview: "2019",
      nextReview: "2024",
      complianceLevel: 95
    },
    {
      id: "3",
      program: "Bachelor of Civil Engineering",
      body: "ABET",
      status: "In Review",
      lastReview: "2018",
      nextReview: "2024",
      complianceLevel: 85
    },
    {
      id: "4",
      program: "Doctor of Medicine",
      body: "LCME",
      status: "Accredited",
      lastReview: "2021",
      nextReview: "2029",
      complianceLevel: 98
    },
  ];

  // Statistics
  const stats = [
    {
      title: "Overall Compliance",
      value: "94.5%",
      change: "+1.2%",
      trend: "up" as const,
      icon: <IoShieldCheckmarkOutline className="w-7 h-7" />,
      gradient: "from-primary-50 to-primary-50/80",
    },
    {
      title: "Accredited Programs",
      value: "42/45",
      change: "3 In Review",
      trend: "neutral" as const,
      icon: <IoMedalOutline className="w-7 h-7" />,
      gradient: "from-primary-100 to-primary-100/80",
    },
    {
      title: "Student Satisfaction",
      value: "4.2/5.0",
      change: "+0.3",
      trend: "up" as const,
      icon: <IoPeopleOutline className="w-7 h-7" />,
      gradient: "from-primary-200 to-primary-200/80",
    },
    {
      title: "Pending Audits",
      value: "8",
      change: "-2",
      trend: "down" as const,
      icon: <IoAnalyticsOutline className="w-7 h-7" />,
      gradient: "from-primary-300 to-primary-300/80",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
      case "Accredited":
        return "bg-green-100 text-green-600 border-green-200";
      case "In Progress":
      case "In Review":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Scheduled":
      case "Conditional":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "Pending Action":
      case "Expired":
        return "bg-red-100 text-red-600 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         audit.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || audit.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedAudits = filteredAudits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAudits.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Quality Assurance
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Monitor institutional quality, accreditation status, and compliance
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
            <IoCalendarOutline className="w-5 h-5" />
            Schedule Audit
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
          { id: "accreditation", label: "Accreditation", icon: <IoMedalOutline /> },
          { id: "audits", label: "Audits", icon: <IoShieldCheckmarkOutline /> },
          { id: "feedback", label: "Feedback", icon: <IoPeopleOutline /> },
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
              <h2 className="text-xl font-bold text-primary-50 mb-6">Quality Metrics Overview</h2>
              <div className="space-y-6">
                {[
                  { label: "Academic Standards", value: 92, color: "bg-primary-50" },
                  { label: "Research Quality", value: 88, color: "bg-primary-100" },
                  { label: "Student Services", value: 85, color: "bg-primary-200" },
                  { label: "Facilities & Infrastructure", value: 90, color: "bg-primary-300" },
                  { label: "Governance", value: 95, color: "bg-green-500" },
                ].map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-primary-50">{metric.label}</span>
                      <span className="text-sm font-bold text-primary-50">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${metric.color} h-full rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Recent Alerts & Notifications</h2>
              <div className="space-y-4">
                {[
                  { title: "Engineering Audit Due", date: "In 5 days", type: "warning", desc: "Internal safety audit for mechanical labs" },
                  { title: "New Policy Compliance", date: "Today", type: "info", desc: "Updated data protection regulations effective immediately" },
                  { title: "Student Survey Results", date: "Yesterday", type: "success", desc: "Satisfaction score increased by 5% this semester" },
                  { title: "Library Accreditation", date: "Next Month", type: "warning", desc: "Preparation for external review committee visit" },
                ].map((alert, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                    <div className={`p-3 rounded-full h-fit ${
                      alert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                      alert.type === 'success' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {alert.type === 'warning' ? <IoWarningOutline /> :
                       alert.type === 'success' ? <IoCheckmarkCircleOutline /> :
                       <IoAlertCircleOutline />}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-primary-50">{alert.title}</h4>
                        <span className="text-xs font-semibold text-primary-50/60 bg-white px-2 py-1 rounded-full border border-gray-100">{alert.date}</span>
                      </div>
                      <p className="text-sm text-primary-50/70">{alert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "accreditation" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Program Accreditation Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accreditations.map((acc) => (
                <div
                  key={acc.id}
                  className="p-6 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/30"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary-50 mb-1">{acc.program}</h3>
                      <p className="text-sm font-semibold text-primary-50/60">{acc.body}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(acc.status)}`}>
                      {acc.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Last Review:</span>
                      <span className="font-semibold text-primary-50">{acc.lastReview}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Next Review:</span>
                      <span className="font-semibold text-primary-50">{acc.nextReview}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-primary-50">Compliance Level</span>
                      <span className="text-xs font-bold text-primary-50">{acc.complianceLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          acc.complianceLevel >= 90 ? 'bg-green-500' :
                          acc.complianceLevel >= 80 ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: `${acc.complianceLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "audits" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
                  <input
                    type="text"
                    placeholder="Search audits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["all", "Completed", "In Progress", "Scheduled", "Pending Action"].map((filter) => (
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

            {/* Audits List */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 text-sm font-bold text-primary-50">Audit Title</th>
                      <th className="p-4 text-sm font-bold text-primary-50">Type</th>
                      <th className="p-4 text-sm font-bold text-primary-50">Department</th>
                      <th className="p-4 text-sm font-bold text-primary-50">Date</th>
                      <th className="p-4 text-sm font-bold text-primary-50">Status</th>
                      <th className="p-4 text-sm font-bold text-primary-50">Score</th>
                      <th className="p-4 text-sm font-bold text-primary-50">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAudits.map((audit) => (
                      <tr key={audit.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-semibold text-primary-50">{audit.title}</td>
                        <td className="p-4 text-sm text-primary-50/70">{audit.type}</td>
                        <td className="p-4 text-sm text-primary-50/70">{audit.department}</td>
                        <td className="p-4 text-sm text-primary-50/70">{audit.date}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(audit.status)}`}>
                            {audit.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {audit.score ? (
                            <span className={`font-bold ${
                              audit.score >= 90 ? 'text-green-600' :
                              audit.score >= 80 ? 'text-blue-600' :
                              'text-amber-600'
                            }`}>
                              {audit.score}%
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => {
                              setSelectedAudit(audit);
                              setIsModalOpen(true);
                            }}
                            className="text-sm font-semibold text-primary-100 hover:text-primary-200 hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-gray-100">
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
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Stakeholder Satisfaction</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { group: "Students", score: 4.2, trend: "+0.2" },
                  { group: "Faculty", score: 4.5, trend: "+0.1" },
                  { group: "Alumni", score: 4.0, trend: "0.0" },
                  { group: "Employers", score: 4.6, trend: "+0.3" },
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                    <div className="text-sm font-semibold text-primary-50/70 mb-2">{item.group}</div>
                    <div className="text-3xl font-bold text-primary-50 mb-1">{item.score}</div>
                    <div className="text-xs font-semibold text-green-600 bg-green-100 inline-block px-2 py-0.5 rounded-full">
                      {item.trend} vs last year
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Recent Feedback Highlights</h2>
              <div className="space-y-4">
                {[
                  { user: "Student Council", comment: "Library hours extension has been very helpful for exam prep.", type: "positive" },
                  { user: "Faculty Senate", comment: "New research grant application process is streamlined and efficient.", type: "positive" },
                  { user: "Alumni Association", comment: "More networking events needed for recent graduates.", type: "neutral" },
                  { user: "Engineering Dept", comment: "Lab equipment maintenance schedule needs review.", type: "negative" },
                ].map((feedback, index) => (
                  <div key={index} className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-primary-50 text-sm">{feedback.user}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        feedback.type === 'positive' ? 'bg-green-500' :
                        feedback.type === 'neutral' ? 'bg-blue-500' :
                        'bg-amber-500'
                      }`}></div>
                    </div>
                    <p className="text-sm text-primary-50/70 italic">"{feedback.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Audit Details Modal */}
      {isModalOpen && selectedAudit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedAudit.title}</h2>
                <p className="text-white/90 text-sm">{selectedAudit.type} Audit • {selectedAudit.department}</p>
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
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(selectedAudit.status)}`}>
                  {selectedAudit.status}
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                  {selectedAudit.date}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Auditor</div>
                  <div className="font-bold text-primary-50">{selectedAudit.auditor}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Score</div>
                  <div className="font-bold text-primary-50 text-xl">
                    {selectedAudit.score ? `${selectedAudit.score}%` : 'N/A'}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-primary-50 mb-2">Audit Summary</h3>
                <p className="text-sm text-primary-50/70 leading-relaxed">
                  This audit was conducted to evaluate the compliance and quality standards of the {selectedAudit.department} department. 
                  {selectedAudit.status === 'Completed' 
                    ? ` The audit has been completed with a score of ${selectedAudit.score}%. All major criteria were assessed.`
                    : " The audit is currently in progress or scheduled. Detailed results will be available upon completion."}
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualityAssurance;
