import React, { useRef } from 'react';
import { Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Flower } from '../types';
import { emotionConfig } from '../utils/emotions';

interface GratitudeCardProps {
  flower: Flower;
  onClose: () => void;
}

const GratitudeCard: React.FC<GratitudeCardProps> = ({ flower, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        width: 400,
        height: 600,
      });
      
      const link = document.createElement('a');
      link.download = `gratitude-card-${flower.timestamp.toLocaleDateString()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading card:', error);
    }
  };

  const emotionData = emotionConfig[flower.emotion];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full animate-bloom relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div ref={cardRef} className={`bg-gradient-to-br ${emotionData.color} rounded-2xl p-8 text-center`}>
          <div className="text-6xl mb-4 animate-pulse-soft">
            {flower.type}
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <p className="text-gray-800 font-quicksand text-lg leading-relaxed mb-4">
              "{flower.message}"
            </p>
            
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="text-lg">{emotionData.emoji}</span>
              <span className="font-quicksand text-sm">
                {flower.timestamp.toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="text-gray-700 font-pacifico text-sm">
            Little Gratitude Garden 🌷
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={downloadCard}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Card
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GratitudeCard;