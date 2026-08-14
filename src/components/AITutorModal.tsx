import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';
import { Sparkles, X, Send, Bot, User, Loader2, BookOpen } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  question: Question | null;
  studentName: string;
  studentClass: string;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AITutorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  question,
  studentName,
  studentClass,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && question) {
      // Initialize with introductory greeting and analysis of the current question
      const initMessages: Message[] = [
        {
          id: '1',
          sender: 'ai',
          text: `Chào em ${studentName || 'học sinh'} (Lớp ${studentClass || '8'})! Thầy/Cô Giáo Hà AI rất vui được hỗ trợ em. Về câu hỏi này:\n\n**"${question.question}"**\n\nEm cần Thầy/Cô giải thích phần nào (khái niệm lý thuyết, phương pháp giải từng bước hay ví dụ thực tế)?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ];
      setMessages(initMessages);

      // Auto fetch deep explanation from AI endpoint
      fetchExplanation(question);
    }
  }, [isOpen, question]);

  const fetchExplanation = async (q: Question) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `${q.question}\nCác phương án: ${q.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('; ')}\nĐáp án đúng: ${String.fromCharCode(65 + q.correctIndex)}\nGiải thích cơ bản: ${q.explanation}`,
          lessonTitle: `Bài học liên quan (ID: ${q.lessonId})`,
          studentName,
          studentClass,
          userPrompt: `Hãy giải thích chi tiết câu trắc nghiệm sau cho học sinh lớp 8:\n"${q.question}"\nPhương án đúng là ${String.fromCharCode(65 + q.correctIndex)}. Hãy phân tích vì sao đáp án này đúng và vì sao các đáp án khác chưa chính xác.`,
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể kết nối máy chủ');
      }

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: data.reply || q.explanation,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: `💡 **Tóm tắt lời giải từ Giáo Hà AI:**\n\n${q.explanation}\n\n*Đáp án đúng là:* **${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}**\n\n${q.hint ? `*Gợi ý nhớ nhanh:* ${q.hint}` : ''}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;

    const userText = inputPrompt.trim();
    setInputPrompt('');

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question ? question.question : 'Kiến thức KHTN 8',
          studentName,
          studentClass,
          userPrompt: userText,
        }),
      });

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.reply || 'Thầy/Cô đã ghi nhận câu hỏi của em. Em hãy xem lại sách giáo khoa KHTN 8 nhé!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Thầy/Cô khuyên em nên đọc kỹ phần "Em đã học" ở cuối bài học trong SGK KHTN 8 để nắm chắc kiến thức cốt lõi nhé!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-2xl h-[85vh] max-h-[700px] flex flex-col shadow-2xl overflow-hidden border-2 border-blue-200">
        {/* Header with bright Blue & Orange styling */}
        <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-orange-500 text-white p-4 px-6 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-xs border border-white/30">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-base">Gia Sư Giáo Hà AI</h3>
                <span className="text-[10px] bg-orange-400 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                  Trực tuyến
                </span>
              </div>
              <p className="text-xs text-blue-100 font-medium">
                Giải đáp thắc mắc KHTN 8 — Kết nối tri thức
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question summary banner */}
        {question && (
          <div className="bg-blue-50/80 border-b border-blue-100 p-3 px-6 text-xs text-slate-700 flex items-start gap-2 shrink-0">
            <BookOpen className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <div className="line-clamp-2">
              <span className="font-black text-blue-900">Câu hỏi đang giải đáp: </span>
              {question.question}
            </div>
          </div>
        )}

        {/* Chat message stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs ${
                  msg.sender === 'ai'
                    ? 'bg-gradient-to-tr from-blue-600 to-sky-600 text-white'
                    : 'bg-orange-500 text-white'
                }`}
              >
                {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-tr-xs shadow-xs font-semibold'
                    : 'bg-white text-slate-800 rounded-tl-xs border-2 border-slate-100 shadow-xs font-medium'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-orange-100' : 'text-slate-400'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border-2 border-blue-100 rounded-2xl rounded-tl-xs p-3.5 text-xs text-slate-600 flex items-center space-x-2 shadow-xs font-medium">
                <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                <span>Giáo Hà AI đang soạn câu trả lời chi tiết cho em...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-2 px-4 bg-white border-t border-slate-100 flex flex-wrap gap-1.5 shrink-0">
          {[
            '🔍 Giải thích vì sao đáp án đúng?',
            '📝 Hướng dẫn từng bước giải bài này',
            '⚡ Nhắc lại công thức / lý thuyết cốt lõi',
          ].map((promptText, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setInputPrompt(promptText);
              }}
              className="text-[11px] font-bold bg-blue-50 hover:bg-orange-50 hover:text-orange-700 text-blue-700 px-3 py-1 rounded-full border border-blue-200 transition-all cursor-pointer"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0"
        >
          <input
            type="text"
            placeholder="Hỏi Giáo Hà AI bất cứ điều gì về bài học..."
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs rounded-xl border-2 border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-slate-900 font-medium"
          />
          <button
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="p-2.5 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-black text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gửi</span>
          </button>
        </form>
      </div>
    </div>
  );
};
