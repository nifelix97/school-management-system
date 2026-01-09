import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    User,
    Loader2,
    AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useGetStudentTimetableQuery } from "../../app/api/timetable";
import type { TimetableEntry } from "../../types/timetable";

interface ClassSession {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  time: string; // format matched with timeSlots like "9:00 AM"
  startTimeRaw: string; // for easier matching
  endTimeRaw: string;
  duration: string;
  color: string;
}

interface DaySchedule {
  day: string;
  date: string;
  classes: ClassSession[];
}

export default function ClassRoutine() {
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

  const { data: timetableResponse, isLoading, isError } = useGetStudentTimetableQuery({
    academicYear: "2024/2025",
    semester: "First",
  });

  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const formatToAMPM = (timeStr: string) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

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

  const getSubjectColor = (subject: string) => {
    const colors = [
      "bg-blue-100 border-l-4 border-blue-500",
      "bg-purple-100 border-l-4 border-purple-500",
      "bg-green-100 border-l-4 border-green-500",
      "bg-red-100 border-l-4 border-red-500",
      "bg-yellow-100 border-l-4 border-yellow-500",
      "bg-indigo-100 border-l-4 border-indigo-500",
      "bg-teal-100 border-l-4 border-teal-500",
      "bg-pink-100 border-l-4 border-pink-500"
    ];
    let hash = 0;
    for (let i = 0; i < subject.length; i++) {
      hash = subject.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const buildSchedule = (entries: TimetableEntry[] = []) => {
    const schedule: Record<string, ClassSession[]> = {
      Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
    };

    entries.forEach(entry => {
      const dayName = dayNames[entry.dayOfWeek - 1];
      if (dayName && schedule[dayName]) {
        schedule[dayName].push({
          id: entry.id,
          subject: entry.courseName || "Unknown Course",
          teacher: entry.instructorName || "Unknown Instructor",
          room: entry.room || "TBD",
          time: formatToAMPM(entry.startTime),
          startTimeRaw: entry.startTime,
          endTimeRaw: entry.endTime,
          duration: calculateDuration(entry.startTime, entry.endTime),
          color: getSubjectColor(entry.courseName || "Unknown")
        });
      }
    });

    return schedule;
  };

  const baseSchedule = buildSchedule(timetableResponse?.data);
  const weeklySchedule: DaySchedule[] = weekDates.map((date, index) => ({
    day: dayNames[index],
    date: formatDate(date),
    classes: baseSchedule[dayNames[index]] || []
  }));

  const getClassForTimeSlot = (day: DaySchedule, timeSlot: string) => {
    const timeMatch = day.classes.find(cls => cls.time === timeSlot);
    if (timeMatch) return timeMatch;

    // Check if within duration
    const [slotH, slotM] = timeSlot.split(/[: ]/).map((v, i) => {
      if (i === 1) return parseInt(v); // minutes
      if (i === 0) { // hours
        let h = parseInt(v);
        if (timeSlot.includes('PM') && h !== 12) h += 12;
        if (timeSlot.includes('AM') && h === 12) h = 0;
        return h;
      }
      return 0;
    });
    const slotTotalMinutes = slotH * 60 + slotM;

    for (const cls of day.classes) {
      const [sH, sM] = cls.startTimeRaw.split(':').map(Number);
      const [eH, eM] = cls.endTimeRaw.split(':').map(Number);
      const startTotal = sH * 60 + sM;
      const endTotal = eH * 60 + eM;

      if (slotTotalMinutes > startTotal && slotTotalMinutes < endTotal) {
        return cls;
      }
    }
    return null;
  };

  const todayDateStr = formatDate(new Date());
  const todaySchedule = weeklySchedule.find(day => day.date === todayDateStr);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-primary-50 animate-spin" />
        <p className="text-primary-50 font-medium animate-pulse text-lg">
          Loading your class routine...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6 border border-red-100">
          <div className="inline-flex p-4 bg-red-50 rounded-full text-red-500">
            <AlertCircle className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Connection Issue</h2>
            <p className="text-gray-600">
              We couldn't fetch your class routine. This might be due to a network problem or server maintenance.
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-primary-50">Class Routine</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-primary-50 text-primary-50 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Calendar size={16} />
              <span>This Week</span>
            </button>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={20} className="text-primary-50" />
            </button>
            <h2 className="text-xl font-semibold text-primary-50">
              {formatWeekRange(weekDates)}
            </h2>
            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={20} className="text-primary-50" />
            </button>
          </div>
        </div>

        {/* Timetable */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-8 gap-0">
            {/* Time column header */}
            <div className="border-r border-primary-50 p-4 bg-gray-50">
              <div className="font-semibold text-primary-50">Time</div>
            </div>

            {/* Day headers */}
            {weeklySchedule.map((day) => (
              <div
                key={day.day}
                className="border-r  border-primary-50/60 p-4 text-center border-primary-50"
              >
                <div className="font-semibold text-primary-50">{day.day}</div>
                <div className="text-sm text-primary-50">{day.date}</div>
              </div>
            ))}
          </div>

          {/* Time slots and classes */}
          {timeSlots.map((timeSlot) => (
            <div
              key={timeSlot}
              className="grid grid-cols-8 gap-0 border-t border-primary-50"
            >
              {/* Time label */}
              <div className="border-r border-primary-50 p-4 text-sm text-primary-50 font-medium bg-gray-50">
                {timeSlot}
              </div>

              {/* Day columns */}
              {weeklySchedule.map((day) => {
                const classSession = getClassForTimeSlot(day, timeSlot);
                const isStartingSlot =
                  classSession && classSession.time === timeSlot;

                return (
                  <div
                    key={`${timeSlot}-${day.day}`}
                    className="border-r border-primary-50/60 p-2 min-h-[80px]"
                  >
                    {classSession && (
                      <div
                        className={`${
                          classSession.color
                        } rounded-lg p-3 h-full ${
                          !isStartingSlot ? "opacity-75" : ""
                        }`}
                      >
                        {isStartingSlot ? (
                          <>
                            <div className="text-sm font-semibold text-primary-50 mb-1">
                              {classSession.subject}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-primary-50 mb-1">
                              <User size={12} />
                              <span>{classSession.teacher}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-primary-50 mb-1">
                              <MapPin size={12} />
                              <span>{classSession.room}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-primary-50">
                              <Clock size={12} />
                              <span>{classSession.duration}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-sm font-medium text-primary-50 text-center">
                            {classSession.subject}
                            <div className="text-xs text-primary-50 mt-1">
                              continues...
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Today's Classes Summary */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-primary-50 mb-4">
            Today's Classes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todaySchedule && todaySchedule.classes.length > 0 ? (
              todaySchedule.classes.map((classSession) => (
                <div
                  key={classSession.id}
                  className={`${classSession.color} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-primary-50">
                      {classSession.subject}
                    </h4>
                    <span className="text-sm font-medium text-primary-50">
                      {classSession.time}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-primary-50">
                    <div className="flex items-center gap-2">
                      <User size={14} className="opacity-70" />
                      <span>{classSession.teacher}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="opacity-70" />
                      <span>{classSession.room}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="opacity-70" />
                      <span>{classSession.duration}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No classes scheduled for today.</p>
                <p className="text-sm text-gray-400 mt-1">Enjoy your free time!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}