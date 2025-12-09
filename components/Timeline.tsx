import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE_DATA } from '../constants';
import { TimelineEvent } from '../types';
import { X, Calendar, Star, ChevronRight, Sparkles } from 'lucide-react';

// Modal Component
const EventModal: React.FC<{
  event: TimelineEvent | null;
  onClose: () => void;
}> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Image */}
          <div className="relative">
            {event.image ? (
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              </div>
            ) : (
              <div className="h-32 bg-gradient-to-r from-party-red to-party-gold opacity-30" />
            )}
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/20"
            >
              <X size={20} />
            </button>

            {/* Year Badge */}
            <div className="absolute bottom-4 left-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${event.highlight ? 'bg-party-red' : 'bg-slate-700'} shadow-lg`}>
                <Calendar size={16} />
                <span className="font-bold text-lg">{event.year}</span>
                {event.highlight && <Star size={14} className="text-party-gold fill-party-gold" />}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(85vh-12rem)]">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              {event.title}
            </h2>

            <p className="text-slate-300 leading-relaxed mb-6">
              {event.details || event.description}
            </p>

            {/* Key Points */}
            {event.keyPoints && event.keyPoints.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <h3 className="text-party-gold font-bold mb-4 flex items-center gap-2">
                  <Sparkles size={18} />
                  Điểm nổi bật
                </h3>
                <ul className="space-y-3">
                  {event.keyPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-party-red/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight size={14} className="text-party-red" />
                      </div>
                      <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700 bg-slate-900/50">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <>
      <section id="timeline" className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-party-red/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-party-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-deep-dark to-transparent z-10" />
        
        <div className="container mx-auto px-4 relative z-20">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-party-gold/20 text-party-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Calendar size={18} />
              1954 - 1965
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-party-gold mb-4">
              Dòng Chảy Lịch Sử
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Những mốc son quan trọng trong giai đoạn xây dựng CNXH ở miền Bắc và đấu tranh giải phóng miền Nam
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-party-gold via-party-red to-party-gold transform md:-translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {TIMELINE_DATA.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-20">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-4 h-4 rounded-full border-4 ${
                        event.highlight 
                          ? 'bg-party-gold border-party-red shadow-[0_0_20px_rgba(251,191,36,0.5)]' 
                          : 'bg-party-red border-slate-900 shadow-[0_0_10px_rgba(215,25,32,0.5)]'
                      }`}
                    />
                    {event.highlight && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-party-gold"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Empty Space for alternating */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => setSelectedEvent(event)}
                      className={`group cursor-pointer p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                        event.highlight 
                          ? 'bg-gradient-to-br from-red-900/40 to-red-800/20 border-party-red/50 hover:border-party-gold shadow-lg shadow-red-900/20' 
                          : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-500 hover:bg-slate-800/80'
                      }`}
                    >
                      {/* Year Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${
                          event.highlight 
                            ? 'bg-party-red text-white' 
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          <Calendar size={14} />
                          {event.year}
                        </span>
                        {event.highlight && (
                          <Star size={18} className="text-party-gold fill-party-gold" />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2 group-hover:text-party-gold transition-colors">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Image Preview */}
                      {event.image && (
                        <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      )}

                      {/* Click hint */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-party-gold transition-colors">
                        <span>Xem chi tiết</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* End marker */}
            <div className="absolute left-4 md:left-1/2 bottom-0 transform md:-translate-x-1/2">
              <div className="w-6 h-6 rounded-full bg-party-gold border-4 border-slate-900 shadow-[0_0_20px_rgba(251,191,36,0.5)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
};

export default Timeline;