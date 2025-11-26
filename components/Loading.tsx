import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-forest-800 animate-in fade-in duration-500">
      <Loader2 className="w-12 h-12 animate-spin mb-4 text-forest-600" />
      <p className="text-lg font-serif font-medium animate-pulse tracking-wide">{text}</p>
    </div>
  );
};

export default Loading;
