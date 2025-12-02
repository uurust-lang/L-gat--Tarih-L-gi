
import React, { useState, useEffect, useRef } from 'react';
import { askLugi, resetChat } from './services/geminiService';
import type { Message } from './types';
import { ChatInput } from './components/ChatInput';
import { MessageBubble } from './components/MessageBubble';
import { OwlIcon } from './components/OwlIcon';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add Lügi's initial welcome message
    const initialMessage: Message = {
      id: Date.now().toString(),
      text: "Huu hu! Ben Lügi. Lügat-ı Tarih'in bilge bekçisiyim. Bana merak ettiğin bir tarih terimini sor, hemen anlatayım! 🦉",
      sender: 'lugi',
    };
    // Simulate a brief delay to make it feel more natural
    setTimeout(() => {
        setMessages([initialMessage]);
        setIsLoading(false);
    }, 1000);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (inputText: string) => {
    if (!inputText.trim()) return;

    window.speechSynthesis.cancel();
    setSpeakingMessageId(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const responseText = await askLugi(inputText);
      const lugiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'lugi',
      };
      setMessages((prevMessages) => [...prevMessages, lugiMessage]);
    } catch (err) {
      const errorMessage = 'Huu... Bir sorunla karşılaştım ve kanatlarım karıştı. Lütfen sonra tekrar dene.';
      setError(errorMessage);
       const errorLugiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: 'lugi',
      };
      setMessages((prevMessages) => [...prevMessages, errorLugiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setIsLoading(true);
    window.speechSynthesis.cancel();
    setSpeakingMessageId(null);
    resetChat();
    setMessages([]);
    setError(null);
     const initialMessage: Message = {
      id: Date.now().toString(),
      text: "Huu hu! Yeni bir sohbete hazır mısın tarih yolcusu? Merak ettiğin ne varsa sorabilirsin! 🦉",
      sender: 'lugi',
    };
     setTimeout(() => {
        setMessages([initialMessage]);
        setIsLoading(false);
    }, 500);
  };

  const handleToggleSpeak = (message: Message) => {
    if (speakingMessageId === message.id) {
        window.speechSynthesis.cancel();
        setSpeakingMessageId(null);
    } else {
        window.speechSynthesis.cancel(); // Stop any previous speech
        const utterance = new SpeechSynthesisUtterance(message.text);
        utterance.lang = 'tr-TR';
        utterance.rate = 0.95;
        utterance.pitch = 1.1;
        utterance.onend = () => setSpeakingMessageId(null);
        utterance.onerror = () => {
          console.error("Speech synthesis error.");
          setSpeakingMessageId(null);
        }
        window.speechSynthesis.speak(utterance);
        setSpeakingMessageId(message.id);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-[#F8F5F0] text-[#3D352E]">
      <header className="bg-white border-b border-gray-200 shadow-sm p-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#EADDCD] rounded-full p-2">
            <OwlIcon />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#4A4036]">Lügi</h1>
            <p className="text-sm text-gray-500">Bilge Tarih Baykuşu</p>
          </div>
        </div>
         <button 
          onClick={handleNewChat}
          className="px-4 py-2 bg-[#EADDCD] text-[#4A4036] font-semibold rounded-lg hover:bg-[#D4C4B3] transition-colors duration-200 text-sm">
          Yeni Sohbet
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg}
            onToggleSpeak={handleToggleSpeak}
            speakingMessageId={speakingMessageId}
             />
        ))}
        {isLoading && (
            <div className="flex items-center space-x-3 justify-start">
                 <div className="w-10 h-10 bg-[#EADDCD] rounded-full p-2 flex-shrink-0">
                    <OwlIcon />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                    <LoadingSpinner />
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white border-t border-gray-200 p-2 sm:p-4">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;