import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Wheat, Bomb, Heart, Users, Footprints, Truck, Package, Shield, 
  Flag, Star, X, ChevronRight, Target
} from 'lucide-react';

const SUPPLY_ITEMS = [
  { 
    id: 'food',
    icon: Wheat, 
    label: 'Lương thực', 
    color: 'from-yellow-700 to-yellow-900',
    accent: 'text-yellow-500',
    description: 'Gạo, lương khô nuôi quân',
    stats: '500,000 tấn/năm',
    detail: 'Hàng triệu tấn gạo, lương khô được vận chuyển vào Nam nuôi quân, đảm bảo sức chiến đấu cho bộ đội.'
  },
  { 
    id: 'weapon',
    icon: Bomb, 
    label: 'Vũ khí', 
    color: 'from-red-800 to-red-950',
    accent: 'text-red-500',
    description: 'Súng, đạn dược, thuốc nổ',
    stats: '200,000+ khẩu súng',
    detail: 'Vũ khí từ các nước XHCN và tự sản xuất được chuyển vào Nam qua đường Trường Sơn.'
  },
  { 
    id: 'supply',
    icon: Package, 
    label: 'Quân nhu', 
    color: 'from-emerald-800 to-emerald-950',
    accent: 'text-emerald-500',
    description: 'Quần áo, ba lô, dụng cụ',
    stats: '10 triệu bộ',
    detail: 'Quân trang, quân dụng được sản xuất từ hậu phương miền Bắc chi viện cho chiến trường.'
  },
  { 
    id: 'medical',
    icon: Heart, 
    label: 'Quân y', 
    color: 'from-pink-900 to-rose-950',
    accent: 'text-rose-500',
    description: 'Thuốc men, cứu thương',
    stats: '50,000 y bác sĩ',
    detail: 'Đội ngũ y bác sĩ và thuốc men chi viện cho các trạm xá dọc đường Trường Sơn.'
  },
  { 
    id: 'transport',
    icon: Truck, 
    label: 'Vận tải', 
    color: 'from-slate-700 to-slate-900',
    accent: 'text-slate-400',
    description: 'Xe tải, xe đạp thồ',
    stats: '10,000+ xe',
    detail: 'Đoàn xe vận tải và hàng vạn xe đạp thồ vượt Trường Sơn chi viện miền Nam.'
  },
  { 
    id: 'youth',
    icon: Users, 
    label: 'Thanh niên xung phong', 
    color: 'from-orange-800 to-orange-950',
    accent: 'text-orange-500',
    description: 'Mở đường, phục vụ chiến trường',
    stats: '100,000+ người',
    detail: 'Thanh niên xung phong mở đường, san lấp hố bom, đảm bảo giao thông thông suốt.'
  },
  { 
    id: 'soldier',
    icon: Shield, 
    label: 'Bộ đội', 
    color: 'from-green-800 to-green-950',
    accent: 'text-green-500',
    description: 'Chiến sĩ chi viện miền Nam',
    stats: '300,000+ quân',
    detail: 'Hàng trăm nghìn chiến sĩ hành quân vượt Trường Sơn chi viện chiến trường miền Nam.'
  },
  { 
    id: 'march',
    icon: Flag, 
    label: 'Đoàn quân ra trận', 
    color: 'from-red-700 to-red-900',
    accent: 'text-red-500',
    description: 'Hành quân vào Nam thống nhất',
    stats: '10+ năm',
    detail: 'Suốt hơn 10 năm, dòng người và vật tư không ngừng chảy vào Nam, góp phần làm nên Đại thắng.'
  },
];

const SupplyCard: React.FC<{
  item: typeof SUPPLY_ITEMS[0];
  index: number;
  onClick: () => void;
}> = ({ item, index, onClick }) => {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="cursor-pointer group relative"
    >
      {/* Khung viền kim loại */}
      <div className="absolute inset-0 border border-stone-700 bg-stone-900/80 skew-x-1 transition-transform group-hover:skew-x-0 group-hover:bg-stone-800" />
      
      {/* Nội dung bên trong */}
      <div className="relative p-5 h-full flex flex-col border-l-2 border-l-stone-600 group-hover:border-l-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
           {/* Icon Badge */}
           <div className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br ${item.color} border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
             <Icon className="text-stone-200" size={24} />
           </div>
           
           {/* Decorative Number */}
           <span className="text-xs font-serif font-bold text-stone-600 opacity-50">NO.0{index + 1}</span>
        </div>

        <h3 className={`font-serif font-bold text-lg mb-1 group-hover:text-yellow-500 transition-colors ${item.accent}`}>
          {item.label}
        </h3>
        
        <p className="text-xs text-stone-400 mb-4 line-clamp-2 flex-grow font-serif">
          {item.description}
        </p>

        <div className="pt-3 border-t border-stone-700/50 flex items-center justify-between group-hover:border-yellow-600/30 transition-colors">
          <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Số lượng</span>
          <span className="text-xs font-bold text-stone-300">{item.stats}</span>
        </div>
        
        {/* Hover Effect Corner */}
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-yellow-600 transition-colors duration-300" />
      </div>
    </motion.div>
  );
};

const DetailModal: React.FC<{
  item: typeof SUPPLY_ITEMS[0] | null;
  onClose: () => void;
}> = ({ item, onClose }) => {
  if (!item) return null;
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-[#1c1917] w-full max-w-lg border border-yellow-600/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tem dán "TỐI MẬT" */}
        <div className="absolute -top-3 -left-3 bg-red-800 text-red-200 text-[10px] font-bold px-2 py-1 uppercase tracking-widest border border-red-500 rotate-[-5deg] shadow-lg z-10">
           Tư liệu chi viện
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-stone-500 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <div className="p-8">
           <div className="flex items-center gap-5 mb-8 border-b border-stone-800 pb-6 border-dashed">
              <div className={`w-20 h-20 flex items-center justify-center bg-gradient-to-br ${item.color} shadow-xl border border-white/10`}>
                 <Icon className="text-white" size={40} />
              </div>
              <div>
                 <div className="text-xs text-stone-500 uppercase tracking-[0.2em] mb-1">Loại chi viện</div>
                 <h3 className={`text-3xl font-serif font-bold ${item.accent}`}>{item.label}</h3>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-stone-900/50 p-4 border-l-2 border-yellow-600">
                 <div className="text-xs text-yellow-600 uppercase font-bold mb-1">Thống kê</div>
                 <p className="text-2xl md:text-3xl font-serif font-black text-stone-200">{item.stats}</p>
              </div>

              <div>
                 <div className="text-xs text-stone-500 uppercase font-bold mb-2 tracking-wider">Chi tiết nhiệm vụ</div>
                 <p className="text-stone-300 leading-relaxed font-serif text-lg">
                    {item.detail}
                 </p>
              </div>
           </div>
        </div>

        {/* Footer Stripes */}
        <div className="h-2 w-full bg-repeating-linear-gradient(45deg, #292524, #292524 10px, #1c1917 10px, #1c1917 20px) opacity-50" />
      </motion.div>
    </motion.div>
  );
};

const SupplyLine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<typeof SUPPLY_ITEMS[0] | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 100]);

  return (
    <section 
      ref={containerRef}
      id="supply"
      className="relative py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black overflow-hidden min-h-screen"
    >
      {/* Textures */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
         {[...Array(15)].map((_, i) => (
            <motion.div
               key={i}
               className="absolute w-1 h-1 bg-yellow-600/30 rounded-full blur-[1px]"
               style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
               }}
               animate={{
                  y: [0, -100, 0],
                  opacity: [0, 0.5, 0],
               }}
               transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
               }}
            />
         ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 border border-red-900/50 bg-red-950/20 px-6 py-2 mb-6 shadow-[0_0_15px_rgba(153,27,27,0.2)]">
            <Footprints size={16} className="text-red-500" />
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-red-400">Tuyến chi viện chiến lược</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-black text-stone-100 mb-6 drop-shadow-2xl">
            Chi viện từ <span className="text-red-600">Bắc</span> vào <span className="text-yellow-500">Nam</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-stone-500 to-transparent mx-auto mb-6 opacity-30"></div>

          <p className="text-lg md:text-xl text-stone-400 max-w-3xl mx-auto font-serif italic">
            "Hàng triệu tấn lương thực, vũ khí và hàng vạn chiến sĩ hành quân vượt Trường Sơn chi viện miền Nam."
          </p>
        </motion.div>

        {/* Direction Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto mb-20 relative"
        >
           {/* Connecting Line Background */}
           <div className="absolute top-1/2 left-0 right-0 h-px bg-stone-800 -translate-y-1/2" />
           
           <div className="flex items-center justify-between gap-4 relative z-10">
             {/* North Node */}
             <motion.div 
               className="flex flex-col items-center group"
               initial={{ x: -20, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
             >
                <div className="w-24 h-24 rounded-full border-4 border-stone-800 bg-red-900 flex items-center justify-center relative shadow-[0_0_30px_rgba(220,38,38,0.2)] group-hover:scale-105 transition-transform duration-500">
                   <Star className="text-yellow-500 w-10 h-10 drop-shadow-md" fill="currentColor" />
                   <div className="absolute inset-0 border border-white/10 rounded-full" />
                </div>
                <div className="mt-4 text-center">
                   <h3 className="text-red-500 font-bold font-serif text-xl tracking-wider">MIỀN BẮC</h3>
                   <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Hậu phương lớn</p>
                </div>
             </motion.div>

             {/* Animated Progress Line */}
             <div className="flex-1 relative h-2 mx-8 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600"
                  style={{ width: useTransform(lineProgress, (v) => `${v}%`) }}
                />
                {/* Flowing arrows */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-30">
                   {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                         <ChevronRight size={12} className="text-yellow-200" />
                      </motion.div>
                   ))}
                </div>
             </div>

             {/* South Node */}
             <motion.div 
               className="flex flex-col items-center group"
               initial={{ x: 20, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
             >
                <div className="w-24 h-24 rounded-full border-4 border-stone-800 bg-yellow-700 flex items-center justify-center relative shadow-[0_0_30px_rgba(234,179,8,0.2)] group-hover:scale-105 transition-transform duration-500">
                   <Flag className="text-red-500 w-10 h-10 drop-shadow-md" fill="currentColor" />
                   <div className="absolute inset-0 border border-white/10 rounded-full" />
                </div>
                <div className="mt-4 text-center">
                   <h3 className="text-yellow-500 font-bold font-serif text-xl tracking-wider">MIỀN NAM</h3>
                   <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Tiền tuyến lớn</p>
                </div>
             </motion.div>
           </div>
        </motion.div>

        {/* Supply Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          {SUPPLY_ITEMS.map((item, index) => (
            <SupplyCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="border-t border-stone-800 pt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '1.5 Triệu', unit: 'Tấn vật tư', icon: Package },
              { value: '300,000+', unit: 'Chiến sĩ', icon: Shield },
              { value: '20,000 km', unit: 'Đường Trường Sơn', icon: Footprints },
              { value: '10+ Năm', unit: 'Kiên trì chiến đấu', icon: Target },
            ].map((stat, i) => {
               const StatIcon = stat.icon;
               return (
                  <motion.div 
                     key={i} 
                     className="text-center group"
                     whileHover={{ y: -5 }}
                  >
                     <div className="flex justify-center mb-4">
                        <StatIcon className="text-stone-600 group-hover:text-yellow-600 transition-colors w-8 h-8" />
                     </div>
                     <h4 className="text-3xl md:text-4xl font-black font-serif text-stone-200 mb-2 group-hover:text-yellow-500 transition-colors">
                        {stat.value}
                     </h4>
                     <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">
                        {stat.unit}
                     </p>
                  </motion.div>
               )
            })}
          </div>
        </motion.div>

        {/* Quote Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20 pt-10 border-t border-stone-800/50"
        >
          <div className="inline-block p-6 bg-stone-900/30 border border-stone-800">
             <p className="text-lg md:text-2xl text-stone-300 font-serif italic max-w-3xl mx-auto leading-relaxed">
               "Xẻ dọc Trường Sơn đi cứu nước,<br/>
               Mà lòng phơi phới dậy tương lai"
             </p>
             <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-stone-600" />
                <p className="text-yellow-600 font-bold uppercase text-xs tracking-widest">Tố Hữu</p>
                <div className="h-px w-8 bg-stone-600" />
             </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default SupplyLine;