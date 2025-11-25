import React, { useState } from "react";
import {
    IoBarChartOutline,
    IoCalendarOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoPeopleOutline,
    IoPieChartOutline,
    IoSchoolOutline,
    IoStatsChartOutline,
    IoTrendingDownOutline,
    IoTrendingUpOutline,
    IoWalletOutline,
} from "react-icons/io5";

interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
  opacity?: number;
}

interface ReportItem {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

const ReportsAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");
  const [selectedReport, setSelectedReport] = useState<string>("all");

  // Key Metrics
  const metrics: MetricCard[] = [
    {
      title: "Total Revenue",
      value: "$284,750",
      change: "+18.2%",
      trend: "up",
      icon: <IoWalletOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-50",
    },
    {
      title: "Student Growth",
      value: "+342",
      change: "+12.5%",
      trend: "up",
      icon: <IoSchoolOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-100",
    },
    {
      title: "Attendance Rate",
      value: "94.8%",
      change: "+2.3%",
      trend: "up",
      icon: <IoPeopleOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-50",
    },
    {
      title: "Course Completion",
      value: "87.5%",
      change: "-1.2%",
      trend: "down",
      icon: <IoStatsChartOutline className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: "bg-primary-100",
    },
  ];

  // Enrollment Trends (Monthly)
  const enrollmentData: ChartData[] = [
    { label: "Jan", value: 85, color: "bg-primary-50", opacity: 1.0 },
    { label: "Feb", value: 92, color: "bg-primary-50", opacity: 0.85 },
    { label: "Mar", value: 78, color: "bg-primary-50", opacity: 0.7 },
    { label: "Apr", value: 95, color: "bg-primary-50", opacity: 0.55 },
    { label: "May", value: 88, color: "bg-primary-50", opacity: 0.4 },
    { label: "Jun", value: 100, color: "bg-primary-50", opacity: 0.25 },
  ];

  // Department Performance
  const departmentPerformance: ChartData[] = [
    { label: "Computer Science", value: 92, color: "bg-primary-100", opacity: 1.0 },
    { label: "Engineering", value: 88, color: "bg-primary-100", opacity: 0.85 },
    { label: "Business", value: 85, color: "bg-primary-100", opacity: 0.7 },
    { label: "Medicine", value: 95, color: "bg-primary-100", opacity: 0.55 },
    { label: "Arts", value: 78, color: "bg-primary-100", opacity: 0.4 },
    { label: "Sciences", value: 90, color: "bg-primary-100", opacity: 0.25 },
  ];

  // Revenue Breakdown
  const revenueBreakdown: ChartData[] = [
    { label: "Tuition Fees", value: 65, color: "bg-primary-50" },
    { label: "Lab Fees", value: 15, color: "bg-primary-100" },
    { label: "Library Fees", value: 8, color: "bg-primary-50" },
    { label: "Transport", value: 7, color: "bg-primary-100" },
    { label: "Others", value: 5, color: "bg-primary-50" },
  ];

  // Available Reports
  const reports: ReportItem[] = [
    {
      id: "1",
      name: "Student Enrollment Report",
      type: "PDF",
      date: "2025-11-20",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Financial Summary Q4",
      type: "Excel",
      date: "2025-11-18",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Teacher Performance Analysis",
      type: "PDF",
      date: "2025-11-15",
      size: "3.1 MB",
    },
    {
      id: "4",
      name: "Course Completion Rates",
      type: "PDF",
      date: "2025-11-12",
      size: "1.5 MB",
    },
    {
      id: "5",
      name: "Attendance Analytics",
      type: "Excel",
      date: "2025-11-10",
      size: "2.2 MB",
    },
  ];



  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2">
              Reports & Analytics
            </h1>
            <p className="text-sm sm:text-base text-primary-50/60">
              Comprehensive insights and data analysis for your institution
            </p>
          </div>
          
