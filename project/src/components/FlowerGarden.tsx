import React, { useState } from 'react';
import { Flower, Theme } from '../types';
import GratitudeCard from './GratitudeCard';

interface FlowerGardenProps {
  flowers: Flower[];
  theme: Theme;
}

const FlowerGarden: React.FC<FlowerGardenProps> = ({ flowers, theme }) => {
  const [hoveredFlower, setHoveredFlower] = useState<number | null>(null);
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);

  if (flowers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="card-glass max-w-md mx-auto">
          <div className="text-6xl mb-4 animate-pulse-soft">🌱</div>
          <p className="text-white/80 font-quicksand">
            Your garden is waiting for its first flower of gratitude...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-pacifico text-white text-center mb-8 drop-shadow-lg">
        Your Gratitude Garden
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
        {flowers.map((flower, index) => (
          <div
            key={flower.id}
            className="relative flex justify-center items-center"
            onMouseEnter={() => setHoveredFlower(flower.id)}
            onMouseLeave={() => setHoveredFlower(null)}
            onClick={() => setSelectedFlower(flower)}
          >
            {/* Flower */}
            <div
              className="text-4xl md:text-5xl animate-bloom hover:animate-bounce-gentle cursor-pointer flower-glow transition-all duration-300 hover:scale-110"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <span className="animate-sway inline-block" style={{ animationDelay: `${index * 0.5}s` }}>
                {flower.type}
              </span>
            </div>

            {/* Tooltip */}
            {hoveredFlower === flower.id && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-20 animate-bloom">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl max-w-xs">
                  <p className="text-gray-800 text-sm font-quicksand leading-relaxed text-center">
                    "{flower.message}"
                  </p>
                  <div className="text-xs text-gray-500 text-center mt-2">
                    {new Date(flower.timestamp).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-pink-600 text-center mt-1">
                    Click to create card
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/90"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Garden base decoration */}
      <div className="mt-8 text-center">
        <div className="text-2xl md:text-3xl space-x-2 animate-sway">
          🌿 🌾 🌿 🌾 🌿 🌾 🌿
        </div>
      </div>

      {/* Gratitude Card Modal */}
      {selectedFlower && (
        <GratitudeCard
          flower={selectedFlower}
          onClose={() => setSelectedFlower(null)}
        />
      )}
    </div>
  );
};

export default FlowerGarden;