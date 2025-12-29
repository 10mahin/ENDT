
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface StyleAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

const StyleAdvisor: React.FC<StyleAdvisorProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are the ENDT AI Style Advisor. Your voice is extremely sophisticated, minimal, and architectural. You only speak about luxury fashion, monochrome aesthetics, and quiet luxury. Keep your responses brief—no more than 3 sentences. Be decisive and elegant.",
          temperature: 0.7,
        },
      });

      const aiText = response.text || "Apologies. An error occurred in the atelier.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Service is temporarily unavailable." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-white/10 backdrop-blur-sm transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-black z-[70] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-8 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-white text-[10px] uppercase tracking-[0.4em] font-bold">Style Advisor</h2>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-[0.2em]">Close</button>
          </div>

          {/* Chat area */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto space-y-12 mb-8 pr-4 scrollbar-hide"
          >
            {messages.length === 0 && (
              <div className="text-white/20 text-[10px] uppercase tracking-[0.3em] leading-loose pt-20">
                How can we refine your wardrobe today?
              </div>
            )}
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 mb-2">
                  {msg.role === 'user' ? 'Client' : 'ENDT'}
                </span>
                <p className={`text-[11px] leading-relaxed tracking-wide ${msg.role === 'user' ? 'text-white/60 text-right max-w-[80%]' : 'text-white max-w-[90%]'}`}>
                  {msg.text}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col items-start animate-pulse">
                <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 mb-2">Refining...</span>
                <div className="w-8 h-px bg-white/20"></div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="relative border-t border-white/10 pt-8">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="ASK THE ATELIER..."
              className="w-full bg-transparent text-white text-[10px] uppercase tracking-[0.3em] outline-none placeholder:text-white/20 pb-4"
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-0 bottom-4 text-white text-[9px] uppercase tracking-[0.4em] font-bold hover:opacity-50 transition-opacity"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StyleAdvisor;
