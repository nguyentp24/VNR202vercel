import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, HelpCircle } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const QUESTION_DURATION = 20;

type QuizQuestion = {
  id?: string;
  question: string;
  options: string[];
  correctAnswer: string | number;
  explanation?: string;
};

type SelectedAnswer = {
  index: number;
  value: string;
} | null;

type QuizTestProps = {
  sessionId: string;
  playerId: string;
  currentQuestion: QuizQuestion | null;
  currentQuestionIndex: number;
  totalQuestions?: number;
  isAdmin?: boolean;
  revealAnswers?: boolean;
};

const calculateScore = (isCorrect: boolean, timeSpent: number): number => {
  if (!isCorrect) return 0;
  const baseScore = 100;
  let timeBonus = 0;
  if (timeSpent <= 5) timeBonus = 50;      
  else if (timeSpent <= 10) timeBonus = 30; 
  else if (timeSpent <= 15) timeBonus = 15; 
  else timeBonus = 5;                      
  
  return baseScore + timeBonus;
};

const QuizTest: React.FC<QuizTestProps> = ({
  sessionId,
  playerId,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions = 12,
  isAdmin = false,
  revealAnswers = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(QUESTION_DURATION);
  const [earnedScore, setEarnedScore] = useState(0);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimer(QUESTION_DURATION);
    setEarnedScore(0);
  }, [currentQuestionIndex, currentQuestion?.id]);

  useEffect(() => {
    if (!currentQuestion) return;
    
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!isSubmitted && !isAdmin) handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isSubmitted, currentQuestion?.id, isAdmin]);

  const isCorrectOption = useMemo(() => {
    if (!currentQuestion) return () => false;
    return (index: number, option: string) => {
      const { correctAnswer } = currentQuestion;
      if (typeof correctAnswer === 'number') return index === correctAnswer;
      return option === correctAnswer;
    };
  }, [currentQuestion]);

  const handleTimeout = async () => {
    if (isSubmitted || isAdmin || !currentQuestion) return;
    setIsSubmitted(true);
    if (!selectedAnswer) {
      const playerRef = doc(db, `sessions/${sessionId}/players/${playerId}`);
      await updateDoc(playerRef, { [`answeredQuestions.${currentQuestionIndex}`]: false });
    }
  };

  const submitAnswer = async (answer: SelectedAnswer) => {
    if (!answer || isSubmitted || isAdmin || !currentQuestion) return;
    
    setIsSubmitted(true);
    setSelectedAnswer(answer);

    const timeUsed = QUESTION_DURATION - timer; 

    const correct = isCorrectOption(answer.index, answer.value);
    const score = calculateScore(correct, timeUsed);
    setEarnedScore(score);

    try {
      const playerRef = doc(db, `sessions/${sessionId}/players/${playerId}`);
      await updateDoc(playerRef, {
        [`answers.${currentQuestionIndex}`]: {
          answer: answer.value,
          index: answer.index,
          isCorrect: correct,
          score,
          timeSpent: timeUsed
        },
        [`answeredQuestions.${currentQuestionIndex}`]: true
      });
    } catch (error) { console.error('Error saving answer:', error); }
  };

  if (!currentQuestion) {
    return (
      <section className="bg-transparent text-stone-200 relative overflow-hidden h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-600 mx-auto mb-4" />
          <p className="text-stone-500 font-serif italic">Đang tải dữ liệu...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-transparent text-stone-200 relative h-full">
      <div className="h-full flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-stone-900 border-b border-stone-700 p-4 flex justify-between items-center relative overflow-hidden rounded-t-sm">
           {/* Progress Line */}
           <div className="absolute bottom-0 left-0 h-1 bg-stone-800 w-full">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-700 to-yellow-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
           </div>
           
           <div className="flex items-center gap-3">
              <span className="bg-stone-800 text-stone-400 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider border border-stone-700">
                 Câu hỏi {currentQuestionIndex + 1} / {totalQuestions}
              </span>
           </div>

           <div className={`flex items-center gap-2 px-3 py-1 rounded-sm border ${
             timer <= 5 ? 'bg-red-900/50 border-red-500 text-red-400 animate-pulse' : 'bg-stone-800 border-stone-600 text-yellow-500'
           }`}>
              <Clock size={16} />
              <span className="font-mono font-bold w-8 text-center">{timer}s</span>
           </div>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col bg-[#1c1917] rounded-b-sm border-x border-b border-stone-700 shadow-2xl">
           
           {/* Question Text */}
           <motion.div
             key={currentQuestion.id ?? currentQuestionIndex}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8"
           >
              <h3 className="text-xl md:text-2xl font-serif font-bold leading-relaxed text-stone-100">
                {currentQuestion.question}
              </h3>
           </motion.div>

           {/* Options Grid */}
           <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer?.index === index;
                const isCorrect = isCorrectOption(index, option);
                
                let containerStyle = "border-stone-700 hover:border-stone-500 bg-stone-900/50 hover:bg-stone-800";
                let textStyle = "text-stone-300";
                let indexBadgeStyle = "bg-stone-800 text-stone-500 border-stone-600";

                if (revealAnswers) {
                   if (isCorrect) {
                      containerStyle = "border-green-600 bg-green-900/20";
                      textStyle = "text-green-400 font-bold";
                      indexBadgeStyle = "bg-green-800 text-green-100 border-green-600";
                   } else if (isSelected) {
                      containerStyle = "border-red-600 bg-red-900/20 opacity-80";
                      textStyle = "text-red-400";
                      indexBadgeStyle = "bg-red-800 text-red-100 border-red-600";
                   } else {
                      containerStyle = "border-stone-800 bg-stone-900/30 opacity-40";
                   }
                } else if (isSelected) {
                   containerStyle = "border-yellow-600 bg-yellow-900/20 shadow-[0_0_15px_rgba(202,138,4,0.1)]";
                   textStyle = "text-yellow-500 font-bold";
                   indexBadgeStyle = "bg-yellow-800 text-yellow-100 border-yellow-600";
                }

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (isSubmitted || isAdmin) return;
                      submitAnswer({ index, value: option });
                    }}
                    disabled={isSubmitted || isAdmin}
                    className={`w-full text-left p-4 rounded-sm border-2 transition-all duration-200 flex items-center gap-4 group relative overflow-hidden ${containerStyle}`}
                  >
                    {/* Index Badge (A, B, C, D) */}
                    <span className={`w-8 h-8 flex items-center justify-center rounded-sm text-sm font-bold border ${indexBadgeStyle} transition-colors`}>
                       {String.fromCharCode(65 + index)}
                    </span>

                    {/* Option Text */}
                    <span className={`flex-1 text-base md:text-lg transition-colors ${textStyle}`}>
                       {option}
                    </span>

                    {/* Reveal Icons */}
                    {revealAnswers && isCorrect && <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0 animate-bounce" />}
                    {revealAnswers && isSelected && !isCorrect && <XCircle className="text-red-500 w-6 h-6 flex-shrink-0" />}
                    
                    {/* Hover Effect Line */}
                    {!isSubmitted && !isAdmin && (
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
                    )}
                  </button>
                );
              })}
           </div>

           {/* Feedback Area */}
           <AnimatePresence>
              {isSubmitted && !isAdmin && !revealAnswers && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-sm flex items-center justify-center gap-3"
                >
                   <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
                   <span className="text-blue-300 text-sm font-bold uppercase tracking-wider">Đã ghi nhận câu trả lời - Chờ kết quả...</span>
                </motion.div>
              )}

              {revealAnswers && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8 bg-stone-900 border-t-4 border-yellow-600 p-6 shadow-xl relative"
                >
                   <div className="flex items-start gap-4">
                      <div className="p-2 bg-yellow-900/30 rounded-full text-yellow-600">
                         <HelpCircle size={24} />
                      </div>
                      <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">Giải thích</h4>
                          <p className="text-stone-300 leading-relaxed font-serif text-lg">
                             {currentQuestion.explanation || "Chưa có giải thích chi tiết cho câu hỏi này."}
                          </p>
                      </div>
                   </div>
                   
                   {!isAdmin && (
                      <div className="mt-6 text-center border-t border-stone-800 pt-4">
                          <p className="text-xs text-stone-500 uppercase tracking-widest animate-pulse">
                             Đang chờ câu hỏi tiếp theo...
                          </p>
                      </div>
                   )}
                </motion.div>
              )}
           </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default QuizTest;