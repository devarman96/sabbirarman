import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Bot, User, Loader2, X } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

const AboutAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: m.parts
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history })
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'model', parts: [{ text: data.text }] }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <Bot size={18} className="text-indigo-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Sabbir's AI Assistant</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <Bot size={40} className="text-slate-700" />
            <p className="text-sm text-slate-400">
              Hello! I'm Sabbir's AI assistant. Ask me anything about his skills, experience, or projects.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['What are your skills?', 'Tell me about your projects', 'How to contact?'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                  }}
                  className="text-[11px] px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                  m.role === 'user' ? 'bg-indigo-500' : 'bg-slate-800'
                }`}>
                  {m.role === 'user' ? <User size={12} className="text-white" /> : <Bot size={12} className="text-indigo-400" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                }`}>
                  {m.parts[0].text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                <Bot size={12} className="text-indigo-400" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 rounded-tl-none">
                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-950/50 border-t border-slate-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutAIAssistant;
