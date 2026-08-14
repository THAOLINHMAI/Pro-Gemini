import { QuizHistoryItem, QuizResult } from '../types';

const STORAGE_KEY = 'khtn8_quiz_history';

/**
 * Load all quiz history items from localStorage
 */
export const loadQuizHistory = (): QuizHistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Failed to load quiz history:', error);
    return [];
  }
};

/**
 * Save a new quiz result to history in localStorage
 */
export const saveQuizResultToHistory = (result: QuizResult, mode: 'exam' | 'practice' = 'practice'): QuizHistoryItem => {
  const now = new Date();
  const newItem: QuizHistoryItem = {
    id: `history_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    studentName: result.studentName || 'Học sinh',
    studentClass: result.studentClass || '8A',
    timestamp: Date.now(),
    date: result.date || now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    time: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    score10: result.score10,
    correctCount: result.correctCount,
    totalQuestions: result.totalQuestions,
    timeSpentSeconds: result.timeSpentTotalSeconds,
    mode,
    difficulty: result.difficulty,
    subjectBreakdown: result.subjectBreakdown,
    difficultyBreakdown: result.difficultyBreakdown,
    result,
  };

  try {
    const current = loadQuizHistory();
    // Keep up to 200 recent history entries
    const updated = [newItem, ...current.filter(item => item.id !== newItem.id)].slice(0, 200);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save quiz history to localStorage:', error);
  }

  return newItem;
};

/**
 * Delete a specific history item
 */
export const deleteQuizHistoryItem = (id: string): QuizHistoryItem[] => {
  try {
    const current = loadQuizHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to delete history item:', error);
    return loadQuizHistory();
  }
};

/**
 * Clear all quiz history
 */
export const clearAllQuizHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear quiz history:', error);
  }
};
