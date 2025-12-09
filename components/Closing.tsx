import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Download } from 'lucide-react';

const Closing: React.FC = () => {
  return (
    <section id="closing" className="relative min-h-screen flex items-center justify-center bg-deep-dark text-white py-20 overflow-hidden">
      {/* Background Video placeholder */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://picsum.photos/id/195/1920/1080" 
          alt="Emotional Background" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-dark via-deep-dark/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <p className="text-2xl md:text-3xl font-serif italic text-slate-300 mb-6">
            "Nước Việt Nam là một, dân tộc Việt Nam là một.<br/>
            Sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ thay đổi."
          </p>
          <span className="text-party-gold font-bold uppercase tracking-widest">- Hồ Chí Minh -</span>
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 p-8 rounded-2xl backdrop-blur-md max-w-2xl mx-auto border border-white/10"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center justify-center gap-2">
            <Heart className="text-party-red fill-current animate-pulse" />
            Cảm nhận của bạn
          </h3>
          <p className="mb-6 text-slate-300">
            Bạn tự hào nhất điều gì ở thế hệ cha anh giai đoạn 1954-1965?
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <textarea 
              className="w-full p-4 rounded bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-party-gold transition-colors"
              rows={3}
              placeholder="Chia sẻ suy nghĩ của bạn..."
            />
            <button className="px-8 py-3 bg-party-red hover:bg-red-700 text-white font-bold rounded shadow-lg hover:shadow-red-900/50 transition-all transform hover:-translate-y-1">
              Gửi cảm nhận
            </button>
          </form>
        </motion.div>

        <div className="mt-16 flex justify-center space-x-6">
          <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
            <Share2 size={20} />
            <span>Chia sẻ</span>
          </button>
          <button className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
            <Download size={20} />
            <span>Tải Slide PDF</span>
          </button>
        </div>

        <p className="mt-20 text-sm text-slate-600">
          © 2023 Lịch sử Đảng Cộng sản Việt Nam - Dự án Thuyết trình Giáo dục
        </p>
      </div>
    </section>
  );
};

export default Closing;