import React, { useCallback, useMemo, useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoDownloadOutline,
    IoHourglassOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoSearchOutline,
    IoShareSocialOutline,
    IoTimeOutline,
    IoTrophyOutline
} from "react-icons/io5";

interface Event {
  id: string;
  title: string;
  type: "Conference" | "Seminar" | "Workshop" | "Symposium" | "Lecture" | "Ceremony";
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  date: string;
  endDate: string;
  time: string;
  location: string;
  format: "In-Person" | "Virtual" | "Hybrid";
  organizer: string;
  expectedAttendees: number;
  registeredAttendees: number;
  budget: string;
  description: string;
  category: "Academic" | "Research" | "Student" | "Community" | "Professional Development";
}

const EventsConferences: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "upcoming" | "past" | "calendar">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const itemsPerPage = 6;

  const events: Event[] = useMemo(() => [
    {
      id: "1",
      title: "International Research Symposium 2024",
      type: "Symposium",
      status: "Upcoming",
      date: "2024-12-15",
      endDate: "2024-12-17",
      time: "09:00 AM",
      location: "Main Auditorium",
      format: "Hybrid",
      organizer: "Research Office",
      expectedAttendees: 500,
      registeredAttendees: 342,
      budget: "$50,000",
      description: "Annual international symposium bringing together leading researchers from around the world.",
      category: "Research"
    },
    {
      id: "2",
      title: "Digital Innovation in Education Conference",
      type: "Conference",
      status: "Upcoming",
      date: "2024-12-20",
      endDate: "2024-12-21",
      time: "10:00 AM",
      location: "Conference Center",
      format: "In-Person",
      organizer: "Academic Affairs",
      expectedAttendees: 300,
      registeredAttendees: 287,
      budget: "$35,000",
      description: "Exploring the latest trends and technologies in educational innovation.",
      category: "Academic"
    },
    {
      id: "3",
      title: "Student Leadership Workshop Series",
      type: "Workshop",
      status: "Ongoing",
      date: "2024-11-25",
      endDate: "2024-12-10",
      time: "02:00 PM",
      location: "Student Center",
      format: "In-Person",
      organizer: "Student Affairs",
      expectedAttendees: 150,
      registeredAttendees: 145,
      budget: "$8,000",
      description: "Comprehensive leadership development program for student leaders.",
      category: "Student"
    },
    {
      id: "4",
      title: "Community Engagement Summit",
      type: "Conference",
      status: "Upcoming",
      date: "2025-01-10",
      endDate: "2025-01-10",
      time: "09:00 AM",
      location: "Virtual Platform",
      format: "Virtual",
      organizer: "Community Relations",
      expectedAttendees: 400,
      registeredAttendees: 156,
      budget: "$15,000",
      description: "Strengthening partnerships between the university and local community.",
      category: "Community"
    },
    {
      id: "5",
      title: "Annual Graduation Ceremony",
      type: "Ceremony",
      status: "Upcoming",
      date: "2024-12-28",
      endDate: "2024-12-28",
      time: "10:00 AM",
      location: "University Stadium",
      format: "In-Person",
      organizer: "Registrar Office",
      expectedAttendees: 2000,
      registeredAttendees: 1850,
      budget: "$75,000",
      description: "Celebrating the achievements of our graduating class of 2024.",
      category: "Academic"
    },
    {
      id: "6",
      title: "Faculty Development Seminar",
      type: "Seminar",
      status: "Completed",
      date: "2024-11-15",
      endDate: "2024-11-15",
      time: "01:00 PM",
      location: "Faculty Lounge",
      format: "In-Person",
      organizer: "HR Department",
      expectedAttendees: 100,
      registeredAttendees: 98,
      budget: "$5,000",
      description: "Professional development opportunities for faculty members.",
      category: "Professional Development"
    },
    {
      id: "7",
      title: "AI and Machine Learning Lecture Series",
      type: "Lecture",
      status: "Upcoming",
      date: "2025-01-05",
      endDate: "2025-01-05",
      time: "03:00 PM",
      location: "Science Building",
      format: "Hybrid",
      organizer: "Computer Science Dept",
      expectedAttendees: 200,
      registeredAttendees: 178,
      budget: "$12,000",
      description: "Expert lectures on cutting-edge AI and ML technologies.",
      category: "Academic"
    },
    {
      id: "8",
      title: "Alumni Networking Conference",
      type: "Conference",
      status: "Completed",
      date: "2024-10-20",
      endDate: "2024-10-20",
      time: "06:00 PM",
      location: "Grand Hall",
      format: "In-Person",
      organizer: "Alumni Relations",
      expectedAttendees: 350,
      registeredAttendees: 312,
      budget: "$25,000",
      description: "Annual gathering of alumni for networking and collaboration.",
      category: "Community"
    },
  ], []);

  const stats = useMemo(() => [
    { title: "Upcoming Events", value: "12", change: "+3", icon: <IoCalendarOutline /> },
    { title: "Total Attendees", value: "3.2K", change: "+450", icon: <IoPeopleOutline /> },
    { title: "Active Events", value: "5", change: "+1", icon: <IoHourglassOutline /> },
    { title: "Success Rate", value: "96%", change: "+2%", icon: <IoTrophyOutline /> },
  ], []);

  const getStatusColor = useCallback((status: string) => {
    const colors = {
      "Upcoming": "bg-blue-100 text-blue-700",
      "Ongoing": "bg-green-100 text-green-700",
      "Completed": "bg-gray-100 text-gray-700",
      "Cancelled": "bg-red-100 text-red-700"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
  }, []);

  const getFormatColor = useCallback((format: string) => {
    const colors = {
      "In-Person": "bg-purple-100 text-purple-700",
      "Virtual": "bg-blue-100 text-blue-700",
      "Hybrid": "bg-green-100 text-green-700"
    };
    return colors[format as keyof typeof colors] || "bg-gray-100 text-gray-700";
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || event.type === selectedType;
      const matchesFormat = selectedFormat === "all" || event.format === selectedFormat;
      return matchesSearch && matchesType && matchesFormat;
    });
  }, [events, searchQuery, selectedType, selectedFormat]);

  const upcomingEvents = useMemo(() => {
    return filteredEvents.filter(e => e.status === "Upcoming" || e.status === "Ongoing");
  }, [filteredEvents]);

  const pastEvents = useMemo(() => {
    return filteredEvents.filter(e => e.status === "Completed" || e.status === "Cancelled");
  }, [filteredEvents]);

  const paginatedEvents = useMemo(() => {
    const eventsToShow = activeTab === "upcoming" ? upcomingEvents : 
                         activeTab === "past" ? pastEvents : filteredEvents;
    return eventsToShow.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredEvents, upcomingEvents, pastEvents, currentPage, itemsPerPage, activeTab]);

  const totalPages = useMemo(() => {
    const eventsToShow = activeTab === "upcoming" ? upcomingEvents : 
                         activeTab === "past" ? pastEvents : filteredEvents;
    return Math.ceil(eventsToShow.length / itemsPerPage);
  }, [filteredEvents, upcomingEvents, pastEvents, itemsPerPage, activeTab]);

  const handleTabChange = useCallback((tab: "overview" | "upcoming" | "past" | "calendar") => {
    setActiveTab(tab);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleDownloadReport = useCallback((event: Event) => {
    // Simulate report download
    const reportData = `Event Report: ${event.title}\n\nDate: ${new Date(event.date).toLocaleDateString()}\nLocation: ${event.location}\nAttendees: ${event.registeredAttendees}/${event.expectedAttendees}\nBudget: ${event.budget}\nStatus: ${event.status}\n\nDescription: ${event.description}`;
    
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, '_')}_Report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, []);

  const handleShareEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setIsShareModalOpen(true);
  }, []);

  const handleCopyLink = useCallback(() => {
    const link = `${window.location.origin}/events/${selectedEvent?.id}`;
    navigator.clipboard.writeText(link);
    alert('Event link copied to clipboard!');
  }, [selectedEvent]);

  const handleCreateEvent = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleOpenCalendar = useCallback(() => {
    setIsCalendarModalOpen(true);
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-comfortaa">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-50 mb-2">Events & Conferences</h1>
            <p className="text-primary-50/70">Manage and oversee university events and conferences</p>
          </div>
          <button 
            onClick={handleCreateEvent}
            className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-100/90 transition-colors"
          >
            <IoAddOutline className="w-5 h-5" />
            <span className="text-sm font-medium">Create Event</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-primary-50/20">
            <div className="flex items-center justify-between mb-2">
              <div className="text-2xl text-primary-100">{stat.icon}</div>
              <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-primary-300' : 'text-primary-200'}`}>
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
            { id: "overview", label: "Overview" },
            { id: "upcoming", label: "Upcoming" },
            { id: "past", label: "Past Events" },
            { id: "calendar", label: "Calendar" },
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
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Event Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-primary-50">Events by Type</h3>
                  <div className="space-y-3">
                    {[
                      { type: "Conference", count: 8, color: "bg-purple-500" },
                      { type: "Seminar", count: 6, color: "bg-blue-500" },
                      { type: "Workshop", count: 5, color: "bg-green-500" },
                      { type: "Symposium", count: 4, color: "bg-pink-500" },
                      { type: "Lecture", count: 3, color: "bg-yellow-500" },
                      { type: "Ceremony", count: 2, color: "bg-orange-500" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded ${item.color}`}></div>
                        <span className="text-sm text-gray-600 flex-1">{item.type}</span>
                        <span className="text-sm font-medium text-primary-50">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-primary-50">Event Format Distribution</h3>
                  <div className="space-y-4">
                    {[
                      { label: "In-Person", value: 55, color: "bg-primary-300" },
                      { label: "Virtual", value: 25, color: "bg-primary-100" },
                      { label: "Hybrid", value: 20, color: "bg-primary-200" },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-primary-50/70">{item.label}</span>
                          <span className="font-medium text-primary-50">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-full rounded-full ${item.color}`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Highlights */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Upcoming Event Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events.filter(e => e.status === "Upcoming").slice(0, 4).map((event) => (
                    <div key={event.id} className="bg-white rounded-lg p-4 border border-primary-50/20">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-primary-50 flex-1 line-clamp-2">{event.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${getFormatColor(event.format)}`}>
                          {event.format}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-primary-50/70">
                        <div className="flex items-center gap-2">
                          <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoLocationOutline className="w-4 h-4 text-primary-100" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IoPeopleOutline className="w-4 h-4 text-primary-100" />
                          <span>{event.registeredAttendees}/{event.expectedAttendees} registered</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-primary-50/20">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-primary-50/60">Registration Progress</span>
                          <span className="font-medium">{Math.round((event.registeredAttendees / event.expectedAttendees) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="h-full rounded-full bg-primary-100"
                            style={{ width: `${(event.registeredAttendees / event.expectedAttendees) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Completed Events */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-primary-50">Recently Completed Events</h3>
                <div className="space-y-3">
                  {events.filter(e => e.status === "Completed").slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-primary-50/20">
                      <div className="p-2 rounded bg-green-100 text-green-600">
                        <IoCheckmarkCircleOutline className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-primary-50 mb-1">{event.title}</div>
                        <div className="flex flex-wrap gap-3 text-xs text-primary-50/60">
                          <span className="flex items-center gap-1">
                            <IoCalendarOutline className="w-3 h-3" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <IoPeopleOutline className="w-3 h-3" />
                            {event.registeredAttendees} attendees
                          </span>
                          <span className="flex items-center gap-1">
                            <IoLocationOutline className="w-3 h-3" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <button className="text-xs text-primary-100 hover:underline">View Report</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeTab === "upcoming" || activeTab === "past") && (
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="Conference">Conference</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Symposium">Symposium</option>
                    <option value="Lecture">Lecture</option>
                    <option value="Ceremony">Ceremony</option>
                  </select>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 text-sm"
                  >
                    <option value="all">All Formats</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedEvents.map((event) => (
                  <div key={event.id} className="bg-white border border-primary-50/20 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="mb-3">
                      <h4 className="font-medium text-primary-50 mb-2 line-clamp-2">{event.title}</h4>
                      <div className="flex gap-2 flex-wrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getFormatColor(event.format)}`}>
                          {event.format}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 text-xs text-primary-50/70">
                      <div className="flex items-center gap-2">
                        <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoTimeOutline className="w-4 h-4 text-primary-100" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoLocationOutline className="w-4 h-4 text-primary-100" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoPeopleOutline className="w-4 h-4 text-primary-100" />
                        <span>{event.registeredAttendees}/{event.expectedAttendees} attendees</span>
                      </div>
                    </div>

                    {event.status !== "Completed" && event.status !== "Cancelled" && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-primary-50/60">Registration</span>
                          <span className="font-medium">{Math.round((event.registeredAttendees / event.expectedAttendees) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-full rounded-full ${
                              (event.registeredAttendees / event.expectedAttendees) >= 0.9 ? 'bg-primary-300' :
                              (event.registeredAttendees / event.expectedAttendees) >= 0.7 ? 'bg-primary-100' :
                              'bg-primary-200'
                            }`}
                            style={{ width: `${(event.registeredAttendees / event.expectedAttendees) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsModalOpen(true);
                      }}
                      className="w-full py-2 text-sm font-medium text-primary-100 hover:bg-primary-100/10 rounded transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-primary-50/40 hover:text-primary-50 disabled:opacity-50"
                  >
                    <IoChevronBackOutline className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-primary-50/70">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-primary-50/40 hover:text-primary-50 disabled:opacity-50"
                  >
                    <IoChevronForwardOutline className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <IoCalendarOutline className="w-16 h-16 mx-auto text-primary-100 mb-4" />
                <h3 className="text-lg font-semibold text-primary-50 mb-2">Calendar View</h3>
                <p className="text-sm text-primary-50/70 mb-4">
                  Interactive calendar view for event scheduling and management
                </p>
                <button 
                  onClick={handleOpenCalendar}
                  className="px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-100/90 transition-colors text-sm"
                >
                  Open Calendar
                </button>
              </div>

              {/* Monthly Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-primary-50/20">
                  <h4 className="font-semibold text-primary-50 mb-3">December 2024</h4>
                  <div className="space-y-2">
                    {events.filter(e => new Date(e.date).getMonth() === 11).slice(0, 3).map((event) => (
                      <div key={event.id} className="text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-primary-100"></div>
                          <span className="font-medium text-primary-50">{new Date(event.date).getDate()}</span>
                          <span className="text-primary-50/70 truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-primary-50/20">
                  <h4 className="font-semibold text-primary-50 mb-3">January 2025</h4>
                  <div className="space-y-2">
                    {events.filter(e => new Date(e.date).getMonth() === 0).slice(0, 3).map((event) => (
                      <div key={event.id} className="text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-primary-100"></div>
                          <span className="font-medium text-primary-50">{new Date(event.date).getDate()}</span>
                          <span className="text-primary-50/70 truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-primary-50/20">
                  <h4 className="font-semibold text-primary-50 mb-3">Quick Stats</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-primary-50/70">Events This Month</span>
                      <span className="font-medium text-primary-50">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-50/70">Events Next Month</span>
                      <span className="font-medium text-primary-50">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-50/70">Total Attendees</span>
                      <span className="font-medium text-primary-50">2,450</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Details Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">{selectedEvent.title}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded">
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getFormatColor(selectedEvent.format)}`}>
                  {selectedEvent.format}
                </span>
                <span className="px-3 py-1 rounded text-sm font-medium bg-blue-100 text-blue-700">
                  {selectedEvent.type}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-primary-50 mb-2">Description</h3>
                <p className="text-sm text-primary-50/70">{selectedEvent.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-primary-50/60 block mb-1">Date</span>
                  <p className="font-medium flex items-center gap-2">
                    <IoCalendarOutline className="w-4 h-4 text-primary-100" />
                    {new Date(selectedEvent.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-primary-50/60 block mb-1">Time</span>
                  <p className="font-medium flex items-center gap-2">
                    <IoTimeOutline className="w-4 h-4 text-primary-100" />
                    {selectedEvent.time}
                  </p>
                </div>
                <div>
                  <span className="text-primary-50/60 block mb-1">Location</span>
                  <p className="font-medium flex items-center gap-2">
                    <IoLocationOutline className="w-4 h-4 text-primary-100" />
                    {selectedEvent.location}
                  </p>
                </div>
                <div>
                  <span className="text-primary-50/60 block mb-1">Organizer</span>
                  <p className="font-medium">{selectedEvent.organizer}</p>
                </div>
                <div>
                  <span className="text-primary-50/60 block mb-1">Budget</span>
                  <p className="font-medium">{selectedEvent.budget}</p>
                </div>
                <div>
                  <span className="text-primary-50/60 block mb-1">Category</span>
                  <p className="font-medium">{selectedEvent.category}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-primary-50/60">Registration Progress</span>
                  <span className="font-medium">{selectedEvent.registeredAttendees} / {selectedEvent.expectedAttendees} ({Math.round((selectedEvent.registeredAttendees / selectedEvent.expectedAttendees) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-full rounded-full ${
                      (selectedEvent.registeredAttendees / selectedEvent.expectedAttendees) >= 0.9 ? 'bg-primary-300' :
                      (selectedEvent.registeredAttendees / selectedEvent.expectedAttendees) >= 0.7 ? 'bg-primary-100' :
                      'bg-primary-200'
                    }`}
                    style={{ width: `${(selectedEvent.registeredAttendees / selectedEvent.expectedAttendees) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-primary-50/20">
                <button 
                  onClick={() => handleDownloadReport(selectedEvent)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-100/80 transition-colors"
                >
                  <IoDownloadOutline className="w-4 h-4" />
                  Download Report
                </button>
                <button 
                  onClick={() => handleShareEvent(selectedEvent)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200 transition-colors"
                >
                  <IoShareSocialOutline className="w-4 h-4" />
                  Share Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Create New Event</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded">
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Event Title</label>
                  <input
                    type="text"
                    placeholder="Enter event title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Event Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100">
                      <option>Conference</option>
                      <option>Seminar</option>
                      <option>Workshop</option>
                      <option>Symposium</option>
                      <option>Lecture</option>
                      <option>Ceremony</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Format</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100">
                      <option>In-Person</option>
                      <option>Virtual</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
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
                    <label className="block text-sm font-medium text-primary-50 mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-1">Expected Attendees</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Organizer</label>
                  <input
                    type="text"
                    placeholder="Enter organizer name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Budget</label>
                  <input
                    type="text"
                    placeholder="$0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-1">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Enter event description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-100/80 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Event created successfully!');
                      setIsCreateModalOpen(false);
                    }}
                  >
                    Create Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-primary-50 rounded hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Share Event Modal */}
      {isShareModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-md w-full">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Share Event</h2>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded">
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-medium text-primary-50 mb-2">{selectedEvent.title}</h3>
                <p className="text-sm text-primary-50/70">{new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.location}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">Event Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={`${window.location.origin}/events/${selectedEvent.id}`}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-100/80 transition-colors text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">Share via</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
                    Email
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
                    Twitter
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm">
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

      {/* Calendar Modal */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-primary-50/20 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-50 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Event Calendar</h2>
              <button
                onClick={() => setIsCalendarModalOpen(false)}
                className="p-1 hover:bg-primary-50/80 rounded">
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-8 text-center mb-6">
                <IoCalendarOutline className="w-20 h-20 mx-auto text-primary-100 mb-4" />
                <h3 className="text-xl font-semibold text-primary-50 mb-2">Interactive Calendar</h3>
                <p className="text-sm text-primary-50/70 mb-4">
                  Full calendar integration coming soon. This will include drag-and-drop event scheduling, 
                  month/week/day views, and real-time updates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-primary-50/20">
                  <h4 className="font-semibold text-primary-50 mb-3">Upcoming Events</h4>
                  <div className="space-y-2">
                    {events.filter(e => e.status === "Upcoming").slice(0, 5).map((event) => (
                      <div key={event.id} className="text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary-100"></div>
                          <span className="font-medium text-primary-50">{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-primary-50/70 ml-4">{event.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-primary-50/20">
                  <h4 className="font-semibold text-primary-50 mb-3">Calendar Stats</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-50/70">Events This Month</span>
                      <span className="font-medium text-primary-50">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-50/70">Events Next Month</span>
                      <span className="font-medium text-primary-50">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-50/70">Total Attendees</span>
                      <span className="font-medium text-primary-50">2,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-50/70">Avg. Attendance Rate</span>
                      <span className="font-medium text-primary-50">92%</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsCalendarModalOpen(false)}
                className="w-full px-4 py-2 bg-primary-100 text-white rounded hover:bg-primary-100/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsConferences;
