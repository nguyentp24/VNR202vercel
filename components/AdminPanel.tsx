import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, query, getDocs, increment } from 'firebase/firestore';
import { db } from '../firebase';
import QuizTest from './QuizTest';
import Leaderboard from './Leaderboard';
import { 
  Users, Play, CheckSquare, Square, Trash2, Plus, 
  Settings, MonitorPlay, Eye, BarChart3, AlertTriangle, 
  Trophy, RotateCcw, SkipForward, StopCircle
} from 'lucide-react';

const AdminPanel = () => {
  const [sessions, setSessions] = useState([]);
  const [newSessionId, setNewSessionId] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(null);

  useEffect(() => {
    // Subscribe to all sessions
    const sessionsQuery = query(collection(db, 'sessions'));
    const unsubscribeSessions = onSnapshot(sessionsQuery, (snapshot) => {
      const sessionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setSessions(sessionsData);
    });

    // Subscribe to questions collection
    const questionsQuery = query(collection(db, 'questions'));
    const unsubscribeQuestions = onSnapshot(questionsQuery, (snapshot) => {
      const questionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(questionsData);
      setTotalQuestions(snapshot.size);
    });

    return () => {
      unsubscribeSessions();
      unsubscribeQuestions();
    };
  }, []);

  useEffect(() => {
    if (!selectedSession) return;

    // Subscribe to selected session
    const sessionRef = doc(db, 'sessions', selectedSession);
    const unsubscribe = onSnapshot(sessionRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setSessionData(data);
        
        // Reset timer khi chuyển câu mới
        if (data.status === 'in-progress' && !data.revealAnswers) {
          setQuestionStartTime(Date.now());
        }
      }
    });

    return () => unsubscribe();
  }, [selectedSession]);

  // Auto-reveal sau 20 giây
  useEffect(() => {
    if (!sessionData || sessionData.status !== 'in-progress' || !questionStartTime) {
      return;
    }

    if (sessionData.revealAnswers) {
      return;
    }

    const timeoutId = setTimeout(() => {
      console.log('Hết 20s - Tự động công bố đáp án');
      revealAnswersAndCalculateScores();
    }, 20000); 

    return () => {
      clearTimeout(timeoutId);
    };
  }, [questionStartTime, sessionData?.revealAnswers, sessionData?.status]);

  const createSession = async (e) => {
    e.preventDefault();
    if (!newSessionId.trim()) return;

    setLoading(true);
    try {
      await setDoc(doc(db, 'sessions', newSessionId), {
        status: 'waiting',
        currentQuestionIndex: 0,
        createdAt: new Date().toISOString(),
        totalQuestions: totalQuestions,
        revealAnswers: false
      });

      setNewSessionId('');
      alert('Tạo session thành công!');
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Lỗi khi tạo session!');
    }
    setLoading(false);
  };

  const startQuiz = async () => {
    if (!selectedSession) return;

    try {
      await updateDoc(doc(db, 'sessions', selectedSession), {
        status: 'in-progress',
        currentQuestionIndex: 0,
        revealAnswers: false
      });
      alert('Quiz đã bắt đầu!');
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Lỗi khi bắt đầu quiz!');
    }
  };

  const revealAnswersAndCalculateScores = async () => {
    if (!selectedSession) return;

    try {
      const playersRef = collection(db, `sessions/${selectedSession}/players`);
      const playersSnapshot = await getDocs(playersRef);
      
      const updatePromises = playersSnapshot.docs.map(async (playerDoc) => {
        const playerData = playerDoc.data();
        const answers = playerData.answers || {};
        const currentAnswer = answers[sessionData.currentQuestionIndex];
        
        if (currentAnswer && currentAnswer.score > 0) {
          const playerRef = doc(db, `sessions/${selectedSession}/players`, playerDoc.id);
          await updateDoc(playerRef, {
            score: increment(currentAnswer.score)
          });
        }
      });

      await Promise.all(updatePromises);

      await updateDoc(doc(db, 'sessions', selectedSession), {
        revealAnswers: true
      });
      
      console.log('Đã công bố đáp án và cập nhật điểm!');
    } catch (error) {
      console.error('Error revealing answers:', error);
      alert('Lỗi khi công bố đáp án!');
    }
  };

  const nextQuestion = async () => {
    if (!selectedSession || !sessionData) return;

    const nextIndex = sessionData.currentQuestionIndex + 1;
    
    if (nextIndex >= totalQuestions) {
      alert('Đã hết câu hỏi!');
      return;
    }

    try {
      await updateDoc(doc(db, 'sessions', selectedSession), {
        currentQuestionIndex: nextIndex,
        revealAnswers: false 
      });
    } catch (error) {
      console.error('Error moving to next question:', error);
      alert('Lỗi khi chuyển câu!');
    }
  };

  const endQuiz = async () => {
    if (!selectedSession) return;

    if (!confirm('Bạn có chắc muốn kết thúc quiz?')) return;

    try {
      await updateDoc(doc(db, 'sessions', selectedSession), {
        status: 'completed'
      });
      alert('Quiz đã kết thúc!');
    } catch (error) {
      console.error('Error ending quiz:', error);
      alert('Lỗi khi kết thúc quiz!');
    }
  };

  const deleteSession = async () => {
    if (!selectedSession) return;

    if (!confirm('Bạn có chắc muốn xóa session này? Dữ liệu sẽ bị xóa vĩnh viễn!')) return;

    try {
      await deleteDoc(doc(db, 'sessions', selectedSession));
      setSelectedSession(null);
      setSessionData(null);
      alert('Đã xóa session!');
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('Lỗi khi xóa session!');
    }
  };

  const getStatusInfo = (status) => {
    if (status === 'waiting') return { icon: <Square size={16} />, text: 'Chờ', color: 'text-yellow-500', bg: 'bg-yellow-900/20', border: 'border-yellow-700' };
    if (status === 'in-progress') return { icon: <Play size={16} />, text: 'Đang chơi', color: 'text-red-500', bg: 'bg-red-900/20', border: 'border-red-700' };
    if (status === 'completed') return { icon: <CheckSquare size={16} />, text: 'Hoàn thành', color: 'text-green-500', bg: 'bg-green-900/20', border: 'border-green-700' };
    return { icon: <AlertTriangle size={16} />, text: 'Không rõ', color: 'text-stone-500', bg: 'bg-stone-800', border: 'border-stone-600' };
  };

  // --- PHẦN GIAO DIỆN ---
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black text-stone-200 relative overflow-hidden pt-24 pb-12">
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="bg-[#1c1917] rounded-sm shadow-2xl border border-stone-700 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-600 to-red-700"></div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-black text-stone-100 flex items-center gap-3">
              <Settings className="text-yellow-600" />
              Quản Trị Viên
            </h1>
            <p className="text-stone-400 font-serif italic mt-1">
              "Quản lý phòng và điều khiển quiz"
            </p>
          </div>
          
          {/* Create Session Form */}
          <form onSubmit={createSession} className="flex w-full md:w-auto bg-stone-900 p-1.5 rounded-sm border border-stone-700">
            <input
              type="text"
              value={newSessionId}
              onChange={(e) => setNewSessionId(e.target.value)}
              className="bg-transparent px-4 py-2 text-stone-200 placeholder-stone-600 outline-none w-full md:w-48 font-mono text-sm"
              placeholder="Nhập mã phòng"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-stone-800 hover:bg-yellow-700 text-yellow-500 hover:text-white px-4 py-2 rounded-sm font-bold uppercase tracking-wider text-xs transition-all flex items-center gap-2 border border-stone-600 hover:border-yellow-500 whitespace-nowrap"
            >
              {loading ? <RotateCcw className="animate-spin" size={14} /> : <Plus size={14} />}
              Tạo
            </button>
          </form>
        </div>

        {/* Sessions List */}
        <div className="bg-[#1c1917]/80 backdrop-blur-md rounded-sm border border-stone-700 p-6 mb-8">
          <h2 className="text-sm font-bold text-stone-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Users size={16} /> Phòng
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {sessions.length === 0 ? (
              <div className="w-full text-center py-8 border-2 border-dashed border-stone-800 rounded-sm">
                <p className="text-stone-600 italic">Chưa có phòng nào</p>
              </div>
            ) : (
              sessions.map((session) => {
                const status = getStatusInfo(session.status);
                return (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSession(session.id)}
                    className={`flex-shrink-0 p-4 rounded-sm border-2 transition-all min-w-[220px] text-left group relative overflow-hidden ${
                      selectedSession === session.id
                        ? 'bg-stone-800 border-yellow-600 shadow-[0_0_15px_rgba(202,  8,4,0.2)]'
                        : 'bg-stone-900/50 border-stone-800 hover:border-stone-600 hover:bg-stone-800'
                    }`}
                  >
                    {selectedSession === session.id && (
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-r-[10px] border-t-transparent border-r-yellow-500"></div>
                    )}
                    <div className="flex justify-between items-start mb-3">
                      <span className={`font-mono font-bold text-lg ${selectedSession === session.id ? 'text-yellow-500' : 'text-stone-300'}`}>
                        {session.id}
                      </span>
                      <div className={`p-1.5 rounded-full ${status.bg} ${status.color}`}>
                        {status.icon}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
                      <span className={status.color}>{status.text}</span>
                    </div>
                    <div className="w-full bg-stone-950 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full ${selectedSession === session.id ? 'bg-yellow-600' : 'bg-stone-600'}`} 
                          style={{ width: `${((session.currentQuestionIndex + 1) / (session.totalQuestions || totalQuestions)) * 100}%` }}
                        />
                    </div>
                    <p className="text-[10px] text-stone-500 mt-1 text-right font-mono">
                      Câu {session.currentQuestionIndex + 1}/{session.totalQuestions || totalQuestions}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Main Dashboard Area */}
        {!selectedSession ? (
          <div className="bg-[#1c1917] rounded-sm border border-stone-700 p-12 text-center shadow-inner bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5">
            <MonitorPlay size={64} className="mx-auto text-stone-700 mb-6" />
            <h2 className="text-2xl font-serif font-bold text-stone-300 mb-2">Chọn Phòng</h2>
            <p className="text-stone-400">Chọn phòng từ danh sách bên trên để điều khiển</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: Controls & Preview */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Control Panel */}
              <div className="bg-[#1c1917] rounded-sm border border-stone-700 p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-800 via-stone-600 to-stone-800"></div>
                
                <div className="flex justify-between items-center mb-6 border-b border-stone-800 pb-4">
                  <div>
                    <h2 className="text-2xl font-serif font-black text-yellow-600 uppercase tracking-wide">
                      {selectedSession}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 rounded-full ${getStatusInfo(sessionData?.status).bg.replace('/20', '')}`}></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                          {getStatusInfo(sessionData?.status).text}
                        </span>
                    </div>
                  </div>
                  <button
                    onClick={deleteSession}
                    className="p-2 text-stone-600 hover:text-red-500 hover:bg-red-950/30 rounded-sm transition-colors border border-transparent hover:border-red-900"
                    title="Xóa session"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-stone-900/50 p-4 border border-stone-800 rounded-sm">
                    <p className="text-xs text-stone-500 uppercase tracking-widest font-bold mb-1">Câu hỏi hiện tại</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-mono font-bold text-stone-200 leading-none">
                          {(sessionData?.currentQuestionIndex || 0) + 1}
                        </span>
                        <span className="text-sm text-stone-600 font-mono mb-1">/ {totalQuestions}</span>
                    </div>
                  </div>
                  <div className="bg-stone-900/50 p-4 border border-stone-800 rounded-sm">
                    <p className="text-xs text-stone-500 uppercase tracking-widest font-bold mb-1">Trạng thái</p>
                    <div className="flex items-center gap-2 text-stone-300 font-bold">
                        {getStatusInfo(sessionData?.status).icon}
                        <span>{getStatusInfo(sessionData?.status).text}</span>
                    </div>
                  </div>
                </div>

                {/* Command Buttons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sessionData?.status === 'waiting' && (
                    <button
                      onClick={startQuiz}
                      className="col-span-full py-4 bg-green-800 hover:bg-green-700 text-white font-bold uppercase tracking-[0.2em] rounded-sm border border-green-600 shadow-[0_0_20px_rgba(22,163,74,0.3)] transition-all flex items-center justify-center gap-3 group"
                    >
                      <Play size={20} className="group-hover:scale-110 transition-transform" /> 
                      Start Quiz
                    </button>
                  )}

                  {sessionData?.status === 'in-progress' && (
                    <>
                      {!sessionData?.revealAnswers ? (
                        <button
                          onClick={revealAnswersAndCalculateScores}
                          className="col-span-full py-5 bg-yellow-700 hover:bg-yellow-600 text-white font-bold uppercase tracking-[0.1em] rounded-sm border border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all flex items-center justify-center gap-3 animate-pulse"
                        >
                          <Eye size={20} />Công bố đáp án và tính điểm
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={nextQuestion}
                            className="py-4 bg-blue-800 hover:bg-blue-700 text-white font-bold uppercase tracking-widest rounded-sm border border-blue-600 transition-all flex items-center justify-center gap-2"
                          >
                            <SkipForward size={18} />Next Question
                          </button>
                          <button
                            onClick={endQuiz}
                            className="py-4 bg-red-900 hover:bg-red-800 text-white font-bold uppercase tracking-widest rounded-sm border border-red-700 transition-all flex items-center justify-center gap-2"
                          >
                            <StopCircle size={18} />End
                          </button>
                        </>
                      )}
                    </>
                  )}

                  {sessionData?.status === 'completed' && (
                    <div className="col-span-full bg-green-900/20 border border-green-800 p-4 rounded-sm text-center">
                      <p className="text-green-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <CheckSquare size={18} />Quiz đã hoàn thành!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Live Preview Monitor */}
              {sessionData?.status === 'in-progress' && questions[sessionData?.currentQuestionIndex] && (
                <div className="bg-[#151515] rounded-sm border-2 border-stone-800 p-1 shadow-2xl">
                  <div className="bg-black/50 px-4 py-2 flex justify-between items-center border-b border-stone-800 mb-1">
                      <span className="text-xs font-mono text-green-500 uppercase flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> Live Preview
                      </span>
                      <MonitorPlay size={14} className="text-stone-600" />
                  </div>
                  <div className="p-4">
                    <QuizTest
                      key={`preview-${sessionData?.currentQuestionIndex}`}
                      sessionId={selectedSession}
                      playerId="admin"
                      currentQuestion={questions[sessionData?.currentQuestionIndex]}
                      currentQuestionIndex={sessionData?.currentQuestionIndex}
                      isAdmin={true}
                      revealAnswers={sessionData?.revealAnswers || false}
                    />
                  </div>
                </div>
              )}

              {sessionData?.status === 'waiting' && (
                <div className="bg-[#1c1917] border border-stone-800 border-dashed rounded-sm p-8 text-center">
                    <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-700">
                      <Users size={32} className="text-stone-500" />
                    </div>
                    <p className="text-stone-400 font-serif italic">Nhấn "Start Quiz" để bắt đầu</p>
                </div>
              )}
            </div>

            {/* RIGHT: Sticky Leaderboard */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8 bg-[#1c1917] rounded-sm border border-stone-700 shadow-xl overflow-hidden">
                <div className="bg-stone-900 p-4 border-b border-stone-700 flex items-center justify-between">
                    <h3 className="font-bold text-yellow-600 uppercase tracking-widest text-xs flex items-center gap-2">
                      <Trophy size={14} />Bảng Xếp Hạng
                    </h3>
                    <BarChart3 size={14} className="text-stone-600" />
                </div>
                <div className="p-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <Leaderboard sessionId={selectedSession} />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;