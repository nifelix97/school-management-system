import React, { useState } from "react";
import {
    IoAddOutline,
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoChevronDownOutline,
    IoChevronUpOutline,
    IoCloseOutline,
    IoCreateOutline,
    IoDocumentTextOutline,
    IoEyeOutline,
    IoListOutline,
    IoSaveOutline,
    IoSearchOutline,
    IoTimeOutline,
    IoTrashOutline
} from "react-icons/io5";

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
  status: "upcoming" | "available" | "completed" | "expired";
  instructions: string;
  questions?: Question[];
}

const ManageExamsPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([
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
        "This is a comprehensive final exam covering all topics from the semester. Read each question carefully.",
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
      instructions: "This quiz covers topics from Week 8-10.",
      questions: [],
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Courses for dropdown
  const courses = [
    { code: "CS101", name: "Introduction to Computer Science" },
    { code: "CS201", name: "Data Structures and Algorithms" },
    { code: "MATH201", name: "Calculus II" },
    { code: "PHY101", name: "Physics I" },
  ];

  // Filter exams
  const filteredExams = exams.filter((exam) => {
    const matchesStatus = filterStatus === "all" || exam.status === filterStatus;
    const matchesType = filterType === "all" || exam.type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  // Statistics
  const stats = {
    total: exams.length,
    active: exams.filter((e) => e.status === "available").length,
    upcoming: exams.filter((e) => e.status === "upcoming").length,
    completed: exams.filter((e) => e.status === "completed").length,
  };

  // Handle view exam
  const handleViewExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowViewModal(true);
  };

  // Handle create exam
  const handleCreateExam = () => {
    const newExam: Exam = {
      id: `EXM-${Date.now()}`,
      title: "",
      courseCode: "",
      courseName: "",
      type: "exam",
      duration: 60,
      totalPoints: 0,
      totalQuestions: 0,
      startDate: "",
      endDate: "",
      status: "upcoming",
      instructions: "",
      questions: [],
    };
    setEditingExam(newExam);
    setShowCreateModal(true);
  };

  // Handle edit exam
  const handleEditExam = (exam: Exam) => {
    setEditingExam({ ...exam });
    setShowCreateModal(true);
  };

  // Handle save exam
  const handleSaveExam = () => {
    if (!editingExam) return;

    // Calculate total points and questions
    const totalPoints = editingExam.questions?.reduce((sum, q) => sum + q.points, 0) || 0;
    const totalQuestions = editingExam.questions?.length || 0;

    const updatedExam = {
      ...editingExam,
      totalPoints,
      totalQuestions,
    };

    if (exams.find((e) => e.id === updatedExam.id)) {
      // Update existing
      setExams(exams.map((e) => (e.id === updatedExam.id ? updatedExam : e)));
    } else {
      // Add new
      setExams([...exams, updatedExam]);
    }

    setShowCreateModal(false);
    setEditingExam(null);
  };

  // Handle delete exam
  const handleDeleteExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedExam) {
      setExams(exams.filter((e) => e.id !== selectedExam.id));
    }
    setShowDeleteConfirm(false);
    setSelectedExam(null);
  };

  // Handle add/edit question
  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setShowQuestionForm(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  const handleSaveQuestion = (question: Question) => {
    if (!editingExam) return;

    let updatedQuestions = [...(editingExam.questions || [])];

    if (editingQuestion) {
      // Update existing question
      updatedQuestions = updatedQuestions.map((q) =>
        q.id === editingQuestion.id ? question : q
      );
    } else {
      // Add new question
      updatedQuestions.push({ ...question, id: `q${Date.now()}` });
    }

    setEditingExam({
      ...editingExam,
      questions: updatedQuestions,
    });

    setShowQuestionForm(false);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (!editingExam) return;

    setEditingExam({
      ...editingExam,
      questions: editingExam.questions?.filter((q) => q.id !== questionId),
    });
  };

  const handleMoveQuestion = (index: number, direction: "up" | "down") => {
    if (!editingExam || !editingExam.questions) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= editingExam.questions.length) return;

    const updatedQuestions = [...editingExam.questions];
    [updatedQuestions[index], updatedQuestions[newIndex]] = [
      updatedQuestions[newIndex],
      updatedQuestions[index],
    ];

    setEditingExam({
      ...editingExam,
      questions: updatedQuestions,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700";
      case "upcoming":
        return "bg-blue-100 text-blue-700";
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
        return <IoCheckmarkCircleOutline className="w-5 h-5 text-green-600" />;
      case "upcoming":
        return <IoTimeOutline className="w-5 h-5 text-blue-600" />;
      case "completed":
        return <IoCheckmarkCircleOutline className="w-5 h-5 text-gray-600" />;
      case "expired":
        return <IoCloseOutline className="w-5 h-5 text-red-600" />;
      default:
        return <IoDocumentTextOutline className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 xs:p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-2 flex items-center gap-3">
          <IoDocumentTextOutline className="w-7 h-7 sm:w-8 sm:h-8" />
          Manage Exams & Quizzes
        </h1>
        <p className="text-sm sm:text-base text-primary-50/60">
          Create and manage online assessments for your students
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm text-primary-50/60">Total Exams</p>
            <IoDocumentTextOutline className="w-5 h-5 text-primary-50/40" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-primary-50">{stats.total}</p>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm text-primary-50/60">Active</p>
            <IoCheckmarkCircleOutline className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.active}</p>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm text-primary-50/60">Upcoming</p>
            <IoTimeOutline className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.upcoming}</p>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs sm:text-sm text-primary-50/60">Completed</p>
            <IoCheckmarkCircleOutline className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-600">{stats.completed}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-50/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exams..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
              />
            </div>
          </div>

          {/* Filter by Status */}
          <div className="flex-1 sm:max-w-xs">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          {/* Filter by Type */}
          <div className="flex-1 sm:max-w-xs">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
            >
              <option value="all">All Types</option>
              <option value="exam">Exams</option>
              <option value="quiz">Quizzes</option>
            </select>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreateExam}
            className="px-4 sm:px-6 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <IoAddOutline className="w-5 h-5" />
            <span className="hidden sm:inline">Create Exam</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>

      {/* Exams List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:border-primary-50/30 transition-colors cursor-pointer"
            onClick={() => handleViewExam(exam)}
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
                <p className="text-sm font-bold text-primary-50">{exam.duration} mins</p>
              </div>
              <div>
                <p className="text-xs text-primary-50/60 mb-1">Questions</p>
                <p className="text-sm font-bold text-primary-50">{exam.totalQuestions}</p>
              </div>
              <div>
                <p className="text-xs text-primary-50/60 mb-1">Total Points</p>
                <p className="text-sm font-bold text-primary-50">{exam.totalPoints}</p>
              </div>
              <div>
                <p className="text-xs text-primary-50/60 mb-1">End Date</p>
                <p className="text-sm font-bold text-primary-50">
                  {new Date(exam.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewExam(exam);
                }}
                className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <IoEyeOutline className="w-5 h-5" />
                View
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditExam(exam);
                }}
                className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <IoCreateOutline className="w-5 h-5" />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteExam(exam);
                }}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <IoTrashOutline className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {filteredExams.length === 0 && (
          <div className="col-span-full text-center py-12">
            <IoDocumentTextOutline className="w-16 h-16 text-primary-50/20 mx-auto mb-4" />
            <p className="text-primary-50/60">No exams found</p>
          </div>
        )}
      </div>

      {/* Create/Edit Exam Modal */}
      {showCreateModal && editingExam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-xl z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary-50">
                  {exams.find((e) => e.id === editingExam.id) ? "Edit Exam" : "Create Exam"}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingExam(null);
                  }}
                  className="p-2 text-primary-50 hover:bg-gray-100 rounded-lg"
                >
                  <IoCloseOutline className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Basic Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary-50 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingExam.title}
                      onChange={(e) =>
                        setEditingExam({ ...editingExam, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                      placeholder="Exam title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">Type</label>
                    <select
                      value={editingExam.type}
                      onChange={(e) =>
                        setEditingExam({
                          ...editingExam,
                          type: e.target.value as "exam" | "quiz",
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                    >
                      <option value="exam">Exam</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Course
                    </label>
                    <select
                      value={editingExam.courseCode}
                      onChange={(e) => {
                        const course = courses.find((c) => c.code === e.target.value);
                        setEditingExam({
                          ...editingExam,
                          courseCode: e.target.value,
                          courseName: course?.name || "",
                        });
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                    >
                      <option value="">Select course...</option>
                      {courses.map((course) => (
                        <option key={course.code} value={course.code}>
                          {course.code} - {course.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={editingExam.duration}
                      onChange={(e) =>
                        setEditingExam({
                          ...editingExam,
                          duration: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Status
                    </label>
                    <select
                      value={editingExam.status}
                      onChange={(e) =>
                        setEditingExam({
                          ...editingExam,
                          status: e.target.value as Exam["status"],
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="available">Available</option>
                      <option value="completed">Completed</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Start Date
                    </label>
                    <input
                      type="datetime-local"
                      value={editingExam.startDate.slice(0, 16)}
                      onChange={(e) =>
                        setEditingExam({ ...editingExam, startDate: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      End Date
                    </label>
                    <input
                      type="datetime-local"
                      value={editingExam.endDate.slice(0, 16)}
                      onChange={(e) =>
                        setEditingExam({ ...editingExam, endDate: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Instructions
                    </label>
                    <textarea
                      value={editingExam.instructions}
                      onChange={(e) =>
                        setEditingExam({ ...editingExam, instructions: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50 resize-none"
                      rows={3}
                      placeholder="Exam instructions..."
                    />
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary-50">
                    Questions ({editingExam.questions?.length || 0})
                  </h3>
                  <button
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors font-medium flex items-center gap-2"
                  >
                    <IoAddOutline className="w-5 h-5" />
                    Add Question
                  </button>
                </div>

                {editingExam.questions && editingExam.questions.length > 0 ? (
                  <div className="space-y-3">
                    {editingExam.questions.map((question, index) => (
                      <div
                        key={question.id}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-primary-50">
                                Question {index + 1}
                              </span>
                              <span className="px-2 py-1 bg-gray-200 text-primary-50 rounded text-xs capitalize">
                                {question.type.replace("-", " ")}
                              </span>
                              <span className="px-2 py-1 bg-primary-50 text-white rounded text-xs">
                                {question.points} pts
                              </span>
                            </div>
                            <p className="text-sm text-primary-50 mb-2">{question.questionText}</p>
                            {question.type === "multiple-choice" && question.options && (
                              <div className="ml-4 space-y-1">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center gap-2 text-xs">
                                    <span
                                      className={`w-3 h-3 rounded-full border-2 ${
                                        question.correctAnswer === option
                                          ? "bg-green-500 border-green-500"
                                          : "border-gray-300"
                                      }`}
                                    />
                                    <span
                                      className={
                                        question.correctAnswer === option ? "font-medium" : ""
                                      }
                                    >
                                      {option}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMoveQuestion(index, "up")}
                              disabled={index === 0}
                              className="p-2 text-primary-50 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <IoChevronUpOutline className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMoveQuestion(index, "down")}
                              disabled={index === editingExam.questions!.length - 1}
                              className="p-2 text-primary-50 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <IoChevronDownOutline className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditQuestion(question)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <IoCreateOutline className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <IoTrashOutline className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-primary-50/60 bg-gray-50 rounded-lg">
                    <IoListOutline className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No questions added yet. Click "Add Question" to get started.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6 rounded-b-xl">
              <div className="flex gap-3">
                <button
                  onClick={handleSaveExam}
                  className="flex-1 px-6 py-3 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <IoSaveOutline className="w-5 h-5" />
                  Save Exam
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingExam(null);
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Question Form Modal */}
      {showQuestionForm && (
        <QuestionFormModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onClose={() => {
            setShowQuestionForm(false);
            setEditingQuestion(null);
          }}
        />
      )}

      {/* View Exam Modal */}
      {showViewModal && selectedExam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-primary-50">{selectedExam.title}</h2>
                  <p className="text-sm text-primary-50/60 mt-1">
                    {selectedExam.courseCode} - {selectedExam.courseName}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedExam(null);
                  }}
                  className="p-2 text-primary-50 hover:bg-gray-100 rounded-lg"
                >
                  <IoCloseOutline className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Exam Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary-50 mb-4">Exam Information</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-primary-50/60 mb-1">Type</p>
                    <p className="text-sm font-bold text-primary-50 capitalize">{selectedExam.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-50/60 mb-1">Duration</p>
                    <p className="text-sm font-bold text-primary-50">{selectedExam.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-50/60 mb-1">Total Questions</p>
                    <p className="text-sm font-bold text-primary-50">{selectedExam.totalQuestions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-50/60 mb-1">Total Points</p>
                    <p className="text-sm font-bold text-primary-50">{selectedExam.totalPoints}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-50/60 mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedExam.status
                      )}`}
                    >
                      {selectedExam.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-primary-50/60 mb-1">Start Date</p>
                    <p className="text-sm font-bold text-primary-50">
                      {new Date(selectedExam.startDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-primary-50/60 mb-1">End Date</p>
                    <p className="text-sm font-bold text-primary-50">
                      {new Date(selectedExam.endDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              {selectedExam.instructions && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-primary-50 mb-2">Instructions</h3>
                  <p className="text-sm text-primary-50/80 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    {selectedExam.instructions}
                  </p>
                </div>
              )}

              {/* Questions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary-50 mb-4">
                  Questions ({selectedExam.questions?.length || 0})
                </h3>
                {selectedExam.questions && selectedExam.questions.length > 0 ? (
                  <div className="space-y-4">
                    {selectedExam.questions.map((question, index) => (
                      <div
                        key={question.id}
                        className="border border-gray-200 rounded-lg p-4 bg-white"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-bold text-primary-50">
                                Question {index + 1}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-primary-50 rounded text-xs capitalize">
                                {question.type.replace("-", " ")}
                              </span>
                              <span className="px-2 py-1 bg-primary-50 text-white rounded text-xs font-medium">
                                {question.points} {question.points === 1 ? "point" : "points"}
                              </span>
                            </div>
                            <p className="text-sm text-primary-50 font-medium mb-3">
                              {question.questionText}
                            </p>

                            {/* Multiple Choice Options */}
                            {question.type === "multiple-choice" && question.options && (
                              <div className="ml-4 space-y-2">
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                                      question.correctAnswer === option
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200 bg-gray-50"
                                    }`}
                                  >
                                    <span
                                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        question.correctAnswer === option
                                          ? "bg-green-500 border-green-500"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {question.correctAnswer === option && (
                                        <IoCheckmarkCircleOutline className="w-4 h-4 text-white" />
                                      )}
                                    </span>
                                    <span
                                      className={`text-sm ${
                                        question.correctAnswer === option
                                          ? "font-semibold text-green-700"
                                          : "text-primary-50"
                                      }`}
                                    >
                                      {option}
                                      {question.correctAnswer === option && (
                                        <span className="ml-2 text-xs text-green-600">
                                          (Correct Answer)
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* True/False */}
                            {question.type === "true-false" && (
                              <div className="ml-4 p-3 bg-green-50 rounded-lg border-2 border-green-500">
                                <span className="text-sm font-semibold text-green-700">
                                  Correct Answer: {question.correctAnswer}
                                </span>
                              </div>
                            )}

                            {/* Short Answer */}
                            {question.type === "short-answer" && (
                              <div className="ml-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-xs text-blue-600 mb-1">Expected Answer:</p>
                                <p className="text-sm text-primary-50">
                                  {question.correctAnswer || "Open-ended question (manual grading required)"}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-primary-50/60 bg-gray-50 rounded-lg">
                    <IoListOutline className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No questions added to this exam yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6 rounded-b-xl">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditExam(selectedExam);
                  }}
                  className="flex-1 px-6 py-3 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <IoCreateOutline className="w-5 h-5" />
                  Edit Exam
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedExam(null);
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedExam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <IoAlertCircleOutline className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-primary-50 mb-2">Delete Exam?</h2>
              <p className="text-primary-50/60 mb-4">
                Are you sure you want to delete "{selectedExam.title}"?
              </p>
              <p className="text-sm text-red-600 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedExam(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 text-primary-50 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Question Form Modal Component
interface QuestionFormModalProps {
  question: Question | null;
  onSave: (question: Question) => void;
  onClose: () => void;
}

const QuestionFormModal: React.FC<QuestionFormModalProps> = ({
  question,
  onSave,
  onClose,
}) => {
  // Initialize form data with padding for options if needed
  const [formData, setFormData] = useState<Question>(() => {
    if (question) {
      // If editing existing question, ensure we have at least 4 option slots for UI
      const paddedOptions = [...(question.options || [])];
      while (paddedOptions.length < 4) {
        paddedOptions.push("");
      }
      return {
        ...question,
        options: paddedOptions,
      };
    }
    return {
      id: "",
      questionText: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 1,
    };
  });

  const handleSave = () => {
    if (!formData.questionText.trim()) {
      alert("Please enter a question");
      return;
    }

    let finalFormData = { ...formData };

    if (formData.type === "multiple-choice") {
      // Filter out empty options
      const validOptions = formData.options?.filter((opt) => opt && opt.trim() !== "") || [];
      
      if (validOptions.length < 2) {
        alert("Please provide at least 2 valid options for a multiple choice question.");
        return;
      }

      // Check if correct answer is selected and valid
      if (!formData.correctAnswer || !validOptions.includes(formData.correctAnswer)) {
        alert("Please select a valid correct answer.");
        return;
      }

      // Update options to only include valid ones
      finalFormData.options = validOptions;
    }

    if (formData.type === "true-false") {
      if (!formData.correctAnswer) {
        alert("Please select the correct answer (True or False)");
        return;
      }
    }

    onSave(finalFormData);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(formData.options || [])];
    const oldOptionValue = newOptions[index];
    newOptions[index] = value;

    // If the changed option was the correct answer, update the correct answer text too
    let newCorrectAnswer = formData.correctAnswer;
    if (formData.correctAnswer === oldOptionValue) {
      newCorrectAnswer = value;
    }

    setFormData({
      ...formData,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-xl z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary-50">
              {question ? "Edit Question" : "Add Question"}
            </h3>
            <button onClick={onClose} className="p-2 text-primary-50 hover:bg-gray-100 rounded-lg">
              <IoCloseOutline className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {/* Question Type */}
          <div>
            <label className="block text-sm font-medium text-primary-50 mb-2">Question Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as Question["type"],
                  options:
                    e.target.value === "multiple-choice" ? ["", "", "", ""] : undefined,
                  correctAnswer: "",
                })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
            </select>
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-primary-50 mb-2">Question</label>
            <textarea
              value={formData.questionText}
              onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50 resize-none"
              rows={4}
              placeholder="Enter your question..."
            />
          </div>

          {/* Multiple Choice Options */}
          {formData.type === "multiple-choice" && (
            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Options (fill at least 2, select the correct answer)
              </label>
              {formData.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="correct"
                    checked={formData.correctAnswer === option && option !== ""}
                    onChange={() => setFormData({ ...formData, correctAnswer: option })}
                    className="text-primary-50"
                    disabled={!option.trim()}
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* True/False */}
          {formData.type === "true-false" && (
            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Correct Answer
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tf-answer"
                    checked={formData.correctAnswer === "True"}
                    onChange={() => setFormData({ ...formData, correctAnswer: "True" })}
                    className="text-primary-50"
                  />
                  <span className="text-sm text-primary-50">True</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tf-answer"
                    checked={formData.correctAnswer === "False"}
                    onChange={() => setFormData({ ...formData, correctAnswer: "False" })}
                    className="text-primary-50"
                  />
                  <span className="text-sm text-primary-50">False</span>
                </label>
              </div>
            </div>
          )}

          {/* Points */}
          <div>
            <label className="block text-sm font-medium text-primary-50 mb-2">Points</label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) =>
                setFormData({ ...formData, points: parseInt(e.target.value) || 1 })
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-50 text-sm text-primary-50"
              min="1"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6 rounded-b-xl">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-primary-50 text-white rounded-lg hover:bg-primary-50/90 transition-colors font-medium"
            >
              {question ? "Update Question" : "Add Question"}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageExamsPage;
