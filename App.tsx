import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import SectionSplit from './components/SectionSplit';
import Leadership from './components/Leadership';
import TrailSection from './components/TrailSection';
import Quiz from './components/Quiz';
import Navbar from './components/Navbar';
import Knowledge from './components/Knowledge';
import LoadingIntro from './components/LoadingIntro';
import SupplyLine from './components/SupplyLine';
import { Volume2, VolumeX } from 'lucide-react';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play attempt on scroll interaction if blocked initially
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
    <div className="font-sans antialiased selection:bg-party-red selection:text-white">
      {/* Loading Intro */}
      <AnimatePresence>
        {isLoading && (
          <LoadingIntro onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Navbar />

      {/* Audio Control - Moved down to not overlap navbar */}
      <div className="fixed top-20 right-4 md:right-6 z-50">
        <button 
          onClick={toggleAudio}
          className="bg-deep-dark/50 hover:bg-deep-dark/80 backdrop-blur-md p-3 rounded-full text-white border border-white/20 transition-all shadow-lg group"
          title={isMuted ? "Bật nhạc nền" : "Tắt nhạc nền"}
        >
          {isMuted ? (
            <VolumeX size={20} className="group-hover:text-red-400 transition-colors" />
          ) : (
            <Volume2 size={20} className="animate-pulse text-party-gold" />
          )}
        </button>
        <audio ref={audioRef} loop>
          <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/e/ec/Tien_Quan_Ca_vocal.ogg/Tien_Quan_Ca_vocal.ogg.mp3" type="audio/mpeg" />
          <source src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Tien_Quan_Ca_vocal.ogg" type="audio/ogg" />
        </audio>
      </div>

      <main>
        <Hero />
        <Knowledge />
        <Timeline />
        <SupplyLine />
        <SectionSplit />
        <Leadership />
        <TrailSection />
        <Quiz />
        <ChatWidget theme="dark" />
        
        {/* Simple Footer replacing Closing section */}
        <footer className="bg-slate-900 py-8 border-t border-slate-800 text-center">
           <p className="text-slate-500 text-sm">
             © 2023 Lịch sử Đảng Cộng sản Việt Nam - Dự án Thuyết trình Giáo dục
           </p>
        </footer>
      </main>
    </div>
  );
};

export default App;