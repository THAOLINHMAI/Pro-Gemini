import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, X, CheckCircle2, Frown, ArrowRight, HelpCircle } from 'lucide-react';
import { Question } from '../types';

interface Props {
  isOpen: boolean;
  isCorrect: boolean;
  question: Question;
  selectedOptionIndex: number;
  onClose: () => void;
  onNextQuestion: () => void;
  onAskAI: (q: Question) => void;
  isLastQuestion: boolean;
}

export const AnswerFeedbackModal: React.FC<Props> = ({
  isOpen,
  isCorrect,
  question,
  selectedOptionIndex,
  onClose,
  onNextQuestion,
  onAskAI,
  isLastQuestion,
}) => {
  const TOTAL_DURATION_SEC = 3;
  const TOTAL_DURATION_MS = 3000;
  const [autoDismissCountdown, setAutoDismissCountdown] = useState<number>(TOTAL_DURATION_SEC);

  const onCloseRef = useRef(onClose);
  const onNextQuestionRef = useRef(onNextQuestion);

  useEffect(() => {
    onCloseRef.current = onClose;
    onNextQuestionRef.current = onNextQuestion;
  });

  // Auto-dismiss precisely after 3 seconds without being reset by parent timer re-renders
  useEffect(() => {
    if (!isOpen) return;

    setAutoDismissCountdown(TOTAL_DURATION_SEC);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, (TOTAL_DURATION_MS - elapsed) / 1000);
      setAutoDismissCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 50);

    const autoTimer = setTimeout(() => {
      if (onCloseRef.current) {
        onCloseRef.current();
      }
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(autoTimer);
      clearInterval(interval);
    };
  }, [isOpen]); // Only depends on isOpen, preventing infinite resets

  // Keyboard shortcut handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onCloseRef.current) onCloseRef.current();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onNextQuestionRef.current) onNextQuestionRef.current();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const correctLetter = String.fromCharCode(65 + question.correctIndex);
  const selectedLetter = String.fromCharCode(65 + selectedOptionIndex);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 bg-white transform transition-all duration-300 scale-100 ${
          isCorrect ? 'border-orange-400 ring-4 ring-orange-200' : 'border-rose-400 ring-4 ring-rose-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating background decorative blossoms for correct answer with animation */}
        {isCorrect && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
            <div className="absolute -top-6 -left-6 text-5xl animate-bounce">🌸</div>
            <div className="absolute top-10 right-4 text-4xl animate-pulse">🌺</div>
            <div className="absolute bottom-8 left-6 text-4xl animate-bounce delay-100">🌼</div>
            <div className="absolute -bottom-4 right-10 text-5xl animate-pulse delay-200">🌻</div>
            <div className="absolute top-1/2 left-2 text-3xl animate-spin">💮</div>
            <div className="absolute top-1/3 right-3 text-3xl animate-spin">🪷</div>
          </div>
        )}

        {/* Auto dismiss progress bar for 5-second countdown */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/10 z-20 overflow-hidden">
          <div
            className={`h-full transition-all duration-75 ease-linear ${
              isCorrect
                ? 'bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400'
                : 'bg-gradient-to-r from-rose-300 via-amber-300 to-indigo-300'
            }`}
            style={{ width: `${(autoDismissCountdown / TOTAL_DURATION_SEC) * 100}%` }}
          />
        </div>

        {/* Header Ribbon */}
        <div
          className={`p-6 text-center text-white relative ${
            isCorrect
              ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600'
              : 'bg-gradient-to-r from-blue-700 via-indigo-700 to-rose-600'
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-black/10 transition-all cursor-pointer z-10"
            title="Đóng thông báo"
          >
            <X className="w-5 h-5" />
          </button>

          {isCorrect ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-4xl shadow-inner mb-2 border-2 border-white/50 animate-bounce">
                🌸
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/30 text-white font-extrabold text-xs tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" /> TUNG BÔNG TUNG HOA
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
                CHÍNH XÁC RỒI! 🌟
              </h3>
              <p className="text-orange-100 text-xs font-semibold mt-1 flex items-center gap-1.5">
                <span>Em trả lời rất xuất sắc!</span>
                <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  (Tự đóng sau {autoDismissCountdown.toFixed(1)}s)
                </span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {/* Crying Face Animation with animated tears */}
              <div className="relative w-24 h-24 mb-2 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-amber-300 border-4 border-amber-500 flex flex-col items-center justify-center shadow-lg relative overflow-hidden animate-pulse">
                  {/* Sad Eyes */}
                  <div className="flex space-x-4 mb-1">
                    <div className="w-3.5 h-1.5 bg-slate-800 rounded-full rotate-12" />
                    <div className="w-3.5 h-1.5 bg-slate-800 rounded-full -rotate-12" />
                  </div>
                  {/* Sad Crying Mouth */}
                  <div className="w-6 h-3 border-t-4 border-slate-800 rounded-t-full mt-1" />

                  {/* Flowing Tears Animation */}
                  <div className="absolute top-7 left-3 w-2 h-4 bg-sky-400 rounded-full animate-bounce" />
                  <div className="absolute top-7 right-3 w-2 h-4 bg-sky-400 rounded-full animate-bounce delay-150" />
                </div>
                <div className="absolute -bottom-1 text-3xl">😭</div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs tracking-wider uppercase mb-1">
                <Frown className="w-3.5 h-3.5 text-amber-300" /> Ố Ồ! TIẾC QUÁ
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
                Ố Ồ! CHƯA ĐÚNG RỒI 😭
              </h3>
              <p className="text-blue-100 text-xs font-semibold mt-1 flex items-center gap-1.5">
                <span>Đừng buồn nhé! Cùng xem giải thích bên dưới nha!</span>
                <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  (Tự đóng sau {autoDismissCountdown.toFixed(1)}s)
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Question Summary */}
          <div className="text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="font-extrabold text-blue-700">Câu hỏi: </span>
            {question.question}
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className={`p-3 rounded-xl border flex items-center justify-between ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-500">Lựa chọn của em</div>
                <div className="font-extrabold text-sm flex items-center gap-1 mt-0.5">
                  Phương án {selectedLetter}
                </div>
              </div>
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <span className="text-2xl">😭</span>
              )}
            </div>

            <div className="p-3 rounded-xl border bg-blue-50 border-blue-300 text-blue-950 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase text-blue-600">Đáp án chính xác</div>
                <div className="font-extrabold text-sm mt-0.5 text-blue-900">
                  Phương án {correctLetter}. {question.options[question.correctIndex]}
                </div>
              </div>
              <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
            </div>
          </div>

          {/* Explanation Box */}
          <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 text-xs leading-relaxed text-slate-800">
            <div className="font-extrabold text-orange-800 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-4 h-4 text-orange-600" />
              Lời giải chi tiết từ Giáo Hà AI:
            </div>
            <p className="font-medium text-slate-700">{question.explanation}</p>
            {question.hint && (
              <div className="mt-2 pt-2 border-t border-orange-200/60 text-[11px] text-orange-950 font-semibold">
                💡 <span className="underline">Mẹo nhớ nhanh:</span> {question.hint}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onAskAI(question);
            }}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-orange-500" />
            Hỏi Giáo Hà AI thêm
          </button>

          <button
            onClick={() => {
              onClose();
              onNextQuestion();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isLastQuestion ? 'Xem tổng kết bài làm' : 'Câu tiếp theo'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
