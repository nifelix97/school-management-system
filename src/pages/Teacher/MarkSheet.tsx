import { useState } from "react";
import {
  ChevronLeft,
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  Download,
  Users,
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  studentId: string;
}

interface Assignment {
  id: number;
  name: string;
  type: string;
  maxScore: number;
}

interface Grade {
  studentId: number;
  assignmentId: number;
  score: number;
  feedback?: string;
  isGraded: boolean;
}

interface Course {
  id: number;
  name: string;
  code: string;
  students: Student[];
  assignments: Assignment[];
}

export default function MarkSheet() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [grades, setGrades] = useState<Grade[]>([
    { studentId: 1, assignmentId: 1, score: 45, feedback: "Good work", isGraded: true },
    { studentId: 1, assignmentId: 2, score: 18, isGraded: true },
    { studentId: 2, assignmentId: 1, score: 42, isGraded: true },
    { studentId: 2, assignmentId: 2, score: 16, isGraded: true },
    { studentId: 3, assignmentId: 1, score: 38, isGraded: true },
  ]);
  const [editingGrade, setEditingGrade] = useState<{ studentId: number; assignmentId: number; score: string; feedback: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const courses: Course[] = [
    {
      id: 1,
      name: "Advanced Mathematics",
      code: "MATH 301",
      students: [
        { id: 1, name: "John Smith", studentId: "STU001" },
        { id: 2, name: "Emma Wilson", studentId: "STU002" },
        { id: 3, name: "Michael Brown", studentId: "STU003" },
        { id: 4, name: "Sarah Davis", studentId: "STU004" },
        { id: 5, name: "David Johnson", studentId: "STU005" },
      ],
      assignments: [
        { id: 1, name: "Homework 1", type: "assignment", maxScore: 50 },
        { id: 2, name: "Quiz 1", type: "quiz", maxScore: 20 },
        { id: 3, name: "Midterm Exam", type: "exam", maxScore: 100 },
      ]
    },
    {
      id: 2,
      name: "Physics Laboratory",
      code: "PHYS 201",
      students: [
        { id: 6, name: "Lisa Garcia", studentId: "STU006" },
        { id: 7, name: "James Miller", studentId: "STU007" },
        { id: 8, name: "Anna Taylor", studentId: "STU008" },
      ],
      assignments: [
        { id: 4, name: "Lab Report 1", type: "lab", maxScore: 50 },
        { id: 5, name: "Lab Report 2", type: "lab", maxScore: 50 },
      ]
    }
  ];

  const getGrade = (studentId: number, assignmentId: number) => {
    return grades.find(g => g.studentId === studentId && g.assignmentId === assignmentId);
  };

  const updateGrade = (studentId: number, assignmentId: number, score: number, feedback: string) => {
    setGrades(prev => prev.map(g => 
      g.studentId === studentId && g.assignmentId === assignmentId
        ? { ...g, score, feedback }
        : g
    ));
  };

  const deleteGrade = (studentId: number, assignmentId: number) => {
    setGrades(prev => prev.filter(g => !(g.studentId === studentId && g.assignmentId === assignmentId)));
  };

  const getLetterGrade = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";
    return "F";
  };

  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "text-green-600 bg-green-50";
    if (percentage >= 80) return "text-blue-600 bg-blue-50";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50";
    if (percentage >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const calculateStudentAverage = (studentId: number) => {
    const studentGrades = grades.filter(g => g.studentId === studentId);
    if (studentGrades.length === 0) return 0;
    
    const totalScore = studentGrades.reduce((sum, g) => {
      const assignment = selectedCourse?.assignments.find(a => a.id === g.assignmentId);
      return sum + (g.score / (assignment?.maxScore || 1)) * 100;
    }, 0);
    
    return totalScore / studentGrades.length;
  };

  const filteredStudents = selectedCourse?.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Courses</span>
          </button>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 xs:gap-4">
              <div>
                <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
                  <span className="hidden sm:inline">{selectedCourse.name} - Mark Sheet</span>
                  <span className="sm:hidden">{selectedCourse.name}</span>
                </h1>
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-xs xs:text-sm text-primary-50">
                  <span>{selectedCourse.code}</span>
                  <span className="flex items-center gap-1">
                    <Users size={14} className="xs:w-4 xs:h-4" />
                    {selectedCourse.students.length} students
                  </span>
                </div>
              </div>
              <div className="flex flex-col xs:flex-row gap-2 w-full lg:w-auto">
                <div className="relative flex-1 xs:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={16} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full xs:w-auto pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 border border-primary-50 rounded-lg text-xs xs:text-sm"
                  />
                </div>
                <button className="px-3 xs:px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 flex items-center justify-center gap-2 text-xs xs:text-sm">
                  <Download size={14} className="xs:w-4 xs:h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Card Layout */}
          <div className="lg:hidden space-y-3 xs:space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-primary-50 text-sm xs:text-base">{student.name}</h3>
                    <p className="text-xs xs:text-sm text-primary-50/60">{student.studentId}</p>
                  </div>
                  <div className={`px-2 xs:px-3 py-1 rounded text-xs xs:text-sm font-medium ${
                    calculateStudentAverage(student.id) >= 90 ? 'text-green-600 bg-green-50' :
                    calculateStudentAverage(student.id) >= 80 ? 'text-blue-600 bg-blue-50' :
                    calculateStudentAverage(student.id) >= 70 ? 'text-yellow-600 bg-yellow-50' :
                    calculateStudentAverage(student.id) >= 60 ? 'text-orange-600 bg-orange-50' :
                    'text-red-600 bg-red-50'
                  }`}>
                    {calculateStudentAverage(student.id).toFixed(0)}%
                  </div>
                </div>
                
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 mb-3">
                  {selectedCourse.assignments.map((assignment) => {
                    const grade = getGrade(student.id, assignment.id);
                    const isEditing = editingGrade?.studentId === student.id && editingGrade?.assignmentId === assignment.id;
                    
                    return (
                      <div key={assignment.id} className="border border-gray-200 rounded-lg p-2 xs:p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-primary-50 text-xs xs:text-sm">{assignment.name}</h4>
                            <p className="text-xs text-primary-50/60">Max: {assignment.maxScore}</p>
                          </div>
                          {grade && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => setEditingGrade({
                                  studentId: student.id,
                                  assignmentId: assignment.id,
                                  score: grade.score.toString(),
                                  feedback: grade.feedback || ''
                                })}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit3 size={12} />
                              </button>
                              <button
                                onClick={() => deleteGrade(student.id, assignment.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="number"
                              value={editingGrade.score}
                              onChange={(e) => setEditingGrade(prev => prev ? {...prev, score: e.target.value} : null)}
                              className="w-full px-2 py-1 border border-primary-50 rounded text-sm"
                              max={assignment.maxScore}
                              min="0"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  const score = parseFloat(editingGrade.score);
                                  if (!isNaN(score) && score >= 0 && score <= assignment.maxScore) {
                                    updateGrade(student.id, assignment.id, score, editingGrade.feedback);
                                    setEditingGrade(null);
                                  }
                                }}
                                className="flex-1 px-2 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80 flex items-center justify-center gap-1"
                              >
                                <Save size={12} />
                                Save
                              </button>
                              <button
                                onClick={() => setEditingGrade(null)}
                                className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-opacity-80"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                        ) : grade ? (
                          <div className="text-center">
                            <div className="font-medium text-primary-50 text-sm xs:text-base">
                              {grade.score}/{assignment.maxScore}
                            </div>
                            <div className={`text-xs px-2 py-1 rounded mt-1 ${getGradeColor(grade.score, assignment.maxScore)}`}>
                              {getLetterGrade(grade.score, assignment.maxScore)}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400 text-sm">Not graded</div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => window.location.href = `/teacher/grading?course=${selectedCourse.id}&student=${student.id}`}
                  className="w-full px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 text-sm"
                >
                  Grade Student
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">
                    Student
                  </th>
                  {selectedCourse.assignments.map((assignment) => (
                    <th key={assignment.id} className="px-4 py-3 text-center text-sm font-medium text-primary-50">
                      <div>{assignment.name}</div>
                      <div className="text-xs text-primary-50/60">({assignment.maxScore} pts)</div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">
                    Average
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-primary-50">{student.name}</div>
                        <div className="text-sm text-primary-50/60">{student.studentId}</div>
                      </div>
                    </td>
                    {selectedCourse.assignments.map((assignment) => {
                      const grade = getGrade(student.id, assignment.id);
                      const isEditing = editingGrade?.studentId === student.id && editingGrade?.assignmentId === assignment.id;
                      
                      return (
                        <td key={assignment.id} className="px-4 py-3 text-center">
                          {isEditing ? (
                            <div className="space-y-2">
                              <input
                                type="number"
                                value={editingGrade.score}
                                onChange={(e) => setEditingGrade(prev => prev ? {...prev, score: e.target.value} : null)}
                                className="w-16 px-2 py-1 border border-primary-50 rounded text-sm text-center"
                                max={assignment.maxScore}
                                min="0"
                              />
                              <div className="flex gap-1 justify-center">
                                <button
                                  onClick={() => {
                                    const score = parseFloat(editingGrade.score);
                                    if (!isNaN(score) && score >= 0 && score <= assignment.maxScore) {
                                      updateGrade(student.id, assignment.id, score, editingGrade.feedback);
                                      setEditingGrade(null);
                                    }
                                  }}
                                  className="p-1 bg-primary-50 text-white rounded hover:bg-opacity-80"
                                >
                                  <Save size={12} />
                                </button>
                                <button
                                  onClick={() => setEditingGrade(null)}
                                  className="p-1 bg-gray-500 text-white rounded hover:bg-opacity-80"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            </div>
                          ) : grade ? (
                            <div className="space-y-1">
                              <div className="font-medium text-primary-50">
                                {grade.score}/{assignment.maxScore}
                              </div>
                              <div className={`text-xs px-2 py-1 rounded ${getGradeColor(grade.score, assignment.maxScore)}`}>
                                {getLetterGrade(grade.score, assignment.maxScore)}
                              </div>
                              <div className="flex gap-1 justify-center">
                                <button
                                  onClick={() => setEditingGrade({
                                    studentId: student.id,
                                    assignmentId: assignment.id,
                                    score: grade.score.toString(),
                                    feedback: grade.feedback || ''
                                  })}
                                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                  <Edit3 size={12} />
                                </button>
                                <button
                                  onClick={() => deleteGrade(student.id, assignment.id)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-center">
                      <div className={`font-medium px-2 py-1 rounded ${
                        calculateStudentAverage(student.id) >= 90 ? 'text-green-600 bg-green-50' :
                        calculateStudentAverage(student.id) >= 80 ? 'text-blue-600 bg-blue-50' :
                        calculateStudentAverage(student.id) >= 70 ? 'text-yellow-600 bg-yellow-50' :
                        calculateStudentAverage(student.id) >= 60 ? 'text-orange-600 bg-orange-50' :
                        'text-red-600 bg-red-50'
                      }`}>
                        {calculateStudentAverage(student.id).toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => window.location.href = `/teacher/grading?course=${selectedCourse.id}&student=${student.id}`}
                        className="px-2 py-1 bg-primary-50 text-white rounded text-xs hover:bg-opacity-80"
                      >
                        Grade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

        <h1 className="text-xl xs:text-2xl font-bold text-primary-50 mb-6">
          Mark Sheets
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="bg-white rounded-lg xs:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 xs:p-6"
            >
              <h3 className="font-semibold text-primary-50 mb-2">{course.name}</h3>
              <p className="text-sm text-primary-50 mb-4">{course.code}</p>
              
              <div className="flex items-center justify-between text-sm text-primary-50">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{course.students.length} students</span>
                </div>
                <span>{course.assignments.length} assignments</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}