import React, { useEffect, useState } from "react";
import {
    IoAddOutline,
    IoCalendarOutline,
    IoEllipsisVertical,
    IoLocationOutline,
    IoPeopleOutline,
    IoSearchOutline,
    IoStatsChartOutline,
    IoTimeOutline,
    IoTrashOutline,
    IoWineOutline
} from "react-icons/io5";

interface GuildEvent {
    id: string;
    title: string;
    category: "Social" | "Academic" | "Sports" | "Culture";
    venue: string;
    date: string;
    time: string;
    status: "Upcoming" | "In-Progress" | "Completed" | "Cancelled";
    organizer: string;
}

const SocialsAndEvents: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const stats = [
        { label: "Upcoming Events", value: "12", trend: "Next 30 days", icon: <IoCalendarOutline />, color: "text-primary-50", bg: "bg-primary-50/10" },
        { label: "Total Attendees", value: "3,800+", trend: "Across events", icon: <IoPeopleOutline />, color: "text-primary-100", bg: "bg-primary-100/10" },
        { label: "Venue Bookings", value: "85%", trend: "Capacity", icon: <IoLocationOutline />, color: "text-primary-300", bg: "bg-primary-300/10" },
        { label: "Success Rate", value: "94%", trend: "+2% YoY", icon: <IoStatsChartOutline />, color: "text-primary-200", bg: "bg-primary-200/10" },
    ];

    const events: GuildEvent[] = [
        { id: "EVT-2024-001", title: "Fresher's Night Gala", category: "Social", venue: "Main Auditorium", date: "2024-03-25", time: "18:00", status: "Upcoming", organizer: "Social Affairs Committee" },
        { id: "EVT-2024-002", title: "Inter-Faculty Debate", category: "Academic", venue: "Lecture Hall 4", date: "2024-03-20", time: "14:00", status: "Upcoming", organizer: "Debate Society" },
        { id: "EVT-2024-003", title: "Cultural Heritage Expo", category: "Culture", venue: "University Square", date: "2024-03-15", time: "10:00", status: "Upcoming", organizer: "Culture Dept" },
        { id: "EVT-2024-004", title: "E-Sports Championship", category: "Sports", venue: "IT Lab 1", date: "2024-03-12", time: "16:00", status: "In-Progress", organizer: "Gaming Club" },
        { id: "EVT-2024-005", title: "Guild Leadership Workshop", category: "Academic", venue: "Conference Room B", date: "2024-03-10", time: "09:00", status: "Completed", organizer: "Guild Office" },
        { id: "EVT-2024-006", title: "Campus Carnival", category: "Social", venue: "Sports Ground", date: "2024-03-30", time: "12:00", status: "Upcoming", organizer: "Social Affairs Committee" },
        { id: "EVT-2024-007", title: "Inaugural Marathon", category: "Sports", venue: "Campus Perimeter", date: "2024-03-05", time: "06:00", status: "Completed", organizer: "Sports Dept" },
        { id: "EVT-2024-008", title: "Career Fair 2024", category: "Academic", venue: "Exhibition Hall", date: "2024-04-05", time: "08:00", status: "Upcoming", organizer: "Liaison Office" },
    ];

    const filteredEvents = events.filter(e => 
        (activeFilter === "All" || e.category === activeFilter) &&
        (e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.organizer.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeFilter]);

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50/30 p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-50 tracking-tight flex items-center gap-3">
                        <IoCalendarOutline className="text-primary-100" />
                        Socials & Events Management
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium italic">Orchestrating memorable student experiences and campus vibrant life.</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all active:scale-95">
                        <IoWineOutline className="text-base text-primary-100" />
                        Venue Bookings
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95">
                        <IoAddOutline className="text-base" />
                        Plan New Event
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group overflow-hidden relative">
                        <div className="flex items-start justify-between relative z-10">
                            <div className={`${s.bg} ${s.color} p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110`}>
                                <span className="text-2xl">{s.icon}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">
                                {s.trend}
                            </div>
                        </div>
                        <div className="mt-6 relative z-10">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</h3>
                            <p className="text-2xl font-black text-primary-50 tracking-tight">{s.value}</p>
                        </div>
                        <div className={`absolute -right-4 -bottom-4 text-7xl ${s.color} opacity-5 transition-transform group-hover:scale-110`}>
                            {s.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Event Management Portal */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                {/* Search and Category Filter Toolbar */}
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 bg-primary-50/[0.01]">
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input 
                            type="text" 
                            placeholder="Find upcoming festivals or society meets..." 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-primary-50/5 focus:border-primary-50 transition-all text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {["All", "Social", "Academic", "Sports", "Culture"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    activeFilter === cat ? "bg-primary-100 text-white shadow-lg shadow-primary-100/20" : "bg-gray-50 text-gray-400 hover:text-primary-50"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table View */}
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Event ID / Title</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Venue</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Schedule</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 bg-primary-50/5 rounded-2xl flex items-center justify-center text-primary-50 font-black text-xs border border-primary-50/5 group-hover:scale-105 transition-transform">
                                                {event.title.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-primary-50 group-hover:text-primary-100 transition-colors uppercase tracking-tight">{event.title}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase italic tracking-wider">{event.id} • by {event.organizer}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[10px] font-black text-primary-300 uppercase tracking-widest">{event.category}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                            <IoLocationOutline className="text-primary-100" />
                                            {event.venue}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                            <div className="flex items-center gap-1">
                                                <IoCalendarOutline /> {event.date}
                                            </div>
                                            <div className="flex items-center gap-1 opacity-60">
                                                <IoTimeOutline /> {event.time}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                                            event.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                                            event.status === 'In-Progress' ? 'bg-orange-100 text-orange-700' :
                                            event.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-white text-gray-400 hover:text-primary-50 rounded-xl shadow-sm border border-gray-100 hover:border-primary-50 transition-all">
                                                <IoSearchOutline />
                                            </button>
                                            <button className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm border border-gray-100 hover:border-red-500 transition-all">
                                                <IoTrashOutline />
                                            </button>
                                            <button className="p-3 bg-white text-gray-400 hover:text-primary-100 rounded-xl shadow-sm border border-gray-100 hover:border-primary-100 transition-all">
                                                <IoEllipsisVertical />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                        Displaying {Math.min(startIndex + 1, filteredEvents.length)} - {Math.min(startIndex + itemsPerPage, filteredEvents.length)} of {filteredEvents.length} Campus Events
                    </p>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-6 py-3 bg-white border border-gray-100 text-primary-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <div className="flex gap-1">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${
                                        currentPage === i + 1 
                                            ? "bg-primary-50 text-white shadow-lg shadow-primary-50/20" 
                                            : "bg-white text-gray-400 border border-gray-100 hover:text-primary-50"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-6 py-3 bg-white border border-gray-100 text-primary-50 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialsAndEvents;
