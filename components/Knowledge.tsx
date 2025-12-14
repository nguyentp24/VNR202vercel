import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Flag, Factory, Sword, Award, ChevronDown, ChevronUp, Quote, Target, 
  Landmark, Flame, Wheat, Hammer, Star, Heart, TrendingUp, Handshake, 
  Library, AlertTriangle, ArrowRight, Footprints, Swords, Map, Trophy, 
  Calendar, ShieldAlert
} from 'lucide-react';

interface KnowledgeSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const Knowledge: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('intro');

  const cardBg = "bg-black/40 border border-stone-700/50 hover:border-yellow-600/30 transition-all duration-300";
  const textGold = "text-yellow-500";
  const textStone = "text-stone-300";

  const sections: KnowledgeSection[] = [
    {
      id: 'intro',
      title: 'Bối cảnh lịch sử',
      icon: <BookOpen size={24} />,
      content: (
        <div className="space-y-4">
          <p className={`${textStone} leading-relaxed font-serif text-lg`}>
            Sau <strong className={`${textGold} uppercase`}>Hiệp định Giơnevơ 1954</strong>, đất nước ta tạm thời chia cắt làm hai miền:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`${cardBg} rounded-sm p-5 border-l-4 border-l-green-600`}>
              <h4 className="font-bold text-green-500 mb-2 flex items-center gap-2 uppercase tracking-wide font-serif">
                <Flag size={18} /> Miền Bắc
              </h4>
              <p className="text-sm text-stone-400">Được giải phóng, bước vào thời kỳ quá độ lên chủ nghĩa xã hội.</p>
            </div>
            <div className={`${cardBg} rounded-sm p-5 border-l-4 border-l-red-600`}>
              <h4 className="font-bold text-red-500 mb-2 flex items-center gap-2 uppercase tracking-wide font-serif">
                <Flame size={18} /> Miền Nam
              </h4>
              <p className="text-sm text-stone-400">Tiền tuyến nóng bỏng chống lại đế quốc Mỹ và chính quyền Sài Gòn.</p>
            </div>
          </div>
          <div className="bg-yellow-900/10 border border-yellow-600/30 rounded-sm p-5 mt-4 relative">
            <div className="flex items-start gap-3">
              <Quote className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className={`${textGold} italic font-serif text-lg leading-relaxed`}>
                  "Đại hội lần này là Đại hội xây dựng chủ nghĩa xã hội ở miền Bắc và đấu tranh hòa bình thống nhất nước nhà."
                </p>
                <p className="text-sm text-stone-500 mt-2 font-bold uppercase tracking-widest">— Chủ tịch Hồ Chí Minh, Đại hội III (9/1960)</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'duongloi',
      title: 'I. Đường lối chung và vai trò của mỗi miền',
      icon: <Target size={24} />,
      content: (
        <div className="space-y-6">
          <div className="bg-stone-900/80 rounded-sm p-6 border border-stone-700 shadow-inner">
            <h4 className={`${textGold} font-serif font-bold text-lg mb-3 uppercase tracking-wider`}>Đường lối chung của Đại hội III</h4>
            <p className={`${textStone} leading-relaxed font-serif`}>
              Cách mạng nước ta phải <strong className="text-stone-100">đồng thời tiến hành hai chiến lược</strong> khác nhau ở hai miền nhưng cùng hướng tới mục tiêu chung: <em>giải phóng miền Nam, hòa bình, thống nhất Tổ quốc</em>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Miền Bắc Card */}
            <div className="bg-gradient-to-br from-stone-900 to-black rounded-sm p-5 border border-green-800/50 hover:border-green-600/50 transition-colors">
              <div className="flex items-center gap-3 mb-4 border-b border-stone-800 pb-4">
                <div className="w-12 h-12 rounded-sm bg-green-900/50 flex items-center justify-center border border-green-700">
                  <Factory size={24} className="text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-green-500 text-lg font-serif uppercase">Miền Bắc</h4>
                  <p className="text-xs text-stone-500 uppercase tracking-widest">Cách mạng XHCN</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1"><Target size={12} /></span>
                  Xây dựng tiềm lực kinh tế, chính trị, quốc phòng
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1"><Target size={12} /></span>
                  Trở thành căn cứ địa của cả nước
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1"><Target size={12} /></span>
                  Là hậu phương lớn cho miền Nam
                </li>
              </ul>
              <div className="mt-5 p-3 bg-green-900/10 border border-green-900/30 rounded-sm">
                <p className="text-green-400 text-sm font-serif">
                  🎯 Vai trò: <span className="text-stone-100 font-bold uppercase">Quyết định nhất</span>
                </p>
              </div>
            </div>

            {/* Miền Nam Card */}
            <div className="bg-gradient-to-br from-stone-900 to-black rounded-sm p-5 border border-red-800/50 hover:border-red-600/50 transition-colors">
              <div className="flex items-center gap-3 mb-4 border-b border-stone-800 pb-4">
                <div className="w-12 h-12 rounded-sm bg-red-900/50 flex items-center justify-center border border-red-700">
                  <Sword size={24} className="text-red-400" />
                </div>
                <div>
                  <h4 className="font-bold text-red-500 text-lg font-serif uppercase">Miền Nam</h4>
                  <p className="text-xs text-stone-500 uppercase tracking-widest">Cách mạng dân tộc dân chủ nhân dân</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1"><Target size={12} /></span>
                  Đánh đổ đế quốc Mỹ và chính quyền tay sai
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1"><Target size={12} /></span>
                  Giành chính quyền về tay nhân dân
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1"><Target size={12} /></span>
                  Thực hiện hòa bình, thống nhất đất nước
                </li>
              </ul>
              <div className="mt-5 p-3 bg-red-900/10 border border-red-900/30 rounded-sm">
                <p className="text-red-400 text-sm font-serif">
                  🎯 Vai trò: <span className="text-stone-100 font-bold uppercase">Quyết định trực tiếp</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mienbac',
      title: 'II. Xây dựng CNXH ở miền Bắc (1961-1965)',
      icon: <Factory size={24} />,
      content: (
        <div className="space-y-6">
          {/* Đặc điểm */}
          <div className="bg-stone-800/30 rounded-sm p-5 border-l-4 border-stone-500">
            <h4 className="font-bold text-stone-200 text-lg mb-3 flex items-center gap-2 font-serif uppercase tracking-wide">
              <Landmark size={20} className="text-yellow-500" />
              Đặc điểm xuất phát
            </h4>
            <ul className="space-y-2 text-stone-400 italic font-serif">
              <li>• Kinh tế nông nghiệp lạc hậu, cơ sở vật chất nghèo nàn</li>
              <li>• Chiến tranh tàn phá nặng nề</li>
              <li>• Tiến lên CNXH không trải qua giai đoạn phát triển TBCN</li>
            </ul>
          </div>

          {/* Nội dung xây dựng */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-stone-900/50 rounded-sm p-4 border border-stone-700 hover:border-blue-500/50 transition-colors">
              <h5 className="font-bold text-blue-400 mb-2 font-serif uppercase text-sm border-b border-stone-800 pb-2 flex items-center gap-2">
                <TrendingUp size={16} /> Kinh tế
              </h5>
              <p className="text-sm text-stone-300 leading-snug">
                Công nghiệp hóa XHCN, ưu tiên công nghiệp nặng, gắn với phát triển nông nghiệp, thủ công nghiệp.
              </p>
            </div>
            <div className="bg-stone-900/50 rounded-sm p-4 border border-stone-700 hover:border-purple-500/50 transition-colors">
              <h5 className="font-bold text-purple-400 mb-2 font-serif uppercase text-sm border-b border-stone-800 pb-2 flex items-center gap-2">
                <Handshake size={16} /> Quan hệ sản xuất
              </h5>
              <p className="text-sm text-stone-300 leading-snug">
                Hoàn thành cải tạo XHCN: hợp tác hóa nông nghiệp, cải tạo công thương nghiệp tư bản tư doanh.
              </p>
            </div>
            <div className="bg-stone-900/50 rounded-sm p-4 border border-stone-700 hover:border-red-500/50 transition-colors">
              <h5 className="font-bold text-red-400 mb-2 font-serif uppercase text-sm border-b border-stone-800 pb-2 flex items-center gap-2">
                <Landmark size={16} /> Chính trị
              </h5>
              <p className="text-sm text-stone-300 leading-snug">
                Củng cố chính quyền dân chủ nhân dân, xây dựng nhà nước XHCN của dân, do dân, vì dân.
              </p>
            </div>
            <div className="bg-stone-900/50 rounded-sm p-4 border border-stone-700 hover:border-yellow-500/50 transition-colors">
              <h5 className="font-bold text-yellow-500 mb-2 font-serif uppercase text-sm border-b border-stone-800 pb-2 flex items-center gap-2">
                <Library size={16} /> Văn hóa - Tư tưởng
              </h5>
              <p className="text-sm text-stone-300 leading-snug">
                Xóa bỏ tàn dư phong kiến, thực dân. Xây dựng con người mới, nền văn hóa tiên tiến.
              </p>
            </div>
          </div>

          {/* Kế hoạch 5 năm */}
          <div className="bg-gradient-to-r from-yellow-900/20 to-red-900/20 rounded-sm p-5 border border-yellow-800/30">
            <h4 className={`${textGold} font-bold text-lg mb-3 font-serif uppercase tracking-wider`}>📋 Kế hoạch 5 năm lần thứ nhất (1961-1965)</h4>
            <p className="text-stone-300 mb-5 font-serif border-l-2 border-yellow-600/30 pl-4">
              Mục tiêu: Xây dựng bước đầu cơ sở vật chất - kỹ thuật của CNXH, hoàn thành cơ bản cải tạo XHCN.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-black/40 rounded-sm p-3 text-center border border-stone-800 hover:border-stone-500 transition-colors group">
                <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Wheat className="text-green-500" size={28} />
                </div>
                <p className="text-xs text-stone-300 font-bold uppercase">Gió Đại Phong</p>
                <p className="text-[10px] text-stone-500">Nông nghiệp</p>
              </div>
              <div className="bg-black/40 rounded-sm p-3 text-center border border-stone-800 hover:border-stone-500 transition-colors group">
                <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Hammer className="text-blue-500" size={28} />
                </div>
                <p className="text-xs text-stone-300 font-bold uppercase">Sóng Duyên Hải</p>
                <p className="text-[10px] text-stone-500">Công nghiệp</p>
              </div>
              <div className="bg-black/40 rounded-sm p-3 text-center border border-stone-800 hover:border-stone-500 transition-colors group">
                <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Star className="text-yellow-500" size={28} fill="currentColor" />
                </div>
                <p className="text-xs text-stone-300 font-bold uppercase">Ba Nhất</p>
                <p className="text-[10px] text-stone-500">Quân đội</p>
              </div>
              <div className="bg-black/40 rounded-sm p-3 text-center border border-stone-800 hover:border-stone-500 transition-colors group">
                <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Heart className="text-red-500" size={28} fill="currentColor" />
                </div>
                <p className="text-xs text-stone-300 font-bold uppercase">Vì miền Nam</p>
                <p className="text-[10px] text-stone-500">Toàn dân</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'miennam',
      title: 'III. Cách mạng miền Nam - Đánh bại "Chiến tranh đặc biệt"',
      icon: <Sword size={24} />,
      content: (
        <div className="space-y-6">
          {/* Âm mưu của Mỹ */}
          <div className="bg-red-950/20 rounded-sm p-5 border border-red-900/30">
            <h4 className="font-bold text-red-500 text-lg mb-3 font-serif uppercase tracking-wider flex items-center gap-2">
               <AlertTriangle size={20} />
               Chiến lược "Chiến tranh đặc biệt" của Mỹ
            </h4>
            <p className="text-stone-300 mb-3">
              Từ năm 1961, Mỹ thực hiện chiến lược xâm lược thực dân mới:
            </p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="text-red-500 mt-0.5" />
                Dùng quân đội Sài Gòn làm lực lượng chủ yếu
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="text-red-500 mt-0.5" />
                Cố vấn quân sự Mỹ chỉ huy, vũ khí Mỹ trang bị
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="text-red-500 mt-0.5" />
                <strong>"Ấp chiến lược"</strong>: dồn dân, lập ấp có hàng rào, tháp canh - "tát nước bắt cá"
              </li>
            </ul>
          </div>

          {/* Đường lối đấu tranh */}
          <div className="bg-stone-900/40 rounded-sm p-5 border border-stone-700">
            <h4 className="font-bold text-green-500 text-lg mb-4 font-serif uppercase tracking-wider flex items-center gap-2">
               <ShieldAlert size={20} />
               Đường lối đấu tranh của Đảng
            </h4>
            <p className="text-stone-300 mb-4">
              Phương châm: <strong className={textGold}>"Hai chân, Ba mũi, Ba vùng"</strong>
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-black/50 rounded-sm p-4 border border-stone-800 hover:border-blue-500/30 transition-colors">
                <h5 className="font-bold text-blue-400 mb-2 uppercase text-xs tracking-widest flex items-center gap-2">
                  <Footprints size={16} /> Hai chân
                </h5>
                <ul className="text-xs text-stone-400 space-y-1 font-serif">
                  <li>• Đấu tranh chính trị</li>
                  <li>• Đấu tranh vũ trang</li>
                </ul>
              </div>
              <div className="bg-black/50 rounded-sm p-4 border border-stone-800 hover:border-purple-500/30 transition-colors">
                <h5 className="font-bold text-purple-400 mb-2 uppercase text-xs tracking-widest flex items-center gap-2">
                  <Swords size={16} /> Ba mũi giáp công
                </h5>
                <ul className="text-xs text-stone-400 space-y-1 font-serif">
                  <li>• Quân sự</li>
                  <li>• Chính trị</li>
                  <li>• Binh vận</li>
                </ul>
              </div>
              <div className="bg-black/50 rounded-sm p-4 border border-stone-800 hover:border-orange-500/30 transition-colors">
                <h5 className="font-bold text-orange-400 mb-2 uppercase text-xs tracking-widest flex items-center gap-2">
                  <Map size={16} /> Ba vùng chiến lược
                </h5>
                <ul className="text-xs text-stone-400 space-y-1 font-serif">
                  <li>• Rừng núi</li>
                  <li>• Nông thôn đồng bằng</li>
                  <li>• Đô thị</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Các chiến thắng */}
          <div className="bg-yellow-900/10 rounded-sm p-5 border border-yellow-800/30">
            <h4 className={`${textGold} font-bold text-lg mb-4 font-serif uppercase tracking-wider flex items-center gap-2`}>
               <Trophy size={20} /> 
               Các chiến thắng tiêu biểu
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-black/40 rounded-sm p-3 border border-stone-800 hover:bg-stone-800 transition-colors">
                <div className="w-16 h-16 rounded-full bg-red-900/80 flex items-center justify-center flex-shrink-0 border-2 border-red-700 text-white">
                  <div className="text-center leading-none">
                     <span className="block text-[10px] font-bold">02/01</span>
                     <span className="block text-xs font-bold">1963</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-stone-200 font-serif uppercase">Chiến thắng Ấp Bắc</h5>
                  <p className="text-xs text-stone-500">Mốc mở đầu, chứng minh quân giải phóng có thể đánh thắng quân đội Sài Gòn hiện đại.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-black/40 rounded-sm p-3 border border-stone-800 hover:bg-stone-800 transition-colors">
                <div className="w-16 h-16 rounded-full bg-orange-900/80 flex items-center justify-center flex-shrink-0 border-2 border-orange-700 text-white">
                  <div className="text-center leading-none">
                     <span className="block text-[10px] font-bold">12/</span>
                     <span className="block text-xs font-bold">1964</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-stone-200 font-serif uppercase">Chiến thắng Bình Giã</h5>
                  <p className="text-xs text-stone-500">Đánh bại chiến thuật "trực thăng vận", "thiết xa vận" của Mỹ-Ngụy.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-black/40 rounded-sm p-3 border border-stone-800 hover:bg-stone-800 transition-colors">
                <div className="w-16 h-16 rounded-full bg-purple-900/80 flex items-center justify-center flex-shrink-0 border-2 border-purple-700 text-white">
                  <div className="text-center leading-none">
                     <span className="block text-xs font-bold">1965</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-stone-200 font-serif uppercase">Ba Gia, Đồng Xoài</h5>
                  <p className="text-xs text-stone-500">Làm phá sản từng bước hệ thống "ấp chiến lược" của Mỹ-Ngụy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ketluan',
      title: 'IV. Ý nghĩa lịch sử',
      icon: <Award size={24} />,
      content: (
        <div className="space-y-5">
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div 
              className="bg-stone-900 rounded-sm p-5 border border-green-800/30 hover:border-green-600 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-green-900/50 flex items-center justify-center mb-3 border border-green-700">
                <span className="text-xl font-serif font-bold text-green-500">1</span>
              </div>
              <h4 className="font-bold text-green-500 mb-2 font-serif uppercase text-sm">Miền Bắc XHCN</h4>
              <p className="text-sm text-stone-400">
                Hoàn thành bước đầu xây dựng cơ sở vật chất - kỹ thuật, trở thành <strong className="text-stone-200">hậu phương lớn, căn cứ địa vững chắc</strong> cho cách mạng cả nước.
              </p>
            </motion.div>

            <motion.div 
              className="bg-stone-900 rounded-sm p-5 border border-red-800/30 hover:border-red-600 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-red-900/50 flex items-center justify-center mb-3 border border-red-700">
                <span className="text-xl font-serif font-bold text-red-500">2</span>
              </div>
              <h4 className="font-bold text-red-500 mb-2 font-serif uppercase text-sm">Cách mạng miền Nam</h4>
              <p className="text-sm text-stone-400">
                Giữ vững và phát triển thế tiến công, <strong className="text-stone-200">làm thất bại chiến lược "Chiến tranh đặc biệt"</strong> của Mỹ.
              </p>
            </motion.div>

            <motion.div 
              className="bg-stone-900 rounded-sm p-5 border border-yellow-800/30 hover:border-yellow-600 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-yellow-900/50 flex items-center justify-center mb-3 border border-yellow-700">
                <span className="text-xl font-serif font-bold text-yellow-500">3</span>
              </div>
              <h4 className="font-bold text-yellow-500 mb-2 font-serif uppercase text-sm">Đường lối đúng đắn</h4>
              <p className="text-sm text-stone-400">
                Khẳng định tính đúng đắn của <strong className="text-stone-200">kết hợp độc lập dân tộc với CNXH</strong>, tiến hành đồng thời hai chiến lược.
              </p>
            </motion.div>
          </div>

          <div className="bg-gradient-to-r from-red-900/20 via-black to-red-900/20 rounded-sm p-6 border-y border-red-900/30 text-center">
            <p className="text-lg text-stone-300 leading-relaxed font-serif italic">
              Nhờ những thành tựu của giai đoạn <strong className={textGold}>1961-1965</strong>, cách mạng nước ta đã tạo được cơ sở vững chắc để bước vào cuộc đọ sức quyết liệt hơn với đế quốc Mỹ, tiến tới <strong className="text-stone-100 not-italic uppercase">đại thắng mùa Xuân 1975</strong>, giải phóng miền Nam, thống nhất đất nước.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="knowledge" className="py-20 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black min-h-screen text-stone-200">
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-yellow-600/30 bg-black/50 backdrop-blur-md px-6 py-2 rounded-sm text-xs md:text-sm font-serif font-semibold mb-6 text-yellow-500 uppercase tracking-[0.2em] shadow-lg">
            <BookOpen size={16} />
            Tổng hợp kiến thức
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-stone-100 mb-4 drop-shadow-xl leading-tight">
            Xây dựng CNXH ở miền Bắc, phát triển thế tiến công
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700 block mt-2">của cách mạng miền Nam (1961-1965)</span>
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-stone-500 to-transparent mx-auto my-6"></div>
          <p className="text-stone-400 max-w-2xl mx-auto font-serif italic text-lg">
            Giai đoạn quan trọng trong lịch sử cách mạng Việt Nam, đặt nền móng cho cuộc kháng chiến chống Mỹ cứu nước
          </p>
        </motion.div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border transition-all duration-300 overflow-hidden ${
                expandedSection === section.id 
                ? 'bg-stone-900/90 border-yellow-600/50 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]' 
                : 'bg-stone-900/40 border-stone-800 hover:border-stone-600'
              } rounded-sm`}
            >
              {/* Section Header */}
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full flex items-center justify-between p-5 md:p-6 group"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 rounded-sm ${
                    expandedSection === section.id 
                    ? 'bg-yellow-900/30 text-yellow-500 border-yellow-600' 
                    : 'bg-black/30 text-stone-500 border-stone-700 group-hover:text-stone-300'
                  }`}>
                    {section.icon}
                  </div>
                  <h3 className={`font-serif font-bold text-lg md:text-xl text-left transition-colors ${
                    expandedSection === section.id ? 'text-yellow-500' : 'text-stone-300 group-hover:text-stone-100'
                  }`}>
                    {section.title}
                  </h3>
                </div>
                {expandedSection === section.id ? (
                  <ChevronUp className="flex-shrink-0 text-yellow-500" size={24} />
                ) : (
                  <ChevronDown className="flex-shrink-0 text-stone-600 group-hover:text-stone-400" size={24} />
                )}
              </button>

              {/* Section Content */}
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 md:p-8 pt-0 border-t border-stone-800/50">
                      <div className="mt-6">
                        {section.content}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-stone-800 pt-10"
        >
          <div className="text-center group cursor-default">
            <p className="text-4xl font-black text-stone-700 font-serif group-hover:text-yellow-600 transition-colors duration-500">1960</p>
            <p className="text-xs text-stone-500 uppercase tracking-[0.2em] mt-2 group-hover:text-stone-300">Đại hội III</p>
          </div>
          <div className="text-center group cursor-default">
            <p className="text-4xl font-black text-stone-700 font-serif group-hover:text-green-600 transition-colors duration-500">5</p>
            <p className="text-xs text-stone-500 uppercase tracking-[0.2em] mt-2 group-hover:text-stone-300">Năm kế hoạch</p>
          </div>
          <div className="text-center group cursor-default">
            <p className="text-4xl font-black text-stone-700 font-serif group-hover:text-red-600 transition-colors duration-500">1963</p>
            <p className="text-xs text-stone-500 uppercase tracking-[0.2em] mt-2 group-hover:text-stone-300">Chiến thắng Ấp Bắc</p>
          </div>
          <div className="text-center group cursor-default">
            <p className="text-4xl font-black text-stone-700 font-serif group-hover:text-purple-600 transition-colors duration-500">1965</p>
            <p className="text-xs text-stone-500 uppercase tracking-[0.2em] mt-2 group-hover:text-stone-300">Phá sản CTĐB</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Knowledge;