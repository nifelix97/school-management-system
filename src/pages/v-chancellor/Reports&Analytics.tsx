import React, { useCallback, useMemo, useState } from "react";
import {
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoCloseOutline,
    IoDocumentTextOutline,
    IoDownloadOutline,
    IoEyeOutline,
    IoGridOutline,
    IoListOutline,
    IoPeopleOutline,
    IoPrintOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoShareSocialOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrendingUpOutline
} from "react-icons/io5";

interface Report {
  id: string;
  title: string;
  category: "Academic" | "Financial" | "Student" | "Faculty" | "Research" | "Operations";
  type: "Monthly" | "Quarterly" | "Annual" | "Custom";
  generatedDate: string;
  period: string;
  status: "Ready" | "Generating" | "Scheduled";
  size: string;
  format: "PDF" | "Excel" | "CSV";
}

interface AnalyticsSummary {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
}

const VChancellorReportAnalytic: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "reports" | "generate" | "scheduled">("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("table");

  const reports: Report[] = useMemo(() => [
    {
      id: "1",
      title: "Student Enrollment Report Q4 2024",
      category: "Student",
      type: "Quarterly",
      generatedDate: "2024-11-28",
      period: "Oct - Dec 2024",
      status: "Ready",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      id: "2",
      title: "Financial Performance Annual Report 2024",
      category: "Financial",
      type: "Annual",
      generatedDate: "2024-11-25",
      period: "Jan - Dec 2024",
      status: "Ready",
      size: "5.8 MB",
      format: "Excel"
    },
    {
      id: "3",
      title: "Faculty Performance Review November 2024",
      category: "Faculty",
      type: "Monthly",
      generatedDate: "2024-11-30",
      period: "November 2024",
      status: "Ready",
      size: "1.9 MB",
      format: "PDF"
    },
    {
      id: "4",
      title: "Research Output and Publications Q3 2024",
      category: "Research",
      type: "Quarterly",
      generatedDate: "2024-11-20",
      period: "Jul - Sep 2024",
      status: "Ready",
      size: "3.2 MB",
      format: "PDF"
    },
    {
      id: "5",
      title: "Academic Performance Analysis 2024",
      category: "Academic",
      type: "Annual",
      generatedDate: "2024-11-15",
      period: "2024 Academic Year",
      status: "Ready",
      size: "4.1 MB",
      format: "Excel"
    },
    {
      id: "6",
      title: "Operational Efficiency Report December 2024",
      category: "Operations",
      type: "Monthly",
      generatedDate: "2024-12-01",
      period: "December 2024",
      status: "Generating",
      size: "TBD",
      format: "PDF"
    },
  ], []);

  const analyticsSummary: AnalyticsSummary[] = useMemo(() => [
    { title: "Total Reports", value: "156", change: "+12", trend: "up" },
    { title: "Generated This Month", value: "24", change: "+8", trend: "up" },
    { title: "Scheduled Reports", value: "18", change: "0", trend: "stable" },
    { title: "Storage Used", value: "2.8 GB", change: "+0.4 GB", trend: "up" },
  ], []);

  const quickStats = useMemo(() => [
    { label: "Student Enrollment", value: "12,450", icon: <IoPeopleOutline /> },
    { label: "Faculty Members", value: "850", icon: <IoSchoolOutline /> },
    { label: "Active Programs", value: "65", icon: <IoDocumentTextOutline /> },
    { label: "Research Projects", value: "142", icon: <IoStatsChartOutline /> },
  ], []);

  const getStatusColor = useCallback((status: string) => {
    const colors = {
      "Ready": "bg-green-100 text-green-700",
      "Generating": "bg-blue-100 text-blue-700",
      "Scheduled": "bg-yellow-100 text-yellow-700"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
  }, []);

  const getCategoryColor = useCallback((category: string) => {
    const colors = {
      "Academic": "bg-purple-100 text-purple-700",
      "Financial": "bg-green-100 text-green-700",
      "Student": "bg-blue-100 text-blue-700",
      "Faculty": "bg-orange-100 text-orange-700",
      "Research": "bg-pink-100 text-pink-700",
      "Operations": "bg-gray-100 text-gray-700"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || report.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [reports, searchQuery, selectedCategory]);

  const handleTabChange = useCallback((tab: "dashboard" | "reports" | "generate" | "scheduled") => {
    setActiveTab(tab);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleDownloadReport = useCallback((report: Report) => {
    if (report.format === "PDF") {
      // Generate HTML file that can be printed to PDF
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${report.title}</title>
  <style>
    @page { margin: 2cm; }
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      border-bottom: 3px solid #2563eb;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      color: #1e40af;
      margin: 0 0 10px 0;
      font-size: 28px;
    }
    .meta {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      background: #f3f4f6;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .meta-item {
      display: flex;
      flex-direction: column;
    }
    .meta-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .meta-value {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin-top: 4px;
    }
    .section {
      margin: 30px 0;
      page-break-inside: avoid;
    }
    h2 {
      color: #1e40af;
      border-left: 4px solid #2563eb;
      padding-left: 12px;
      margin: 25px 0 15px 0;
      font-size: 20px;
    }
    .highlight-box {
      background: #eff6ff;
      border-left: 4px solid #2563eb;
      padding: 15px 20px;
      margin: 15px 0;
    }
    ul {
      list-style-type: none;
      padding-left: 0;
    }
    li {
      padding: 8px 0 8px 25px;
      position: relative;
    }
    li:before {
      content: "▸";
      position: absolute;
      left: 0;
      color: #2563eb;
      font-weight: bold;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    th {
      background: #f9fafb;
      font-weight: 600;
      color: #374151;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${report.title}</h1>
    <p style="color: #6b7280; margin: 5px 0 0 0;">Generated on ${new Date(report.generatedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <div class="meta">
    <div class="meta-item">
      <span class="meta-label">Category</span>
      <span class="meta-value">${report.category}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Report Type</span>
      <span class="meta-value">${report.type}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Period</span>
      <span class="meta-value">${report.period}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Status</span>
      <span class="meta-value">${report.status}</span>
    </div>
  </div>

  <div class="section">
    <h2>Executive Summary</h2>
    <p>This ${report.type.toLowerCase()} report provides comprehensive analysis and insights for the ${report.period} period. The report encompasses detailed examination of key performance indicators, trends, and actionable recommendations.</p>
    
    <div class="highlight-box">
      <strong>Key Highlights:</strong>
      <ul>
        <li>Total records analyzed: 1,245</li>
        <li>Performance improvement: +12.5%</li>
        <li>Compliance rate: 98.3%</li>
        <li>Action items identified: 8</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>Performance Metrics</h2>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Current</th>
          <th>Previous</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Overall Performance</td>
          <td>92.5%</td>
          <td>82.3%</td>
          <td style="color: #059669;">+10.2%</td>
        </tr>
        <tr>
          <td>Efficiency Rate</td>
          <td>88.7%</td>
          <td>85.1%</td>
          <td style="color: #059669;">+3.6%</td>
        </tr>
        <tr>
          <td>Quality Score</td>
          <td>95.2%</td>
          <td>93.8%</td>
          <td style="color: #059669;">+1.4%</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Detailed Analysis</h2>
    <p>The analysis period shows significant improvements across all major categories. Key factors contributing to this positive trend include:</p>
    <ul>
      <li>Enhanced operational procedures implemented in Q3</li>
      <li>Increased stakeholder engagement and feedback integration</li>
      <li>Technology infrastructure upgrades completed</li>
      <li>Staff training and development initiatives</li>
    </ul>
  </div>

  <div class="section">
    <h2>Recommendations</h2>
    <ol style="padding-left: 20px;">
      <li style="margin-bottom: 10px;"><strong>Continue Current Initiatives:</strong> Maintain momentum on successful programs that have demonstrated positive impact.</li>
      <li style="margin-bottom: 10px;"><strong>Address Identified Gaps:</strong> Allocate resources to areas requiring improvement based on data analysis.</li>
      <li style="margin-bottom: 10px;"><strong>Implement Suggested Improvements:</strong> Roll out recommended enhancements in phases to ensure smooth adoption.</li>
      <li style="margin-bottom: 10px;"><strong>Monitor Progress Quarterly:</strong> Establish regular review cycles to track implementation and outcomes.</li>
    </ol>
  </div>

  <div class="footer">
    <p>This is an official ${report.category} report generated by the University Management System</p>
    <p>For questions or clarifications, please contact the ${report.category} department</p>
  </div>

  <div class="no-print" style="margin-top: 30px; text-align: center;">
    <button onclick="window.print()" style="background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">
      Print to PDF
    </button>
    <p style="margin-top: 10px; color: #6b7280; font-size: 13px;">Use your browser's print function and select "Save as PDF"</p>
  </div>
</body>
</html>
      `.trim();

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.title.replace(/\s+/g, '_')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      // Also open in new window for immediate viewing/printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
      }
    } else if (report.format === "Excel" || report.format === "CSV") {
      // Generate CSV file that can be opened in Excel
      const csvContent = `${report.title}
Generated: ${new Date(report.generatedDate).toLocaleDateString()}
Category: ${report.category}
Type: ${report.type}
Period: ${report.period}

PERFORMANCE METRICS
Metric,Current,Previous,Change
Overall Performance,92.5%,82.3%,+10.2%
Efficiency Rate,88.7%,85.1%,+3.6%
Quality Score,95.2%,93.8%,+1.4%
Compliance Rate,98.3%,96.1%,+2.2%

KEY HIGHLIGHTS
Item,Value
Total Records Analyzed,1245
Performance Improvement,+12.5%
Compliance Rate,98.3%
Action Items Identified,8

RECOMMENDATIONS
Priority,Recommendation,Status
1,Continue current initiatives,Pending
2,Address identified gaps,In Progress
3,Implement suggested improvements,Planned
4,Monitor progress quarterly,Ongoing

DETAILED ANALYSIS
The analysis period shows significant improvements across all major categories.
Key factors contributing to this positive trend include enhanced operational procedures
and increased stakeholder engagement.
`;

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.title.replace(/\s+/g, '_')}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }, []);

  const handlePreviewReport = useCallback((report: Report) => {
    setSelectedReport(report);
    setIsPreviewModalOpen(true);
  }, []);

  const handlePrintReport = useCallback((report: Report) => {
    // Open print dialog
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${report.title}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
              .meta { color: #666; margin: 20px 0; }
              .section { margin: 30px 0; }
              @media print { button { display: none; } }
            </style>
          </head>
          <body>
            <h1>${report.title}</h1>
            <div class="meta">
              <p><strong>Category:</strong> ${report.category}</p>
              <p><strong>Type:</strong> ${report.type}</p>
              <p><strong>Period:</strong> ${report.period}</p>
              <p><strong>Generated:</strong> ${new Date(report.generatedDate).toLocaleDateString()}</p>
            </div>
            <div class="section">
              <h2>Executive Summary</h2>
              <p>This report provides comprehensive analysis for the specified period.</p>
            </div>
            <button onclick="window.print()" style="padding: 10px 20px; background: #333; color: white; border: none; cursor: pointer;">Print Report</button>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }, []);

  const handleShareReport = useCallback((report: Report) => {
    setSelectedReport(report);
    setIsShareModalOpen(true);
  }, []);

  const handleCopyReportLink = useCallback(() => {
    if (selectedReport) {
      const link = `${window.location.origin}/reports/${selectedReport.id}`;
      navigator.clipboard.writeText(link);
      alert('Report link copied to clipboard!');
    }
  }, [selectedReport]);

  const handleScheduleReport = useCallback(() => {
    setIsScheduleModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-comfortaa">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-50 mb-2">Reports & Analytics</h1>
            <p className="text-primary-50/70">Generate, view, and manage institutional reports</p>
          </div>
          <button 
            onClick={() => handleTabChange("generate")}
            className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-100/90 transition-colors"
          >
            <IoDocumentTextOutline className="w-5 h-5" />
            <span className="text-sm font-medium">Generate Report</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {analyticsSummary.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-primary-50/20">
            <div className="flex items-center justify-between mb-2">
              <div className={`text-2xl ${
                stat.trend === "up" ? "text-primary-300" : 
                stat.trend === "down" ? "text-primary-200" : 
                "text-gray-400"
              }`}>
                {stat.trend === "up" && <IoTrendingUpOutline />}
                {stat.trend === "stable" && <IoStatsChartOutline />}
              </div>
              <span className={`text-xs font-medium ${
                stat.trend === "up" ? "text-primary-300" : "text-primary-50/60"
              }`}>
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
            { id: "dashboard", label: "Dashboard" },
            { id: "reports", label: "All Reports" },
            { id: "generate", label: "Generate New" },
            { id: "scheduled", label: "Scheduled" },
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
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-primary-50/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-2xl text-primary-100">{stat.icon}</div>
                      <div className="text-xl font-bold text-primary-50">{stat.value}</div>
                    </div>
                    <div className="text-xs text-primary-50/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Reports */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Recent Reports</h3>
                <div className="space-y-3">
                  {reports.filter(r => r.status === "Ready").slice(0, 5).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-primary-50/20">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded bg-primary-100/10 text-primary-100">
                          <IoDocumentTextOutline className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-primary-50 mb-1">{report.title}</div>
                          <div className="flex flex-wrap gap-2 text-xs text-primary-50/60">
                            <span className="flex items-center gap-1">
                              <IoCalendarOutline className="w-3 h-3" />
                              {new Date(report.generatedDate).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>{report.size}</span>
                            <span>•</span>
                            <span>{report.format}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePreviewReport(report)}
                          className="p-2 text-primary-100 hover:bg-primary-100/10 rounded transition-colors"
                          title="Preview"
                        >
                          <IoEyeOutline className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadReport(report)}
                          className="p-2 text-primary-100 hover:bg-primary-100/10 rounded transition-colors"
                          title="Download"
                        >
                          <IoDownloadOutline className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Categories */}
              {/* <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Reports by Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {["Academic", "Financial", "Student", "Faculty", "Research", "Operations"].map((category) => {
                    const count = reports.filter(r => r.category === category).length;
                    return (
                      <div key={category} className="bg-white rounded-lg p-3 border border-primary-50/20 text-center">
                        <div className="text-2xl font-bold text-primary-100 mb-1">{count}</div>
                        <div className="text-xs text-primary-50/70">{category}</div>
                      </div>
                    );
                  })}
                </div>
              </div> */}
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-4">
              {/* Search, Filters, and View Toggle */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="Academic">Academic</option>
                  <option value="Financial">Financial</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Research">Research</option>
                  <option value="Operations">Operations</option>
                </select>
                
                {/* View Toggle */}
                <div className="flex gap-1 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors ${
                      viewMode === "table" 
                        ? "bg-primary-100 text-white" 
                        : "text-primary-50/60 hover:text-primary-50"
                    }`}
                  >
                    <IoListOutline className="w-4 h-4" />
                    <span>Table</span>
                  </button>
                  <button
                    onClick={() => setViewMode("cards")}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors ${
                      viewMode === "cards" 
                        ? "bg-primary-100 text-white" 
                        : "text-primary-50/60 hover:text-primary-50"
                    }`}
                  >
                    <IoGridOutline className="w-4 h-4" />
                    <span>Cards</span>
                  </button>
                </div>
              </div>

              {/* Table View */}
              {viewMode === "table" && (
                <div className="bg-white rounded-lg border border-primary-50/20">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary-50/20 bg-gray-50">
                        <th className="text-left py-3 px-3 text-xs md:text-sm font-semibold text-primary-50">Report</th>
                        <th className="text-left py-3 px-3 text-xs md:text-sm font-semibold text-primary-50 hidden md:table-cell">Category</th>
                        <th className="text-left py-3 px-3 text-xs md:text-sm font-semibold text-primary-50 hidden lg:table-cell">Type</th>
                        <th className="text-left py-3 px-3 text-xs md:text-sm font-semibold text-primary-50 hidden lg:table-cell">Generated</th>
                        <th className="text-center py-3 px-3 text-xs md:text-sm font-semibold text-primary-50">Status</th>
                        <th className="text-center py-3 px-3 text-xs md:text-sm font-semibold text-primary-50">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((report) => (
                        <tr 
                          key={report.id} 
                          className="border-b border-primary-50/10 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-3">
                            <div className="text-xs md:text-sm font-medium text-primary-50 mb-1">{report.title}</div>
                            {/* Show category badge on mobile */}
                            <div className="md:hidden">
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(report.category)}`}>
                                {report.category}
                              </span>
                            </div>
                            {/* Show type on mobile/tablet */}
                            <div className="text-xs text-primary-50/60 mt-1 lg:hidden">
                              {report.type} • {new Date(report.generatedDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-3 hidden md:table-cell">
                            <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getCategoryColor(report.category)}`}>
                              {report.category}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-xs md:text-sm text-primary-50/70 hidden lg:table-cell">{report.type}</td>
                          <td className="py-3 px-3 text-xs md:text-sm text-primary-50/70 hidden lg:table-cell">
                            {new Date(report.generatedDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center justify-center gap-1">
                              {report.status === "Ready" && (
                                <>
                                  <button
                                    onClick={() => handlePreviewReport(report)}
                                    className="p-1.5 text-primary-100 hover:bg-primary-100/10 rounded transition-colors"
                                    title="Preview"
                                  >
                                    <IoEyeOutline className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadReport(report)}
                                    className="p-1.5 text-primary-100 hover:bg-primary-100/10 rounded transition-colors"
                                    title="Download"
                                  >
                                    <IoDownloadOutline className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              {report.status === "Generating" && (
                                <div className="w-4 h-4 border-2 border-primary-100 border-t-transparent rounded-full animate-spin"></div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Card Grid View */}
              {viewMode === "cards" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredReports.map((report) => (
                    <div key={report.id} className="bg-white border border-primary-50/20 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="mb-3">
                        <h4 className="font-medium text-primary-50 mb-2 line-clamp-2">{report.title}</h4>
                        <div className="flex gap-2 flex-wrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(report.category)}`}>
                            {report.category}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 text-xs text-primary-50/70">
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-medium text-primary-50">{report.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Period:</span>
                          <span className="font-medium text-primary-50">{report.period}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Generated:</span>
                          <span className="font-medium text-primary-50">{new Date(report.generatedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Format:</span>
                          <span className="font-medium text-primary-50">{report.format} ({report.size})</span>
                        </div>
                      </div>

                      {report.status === "Ready" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePreviewReport(report)}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-primary-100 hover:bg-primary-100/10 rounded transition-colors"
                          >
                            <IoEyeOutline className="w-4 h-4" />
                            Preview
                          </button>
                          <button
                            onClick={() => handleDownloadReport(report)}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium bg-primary-100 text-white rounded hover:bg-primary-100/90 transition-colors"
                          >
                            <IoDownloadOutline className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      )}

                      {report.status === "Generating" && (
                        <div className="flex items-center justify-center gap-2 py-2 text-xs text-primary-50/70">
                          <div className="w-4 h-4 border-2 border-primary-100 border-t-transparent rounded-full animate-spin"></div>
                          <span>Generating...</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "generate" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Generate New Report</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-1">Report Category</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100">
                        <option>Academic</option>
                        <option>Financial</option>
                        <option>Student</option>
                        <option>Faculty</option>
                        <option>Research</option>
                        <option>Operations</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-1">Report Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100">
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Annual</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-1">Start Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-1">End Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Output Format</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="format" value="pdf" defaultChecked className="text-primary-100" />
                        <span className="text-sm text-primary-50">PDF</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="format" value="excel" className="text-primary-100" />
                        <span className="text-sm text-primary-50">Excel</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="format" value="csv" className="text-primary-100" />
                        <span className="text-sm text-primary-50">CSV</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Include Sections</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Executive Summary", "Detailed Analysis", "Charts & Graphs", "Recommendations", "Appendices", "Raw Data"].map((section) => (
                        <label key={section} className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="text-primary-100" />
                          <span className="text-sm text-primary-50">{section}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Report generation started! You will be notified when it's ready.");
                      }}
                      className="flex-1 px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-100/80 transition-colors"
                    >
                      Generate Report
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200 transition-colors"
                    >
                      Save as Template
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "scheduled" && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <IoTimeOutline className="w-16 h-16 mx-auto text-primary-100 mb-4" />
                <h3 className="text-lg font-semibold text-primary-50 mb-2">Scheduled Reports</h3>
                <p className="text-sm text-primary-50/70 mb-4">
                  Automate report generation with scheduled tasks
                </p>
                <button 
                  onClick={handleScheduleReport}
                  className="px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-100/90 transition-colors text-sm"
                >
                  Create Schedule
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Active Schedules</h3>
                <div className="space-y-3">
                  {[
                    { title: "Monthly Student Enrollment Report", frequency: "Monthly", nextRun: "2024-12-01" },
                    { title: "Quarterly Financial Summary", frequency: "Quarterly", nextRun: "2025-01-01" },
                    { title: "Weekly Faculty Attendance", frequency: "Weekly", nextRun: "2024-12-09" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-primary-50/20">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded bg-primary-100/10 text-primary-100">
                          <IoCheckmarkCircleOutline className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-primary-50">{schedule.title}</div>
                          <div className="text-xs text-primary-50/60">
                            {schedule.frequency} • Next run: {new Date(schedule.nextRun).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <button className="text-xs text-primary-100 hover:underline">Edit</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">{selectedReport.title}</h2>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded">
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-8 text-center mb-6">
                <IoDocumentTextOutline className="w-20 h-20 mx-auto text-primary-100 mb-4" />
                <h3 className="text-xl font-semibold text-primary-50 mb-2">Report Preview</h3>
                <p className="text-sm text-primary-50/70 mb-4">
                  {selectedReport.period} • {selectedReport.format} • {selectedReport.size}
                </p>
                <div className="flex gap-2 justify-center">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${getCategoryColor(selectedReport.category)}`}>
                    {selectedReport.category}
                  </span>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                    {selectedReport.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadReport(selectedReport)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-100/80 transition-colors"
                >
                  <IoDownloadOutline className="w-4 h-4" />
                  Download
                </button>
                <button 
                  onClick={() => handlePrintReport(selectedReport)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200 transition-colors"
                >
                  <IoPrintOutline className="w-4 h-4" />
                  Print
                </button>
                <button 
                  onClick={() => handleShareReport(selectedReport)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200 transition-colors"
                >
                  <IoShareSocialOutline className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Report Modal */}
      {isShareModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-md w-full">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Share Report</h2>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded">
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-primary-50 mb-2">{selectedReport.title}</h3>
                <p className="text-sm text-primary-50/70">{selectedReport.period} • {selectedReport.category}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">Report Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={`${window.location.origin}/reports/${selectedReport.id}`}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={handleCopyReportLink}
                    className="px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-100/80 transition-colors text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">Share via</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => alert('Email sharing functionality would be implemented here')}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                  >
                    Email
                  </button>
                  <button 
                    onClick={() => alert('Twitter sharing functionality would be implemented here')}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                  >
                    Twitter
                  </button>
                  <button 
                    onClick={() => alert('LinkedIn sharing functionality would be implemented here')}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                  >
                    LinkedIn
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsShareModalOpen(false)}
                className="w-full px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Report Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Schedule Report Generation</h2>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded">
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Report Name</label>
                  <input
                    type="text"
                    placeholder="Enter report name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100">
                      <option>Academic</option>
                      <option>Financial</option>
                      <option>Student</option>
                      <option>Faculty</option>
                      <option>Research</option>
                      <option>Operations</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Report Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100">
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Annual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Frequency</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Annually</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Time</label>
                    <input
                      type="time"
                      defaultValue="09:00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Email Recipients</label>
                  <input
                    type="text"
                    placeholder="Enter email addresses (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Output Format</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="text-primary-100" />
                      <span className="text-sm text-primary-50">PDF</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="text-primary-100" />
                      <span className="text-sm text-primary-50">Excel</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="text-primary-100" />
                      <span className="text-sm text-primary-50">CSV</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Report schedule created successfully!');
                      setIsScheduleModalOpen(false);
                    }}
                    className="flex-1 px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-100/80 transition-colors"
                  >
                    Create Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VChancellorReportAnalytic;
