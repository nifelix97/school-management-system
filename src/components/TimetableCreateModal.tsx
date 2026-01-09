import { Calendar, Clock, User, X } from 'lucide-react';
import React from 'react';
import type { Class } from '../types/class';
import type { Teacher } from '../types/course';
import type { Department } from '../types/department';
import type {
    CreateTimetableEntryDto,
    TimetableEntry
} from '../types/timetable';

interface TimetableCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: CreateTimetableEntryDto) => void;
  teachers: Teacher[];
  departments: Department[];
  classes: Class[];
  courses: Array<{ id: string; title: string; code: string }>;
  initialData?: Partial<TimetableEntry> | null;
}

const TimetableCreateModal: React.FC<TimetableCreateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  teachers,
  departments,
  classes,
  courses,
  initialData
}) => {
  const [formData, setFormData] = React.useState({
    courseId: '',
    instructorId: '',
    departmentId: '',
    classCohortId: '',
    academicYear: '2024/2025',
    semester: 'First' as const,
    dayOfWeek: 1,
    startTime: '',
    endTime: '',
    room: '',
    building: '',
    type: 'Lecture',
    isRecurring: true,
    effectiveFrom: '',
    effectiveTo: '',
    notes: ''
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        courseId: initialData.courseId || '',
        instructorId: initialData.instructorId || '',
        departmentId: initialData.departmentId || '',
        classCohortId: initialData.classCohortId || '',
        academicYear: initialData.academicYear || '2024/2025',
        semester: (initialData.semester as any) || 'First',
        dayOfWeek: initialData.dayOfWeek || 1,
        startTime: initialData.startTime || '',
        endTime: initialData.endTime || '',
        room: initialData.room || '',
        building: initialData.building || '',
        type: initialData.type || 'Lecture',
        isRecurring: initialData.isRecurring !== undefined ? initialData.isRecurring : true,
        effectiveFrom: initialData.effectiveFrom || '',
        effectiveTo: initialData.effectiveTo || '',
        notes: initialData.notes || ''
      });
    } else {
      setFormData({
        courseId: '',
        instructorId: '',
        departmentId: '',
        classCohortId: '',
        academicYear: '2024/2025',
        semester: 'First',
        dayOfWeek: 1,
        startTime: '',
        endTime: '',
        room: '',
        building: '',
        type: 'Lecture',
        isRecurring: true,
        effectiveFrom: '',
        effectiveTo: '',
        notes: ''
      });
    }
  }, [initialData, isOpen]);

  const days = [
    { name: 'Monday', value: 1 },
    { name: 'Tuesday', value: 2 },
    { name: 'Wednesday', value: 3 },
    { name: 'Thursday', value: 4 },
    { name: 'Friday', value: 5 },
    { name: 'Saturday', value: 6 }
  ];
  
  const semesters = ['First', 'Second', 'Summer'] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: CreateTimetableEntryDto = {
      ...formData,
      isRecurring: formData.isRecurring
    };

    onSave(newEntry);
    onClose();
    
    // Reset form
    setFormData({
      courseId: '',
      instructorId: '',
      departmentId: '',
      classCohortId: '',
      academicYear: '2024/2025',
      semester: 'First',
      dayOfWeek: 1,
      startTime: '',
      endTime: '',
      room: '',
      building: '',
      type: 'Lecture',
      isRecurring: true,
      effectiveFrom: '',
      effectiveTo: '',
      notes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-2 xs:p-4 shadow-lg shadow-primary-50 text-primary-50">
      <div className="bg-white rounded-2xl w-full max-w-xs xs:max-w-sm sm:max-w-2xl max-h-[90vh] overflow-y-auto font-comfortaa shadow-lg shadow-primary-50">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-primary-300/20">
          <h2 className="text-lg sm:text-xl font-semibold text-primary-50">
            {initialData ? 'Edit' : 'Create New'} Timetable Entry
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
                Department
              </label>
              <select
                required
                value={formData.departmentId}
                onChange={(e) =>
                  setFormData({ ...formData, departmentId: e.target.value })
                }
                className="w-full px-3 py-2 border border-primary-300/30 rounded-lg text-sm"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Course
              </label>
              <select
                required
                value={formData.courseId}
                onChange={(e) =>
                  setFormData({ ...formData, courseId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Class Cohort
              </label>
              <select
                required
                value={formData.classCohortId}
                onChange={(e) =>
                  setFormData({ ...formData, classCohortId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Select Class</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Academic Year
              </label>
              <input
                type="text"
                required
                value={formData.academicYear}
                onChange={(e) =>
                  setFormData({ ...formData, academicYear: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="e.g., 2024/2025"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value as any })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                <Calendar className="w-4 h-4 inline mr-1" />
                Day of Week
              </label>
              <select
                value={formData.dayOfWeek}
                onChange={(e) =>
                  setFormData({ ...formData, dayOfWeek: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {days.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="Lecture">Lecture</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Lab">Lab</option>
                <option value="Seminar">Seminar</option>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Building
              </label>
              <input
                type="text"
                value={formData.building}
                onChange={(e) =>
                  setFormData({ ...formData, building: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="e.g., Engineering Block"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Room
              </label>
              <input
                type="text"
                value={formData.room}
                onChange={(e) =>
                  setFormData({ ...formData, room: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="e.g., Room 101"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isRecurring"
                checked={formData.isRecurring}
                onChange={(e) =>
                  setFormData({ ...formData, isRecurring: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-primary-50 rounded"
              />
              <label
                htmlFor="isRecurring"
                className="ml-2 block text-sm text-primary-50"
              >
                Recurring Weekly
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Effective From
                </label>
                <input
                  type="date"
                  value={formData.effectiveFrom}
                  onChange={(e) =>
                    setFormData({ ...formData, effectiveFrom: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-50 mb-2">
                  Effective To
                </label>
                <input
                  type="date"
                  value={formData.effectiveTo}
                  onChange={(e) =>
                    setFormData({ ...formData, effectiveTo: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                rows={2}
                placeholder="Additional details..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-primary-50 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              {initialData ? 'Save Changes' : 'Create Timetable Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimetableCreateModal;