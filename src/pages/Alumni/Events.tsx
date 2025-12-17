
import React, { useState } from "react";
import {
    IoAddOutline,
    IoBriefcaseOutline,
    IoCalendarOutline,
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoCloseCircleOutline,
    IoFilterOutline,
    IoHeartOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoTimeOutline,
    IoTrophyOutline,
} from "react-icons/io5";

// Types
interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: "Reunion" | "Networking" | "Workshop" | "Social" | "Career" | "Awards";
    attendees: number;
    maxAttendees?: number;
    isRegistered: boolean;
    isPast: boolean;
    imageUrl?: string;
    organizer: string;
}

const AlumniEvents: React.FC = () => {
    const [filterType, setFilterType] = useState<string>("All");
    const [filterStatus, setFilterStatus] = useState<string>("Upcoming");
    const [showFilters, setShowFilters] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [registrationForm, setRegistrationForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        dietaryRestrictions: "",
        specialRequirements: "",
        attendeeCount: "1"
    });

    // State for events with registration functionality
    const [events, setEvents] = useState<Event[]>([
        {
            id: "1",
            title: "Annual Alumni Reunion 2025",
            description: "Join us for our biggest reunion event of the year! Reconnect with classmates, share memories, and celebrate our shared journey.",
            date: "2025-01-15",
            time: "6:00 PM - 10:00 PM",
            location: "Main Campus Auditorium",
            type: "Reunion",
            attendees: 245,
            maxAttendees: 500,
            isRegistered: true,
            isPast: false,
            imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            organizer: "Alumni Association"
        },
        {
            id: "2",
            title: "Career Networking Mixer",
            description: "Expand your professional network! Meet alumni from various industries and explore career opportunities.",
            date: "2025-01-22",
            time: "7:00 PM - 9:00 PM",
            location: "Downtown Conference Center",
            type: "Networking",
            attendees: 89,
            maxAttendees: 150,
            isRegistered: false,
            isPast: false,
            imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            organizer: "Career Services"
        },
        {
            id: "3",
            title: "Alumni Awards Ceremony",
            description: "Celebrate the outstanding achievements of our distinguished alumni. An evening of recognition and inspiration.",
            date: "2025-02-05",
            time: "5:30 PM - 8:30 PM",
            location: "Grand Hall",
            type: "Awards",
            attendees: 312,
            maxAttendees: 400,
            isRegistered: true,
            isPast: false,
            imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            organizer: "Alumni Association"
        },
        {
            id: "4",
            title: "Leadership Workshop Series",
            description: "Enhance your leadership skills with our expert-led workshop series. Interactive sessions with real-world applications.",
            date: "2025-02-12",
            time: "2:00 PM - 5:00 PM",
            location: "Business School, Room 301",
            type: "Workshop",
            attendees: 45,
            maxAttendees: 60,
            isRegistered: false,
            isPast: false,
            imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            organizer: "Professional Development"
        },
        {
            id: "5",
            title: "Alumni Golf Tournament",
            description: "Tee off with fellow alumni! Enjoy a day of golf, networking, and friendly competition.",
            date: "2025-03-01",
            time: "8:00 AM - 2:00 PM",
            location: "Riverside Golf Club",
            type: "Social",
            attendees: 64,
            maxAttendees: 80,
            isRegistered: false,
            isPast: false,
            imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            organizer: "Social Committee"
        },
        {
            id: "6",
            title: "Tech Industry Panel Discussion",
            description: "Hear from alumni leaders in the tech industry. Q&A session and networking to follow.",
            date: "2025-03-15",
            time: "6:30 PM - 8:30 PM",
            location: "Innovation Hub",
            type: "Career",
            attendees: 128,
            maxAttendees: 200,
            isRegistered: true,
            isPast: false,
            imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            organizer: "Tech Alumni Network"
        },
        {
            id: "7",
            title: "Homecoming Weekend 2024",
            description: "A weekend filled with festivities, sports, and celebration. Relive your college days!",
            date: "2024-11-15",
            time: "All Day",
            location: "Campus Wide",
            type: "Reunion",
            attendees: 1250,
            isRegistered: true,
            isPast: true,
            imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            organizer: "Alumni Association"
        },
        {
            id: "8",
            title: "Charity Gala 2024",
            description: "An elegant evening supporting student scholarships. Thank you to all who attended!",
            date: "2024-12-01",
            time: "7:00 PM - 11:00 PM",
            location: "Hilton Grand Ballroom",
            type: "Social",
            attendees: 380,
            maxAttendees: 400,
            isRegistered: true,
            isPast: true,
            imageUrl: "https://images.unsplash.com/photo-1519167758481-83f29da8c2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            organizer: "Fundraising Committee"
        }
    ]);

    // Statistics
    const upcomingEvents = events.filter(e => !e.isPast);
    const registeredEvents = events.filter(e => e.isRegistered && !e.isPast);
    const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0);

    const stats = [
        {
            title: "Upcoming Events",
            value: upcomingEvents.length.toString(),
            icon: <IoCalendarOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-blue-500 via-blue-600 to-blue-700",
        },
        {
            title: "Registered",
            value: registeredEvents.length.toString(),
            icon: <IoCheckmarkCircleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-emerald-500 via-emerald-600 to-emerald-700",
        },
        {
            title: "Total Attendees",
            value: totalAttendees.toString(),
            icon: <IoPeopleOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-purple-500 via-purple-600 to-purple-700",
        },
        {
            title: "Event Types",
            value: "6",
            icon: <IoTrophyOutline className="w-6 h-6 sm:w-7 sm:h-7" />,
            gradient: "from-amber-500 via-amber-600 to-amber-700",
        },
    ];

    // Filter events
    const filteredEvents = events.filter(event => {
        const matchesType = filterType === "All" || event.type === filterType;
        const matchesStatus = 
            filterStatus === "All" ||
            (filterStatus === "Upcoming" && !event.isPast) ||
            (filterStatus === "Past" && event.isPast);
        return matchesType && matchesStatus;
    });

    // Registration handlers
    const handleRegister = (eventId: string) => {
        setSelectedEventId(eventId);
        setShowRegistrationModal(true);
    };

    const submitRegistration = () => {
        // Validate form
        if (!registrationForm.fullName || !registrationForm.email || !registrationForm.phone) {
            alert("Please fill in all required fields (Name, Email, Phone).");
            return;
        }

        // Email validation
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(registrationForm.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (selectedEventId) {
            setEvents(events.map(event => {
                if (event.id === selectedEventId) {
                    return {
                        ...event,
                        isRegistered: true,
                        attendees: event.attendees + parseInt(registrationForm.attendeeCount)
                    };
                }
                return event;
            }));
            
            const event = events.find(e => e.id === selectedEventId);
            alert(`✅ Successfully registered for "${event?.title}"!\n\nConfirmation email will be sent to ${registrationForm.email}`);
            
            // Reset form and close modal
            setRegistrationForm({
                fullName: "",
                email: "",
                phone: "",
                dietaryRestrictions: "",
                specialRequirements: "",
                attendeeCount: "1"
            });
            setShowRegistrationModal(false);
            setSelectedEventId(null);
        }
    };

    const handleCancelRegistration = (eventId: string) => {
        const event = events.find(e => e.id === eventId);
        const confirmed = window.confirm(`Are you sure you want to cancel your registration for "${event?.title}"?`);
        
        if (confirmed) {
            setEvents(events.map(e => {
                if (e.id === eventId) {
                    return {
                        ...e,
                        isRegistered: false,
                        attendees: Math.max(0, e.attendees - 1)
                    };
                }
                return e;
            }));
            alert(`Registration cancelled for "${event?.title}".`);
        }
    };

    // Helper functions
    const getTypeColor = (type: string) => {
        switch (type) {
            case "Reunion": return "bg-blue-50 text-blue-700 border-blue-200";
            case "Networking": return "bg-purple-50 text-purple-700 border-purple-200";
            case "Workshop": return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Social": return "bg-amber-50 text-amber-700 border-amber-200";
            case "Career": return "bg-red-50 text-red-700 border-red-200";
            case "Awards": return "bg-pink-50 text-pink-700 border-pink-200";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Reunion": return <IoPeopleOutline className="w-4 h-4" />;
            case "Networking": return <IoBriefcaseOutline className="w-4 h-4" />;
            case "Workshop": return <IoSchoolOutline className="w-4 h-4" />;
            case "Social": return <IoHeartOutline className="w-4 h-4" />;
            case "Career": return <IoBriefcaseOutline className="w-4 h-4" />;
            case "Awards": return <IoTrophyOutline className="w-4 h-4" />;
            default: return <IoCalendarOutline className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 xs:p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-50 mb-2">
                        Alumni Events
                    </h1>
                    <p className="text-sm sm:text-base text-primary-50/70">
                        Discover and register for upcoming alumni events.
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-all shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
                >
                    <IoAddOutline className="w-5 h-5" />
                    Create Event
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md w-fit group-hover:scale-110 transition-transform duration-300`}>
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">All Events</h2>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                    >
                        <IoFilterOutline className="w-4 h-4" />
                        <span className="hidden xs:inline">Filters</span>
                        <IoChevronDownOutline className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Event Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Types</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Networking">Networking</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Social">Social</option>
                                <option value="Career">Career</option>
                                <option value="Awards">Awards</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 text-sm sm:text-base"
                            >
                                <option value="All">All Events</option>
                                <option value="Upcoming">Upcoming</option>
                                <option value="Past">Past Events</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                    <IoCalendarOutline className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No events found</h3>
                    <p className="text-sm sm:text-base text-gray-500">Try adjusting your filter criteria.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary-100 transition-all duration-300 group"
                            >
                                {/* Event Image */}
                                {event.imageUrl && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        {event.isPast && (
                                            <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                Past Event
                                            </div>
                                        )}
                                        {event.isRegistered && !event.isPast && (
                                            <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                <IoCheckmarkCircleOutline className="w-4 h-4" />
                                                Registered
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-4 sm:p-5">
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${getTypeColor(event.type)}`}>
                                            {getTypeIcon(event.type)}
                                            {event.type}
                                        </span>
                                    </div>

                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-100 transition-colors line-clamp-2">
                                        {event.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {event.description}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                            <IoCalendarOutline className="w-4 h-4 text-primary-50" />
                                            <span>{formatDate(event.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                            <IoTimeOutline className="w-4 h-4 text-primary-50" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                            <IoLocationOutline className="w-4 h-4 text-primary-50" />
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                            <IoPeopleOutline className="w-4 h-4 text-primary-50" />
                                            <span>
                                                {event.attendees} attending
                                                {event.maxAttendees && ` / ${event.maxAttendees} max`}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-gray-100">
                                        {event.isPast ? (
                                            <button className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium cursor-not-allowed">
                                                Event Ended
                                            </button>
                                        ) : event.isRegistered ? (
                                            <button 
                                                onClick={() => handleCancelRegistration(event.id)}
                                                className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                            >
                                                <IoCloseCircleOutline className="w-4 h-4" />
                                                Cancel Registration
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleRegister(event.id)}
                                                className="w-full px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                                            >
                                                Register Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{filteredEvents.length}</span> of <span className="font-semibold text-gray-900">{events.length}</span> events
                        </p>
                    </div>
                </>
            )}

            {/* Registration Modal */}
            {showRegistrationModal && selectedEventId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => {
                    setShowRegistrationModal(false);
                    setSelectedEventId(null);
                }}>
                    <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Registration</h2>
                        <p className="text-gray-600 mb-6">
                            {events.find(e => e.id === selectedEventId)?.title}
                        </p>

                        <div className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={registrationForm.fullName}
                                    onChange={(e) => setRegistrationForm({ ...registrationForm, fullName: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={registrationForm.email}
                                    onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={registrationForm.phone}
                                    onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                                    placeholder="+250 788 123 456"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Number of Attendees */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Attendees
                                </label>
                                <select
                                    value={registrationForm.attendeeCount}
                                    onChange={(e) => setRegistrationForm({ ...registrationForm, attendeeCount: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                >
                                    <option value="1">1 Person</option>
                                    <option value="2">2 People</option>
                                    <option value="3">3 People</option>
                                    <option value="4">4 People</option>
                                    <option value="5">5+ People</option>
                                </select>
                            </div>

                            {/* Dietary Restrictions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Dietary Restrictions (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={registrationForm.dietaryRestrictions}
                                    onChange={(e) => setRegistrationForm({ ...registrationForm, dietaryRestrictions: e.target.value })}
                                    placeholder="e.g., Vegetarian, Vegan, Gluten-free"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent"
                                />
                            </div>

                            {/* Special Requirements */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Special Requirements (Optional)
                                </label>
                                <textarea
                                    value={registrationForm.specialRequirements}
                                    onChange={(e) => setRegistrationForm({ ...registrationForm, specialRequirements: e.target.value })}
                                    placeholder="Any accessibility needs or special requests..."
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Note:</strong> You will receive a confirmation email with event details and a calendar invite after registration.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setShowRegistrationModal(false);
                                    setSelectedEventId(null);
                                    setRegistrationForm({
                                        fullName: "",
                                        email: "",
                                        phone: "",
                                        dietaryRestrictions: "",
                                        specialRequirements: "",
                                        attendeeCount: "1"
                                    });
                                }}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitRegistration}
                                className="flex-1 px-6 py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-colors font-medium shadow-md hover:shadow-lg"
                            >
                                Complete Registration
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Event Modal (Placeholder) */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
                    <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Event</h2>
                        <p className="text-gray-600 mb-6">Event creation form would go here.</p>
                        <button
                            onClick={() => setShowCreateModal(false)}
                            className="w-full px-6 py-3 bg-primary-50 text-white rounded-xl hover:bg-primary-100 transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlumniEvents;
