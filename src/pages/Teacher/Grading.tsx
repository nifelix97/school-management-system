import { useState } from "react";
import {
  ChevronLeft,
  Search,
  Save,
  BookOpen,
  Award,
  BarChart3,
  TrendingUp,
  Calendar,
  Users,
  Eye,
  FileText,
  X,
  Plus,
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  email: string;
  studentId: string;
}

interface Assignment {
  id: number;
  name: string;
  type: "assignment" | "quiz" | "exam" | "project" | "lab";
  maxScore: number;
  dueDate: string;
}

interface Grade {
  studentId: number;
  assignmentId: number;
  score: number | null;
  feedback?: string;
  isGraded: boolean;
}

interface StudentSubmission {
  studentId: number;
  assignmentId: number;
  submittedAt: string;
  answers: {
    question: string;
    answer: string;
    type: "text" | "file" | "multiple-choice";
  }[];
  files?: {
    name: string;
    url: string;
  }[];
}

interface Course {
  id: number;
  name: string;
  code: string;
  semester: string;
  students: Student[];
  assignments: Assignment[];
}

export default function Grading() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingGrade, setEditingGrade] = useState<{ studentId: number; score: string; feedback: string } | null>(null);
  const [viewingSubmission, setViewingSubmission] = useState<StudentSubmission | null>(null);
  const [questionGrades, setQuestionGrades] = useState<{ [key: string]: { score: number; maxScore: number; feedback?: string } }>({});

  const courses: Course[] = [
    {
      id: 1,
      name: "Advanced Mathematics",
      code: "MATH 301",
      semester: "Spring 2025",
      students: [
        { id: 1, name: "John Smith", email: "john.smith@school.edu", studentId: "STU001" },
        { id: 2, name: "Emma Wilson", email: "emma.wilson@school.edu", studentId: "STU002" },
        { id: 3, name: "Michael Brown", email: "michael.brown@school.edu", studentId: "STU003" },
        { id: 4, name: "Sarah Davis", email: "sarah.davis@school.edu", studentId: "STU004" },
        { id: 5, name: "David Johnson", email: "david.johnson@school.edu", studentId: "STU005" },
      ],
      assignments: [
        { id: 1, name: "Homework 1", type: "assignment", maxScore: 50, dueDate: "2025-01-15" },
        { id: 2, name: "Quiz 1", type: "quiz", maxScore: 20, dueDate: "2025-01-22" },
        { id: 3, name: "Midterm Exam", type: "exam", maxScore: 100, dueDate: "2025-02-15" },
        { id: 4, name: "Project 1", type: "project", maxScore: 100, dueDate: "2025-03-01" },
      ]
    },
    {
      id: 2,
      name: "Physics Laboratory",
      code: "PHYS 201",
      semester: "Spring 2025",
      students: [
        { id: 6, name: "Lisa Garcia", email: "lisa.garcia@school.edu", studentId: "STU006" },
        { id: 7, name: "James Miller", email: "james.miller@school.edu", studentId: "STU007" },
        { id: 8, name: "Anna Taylor", email: "anna.taylor@school.edu", studentId: "STU008" },
      ],
      assignments: [
        { id: 5, name: "Lab Report 1", type: "lab", maxScore: 50, dueDate: "2025-01-20" },
        { id: 6, name: "Lab Report 2", type: "lab", maxScore: 50, dueDate: "2025-02-10" },
        { id: 7, name: "Practical Exam", type: "exam", maxScore: 100, dueDate: "2025-02-28" },
      ]
    }
  ];

  const submissions: StudentSubmission[] = [
    {
      studentId: 1,
      assignmentId: 1,
      submittedAt: "2025-01-14 23:45",
      answers: [
        { question: "Solve the integral of x²dx", answer: "x³/3 + C", type: "text" },
        { question: "What is the derivative of sin(x)?", answer: "cos(x)", type: "text" }
      ]
    },
    {
      studentId: 2,
      assignmentId: 1,
      submittedAt: "2025-01-15 10:30",
      answers: [
        { question: "Solve the integral of x²dx", answer: "x³/3 + C", type: "text" },
        { question: "What is the derivative of sin(x)?", answer: "cos(x)", type: "text" }
      ],
      files: [{ name: "homework1.pdf", url: "#" }]
    },
    {
      studentId: 3,
      assignmentId: 2,
      submittedAt: "2025-01-22 14:20",
      answers: [
        { question: "What is 2+2?", answer: "4", type: "multiple-choice" },
        { question: "Explain calculus basics", answer: "Calculus is the study of continuous change...", type: "text" }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment": return <BookOpen size={16} className="text-blue-500" />;
      case "quiz": return <Award size={16} className="text-purple-500" />;
      case "exam": return <BarChart3 size={16} className="text-red-500" />;
      case "project": return <TrendingUp size={16} className="text-green-500" />;
      case "lab": return <Calendar size={16} className="text-orange-500" />;
      default: return <BookOpen size={16} className="text-gray-500" />;
    }
  };

  const getGrade = (studentId: number, assignmentId: number) => {
    return grades.find(g => g.studentId === studentId && g.assignmentId === assignmentId);
  };

  const getSubmission = (studentId: number, assignmentId: number) => {
    return submissions.find(s => s.studentId === studentId && s.assignmentId === assignmentId);
  };

  const updateGrade = (studentId: number, assignmentId: number, score: number, feedback: string) => {
    setGrades(prev => {
      const existing = prev.find(g => g.studentId === studentId && g.assignmentId === assignmentId);
      if (existing) {
        return prev.map(g => 
          g.studentId === studentId && g.assignmentId === assignmentId
            ? { ...g, score, feedback, isGraded: true }
            : g
        );
      }
      return [...prev, { studentId, assignmentId, score, feedback, isGraded: true }];
    });
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

  const filteredStudents = selectedCourse?.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (viewingSubmission) {
    const student = selectedCourse?.students.find(s => s.id === viewingSubmission.studentId);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          <button
            onClick={() => setViewingSubmission(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Grading</span>
          </button>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-xl xs:text-2xl font-bold text-primary-50 mb-2">
                  {student?.name}'s Submission
                </h1>
                <div className="flex items-center gap-4 text-sm text-primary-50">
                  <span>{selectedAssignment?.name}</span>
                  <span>Submitted: {viewingSubmission.submittedAt}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setViewingSubmission(null);
                  setQuestionGrades({});
                }}
                className="p-2 text-primary-50 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {viewingSubmission.answers.map((answer, index) => {
              const questionKey = `${viewingSubmission.studentId}-${viewingSubmission.assignmentId}-${index}`;
              const questionGrade = questionGrades[questionKey];
              const maxQuestionScore = 10; // Default points per question
              
              return (
                <div key={index} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary-50 mb-3">
                        Question {index + 1}: {answer.question}
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-3">
                        <p className="text-primary-50 whitespace-pre-wrap">{answer.answer}</p>
                      </div>
                      <div className="text-xs text-primary-50/60 capitalize">
                        Type: {answer.type.replace('-', ' ')}
                      </div>
                    </div>
                    
                    <div className="lg:w-80 bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-primary-50 mb-3">Grade This Question</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-primary-50 min-w-0">Score:</label>
                          <input
                            type="number"
                            placeholder="0"
                            value={questionGrade?.score || ''}
                            onChange={(e) => {
                              const score = parseFloat(e.target.value) || 0;
                              setQuestionGrades(prev => ({
                                ...prev,
                                [questionKey]: {
                                  ...prev[questionKey],
                                  score,
                                  maxScore: maxQuestionScore
                                }
                              }));
                            }}
                            className="w-16 px-2 py-1 border border-primary-50 rounded text-sm"
                            max={maxQuestionScore}
                            min="0"
                            step="0.5"
                          />
                          <span className="text-sm text-primary-50">/ {maxQuestionScore}</span>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-primary-50 mb-1">Feedback:</label>
                          <textarea
                            placeholder="Optional feedback..."
                            value={questionGrade?.feedback || ''}
                            onChange={(e) => {
                              setQuestionGrades(prev => ({
                                ...prev,
                                [questionKey]: {
                                  ...prev[questionKey],
                                  score: prev[questionKey]?.score || 0,
                                  maxScore: maxQuestionScore,
                                  feedback: e.target.value
                                }
                              }));
                            }}
                            className="w-full px-2 py-1 border border-primary-50 rounded text-sm h-16 resize-none"
                          />
                        </div>
                        
                        {questionGrade?.score !== undefined && (
                          <div className="text-center">
                            <div className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                              (questionGrade.score / maxQuestionScore) >= 0.9 ? 'bg-green-100 text-green-700' :
                              (questionGrade.score / maxQuestionScore) >= 0.8 ? 'bg-blue-100 text-blue-700' :
                              (questionGrade.score / maxQuestionScore) >= 0.7 ? 'bg-yellow-100 text-yellow-700' :
                              (questionGrade.score / maxQuestionScore) >= 0.6 ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {((questionGrade.score / maxQuestionScore) * 100).toFixed(0)}%
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {viewingSubmission.files && viewingSubmission.files.length > 0 && (
              <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6">
                <h3 className="font-semibold text-primary-50 mb-3">Attached Files</h3>
                <div className="space-y-2">
                  {viewingSubmission.files.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText size={20} className="text-primary-50" />
                      <span className="text-primary-50">{file.name}</span>
                      <button className="ml-auto px-3 py-1 bg-primary-50 text-white rounded text-sm hover:bg-opacity-80">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overall Grade Summary */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6">
              <h3 className="font-semibold text-primary-50 mb-4">Overall Grade Summary</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-50">
                    {Object.values(questionGrades).reduce((sum, q) => sum + (q.score || 0), 0).toFixed(1)}
                  </div>
                  <div className="text-sm text-primary-50">Total Points</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-50">
                    {Object.keys(questionGrades).length > 0 ? 
                      (Object.values(questionGrades).reduce((sum, q) => sum + (q.score || 0), 0) / 
                       Object.values(questionGrades).reduce((sum, q) => sum + q.maxScore, 0) * 100).toFixed(0) : 0}%
                  </div>
                  <div className="text-sm text-primary-50">Percentage</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-50">
                    {Object.keys(questionGrades).length > 0 ? 
                      getLetterGrade(
                        Object.values(questionGrades).reduce((sum, q) => sum + (q.score || 0), 0),
                        Object.values(questionGrades).reduce((sum, q) => sum + q.maxScore, 0)
                      ) : '-'}
                  </div>
                  <div className="text-sm text-primary-50">Letter Grade</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const totalScore = Object.values(questionGrades).reduce((sum, q) => sum + (q.score || 0), 0);
                    const allFeedback = Object.values(questionGrades)
                      .map((q, i) => q.feedback ? `Q${i+1}: ${q.feedback}` : '')
                      .filter(f => f)
                      .join('\n');
                    
                    updateGrade(viewingSubmission.studentId, viewingSubmission.assignmentId, totalScore, allFeedback);
                    alert('Grade saved successfully!');
                  }}
                  disabled={Object.keys(questionGrades).length === 0}
                  className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Final Grade
                </button>
                
                <button
                  onClick={() => {
                    const maxScore = viewingSubmission.answers.length * 10;
                    const avgScore = maxScore * 0.85; // Default to 85%
                    const newGrades: typeof questionGrades = {};
                    
                    viewingSubmission.answers.forEach((_, index) => {
                      const questionKey = `${viewingSubmission.studentId}-${viewingSubmission.assignmentId}-${index}`;
                      newGrades[questionKey] = { score: avgScore / viewingSubmission.answers.length, maxScore: 10 };
                    });
                    
                    setQuestionGrades(newGrades);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-opacity-80"
                >
                  Auto-Grade (85%)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCourse && selectedAssignment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          <button
            onClick={() => setSelectedAssignment(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Assignments</span>
          </button>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl xs:text-2xl font-bold text-primary-50 mb-2">
                  {selectedAssignment.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-primary-50">
                  {getTypeIcon(selectedAssignment.type)}
                  <span className="capitalize">{selectedAssignment.type}</span>
                  <span>Max Score: {selectedAssignment.maxScore}</span>
                  <span>Due: {selectedAssignment.dueDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 xs:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-primary-50">Student Grades</h2>
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40" size={18} />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-primary-50 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredStudents.map((student) => {
                  const grade = getGrade(student.id, selectedAssignment.id);
                  const submission = getSubmission(student.id, selectedAssignment.id);
                  const isEditing = editingGrade?.studentId === student.id;

                  return (
                    <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary-50 text-white rounded-full flex items-center justify-center font-semibold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary-50">{student.name}</h3>
                            <p className="text-sm text-primary-50">{student.studentId}</p>
                            {submission && (
                              <p className="text-xs text-green-600">Submitted: {submission.submittedAt}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          {isEditing ? (
                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                              <input
                                type="number"
                                placeholder="Score"
                                value={editingGrade.score}
                                onChange={(e) => setEditingGrade(prev => prev ? {...prev, score: e.target.value} : null)}
                                className="px-3 py-2 border border-primary-50 rounded-lg w-20"
                                max={selectedAssignment.maxScore}
                                min="0"
                              />
                              <input
                                type="text"
                                placeholder="Feedback (optional)"
                                value={editingGrade.feedback}
                                onChange={(e) => setEditingGrade(prev => prev ? {...prev, feedback: e.target.value} : null)}
                                className="px-3 py-2 border border-primary-50 rounded-lg flex-1 sm:w-48"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    const score = parseFloat(editingGrade.score);
                                    if (!isNaN(score) && score >= 0 && score <= selectedAssignment.maxScore) {
                                      updateGrade(student.id, selectedAssignment.id, score, editingGrade.feedback);
                                      setEditingGrade(null);
                                    }
                                  }}
                                  className="px-3 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 flex items-center gap-1"
                                >
                                  <Save size={16} />
                                  <span className="hidden xs:inline">Save</span>
                                </button>
                                <button
                                  onClick={() => setEditingGrade(null)}
                                  className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-opacity-80"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-4">
                              {grade?.isGraded ? (
                                <div className="flex items-center gap-4">
                                  <div className="text-center">
                                    <div className="text-lg font-semibold text-primary-50">
                                      {grade.score}/{selectedAssignment.maxScore}
                                    </div>
                                    <div className={`text-sm font-bold px-2 py-1 rounded ${getGradeColor(grade.score!, selectedAssignment.maxScore)}`}>
                                      {getLetterGrade(grade.score!, selectedAssignment.maxScore)}
                                    </div>
                                  </div>
                                  {grade.feedback && (
                                    <div className="max-w-xs">
                                      <p className="text-sm text-primary-50 truncate">{grade.feedback}</p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-500 text-sm">Not graded</span>
                              )}
                              {submission && (
                                <button
                                  onClick={() => setViewingSubmission(submission)}
                                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-opacity-80 flex items-center gap-1"
                                >
                                  <Eye size={16} />
                                  <span className="hidden xs:inline">View & Grade</span>
                                  <span className="xs:hidden">Grade</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
            <ChevronLeft size={20} />
            <span>Back to Courses</span>
          </button>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl xs:text-2xl font-bold text-primary-50 mb-2">
                  {selectedCourse.name}
                </h1>
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-sm text-primary-50">
                  <span>{selectedCourse.code}</span>
                  <span>{selectedCourse.semester}</span>
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {selectedCourse.students.length} students
                  </span>
                </div>
              </div>
              <button
                onClick={() => window.location.href = '/teacher/create-assignment'}
                className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 flex items-center gap-2"
              >
                <Plus size={16} />
                <span className="hidden xs:inline">Create Assignment</span>
                <span className="xs:hidden">Create</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
            {selectedCourse.assignments.map((assignment) => {
              const gradedCount = selectedCourse.students.filter(student => 
                getGrade(student.id, assignment.id)?.isGraded
              ).length;

              return (
                <div
                  key={assignment.id}
                  onClick={() => setSelectedAssignment(assignment)}
                  className="bg-white rounded-lg xs:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 xs:p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(assignment.type)}
                      <div>
                        <h3 className="font-semibold text-primary-50">{assignment.name}</h3>
                        <p className="text-sm text-primary-50 capitalize">{assignment.type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-primary-50">
                    <div className="flex justify-between">
                      <span>Max Score:</span>
                      <span className="font-semibold">{assignment.maxScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span>{assignment.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Graded:</span>
                      <span className={`font-semibold ${gradedCount === selectedCourse.students.length ? 'text-green-600' : 'text-orange-600'}`}>
                        {gradedCount}/{selectedCourse.students.length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl xs:text-2xl font-bold text-primary-50">
            Grade Students
          </h1>
          <button
            onClick={() => window.location.href = '/teacher/create-assignment'}
            className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 flex items-center gap-2"
          >
            <Plus size={16} />
            <span className="hidden xs:inline">Create New Assignment</span>
            <span className="xs:hidden">Create</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
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