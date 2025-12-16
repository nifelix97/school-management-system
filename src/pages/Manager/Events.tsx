import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoFilterOutline,
    IoLocationOutline,
    IoMusicalNotesOutline,
    IoPeopleOutline,
    IoSaveOutline,
    IoSchoolOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrophyOutline
} from "react-icons/io5";

type EventType = "Academic" | "Sports" | "Cultural" | "Administrative";

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    type: EventType;
    attendees: number;
    description: string;
}

const Events: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // New Event Form State
    const [newEvent, setNewEvent] = useState<Partial<Event>>({
        title: "",
        date: "",
        time: "",
        location: "",
        type: "Academic",
        attendees: 0,
        description: ""
    });

    // Mock Data State
    const [events, setEvents] = useState<Event[]>([
        {
            id: "1",
            title: "Annual Science Fair",
            date: "2024-04-15",
            time: "09:00 AM - 04:00 PM",
            location: "Main Auditorium",
            type: "Academic",
            attendees: 450,
            description: "Showcasing student innovation and science projects from all grades."
        },
        {
            id: "2",
            title: "Inter-School Football Championship",
            date: "2024-04-20",
            time: "10:00 AM - 06:00 PM",
            location: "Sports Complex",
            type: "Sports",
            attendees: 1200,
            description: "Finals of the regional football tournament hosting 5 schools."
        },
        {
            id: "3",
            title: "Spring Cultural Fest",
            date: "2024-05-01",
            time: "05:00 PM - 09:00 PM",
            location: "Open Air Theatre",
            type: "Cultural",
            attendees: 800,
            description: "A vibrant evening of music, dance, and drama performances."
        },
        {
            id: "4",
            title: "Staff Development Workshop",
            date: "2024-03-25",
            time: "02:00 PM - 05:00 PM",
            location: "Conference Room A",
            type: "Administrative",
            attendees: 45,
            description: "Training session on new educational technologies."
        },
        {
            id: "5",
            title: "Grade 12 Graduation Ceremony",
            date: "2024-06-10",
            time: "10:00 AM - 01:00 PM",
            location: "Main Auditorium",
            type: "Administrative",
            attendees: 600,
            description: "Celebrating the graduating class of 2024."
        }
    ]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleCreateEvent = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!newEvent.title || !newEvent.date || !newEvent.time) {
            alert("Please fill in all required fields");
            return;
        }

        const eventToAdd: Event = {
            id: (events.length + 1).toString(),
            title: newEvent.title || "Untitled Event",
            date: newEvent.date || "",
            time: newEvent.time || "",
            location: newEvent.location || "",
            type: (newEvent.type as EventType) || "Academic",
            attendees: Number(newEvent.attendees) || 0,
            description: newEvent.description || ""
        };

        setEvents(prev => [eventToAdd, ...prev]); 
        setIsModalOpen(false);
        setNewEvent({
            title: "",
            date: "",
            time: "",
            location: "",
            type: "Academic",
            attendees: 0,
            description: ""
        });
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "All" || event.type === filterType;
        return matchesSearch && matchesType;
    });

    // Helper to get icon based on type
    const getTypeIcon = (type: EventType) => {
        switch (type) {
            case "Academic": return <IoSchoolOutline />;
            case "Sports": return <IoTrophyOutline />;
            case "Cultural": return <IoMusicalNotesOutline />;
            case "Administrative": return <IoPeopleOutline />;
            default: return <IoCalendarOutline />;
        }
    };

    // Helper to get color based on type
    const getTypeColor = (type: EventType) => {
        switch (type) {
            case "Academic": return "text-blue-600 bg-blue-50 border-blue-100";
            case "Sports": return "text-emerald-600 bg-emerald-50 border-emerald-100";
            case "Cultural": return "text-purple-600 bg-purple-50 border-purple-100";
            case "Administrative": return "text-amber-600 bg-amber-50 border-amber-100";
            default: return "text-gray-600 bg-gray-50 border-gray-100";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 sm:p-6 lg:p-8 font-sans text-gray-800">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-50 to-primary-100 mb-2">
                        Events & Activities
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Schedule and manage upcoming school events.
                    </p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                >
                    <IoAddOutline className="w-6 h-6" />
                    <span>Create Event</span>
                </button>
            </div>

            {/* Upcoming Highlights (Top 3) */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <IoCalendarOutline className="text-primary-500" />
                    Upcoming Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {events.slice(0, 3).map(event => (
                        <div key={`highlight-${event.id}`} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group">
                           {/* Decorative Circle */}
                           <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-125 ${getTypeColor(event.type).split(' ')[0].replace('text-', 'bg-')}`}></div>
                           
                           <div className="relative z-10">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-4 ${getTypeColor(event.type)}`}>
                                    {getTypeIcon(event.type)}
                                    {event.type}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                                <div className="space-y-2 text-sm text-gray-500 mb-4">
                                     <div className="flex items-center gap-2">
                                        <IoTimeOutline className="w-4 h-4" />
                                        {event.date} • {event.time.split(' - ')[0]}
                                     </div>
                                     <div className="flex items-center gap-2">
                                        <IoLocationOutline className="w-4 h-4" />
                                        {event.location}
                                     </div>
                                </div>
                                <button className="flex items-center text-primary-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                    View Details <IoChevronForwardOutline />
                                </button>
                           </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Event Directory */}
            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-100/50">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">All Events</h2>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative w-full sm:w-64">
                             <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                             <input 
                                type="text"
                                placeholder="Search events..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary-100 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                             />
                        </div>
                        <div className="relative w-full sm:w-48">
                            <IoFilterOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select 
                                className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-primary-100 appearance-none cursor-pointer"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="All">All Types</option>
                                <option value="Academic">Academic</option>
                                <option value="Sports">Sports</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Administrative">Administrative</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-gray-50">
                    {filteredEvents.map(event => (
                        <div key={event.id} className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row gap-6 items-start md:items-center">
                            {/* Date Badge */}
                            <div className="flex-shrink-0 w-full md:w-20 h-20 bg-gray-50 rounded-2xl flex flex-row md:flex-col items-center justify-center border border-gray-100 text-center gap-2 md:gap-0">
                                <span className="text-red-500 font-bold text-sm uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                <span className="text-gray-900 font-extrabold text-2xl">{new Date(event.date).getDate()}</span>
                            </div>

                            <div className="flex-grow">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold border ${getTypeColor(event.type)}`}>
                                        {event.type}
                                    </span>
                                    <span className="text-gray-400 text-xs font-medium flex items-center gap-1">
                                        <IoTimeOutline /> {event.time}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                                <p className="text-gray-500 text-sm mb-3">{event.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1.5"><IoLocationOutline /> {event.location}</span>
                                    <span className="flex items-center gap-1.5"><IoPeopleOutline /> {event.attendees} Attendees</span>
                                </div>
                            </div>

                            <div className="flex-shrink-0 flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors flex-1 md:flex-none justify-center">
                                    Edit
                                </button>
                                <button className="px-4 py-2 bg-primary-50 text-primary-600 font-bold rounded-xl text-sm hover:bg-primary-100 transition-colors flex-1 md:flex-none justify-center">
                                    Manage
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {filteredEvents.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            <IoCalendarOutline className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="font-medium">No events found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
                    <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                        <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-shrink-0">
                            <h2 className="text-xl font-bold text-gray-900">Create New Event</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            >
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreateEvent} className="p-4 sm:p-6 space-y-6 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Event Title</label>
                                    <input 
                                        type="text" 
                                        name="title"
                                        required
                                        value={newEvent.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Science Fair 2024"
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Event Type</label>
                                    <div className="relative">
                                        <select 
                                            name="type"
                                            value={newEvent.type}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 transition-all font-medium appearance-none"
                                        >
                                            <option value="Academic">Academic</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Cultural">Cultural</option>
                                            <option value="Administrative">Administrative</option>
                                        </select>
                                        <IoChevronForwardOutline className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Date</label>
                                    <input 
                                        type="date" 
                                        name="date"
                                        required
                                        value={newEvent.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 transition-all font-medium text-gray-600"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Time</label>
                                    <input 
                                        type="text" 
                                        name="time"
                                        required
                                        value={newEvent.time}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 09:00 AM - 02:00 PM"
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Location</label>
                                    <div className="relative">
                                        <IoLocationOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input 
                                            type="text" 
                                            name="location"
                                            required
                                            value={newEvent.location}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Main Auditorium"
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Est. Attendees</label>
                                    <input 
                                        type="number" 
                                        name="attendees"
                                        min="0"
                                        value={newEvent.attendees}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Description</label>
                                <textarea 
                                    name="description"
                                    rows={3}
                                    value={newEvent.description}
                                    onChange={handleInputChange}
                                    placeholder="Brief details about the event..."
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 transition-all font-medium resize-none"
                                />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 px-6 rounded-xl font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <IoSaveOutline className="w-5 h-5" />
                                    Save Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
