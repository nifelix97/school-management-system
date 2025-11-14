import { useState } from "react";
import { ChevronLeft, BookOpen, TrendingUp, Award, Calendar } from "lucide-react";

interface Grade {
  id: number;
  courseName: string;
  courseCode: string;
  assignmentName: string;
  assignmentType: string;
  score: number;
  maxScore: number;
  feedback?: string;
  gradedDate: string;
  teacherName: string;
}

interface CourseStats {
  courseId: number;
  courseName: string;
  courseCode: string;
  totalAssignments: number;
  gradedAssignments: number;
  averageScore: number;
  letterGrade: string;
}

export default function StudentMarks() {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  // Mock data matching the MarkSheet structure
  const grades: Grade[] = [
    {
      id: 1,
      courseName: "Advanced Mathematics",
      courseCode: "MATH 301",
      assignmentName: "Homework 1",
      assignmentType: "assignment",
      score: 45,
      maxScore: 50,
      feedback: "Good work",
      gradedDate: "2024-01-15",
      teacherName: "Dr. Smith"
    },
    {
      id: 2,
      courseName: "Advanced Mathematics", 
      courseCode: "MATH 301",
      assignmentName: "Quiz 1",
      assignmentType: "quiz",
      score: 18,
      maxScore: 20,
      gradedDate: "2024-01-20",
      teacherName: "Dr. Smith"
    },
    {
      id: 3,
      courseName: "Physics Laboratory",
      courseCode: "PHYS 201", 
      assignmentName: "Lab Report 1",
      assignmentType: "lab",
      score: 42,
      maxScore: 50,
      feedback: "Excellent analysis",
      gradedDate: "2024-01-18",
      teacherName: "Prof. Johnson"
    }
  ];

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
    if (percentage >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (percentage >= 60) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment": return <BookOpen size={14} />;
      case "quiz": return <Award size={14} />;
      case "exam": return <TrendingUp size={14} />;
      case "lab": return <Calendar size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  const courseStats: CourseStats[] = [
    {
      courseId: 1,
      courseName: "Advanced Mathematics",
      courseCode: "MATH 301",
      totalAssignments: 3,
      gradedAssignments: 2,
      averageScore: 87.5,
      letterGrade: "B+"
    },
    {
      courseId: 2,
      courseName: "Physics Laboratory", 
      courseCode: "PHYS 201",
      totalAssignments: 2,
      gradedAssignments: 1,
      averageScore: 84.0,
      letterGrade: "B"
    }
  ];

  const filteredGrades = selectedCourse === "all" 
    ? grades 
    : grades.filter(grade => grade.courseCode === selectedCourse);

  const courses = [...new Set(grades.map(g => ({ code: g.courseCode, name: g.courseName })))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        <div className="mb-4 xs:mb-6">
          <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-50 mb-2">
            My Grades
          </h1>
          <p className="text-xs xs:text-sm text-primary-50/60">
            View your academic performance and feedback
          </p>
        </div>

        {/* Course Filter */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <label className="text-sm font-medium text-primary-50">Filter by Course:</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 border border-primary-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-50/20"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.name} ({course.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 mb-4 xs:mb-6">
          {courseStats.map((course) => (
            <div key={course.courseId} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
              <h3 className="font-semibold text-primary-50 text-sm xs:text-base mb-1">
                {course.courseName}
              </h3>
              <p className="text-xs xs:text-sm text-primary-50/60 mb-3">{course.courseCode}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs xs:text-sm text-primary-50/70">Progress:</span>
                  <span className="text-xs xs:text-sm font-medium text-primary-50">
                    {course.gradedAssignments}/{course.totalAssignments}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs xs:text-sm text-primary-50/70">Average:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs xs:text-sm font-medium text-primary-50">
                      {course.averageScore.toFixed(1)}%
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      course.averageScore >= 90 ? 'text-green-600 bg-green-50' :
                      course.averageScore >= 80 ? 'text-blue-600 bg-blue-50' :
                      course.averageScore >= 70 ? 'text-yellow-600 bg-yellow-50' :
                      course.averageScore >= 60 ? 'text-orange-600 bg-orange-50' :
                      'text-red-600 bg-red-50'
                    }`}>
                      {course.letterGrade}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grades List - Mobile Cards */}
        <div className="lg:hidden space-y-3 xs:space-y-4">
          {filteredGrades.map((grade) => (
            <div key={grade.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm p-3 xs:p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeIcon(grade.assignmentType)}
                    <h3 className="font-semibold text-primary-50 text-sm xs:text-base">
                      {grade.assignmentName}
                    </h3>
                  </div>
                  <p className="text-xs xs:text-sm text-primary-50/60">
                    {grade.courseName} • {grade.teacherName}
                  </p>
                </div>
                <div className={`px-2 xs:px-3 py-1 rounded border text-xs xs:text-sm font-medium ${getGradeColor(grade.score, grade.maxScore)}`}>
                  {grade.score}/{grade.maxScore}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 xs:gap-4 mb-3">
                <div className="text-center">
                  <p className="text-xs text-primary-50/60 mb-1">Percentage</p>
                  <p className="font-medium text-primary-50 text-sm xs:text-base">
                    {((grade.score / grade.maxScore) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-primary-50/60 mb-1">Letter Grade</p>
                  <p className={`font-medium text-sm xs:text-base px-2 py-1 rounded ${getGradeColor(grade.score, grade.maxScore)}`}>
                    {getLetterGrade(grade.score, grade.maxScore)}
                  </p>
                </div>
              </div>

              {grade.feedback && (
                <div className="bg-gray-50 rounded-lg p-2 xs:p-3 mb-3">
                  <p className="text-xs text-primary-50/60 mb-1">Teacher Feedback:</p>
                  <p className="text-xs xs:text-sm text-primary-50">{grade.feedback}</p>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-primary-50/60">
                <span>Graded: {new Date(grade.gradedDate).toLocaleDateString()}</span>
                <span className="capitalize">{grade.assignmentType}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Grades Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Assignment</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Course</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Score</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Percentage</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Grade</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary-50">Feedback</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-primary-50">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(grade.assignmentType)}
                      <div>
                        <div className="font-medium text-primary-50">{grade.assignmentName}</div>
                        <div className="text-sm text-primary-50/60 capitalize">{grade.assignmentType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-primary-50">{grade.courseName}</div>
                      <div className="text-sm text-primary-50/60">{grade.courseCode} • {grade.teacherName}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex px-3 py-1 rounded border font-medium ${getGradeColor(grade.score, grade.maxScore)}`}>
                      {grade.score}/{grade.maxScore}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-medium text-primary-50">
                    {((grade.score / grade.maxScore) * 100).toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className={`inline-flex px-2 py-1 rounded font-medium ${getGradeColor(grade.score, grade.maxScore)}`}>
                      {getLetterGrade(grade.score, grade.maxScore)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs">
                      {grade.feedback ? (
                        <p className="text-sm text-primary-50 line-clamp-2">{grade.feedback}</p>
                      ) : (
                        <span className="text-sm text-gray-400">No feedback</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-primary-50/60">
                    {new Date(grade.gradedDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredGrades.length === 0 && (
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-6 xs:p-8 text-center">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-primary-50 mb-2">No Grades Yet</h3>
            <p className="text-primary-50/60">
              {selectedCourse === "all" 
                ? "You don't have any graded assignments yet."
                : "No graded assignments found for the selected course."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}