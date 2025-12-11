import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Send, Loader2, Sparkles } from "lucide-react";

const ChatWidget = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', content: 'Kính chào quý khách. Tôi có thể hỗ trợ thông tin gì về hiện vật này?' }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    try {
      const res = await fetch("https://exe-be-2hzk.onrender.com/api/AI/chat", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: userMsg })
      });
      if (!res.ok) throw new Error("API Error");
      
      const data = await res.json();
      
      const cleanReply = (data.response || "").replace(/\*\*/g, '');
      
      setMessages(prev => [...prev, { role: 'ai', content: cleanReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Xin lỗi, kết nối đến máy chủ triển lãm đang bị gián đoạn." }]);
    } finally { setIsLoading(false); }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end font-museum-body">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`mb-4 w-[360px] h-[500px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border backdrop-blur-3xl
              ${theme === 'dark' ? 'bg-black/80 border-white/10 text-gray-200' : 'bg-white/80 border-gray-200 text-gray-800'}`}
          >
            <div className={`p-4 border-b flex justify-between items-center ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 flex items-center justify-center text-white"><Sparkles size={14} /></div>
                <div><h3 className="font-semibold text-sm">TRỢ LÝ AI</h3><p className="text-[10px] opacity-60 uppercase tracking-wider">Trực tuyến</p></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-50 hover:opacity-100"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap
                    ${msg.role === 'user' ? (theme === 'dark' ? 'bg-white/10 text-white rounded-br-sm' : 'bg-black text-white rounded-br-sm') : (theme === 'dark' ? 'bg-yellow-500/10 text-yellow-100 border border-yellow-500/20 rounded-bl-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm')}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><Loader2 className="animate-spin opacity-40" size={16}/></div>}
            </div>
            <div className={`p-3 border-t flex gap-2 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Đặt câu hỏi..." className="flex-1 bg-transparent text-sm px-3 py-2 outline-none placeholder:opacity-40"/>
              <button onClick={handleSend} disabled={!input.trim()} className={`p-2 rounded-full transition-colors ${input.trim() ? 'opacity-100 hover:bg-black/10 dark:hover:bg-white/10' : 'opacity-30'}`}><Send size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)} className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border transition-all ${theme === 'dark' ? 'bg-gradient-to-br from-yellow-600 to-yellow-800 border-white/10 text-white' : 'bg-black text-white border-transparent'}`}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;