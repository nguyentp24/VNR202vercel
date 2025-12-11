import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const Leaderboard = ({ sessionId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, `sessions/${sessionId}/players`),
      orderBy('score', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const playersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPlayers(playersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang tải bảng xếp hạng...</p>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Chưa có người chơi nào 👥</p>
      </div>
    );
  }

  const getMedal = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div className=" w-full bg-slate-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
        🏆 Bảng Xếp Hạng
      </h2>
      
      <div className="space-y-3 text-black">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`flex items-center justify-between p-4 rounded-lg transition-all ${
              index < 3
                ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold w-12 text-center">
                {getMedal(index)}
              </span>
              <div>
                <p className="font-bold text-lg">{player.name}</p>
                <p className="text-sm text-gray-600">
                  ID: {player.id.slice(-8)}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">
                {player.score}
              </p>
              <p className="text-sm text-gray-500">điểm</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
