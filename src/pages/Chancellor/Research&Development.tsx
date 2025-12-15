import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoDocumentTextOutline,
    IoFlaskOutline,
    IoPeopleOutline,
    IoRocketOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingUpOutline,
    IoTrophyOutline
} from "react-icons/io5";

interface ResearchProject {
  id: string;
  title: string;
  principalInvestigator: string;
  department: string;
  status: "Active" | "Completed" | "Pending" | "On Hold";
  funding: string;
  startDate: string;
  endDate: string;
  progress: number;
  category: string;
}

const ResearchDevelopment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "grants" | "publications" | "innovation">("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Mock data for research projects
  const projects: ResearchProject[] = [
    {
      id: "1",
      title: "AI-Powered Healthcare Diagnostics",
      principalInvestigator: "Dr. Sarah Johnson",
      department: "Computer Science",
      status: "Active",
      funding: "$2,500,000",
      startDate: "2023-01-15",
      endDate: "2025-12-31",
      progress: 65,
      category: "Artificial Intelligence"
    },
    {
      id: "2",
      title: "Sustainable Energy Solutions for Urban Areas",
      principalInvestigator: "Dr. Michael Chen",
      department: "Engineering",
      status: "Active",
      funding: "$1,800,000",
      startDate: "2023-06-01",
      endDate: "2026-05-31",
      progress: 45,
      category: "Environmental Science"
    },
    {
      id: "3",
      title: "Quantum Computing Applications",
      principalInvestigator: "Dr. Emily Brown",
      department: "Physics",
      status: "Active",
      funding: "$3,200,000",
      startDate: "2022-09-01",
      endDate: "2025-08-31",
      progress: 78,
      category: "Quantum Physics"
    },
    {
      id: "4",
      title: "Climate Change Mitigation Strategies",
      principalInvestigator: "Dr. David Wilson",
      department: "Environmental Science",
      status: "Completed",
      funding: "$2,100,000",
      startDate: "2021-03-01",
      endDate: "2023-12-31",
      progress: 100,
      category: "Climate Science"
    },
    {
      id: "5",
      title: "Blockchain in Financial Systems",
      principalInvestigator: "Dr. Lisa Anderson",
      department: "Business",
      status: "Pending",
      funding: "$1,500,000",
      startDate: "2024-01-01",
      endDate: "2026-12-31",
      progress: 15,
      category: "FinTech"
    },
    {
      id: "6",
      title: "Neuroplasticity and Learning",
      principalInvestigator: "Dr. Robert Taylor",
      department: "Psychology",
      status: "Active",
      funding: "$1,200,000",
      startDate: "2023-04-01",
      endDate: "2025-03-31",
      progress: 55,
      category: "Neuroscience"
    },
  ];

  // Statistics
  const stats = [
    {
      title: "Active Projects",
      value: "342",
      change: "+15.7%",
      trend: "up" as const,
      icon: <IoFlaskOutline className="w-7 h-7" />,
      gradient: "from-primary-50 to-primary-50/80",
    },
    {
      title: "Total Funding",
      value: "$45.2M",
      change: "+22.3%",
      trend: "up" as const,
      icon: <IoTrophyOutline className="w-7 h-7" />,
      gradient: "from-primary-100 to-primary-100/80",
    },
    {
      title: "Publications",
      value: "1,247",
      change: "+18.5%",
      trend: "up" as const,
      icon: <IoDocumentTextOutline className="w-7 h-7" />,
      gradient: "from-primary-200 to-primary-200/80",
    },
    {
      title: "Patents Filed",
      value: "89",
      change: "+12.4%",
      trend: "up" as const,
      icon: <IoRocketOutline className="w-7 h-7" />,
      gradient: "from-primary-300 to-primary-300/80",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600 border-green-200";
      case "Completed":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "Pending":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "On Hold":
        return "bg-red-100 text-red-600 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.principalInvestigator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Research & Development
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage research projects, grants, publications, and innovation initiatives
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold">
            <IoAddOutline className="w-5 h-5" />
            New Project
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
                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                  <IoTrendingUpOutline className="w-3 h-3" />
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
          { id: "projects", label: "Projects", icon: <IoFlaskOutline /> },
          { id: "grants", label: "Grants", icon: <IoTrophyOutline /> },
          { id: "publications", label: "Publications", icon: <IoDocumentTextOutline /> },
          { id: "innovation", label: "Innovation", icon: <IoRocketOutline /> },
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
        {activeTab === "projects" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="relative">
                  <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                  />
                </div>

                {/* Filter by Status */}
                <div className="flex flex-wrap gap-2">
                  {["all", "Active", "Completed", "Pending", "On Hold"].map((filter) => (
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

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-50 mb-1 line-clamp-2">{project.title}</h3>
                      <p className="text-sm text-primary-50/60">{project.principalInvestigator}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Department:</span>
                      <span className="font-semibold text-primary-50">{project.department}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Funding:</span>
                      <span className="font-semibold text-primary-50">{project.funding}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Category:</span>
                      <span className="font-semibold text-primary-50 text-xs">{project.category}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-primary-50">Progress</span>
                      <span className="text-xs font-bold text-primary-50">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary-50 to-primary-100 h-full rounded-full transition-all duration-700"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedProject(project);
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

        {activeTab === "grants" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Grant Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "National Science Foundation", amount: "$5M", deadline: "2024-03-15", applicants: 12 },
                { title: "Research Innovation Fund", amount: "$3M", deadline: "2024-04-20", applicants: 8 },
                { title: "Technology Development Grant", amount: "$2.5M", deadline: "2024-05-10", applicants: 15 },
                { title: "Healthcare Research Grant", amount: "$4M", deadline: "2024-06-01", applicants: 10 },
              ].map((grant, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/30"
                >
                  <h3 className="text-lg font-bold text-primary-50 mb-3">{grant.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Amount:</span>
                      <span className="font-bold text-primary-50">{grant.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Deadline:</span>
                      <span className="font-semibold text-primary-50">{grant.deadline}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary-50/70">Applicants:</span>
                      <span className="font-semibold text-primary-50">{grant.applicants}</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-primary-50 text-white rounded-lg font-semibold text-sm hover:bg-primary-100 transition-all">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "publications" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Publication Metrics</h2>
              <div className="space-y-4">
                {[
                  { label: "Journal Articles", value: 847, max: 1000, color: "bg-primary-50" },
                  { label: "Conference Papers", value: 312, max: 500, color: "bg-primary-100" },
                  { label: "Book Chapters", value: 88, max: 150, color: "bg-primary-200" },
                  { label: "Citations", value: 12450, max: 15000, color: "bg-primary-300" },
                ].map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-primary-50">{metric.label}</span>
                      <span className="text-sm font-bold text-primary-50">{metric.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${metric.color} h-full rounded-full transition-all duration-700`}
                        style={{ width: `${(metric.value / metric.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-primary-50 mb-6">Top Publishers</h2>
              <div className="space-y-4">
                {[
                  { name: "Dr. Sarah Johnson", publications: 45, citations: 1250 },
                  { name: "Dr. Michael Chen", publications: 38, citations: 980 },
                  { name: "Dr. Emily Brown", publications: 32, citations: 875 },
                  { name: "Dr. David Wilson", publications: 28, citations: 720 },
                ].map((publisher, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-primary-50">{publisher.name}</div>
                        <div className="text-xs text-primary-50/60">{publisher.publications} publications</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary-50">{publisher.citations}</div>
                      <div className="text-xs text-primary-50/60">citations</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "innovation" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Innovation & Patents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "AI Algorithm Patent", status: "Approved", date: "2024-01-15", icon: <IoCheckmarkCircleOutline />, color: "from-green-500 to-green-600" },
                { title: "Renewable Energy System", status: "Pending", date: "2024-02-20", icon: <IoTimeOutline />, color: "from-amber-500 to-amber-600" },
                { title: "Medical Device Innovation", status: "Under Review", date: "2024-03-10", icon: <IoFlaskOutline />, color: "from-blue-500 to-blue-600" },
                { title: "Blockchain Protocol", status: "Approved", date: "2023-12-05", icon: <IoCheckmarkCircleOutline />, color: "from-green-500 to-green-600" },
                { title: "Quantum Sensor Technology", status: "Pending", date: "2024-04-01", icon: <IoTimeOutline />, color: "from-amber-500 to-amber-600" },
                { title: "Biotech Solution", status: "Approved", date: "2023-11-20", icon: <IoCheckmarkCircleOutline />, color: "from-green-500 to-green-600" },
              ].map((patent, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl border-2 border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${patent.color} text-white shadow-md`}>
                      {patent.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-primary-50 line-clamp-1">{patent.title}</h3>
                      <p className="text-xs text-primary-50/60">{patent.date}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    patent.status === "Approved" ? "bg-green-100 text-green-600" :
                    patent.status === "Pending" ? "bg-amber-100 text-amber-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    {patent.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-[scaleIn_0.3s_ease-out]">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary-50 to-primary-100 text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                  <p className="text-white/90">PI: {selectedProject.principalInvestigator}</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <IoCloseOutline className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status and Info */}
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-primary-50/10 text-primary-50 border border-primary-50/20">
                  {selectedProject.department}
                </span>
                <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-primary-100/10 text-primary-100 border border-primary-100/20">
                  {selectedProject.category}
                </span>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50/5 to-primary-50/10 border border-primary-50/20">
                  <div className="text-2xl font-bold text-primary-50">{selectedProject.funding}</div>
                  <div className="text-sm text-primary-50/70 mt-1">Total Funding</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary-100/5 to-primary-100/10 border border-primary-100/20">
                  <div className="text-2xl font-bold text-primary-100">{selectedProject.progress}%</div>
                  <div className="text-sm text-primary-50/70 mt-1">Completion</div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-bold text-primary-50 mb-3 flex items-center gap-2">
                  <IoCalendarOutline className="w-5 h-5" />
                  Project Timeline
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-primary-50/70 mb-1">Start Date</div>
                    <div className="font-semibold text-primary-50">{selectedProject.startDate}</div>
                  </div>
                  <div className="text-primary-50/30">→</div>
                  <div className="flex-1">
                    <div className="text-sm text-primary-50/70 mb-1">End Date</div>
                    <div className="font-semibold text-primary-50">{selectedProject.endDate}</div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h3 className="text-lg font-bold text-primary-50 mb-3 flex items-center gap-2">
                  <IoPeopleOutline className="w-5 h-5" />
                  Research Team
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Principal Investigator", "Co-Investigator", "Research Associate", "Graduate Assistant"].map((role, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 text-white flex items-center justify-center text-xs font-bold">
                        {role[0]}
                      </div>
                      <span className="text-sm text-primary-50">{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h3 className="text-lg font-bold text-primary-50 mb-3 flex items-center gap-2">
                  <IoStatsChartOutline className="w-5 h-5" />
                  Key Milestones
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "Project Initiation", completed: true },
                    { title: "Literature Review", completed: true },
                    { title: "Data Collection", completed: selectedProject.progress > 50 },
                    { title: "Analysis & Results", completed: selectedProject.progress > 75 },
                    { title: "Final Report", completed: selectedProject.progress === 100 },
                  ].map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {milestone.completed ? (
                        <IoCheckmarkCircleOutline className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                      )}
                      <span className={`text-sm ${milestone.completed ? 'text-primary-50' : 'text-primary-50/50'}`}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  View Full Report
                </button>
                <button className="flex-1 px-4 py-3 bg-gray-100 text-primary-50 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                  Contact Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchDevelopment;
