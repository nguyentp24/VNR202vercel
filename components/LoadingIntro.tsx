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
        className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          transition: { duration: 0.8, ease: 'easeInOut' }
        }}
        animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
      >
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-party-gold/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          {/* Text Phase 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: phase === 'text1' || phase === 'text2' ? 1 : 0,
              y: phase === 'text1' || phase === 'text2' ? 0 : -20 
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <motion.p
              className="text-2xl md:text-4xl lg:text-5xl font-serif text-white leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-party-gold">"</span>
              Lịch sử không chỉ để nhớ
              <span className="text-party-gold">"</span>
            </motion.p>
          </motion.div>

          {/* Text Phase 2 */}
          <AnimatePresence>
            {(phase === 'text2' || phase === 'flag') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mb-12"
              >
                <p className="text-xl md:text-3xl lg:text-4xl font-serif text-slate-300 leading-relaxed">
                  mà để <span className="text-party-red font-bold">tự hào</span> – để <span className="text-party-gold font-bold">tiếp bước</span>…
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flag Animation */}
          <AnimatePresence>
            {(phase === 'flag' || phase === 'exit') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5, y: -100 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative mx-auto"
              >
                {/* Flag Container with Wave Effect */}
                <div className="relative w-48 h-32 md:w-64 md:h-44 mx-auto perspective-1000">
                  {/* Flag Pole */}
                  <motion.div
                    className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700 rounded-full shadow-lg"
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Flag with waving animation */}
                  <motion.div
                    className="absolute left-1.5 top-0 w-[calc(100%-6px)] h-[85%] origin-left overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.div
                      className="w-full h-full bg-party-red relative"
                      animate={{
                        skewY: [0, 1, -1, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        boxShadow: '4px 4px 20px rgba(220, 38, 38, 0.4)',
                      }}
                    >
                      {/* Wave overlay effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      
                      {/* Star */}
                      <motion.svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full p-4 md:p-6"
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        <motion.path
                          d="M50 10 L61 40 L95 40 L68 60 L79 90 L50 72 L21 90 L32 60 L5 40 L39 40 Z"
                          fill="#fbbf24"
                          animate={{
                            filter: ['drop-shadow(0 0 8px #fbbf24)', 'drop-shadow(0 0 15px #fbbf24)', 'drop-shadow(0 0 8px #fbbf24)'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />
                      </motion.svg>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Subtitle under flag */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="mt-8 text-sm md:text-base text-slate-400 tracking-widest uppercase"
                >
                  Sự Lãnh Đạo Của Đảng 1954 – 1965
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading Progress Bar */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 md:w-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-party-red via-party-gold to-party-red"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4.5, ease: 'easeInOut' }}
            />
          </div>
          <motion.p
            className="text-center text-xs text-slate-500 mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Đang tải...
          </motion.p>
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-party-gold/30 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-party-gold/30 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-party-gold/30 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-party-gold/30 rounded-br-lg" />
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingIntro;
