import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  RefreshCw,
  Clock,
} from "lucide-react";

type AcademicEventKey = string;

interface AcademicEvent {
  title: string;
  color: string;
  type: string;
}
type AcademicEvents = Record<AcademicEventKey, AcademicEvent>;

export default function AcademicCalendar() {
  const [currentYear, setCurrentYear] = useState(2025);
  const [view, setView] = useState("year"); // 'year' or 'month'
  const [selectedMonth, setSelectedMonth] = useState(0); // January = 0

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Academic events for full year
  const academicEvents: AcademicEvents = {
    // January 2025
    "2025-01-01": { title: "New Year Holiday", color: "bg-orange-100 text-orange-700", type: "holiday" },
    "2025-01-08": { title: "Spring Semester Begins", color: "bg-blue-100 text-blue-700", type: "semester" },
    "2025-01-15": { title: "Registration Deadline", color: "bg-red-100 text-red-700", type: "deadline" },
    "2025-01-20": { title: "MLK Day - No Classes", color: "bg-orange-100 text-orange-700", type: "holiday" },
    "2025-01-25": { title: "Course Add/Drop Ends", color: "bg-red-100 text-red-700", type: "deadline" },
    
    // February 2025
    "2025-02-05": { title: "Career Fair", color: "bg-green-100 text-green-700", type: "event" },
    "2025-02-14": { title: "Midterm Exams Start", color: "bg-purple-100 text-purple-700", type: "exam" },
    "2025-02-17": { title: "Presidents Day - No Classes", color: "bg-orange-100 text-orange-700", type: "holiday" },
    "2025-02-20": { title: "Parent-Teacher Conference", color: "bg-green-100 text-green-700", type: "meeting" },
    "2025-02-28": { title: "Scholarship Applications Due", color: "bg-red-100 text-red-700", type: "deadline" },
    
    // March 2025
    "2025-03-10": { title: "Spring Break Begins", color: "bg-orange-100 text-orange-700", type: "break" },
    "2025-03-17": { title: "Spring Break Ends", color: "bg-orange-100 text-orange-700", type: "break" },
    "2025-03-20": { title: "Research Symposium", color: "bg-green-100 text-green-700", type: "event" },
    "2025-03-25": { title: "Study Abroad Info Session", color: "bg-green-100 text-green-700", type: "event" },
    
    // April 2025
    "2025-04-01": { title: "Summer Registration Opens", color: "bg-blue-100 text-blue-700", type: "registration" },
    "2025-04-10": { title: "Project Submission Deadline", color: "bg-red-100 text-red-700", type: "deadline" },
    "2025-04-15": { title: "Honor Society Induction", color: "bg-yellow-100 text-yellow-700", type: "event" },
    "2025-04-22": { title: "Earth Day Activities", color: "bg-green-100 text-green-700", type: "event" },
    
    // May 2025
    "2025-05-01": { title: "Final Exams Begin", color: "bg-purple-100 text-purple-700", type: "exam" },
    "2025-05-10": { title: "Last Day of Classes", color: "bg-blue-100 text-blue-700", type: "semester" },
    "2025-05-15": { title: "Final Exams End", color: "bg-purple-100 text-purple-700", type: "exam" },
    "2025-05-20": { title: "Graduation Ceremony", color: "bg-yellow-100 text-yellow-700", type: "event" },
    "2025-05-26": { title: "Memorial Day - No Classes", color: "bg-orange-100 text-orange-700", type: "holiday" },
    
    // June 2025
    "2025-06-01": { title: "Summer Session Begins", color: "bg-blue-100 text-blue-700", type: "semester" },
    "2025-06-15": { title: "Summer Internship Fair", color: "bg-green-100 text-green-700", type: "event" },
    "2025-06-19": { title: "Juneteenth - No Classes", color: "bg-orange-100 text-orange-700", type: "holiday" },
    
    // July 2025
    "2025-07-04": { title: "Independence Day - No Classes", color: "bg-orange-100 text-orange-700", type: "holiday" },
    "2025-07-15": { title: "Summer Midterm Exams", color: "bg-purple-100 text-purple-700", type: "exam" },
    "2025-07-31": { title: "Summer Session Ends", color: "bg-blue-100 text-blue-700", type: "semester" },
    
    // August 2025
    "2025-08-15": { title: "Fall Registration Deadline", color: "bg-red-100 text-red-700", type: "deadline" },
    "2025-08-20": { title: "New Student Orientation", color: "bg-green-100 text-green-700", type: "event" },
    "2025-08-25": { title: "Fall Semester Begins", color: "bg-blue-100 text-blue-700", type: "semester" },
    
    // September 2025
    "2025-09-01": { title: "Labor Day - No Classes", color: "bg-orange-100 text-orange-700", type: "holiday" },
    "2025-09-10": { title: "Club Fair", color: "bg-green-100 text-green-700", type: "event" },
    "2025-09-15": { title: "Course Add/Drop Deadline", color: "bg-red-100 text-red-700", type: "deadline" },
    "2025-09-25": { title: "Homecoming Week", color: "bg-yellow-100 text-yellow-700", type: "event" },
    
    // October 2025
    "2025-10-10": { title: "Fall Break", color: "bg-orange-100 text-orange-700", type: "break" },
    "2025-10-15": { title: "Midterm Exams Begin", color: "bg-purple-100 text-purple-700", type: "exam" },
    "2025-10-20": { title: "Graduate School Fair", color: "bg-green-100 text-green-700", type: "event" },
    "2025-10-31": { title: "Halloween Activities", color: "bg-orange-100 text-orange-700", type: "event" },
    
    // November 2025
    "2025-11-11": { title: "Veterans Day - No Classes", color: "bg-orange-100 text-orange-700", type: "holiday" },
    "2025-11-15": { title: "Spring Registration Opens", color: "bg-blue-100 text-blue-700", type: "registration" },
    "2025-11-25": { title: "Thanksgiving Break Begins", color: "bg-orange-100 text-orange-700", type: "break" },
    "2025-11-30": { title: "Classes Resume", color: "bg-blue-100 text-blue-700", type: "semester" },
    
    // December 2025
    "2025-12-05": { title: "Last Day of Classes", color: "bg-blue-100 text-blue-700", type: "semester" },
    "2025-12-10": { title: "Final Exams Begin", color: "bg-purple-100 text-purple-700", type: "exam" },
    "2025-12-15": { title: "Final Exams End", color: "bg-purple-100 text-purple-700", type: "exam" },
    "2025-12-20": { title: "Winter Break Begins", color: "bg-orange-100 text-orange-700", type: "break" },
    "2025-12-25": { title: "Christmas Day", color: "bg-orange-100 text-orange-700", type: "holiday" },
    "2025-12-31": { title: "New Year's Eve", color: "bg-orange-100 text-orange-700", type: "holiday" },
  };



  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderMiniMonth = (monthIndex: number) => {
    const year = currentYear;
    const daysInMonth = getDaysInMonth(year, monthIndex);
    const firstDay = getFirstDayOfMonth(year, monthIndex);
    const days = [];

    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const event = academicEvents[dateKey];
      const isToday = new Date().getDate() === day && new Date().getMonth() === monthIndex && new Date().getFullYear() === year;

      days.push(
        <div
          key={day}
          className={`aspect-square text-xs flex items-center justify-center cursor-pointer transition-all
            ${isToday ? "bg-primary-50 text-white font-bold rounded-full" : ""}
            ${
              event
                ? `${event.color} rounded-md font-semibold`
                : "hover:bg-gray-100 rounded-md"
            }
          `}
          onClick={() => {
            setSelectedMonth(monthIndex);
            setView("month");
          }}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="font-bold text-gray-900 mb-3 text-center">
          {monthNames[monthIndex]}
        </h3>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div
              key={i}
              className="text-center text-xs font-semibold text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const renderYearView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {monthNames.map((month, index) => (
          <div key={index}>{renderMiniMonth(index)}</div>
        ))}
      </div>
    );
  };

  const renderMonthView = () => {
    const year = currentYear;
    const month = selectedMonth;
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-32 border border-gray-200"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const event = academicEvents[dateKey];
      const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

      days.push(
        <div key={day} className={`min-h-32 border border-gray-200 p-2 ${isToday ? "bg-blue-50 border-blue-200" : ""}`}>
          <div className={`text-sm font-semibold mb-2 ${isToday ? "text-blue-600" : "text-gray-700"}`}>
            {day}
          </div>
          {event && (
            <div className={`text-xs p-2 rounded ${event.color} mb-1`}>
              <div className="font-semibold">{event.title}</div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setView("year")}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80"
          >
            <ChevronLeft size={20} />
            <span>Back to Calendar</span>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-0">
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-700 py-4 border border-gray-200 bg-gray-50">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0">{days}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Academic Calendar</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent"
              />
            </div>
            {/* <button className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Plus size={18} />
              <span className="hidden sm:inline">Add New Event</span>
            </button> */}
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => view === "year" ? setCurrentYear(currentYear - 1) : setSelectedMonth(selectedMonth - 1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-gray-900">
                  {view === "year" ? currentYear : `${monthNames[selectedMonth]} ${currentYear}`}
                </h2>
                <button 
                  onClick={() => view === "year" ? setCurrentYear(currentYear + 1) : setSelectedMonth(selectedMonth + 1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setView(view === "year" ? "month" : "year")}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <span>{view === "year" ? "Month View" : "Year View"}</span>
                  <ChevronDown size={16} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>

            {view === "year" ? renderYearView() : renderMonthView()}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Academic Year Overview */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Academic Year 2024-25</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fall Semester</span>
                  <span className="font-medium">Aug - Dec</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Spring Semester</span>
                  <span className="font-medium">Jan - May</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Summer Session</span>
                  <span className="font-medium">Jun - Jul</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Key Dates</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-100"></div>
                    <span>Semester Start/End</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-100"></div>
                    <span>Exams & Deadlines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-100"></div>
                    <span>Events & Activities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-100"></div>
                    <span>Breaks & Holidays</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Panel */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Notification</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <RefreshCw size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 text-sm mb-3">
                    Upcoming Events
                  </h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-400 pl-3">
                      <div className="text-sm font-medium text-gray-900">Advanced Mathematics</div>
                      <div className="text-xs text-gray-500">3-Hour Course</div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Clock size={12} />
                        <span>9:00AM - 12:00PM</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">📍 Room 201</div>
                    </div>
                    
                    <div className="border-l-4 border-green-400 pl-3">
                      <div className="text-sm font-medium text-gray-900">Chemistry Lab</div>
                      <div className="text-xs text-gray-500">4-Hour Practical</div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Clock size={12} />
                        <span>1:00PM - 5:00PM</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">📍 Lab Complex</div>
                    </div>
                    
                    <div className="border-l-4 border-purple-400 pl-3">
                      <div className="text-sm font-medium text-gray-900">Research Seminar</div>
                      <div className="text-xs text-gray-500">2-Hour Session</div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                        <Clock size={12} />
                        <span>2:00PM - 4:00PM</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">📍 Conference Hall</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
