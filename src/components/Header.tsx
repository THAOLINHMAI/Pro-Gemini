import React from 'react';
import { BookOpen, Sparkles, GraduationCap, Award, FileSpreadsheet, History } from 'lucide-react';

interface HeaderProps {
  studentName: string;
  studentClass: string;
  activeTab: 'config' | 'quiz' | 'result' | 'theory' | 'history';
  onTabChange: (tab: 'config' | 'theory' | 'history') => void;
  isQuizActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  studentName,
  studentClass,
  activeTab,
  onTabChange,
  isQuizActive,
}) => {
  return (
    <header className="bg-white border-b-2 border-blue-100 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => !isQuizActive && onTabChange('config')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-orange-500 flex items-center justify-center text-white shadow-md font-black text-lg">
              K8
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-black text-blue-900 text-lg tracking-tight">GIA SƯ KHTN LỚP 8</h1>
                <span className="text-[10px] font-black bg-gradient-to-r from-orange-500 to-amber-500 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-2.5 h-2.5" /> Giáo Hà AI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Kết nối tri thức với cuộc sống</p>
            </div>
          </div>

          {/* Right Navigation & Student Tag */}
          <div className="flex items-center space-x-3">
            {/* Student badge */}
            {(studentName || studentClass) && (
              <div className="hidden sm:flex items-center space-x-2 bg-blue-50 px-3.5 py-1.5 rounded-xl border border-blue-200 text-xs">
                <GraduationCap className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-slate-800">{studentName || 'Học sinh'}</span>
                {studentClass && (
                  <span className="bg-orange-500 text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase">
                    Lớp {studentClass}
                  </span>
                )}
              </div>
            )}

            {!isQuizActive && (
              <div className="flex items-center space-x-1.5 bg-blue-50/80 p-1 rounded-2xl border border-blue-100">
                <button
                  id="tab-btn-practice"
                  onClick={() => onTabChange('config')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeTab === 'config' || activeTab === 'quiz' || activeTab === 'result'
                      ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-blue-700'
                  }`}
                >
                  🎯 Ôn Luyện
                </button>
                <button
                  id="tab-btn-theory"
                  onClick={() => onTabChange('theory')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeTab === 'theory'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-orange-600'
                  }`}
                >
                  📖 Sổ Tay Lý Thuyết
                </button>
                <button
                  id="tab-btn-history"
                  onClick={() => onTabChange('history')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    activeTab === 'history'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <History className="w-3.5 h-3.5" /> Lịch Sử & Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
