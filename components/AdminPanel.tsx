import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, updateDoc, deleteDoc, onSnapshot, query, getDocs, increment } from 'firebase/firestore';
import { db } from '../../firebase';
// import Leaderboard from '../components/Leaderboard';
import Quiz from './Quiz';

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
    console.log('sessionsQuery', sessionsQuery);
    const unsubscribeSessions = onSnapshot(sessionsQuery, (snapshot) => {
      const sessionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setSessions(sessionsData);
    });

    // Subscribe to questions collection to get realtime count and data
    const questionsQuery = query(collection(db, 'questions'));
    const unsubscribeQuestions = onSnapshot(questionsQuery, (snapshot) => {
      const questionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(questionsData);
      setTotalQuestions(snapshot.size);
      console.log(`📊 Số câu hỏi hiện tại: ${snapshot.size}`);
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

  // Auto-reveal sau 20 giây (hoặc cancel nếu admin bấm sớm)
  useEffect(() => {
    if (!sessionData || sessionData.status !== 'in-progress' || !questionStartTime) {
      return;
    }

    // Nếu đã reveal rồi thì không làm gì
    if (sessionData.revealAnswers) {
      return;
    }

    const timeoutId = setTimeout(() => {
      console.log('⏰ Hết 20s - Tự động công bố đáp án');
      revealAnswersAndCalculateScores();
    }, 20000); // 20 seconds

    // Cleanup: hủy timer nếu revealAnswers thành true hoặc component unmount
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
      alert('✅ Tạo session thành công!');
    } catch (error) {
      console.error('Error creating session:', error);
      alert('❌ Lỗi khi tạo session!');
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
      alert('🚀 Quiz đã bắt đầu!');
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('❌ Lỗi khi bắt đầu quiz!');
    }
  };

  const revealAnswersAndCalculateScores = async () => {
    if (!selectedSession) return;

    try {
      // Lấy danh sách người chơi
      const playersRef = collection(db, `sessions/${selectedSession}/players`);
      const playersSnapshot = await getDocs(playersRef);
      
      // Cập nhật điểm cho từng người chơi
      const updatePromises = playersSnapshot.docs.map(async (playerDoc) => {
        const playerData = playerDoc.data();
        const answers = playerData.answers || {};
        const currentAnswer = answers[sessionData.currentQuestionIndex];
        
        if (currentAnswer && currentAnswer.score > 0) {
          // Cộng điểm vào tổng điểm
          const playerRef = doc(db, `sessions/${selectedSession}/players`, playerDoc.id);
          await updateDoc(playerRef, {
            score: increment(currentAnswer.score)
          });
        }
      });

      await Promise.all(updatePromises);

      // Bật revealAnswers để hiện đáp án cho tất cả mọi người
      await updateDoc(doc(db, 'sessions', selectedSession), {
        revealAnswers: true
      });
      
      console.log('✅ Đã công bố đáp án và cập nhật điểm!');
    } catch (error) {
      console.error('Error revealing answers:', error);
      alert('❌ Lỗi khi công bố đáp án!');
    }
  };

  const nextQuestion = async () => {
    if (!selectedSession || !sessionData) return;

    const nextIndex = sessionData.currentQuestionIndex + 1;
    
    if (nextIndex >= totalQuestions) {
      alert('⚠️ Đã hết câu hỏi!');
      return;
    }

    try {
      await updateDoc(doc(db, 'sessions', selectedSession), {
        currentQuestionIndex: nextIndex,
        revealAnswers: false  // Ẩn đáp án cho câu mới
      });
    } catch (error) {
      console.error('Error moving to next question:', error);
      alert('❌ Lỗi khi chuyển câu!');
    }
  };

  const endQuiz = async () => {
    if (!selectedSession) return;

    if (!confirm('Bạn có chắc muốn kết thúc quiz?')) return;

    try {
      await updateDoc(doc(db, 'sessions', selectedSession), {
        status: 'completed'
      });
      alert('🏁 Quiz đã kết thúc!');
    } catch (error) {
      console.error('Error ending quiz:', error);
      alert('❌ Lỗi khi kết thúc quiz!');
    }
  };

  const deleteSession = async () => {
    if (!selectedSession) return;

    if (!confirm('Bạn có chắc muốn xóa session này? Dữ liệu sẽ bị xóa vĩnh viễn!')) return;

    try {
      await deleteDoc(doc(db, 'sessions', selectedSession));
      setSelectedSession(null);
      setSessionData(null);
      alert('🗑️ Đã xóa session!');
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('❌ Lỗi khi xóa session!');
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'waiting') return '⏸️';
    if (status === 'in-progress') return '⏳';
    if (status === 'completed') return '✅';
    return '❓';
  };

  const getStatusText = (status) => {
    if (status === 'waiting') return 'Chờ';
    if (status === 'in-progress') return 'Đang chơi';
    if (status === 'completed') return 'Hoàn thành';
    return 'Không rõ';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            👨‍💼 Admin Panel
          </h1>
          <p className="text-gray-600">
            Quản lý phòng và điều khiển quiz
          </p>
        </div>

        {/* Sessions List - Horizontal at Top */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-purple-600">
              📋 Phòng
            </h2>
            
            {/* Create Session Form - Inline */}
            <form onSubmit={createSession} className="flex gap-2">
              <input
                type="text"
                value={newSessionId}
                onChange={(e) => setNewSessionId(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Nhập mã phòng"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-all disabled:bg-gray-400 whitespace-nowrap"
              >
                {loading ? '⏳' : '✅ Tạo'}
              </button>
            </form>
          </div>

          {/* Sessions List - Horizontal Scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {sessions.length === 0 ? (
              <p className="text-gray-500 text-center py-4 w-full">
                Chưa có phòng nào
              </p>
            ) : (
              sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session.id)}
                  className={`flex-shrink-0 p-4 rounded-lg border-2 transition-all min-w-[200px] ${
                    selectedSession === session.id
                      ? 'bg-purple-100 border-purple-500'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{session.id}</span>
                    <span className="text-2xl">
                      {getStatusIcon(session.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getStatusText(session.status)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Câu {session.currentQuestionIndex + 1}/{session.totalQuestions || totalQuestions}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Quiz Preview and Leaderboard - Side by Side */}
        {!selectedSession ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">☝️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Chọn phòng
            </h2>
            <p className="text-gray-600">
              Chọn phòng từ danh sách bên trên để điều khiển
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Middle Column: Session Control + Quiz Preview */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Session Info */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-purple-600">
                          {selectedSession}
                        </h2>
                        <p className="text-gray-600 text-lg">
                          {getStatusIcon(sessionData?.status)} {getStatusText(sessionData?.status)}
                        </p>
                      </div>
                      <button
                        onClick={deleteSession}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-all"
                      >
                        🗑️
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Câu hỏi hiện tại</p>
                        <p className="text-3xl font-bold text-purple-600">
                          {(sessionData?.currentQuestionIndex || 0) + 1} / {totalQuestions}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Trạng thái</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {getStatusText(sessionData?.status)}
                        </p>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {sessionData?.status === 'waiting' && (
                        <button
                          onClick={startQuiz}
                          className="bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all col-span-full"
                        >
                          🚀 Start Quiz
                        </button>
                      )}

                      {sessionData?.status === 'in-progress' && (
                        <>
                          {!sessionData?.revealAnswers ? (
                            <button
                              onClick={revealAnswersAndCalculateScores}
                              className="bg-yellow-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-all col-span-full animate-pulse"
                            >
                              👁️ Công bố đáp án và tính điểm
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={nextQuestion}
                                className="bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all md:col-span-2"
                              >
                                ➡️ Next Question
                              </button>
                              <button
                                onClick={endQuiz}
                                className="bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all"
                              >
                                🏁 End
                              </button>
                            </>
                          )}
                        </>
                      )}

                      {sessionData?.status === 'completed' && (
                        <div className="col-span-full bg-green-100 border-2 border-green-500 p-4 rounded-lg text-center">
                          <p className="text-green-700 font-bold text-lg">
                            ✅ Quiz đã hoàn thành!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quiz Preview (Admin Mode) */}
                  {sessionData?.status === 'in-progress' && questions[sessionData?.currentQuestionIndex] && (
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-purple-700">
                          📺 Live Preview 
                        </h3>
                      </div>
                      <Quiz
                        sessionId={selectedSession}
                        playerId="admin"
                        currentQuestion={questions[sessionData?.currentQuestionIndex]}
                        currentQuestionIndex={sessionData?.currentQuestionIndex}
                        isAdmin={true}
                        revealAnswers={sessionData?.revealAnswers || false}
                      />
                    </div>
                  )}

                  {sessionData?.status === 'waiting' && (
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                      <div className="text-5xl mb-3">⏸️</div>
                      <p className="text-gray-600">
                        Nhấn "Start Quiz" để bắt đầu
                      </p>
                    </div>
                  )}

                  {sessionData?.status === 'completed' && (
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                      <div className="text-5xl mb-3">🎉</div>
                      <p className="text-gray-600 text-lg">
                        Quiz đã kết thúc. Xem bảng xếp hạng bên phải.
                      </p>
                    </div>
                  )}
                </div>

            {/* Right Column: Sticky Leaderboard */}
            {/* <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6">
                <Leaderboard sessionId={selectedSession} />
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
