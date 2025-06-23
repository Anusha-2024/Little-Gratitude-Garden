import React, { useEffect, useState } from 'react';

interface MagicalEffectsProps {
  flowerCount: number;
  theme: string;
}

const MagicalEffects: React.FC<MagicalEffectsProps> = ({ flowerCount, theme }) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [fireflies, setFireflies] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [butterflies, setButterflies] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  // Sparkle trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      
      setSparkles(prev => [...prev.slice(-5), newSparkle]);
      
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fireflies after 5 flowers
  useEffect(() => {
    if (flowerCount >= 5) {
      const newFireflies = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 2
      }));
      setFireflies(newFireflies);
    }
  }, [flowerCount]);

  // Butterflies after 10 flowers
  useEffect(() => {
    if (flowerCount >= 10) {
      const newButterflies = Array.from({ length: 2 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 3
      }));
      setButterflies(newButterflies);
    }
  }, [flowerCount]);

  // Falling petals
  useEffect(() => {
    if (flowerCount > 0) {
      const interval = setInterval(() => {
        const newPetal = {
          id: Date.now(),
          x: Math.random() * 100,
          delay: 0
        };
        
        setPetals(prev => [...prev, newPetal]);
        
        setTimeout(() => {
          setPetals(prev => prev.filter(p => p.id !== newPetal.id));
        }, 8000);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [flowerCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {/* Sparkle trail */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute text-yellow-300 text-sm animate-ping"
          style={{
            left: sparkle.x - 10,
            top: sparkle.y - 10,
          }}
        >
          ✨
        </div>
      ))}

      {/* Fireflies */}
      {fireflies.map(firefly => (
        <div
          key={firefly.id}
          className="absolute text-yellow-200 text-lg animate-pulse-soft"
          style={{
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            animationDelay: `${firefly.delay}s`,
          }}
        >
          <div className="animate-float" style={{ animationDelay: `${firefly.delay}s` }}>
            ✨
          </div>
        </div>
      ))}

      {/* Butterflies */}
      {butterflies.map(butterfly => (
        <div
          key={butterfly.id}
          className="absolute text-2xl animate-bounce-gentle"
          style={{
            left: `${butterfly.x}%`,
            top: `${butterfly.y}%`,
            animationDelay: `${butterfly.delay}s`,
          }}
        >
          🦋
        </div>
      ))}

      {/* Falling petals */}
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute text-pink-300 text-lg animate-fall"
          style={{
            left: `${petal.x}%`,
            top: '-10px',
            animationDelay: `${petal.delay}s`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
};

export default MagicalEffects;