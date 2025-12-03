import React, { useState, useMemo, useCallback } from "react";
import {
  // IoCheckmarkCircleOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
  IoDocumentTextOutline,
  IoFlag,
  IoRocketOutline,
  IoSearchOutline,
  IoStatsChartOutline,
  IoTrendingUpOutline
} from "react-icons/io5";

interface Initiative {
  id: string;
  title: string;
  category: "Academic Excellence" | "Research Innovation" | "Student Success" | "Community Engagement" | "Infrastructure";
  status: "Active" | "Planned" | "Completed" | "On Hold";
  priority: "Critical" | "High" | "Medium" | "Low";
  owner: string;
  startDate: string;
  targetDate: string;
  progress: number;
  budget: string;
  impact: "Transformative" | "Significant" | "Moderate";
}

interface Proposal {
  id: string;
  title: string;
  category: "Academic Excellence" | "Research Innovation" | "Student Success" | "Community Engagement" | "Infrastructure";
  proposedBy: string;
  submittedDate: string;
  estimatedBudget: string;
  timeline: string;
  expectedImpact: string;
  alignment: number;
}

const StrategicInitiative: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "initiatives" | "proposals">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 8;

  const initiatives: Initiative[] = useMemo(() => [
    {
      id: "1",
      title: "Digital Transformation Initiative",
      category: "Infrastructure",
      status: "Active",
      priority: "Critical",
      owner: "Chief Information Officer",
      startDate: "2024-01-15",
      targetDate: "2025-12-31",
      progress: 65,
      budget: "$2.5M",
      impact: "Transformative"
    },
    {
      id: "2",
      title: "Research Excellence Program",
      category: "Research Innovation",
      status: "Active",
      priority: "High",
      owner: "VP for Research",
      startDate: "2023-09-01",
      targetDate: "2026-08-31",
      progress: 45,
      budget: "$5M",
      impact: "Transformative"
    },
    {
      id: "3",
      title: "Student Retention Enhancement",
      category: "Student Success",
      status: "Active",
      priority: "High",
      owner: "VP for Student Affairs",
      startDate: "2024-03-01",
      targetDate: "2025-06-30",
      progress: 78,
      budget: "$1.2M",
      impact: "Significant"
    },
    {
      id: "4",
      title: "Curriculum Innovation Framework",
      category: "Academic Excellence",
      status: "Planned",
      priority: "Medium",
      owner: "Provost",
      startDate: "2025-01-15",
      targetDate: "2026-12-31",
      progress: 15,
      budget: "$800K",
      impact: "Significant"
    },
    {
      id: "5",
      title: "Community Partnership Expansion",
      category: "Community Engagement",
      status: "Active",
      priority: "Medium",
      owner: "Director of Community Relations",
      startDate: "2024-06-01",
      targetDate: "2025-12-31",
      progress: 55,
      budget: "$600K",
      impact: "Moderate"
    },
  ], []);

  const proposals: Proposal[] = useMemo(() => [
    {
      id: "1",
      title: "AI-Enhanced Learning Platform",
      category: "Academic Excellence",
      proposedBy: "Dr. Jennifer Martinez",
      submittedDate: "2024-11-18",
      estimatedBudget: "$1.5M",
      timeline: "18 months",
      expectedImpact: "Transform learning experience for 5,000+ students",
      alignment: 95
    },
    {
      id: "2",
      title: "Green Campus Sustainability Initiative",
      category: "Infrastructure",
      proposedBy: "Prof. David Chen",
      submittedDate: "2024-11-22",
      estimatedBudget: "$3M",
      timeline: "24 months",
      expectedImpact: "Reduce carbon footprint by 40%",
      alignment: 88
    },
    {
      id: "3",
      title: "Global Research Collaboration Network",
      category: "Research Innovation",
      proposedBy: "Dr. Sarah Thompson",
      submittedDate: "2024-11-28",
      estimatedBudget: "$2.2M",
      timeline: "36 months",
      expectedImpact: "Establish partnerships with 20+ institutions",
      alignment: 92
    },
  ], []);

  const stats = useMemo(() => [
    { title: "Active Initiatives", value: "24", change: "+6", icon: <IoRocketOutline /> },
    { title: "Avg Progress", value: "67%", change: "+12%", icon: <IoStatsChartOutline /> },
    { title: "Pending Proposals", value: "8", change: "+3", icon: <IoDocumentTextOutline /> },
    { title: "Total Investment", value: "$12.8M", change: "+$2.5M", icon: <IoTrendingUpOutline /> },
  ], []);

  const getStatusColor = useCallback((status: string) => {
    const colors = {
      "Active": "bg-green-100 text-green-700",
      "Planned": "bg-blue-100 text-blue-700",
      "Completed": "bg-gray-100 text-gray-700",
      "On Hold": "bg-yellow-100 text-yellow-700"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
  }, []);

  const getPriorityColor = useCallback((priority: string) => {
    const colors = {
      "Critical": "bg-red-100 text-red-700",
      "High": "bg-orange-100 text-orange-700",
      "Medium": "bg-yellow-100 text-yellow-700",
      "Low": "bg-blue-100 text-blue-700"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-700";
  }, []);

  const filteredInitiatives = useMemo(() => {
    return initiatives.filter(initiative => {
      const matchesSearch = initiative.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || initiative.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initiatives, searchQuery, selectedCategory]);

  const paginatedInitiatives = useMemo(() => {
    return filteredInitiatives.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredInitiatives, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredInitiatives.length / itemsPerPage);
  }, [filteredInitiatives.length, itemsPerPage]);

  const handleTabChange = useCallback((tab: "overview" | "initiatives" | "proposals") => {
    setActiveTab(tab);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-comfortaa">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-50 mb-2">Strategic Initiatives</h1>
        <p className="text-primary-50/70">Oversee university-wide strategic initiatives and track progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-primary-50/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-primary-100">{stat.icon}</div>
              <span className="text-xs font-medium text-primary-300">{stat.change}</span>
            </div>
            <div className="text-xs text-primary-50/60 mb-1">{stat.title}</div>
            <div className="text-xl font-bold text-primary-50">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-50/20 mb-6">
        <div className="flex border-b border-primary-50/20">
          {[
            { id: "overview", label: "Overview" },
            { id: "initiatives", label: "Initiatives" },
            { id: "proposals", label: "Proposals" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary-100 text-primary-100"
                  : "border-transparent text-primary-50/60 hover:text-primary-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Initiatives by Category</h3>
                <div className="space-y-3">
                  {[
                    { category: "Academic Excellence", count: 8, color: "bg-purple-500" },
                    { category: "Research Innovation", count: 6, color: "bg-blue-500" },
                    { category: "Student Success", count: 5, color: "bg-green-500" },
                    { category: "Community Engagement", count: 3, color: "bg-pink-500" },
                    { category: "Infrastructure", count: 2, color: "bg-yellow-500" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded ${item.color}`}></div>
                      <span className="text-sm text-gray-600 flex-1">{item.category}</span>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Critical Initiatives</h3>
                <div className="space-y-3">
                  {initiatives.filter(i => i.priority === "Critical" || i.priority === "High").slice(0, 4).map((initiative) => (
                    <div key={initiative.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded ${initiative.priority === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                        <IoFlag className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{initiative.title}</div>
                        <div className="text-xs text-gray-500">{initiative.progress}% Complete</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "initiatives" && (
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search initiatives..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                >
                  <option value="all">All Categories</option>
                  <option value="Academic Excellence">Academic Excellence</option>
                  <option value="Research Innovation">Research Innovation</option>
                  <option value="Student Success">Student Success</option>
                  <option value="Community Engagement">Community Engagement</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>

              {/* Initiatives Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedInitiatives.map((initiative) => (
                  <div key={initiative.id} className="bg-white border border-primary-50/20 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="mb-3">
                      <h4 className="font-medium text-primary-50 mb-1 line-clamp-2">{initiative.title}</h4>
                      <p className="text-xs text-primary-50/60">{initiative.owner}</p>
                    </div>

                    <div className="flex gap-2 mb-3 flex-wrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(initiative.status)}`}>
                        {initiative.status}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(initiative.priority)}`}>
                        {initiative.priority}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-primary-50/60">Budget:</span>
                        <span className="font-medium">{initiative.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-50/60">Progress:</span>
                        <span className="font-medium">{initiative.progress}%</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${
                            initiative.progress >= 75 ? 'bg-primary-300' :
                            initiative.progress >= 50 ? 'bg-primary-100' :
                            'bg-primary-200'
                          }`}
                          style={{ width: `${initiative.progress}%` }}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedInitiative(initiative);
                        setIsModalOpen(true);
                      }}
                      className="w-full py-2 text-sm font-medium text-primary-100 hover:bg-primary-100/10 rounded transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-primary-50/40 hover:text-primary-50 disabled:opacity-50"
                  >
                    <IoChevronBackOutline className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-primary-50/70">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-primary-50/40 hover:text-primary-50 disabled:opacity-50"
                  >
                    <IoChevronForwardOutline className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "proposals" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pending Proposals</h3>
              {proposals.map((proposal) => (
                <div key={proposal.id} className="border border-primary-50/20 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-primary-50 mb-1">{proposal.title}</h4>
                      <p className="text-sm text-primary-50/70 mb-2">{proposal.proposedBy}</p>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-primary-50/60">Budget:</span>
                          <span className="ml-1 font-medium">{proposal.estimatedBudget}</span>
                        </div>
                        <div>
                          <span className="text-primary-50/60">Timeline:</span>
                          <span className="ml-1 font-medium">{proposal.timeline}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-primary-300 text-white text-sm rounded hover:bg-primary-300/80">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-primary-200 text-white text-sm rounded hover:bg-primary-200/80">
                        Revise
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Initiative Details Modal */}
      {isModalOpen && selectedInitiative && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">{selectedInitiative.title}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded">
              
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-sm ${getStatusColor(selectedInitiative.status)}`}>
                  {selectedInitiative.status}
                </span>
                <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(selectedInitiative.priority)}`}>
                  {selectedInitiative.priority}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-primary-50/60">Owner:</span>
                  <p className="font-medium">{selectedInitiative.owner}</p>
                </div>
                <div>
                  <span className="text-primary-50/60">Budget:</span>
                  <p className="font-medium">{selectedInitiative.budget}</p>
                </div>
                <div>
                  <span className="text-primary-50/60">Start Date:</span>
                  <p className="font-medium">{new Date(selectedInitiative.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-primary-50/60">Target Date:</span>
                  <p className="font-medium">{new Date(selectedInitiative.targetDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary-50/60">Progress</span>
                  <span className="font-medium">{selectedInitiative.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-full rounded-full ${
                      selectedInitiative.progress >= 75 ? 'bg-primary-300' :
                      selectedInitiative.progress >= 50 ? 'bg-primary-100' :
                      'bg-primary-200'
                    }`}
                    style={{ width: `${selectedInitiative.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-primary-50/20">
                <button className="flex-1 px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-100/80">
                  View Report
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicInitiative;