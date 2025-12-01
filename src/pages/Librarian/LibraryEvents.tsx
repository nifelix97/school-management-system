import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoCreateOutline,
    IoEyeOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashOutline,
} from "react-icons/io5";
import Input from "../../components/ui/Input";

interface LibraryEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  category: "workshop" | "reading" | "seminar" | "exhibition" | "other";
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  organizer: string;
}

const LibraryEvents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<LibraryEvent | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    maxAttendees: "",
    category: "workshop" as const,
  });

  // Mock data
  const [events] = useState<LibraryEvent[]>([
    {
      id: "EVT001",
      title: "Introduction to Digital Libraries",
      description: "Learn about modern digital library systems and resources",
      date: "2024-12-15",
      startTime: "10:00",
      endTime: "12:00",
      location: "Main Hall",
      maxAttendees: 50,
      currentAttendees: 35,
      category: "workshop",
      status: "upcoming",
      organizer: "Dr. Sarah Johnson",
    },
    {
      id: "EVT002",
      title: "Book Club: Classic Literature",
      description: "Monthly book club discussion on classic literature",
      date: "2024-12-10",
      startTime: "14:00",
      endTime: "16:00",
      location: "Reading Room",
      maxAttendees: 20,
      currentAttendees: 18,
      category: "reading",
      status: "upcoming",
      organizer: "Emily Davis",
    },
    {
      id: "EVT003",
      title: "Research Methods Seminar",
      description: "Advanced research methodologies for graduate students",
      date: "2024-11-28",
      startTime: "09:00",
      endTime: "11:00",
      location: "Conference Room",
      maxAttendees: 30,
      currentAttendees: 30,
      category: "seminar",
      status: "completed",
      organizer: "Prof. Michael Brown",
    },
    {
      id: "EVT004",
      title: "Rare Books Exhibition",
      description: "Display of rare and historical books from our collection",
      date: "2024-12-01",
      startTime: "10:00",
      endTime: "18:00",
      location: "Exhibition Hall",
      maxAttendees: 100,
      currentAttendees: 45,
      category: "exhibition",
      status: "ongoing",
      organizer: "Library Staff",
    },
    {
      id: "EVT005",
      title: "Academic Writing Workshop",
      description: "Tips and techniques for effective academic writing",
      date: "2024-12-20",
      startTime: "13:00",
      endTime: "15:00",
      location: "Study Hall",
      maxAttendees: 40,
      currentAttendees: 12,
      category: "workshop",
      status: "upcoming",
      organizer: "Dr. Jennifer Lee",
    },
  ]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "workshop", label: "Workshop" },
    { value: "reading", label: "Reading" },
    { value: "seminar", label: "Seminar" },
    { value: "exhibition", label: "Exhibition" },
    { value: "other", label: "Other" },
  ];

  const statuses = [
    { value: "all", label: "All Status" },
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workshop":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "reading":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "seminar":
        return "bg-green-50 text-green-600 border-green-200";
      case "exhibition":
        return "bg-amber-50 text-amber-600 border-amber-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "ongoing":
        return "bg-green-50 text-green-600 border-green-200";
      case "completed":
        return "bg-gray-50 text-gray-600 border-gray-200";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <IoTimeOutline className="w-4 h-4" />;
      case "ongoing":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "completed":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "cancelled":
        return <IoAlertCircleOutline className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleAddEvent = () => {
    // Implementation for adding event
    alert("Event added successfully!");
    setShowAddModal(false);
    setFormData({
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      maxAttendees: "",
      category: "workshop",
    });
  };

  const handleViewDetails = (event: LibraryEvent) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
              Library Events
            </h1>
            <p className="text-sm sm:text-base text-primary-50/70">
              Manage and organize library events and activities
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <IoAddOutline className="w-5 h-5" />
            Add New Event
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Events</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary-50">{events.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-50/80 rounded-xl">
              <IoCalendarOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Upcoming</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {events.filter((e) => e.status === "upcoming").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <IoTimeOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Ongoing</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {events.filter((e) => e.status === "ongoing").length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
              <IoCheckmarkCircleOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-primary-50/60 font-medium mb-1">Total Attendees</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                {events.reduce((sum, e) => sum + e.currentAttendees, 0)}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
              <IoPeopleOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100 mb-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Input
              type="text"
              placeholder="Search events by title, description, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<IoSearchOutline className="w-5 h-5" />}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {paginatedEvents.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100 mb-6">
          <IoCalendarOutline className="w-12 h-12 text-primary-50/30 mx-auto mb-3" />
          <p className="text-primary-50/60">No events found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {paginatedEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow animate-[fadeIn_0.3s_ease-out]">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-primary-50 text-lg flex-1 pr-2">{event.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(event.status)}`}>
                      {getStatusIcon(event.status)}
                      {event.status}
                    </span>
                  </div>

                  <p className="text-sm text-primary-50/70 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-primary-50/70">
                      <IoCalendarOutline className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary-50/70">
                      <IoTimeOutline className="w-4 h-4" />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary-50/70">
                      <IoLocationOutline className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary-50/70">
                      <IoPeopleOutline className="w-4 h-4" />
                      <span>{event.currentAttendees}/{event.maxAttendees} attendees</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(event)}
                        className="p-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors"
                        title="View Details"
                      >
                        <IoEyeOutline className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 bg-gray-100 text-primary-50 rounded-lg hover:bg-gray-200 transition-colors"
                        title="Edit"
                      >
                        <IoCreateOutline className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 px-4 py-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-sm text-primary-50/70">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredEvents.length)} of {filteredEvents.length} events
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <IoChevronBackOutline className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                          currentPage === page
                            ? "bg-primary-50 text-white"
                            : "hover:bg-gray-100 text-primary-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-gray-100 text-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <IoChevronForwardOutline className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-50">Add New Event</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input
                    label="Event Title"
                    type="text"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Input
                    label="Description"
                    textarea
                    rows={3}
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <Input
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  leftIcon={<IoCalendarOutline className="w-5 h-5" />}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-50 focus:ring-2 focus:ring-primary-50/20 outline-none transition-all bg-gray-50"
                  >
                    <option value="workshop">Workshop</option>
                    <option value="reading">Reading</option>
                    <option value="seminar">Seminar</option>
                    <option value="exhibition">Exhibition</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <Input
                  label="Start Time"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  leftIcon={<IoTimeOutline className="w-5 h-5" />}
                  required
                />

                <Input
                  label="End Time"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  leftIcon={<IoTimeOutline className="w-5 h-5" />}
                  required
                />

                <Input
                  label="Location"
                  type="text"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  leftIcon={<IoLocationOutline className="w-5 h-5" />}
                  required
                />

                <Input
                  label="Max Attendees"
                  type="number"
                  placeholder="Enter max attendees"
                  value={formData.maxAttendees}
                  onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                  leftIcon={<IoPeopleOutline className="w-5 h-5" />}
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-primary-50 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-primary-50 to-primary-100 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-50">Event Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-primary-50" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-primary-50">{selectedEvent.title}</h3>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border flex items-center gap-1 ${getStatusColor(selectedEvent.status)}`}>
                    {getStatusIcon(selectedEvent.status)}
                    {selectedEvent.status}
                  </span>
                </div>
                <p className="text-primary-50/70 mb-4">{selectedEvent.description}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getCategoryColor(selectedEvent.category)}`}>
                  {selectedEvent.category}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 mb-6">
                <div>
                  <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Date</label>
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline className="w-5 h-5 text-primary-50" />
                    <p className="text-base text-primary-50">{selectedEvent.date}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Time</label>
                  <div className="flex items-center gap-2">
                    <IoTimeOutline className="w-5 h-5 text-primary-50" />
                    <p className="text-base text-primary-50">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Location</label>
                  <div className="flex items-center gap-2">
                    <IoLocationOutline className="w-5 h-5 text-primary-50" />
                    <p className="text-base text-primary-50">{selectedEvent.location}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Attendees</label>
                  <div className="flex items-center gap-2">
                    <IoPeopleOutline className="w-5 h-5 text-primary-50" />
                    <p className="text-base text-primary-50">
                      {selectedEvent.currentAttendees}/{selectedEvent.maxAttendees}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-primary-50/60 mb-1 block">Organizer</label>
                  <p className="text-base font-semibold text-primary-50">{selectedEvent.organizer}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-600">
                  <strong>Attendance:</strong> {((selectedEvent.currentAttendees / selectedEvent.maxAttendees) * 100).toFixed(0)}% capacity
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryEvents;
