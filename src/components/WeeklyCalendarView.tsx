import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { TimetableEntry } from '../types/timetable';

interface WeeklyCalendarViewProps {
  entries: TimetableEntry[];
  onEntryClick: (entry: TimetableEntry) => void;
}

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({ entries, onEntryClick }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getEntriesForDayAndTime = (day: string, time: string) => {
    return entries.filter(entry => {
      const entryStart = new Date(`2024-01-01 ${entry.startTime}`);
      const entryEnd = new Date(`2024-01-01 ${entry.endTime}`);
      const slotTime = new Date(`2024-01-01 ${time}`);
      
      return entry.day === day && slotTime >= entryStart && slotTime < entryEnd;
    });
  };

  const getEntryColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'conflict':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden font-comfortaa">
      <div className="p-3 xs:p-4 sm:p-6 border-b border-primary-300/20">
        <h3 className="text-base xs:text-lg font-semibold text-primary-50">Weekly Schedule View</h3>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-7 border-b border-primary-300/20">
            <div className="p-2 xs:p-3 bg-primary-300/10 border-r border-primary-300/20">
              <span className="text-xs xs:text-sm font-medium text-primary-300">Time</span>
            </div>
            {days.map((day) => (
              <div key={day} className="p-2 xs:p-3 bg-primary-300/10 border-r border-primary-300/20 last:border-r-0">
                <span className="text-xs xs:text-sm font-medium text-primary-50">
                  <span className="xs:hidden">{day.slice(0, 3)}</span>
                  <span className="hidden xs:inline sm:hidden">{day.slice(0, 4)}</span>
                  <span className="hidden sm:inline">{day}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Time slots */}
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-7 border-b border-gray-200 min-h-[60px] xs:min-h-[80px]">
              <div className="p-2 xs:p-3 bg-gray-50 border-r border-gray-200 flex items-start">
                <span className="text-xs xs:text-sm text-gray-600">{time}</span>
              </div>
              
              {days.map((day) => {
                const dayEntries = getEntriesForDayAndTime(day, time);
                
                return (
                  <div key={`${day}-${time}`} className="p-1 xs:p-2 border-r border-gray-200 last:border-r-0 relative">
                    {dayEntries.map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => onEntryClick(entry)}
                        className={`
                          p-1 xs:p-2 rounded-md border-2 cursor-pointer hover:shadow-md transition-shadow mb-1
                          ${getEntryColor(entry.status)}
                        `}
                      >
                        <div className="text-xs font-medium mb-1 truncate">
                          {entry.courseName}
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="hidden xs:inline">{entry.startTime}-{entry.endTime}</span>
                            <span className="xs:hidden">{entry.startTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span className="truncate">{entry.instructorName}</span>
                          </div>
                          {entry.classroom && (
                            <div className="flex items-center gap-1 hidden xs:flex">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{entry.classroom}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-xs mt-1 hidden xs:block">
                          <span className="bg-white bg-opacity-50 px-1 rounded">
                            {entry.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="p-3 xs:p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-3 xs:gap-6 text-xs xs:text-sm">
          <div className="flex items-center gap-1 xs:gap-2">
            <div className="w-3 h-3 xs:w-4 xs:h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1 xs:gap-2">
            <div className="w-3 h-3 xs:w-4 xs:h-4 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-1 xs:gap-2">
            <div className="w-3 h-3 xs:w-4 xs:h-4 bg-red-100 border-2 border-red-300 rounded"></div>
            <span>Conflict</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendarView;