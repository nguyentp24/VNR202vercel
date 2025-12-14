import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Download, Star, Quote, Send } from 'lucide-react';

const Closing: React.FC = () => {
  return (
    <section id="closing" className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black text-stone-200 py-24 overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src="https://picsum.photos/id/195/1920/1080" 
          alt="Emotional Background" 
          className="w-full h-full object-cover grayscale sepia-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
        
        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16 relative"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-600/20">
             <Quote size={80} />
          </div>
          
          <p className="text-2xl md:text-4xl font-serif font-bold text-stone-100 mb-8 leading-relaxed drop-shadow-lg relative z-10">
            "Nước Việt Nam là một, dân tộc Việt Nam là một.<br/>
            Sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ thay đổi."
          </p>
          
          <div className="inline-flex items-center gap-4">
             <div className="h-px w-12 bg-yellow-600/50"></div>
             <span className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-sm md:text-base text-shadow-sm">
                Hồ Chí Minh
             </span>
             <div className="h-px w-12 bg-yellow-600/50"></div>
          </div>
        </motion.div>

        {/* Feedback Form */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#1c1917] p-8 md:p-10 rounded-sm shadow-2xl border border-stone-700 relative max-w-2xl mx-auto"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-yellow-600/30"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-yellow-600/30"></div>

          <h3 className="text-xl font-serif font-bold mb-4 flex items-center justify-center gap-3 text-yellow-500 uppercase tracking-wide">
            <Heart className="text-red-600 fill-current animate-pulse" size={20} />
            Cảm nhận của bạn
          </h3>
          
          <p className="mb-8 text-stone-400 font-serif italic">
            "Bạn tự hào nhất điều gì ở thế hệ cha anh giai đoạn 1954-1965?"
          </p>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <textarea 
                className="w-full p-5 rounded-sm bg-stone-900 border border-stone-600 text-stone-200 focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/50 transition-all font-serif placeholder-stone-600 resize-none shadow-inner"
                rows={4}
                placeholder="Viết đôi dòng tâm sự..."
              />
              <div className="absolute bottom-3 right-3 text-stone-600 pointer-events-none">
                 <Star size={12} />
              </div>
            </div>
            
            <button className="px-10 py-3 bg-red-900 hover:bg-red-800 text-stone-200 font-bold uppercase tracking-widest rounded-sm border border-red-700 hover:border-red-500 shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto group">
              <span>Gửi cảm nhận</span>
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-6">
          <button className="flex items-center gap-3 px-6 py-3 border border-stone-600 text-stone-400 hover:text-yellow-500 hover:border-yellow-500 transition-all uppercase text-xs font-bold tracking-widest group">
            <Share2 size={18} className="group-hover:scale-110 transition-transform" />
            <span>Chia sẻ</span>
          </button>
          <button className="flex items-center gap-3 px-6 py-3 border border-stone-600 text-stone-400 hover:text-yellow-500 hover:border-yellow-500 transition-all uppercase text-xs font-bold tracking-widest group">
            <Download size={18} className="group-hover:scale-110 transition-transform" />
            <span>Tải Slide PDF</span>
          </button>
        </div>

        {/* Footer Text */}
        <div className="mt-20 border-t border-stone-800 pt-8">
           <p className="text-xs text-stone-600 uppercase tracking-widest font-mono">
             © 2023 Lịch sử Đảng Cộng sản Việt Nam • Dự án Thuyết trình Giáo dục
           </p>
        </div>
      </div>
    </section>
  );
};

export default Closing;