import React from 'react';
import { EmotionType } from '../types';
import { emotionConfig } from '../utils/emotions';

interface EmotionSelectorProps {
  selectedEmotion: EmotionType;
  onEmotionChange: (emotion: EmotionType) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ selectedEmotion, onEmotionChange }) => {
  return (
    <div className="flex gap-2 justify-center mb-4">
      {Object.entries(emotionConfig).map(([key, config]) => (
        <button
          key={key}
          onClick={() => onEmotionChange(key as EmotionType)}
          className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
            selectedEmotion === key
              ? 'bg-white/40 backdrop-blur-sm ring-2 ring-white/50 scale-110'
              : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
          }`}
          title={config.name}
        >
          <span className="text-2xl">{config.emoji}</span>
        </button>
      ))}
    </div>
  );
};

export default EmotionSelector;