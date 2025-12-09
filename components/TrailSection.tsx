import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Star,
    Anchor,
    TreePine,
    Target,
    Flame,
    X,
    ChevronDown,
    Navigation,
    Heart
} from 'lucide-react';

// Các điểm trên đường Trường Sơn
const TRAIL_POINTS = [
    {
        id: 'hanoi',
        name: 'Hà Nội',
        subtitle: 'Trung ương Đảng chỉ đạo chiến lược',
        icon: Star,
        color: 'from-yellow-500 to-amber-600',
        glowColor: 'rgba(251, 191, 36, 0.6)',
        year: '1954-1965',
        story: 'Trung ương Đảng tại Hà Nội hoạch định chiến lược cách mạng miền Nam, xây dựng hậu phương lớn miền Bắc, tổ chức chi viện sức người sức của cho tiền tuyến.',
        image: '🏛️',
        photo: 'https://quocphongthudo.vn/upload/2001606/20200623/3b944af60ca0a3d7d592ce555d379bcaimages.%2C%3Bq3.jpg-DNP2801019830.jpg',
        photoCaption: 'Chủ tịch Hồ Chí Minh - Người lãnh đạo tối cao',
        details: ['Nghị quyết 15 (1959)', 'Đại hội Đảng III (1960)', 'Chỉ đạo toàn diện']
    },
    {
        id: 'd559',
        name: 'Đoàn 559',
        subtitle: 'Mở tuyến đường Trường Sơn (1959)',
        icon: TreePine,
        color: 'from-green-500 to-emerald-700',
        glowColor: 'rgba(34, 197, 94, 0.6)',
        year: '19/5/1959',
        story: 'Đoàn 559 được thành lập ngày 19/5/1959, mở tuyến đường Trường Sơn huyền thoại - con đường huyết mạch nối liền hai miền Nam Bắc.',
        image: '🌲',
        photo: 'https://media.vov.vn/sites/default/files/styles/large/public/2024-05/866dfbe86f0bce55971a.jpg',
        photoCaption: 'Đường Trường Sơn - Đường mòn Hồ Chí Minh',
        details: ['Vượt 20.000 km đường', 'Hàng triệu tấn vật tư', 'Hàng vạn chiến sĩ']
    },
    {
        id: 'd759',
        name: 'Đoàn 759',
        subtitle: 'Đường Hồ Chí Minh trên biển (1961)',
        icon: Anchor,
        color: 'from-blue-500 to-cyan-700',
        glowColor: 'rgba(59, 130, 246, 0.6)',
        year: '23/10/1961',
        story: 'Đoàn 759 mở tuyến vận tải chiến lược trên biển, bí mật chở vũ khí từ miền Bắc vào các bến bãi miền Nam, góp phần quan trọng vào chiến thắng.',
        image: '⚓',
        photo: 'https://btgdv.cantho.gov.vn/uploads/news/2023_10/23-10-tau.jpg',
        photoCaption: 'Tàu không số vận chuyển vũ khí',
        details: ['Tàu không số', 'Vận chuyển vũ khí', 'Bí mật, táo bạo']
    },
    {
        id: 'khuvtrithien',
        name: 'Khu V - Trị Thiên',
        subtitle: 'Tuyến lửa ác liệt',
        icon: Flame,
        color: 'from-orange-500 to-red-600',
        glowColor: 'rgba(249, 115, 22, 0.6)',
        year: '1954-1965',
        story: 'Vùng giới tuyến 17, nơi chia cắt hai miền. Đây là tuyến lửa ác liệt nhất, nơi quân dân ta kiên cường bám trụ, chiến đấu chống Mỹ-Diệm.',
        image: '🔥',
        photo: 'https://file3.qdnd.vn/data/images/0/2022/04/22/phamdiep_kh/danh%20chien%20cu%20diem%20dau%20mau%20trong%20chien%20dich%20quang%20tri%201972.jpg?dpi=150&quality=100&w=870',
        photoCaption: 'Cầu Hiền Lương - Vĩ tuyến 17',
        details: ['Vĩ tuyến 17', 'Đấu tranh chính trị', 'Kiên cường bám trụ']
    },
    {
        id: 'cancur',
        name: 'Căn cứ R (Tây Ninh)',
        subtitle: 'Đầu não miền Nam',
        icon: Target,
        color: 'from-purple-500 to-violet-700',
        glowColor: 'rgba(168, 85, 247, 0.6)',
        year: '1961',
        story: 'Căn cứ R tại Tây Ninh là nơi đặt cơ quan lãnh đạo Trung ương Cục miền Nam, chỉ đạo toàn bộ phong trào cách mạng miền Nam.',
        image: '🎯',
        photo: 'https://static.cand.com.vn/Files/Image/Content/chienthang/2016/04/28/0c6da400-02c2-420e-bdcf-ecf36944c730.jpg',
        photoCaption: 'Căn cứ địa cách mạng miền Nam',
        details: ['Trung ương Cục', 'Chỉ đạo miền Nam', 'Căn cứ địa vững chắc']
    },
    {
        id: 'rungsac',
        name: 'Rừng Sác',
        subtitle: 'Đặc công đánh tàu Mỹ',
        icon: Navigation,
        color: 'from-teal-500 to-emerald-700',
        glowColor: 'rgba(20, 184, 166, 0.6)',
        year: '1963-1965',
        story: 'Rừng Sác - căn cứ địa của lực lượng đặc công, nơi các chiến sĩ anh dũng tấn công tàu chiến Mỹ ngay trên sông Lòng Tàu, cửa ngõ Sài Gòn.',
        image: '🌿',
        photo: 'https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/dataimages/202304/original/images2525754_5_thay.jpg',
        photoCaption: 'Rừng Sác - Căn cứ đặc công',
        details: ['Đặc công nước', 'Đánh tàu Mỹ', 'Chiến công vang dội']
    },
];

