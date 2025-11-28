import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoDownloadOutline,
    IoFilterOutline,
    IoGridOutline,
    IoListOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoTimeOutline,
    IoTodayOutline
} from "react-icons/io5";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  attendees: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  priority: "high" | "medium" | "low";
  organizer: string;
}

const EventsCalendar: React.FC = () => {
  const [activeView, setActiveView] = useState<"calendar" | "list" | "upcoming">("calendar");
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 28)); // November 2024
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDateModal, setShowDateModal] = useState(false);

  // Mock events data
  const events: Event[] = [
    {
      id: "1",
      title: "Board of Trustees Meeting",
      description: "Quarterly board meeting to discuss university strategic initiatives",
      date: "2024-12-05",
      startTime: "09:00",
      endTime: "12:00",
      location: "Administration Building, Conference Room A",
      category: "Governance",
      attendees: 15,
      status: "upcoming",
      priority: "high",
      organizer: "Principal's Office",
    },
    {
      id: "2",
      title: "Faculty Development Workshop",
      description: "Professional development session on innovative teaching methodologies",
      date: "2024-12-08",
      startTime: "14:00",
      endTime: "17:00",
      location: "Faculty Center, Main Hall",
      category: "Academic",
      attendees: 45,
      status: "upcoming",
      priority: "medium",
      organizer: "Academic Affairs",
    },
    {
      id: "3",
      title: "Student Orientation Day",
      description: "Welcome and orientation program for new students",
      date: "2024-12-12",
      startTime: "08:00",
      endTime: "16:00",
      location: "University Auditorium",
      category: "Student Affairs",
      attendees: 250,
      status: "upcoming",
      priority: "high",
      organizer: "Student Services",
    },
    {
      id: "4",
      title: "Research Symposium",
      description: "Annual research presentations and poster sessions",
      date: "2024-12-15",
      startTime: "10:00",
      endTime: "18:00",
      location: "Science Building, Multiple Rooms",
      category: "Research",
      attendees: 120,
      status: "upcoming",
      priority: "medium",
      organizer: "Research Office",
    },
    {
      id: "5",
      title: "Holiday Celebration",
      description: "End of semester celebration for faculty and staff",
      date: "2024-12-20",
      startTime: "17:00",
      endTime: "20:00",
      location: "University Center, Grand Ballroom",
      category: "Social",
      attendees: 180,
      status: "upcoming",
      priority: "low",
      organizer: "HR Department",
    },
    {
      id: "6",
      title: "Budget Review Meeting",
      description: "Mid-year budget review and financial planning",
      date: "2024-12-10",
      startTime: "13:00",
      endTime: "15:30",
      location: "Finance Office, Meeting Room",
      category: "Administrative",
      attendees: 12,
      status: "upcoming",
      priority: "high",
      organizer: "Finance Department",
    },
    {
      id: "7",
      title: "Accreditation Preparation",
      description: "Preparation meeting for upcoming accreditation review",
      date: "2024-12-18",
      startTime: "09:30",
      endTime: "12:30",
      location: "Administration Building, Board Room",
      category: "Governance",
      attendees: 20,
      status: "upcoming",
      priority: "high",
      organizer: "Quality Assurance",
    },
    {
      id: "8",
      title: "Alumni Networking Event",
      description: "Networking event connecting alumni with current students",
      date: "2024-12-14",
      startTime: "18:00",
      endTime: "21:00",
      location: "Alumni Center",
      category: "Community",
      attendees: 95,
      status: "upcoming",
      priority: "medium",
      organizer: "Alumni Relations",
    },
  ];

  const categories = ["all", "Governance", "Academic", "Student Affairs", "Research", "Administrative", "Social", "Community"];

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesCategory;
  });

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays: (number | null)[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(2024, 10, 28)); // November 28, 2024
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setShowDateModal(true);
  };

  const closeModal = () => {
    setShowDateModal(false);
    setSelectedDate(null);
  };

  const selectedDateEvents = selectedDate ? events.filter(event => event.date === selectedDate) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-primary-50/10 text-primary-50 border-primary-50/30";
      case "ongoing":
        return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      case "completed":
        return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "cancelled":
        return "bg-primary-200/10 text-primary-200 border-primary-200/30";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-primary-200/10 text-primary-200 border-primary-200/30";
      case "medium":
        return "bg-primary-100/10 text-primary-100 border-primary-100/30";
      case "low":
        return "bg-primary-300/10 text-primary-300 border-primary-300/30";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = ["primary-50", "primary-100", "primary-200", "primary-300"];
    const index = categories.indexOf(category) % colors.length;
    return colors[index];
  };

  const upcomingEvents = events
    .filter(e => e.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const totalEvents = events.length;
  const upcomingCount = events.filter(e => e.status === "upcoming").length;
  const thisWeekCount = events.filter(e => {
    const eventDate = new Date(e.date);
    const today = new Date(2024, 10, 28);
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return eventDate >= today && eventDate <= weekFromNow;
  }).length;
  const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-[fadeIn_0.5s_ease-out_both]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Events & Calendar
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage university events, meetings, and important dates
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 bg-white text-primary-50 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-md border border-gray-200">
              <IoDownloadOutline className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="px-4 py-2.5 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-colors flex items-center gap-2 shadow-md">
              <IoAddOutline className="w-5 h-5" />
              <span className="hidden sm:inline">New Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { Icon: IoCalendarOutline, label: "Total Events", value: totalEvents, color: "primary-50" },
          { Icon: IoTodayOutline, label: "Upcoming", value: upcomingCount, color: "primary-300" },
          { Icon: IoTimeOutline, label: "This Week", value: thisWeekCount, color: "primary-100" },
          { Icon: IoPeopleOutline, label: "Total Attendees", value: totalAttendees, color: "primary-200" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`p-3 rounded-xl bg-${stat.color}/10 text-${stat.color} mb-3 inline-block`}>
              <stat.Icon className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-50 mb-1">{stat.value}</div>
            <div className="text-sm font-semibold text-primary-50/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex flex-wrap gap-1 mb-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
        {[
          { id: "calendar", label: "Calendar", icon: IoCalendarOutline },
          { id: "list", label: "All Events", icon: IoListOutline },
          { id: "upcoming", label: "Upcoming", icon: IoTodayOutline },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeView === view.id
                ? "bg-primary-50 text-white shadow-md"
                : "text-primary-50/60 hover:bg-gray-50 hover:text-primary-50"
            }`}
          >
            <view.icon className="w-5 h-5" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Calendar View */}
      {activeView === "calendar" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary-50">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToToday}
                  className="px-3 py-2 bg-primary-50/10 text-primary-50 rounded-lg text-sm font-semibold hover:bg-primary-50/20 transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={previousMonth}
                  className="p-2 bg-gray-50 text-primary-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <IoChevronBackOutline className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 bg-gray-50 text-primary-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <IoChevronForwardOutline className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-bold text-primary-50/70 py-2">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const isToday = day === 28 && currentDate.getMonth() === 10; // November 28, 2024
                
                return (
                  <div
                    key={index}
                    onClick={() => day && handleDateClick(day)}
                    className={`min-h-[80px] sm:min-h-[100px] p-2 rounded-lg border transition-all ${
                      day
                        ? isToday
                          ? "bg-primary-50/10 border-primary-50 shadow-sm cursor-pointer"
                          : "bg-white border-gray-200 hover:border-primary-50/30 hover:shadow-sm cursor-pointer"
                        : "bg-gray-50/50 border-transparent"
                    }`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-semibold mb-1 ${isToday ? "text-primary-50" : "text-primary-50/70"}`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-[10px] px-2 py-1 rounded bg-${getCategoryColor(event.category)}/10 text-${getCategoryColor(event.category)} font-semibold truncate`}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-[10px] text-primary-50/60 font-semibold px-2">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">Upcoming Events</h2>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl border border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all animate-[slideUp_0.5s_ease-out_both]"
                    style={{ animationDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-primary-50 text-sm flex-1 line-clamp-2">{event.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full border text-xs font-semibold ${getPriorityColor(event.priority)}`}>
                        {event.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-primary-50/60">
                      <div className="flex items-center gap-2">
                        <IoCalendarOutline className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoTimeOutline className="w-3 h-3" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoLocationOutline className="w-3 h-3" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <IoFilterOutline className="w-5 h-5 text-primary-50" />
                <h2 className="text-xl font-bold text-primary-50">Filter by Category</h2>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl font-semibold border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {activeView === "list" && (
        <div className="space-y-6">
          {/* Filter */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <div className="flex items-center gap-4">
              <IoFilterOutline className="w-5 h-5 text-primary-50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-gray-50 text-primary-50 rounded-xl font-semibold border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all animate-[scaleIn_0.4s_ease-out_both]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary-50 mb-2">{event.title}</h3>
                    <p className="text-sm text-primary-50/70 line-clamp-2">{event.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(event.status)}`}>
                    {event.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3 text-sm">
                    <IoCalendarOutline className="w-4 h-4 text-primary-50/60" />
                    <span className="text-primary-50/70">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <IoTimeOutline className="w-4 h-4 text-primary-50/60" />
                    <span className="text-primary-50/70">{event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <IoLocationOutline className="w-4 h-4 text-primary-50/60" />
                    <span className="text-primary-50/70 line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <IoPeopleOutline className="w-4 h-4 text-primary-50/60" />
                    <span className="text-primary-50/70">{event.attendees} attendees</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold bg-${getCategoryColor(event.category)}/10 text-${getCategoryColor(event.category)} border-${getCategoryColor(event.category)}/30`}>
                      {event.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(event.priority)}`}>
                      {event.priority}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-primary-50/10 text-primary-50 rounded-lg text-sm font-semibold hover:bg-primary-50/20 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming View */}
      {activeView === "upcoming" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 animate-[fadeIn_0.5s_ease-out_both]">
            <h2 className="text-xl font-bold text-primary-50 mb-6">Upcoming Events Timeline</h2>
            <div className="space-y-6">
              {events
                .filter(e => e.status === "upcoming")
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((event, index) => (
                  <div
                    key={event.id}
                    className="relative pl-8 pb-6 border-l-2 border-primary-50/20 last:border-transparent animate-[slideUp_0.5s_ease-out_both]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-${getCategoryColor(event.category)} border-4 border-white shadow-md`} />
                    
                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-primary-50 mb-1">{event.title}</h3>
                          <p className="text-sm text-primary-50/70">{event.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(event.priority)}`}>
                          {event.priority}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-primary-50/60">
                          <IoCalendarOutline className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary-50/60">
                          <IoTimeOutline className="w-4 h-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary-50/60">
                          <IoLocationOutline className="w-4 h-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary-50/60">
                          <IoPeopleOutline className="w-4 h-4" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${getCategoryColor(event.category)}/10 text-${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                        <span className="text-xs text-primary-50/60">Organized by {event.organizer}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out_both]" style={{ animationDelay: "200ms" }}>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">Event Statistics</h2>
              <div className="space-y-4">
                {[
                  { label: "Events This Month", value: events.filter(e => e.date.startsWith("2024-12")).length },
                  { label: "High Priority", value: events.filter(e => e.priority === "high").length },
                  { label: "Governance Events", value: events.filter(e => e.category === "Governance").length },
                  { label: "Academic Events", value: events.filter(e => e.category === "Academic").length },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 animate-[slideUp_0.5s_ease-out_both]"
                    style={{ animationDelay: `${index * 100 + 200}ms` }}
                  >
                    <span className="text-sm font-semibold text-primary-50/70">{stat.label}</span>
                    <span className="text-lg font-bold text-primary-50">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-primary-50 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.filter(c => c !== "all").map((category, index) => {
                  const count = events.filter(e => e.category === category).length;
                  return (
                    <div
                      key={category}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all animate-[slideUp_0.5s_ease-out_both]"
                      style={{ animationDelay: `${index * 100 + 400}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-${getCategoryColor(category)}`} />
                        <span className="text-sm font-semibold text-primary-50">{category}</span>
                      </div>
                      <span className="text-sm font-bold text-primary-50/70">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Events Modal */}
      {showDateModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-[fadeIn_0.3s_ease-out_both]"
            onClick={closeModal}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden pointer-events-auto animate-[scaleIn_0.3s_ease-out_both]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-primary-50">
                    Events on {selectedDate}
                  </h2>
                  <p className="text-sm text-primary-50/60 mt-1">
                    {selectedDateEvents.length} {selectedDateEvents.length === 1 ? 'event' : 'events'} scheduled
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <IoCloseOutline className="w-6 h-6 text-primary-50" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-88px)]">
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event, index) => (
                      <div
                        key={event.id}
                        className="p-5 rounded-xl border border-gray-100 hover:border-primary-50/30 hover:shadow-md transition-all animate-[slideUp_0.4s_ease-out_both]"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-primary-50 mb-1">{event.title}</h3>
                            <p className="text-sm text-primary-50/70">{event.description}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(event.status)}`}>
                            {event.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <IoTimeOutline className="w-4 h-4 text-primary-50/60" />
                            <span className="text-primary-50/70">{event.startTime} - {event.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <IoPeopleOutline className="w-4 h-4 text-primary-50/60" />
                            <span className="text-primary-50/70">{event.attendees} attendees</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm col-span-1 sm:col-span-2">
                            <IoLocationOutline className="w-4 h-4 text-primary-50/60" />
                            <span className="text-primary-50/70">{event.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                          <span className={`px-3 py-1 rounded-full border text-xs font-semibold bg-${getCategoryColor(event.category)}/10 text-${getCategoryColor(event.category)} border-${getCategoryColor(event.category)}/30`}>
                            {event.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getPriorityColor(event.priority)}`}>
                            {event.priority.toUpperCase()}
                          </span>
                          <span className="text-xs text-primary-50/60 ml-auto">
                            Organized by {event.organizer}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
                      <IoGridOutline className="w-12 h-12 text-primary-50/30" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-50 mb-2">No Events Scheduled</h3>
                    <p className="text-sm text-primary-50/60">
                      There are no events scheduled for this date.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventsCalendar;
