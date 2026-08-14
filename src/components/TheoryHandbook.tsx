import React, { useState } from 'react';
import { CHAPTERS_DATA } from '../data/chapters';
import { BookOpen, Search, Sparkles, Beaker, Zap, Leaf, CheckCircle2, ChevronRight } from 'lucide-react';
import { Question } from '../types';

interface Props {
  onAskAI: (q: Question) => void;
}

export const TheoryHandbook: React.FC<Props> = ({ onAskAI }) => {
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'chemistry' | 'physics' | 'biology'>('all');
  const [search, setSearch] = useState('');
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);

  const filteredChapters = CHAPTERS_DATA.filter(ch => {
    if (selectedSubject !== 'all' && ch.subject !== selectedSubject) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      ch.title.toLowerCase().includes(q) ||
      ch.lessons.some(l => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q))
    );
  });

  const getSubjectIcon = (sub: string) => {
    switch (sub) {
      case 'chemistry':
        return <Beaker className="w-4 h-4 text-orange-500" />;
      case 'physics':
        return <Zap className="w-4 h-4 text-blue-600" />;
      case 'biology':
        return <Leaf className="w-4 h-4 text-emerald-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header with bright Blue & Orange Gradient */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-orange-500 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black uppercase tracking-wider mb-2 border border-white/30">
          <BookOpen className="w-3.5 h-3.5 text-yellow-300" /> Sổ Tay Tra Cứu KHTN 8
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 drop-shadow-xs">
          HỆ THỐNG KIẾN THỨC TRỌNG TÂM SGK
        </h2>
        <p className="text-blue-50 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
          Tóm lược nội dung cốt lõi của 8 Chương và 47 Bài học theo bộ sách Kết nối tri thức với cuộc sống.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-blue-100 shadow-sm mb-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Toàn bộ 8 Chương' },
            { id: 'chemistry', label: '🧪 Hoá học (C.I - II)' },
            { id: 'physics', label: '⚡ Vật lí (C.III - VI)' },
            { id: 'biology', label: '🌿 Sinh học (C.VII - VIII)' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedSubject === s.id
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-blue-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Tìm kiếm chủ đề, định luật, công thức (ví dụ: Mol, Nồng độ, Archimedes, Tiêu hóa...)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border-2 border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-slate-900"
          />
        </div>
      </div>

      {/* Chapters list */}
      <div className="space-y-4">
        {filteredChapters.map(chapter => {
          const isExpanded = expandedChapter === chapter.id;

          return (
            <div
              key={chapter.id}
              className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-orange-50/30 hover:from-blue-50 hover:to-orange-50/60 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  {getSubjectIcon(chapter.subject)}
                  <div>
                    <span className="text-[11px] font-black text-orange-600 mr-2 bg-orange-100 px-2 py-0.5 rounded-md">
                      {chapter.romanNumeral}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">{chapter.title}</span>
                    <span className="text-xs text-slate-500 ml-2 font-medium">
                      ({chapter.lessons.length} bài học)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black text-blue-600 bg-white px-2.5 py-1 rounded-lg border border-blue-100 shadow-2xs">
                  {isExpanded ? 'Thu gọn ▲' : 'Mở rộng ▼'}
                </span>
              </button>

              {isExpanded && (
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 border-slate-100">
                  {chapter.lessons.map(lesson => (
                    <div
                      key={lesson.id}
                      className="p-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:bg-white hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-extrabold text-xs text-slate-900 mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          {lesson.title}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          KHTN 8 - KNTT
                        </span>
                        <button
                          onClick={() =>
                            onAskAI({
                              id: `TH_${lesson.id}`,
                              lessonId: lesson.id,
                              chapterId: lesson.chapterId,
                              subject: lesson.subject,
                              difficulty: 'thong_hieu',
                              question: `Hãy tóm tắt toàn bộ lý thuyết cốt lõi và các dạng bài tập quan trọng của "${lesson.title}" trong KHTN 8.`,
                              options: [],
                              correctIndex: 0,
                              explanation: lesson.description,
                            })
                          }
                          className="text-[11px] font-black text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border-2 border-orange-200 shadow-2xs hover:bg-orange-50 transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Hỏi Giáo Hà AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
