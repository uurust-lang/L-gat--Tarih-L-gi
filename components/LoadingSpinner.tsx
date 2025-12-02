
import React from 'react';

export const LoadingSpinner: React.FC = () => (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:0.2s]"></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:0.4s]"></div>
       <span className="text-sm text-gray-500">Lügi düşünüyor...</span>
    </div>
);
