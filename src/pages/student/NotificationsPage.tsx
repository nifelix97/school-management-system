import React, { useState } from "react";
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
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "assignment" | "exam" | "announcement" | "grade" | "event";
  priority: "high" | "medium" | "low";
  isRead: boolean;
  timestamp: string;
  sender: string;
  details: string;
  actionRequired?: boolean;
  dueDate?: string;
}

export default function NotificationsPage() {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Assignment Due Tomorrow",
      message: "Mathematics homework Chapter 5 is due tomorrow at 11:59 PM",
      type: "assignment",
      priority: "high",
      isRead: false,
      timestamp: "2 hours ago",
      sender: "Dr. Smith",
      details: "Complete exercises 1-15 from Chapter 5: Calculus Integration. Submit your work through the online portal. Late submissions will receive a 10% penalty per day. If you need help, attend office hours on Monday 2-4 PM.",
      actionRequired: true,
      dueDate: "Tomorrow 11:59 PM"
    },
    {
      id: 2,
      title: "Midterm Exam Schedule",
      message: "Physics midterm exam has been scheduled for next Friday",
      type: "exam",
      priority: "high",
      isRead: false,
      timestamp: "4 hours ago",
      sender: "Prof. Johnson",
      details: "The Physics midterm exam will cover chapters 1-8. The exam will be held in the main auditorium from 9:00 AM to 11:00 AM. Please bring your student ID, calculator, and writing materials. Review sessions will be held on Tuesday and Wednesday at 3:00 PM in Lab 201.",
      actionRequired: true,
      dueDate: "Next Friday 9:00 AM"
    },
    {
      id: 3,
      title: "Grade Posted: Chemistry Lab",
      message: "Your grade for Chemistry Lab Report #3 has been posted",
      type: "grade",
      priority: "medium",
      isRead: true,
      timestamp: "1 day ago",
      sender: "Dr. Wilson",
      details: "Grade: A- (92/100). Excellent work on the organic synthesis experiment. Your methodology was thorough and results were well-documented. Minor points deducted for formatting. Keep up the great work! Feedback has been added to your lab report in the portal.",
      actionRequired: false
    },
    {
      id: 4,
      title: "Class Cancelled - English Literature",
      message: "Today's English Literature class has been cancelled",
      type: "announcement",
      priority: "medium",
      isRead: true,
      timestamp: "1 day ago",
      sender: "Ms. Davis",
      details: "Due to a faculty meeting, today's English Literature class (2:00 PM) has been cancelled. We will cover the missed material in our next session. Please read Chapter 12 of 'Pride and Prejudice' for homework. Office hours remain available if you have questions.",
      actionRequired: false
    },
    {
      id: 5,
      title: "Science Fair Registration Open",
      message: "Registration for the Annual Science Fair is now open",
      type: "event",
      priority: "low",
      isRead: false,
      timestamp: "2 days ago",
      sender: "Academic Office",
      details: "The Annual Science Fair will be held on April 15th in the main gymnasium. Students can register individually or in teams of up to 3 members. Registration deadline is March 30th. Prizes will be awarded for top 3 projects in each category. Contact Dr. Garcia for more information.",
      actionRequired: true,
      dueDate: "March 30th"
    },
    {
      id: 6,
      title: "Library Book Overdue",
      message: "You have 2 overdue books that need to be returned",
      type: "announcement",
      priority: "medium",
      isRead: false,
      timestamp: "3 days ago",
      sender: "Library Services",
      details: "The following books are overdue: 'Advanced Calculus' (due Feb 28) and 'Organic Chemistry Principles' (due Mar 1). Please return them as soon as possible to avoid additional late fees. Current fee: $4.00. You can renew books online if no one else has requested them.",
      actionRequired: true
    },
    {
      id: 7,
      title: "Parent-Teacher Conference Scheduled",
      message: "Your parent-teacher conference has been scheduled",
      type: "event",
      priority: "low",
      isRead: true,
      timestamp: "1 week ago",
      sender: "Academic Coordinator",
      details: "Parent-teacher conference scheduled for March 20th at 3:30 PM in Room 105. Your parents will meet with Ms. Davis (English), Dr. Smith (Mathematics), and Prof. Johnson (Physics). Please inform your parents about the schedule.",
      actionRequired: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "assignment": return <BookOpen size={20} className="text-blue-500" />;
      case "exam": return <AlertCircle size={20} className="text-red-500" />;
      case "grade": return <CheckCircle size={20} className="text-green-500" />;
      case "event": return <Calendar size={20} className="text-purple-500" />;
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
                  <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {selectedNotification.title}
                  </h1>
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-xs xs:text-sm text-gray-600 mb-4">
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
                    selectedNotification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {selectedNotification.priority.toUpperCase()}
                  </span>
                  {selectedNotification.actionRequired && (
                    <span className="px-2 xs:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      <span className="hidden xs:inline">ACTION REQUIRED</span>
                      <span className="xs:hidden">ACTION</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-sm xs:text-base text-gray-700 leading-relaxed">
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
          <h1 className="text-xl xs:text-2xl font-bold text-gray-900">Notifications</h1>
          <div className="flex items-center gap-2 w-full xs:w-auto">
            <Filter size={14} className="xs:w-4 xs:h-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 xs:flex-initial px-2 xs:px-3 py-1.5 xs:py-2 border border-gray-200 rounded-lg text-xs xs:text-sm focus:outline-none focus:ring-2 focus:ring-primary-50"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="assignment">Assignments</option>
              <option value="exam">Exams</option>
              <option value="grade">Grades</option>
              <option value="event">Events</option>
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
                      <h3 className={`font-semibold text-gray-900 text-sm xs:text-base ${!notification.isRead ? 'font-bold' : ''} pr-2 xs:pr-0`}>
                        {notification.title}
                        {!notification.isRead && (
                          <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        {notification.actionRequired && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                            ACTION
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs xs:text-sm mb-2 leading-relaxed">{notification.message}</p>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs text-gray-500">
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
            <Bell size={40} className="xs:w-12 xs:h-12 text-gray-300 mx-auto mb-3 xs:mb-4" />
            <h3 className="text-base xs:text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-sm xs:text-base text-gray-500 px-4">Try adjusting your filter to see more notifications.</p>
          </div>
        )}

        {filteredNotifications.length > 0 && (
          <div className="flex items-center justify-between mt-6 xs:mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 xs:px-6 py-2 xs:py-3 bg-white border border-gray-200 rounded-lg text-sm xs:text-base font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-xs xs:text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 xs:px-6 py-2 xs:py-3 bg-white border border-gray-200 rounded-lg text-sm xs:text-base font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}