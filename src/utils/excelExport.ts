import * as XLSX from 'xlsx';
import { QuizHistoryItem, QuizResult } from '../types';
import { getCertificateRank } from '../components/CertificateCard';

/**
 * Format seconds into mm:ss
 */
export const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m > 0 ? `${m} phút ` : ''}${s} giây`;
};

/**
 * Export full history list or filtered history to an Excel (.xlsx) workbook
 */
export const exportHistoryToExcel = (
  historyItems: QuizHistoryItem[],
  fileNamePrefix: string = 'Lich_Su_Bai_Lam_KHTN8'
) => {
  if (!historyItems || historyItems.length === 0) {
    alert('Chưa có dữ liệu bài làm nào để xuất Excel!');
    return;
  }

  // 1. Prepare Summary Sheet data (Bảng tổng hợp)
  const summaryRows = historyItems.map((item, index) => {
    const percentage = item.totalQuestions > 0
      ? Math.round((item.correctCount / item.totalQuestions) * 100)
      : 0;

    const rank = getCertificateRank(item.correctCount, item.totalQuestions);

    const chemStats = `${item.subjectBreakdown?.chemistry?.correct || 0}/${item.subjectBreakdown?.chemistry?.total || 0}`;
    const physStats = `${item.subjectBreakdown?.physics?.correct || 0}/${item.subjectBreakdown?.physics?.total || 0}`;
    const bioStats = `${item.subjectBreakdown?.biology?.correct || 0}/${item.subjectBreakdown?.biology?.total || 0}`;

    return {
      'STT': index + 1,
      'Họ và Tên Học Sinh': item.studentName || 'Học sinh',
      'Lớp': item.studentClass || '8A',
      'Ngày Làm Bài': item.date,
      'Thời Gian Nộp': item.time || '',
      'Điểm Số (/10)': item.score10,
      'Xếp Loại': rank.level,
      'Tỉ Lệ Đúng (%)': `${percentage}%`,
      'Số Câu Đúng': item.correctCount,
      'Tổng Số Câu': item.totalQuestions,
      'Thời Gian Làm': formatDuration(item.timeSpentSeconds || 0),
      'Chế Độ': item.mode === 'exam' ? 'Thi thử' : 'Luyện tập',
      'Mức Độ Đề':
        item.difficulty === 'tong_hop'
          ? 'Tổng hợp (40-40-20)'
          : item.difficulty === 'nhan_biet'
          ? 'Nhận biết'
          : item.difficulty === 'thong_hieu'
          ? 'Thông hiểu'
          : 'Vận dụng',
      'Đúng Hóa Học': chemStats,
      'Đúng Vật Lí': physStats,
      'Đúng Sinh Học': bioStats,
      'Nhận Xét Của Giáo Hà AI': item.result?.teacherFeedback || rank.motivationalMessage,
    };
  });

  // 2. Prepare Detailed Questions Sheet data (Chi tiết từng câu hỏi)
  const detailedRows: any[] = [];
  let questionCounter = 1;

  historyItems.forEach((item, itemIdx) => {
    if (item.result?.questions && item.result?.userAnswers) {
      item.result.questions.forEach((q, qIdx) => {
        const uAns = item.result.userAnswers[q.id];
        const isCorrect = uAns?.selectedOptionIndex === q.correctIndex;
        const userChoice =
          uAns?.selectedOptionIndex !== null && uAns?.selectedOptionIndex !== undefined
            ? `${String.fromCharCode(65 + uAns.selectedOptionIndex)}. ${q.options[uAns.selectedOptionIndex]}`
            : 'Chưa chọn';
        const correctChoice = `${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}`;

        detailedRows.push({
          'STT': questionCounter++,
          'Mã Bài Thi': `Đề #${itemIdx + 1} (${item.date})`,
          'Học Sinh': item.studentName || 'Học sinh',
          'Lớp': item.studentClass || '8A',
          'Câu Số': qIdx + 1,
          'Phân Môn':
            q.subject === 'chemistry'
              ? 'Hóa học'
              : q.subject === 'physics'
              ? 'Vật lí'
              : 'Sinh học',
          'Mức Độ':
            q.difficulty === 'nhan_biet'
              ? 'Nhận biết'
              : q.difficulty === 'thong_hieu'
              ? 'Thông hiểu'
              : 'Vận dụng',
          'Nội Dung Câu Hỏi': q.question,
          'Lựa Chọn Của HS': userChoice,
          'Đáp Án Đúng': correctChoice,
          'Kết Quả': isCorrect ? 'ĐÚNG ✓' : 'SAI ✗',
          'Lời Giải Chi Tiết': q.explanation || '',
        });
      });
    }
  });

  // Create workbook
  const workbook = XLSX.utils.book_new();

  // Create summary sheet
  const summaryWorksheet = XLSX.utils.json_to_sheet(summaryRows);
  // Auto-set column widths
  summaryWorksheet['!cols'] = [
    { wch: 6 },  // STT
    { wch: 22 }, // Họ tên
    { wch: 8 },  // Lớp
    { wch: 14 }, // Ngày
    { wch: 12 }, // Giờ
    { wch: 12 }, // Điểm
    { wch: 18 }, // Xếp loại
    { wch: 14 }, // Tỉ lệ %
    { wch: 12 }, // Số câu đúng
    { wch: 12 }, // Tổng câu
    { wch: 16 }, // Thời gian làm
    { wch: 12 }, // Chế độ
    { wch: 20 }, // Mức độ
    { wch: 14 }, // Hóa
    { wch: 14 }, // Lý
    { wch: 14 }, // Sinh
    { wch: 45 }, // Nhận xét
  ];

  XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Bang_Tong_Hop_Diem');

  // Create detailed sheet if questions exist
  if (detailedRows.length > 0) {
    const detailedWorksheet = XLSX.utils.json_to_sheet(detailedRows);
    detailedWorksheet['!cols'] = [
      { wch: 6 },  // STT
      { wch: 20 }, // Mã bài
      { wch: 20 }, // Học sinh
      { wch: 8 },  // Lớp
      { wch: 8 },  // Câu số
      { wch: 12 }, // Phân môn
      { wch: 12 }, // Mức độ
      { wch: 45 }, // Câu hỏi
      { wch: 30 }, // Lựa chọn của HS
      { wch: 30 }, // Đáp án đúng
      { wch: 10 }, // Kết quả
      { wch: 50 }, // Lời giải
    ];
    XLSX.utils.book_append_sheet(workbook, detailedWorksheet, 'Chi_Tiet_Cau_Hoi');
  }

  // Generate file name with date timestamp
  const now = new Date();
  const dateStr = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
  const filename = `${fileNamePrefix}_${dateStr}.xlsx`;

  // Write and trigger download
  XLSX.writeFile(workbook, filename);
};

/**
 * Export a single quiz result to Excel
 */
export const exportSingleResultToExcel = (result: QuizResult) => {
  const historyItem: QuizHistoryItem = {
    id: `result_${Date.now()}`,
    studentName: result.studentName,
    studentClass: result.studentClass,
    timestamp: Date.now(),
    date: result.date,
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    score10: result.score10,
    correctCount: result.correctCount,
    totalQuestions: result.totalQuestions,
    timeSpentSeconds: result.timeSpentTotalSeconds,
    mode: 'practice',
    difficulty: result.difficulty,
    subjectBreakdown: result.subjectBreakdown,
    difficultyBreakdown: result.difficultyBreakdown,
    result,
  };

  const studentNameSlug = (result.studentName || 'HocSinh')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_');

  exportHistoryToExcel([historyItem], `Ket_Qua_KHTN8_${studentNameSlug}`);
};
