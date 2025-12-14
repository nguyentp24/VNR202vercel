import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingIntroProps {
  onComplete: () => void;
}

const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'text1' | 'text2' | 'flag' | 'exit'>('text1');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('text2'), 1500),
      setTimeout(() => setPhase('flag'), 3000),
      setTimeout(() => setPhase('exit'), 4500),
      setTimeout(() => onComplete(), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        className="fixed inset-0 z-[100] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          transition: { duration: 0.8, ease: 'easeInOut' }
        }}
        animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(transparent_0%,_black_100%)] opacity-80 z-0" />

        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-t from-red-500 to-yellow-400 rounded-full blur-[1px]"
              style={{
                left: `${Math.random() * 100}%`,
                top: '110%',
              }}
              animate={{
                y: [0, -1000], 
                x: [0, (Math.random() - 0.5) * 100], 
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5, 
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Text Phase 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: phase === 'text1' || phase === 'text2' ? 1 : 0,
              scale: phase === 'text1' || phase === 'text2' ? 1 : 0.95,
              y: phase === 'text1' || phase === 'text2' ? 0 : -20 
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <motion.p
              className="text-2xl md:text-4xl lg:text-6xl font-serif text-stone-100 leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-yellow-500 drop-shadow-md text-4xl md:text-6xl lg:text-7xl">"</span>
              <span className="italic">Lịch sử không chỉ để nhớ</span>
              <span className="text-yellow-500 drop-shadow-md text-4xl md:text-6xl lg:text-7xl">"</span>
            </motion.p>
          </motion.div>

          {/* Text Phase 2 */}
          <AnimatePresence>
            {(phase === 'text2' || phase === 'flag') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mb-12"
              >
                <p className="text-xl md:text-3xl lg:text-4xl font-serif text-stone-300 leading-relaxed tracking-wide">
                  mà để <span className="text-red-500 font-bold drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] uppercase">tự hào</span> – để <span className="text-yellow-500 font-bold drop-shadow-[0_0_15px_rgba(234,179,8,0.6)] uppercase">tiếp bước</span>…
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flag Animation */}
          <AnimatePresence>
            {(phase === 'flag' || phase === 'exit') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, y: -50 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative mx-auto"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-600/20 blur-[60px] rounded-full animate-pulse" />

                {/* Flag Container with Wave Effect */}
                <div className="relative w-48 h-32 md:w-64 md:h-44 mx-auto perspective-1000 z-10">
                  {/* Flag Pole */}
                  <motion.div
                    className="absolute left-0 top-0 w-2 h-[120%] -top-[10%] bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-900 rounded-sm shadow-2xl"
                    initial={{ height: 0 }}
                    animate={{ height: '120%' }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Flag with waving animation */}
                  <motion.div
                    className="absolute left-2 top-0 w-[calc(100%-8px)] h-[85%] origin-left overflow-hidden shadow-2xl"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.div
                      className="w-full h-full bg-[#da251d] relative" 
                      animate={{
                        skewY: [0, 2, -2, 1, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
                      }}
                    >
                      {/* Wave overlay effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      
                      {/* Star */}
                      <motion.svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full p-4 md:p-6"
                        initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                      >
                        <motion.path
                          d="M50 10 L61 40 L95 40 L68 60 L79 90 L50 72 L21 90 L32 60 L5 40 L39 40 Z"
                          fill="#ffff00"
                          animate={{
                            filter: ['drop-shadow(0 0 5px #d97706)', 'drop-shadow(0 0 15px #f59e0b)', 'drop-shadow(0 0 5px #d97706)'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      </motion.svg>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Subtitle under flag */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="mt-10 flex flex-col items-center"
                >
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent mb-2" />
                    <p className="text-sm md:text-lg font-serif text-yellow-500/90 tracking-[0.2em] uppercase font-semibold drop-shadow-sm">
                    Sự Lãnh Đạo Của Đảng 1954 – 1965
                    </p>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent mt-2" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading Progress Bar */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 md:w-64 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-[2px] bg-stone-800 w-full relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-yellow-500 shadow-[0_0_10px_#eab308]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4.5, ease: 'easeInOut' }}
            />
          </div>
          <motion.p
            className="text-center text-[10px] uppercase tracking-[0.3em] text-stone-500 mt-3 font-serif"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Đang tải dữ liệu lịch sử...
          </motion.p>
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-6 left-6 w-24 h-24 border-l-4 border-t-4 border-double border-yellow-800/40 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-6 right-6 w-24 h-24 border-r-4 border-t-4 border-double border-yellow-800/40 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-24 h-24 border-l-4 border-b-4 border-double border-yellow-800/40 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-24 h-24 border-r-4 border-b-4 border-double border-yellow-800/40 rounded-br-sm pointer-events-none" />
        
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingIntro;