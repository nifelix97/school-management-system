import React, { useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoLocationOutline,
    IoPeopleOutline,
    IoTimeOutline
} from "react-icons/io5";

type EventType = "Match" | "Training" | "Meeting" | "Other";

interface Event {
    id: number;
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
    type: EventType;
    location: string;
    team: string; // e.g., "Varsity Basketball"
    description?: string;
}

const Schedules: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [filterType, setFilterType] = useState<EventType | "All">("All");

    // Mock Data
    const [events, setEvents] = useState<Event[]>([
        {
            id: 1,
            title: "Varsity vs St. Patrick's",
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
            startTime: "16:00",
            endTime: "18:00",
            type: "Match",
            location: "Main Gym",
            team: "Varsity Basketball",
            description: "Regional qualifiers semi-final."
        },
        {
            id: 2,
            title: "Morning Practice",
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
            startTime: "06:30",
            endTime: "08:00",
            type: "Training",
            location: "Soccer Field",
            team: "Varsity Soccer",
            description: "Drills and conditioning."
        },
        {
            id: 3,
            title: "Team Strategy Meeting",
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
            startTime: "14:00",
            endTime: "15:00",
            type: "Meeting",
            location: "Room 304",
            team: "All Teams",
            description: "Reviewing game tapes."
        }
    ]);

    const [newEvent, setNewEvent] = useState<Partial<Event>>({
        type: "Training",
        date: new Date(),
        startTime: "12:00",
        endTime: "13:00",
        team: "Varsity Basketball"
    });

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleSaveEvent = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedEvent) {
            // Edit
            setEvents(events.map(ev => ev.id === selectedEvent.id ? { ...ev, ...newEvent } as Event : ev));
        } else {
            // Create
            const event: Event = {
                ...newEvent as Event,
                id: Math.random(),
                date: new Date(newEvent.date || new Date())
            };
            setEvents([...events, event]);
        }
        setShowEventModal(false);
        setNewEvent({ type: "Training", startTime: "12:00", endTime: "13:00", team: "Varsity Basketball" });
        setSelectedEvent(null);
    };

    const handleDayClick = (day: number) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(clickedDate);
        setNewEvent({ ...newEvent, date: clickedDate });
        // Optional: Open modal immediately or just select the date to view side details
    };

    const filteredEvents = events.filter(ev => 
        filterType === "All" || ev.type === filterType
    );

    const getEventsForDay = (day: number) => {
        return filteredEvents.filter(ev => 
            ev.date.getDate() === day && 
            ev.date.getMonth() === currentDate.getMonth() && 
            ev.date.getFullYear() === currentDate.getFullYear()
        );
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 sm:h-32 bg-gray-50/50 border border-gray-100"></div>);
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEvents = getEventsForDay(day);
            const isToday = 
                day === new Date().getDate() && 
                currentDate.getMonth() === new Date().getMonth() && 
                currentDate.getFullYear() === new Date().getFullYear();
            
            const isSelected = selectedDate?.getDate() === day && 
                               selectedDate?.getMonth() === currentDate.getMonth();

            days.push(
                <div 
                    key={day} 
                    onClick={() => handleDayClick(day)}
                    className={`h-24 sm:h-32 border border-gray-100 p-2 transition-all cursor-pointer relative group overflow-hidden ${isSelected ? "bg-blue-50/30" : "bg-white hover:bg-gray-50"}`}
                >
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold mb-1 ${isToday ? "bg-primary-100 text-white shadow-md" : "text-gray-700"}`}>
                        {day}
                    </span>
                    <div className="space-y-1 overflow-y-auto max-h-[calc(100%-2rem)] no-scrollbar">
                        {dayEvents.map(ev => (
                            <div 
                                key={ev.id}
                                onClick={(e) => { e.stopPropagation(); setSelectedEvent(ev); setNewEvent(ev); setShowEventModal(true); }}
                                className={`text-[10px] sm:text-xs px-2 py-1 rounded-md truncate font-medium border-l-2 shadow-sm transition-transform hover:scale-105 ${
                                    ev.type === "Match" ? "bg-red-50 border-red-500 text-red-700" :
                                    ev.type === "Training" ? "bg-green-50 border-green-500 text-green-700" :
                                    ev.type === "Meeting" ? "bg-blue-50 border-blue-500 text-blue-700" :
                                    "bg-gray-100 border-gray-500 text-gray-700"
                                }`}
                            >
                                {ev.startTime} {ev.title}
                            </div>
                        ))}
                    </div>
                    {/* Add Button on Hover */}
                    <button 
                         onClick={(e) => { e.stopPropagation(); setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)); setNewEvent({...newEvent, date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day)}); setShowEventModal(true); }}
                        className="absolute bottom-2 right-2 p-1.5 bg-primary-100 text-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <IoAddOutline />
                    </button>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className={`max-w-7xl mx-auto transition-all duration-300 ${showEventModal ? "filter blur-sm pointer-events-none" : ""}`}>
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <IoCalendarOutline className="text-primary-100" /> Team Schedule
                        </h1>
                        <p className="text-gray-500 mt-1">Manage matches, training sessions, and team events.</p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white p-1 rounded-xl shadow-sm border border-gray-200 overflow-x-auto no-scrollbar">
                        {(["All", "Match", "Training", "Meeting", "Other"] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${
                                    filterType === type 
                                    ? "bg-gray-900 text-white" 
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => { setSelectedEvent(null); setNewEvent({ type: "Training", startTime: "12:00", endTime: "13:00", team: "Varsity Basketball", date: new Date() }); setShowEventModal(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-primary-100 text-white rounded-xl hover:bg-primary-100/90 font-bold transition-colors shadow-lg shadow-primary-100/30 whitespace-nowrap"
                    >
                        <IoAddOutline className="w-5 h-5" /> Add Event
                    </button>
                </div>

                {/* Navigation & Month Title */}
                <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors">
                        <IoChevronBackOutline className="w-6 h-6" />
                    </button>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                         <IoCalendarOutline className="text-primary-100" />
                        {currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors">
                        <IoChevronForwardOutline className="w-6 h-6" />
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-3 text-center text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>
                    {/* Days */}
                    <div className="grid grid-cols-7">
                        {renderCalendar()}
                    </div>
                </div>

                {/* Selected Date Details (Mobile Friendly List) */}
                {selectedDate && (
                    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-slideUp">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                             Events for {selectedDate.toLocaleDateString()}
                        </h3>
                        <div className="space-y-3">
                            {getEventsForDay(selectedDate.getDate()).length > 0 ? (
                                getEventsForDay(selectedDate.getDate()).map(ev => (
                                     <div key={ev.id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                                        <div className={`p-3 rounded-xl text-2xl ${
                                             ev.type === "Match" ? "bg-red-100 text-red-600" :
                                             ev.type === "Training" ? "bg-green-100 text-green-600" :
                                             ev.type === "Meeting" ? "bg-blue-100 text-blue-600" :
                                             "bg-gray-100 text-gray-600"
                                        }`}>
                                            {ev.type === "Match" ? "🏀" : ev.type === "Training" ? "🏃" : ev.type === "Meeting" ? "📊" : "📅"}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-900 text-lg">{ev.title}</h4>
                                                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                                    ev.type === "Match" ? "bg-red-50 text-red-700" :
                                                    ev.type === "Training" ? "bg-green-50 text-green-700" :
                                                    ev.type === "Meeting" ? "bg-blue-50 text-blue-700" :
                                                    "bg-gray-100 text-gray-700"
                                                }`}>{ev.type}</span>
                                            </div>
                                            <p className="text-gray-500 text-sm mt-1">{ev.description}</p>
                                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 font-medium">
                                                <span className="flex items-center gap-1"><IoTimeOutline /> {ev.startTime} - {ev.endTime}</span>
                                                <span className="flex items-center gap-1"><IoLocationOutline /> {ev.location}</span>
                                                <span className="flex items-center gap-1"><IoPeopleOutline /> {ev.team}</span>
                                            </div>
                                            <div className="mt-3 flex gap-2">
                                                 <button 
                                                    onClick={() => { setSelectedEvent(ev); setNewEvent(ev); setShowEventModal(true); }}
                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                     </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">No events scheduled for this day.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Event Modal */}
            {showEventModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowEventModal(false)}></div>
                    <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 animate-scaleIn">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">{selectedEvent ? "Edit Event" : "Create New Event"}</h3>
                            <button onClick={() => setShowEventModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <IoCloseOutline className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveEvent} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                                <input 
                                    type="text" 
                                    required
                                    value={newEvent.title || ""}
                                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                    placeholder="e.g. Match vs. North High"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        value={newEvent.date ? newEvent.date.toISOString().split('T')[0] : ""}
                                        onChange={(e) => setNewEvent({...newEvent, date: new Date(e.target.value)})}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <select 
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none"
                                        value={newEvent.type}
                                        onChange={(e) => setNewEvent({...newEvent, type: e.target.value as EventType})}
                                    >
                                        <option value="Match">Match</option>
                                        <option value="Training">Training</option>
                                        <option value="Meeting">Meeting</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                    <input 
                                        type="time" 
                                        required
                                        value={newEvent.startTime}
                                        onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                    <input 
                                        type="time" 
                                        required
                                        value={newEvent.endTime}
                                        onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                                        className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <div className="relative">
                                    <IoLocationOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="text" 
                                        value={newEvent.location || ""}
                                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none" 
                                        placeholder="Location"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    rows={3}
                                    value={newEvent.description || ""}
                                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-100 outline-none resize-none" 
                                    placeholder="Add any notes..."
                                />
                            </div>

                            <div className="pt-2 flex gap-3">
                                {selectedEvent && (
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            if(window.confirm("Delete this event?")) {
                                                setEvents(events.filter(e => e.id !== selectedEvent.id));
                                                setShowEventModal(false);
                                            }
                                        }}
                                        className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors"
                                    >
                                        Delete
                                    </button>
                                )}
                                <button type="submit" className="flex-1 py-3 bg-primary-100 text-white rounded-xl font-bold hover:bg-primary-100/90 transition-colors shadow-lg shadow-primary-100/20">
                                    {selectedEvent ? "Save Changes" : "Create Event"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Schedules;
