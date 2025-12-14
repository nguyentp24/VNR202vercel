import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'hero', label: 'Trang chủ' },
  { id: 'knowledge', label: 'Kiến thức' },
  { id: 'timeline', label: 'Dòng thời gian' },
  { id: 'supply', label: 'Chi viện' },
  { id: 'regions', label: 'Hai miền' },
  { id: 'leadership', label: 'Lãnh đạo' },
  { id: 'map', label: 'Bản đồ' },
  { id: 'room', label: 'Trắc nghiệm' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-md py-3 border-stone-800 shadow-xl' 
        : 'bg-transparent py-6 border-transparent'
    }`}>
      {/* Texture Overlay for Scrolled State */}
      {scrolled && <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>}

      <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => scrollToSection('hero')}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
             <div className="absolute inset-0 bg-red-700 rounded-full border-2 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.6)] transition-all duration-300"></div>
             <span className="relative z-10 text-yellow-400 font-black text-xs font-serif tracking-tighter">VN</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-stone-100 font-serif font-bold text-xl tracking-wide leading-none group-hover:text-yellow-500 transition-colors">
              1954 - 1965
            </span>
            <span className="text-[9px] md:text-[10px] text-stone-500 uppercase tracking-[0.2em] font-bold mt-1 group-hover:text-stone-300 transition-colors">
              Đảng Lãnh Đạo
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative px-4 py-2 text-xs font-bold text-stone-400 hover:text-stone-100 transition-colors uppercase tracking-widest group font-serif"
            >
              <span className="relative z-10">{item.label}</span>
              
              {/* Hover Effect - Background Highlight */}
              <span className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-sm"></span>
              
              {/* Active Indicator - Red Line */}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-stone-400 hover:text-yellow-500 hover:bg-white/5 rounded-sm transition-all border border-transparent hover:border-stone-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1c1917] border-b border-yellow-600/30 overflow-hidden relative"
          >
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            
            <div className="flex flex-col p-6 space-y-2 relative z-10">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-stone-400 hover:text-yellow-500 hover:bg-white/5 px-4 py-3 rounded-sm transition-all uppercase text-xs font-bold tracking-[0.15em] border-l-2 border-transparent hover:border-yellow-600 flex items-center gap-3 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-700 group-hover:bg-red-600 transition-colors"></span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;