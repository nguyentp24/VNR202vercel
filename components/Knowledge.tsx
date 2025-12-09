import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Flag, Factory, Sword, Award, ChevronDown, ChevronUp, Quote, Target, Users, Landmark, Flame } from 'lucide-react';

interface KnowledgeSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  content: React.ReactNode;
}

const Knowledge: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('intro');

  const sections: KnowledgeSection[] = [
    {
      id: 'intro',
      title: 'Bối cảnh lịch sử',
      icon: <BookOpen size={24} />,
      color: 'from-blue-600 to-blue-800',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Sau <strong className="text-party-gold">Hiệp định Giơnevơ 1954</strong>, đất nước ta tạm thời chia cắt làm hai miền:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4">
              <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                <Flag size={18} /> Miền Bắc
              </h4>
              <p className="text-sm text-slate-400">Được giải phóng, bước vào thời kỳ quá độ lên chủ nghĩa xã hội.</p>
            </div>
            <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4">
              <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                <Flame size={18} /> Miền Nam
              </h4>
              <p className="text-sm text-slate-400">Tiền tuyến nóng bỏng chống lại đế quốc Mỹ và chính quyền Sài Gòn.</p>
            </div>
          </div>
          <div className="bg-party-gold/10 border border-party-gold/30 rounded-xl p-4 mt-4">
            <div className="flex items-start gap-3">
              <Quote className="text-party-gold flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-party-gold italic">
                  "Đại hội lần này là Đại hội xây dựng chủ nghĩa xã hội ở miền Bắc và đấu tranh hòa bình thống nhất nước nhà."
                </p>
                <p className="text-sm text-slate-500 mt-2">— Chủ tịch Hồ Chí Minh, Đại hội III (9/1960)</p>
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
      color: 'from-purple-600 to-purple-800',
      content: (
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <h4 className="font-bold text-white text-lg mb-3">Đường lối chung của Đại hội III</h4>
            <p className="text-slate-300 leading-relaxed">
              Cách mạng nước ta phải <strong className="text-party-gold">đồng thời tiến hành hai chiến lược</strong> khác nhau ở hai miền nhưng cùng hướng tới mục tiêu chung: <em>giải phóng miền Nam, hòa bình, thống nhất Tổ quốc</em>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-xl p-5 border border-green-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                  <Factory size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-green-400 text-lg">Miền Bắc</h4>
                  <p className="text-xs text-green-300/70">Cách mạng XHCN</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Xây dựng tiềm lực kinh tế, chính trị, quốc phòng
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Trở thành căn cứ địa của cả nước
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Là hậu phương lớn cho miền Nam
                </li>
              </ul>
              <div className="mt-4 p-3 bg-green-800/30 rounded-lg">
                <p className="text-green-300 text-sm font-semibold">
                  🎯 Vai trò: <span className="text-white">Quyết định nhất</span>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 rounded-xl p-5 border border-red-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <Sword size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-red-400 text-lg">Miền Nam</h4>
                  <p className="text-xs text-red-300/70">Cách mạng dân tộc dân chủ nhân dân</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  Đánh đổ đế quốc Mỹ và chính quyền tay sai
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  Giành chính quyền về tay nhân dân
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  Thực hiện hòa bình, thống nhất đất nước
                </li>
              </ul>
              <div className="mt-4 p-3 bg-red-800/30 rounded-lg">
                <p className="text-red-300 text-sm font-semibold">
                  🎯 Vai trò: <span className="text-white">Quyết định trực tiếp</span>
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
      color: 'from-green-600 to-green-800',
      content: (
        <div className="space-y-6">
          {/* Đặc điểm */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <h4 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Landmark size={20} className="text-party-gold" />
              Đặc điểm xuất phát
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>• Kinh tế nông nghiệp lạc hậu, cơ sở vật chất nghèo nàn</li>
              <li>• Chiến tranh tàn phá nặng nề</li>
              <li>• Tiến lên CNXH không trải qua giai đoạn phát triển TBCN</li>
            </ul>
          </div>

          {/* Nội dung xây dựng */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-700/30">
              <h5 className="font-bold text-blue-400 mb-2">🏭 Kinh tế</h5>
              <p className="text-sm text-slate-400">
                Công nghiệp hóa XHCN, ưu tiên công nghiệp nặng, gắn với phát triển nông nghiệp, thủ công nghiệp.
              </p>
            </div>
            <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-700/30">
              <h5 className="font-bold text-purple-400 mb-2">🔄 Quan hệ sản xuất</h5>
              <p className="text-sm text-slate-400">
                Hoàn thành cải tạo XHCN: hợp tác hóa nông nghiệp, cải tạo công thương nghiệp tư bản tư doanh.
              </p>
            </div>
            <div className="bg-red-900/20 rounded-xl p-4 border border-red-700/30">
              <h5 className="font-bold text-red-400 mb-2">🏛️ Chính trị</h5>
              <p className="text-sm text-slate-400">
                Củng cố chính quyền dân chủ nhân dân, xây dựng nhà nước XHCN của dân, do dân, vì dân.
              </p>
            </div>
            <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-700/30">
              <h5 className="font-bold text-yellow-400 mb-2">📚 Văn hóa - Tư tưởng</h5>
              <p className="text-sm text-slate-400">
                Xóa bỏ tàn dư phong kiến, thực dân. Xây dựng con người mới, nền văn hóa tiên tiến.
              </p>
            </div>
          </div>

          {/* Kế hoạch 5 năm */}
          <div className="bg-gradient-to-r from-party-gold/20 to-party-red/20 rounded-xl p-5 border border-party-gold/30">
            <h4 className="font-bold text-party-gold text-lg mb-3">📋 Kế hoạch 5 năm lần thứ nhất (1961-1965)</h4>
            <p className="text-slate-300 mb-4">
              Mục tiêu: Xây dựng bước đầu cơ sở vật chất - kỹ thuật của CNXH, hoàn thành cơ bản cải tạo XHCN.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-black/30 rounded-lg p-3 text-center">
                <p className="text-2xl mb-1">🌾</p>
                <p className="text-xs text-slate-400">Gió Đại Phong</p>
                <p className="text-[10px] text-slate-500">Nông nghiệp</p>
              </div>
              <div className="bg-black/30 rounded-lg p-3 text-center">
                <p className="text-2xl mb-1">🏭</p>
                <p className="text-xs text-slate-400">Sóng Duyên Hải</p>
                <p className="text-[10px] text-slate-500">Công nghiệp</p>
              </div>
              <div className="bg-black/30 rounded-lg p-3 text-center">
                <p className="text-2xl mb-1">⭐</p>
                <p className="text-xs text-slate-400">Ba Nhất</p>
                <p className="text-[10px] text-slate-500">Quân đội</p>
              </div>
              <div className="bg-black/30 rounded-lg p-3 text-center">
                <p className="text-2xl mb-1">❤️</p>
                <p className="text-xs text-slate-400">Vì miền Nam</p>
                <p className="text-[10px] text-slate-500">Toàn dân</p>
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
      color: 'from-red-600 to-red-800',
      content: (
        <div className="space-y-6">
          {/* Âm mưu của Mỹ */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-red-700/30">
            <h4 className="font-bold text-red-400 text-lg mb-3">⚠️ Chiến lược "Chiến tranh đặc biệt" của Mỹ</h4>
            <p className="text-slate-300 mb-3">
              Từ năm 1961, Mỹ thực hiện chiến lược xâm lược thực dân mới:
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400">→</span>
                Dùng quân đội Sài Gòn làm lực lượng chủ yếu
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">→</span>
                Cố vấn quân sự Mỹ chỉ huy, vũ khí Mỹ trang bị
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">→</span>
                <strong>"Ấp chiến lược"</strong>: dồn dân, lập ấp có hàng rào, tháp canh - "tát nước bắt cá"
              </li>
            </ul>
          </div>

          {/* Đường lối đấu tranh */}
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-5 border border-green-700/30">
            <h4 className="font-bold text-green-400 text-lg mb-4">✊ Đường lối đấu tranh của Đảng</h4>
            <p className="text-slate-300 mb-4">
              Phương châm: <strong className="text-party-gold">"Hai chân, Ba mũi, Ba vùng"</strong>
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-black/30 rounded-lg p-4">
                <h5 className="font-bold text-blue-400 mb-2">👣 Hai chân</h5>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Đấu tranh chính trị</li>
                  <li>• Đấu tranh vũ trang</li>
                </ul>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <h5 className="font-bold text-purple-400 mb-2">⚔️ Ba mũi giáp công</h5>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Quân sự</li>
                  <li>• Chính trị</li>
                  <li>• Binh vận</li>
                </ul>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <h5 className="font-bold text-orange-400 mb-2">🗺️ Ba vùng chiến lược</h5>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Rừng núi</li>
                  <li>• Nông thôn đồng bằng</li>
                  <li>• Đô thị</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Các chiến thắng */}
          <div className="bg-party-gold/10 rounded-xl p-5 border border-party-gold/30">
            <h4 className="font-bold text-party-gold text-lg mb-4">🏆 Các chiến thắng tiêu biểu</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-black/20 rounded-lg p-3">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs text-center">2/1<br/>1963</span>
                </div>
                <div>
                  <h5 className="font-bold text-white">Chiến thắng Ấp Bắc</h5>
                  <p className="text-xs text-slate-400">Mốc mở đầu, chứng minh quân giải phóng có thể đánh thắng quân đội Sài Gòn hiện đại.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-black/20 rounded-lg p-3">
                <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs text-center">12/<br/>1964</span>
                </div>
                <div>
                  <h5 className="font-bold text-white">Chiến thắng Bình Giã</h5>
                  <p className="text-xs text-slate-400">Đánh bại chiến thuật "trực thăng vận", "thiết xa vận" của Mỹ-Ngụy.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-black/20 rounded-lg p-3">
                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs text-center">1965</span>
                </div>
                <div>
                  <h5 className="font-bold text-white">Ba Gia, Đồng Xoài</h5>
                  <p className="text-xs text-slate-400">Làm phá sản từng bước hệ thống "ấp chiến lược" của Mỹ-Ngụy.</p>
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
      color: 'from-yellow-600 to-yellow-800',
      content: (
        <div className="space-y-5">
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div 
              className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-xl p-5 border border-green-600/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-3">
                <span className="text-xl">1</span>
              </div>
              <h4 className="font-bold text-green-400 mb-2">Miền Bắc XHCN</h4>
              <p className="text-sm text-slate-400">
                Hoàn thành bước đầu xây dựng cơ sở vật chất - kỹ thuật, trở thành <strong className="text-white">hậu phương lớn, căn cứ địa vững chắc</strong> cho cách mạng cả nước.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-red-900/50 to-red-800/30 rounded-xl p-5 border border-red-600/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-3">
                <span className="text-xl">2</span>
              </div>
              <h4 className="font-bold text-red-400 mb-2">Cách mạng miền Nam</h4>
              <p className="text-sm text-slate-400">
                Giữ vững và phát triển thế tiến công, <strong className="text-white">làm thất bại chiến lược "Chiến tranh đặc biệt"</strong> của Mỹ.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-party-gold/30 to-yellow-800/30 rounded-xl p-5 border border-party-gold/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-party-gold flex items-center justify-center mb-3">
                <span className="text-xl text-black">3</span>
              </div>
              <h4 className="font-bold text-party-gold mb-2">Đường lối đúng đắn</h4>
              <p className="text-sm text-slate-400">
                Khẳng định tính đúng đắn của <strong className="text-white">kết hợp độc lập dân tộc với CNXH</strong>, tiến hành đồng thời hai chiến lược.
              </p>
            </motion.div>
          </div>

          <div className="bg-gradient-to-r from-party-red/20 via-party-gold/20 to-party-red/20 rounded-xl p-6 border border-party-gold/30 text-center">
            <p className="text-lg text-slate-300 leading-relaxed">
              Nhờ những thành tựu của giai đoạn <strong className="text-party-gold">1961-1965</strong>, cách mạng nước ta đã tạo được cơ sở vững chắc để bước vào cuộc đọ sức quyết liệt hơn với đế quốc Mỹ, tiến tới <strong className="text-white">đại thắng mùa Xuân 1975</strong>, giải phóng miền Nam, thống nhất đất nước.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="knowledge" className="py-16 bg-gradient-to-b from-deep-dark via-slate-900 to-deep-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-party-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-party-gold rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-party-gold/20 text-party-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <BookOpen size={18} />
            Tổng hợp kiến thức
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-3">
            Xây dựng CNXH ở miền Bắc, phát triển thế tiến công
            <br />
            <span className="text-party-gold">của cách mạng miền Nam (1961-1965)</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Giai đoạn quan trọng trong lịch sử cách mạng Việt Nam, đặt nền móng cho cuộc kháng chiến chống Mỹ cứu nước
          </p>
        </motion.div>

        {/* Accordion Sections */}
        <div className="max-w-4xl mx-auto space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className={`w-full flex items-center justify-between p-5 transition-all duration-300 ${
                  expandedSection === section.id ? 'bg-gradient-to-r ' + section.color : 'hover:bg-slate-700/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    expandedSection === section.id ? 'bg-white/20' : 'bg-slate-700'
                  }`}>
                    {section.icon}
                  </div>
                  <h3 className="font-bold text-lg text-left">{section.title}</h3>
                </div>
                {expandedSection === section.id ? (
                  <ChevronUp className="flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="flex-shrink-0 text-slate-500" size={24} />
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
                    <div className="p-5 pt-0 border-t border-slate-700/50">
                      {section.content}
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
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-party-gold">1960</p>
            <p className="text-xs text-slate-500">Đại hội III</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-green-400">5</p>
            <p className="text-xs text-slate-500">Năm kế hoạch</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-red-400">1963</p>
            <p className="text-xs text-slate-500">Chiến thắng Ấp Bắc</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-purple-400">1965</p>
            <p className="text-xs text-slate-500">Phá sản CTĐB</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Knowledge;
