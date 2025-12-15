import React, { useState } from "react";
import {
    IoAddOutline,
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoGridOutline,
    IoPencilOutline,
    IoSearchOutline,
    IoShieldCheckmarkOutline,
    IoTimeOutline,
    IoWarningOutline
} from "react-icons/io5";

interface Policy {
  id: string;
  title: string;
  category: string;
  version: string;
  status: "active" | "draft" | "under-review" | "archived";
  lastUpdated: string;
  effectiveDate: string;
  reviewDate: string;
  compliance: number;
  description: string;
  owner: string;
}

interface ComplianceItem {
  id: string;
  requirement: string;
  status: "compliant" | "non-compliant" | "partial" | "pending";
  lastAudit: string;
  nextAudit: string;
  priority: "high" | "medium" | "low";
}

const PoliciesGovernance: React.FC = () => {
  const [activeView, setActiveView] = useState<"policies" | "compliance" | "governance">("policies");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock data
  const policies: Policy[] = [
    {
      id: "1",
      title: "Academic Integrity Policy",
      category: "Academic",
      version: "3.2",
      status: "active",
      lastUpdated: "2024-09-15",
      effectiveDate: "2024-10-01",
      reviewDate: "2025-09-15",
      compliance: 95,
      description: "Guidelines for maintaining academic honesty and integrity across all programs",
      owner: "Academic Affairs",
    },
    {
      id: "2",
      title: "Student Code of Conduct",
      category: "Student Affairs",
      version: "2.5",
      status: "active",
      lastUpdated: "2024-08-20",
      effectiveDate: "2024-09-01",
      reviewDate: "2025-08-20",
      compliance: 88,
      description: "Standards of behavior and disciplinary procedures for students",
      owner: "Student Services",
    },
    {
      id: "3",
      title: "Data Protection & Privacy Policy",
      category: "IT & Security",
      version: "4.1",
      status: "active",
      lastUpdated: "2024-11-01",
      effectiveDate: "2024-11-15",
      reviewDate: "2025-05-01",
      compliance: 92,
      description: "Compliance with data protection regulations and privacy standards",
      owner: "IT Department",
    },
    {
      id: "4",
      title: "Faculty Evaluation Framework",
      category: "HR & Personnel",
      version: "1.8",
      status: "under-review",
      lastUpdated: "2024-10-10",
      effectiveDate: "2025-01-01",
      reviewDate: "2025-10-10",
      compliance: 78,
      description: "Comprehensive framework for faculty performance assessment",
      owner: "Human Resources",
    },
    {
      id: "5",
      title: "Financial Aid Distribution Policy",
      category: "Finance",
      version: "2.0",
      status: "active",
      lastUpdated: "2024-07-15",
      effectiveDate: "2024-08-01",
      reviewDate: "2025-07-15",
      compliance: 100,
      description: "Guidelines for equitable distribution of financial aid and scholarships",
      owner: "Financial Aid Office",
    },
    {
      id: "6",
      title: "Research Ethics Guidelines",
      category: "Research",
      version: "3.0",
      status: "draft",
      lastUpdated: "2024-11-20",
      effectiveDate: "2025-02-01",
      reviewDate: "2026-11-20",
      compliance: 0,
      description: "Ethical standards and procedures for research activities",
      owner: "Research Office",
    },
  ];

  const complianceItems: ComplianceItem[] = [
    {
      id: "1",
      requirement: "FERPA Compliance",
      status: "compliant",
      lastAudit: "2024-10-15",
      nextAudit: "2025-04-15",
      priority: "high",
    },
    {
      id: "2",
      requirement: "Title IX Compliance",
      status: "compliant",
      lastAudit: "2024-09-20",
      nextAudit: "2025-03-20",
      priority: "high",
    },
    {
      id: "3",
      requirement: "ADA Accessibility Standards",
      status: "partial",
      lastAudit: "2024-11-01",
      nextAudit: "2025-02-01",
      priority: "medium",
    },
    {
      id: "4",
      requirement: "Accreditation Standards",
      status: "compliant",
      lastAudit: "2024-08-10",
      nextAudit: "2025-08-10",
      priority: "high",
    },
    {
      id: "5",
      requirement: "Health & Safety Regulations",
      status: "non-compliant",
      lastAudit: "2024-10-25",
      nextAudit: "2024-12-15",
      priority: "high",
    },
    {
      id: "6",
      requirement: "Environmental Compliance",
      status: "pending",
      lastAudit: "2024-07-30",
      nextAudit: "2024-12-30",
      priority: "low",
    },
  ];

  const categories = ["all", "Academic", "Student Affairs", "IT & Security", "HR & Personnel", "Finance", "Research"];

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || policy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "compliant":
        return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      case "draft":
      case "pending":
        return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "under-review":
      case "partial":
        return "bg-primary-50/10 text-primary-50 border-primary-50/30";
      case "archived":
      case "non-compliant":
        return "bg-primary-200/10 text-primary-200 border-primary-200/30";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-primary-200/10 text-primary-200 border-primary-200/30";
      case "medium":
        return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "low":
        return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return "from-green-500 to-emerald-500";
    if (compliance >= 75) return "from-blue-500 to-cyan-500";
    if (compliance >= 50) return "from-amber-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  const totalPolicies = policies.length;
  const activePolicies = policies.filter((p) => p.status === "active").length;
  const underReview = policies.filter((p) => p.status === "under-review").length;
  const avgCompliance = Math.round(
    policies.reduce((acc, p) => acc + p.compliance, 0) / policies.length
  );

  const compliantItems = complianceItems.filter((c) => c.status === "compliant").length;
  const nonCompliantItems = complianceItems.filter((c) => c.status === "non-compliant").length;
  const partialCompliantItems = complianceItems.filter((c) => c.status === "partial").length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out_both]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Policies & Governance
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage institutional policies, compliance, and governance frameworks
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md border border-gray-200">
              <IoDownloadOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2 shadow-md">
              <IoAddOutline className="w-5 h-5" />
              <span className="hidden sm:inline">New Policy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { Icon: IoDocumentTextOutline, label: "Total Policies", value: totalPolicies, color: "primary-50" },
          { Icon: IoCheckmarkCircleOutline, label: "Active Policies", value: activePolicies, color: "primary-300" },
          { Icon: IoTimeOutline, label: "Under Review", value: underReview, color: "primary-100" },
          { Icon: IoShieldCheckmarkOutline, label: "Avg Compliance", value: `${avgCompliance}%`, color: "primary-200" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color} mb-3 inline-block`}>
              <stat.Icon className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{stat.value}</div>
            <div className="text-sm font-semibold text-primary-50/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex flex-wrap gap-1 mb-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
        {[
          { id: "policies", label: "Policies", icon: IoDocumentTextOutline },
          { id: "compliance", label: "Compliance", icon: IoShieldCheckmarkOutline },
          { id: "governance", label: "Governance", icon: IoGridOutline },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeView === view.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            <view.icon className="w-5 h-5" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Policies View */}
      {activeView === "policies" && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/50" />
                <input
                  type="text"
                  placeholder="Search policies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl font-semibold border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Policies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPolicies.map((policy, index) => (
              <div
                key={policy.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[scaleIn_0.4s_ease-out_both]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary-50 mb-1">{policy.title}</h3>
                    <p className="text-xs text-primary-50/60">{policy.category} • Version {policy.version}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(policy.status)}`}>
                    {policy.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-primary-50/70 mb-4 line-clamp-2">{policy.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-primary-50/60">Owner:</span>
                    <span className="font-semibold text-primary-50">{policy.owner}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-primary-50/60">Effective Date:</span>
                    <span className="font-semibold text-primary-50">{policy.effectiveDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-primary-50/60">Next Review:</span>
                    <span className="font-semibold text-primary-50">{policy.reviewDate}</span>
                  </div>
                </div>

                {/* Compliance Progress */}
                {policy.status !== "draft" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-primary-50/70">Compliance</span>
                      <span className="text-xs font-bold text-primary-50">{policy.compliance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-linear-to-r ${getComplianceColor(policy.compliance)} transition-all duration-500`}
                        style={{ width: `${policy.compliance}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 px-3 py-2 bg-primary-50/10 text-primary-50 rounded-lg text-sm font-semibold hover:bg-primary-50/20 transition-colors flex items-center justify-center gap-2">
                    <IoEyeOutline className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 bg-primary-100/10 text-primary-100 rounded-lg text-sm font-semibold hover:bg-primary-100/20 transition-colors flex items-center justify-center gap-2">
                    <IoPencilOutline className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="px-3 py-2 bg-gray-50 text-primary-50 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                    <IoDownloadOutline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance View */}
      {activeView === "compliance" && (
        <div className="space-y-6">
          {/* Compliance Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { label: "Compliant", value: compliantItems, icon: IoCheckmarkCircleOutline, color: "primary-300" },
              { label: "Partial Compliance", value: partialCompliantItems, icon: IoWarningOutline, color: "primary-100" },
              { label: "Non-Compliant", value: nonCompliantItems, icon: IoCloseCircleOutline, color: "primary-200" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-[slideUp_0.5s_ease-out_both]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color} mb-3 inline-block`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-primary-50 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-primary-50/70">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Compliance Items */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-primary-50">Compliance Requirements</h2>
            </div>

            {/* Mobile Card View */}
            <div className="block lg:hidden p-4 space-y-4">
              {complianceItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl border border-gray-100 hover:shadow-md transition-all animate-[slideUp_0.5s_ease-out_both]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-primary-50 flex-1">{item.requirement}</h3>
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-primary-50/60">Priority:</span>
                      <span className={`px-2 py-0.5 rounded-full border text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                        {item.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-50/60">Last Audit:</span>
                      <span className="font-semibold text-primary-50">{item.lastAudit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-50/60">Next Audit:</span>
                      <span className="font-semibold text-primary-50">{item.nextAudit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-primary-50 uppercase tracking-wider">Requirement</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Last Audit</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Next Audit</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-primary-50 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {complianceItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors animate-[slideUp_0.4s_ease-out_both]"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-primary-50">{item.requirement}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                          {item.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-primary-50/70">{item.lastAudit}</td>
                      <td className="px-6 py-4 text-center text-sm text-primary-50/70">{item.nextAudit}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="px-3 py-1.5 bg-primary-50/10 text-primary-50 rounded-lg text-xs font-semibold hover:bg-primary-50/20 transition-colors">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Governance View */}
      {activeView === "governance" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Governance Structure */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Governance Structure</h2>
            <div className="space-y-4">
              {[
                { title: "Board of Trustees", members: 12, meetings: "Quarterly", nextMeeting: "2024-12-15" },
                { title: "Academic Senate", members: 25, meetings: "Monthly", nextMeeting: "2024-12-05" },
                { title: "Administrative Council", members: 8, meetings: "Bi-weekly", nextMeeting: "2024-12-02" },
                { title: "Student Government", members: 15, meetings: "Weekly", nextMeeting: "2024-11-29" },
              ].map((body, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl border border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all animate-[slideUp_0.5s_ease-out_both]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-bold text-primary-50 mb-3">{body.title}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="text-primary-50/60 mb-1">Members</div>
                      <div className="font-bold text-primary-50">{body.members}</div>
                    </div>
                    <div>
                      <div className="text-primary-50/60 mb-1">Meetings</div>
                      <div className="font-bold text-primary-50">{body.meetings}</div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <div className="text-primary-50/60 mb-1">Next Meeting</div>
                      <div className="font-bold text-primary-50">{body.nextMeeting}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Decisions */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-bold text-primary-50 mb-6">Recent Governance Decisions</h2>
            <div className="space-y-4">
              {[
                { title: "Budget Allocation FY 2025", date: "2024-11-20", status: "approved", body: "Board of Trustees" },
                { title: "Curriculum Reform Proposal", date: "2024-11-18", status: "pending", body: "Academic Senate" },
                { title: "Campus Expansion Plan", date: "2024-11-15", status: "approved", body: "Administrative Council" },
                { title: "Student Wellness Initiative", date: "2024-11-10", status: "approved", body: "Student Government" },
                { title: "Faculty Tenure Guidelines", date: "2024-11-05", status: "under-review", body: "Academic Senate" },
              ].map((decision, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all animate-[slideUp_0.5s_ease-out_both]"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-primary-50 text-sm flex-1">{decision.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full border text-xs font-semibold ${
                      decision.status === "approved" ? getStatusColor("active") : getStatusColor(decision.status)
                    }`}>
                      {decision.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-primary-50/60">
                    <span>{decision.body}</span>
                    <span>{decision.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Review Schedule */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "400ms" }}>
            <h2 className="text-xl font-bold text-primary-50 mb-6">Upcoming Policy Reviews</h2>
            <div className="space-y-3">
              {policies
                .filter((p) => p.status === "active")
                .sort((a, b) => new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime())
                .slice(0, 5)
                .map((policy, index) => (
                  <div
                    key={policy.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all animate-[slideUp_0.5s_ease-out_both]"
                    style={{ animationDelay: `${index * 100 + 400}ms` }}
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-primary-50 text-sm truncate">{policy.title}</h4>
                      <p className="text-xs text-primary-50/60 mt-1">{policy.category}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs font-bold text-primary-50">{policy.reviewDate}</div>
                      <div className="text-[10px] text-primary-50/50 mt-1">Review Due</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Governance Metrics */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "600ms" }}>
            <h2 className="text-xl font-bold text-primary-50 mb-6">Governance Metrics</h2>
            <div className="space-y-4">
              {[
                { label: "Meeting Attendance Rate", value: "92%", status: "excellent" },
                { label: "Decision Implementation", value: "85%", status: "on-track" },
                { label: "Stakeholder Engagement", value: "78%", status: "on-track" },
                { label: "Policy Compliance Rate", value: `${avgCompliance}%`, status: "excellent" },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 animate-[slideUp_0.5s_ease-out_both]"
                  style={{ animationDelay: `${index * 100 + 600}ms` }}
                >
                  <span className="text-sm font-semibold text-primary-50/70">{metric.label}</span>
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliciesGovernance;