// Component cho popup chi tiết
const DetailPopup: React.FC<{
    point: typeof TRAIL_POINTS[0];
    onClose: () => void;
}> = ({ point, onClose }) => {
    const Icon = point.icon;

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
                className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full p-6 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors z-10"
                >
                    <X size={18} className="text-slate-300" />
                </button>

                {/* Photo */}
                {point.photo && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6 rounded-xl overflow-hidden"
                    >
                        <div className="relative">
                            <img
                                src={point.photo}
                                alt={point.name}
                                className="w-full h-48 md:h-56 object-cover"
                                onError={(e) => {
                                    // Fallback nếu ảnh không load được
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                            {point.photoCaption && (
                                <p className="absolute bottom-2 left-3 right-3 text-xs text-slate-300 italic">
                                    {point.photoCaption}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                    <motion.div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                        style={{ boxShadow: `0 0 30px ${point.glowColor}` }}
                        animate={{
                            boxShadow: [`0 0 20px ${point.glowColor}`, `0 0 40px ${point.glowColor}`, `0 0 20px ${point.glowColor}`]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-3xl">{point.image}</span>
                    </motion.div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-serif font-bold text-party-gold">{point.name}</h3>
                        <p className="text-slate-400">{point.subtitle}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-party-red/20 text-party-red text-xs font-semibold rounded">
                            {point.year}
                        </span>
                    </div>
                </div>

                {/* Story */}
                <p className="text-slate-300 leading-relaxed mb-6">
                    {point.story}
                </p>

                {/* Details */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {point.details.map((detail, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${point.color} text-white shadow-lg`}
                        >
                            {detail}
                        </motion.span>
                    ))}
                </div>

                {/* Decorative line */}
                <div className="pt-4 border-t border-slate-700">
                    <p className="text-xs text-slate-500 text-center italic">
                        "Mỗi bước chân trên đường Trường Sơn là một bước tiến tới ngày thống nhất"
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const TrailSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePoint, setActivePoint] = useState<string | null>(null);
    const [showFinalMessage, setShowFinalMessage] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
    const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0.3, 1]);

    // Kiểm tra khi scroll đến cuối
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            if (v > 0.85) {
                setShowFinalMessage(true);
            } else {
                setShowFinalMessage(false);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    const selectedPoint = TRAIL_POINTS.find(p => p.id === activePoint);

    return (
        <section
            ref={containerRef}
            id="map"
            className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Stars */}
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: 0.3 + Math.random() * 0.5,
                        }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Header Section - Fixed at top */}
            <div className="relative z-20 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-party-red/20 text-party-red px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-party-red/30">
                            <Navigation size={18} />
                            Hành trình lịch sử
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3">
                            Đường dây lãnh đạo <span className="text-party-gold">xuyên hai miền</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Con đường huyền thoại nối liền trái tim miền Bắc với tiền tuyến miền Nam
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Trail Content */}
            <div className="relative z-10 pb-20">
                <div className="container mx-auto px-4">
                    {/* Trail visualization */}
                    <div className="relative max-w-4xl mx-auto">
                        {/* Main trail path */}
                        <svg
                            className="absolute left-1/2 -translate-x-1/2 h-full w-8"
                            style={{ top: 0 }}
                            viewBox="0 0 32 600"
                            preserveAspectRatio="none"
                        >
                            {/* Background path */}
                            <path
                                d="M 16 0 Q 8 100, 16 150 Q 24 200, 16 250 Q 8 300, 16 350 Q 24 400, 16 450 Q 8 500, 16 550 L 16 600"
                                fill="none"
                                stroke="rgba(100, 100, 100, 0.3)"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            {/* Animated glow path */}
                            <motion.path
                                d="M 16 0 Q 8 100, 16 150 Q 24 200, 16 250 Q 8 300, 16 350 Q 24 400, 16 450 Q 8 500, 16 550 L 16 600"
                                fill="none"
                                stroke="url(#trailGradient)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                style={{
                                    pathLength: pathProgress,
                                    filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))',
                                }}
                            />
                            <defs>
                                <linearGradient id="trailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#DC2626" />
                                    <stop offset="50%" stopColor="#fbbf24" />
                                    <stop offset="100%" stopColor="#DC2626" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Trail points */}
                        <div className="relative z-10 space-y-16 py-8">
                            {TRAIL_POINTS.map((point, index) => {
                                const Icon = point.icon;
                                const isLeft = index % 2 === 0;

                                return (
                                    <motion.div
                                        key={point.id}
                                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className={`flex items-center gap-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                                    >
                                        {/* Content card */}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setActivePoint(point.id)}
                                            className={`flex-1 max-w-md cursor-pointer group ${isLeft ? 'text-right' : 'text-left'}`}
                                        >
                                            <div className={`rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl overflow-hidden`}
                                                style={{
                                                    boxShadow: `0 0 0 rgba(0,0,0,0)`,
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.boxShadow = `0 0 30px ${point.glowColor}`;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
                                                }}
                                            >
                                                {/* Photo */}
                                                {point.photo && (
                                                    <div className="relative h-36 overflow-hidden">
                                                        <img
                                                            src={point.photo}
                                                            alt={point.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                                                            }}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent" />
                                                        {point.photoCaption && (
                                                            <p className="absolute bottom-1 left-2 right-2 text-[10px] text-slate-300/80 italic truncate">
                                                                {point.photoCaption}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                                {/* Text content */}
                                                <div className="p-4">
                                                    <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                                                        <span className="text-2xl">{point.image}</span>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-party-gold group-hover:text-yellow-400 transition-colors">
                                                                {point.name}
                                                            </h3>
                                                            <p className="text-xs text-slate-500">{point.year}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-slate-400 line-clamp-2">
                                                        {point.subtitle}
                                                    </p>
                                                    <p className={`text-xs text-party-red mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${isLeft ? 'text-right' : 'text-left'}`}>
                                                        Click để xem chi tiết →
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Center marker */}
                                        <motion.div
                                            whileHover={{ scale: 1.3 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setActivePoint(point.id)}
                                            className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${point.color} flex items-center justify-center cursor-pointer shadow-lg z-20`}
                                            style={{
                                                boxShadow: `0 0 20px ${point.glowColor}`,
                                            }}
                                        >
                                            <Icon className="text-white" size={20} />
                                            {/* Pulse effect */}
                                            <motion.div
                                                className={`absolute inset-0 rounded-full bg-gradient-to-br ${point.color}`}
                                                animate={{
                                                    scale: [1, 1.5, 1],
                                                    opacity: [0.5, 0, 0.5],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.3,
                                                }}
                                            />
                                        </motion.div>

                                        {/* Spacer for alignment */}
                                        <div className="flex-1 max-w-sm" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Final message at bottom */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-20 py-16"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-gradient-to-r from-party-red via-party-gold to-party-red p-[2px] rounded-2xl">
                            <div className="bg-slate-900/95 backdrop-blur-md px-8 py-6 rounded-2xl text-center">
                                <div className="flex items-center justify-center gap-4">
                                    <Heart className="text-party-red animate-pulse" size={28} />
                                    <div>
                                        <p className="text-xl md:text-2xl font-serif text-white mb-2">
                                            Từ <span className="text-party-red font-bold">trái tim miền Bắc</span> →
                                            tiếp sức <span className="text-party-gold font-bold">miền Nam</span>
                                        </p>
                                        <p className="text-party-gold font-bold text-2xl md:text-3xl">
                                            → Làm nên Đại thắng 1975
                                        </p>
                                    </div>
                                    <Heart className="text-party-gold animate-pulse" size={28} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Detail popup */}
            <AnimatePresence>
                {selectedPoint && (
                    <DetailPopup
                        point={selectedPoint}
                        onClose={() => setActivePoint(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default TrailSection;