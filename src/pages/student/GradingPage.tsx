import React, { useState } from "react";
import {
  ChevronLeft,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Award,
  BookOpen,
  Calendar,
  BarChart3,
} from "lucide-react";

interface Grade {
  id: number;
  assignmentName: string;
  type: "assignment" | "quiz" | "exam" | "project" | "lab";
  score: number;
  maxScore: number;
  percentage: number;
  letterGrade: string;
  date: string;
  feedback?: string;
}

interface Course {
  id: number;
  name: string;
  code: string;
  teacher: string;
  semester: string;
  currentGrade: number;
  letterGrade: string;
  credits: number;
  grades: Grade[];
}

export default function GradingPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const courses: Course[] = [
    {
      id: 1,
      name: "Advanced Mathematics",
      code: "MATH 301",
      teacher: "Dr. Smith",
      semester: "Spring 2025",
      currentGrade: 88.5,
      letterGrade: "B+",
      credits: 4,
      grades: [
        { id: 1, assignmentName: "Homework 1", type: "assignment", score: 45, maxScore: 50, percentage: 90, letterGrade: "A-", date: "2025-01-15", feedback: "Excellent work on integration problems" },
        { id: 2, assignmentName: "Quiz 1", type: "quiz", score: 18, maxScore: 20, percentage: 90, letterGrade: "A-", date: "2025-01-22" },
        { id: 3, assignmentName: "Midterm Exam", type: "exam", score: 82, maxScore: 100, percentage: 82, letterGrade: "B-", date: "2025-02-15", feedback: "Good understanding of concepts, work on calculation speed" },
        { id: 4, assignmentName: "Project 1", type: "project", score: 95, maxScore: 100, percentage: 95, letterGrade: "A", date: "2025-03-01", feedback: "Outstanding presentation and analysis" }
      ]
    },
    {
      id: 2,
      name: "Physics Laboratory",
      code: "PHYS 201",
      teacher: "Prof. Johnson",
      semester: "Spring 2025",
      currentGrade: 92.3,
      letterGrade: "A-",
      credits: 3,
      grades: [
        { id: 5, assignmentName: "Lab Report 1", type: "lab", score: 48, maxScore: 50, percentage: 96, letterGrade: "A", date: "2025-01-20" },
        { id: 6, assignmentName: "Lab Report 2", type: "lab", score: 46, maxScore: 50, percentage: 92, letterGrade: "A-", date: "2025-02-10" },
        { id: 7, assignmentName: "Practical Exam", type: "exam", score: 88, maxScore: 100, percentage: 88, letterGrade: "B+", date: "2025-02-28" }
      ]
    },
    {
      id: 3,
      name: "Organic Chemistry",
      code: "CHEM 301",
      teacher: "Dr. Wilson",
      semester: "Spring 2025",
      currentGrade: 85.7,
      letterGrade: "B",
      credits: 4,
      grades: [
        { id: 8, assignmentName: "Assignment 1", type: "assignment", score: 42, maxScore: 50, percentage: 84, letterGrade: "B", date: "2025-01-18" },
        { id: 9, assignmentName: "Quiz 1", type: "quiz", score: 16, maxScore: 20, percentage: 80, letterGrade: "B-", date: "2025-01-25" },
        { id: 10, assignmentName: "Lab Practical", type: "lab", score: 45, maxScore: 50, percentage: 90, letterGrade: "A-", date: "2025-02-08" },
        { id: 11, assignmentName: "Midterm", type: "exam", score: 85, maxScore: 100, percentage: 85, letterGrade: "B", date: "2025-02-20" }
      ]
    },
    {
      id: 4,
      name: "English Literature",
      code: "ENG 201",
      teacher: "Ms. Davis",
      semester: "Spring 2025",
      currentGrade: 91.2,
      letterGrade: "A-",
      credits: 3,
      grades: [
        { id: 12, assignmentName: "Essay 1", type: "assignment", score: 88, maxScore: 100, percentage: 88, letterGrade: "B+", date: "2025-01-30" },
        { id: 13, assignmentName: "Quiz 1", type: "quiz", score: 19, maxScore: 20, percentage: 95, letterGrade: "A", date: "2025-02-05" },
        { id: 14, assignmentName: "Research Project", type: "project", score: 94, maxScore: 100, percentage: 94, letterGrade: "A", date: "2025-02-25" }
      ]
    }
  ];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50";
    if (percentage >= 80) return "text-blue-600 bg-blue-50";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50";
    if (percentage >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

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

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateGPA = () => {
    const totalPoints = courses.reduce((sum, course) => sum + (course.currentGrade * course.credits), 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    return (totalPoints / totalCredits / 25).toFixed(2); // Convert to 4.0 scale
  };

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
          <button
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
          >
            <ChevronLeft size={20} />
            <span>Back to Grades</span>
          </button>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-4 xs:p-6 border-b border-primary-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl xs:text-2xl font-bold text-primary-50 mb-2">
                    {selectedCourse.name}
                  </h1>
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-sm text-primary-50">
                    <span>{selectedCourse.code}</span>
                    <span>{selectedCourse.teacher}</span>
                    <span>{selectedCourse.semester}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl xs:text-3xl font-bold ${getGradeColor(selectedCourse.currentGrade)}`}>
                    {selectedCourse.letterGrade}
                  </div>
                  <div className="text-lg font-semibold text-primary-50">
                    {selectedCourse.currentGrade.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 xs:p-6">
              <h2 className="text-lg font-semibold text-primary-50 mb-4">Grade Details</h2>
              <div className="space-y-4">
                {selectedCourse.grades.map((grade) => (
                  <div key={grade.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(grade.type)}
                        <div>
                          <h3 className="font-semibold text-primary-50">{grade.assignmentName}</h3>
                          <p className="text-sm text-primary-50 capitalize">{grade.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-primary-50">
                            {grade.score}/{grade.maxScore}
                          </div>
                          <div className="text-sm text-primary-50">Points</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold px-3 py-1 rounded ${getGradeColor(grade.percentage)}`}>
                            {grade.letterGrade}
                          </div>
                          <div className="text-sm text-primary-50">{grade.percentage}%</div>
                        </div>
                        <div className="text-sm text-primary-50">{grade.date}</div>
                      </div>
                    </div>
                    {grade.feedback && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-primary-50">
                          <strong>Feedback:</strong> {grade.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-3 xs:mb-4"
        >
          <ChevronLeft size={18} className="xs:w-5 xs:h-5" />
          <span>Back</span>
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl xs:text-2xl font-bold text-primary-50">
            My Grades
          </h1>
          <div className="relative flex-1 sm:flex-initial">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-50/40"
              size={18}
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-primary-50 rounded-lg "
            />
          </div>
        </div>

        {/* GPA Summary */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xs:gap-6">
            <div className="text-center">
              <div className="text-2xl xs:text-3xl font-bold text-primary-50">
                {calculateGPA()}
              </div>
              <div className="text-sm text-primary-50">Current GPA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl xs:text-3xl font-bold text-primary-300">
                {courses.reduce((sum, course) => sum + course.credits, 0)}
              </div>
              <div className="text-sm text-primary-50">Total Credits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl xs:text-3xl font-bold text-primary-50">
                {courses.length}
              </div>
              <div className="text-sm text-primary-50">Courses</div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className="bg-white rounded-lg xs:rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="p-4 xs:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-50 mb-1">
                      {course.name}
                    </h3>
                    <p className="text-sm text-primary-50 mb-2">
                      {course.code}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-primary-50/60">
                      <span>{course.teacher}</span>
                      <span>{course.credits} credits</span>
                    </div>
                  </div>
                  <div className="text-center ml-4">
                    <div
                      className={`text-xl xs:text-2xl font-bold px-3 py-1 rounded ${getGradeColor(
                        course.currentGrade
                      )}`}
                    >
                      {course.letterGrade}
                    </div>
                    <div className="text-sm text-primary-50 mt-1">
                      {course.currentGrade.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-50">Recent Assignments</span>
                    <span className="text-primary-50 font-medium">
                      {course.grades.length} total
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2 overflow-x-auto">
                    {course.grades.slice(-3).map((grade) => (
                      <div key={grade.id} className="flex-shrink-0">
                        <div
                          className={`text-xs px-2 py-1 rounded ${getGradeColor(
                            grade.percentage
                          )}`}
                        >
                          {grade.letterGrade}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}