import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCcw, Trophy, ArrowUp, Clock } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
  else if (timeSpent <= 7) timeBonus = 40;
  else if (timeSpent <= 10) timeBonus = 30;
  else if (timeSpent <= 12) timeBonus = 20;
  else if (timeSpent <= 15) timeBonus = 15;
  else if (timeSpent <= 17) timeBonus = 10;
  else if (timeSpent <= 20) timeBonus = 5;

  return baseScore + timeBonus;
};

const QuizTest: React.FC<QuizTestProps> = ({
  sessionId,
  playerId,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  isAdmin = false,
  revealAnswers = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timer, setTimer] = useState(13);
  const [earnedScore, setEarnedScore] = useState(0);

  // Reset state khi chuyển câu mới
  useEffect(() => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimeSpent(0);
    setTimer(13);
    setEarnedScore(0);
  }, [currentQuestionIndex, currentQuestion?.id]);

  // Đếm ngược thời gian cho mỗi câu
  useEffect(() => {
    if (!currentQuestion) return;
    if (timer === 0 || isAdmin) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!isSubmitted) {
            handleTimeout();
          }
          return 0;
        }
        return prev - 1;
      });

      // Chỉ ghi nhận thời gian đến lúc gửi, nhưng vẫn cho đồng hồ đếm tiếp
      if (!isSubmitted) {
        setTimeSpent((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, isAdmin, currentQuestion?.id, isSubmitted]);

  const isCorrectOption = useMemo(() => {
    if (!currentQuestion) return () => false;
    return (index: number, option: string) => {
      const { correctAnswer } = currentQuestion;
      if (typeof correctAnswer === 'number') {
        return index === correctAnswer;
      }
      return option === correctAnswer;
    };
  }, [currentQuestion]);

  const handleTimeout = async () => {
    if (isSubmitted || isAdmin || !currentQuestion) return;
    setIsSubmitted(true);

    if (!selectedAnswer) {
      const playerRef = doc(db, `sessions/${sessionId}/players/${playerId}`);
      await updateDoc(playerRef, {
        [`answeredQuestions.${currentQuestionIndex}`]: false
      });
    }
  };

  const submitAnswer = async (answer: SelectedAnswer) => {
    if (!answer || isSubmitted || isAdmin || !currentQuestion) return;

    setIsSubmitted(true);
    setSelectedAnswer(answer);

    const correct = isCorrectOption(answer.index, answer.value);
    const score = calculateScore(correct, timeSpent);
    setEarnedScore(score);

    try {
      const playerRef = doc(db, `sessions/${sessionId}/players/${playerId}`);
      await updateDoc(playerRef, {
        [`answers.${currentQuestionIndex}`]: {
          answer: answer.value,
          index: answer.index,
          isCorrect: correct,
          score,
          timeSpent
        },
        [`answeredQuestions.${currentQuestionIndex}`]: true
      });
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  if (!currentQuestion) {
    return (
      <section className="bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-party-red mx-auto mb-4" />
          <p className="text-slate-400">Đang tải câu hỏi...</p>
        </div>
      </section>
    );
  }

  const total = totalQuestions ?? currentQuestionIndex + 1;

  return (
    <section className="bg-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-700">
            <motion.div
              className="h-full bg-party-red"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / total) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="p-6 md:p-10">
            <div className="flex justify-between items-center mb-6 text-slate-400 text-sm font-semibold uppercase tracking-wide">
              <span>Câu hỏi {currentQuestionIndex + 1} / {total}</span>
              <span className="flex items-center gap-2">
                <Clock size={16} /> {timer}s
              </span>
            </div>

            <motion.h3
              key={currentQuestion.id ?? currentQuestionIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl font-serif font-bold mb-8 leading-relaxed"
            >
              {currentQuestion.question}
            </motion.h3>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer?.index === index;
                const isCorrect = isCorrectOption(index, option);
                
                let buttonStyle = "border-slate-600 hover:bg-slate-700";
                if (revealAnswers) {
                  if (isCorrect) buttonStyle = "bg-green-900/40 border-green-500 text-green-100";
                  else if (isSelected) buttonStyle = "bg-red-900/40 border-red-500 text-red-100";
                  else buttonStyle = "border-slate-700 opacity-50";
                } else if (isSelected) {
                  buttonStyle = "bg-purple-900/40 border-purple-500 text-purple-100";
                }

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (isSubmitted || isAdmin) return;
                      const answer = { index, value: option };
                      submitAnswer(answer);
                    }}
                    disabled={isSubmitted || isAdmin}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between group ${buttonStyle}`}
                  >
                    <span className="flex-1 pr-4">
                      <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </span>
                    {revealAnswers && isCorrect && <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0" />}
                    {revealAnswers && isSelected && !isCorrect && <XCircle className="text-red-500 w-6 h-6 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Thông báo chờ công bố kết quả */}
            {isSubmitted && !isAdmin && !revealAnswers && (
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50/10 to-purple-50/10 rounded-lg border-2 border-blue-200/40 text-center">
                <div className="animate-pulse text-4xl mb-3">⏳</div>
                <p className="text-lg font-bold text-blue-200 mb-2">
                  Đã gửi đáp án!
                </p>
                <p className="text-slate-300">
                  Chờ công bố kết quả...
                </p>
              </div>
            )}

            {/* Kết quả khi revealAnswers = true */}
            {revealAnswers && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 bg-slate-900/50 p-4 rounded-lg border-l-4 border-party-gold"
              >
                {/* <div className="text-center mb-4">
                  {selectedAnswer && isCorrectOption(selectedAnswer.index, selectedAnswer.value) ? (
                    <>
                      <p className="text-2xl font-bold text-green-500 mb-1">
                        ✅ Chính xác! +{earnedScore} điểm
                      </p>
                      {earnedScore > 100 && (
                        <p className="text-sm text-purple-300">
                          ⚡ Time Bonus: +{earnedScore - 100} điểm
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-2xl font-bold text-red-400">
                      {isAdmin ? 'Đáp án' : (selectedAnswer ? '❌ Chưa chính xác!' : '❌ Chưa trả lời!')}
                    </p>
                  )}
                </div> */}

                <div className="bg-slate-800/70 p-4 rounded-lg">
                  {/* <p className="text-sm text-slate-400 mb-2">Đáp án đúng:</p>
                  <p className="font-bold text-green-400 mb-3">
                    {typeof currentQuestion.correctAnswer === 'number'
                      ? `${String.fromCharCode(65 + currentQuestion.correctAnswer)}. ${currentQuestion.options[currentQuestion.correctAnswer]}`
                      : currentQuestion.correctAnswer}
                  </p>
                   */}
                  {currentQuestion.explanation && (
                    <>
                      <p className="text-sm text-slate-400 mb-2">Giải thích:</p>
                      <p className="text-slate-200">{currentQuestion.explanation}</p>
                    </>
                  )}
                </div>

                {!isAdmin && (
                  <p className="text-center text-slate-300 mt-4">
                    Đang chờ chuyển câu tiếp theo...
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>
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

export default QuizTest;
