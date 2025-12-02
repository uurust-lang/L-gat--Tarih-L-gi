
import React from 'react';
import type { Message } from '../types';
import { OwlIcon } from './OwlIcon';

const SpeakerIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M7 4a1 1 0 00-2 0v12a1 1 0 102 0V4zM13 4a1 1 0 00-2 0v12a1 1 0 102 0V4z" />
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.522-1.298A5.986 5.986 0 0110 6c1.3 0 2.54.402 3.522 1.102a6.012 6.012 0 011.522 1.298 6.043 6.043 0 011.102 3.522A5.986 5.986 0 0116 10c0 .339-.03.673-.087 1a6.012 6.012 0 01-1.298 1.522 6.043 6.043 0 01-3.522 1.102A5.986 5.986 0 0110 14c-1.3 0-2.54-.402-3.522-1.102a6.012 6.012 0 01-1.522-1.298A6.043 6.043 0 013 11.522 5.986 5.986 0 012.913 10a6.012 6.012 0 01.332-1.522 6.043 6.043 0 011.087-2.45zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
  </svg>
);


const StopIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
  </svg>
);

interface MessageBubbleProps {
  message: Message;
  onToggleSpeak: (message: Message) => void;
  speakingMessageId: string | null;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onToggleSpeak, speakingMessageId }) => {
  const isLugi = message.sender === 'lugi';
  const isSpeaking = speakingMessageId === message.id;

  return (
    <div className={`flex items-start gap-3 ${isLugi ? 'justify-start' : 'justify-end'}`}>
      {isLugi && (
        <div className="w-10 h-10 bg-[#EADDCD] rounded-full p-2 flex-shrink-0">
          <OwlIcon />
        </div>
      )}
       <div className={`flex items-end gap-2 ${isLugi ? 'flex-row' : 'flex-row-reverse'}`}>
        <div
            className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-sm whitespace-pre-wrap ${
            isLugi
                ? 'bg-white rounded-tl-none'
                : 'bg-[#C8E6C9] text-gray-800 rounded-br-none'
            }`}
        >
            <p className="text-base">{message.text}</p>
        </div>
         {isLugi && (
            <button
                onClick={() => onToggleSpeak(message)}
                className="text-[#A88B64] hover:text-[#8e7552] p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A88B64] disabled:text-gray-400"
                aria-label={isSpeaking ? "Seslendirmeyi durdur" : "Mesajı seslendir"}
            >
                {isSpeaking ? <StopIcon /> : <SpeakerIcon />}
            </button>
        )}
      </div>
    </div>
  );
};