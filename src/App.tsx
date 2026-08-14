import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuizConfigScreen } from './components/QuizConfigScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { TheoryHandbook } from './components/TheoryHandbook';
import { HistoryScreen } from './components/HistoryScreen';
import { AITutorModal } from './components/AITutorModal';
import { CHAPTERS_DATA } from './data/chapters';
import { QUESTION_BANK } from './data/questionBank';
import { Question, QuizConfig, QuizResult, UserAnswer } from './types';
import { saveQuizResultToHistory } from './utils/historyStorage';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'config' | 'quiz' | 'result' | 'theory' | 'history'>('config');
  const [quizConfig, setQuizConfig] = useState<QuizConfig>(() => {
    const savedName = localStorage.getItem('khtn8_student_name') || '';
    const savedClass = localStorage.getItem('khtn8_student_class') || '8A';
    const allLessonIds = CHAPTERS_DATA.flatMap(ch => ch.lessons.map(l => l.id));
    return {
      studentName: savedName,
      studentClass: savedClass,
      questionCount: 10,
      difficulty: 'tong_hop',
      selectedLessonIds: allLessonIds,
      mode: 'practice',
      timeLimitMinutes: 15,
    };
  });

  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [tutorModalOpen, setTutorModalOpen] = useState(false);
  const [selectedQuestionForAI, setSelectedQuestionForAI] = useState<Question | null>(null);

  // Save student name and class when updated
  useEffect(() => {
    if (quizConfig.studentName) {
      localStorage.setItem('khtn8_student_name', quizConfig.studentName);
    }
    if (quizConfig.studentClass) {
      localStorage.setItem('khtn8_student_class', quizConfig.studentClass);
    }
  }, [quizConfig.studentName, quizConfig.studentClass]);

  // Generate quiz questions based on config
  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);

    const targetCount = config.questionCount || 5;
    const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());

    // 1. Primary pool from selected lessons
    const selectedLessons = config.selectedLessonIds && config.selectedLessonIds.length > 0
      ? config.selectedLessonIds
      : QUESTION_BANK.map(q => q.lessonId);

    const lessonPool = QUESTION_BANK.filter(q => selectedLessons.includes(q.lessonId));
    let selected: Question[] = [];

    const addUnique = (source: Question[], maxToAdd: number) => {
      const needed = targetCount - selected.length;
      if (needed <= 0 || maxToAdd <= 0) return;
      const count = Math.min(needed, maxToAdd);
      const available = source.filter(q => !selected.some(s => s.id === q.id));
      selected.push(...shuffle(available).slice(0, count));
    };

    if (config.difficulty === 'tong_hop') {
      const nbPool = lessonPool.filter(q => q.difficulty === 'nhan_biet');
      const thPool = lessonPool.filter(q => q.difficulty === 'thong_hieu');
      const vdPool = lessonPool.filter(q => q.difficulty === 'van_dung');

      const nbTarget = Math.max(1, Math.round(targetCount * 0.4));
      const thTarget = Math.max(1, Math.round(targetCount * 0.4));
      const vdTarget = Math.max(1, targetCount - nbTarget - thTarget);

      addUnique(nbPool, nbTarget);
      addUnique(thPool, thTarget);
      addUnique(vdPool, vdTarget);
    } else {
      const matchedDiff = lessonPool.filter(q => q.difficulty === config.difficulty);
      addUnique(matchedDiff, targetCount);
    }

    // Fallback 1: Add any remaining questions from the selected lessons
    if (selected.length < targetCount) {
      addUnique(lessonPool, targetCount - selected.length);
    }

    // Fallback 2: Add questions from the same chapters
    if (selected.length < targetCount) {
      const chapterIds = Array.from(new Set(lessonPool.map(q => q.chapterId)));
      const chapterPool = QUESTION_BANK.filter(q => chapterIds.includes(q.chapterId));
      addUnique(chapterPool, targetCount - selected.length);
    }

    // Fallback 3: Add questions from the entire question bank
    if (selected.length < targetCount) {
      addUnique(QUESTION_BANK, targetCount - selected.length);
    }

    // Shuffle the final list for a dynamic exam experience
    selected = shuffle(selected);

    setActiveQuestions(selected);
    setActiveTab('quiz');
  };

  // Submit quiz and calculate result
  const handleSubmitQuiz = (userAnswers: Record<string, UserAnswer>, timeSpentSeconds: number) => {
    let correctCount = 0;
    const subjectBreakdown = {
      chemistry: { total: 0, correct: 0 },
      physics: { total: 0, correct: 0 },
      biology: { total: 0, correct: 0 },
    };
    const difficultyBreakdown = {
      nhan_biet: { total: 0, correct: 0 },
      thong_hieu: { total: 0, correct: 0 },
      van_dung: { total: 0, correct: 0 },
    };

    activeQuestions.forEach(q => {
      const userAns = userAnswers[q.id];
      const isCorrect = userAns?.selectedOptionIndex === q.correctIndex;

      // Subject stats
      subjectBreakdown[q.subject].total += 1;
      if (isCorrect) {
        correctCount += 1;
        subjectBreakdown[q.subject].correct += 1;
      }

      // Difficulty stats
      difficultyBreakdown[q.difficulty].total += 1;
      if (isCorrect) {
        difficultyBreakdown[q.difficulty].correct += 1;
      }

      // Update answer object
      userAnswers[q.id] = {
        questionId: q.id,
        selectedOptionIndex: userAns?.selectedOptionIndex ?? null,
        isCorrect,
      };
    });

    const score10 = Number(((correctCount / activeQuestions.length) * 10).toFixed(1));

    let teacherFeedback = '';
    if (score10 >= 9) {
      teacherFeedback = `Thầy/Cô Giáo Hà AI nhiệt liệt biểu dương em ${quizConfig.studentName}! Em nắm kiến thức KHTN 8 rất vững vàng, tư duy bài tập nhanh và chính xác. Hãy tiếp tục phát huy ở các kỳ thi sắp tới nhé!`;
    } else if (score10 >= 7) {
      teacherFeedback = `Chúc mừng em ${quizConfig.studentName} đã hoàn thành bài làm tốt! Em hiểu sâu bài, hãy chú ý kiểm tra thêm các câu hỏi định lượng tính toán để đạt điểm 10 tuyệt đối nhé!`;
    } else if (score10 >= 5) {
      teacherFeedback = `Em đã có nền tảng kiến thức tương đối ổn. Thầy/Cô Giáo Hà AI khuyên em nên xem lại những câu làm chưa đúng và tra cứu thêm ở Sổ tay lý thuyết nhé!`;
    } else {
      teacherFeedback = `Đừng nản lòng nhé ${quizConfig.studentName}! KHTN 8 có nhiều bài học thú vị nhưng cần nắm chắc khái niệm và công thức. Em hãy ôn tập từng chương và làm lại đề cùng Giáo Hà AI nhé!`;
    }

    const result: QuizResult = {
      studentName: quizConfig.studentName,
      studentClass: quizConfig.studentClass,
      date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      totalQuestions: activeQuestions.length,
      correctCount,
      score10,
      timeSpentTotalSeconds: timeSpentSeconds,
      difficulty: quizConfig.difficulty,
      subjectBreakdown,
      difficultyBreakdown,
      questions: activeQuestions,
      userAnswers,
      teacherFeedback,
    };

    // Automatically persist this quiz submission to local history
    saveQuizResultToHistory(result, quizConfig.mode);

    setQuizResult(result);
    setActiveTab('result');
  };

  const handleAskAI = (q: Question) => {
    setSelectedQuestionForAI(q);
    setTutorModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-slate-50 to-orange-50/40 text-slate-900 flex flex-col font-sans">
      {/* App Header */}
      <Header
        studentName={quizConfig.studentName}
        studentClass={quizConfig.studentClass}
        activeTab={activeTab}
        onTabChange={tab => setActiveTab(tab)}
        isQuizActive={activeTab === 'quiz'}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'config' && (
          <QuizConfigScreen onStartQuiz={handleStartQuiz} initialConfig={quizConfig} />
        )}

        {activeTab === 'quiz' && (
          <QuizScreen
            questions={activeQuestions}
            config={quizConfig}
            onSubmit={handleSubmitQuiz}
            onAskAI={handleAskAI}
          />
        )}

        {activeTab === 'result' && quizResult && (
          <ResultScreen
            result={quizResult}
            onRetry={() => {
              setActiveTab('quiz');
            }}
            onNewQuiz={() => {
              setActiveTab('config');
            }}
            onViewHistory={() => {
              setActiveTab('history');
            }}
            onAskAI={handleAskAI}
          />
        )}

        {activeTab === 'theory' && <TheoryHandbook onAskAI={handleAskAI} />}

        {activeTab === 'history' && (
          <HistoryScreen
            onViewResultDetails={res => {
              setQuizResult(res);
              setActiveTab('result');
            }}
            onStartNewQuiz={() => {
              setActiveTab('config');
            }}
            onAskAI={handleAskAI}
          />
        )}
      </main>

      {/* Bright Footer */}
      <footer className="bg-white border-t-2 border-blue-100 py-6 text-center text-xs text-slate-500 shadow-xs">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 text-slate-800 font-black text-sm">
            <span className="text-blue-600">GIA SƯ KHTN LỚP 8</span>
            <span className="text-orange-500">•</span>
            <span className="text-orange-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" /> TÁC GIẢ: GIÁO HÀ AI
            </span>
          </div>
          <p className="mt-1 text-slate-500 font-medium text-xs">
            Hệ thống ôn luyện Khoa học tự nhiên lớp 8 chuẩn bộ sách Kết nối tri thức với cuộc sống.
          </p>
        </div>
      </footer>

      {/* AI Tutor Chat Modal */}
      <AITutorModal
        isOpen={tutorModalOpen}
        onClose={() => setTutorModalOpen(false)}
        question={selectedQuestionForAI}
        studentName={quizConfig.studentName}
        studentClass={quizConfig.studentClass}
      />
    </div>
  );
}
