import React from 'react';
import { Theme } from '../types';

interface FloatingCloudsProps {
  theme: Theme;
}

const FloatingClouds: React.FC<FloatingCloudsProps> = ({ theme }) => {
  const getCloudColor = () => {
    switch (theme) {
      case 'sunset':
        return 'text-orange-100';
      case 'night':
        return 'text-indigo-200';
      default:
        return 'text-white';
    }
  };

  const clouds = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`absolute ${getCloudColor()} opacity-30 animate-float`}
      style={{
        left: `${10 + i * 15}%`,
        top: `${5 + (i % 3) * 20}%`,
        animationDelay: `${i * 2}s`,
        fontSize: `${20 + (i % 3) * 10}px`,
      }}
    >
      ☁️
    </div>
  ));

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{clouds}</div>;
};

export default FloatingClouds;