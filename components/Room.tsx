import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, onSnapshot, collection, query } from 'firebase/firestore';
import { db } from '../firebase';
import QuizTest from './QuizTest';
import Leaderboard from '../components/Leaderboard';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, User, Key, ArrowRight, Trophy, History, Hourglass, Swords, Star, ShieldAlert, LogOut } from 'lucide-react';

const QuizPage = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!hasJoined || !sessionId) return;

    const sessionRef = doc(db, 'sessions', sessionId);
    const unsubscribe = onSnapshot(sessionRef, (snapshot) => {
      if (snapshot.exists()) {
        setSessionData(snapshot.data());
      }
    });

    return () => unsubscribe();
  }, [hasJoined, sessionId]);

  useEffect(() => {
    if (!hasJoined) return;

    const loadQuestions = async () => {
      try {
        const q = query(collection(db, 'questions'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const questionsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setQuestions(questionsData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    loadQuestions();
  }, [hasJoined]);

  const handleJoin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      const sessionSnap = await getDoc(sessionRef);

      if (!sessionSnap.exists()) {
        setError('Chiến trường không tồn tại hoặc sai mã!');
        setLoading(false);
        return;
      }

      const newPlayerId = `player_${Date.now()}`;
      const playerRef = doc(db, `sessions/${sessionId}/players`, newPlayerId);
      
      await setDoc(playerRef, {
        id: newPlayerId,
        name: playerName,
        score: 0,
        answers: [],
        joinedAt: new Date().toISOString(),
        answeredQuestions: {}
      });

      setPlayerId(newPlayerId);
      setHasJoined(true);
      setLoading(false);
    } catch (error) {
      console.error('Error joining room:', error);
      setError('Có lỗi xảy ra khi tham gia. Vui lòng thử lại!');
      setLoading(false);
    }
  };

  if (!hasJoined) {
    return (
      <div id="room" className="min-h-screen py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black text-stone-200 relative overflow-hidden flex items-center justify-center">
        
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black/80 z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
            {/* Header Title */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-3 border-b-2 border-yellow-600/50 pb-2 mb-4">
                 <Swords className="text-red-500" size={24} />
                 <span className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-sm md:text-base">Tham gia đấu trường lịch sử</span>
                 <Swords className="text-red-500 transform scale-x-[-1]" size={24} />
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-black text-stone-100 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                Đấu Trường <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Lịch Sử</span>
              </h2>
            </motion.div> 

            {/* Join Form Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-lg mx-auto"
            >
              <div className="bg-[#1c1917] rounded-sm shadow-[0_0_50px_rgba(220,38,38,0.1)] border border-yellow-600/30 p-8 relative overflow-hidden">
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-600"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-yellow-600"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-yellow-600"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-yellow-600"></div>

                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-serif font-bold text-yellow-500 mb-2">
                    Tham gia ngay
                  </h1>
                  <p className="text-stone-400 text-sm font-serif italic">
                    "Nhập thông tin để bắt đầu"
                  </p>
                </div>

                <form onSubmit={handleJoin} className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                      <User size={14} /> Tên của bạn
                    </label>
                    <div className="relative group">
                        <input
                          type="text"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          className="w-full bg-stone-900 text-yellow-500 px-4 py-3 border border-stone-700 rounded-sm focus:border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600/50 transition-all font-serif placeholder-stone-600"
                          placeholder="Nhập tên của bạn"
                          required
                        />
                        <div className="absolute inset-0 border border-yellow-600/20 pointer-events-none group-hover:border-yellow-600/40 transition-colors"></div>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                      <Key size={14} /> Mã phòng
                    </label>
                    <div className="relative group">
                        <input
                          type="text"
                          value={sessionId}
                          onChange={(e) => setSessionId(e.target.value)}
                          className="w-full bg-stone-900 text-yellow-500 px-4 py-3 border border-stone-700 rounded-sm focus:border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600/50 transition-all font-serif placeholder-stone-600"
                          placeholder="Nhập mã phòng"
                          required
                        />
                    </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-950/40 border-l-4 border-red-600 text-red-400 px-4 py-3 text-sm flex items-center gap-2"
                    >
                      <ShieldAlert size={16} />
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-800 to-red-700 text-white py-4 font-bold text-lg uppercase tracking-widest hover:from-red-700 hover:to-red-600 transition-all transform hover:-translate-y-1 shadow-lg border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                       {loading ? 'Đang tham gia...' : 'Sẵn sàng tham gia'} 
                       {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                </form>
              </div>
            </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[sessionData?.currentQuestionIndex];
  const isWaiting = sessionData?.status === 'waiting';
  const isCompleted = sessionData?.status === 'completed';

  return (
    <div className="min-h-screen py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black text-stone-200 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header Info Bar */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-stone-900/80 border-y border-stone-700 backdrop-blur-md mb-8 sticky top-0 z-30 shadow-2xl"
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-900/50 border border-red-600 rounded-sm flex items-center justify-center text-yellow-500">
                 <User size={20} />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-100 leading-none">
                  Xin chào, {playerName}
                </h2>
                <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mt-1">
                   <span className="bg-stone-800 px-2 py-0.5 rounded-sm border border-stone-700">ID: {playerId.slice(-4)}</span>
                   <span className="text-yellow-600 font-bold tracking-wider">PHÒNG: {sessionId}</span>
                </div>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className={`px-4 py-1.5 border rounded-sm text-xs font-bold uppercase tracking-widest ${
               isWaiting ? 'bg-yellow-900/20 border-yellow-700 text-yellow-500' :
               isCompleted ? 'bg-green-900/20 border-green-700 text-green-500' :
               'bg-red-900/20 border-red-700 text-red-500 animate-pulse'
            }`}>
               {isWaiting ? 'Đang chờ' : isCompleted ? 'Đã kết thúc' : 'Đang diễn ra'}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* WAITING SCREEN */}
          {isWaiting && (
            <motion.div 
              key="waiting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-[#1c1917] rounded-sm border border-stone-700 shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
                
                <div className="mb-8">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     className="w-20 h-20 mx-auto mb-6 text-stone-600 border-4 border-stone-700 rounded-full flex items-center justify-center border-dashed"
                   >
                      <Hourglass size={32} className="text-yellow-600" />
                   </motion.div>
                   <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-200 mb-4">
                     Chờ Bắt Đầu...
                   </h2>
                   <p className="text-stone-400 font-serif italic max-w-xl mx-auto">
                     "Quân đội ta trung với Đảng, hiếu với dân, sẵn sàng chiến đấu hy sinh vì độc lập, tự do của Tổ quốc."
                   </p>
                </div>

                <div className="bg-stone-900/50 rounded-sm border border-stone-800 p-6">
                   <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-4 border-b border-stone-800 pb-2">
                      Danh Sách Người Chơi
                   </h3>
                   <Leaderboard sessionId={sessionId} />
                </div>
              </div>
            </motion.div>
          )}

          {/* COMPLETED SCREEN */}
          {isCompleted && (
            <motion.div 
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-[#1c1917] rounded-sm border border-yellow-600/50 shadow-[0_0_60px_rgba(234,179,8,0.1)] p-8 md:p-12 text-center relative">
                {/* Confetti/Stars decoration could go here */}
                <div className="mb-8">
                   <Trophy size={64} className="mx-auto text-yellow-500 mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                   <h2 className="text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-700 mb-4">
                     Quiz đã kết thúc!
                   </h2>
                   <p className="text-stone-300 text-lg mb-8 font-serif">
                     Cảm ơn bạn đã tham gia!
                   </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                   <div className="bg-stone-900 p-6 border border-stone-700">
                      <div className="flex items-center gap-2 mb-4 text-yellow-600 font-bold uppercase tracking-wider text-sm border-b border-stone-800 pb-2">
                         <Star size={16} /> Bảng Xếp Hạng
                      </div>
                      <Leaderboard sessionId={sessionId} />
                   </div>
                   
                   <div className="flex flex-col justify-center items-center bg-stone-900/50 p-6 border border-stone-800 border-dashed">
                      <p className="text-stone-500 mb-6 text-center italic">"Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam."</p>
                      <button
                        onClick={() => setHasJoined(false)}
                        className="px-8 py-3 bg-stone-800 border border-stone-600 hover:border-red-500 hover:text-red-500 text-stone-300 font-bold uppercase tracking-widest transition-all flex items-center gap-2 group"
                      >
                        <LogOut size={18} /> Trang chủ
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* IN-PROGRESS SCREEN */}
          {sessionData?.status === 'in-progress' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                {/* Quiz Container with Styling */}
                <div className="bg-[#1c1917] rounded-sm border border-stone-700 shadow-2xl overflow-hidden relative">
                   {/* Top Bar Decoration */}
                   <div className="h-1 w-full bg-gradient-to-r from-red-700 via-yellow-600 to-red-700"></div>
                   
                   <div className="p-1">
                      <QuizTest
                        sessionId={sessionId}
                        playerId={playerId}
                        currentQuestion={currentQuestion}
                        currentQuestionIndex={sessionData.currentQuestionIndex}
                        revealAnswers={sessionData.revealAnswers || false}
                      />
                   </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-stone-900/90 border border-stone-700 rounded-sm p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-700 text-yellow-500 font-bold uppercase tracking-widest text-xs">
                     <History size={16} /> Bảng Xếp Hạng
                  </div>
                  <Leaderboard sessionId={sessionId} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;