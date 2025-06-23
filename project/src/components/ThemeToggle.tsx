import React from 'react';
import { Palette } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onThemeChange }) => {
  const themes: { key: Theme; name: string; emoji: string }[] = [
    { key: 'sunrise', name: 'Sunrise Garden', emoji: '🌅' },
    { key: 'sunset', name: 'Sunset Garden', emoji: '🌇' },
    { key: 'night', name: 'Night Garden', emoji: '🌙' },
  ];

  const nextTheme = () => {
    const currentIndex = themes.findIndex(t => t.key === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    onThemeChange(themes[nextIndex].key);
  };

  const currentTheme = themes.find(t => t.key === theme);

  return (
    <button
      onClick={nextTheme}
      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group flex items-center gap-2"
      title={`Switch to next theme (Current: ${currentTheme?.name})`}
    >
      <span className="text-lg group-hover:scale-110 transition-transform">
        {currentTheme?.emoji}
      </span>
      <Palette className="w-4 h-4 text-white group-hover:scale-110 transition-transform hidden sm:block" />
    </button>
  );
};

export default ThemeToggle;