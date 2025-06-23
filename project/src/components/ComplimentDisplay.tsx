import React, { useEffect, useState } from 'react';
import { ComplimentMessage } from '../types';

interface ComplimentDisplayProps {
  compliment: ComplimentMessage | null;
  onComplete: () => void;
}

const ComplimentDisplay: React.FC<ComplimentDisplayProps> = ({ compliment, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (compliment) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [compliment, onComplete]);

  if (!compliment) return null;

  return (
    <div className={`text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="card-glass inline-block max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2 text-white">
          <span className="text-2xl animate-pulse-soft">{compliment.emoji}</span>
          <p className="font-quicksand text-lg">{compliment.text}</p>
          <span className="text-2xl animate-pulse-soft">{compliment.emoji}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplimentDisplay;