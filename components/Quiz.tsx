import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCcw, Trophy, ArrowUp } from 'lucide-react';
import { QUIZ_DATA } from '../constants';

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = QUIZ_DATA[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_DATA.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-5"></div>
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        <div className="text-center mb-12">
          <span className="text-party-red font-bold tracking-widest uppercase">Kiểm tra kiến thức</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 text-party-gold">
            Đấu Trường Lịch Sử
          </h2>
        </div>

        {!isCompleted ? (
          <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-700">
              <motion.div 
                className="h-full bg-party-red"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / QUIZ_DATA.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="p-6 md:p-10">
              <div className="flex justify-between items-center mb-6 text-slate-400 text-sm font-semibold uppercase tracking-wide">
                <span>Câu hỏi {currentQuestionIndex + 1} / {QUIZ_DATA.length}</span>
                <span>Điểm: {score}</span>
              </div>

              <motion.h3 
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl font-serif font-bold mb-8 leading-relaxed"
              >
                {currentQuestion.question}
              </motion.h3>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  
                  let buttonStyle = "border-slate-600 hover:bg-slate-700";
                  if (isAnswered) {
                    if (isCorrect) buttonStyle = "bg-green-900/40 border-green-500 text-green-100";
                    else if (isSelected) buttonStyle = "bg-red-900/40 border-red-500 text-red-100";
                    else buttonStyle = "border-slate-700 opacity-50";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between group ${buttonStyle}`}
                    >
                      <span className="flex-1 pr-4">
                        <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </span>
                      {isAnswered && isCorrect && <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500 w-6 h-6 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 bg-slate-900/50 p-4 rounded-lg border-l-4 border-party-gold"
                  >
                    <h4 className="text-party-gold font-bold mb-1 flex items-center gap-2">
                      <BookOpenIcon /> Giải thích:
                    </h4>
                    <p className="text-slate-300 text-sm md:text-base">{currentQuestion.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={!isAnswered}
                  className={`px-8 py-3 rounded-full font-bold transition-all ${
                    isAnswered 
                      ? 'bg-party-red hover:bg-red-700 text-white shadow-lg hover:-translate-y-1' 
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {currentQuestionIndex === QUIZ_DATA.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 rounded-2xl shadow-2xl p-10 text-center border border-party-gold"
          >
            <div className="w-24 h-24 bg-party-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(255,215,0,0.5)]">
              <Trophy className="w-12 h-12 text-slate-900" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-white mb-4">Hoàn thành xuất sắc!</h3>
            <p className="text-slate-300 mb-8 text-lg">
              Bạn đã trả lời đúng <span className="text-party-gold font-bold text-2xl">{score}</span> / {QUIZ_DATA.length} câu hỏi.
            </p>
            
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-full font-semibold transition-colors"
              >
                <RefreshCcw size={18} /> Làm lại
              </button>
              <button 
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 bg-party-red hover:bg-red-700 text-white rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1"
              >
                <ArrowUp size={18} /> Về đầu trang
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const BookOpenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

export default Quiz;