          {/* Period Selector */}
          <div className="flex gap-2">
            {["week", "month", "year"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  selectedPeriod === period
                    ? "bg-primary-100 text-white"
                    : "bg-white text-primary-50 border border-gray-200 hover:border-primary-100"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} p-3 rounded-lg text-white`}>
                {metric.icon}
              </div>
              <div
                className="flex items-center gap-1 text-xs sm:text-sm font-medium text-primary-100"
              >
                {metric.trend === "up" ? (
                  <IoTrendingUpOutline className="w-4 h-4" />
                ) : (
                  <IoTrendingDownOutline className="w-4 h-4" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="text-xs sm:text-sm text-primary-50/60 mb-1">
              {metric.title}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-primary-50">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Enrollment Trends */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-primary-50 flex items-center gap-2">
              <IoBarChartOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary-100" />
              Enrollment Trends
            </h2>
          </div>
          
          <div className="flex flex-col items-center">
            {/* Single Donut Chart */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {(() => {
                  const total = enrollmentData.reduce((sum, d) => sum + d.value, 0);
                  let currentAngle = 0;
                  const radius = 80;
                  const centerX = 100;
                  const centerY = 100;
                  
                  return enrollmentData.map((data, index) => {
                    const percentage = (data.value / total) * 100;
                    const angle = (percentage / 100) * 360;
                    const startAngle = currentAngle;
                    const endAngle = currentAngle + angle;
                    
                    // Convert angles to radians
                    const startRad = (startAngle - 90) * (Math.PI / 180);
                    const endRad = (endAngle - 90) * (Math.PI / 180);
                    
                    // Calculate arc path
                    const x1 = centerX + radius * Math.cos(startRad);
                    const y1 = centerY + radius * Math.sin(startRad);
                    const x2 = centerX + radius * Math.cos(endRad);
                    const y2 = centerY + radius * Math.sin(endRad);
                    
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    
                    const pathData = [
                      `M ${centerX} ${centerY}`,
                      `L ${x1} ${y1}`,
                      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      'Z'
                    ].join(' ');
                    
                    currentAngle = endAngle;
                    
                    return (
                      <path
                        key={index}
                        d={pathData}
                        fill="currentColor"
                        className={data.color.replace('bg-', 'text-')}
                        opacity={data.opacity || 0.9}
                      />
                    );
                  });
                })()}
                {/* Center white circle to create donut effect */}
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  fill="white"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-primary-50">
                  {enrollmentData.reduce((sum, d) => sum + d.value, 0)}
                </span>
                <span className="text-xs text-primary-50/60">Total</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
              {enrollmentData.map((data, index) => {
                const total = enrollmentData.reduce((sum, d) => sum + d.value, 0);
                const percentage = (data.value / total) * 100;
                
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${data.color}`} />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-primary-50">
                        {data.label}
                      </div>
                      <div className="text-xs text-primary-50/60">
                        {data.value} ({Math.round(percentage)}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-primary-50 flex items-center gap-2">
              <IoStatsChartOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary-100" />
              Department Performance
            </h2>
          </div>
          
          <div className="flex flex-col items-center">
            {/* Single Donut Chart */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {(() => {
                  const total = departmentPerformance.reduce((sum, d) => sum + d.value, 0);
                  let currentAngle = 0;
                  const radius = 80;
                  const centerX = 100;
                  const centerY = 100;
                  
                  return departmentPerformance.map((data, index) => {
                    const percentage = (data.value / total) * 100;
                    const angle = (percentage / 100) * 360;
                    const startAngle = currentAngle;
                    const endAngle = currentAngle + angle;
                    
                    // Convert angles to radians
                    const startRad = (startAngle - 90) * (Math.PI / 180);
                    const endRad = (endAngle - 90) * (Math.PI / 180);
                    
                    // Calculate arc path
                    const x1 = centerX + radius * Math.cos(startRad);
                    const y1 = centerY + radius * Math.sin(startRad);
                    const x2 = centerX + radius * Math.cos(endRad);
                    const y2 = centerY + radius * Math.sin(endRad);
                    
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    
                    const pathData = [
                      `M ${centerX} ${centerY}`,
                      `L ${x1} ${y1}`,
                      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      'Z'
                    ].join(' ');
                    
                    currentAngle = endAngle;
                    
                    return (
                      <path
                        key={index}
                        d={pathData}
                        fill="currentColor"
                        className={data.color.replace('bg-', 'text-')}
                        opacity={data.opacity || 0.9}
                      />
                    );
                  });
                })()}
                {/* Center white circle to create donut effect */}
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  fill="white"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold text-primary-50">
                  {Math.round(departmentPerformance.reduce((sum, d) => sum + d.value, 0) / departmentPerformance.length)}%
                </span>
                <span className="text-xs text-primary-50/60">Avg</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {departmentPerformance.map((data, index) => {
                const total = departmentPerformance.reduce((sum, d) => sum + d.value, 0);
                const percentage = (data.value / total) * 100;
                
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${data.color}`} />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-primary-50">
                        {data.label}
                      </div>
                      <div className="text-xs text-primary-50/60">
                        {data.value}% ({Math.round(percentage)}% of total)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown & Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-primary-50 flex items-center gap-2">
              <IoPieChartOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary-100" />
              Revenue Sources
            </h2>
          </div>
          
          <div className="space-y-4">
            {revenueBreakdown.map((data, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`${data.color} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold`}>
                  {data.value}%
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-primary-50">
                    {data.label}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mt-1">
                    <div
                      className={`${data.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${data.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Reports */}
        <div className="lg:col-span-2 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-primary-50 flex items-center gap-2">
              <IoDocumentTextOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary-100" />
              Available Reports
            </h2>
            
            {/* Report Type Filter */}
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary-100"
            >
              <option value="all">All Reports</option>
              <option value="pdf">PDF Only</option>
              <option value="excel">Excel Only</option>
            </select>
          </div>

          <div className="space-y-3">
            {reports
              .filter(
                (report) =>
                  selectedReport === "all" ||
                  report.type.toLowerCase() === selectedReport
              )
              .map((report) => (
                <div
                  key={report.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-gray-200 hover:border-primary-100 hover:bg-primary-100/5 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-primary-100/10 p-3 rounded-lg">
                      <IoDocumentTextOutline className="w-5 h-5 text-primary-100" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-primary-50 mb-1">
                        {report.name}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-primary-50/60">
                        <span className="flex items-center gap-1">
                          <IoCalendarOutline className="w-3 h-3" />
                          {report.date}
                        </span>
                        <span>{report.size}</span>
                        <span className="px-2 py-0.5 bg-primary-100/10 text-primary-100 rounded">
                          {report.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors text-sm font-medium">
                    <IoDownloadOutline className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
