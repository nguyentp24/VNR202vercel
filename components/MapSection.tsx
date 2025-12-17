import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAP_POINTS } from '../constants';
import { MapPin, Anchor, Swords, Flag, Star, Flame, Navigation, Info, ZoomIn, ZoomOut, RotateCcw, Move, Compass, Target } from 'lucide-react';

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

const getPointColor = (type?: string, isActive?: boolean) => {
  if (isActive) return 'bg-yellow-500 ring-2 ring-white shadow-[0_0_15px_rgba(234,179,8,0.8)]';
  switch (type) {
    case 'capital': return 'bg-red-600 border border-yellow-500';
    case 'military': return 'bg-green-700 border border-green-400';
    case 'navy': return 'bg-blue-600 border border-blue-300';
    case 'route': return 'bg-orange-600 border border-orange-300';
    case 'base': return 'bg-purple-600 border border-purple-300';
    case 'special': return 'bg-red-700 border border-red-400';
    case 'city': return 'bg-stone-500 border border-stone-300';
    case 'uprising': return 'bg-rose-600 border border-rose-300';
    case 'battle': return 'bg-red-600 border border-red-300';
    default: return 'bg-red-600';
  }
};

const MAP_COORDINATES: { [key: string]: { x: number; y: number } } = {
  'hn': { x: 44, y: 16 },
  'd559': { x: 54, y: 42 },
  'd759': { x: 58, y: 18 },
  'ts1': { x: 48, y: 36 },
  'ts2': { x: 73, y: 66 },
  'ts3': { x: 63, y: 78 },
  'tay_nguyen': { x: 70, y: 59 },
  'rung_sac': { x: 58, y: 82 },
  'cu_chi': { x: 55, y: 81 },
  'sg': { x: 55, y: 83 },
  'bt': { x: 53, y: 88 },
  'tay_ninh': { x: 49, y: 79 },
  'ap_bac': { x: 49, y: 85 },
};

