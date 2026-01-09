import {
    AlertCircle,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    Coffee,
    Loader2,
    MapPin,
    Users,
} from "lucide-react";
import { useState } from "react";
import { useGetTeacherTimetableQuery } from "../../app/api/timetable";
import type { TimetableEntry } from "../../types/timetable";

interface TeachingSession {
  id: number;
  subject: string;
  class: string;
  room: string;
  time: string;
  duration: string;
  color: string;
  type: "class" | "break";
  teacherId: string;
}

interface DaySchedule {
  day: string;
  date: string;
  sessions: TeachingSession[];
}

export default function TeacherRoutine() {
  const [currentWeek, setCurrentWeek] = useState(0);

  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1 + (weekOffset * 7));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatWeekRange = (dates: Date[]) => {
    const start = dates[0];
    const end = dates[6];
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  };

  const weekDates = getWeekDates(currentWeek);

  // Fetch teacher timetable from API
  const { data: timetableResponse, isLoading, isError } = useGetTeacherTimetableQuery({
    academicYear: "2024/2025",
    semester: "First",
  });

  const timeSlots = [
    "8:00 AM",
    "9:00 AM", 
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM"
  ];

  // Helper function to format time from HH:mm to 12-hour format
  const formatToAMPM = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  // Helper function to calculate duration
  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return "1h";
    const [sH, sM] = start.split(':').map(Number);
    const [eH, eM] = end.split(':').map(Number);
    const totalMinutes = (eH * 60 + eM) - (sH * 60 + sM);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  // Helper function to get consistent colors for subjects
  const getSubjectColor = (subject: string) => {
    const colors = [
      "bg-blue-100 border-l-4 border-blue-500",
      "bg-purple-100 border-l-4 border-purple-500",
      "bg-green-100 border-l-4 border-green-500",
      "bg-red-100 border-l-4 border-red-500",
      "bg-yellow-100 border-l-4 border-yellow-500",
      "bg-indigo-100 border-l-4 border-indigo-500",
      "bg-teal-100 border-l-4 border-teal-500",
      "bg-pink-100 border-l-4 border-pink-500",
      "bg-orange-100 border-l-4 border-orange-500"
    ];
    let hash = 0;
    for (let i = 0; i < subject.length; i++) {
      hash = subject.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Build schedule from API data
  const buildSchedule = (entries: TimetableEntry[] = []) => {
    const schedule: Record<string, TeachingSession[]> = {
      Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
    };

    entries.forEach(entry => {
      const dayName = dayNames[entry.dayOfWeek - 1];
      if (dayName && schedule[dayName]) {
        schedule[dayName].push({
          id: parseInt(entry.id),
          subject: entry.courseName || "Unknown Course",
          class: `${entry.level || "Level"} - ${entry.classCohortId || ""}`,
          room: entry.room || "TBD",
          time: formatToAMPM(entry.startTime),
          duration: calculateDuration(entry.startTime, entry.endTime),
          color: getSubjectColor(entry.courseName || "Unknown"),
          type: "class",
          teacherId: entry.instructorId
        });
      }
    });

    return schedule;
  };

  const baseSchedule = buildSchedule(timetableResponse?.data);
  
  const weeklySchedule: DaySchedule[] = weekDates.map((date, index) => ({
    day: dayNames[index],
    date: formatDate(date),
    sessions: baseSchedule[dayNames[index]] || []
  }));

  const getSessionForTimeSlot = (day: DaySchedule, timeSlot: string) => {
    const directMatch = day.sessions.find(session => session.time === timeSlot);
    if (directMatch) return directMatch;
    
    const timeIndex = timeSlots.indexOf(timeSlot);
    if (timeIndex === -1) return null;
    
    for (const session of day.sessions) {
      const sessionStartIndex = timeSlots.indexOf(session.time);
      if (sessionStartIndex === -1) continue;
      
      const duration = parseInt(session.duration.replace('h', ''));
      const sessionEndIndex = sessionStartIndex + duration;
      
      if (timeIndex >= sessionStartIndex && timeIndex < sessionEndIndex) {
        return session;
      }
    }
    
    return null;
  };

  const todayIndex = new Date().getDay() - 1;
  const todaySessions = todayIndex >= 0 && todayIndex < 7 ? weeklySchedule[todayIndex].sessions : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-primary-50 animate-spin" />
        <p className="text-primary-50 font-medium animate-pulse text-lg">
          Loading your teaching schedule...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6 border border-red-100">
          <div className="inline-flex p-4 bg-red-50 rounded-full text-red-500">
            <AlertCircle className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Connection Issue</h2>
            <p className="text-gray-600">
              We couldn't fetch your teaching schedule. This might be due to a network problem or server maintenance.
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-primary-50 text-white rounded-xl font-semibold hover:bg-primary-100 transition-all shadow-lg hover:shadow-primary-50/25"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 xxs:px-4 xs:px-4 sm:px-6 md:px-8 py-3 xxs:py-4 xs:py-4 sm:py-6 md:py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-50 mb-4 transition-all hover:gap-3"
        >
          <ChevronLeft size={20} />
          <span className="text-xs xs:text-sm sm:text-base font-semibold">Back</span>
        </button>

        {/* Header */}
        <div className="mb-4 xs:mb-5 sm:mb-6">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-50 to-primary-300 bg-clip-text text-transparent mb-2">
            Teaching Schedule
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-gray-600">Your weekly class timetable</p>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-3 xs:p-4">
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-primary-50" />
          </button>
          <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-semibold text-primary-50 text-center">
            {formatWeekRange(weekDates)}
          </h2>
          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={20} className="text-primary-50" />
          </button>
        </div>

        {/* Timetable */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 mb-4 xs:mb-5 sm:mb-6 overflow-hidden">
            <table className="w-full table-fixed">
              <thead className="bg-gradient-to-r from-primary-50 to-primary-50">
                <tr>
                  <th className="w-16 xxs:w-20 xs:w-24 sm:w-32 px-1 xxs:px-2 xs:px-3 py-2 text-left text-xs font-bold text-white">Time</th>
                  {weeklySchedule.map((day) => (
                    <th key={day.day} className="px-1 xxs:px-2 xs:px-3 py-2 text-center text-xs font-bold text-white border-l border-white/20">
                      <div className="text-xs xxs:text-xs xs:text-sm">{day.day.slice(0, 3)}</div>
                      <div className="text-xs font-normal opacity-90 hidden xs:block">{day.date}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot, idx) => (
                  <tr key={timeSlot} className={idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                    <td className="px-1 xxs:px-2 xs:px-3 py-2 text-xs text-primary-50 font-semibold border-t border-gray-200">
                      <div className="text-xs">{timeSlot.replace(' ', '')}</div>
                    </td>
                    {weeklySchedule.map((day) => {
                      const session = getSessionForTimeSlot(day, timeSlot);
                      const isStartingSlot = session && session.time === timeSlot;

                      return (
                        <td
                          key={`${timeSlot}-${day.day}`}
                          className="px-1 py-1 xxs:py-2 border-t border-l border-gray-200 min-h-[50px] xxs:min-h-[60px] xs:min-h-[70px]"
                        >
                          {session && (
                            <div className={`${session.color} rounded p-1 xxs:p-1.5 xs:p-2 h-full shadow-sm text-center ${!isStartingSlot ? 'opacity-75' : ''}`}>
                              {session.type === "break" ? (
                                <div className="flex flex-col items-center justify-center h-full">
                                  <Coffee size={12} className="text-gray-600 mb-1" />
                                  <div className="text-xs font-semibold text-gray-700">
                                    {isStartingSlot ? 'Break' : '...'}
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {isStartingSlot ? (
                                    <>
                                      <div className="text-xs font-bold text-primary-50 mb-1">
                                        {session.subject.length > 8 ? session.subject.slice(0, 8) + '...' : session.subject}
                                      </div>
                                      <div className="text-xs text-primary-50 mb-1">
                                        {session.class.replace('Grade ', 'G')}
                                      </div>
                                      <div className="text-xs text-primary-50 hidden xs:block">
                                        {session.room.replace('Room ', 'R').replace('Lab ', 'L')}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-xs text-primary-50 text-center">
                                      {session.subject.slice(0, 6)}...
                                      <div className="text-xs mt-1">continues</div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
        </div>

        {/* Today's Schedule Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-3 xs:p-4 sm:p-6">
          <h3 className="text-base xs:text-lg sm:text-xl font-bold text-primary-50 mb-3 xs:mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Today's Schedule
          </h3>
          {todaySessions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {todaySessions.map((session) => (
                <div
                  key={session.id}
                  className={`${session.color} rounded-lg xs:rounded-xl p-3 xs:p-4 shadow-sm hover:shadow-md transition-shadow`}
                >
                  {session.type === "break" ? (
                    <div className="flex items-center gap-3">
                      <Coffee size={24} className="text-gray-600" />
                      <div>
                        <h4 className="font-bold text-gray-700">{session.subject}</h4>
                        <span className="text-sm text-gray-600">{session.time}</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-2 xs:mb-3">
                        <h4 className="text-sm xs:text-base font-bold text-primary-50">{session.subject}</h4>
                        <span className="text-xs xs:text-sm font-semibold text-primary-50">{session.time}</span>
                      </div>
                      <div className="space-y-1.5 xs:space-y-2 text-xs xs:text-sm text-primary-50">
                        <div className="flex items-center gap-2">
                          <Users size={14} />
                          <span>{session.class}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{session.room}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{session.duration}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 text-center py-6 xs:py-8">No classes scheduled for today</p>
          )}
        </div>
      </div>
    </div>
  );
}
