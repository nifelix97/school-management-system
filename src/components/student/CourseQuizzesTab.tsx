import { AlertCircle, CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import { useState } from "react";
import {
  useCompleteAttemptMutation,
  useGetCourseQuizzesQuery,
  useGetQuizQuery,
  useGetQuizResultsQuery,
  useStartQuizAttemptMutation,
  useSubmitAnswerMutation,
} from "../../app/api/quizzes";
import type { Quiz, QuizAttempt } from "../../types/quiz";

interface CourseQuizzesTabProps {
  courseId: string;
  quizzes?: Quiz[]; // Would come from a course-specific endpoint
}

export default function CourseQuizzesTab({ courseId }: CourseQuizzesTabProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const { data: quizzesData, isLoading: quizzesLoading } = useGetCourseQuizzesQuery(courseId);
  const quizzes = quizzesData?.data || [];

  const { data: quizData } = useGetQuizQuery(selectedQuiz?.id || "", { skip: !selectedQuiz });
  const [startAttempt, { isLoading: starting }] = useStartQuizAttemptMutation();
  const [submitAnswer] = useSubmitAnswerMutation();
  const [completeAttempt, { isLoading: completing }] = useCompleteAttemptMutation();
  const { data: resultsData } = useGetQuizResultsQuery(currentAttempt?.id || "", {
    skip: !currentAttempt || !currentAttempt.completedAt,
  });

  const handleStartQuiz = async () => {
    if (!selectedQuiz) return;
    try {
      const result = await startAttempt(selectedQuiz.id).unwrap();
      setCurrentAttempt(result.data ?? null);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
    } catch (error) {
      console.error("Failed to start quiz:", error);
    }
  };

  if (quizzesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-50" />
      </div>
    );
  }

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmitQuiz = async () => {
    if (!currentAttempt) return;

    try {
      // Submit all answers
      for (const [questionId, optionId] of Object.entries(selectedAnswers)) {
        await submitAnswer({
          attemptId: currentAttempt.id,
          data: { questionId, selectedOptionId: optionId },
        });
      }

      // Complete the attempt
      await completeAttempt(currentAttempt.id).unwrap();
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };

  // Show results if quiz is completed
  if (currentAttempt?.completedAt && resultsData?.data) {
    const results = resultsData.data;

    return (
      <div className="space-y-6">
        <button
          onClick={() => {
            setCurrentAttempt(null);
            setSelectedQuiz(null);
          }}
          className="text-primary-50 hover:text-opacity-80 flex items-center gap-2"
        >
          ← Back to Quizzes
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              results.passed ? "bg-green-100" : "bg-red-100"
            }`}>
              {results.passed ? (
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-primary-50 mb-2">
              {results.passed ? "Congratulations!" : "Keep Trying!"}
            </h2>
            <p className="text-gray-600">
              You scored <span className="font-bold text-primary-50">{results.score}</span> out of{" "}
              <span className="font-bold">{results.totalPoints}</span> points
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ({results.percentage}% - Passing score: {results.passingScore}%)
            </p>
          </div>

          <div className="space-y-4">
            {results.questions.map((question, index) => {
              const answer = results.answers.find((a) => a.questionId === question.id);
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="font-semibold text-primary-50">Q{index + 1}.</span>
                    <div className="flex-1">
                      <p className="text-primary-50 mb-2">{question.question_text}</p>
                      {question.options?.map((option) => (
                        <div
                          key={option.id}
                          className={`p-2 rounded mb-1 ${
                            option.is_correct
                              ? "bg-green-50 border border-green-200"
                              : answer?.selectedOptionId === option.id
                              ? "bg-red-50 border border-red-200"
                              : "bg-gray-50"
                          }`}
                        >
                          <span className="text-sm">
                            {option.is_correct && "✓ "}
                            {answer?.selectedOptionId === option.id && !option.is_correct && "✗ "}
                            {option.option_text}
                          </span>
                        </div>
                      ))}
                      <div className="mt-2 text-sm">
                        <span className={answer?.isCorrect ? "text-green-600" : "text-red-600"}>
                          {answer?.pointsEarned || 0} / {question.points} points
                        </span>
                      </div>
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

  // Show quiz taking interface if attempt is active
  if (currentAttempt && quizData?.data) {
    const quiz = quizData.data;
    const questions = quiz.questions || [];
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary-50">{quiz.title}</h2>
            {quiz.time_limit && quiz.time_limit > 0 && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Time Limit: {quiz.time_limit} min</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>{currentQuestion?.points} points</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-50 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {currentQuestion && (
            <div className="mb-6">
              <p className="text-lg text-primary-50 mb-4">{currentQuestion.question_text}</p>
              <div className="space-y-2">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                      selectedAnswers[currentQuestion.id] === option.id
                        ? "border-primary-50 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {option.option_text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 border border-gray-300 text-primary-50 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="px-4 py-2 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={completing || Object.keys(selectedAnswers).length < questions.length}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {completing && <Loader2 className="w-4 h-4 animate-spin" />}
                {completing ? "Submitting..." : "Submit Quiz"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show quiz selection or start screen
  if (selectedQuiz) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedQuiz(null)}
          className="text-primary-50 hover:text-opacity-80 flex items-center gap-2"
        >
          ← Back to Quizzes
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-primary-50 mb-4">{selectedQuiz.title}</h2>
          <p className="text-gray-700 mb-6">{selectedQuiz.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Passing Score</div>
              <div className="text-2xl font-bold text-primary-50">{selectedQuiz.passing_score}%</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Time Limit</div>
              <div className="text-2xl font-bold text-primary-50">
                {selectedQuiz.time_limit ? `${selectedQuiz.time_limit} min` : "No Limit"}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Attempts Allowed</div>
              <div className="text-2xl font-bold text-primary-50">{selectedQuiz.attempts_allowed}</div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={starting}
            className="w-full py-3 bg-primary-50 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {starting && <Loader2 className="w-4 h-4 animate-spin" />}
            {starting ? "Starting Quiz..." : "Start Quiz"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-primary-50 mb-6">Quizzes</h2>

      {quizzes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No quizzes available yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              onClick={() => setSelectedQuiz(quiz)}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-50 transition-all cursor-pointer"
            >
              <h3 className="font-semibold text-primary-50 mb-2">{quiz.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Passing: {quiz.passing_score}%</span>
                <span>•</span>
                <span>{quiz.attempts_allowed} attempts</span>
                {quiz.time_limit && quiz.time_limit > 0 && (
                  <>
                    <span>•</span>
                    <span>{quiz.time_limit} min</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
