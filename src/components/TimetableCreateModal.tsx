import React, { useState } from 'react';
import { X, Clock, MapPin, User, Calendar } from 'lucide-react';
import type { TimetableEntry, Instructor } from '../types/timetable';

interface TimetableCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: Omit<TimetableEntry, 'id'>) => void;
  instructors: Instructor[];
}

const TimetableCreateModal: React.FC<TimetableCreateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  instructors
}) => {
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    instructorId: '',
    day: 'Monday',
    startTime: '',
    endTime: '',
    classroom: '',
    virtualLink: '',
    semester: 'Fall 2024',
    level: '1st Year',
    isVirtual: false
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const levels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesters = ['Fall 2024', 'Spring 2024', 'Summer 2024'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedInstructor = instructors.find(i => i.id === formData.instructorId);
    
    const newEntry: Omit<TimetableEntry, 'id'> = {
      courseId: formData.courseId,
      courseName: formData.courseName,
      instructorId: formData.instructorId,
      instructorName: selectedInstructor?.name || '',
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      classroom: formData.isVirtual ? undefined : formData.classroom,
      virtualLink: formData.isVirtual ? formData.virtualLink : undefined,
      semester: formData.semester,
      level: formData.level,
      status: 'pending'
    };

    onSave(newEntry);
    onClose();
    
    // Reset form
    setFormData({
      courseId: '',
      courseName: '',
      instructorId: '',
      day: 'Monday',
      startTime: '',
      endTime: '',
      classroom: '',
      virtualLink: '',
      semester: 'Fall 2024',
      level: '1st Year',
      isVirtual: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-2 xs:p-4 shadow-lg shadow-primary-50 text-primary-50">
      <div className="bg-white rounded-2xl w-full max-w-xs xs:max-w-sm sm:max-w-2xl max-h-[90vh] overflow-y-auto font-comfortaa shadow-lg shadow-primary-50">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-primary-300/20">
          <h2 className="text-lg sm:text-xl font-semibold text-primary-50">
            Create New Timetable Entry
          </h2>
          <button
            onClick={onClose}
            className="text-primary-300 hover:text-primary-50"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 sm:space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-primary-50 mb-2">
                Course ID
              </label>
              <input
                type="text"
                required
                value={formData.courseId}
                onChange={(e) =>
                  setFormData({ ...formData, courseId: e.target.value })
                }
                className="w-full px-3 py-2 border border-primary-300/30 rounded-lg  text-sm"
                placeholder="e.g., CS101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Course Name
              </label>
              <input
                type="text"
                required
                value={formData.courseName}
                onChange={(e) =>
                  setFormData({ ...formData, courseName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg "
                placeholder="e.g., Introduction to Programming"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Teacher
              </label>
              <select
                required
                value={formData.instructorId}
                onChange={(e) =>
                  setFormData({ ...formData, instructorId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg "
              >
                <option value="">Select Teacher</option>
                {instructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Day
              </label>
              <select
                value={formData.day}
                onChange={(e) =>
                  setFormData({ ...formData, day: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Start Time
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                End Time
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Level/Year
              </label>
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isVirtual"
                checked={formData.isVirtual}
                onChange={(e) =>
                  setFormData({ ...formData, isVirtual: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-primary-50 rounded"
              />
              <label
                htmlFor="isVirtual"
                className="ml-2 block text-sm text-primary-50"
              >
                Virtual/Online Class
              </label>
            </div>

            {formData.isVirtual ? (
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Virtual Meeting Link
                </label>
                <input
                  type="url"
                  value={formData.virtualLink}
                  onChange={(e) =>
                    setFormData({ ...formData, virtualLink: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-primary-50 rounded-lg"
                  placeholder="https://zoom.us/j/..."
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Classroom
                </label>
                <input
                  type="text"
                  value={formData.classroom}
                  onChange={(e) =>
                    setFormData({ ...formData, classroom: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Room 101, Lab A"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-primary-50 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Timetable Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimetableCreateModal;