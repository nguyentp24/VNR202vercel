import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE_DATA } from '../constants';
import { TimelineEvent } from '../types';
import { X, Calendar, Star, ChevronRight, Sparkles } from 'lucide-react';

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
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="bg-stone-900 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-yellow-600/30 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative corners for Modal */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-yellow-600/50 rounded-tl-sm pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-yellow-600/50 rounded-tr-sm pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-yellow-600/50 rounded-bl-sm pointer-events-none z-10" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-yellow-600/50 rounded-br-sm pointer-events-none z-10" />

          {/* Header with Image */}
          <div className="relative h-64 md:h-72">
            {event.image ? (
              <>
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover grayscale-[30%] sepia-[20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-stone-800 to-black" />
            )}
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-stone-300 hover:text-white hover:bg-red-900/80 transition-colors border border-white/10 z-20 group"
            >
              <X size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Year Badge */}
            <div className="absolute bottom-0 left-0 p-6 w-full">
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="flex items-end gap-4"
               >
                 <div className={`px-4 py-2 border ${event.highlight ? 'bg-red-900/80 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-stone-800/80 border-stone-600 text-stone-300'} backdrop-blur-md`}>
                   <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="font-serif font-bold text-xl tracking-wider">{event.year}</span>
                   </div>
                 </div>
                 {event.highlight && (
                    <div className="bg-yellow-600/20 border border-yellow-500 text-yellow-500 px-3 py-1 rounded-sm backdrop-blur-md flex items-center gap-1">
                       <Star size={14} fill="currentColor" />
                       <span className="text-xs font-bold uppercase tracking-widest">Sự kiện trọng đại</span>
                    </div>
                 )}
               </motion.div>
            </div>
          </div>

          {/* Content Scrollable Area */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-18rem)] bg-stone-900 custom-scrollbar">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-yellow-500 mb-6 drop-shadow-sm leading-tight">
              {event.title}
            </h2>

            <div className="prose prose-invert max-w-none">
               <p className="text-stone-300 leading-relaxed text-lg font-serif border-l-2 border-stone-700 pl-4 mb-8">
                 {event.details || event.description}
               </p>
            </div>

            {/* Key Points */}
            {event.keyPoints && event.keyPoints.length > 0 && (
              <div className="bg-black/30 p-6 border border-stone-800 relative mt-8">
                {/* Decoration line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-900 px-4 text-yellow-600">
                   <Sparkles size={20} fill="currentColor" />
                </div>
                
                <h3 className="text-stone-400 font-bold mb-4 text-xs uppercase tracking-[0.2em] text-center">
                  Điểm nổi bật
                </h3>
                
                <ul className="space-y-4">
                  {event.keyPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 bg-red-600 rotate-45 group-hover:bg-yellow-500 transition-colors" />
                      <span className="text-stone-300 text-base leading-relaxed font-serif">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-stone-800 bg-stone-950 flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-2 border border-stone-600 text-stone-400 hover:text-white hover:border-white hover:bg-white/5 transition-all uppercase text-xs tracking-widest font-bold"
            >
              Đóng lại
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
      <section id="timeline" className="py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black relative overflow-hidden min-h-screen">
        
        {/* Background Textures */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20 max-w-6xl">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="inline-block relative mb-6">
               <div className="absolute inset-0 bg-yellow-600/20 blur-xl rounded-full" />
               <div className="relative border border-yellow-600/30 bg-black/40 backdrop-blur-md px-6 py-2 flex items-center gap-3 text-yellow-500 font-serif uppercase tracking-[0.2em] text-xs md:text-sm shadow-lg">
                  <Calendar size={16} />
                  <span>Giai đoạn 1954 - 1965</span>
               </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-100 mb-6 drop-shadow-2xl">
              Dòng Chảy <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">Lịch Sử</span>
            </h2>
            
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-stone-500 to-transparent mx-auto my-6" />
            
            <p className="text-stone-400 max-w-2xl mx-auto font-serif text-lg italic">
              "Những mốc son quan trọng trong giai đoạn xây dựng CNXH ở miền Bắc và đấu tranh giải phóng miền Nam."
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-600/50 to-transparent transform md:-translate-x-1/2" />
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent transform md:-translate-x-1/2 blur-[2px]" />

            <div className="space-y-16 md:space-y-24">
              {TIMELINE_DATA.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-20 flex items-center justify-center">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-yellow-500/20 blur-xl rounded-full ${event.highlight ? 'opacity-100' : 'opacity-0'}`} />
                    
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-4 h-4 md:w-6 md:h-6 transform rotate-45 border-2 transition-all duration-300 cursor-pointer ${
                        event.highlight 
                          ? 'bg-red-600 border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.6)]' 
                          : 'bg-stone-900 border-stone-500 shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:border-yellow-500'
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    />
                  </div>

                  {/* Empty Space for alignment */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Event Card */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedEvent(event)}
                      className={`group cursor-pointer relative overflow-hidden transition-all duration-500 ${
                        event.highlight 
                          ? 'border-l-2 border-yellow-600' 
                          : 'border-l-2 border-stone-700 hover:border-stone-500'
                      }`}
                    >
                      {/* Card Content Container */}
                      <div className={`p-6 bg-black/40 backdrop-blur-sm border-y border-r border-stone-800/50 hover:bg-stone-900/60 transition-colors ${event.highlight ? 'bg-red-950/10' : ''}`}>
                         
                         {/* Header Info */}
                         <div className="flex items-center justify-between mb-4">
                            <span className={`font-serif font-black text-3xl md:text-5xl opacity-20 absolute top-2 right-4 pointer-events-none select-none ${event.highlight ? 'text-yellow-600' : 'text-stone-600'}`}>
                               {event.year}
                            </span>
                            
                            <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-widest border ${
                               event.highlight 
                               ? 'bg-red-900/30 border-red-500/50 text-red-400' 
                               : 'bg-stone-800/50 border-stone-600/50 text-stone-400'
                            }`}>
                               {event.year}
                            </div>
                         </div>

                         {/* Title */}
                         <h3 className={`text-xl md:text-2xl font-serif font-bold mb-3 transition-colors ${
                            event.highlight ? 'text-yellow-500' : 'text-stone-200 group-hover:text-yellow-500'
                         }`}>
                           {event.title}
                         </h3>

                         {/* Description */}
                         <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-5 line-clamp-3 font-serif">
                           {event.description}
                         </p>

                         {/* Image Preview */}
                         {event.image && (
                           <div className="relative h-40 w-full mb-4 overflow-hidden border border-stone-700/50 opacity-80 group-hover:opacity-100 transition-opacity">
                              <img 
                                src={event.image} 
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[50%] group-hover:grayscale-0"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                           </div>
                         )}

                         {/* Action Link */}
                         <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 group-hover:text-yellow-500 transition-colors">
                           <span>Xem tư liệu</span>
                           <div className="w-8 h-px bg-current transition-all group-hover:w-12" />
                           <ChevronRight size={14} />
                         </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* End Marker */}
            <div className="absolute left-4 md:left-1/2 bottom-0 transform md:-translate-x-1/2 translate-y-1/2">
               <div className="w-2 h-16 bg-gradient-to-b from-yellow-600/50 to-transparent" />
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