import React, { useState } from "react";
import {
  IoBusinessOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
  IoDocumentTextOutline,
  IoGlobeOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoSearchOutline,
  IoStatsChartOutline,
  IoTimeOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";

interface Partnership {
  id: string;
  organization: string;
  type: "Academic" | "Industry" | "Research" | "Government" | "NGO";
  status: "Active" | "Pending Approval" | "Under Review" | "Completed";
  country: string;
  startDate: string;
  endDate: string;
  focusArea: string;
  impact: number;
}

interface Proposal {
  id: string;
  title: string;
  organization: string;
  type: "Academic" | "Industry" | "Research" | "Government" | "NGO";
  submittedBy: string;
  submittedDate: string;
  proposedStartDate: string;
  budget: string;
  focusArea: string;
}

const PartnershipCollaboration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "partnerships" | "proposals" | "impact">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isProposalDetailsModalOpen, setIsProposalDetailsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Mock data for Partnerships
  const partnerships: Partnership[] = [
    {
      id: "1",
      organization: "MIT",
      type: "Academic",
      status: "Active",
      country: "United States",
      startDate: "2020-01-15",
      endDate: "2025-01-15",
      focusArea: "AI & Machine Learning",
      impact: 95
    },
    {
      id: "2",
      organization: "Google Research",
      type: "Industry",
      status: "Active",
      country: "United States",
      startDate: "2021-06-01",
      endDate: "2024-12-31",
      focusArea: "Cloud Computing",
      impact: 88
    },
    {
      id: "3",
      organization: "Oxford University",
      type: "Academic",
      status: "Active",
      country: "United Kingdom",
      startDate: "2019-09-01",
      endDate: "2024-08-31",
      focusArea: "Medical Research",
      impact: 92
    },
    {
      id: "4",
      organization: "World Health Organization",
      type: "NGO",
      status: "Under Review",
      country: "Switzerland",
      startDate: "2024-01-01",
      endDate: "2027-12-31",
      focusArea: "Public Health",
      impact: 0
    },
    {
      id: "5",
      organization: "National Science Foundation",
      type: "Government",
      status: "Pending Approval",
      country: "United States",
      startDate: "2024-03-01",
      endDate: "2026-02-28",
      focusArea: "Environmental Science",
      impact: 0
    },
  ];

  // Mock data for Proposals
  const proposals: Proposal[] = [
    {
      id: "1",
      title: "Joint AI Research Initiative",
      organization: "Carnegie Mellon University",
      type: "Academic",
      submittedBy: "Dr. Robert Anderson (Research Director)",
      submittedDate: "2024-11-20",
      proposedStartDate: "2025-01-15",
      budget: "$500,000",
      focusArea: "Artificial Intelligence"
    },
    {
      id: "2",
      title: "Industry-Academia Cloud Computing Program",
      organization: "Amazon Web Services",
      type: "Industry",
      submittedBy: "Prof. Sarah Martinez (CS Department)",
      submittedDate: "2024-11-25",
      proposedStartDate: "2025-02-01",
      budget: "$750,000",
      focusArea: "Cloud Infrastructure"
    },
    {
      id: "3",
      title: "Environmental Sustainability Project",
      organization: "United Nations Development Programme",
      type: "NGO",
      submittedBy: "Dr. Michael Brown (Environmental Science)",
      submittedDate: "2024-11-28",
      proposedStartDate: "2025-03-01",
      budget: "$300,000",
      focusArea: "Climate Action"
    },
  ];

  // Statistics
  const stats = [
    {
      title: "Active Partnerships",
      value: "42",
      change: "+8",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoBusinessOutline className="w-7 h-7" />,
      gradient: "from-primary-50 to-primary-50/80",
    },
    {
      title: "Countries",
      value: "28",
      change: "+5",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoGlobeOutline className="w-7 h-7" />,
      gradient: "from-primary-100 to-primary-100/80",
    },
    {
      title: "Pending Proposals",
      value: "12",
      change: "+3",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoDocumentTextOutline className="w-7 h-7" />,
      gradient: "from-primary-200 to-primary-200/80",
    },
    {
      title: "Joint Projects",
      value: "156",
      change: "+24",
      trend: "up" as "up" | "down" | "neutral",
      icon: <IoPeopleOutline className="w-7 h-7" />,
      gradient: "from-primary-300 to-primary-300/80",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600 border-green-200";
      case "Under Review":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Pending Approval":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "Completed":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Academic":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "Industry":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Research":
        return "bg-green-100 text-green-600 border-green-200";
      case "Government":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "NGO":
        return "bg-pink-100 text-pink-600 border-pink-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredPartnerships = partnerships.filter(partnership => {
    const matchesSearch = partnership.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partnership.focusArea.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || partnership.type === selectedType;
    return matchesSearch && matchesType;
  });

  const paginatedPartnerships = filteredPartnerships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPartnerships.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Partnerships & Collaborations
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Oversee strategic partnerships, review proposals, and track collaborative initiatives
            </p>
          </div>
          <button 
            onClick={() => setIsProposalModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <IoCheckmarkCircleOutline className="w-5 h-5" />
            Review Proposals
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
          { id: "partnerships", label: "Partnerships", icon: <IoBusinessOutline /> },
          { id: "proposals", label: "Proposals", icon: <IoDocumentTextOutline /> },
          { id: "impact", label: "Impact", icon: <IoTrendingUpOutline /> },
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
              <h2 className="text-xl font-bold text-primary-50 mb-6">Partnerships by Type</h2>
              <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-2 border-b border-gray-100">
                {[
                  { type: "Academic", count: 18, color: "bg-purple-500" },
                  { type: "Industry", count: 12, color: "bg-blue-500" },
                  { type: "Research", count: 8, color: "bg-green-500" },
                  { type: "Government", count: 4, color: "bg-amber-500" },
                ].map((item, index) => {
                  const maxCount = 20;
                  const heightPercentage = (item.count / maxCount) * 100;
                  
                  return (
                    <div key={index} className="flex flex-col items-center gap-2 w-full group">
                      <div className="relative w-full flex justify-center items-end h-48">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${item.color} opacity-90 group-hover:opacity-100 relative group-hover:scale-y-105 origin-bottom`}
                          style={{ height: `${heightPercentage}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.count} Partnerships
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-primary-50">{item.type}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {[
                  { activity: "Partnership Agreement Signed", organization: "Harvard University", time: "2 hours ago", icon: <IoCheckmarkCircleOutline />, color: "text-green-600 bg-green-100" },
                  { activity: "Proposal Submitted", organization: "Microsoft Research", time: "1 day ago", icon: <IoDocumentTextOutline />, color: "text-blue-600 bg-blue-100" },
                  { activity: "Collaboration Meeting Held", organization: "Stanford University", time: "3 days ago", icon: <IoPeopleOutline />, color: "text-purple-600 bg-purple-100" },
                  { activity: "MOU Under Review", organization: "UNESCO", time: "5 days ago", icon: <IoTimeOutline />, color: "text-amber-600 bg-amber-100" },
                ].map((activity, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                    <div className={`p-3 rounded-full h-fit ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-primary-50 mb-1">{activity.activity}</h4>
                      <p className="text-sm text-primary-50/70">{activity.organization}</p>
                      <span className="text-xs text-primary-50/50">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "partnerships" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
                  <input
                    type="text"
                    placeholder="Search partnerships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["all", "Academic", "Industry", "Research", "Government", "NGO"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedType(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedType === filter
                          ? "bg-primary-50 text-white shadow-md"
                          : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                      }`}
                    >
                      {filter === "all" ? "All Types" : filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Partnerships Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPartnerships.map((partnership) => (
                <div
                  key={partnership.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-50 mb-1 line-clamp-2">{partnership.organization}</h3>
                      <div className="flex items-center gap-1 text-sm text-primary-50/60">
                        <IoLocationOutline className="w-4 h-4" />
                        <span>{partnership.country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(partnership.type)}`}>
                      {partnership.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(partnership.status)}`}>
                      {partnership.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="text-primary-50/70">Focus Area:</span>
                      <p className="font-semibold text-primary-50">{partnership.focusArea}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-primary-50/70">Duration:</span>
                      <p className="font-semibold text-primary-50">
                        {new Date(partnership.startDate).getFullYear()} - {new Date(partnership.endDate).getFullYear()}
                      </p>
                    </div>
                  </div>

                  {partnership.impact > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-primary-50/70">Impact Score</span>
                        <span className="font-bold text-primary-50">{partnership.impact}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            partnership.impact >= 90 ? 'bg-green-500' :
                            partnership.impact >= 80 ? 'bg-blue-500' :
                            'bg-amber-500'
                          }`}
                          style={{ width: `${partnership.impact}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      setSelectedPartnership(partnership);
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

        {activeTab === "proposals" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Pending Partnership Proposals</h2>
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <div key={proposal.id} className="p-5 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 bg-gradient-to-br from-white to-gray-50/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-50 mb-1">{proposal.title}</h3>
                      <p className="text-sm text-primary-50/70">{proposal.organization}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(proposal.type)}`}>
                      {proposal.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <span className="text-primary-50/60">Submitted By:</span>
                      <p className="font-semibold text-primary-50">{proposal.submittedBy}</p>
                    </div>
                    <div>
                      <span className="text-primary-50/60">Budget:</span>
                      <p className="font-semibold text-primary-50">{proposal.budget}</p>
                    </div>
                    <div>
                      <span className="text-primary-50/60">Focus Area:</span>
                      <p className="font-semibold text-primary-50">{proposal.focusArea}</p>
                    </div>
                    <div>
                      <span className="text-primary-50/60">Proposed Start:</span>
                      <p className="font-semibold text-primary-50">{new Date(proposal.proposedStartDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        // In a real app, this would call an API to approve the proposal
                        alert(`Proposal "${proposal.title}" has been approved!`);
                      }}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-all"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => {
                        // In a real app, this would open a form to request specific changes
                        alert(`Request changes for "${proposal.title}"`);
                      }}
                      className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold text-sm hover:bg-amber-600 transition-all"
                    >
                      Request Changes
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedProposal(proposal);
                        setIsProposalDetailsModalOpen(true);
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

        {activeTab === "impact" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Partnership Impact Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { metric: "Student Exchange", value: "324", description: "Students participated", icon: <IoPeopleOutline />, color: "from-purple-500 to-purple-600" },
                { metric: "Joint Publications", value: "156", description: "Research papers", icon: <IoDocumentTextOutline />, color: "from-blue-500 to-blue-600" },
                { metric: "Funding Secured", value: "$8.2M", description: "Total grants", icon: <IoBusinessOutline />, color: "from-green-500 to-green-600" },
                { metric: "Global Reach", value: "28", description: "Countries", icon: <IoGlobeOutline />, color: "from-amber-500 to-amber-600" },
                { metric: "Innovation Projects", value: "42", description: "Collaborative initiatives", icon: <IoCheckmarkCircleOutline />, color: "from-pink-500 to-pink-600" },
                { metric: "Events Hosted", value: "67", description: "Joint conferences", icon: <IoCalendarOutline />, color: "from-indigo-500 to-indigo-600" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/30"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {item.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary-50 mb-1">{item.value}</div>
                  <h3 className="text-lg font-bold text-primary-50 mb-1">{item.metric}</h3>
                  <p className="text-sm text-primary-50/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Partnership Details Modal */}
      {isModalOpen && selectedPartnership && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-4 sm:p-6 rounded-t-2xl flex justify-between items-start sticky top-0">
              <div className="flex-1 pr-2">
                <h2 className="text-lg sm:text-2xl font-bold mb-1">{selectedPartnership.organization}</h2>
                <p className="text-white/90 text-xs sm:text-sm">{selectedPartnership.type} Partnership • {selectedPartnership.country}</p>
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
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(selectedPartnership.status)}`}>
                  {selectedPartnership.status}
                </span>
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getTypeColor(selectedPartnership.type)}`}>
                  {selectedPartnership.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Start Date</div>
                  <div className="font-bold text-primary-50">{new Date(selectedPartnership.startDate).toLocaleDateString()}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">End Date</div>
                  <div className="font-bold text-primary-50">{new Date(selectedPartnership.endDate).toLocaleDateString()}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 col-span-2">
                  <div className="text-sm text-primary-50/60 mb-1">Focus Area</div>
                  <div className="font-bold text-primary-50">{selectedPartnership.focusArea}</div>
                </div>
                {selectedPartnership.impact > 0 && (
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 col-span-2">
                    <div className="text-sm text-primary-50/60 mb-2">Impact Score</div>
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-primary-50 text-xl">{selectedPartnership.impact}%</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            selectedPartnership.impact >= 90 ? 'bg-green-500' :
                            selectedPartnership.impact >= 80 ? 'bg-blue-500' :
                            'bg-amber-500'
                          }`}
                          style={{ width: `${selectedPartnership.impact}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-primary-50 mb-2">Partnership Overview</h3>
                <p className="text-sm text-primary-50/70 leading-relaxed">
                  This strategic partnership with {selectedPartnership.organization} focuses on {selectedPartnership.focusArea.toLowerCase()}, 
                  fostering collaboration and knowledge exchange between our institutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button className="w-full sm:flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-100 transition-colors">
                  View Documents
                </button>
                <button className="w-full sm:flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Proposals Modal */}
      {isProposalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl flex justify-between items-center sticky top-0">
              <h2 className="text-xl font-bold">Review Partnership Proposals</h2>
              <button
                onClick={() => setIsProposalModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-primary-50/70 mb-6">
                You have 3 partnership proposals awaiting your review and approval.
              </p>
              <button 
                onClick={() => {
                  setIsProposalModalOpen(false);
                  setActiveTab("proposals");
                }}
                className="w-full px-4 py-3 bg-primary-50 text-white rounded-lg font-semibold hover:bg-primary-100 transition-colors"
              >
                View All Proposals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proposal Details Modal */}
      {isProposalDetailsModalOpen && selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 text-white p-4 sm:p-6 rounded-t-2xl flex justify-between items-start sticky top-0">
              <div className="flex-1 pr-2">
                <h2 className="text-lg sm:text-2xl font-bold mb-1">Partnership Proposal Details</h2>
                <p className="text-white/90 text-xs sm:text-sm line-clamp-2">{selectedProposal.title}</p>
              </div>
              <button
                onClick={() => setIsProposalDetailsModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <IoCloseOutline className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getTypeColor(selectedProposal.type)}`}>
                  {selectedProposal.type} Partnership
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Organization</div>
                  <div className="font-bold text-primary-50">{selectedProposal.organization}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Submitted By</div>
                  <div className="font-bold text-primary-50">{selectedProposal.submittedBy}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Budget</div>
                  <div className="font-bold text-primary-50">{selectedProposal.budget}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Focus Area</div>
                  <div className="font-bold text-primary-50">{selectedProposal.focusArea}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Submitted Date</div>
                  <div className="font-bold text-primary-50">{new Date(selectedProposal.submittedDate).toLocaleDateString()}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-sm text-primary-50/60 mb-1">Proposed Start Date</div>
                  <div className="font-bold text-primary-50">{new Date(selectedProposal.proposedStartDate).toLocaleDateString()}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm sm:text-base text-primary-50 mb-2">Proposal Summary</h3>
                <p className="text-xs sm:text-sm text-primary-50/70 leading-relaxed">
                  This partnership proposal from {selectedProposal.organization} aims to establish a collaborative {selectedProposal.type.toLowerCase()} partnership 
                  focused on {selectedProposal.focusArea.toLowerCase()}. The proposed initiative requires a budget of {selectedProposal.budget} and is scheduled 
                  to commence on {new Date(selectedProposal.proposedStartDate).toLocaleDateString()}.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs sm:text-sm font-semibold text-primary-50 mb-3">Decision Required:</p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button 
                    onClick={() => {
                      alert(`Proposal "${selectedProposal.title}" has been approved!`);
                      setIsProposalDetailsModalOpen(false);
                    }}
                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <IoCheckmarkCircleOutline className="w-5 h-5" />
                    Approve Proposal
                  </button>
                  <button 
                    onClick={() => {
                      alert(`Request changes for "${selectedProposal.title}"`);
                      setIsProposalDetailsModalOpen(false);
                    }}
                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-amber-500 text-white rounded-lg font-semibold text-sm hover:bg-amber-600 transition-colors"
                  >
                    Request Changes
                  </button>
                  <button 
                    onClick={() => setIsProposalDetailsModalOpen(false)}
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

export default PartnershipCollaboration;
