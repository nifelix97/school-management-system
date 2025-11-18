import React, { useState} from 'react';
import { Eye, Users, AlertTriangle, Clock, Download, MessageSquare, Pause, Play, UserPlus, RefreshCw, X } from 'lucide-react';
import type { ExamMonitoring, StudentParticipation, IntegrityAlert } from '../../types/examMonitoring';

const MonitorExams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'completed'>('ongoing');

  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showIntegrityModal, setShowIntegrityModal] = useState(false);
  const [showInterventionModal, setShowInterventionModal] = useState(false);

  // Mock data
  const exams: ExamMonitoring[] = [
    {
      id: '1',
      title: 'Data Structures Final',
      course: 'CS301',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '12:00',
      duration: 180,
      status: 'ongoing',
      totalStudents: 45,
      loggedInStudents: 42,
      submittedStudents: 8,
      teacher: 'Dr. Smith',
      teacherId: 'T001',
      invigilators: ['Dr. Johnson', 'Prof. Wilson'],
      type: 'online'
    },
    {
      id: '2',
      title: 'Database Systems Quiz',
      course: 'CS401',
      date: '2024-01-16',
      startTime: '14:00',
      endTime: '15:30',
      duration: 90,
      status: 'upcoming',
      totalStudents: 38,
      loggedInStudents: 0,
      submittedStudents: 0,
      teacher: 'Prof. Davis',
      teacherId: 'T002',
      invigilators: ['Dr. Brown'],
      type: 'online'
    }
  ];

  const students: StudentParticipation[] = [
    {
      id: '1',
      name: 'John Doe',
      rollNumber: 'CS2021001',
      status: 'joined',
      loginTime: '09:02',
      lastActivity: '10:45',
      ipAddress: '192.168.1.100',
      flagged: false
    },
    {
      id: '2',
      name: 'Jane Smith',
      rollNumber: 'CS2021002',
      status: 'disconnected',
      loginTime: '09:01',
      lastActivity: '10:30',
      ipAddress: '192.168.1.101',
      flagged: true
    }
  ];

  const integrityAlerts: IntegrityAlert[] = [
    {
      id: '1',
      studentId: '2',
      studentName: 'Jane Smith',
      type: 'tab-switch',
      timestamp: '10:30',
      severity: 'medium',
      description: 'Multiple tab switches detected'
    }
  ];

  const filteredExams = exams.filter(exam => exam.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-50';
      case 'ongoing': return 'text-green-600 bg-green-50';
      case 'completed': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStudentStatusColor = (status: string) => {
    switch (status) {
      case 'joined': return 'text-green-600 bg-green-50';
      case 'not-joined': return 'text-red-600 bg-red-50';
      case 'disconnected': return 'text-yellow-600 bg-yellow-50';
      case 'submitted': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-yellow-600 bg-yellow-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleExportReports = () => {
    const reportData = {
      examStats: {
        upcoming: 3,
        ongoing: 1,
        completed: 12,
        alerts: 5
      },
      exams: filteredExams.map(exam => ({
        title: exam.title,
        course: exam.course,
        teacher: exam.teacher,
        date: exam.date,
        time: `${exam.startTime} - ${exam.endTime}`,
        status: exam.status,
        totalStudents: exam.totalStudents,
        loggedInStudents: exam.loggedInStudents,
        submittedStudents: exam.submittedStudents
      })),
      students: students.map(student => ({
        name: student.name,
        rollNumber: student.rollNumber,
        status: student.status,
        loginTime: student.loginTime,
        lastActivity: student.lastActivity,
        flagged: student.flagged
      })),
      integrityAlerts: integrityAlerts.map(alert => ({
        studentName: alert.studentName,
        type: alert.type,
        severity: alert.severity,
        timestamp: alert.timestamp,
        description: alert.description
      })),
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-monitoring-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Monitor Exams
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Real-time exam monitoring and management
          </p>
          <div className="flex flex-col xs:flex-row gap-2 mt-3 xs:mt-4">
            <button className="bg-primary-50 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-primary-100 flex items-center gap-2 text-xs xs:text-sm">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button 
              onClick={handleExportReports}
              className="bg-green-600 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-xs xs:text-sm"
            >
              <Download className="w-4 h-4" />
              Export Reports
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
          <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 xs:mb-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Clock size={20} />
              </div>
            </div>
            <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
              3
            </div>
            <div className="text-xs xs:text-sm text-primary-50/60">
              Upcoming
            </div>
          </div>
          <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 xs:mb-3">
              <div className="bg-green-600 text-white p-2 rounded-lg">
                <Play size={20} />
              </div>
            </div>
            <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
              1
            </div>
            <div className="text-xs xs:text-sm text-primary-50/60">Ongoing</div>
          </div>
          <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 xs:mb-3">
              <div className="bg-gray-600 text-white p-2 rounded-lg">
                <Eye size={20} />
              </div>
            </div>
            <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
              12
            </div>
            <div className="text-xs xs:text-sm text-primary-50/60">
              Completed
            </div>
          </div>
          <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2 xs:mb-3">
              <div className="bg-red-600 text-white p-2 rounded-lg">
                <AlertTriangle size={20} />
              </div>
            </div>
            <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
              5
            </div>
            <div className="text-xs xs:text-sm text-primary-50/60">Alerts</div>
          </div>
        </div>

        {/* Exams List */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
          <div className="p-3 xs:p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
              <h2 className="text-base xs:text-lg font-semibold text-primary-50">
                Exam Monitoring ({filteredExams.length})
              </h2>
              <div className="flex border rounded-lg overflow-hidden">
                {(["upcoming", "ongoing", "completed"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 xs:px-4 py-2 text-xs xs:text-sm font-medium whitespace-nowrap ${
                      activeTab === tab
                        ? "bg-primary-50 text-white"
                        : "bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden">
            {filteredExams.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No {activeTab} exams found</p>
              </div>
            ) : (
              filteredExams.map((exam) => (
                <div key={exam.id} className="p-4 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-primary-50 text-sm">
                        {exam.title}
                      </h3>
                      <p className="text-xs text-primary-50/60 mt-1">
                        {exam.course} • {exam.teacher}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        exam.status
                      )}`}
                    >
                      {exam.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-primary-50/60 mb-3">
                    <div>Date: {exam.date}</div>
                    <div>
                      Time: {exam.startTime}-{exam.endTime}
                    </div>
                    <div>
                      Students: {exam.loggedInStudents}/{exam.totalStudents}
                    </div>
                    <div>Submitted: {exam.submittedStudents}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowStudentModal(true);
                      }}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-xs"
                    >
                      <Users className="w-3 h-3" />
                      Students
                    </button>
                    <button
                      onClick={() => {
                        setShowIntegrityModal(true);
                      }}
                      className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2 text-xs"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      Alerts
                    </button>
                    {exam.status === "ongoing" && (
                      <button
                        onClick={() => {
                          setShowInterventionModal(true);
                        }}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 text-xs"
                      >
                        <MessageSquare className="w-3 h-3" />
                        Actions
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            {filteredExams.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No {activeTab} exams found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                      Exam Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                      Teacher
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                      Participation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-primary-50">
                          {exam.title}
                        </div>
                        <div className="text-sm text-primary-50/60">
                          {exam.course}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-primary-50">
                        {exam.teacher}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-primary-50">
                          {exam.date}
                        </div>
                        <div className="text-xs text-primary-50/60">
                          {exam.startTime} - {exam.endTime}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-primary-50">
                          {exam.loggedInStudents}/{exam.totalStudents} joined
                        </div>
                        <div className="text-xs text-primary-50/60">
                          {exam.submittedStudents} submitted
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            exam.status
                          )}`}
                        >
                          {exam.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setShowStudentModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Students"
                          >
                            <Users className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setShowIntegrityModal(true);
                            }}
                            className="text-orange-600 hover:text-orange-900 p-1"
                            title="Integrity Alerts"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                          {exam.status === "ongoing" && (
                            <button
                              onClick={() => {
                                setShowInterventionModal(true);
                              }}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Intervene"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Student Participation Modal */}
        {showStudentModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4  ">
            <div className="bg-white rounded-lg xs:rounded-xl p-4 xs:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg shadow-primary-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-50">
                  Student Participation
                </h3>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {student.flagged && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                        <h3 className="font-medium text-primary-50 text-sm">
                          {student.name}
                        </h3>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStudentStatusColor(
                          student.status
                        )}`}
                      >
                        {student.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-primary-50/60">
                      <p>
                        <span className="font-medium">Roll:</span>{" "}
                        {student.rollNumber}
                      </p>
                      <p>
                        <span className="font-medium">Login:</span>{" "}
                        {student.loginTime || "-"}
                      </p>
                      <p>
                        <span className="font-medium">Last Activity:</span>{" "}
                        {student.lastActivity || "-"}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs">
                        Message
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-xs">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden sm:block">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                          Student
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                          Roll
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                          Status
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                          Login
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                          Activity
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-primary-50 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-3 py-4">
                            <div className="flex items-center gap-1">
                              {student.flagged && (
                                <AlertTriangle className="w-3 h-3 text-red-500" />
                              )}
                              <span className="text-sm text-primary-50 truncate">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-xs text-primary-50">
                            {student.rollNumber}
                          </td>
                          <td className="px-3 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStudentStatusColor(
                                student.status
                              )}`}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-xs text-primary-50/60">
                            {student.loginTime || "-"}
                          </td>
                          <td className="px-3 py-4 text-xs text-primary-50/60">
                            {student.lastActivity || "-"}
                          </td>
                          <td className="px-3 py-4">
                            <div className="flex gap-1">
                              <button className="text-blue-600 hover:text-blue-800 text-xs">
                                Msg
                              </button>
                              <button className="text-red-600 hover:text-red-800 text-xs">
                                Del
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integrity Alerts Modal */}
        {showIntegrityModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg xs:rounded-xl p-4 xs:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg shadow-primary-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-50">
                  Integrity Alerts
                </h3>
                <button
                  onClick={() => setShowIntegrityModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {integrityAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4">
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        <h3 className="font-medium text-primary-50">
                          {alert.studentName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity}
                        </span>
                        <span className="text-sm text-primary-50/60">
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-primary-50/70 mb-3">
                      {alert.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">
                        Flag
                      </button>
                      <button className="px-2 py-1 bg-red-600 text-white rounded text-xs">
                        Submit
                      </button>
                      <button className="px-2 py-1 bg-gray-600 text-white rounded text-xs">
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Intervention Modal */}
        {showInterventionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg xs:rounded-xl p-4 xs:p-6 w-full max-w-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-50">
                  Exam Intervention
                </h3>
                <button
                  onClick={() => setShowInterventionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                <button className="p-3 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="font-medium text-primary-50 text-sm">
                      Send Announcement
                    </p>
                    <p className="text-xs text-primary-50/60">
                      Message all students
                    </p>
                  </div>
                </button>
                <button className="p-3 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Pause className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="font-medium text-primary-50 text-sm">
                      Pause Exam
                    </p>
                    <p className="text-xs text-primary-50/60">
                      Temporarily halt exam
                    </p>
                  </div>
                </button>
                <button className="p-3 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="font-medium text-primary-50 text-sm">
                      Extend Time
                    </p>
                    <p className="text-xs text-primary-50/60">
                      Add extra minutes
                    </p>
                  </div>
                </button>
                <button className="p-3 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="font-medium text-primary-50 text-sm">
                      Add Invigilator
                    </p>
                    <p className="text-xs text-primary-50/60">
                      Assign additional teacher
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitorExams;