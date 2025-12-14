import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Trophy, Medal, Crown, User, Star } from 'lucide-react';

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
      <div className="text-center py-12 border-2 border-dashed border-stone-700 rounded-sm bg-stone-900/50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-600 mx-auto mb-4"></div>
        <p className="text-stone-500 font-serif italic text-sm">Đang tải bảng xếp hạng...</p>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-12 border border-stone-700 bg-[#1c1917] rounded-sm shadow-inner">
        <User size={48} className="mx-auto text-stone-600 mb-3" />
        <p className="text-stone-400 font-serif text-lg">Chưa có người chơi nào tham gia</p>
      </div>
    );
  }

  const getRankStyle = (index) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-900/40 to-stone-900 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]'; // Gold
    if (index === 1) return 'bg-gradient-to-r from-slate-700/40 to-stone-900 border-slate-400/50'; 
    if (index === 2) return 'bg-gradient-to-r from-orange-900/40 to-stone-900 border-orange-600/50'; 
    return 'bg-stone-900 border-stone-800 hover:border-stone-600';
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Crown size={24} className="text-yellow-500 fill-yellow-500/20" />;
    if (index === 1) return <Medal size={24} className="text-slate-300" />;
    if (index === 2) return <Medal size={24} className="text-orange-600" />;
    return <span className="text-stone-500 font-bold font-mono text-lg">#{index + 1}</span>;
  };

  return (
    <div className="w-full bg-[#1c1917] rounded-sm shadow-2xl border border-stone-700 relative overflow-hidden">
      {/* Decorative Top Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-stone-800 via-yellow-700 to-stone-800"></div>
      
      <div className="p-6">
        <h2 className="text-xl md:text-2xl font-serif font-bold text-center mb-8 flex items-center justify-center gap-3 text-stone-200">
          <Trophy className="text-yellow-600" size={28} />
          <span className="uppercase tracking-widest">Bảng Xếp Hạng</span>
        </h2>
        
        <div className="space-y-3 custom-scrollbar max-h-[60vh] overflow-y-auto pr-1">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-4 rounded-sm border transition-all duration-300 group ${getRankStyle(index)}`}
            >
              <div className="flex items-center gap-4">
                {/* Rank Icon */}
                <div className="w-8 flex justify-center items-center">
                  {getRankIcon(index)}
                </div>
                
                {/* Player Info */}
                <div>
                  <div className="flex items-center gap-2">
                     <p className={`font-bold font-serif text-lg ${index === 0 ? 'text-yellow-500' : 'text-stone-200'}`}>
                        {player.name}
                     </p>
                     {index === 0 && <Star size={12} className="text-yellow-500 animate-pulse fill-current" />}
                  </div>
                  <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">
                    ID: {player.id.slice(-6)}
                  </p>
                </div>
              </div>
              
              {/* Score */}
              <div className="text-right">
                <p className={`text-2xl font-bold font-mono ${index === 0 ? 'text-yellow-500' : 'text-stone-300'}`}>
                  {player.score}
                </p>
                <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">điểm</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Bottom Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-800 opacity-50 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#000_5px,#000_10px)]"></div>
    </div>
  );
};

export default Leaderboard;