import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Users, BookOpen, Clock } from 'lucide-react';
import type { TimetableEntry, ExamEntry, Instructor } from '../types/timetable';

interface ReportsAnalyticsProps {
  timetableEntries: TimetableEntry[];
  examEntries: ExamEntry[];
  instructors: Instructor[];
}

const ReportsAnalytics: React.FC<ReportsAnalyticsProps> = ({
  timetableEntries,
  examEntries,
  instructors
}) => {
  const [selectedReport, setSelectedReport] = useState<'overview' | 'teachers' | 'utilization' | 'conflicts'>('overview');

  // Analytics calculations
  const getInstructorWorkload = () => {
    const workload = instructors.map(instructor => {
      const classes = timetableEntries.filter(entry => entry.instructorId === instructor.id);
      const exams = examEntries.filter(entry => entry.invigilatorId === instructor.id);
      
      return {
        name: instructor.name,
        classes: classes.length,
        exams: exams.length,
        totalHours: classes.reduce((total, entry) => {
          const start = new Date(`2024-01-01 ${entry.startTime}`);
          const end = new Date(`2024-01-01 ${entry.endTime}`);
          return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        }, 0)
      };
    });
    
    return workload.sort((a, b) => b.totalHours - a.totalHours);
  };

  const getRoomUtilization = () => {
    const roomUsage = new Map<string, number>();
    
    timetableEntries.forEach(entry => {
      if (entry.classroom) {
        roomUsage.set(entry.classroom, (roomUsage.get(entry.classroom) || 0) + 1);
      }
    });
    
    return Array.from(roomUsage.entries())
      .map(([room, usage]) => ({ room, usage }))
      .sort((a, b) => b.usage - a.usage);
  };

  const getTimeSlotDistribution = () => {
    const timeSlots = new Map<string, number>();
    
    timetableEntries.forEach(entry => {
      const hour = entry.startTime.split(':')[0];
      const timeSlot = `${hour}:00`;
      timeSlots.set(timeSlot, (timeSlots.get(timeSlot) || 0) + 1);
    });
    
    return Array.from(timeSlots.entries())
      .map(([time, count]) => ({ time, count }))
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const getDayDistribution = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days.map(day => ({
      day,
      classes: timetableEntries.filter(entry => entry.day === day).length,
      exams: examEntries.filter(entry => {
        const examDay = new Date(entry.examDate).toLocaleDateString('en-US', { weekday: 'long' });
        return examDay === day;
      }).length
    }));
  };

  const getConflictAnalysis = () => {
    const conflicts = {
      timeOverlaps: 0,
      instructorConflicts: 0,
      roomConflicts: 0
    };
    
    // Check for time overlaps
    timetableEntries.forEach((entry1, index1) => {
      timetableEntries.forEach((entry2, index2) => {
        if (index1 !== index2 && entry1.day === entry2.day) {
          const start1 = new Date(`2024-01-01 ${entry1.startTime}`);
          const end1 = new Date(`2024-01-01 ${entry1.endTime}`);
          const start2 = new Date(`2024-01-01 ${entry2.startTime}`);
          const end2 = new Date(`2024-01-01 ${entry2.endTime}`);
          
          if (start1 < end2 && end1 > start2) {
            conflicts.timeOverlaps++;
          }
        }
      });
    });
    
    return conflicts;
  };

  const instructorWorkload = getInstructorWorkload();
  const roomUtilization = getRoomUtilization();
  const timeSlotDistribution = getTimeSlotDistribution();
  const dayDistribution = getDayDistribution();
  const conflictAnalysis = getConflictAnalysis();

  const exportReport = (format: 'pdf' | 'excel') => {
    // Mock export functionality
    alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="bg-white rounded-lg xs:rounded-xl shadow-sm font-comfortaa mt-8 mb-8">
      <div className="p-3 xs:p-4 sm:p-6 border-b border-primary-300/20">
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-4">
          <h2 className="text-base xs:text-lg sm:text-xl font-semibold text-primary-50 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 xs:w-6 xs:h-6" />
            Reports & Analytics
          </h2>
          <div className="flex flex-col xs:flex-row gap-2 w-full xs:w-auto">
            <button
              onClick={() => exportReport('pdf')}
              className="bg-primary-50 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 text-xs xs:text-sm justify-center"
            >
              <Download className="w-3 h-3 xs:w-4 xs:h-4" />
              PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="bg-primary-50 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-xs xs:text-sm justify-center"
            >
              <Download className="w-3 h-3 xs:w-4 xs:h-4" />
              Excel
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 xs:p-4 sm:p-6">
        {/* Report Type Selector */}
        <div className="flex flex-wrap gap-1 mb-4 xs:mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setSelectedReport('overview')}
            className={`px-2 xs:px-3 sm:px-4 py-2 rounded-md font-medium transition-colors text-xs xs:text-sm ${
              selectedReport === 'overview' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-primary-50 hover:text-primary-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedReport('teachers')}
            className={`px-2 xs:px-3 sm:px-4 py-2 rounded-md font-medium transition-colors text-xs xs:text-sm ${
              selectedReport === 'teachers' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-primary-50 hover:text-primary-100'
            }`}
          >
            Teachers
          </button>
          <button
            onClick={() => setSelectedReport('utilization')}
            className={`px-2 xs:px-3 sm:px-4 py-2 rounded-md font-medium transition-colors text-xs xs:text-sm ${
              selectedReport === 'utilization' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-primary-50 hover:text-primary-100'
            }`}
          >
            Utilization
          </button>
          <button
            onClick={() => setSelectedReport('conflicts')}
            className={`px-2 xs:px-3 sm:px-4 py-2 rounded-md font-medium transition-colors text-xs xs:text-sm ${
              selectedReport === 'conflicts' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-primary-50 hover:text-primary-100'
            }`}
          >
            Conflicts
          </button>
        </div>

        {/* Report Content */}
        {selectedReport === 'overview' && (
          <div className="space-y-4 xs:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
              <div className="bg-blue-50 rounded-lg p-3 xs:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs xs:text-sm font-medium text-blue-600">Total Classes</p>
                    <p className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-900">{timetableEntries.length}</p>
                  </div>
                  <Calendar className="w-6 h-6 xs:w-8 xs:h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Scheduled Exams</p>
                    <p className="text-2xl font-bold text-green-900">{examEntries.length}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Active Teachers</p>
                    <p className="text-2xl font-bold text-yellow-900">{instructors.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Avg. Class Duration</p>
                    <p className="text-2xl font-bold text-purple-900">1.5h</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Day Distribution Chart */}
            <div className="bg-gray-50 rounded-lg p-3 xs:p-4 sm:p-6">
              <h3 className="text-base xs:text-lg font-semibold text-gray-900 mb-3 xs:mb-4">Weekly Distribution</h3>
              <div className="space-y-2 xs:space-y-3">
                {dayDistribution.map((day) => (
                  <div key={day.day} className="flex items-center gap-2 xs:gap-4">
                    <div className="w-16 xs:w-20 text-xs xs:text-sm font-medium text-gray-700">
                      <span className="xs:hidden">{day.day.slice(0, 3)}</span>
                      <span className="hidden xs:inline">{day.day}</span>
                    </div>
                    <div className="flex-1 flex gap-1 xs:gap-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="bg-blue-500 h-6 rounded flex items-center justify-center text-white text-xs font-medium"
                          style={{ width: `${Math.max(day.classes * 20, 20)}px` }}
                        >
                          {day.classes}
                        </div>
                        <span className="text-xs text-gray-600">Classes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="bg-green-500 h-6 rounded flex items-center justify-center text-white text-xs font-medium"
                          style={{ width: `${Math.max(day.exams * 20, 20)}px` }}
                        >
                          {day.exams}
                        </div>
                        <span className="text-xs text-gray-600">Exams</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'teachers' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary-50">Instructor Workload Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-primary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">Teachers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">Classes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">Exams</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">Total Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-50 uppercase">Workload</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {instructorWorkload.map((instructor) => (
                    <tr key={instructor.name}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-50">
                        {instructor.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-50">
                        {instructor.classes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-50">
                        {instructor.exams}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-50">
                        {instructor.totalHours.toFixed(1)}h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                instructor.totalHours > 20 ? 'bg-red-500' :
                                instructor.totalHours > 15 ? 'bg-primary-100' : 'bg-primary-300'
                              }`}
                              style={{ width: `${Math.min((instructor.totalHours / 25) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-medium ${
                            instructor.totalHours > 20 ? 'text-red-600' :
                            instructor.totalHours > 15 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {instructor.totalHours > 20 ? 'High' :
                             instructor.totalHours > 15 ? 'Medium' : 'Low'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedReport === 'utilization' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Room Utilization */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Utilization</h3>
                <div className="space-y-3">
                  {roomUtilization.slice(0, 5).map((room) => (
                    <div key={room.room} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{room.room}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(room.usage / Math.max(...roomUtilization.map(r => r.usage))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{room.usage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slot Distribution */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h3>
                <div className="space-y-3">
                  {timeSlotDistribution.slice(0, 5).map((slot) => (
                    <div key={slot.time} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{slot.time}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(slot.count / Math.max(...timeSlotDistribution.map(s => s.count))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{slot.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'conflicts' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Conflict Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{conflictAnalysis.timeOverlaps}</div>
                <div className="text-sm font-medium text-red-800">Time Overlaps</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{conflictAnalysis.instructorConflicts}</div>
                <div className="text-sm font-medium text-yellow-800">Instructor Conflicts</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{conflictAnalysis.roomConflicts}</div>
                <div className="text-sm font-medium text-orange-800">Room Conflicts</div>
              </div>
            </div>
            
            {conflictAnalysis.timeOverlaps > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2">Recommendations:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Review overlapping time slots and reschedule conflicting classes</li>
                  <li>• Consider alternative time slots during off-peak hours</li>
                  <li>• Implement buffer time between consecutive classes</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsAnalytics;