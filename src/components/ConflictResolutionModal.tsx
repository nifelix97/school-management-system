import { AlertTriangle, ArrowRight, Clock, MapPin, Users, X } from 'lucide-react';
import React, { useState } from 'react';
import type { ConflictInfo, Instructor, TimetableEntry } from '../types/timetable';

interface ConflictResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  conflicts: ConflictInfo[];
  timetableEntries: TimetableEntry[];
  instructors: Instructor[];
  onResolveConflict: (entryId: string, updates: Partial<TimetableEntry>) => void;
}

const ConflictResolutionModal: React.FC<ConflictResolutionModalProps> = ({
  isOpen,
  onClose,
  conflicts,
  timetableEntries,
  instructors,
  onResolveConflict
}) => {
  const [selectedConflict, setSelectedConflict] = useState<ConflictInfo | null>(null);
  const [resolutionData, setResolutionData] = useState<{
    entryId: string;
    newDayOfWeek?: number;
    newStartTime?: string;
    newEndTime?: string;
    newInstructorId?: string;
    newRoom?: string;
    newBuilding?: string;
  }>({
    entryId: ''
  });

  const days = [
    { name: 'Monday', value: 1 },
    { name: 'Tuesday', value: 2 },
    { name: 'Wednesday', value: 3 },
    { name: 'Thursday', value: 4 },
    { name: 'Friday', value: 5 },
    { name: 'Saturday', value: 6 }
  ];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getConflictingEntries = (conflict: ConflictInfo) => {
    return timetableEntries.filter(entry => conflict.affectedEntries.includes(entry.id));
  };

  const handleResolveConflict = () => {
    if (!selectedConflict || !resolutionData.entryId) return;

    const updates: Partial<TimetableEntry> = {};
    if (resolutionData.newDayOfWeek) updates.dayOfWeek = resolutionData.newDayOfWeek;
    if (resolutionData.newStartTime) updates.startTime = resolutionData.newStartTime;
    if (resolutionData.newEndTime) updates.endTime = resolutionData.newEndTime;
    if (resolutionData.newInstructorId) {
      updates.instructorId = resolutionData.newInstructorId;
      const instructor = instructors.find(i => i.id === resolutionData.newInstructorId);
      if (instructor) updates.instructorName = instructor.name;
    }
    if (resolutionData.newRoom) updates.room = resolutionData.newRoom;
    if (resolutionData.newBuilding) updates.building = resolutionData.newBuilding;

    onResolveConflict(resolutionData.entryId, updates);
    setSelectedConflict(null);
    setResolutionData({ entryId: '' });
  };

  const getSuggestedTimeSlots = (entry: TimetableEntry) => {
    const suggestions = [];
    const currentDayOfWeek = entry.dayOfWeek;
    
    // Suggest different times on the same day
    for (const time of timeSlots) {
      const endTime = new Date(`2024-01-01 ${time}`);
      endTime.setHours(endTime.getHours() + 1.5); // Assume 1.5 hour duration
      
      const hasConflict = timetableEntries.some(other => 
        other.id !== entry.id && 
        other.dayOfWeek === currentDayOfWeek && 
        other.startTime === time
      );
      
      if (!hasConflict) {
        suggestions.push({
          dayOfWeek: currentDayOfWeek,
          startTime: time,
          endTime: endTime.toTimeString().slice(0, 5)
        });
      }
    }
    
    // Suggest different days
    for (const day of days) {
      if (day.value !== currentDayOfWeek) {
        const hasConflict = timetableEntries.some(other => 
          other.id !== entry.id && 
          other.dayOfWeek === day.value && 
          other.startTime === entry.startTime
        );
        
        if (!hasConflict) {
          suggestions.push({
            dayOfWeek: day.value,
            dayName: day.name,
            startTime: entry.startTime,
            endTime: entry.endTime
          });
        }
      }
    }
    
    return suggestions.slice(0, 3); // Return top 3 suggestions
  };

  const getDayName = (value: number) => {
    return days.find(d => d.value === value)?.name || 'Unknown';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            Conflict Resolution Center
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!selectedConflict ? (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Detected Conflicts ({conflicts.length})
              </h3>
              <div className="space-y-4">
                {conflicts.map((conflict, index) => (
                  <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-red-800 mb-2">{conflict.message}</h4>
                        <div className="space-y-2">
                          {getConflictingEntries(conflict).map((entry) => (
                            <div key={entry.id} className="bg-white rounded p-3 border border-red-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">{entry.courseName || entry.courseCode}</p>
                                  <p className="text-sm text-gray-600">
                                    {entry.instructorName} • {getDayName(entry.dayOfWeek)} {entry.startTime}-{entry.endTime}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {entry.room} {entry.building ? `(${entry.building})` : ''}
                                  </p>
                                </div>
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                  {entry.type}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedConflict(conflict)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setSelectedConflict(null)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ← Back to Conflicts
                </button>
                <h3 className="text-lg font-medium text-gray-900">
                  Resolving: {selectedConflict.message}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Conflicting Entries</h4>
                  <div className="space-y-3">
                    {getConflictingEntries(selectedConflict).map((entry) => (
                      <div 
                        key={entry.id} 
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          resolutionData.entryId === entry.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setResolutionData({ ...resolutionData, entryId: entry.id })}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{entry.courseName || entry.courseCode}</h5>
                          <input
                            type="radio"
                            checked={resolutionData.entryId === entry.id}
                            onChange={() => setResolutionData({ ...resolutionData, entryId: entry.id })}
                            className="text-blue-600"
                          />
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {entry.instructorName}
                          </p>
                          <p className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {getDayName(entry.dayOfWeek)} {entry.startTime}-{entry.endTime}
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {entry.room} {entry.building ? `(${entry.building})` : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Resolution Options</h4>
                  
                  {resolutionData.entryId && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Day
                        </label>
                        <select
                          value={resolutionData.newDayOfWeek || ''}
                          onChange={(e) => setResolutionData({ ...resolutionData, newDayOfWeek: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Keep current day</option>
                          {days.map((day) => (
                            <option key={day.value} value={day.value}>{day.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Start Time
                          </label>
                          <select
                            value={resolutionData.newStartTime || ''}
                            onChange={(e) => setResolutionData({ ...resolutionData, newStartTime: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Keep current time</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New End Time
                          </label>
                          <select
                            value={resolutionData.newEndTime || ''}
                            onChange={(e) => setResolutionData({ ...resolutionData, newEndTime: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Keep current time</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alternative Instructor
                        </label>
                        <select
                          value={resolutionData.newInstructorId || ''}
                          onChange={(e) => setResolutionData({ ...resolutionData, newInstructorId: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Keep current instructor</option>
                          {instructors.map((instructor) => (
                            <option key={instructor.id} value={instructor.id}>
                              {instructor.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alternative Building
                        </label>
                        <input
                          type="text"
                          value={resolutionData.newBuilding || ''}
                          onChange={(e) => setResolutionData({ ...resolutionData, newBuilding: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Block B"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alternative Room
                        </label>
                        <input
                          type="text"
                          value={resolutionData.newRoom || ''}
                          onChange={(e) => setResolutionData({ ...resolutionData, newRoom: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Room 102"
                        />
                      </div>

                      {/* Suggestions */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-medium text-blue-800 mb-2">Suggested Alternatives:</h5>
                        <div className="space-y-2">
                          {getSuggestedTimeSlots(
                            getConflictingEntries(selectedConflict).find(e => e.id === resolutionData.entryId)!
                          ).map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => setResolutionData({
                                ...resolutionData,
                                newDayOfWeek: suggestion.dayOfWeek,
                                newStartTime: suggestion.startTime,
                                newEndTime: suggestion.endTime
                              })}
                              className="w-full text-left p-2 bg-white border border-blue-200 rounded hover:bg-blue-50 text-sm"
                            >
                              <div className="flex items-center justify-between">
                                <span>{getDayName(suggestion.dayOfWeek)} {suggestion.startTime}-{suggestion.endTime}</span>
                                <ArrowRight className="w-4 h-4 text-blue-600" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => setSelectedConflict(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResolveConflict}
                  disabled={!resolutionData.entryId}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply Resolution
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConflictResolutionModal;