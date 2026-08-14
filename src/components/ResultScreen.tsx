import React, { useEffect, useState } from 'react';
import { QuizResult, Question } from '../types';
import {
  Trophy,
  RefreshCw,
  Printer,
  CheckCircle,
  XCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Award,
  BookOpen,
  FileSpreadsheet,
  History,
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { triggerFlowerConfetti } from '../utils/confettiFlower';
import { CertificateCard, getCertificateRank } from './CertificateCard';
import { exportSingleResultToExcel } from '../utils/excelExport';

interface Props {
  result: QuizResult;
  onRetry: () => void;
  onNewQuiz: () => void;
  onAskAI: (q: Question) => void;
  onViewHistory?: () => void;
}

export const ResultScreen: React.FC<Props> = ({ result, onRetry, onNewQuiz, onAskAI, onViewHistory }) => {
  const [filterType, setFilterType] = useState<'all' | 'wrong' | 'correct'>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  const percentage =
    result.totalQuestions > 0
      ? (result.correctCount / result.totalQuestions) * 100
      : 0;

  useEffect(() => {
    if (percentage >= 50) {
      soundManager.playGrandVictorySound();
      triggerFlowerConfetti();
    } else {
      soundManager.playWrongSound();
    }
  }, [percentage]);

  const toggleExpand = (qId: string) => {
    setExpandedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const filteredQuestions = result.questions.filter(q => {
    const isCorrect = result.userAnswers[q.id]?.isCorrect;
    if (filterType === 'wrong') return !isCorrect;
    if (filterType === 'correct') return isCorrect;
    return true;
  });

  const rank = getCertificateRank(result.correctCount, result.totalQuestions);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 16:9 MOTIVATIONAL CERTIFICATE OF ACHIEVEMENT */}
      <CertificateCard result={result} />

      {/* Printable Score Summary & Pedagogy Evaluation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-100 shadow-xl mb-8 printable-card relative overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-sky-400 to-orange-500" />

        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-100 gap-4 mt-2">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1 rounded-full">
              KẾT QUẢ ÔN TẬP KHOA HỌC TỰ NHIÊN 8
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Học sinh: <span className="text-blue-600">{result.studentName || 'Học sinh KHTN 8'}</span>
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Lớp: <span className="font-bold text-slate-800">{result.studentClass || '8A'}</span> | Ngày thực hiện:{' '}
              {result.date}
            </p>
          </div>

          <div className="text-center bg-gradient-to-br from-blue-700 via-indigo-700 to-orange-600 text-white px-7 py-4 rounded-3xl shadow-lg min-w-[170px] border-2 border-white/40">
            <div className="text-xs font-bold text-blue-100 uppercase tracking-wider">ĐIỂM SỐ</div>
            <div className="text-4xl font-black tracking-tight text-yellow-300 drop-shadow-xs">
              {result.score10.toFixed(1)}
              <span className="text-sm font-normal text-white/80"> /10</span>
            </div>
            <div className="text-[11px] text-white mt-0.5 font-bold">
              Đúng {result.correctCount}/{result.totalQuestions} câu ({Math.round(percentage)}%)
            </div>
          </div>
        </div>

        {/* Teacher Feedback with Blue & Orange accents */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-orange-50/60 border-2 border-blue-100 flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shrink-0 font-bold shadow-xs text-lg">
            {rank.icon}
          </div>
          <div>
            <div className="text-xs font-black text-blue-950 flex items-center gap-2">
              Nhận xét sư phạm từ Giáo Hà AI
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full ${rank.badgeBg} ${rank.badgeText} font-black shadow-2xs`}>
                {rank.level}
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-1 font-semibold leading-relaxed">
              {rank.motivationalMessage} {result.teacherFeedback}
            </p>
          </div>
        </div>

        {/* Breakdown by subject */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            { name: '🧪 Hoá học', data: result.subjectBreakdown.chemistry, border: 'border-emerald-200 bg-emerald-50/50' },
            { name: '⚡ Vật lí', data: result.subjectBreakdown.physics, border: 'border-blue-200 bg-blue-50/50' },
            { name: '🌿 Sinh học', data: result.subjectBreakdown.biology, border: 'border-orange-200 bg-orange-50/50' },
          ].map((sub, i) => (
            <div key={i} className={`p-4 rounded-2xl border-2 ${sub.border} text-xs`}>
              <div className="font-black text-slate-900 mb-1.5">{sub.name}</div>
              <div className="flex justify-between text-slate-600 text-[11px] font-semibold">
                <span>
                  Đúng: {sub.data.correct}/{sub.data.total}
                </span>
                <span className="font-black text-blue-700">
                  {sub.data.total > 0 ? Math.round((sub.data.correct / sub.data.total) * 100) : 0}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportSingleResultToExcel(result)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4" /> Tải về File Excel (.xlsx)
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl border-2 border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-blue-600" /> In phiếu kết quả
            </button>
            {onViewHistory && (
              <button
                onClick={onViewHistory}
                className="px-4 py-2.5 rounded-xl border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 text-xs font-bold text-amber-900 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <History className="w-4 h-4 text-amber-600" /> Xem lịch sử bài làm
              </button>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={onRetry}
              className="px-4 py-2.5 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-orange-500" /> Làm lại đề này
            </button>
            <button
              onClick={onNewQuiz}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" /> Tạo đề thi mới
            </button>
          </div>
        </div>
      </div>

      {/* Review Questions Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Xem lại chi tiết từng câu hỏi ({filteredQuestions.length} câu)
          </h3>
          <div className="flex items-center space-x-1.5 bg-blue-50 p-1 rounded-2xl border border-blue-100">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filterType === 'all' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Tất cả ({result.totalQuestions})
            </button>
            <button
              onClick={() => setFilterType('wrong')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filterType === 'wrong' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              😭 Câu sai ({result.totalQuestions - result.correctCount})
            </button>
            <button
              onClick={() => setFilterType('correct')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                filterType === 'correct' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              🌸 Câu đúng ({result.correctCount})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const userAns = result.userAnswers[q.id];
            const isCorrect = userAns?.isCorrect;
            const isExpanded = expandedQuestions[q.id] !== false; // default expanded

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-orange-200 bg-orange-50/20'
                }`}
              >
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => toggleExpand(q.id)}
                >
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <span className="text-xl shrink-0 mt-0.5">😭</span>
                    )}
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 leading-relaxed">
                        <span className="text-blue-600 font-black mr-1">Câu {idx + 1}:</span>
                        {q.question}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-semibold">
                        Lựa chọn của em:{' '}
                        <span
                          className={`font-black ${
                            isCorrect ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {userAns?.selectedOptionIndex !== null &&
                          userAns?.selectedOptionIndex !== undefined
                            ? String.fromCharCode(65 + userAns.selectedOptionIndex)
                            : 'Chưa chọn'}
                        </span>{' '}
                        | Đáp án đúng:{' '}
                        <span className="font-black text-blue-700">
                          {String.fromCharCode(65 + q.correctIndex)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-slate-400 p-1 cursor-pointer">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-slate-200/70 pl-8 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isCorrectOpt = oIdx === q.correctIndex;
                        const isSelectedOpt = userAns?.selectedOptionIndex === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl text-xs flex items-center space-x-2 border ${
                              isCorrectOpt
                                ? 'bg-emerald-100 text-emerald-950 font-bold border-emerald-300'
                                : isSelectedOpt
                                ? 'bg-rose-100 text-rose-950 font-semibold border-rose-300'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            <span className="font-black">{String.fromCharCode(65 + oIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 mt-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-black text-orange-900 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-orange-600" /> Lời giải chi tiết:
                        </span>
                        <button
                          onClick={() => onAskAI(q)}
                          className="text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-orange-500" /> Hỏi Giáo Hà AI
                        </button>
                      </div>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
