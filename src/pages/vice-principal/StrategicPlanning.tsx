import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoDocumentTextOutline,
    IoFlagOutline,
    IoLayersOutline,
    IoPeopleOutline,
    IoRocketOutline,
    IoSchoolOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

interface StrategicGoal {
  id: string;
  title: string;
  description: string;
  category: "Academic" | "Financial" | "Infrastructure" | "Research";
  status: "planning" | "in-progress" | "completed" | "on-hold";
  progress: number;
  startDate: string;
  targetDate: string;
  owner: string;
  initiatives: number;
}

interface Initiative {
  id: string;
  goalId: string;
  title: string;
  status: "not-started" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  dueDate: string;
  assignedTo: string;
}

const StrategicPlanning: React.FC = () => {
  const [activeView, setActiveView] = useState<"overview" | "goals" | "timeline">("overview");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock data - in a real app, this would come from an API
  const strategicGoals: StrategicGoal[] = [
    {
      id: "1",
      title: "Enhance Academic Excellence",
      description: "Improve curriculum quality and student outcomes across all departments",
      category: "Academic",
      status: "in-progress",
      progress: 68,
      startDate: "2025-01-01",
      targetDate: "2025-12-31",
      owner: "VP Academic Affairs",
      initiatives: 8,
    },
    {
      id: "2",
      title: "Digital Transformation Initiative",
      description: "Modernize campus infrastructure and implement smart technologies",
      category: "Infrastructure",
      status: "in-progress",
      progress: 45,
      startDate: "2025-02-01",
      targetDate: "2026-06-30",
      owner: "CTO",
      initiatives: 12,
    },
    {
      id: "3",
      title: "Research Output Expansion",
      description: "Increase research publications and secure more grants",
      category: "Research",
      status: "in-progress",
      progress: 52,
      startDate: "2025-01-15",
      targetDate: "2025-11-30",
      owner: "Dean of Research",
      initiatives: 6,
    },
    {
      id: "4",
      title: "Financial Sustainability Plan",
      description: "Diversify revenue streams and optimize operational costs",
      category: "Financial",
      status: "planning",
      progress: 25,
      startDate: "2025-03-01",
      targetDate: "2026-12-31",
      owner: "CFO",
      initiatives: 5,
    },
  ];

  const initiatives: Initiative[] = [
    { id: "1", goalId: "1", title: "Curriculum Review & Update", status: "in-progress", priority: "high", dueDate: "2025-06-30", assignedTo: "Academic Committee" },
    { id: "2", goalId: "1", title: "Faculty Development Program", status: "in-progress", priority: "medium", dueDate: "2025-08-15", assignedTo: "HR Department" },
    { id: "3", goalId: "2", title: "Campus WiFi Upgrade", status: "completed", priority: "high", dueDate: "2025-04-30", assignedTo: "IT Department" },
    { id: "4", goalId: "2", title: "Smart Classroom Implementation", status: "in-progress", priority: "high", dueDate: "2025-09-30", assignedTo: "Facilities Team" },
    { id: "5", goalId: "3", title: "Research Grant Workshop", status: "completed", priority: "medium", dueDate: "2025-03-15", assignedTo: "Research Office" },
    { id: "6", goalId: "4", title: "Alumni Fundraising Campaign", status: "not-started", priority: "high", dueDate: "2025-07-01", assignedTo: "Development Office" },
  ];

  const categories = ["all", "Academic", "Financial", "Infrastructure", "Research"];

  const filteredGoals = selectedCategory === "all" 
    ? strategicGoals 
    : strategicGoals.filter(goal => goal.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-50 text-green-600 border-green-200";
      case "in-progress": return "bg-blue-50 text-blue-600 border-blue-200";
      case "planning": return "bg-amber-50 text-amber-600 border-amber-200";
      case "on-hold": return "bg-gray-50 text-gray-600 border-gray-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-600 border-red-200";
      case "medium": return "bg-amber-50 text-amber-600 border-amber-200";
      case "low": return "bg-blue-50 text-blue-600 border-blue-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Academic": return <IoSchoolOutline className="w-5 h-5" />;
      case "Financial": return <IoStatsChartOutline className="w-5 h-5" />;
      case "Infrastructure": return <IoLayersOutline className="w-5 h-5" />;
      case "Research": return <IoDocumentTextOutline className="w-5 h-5" />;
      default: return <IoFlagOutline className="w-5 h-5" />;
    }
  };

  const overallProgress = Math.round(
    strategicGoals.reduce((acc, goal) => acc + goal.progress, 0) / strategicGoals.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Strategic Planning
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Institutional goals, initiatives, and progress tracking
            </p>
          </div>
          <button className="px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2 shadow-md">
            <IoAddOutline className="w-5 h-5" />
            New Goal
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-primary-50/10 text-primary-50">
              <IoFlagOutline className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-primary-50">{strategicGoals.length}</span>
          </div>
          <div className="text-sm font-semibold text-primary-50/70">Active Goals</div>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-primary-100/10 text-primary-100">
              <IoRocketOutline className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-primary-50">{initiatives.length}</span>
          </div>
          <div className="text-sm font-semibold text-primary-50/70">Total Initiatives</div>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-primary-200/10 text-primary-200">
              <IoCheckmarkCircleOutline className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-primary-50">
              {initiatives.filter(i => i.status === "completed").length}
            </span>
          </div>
          <div className="text-sm font-semibold text-primary-50/70">Completed</div>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-primary-300/10 text-primary-300">
              <IoTrendingUpOutline className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-primary-50">{overallProgress}%</span>
          </div>
          <div className="text-sm font-semibold text-primary-50/70">Overall Progress</div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex gap-1 mb-6 overflow-x-auto">
        {[
          { id: "overview", label: "Overview", icon: <IoLayersOutline /> },
          { id: "goals", label: "Goals & Objectives", icon: <IoFlagOutline /> },
          { id: "timeline", label: "Timeline", icon: <IoCalendarOutline /> },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              activeView === view.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            {view.icon}
            {view.label}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      {activeView === "goals" && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-primary-50 text-white shadow-md"
                  : "bg-white text-primary-50/70 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {category === "all" ? "All Categories" : category}
            </button>
          ))}
        </div>
      )}

      {/* Content Area */}
      {activeView === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Goals Progress */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Strategic Goals Progress</h2>
            <div className="space-y-6">
              {strategicGoals.map((goal) => (
                <div key={goal.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-${goal.category === "Academic" ? "primary-50" : goal.category === "Financial" ? "primary-100" : goal.category === "Infrastructure" ? "primary-200" : "primary-300"}/10`}>
                          {getCategoryIcon(goal.category)}
                        </div>
                        <h3 className="font-bold text-primary-50">{goal.title}</h3>
                      </div>
                      <p className="text-sm text-primary-50/70 mb-3">{goal.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className={`px-2.5 py-1 rounded-full border font-semibold ${getStatusColor(goal.status)}`}>
                          {goal.status.replace("-", " ").toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1 text-primary-50/60">
                          <IoPeopleOutline className="w-4 h-4" />
                          {goal.owner}
                        </span>
                        <span className="flex items-center gap-1 text-primary-50/60">
                          <IoRocketOutline className="w-4 h-4" />
                          {goal.initiatives} initiatives
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-primary-50">{goal.progress}%</div>
                      <div className="text-xs text-primary-50/60">Complete</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-50 to-primary-100 transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Initiatives */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Recent Initiatives</h2>
            <div className="space-y-4">
              {initiatives.slice(0, 6).map((initiative) => (
                <div key={initiative.id} className="p-4 rounded-xl border border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-primary-50 text-sm flex-1">{initiative.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getPriorityColor(initiative.priority)}`}>
                      {initiative.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-primary-50/60">
                    <span className="flex items-center gap-1">
                      <IoTimeOutline className="w-3.5 h-3.5" />
                      {new Date(initiative.dueDate).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full border text-xs font-semibold ${getStatusColor(initiative.status)}`}>
                      {initiative.status.replace("-", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === "goals" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${goal.category === "Academic" ? "primary-50" : goal.category === "Financial" ? "primary-100" : goal.category === "Infrastructure" ? "primary-200" : "primary-300"}/10`}>
                  {getCategoryIcon(goal.category)}
                </div>
                <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(goal.status)}`}>
                  {goal.status.replace("-", " ").toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-primary-50 mb-2">{goal.title}</h3>
              <p className="text-sm text-primary-50/70 mb-4">{goal.description}</p>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-primary-50/70">Progress</span>
                  <span className="text-sm font-bold text-primary-50">{goal.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-50 to-primary-100 transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-50/60">Owner</span>
                  <span className="font-semibold text-primary-50">{goal.owner}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-50/60">Initiatives</span>
                  <span className="font-semibold text-primary-50">{goal.initiatives}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-50/60">Target Date</span>
                  <span className="font-semibold text-primary-50">{new Date(goal.targetDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === "timeline" && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-primary-50 mb-6">Strategic Timeline</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            <div className="space-y-8">
              {strategicGoals.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).map((goal) => (
                <div key={goal.id} className="relative pl-20">
                  {/* Timeline dot */}
                  <div className={`absolute left-6 top-2 w-5 h-5 rounded-full border-4 border-white shadow-md ${
                    goal.status === "completed" ? "bg-green-500" :
                    goal.status === "in-progress" ? "bg-blue-500" :
                    goal.status === "planning" ? "bg-amber-500" : "bg-gray-400"
                  }`} />
                  
                  <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-all border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-primary-50 mb-1">{goal.title}</h3>
                        <p className="text-sm text-primary-50/70">{goal.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold ml-4 ${getStatusColor(goal.status)}`}>
                        {goal.status.replace("-", " ").toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-primary-50/60">
                        <IoCalendarOutline className="w-4 h-4" />
                        {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.targetDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5 text-primary-50/60">
                        <IoPeopleOutline className="w-4 h-4" />
                        {goal.owner}
                      </span>
                      <span className="flex items-center gap-1.5 text-primary-50/60">
                        <IoTrendingUpOutline className="w-4 h-4" />
                        {goal.progress}% Complete
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicPlanning;
