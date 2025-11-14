import { useState } from "react";
import {
  ChevronLeft,
  Plus,
  Save,
  BookOpen,
  X,
  Edit3,
  Trash2,
} from "lucide-react";

interface Question {
  id: number;
  type: "multiple-choice" | "text" | "essay" | "true-false";
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

interface Assignment {
  title: string;
  type: "assignment" | "quiz" | "exam" | "project" | "lab";
  course: string;
  dueDate: string;
  maxScore: number;
  instructions: string;
  questions: Question[];
  timeLimit?: number;
  attempts?: number;
}

export default function CreateAssignment() {
  const [assignment, setAssignment] = useState<Assignment>({
    title: "",
    type: "quiz",
    course: "",
    dueDate: "",
    maxScore: 0,
    instructions: "",
    questions: [],
    timeLimit: 60,
    attempts: 1,
  });

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const courses = [
    { id: 1, name: "Advanced Mathematics", code: "MATH 301" },
    { id: 2, name: "Physics Laboratory", code: "PHYS 201" },
    { id: 3, name: "Organic Chemistry", code: "CHEM 301" },
  ];



  const addQuestion = (question: Question) => {
    if (editingQuestion) {
      setAssignment(prev => ({
        ...prev,
        questions: prev.questions.map(q => q.id === editingQuestion.id ? question : q)
      }));
    } else {
      setAssignment(prev => ({
        ...prev,
        questions: [...prev.questions, { ...question, id: Date.now() }]
      }));
    }
    setEditingQuestion(null);
    setShowQuestionForm(false);
    updateMaxScore();
  };

  const deleteQuestion = (id: number) => {
    setAssignment(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
    updateMaxScore();
  };

  const updateMaxScore = () => {
    const total = assignment.questions.reduce((sum, q) => sum + q.points, 0);
    setAssignment(prev => ({ ...prev, maxScore: total }));
  };

  const saveAssignment = () => {
    console.log("Saving assignment:", assignment);
    alert("Assignment saved successfully!");
  };

  const QuestionForm = () => {
    const [question, setQuestion] = useState<Question>(
      editingQuestion || {
        id: 0,
        type: "multiple-choice",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        points: 1,
      }
    );
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    return (
      <div className="fixed inset-0 shadow-lg shadow-black bg-primary-50/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg xs:rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 xs:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-50">
                {editingQuestion ? "Edit Question" : "Add Question"}
              </h3>
              <button
                onClick={() => {
                  setShowQuestionForm(false);
                  setEditingQuestion(null);
                }}
                className="p-2 text-primary-50 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step === currentStep
                          ? 'bg-primary-50 text-white'
                          : step < currentStep
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-primary-50">Step {currentStep} of {totalSteps}</span>
              </div>
            </div>

            <div className="space-y-4">
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Question Type
                    </label>
                    <select
                      value={question.type}
                      onChange={(e) => setQuestion(prev => ({ 
                        ...prev, 
                        type: e.target.value as Question["type"],
                        options: e.target.value === "multiple-choice" ? ["", "", "", ""] : undefined,
                        correctAnswer: e.target.value === "true-false" ? 0 : prev.correctAnswer
                      }))}
                      className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg"
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="text">Short Answer</option>
                      <option value="essay">Essay</option>
                      <option value="true-false">True/False</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-50 mb-2">
                      Question
                    </label>
                    <textarea
                      value={question.question}
                      onChange={(e) => setQuestion(prev => ({ ...prev, question: e.target.value }))}
                      className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg h-32"
                      placeholder="Enter your question..."
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {question.type === "multiple-choice" && (
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Options
                      </label>
                      {question.options?.map((option, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                          <input
                            type="radio"
                            name="correct"
                            checked={question.correctAnswer === index}
                            onChange={() => setQuestion(prev => ({ ...prev, correctAnswer: index }))}
                            className="text-primary-50"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(question.options || [])];
                              newOptions[index] = e.target.value;
                              setQuestion(prev => ({ ...prev, options: newOptions }));
                            }}
                            className="flex-1 px-3 py-2 border border-primary-50 rounded-lg"
                            placeholder={`Option ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Correct Answer
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="tf-answer"
                            checked={question.correctAnswer === 0}
                            onChange={() => setQuestion(prev => ({ ...prev, correctAnswer: 0 }))}
                          />
                          <span>True</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="tf-answer"
                            checked={question.correctAnswer === 1}
                            onChange={() => setQuestion(prev => ({ ...prev, correctAnswer: 1 }))}
                          />
                          <span>False</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {question.type === "text" && (
                    <div>
                      <label className="block text-sm font-medium text-primary-50 mb-2">
                        Sample Answer (Optional)
                      </label>
                      <input
                        type="text"
                        value={question.correctAnswer as string || ""}
                        onChange={(e) => setQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                        className="w-full px-3 py-2 border border-primary-50 rounded-lg"
                        placeholder="Expected answer..."
                      />
                    </div>
                  )}

                  {question.type === "essay" && (
                    <div className="text-center py-8 text-primary-50">
                      <p>Essay questions don't require answer configuration.</p>
                      <p className="text-sm mt-2">Students will provide written responses that you can grade manually.</p>
                    </div>
                  )}
                </>
              )}

              {currentStep === 3 && (
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Points
                  </label>
                  <input
                    type="number"
                    value={question.points}
                    onChange={(e) => setQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border border-primary-50 rounded-lg"
                    min="1"
                  />
                  <p className="text-sm text-primary-50 mt-2">How many points is this question worth?</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-opacity-80"
                >
                  Previous
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => addQuestion(question)}
                  className="flex-1 px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80"
                >
                  {editingQuestion ? "Update Question" : "Add Question"}
                </button>
              )}
              
              <button
                onClick={() => {
                  setShowQuestionForm(false);
                  setEditingQuestion(null);
                  setCurrentStep(1);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-opacity-80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4 sm:py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-primary-50 hover:text-opacity-80 mb-4 xs:mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        <h1 className="text-xl xs:text-2xl font-bold text-primary-50 mb-6">
          Create Assignment
        </h1>

        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6 mb-6">
          <h2 className="text-lg font-semibold text-primary-50 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Title
              </label>
              <input
                type="text"
                value={assignment.title}
                onChange={(e) => setAssignment(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-primary-50 rounded-lg"
                placeholder="Assignment title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Type
              </label>
              <select
                value={assignment.type}
                onChange={(e) => setAssignment(prev => ({ ...prev, type: e.target.value as Assignment["type"] }))}
                className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg"
              >
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
                <option value="exam">Exam</option>
                <option value="project">Project</option>
                <option value="lab">Lab</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Course
              </label>
              <select
                value={assignment.course}
                onChange={(e) => setAssignment(prev => ({ ...prev, course: e.target.value }))}
                className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg"
              >
                <option value="">Select course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.code}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-50 mb-2">
                Due Date
              </label>
              <input
                type="datetime-local"
                value={assignment.dueDate}
                onChange={(e) => setAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg"
              />
            </div>

            {(assignment.type === "quiz" || assignment.type === "exam") && (
              <>
                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Time Limit (minutes)
                  </label>
                  <input
                    type="number"
                    value={assignment.timeLimit}
                    onChange={(e) => setAssignment(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 60 }))}
                    className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-50 mb-2">
                    Attempts Allowed
                  </label>
                  <input
                    type="number"
                    value={assignment.attempts}
                    onChange={(e) => setAssignment(prev => ({ ...prev, attempts: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border border-primary-50 text-primary-50 rounded-lg"
                    min="1"
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-50 mb-2">
              Instructions
            </label>
            <textarea
              value={assignment.instructions}
              onChange={(e) => setAssignment(prev => ({ ...prev, instructions: e.target.value }))}
              className="w-full px-3 py-2 border border-primary-50 text-primary-50  rounded-lg h-24"
              placeholder="Assignment instructions..."
            />
          </div>
        </div>

        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-primary-50">
              Questions ({assignment.questions.length})
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary-50">
                Total Points: {assignment.maxScore}
              </span>
              <button
                onClick={() => setShowQuestionForm(true)}
                className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 flex items-center gap-2"
              >
                <Plus size={16} />
                <span className="hidden xs:inline">Add Question</span>
              </button>
            </div>
          </div>

          {assignment.questions.length === 0 ? (
            <div className="text-center py-8 text-primary-50">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>No questions added yet. Click "Add Question" to get started.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {assignment.questions
                  .slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage)
                  .map((question, index) => {
                    const actualIndex = (currentPage - 1) * questionsPerPage + index;
                    return (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-primary-50">
                                Question {actualIndex + 1}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-primary-50 rounded text-xs capitalize">
                                {question.type.replace('-', ' ')}
                              </span>
                              <span className="px-2 py-1 bg-primary-50 text-white rounded text-xs">
                                {question.points} pts
                              </span>
                            </div>
                            <p className="text-primary-50 mb-2">{question.question}</p>
                            
                            {question.type === "multiple-choice" && question.options && (
                              <div className="ml-4 space-y-1">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center gap-2 text-sm">
                                    <span className={`w-4 h-4 rounded-full border-2 ${
                                      question.correctAnswer === optIndex 
                                        ? 'bg-green-500 border-green-500' 
                                        : 'border-gray-300'
                                    }`}></span>
                                    <span className={question.correctAnswer === optIndex ? 'font-medium' : ''}>
                                      {option}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {question.type === "true-false" && (
                              <div className="ml-4 text-sm">
                                <span className="font-medium">
                                  Correct Answer: {question.correctAnswer === 0 ? 'True' : 'False'}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingQuestion(question);
                                setShowQuestionForm(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => deleteQuestion(question.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              
              {assignment.questions.length > questionsPerPage && (
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-primary-50/40 rounded-lg text-sm font-medium text-primary-50 hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-primary-50">
                    Page {currentPage} of {Math.ceil(assignment.questions.length / questionsPerPage)}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(assignment.questions.length / questionsPerPage)))}
                    disabled={currentPage === Math.ceil(assignment.questions.length / questionsPerPage)}
                    className="px-4 py-2 bg-white border border-primary-50/40 rounded-lg text-sm font-medium text-primary-50 hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={saveAssignment}
            className="flex-1 px-6 py-3 bg-primary-50 text-white rounded-lg hover:bg-opacity-80 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Assignment
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-opacity-80"
          >
            Cancel
          </button>
        </div>

        {showQuestionForm && <QuestionForm />}
      </div>
    </div>
  );
}