import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  Users,
  BookOpen,
  GraduationCap,
  ClipboardList,
  UserCheck,
  BarChart3,
  Settings,
  FileSpreadsheet,
  Printer,
  Eye,
  X
} from 'lucide-react';

interface ReportConfig {
  type: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  fields: string[];
  filters: string[];
}

export default function GenerateReport() {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [reportConfig, setReportConfig] = useState({
    dateRange: { start: '', end: '' },
    format: 'pdf',
    filters: {} as Record<string, string>
  });

  const reportTypes: ReportConfig[] = [
    {
      type: 'course',
      title: 'Course Reports',
      description: 'Courses offered, enrollment, completion rates, teacher assignments',
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      fields: ['Course Name', 'Enrollment', 'Completion Rate', 'Teacher', 'Pass/Fail Stats'],
      filters: ['Department', 'Semester', 'Level', 'Status']
    },
    {
      type: 'student',
      title: 'Student Performance Reports',
      description: 'GPA, exam scores, attendance, at-risk students, top performers',
      icon: <GraduationCap className="w-6 h-6 text-green-500" />,
      fields: ['Student Name', 'GPA', 'Exam Scores', 'Attendance', 'Performance Level'],
      filters: ['Level', 'Semester', 'Program', 'Gender', 'Performance']
    },
    {
      type: 'teacher',
      title: 'Teacher Activity Reports',
      description: 'Courses taught, materials uploaded, assignments, student feedback',
      icon: <Users className="w-6 h-6 text-purple-500" />,
      fields: ['Teacher Name', 'Courses Taught', 'Materials', 'Assignments', 'Feedback Score'],
      filters: ['Department', 'Experience', 'Course Load', 'Rating']
    },
    {
      type: 'exam',
      title: 'Exam Reports',
      description: 'Timetable, participation, submission rates, difficulty analysis',
      icon: <ClipboardList className="w-6 h-6 text-orange-500" />,
      fields: ['Exam Name', 'Participation', 'Submission Rate', 'Average Score', 'Difficulty'],
      filters: ['Course', 'Semester', 'Type', 'Status']
    },
    {
      type: 'attendance',
      title: 'Attendance Reports',
      description: 'Student & teacher attendance trends, course attendance rates',
      icon: <UserCheck className="w-6 h-6 text-teal-500" />,
      fields: ['Name', 'Attendance %', 'Course', 'Trend', 'Status'],
      filters: ['Course', 'Time Period', 'Type', 'Threshold']
    },
    {
      type: 'overview',
      title: 'Department Overview',
      description: 'Complete department summary for management presentation',
      icon: <BarChart3 className="w-6 h-6 text-red-500" />,
      fields: ['Total Students', 'Total Teachers', 'Active Courses', 'Performance', 'Statistics'],
      filters: ['Academic Year', 'Semester', 'Program']
    }
  ];

  const generatePreviewData = (reportType: string) => {
    const sampleData = {
      course: {
        title: 'Course Report Preview',
        data: [
          { course: 'HTML & CSS Fundamentals', enrollment: 45, completion: '89%', teacher: 'Dr. Sarah Johnson', passRate: '92%' },
          { course: 'JavaScript Basics', enrollment: 38, completion: '76%', teacher: 'Prof. Michael Chen', passRate: '85%' },
          { course: 'React Development', enrollment: 32, completion: '82%', teacher: 'Dr. Emily Davis', passRate: '88%' }
        ],
        headers: ['Course Name', 'Enrollment', 'Completion Rate', 'Teacher', 'Pass Rate']
      },
      student: {
        title: 'Student Performance Report Preview',
        data: [
          { name: 'John Smith', gpa: '3.8', attendance: '95%', status: 'Excellent', semester: 'Fall 2024' },
          { name: 'Sarah Wilson', gpa: '3.2', attendance: '88%', status: 'Good', semester: 'Fall 2024' },
          { name: 'Mike Johnson', gpa: '2.9', attendance: '82%', status: 'At Risk', semester: 'Fall 2024' }
        ],
        headers: ['Student Name', 'GPA', 'Attendance', 'Status', 'Semester']
      },
      teacher: {
        title: 'Teacher Activity Report Preview',
        data: [
          { name: 'Dr. Sarah Johnson', courses: 3, materials: 24, assignments: 12, feedback: '4.8/5' },
          { name: 'Prof. Michael Chen', courses: 2, materials: 18, assignments: 8, feedback: '4.6/5' },
          { name: 'Dr. Emily Davis', courses: 2, materials: 22, assignments: 10, feedback: '4.9/5' }
        ],
        headers: ['Teacher Name', 'Courses', 'Materials', 'Assignments', 'Feedback']
      },
      exam: {
        title: 'Exam Report Preview',
        data: [
          { exam: 'Midterm - HTML/CSS', participation: '98%', submission: '96%', avgScore: '85%', difficulty: 'Medium' },
          { exam: 'Final - JavaScript', participation: '94%', submission: '92%', avgScore: '78%', difficulty: 'Hard' },
          { exam: 'Quiz - React Basics', participation: '100%', submission: '98%', avgScore: '91%', difficulty: 'Easy' }
        ],
        headers: ['Exam Name', 'Participation', 'Submission Rate', 'Avg Score', 'Difficulty']
      },
      attendance: {
        title: 'Attendance Report Preview',
        data: [
          { name: 'HTML & CSS Fundamentals', studentAttendance: '92%', teacherAttendance: '98%', trend: 'Stable' },
          { name: 'JavaScript Basics', studentAttendance: '88%', teacherAttendance: '96%', trend: 'Improving' },
          { name: 'React Development', studentAttendance: '85%', teacherAttendance: '100%', trend: 'Declining' }
        ],
        headers: ['Course', 'Student Attendance', 'Teacher Attendance', 'Trend']
      },
      overview: {
        title: 'Department Overview Report Preview',
        data: [
          { metric: 'Total Students', value: '342', change: '+12%', status: 'Good' },
          { metric: 'Total Teachers', value: '24', change: '+2%', status: 'Stable' },
          { metric: 'Active Courses', value: '18', change: '+3%', status: 'Growing' },
          { metric: 'Average Performance', value: '3.4 GPA', change: '+0.2', status: 'Improving' }
        ],
        headers: ['Metric', 'Value', 'Change', 'Status']
      }
    };
    return sampleData[reportType as keyof typeof sampleData] || null;
  };

  const handleGenerateReport = () => {
    if (!selectedReport) return;
    const data = generatePreviewData(selectedReport);
    setPreviewData(data);
    setShowPreview(true);
  };

  const handleExport = (format: string) => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const currentReport = reportTypes.find(r => r.type === selectedReport);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Generate Reports
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Create comprehensive reports for department analysis and management
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 mb-4 xs:mb-6">
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                <FileText size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">
                Reports
              </span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">
              127
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                <Download size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">
                Downloads
              </span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">
              89
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                <Calendar size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">
                This Month
              </span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">
              23
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-orange-50 text-orange-600 p-2 rounded-lg">
                <Settings size={16} />
              </div>
              <span className="text-xs xs:text-sm text-primary-50/60">
                Custom
              </span>
            </div>
            <div className="text-lg xs:text-xl font-bold text-primary-50">
              12
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6">
          {/* Report Types */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
              <h2 className="text-base xs:text-lg font-semibold text-primary-50 mb-3 xs:mb-4">
                Select Report Type
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                {reportTypes.map((report) => (
                  <div
                    key={report.type}
                    onClick={() => setSelectedReport(report.type)}
                    className={`p-3 xs:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedReport === report.type
                        ? "border-primary-50 bg-primary-50/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">{report.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm xs:text-base font-medium text-primary-50 mb-1">
                          {report.title}
                        </h3>
                        <p className="text-xs xs:text-sm text-primary-50/60 line-clamp-2">
                          {report.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Report Builder */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 xs:mb-4">
                <h2 className="text-base xs:text-lg font-semibold text-primary-50">
                  Custom Report Builder
                </h2>
                <button
                  onClick={() => setShowCustomBuilder(!showCustomBuilder)}
                  className="text-primary-50 hover:text-primary-100 text-sm font-medium"
                >
                  {showCustomBuilder ? "Hide" : "Show"} Builder
                </button>
              </div>

              {showCustomBuilder && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Data Category
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm">
                        <option>Students</option>
                        <option>Teachers</option>
                        <option>Courses</option>
                        <option>Exams</option>
                        <option>Attendance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Time Range
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm">
                        <option>Current Semester</option>
                        <option>Last Semester</option>
                        <option>Academic Year</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Fields to Include
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        "Name",
                        "ID",
                        "Performance",
                        "Attendance",
                        "Grades",
                        "Status",
                      ].map((field) => (
                        <label
                          key={field}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <span className="text-primary-50/70">{field}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Report Configuration */}
          <div className="space-y-4 xs:space-y-6">
            {/* Configuration Panel */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
              <h3 className="text-base xs:text-lg font-semibold text-primary-50 mb-3 xs:mb-4">
                Report Configuration
              </h3>

              {currentReport ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-primary-50 mb-2">
                      Selected Report
                    </h4>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      {currentReport.icon}
                      <span className="text-sm font-medium text-primary-50">
                        {currentReport.title}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Date Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                        placeholder="Start Date"
                      />
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                        placeholder="End Date"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Filters
                    </label>
                    <div className="space-y-2">
                      {currentReport.filters.slice(0, 2).map((filter) => (
                        <select
                          key={filter}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-50 focus:border-transparent text-sm"
                        >
                          <option>All {filter}s</option>
                          <option>Filter by {filter}</option>
                        </select>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Export Format
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["pdf", "excel", "csv"].map((format) => (
                        <button
                          key={format}
                          onClick={() =>
                            setReportConfig({ ...reportConfig, format })
                          }
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            reportConfig.format === format
                              ? "bg-primary-50 text-white"
                              : "bg-gray-100 text-primary-50 hover:bg-gray-200"
                          }`}
                        >
                          {format.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-primary-50/60 text-center py-4">
                  Select a report type to configure options
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
              <h3 className="text-base xs:text-lg font-semibold text-primary-50 mb-3 xs:mb-4">
                Actions
              </h3>

              <div className="space-y-3">
                <button
                  onClick={handleGenerateReport}
                  disabled={!selectedReport}
                  className="w-full bg-primary-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Preview Report
                </button>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleExport("pdf")}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-xs"
                  >
                    <FileText size={14} />
                    PDF
                  </button>
                  <button
                    onClick={() => handleExport("excel")}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-xs"
                  >
                    <FileSpreadsheet size={14} />
                    Excel
                  </button>
                  <button
                    onClick={() => handleExport("print")}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-xs"
                  >
                    <Printer size={14} />
                    Print
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6">
              <h3 className="text-base xs:text-lg font-semibold text-primary-50 mb-3 xs:mb-4">
                Recent Reports
              </h3>

              <div className="space-y-3">
                {[
                  {
                    name: "Student Performance Q1",
                    date: "2024-01-15",
                    type: "PDF",
                  },
                  {
                    name: "Course Enrollment",
                    date: "2024-01-12",
                    type: "Excel",
                  },
                  { name: "Teacher Activity", date: "2024-01-10", type: "PDF" },
                ].map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-50 truncate">
                        {report.name}
                      </p>
                      <p className="text-xs text-primary-50/60">
                        {report.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary-50/60">
                        {report.type}
                      </span>
                      <button className="text-primary-50 hover:text-primary-100">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      {showPreview && previewData && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg xs:rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-lg shadow-primary-50">
            <div className="flex items-center justify-between p-4 xs:p-6 border-b">
              <h2 className="text-lg xs:text-xl font-bold text-primary-50">
                {previewData.title}
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 xs:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Report Header Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Generated:</span>
                    <p className="font-medium">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Report Type:</span>
                    <p className="font-medium capitalize">{selectedReport}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Format:</span>
                    <p className="font-medium uppercase">
                      {reportConfig.format}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Records:</span>
                    <p className="font-medium">{previewData.data.length}</p>
                  </div>
                </div>
              </div>

              {/* Report Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-primary-50 text-white">
                      {previewData.headers.map(
                        (header: string, index: number) => (
                          <th
                            key={index}
                            className="border border-gray-300 px-4 py-2 text-left text-sm font-medium"
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.data.map((row: any, rowIndex: number) => (
                      <tr
                        key={rowIndex}
                        className={
                          rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }
                      >
                        {Object.values(row).map(
                          (cell: any, cellIndex: number) => (
                            <td
                              key={cellIndex}
                              className="border border-gray-300 px-4 py-2 text-sm"
                            >
                              {cell}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Stats */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-primary-50 mb-2">
                  Report Summary
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Records:</span>
                    <p className="font-medium">{previewData.data.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Date Range:</span>
                    <p className="font-medium">Current Semester</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="font-medium text-green-600">
                      Ready to Export
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col xs:flex-row gap-3 p-4 xs:p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium"
              >
                Close Preview
              </button>
              <div className="flex gap-2 xs:gap-3">
                <button
                  onClick={() => handleExport("pdf")}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
                >
                  <FileText size={16} />
                  Download PDF
                </button>
                <button
                  onClick={() => handleExport("excel")}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                >
                  <FileSpreadsheet size={16} />
                  Download Excel
                </button>
                <button
                  onClick={() => handleExport("print")}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  <Printer size={16} />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}