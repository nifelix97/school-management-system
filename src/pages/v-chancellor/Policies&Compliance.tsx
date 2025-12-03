import React, { useCallback, useMemo, useState } from "react";
import {
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoCreateOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline
} from "react-icons/io5";

interface Policy {
  id: string;
  title: string;
  category: "Academic" | "Administrative" | "Financial" | "Student Affairs" | "Research" | "HR";
  status: "Active" | "Under Review" | "Pending Approval" | "Archived";
  version: string;
  lastUpdated: string;
  nextReview: string;
  owner: string;
  compliance: number;
  description: string;
}

interface ComplianceIssue {
  id: string;
  policyId: string;
  policyTitle: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  description: string;
  reportedBy: string;
  reportedDate: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  assignedTo: string;
}

const PoliciesCompliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "policies" | "compliance" | "audits">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 8;

  const policies: Policy[] = useMemo(() => [
    {
      id: "1",
      title: "Academic Integrity and Misconduct Policy",
      category: "Academic",
      status: "Active",
      version: "3.2",
      lastUpdated: "2024-09-15",
      nextReview: "2025-09-15",
      owner: "Provost Office",
      compliance: 98,
      description: "Defines standards for academic honesty and procedures for handling misconduct cases."
    },
    {
      id: "2",
      title: "Data Protection and Privacy Policy",
      category: "Administrative",
      status: "Active",
      version: "2.1",
      lastUpdated: "2024-11-01",
      nextReview: "2025-05-01",
      owner: "IT Security",
      compliance: 95,
      description: "Ensures compliance with data protection regulations and safeguards personal information."
    },
    {
      id: "3",
      title: "Financial Aid and Scholarship Policy",
      category: "Financial",
      status: "Under Review",
      version: "4.0",
      lastUpdated: "2024-08-20",
      nextReview: "2025-02-20",
      owner: "Financial Aid Office",
      compliance: 92,
      description: "Outlines eligibility criteria and procedures for financial assistance programs."
    },
    {
      id: "4",
      title: "Student Code of Conduct",
      category: "Student Affairs",
      status: "Active",
      version: "5.1",
      lastUpdated: "2024-07-10",
      nextReview: "2025-07-10",
      owner: "Student Affairs",
      compliance: 97,
      description: "Establishes behavioral expectations and disciplinary procedures for students."
    },
    {
      id: "5",
      title: "Research Ethics and Compliance",
      category: "Research",
      status: "Active",
      version: "2.3",
      lastUpdated: "2024-10-05",
      nextReview: "2025-10-05",
      owner: "Research Office",
      compliance: 94,
      description: "Guidelines for ethical research practices and regulatory compliance."
    },
    {
      id: "6",
      title: "Employee Recruitment and Hiring",
      category: "HR",
      status: "Pending Approval",
      version: "3.0",
      lastUpdated: "2024-11-20",
      nextReview: "2025-11-20",
      owner: "Human Resources",
      compliance: 89,
      description: "Procedures for fair and transparent recruitment processes."
    },
    {
      id: "7",
      title: "Procurement and Vendor Management",
      category: "Financial",
      status: "Active",
      version: "1.8",
      lastUpdated: "2024-06-15",
      nextReview: "2025-06-15",
      owner: "Procurement Office",
      compliance: 91,
      description: "Standards for purchasing goods and services and managing vendor relationships."
    },
    {
      id: "8",
      title: "Health and Safety Policy",
      category: "Administrative",
      status: "Active",
      version: "4.2",
      lastUpdated: "2024-09-30",
      nextReview: "2025-03-30",
      owner: "Safety Office",
      compliance: 96,
      description: "Ensures a safe and healthy environment for all university members."
    },
  ], []);

  const complianceIssues: ComplianceIssue[] = useMemo(() => [
    {
      id: "1",
      policyId: "2",
      policyTitle: "Data Protection and Privacy Policy",
      severity: "High",
      description: "Unauthorized access to student records detected in the admissions system",
      reportedBy: "IT Security Team",
      reportedDate: "2024-11-25",
      status: "In Progress",
      assignedTo: "Chief Information Officer"
    },
    {
      id: "2",
      policyId: "3",
      policyTitle: "Financial Aid and Scholarship Policy",
      severity: "Medium",
      description: "Inconsistent application of eligibility criteria across departments",
      reportedBy: "Internal Audit",
      reportedDate: "2024-11-22",
      status: "Open",
      assignedTo: "Financial Aid Director"
    },
    {
      id: "3",
      policyId: "1",
      policyTitle: "Academic Integrity and Misconduct Policy",
      severity: "Critical",
      description: "Multiple plagiarism cases not reported according to policy timeline",
      reportedBy: "Academic Affairs",
      reportedDate: "2024-11-28",
      status: "Open",
      assignedTo: "Provost"
    },
  ], []);

  const stats = useMemo(() => [
    { title: "Active Policies", value: "42", change: "+3", icon: <IoDocumentTextOutline /> },
    { title: "Avg Compliance", value: "94%", change: "+2%", icon: <IoShieldCheckmarkOutline /> },
    { title: "Open Issues", value: "8", change: "-2", icon: <IoAlertCircleOutline /> },
    { title: "Due Reviews", value: "5", change: "+1", icon: <IoTimeOutline /> },
  ], []);

  const getStatusColor = useCallback((status: string) => {
    const colors = {
      "Active": "bg-green-100 text-green-700",
      "Under Review": "bg-blue-100 text-blue-700",
      "Pending Approval": "bg-yellow-100 text-yellow-700",
      "Archived": "bg-gray-100 text-gray-700"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
  }, []);

  const getSeverityColor = useCallback((severity: string) => {
    const colors = {
      "Critical": "bg-red-100 text-red-700",
      "High": "bg-orange-100 text-orange-700",
      "Medium": "bg-yellow-100 text-yellow-700",
      "Low": "bg-blue-100 text-blue-700"
    };
    return colors[severity as keyof typeof colors] || "bg-gray-100 text-gray-700";
  }, []);

  const getIssueStatusColor = useCallback((status: string) => {
    const colors = {
      "Open": "bg-red-100 text-red-700",
      "In Progress": "bg-blue-100 text-blue-700",
      "Resolved": "bg-green-100 text-green-700",
      "Closed": "bg-gray-100 text-gray-700"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
  }, []);

  const filteredPolicies = useMemo(() => {
    return policies.filter(policy => {
      const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || policy.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [policies, searchQuery, selectedCategory]);

  const paginatedPolicies = useMemo(() => {
    return filteredPolicies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredPolicies, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredPolicies.length / itemsPerPage);
  }, [filteredPolicies.length, itemsPerPage]);

  const handleTabChange = useCallback((tab: "overview" | "policies" | "compliance" | "audits") => {
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
        <h1 className="text-2xl md:text-3xl font-bold text-primary-50 mb-2">Policies & Compliance</h1>
        <p className="text-primary-50/70">Manage university policies and ensure regulatory compliance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-primary-50/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl text-primary-100">{stat.icon}</div>
              <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-primary-300' : 'text-primary-200'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-xs text-primary-50/60 mb-1">{stat.title}</div>
            <div className="text-xl font-bold text-primary-50">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-50/20 mb-6">
        <div className="flex flex-wrap border-b border-primary-50/20">
          {[
            { id: "overview", label: "Overview" },
            { id: "policies", label: "Policies" },
            { id: "compliance", label: "Compliance Issues" },
            { id: "audits", label: "Audits" },
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
            <div className="space-y-6">
              {/* Policy Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-primary-50">Policies by Category</h3>
                  <div className="space-y-3">
                    {[
                      { category: "Academic", count: 12, color: "bg-purple-500" },
                      { category: "Administrative", count: 10, color: "bg-blue-500" },
                      { category: "Financial", count: 8, color: "bg-green-500" },
                      { category: "Student Affairs", count: 6, color: "bg-pink-500" },
                      { category: "Research", count: 4, color: "bg-yellow-500" },
                      { category: "HR", count: 2, color: "bg-orange-500" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded ${item.color}`}></div>
                        <span className="text-sm text-gray-600 flex-1">{item.category}</span>
                        <span className="text-sm font-medium text-primary-50">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-primary-50">Compliance Status</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Fully Compliant", value: 85, color: "bg-primary-300" },
                      { label: "Minor Issues", value: 10, color: "bg-primary-100" },
                      { label: "Major Issues", value: 5, color: "bg-primary-200" },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-primary-50/70">{item.label}</span>
                          <span className="font-medium text-primary-50">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-full rounded-full ${item.color}`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Updates */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Recent Policy Updates</h3>
                <div className="space-y-3">
                  {policies.slice(0, 4).map((policy) => (
                    <div key={policy.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-primary-50/20">
                      <div className="p-2 rounded bg-primary-100/10 text-primary-100">
                        <IoDocumentTextOutline className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-primary-50 mb-1">{policy.title}</div>
                        <div className="flex flex-wrap gap-2 text-xs text-primary-50/60">
                          <span className="flex items-center gap-1">
                            <IoCalendarOutline className="w-3 h-3" />
                            Updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <IoPersonOutline className="w-3 h-3" />
                            {policy.owner}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Compliance Issues */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Critical Compliance Issues</h3>
                <div className="space-y-3">
                  {complianceIssues.filter(i => i.severity === "Critical" || i.severity === "High").map((issue) => (
                    <div key={issue.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-primary-50/20">
                      <div className={`p-2 rounded ${issue.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                        <IoAlertCircleOutline className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-primary-50 mb-1">{issue.policyTitle}</div>
                        <div className="text-xs text-primary-50/70 mb-2">{issue.description}</div>
                        <div className="flex flex-wrap gap-2 text-xs text-primary-50/60">
                          <span>Assigned: {issue.assignedTo}</span>
                          <span>•</span>
                          <span>{new Date(issue.reportedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "policies" && (
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search policies..."
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
                  <option value="Academic">Academic</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Financial">Financial</option>
                  <option value="Student Affairs">Student Affairs</option>
                  <option value="Research">Research</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              {/* Policies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedPolicies.map((policy) => (
                  <div key={policy.id} className="bg-white border border-primary-50/20 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="mb-3">
                      <h4 className="font-medium text-primary-50 mb-1 line-clamp-2">{policy.title}</h4>
                      <p className="text-xs text-primary-50/60">{policy.owner}</p>
                    </div>

                    <div className="flex gap-2 mb-3 flex-wrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        v{policy.version}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-primary-50/60">Last Updated:</span>
                        <span className="font-medium">{new Date(policy.lastUpdated).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-50/60">Next Review:</span>
                        <span className="font-medium">{new Date(policy.nextReview).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-primary-50/60">Compliance</span>
                        <span className="font-medium">{policy.compliance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${
                            policy.compliance >= 95 ? 'bg-primary-300' :
                            policy.compliance >= 90 ? 'bg-primary-100' :
                            'bg-primary-200'
                          }`}
                          style={{ width: `${policy.compliance}%` }}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedPolicy(policy);
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

          {activeTab === "compliance" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-primary-50">Compliance Issues</h3>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 text-sm">
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {complianceIssues.map((issue) => (
                <div key={issue.id} className="border border-primary-50/20 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className={`p-2 rounded ${
                          issue.severity === 'Critical' ? 'bg-red-100 text-red-600' :
                          issue.severity === 'High' ? 'bg-orange-100 text-orange-600' :
                          issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <IoAlertCircleOutline className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-primary-50 mb-1">{issue.policyTitle}</h4>
                          <p className="text-sm text-primary-50/70 mb-2">{issue.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getIssueStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-primary-50/70 mb-3">
                    <div>
                      <span className="block text-primary-50/50 mb-1">Reported By</span>
                      <span className="font-medium text-primary-50">{issue.reportedBy}</span>
                    </div>
                    <div>
                      <span className="block text-primary-50/50 mb-1">Reported Date</span>
                      <span className="font-medium text-primary-50">{new Date(issue.reportedDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="block text-primary-50/50 mb-1">Assigned To</span>
                      <span className="font-medium text-primary-50">{issue.assignedTo}</span>
                    </div>
                    <div>
                      <span className="block text-primary-50/50 mb-1">Status</span>
                      <span className="font-medium text-primary-50">{issue.status}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-primary-50/20">
                    <button className="px-3 py-1 bg-primary-100 text-white text-sm rounded hover:bg-primary-100/80 transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-primary-50 text-sm rounded hover:bg-gray-200 transition-colors">
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "audits" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-primary-50">Audit Schedule & Reports</h3>
                <button className="px-4 py-2 bg-primary-100 text-white text-sm rounded hover:bg-primary-100/80 transition-colors">
                  Schedule Audit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Annual Compliance Audit 2024",
                    type: "Comprehensive",
                    date: "2024-12-15",
                    status: "Scheduled",
                    auditor: "External Audit Firm",
                    scope: "All university policies and procedures"
                  },
                  {
                    title: "Financial Policies Review",
                    type: "Focused",
                    date: "2024-11-30",
                    status: "Completed",
                    auditor: "Internal Audit Team",
                    scope: "Financial and procurement policies"
                  },
                  {
                    title: "Data Protection Compliance",
                    type: "Regulatory",
                    date: "2024-12-10",
                    status: "In Progress",
                    auditor: "IT Security Consultant",
                    scope: "Data protection and privacy policies"
                  },
                  {
                    title: "Academic Integrity Assessment",
                    type: "Focused",
                    date: "2025-01-20",
                    status: "Scheduled",
                    auditor: "Academic Affairs Committee",
                    scope: "Academic policies and student conduct"
                  },
                ].map((audit, index) => (
                  <div key={index} className="bg-white border border-primary-50/20 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-primary-50 flex-1">{audit.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        audit.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        audit.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {audit.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs mb-4">
                      <div className="flex justify-between">
                        <span className="text-primary-50/60">Type:</span>
                        <span className="font-medium">{audit.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-50/60">Date:</span>
                        <span className="font-medium">{new Date(audit.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-50/60">Auditor:</span>
                        <span className="font-medium">{audit.auditor}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs text-primary-50/60 block mb-1">Scope:</span>
                      <p className="text-xs text-primary-50/70">{audit.scope}</p>
                    </div>

                    <div className="flex gap-2">
                      {audit.status === 'Completed' && (
                        <>
                          <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary-100 text-white text-xs rounded hover:bg-primary-100/80 transition-colors">
                            <IoEyeOutline className="w-4 h-4" />
                            View Report
                          </button>
                          <button className="px-3 py-2 bg-gray-100 text-primary-50 text-xs rounded hover:bg-gray-200 transition-colors">
                            <IoDownloadOutline className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {audit.status === 'In Progress' && (
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary-100 text-white text-xs rounded hover:bg-primary-100/80 transition-colors">
                          <IoEyeOutline className="w-4 h-4" />
                          Track Progress
                        </button>
                      )}
                      {audit.status === 'Scheduled' && (
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary-100 text-white text-xs rounded hover:bg-primary-100/80 transition-colors">
                          <IoCreateOutline className="w-4 h-4" />
                          Edit Schedule
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Policy Details Modal */}
      {isModalOpen && selectedPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">{selectedPolicy.title}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded">
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedPolicy.status)}`}>
                  {selectedPolicy.status}
                </span>
                <span className="px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-700">
                  Version {selectedPolicy.version}
                </span>
                <span className="px-3 py-1 rounded text-sm font-medium bg-blue-100 text-blue-700">
                  {selectedPolicy.category}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-primary-50 mb-2">Description</h3>
                <p className="text-sm text-primary-50/70">{selectedPolicy.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-primary-50/60 block mb-1">Policy Owner</span>
                  <p className="font-medium">{selectedPolicy.owner}</p>
                </div>
                <div>
                  <span className="text-primary-50/60 block mb-1">Category</span>
                  <p className="font-medium">{selectedPolicy.category}</p>
                </div>
                <div>
                  <span className="text-primary-50/60 block mb-1">Last Updated</span>
                  <p className="font-medium">{new Date(selectedPolicy.lastUpdated).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-primary-50/60 block mb-1">Next Review</span>
                  <p className="font-medium">{new Date(selectedPolicy.nextReview).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary-50/60">Compliance Rate</span>
                  <span className="font-medium">{selectedPolicy.compliance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-full rounded-full ${
                      selectedPolicy.compliance >= 95 ? 'bg-primary-300' :
                      selectedPolicy.compliance >= 90 ? 'bg-primary-100' :
                      'bg-primary-200'
                    }`}
                    style={{ width: `${selectedPolicy.compliance}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-primary-50/20">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-100/80 transition-colors">
                  <IoEyeOutline className="w-4 h-4" />
                  View Full Policy
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200 transition-colors">
                  <IoDownloadOutline className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliciesCompliance;
