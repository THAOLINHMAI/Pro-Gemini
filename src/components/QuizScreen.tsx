import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuizConfig, UserAnswer } from '../types';
import {
  Clock,
  Flag,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
  Volume2,
  VolumeX,
  Smile,
  Frown,
  Award,
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { triggerFlowerConfetti } from '../utils/confettiFlower';
import { AnswerFeedbackModal } from './AnswerFeedbackModal';

interface Props {
  questions: Question[];
  config: QuizConfig;
  onSubmit: (userAnswers: Record<string, UserAnswer>, timeSpentSeconds: number) => void;
  onAskAI: (question: Question) => void;
}

export const QuizScreen: React.FC<Props> = ({ questions, config, onSubmit, onAskAI }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [secondsRemaining, setSecondsRemaining] = useState((config.timeLimitMinutes || 20) * 60);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showExplanationInPractice, setShowExplanationInPractice] = useState<Record<string, boolean>>({});
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modal feedback state
  const [feedbackModal, setFeedbackModal] = useState<{
    isOpen: boolean;
    isCorrect: boolean;
    question: Question | null;
    selectedOptionIndex: number;
  }>({
    isOpen: false,
    isCorrect: false,
    question: null,
    selectedOptionIndex: 0,
  });

  const currentQ = questions[currentIndex];
  const isPracticeMode = config.mode === 'practice';

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
      if (config.mode === 'exam') {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onSubmit(answers, timeSpent + 1);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [config.mode, answers, onSubmit, timeSpent]);

  const handleSelectOption = (index: number) => {
    const isCorrect = index === currentQ.correctIndex;
    const isFirstTimeAnswering = !answers[currentQ.id];

    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedOptionIndex: index,
        isCorrect,
        isFlagged: prev[currentQ.id]?.isFlagged || false,
      },
    }));

    if (isPracticeMode) {
      setShowExplanationInPractice(prev => ({ ...prev, [currentQ.id]: true }));
    }

    // Trigger celebration or crying face + sound
    if (isFirstTimeAnswering || isPracticeMode) {
      if (isCorrect) {
        if (soundEnabled) soundManager.playGrandVictorySound();
        triggerFlowerConfetti();
      } else {
        if (soundEnabled) soundManager.playWrongSound();
      }

      if (isPracticeMode) {
        setFeedbackModal({
          isOpen: true,
          isCorrect,
          question: currentQ,
          selectedOptionIndex: index,
        });
      }
    }
  };

  const toggleFlag = (qId: string) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: {
        questionId: qId,
        selectedOptionIndex: prev[qId]?.selectedOptionIndex ?? null,
        isFlagged: !prev[qId]?.isFlagged,
      },
    }));
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = (Object.values(answers) as UserAnswer[]).filter(
    a => a.selectedOptionIndex !== null && a.selectedOptionIndex !== undefined
  ).length;

  const handleFinish = () => {
    const unanswered = questions.length - answeredCount;
    if (unanswered > 0) {
      if (!confirm(`Em còn ${unanswered} câu chưa làm. Em có chắc chắn muốn nộp bài không?`)) {
        return;
      }
    }
    onSubmit(answers, timeSpent);
  };

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleFinish();
    }
  }, [currentIndex, questions.length]);

  const handleCloseFeedbackModal = useCallback(() => {
    setFeedbackModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const handleModalNextQuestion = useCallback(() => {
    setFeedbackModal(prev => ({ ...prev, isOpen: false }));
    handleNextQuestion();
  }, [handleNextQuestion]);

  const difficultyBadge = {
    nhan_biet: { text: 'Nhận biết', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    thong_hieu: { text: 'Thông hiểu', bg: 'bg-blue-100 text-blue-800 border-blue-300' },
    van_dung: { text: 'Vận dụng', bg: 'bg-orange-100 text-orange-800 border-orange-300' },
  }[currentQ.difficulty];

  const currentAnswer = answers[currentQ.id];
  const isAnswered = currentAnswer?.selectedOptionIndex !== undefined && currentAnswer?.selectedOptionIndex !== null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top status bar with bright blue and orange styling */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-blue-100 shadow-md mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
            {currentIndex + 1}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">
              Học sinh: <span className="font-bold text-slate-900">{config.studentName}</span> (Lớp {config.studentClass})
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-extrabold text-blue-700">
                Câu {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                {isPracticeMode ? '🎯 Luyện tập tức thì' : '⏱️ Thi tính giờ'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
              soundEnabled
                ? 'bg-orange-50 text-orange-700 border-orange-200'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
            title={soundEnabled ? 'Âm thanh đang bật' : 'Âm thanh đã tắt'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-600" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Bật âm thanh' : 'Tắt âm'}</span>
          </button>

          {/* Timer Badge */}
          <div className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono font-extrabold text-blue-900 shadow-2xs">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>
              {config.mode === 'exam'
                ? `Còn lại: ${formatTime(secondsRemaining)}`
                : `Thời gian: ${formatTime(timeSpent)}`}
            </span>
          </div>

          <button
            id="finish-quiz-btn"
            onClick={handleFinish}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Nộp bài
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Question Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm relative overflow-hidden">
            {/* Top decorative accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-orange-500" />

            {/* Header info of question */}
            <div className="flex items-center justify-between mb-4 mt-1">
              <div className="flex items-center space-x-2">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${difficultyBadge.bg}`}>
                  {difficultyBadge.text}
                </span>
                {currentQ.bookReference && (
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg">
                    {currentQ.bookReference}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => toggleFlag(currentQ.id)}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  currentAnswer?.isFlagged
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                {currentAnswer?.isFlagged ? 'Đã đánh dấu' : 'Đánh dấu'}
              </button>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-extrabold text-slate-900 mb-6 leading-relaxed">
              <span className="text-blue-600 font-black mr-1.5">Câu {currentIndex + 1}:</span>
              {currentQ.question}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, oIdx) => {
                const optLetter = String.fromCharCode(65 + oIdx);
                const isSelected = currentAnswer?.selectedOptionIndex === oIdx;
                const isCorrectOption = oIdx === currentQ.correctIndex;

                let optStyle =
                  'border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 bg-slate-50/50 text-slate-800';
                let letterStyle = 'bg-white border-slate-300 text-slate-700';

                if (isSelected) {
                  optStyle =
                    'border-blue-600 bg-blue-50 text-blue-950 ring-2 ring-blue-500/30 font-bold shadow-xs';
                  letterStyle = 'bg-blue-600 border-blue-600 text-white';
                }

                if (isPracticeMode && showExplanationInPractice[currentQ.id]) {
                  if (isCorrectOption) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400/30';
                    letterStyle = 'bg-emerald-600 border-emerald-600 text-white';
                  } else if (isSelected && !isCorrectOption) {
                    optStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-semibold ring-2 ring-rose-400/30';
                    letterStyle = 'bg-rose-600 border-rose-600 text-white';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left p-4 rounded-2xl border-2 flex items-start space-x-3.5 transition-all cursor-pointer transform hover:-translate-y-0.5 ${optStyle}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs font-black shrink-0 shadow-2xs ${letterStyle}`}
                    >
                      {optLetter}
                    </span>
                    <span className="text-sm pt-0.5 leading-normal flex-1 font-medium">{opt}</span>
                    {isPracticeMode && showExplanationInPractice[currentQ.id] && isCorrectOption && (
                      <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Đúng
                      </span>
                    )}
                    {isPracticeMode && showExplanationInPractice[currentQ.id] && isSelected && !isCorrectOption && (
                      <span className="text-rose-600 font-bold text-xs flex items-center gap-1">
                        😭 Sai
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Practice mode instant explanation panel */}
            {isPracticeMode && showExplanationInPractice[currentQ.id] && (
              <div
                className={`mt-6 p-4 rounded-2xl border-2 animate-in fade-in duration-300 ${
                  currentAnswer?.isCorrect
                    ? 'bg-emerald-50/80 border-emerald-200'
                    : 'bg-orange-50/80 border-orange-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-black flex items-center gap-1.5 ${
                      currentAnswer?.isCorrect ? 'text-emerald-900' : 'text-orange-900'
                    }`}
                  >
                    {currentAnswer?.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Chúc mừng em đã trả lời đúng! 🎉
                      </>
                    ) : (
                      <>
                        <span className="text-base">😭</span>
                        Ố ồ! Đáp án chính xác là:{' '}
                        <strong>{String.fromCharCode(65 + currentQ.correctIndex)}</strong>
                      </>
                    )}
                  </span>
                  <button
                    onClick={() => onAskAI(currentQ)}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs hover:bg-blue-50 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Hỏi Giáo Hà AI
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Câu trước
              </button>

              <button
                onClick={() => onAskAI(currentQ)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Giải thích cùng Giáo Hà AI
              </button>

              <button
                type="button"
                disabled={currentIndex === questions.length - 1}
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-all cursor-pointer"
              >
                Câu tiếp <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Question Matrix */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-blue-100 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-orange-500" />
                Mục lục câu hỏi ({answeredCount}/{questions.length})
              </h4>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const ans = answers[q.id];
                const isSelected = ans?.selectedOptionIndex !== undefined && ans?.selectedOptionIndex !== null;
                const isCurrent = idx === currentIndex;
                const isFlagged = ans?.isFlagged;

                let btnClass = 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400';
                if (isSelected) {
                  if (isPracticeMode && showExplanationInPractice[q.id]) {
                    btnClass = ans.isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600 font-black'
                      : 'bg-rose-500 text-white border-rose-600 font-black';
                  } else {
                    btnClass = 'bg-gradient-to-tr from-blue-600 to-sky-600 text-white border-blue-600 font-black shadow-xs';
                  }
                }
                if (isCurrent) {
                  btnClass += ' ring-2 ring-orange-500 ring-offset-2 scale-105';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-11 rounded-2xl border-2 text-xs font-bold flex items-center justify-center relative transition-all cursor-pointer ${btnClass}`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute top-1 right-1 border-2 border-white" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-600 font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-blue-600 shadow-2xs" /> Đã hoàn thành
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300" /> Chưa trả lời
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Đang đánh dấu phân vân
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Feedback Modal for Practice Mode */}
      {feedbackModal.question && (
        <AnswerFeedbackModal
          isOpen={feedbackModal.isOpen}
          isCorrect={feedbackModal.isCorrect}
          question={feedbackModal.question}
          selectedOptionIndex={feedbackModal.selectedOptionIndex}
          onClose={handleCloseFeedbackModal}
          onNextQuestion={handleModalNextQuestion}
          onAskAI={onAskAI}
          isLastQuestion={currentIndex === questions.length - 1}
        />
      )}
    </div>
  );
};
