import React, { useState, useEffect } from 'react';
import { Calendar,Users, BookOpen, AlertTriangle, Download, Search,  Plus, Edit, Check, X, BarChart3 } from 'lucide-react';
import type { TimetableEntry, ExamEntry, Instructor, ConflictInfo } from '../../types/timetable';
import TimetableCreateModal from '../../components/TimetableCreateModal';
import ExamCreateModal from '../../components/ExamCreateModal';
import ConflictResolutionModal from '../../components/ConflictResolutionModal';
import WeeklyCalendarView from '../../components/WeeklyCalendarView';
import NotificationSystem from '../../components/NotificationSystem';
import ReportsAnalytics from '../../components/ReportsAnalytics';

const TimeTableExams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timetable' | 'exams' | 'reports'>('timetable');
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | ExamEntry | null>(null);
  
  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'warning' as const,
      title: 'Schedule Conflict Detected',
      message: 'Time overlap between CS101 and CS102 on Monday requires your attention.',
      timestamp: new Date().toISOString(),
      isRead: false,
      actionRequired: true,
      relatedId: 'conflict-1'
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'New Timetable Proposal',
      message: 'Dr. Smith has submitted a new course schedule for approval.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isRead: false,
      actionRequired: true,
      relatedId: 'proposal-1'
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'Exam Schedule Approved',
      message: 'CS101 final exam has been successfully scheduled.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: true,
      actionRequired: false
    }
  ]);

  // Mock data
  const [timetableEntries, setTimetableEntries] = useState<TimetableEntry[]>([
    {
      id: '1',
      courseId: 'CS101',
      courseName: 'Introduction to Programming',
      instructorId: 'T001',
      instructorName: 'Dr. Smith',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      classroom: 'Room 101',
      semester: 'Fall 2024',
      level: '1st Year',
      status: 'active'
    },
    {
      id: '2',
      courseId: 'CS102',
      courseName: 'Data Structures',
      instructorId: 'T002',
      instructorName: 'Prof. Johnson',
      day: 'Monday',
      startTime: '09:30',
      endTime: '11:00',
      classroom: 'Room 102',
      semester: 'Fall 2024',
      level: '2nd Year',
      status: 'conflict'
    }
  ]);

  const [examEntries, setExamEntries] = useState<ExamEntry[]>([
    {
      id: '1',
      courseId: 'CS101',
      courseName: 'Introduction to Programming',
      examDate: '2024-12-15',
      startTime: '09:00',
      endTime: '12:00',
      venue: 'Exam Hall A',
      isOnline: false,
      invigilatorId: 'T001',
      invigilatorName: 'Dr. Smith',
      semester: 'Fall 2024',
      level: '1st Year',
      status: 'scheduled'
    }
  ]);

  const [instructors] = useState<Instructor[]>([
    { id: 'T001', name: 'Dr. Smith', email: 'smith@university.edu', department: 'Computer Science', courses: ['CS101'] },
    { id: 'T002', name: 'Prof. Johnson', email: 'johnson@university.edu', department: 'Computer Science', courses: ['CS102'] }
  ]);

  const [conflicts, setConflicts] = useState<ConflictInfo[]>([
    {
      type: 'time_overlap',
      message: 'Time overlap detected between CS101 and CS102 on Monday',
      affectedEntries: ['1', '2']
    }
  ]);

  const detectConflicts = () => {
    const newConflicts: ConflictInfo[] = [];
    
    // Check for time overlaps
    timetableEntries.forEach((entry1, index1) => {
      timetableEntries.forEach((entry2, index2) => {
        if (index1 !== index2 && entry1.day === entry2.day) {
          const start1 = new Date(`2024-01-01 ${entry1.startTime}`);
          const end1 = new Date(`2024-01-01 ${entry1.endTime}`);
          const start2 = new Date(`2024-01-01 ${entry2.startTime}`);
          const end2 = new Date(`2024-01-01 ${entry2.endTime}`);
          
          if ((start1 < end2 && end1 > start2)) {
            newConflicts.push({
              type: 'time_overlap',
              message: `Time overlap between ${entry1.courseName} and ${entry2.courseName} on ${entry1.day}`,
              affectedEntries: [entry1.id, entry2.id]
            });
          }
        }
      });
    });
    
    setConflicts(newConflicts);
  };

  useEffect(() => {
    detectConflicts();
  }, [timetableEntries]);

  const filteredTimetableEntries = timetableEntries.filter(entry => {
    const matchesSearch = entry.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.instructorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === 'all' || entry.semester === selectedSemester;
    return matchesSearch && matchesSemester;
  });

  const filteredExamEntries = examEntries.filter(entry => {
    const matchesSearch = entry.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === 'all' || entry.semester === selectedSemester;
    return matchesSearch && matchesSemester;
  });

  const handleCreateTimetable = () => {
    setShowCreateModal(true);
  };

  const handleSaveTimetableEntry = (entry: Omit<TimetableEntry, 'id'>) => {
    const newEntry: TimetableEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setTimetableEntries(prev => [...prev, newEntry]);
  };

  const handleSaveExamEntry = (entry: Omit<ExamEntry, 'id'>) => {
    const newEntry: ExamEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setExamEntries(prev => [...prev, newEntry]);
  };

  const handleResolveConflict = (entryId: string, updates: Partial<TimetableEntry>) => {
    setTimetableEntries(prev => prev.map(entry => 
      entry.id === entryId ? { ...entry, ...updates, status: 'active' as const } : entry
    ));
    
    // Add success notification
    const newNotification = {
      id: Date.now().toString(),
      type: 'success' as const,
      title: 'Conflict Resolved',
      message: 'Schedule conflict has been successfully resolved.',
      timestamp: new Date().toISOString(),
      isRead: false,
      actionRequired: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };
  
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };
  
  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleEditEntry = (entry: TimetableEntry | ExamEntry) => {
    setSelectedEntry(entry);
    setShowEditModal(true);
  };

  const handleApproveEntry = (id: string) => {
    if (activeTab === 'timetable') {
      setTimetableEntries(prev => prev.map(entry => 
        entry.id === id ? { ...entry, status: 'active' as const } : entry
      ));
    } else {
      setExamEntries(prev => prev.map(entry => 
        entry.id === id ? { ...entry, status: 'approved' as const } : entry
      ));
    }
  };

  const handleRejectEntry = (id: string) => {
    if (activeTab === 'exams') {
      setExamEntries(prev => prev.map(entry => 
        entry.id === id ? { ...entry, status: 'rejected' as const } : entry
      ));
    }
  };

  const exportToPDF = () => {
    // Mock export functionality
    alert('Exporting to PDF...');
  };

  const exportToExcel = () => {
    // Mock export functionality
    alert('Exporting to Excel...');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            Timetable & Exams Management
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            Manage department schedules, exams, and resolve conflicts
          </p>
        </div>

        {/* Statistics Cards */}
        {activeTab !== "reports" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-4 xs:mb-6">
            <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 xs:mb-3">
                <div className="bg-primary-100 text-white p-2 rounded-lg">
                  <Calendar size={20} />
                </div>
              </div>
              <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
                {timetableEntries.length}
              </div>
              <div className="text-xs xs:text-sm text-primary-50/60">
                Total Classes
              </div>
            </div>

            <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 xs:mb-3">
                <div className="bg-green-600 text-white p-2 rounded-lg">
                  <BookOpen size={20} />
                </div>
              </div>
              <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
                {examEntries.length}
              </div>
              <div className="text-xs xs:text-sm text-primary-50/60">
                Scheduled Exams
              </div>
            </div>

            <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 xs:mb-3">
                <div className="bg-yellow-600 text-white p-2 rounded-lg">
                  <Users size={20} />
                </div>
              </div>
              <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
                {instructors.length}
              </div>
              <div className="text-xs xs:text-sm text-primary-50/60">
                Active Instructors
              </div>
            </div>

            <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-3 xs:p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 xs:mb-3">
                <div className="bg-primary-200 text-white p-2 rounded-lg">
                  <AlertTriangle size={20} />
                </div>
              </div>
              <div className="text-xl xs:text-2xl font-bold text-primary-50 mb-1">
                {conflicts.length}
              </div>
              <div className="text-xs xs:text-sm text-primary-50/60">
                Conflicts
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 xs:gap-4 mb-4 xs:mb-6 bg-primary-50/20 p-3 xs:p-4 rounded-lg xs:rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("timetable")}
            className={`px-3 xs:px-4 py-2 rounded-lg font-medium transition-colors text-xs xs:text-sm ${
              activeTab === "timetable"
                ? "bg-white text-primary-50 shadow-sm"
                : "text-primary-50/50 hover:text-primary-50"
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            <span className="hidden xs:inline">Timetable</span>
            <span className="xs:hidden">Time</span>
          </button>
          <button
            onClick={() => setActiveTab("exams")}
            className={`px-3 xs:px-4 py-2 rounded-lg font-medium transition-colors text-xs xs:text-sm ${
              activeTab === "exams"
                ? "bg-white text-primary-50 shadow-sm"
                : "text-primary-50/50 hover:text-primary-50"
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Exams
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-3 xs:px-4 py-2 rounded-lg font-medium transition-colors text-xs xs:text-sm ${
              activeTab === "reports"
                ? "bg-white text-primary-50 shadow-sm"
                : "text-primary-50/50 hover:text-primary-50"
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Reports
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col xs:flex-row flex-wrap gap-2 xs:gap-4 items-start xs:items-center justify-between">
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 items-start xs:items-center w-full xs:w-auto">
              <div className="relative w-full xs:w-auto">
                <Search className="w-3 h-3 xs:w-4 xs:h-4 absolute left-2 xs:left-3 top-1/2 transform -translate-y-1/2 text-primary-50" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 border border-primary-300/30 rounded-lg text-primary-50 text-sm w-full xs:w-auto"
                />
              </div>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-3 xs:px-4 py-2 border border-primary-50/30 text-primary-50 rounded-lg  text-sm w-full xs:w-auto"
              >
                <option value="all">All Semesters</option>
                <option value="Fall 2024">Fall 2024</option>
                <option value="Spring 2024">Spring 2024</option>
              </select>

              {activeTab === "timetable" && (
                <div className="flex gap-1 xs:gap-2 w-full xs:w-auto">
                  <button
                    onClick={() => setViewMode("weekly")}
                    className={`px-2 xs:px-3 py-2 rounded-md text-xs xs:text-sm flex-1 xs:flex-none ${
                      viewMode === "weekly"
                        ? "bg-primary-100/20 text-primary-50"
                        : "bg-primary-300/10 text-primary-300"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setViewMode("monthly")}
                    className={`px-2 xs:px-3 py-2 rounded-md text-xs xs:text-sm flex-1 xs:flex-none ${
                      viewMode === "monthly"
                        ? "bg-primary-100/20 text-primary-50"
                        : "bg-primary-300/10 text-primary-300"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col xs:flex-row gap-2 items-start xs:items-center w-full xs:w-auto">
              <NotificationSystem
                notifications={notifications}
                onMarkAsRead={handleMarkNotificationAsRead}
                onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                onDismiss={handleDismissNotification}
              />
              <div className="flex flex-wrap gap-2 w-full xs:w-auto">
                {activeTab !== "reports" && (
                  <button
                    onClick={handleCreateTimetable}
                    className="bg-primary-50 text-white px-2 xxs:px-3 xs:px-4 py-2 rounded-lg hover:bg-primary-100 flex items-center gap-1 xxs:gap-2 text-xs xxs:text-sm flex-1 xxs:flex-none justify-center"
                  >
                    <Plus className="w-3 h-3 xxs:w-4 xxs:h-4" />
                    <span className="hidden xs:inline">
                      Create{" "}
                      {activeTab === "timetable"
                        ? "Timetable"
                        : "Exam Schedule"}
                    </span>
                    <span className="xs:hidden">Create</span>
                  </button>
                )}
                <button
                  onClick={exportToPDF}
                  className="bg-primary-50 text-white px-2 xxs:px-3 xs:px-4 py-2 rounded-lg hover:bg-primary-300 flex items-center gap-1 xxs:gap-2 text-xs xxs:text-sm flex-1 xxs:flex-none justify-center"
                >
                  <Download className="w-3 h-3 xxs:w-4 xxs:h-4" />
                  PDF
                </button>
                <button
                  onClick={exportToExcel}
                  className="bg-primary-50 text-white px-2 xxs:px-3 xs:px-4 py-2 rounded-lg hover:bg-primary-300 flex items-center gap-1 xxs:gap-2 text-xs xxs:text-sm flex-1 xxs:flex-none justify-center"
                >
                  <Download className="w-3 h-3 xxs:w-4 xxs:h-4" />
                  Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Conflicts Alert */}
        {conflicts.length > 0 && (
          <div className="bg-primary-200/20 border border-primary-200/40 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-800">
                  Conflicts Detected
                </h3>
              </div>
              <button
                onClick={() => setShowConflictModal(true)}
                className="bg-primary-200 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
              >
                Resolve Conflicts
              </button>
            </div>
            <div className="space-y-1">
              {conflicts.map((conflict, index) => (
                <p key={index} className="text-red-800 text-sm">
                  {conflict.message}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === "timetable" ? (
          <div className="space-y-6">
            {viewMode === "weekly" ? (
              <WeeklyCalendarView
                entries={filteredTimetableEntries}
                onEntryClick={handleEditEntry}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Department Timetable
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Instructor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Day & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTimetableEntries.map((entry) => (
                        <tr
                          key={entry.id}
                          className={
                            entry.status === "conflict" ? "bg-red-50" : ""
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {entry.courseName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {entry.courseId}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {entry.instructorName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {entry.day}
                            </div>
                            <div className="text-sm text-gray-500">
                              {entry.startTime} - {entry.endTime}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {entry.classroom || entry.virtualLink || "TBD"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {entry.level}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                entry.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : entry.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {entry.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditEntry(entry)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              {entry.status === "pending" && (
                                <>
                                  <button
                                    onClick={() => handleApproveEntry(entry.id)}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleRejectEntry(entry.id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Exam Schedule
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Venue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invigilator
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExamEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {entry.courseName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {entry.courseId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {entry.examDate}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.startTime} - {entry.endTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {entry.venue}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.isOnline ? "Online" : "Offline"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.invigilatorName || "TBD"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            entry.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : entry.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : entry.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditEntry(entry)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {entry.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleApproveEntry(entry.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRejectEntry(entry.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <ReportsAnalytics
          timetableEntries={timetableEntries}
          examEntries={examEntries}
          instructors={instructors}
        />
      </div>

      {/* Create Modals */}
      <TimetableCreateModal
        isOpen={showCreateModal && activeTab === "timetable"}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveTimetableEntry}
        instructors={instructors}
      />

      <ExamCreateModal
        isOpen={showCreateModal && activeTab === "exams"}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveExamEntry}
        instructors={instructors}
      />

      <ConflictResolutionModal
        isOpen={showConflictModal}
        onClose={() => setShowConflictModal(false)}
        conflicts={conflicts}
        timetableEntries={timetableEntries}
        instructors={instructors}
        onResolveConflict={handleResolveConflict}
      />

      {/* Edit Modal Placeholder */}
      {showEditModal && selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-3 xxs:p-4 xs:p-5 sm:p-6 w-full max-w-xs xxs:max-w-sm xs:max-w-md sm:max-w-2xl font-comfortaa">
            <h3 className="text-sm xxs:text-base xs:text-lg font-semibold mb-3 xxs:mb-4 text-primary-50">
              Edit{" "}
              {activeTab === "timetable" ? "Timetable Entry" : "Exam Schedule"}
            </h3>
            <p className="text-primary-300 mb-3 xxs:mb-4 text-xs xxs:text-sm xs:text-base">
              Editing:{" "}
              {"courseName" in selectedEntry
                ? selectedEntry.courseName
                : "Unknown"}
            </p>
            <div className="flex flex-col xxs:flex-row justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 xxs:px-4 py-2 text-primary-300 border border-primary-300/30 rounded-lg hover:bg-primary-300/10 text-xs xxs:text-sm order-2 xxs:order-1"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 xxs:px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 text-xs xxs:text-sm order-1 xxs:order-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTableExams;