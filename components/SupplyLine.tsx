import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Wheat, 
  Bomb, 
  Heart, 
  Users, 
  Footprints,
  Truck,
  Package,
  Shield,
  Flag,
  Star,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

// Các mục chi viện với thông tin chi tiết
const SUPPLY_ITEMS = [
  { 
    id: 'food',
    icon: Wheat, 
    label: 'Lương thực', 
    color: 'from-yellow-400 to-amber-600',
    shadowColor: 'shadow-yellow-500/50',
    bgGlow: 'bg-yellow-500',
    description: 'Gạo, lương khô nuôi quân',
    stats: '500,000 tấn/năm',
    detail: 'Hàng triệu tấn gạo, lương khô được vận chuyển vào Nam nuôi quân, đảm bảo sức chiến đấu cho bộ đội.'
  },
  { 
    id: 'weapon',
    icon: Bomb, 
    label: 'Vũ khí', 
    color: 'from-red-400 to-red-700',
    shadowColor: 'shadow-red-500/50',
    bgGlow: 'bg-red-500',
    description: 'Súng, đạn dược, thuốc nổ',
    stats: '200,000+ khẩu súng',
    detail: 'Vũ khí từ các nước XHCN và tự sản xuất được chuyển vào Nam qua đường Trường Sơn.'
  },
  { 
    id: 'supply',
    icon: Package, 
    label: 'Quân nhu', 
    color: 'from-green-400 to-emerald-700',
    shadowColor: 'shadow-green-500/50',
    bgGlow: 'bg-green-500',
    description: 'Quần áo, ba lô, dụng cụ',
    stats: '10 triệu bộ',
    detail: 'Quân trang, quân dụng được sản xuất từ hậu phương miền Bắc chi viện cho chiến trường.'
  },
  { 
    id: 'medical',
    icon: Heart, 
    label: 'Quân y', 
    color: 'from-pink-400 to-rose-600',
    shadowColor: 'shadow-pink-500/50',
    bgGlow: 'bg-pink-500',
    description: 'Thuốc men, cứu thương',
    stats: '50,000 y bác sĩ',
    detail: 'Đội ngũ y bác sĩ và thuốc men chi viện cho các trạm xá dọc đường Trường Sơn.'
  },
  { 
    id: 'transport',
    icon: Truck, 
    label: 'Vận tải', 
    color: 'from-blue-400 to-blue-700',
    shadowColor: 'shadow-blue-500/50',
    bgGlow: 'bg-blue-500',
    description: 'Xe tải, xe đạp thồ',
    stats: '10,000+ xe',
    detail: 'Đoàn xe vận tải và hàng vạn xe đạp thồ vượt Trường Sơn chi viện miền Nam.'
  },
  { 
    id: 'youth',
    icon: Users, 
    label: 'Thanh niên xung phong', 
    color: 'from-orange-400 to-orange-700',
    shadowColor: 'shadow-orange-500/50',
    bgGlow: 'bg-orange-500',
    description: 'Mở đường, phục vụ chiến trường',
    stats: '100,000+ người',
    detail: 'Thanh niên xung phong mở đường, san lấp hố bom, đảm bảo giao thông thông suốt.'
  },
  { 
    id: 'soldier',
    icon: Shield, 
    label: 'Bộ đội', 
    color: 'from-emerald-400 to-teal-700',
    shadowColor: 'shadow-emerald-500/50',
    bgGlow: 'bg-emerald-500',
    description: 'Chiến sĩ chi viện miền Nam',
    stats: '300,000+ quân',
    detail: 'Hàng trăm nghìn chiến sĩ hành quân vượt Trường Sơn chi viện chiến trường miền Nam.'
  },
  { 
    id: 'march',
    icon: Flag, 
    label: 'Đoàn quân ra trận', 
    color: 'from-party-red to-red-800',
    shadowColor: 'shadow-red-600/50',
    bgGlow: 'bg-party-red',
    description: 'Hành quân vào Nam thống nhất',
    stats: '10+ năm',
    detail: 'Suốt hơn 10 năm, dòng người và vật tư không ngừng chảy vào Nam, góp phần làm nên Đại thắng.'
  },
];

// Component cho card chi viện
const SupplyCard: React.FC<{
  item: typeof SUPPLY_ITEMS[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ item, index, isActive, onClick }) => {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className={`relative p-4 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 
        hover:border-slate-500 transition-all duration-300 overflow-hidden
        ${isActive ? 'ring-2 ring-party-gold' : ''}`}
      >
        {/* Glow effect on hover */}
        <motion.div
          className={`absolute -inset-1 ${item.bgGlow} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-2xl`}
        />
        
        {/* Moving light effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />

        <div className="relative z-10">
          {/* Icon with animation */}
          <div className="flex items-center gap-3 mb-3">
            <motion.div 
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center ${item.shadowColor} shadow-lg`}
              animate={isActive ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              } : {}}
              transition={{ duration: 0.5 }}
            >
              <Icon className="text-white" size={24} />
            </motion.div>
            <div>
              <h3 className="font-bold text-white group-hover:text-party-gold transition-colors">
                {item.label}
              </h3>
              <p className="text-xs text-slate-400">{item.stats}</p>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 line-clamp-2">
            {item.description}
          </p>

          {/* Arrow indicator */}
          <motion.div
            className="absolute bottom-3 right-3 text-slate-500 group-hover:text-party-gold transition-colors"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowRight size={16} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Modal chi tiết
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
        >
          <X size={18} className="text-slate-300" />
        </button>

        <div className="flex items-center gap-4 mb-4">
          <motion.div 
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center ${item.shadowColor} shadow-lg`}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className="text-white" size={32} />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-party-gold">{item.label}</h3>
            <p className="text-slate-400">{item.description}</p>
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-xl p-4 mb-4">
          <p className="text-3xl font-bold text-center bg-gradient-to-r from-party-gold to-yellow-400 bg-clip-text text-transparent">
            {item.stats}
          </p>
        </div>

        <p className="text-slate-300 leading-relaxed">
          {item.detail}
        </p>
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
      className="relative py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-party-gold/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-party-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-party-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-party-red/20 text-party-red px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-party-red/30"
            whileHover={{ scale: 1.05 }}
          >
            <Footprints size={18} />
            Dòng chi viện huyền thoại
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Chi viện từ <span className="text-party-red">Bắc</span> vào <span className="text-party-gold">Nam</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Hàng triệu tấn lương thực, vũ khí và hàng vạn chiến sĩ hành quân vượt Trường Sơn chi viện miền Nam
          </p>
        </motion.div>

        {/* Direction Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="flex items-center justify-between gap-4">
            {/* North */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-gradient-to-br from-party-red to-red-800 flex items-center justify-center shadow-lg shadow-red-500/30 mb-3"
                animate={{
                  boxShadow: ['0 0 20px rgba(220, 38, 38, 0.3)', '0 0 40px rgba(220, 38, 38, 0.5)', '0 0 20px rgba(220, 38, 38, 0.3)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="text-party-gold" size={36} />
              </motion.div>
              <span className="text-party-gold font-bold text-xl">MIỀN BẮC</span>
              <span className="text-slate-400 text-sm">Hậu phương lớn</span>
            </motion.div>

            {/* Animated Line */}
            <div className="flex-1 relative h-4 mx-4">
              {/* Background line */}
              <div className="absolute inset-0 bg-slate-700/50 rounded-full" />
              
              {/* Animated progress */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-party-red via-party-gold to-party-red rounded-full"
                style={{ width: useTransform(lineProgress, (v) => `${v}%`) }}
              />
              
              {/* Moving light */}
              <motion.div
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                animate={{ x: ['-100%', '500%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />

              {/* Arrow icons */}
              <div className="absolute inset-0 flex items-center justify-around">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="text-party-gold text-xl"
                    animate={{
                      x: [0, 10, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    →
                  </motion.div>
                ))}
              </div>
            </div>

            {/* South */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-gradient-to-br from-party-gold to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30 mb-3"
                animate={{
                  boxShadow: ['0 0 20px rgba(251, 191, 36, 0.3)', '0 0 40px rgba(251, 191, 36, 0.5)', '0 0 20px rgba(251, 191, 36, 0.3)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flag className="text-party-red" size={36} />
              </motion.div>
              <span className="text-party-gold font-bold text-xl">MIỀN NAM</span>
              <span className="text-slate-400 text-sm">Tiền tuyến lớn</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Supply Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {SUPPLY_ITEMS.map((item, index) => (
            <SupplyCard
              key={item.id}
              item={item}
              index={index}
              isActive={selectedItem?.id === item.id}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {/* Statistics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-party-red/20 via-slate-800/80 to-party-gold/20 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '1.5 triệu', label: 'Tấn vật tư', icon: Package },
                { value: '300,000+', label: 'Chiến sĩ', icon: Shield },
                { value: '20,000 km', label: 'Đường Trường Sơn', icon: Footprints },
                { value: '10+ năm', label: 'Kiên trì chiến đấu', icon: Flag },
              ].map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex justify-center mb-2">
                      <motion.div
                        className="w-10 h-10 rounded-full bg-party-gold/20 flex items-center justify-center"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      >
                        <StatIcon className="text-party-gold" size={20} />
                      </motion.div>
                    </div>
                    <motion.p
                      className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-party-gold via-yellow-300 to-party-gold bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Decorative sparkles */}
          <Sparkles className="absolute -top-4 -left-4 text-party-gold/30 w-8 h-8" />
          <Sparkles className="absolute -bottom-4 -right-4 text-party-gold/30 w-8 h-8" />
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg md:text-xl text-slate-400 italic max-w-2xl mx-auto">
            "Xẻ dọc Trường Sơn đi cứu nước, mà lòng phơi phới dậy tương lai"
          </p>
          <p className="text-party-gold mt-2">— Tố Hữu</p>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default SupplyLine;
