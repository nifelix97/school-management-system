// Quiz API Type Definitions

// --- Enums and Literal Types ---

export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';

// --- Core Interfaces ---

export interface Quiz {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  passing_score: number;
  time_limit?: number | null; // in minutes, 0 or null means no limit
  attempts_allowed: number;
  created_at?: string;
  updated_at?: string;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  points: number;
  order_index: number;
  options?: QuestionOption[];
  created_at?: string;
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct?: boolean;
  order_index?: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  passed?: boolean;
  answers?: QuizAnswer[];
}

export interface QuizAnswer {
  id: string;
  attemptId: string;
  questionId: string;
  selectedOptionId?: string;
  answerText?: string;
  isCorrect?: boolean;
  pointsEarned?: number;
}

export interface QuizResults {
  attemptId: string;
  quizId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  passingScore: number;
  completedAt: string;
  answers: QuizAnswer[];
  questions: QuizQuestion[];
}

// --- DTOs (Data Transfer Objects) ---

export interface CreateQuizDto {
  title: string;
  description: string;
  passingScore: number;
  timeLimit?: number;
  attemptsAllowed: number;
}

export interface AddQuestionDto {
  questionText: string;
  questionType: QuestionType;
  points: number;
  orderIndex: number;
  options?: Omit<QuestionOption, 'id' | 'questionId'>[];
}

export interface SubmitAnswerDto {
  questionId: string;
  selectedOptionId?: string;
  answerText?: string;
}
