import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Flame, Star } from 'lucide-react';

const SectionSplit: React.FC = () => {
  return (
    <section id="regions" className="relative w-full md:h-screen flex flex-col md:flex-row overflow-hidden bg-black">
      
      {/* Texture hạt nhiễu phủ toàn màn hình */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30"></div>

      {/* PHẦN MIỀN BẮC */}
      <motion.div
        className="flex-1 relative group overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-stone-800"
        initial={{ x: '-100%' }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        {/* Nền & Ảnh */}
        <div className="absolute inset-0 bg-slate-900 z-0" />
        <div className="absolute inset-0 bg-[url('https://cdnimage.daihoidang.vn/t800/uploaded/vnp/uploaded/lanlt/2021_01_18/ttxvn_dai_hoi_3_21.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent z-10" />

        {/* Nội dung */}
        <div className="relative z-20 h-full flex flex-col justify-center p-8 md:p-20 items-start">
          
          {/* Label + Icon */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-900/50 border border-cyan-500/30 rounded-sm">
               <Hammer size={28} className="text-cyan-400" />
            </div>
            <span className="uppercase tracking-[0.2em] font-bold text-cyan-500 font-serif border-b border-cyan-500/30 pb-1">
              Miền Bắc
            </span>
          </div>

          {/* Tiêu đề lớn */}
          <h2 className="text-5xl md:text-7xl font-serif font-black text-stone-100 mb-6 leading-tight drop-shadow-xl">
            Xây Dựng<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">CNXH</span>
          </h2>

          {/* Mô tả */}
          <p className="text-stone-300 text-lg md:text-xl mb-8 max-w-lg font-serif leading-relaxed">
            "Hậu phương lớn" chi viện cho tiền tuyến. Khôi phục kinh tế, cải tạo XHCN, phong trào "Ba sẵn sàng", "Sóng Duyên Hải".
          </p>

          {/* Quote Box */}
          <div className="bg-slate-800/60 border-l-4 border-cyan-500 p-6 backdrop-blur-md max-w-md shadow-lg group-hover:border-yellow-500 transition-colors duration-500">
            <p className="italic text-stone-100 font-serif text-lg">"Tất cả vì miền Nam ruột thịt"</p>
          </div>

        </div>
      </motion.div>

      {/* PHẦN MIỀN NAM */}
      <motion.div
        className="flex-1 relative group overflow-hidden"
        initial={{ x: '100%' }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        {/* Nền & Ảnh */}
        <div className="absolute inset-0 bg-[#3a1010] z-0" /> 
        <div className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/4e/8a/00/4e8a004b2e311c05cab368f606b5b2e0.jpg')] bg-cover bg-center opacity-60 mix-blend-luminosity group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 z-0" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-red-900/30 to-transparent z-10" />

        {/* Nội dung */}
        <div className="relative z-20 h-full flex flex-col justify-center p-8 md:p-20 items-end text-right">
          
          <div className="flex items-center gap-3 mb-6 flex-row-reverse">
            <div className="p-2 bg-red-900/50 border border-red-500/30 rounded-sm">
               <Flame size={28} className="text-orange-500" />
            </div>
            <span className="uppercase tracking-[0.2em] font-bold text-orange-500 font-serif border-b border-orange-500/30 pb-1">
              Miền Nam
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif font-black text-stone-100 mb-6 leading-tight drop-shadow-xl">
            Đấu Tranh<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-red-500 to-orange-500">Giải Phóng</span>
          </h2>

          <p className="text-stone-300 text-lg md:text-xl mb-8 max-w-lg font-serif leading-relaxed">
            "Tiền tuyến lớn" trực tiếp chống Mỹ. Đồng Khởi Bến Tre, Ấp Bắc, Bình Giã. Phong trào "Năm xung phong", "Đội quân tóc dài".
          </p>

          <div className="bg-red-950/60 border-r-4 border-orange-500 p-6 backdrop-blur-md max-w-md shadow-lg">
            <p className="italic text-stone-100 font-serif text-lg">"Một tấc không đi, một ly không rời"</p>
          </div>

        </div>
      </motion.div>

      {/* HUY HIỆU GIỮA */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40">
        <motion.div 
           initial={{ scale: 0, rotate: -180 }}
           whileInView={{ scale: 1, rotate: 0 }}
           transition={{ delay: 0.8, type: "spring" }}
           className="relative"
        >
          {/* Hiệu ứng hào quang */}
          <div className="absolute inset-0 bg-yellow-500/30 blur-2xl rounded-full" />
          
          {/* Khối tròn chính */}
          <div className="w-20 h-20 md:w-24 md:h-24 bg-stone-900 border-4 border-yellow-700 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-stone-800 to-black opacity-90" />
             
             <div className="relative z-10 flex flex-col items-center justify-center">
                <Star className="text-yellow-500 w-5 h-5 mb-1 animate-pulse" fill="currentColor" />
                <span className="text-stone-200 font-black font-serif text-2xl leading-none">VS</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionSplit;