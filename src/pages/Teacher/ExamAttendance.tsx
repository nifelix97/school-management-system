import { useState } from "react";
import {
  ChevronLeft,
  Search,
  Save,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  studentId: string;
  email: string;
}

interface Exam {
  id: number;
  name: string;
  date: string;
  time: string;
  duration: number;
  room: string;
}

interface Attendance {
  studentId: number;
  examId: number;
  status: "present" | "absent" | "late" | "excused";
  arrivalTime?: string;
  notes?: string;
}

interface Course {
  id: number;
  name: string;
  code: string;
  students: Student[];
  exams: Exam[];
}

export default function ExamAttendance() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const courses: Course[] = [
    {
      id: 1,
      name: "Advanced Mathematics",
      code: "MATH 301",
      students: [
        { id: 1, name: "John Smith", studentId: "STU001", email: "john.smith@school.edu" },
        { id: 2, name: "Emma Wilson", studentId: "STU002", email: "emma.wilson@school.edu" },
        { id: 3, name: "Michael Brown", studentId: "STU003", email: "michael.brown@school.edu" },
        { id: 4, name: "Sarah Davis", studentId: "STU004", email: "sarah.davis@school.edu" },
        { id: 5, name: "David Johnson", studentId: "STU005", email: "david.johnson@school.edu" },
      ],
      exams: [
        { id: 1, name: "Midterm Exam", date: "2025-02-15", time: "09:00", duration: 120, room: "Room 101" },
        { id: 2, name: "Final Exam", date: "2025-05-20", time: "14:00", duration: 180, room: "Room 205" },
      ]
    },
    {
      id: 2,
      name: "Physics Laboratory",
      code: "PHYS 201",
      students: [
        { id: 6, name: "Lisa Garcia", studentId: "STU006", email: "lisa.garcia@school.edu" },
        { id: 7, name: "James Miller", studentId: "STU007", email: "james.miller@school.edu" },
        { id: 8, name: "Anna Taylor", studentId: "STU008", email: "anna.taylor@school.edu" },
      ],
      exams: [
        { id: 3, name: "Practical Exam", date: "2025-03-10", time: "10:00", duration: 90, room: "Lab 301" },
      ]
    }
  ];

  const getAttendance = (studentId: number, examId: number) => {
    return attendance.find(a => a.studentId === studentId && a.examId === examId);
  };

  const updateAttendance = (studentId: number, examId: number, status: Attendance["status"], notes?: string) => {
    setAttendance(prev => {
      const existing = prev.find(a => a.studentId === studentId && a.examId === examId);
      const arrivalTime = status === "present" || status === "late" ? new Date().toLocaleTimeString() : undefined;
      
      if (existing) {
        return prev.map(a => 
          a.studentId === studentId && a.examId === examId
            ? { ...a, status, arrivalTime, notes }
            : a
        );
      }
      return [...prev, { studentId, examId, status, arrivalTime, notes }];
    });
  };

  const getStatusColor = (status: Attendance["status"]) => {
    switch (status) {
      case "present": return "text-green-600 bg-green-50 border-green-200";
      case "late": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "absent": return "text-red-600 bg-red-50 border-red-200";
      case "excused": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: Attendance["status"]) => {
    switch (status) {
      case "present": return <CheckCircle size={16} className="text-green-600" />;
      case "late": return <AlertCircle size={16} className="text-yellow-600" />;
      case "absent": return <XCircle size={16} className="text-red-600" />;
      case "excused": return <CheckCircle size={16} className="text-blue-600" />;
      default: return null;
    }
  };

  const getAttendanceStats = () => {
    if (!selectedExam || !selectedCourse) return { present: 0, absent: 0, late: 0, excused: 0, total: 0 };
    
    const stats = { present: 0, absent: 0, late: 0, excused: 0, total: selectedCourse.students.length };
    
    selectedCourse.students.forEach(student => {
      const att = getAttendance(student.id, selectedExam.id);
      if (att) {
        stats[att.status]++;
      }
    });
    
    return stats;
  };

  const filteredStudents = selectedCourse?.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (selectedCourse && selectedExam) {
    const stats = getAttendanceStats();
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          <button
            onClick={() => setSelectedExam(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
          >
            <ChevronLeft size={18} className="xs:w-5 xs:h-5" />
            <span>Back to Exams</span>
          </button>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 xs:gap-4 mb-4">
              <div>
                <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
                  {selectedExam.name} - Attendance
                </h1>
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-xs xs:text-sm text-primary-50">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {selectedExam.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {selectedExam.time} ({selectedExam.duration} min)
                  </span>
                  <span>{selectedExam.room}</span>
                </div>
              </div>
              <div className="flex flex-col xs:flex-row gap-2">
                <div className="relative flex-1 xs:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={16} />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full xs:w-auto pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                  />
                </div>
                <button className="px-3 xs:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-opacity-80 flex items-center justify-center gap-2 text-xs xs:text-sm"
                  onClick={() => {
                    console.log("Saving attendance:", attendance);
                    alert("Attendance saved successfully!");
                  }}
                >
                  <Save size={14} />
                  Save
                </button>
                <button className="px-3 xs:px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 flex items-center justify-center gap-2 text-xs xs:text-sm">
                  <Download size={14} />
                  Export
                </button>
              </div>
            </div>

            {/* Attendance Stats */}
            <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 xs:gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 xs:p-3 text-center">
                <div className="text-lg xs:text-xl font-bold text-green-600">{stats.present}</div>
                <div className="text-xs xs:text-sm text-green-600">Present</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 xs:p-3 text-center">
                <div className="text-lg xs:text-xl font-bold text-red-600">{stats.absent}</div>
                <div className="text-xs xs:text-sm text-red-600">Absent</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 xs:p-3 text-center">
                <div className="text-lg xs:text-xl font-bold text-yellow-600">{stats.late}</div>
                <div className="text-xs xs:text-sm text-yellow-600">Late</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 xs:p-3 text-center">
                <div className="text-lg xs:text-xl font-bold text-blue-600">{stats.excused}</div>
                <div className="text-xs xs:text-sm text-blue-600">Excused</div>
              </div>
            </div>
          </div>

          {/* Mobile Card Layout */}
          <div className="lg:hidden space-y-3 xs:space-y-4">
            {filteredStudents.map((student) => {
              const att = getAttendance(student.id, selectedExam.id);
              
              return (
                <div key={student.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-primary-50 text-sm xs:text-base">{student.name}</h3>
                      <p className="text-xs xs:text-sm text-primary-50/60">{student.studentId}</p>
                    </div>
                    {att && (
                      <div className={`flex items-center gap-2 px-2 xs:px-3 py-1 rounded-lg border text-xs xs:text-sm font-medium ${getStatusColor(att.status)}`}>
                        {getStatusIcon(att.status)}
                        <span className="capitalize">{att.status}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
                    <button
                      onClick={() => updateAttendance(student.id, selectedExam.id, "present")}
                      className={`px-2 xs:px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                        att?.status === "present" 
                          ? "bg-green-600 text-white" 
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                      title="Present"
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => updateAttendance(student.id, selectedExam.id, "late")}
                      className={`px-2 xs:px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                        att?.status === "late" 
                          ? "bg-yellow-600 text-white" 
                          : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                      }`}
                      title="Late"
                    >
                      <AlertCircle size={16} />
                    </button>
                    <button
                      onClick={() => updateAttendance(student.id, selectedExam.id, "absent")}
                      className={`px-2 xs:px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                        att?.status === "absent" 
                          ? "bg-red-600 text-white" 
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                      title="Absent"
                    >
                      <XCircle size={16} />
                    </button>
                    <button
                      onClick={() => updateAttendance(student.id, selectedExam.id, "excused")}
                      className={`px-2 xs:px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                        att?.status === "excused" 
                          ? "bg-blue-600 text-white" 
                          : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      }`}
                      title="Excused"
                    >
                      <CheckCircle size={16} />
                    </button>
                  </div>
                  
                  {att?.arrivalTime && (
                    <div className="mt-2 text-xs text-primary-50/60">
                      Arrival: {att.arrivalTime}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Student</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Arrival Time</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  const att = getAttendance(student.id, selectedExam.id);
                  
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-primary-50">{student.name}</div>
                          <div className="text-sm text-primary-50/60">{student.studentId}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {att ? (
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-medium ${getStatusColor(att.status)}`}>
                            {getStatusIcon(att.status)}
                            <span className="capitalize">{att.status}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Not marked</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-primary-50">
                        {att?.arrivalTime || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => updateAttendance(student.id, selectedExam.id, "present")}
                            className={`px-3 py-1 rounded font-medium transition-colors flex items-center justify-center ${
                              att?.status === "present" 
                                ? "bg-green-600 text-white" 
                                : "bg-green-50 text-green-600 hover:bg-green-100"
                            }`}
                            title="Present"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => updateAttendance(student.id, selectedExam.id, "late")}
                            className={`px-3 py-1 rounded font-medium transition-colors flex items-center justify-center ${
                              att?.status === "late" 
                                ? "bg-yellow-600 text-white" 
                                : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                            }`}
                            title="Late"
                          >
                            <AlertCircle size={16} />
                          </button>
                          <button
                            onClick={() => updateAttendance(student.id, selectedExam.id, "absent")}
                            className={`px-3 py-1 rounded font-medium transition-colors flex items-center justify-center ${
                              att?.status === "absent" 
                                ? "bg-red-600 text-white" 
                                : "bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                            title="Absent"
                          >
                            <XCircle size={16} />
                          </button>
                          <button
                            onClick={() => updateAttendance(student.id, selectedExam.id, "excused")}
                            className={`px-3 py-1 rounded font-medium transition-colors flex items-center justify-center ${
                              att?.status === "excused" 
                                ? "bg-blue-600 text-white" 
                                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                            }`}
                            title="Excused"
                          >
                            <CheckCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>


        </div>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
          >
            <ChevronLeft size={18} className="xs:w-5 xs:h-5" />
            <span>Back to Courses</span>
          </button>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
            <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
              {selectedCourse.name} - Exams
            </h1>
            <div className="flex items-center gap-4 text-xs xs:text-sm text-primary-50">
              <span>{selectedCourse.code}</span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                {selectedCourse.students.length} students
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
            {selectedCourse.exams.map((exam) => (
              <div
                key={exam.id}
                onClick={() => setSelectedExam(exam)}
                className="bg-white rounded-lg xs:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-3 xs:p-4 sm:p-6"
              >
                <h3 className="font-semibold text-primary-50 mb-2 text-sm xs:text-base">{exam.name}</h3>
                <div className="space-y-1 xs:space-y-2 text-xs xs:text-sm text-primary-50">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{exam.time} ({exam.duration} minutes)</span>
                  </div>
                  <div className="text-primary-50/60">{exam.room}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-3 xs:mb-4"
        >
          <ChevronLeft size={18} className="xs:w-5 xs:h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-4 xs:mb-6">
          Exam Attendance
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="bg-white rounded-lg xs:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-3 xs:p-4 sm:p-6"
            >
              <h3 className="font-semibold text-primary-50 mb-2 text-sm xs:text-base">{course.name}</h3>
              <p className="text-xs xs:text-sm text-primary-50 mb-3 xs:mb-4">{course.code}</p>
              
              <div className="flex items-center justify-between text-xs xs:text-sm text-primary-50">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{course.students.length} students</span>
                </div>
                <span>{course.exams.length} exams</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}