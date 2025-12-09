import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEADERSHIP_POINTS } from '../constants';
import { Book, Users, Swords, Flame, Flag, X, Quote, Lightbulb, History, Star, Compass } from 'lucide-react';

const iconMap = {
  Book, Users, Swords, Flame, Flag
};

// Màu sắc cho từng card
const cardColors = [
  { bg: 'from-red-600 to-red-800', light: 'bg-red-500/20', border: 'border-red-500/30' },
  { bg: 'from-orange-600 to-orange-800', light: 'bg-orange-500/20', border: 'border-orange-500/30' },
  { bg: 'from-yellow-600 to-yellow-700', light: 'bg-yellow-500/20', border: 'border-yellow-500/30' },
  { bg: 'from-green-600 to-green-800', light: 'bg-green-500/20', border: 'border-green-500/30' },
  { bg: 'from-blue-600 to-blue-800', light: 'bg-blue-500/20', border: 'border-blue-500/30' },
];

const Leadership: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="leadership" className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-party-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-party-gold/10 rounded-full blur-3xl" />
        {/* Star pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-party-gold"><Star size={40} /></div>
          <div className="absolute top-40 right-32 text-party-gold"><Star size={24} /></div>
          <div className="absolute bottom-32 left-40 text-party-gold"><Star size={32} /></div>
          <div className="absolute bottom-20 right-20 text-party-gold"><Star size={28} /></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-party-red/20 text-party-red px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-party-red/30">
            <Compass size={18} />
            Vai trò lãnh đạo của Đảng
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="text-white">Kim Chỉ Nam</span>
            <br />
            <span className="text-party-gold">Cho Cách Mạng</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-4">
            Những quan điểm và đường lối lãnh đạo sáng suốt của Đảng trong giai đoạn 1954-1965
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-12 h-1 bg-party-red rounded-full" />
            <Star className="text-party-gold" size={20} />
            <div className="w-12 h-1 bg-party-red rounded-full" />
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative h-full bg-slate-800/80 backdrop-blur-sm rounded-2xl border ${colors.border} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-party-red/10`}
                >
                  {/* Top gradient bar */}
                  <div className={`h-2 bg-gradient-to-r ${colors.bg}`} />
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Icon */}
                    <motion.div 
                      animate={{ rotate: isHovered ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-5 shadow-lg`}
                    >
                      <Icon size={28} className="text-white" />
                    </motion.div>

                    {/* Number badge */}
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 text-sm font-bold">
                      {String(point.id).padStart(2, '0')}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-serif text-white mb-3 group-hover:text-party-gold transition-colors">
                      {point.title}
                    </h3>

                    {/* Quote Preview */}
                    <div className={`${colors.light} rounded-lg p-3 mb-4 border-l-2 ${colors.border}`}>
                      <p className="text-sm italic text-slate-300 line-clamp-2">
                        "{point.quote}"
                      </p>
                    </div>

                    {/* Content preview */}
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                      {point.content}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <span className="text-xs text-slate-500 uppercase tracking-wider">
                        Xem chi tiết
                      </span>
                      <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${colors.bg} flex items-center justify-center`}
                      >
                        <span className="text-white text-lg">→</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
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
          <p className="text-slate-500 italic text-sm">
            "Đảng lãnh đạo là nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam"
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeId && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveId(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-hidden"
            >
              {(() => {
                const point = LEADERSHIP_POINTS.find(p => p.id === activeId);
                if (!point) return null;
                const Icon = iconMap[point.icon];
                const colors = cardColors[(point.id - 1) % cardColors.length];

                return (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
                    {/* Header */}
                    <div className={`relative bg-gradient-to-r ${colors.bg} p-8`}>
                      {/* Close button */}
                      <button
                        onClick={() => setActiveId(null)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                      >
                        <X size={20} />
                      </button>

                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon size={40} className="text-white" />
                        </div>
                        <div>
                          <span className="text-white/70 text-sm font-medium">Quan điểm {String(point.id).padStart(2, '0')}</span>
                          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
                            {point.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 overflow-y-auto max-h-[50vh]">
                      {/* Quote */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-party-gold/10 border border-party-gold/30 rounded-2xl p-5 mb-6"
                      >
                        <div className="flex items-start gap-3">
                          <Quote className="text-party-gold flex-shrink-0 mt-1" size={24} />
                          <div>
                            <p className="text-lg md:text-xl italic font-serif text-party-gold leading-relaxed">
                              "{point.quote}"
                            </p>
                            <p className="text-sm text-slate-500 mt-2">— Lời Bác / Văn kiện Đảng</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Content */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb size={18} className="text-blue-400" />
                          <h4 className="text-sm uppercase tracking-wide text-slate-400 font-semibold">Nội dung chính</h4>
                        </div>
                        <p className="text-lg text-slate-300 leading-relaxed pl-6">
                          {point.content}
                        </p>
                      </motion.div>

                      {/* Example */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <History size={18} className="text-green-400" />
                          <h4 className="text-sm uppercase tracking-wide text-slate-400 font-semibold">Thực tiễn lịch sử</h4>
                        </div>
                        <p className="text-slate-300 pl-6">
                          {point.example}
                        </p>
                      </motion.div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-slate-700 bg-slate-900/50 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Star size={16} className="text-party-gold" />
                        <span>Giai đoạn 1954 - 1965</span>
                      </div>
                      <button
                        onClick={() => setActiveId(null)}
                        className={`px-6 py-3 rounded-xl bg-gradient-to-r ${colors.bg} text-white font-semibold hover:opacity-90 transition-opacity shadow-lg`}
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