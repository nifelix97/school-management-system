import React, { useEffect, useState } from "react";
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoCloudDownloadOutline,
  IoDocumentTextOutline,
  IoListOutline,
  IoPlayOutline,
  IoStopwatchOutline,
  IoTimeOutline
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface Question {
  id: string;
  questionText: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer?: string;
  points: number;
}

interface Exam {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  type: "exam" | "quiz";
  duration: number; // in minutes
  totalPoints: number;
  totalQuestions: number;
  startDate: string;
  endDate: string;
  status: "upcoming" | "available" | "in-progress" | "completed" | "expired";
  instructions: string;
  questions?: Question[];
  attemptedDate?: string;
  score?: number;
  timeSpent?: number;
}

const OnlineExamPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("available");
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Mock data for exams
  const [exams] = useState<Exam[]>([
    {
      id: "EXM-2024-001",
      title: "Final Exam - Computer Science",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      type: "exam",
      duration: 120,
      totalPoints: 100,
      totalQuestions: 50,
      startDate: "2024-12-01T09:00:00",
      endDate: "2024-12-10T23:59:59",
      status: "available",
      instructions:
        "This is a comprehensive final exam covering all topics from the semester. Read each question carefully. You have 2 hours to complete the exam. Once started, the timer cannot be paused.",
      questions: [
        {
          id: "q1",
          questionText: "What does CPU stand for?",
          type: "multiple-choice",
          options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Central Processor Utility",
          ],
          correctAnswer: "Central Processing Unit",
          points: 2,
        },
        {
          id: "q2",
          questionText:
            "Which of the following is a programming language?",
          type: "multiple-choice",
          options: ["HTML", "CSS", "Python", "All of the above"],
          correctAnswer: "All of the above",
          points: 2,
        },
        {
          id: "q3",
          questionText: "Binary code uses only 0s and 1s.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: "True",
          points: 1,
        },
        {
          id: "q4",
          questionText: "What is the purpose of an operating system?",
          type: "short-answer",
          points: 5,
        },
        {
          id: "q5",
          questionText:
            "Which data structure uses LIFO (Last In First Out) principle?",
          type: "multiple-choice",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correctAnswer: "Stack",
          points: 2,
        },
      ],
    },
    {
      id: "QUZ-2024-002",
      title: "Quiz 3 - Data Structures",
      courseCode: "CS201",
      courseName: "Data Structures and Algorithms",
      type: "quiz",
      duration: 30,
      totalPoints: 20,
      totalQuestions: 10,
      startDate: "2024-12-03T14:00:00",
      endDate: "2024-12-03T23:59:59",
      status: "available",
      instructions:
        "This quiz covers topics from Week 8-10. You have 30 minutes to complete it.",
      questions: [
        {
          id: "q1",
          questionText: "What is the time complexity of binary search?",
          type: "multiple-choice",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correctAnswer: "O(log n)",
          points: 2,
        },
        {
          id: "q2",
          questionText: "A tree with only one node has a height of 0.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: "True",
          points: 2,
        },
      ],
    },
    {
      id: "EXM-2024-003",
      title: "Midterm Exam - Calculus II",
      courseCode: "MATH201",
      courseName: "Calculus II",
      type: "exam",
      duration: 90,
      totalPoints: 80,
      totalQuestions: 40,
      startDate: "2024-11-20T10:00:00",
      endDate: "2024-11-20T23:59:59",
      status: "completed",
      instructions: "Midterm exam covering chapters 1-5.",
      attemptedDate: "2024-11-20T10:30:00",
      score: 72,
      timeSpent: 85,
    },
    {
      id: "QUZ-2024-004",
      title: "Quiz 1 - Introduction to Physics",
      courseCode: "PHY101",
      courseName: "Physics I",
      type: "quiz",
      duration: 20,
      totalPoints: 15,
      totalQuestions: 8,
      startDate: "2024-12-15T09:00:00",
      endDate: "2024-12-15T23:59:59",
      status: "upcoming",
      instructions: "Basic concepts quiz.",
    },
  ]);

  // Timer countdown
  useEffect(() => {
    if (isExamStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isExamStarted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
    setIsExamStarted(true);
    setTimeRemaining(exam.duration * 60);
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleAutoSubmit = () => {
    // Auto-submit when time runs out
    handleSubmitExam();
  };

  const handleSubmitExam = () => {
    if (!selectedExam) return;

    // Calculate score (for demo purposes)
    let score = 0;
    if (selectedExam.questions) {
      selectedExam.questions.forEach((q) => {
        if (q.correctAnswer && answers[q.id] === q.correctAnswer) {
          score += q.points;
        }
      });
    }

    const percentage = Math.round((score / selectedExam.totalPoints) * 100);
    
    const result = {
      score,
      total: selectedExam.totalPoints,
      exam: selectedExam,
      percentage,
      date: new Date().toLocaleString(),
    };

    setIsExamStarted(false);
    setShowSubmitConfirm(false);
    
    // Navigate to dedicated result template page
    navigate("/online-exam/result", { state: { examResult: result } });
  };

  const handleDownloadResult = (exam: Exam, score: number = 0) => {
    const result = {
      score,
      total: exam.totalPoints,
      exam: exam,
      percentage: Math.round((score / exam.totalPoints) * 100),
      date: exam.attemptedDate || new Date().toLocaleString(),
    };
    navigate("/online-exam/result", { state: { examResult: result } });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      case "expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <IoPlayOutline className="w-5 h-5 text-green-600" />;
      case "upcoming":
        return <IoTimeOutline className="w-5 h-5 text-blue-600" />;
      case "completed":
        return <IoCheckmarkCircleOutline className="w-5 h-5 text-gray-600" />;
      case "expired":
        return <IoCloseCircleOutline className="w-5 h-5 text-red-600" />;
      default:
        return <IoDocumentTextOutline className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredExams = exams.filter(
    (exam) => filterStatus === "all" || exam.status === filterStatus
  );

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const currentQuestion = selectedExam?.questions?.[currentQuestionIndex];

  // Exam Taking View
  if (isExamStarted && selectedExam) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Fixed Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10 print:hidden">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-primary-50">
                  {selectedExam.title}
                </h1>
                <p className="text-sm text-primary-50/60">
                  {selectedExam.courseCode} - {selectedExam.courseName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* Timer */}
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    timeRemaining < 300
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  <IoStopwatchOutline className="w-5 h-5" />
                  <span className="font-bold text-lg">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                {/* Progress */}
                <div className="text-sm text-primary-50/60">
                  Question {currentQuestionIndex + 1} of{" "}
                  {selectedExam.questions?.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Question Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                {currentQuestion && (
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-lg font-bold text-primary-50">
                        Question {currentQuestionIndex + 1}
                      </h2>
                      <span className="px-3 py-1 bg-primary-50/10 text-primary-50 rounded-full text-sm font-medium">
                        {currentQuestion.points} points
                      </span>
                    </div>

                    <p className="text-primary-50 mb-6 text-lg">
                      {currentQuestion.questionText}
                    </p>

                    {/* Answer Options */}
                    <div className="space-y-3">
                      {currentQuestion.type === "multiple-choice" ||
                      currentQuestion.type === "true-false" ? (
                        currentQuestion.options?.map((option, index) => (
                          <label
                            key={index}
                            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              answers[currentQuestion.id] === option
                                ? "border-primary-50 bg-primary-50/5"
                                : "border-gray-200 hover:border-primary-50/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name={currentQuestion.id}
                              value={option}
                              checked={answers[currentQuestion.id] === option}
                              onChange={(e) =>
                                handleAnswerChange(
                                  currentQuestion.id,
                                  e.target.value
                                )
                              }
                              className="w-5 h-5 text-primary-50"
                            />
                            <span className="text-primary-50 font-medium">
                              {option}
                            </span>
                          </label>
                        ))
                      ) : (
                        <textarea
                          rows={6}
                          value={answers[currentQuestion.id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(
                              currentQuestion.id,
                              e.target.value
                            )
                          }
                          placeholder="Type your answer here..."
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm resize-none"
                        />
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                      <button
                        onClick={() =>
                          setCurrentQuestionIndex(
                            Math.max(0, currentQuestionIndex - 1)
                          )
                        }
                        disabled={currentQuestionIndex === 0}
                        className="px-6 py-2 border border-gray-200 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {currentQuestionIndex ===
                      (selectedExam.questions?.length || 0) - 1 ? (
                        <button
                          onClick={() => setShowSubmitConfirm(true)}
                          className="px-6 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors font-medium"
                        >
                          Submit Exam
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setCurrentQuestionIndex(currentQuestionIndex + 1)
                          }
                          className="px-6 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Question Navigator Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-24">
                <h3 className="font-bold text-primary-50 mb-4 flex items-center gap-2">
                  <IoListOutline className="w-5 h-5" />
                  Questions
                </h3>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2 mb-4">
                  {selectedExam.questions?.map((q, index) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`aspect-square rounded-lg font-medium text-sm transition-all ${
                        index === currentQuestionIndex
                          ? "bg-primary-50 text-white"
                          : answers[q.id]
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-primary-50/60 space-y-1">
                  <p>
                    Answered: {getAnsweredCount()} /{" "}
                    {selectedExam.questions?.length}
                  </p>
                  <p>
                    Unanswered:{" "}
                    {(selectedExam.questions?.length || 0) - getAnsweredCount()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center">
                <IoAlertCircleOutline className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-primary-50 mb-2">
                  Submit Exam?
                </h2>
                <p className="text-primary-50/60 mb-4">
                  You have answered {getAnsweredCount()} out of{" "}
                  {selectedExam.questions?.length} questions.
                </p>
                {getAnsweredCount() < (selectedExam.questions?.length || 0) && (
                  <p className="text-red-600 text-sm mb-4">
                    Warning: You have unanswered questions!
                  </p>
                )}
                <p className="text-sm text-primary-50/60 mb-6">
                  Once submitted, you cannot change your answers.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSubmitConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Review Answers
                  </button>
                  <button
                    onClick={handleSubmitExam}
                    className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors font-medium"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Exam List View
  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2 flex items-center gap-3">
            <IoDocumentTextOutline className="w-7 h-7 sm:w-8 sm:h-8" />
            Online Exams & Quizzes
          </h1>
          <p className="text-sm sm:text-base text-primary-50/60">
            View and take your online assessments
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-primary-50 mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
            >
              <option value="all">All Exams</option>
              <option value="available">Available</option>
              <option value="upcoming">Upcoming</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exams List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:border-primary-50/30 transition-colors"
          >
            <div className="flex items-start gap-3 mb-4">
              {getStatusIcon(exam.status)}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-primary-50">{exam.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      exam.status
                    )}`}
                  >
                    {exam.status}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                    {exam.type}
                  </span>
                </div>
                <p className="text-sm text-primary-50/60">
                  {exam.courseCode} - {exam.courseName}
                </p>
              </div>
            </div>

            {/* Exam Details */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-primary-50/60 mb-1">Duration</p>
                <p className="text-sm font-bold text-primary-50">
                  {exam.duration} mins
                </p>
              </div>
              <div>
                <p className="text-xs text-primary-50/60 mb-1">Questions</p>
                <p className="text-sm font-bold text-primary-50">
                  {exam.totalQuestions}
                </p>
              </div>
              <div>
                <p className="text-xs text-primary-50/60 mb-1">Total Points</p>
                <p className="text-sm font-bold text-primary-50">
                  {exam.totalPoints}
                </p>
              </div>
              <div>
              <p className="text-xs text-primary-50/60 mb-1">
                {exam.status === "completed" ? "Score" : "Available Until"}
              </p>
              <p className="text-sm font-bold text-primary-50">
                {exam.status === "completed"
                  ? `${exam.score}/${exam.totalPoints}`
                  : new Date(exam.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

            {/* Instructions Preview */}
            {exam.instructions && (
              <p className="text-sm text-primary-50/60 mb-4 line-clamp-2">
                {exam.instructions}
              </p>
            )}

            {/* Action Button */}
            {exam.status === "available" && (
              <button
                onClick={() => handleStartExam(exam)}
                className="w-full px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <IoPlayOutline className="w-5 h-5" />
                Start {exam.type === "exam" ? "Exam" : "Quiz"}
              </button>
            )}

            {exam.status === "completed" && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <IoCheckmarkCircleOutline className="w-5 h-5 text-green-600" />
                  <div>
                    <span className="block text-sm font-bold text-green-700">
                      Score: {exam.score}/{exam.totalPoints} ({Math.round(((exam.score || 0) / exam.totalPoints) * 100)}%)
                    </span>
                    <span className="text-xs text-green-600/70">Completed on {exam.attemptedDate ? new Date(exam.attemptedDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDownloadResult(exam, exam.score)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-all text-sm font-bold shadow-sm"
                >
                  <IoCloudDownloadOutline className="w-4 h-4" />
                  Download Result
                </button>
              </div>
            )}

            {exam.status === "upcoming" && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                <p className="text-sm text-blue-700">
                  Available from{" "}
                  {new Date(exam.startDate).toLocaleString()}
                </p>
              </div>
            )}

            {exam.status === "expired" && (
              <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center">
                <p className="text-sm text-red-700">
                  This {exam.type} has expired
                </p>
              </div>
            )}
          </div>
        ))}

        {filteredExams.length === 0 && (
          <div className="col-span-full text-center py-12">
            <IoDocumentTextOutline className="w-16 h-16 text-primary-50/20 mx-auto mb-4" />
            <p className="text-primary-50/60">
              No {filterStatus !== "all" ? filterStatus : ""} exams found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineExamPage;
