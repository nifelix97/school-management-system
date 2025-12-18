import React, { useMemo, useState } from "react";
import {
    IoAppsOutline,
    IoCalendarOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloudDownloadOutline,
    IoFilterOutline,
    IoListOutline,
    IoLocationOutline,
    IoTimeOutline
} from "react-icons/io5";
import { toast } from "react-toastify";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "holiday" | "academic" | "sport" | "meeting";
  description: string;
  location?: string;
  time?: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Winter Vacation Starts",
    date: new Date(2025, 11, 20),
    type: "holiday",
    description: "Beginning of the 2-week winter break for all students.",
    location: "Campus Wide"
  },
  {
    id: "2",
    title: "Mid-Term Results Day",
    date: new Date(2025, 11, 15),
    type: "academic",
    description: "Results will be published on the parent portal at 9:00 AM.",
    time: "09:00 AM"
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting",
    date: new Date(2025, 11, 10),
    type: "meeting",
    description: "Discussion regarding John's academic progress in Mathematics.",
    location: "Online (Zoom Link in Messages)",
    time: "03:30 PM"
  },
  {
    id: "4",
    title: "Inter-School Sports Fest",
    date: new Date(2025, 11, 5),
    type: "sport",
    description: "Annual sports competition between local high schools.",
    location: "Main Stadium",
    time: "08:00 AM"
  },
  {
    id: "5",
    title: "Christmas Celebration",
    date: new Date(2025, 11, 24),
    type: "event" as any,
    description: "School annual Christmas carols and gift exchange.",
    location: "Assembly Hall",
    time: "10:00 AM"
  }
];

const ParentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // December 2025
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2025, 11, 10));
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = [];
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    // Padding for previous month
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, currentMonth: false });
    }

    // Days for current month
    for (let i = 1; i <= totalDays; i++) {
        const d = new Date(year, month, i);
        const dayEvents = mockEvents.filter(e => 
            e.date.getDate() === d.getDate() && 
            e.date.getMonth() === d.getMonth() && 
            e.date.getFullYear() === d.getFullYear()
        );
      days.push({ day: i, currentMonth: true, date: d, events: dayEvents });
    }

    return days;
  }, [currentDate]);

  const selectedEvents = useMemo(() => {
    if (!selectedDate) return [];
    return mockEvents.filter(e => 
      e.date.getDate() === selectedDate.getDate() && 
      e.date.getMonth() === selectedDate.getMonth() && 
      e.date.getFullYear() === selectedDate.getFullYear()
    );
  }, [selectedDate]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "holiday": return "bg-red-500";
      case "academic": return "bg-blue-500";
      case "sport": return "bg-emerald-500";
      case "meeting": return "bg-amber-500";
      default: return "bg-primary-50";
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "holiday": return "bg-red-50 text-red-500 border-red-100";
      case "academic": return "bg-blue-50 text-blue-500 border-blue-100";
      case "sport": return "bg-emerald-50 text-emerald-500 border-emerald-100";
      case "meeting": return "bg-amber-50 text-amber-500 border-amber-100";
      default: return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-10">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            School Calendar
            <span className="text-xs font-black uppercase tracking-widest text-primary-50 px-2 py-1 bg-primary-50/5 rounded-lg border border-primary-50/10">2025-26</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium">Keep track of key academic dates and school events.</p>
        </div>

        <div className="flex items-center gap-2">
            <button 
                onClick={() => toast.info("Downloading calendar sync file...")}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-xs font-bold text-gray-600 border border-gray-100 shadow-sm hover:border-primary-50 hover:text-primary-50 transition-all"
            >
                <IoCloudDownloadOutline className="text-base" /> Export
            </button>
            <div className="bg-gray-100/50 p-1 rounded-xl border border-gray-100 flex items-center">
                <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <IoAppsOutline className="text-lg" />
                </button>
                <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-50' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <IoListOutline className="text-lg" />
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Main Calendar View */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-6 overflow-hidden">
            
            {/* Nav */}
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-gray-800 min-w-[150px]">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <div className="flex items-center gap-1">
                    <button onClick={handlePrevMonth} className="p-2 bg-gray-50 text-gray-400 hover:text-primary-50 rounded-lg transition-colors border border-transparent hover:border-primary-50/20"><IoChevronBackOutline /></button>
                    <button onClick={handleNextMonth} className="p-2 bg-gray-50 text-gray-400 hover:text-primary-50 rounded-lg transition-colors border border-transparent hover:border-primary-50/20"><IoChevronForwardOutline /></button>
                  </div>
               </div>
               <button 
                    onClick={() => setCurrentDate(new Date(2025, 11, 1))}
                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-gray-50 text-gray-400 rounded-lg hover:bg-primary-50/5 hover:text-primary-50 transition-all border border-transparent hover:border-primary-50/10"
               >
                 Today
               </button>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-7 gap-px bg-gray-50 border border-gray-50 rounded-2xl overflow-hidden">
                {daysOfWeek.map(day => (
                  <div key={day} className="bg-white p-3 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{day}</div>
                ))}
                {calendarDays.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => item.date && setSelectedDate(item.date)}
                    className={`bg-white min-h-[80px] md:min-h-[120px] p-2 md:p-3 transition-all cursor-pointer group ${
                        !item.currentMonth ? 'bg-gray-50/10' : 'hover:bg-primary-50/5'
                    } ${selectedDate?.toDateString() === item.date?.toDateString() ? 'ring-2 ring-primary-50/20 bg-primary-50/[0.02]' : ''}`}
                  >
                    {item.day && (
                      <div className="h-full flex flex-col justify-between">
                        <span className={`text-sm font-bold transition-colors ${
                            selectedDate?.toDateString() === item.date?.toDateString() ? 'text-primary-50' : 'text-gray-700'
                        }`}>
                          {item.day}
                        </span>
                        <div className="space-y-1">
                           {item.events?.map(e => (
                             <div 
                                key={e.id} 
                                className={`w-full h-1.5 md:h-auto md:p-1 md:px-2 rounded md:rounded-md flex items-center gap-2 ${getTypeColor(e.type)}`}
                                title={e.title}
                             >
                                <span className="hidden md:block text-[9px] font-black text-white truncate uppercase">{e.title}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
                <div className="space-y-3">
                    {mockEvents.map(e => (
                        <div key={e.id} className="flex gap-4 p-4 bg-gray-50/30 rounded-2xl border border-gray-50 hover:border-primary-50/20 hover:bg-white transition-all group">
                             <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center shrink-0">
                                <span className="text-[10px] font-black text-primary-50 uppercase">{monthNames[e.date.getMonth()].slice(0, 3)}</span>
                                <span className="text-xl font-bold text-gray-800">{e.date.getDate()}</span>
                             </div>
                             <div className="flex-1 min-w-0 py-1">
                                <div className="flex items-center justify-between gap-4 mb-1">
                                    <h4 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-primary-50 transition-colors truncate">{e.title}</h4>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border ${getTypeStyle(e.type)} shrink-0`}>
                                        {e.type}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                                    {e.time && <span className="flex items-center gap-1"><IoTimeOutline /> {e.time}</span>}
                                    {e.location && <span className="flex items-center gap-1 truncate"><IoLocationOutline /> {e.location}</span>}
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
        </div>

        {/* Sidebar: Selected Day Details & Filters */}
        <div className="space-y-6">
            
            {/* Filters Sidebar */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <IoFilterOutline /> Event Types
                </h3>
                <div className="space-y-2">
                    {["all", "holiday", "academic", "sport", "meeting"].map(type => (
                        <button 
                            key={type}
                            onClick={() => setActiveFilter(type)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
                                activeFilter === type 
                                ? 'bg-primary-50/5 border-primary-50/20 text-primary-50 font-bold' 
                                : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            <span className="text-xs uppercase font-black tracking-widest flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getTypeColor(type)}`} />
                                {type}
                            </span>
                            <span className="text-[10px] opacity-50">
                                {type === 'all' ? mockEvents.length : mockEvents.filter(e => e.type === type).length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected Date Details */}
            <div className={`bg-gray-900 rounded-3xl p-6 text-white shadow-xl shadow-gray-200 transition-all ${selectedDate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="mb-6">
                    <p className="text-[10px] font-black text-primary-50 uppercase tracking-[0.2em] mb-1">
                        {selectedDate ? daysOfWeek[selectedDate.getDay()] : ''}
                    </p>
                    <h3 className="text-2xl font-bold">
                        {selectedDate ? `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}` : ''}
                    </h3>
                </div>

                <div className="space-y-4">
                    {selectedEvents.length > 0 ? selectedEvents.map(e => (
                        <div key={e.id} className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border bg-white/5 border-white/20`}>
                                {e.type}
                            </span>
                            <h4 className="font-bold text-sm leading-tight">{e.title}</h4>
                            <p className="text-xs text-gray-400 font-medium leading-relaxed">{e.description}</p>
                            <div className="flex flex-col gap-2 pt-2 text-[10px] font-bold text-primary-50 uppercase">
                                {e.time && <div className="flex items-center gap-2"><IoTimeOutline className="text-base" /> {e.time}</div>}
                                {e.location && <div className="flex items-center gap-2"><IoLocationOutline className="text-base" /> {e.location}</div>}
                            </div>
                        </div>
                    )) : (
                        <div className="py-10 text-center space-y-3 opacity-50">
                            <IoCalendarOutline className="text-4xl mx-auto" />
                            <p className="text-sm font-medium">No events scheduled for this day.</p>
                        </div>
                    )}
                </div>

                {selectedEvents.length > 0 && (
                    <button 
                        onClick={() => toast.success("Reminder set for this event!")}
                        className="w-full mt-6 py-3 bg-primary-50 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-50/20 hover:opacity-90 transition-all active:scale-95"
                    >
                        Set Reminder
                    </button>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ParentCalendar;

