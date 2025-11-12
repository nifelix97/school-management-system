import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Calendar,
} from "lucide-react";

interface ClassSession {
  id: number;
  subject: string;
  teacher: string;
  room: string;
  time: string;
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

  const baseSchedule = {
    Monday: [
      { id: 1, subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", time: "9:00 AM", duration: "1h", color: "bg-blue-100 border-l-4 border-blue-500" },
      { id: 2, subject: "Physics", teacher: "Prof. Johnson", room: "Lab 201", time: "11:00 AM", duration: "2h", color: "bg-purple-100 border-l-4 border-purple-500" },
      { id: 3, subject: "English", teacher: "Ms. Davis", room: "Room 105", time: "2:00 PM", duration: "1h", color: "bg-green-100 border-l-4 border-green-500" }
    ],
    Tuesday: [
      { id: 4, subject: "Chemistry", teacher: "Dr. Wilson", room: "Lab 301", time: "8:00 AM", duration: "2h", color: "bg-red-100 border-l-4 border-red-500" },
      { id: 5, subject: "History", teacher: "Mr. Brown", room: "Room 203", time: "1:00 PM", duration: "1h", color: "bg-yellow-100 border-l-4 border-yellow-500" },
      { id: 6, subject: "Computer Science", teacher: "Ms. Taylor", room: "Lab 401", time: "3:00 PM", duration: "2h", color: "bg-indigo-100 border-l-4 border-indigo-500" }
    ],
    Wednesday: [
      { id: 7, subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", time: "9:00 AM", duration: "1h", color: "bg-blue-100 border-l-4 border-blue-500" },
      { id: 8, subject: "Biology", teacher: "Dr. Garcia", room: "Lab 501", time: "11:00 AM", duration: "2h", color: "bg-teal-100 border-l-4 border-teal-500" },
      { id: 9, subject: "Art", teacher: "Ms. Lee", room: "Studio 1", time: "2:00 PM", duration: "1h", color: "bg-pink-100 border-l-4 border-pink-500" }
    ],
    Thursday: [
      { id: 10, subject: "Physics", teacher: "Prof. Johnson", room: "Lab 201", time: "10:00 AM", duration: "2h", color: "bg-purple-100 border-l-4 border-purple-500" },
      { id: 11, subject: "Geography", teacher: "Mr. Anderson", room: "Room 301", time: "1:00 PM", duration: "1h", color: "bg-orange-100 border-l-4 border-orange-500" },
      { id: 12, subject: "PE", teacher: "Coach Miller", room: "Gymnasium", time: "3:00 PM", duration: "1h", color: "bg-gray-100 border-l-4 border-gray-500" }
    ],
    Friday: [
      { id: 13, subject: "Chemistry", teacher: "Dr. Wilson", room: "Lab 301", time: "9:00 AM", duration: "2h", color: "bg-red-100 border-l-4 border-red-500" },
      { id: 14, subject: "English", teacher: "Ms. Davis", room: "Room 105", time: "12:00 PM", duration: "1h", color: "bg-green-100 border-l-4 border-green-500" },
      { id: 15, subject: "Music", teacher: "Mr. Clark", room: "Music Room", time: "2:00 PM", duration: "1h", color: "bg-cyan-100 border-l-4 border-cyan-500" }
    ],
    Saturday: [
      { id: 16, subject: "Study Hall", teacher: "Various", room: "Library", time: "10:00 AM", duration: "2h", color: "bg-slate-100 border-l-4 border-slate-500" }
    ],
    Sunday: []
  };

  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const weeklySchedule: DaySchedule[] = weekDates.map((date, index) => ({
    day: dayNames[index],
    date: formatDate(date),
    classes: baseSchedule[dayNames[index] as keyof typeof baseSchedule] || []
  }));

  const getClassForTimeSlot = (day: DaySchedule, timeSlot: string) => {
    // Check if this time slot has a class starting at this time
    const directMatch = day.classes.find(cls => cls.time === timeSlot);
    if (directMatch) return directMatch;
    
    // Check if this time slot is part of a multi-hour class
    const timeIndex = timeSlots.indexOf(timeSlot);
    if (timeIndex === -1) return null;
    
    // Look for classes that started earlier and span into this time slot
    for (const cls of day.classes) {
      const classStartIndex = timeSlots.indexOf(cls.time);
      if (classStartIndex === -1) continue;
      
      const duration = parseInt(cls.duration.replace('h', ''));
      const classEndIndex = classStartIndex + duration;
      
      if (timeIndex >= classStartIndex && timeIndex < classEndIndex) {
        return cls;
      }
    }
    
    return null;
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Class Routine</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
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
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {formatWeekRange(weekDates)}
            </h2>
            <button 
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Timetable */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-8 gap-0">
            {/* Time column header */}
            <div className="border-r border-gray-200 p-4 bg-gray-50">
              <div className="font-semibold text-gray-700">Time</div>
            </div>
            
            {/* Day headers */}
            {weeklySchedule.map((day) => (
              <div key={day.day} className="border-r border-gray-200 p-4 text-center bg-gray-50">
                <div className="font-semibold text-gray-900">{day.day}</div>
                <div className="text-sm text-gray-500">{day.date}</div>
              </div>
            ))}
          </div>
          
          {/* Time slots and classes */}
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="grid grid-cols-8 gap-0 border-t border-gray-200">
              {/* Time label */}
              <div className="border-r border-gray-200 p-4 text-sm text-gray-600 font-medium bg-gray-50">
                {timeSlot}
              </div>
              
              {/* Day columns */}
              {weeklySchedule.map((day) => {
                const classSession = getClassForTimeSlot(day, timeSlot);
                
                const timeIndex = timeSlots.indexOf(timeSlot);
                const isStartingSlot = classSession && classSession.time === timeSlot;
                
                return (
                  <div key={`${timeSlot}-${day.day}`} className="border-r border-gray-200 p-2 min-h-[80px]">
                    {classSession && (
                      <div className={`${classSession.color} rounded-lg p-3 h-full ${!isStartingSlot ? 'opacity-75' : ''}`}>
                        {isStartingSlot ? (
                          <>
                            <div className="text-sm font-semibold text-gray-900 mb-1">
                              {classSession.subject}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                              <User size={12} />
                              <span>{classSession.teacher}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                              <MapPin size={12} />
                              <span>{classSession.room}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Clock size={12} />
                              <span>{classSession.duration}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-sm font-medium text-gray-700 text-center">
                            {classSession.subject}
                            <div className="text-xs text-gray-500 mt-1">continues...</div>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Classes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weeklySchedule[0].classes.map((classSession) => (
              <div key={classSession.id} className={`${classSession.color} rounded-lg p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{classSession.subject}</h4>
                  <span className="text-sm text-gray-600">{classSession.time}</span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{classSession.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{classSession.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{classSession.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}