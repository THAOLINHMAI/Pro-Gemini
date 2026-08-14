import React, { useState, useEffect, useMemo } from 'react';
import { QuizHistoryItem, QuizResult, Question } from '../types';
import {
  loadQuizHistory,
  deleteQuizHistoryItem,
  clearAllQuizHistory,
} from '../utils/historyStorage';
import { exportHistoryToExcel, exportSingleResultToExcel, formatDuration } from '../utils/excelExport';
import { getCertificateRank, CertificateCard } from './CertificateCard';
import {
  FileSpreadsheet,
  Download,
  Trash2,
  Search,
  Filter,
  Calendar,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowUpDown,
  BookOpen,
  Sparkles,
  User,
  GraduationCap,
  X,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface Props {
  onViewResultDetails: (result: QuizResult) => void;
  onStartNewQuiz: () => void;
  onAskAI?: (question: Question) => void;
}

export const HistoryScreen: React.FC<Props> = ({
  onViewResultDetails,
  onStartNewQuiz,
  onAskAI,
}) => {
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedCertificateResult, setSelectedCertificateResult] = useState<QuizResult | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setHistory(loadQuizHistory());
  }, []);

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi bài làm này?')) {
      const updated = deleteQuizHistoryItem(id);
      setHistory(updated);
    }
  };

  const handleClearAll = () => {
    clearAllQuizHistory();
    setHistory([]);
    setShowClearConfirm(false);
  };

  // Get distinct classes
  const classList = useMemo(() => {
    const set = new Set<string>();
    history.forEach(item => {
      if (item.studentClass) set.add(item.studentClass);
    });
    return Array.from(set).sort();
  }, [history]);

  // Filtered history list
  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      // Search term
      const matchesSearch =
        searchTerm === '' ||
        (item.studentName && item.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.studentClass && item.studentClass.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.date.includes(searchTerm);

      // Class filter
      const matchesClass = selectedClass === 'all' || item.studentClass === selectedClass;

      // Rank filter
      const rank = getCertificateRank(item.correctCount, item.totalQuestions);
      const matchesRank = selectedRank === 'all' || rank.level === selectedRank;

      return matchesSearch && matchesClass && matchesRank;
    });
  }, [history, searchTerm, selectedClass, selectedRank]);

  // Summary statistics
  const stats = useMemo(() => {
    if (history.length === 0) {
      return { total: 0, avgScore: 0, excellentCount: 0, goodCount: 0, avgAccuracy: 0 };
    }
    const total = history.length;
    const totalScore = history.reduce((sum, item) => sum + item.score10, 0);
    const avgScore = (totalScore / total).toFixed(1);

    let excellentCount = 0;
    let goodCount = 0;
    let totalCorrect = 0;
    let totalQuestions = 0;

    history.forEach(item => {
      const p = item.totalQuestions > 0 ? (item.correctCount / item.totalQuestions) * 100 : 0;
      if (p >= 90) excellentCount++;
      else if (p >= 80) goodCount++;

      totalCorrect += item.correctCount;
      totalQuestions += item.totalQuestions;
    });

    const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    return {
      total,
      avgScore,
      excellentCount,
      goodCount,
      avgAccuracy,
    };
  }, [history]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Top Banner & Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-100 shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-blue-600 to-amber-500" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> LƯU TRỮ VÀ XUẤT BÁO CÁO HỌC TẬP
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Lịch Sử Bài Làm & Quản Lý Điểm Số
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Theo dõi tiến độ, xem lại giấy chứng nhận và xuất dữ liệu bài làm sang định dạng file Excel (.xlsx).
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportHistoryToExcel(filteredHistory, 'Bang_Diem_KHTN8_Xuat_Excel')}
              disabled={filteredHistory.length === 0}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Xuất File Excel (.xlsx)</span>
            </button>
            <button
              onClick={onStartNewQuiz}
              className="px-4 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer border border-blue-200 flex items-center gap-1.5"
            >
              🎯 Làm bài ôn mới
            </button>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase">Tổng số bài làm</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-900 mt-1">
              {stats.total} <span className="text-xs font-medium text-slate-500">lượt</span>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase">Điểm trung bình</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">
              {stats.avgScore} <span className="text-xs font-medium text-slate-500">/10</span>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase">Xuất sắc & Giỏi</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">
              {stats.excellentCount + stats.goodCount}{' '}
              <span className="text-xs font-medium text-slate-500">bài</span>
            </div>
          </div>

          <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-4 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase">Độ chính xác TB</div>
            <div className="text-2xl sm:text-3xl font-black text-orange-600 mt-1">
              {stats.avgAccuracy}%
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs mb-6">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên học sinh, lớp, hoặc ngày làm..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Class Filter */}
          {classList.length > 0 && (
            <div className="flex items-center gap-1.5 w-full md:w-auto">
              <label className="text-xs font-bold text-slate-600 whitespace-nowrap">Lớp:</label>
              <select
                value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">Tất cả các lớp</option>
                {classList.map(c => (
                  <option key={c} value={c}>
                    Lớp {c}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Rank Filter */}
          <div className="flex items-center gap-1.5 w-full md:w-auto">
            <label className="text-xs font-bold text-slate-600 whitespace-nowrap">Xếp loại:</label>
            <select
              value={selectedRank}
              onChange={e => setSelectedRank(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Tất cả xếp loại</option>
              <option value="XUẤT SẮC">🌟 Xuất sắc (&gt;= 90%)</option>
              <option value="GIỎI">🎖️ Giỏi (80% - 90%)</option>
              <option value="HOÀN THÀNH TỐT">⭐ Hoàn thành tốt (&gt; 50%)</option>
              <option value="HOÀN THÀNH">👍 Hoàn thành (50%)</option>
              <option value="CẦN CỐ GẮNG">📚 Cần cố gắng (&lt; 50%)</option>
            </select>
          </div>

          {/* Clear history button */}
          {history.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer border border-rose-200 whitespace-nowrap flex items-center gap-1"
              title="Xóa toàn bộ lịch sử bài làm"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Clearing History */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-2 border-rose-200 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Xóa toàn bộ lịch sử?</h3>
            <p className="text-xs text-slate-500 mt-2">
              Hành động này sẽ xóa tất cả {history.length} bài làm đã lưu trong ứng dụng. Bạn sẽ không thể khôi phục lại.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleClearAll}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black cursor-pointer shadow-md"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Items List / Table */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-800">Chưa có bài làm nào trong lịch sử</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            {searchTerm || selectedRank !== 'all' || selectedClass !== 'all'
              ? 'Không tìm thấy kết quả phù hợp với bộ lọc hiện tại. Hãy thử thay đổi từ khóa.'
              : 'Hãy bắt đầu làm bài ôn tập KHTN 8, kết quả và chứng nhận của em sẽ được tự động lưu lại tại đây!'}
          </p>
          <button
            onClick={onStartNewQuiz}
            className="mt-5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xs font-black shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            🎯 Bắt đầu làm bài ngay
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-500">
            <span>Hiển thị {filteredHistory.length} kết quả</span>
            <span className="italic">Bấm vào từng bài để xem lại chi tiết hoặc chứng nhận</span>
          </div>

          {filteredHistory.map((item, idx) => {
            const rank = getCertificateRank(item.correctCount, item.totalQuestions);
            const percentage =
              item.totalQuestions > 0
                ? Math.round((item.correctCount / item.totalQuestions) * 100)
                : 0;

            return (
              <div
                key={item.id || idx}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left Column: Student info & date */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-100 to-indigo-100 text-blue-800 flex items-center justify-center font-black text-sm shrink-0 border border-blue-200">
                      {idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.studentName || 'Học sinh KHTN 8'}
                        </span>
                        {item.studentClass && (
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-[11px] font-black border border-blue-200">
                            Lớp {item.studentClass}
                          </span>
                        )}
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full ${rank.badgeBg} ${rank.badgeText} font-black shadow-2xs`}
                        >
                          {rank.level} ({percentage}%)
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {item.date} {item.time ? `• ${item.time}` : ''}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {formatDuration(item.timeSpentSeconds || 0)}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span>
                          {item.mode === 'exam' ? 'Thi thử có hẹn giờ' : 'Luyện tập'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Score & Action buttons */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Score Badge */}
                    <div className="text-right sm:pr-2">
                      <div className="text-lg sm:text-xl font-black text-blue-900">
                        {item.score10.toFixed(1)}
                        <span className="text-xs font-normal text-slate-400">/10</span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-500">
                        Đúng {item.correctCount}/{item.totalQuestions} câu
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5">
                      {/* View Certificate 16:9 */}
                      <button
                        onClick={() => setSelectedCertificateResult(item.result)}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border border-amber-200"
                        title="Xem giấy chứng nhận vinh danh 16:9"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span className="hidden md:inline">Chứng nhận</span>
                      </button>

                      {/* View Full Result Details */}
                      <button
                        onClick={() => onViewResultDetails(item.result)}
                        className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border border-blue-200"
                        title="Xem lại bảng phân tích chi tiết & câu hỏi"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Chi tiết</span>
                      </button>

                      {/* Export Single Excel */}
                      <button
                        onClick={() => exportSingleResultToExcel(item.result)}
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border border-emerald-200"
                        title="Tải về file Excel cho bài làm này"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="hidden md:inline">Excel</span>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={e => handleDeleteItem(item.id, e)}
                        className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Xóa bản ghi này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-discipline progress bar */}
                {item.subjectBreakdown && (
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                    <div className="bg-amber-50/60 rounded-lg px-2 py-1 flex items-center justify-between">
                      <span className="font-bold text-amber-800">Hóa học:</span>
                      <span>
                        {item.subjectBreakdown.chemistry?.correct || 0}/{item.subjectBreakdown.chemistry?.total || 0} câu
                      </span>
                    </div>
                    <div className="bg-blue-50/60 rounded-lg px-2 py-1 flex items-center justify-between">
                      <span className="font-bold text-blue-800">Vật lí:</span>
                      <span>
                        {item.subjectBreakdown.physics?.correct || 0}/{item.subjectBreakdown.physics?.total || 0} câu
                      </span>
                    </div>
                    <div className="bg-emerald-50/60 rounded-lg px-2 py-1 flex items-center justify-between">
                      <span className="font-bold text-emerald-800">Sinh học:</span>
                      <span>
                        {item.subjectBreakdown.biology?.correct || 0}/{item.subjectBreakdown.biology?.total || 0} câu
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Certificate Modal popup when clicked from history list */}
      {selectedCertificateResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-amber-300">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-black text-slate-900">
                  Giấy Chứng Nhận Học Sinh: {selectedCertificateResult.studentName}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportSingleResultToExcel(selectedCertificateResult)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border border-emerald-200"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Xuất Excel
                </button>
                <button
                  onClick={() => setSelectedCertificateResult(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <CertificateCard result={selectedCertificateResult} />
          </div>
        </div>
      )}
    </div>
  );
};
