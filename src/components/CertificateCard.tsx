import React, { useState, useRef } from 'react';
import { QuizResult } from '../types';
import { Award, Printer, Sparkles, Download, CheckCircle2, Star, ShieldCheck, Maximize2, X, FileSpreadsheet } from 'lucide-react';
import { triggerFlowerConfetti } from '../utils/confettiFlower';
import { exportSingleResultToExcel } from '../utils/excelExport';

interface Props {
  result: QuizResult;
}

export interface RankInfo {
  level: string;
  badgeTitle: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  sealColor: string;
  titleColor: string;
  motivationalMessage: string;
  icon: string;
  stars: number;
}

export const getCertificateRank = (correctCount: number, totalQuestions: number): RankInfo => {
  const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

  if (percentage >= 90) {
    return {
      level: 'XUẤT SẮC',
      badgeTitle: 'HẠNG XUẤT SẮC 🌟',
      badgeBg: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600',
      badgeBorder: 'border-yellow-300 ring-4 ring-yellow-200/60',
      badgeText: 'text-slate-950 font-black',
      sealColor: 'from-amber-500 to-yellow-600',
      titleColor: 'text-amber-700',
      motivationalMessage:
        'Thành tích xuất chúng! Em thể hiện tư duy khoa học vượt trội, nắm vững toàn diện kiến thức Khoa học Tự nhiên 8!',
      icon: '🏆',
      stars: 5,
    };
  }

  if (percentage >= 80) {
    return {
      level: 'GIỎI',
      badgeTitle: 'HẠNG GIỎI 🎖️',
      badgeBg: 'bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700',
      badgeBorder: 'border-blue-300 ring-4 ring-blue-200/60',
      badgeText: 'text-white font-black',
      sealColor: 'from-blue-600 to-indigo-700',
      titleColor: 'text-blue-700',
      motivationalMessage:
        'Rất xuất sắc! Em có sự hiểu biết sâu sắc về các bài học và giải quyết các câu hỏi rất chuẩn xác!',
      icon: '🎖️',
      stars: 4,
    };
  }

  if (percentage > 50) {
    return {
      level: 'HOÀN THÀNH TỐT',
      badgeTitle: 'HOÀN THÀNH TỐT ⭐',
      badgeBg: 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700',
      badgeBorder: 'border-emerald-300 ring-4 ring-emerald-200/60',
      badgeText: 'text-white font-black',
      sealColor: 'from-emerald-600 to-teal-700',
      titleColor: 'text-emerald-700',
      motivationalMessage:
        'Làm bài rất tốt! Em đã nắm chắc kiến thức trọng tâm. Hãy tiếp tục phát huy để đạt điểm tuyệt đối nhé!',
      icon: '⭐',
      stars: 3,
    };
  }

  if (percentage === 50) {
    return {
      level: 'HOÀN THÀNH',
      badgeTitle: 'HOÀN THÀNH 👍',
      badgeBg: 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600',
      badgeBorder: 'border-orange-300 ring-4 ring-orange-200/60',
      badgeText: 'text-white font-black',
      sealColor: 'from-orange-500 to-amber-600',
      titleColor: 'text-orange-700',
      motivationalMessage:
        'Chúc mừng em đã hoàn thành bài ôn tập! Hãy tiếp tục ôn luyện thêm cùng Giáo Hà AI để tiến bộ hơn nữa!',
      icon: '👍',
      stars: 2,
    };
  }

  return {
    level: 'CẦN CỐ GẮNG',
    badgeTitle: 'NỖ LỰC CỐ GẮNG 📚',
    badgeBg: 'bg-gradient-to-r from-slate-600 to-slate-800',
    badgeBorder: 'border-slate-300 ring-2 ring-slate-200',
    badgeText: 'text-white font-black',
    sealColor: 'from-slate-700 to-slate-900',
    titleColor: 'text-slate-700',
    motivationalMessage:
      'Đừng nản lòng nhé! Vạn sự khởi đầu nan, hãy xem lại sổ tay lý thuyết và luyện tập thêm cùng Giáo Hà AI!',
    icon: '💪',
    stars: 1,
  };
};

