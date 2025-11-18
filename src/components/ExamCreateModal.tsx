import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Monitor } from 'lucide-react';
import { ExamEntry, Instructor } from '../types/timetable';

interface ExamCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: Omit<ExamEntry, 'id'>) => void;
  instructors: Instructor[];
}

const ExamCreateModal: React.FC<ExamCreateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  instructors
}) => {
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    examDate: '',
    startTime: '',
    endTime: '',
    venue: '',
    isOnline: false,
    invigilatorId: '',
    semester: 'Fall 2024',
    level: '1st Year'
  });

  const levels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesters = ['Fall 2024', 'Spring 2024', 'Summer 2024'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedInvigilator = instructors.find(i => i.id === formData.invigilatorId);
    
    const newEntry: Omit<ExamEntry, 'id'> = {
      courseId: formData.courseId,
      courseName: formData.courseName,
      examDate: formData.examDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      venue: formData.venue,
      isOnline: formData.isOnline,
      invigilatorId: formData.invigilatorId || undefined,
      invigilatorName: selectedInvigilator?.name || undefined,
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
      examDate: '',
      startTime: '',
      endTime: '',
      venue: '',
      isOnline: false,
      invigilatorId: '',
      semester: 'Fall 2024',
      level: '1st Year'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 xs:p-4">
      <div className="bg-white rounded-lg w-full max-w-xs xs:max-w-sm sm:max-w-2xl max-h-[90vh] overflow-y-auto font-comfortaa">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-primary-300/20">
          <h2 className="text-lg sm:text-xl font-semibold text-primary-50">Schedule New Exam</h2>
          <button
            onClick={onClose}
            className="text-primary-300 hover:text-primary-50"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course ID
              </label>
              <input
                type="text"
                required
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., CS101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Name
              </label>
              <input
                type="text"
                required
                value={formData.courseName}
                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Introduction to Programming"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Exam Date
              </label>
              <input
                type="date"
                required
                value={formData.examDate}
                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Start Time
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                End Time
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {semesters.map((semester) => (
                  <option key={semester} value={semester}>{semester}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level/Year
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Invigilator (Optional)
              </label>
              <select
                value={formData.invigilatorId}
                onChange={(e) => setFormData({ ...formData, invigilatorId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Invigilator</option>
                {instructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isOnline"
                checked={formData.isOnline}
                onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isOnline" className="ml-2 block text-sm text-gray-900">
                <Monitor className="w-4 h-4 inline mr-1" />
                Online Exam
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                {formData.isOnline ? 'Online Platform/Link' : 'Exam Venue'}
              </label>
              <input
                type="text"
                required
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={formData.isOnline ? "e.g., Zoom, Google Meet, LMS" : "e.g., Exam Hall A, Room 201"}
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Exam Scheduling Guidelines:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Ensure minimum 2-hour gap between consecutive exams</li>
              <li>• Check for conflicts with other department exams</li>
              <li>• Verify venue availability before scheduling</li>
              <li>• Assign invigilators at least 1 week in advance</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamCreateModal;