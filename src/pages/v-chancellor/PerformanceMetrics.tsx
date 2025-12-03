import React, { useCallback, useMemo, useState } from "react";
import {
    IoCheckmarkCircleOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoStatsChartOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

interface MetricData {
  id: string;
  category: string;
  name: string;
  current: number;
  previous: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
}

interface DepartmentPerformance {
  department: string;
  score: number;
  change: number;
  status: "Excellent" | "Good" | "Fair" | "Needs Improvement";
}

const PerformanceMetrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "academic" | "financial" | "operational">("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("current-year");

  const metrics: MetricData[] = useMemo(() => [
    {
      id: "1",
      category: "Academic",
      name: "Student Enrollment",
      current: 12450,
      previous: 11200,
      target: 13000,
      unit: "students",
      trend: "up"
    },
    {
      id: "2",
      category: "Academic",
      name: "Graduation Rate",
      current: 87.5,
      previous: 84.2,
      target: 90,
      unit: "%",
      trend: "up"
    },
    {
      id: "3",
      category: "Academic",
      name: "Student-Faculty Ratio",
      current: 18,
      previous: 20,
      target: 15,
      unit: ":1",
      trend: "up"
    },
    {
      id: "4",
      category: "Academic",
      name: "Research Publications",
      current: 342,
      previous: 298,
      target: 400,
      unit: "papers",
      trend: "up"
    },
    {
      id: "5",
      category: "Financial",
      name: "Revenue",
      current: 45.8,
      previous: 42.3,
      target: 50,
      unit: "M USD",
      trend: "up"
    },
    {
      id: "6",
      category: "Financial",
      name: "Operating Margin",
      current: 12.5,
      previous: 11.8,
      target: 15,
      unit: "%",
      trend: "up"
    },
    {
      id: "7",
      category: "Financial",
      name: "Scholarship Fund",
      current: 8.2,
      previous: 7.5,
      target: 10,
      unit: "M USD",
      trend: "up"
    },
    {
      id: "8",
      category: "Operational",
      name: "Staff Satisfaction",
      current: 82,
      previous: 78,
      target: 85,
      unit: "%",
      trend: "up"
    },
    {
      id: "9",
      category: "Operational",
      name: "Facility Utilization",
      current: 76,
      previous: 72,
      target: 80,
      unit: "%",
      trend: "up"
    },
    {
      id: "10",
      category: "Operational",
      name: "Energy Efficiency",
      current: 68,
      previous: 65,
      target: 75,
      unit: "%",
      trend: "up"
    },
  ], []);

  const departmentPerformance: DepartmentPerformance[] = useMemo(() => [
    { department: "Engineering", score: 92, change: 5, status: "Excellent" },
    { department: "Business", score: 88, change: 3, status: "Excellent" },
    { department: "Sciences", score: 85, change: 2, status: "Good" },
    { department: "Arts", score: 78, change: -1, status: "Good" },
    { department: "Medicine", score: 95, change: 4, status: "Excellent" },
    { department: "Law", score: 82, change: 1, status: "Good" },
  ], []);

  const summaryStats = useMemo(() => [
    { label: "Overall Performance", value: "87.5%", change: "+5.2%", trend: "up" as const, icon: <IoStatsChartOutline /> },
    { label: "Total Students", value: "12,450", change: "+1,250", trend: "up" as const, icon: <IoPeopleOutline /> },
    { label: "Active Programs", value: "65", change: "+3", trend: "up" as const, icon: <IoSchoolOutline /> },
    { label: "Success Rate", value: "92.3%", change: "+2.1%", trend: "up" as const, icon: <IoCheckmarkCircleOutline /> },
  ], []);

  const filteredMetrics = useMemo(() => {
    if (activeTab === "overview") return metrics;
    const category = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    return metrics.filter(m => m.category === category);
  }, [metrics, activeTab]);

  const calculateProgress = useCallback((current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  }, []);

  const calculateChange = useCallback((current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  }, []);

  const getStatusColor = useCallback((status: string) => {
    const colors = {
      "Excellent": "bg-green-100 text-green-700",
      "Good": "bg-blue-100 text-blue-700",
      "Fair": "bg-yellow-100 text-yellow-700",
      "Needs Improvement": "bg-red-100 text-red-700"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-comfortaa">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-50 mb-2">Performance Metrics</h1>
            <p className="text-primary-50/70">Track and analyze institutional performance indicators</p>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 text-sm"
          >
            <option value="current-year">Current Year</option>
            <option value="last-year">Last Year</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-primary-50/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl text-primary-100">{stat.icon}</div>
              <div className={`text-xs font-medium flex items-center gap-1 ${
                stat.trend === "up" ? "text-primary-300" : "text-primary-200"
              }`}>
                {stat.trend === "up" ? <IoTrendingUpOutline /> : <IoTrendingDownOutline />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-xs text-primary-50/60 mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-primary-50">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-primary-50/20 mb-6">
        <div className="flex flex-wrap border-b border-primary-50/20">
          {[
            { id: "overview", label: "Overview" },
            { id: "academic", label: "Academic" },
            { id: "financial", label: "Financial" },
            { id: "operational", label: "Operational" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
          {/* Metrics Grid */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-primary-50">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMetrics.map((metric) => {
                  const change = calculateChange(metric.current, metric.previous);
                  const progress = calculateProgress(metric.current, metric.target);
                  
                  return (
                    <div key={metric.id} className="bg-white rounded-lg p-4 border border-primary-50/20">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-primary-50">{metric.name}</h4>
                          <p className="text-xs text-primary-50/60">{metric.category}</p>
                        </div>
                        <div className={`text-xs font-medium flex items-center gap-1 ${
                          change > 0 ? "text-primary-300" : change < 0 ? "text-primary-200" : "text-gray-600"
                        }`}>
                          {change > 0 && <IoTrendingUpOutline />}
                          {change < 0 && <IoTrendingDownOutline />}
                          <span>{change > 0 ? '+' : ''}{change.toFixed(1)}%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-primary-50/70">Current:</span>
                          <span className="font-semibold text-primary-50">{metric.current.toLocaleString()} {metric.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-primary-50/70">Previous:</span>
                          <span className="text-primary-50">{metric.previous.toLocaleString()} {metric.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-primary-50/70">Target:</span>
                          <span className="text-primary-50">{metric.target.toLocaleString()} {metric.unit}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-primary-50/60 mb-1">
                          <span>Progress to Target</span>
                          <span>{progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-full rounded-full transition-all ${
                              progress >= 90 ? "bg-primary-300" :
                              progress >= 70 ? "bg-primary-100" :
                              "bg-primary-200"
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Department Performance */}
            {activeTab === "overview" && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Department Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departmentPerformance.map((dept, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-primary-50/20">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-primary-50">{dept.department}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(dept.status)}`}>
                          {dept.status}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-xs text-primary-50/60">Performance Score</span>
                          <span className="text-2xl font-bold text-primary-50">{dept.score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-full rounded-full bg-primary-100"
                            style={{ width: `${dept.score}%` }}
                          />
                        </div>
                      </div>

                      <div className={`text-xs font-medium flex items-center gap-1 ${
                        dept.change > 0 ? "text-primary-300" : dept.change < 0 ? "text-primary-200" : "text-gray-600"
                      }`}>
                        {dept.change > 0 && <IoTrendingUpOutline />}
                        {dept.change < 0 && <IoTrendingDownOutline />}
                        <span>{dept.change > 0 ? '+' : ''}{dept.change}% from last period</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Trends */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-primary-50">Performance Trends</h3>
              <div className="bg-white rounded-lg p-6 border border-primary-50/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-300 mb-1">↑ 15</div>
                    <div className="text-xs text-primary-50/70">Metrics Improved</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-100 mb-1">→ 8</div>
                    <div className="text-xs text-primary-50/70">Metrics Stable</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-200 mb-1">↓ 2</div>
                    <div className="text-xs text-primary-50/70">Metrics Declined</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-50 mb-1">87.5%</div>
                    <div className="text-xs text-primary-50/70">Overall Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
