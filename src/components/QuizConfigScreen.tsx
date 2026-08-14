import React, { useState, useMemo } from 'react';
import { CHAPTERS_DATA } from '../data/chapters';
import { DifficultyLevel, QuizConfig } from '../types';
import { User, BookOpen, Layers, Search, Play, Zap, Sparkles, Target, Award } from 'lucide-react';

interface Props {
  onStartQuiz: (config: QuizConfig) => void;
  initialConfig: QuizConfig;
}

export const QuizConfigScreen: React.FC<Props> = ({ onStartQuiz, initialConfig }) => {
  const [studentName, setStudentName] = useState(initialConfig.studentName);
  const [studentClass, setStudentClass] = useState(initialConfig.studentClass);
  const [questionCount, setQuestionCount] = useState(initialConfig.questionCount || 10);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialConfig.difficulty || 'tong_hop');
  const [mode, setMode] = useState<'exam' | 'practice'>(initialConfig.mode || 'exam');
  const [selectedLessons, setSelectedLessons] = useState<number[]>(initialConfig.selectedLessonIds);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'chemistry' | 'physics' | 'biology'>('all');

  const allLessonIds = useMemo(() => {
    return CHAPTERS_DATA.flatMap(ch => ch.lessons.map(l => l.id));
  }, []);

  const toggleSelectAll = () => {
    if (selectedLessons.length === allLessonIds.length) {
      setSelectedLessons([]);
    } else {
      setSelectedLessons([...allLessonIds]);
    }
  };

  const toggleChapter = (chapterLessons: number[]) => {
    const allSelected = chapterLessons.every(id => selectedLessons.includes(id));
    if (allSelected) {
      setSelectedLessons(selectedLessons.filter(id => !chapterLessons.includes(id)));
    } else {
      const merged = Array.from(new Set([...selectedLessons, ...chapterLessons]));
      setSelectedLessons(merged);
    }
  };

  const toggleLesson = (lessonId: number) => {
    if (selectedLessons.includes(lessonId)) {
      setSelectedLessons(selectedLessons.filter(id => id !== lessonId));
    } else {
      setSelectedLessons([...selectedLessons, lessonId]);
    }
  };

  const handleStart = () => {
    if (!studentName.trim()) {
      alert('Vui lòng nhập họ và tên học sinh để bắt đầu!');
      return;
    }
    if (selectedLessons.length === 0) {
      alert('Vui lòng chọn ít nhất một bài học để tạo đề ôn tập!');
      return;
    }
    onStartQuiz({
      studentName: studentName.trim(),
      studentClass: studentClass.trim() || '8A',
      questionCount: Math.min(30, Math.max(1, questionCount)),
      difficulty,
      selectedLessonIds: selectedLessons,
      mode,
      timeLimitMinutes: Math.round(questionCount * 1.5),
    });
  };

  const filteredChapters = CHAPTERS_DATA.filter(ch => {
    if (selectedSubject !== 'all' && ch.subject !== selectedSubject) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return ch.title.toLowerCase().includes(q) || ch.lessons.some(l => l.title.toLowerCase().includes(q));
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Banner in vibrant bright Blue & Orange */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-orange-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-400/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black uppercase tracking-wider mb-3 border border-white/30">
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-current" /> Hệ thống Ôn Luyện KHTN 8 Chuẩn SGK
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 drop-shadow-xs">
            GIA SƯ KHTN LỚP 8 — GIÁO HÀ AI
          </h2>
          <p className="text-blue-50 text-sm sm:text-base max-w-2xl leading-relaxed font-medium">
            Ôn tập toàn diện 8 Chương và 47 Bài học sách Kết nối tri thức. Tích hợp âm thanh chúc mừng hoành tráng, tung bông tung hoa khi trả lời đúng và mặt khóc dí dỏm khi trả lời sai!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Student Info & Config */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Thông tin học sinh */}
          <div className="bg-white p-6 rounded-3xl border-2 border-blue-100 shadow-sm">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-4 h-4" />
              </div>
              1. Thông tin học sinh
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên học sinh <span className="text-orange-500">*</span>
                </label>
                <input
                  id="student-name-input"
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-semibold text-slate-900 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lớp học</label>
                <input
                  id="student-class-input"
                  type="text"
                  placeholder="Ví dụ: 8A1, 8/2, 8B..."
                  value={studentClass}
                  onChange={e => setStudentClass(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-semibold text-slate-900 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Cấu hình đề thi */}
          <div className="bg-white p-6 rounded-3xl border-2 border-blue-100 shadow-sm">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Layers className="w-4 h-4" />
              </div>
              2. Cấu hình đề thi
            </h3>

            {/* Số lượng câu hỏi */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700">
                  Số lượng câu hỏi (Tối đa 30 câu):
                </label>
                <span className="text-sm font-black text-orange-600 bg-orange-50 px-3 py-0.5 rounded-full border border-orange-200 shadow-xs">
                  {questionCount} câu
                </span>
              </div>
              <input
                id="question-count-slider"
                type="range"
                min="5"
                max="30"
                step="5"
                value={questionCount}
                onChange={e => setQuestionCount(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer h-2 bg-blue-100 rounded-lg"
              />
              
              {/* Quick preset buttons for question count */}
              <div className="flex items-center gap-1.5 mt-2.5">
                {[5, 10, 15, 20, 25, 30].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`flex-1 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      questionCount === cnt
                        ? 'bg-orange-500 text-white border-orange-600 shadow-xs scale-105'
                        : 'bg-slate-50 hover:bg-orange-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {cnt} câu
                  </button>
                ))}
              </div>
            </div>

            {/* Mức độ */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Mức độ nhận thức:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'nhan_biet', label: '🟢 Nhận biết', desc: 'Định nghĩa, khái niệm' },
                  { id: 'thong_hieu', label: '🔵 Thông hiểu', desc: 'Hiểu hiện tượng, bản chất' },
                  { id: 'van_dung', label: '🟠 Vận dụng', desc: 'Tính toán & định lượng' },
                  { id: 'tong_hop', label: '⭐ Tổng hợp 3 mức', desc: 'Phân bổ chuẩn ma trận' },
                ].map(lvl => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setDifficulty(lvl.id as DifficultyLevel)}
                    className={`p-3 text-left rounded-2xl border-2 transition-all cursor-pointer ${
                      difficulty === lvl.id
                        ? 'border-orange-500 bg-orange-50/80 ring-2 ring-orange-400/20 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-blue-300 bg-slate-50/60'
                    }`}
                  >
                    <div className="font-extrabold text-xs text-slate-900">{lvl.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-medium">{lvl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chế độ làm bài */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Chế độ làm bài:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('exam')}
                  className={`p-3 rounded-2xl border-2 text-xs font-black text-center transition-all cursor-pointer ${
                    mode === 'exam'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  ⏱️ Thi thử tính giờ
                </button>
                <button
                  type="button"
                  onClick={() => setMode('practice')}
                  className={`p-3 rounded-2xl border-2 text-xs font-black text-center transition-all cursor-pointer ${
                    mode === 'practice'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-orange-300'
                  }`}
                >
                  🎉 Luyện tập tức thì
                </button>
              </div>
            </div>
          </div>

          <button
            id="start-quiz-button"
            onClick={handleStart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-base shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-98 hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5 fill-current" /> BẮT ĐẦU ÔN TẬP & LÀM BÀI
          </button>
        </div>

        {/* Right Column: Lesson Selection */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border-2 border-blue-100 shadow-sm flex flex-col h-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <BookOpen className="w-4 h-4" />
                </div>
                3. Chọn Bài học ôn tập
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Đã chọn:{' '}
                <span className="font-black text-orange-600">
                  {selectedLessons.length}/{allLessonIds.length}
                </span>{' '}
                bài học
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={toggleSelectAll}
                className="text-xs font-bold px-3.5 py-1.5 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all cursor-pointer"
              >
                {selectedLessons.length === allLessonIds.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả 47 bài'}
              </button>
            </div>
          </div>

          {/* Filter subject tabs & Search */}
          <div className="space-y-3 mb-4">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'Tất cả (8 Chương)' },
                { id: 'chemistry', label: '🧪 Hoá học (C.I - II)' },
                { id: 'physics', label: '⚡ Vật lí (C.III - VI)' },
                { id: 'biology', label: '🌿 Sinh học (C.VII - VIII)' },
              ].map(sub => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubject(sub.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSubject === sub.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-blue-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Tìm kiếm bài học (ví dụ: Acid, Áp suất, Máu, Quần thể, Mol...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-medium focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-slate-900"
              />
            </div>
          </div>

          {/* Chapter & Lesson List */}
          <div className="space-y-4 overflow-y-auto max-h-[500px] pr-1 flex-1">
            {filteredChapters.map(chap => {
              const chapLessonIds = chap.lessons.map(l => l.id);
              const isAllChapSelected = chapLessonIds.every(id => selectedLessons.includes(id));
              const isSomeChapSelected = chapLessonIds.some(id => selectedLessons.includes(id));

              return (
                <div key={chap.id} className="border-2 border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-blue-600 text-white shadow-2xs">
                        {chap.romanNumeral}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900 uppercase tracking-tight">
                        {chap.title}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleChapter(chapLessonIds)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        isAllChapSelected
                          ? 'text-orange-700 bg-orange-100 border border-orange-300'
                          : isSomeChapSelected
                          ? 'text-blue-700 bg-blue-100 border border-blue-300'
                          : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isAllChapSelected ? '✓ Đã chọn cả chương' : 'Chọn cả chương'}
                    </button>
                  </div>
                  <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white">
                    {chap.lessons.map(les => {
                      const isChecked = selectedLessons.includes(les.id);
                      return (
                        <label
                          key={les.id}
                          className={`flex items-start space-x-2.5 p-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                            isChecked
                              ? 'border-orange-400 bg-orange-50/60 text-slate-900 font-bold'
                              : 'border-slate-100 hover:border-slate-200 text-slate-700 font-medium'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleLesson(les.id)}
                            className="mt-0.5 rounded text-orange-600 focus:ring-orange-500 accent-orange-500"
                          />
                          <div className="text-xs leading-snug">
                            <span>{les.title}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
