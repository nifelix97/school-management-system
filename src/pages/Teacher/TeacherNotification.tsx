import { useState } from "react";
import {
  ChevronLeft,
  Bell,
  Calendar,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Filter,
  Users,
  FileText,
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "assignment" | "exam" | "announcement" | "grade" | "event" | "meeting" | "report";
  priority: "high" | "medium" | "low";
  isRead: boolean;
  timestamp: string;
  sender: string;
  details: string;
  actionRequired?: boolean;
  dueDate?: string;
}

export default function TeacherNotification() {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Grade Submission Deadline",
      message: "Final grades for Mathematics 101 are due tomorrow",
      type: "grade",
      priority: "high",
      isRead: false,
      timestamp: "1 hour ago",
      sender: "Academic Office",
      details: "Please submit final grades for Mathematics 101 by tomorrow 5:00 PM. All grades must be entered in the online portal. Contact IT support if you experience any technical issues. Late submissions require approval from the department head.",
      actionRequired: true,
      dueDate: "Tomorrow 5:00 PM"
    },
    {
      id: 2,
      title: "Parent-Teacher Conference Schedule",
      message: "Your conference schedule for next week has been finalized",
      type: "meeting",
      priority: "high",
      isRead: false,
      timestamp: "3 hours ago",
      sender: "Administration",
      details: "You have 8 parent conferences scheduled for next week. Monday: 3 meetings (2:00-5:00 PM), Tuesday: 2 meetings (3:00-4:30 PM), Wednesday: 3 meetings (1:30-4:00 PM). All meetings are in Room 205. Please review student progress reports before each meeting.",
      actionRequired: true,
      dueDate: "Next Monday"
    },
    {
      id: 3,
      title: "New Student Assignment",
      message: "3 new students have been added to your Physics class",
      type: "announcement",
      priority: "medium",
      isRead: true,
      timestamp: "5 hours ago",
      sender: "Registrar Office",
      details: "Three transfer students have been enrolled in your Physics 201 class: Sarah Johnson, Mike Chen, and Lisa Rodriguez. Please update your gradebook and provide them with course materials. Their previous transcripts are available in the student portal.",
      actionRequired: false
    },
    {
      id: 4,
      title: "Faculty Meeting Reminder",
      message: "Monthly faculty meeting scheduled for Friday at 3:00 PM",
      type: "meeting",
      priority: "medium",
      isRead: true,
      timestamp: "1 day ago",
      sender: "Principal's Office",
      details: "Monthly faculty meeting will discuss curriculum updates, upcoming events, and budget allocations. Meeting will be held in the main conference room. Please bring your department reports and any concerns you'd like to address.",
      actionRequired: false
    },
    {
      id: 5,
      title: "Assignment Submission Alert",
      message: "15 students haven't submitted Chemistry Lab Report #4",
      type: "assignment",
      priority: "medium",
      isRead: false,
      timestamp: "1 day ago",
      sender: "Student Portal",
      details: "The following students have not submitted Chemistry Lab Report #4 (due yesterday): John Smith, Emma Wilson, David Brown, and 12 others. You may want to send a reminder or extend the deadline. Late submission policy allows 2 days with 10% penalty.",
      actionRequired: true
    },
    {
      id: 6,
      title: "Professional Development Workshop",
      message: "Registration open for 'Modern Teaching Methods' workshop",
      type: "event",
      priority: "low",
      isRead: false,
      timestamp: "2 days ago",
      sender: "HR Department",
      details: "Professional development workshop on 'Modern Teaching Methods and Technology Integration' will be held on April 20th, 9:00 AM - 4:00 PM. Registration deadline is April 10th. Lunch will be provided. This workshop counts toward your annual PD requirements.",
      actionRequired: true,
      dueDate: "April 10th"
    },
    {
      id: 7,
      title: "Exam Schedule Conflict",
      message: "Your Physics exam conflicts with the school assembly",
      type: "exam",
      priority: "high",
      isRead: true,
      timestamp: "3 days ago",
      sender: "Academic Coordinator",
      details: "Your scheduled Physics midterm exam on March 25th at 10:00 AM conflicts with the mandatory school assembly. Please reschedule the exam to either March 24th or March 26th. Contact the registrar to update the official exam schedule.",
      actionRequired: true,
      dueDate: "This week"
    },
    {
      id: 8,
      title: "Monthly Report Due",
      message: "Your monthly teaching report is due next Friday",
      type: "report",
      priority: "medium",
      isRead: false,
      timestamp: "1 week ago",
      sender: "Department Head",
      details: "Please submit your monthly teaching report including class progress, student performance analysis, and any concerns. The report should cover attendance rates, assignment completion, and upcoming curriculum plans. Submit through the faculty portal.",
      actionRequired: true,
      dueDate: "Next Friday"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "assignment": return <BookOpen size={20} className="text-blue-500" />;
      case "exam": return <AlertCircle size={20} className="text-red-500" />;
      case "grade": return <CheckCircle size={20} className="text-green-500" />;
      case "event": return <Calendar size={20} className="text-purple-500" />;
      case "meeting": return <Users size={20} className="text-orange-500" />;
      case "report": return <FileText size={20} className="text-indigo-500" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500 bg-red-50";
      case "medium": return "border-l-yellow-500 bg-yellow-50";
      case "low": return "border-l-green-500 bg-green-50";
      default: return "border-l-gray-500 bg-gray-50";
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return notification.type === filter;
  });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

  const markAsRead = (id: number) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      notification.isRead = true;
    }
  };

  if (selectedNotification) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          <button
            onClick={() => setSelectedNotification(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
          >
            <ChevronLeft size={20} />
            <span className="hidden xs:inline">Back to Notifications</span>
            <span className="xs:hidden">Back</span>
          </button>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
            <div className={`border-l-4 ${getPriorityColor(selectedNotification.priority)} p-4 xs:p-6`}>
              <div className="flex flex-col xs:flex-row items-start gap-3 xs:gap-4 mb-4">
                <div className="flex-shrink-0">{getIcon(selectedNotification.type)}</div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
                    {selectedNotification.title}
                  </h1>
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-xs xs:text-sm text-primary-50 mb-4">
                    <div className="flex items-center gap-1">
                      <User size={14} className="xs:w-4 xs:h-4" />
                      <span>{selectedNotification.sender}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="xs:w-4 xs:h-4" />
                      <span>{selectedNotification.timestamp}</span>
                    </div>
                    {selectedNotification.dueDate && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle size={14} className="xs:w-4 xs:h-4" />
                        <span>Due: {selectedNotification.dueDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 w-full xs:w-auto">
                  <span className={`px-2 xs:px-3 py-1 rounded-full text-xs font-medium ${
                    selectedNotification.priority === 'high' ? 'bg-red-100 text-red-700' :
                    selectedNotification.priority === 'medium' ? 'bg-primary-50 text-white' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {selectedNotification.priority.toUpperCase()}
                  </span>
                  {selectedNotification.actionRequired && (
                    <span className="px-2 xs:px-3 py-1 bg-primary-50 text-white rounded-full text-xs font-medium">
                      <span className="hidden xs:inline">ACTION REQUIRED</span>
                      <span className="xs:hidden">ACTION</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-sm xs:text-base text-primary-50 leading-relaxed">
                  {selectedNotification.details}
                </p>
              </div>

              {selectedNotification.actionRequired && (
                <div className="mt-4 xs:mt-6 p-3 xs:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2 text-sm xs:text-base">Action Required</h3>
                  <p className="text-blue-700 text-xs xs:text-sm">
                    This notification requires your attention. Please take the necessary action before the deadline.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-3 xs:mb-4"
        >
          <ChevronLeft size={18} className="xs:w-5 xs:h-5" />
          <span>Back</span>
        </button>

        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-4 mb-4 xs:mb-6">
          <h1 className="text-xl xs:text-2xl font-bold text-primary-50">Teacher Notifications</h1>
          <div className="flex items-center gap-2 w-full xs:w-auto">
            <Filter size={14} className="xs:w-4 xs:h-4 text-primary-50" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 xs:flex-initial px-2 xs:px-3 py-1.5 xs:py-2 text-primary-50 border border-primary-50 rounded-lg text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-primary-50"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="assignment">Assignments</option>
              <option value="exam">Exams</option>
              <option value="grade">Grades</option>
              <option value="meeting">Meetings</option>
              <option value="event">Events</option>
              <option value="report">Reports</option>
              <option value="announcement">Announcements</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 xs:space-y-4">
          {currentNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => {
                setSelectedNotification(notification);
                markAsRead(notification.id);
              }}
              className={`bg-white rounded-lg xs:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.isRead ? 'ring-2 ring-blue-100' : ''
              }`}
            >
              <div className="p-4 xs:p-6">
                <div className="flex items-start gap-3 xs:gap-4">
                  <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between mb-2 gap-1 xs:gap-4">
                      <h3 className={`font-semibold text-primary-50 text-sm xs:text-base ${!notification.isRead ? 'font-bold' : ''} pr-2 xs:pr-0`}>
                        {notification.title}
                        {!notification.isRead && (
                          <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-primary-50/40">{notification.timestamp}</span>
                        {notification.actionRequired && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                            ACTION
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-primary-50 text-xs xs:text-sm mb-2 leading-relaxed">{notification.message}</p>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs text-primary-50/30">
                      <span>From: {notification.sender}</span>
                      <span className="capitalize hidden xs:inline">{notification.type}</span>
                      <span className="capitalize hidden xs:inline">{notification.priority} priority</span>
                      <span className="xs:hidden">{notification.type} • {notification.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-8 xs:py-12">
            <Bell size={40} className="xs:w-12 xs:h-12 text-primary-50 mx-auto mb-3 xs:mb-4" />
            <h3 className="text-base xs:text-lg font-medium text-primary-50 mb-2">No notifications found</h3>
            <p className="text-sm xs:text-base text-primary-50 px-4">Try adjusting your filter to see more notifications.</p>
          </div>
        )}

        {filteredNotifications.length > 0 && (
          <div className="flex items-center justify-between mt-6 xs:mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 xs:px-6 py-2 xs:py-3 bg-white border border-primary-50/40 rounded-lg text-sm xs:text-base font-medium text-primary-50 hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-xs xs:text-sm text-primary-50">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 xs:px-6 py-2 xs:py-3 bg-white border border-primary-50/40 rounded-lg text-sm xs:text-base font-medium text-primary-50 hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}