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
    <section id="hero" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-deep-dark">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Using a placeholder that looks abstract/historical */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale hover:grayscale-0 transition-all duration-[2000ms]"
          style={{ backgroundImage: 'url("https://quocphongthudo.vn/upload/2001606/fck/files/anhnhahatlon44-09_46_34_624(1).jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-red-900/40 to-slate-900"></div>
        <div className="absolute inset-0 bg-grain"></div>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <Star className="text-party-gold w-16 h-16 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)] animate-pulse" fill="currentColor" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-party-gold font-serif text-xl md:text-2xl tracking-[0.2em] mb-4 uppercase"
        >
          Lịch sử Đảng Cộng sản Việt Nam (1945-1975)
        </motion.h2>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-5xl md:text-8xl font-serif font-black text-white mb-6 text-shadow"
        >
          1954 <span className="text-party-red">-</span> 1965
          <br />
          <span className="text-4xl md:text-6xl block mt-4 text-slate-200">HAI MIỀN – MỘT Ý CHÍ</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg md:text-2xl font-light text-slate-300 italic max-w-3xl mx-auto"
        >
          "Đảng lãnh đạo – Bắc Nam chung sức – Dân tộc trường tồn"
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center cursor-pointer"
        onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-widest mb-2">Bắt đầu hành trình</span>
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default Hero;