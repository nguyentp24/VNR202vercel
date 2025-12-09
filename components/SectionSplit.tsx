import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Flame } from 'lucide-react';

const SectionSplit: React.FC = () => {
  return (
    <section id="regions" className="relative w-full md:h-screen flex flex-col md:flex-row overflow-hidden">

      {/* North */}
      <motion.div
        className="flex-1 bg-slate-800 relative group overflow-hidden border-b md:border-b-0 md:border-r border-slate-600"
        initial={{ x: '-100%' }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1, ease: 'circOut' }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[url('https://cdnimage.daihoidang.vn/t800/uploaded/vnp/uploaded/lanlt/2021_01_18/ttxvn_dai_hoi_3_21.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700" />
        <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 items-start">
          <div className="flex items-center space-x-3 mb-4 text-blue-400">
            <Hammer size={32} />
            <span className="uppercase tracking-widest font-bold">Miền Bắc</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Xây Dựng<br /><span className="text-blue-500">CNXH</span>
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-md">
            "Hậu phương lớn" chi viện cho tiền tuyến. Khôi phục kinh tế, cải tạo XHCN, phong trào "Ba sẵn sàng", "Sóng Duyên Hải".
          </p>
          <div className="bg-blue-900/30 border-l-4 border-blue-500 p-4">
            <p className="italic text-white font-serif">"Tất cả vì miền Nam ruột thịt"</p>
          </div>
        </div>
      </motion.div>

      {/* South */}
      <motion.div
        className="flex-1 bg-red-950 relative group overflow-hidden"
        initial={{ x: '100%' }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1, ease: 'circOut' }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/4e/8a/00/4e8a004b2e311c05cab368f606b5b2e0.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700" />
        <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 items-end text-right">
          <div className="flex items-center space-x-3 mb-4 text-party-gold flex-row-reverse space-x-reverse">
            <Flame size={32} />
            <span className="uppercase tracking-widest font-bold">Miền Nam</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Đấu Tranh<br /><span className="text-party-red">Giải Phóng</span>
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-md">
            "Tiền tuyến lớn" trực tiếp chống Mỹ. Đồng Khởi Bến Tre, Ấp Bắc, Bình Giã. Phong trào "Năm xung phong", "Đội quân tóc dài".
          </p>
          <div className="bg-red-900/50 border-r-4 border-party-gold p-4">
            <p className="italic text-white font-serif">"Một tấc không đi, một ly không rời"</p>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold z-20 shadow-xl">
          VS
        </div>
      </div>
    </section>
  );
};

export default SectionSplit;