const MapSection: React.FC = () => {
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.5;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
      if (newZoom === 1) setPan({ x: 0, y: 0 });
      return newZoom;
    });
  };
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

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

  const handleMouseUp = () => setIsDragging(false);
  const handleWheel = (e: React.WheelEvent) => { e.preventDefault(); e.deltaY < 0 ? handleZoomIn() : handleZoomOut(); };

  return (
    <section id="map" className="py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-[#1a0505] to-black text-stone-200 relative overflow-hidden min-h-screen">

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-yellow-600/30 bg-black/40 backdrop-blur-md px-6 py-2 rounded-sm text-xs font-serif font-bold mb-6 text-yellow-500 uppercase tracking-[0.2em] shadow-lg">
            <Compass size={16} />
            Bản đồ tương tác
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif font-black text-stone-100 mb-6 drop-shadow-xl">
            Đường dây <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">lãnh đạo xuyên hai miền</span>
          </h2>
          <p className="text-lg text-stone-400 max-w-2xl mx-auto font-serif italic">
            "Mạng lưới chi viện từ miền Bắc vào miền Nam - Biểu tượng của ý chí thống nhất Tổ quốc"
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-8">

          {/* MAP VISUAL CONTAINER */}
          <div className="w-full lg:w-3/5 relative">
            <div className="relative mx-auto bg-[#1a1a1a] rounded-sm p-3 border-4 border-stone-800 shadow-[0_0_40px_rgba(0,0,0,0.6)]" style={{ maxWidth: '600px' }}>

              {/* Decorative Screws */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-stone-600 shadow-inner z-40" />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-stone-600 shadow-inner z-40" />
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-stone-600 shadow-inner z-40" />
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-stone-600 shadow-inner z-40" />

              {/* Zoom Indicator */}
              <div className="absolute top-6 left-6 z-30 bg-black/90 backdrop-blur-md px-3 py-1.5 border border-yellow-600/50 shadow-lg">
                <span className="text-yellow-500 font-mono text-sm font-bold tracking-wider">
                  ZOOM: {Math.round(zoom * 100)}%
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="absolute top-6 right-6 z-30 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleZoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  className={`w-9 h-9 rounded-sm flex items-center justify-center shadow-lg transition-all border ${zoom >= MAX_ZOOM ? 'bg-stone-800 border-stone-700 text-stone-600' : 'bg-stone-700 border-stone-600 text-yellow-500 hover:bg-stone-600 hover:border-yellow-500'
                    }`}
                >
                  <ZoomIn size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleZoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  className={`w-9 h-9 rounded-sm flex items-center justify-center shadow-lg transition-all border ${zoom <= MIN_ZOOM ? 'bg-stone-800 border-stone-700 text-stone-600' : 'bg-stone-700 border-stone-600 text-yellow-500 hover:bg-stone-600 hover:border-yellow-500'
                    }`}
                >
                  <ZoomOut size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="w-9 h-9 rounded-sm bg-stone-700 border border-stone-600 text-stone-300 hover:text-white flex items-center justify-center shadow-lg transition-all"
                >
                  <RotateCcw size={16} />
                </motion.button>
              </div>

              {/* Drag Hint */}
              <AnimatePresence>
                {zoom > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-16 left-6 z-30 bg-blue-900/80 backdrop-blur-md px-3 py-1 rounded-sm border border-blue-500/30 text-[10px] uppercase font-bold text-blue-200 flex items-center gap-2"
                  >
                    <Move size={12} /> Kéo để di chuyển
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Map Viewport */}
              <div
                ref={mapContainerRef}
                className={`relative overflow-hidden bg-slate-900/50 border border-stone-700/50 ${zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                <div
                  className="transition-transform duration-300 ease-out origin-center"
                  style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)` }}
                >
                  <img
                    src="https://images.mapsofworld.com/vietnam/vietnam-political-map.jpg"
                    alt="Bản đồ Việt Nam"
                    className="w-full h-auto opacity-90 select-none"
                    style={{ filter: 'saturate(0.8) brightness(0.9)' }}
                    draggable={false}
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                  {/* SVG Overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <filter id="glowRed"><feGaussianBlur stdDeviation="1" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                      <filter id="glowBlue"><feGaussianBlur stdDeviation="1" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                      <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#DC2626" /><stop offset="100%" stopColor="#991B1B" /></linearGradient>
                      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#3B82F6" /><stop offset="100%" stopColor="#1D4ED8" /></linearGradient>
                    </defs>

                    <motion.line x1="25" y1="42" x2="80" y2="42" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="2 1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }} />
                    <text x="67" y="41" fill="#fbbf24" fontSize="2.5" fontWeight="bold">Vĩ tuyến 17</text>

                    <motion.path
                      d="M 42 11 Q 44 13, 45 15 Q 46 18, 46 21 Q 45 24, 44 27 Q 43 33, 52 40 Q 51 39, 56 44 Q 61 47, 65 51 Q 65 51, 70 58 Q 75 69, 73 67 Q 75 69, 70 73 Q 62 79, 62 79 Q 53 84, 55 87"
                      stroke="url(#redGradient)" strokeWidth="1.5" fill="transparent" strokeDasharray="4 2" strokeLinecap="round" filter="url(#glowRed)"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    <motion.path d="M 56 82, 49 78" stroke="#DC2626" strokeWidth="1" fill="transparent" strokeDasharray="2 1" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 2.5 }} />

                    <motion.path
                      d="M 59 19, Q 57 25, 56 28 Q 55 32, 56 36 Q 59 40, 70 45 Q 95 60, 79 84 Q 72 89, 65 85"
                      stroke="url(#blueGradient)" strokeWidth="1.2" fill="transparent" strokeDasharray="3 1.5" strokeLinecap="round" filter="url(#glowBlue)"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                    />
                    <motion.path d="M 66 85, 59 84" stroke="#3B82F6" strokeWidth="0.6" fill="transparent" strokeDasharray="1.5 0.8" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 3 }} />
                  </svg>

                  {/* Points */}
                  {MAP_POINTS.map((point, index) => {
                    const coords = MAP_COORDINATES[point.id] || { x: point.x, y: point.y };
                    const isActive = activePoint === point.id;
                    const isHovered = hoveredPoint === point.id;
                    const zIndex = isActive || isHovered ? 50 : 20;

                    return (
                      <motion.div
                        key={point.id}
                        className="absolute flex flex-col items-center justify-center"
                        style={{
                          left: `${coords.x}%`,
                          top: `${coords.y}%`,
                          zIndex: zIndex
                        }}
                        initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
                        whileInView={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.08, type: 'spring' }}
                      >
                        {/* Ripple Effect */}
                        {isActive && (
                          <motion.div
                            className="absolute rounded-full bg-yellow-500 z-0"
                            style={{ width: '100%', height: '100%' }}
                            animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}

                        {/* TOOLTIP */}
                        <AnimatePresence>
                          {(isHovered || isActive) && (
                            <motion.div
                              initial={{ opacity: 0, y: 5, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.9 }}
                              className="absolute bottom-full mb-3 z-50 w-max pointer-events-none"
                            >
                              <div className="relative bg-stone-900/95 backdrop-blur-sm px-4 py-2 rounded-sm border border-stone-600 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                                <span className="text-yellow-500 font-serif text-xs font-bold uppercase tracking-wider block text-center leading-none">
                                  {point.label}
                                </span>
                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-stone-900/95"></div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* BUTTON ICON */}
                        <motion.button
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setActivePoint(point.id)}
                          onMouseEnter={() => setHoveredPoint(point.id)}
                          onMouseLeave={() => setHoveredPoint(null)}
                          className={`relative z-10 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${getPointColor(point.type, isActive)}`}
                        >
                          <span className={`text-[8px] md:text-[10px] flex items-center justify-center ${isActive ? 'text-black' : 'text-white'}`}>
                            {getPointIcon(point.type)}
                          </span>
                        </motion.button>
                      </motion.div>
                    );
                  })}

                  {/* Labels */}
                  <div className="absolute left-[25%] top-[40%] transform -rotate-45 pointer-events-none">
                    <span className="text-red-500 text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded border border-red-900/50 whitespace-nowrap uppercase tracking-wider">Đường Trường Sơn</span>
                  </div>
                  <div className="absolute right-[18%] top-[45%] transform rotate-45 pointer-events-none">
                    <span className="text-blue-400 text-[9px] font-bold bg-black/60 px-2 py-0.5 rounded border border-blue-900/50 whitespace-nowrap uppercase tracking-wider">Đường biển</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 bg-stone-900/80 border-t border-stone-700 pt-4 px-4 pb-2">
                <h4 className="font-bold text-yellow-500 mb-3 text-sm uppercase tracking-widest flex items-center gap-2">
                  <Info size={16} /> Chú thích
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 text-xs text-stone-300 font-serif">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-600 border border-yellow-500"></div><span>Thủ đô</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-700 border border-green-500"></div><span>Đơn vị quân sự</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-600 border border-blue-400"></div><span>Hải quân</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-600 border border-purple-400"></div><span>Căn cứ</span></div>
                </div>
                <div className="flex gap-6 mt-4 pt-3 border-t border-stone-800 text-xs text-stone-300 font-serif">
                  <div className="flex items-center gap-2"><div className="w-8 h-1 bg-red-600 dashed"></div><span>Đường Trường Sơn (bộ)</span></div>
                  <div className="flex items-center gap-2"><div className="w-8 h-1 bg-blue-500 dashed"></div><span>Đường HCM (biển)</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* INFO PANEL */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              {activePoint ? (
                <motion.div
                  key={activePoint}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-[#1c1917] p-6 rounded-sm border border-stone-700 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-red-900/80 text-red-200 text-[9px] font-bold px-3 py-1 transform rotate-45 translate-x-3 translate-y-2 border border-red-700">
                    ĐỊA ĐIỂM
                  </div>
                  {(() => {
                    const p = MAP_POINTS.find(x => x.id === activePoint);
                    return (
                      <>
                        <div className="flex items-center space-x-4 mb-6 border-b border-stone-800 pb-6 border-dashed">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-stone-700 shadow-inner bg-stone-900`}>
                            <div className="text-yellow-500 scale-125">
                              {getPointIcon(p?.type)}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-serif font-bold text-stone-100 uppercase tracking-wide">{p?.label}</h3>
                            <span className="text-xs text-yellow-600 uppercase tracking-[0.15em] font-bold mt-1 block">
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
                        <div className="bg-stone-900/50 p-4 border-l-2 border-yellow-600 mb-6">
                          <p className="text-base text-stone-300 leading-relaxed font-serif">
                            {p?.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => setActivePoint(null)}
                          className="w-full py-3 border border-stone-600 text-stone-400 hover:text-white hover:border-white hover:bg-stone-800 transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                          <RotateCcw size={14} /> Quay lại bản đồ
                        </button>
                      </>
                    )
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-stone-900/60 p-6 rounded-sm border border-stone-800 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-sm bg-yellow-900/20 border border-yellow-700 flex items-center justify-center">
                      <Target className="text-yellow-600" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-stone-200 font-serif uppercase tracking-wide">Khám phá bản đồ</h3>
                  </div>
                  <p className="text-stone-400 mb-5 leading-relaxed font-serif italic text-sm">
                    "Click vào các điểm trên bản đồ để tìm hiểu về "mạch máu" nối liền hai miền Nam - Bắc trong cuộc kháng chiến chống Mỹ."
                  </p>

                  <div className="flex flex-col gap-4">
                    <div className="bg-[#2a1212] border border-red-900/30 p-4 rounded-md">
                      <div className="flex items-start gap-3">
                        <div className="mt-2 w-8 h-1.5 bg-red-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>

                        <div>
                          <h4 className="text-red-400 font-bold font-serif text-base mb-1">
                            Đường Trường Sơn
                          </h4>
                          <p className="text-xs text-stone-500 font-serif leading-relaxed">
                            Đường Hồ Chí Minh trên bộ - Tuyến vận tải chiến lược xuyên dãy Trường Sơn.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0f172a] border border-blue-900/30 p-4 rounded-md">
                      <div className="flex items-start gap-3">
                        <div className="mt-2 w-8 h-1.5 bg-blue-600 rounded-full shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>

                        <div>
                          <h4 className="text-blue-400 font-bold font-serif text-base mb-1">
                            Đường biển
                          </h4>
                          <p className="text-xs text-stone-500 font-serif leading-relaxed">
                            Đường Hồ Chí Minh trên biển - Vận chuyển vũ khí bí mật dọc bờ biển.
                          </p>
                        </div>
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
              className="mt-6 border-t border-stone-800 pt-6"
            >
              <h4 className="text-xs font-bold text-stone-500 mb-3 uppercase tracking-[0.2em]">Điểm nổi bật</h4>
              <div className="grid grid-cols-2 gap-2">
                {MAP_POINTS.filter(p => ['hn', 'd559', 'd759', 'rung_sac', 'cu_chi', 'ap_bac'].includes(p.id)).map(point => (
                  <button
                    key={point.id}
                    onClick={() => setActivePoint(point.id)}
                    className={`p-3 text-left transition-all duration-300 border rounded-sm hover:translate-x-1 ${activePoint === point.id
                      ? 'bg-yellow-900/30 text-yellow-500 border-yellow-700'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-600 hover:text-stone-200'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={activePoint === point.id ? 'text-yellow-500' : 'text-stone-600'}>
                        {getPointIcon(point.type)}
                      </span>
                      <span className="font-serif font-bold text-xs truncate uppercase tracking-wider">{point.label}</span>
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