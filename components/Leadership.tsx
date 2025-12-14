import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEADERSHIP_POINTS } from '../constants';
import { Book, Users, Swords, Flame, Flag, X, Quote, Lightbulb, History, Star, Compass, ArrowRight } from 'lucide-react';

const iconMap = {
  Book, Users, Swords, Flame, Flag
};

const cardColors = [
  { 
     bg: 'from-red-900 to-red-950',
     light: 'bg-red-950/30', 
     border: 'border-red-800/50',
     text: 'text-red-500',
     iconBg: 'from-red-800 to-red-900'
  },
  { 
     bg: 'from-yellow-700 to-yellow-900',
     light: 'bg-yellow-900/20', 
     border: 'border-yellow-700/50',
     text: 'text-yellow-500',
     iconBg: 'from-yellow-700 to-yellow-800'
  },
  { 
     bg: 'from-stone-600 to-stone-800',
     light: 'bg-stone-800/40', 
     border: 'border-stone-600/50',
     text: 'text-stone-400',
     iconBg: 'from-stone-600 to-stone-700'
  },
  { 
     bg: 'from-orange-800 to-red-900',
     light: 'bg-orange-900/20', 
     border: 'border-orange-800/50',
     text: 'text-orange-500',
     iconBg: 'from-orange-800 to-orange-900'
  },
  { 
     bg: 'from-slate-700 to-slate-900',
     light: 'bg-slate-800/40', 
     border: 'border-slate-600/50',
     text: 'text-slate-400',
     iconBg: 'from-slate-700 to-slate-800'
  },
];

const Leadership: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="leadership" className="py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black text-stone-200 relative overflow-hidden min-h-screen">
      
      {/* Background decoration: Noise & Stars */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-yellow-600"><Star size={40} fill="currentColor" /></div>
        <div className="absolute bottom-32 left-40 text-yellow-600"><Star size={32} fill="currentColor" /></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-yellow-600/30 px-6 py-2 rounded-sm text-xs font-serif font-bold mb-6 text-yellow-500 uppercase tracking-[0.2em] shadow-lg">
            <Compass size={16} />
            Vai trò lãnh đạo của Đảng
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 drop-shadow-2xl">
            <span className="text-stone-100">Kim Chỉ Nam</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-700">Cho Cách Mạng</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-800" />
            <Star className="text-yellow-500" size={20} fill="currentColor" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-800" />
          </div>
          <p className="text-stone-400 max-w-2xl mx-auto mt-6 font-serif italic">
            Những quan điểm và đường lối lãnh đạo sáng suốt của Đảng trong giai đoạn 1954-1965
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {LEADERSHIP_POINTS.map((point, index) => {
            const Icon = iconMap[point.icon];
            const colors = cardColors[index % cardColors.length];
            const isHovered = hoveredId === point.id;

            return (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(point.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveId(point.id)}
                className="group cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`relative h-full bg-stone-900/80 backdrop-blur-sm rounded-sm border ${colors.border} overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-yellow-600/50`}
                >
                  {/* Top gradient bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${colors.bg}`} />
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Icon Box */}
                    <motion.div 
                      animate={{ rotate: isHovered ? 360 : 0 }}
                      transition={{ duration: 0.7, ease: "circOut" }}
                      className={`w-14 h-14 rounded-sm bg-gradient-to-br ${colors.iconBg} flex items-center justify-center mb-5 shadow-inner border border-white/10`}
                    >
                      <Icon size={28} className="text-stone-100" />
                    </motion.div>

                    {/* Number badge (Absolute Top Right) */}
                    <div className="absolute top-6 right-6 w-10 h-10 border border-stone-700 bg-stone-950 flex items-center justify-center text-stone-500 font-serif font-bold text-lg group-hover:text-yellow-500 group-hover:border-yellow-600 transition-colors">
                      {String(point.id).padStart(2, '0')}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-serif text-stone-100 mb-4 group-hover:text-yellow-500 transition-colors leading-snug min-h-[3.5rem]">
                      {point.title}
                    </h3>

                    {/* Quote Preview Box */}
                    <div className={`${colors.light} rounded-sm p-4 mb-5 border-l-2 ${colors.border} group-hover:border-yellow-500 transition-colors`}>
                      <p className="text-sm italic font-serif text-stone-300 line-clamp-2">
                        "{point.quote}"
                      </p>
                    </div>

                    {/* Content preview */}
                    <p className="text-stone-400 text-sm line-clamp-2 mb-6 font-serif">
                      {point.content}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                      <span className="text-xs text-stone-500 uppercase tracking-widest font-bold group-hover:text-yellow-600 transition-colors">
                        Xem chi tiết
                      </span>
                      <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        className={`w-8 h-8 rounded-full border border-stone-600 flex items-center justify-center group-hover:border-yellow-500 group-hover:bg-yellow-900/20`}
                      >
                        <ArrowRight size={14} className="text-stone-400 group-hover:text-yellow-500" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover texture effect */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
           <div className="inline-block px-8 py-3 bg-stone-900/50 border border-stone-800 rounded-sm">
            <p className="text-stone-400 italic font-serif text-sm md:text-base">
              "Đảng lãnh đạo là nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam"
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeId && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setActiveId(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-hidden bg-[#1c1917] border border-stone-600 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col"
            >
              {(() => {
                const point = LEADERSHIP_POINTS.find(p => p.id === activeId);
                if (!point) return null;
                const Icon = iconMap[point.icon];
                const colors = cardColors[(point.id - 1) % cardColors.length];

                return (
                  <div className="flex flex-col flex-1 min-h-0">
                    {/* Modal Header */}
                    <div className={`relative bg-stone-900 p-8 border-b border-stone-700 overflow-hidden`}>
                      {/* Gradient Line Top */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.bg}`} />
                      
                      {/* Close button */}
                      <button
                        onClick={() => setActiveId(null)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 border border-stone-600 flex items-center justify-center text-stone-400 hover:text-white hover:border-white hover:bg-red-900 transition-all z-20"
                      >
                        <X size={20} />
                      </button>

                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                        <div className={`w-20 h-20 rounded-sm bg-gradient-to-br ${colors.iconBg} flex items-center justify-center border-2 border-stone-700 shadow-xl`}>
                          <Icon size={40} className="text-stone-100" />
                        </div>
                        <div>
                          <span className={`${colors.text} text-xs font-bold uppercase tracking-[0.2em]`}>
                             Văn kiện số {String(point.id).padStart(2, '0')}
                          </span>
                          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-100 mt-2 leading-tight">
                            {point.title}
                          </h2>
                        </div>
                      </div>
                      
                      {/* Background Texture for Header */}
                      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    </div>

                    {/* Modal Body */}
                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[#1c1917]">
                      {/* Quote */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-stone-900/50 border-l-4 border-yellow-600 p-6 mb-8"
                      >
                        <div className="flex items-start gap-4">
                          <Quote className="text-yellow-700 flex-shrink-0 mt-1 opacity-50" size={32} />
                          <div>
                            <p className="text-lg md:text-xl italic font-serif text-stone-300 leading-relaxed">
                              "{point.quote}"
                            </p>
                            <div className="h-px w-20 bg-stone-700 mt-4 mb-2" />
                            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">— Trích Văn kiện Đảng</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Content Section */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                      >
                        <div className="flex items-center gap-3 mb-4 border-b border-stone-800 pb-2">
                          <Lightbulb size={20} className={`${colors.text}`} />
                          <h4 className="text-sm uppercase tracking-widest text-stone-400 font-bold">Nội dung cốt lõi</h4>
                        </div>
                        <p className="text-lg text-stone-300 leading-relaxed font-serif pl-2">
                          {point.content}
                        </p>
                      </motion.div>

                      {/* Example Section */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-stone-900/30 rounded-sm p-6 border border-stone-800"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <History size={20} className="text-stone-500" />
                          <h4 className="text-sm uppercase tracking-widest text-stone-500 font-bold">Thực tiễn lịch sử</h4>
                        </div>
                        <p className="text-stone-400 italic font-serif pl-2">
                          {point.example}
                        </p>
                      </motion.div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-stone-800 bg-stone-900 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-stone-600 text-xs uppercase tracking-wider font-bold">
                        <Star size={14} className="text-yellow-600" />
                        <span>Giai đoạn 1954 - 1965</span>
                      </div>
                      <button
                        onClick={() => setActiveId(null)}
                        className={`px-8 py-2 border border-stone-600 text-stone-300 font-bold uppercase text-xs tracking-widest hover:bg-stone-800 hover:text-white hover:border-white transition-all`}
                      >
                        Đóng lại
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Leadership;