export type SubjectType = 'chemistry' | 'physics' | 'biology';

export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'tong_hop';

export interface Lesson {
  id: number;
  title: string;
  chapterId: number;
  subject: SubjectType;
  description: string;
}

export interface Chapter {
  id: number;
  title: string;
  romanNumeral: string;
  subject: SubjectType;
  lessons: Lesson[];
}

export interface Question {
  id: string;
  lessonId: number;
  chapterId: number;
  subject: SubjectType;
  difficulty: 'nhan_biet' | 'thong_hieu' | 'van_dung';
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  bookReference?: string;
  hint?: string;
}

export interface QuizConfig {
  studentName: string;
  studentClass: string;
  questionCount: number; // Max 30
  difficulty: DifficultyLevel;
  selectedLessonIds: number[];
  mode: 'exam' | 'practice'; // Exam has countdown and submit at end; practice gives instant feedback
  timeLimitMinutes?: number;
}

export interface UserAnswer {
  questionId: string;
  selectedOptionIndex: number | null;
  isCorrect?: boolean;
  timeSpentSeconds?: number;
  isFlagged?: boolean;
}

export interface QuizResult {
  studentName: string;
  studentClass: string;
  date: string;
  totalQuestions: number;
  correctCount: number;
  score10: number;
  timeSpentTotalSeconds: number;
  difficulty: DifficultyLevel;
  subjectBreakdown: {
    chemistry: { total: number; correct: number };
    physics: { total: number; correct: number };
    biology: { total: number; correct: number };
  };
  difficultyBreakdown: {
    nhan_biet: { total: number; correct: number };
    thong_hieu: { total: number; correct: number };
    van_dung: { total: number; correct: number };
  };
  questions: Question[];
  userAnswers: Record<string, UserAnswer>;
  teacherFeedback: string;
}

export interface QuizHistoryItem {
  id: string;
  studentName: string;
  studentClass: string;
  timestamp: number;
  date: string;
  time: string;
  score10: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  mode: 'exam' | 'practice';
  difficulty: DifficultyLevel;
  subjectBreakdown: {
    chemistry: { total: number; correct: number };
    physics: { total: number; correct: number };
    biology: { total: number; correct: number };
  };
  difficultyBreakdown: {
    nhan_biet: { total: number; correct: number };
    thong_hieu: { total: number; correct: number };
    van_dung: { total: number; correct: number };
  };
  result: QuizResult;
}

export interface TheorySummary {
  lessonId: number;
  title: string;
  chapterName: string;
  subject: SubjectType;
  keyPoints: string[];
  formulas?: { name: string; formula: string; note: string }[];
  experiments?: { title: string; phenomenon: string; conclusion: string }[];
  realWorldApps?: string[];
}
