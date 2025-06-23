import React from 'react';
import { Clock, List } from 'lucide-react';
import { Flower } from '../types';
import { emotionConfig } from '../utils/emotions';

interface GratitudeTimelineProps {
  flowers: Flower[];
  isVisible: boolean;
  onToggle: () => void;
}

const GratitudeTimeline: React.FC<GratitudeTimelineProps> = ({ flowers, isVisible, onToggle }) => {
  const sortedFlowers = [...flowers].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="text-center mb-6">
        <button
          onClick={onToggle}
          className="btn-primary inline-flex items-center gap-2"
        >
          {isVisible ? <List className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          {isVisible ? 'Show Garden' : 'View Timeline'}
        </button>
      </div>

      {isVisible && flowers.length > 0 && (
        <div className="card-glass animate-bloom">
          <h3 className="font-pacifico text-2xl text-white text-center mb-6 drop-shadow-lg">
            Your Gratitude Journey 📜
          </h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {sortedFlowers.map((flower, index) => {
              const emotionData = emotionConfig[flower.emotion];
              return (
                <div
                  key={flower.id}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-3xl">{flower.type}</div>
                      <div className="text-center text-sm text-white/70 mt-1">
                        {emotionData.emoji}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-white font-quicksand leading-relaxed mb-2">
                        "{flower.message}"
                      </p>
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(flower.timestamp).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{emotionData.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GratitudeTimeline;