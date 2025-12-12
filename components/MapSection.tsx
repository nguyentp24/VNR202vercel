import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAP_POINTS } from '../constants';
import { MapPin, Anchor, Swords, Flag, Star, Flame, Navigation, Info, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';

// Hàm lấy icon theo type
const getPointIcon = (type?: string) => {
  switch (type) {
    case 'capital': return <Flag size={12} />;
    case 'military': return <Swords size={12} />;
    case 'navy': return <Anchor size={12} />;
    case 'route': return <Navigation size={12} />;
    case 'base': return <Star size={12} />;
    case 'special': return <Swords size={12} />;
    case 'uprising': return <Flame size={12} />;
    case 'battle': return <Swords size={12} />;
    default: return <MapPin size={12} />;
  }
};

// Hàm lấy màu theo type
const getPointColor = (type?: string, isActive?: boolean) => {
  if (isActive) return 'bg-party-gold';
  switch (type) {
    case 'capital': return 'bg-yellow-500';
    case 'military': return 'bg-green-600';
    case 'navy': return 'bg-blue-500';
    case 'route': return 'bg-orange-500';
    case 'base': return 'bg-purple-500';
    case 'special': return 'bg-red-600';
    case 'city': return 'bg-gray-400';
    case 'uprising': return 'bg-pink-500';
    case 'battle': return 'bg-red-500';
    default: return 'bg-party-red';
  }
};

// Tọa độ các điểm trên bản đồ (% so với kích thước ảnh)
// Dựa trên bản đồ Việt Nam thực tế
const MAP_COORDINATES: { [key: string]: { x: number; y: number } } = {
  'hn': { x: 44, y: 16 },           // Hà Nội
  'd559': { x: 55, y: 42 },         // Đoàn 559 (gần Hà Nội, điểm xuất phát)
  'd759': { x: 58, y: 18 },         // Đoàn 759 (Hải Phòng - đường biển)
  'ts1': { x: 50, y: 40 },          // Đường Trường Sơn - Bắc (Quảng Bình)
  'ts2': { x: 71, y: 66 },          // Đường Trường Sơn - Trung (Tây Nguyên)
  'ts3': { x: 67, y: 78 },          // Đường Trường Sơn - Nam
  'tay_nguyen': { x: 65, y: 59 },   // Tây Nguyên (Kon Tum, Gia Lai)
  'rung_sac': { x: 58, y: 82 },     // Rừng Sác (gần TP.HCM)
  'cu_chi': { x: 55, y: 81 },       // Củ Chi
  'sg': { x: 55, y: 82 },           // Sài Gòn
  'bt': { x: 52, y: 87 },           // Bến Tre
  'tay_ninh': { x: 46, y: 78 },     // Tây Ninh
  'ap_bac': { x: 49, y: 84 },       // Ấp Bắc (Mỹ Tho)
};

const MapSection: React.FC = () => {
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  
  // Zoom state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.5;
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
      if (newZoom === 1) setPan({ x: 0, y: 0 }); // Reset pan when fully zoomed out
      return newZoom;
    });
  };
  
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      const container = mapContainerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const maxPanX = (rect.width * (zoom - 1)) / 2;
        const maxPanY = (rect.height * (zoom - 1)) / 2;
        
        const newX = Math.max(-maxPanX, Math.min(maxPanX, e.clientX - dragStart.x));
        const newY = Math.max(-maxPanY, Math.min(maxPanY, e.clientY - dragStart.y));
        
        setPan({ x: newX, y: newY });
      }
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  return (
    <section id="map" className="py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-party-red/20 text-party-red px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-party-red/30">
            <Navigation size={18} />
            Bản đồ tương tác
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-party-gold mb-3">
            Đường dây lãnh đạo xuyên hai miền
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Mạng lưới chi viện từ miền Bắc vào miền Nam - Biểu tượng của ý chí thống nhất Tổ quốc
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Map Visual - Vietnam Image */}
          <div className="w-full lg:w-3/5 relative">
            <div className="relative mx-auto bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 shadow-2xl" style={{ maxWidth: '550px' }}>
              {/* Zoom Controls */}
              <div className="absolute top-6 right-6 z-30 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleZoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-all ${
                    zoom >= MAX_ZOOM 
                      ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' 
                      : 'bg-slate-800/90 hover:bg-party-gold hover:text-black text-white border border-slate-600'
                  }`}
                  title="Phóng to"
                >
                  <ZoomIn size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleZoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-all ${
                    zoom <= MIN_ZOOM 
                      ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' 
                      : 'bg-slate-800/90 hover:bg-party-gold hover:text-black text-white border border-slate-600'
                  }`}
                  title="Thu nhỏ"
                >
                  <ZoomOut size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="w-10 h-10 rounded-lg bg-slate-800/90 hover:bg-party-red text-white flex items-center justify-center shadow-lg border border-slate-600 transition-all"
                  title="Đặt lại"
                >
                  <RotateCcw size={18} />
                </motion.button>
              </div>
              
              {/* Zoom indicator */}
              <div className="absolute top-6 left-6 z-30 bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-600 text-sm">
                <span className="text-slate-400">Zoom: </span>
                <span className="text-party-gold font-bold">{Math.round(zoom * 100)}%</span>
              </div>
              
              {/* Drag hint when zoomed */}
              <AnimatePresence>
                {zoom > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-16 left-6 z-30 bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs flex items-center gap-2"
                  >
                    <Move size={14} />
                    Kéo để di chuyển
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Map container with image */}
              <div 
                ref={mapContainerRef}
                className={`relative overflow-hidden rounded-xl ${zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                {/* Zoomable Map Wrapper */}
                <div 
                  className="transition-transform duration-300 ease-out"
                  style={{ 
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Vietnam Map Image */}
                  <img 
                    src="https://www.mapsofworld.com/vietnam/maps/vietnam-political-map.jpg"
                    alt="Bản đồ Việt Nam"
                    className="w-full h-auto rounded-xl opacity-90 select-none"
                    style={{ filter: 'saturate(0.8) brightness(0.9)' }}
                    draggable={false}
                  />
                  
                  {/* Overlay for better visibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/50 rounded-xl pointer-events-none" />

                {/* SVG Overlay for paths and points */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Gradient Definitions */}
                  <defs>
                    <filter id="glowRed">
                      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="glowBlue">
                      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#DC2626" />
                      <stop offset="100%" stopColor="#991B1B" />
                    </linearGradient>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>

                  {/* Vĩ tuyến 17 - Demarcation Line */}
                  <motion.line 
                    x1="25" y1="42" x2="80" y2="42" 
                    stroke="#fbbf24" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <text x="67" y="24.5" fill="#fbbf24" fontSize="2.5" fontWeight="bold">Vĩ tuyến 17</text>

                  {/* Đường Hồ Chí Minh trên bộ (Đường Trường Sơn) */}
                  {/* Chạy dọc phía tây Việt Nam, men theo dãy Trường Sơn trong lãnh thổ VN */}
                  <motion.path
                    d="M 42 11
                       Q 44 13, 45 15
                       Q 46 18, 46 21
                       Q 45 24, 44 27
                       Q 43 33, 52 40
                       Q 51 39, 56 44
                       Q 61 47, 65 51
                       Q 65 51, 70 58
                       Q 76 70, 73 67
                       Q 75 69, 70 73
                       Q 62 79, 62 79
                       Q 53 84, 55 87"
                    stroke="url(#redGradient)"
                    strokeWidth="1.5"
                    fill="transparent"
                    strokeDasharray="4 2"
                    strokeLinecap="round"
                    filter="url(#glowRed)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                  
                  {/* Nhánh phụ vào Sài Gòn - Củ Chi - Tây Ninh */}
                  <motion.path
                    d="M 56 82, 49 78"
                    stroke="#DC2626"
                    strokeWidth="1"
                    fill="transparent"
                    strokeDasharray="2 1"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                  />

                  {/* Đường Hồ Chí Minh trên biển */}
                  {/* Ôm sát bờ biển phía đông Việt Nam từ Hải Phòng đến miền Nam */}
                  <motion.path
                    d="M 59 20
                       Q 58 19, 58 22
                       Q 57 25, 56 28
                       Q 55 32, 56 36
                       Q 59 40, 70 45 
                       Q 95 60, 79 84
                       Q 72 89, 65 85"
                    stroke="url(#blueGradient)"
                    strokeWidth="1.2"
                    fill="transparent"
                    strokeDasharray="3 1.5"
                    strokeLinecap="round"
                    filter="url(#glowBlue)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                  />

                  {/* Nhánh vào Rừng Sác và vùng ven biển miền Nam */}
                  <motion.path
                    d="M 66 85, 59 84"
                    stroke="#3B82F6"
                    strokeWidth="0.6"
                    fill="transparent"
                    strokeDasharray="1.5 0.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 3 }}
                  />
                </svg>

                {/* Map Points */}
                {MAP_POINTS.map((point, index) => {
                  const coords = MAP_COORDINATES[point.id] || { x: point.x, y: point.y };
                  const isActive = activePoint === point.id;
                  const isHovered = hoveredPoint === point.id;

                  return (
                    <motion.div
                      key={point.id}
                      className="absolute z-20"
                      style={{ 
                        left: `${coords.x}%`, 
                        top: `${coords.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.08, type: 'spring' }}
                    >
                      {/* Pulse effect for active */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-party-gold"
                          style={{ width: '100%', height: '100%' }}
                          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      
                      {/* Point button */}
                      <motion.button
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActivePoint(point.id)}
                        onMouseEnter={() => setHoveredPoint(point.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        className={`relative w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                          isActive 
                            ? 'bg-party-gold ring-2 ring-white ring-offset-1 ring-offset-slate-900' 
                            : getPointColor(point.type)
                        }`}
                        style={{
                          boxShadow: isActive 
                            ? '0 0 15px rgba(251, 191, 36, 0.6)' 
                            : '0 2px 8px rgba(0,0,0,0.4)'
                        }}
                      >
                        <span className="text-white text-[8px] md:text-[10px]">
                          {getPointIcon(point.type)}
                        </span>
                      </motion.button>

                      {/* Tooltip on hover */}
                      <AnimatePresence>
                        {(isHovered || isActive) && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            className="absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap bg-black/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl border border-slate-600 z-30"
                          >
                            <span className="text-party-gold">{point.label}</span>
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {/* Route Labels on map */}
                <div className="absolute left-[25%] top-[40%] transform -rotate-45 pointer-events-none">
                  <span className="text-red-500 text-[10px] font-bold bg-black/50 px-1.5 py-0.5 rounded whitespace-nowrap">
                    Đường Trường Sơn
                  </span>
                </div>
                <div className="absolute right-[18%] top-[45%] transform rotate-45 pointer-events-none">
                  <span className="text-blue-400 text-[9px] font-bold bg-black/50 px-1.5 py-0.5 rounded whitespace-nowrap">
                    Đường biển
                  </span>
                </div>
                </div>{/* End of zoomable wrapper */}
              </div>

              {/* Legend */}
              <div className="mt-4 bg-black/50 backdrop-blur-sm rounded-xl p-4">
                <h4 className="font-bold text-party-gold mb-3 text-sm flex items-center gap-2">
                  <Info size={16} />
                  Chú thích
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Thủ đô</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    <span>Đơn vị quân sự</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Hải quân</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span>Căn cứ</span>
                  </div>
                </div>
                <div className="flex gap-6 mt-3 pt-3 border-t border-slate-700 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 rounded" style={{background: 'repeating-linear-gradient(90deg, #dc2626 0, #dc2626 4px, transparent 4px, transparent 7px)'}}></div>
                    <span>Đường Trường Sơn (bộ)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 rounded" style={{background: 'repeating-linear-gradient(90deg, #3b82f6 0, #3b82f6 3px, transparent 3px, transparent 5px)'}}></div>
                    <span>Đường HCM (biển)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              {activePoint ? (
                <motion.div
                  key={activePoint}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 rounded-2xl border-l-4 border-party-gold backdrop-blur-md shadow-2xl"
                >
                  {(() => {
                    const p = MAP_POINTS.find(x => x.id === activePoint);
                    return (
                      <>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getPointColor(p?.type)} shadow-lg`}>
                            {getPointIcon(p?.type)}
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold text-party-gold">{p?.label}</h3>
                            <span className="text-xs text-slate-400 uppercase tracking-wider">
                              {p?.type === 'capital' ? 'Thủ đô' :
                               p?.type === 'military' ? 'Đơn vị quân sự' :
                               p?.type === 'navy' ? 'Lực lượng hải quân' :
                               p?.type === 'route' ? 'Tuyến đường' :
                               p?.type === 'base' ? 'Căn cứ địa' :
                               p?.type === 'special' ? 'Lực lượng đặc biệt' :
                               p?.type === 'battle' ? 'Trận đánh' :
                               p?.type === 'uprising' ? 'Khởi nghĩa' : 'Địa điểm'}
                            </span>
                          </div>
                        </div>
                        <p className="text-base text-slate-300 leading-relaxed mb-5">
                          {p?.desc}
                        </p>
                        <button
                          onClick={() => setActivePoint(null)}
                          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-party-gold transition-colors group"
                        >
                          <span className="group-hover:-translate-x-1 transition-transform">←</span>
                          Quay lại bản đồ
                        </button>
                      </>
                    )
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-party-gold/20 flex items-center justify-center">
                      <ZoomIn className="text-party-gold" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Khám phá bản đồ</h3>
                  </div>
                  <p className="text-slate-400 mb-5 leading-relaxed">
                    Click vào các điểm trên bản đồ để tìm hiểu về "mạch máu" nối liền hai miền Nam - Bắc trong cuộc kháng chiến chống Mỹ.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-900/20 border border-red-800/30">
                      <div className="w-4 h-1 mt-2 bg-red-600 rounded"></div>
                      <div>
                        <strong className="text-red-400">Đường Trường Sơn</strong>
                        <p className="text-slate-500 text-xs mt-0.5">Đường Hồ Chí Minh trên bộ - Tuyến vận tải chiến lược xuyên dãy Trường Sơn</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-900/20 border border-blue-800/30">
                      <div className="w-4 h-1 mt-2 bg-blue-500 rounded"></div>
                      <div>
                        <strong className="text-blue-400">Đường biển</strong>
                        <p className="text-slate-500 text-xs mt-0.5">Đường Hồ Chí Minh trên biển - Vận chuyển vũ khí bí mật dọc bờ biển</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Access Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-5"
            >
              <h4 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Điểm nổi bật</h4>
              <div className="grid grid-cols-2 gap-2">
                {MAP_POINTS.filter(p => ['hn', 'd559', 'd759', 'rung_sac', 'cu_chi', 'ap_bac'].includes(p.id)).map(point => (
                  <button
                    key={point.id}
                    onClick={() => setActivePoint(point.id)}
                    className={`p-3 rounded-xl text-left transition-all duration-300 border ${
                      activePoint === point.id 
                        ? 'bg-party-gold text-black border-party-gold shadow-lg shadow-yellow-500/20' 
                        : 'bg-slate-800/50 hover:bg-slate-700/50 text-white border-slate-700/50 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={activePoint === point.id ? 'text-black' : 'text-slate-400'}>
                        {getPointIcon(point.type)}
                      </span>
                      <span className="font-medium text-sm truncate">{point.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;