export const CertificateCard: React.FC<Props> = ({ result }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const percentage =
    result.totalQuestions > 0
      ? Math.round((result.correctCount / result.totalQuestions) * 100)
      : 0;

  const rank = getCertificateRank(result.correctCount, result.totalQuestions);

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleCelebrate = () => {
    triggerFlowerConfetti();
  };

  const certificateContent = (
    <div
      ref={certificateRef}
      className="relative w-full aspect-[16/9] bg-gradient-to-br from-amber-50/40 via-white to-blue-50/30 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border-[8px] sm:border-[12px] border-double border-amber-600/80 flex flex-col justify-between overflow-hidden select-none printable-card"
      style={{
        boxShadow: '0 25px 50px -12px rgba(180, 83, 9, 0.25), inset 0 0 100px rgba(251, 191, 36, 0.08)',
      }}
    >
      {/* Decorative Ornate Corners */}
      <div className="absolute top-2 left-2 w-14 h-14 border-t-4 border-l-4 border-amber-600 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-2 right-2 w-14 h-14 border-t-4 border-r-4 border-amber-600 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-14 h-14 border-b-4 border-l-4 border-amber-600 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-14 h-14 border-b-4 border-r-4 border-amber-600 rounded-br-xl pointer-events-none" />

      {/* Inner fine border */}
      <div className="absolute inset-3 sm:inset-4 border border-amber-300/80 rounded-2xl pointer-events-none" />

      {/* Subtle Background Watermark Crest */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
        <Award className="w-[380px] h-[380px] text-amber-900" />
      </div>

      {/* HEADER SECTION */}
      <div className="text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="h-[1.5px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-500" />
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-amber-700">
            HỆ THỐNG ÔN TẬP KHOA HỌC TỰ NHIÊN 8
          </span>
          <div className="h-[1.5px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-500" />
        </div>

        <h1 className="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 drop-shadow-xs font-serif">
          GIẤY CHỨNG NHẬN VINH DANH
        </h1>
        <p className="text-[10px] sm:text-xs font-semibold text-slate-500 italic mt-0.5">
          Certificate of Scientific Achievement • Kết Nối Tri Thức Với Cuộc Sống
        </p>
      </div>

      {/* BODY CONTENT SECTION */}
      <div className="text-center relative z-10 my-auto py-1">
        <p className="text-xs sm:text-sm font-medium text-slate-600">Chứng nhận em:</p>
        
        {/* Student Name */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-blue-900 tracking-tight my-1 sm:my-2 font-serif drop-shadow-xs">
          {result.studentName || 'Học sinh KHTN 8'}
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-600 font-semibold">
          Lớp: <span className="font-extrabold text-slate-900">{result.studentClass || '8A'}</span> — Đã hoàn thành bài ôn luyện Khoa học Tự nhiên 8
        </p>

        {/* Achievement Rank Ribbon */}
        <div className="mt-3 sm:mt-4 flex flex-col items-center justify-center">
          <div
            className={`inline-flex items-center gap-2 px-5 sm:px-8 py-1.5 sm:py-2 rounded-full shadow-lg border-2 ${rank.badgeBg} ${rank.badgeBorder} ${rank.badgeText}`}
          >
            <span className="text-base sm:text-xl">{rank.icon}</span>
            <span className="text-xs sm:text-base font-black tracking-wider uppercase">
              XẾP LOẠI: {rank.level} ({percentage}%)
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mt-2 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  i < rank.stars ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Motivational Message */}
          <p className="text-[11px] sm:text-xs text-slate-700 font-medium italic max-w-xl mx-auto mt-2 px-4 leading-relaxed">
            "{rank.motivationalMessage}"
          </p>
        </div>
      </div>

      {/* FOOTER SECTION (Stats + Wax Seal + Teacher Signature) */}
      <div className="relative z-10 pt-2 border-t border-amber-200/80 flex items-end justify-between text-left">
        {/* Left: Summary Metrics */}
        <div className="space-y-0.5 text-[10px] sm:text-xs text-slate-600">
          <div className="font-semibold">
            Điểm số: <span className="font-black text-blue-800">{result.score10.toFixed(1)}/10</span> (Đúng {result.correctCount}/{result.totalQuestions} câu)
          </div>
          <div className="text-slate-500">
            Ngày hoàn thành: <span className="font-bold text-slate-700">{result.date}</span>
          </div>
          <div className="text-amber-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Xác thực KHTN 8 - Giáo Hà AI
          </div>
        </div>

        {/* Center: Wax Seal Stamp of Honor */}
        <div className="hidden sm:flex flex-col items-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 text-white flex flex-col items-center justify-center p-1 shadow-lg border-4 border-amber-300 ring-2 ring-red-400 rotate-[-8deg] transform hover:rotate-0 transition-transform">
            <Sparkles className="w-4 h-4 text-amber-200 absolute top-1" />
            <span className="text-[8px] font-black tracking-tighter uppercase text-amber-200">CHỨNG NHẬN</span>
            <span className="text-[10px] sm:text-xs font-black tracking-tight text-white">{rank.level}</span>
            <span className="text-[7px] font-bold text-amber-100">KHTN 8</span>
          </div>
        </div>

        {/* Right: Signature & Stamp */}
        <div className="text-right space-y-1">
          <div className="text-[10px] sm:text-xs text-slate-500 font-semibold">Giáo viên phụ trách</div>
          <div className="font-serif italic text-sm sm:text-base text-blue-950 font-black tracking-wide">
            Giáo Hà AI
          </div>
          <div className="text-[9px] sm:text-[10px] text-amber-700 font-bold">
            Trợ lí Sư phạm KHTN 8
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      {/* Control Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-white p-3.5 rounded-2xl border-2 border-amber-200 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            🏆
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900">
              Giấy Chứng Nhận Vinh Danh (Tỉ lệ 16:9)
            </h4>
            <p className="text-[11px] text-slate-500 font-semibold">
              Xếp loại: <span className="font-black text-amber-700">{rank.level} ({percentage}%)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportSingleResultToExcel(result)}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-emerald-200"
            title="Tải bảng điểm và bài làm này về file Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Xuất Excel
          </button>
          <button
            onClick={handleCelebrate}
            className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Tung bông tung hoa chúc mừng"
          >
            🌸 Tung hoa
          </button>
          <button
            onClick={() => setIsFullscreen(true)}
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-blue-200"
            title="Xem toàn màn hình"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Phóng to
          </button>
          <button
            onClick={handlePrintCertificate}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> In / Tải chứng nhận
          </button>
        </div>
      </div>

      {/* Main Certificate 16:9 container */}
      <div className="w-full max-w-4xl mx-auto">{certificateContent}</div>

      {/* Fullscreen Preview Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute -top-12 right-0 text-white hover:text-amber-300 font-bold text-xs flex items-center gap-1 p-2 cursor-pointer bg-black/40 rounded-xl"
            >
              <X className="w-5 h-5" /> Đóng xem đầy đủ
            </button>
            {certificateContent}
          </div>
        </div>
      )}
    </div>
  );
};
