import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      id="hero" 
      ref={ref} 
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] opacity-30 mix-blend-luminosity"
          style={{ 
            backgroundImage: 'url("https://quocphongthudo.vn/upload/2001606/fck/files/anhnhahatlon44-09_46_34_624(1).jpg")',
            filter: 'sepia(40%) contrast(120%)' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-red-950/20 to-black/90"></div>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-1 h-1 bg-yellow-500/40 rounded-full blur-[1px]"
               style={{ left: `${Math.random() * 100}%`, top: '100%' }}
               animate={{ y: [0, -1000], opacity: [0, 0.6, 0] }}
               transition={{ duration: 7 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
             />
          ))}
        </div>
      </div>

      {/* CẤU TRÚC LAYOUT */}
      <div className="h-24 w-full shrink-0" />

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="flex-1 flex flex-col justify-center items-center text-center px-4 relative z-20 w-full"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex justify-center items-center mb-6 relative"
        >
          <div className="absolute w-20 h-20 bg-yellow-600/30 blur-xl rounded-full" />
          <Star 
            className="text-yellow-500 w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] relative z-10" 
            fill="url(#star-gradient)" 
            strokeWidth={0}
          />
          <svg width="0" height="0" className="absolute">
            <linearGradient id="star-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </svg>
        </motion.div>

        {/* Top Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-yellow-500/90 font-serif text-sm md:text-lg tracking-[0.3em] mb-4 uppercase border-b border-yellow-500/30 inline-block pb-2"
        >
          Lịch sử Đảng Cộng sản Việt Nam (1945-1975)
        </motion.h2>

        {/* Main Title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-serif font-black mb-6"
        >
          <div className="text-6xl md:text-8xl lg:text-9xl text-stone-100 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] leading-none tracking-tight flex justify-center items-center gap-6">
            <span>1954</span>
            <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] pb-2 block">-</span>
            <span>1965</span>
          </div>
          
          <span className="block mt-4 text-2xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-stone-200 to-stone-500 font-bold tracking-widest uppercase filter drop-shadow-lg leading-relaxed py-4">
            Hai Miền – Một Ý Chí
          </span>
        </motion.h1>

        {/* Quote */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.p className="text-lg md:text-2xl font-serif font-light text-stone-300 italic max-w-3xl mx-auto leading-relaxed border-l-2 border-red-800/50 pl-6">
            "Đảng lãnh đạo – Bắc Nam chung sức – Dân tộc trường tồn"
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="w-full relative z-30 flex flex-col items-center justify-center pt-10 pb-12 cursor-pointer hover:text-yellow-500 transition-colors group"
        onClick={() => document.getElementById('knowledge')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] md:text-xs font-serif uppercase tracking-[0.2em] mb-2 text-stone-400 group-hover:text-yellow-500 transition-colors">
          Bắt đầu hành trình
        </span>
        <div className="p-2 border border-stone-600 rounded-full bg-black/40 backdrop-blur-sm group-hover:border-yellow-500 transition-colors">
          <ChevronDown className="w-5 h-5 text-white group-hover:text-yellow-500" />
        </div>
      </motion.div>
      
      {/* Decorative Corners */}
      <div className="absolute top-24 left-4 w-32 h-32 border-l border-t border-yellow-800/30 rounded-tl-3xl pointer-events-none z-20" />
      <div className="absolute top-24 right-4 w-32 h-32 border-r border-t border-yellow-800/30 rounded-tr-3xl pointer-events-none z-20" />
      <div className="absolute bottom-4 left-4 w-32 h-32 border-l border-b border-yellow-800/30 rounded-bl-3xl pointer-events-none z-20" />
      <div className="absolute bottom-4 right-4 w-32 h-32 border-r border-b border-yellow-800/30 rounded-br-3xl pointer-events-none z-20" />

    </section>
  );
};

export default Hero;