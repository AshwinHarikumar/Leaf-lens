import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Message, Sender } from '../types';
import { Chat } from "@google/genai";

interface ChatInterfaceProps {
  chatSession: Chat | null;
  initialMessage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatSession, initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage) {
       setMessages([{
         id: 'init',
         text: initialMessage,
         sender: Sender.AI,
         timestamp: new Date()
       }]);
    }
  }, [initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await chatSession.sendMessage({ message: userMsg.text });
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: result.text || "I'm sorry, I couldn't generate a response.",
        sender: Sender.AI,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error connecting to the gardening database. Please try again.",
        sender: Sender.AI,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-white/50 flex flex-col h-[600px] md:h-[700px] overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-leaf-50 to-bloom-50">
        <h3 className="font-display font-bold text-gray-800 flex items-center gap-2">
          <div className="p-1.5 bg-white rounded-lg shadow-sm">
            <Bot className="w-5 h-5 text-leaf-600" />
          </div>
          Gardening Assistant
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white/50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            <p className="font-medium">Ask any questions about your plant!</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.sender === Sender.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm md:text-base shadow-sm leading-relaxed font-medium ${
                msg.sender === Sender.USER
                  ? 'bg-gradient-to-br from-leaf-500 to-leaf-600 text-white rounded-br-none shadow-leaf-200'
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-gray-100'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start w-full">
            <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-leaf-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-leaf-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-leaf-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up question..."
            className="flex-1 border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-leaf-500/20 focus:border-leaf-500 transition-all placeholder:text-gray-400 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-leaf-600 to-leaf-500 hover:from-leaf-700 hover:to-leaf-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl p-2 w-12 h-12 flex items-center justify-center transition-all shadow-lg shadow-leaf-500/20 hover:shadow-leaf-500/40 hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
