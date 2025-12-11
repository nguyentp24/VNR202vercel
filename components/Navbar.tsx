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
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-deep-dark/90 backdrop-blur-md py-2 shadow-lg border-b border-white/5' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => scrollToSection('hero')}
        >
          <div className="w-8 h-8 bg-party-red rounded-full flex items-center justify-center border border-party-gold group-hover:scale-110 transition-transform">
            <span className="text-party-gold font-bold text-xs">VN</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-serif font-bold text-lg tracking-wider leading-none">1954-1965</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest hidden md:block">Đảng lãnh đạo</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-slate-300 hover:text-party-gold transition-colors uppercase tracking-wide relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-party-red transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-1 hover:text-party-gold transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-deep-dark border-b border-party-red/30 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-slate-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded transition-colors uppercase text-sm font-semibold tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;