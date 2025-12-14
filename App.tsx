import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import SectionSplit from './components/SectionSplit';
import Leadership from './components/Leadership';
import Navbar from './components/Navbar';
import Knowledge from './components/Knowledge';
import LoadingIntro from './components/LoadingIntro';
import SupplyLine from './components/SupplyLine';
import { Volume2, VolumeX, Star } from 'lucide-react';
import ChatWidget from './components/ChatWidget';
import Map from './components/MapSection';
import Room from './components/Room';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play failed pending interaction"));
      }
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [isMuted]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="font-sans antialiased text-stone-200 selection:bg-red-900 selection:text-yellow-500 bg-black min-h-screen relative">
      
      {/* Global Noise Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

      {/* Loading Intro */}
      <AnimatePresence>
        {isLoading && (
          <LoadingIntro onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Navbar />

      {/* Audio Control */}
      <div className="fixed top-24 right-4 md:right-8 z-50">
        <button 
          onClick={toggleAudio}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group ${
            isMuted 
              ? 'bg-stone-900/80 border-stone-600 text-stone-500 hover:border-red-500 hover:text-red-500' 
              : 'bg-stone-900/80 border-yellow-600 text-yellow-500 hover:bg-yellow-900/20 shadow-[0_0_15px_rgba(234,179,8,0.3)]'
          }`}
          title={isMuted ? "Bật nhạc hào hùng" : "Tắt nhạc"}
        >
          {isMuted ? (
            <VolumeX size={20} />
          ) : (
            <>
              <span className="absolute inset-0 rounded-full animate-ping bg-yellow-600/20"></span>
              <Volume2 size={20} />
            </>
          )}
        </button>
        <audio ref={audioRef} loop>
          <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/e/ec/Tien_Quan_Ca_vocal.ogg/Tien_Quan_Ca_vocal.ogg.mp3" type="audio/mpeg" />
          <source src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Tien_Quan_Ca_vocal.ogg" type="audio/ogg" />
        </audio>
      </div>

      <main className="relative z-10">
        <Hero />
        <Knowledge />
        <Timeline />
        <SupplyLine />
        <SectionSplit />
        <Leadership />
        <Map />
        <Room />
        <ChatWidget theme="dark" />
        
        {/* Footer */}
        <footer className="bg-[#0c0a09] py-16 border-t border-stone-800 relative overflow-hidden">
           {/* Decoration Line */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-700 to-transparent"></div>
           
           <div className="container mx-auto px-4 text-center">
              <div className="mb-6 flex justify-center">
                 <div className="p-3 border border-stone-700 rounded-full bg-stone-900/50">
                    <Star size={24} className="text-yellow-600 fill-current" />
                 </div>
              </div>
              
              <h3 className="text-stone-300 font-serif font-bold text-lg mb-2 uppercase tracking-widest">
                Lịch sử Đảng Cộng sản Việt Nam
              </h3>
              
              <p className="text-stone-500 text-xs font-mono uppercase tracking-[0.2em] mb-8">
                Dự án Thuyết trình Giáo dục • 2025
              </p>

              <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-stone-800 to-transparent"></div>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default App;