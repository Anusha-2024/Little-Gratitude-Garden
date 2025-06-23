import React from 'react';
import { Palette } from 'lucide-react';
import { Theme } from '../types';
import { themeConfig } from '../utils/themes';

interface ThemeSelectorProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, onThemeChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group flex items-center gap-2"
        title={`Current theme: ${themeConfig[theme].name}`}
      >
        <span className="text-lg group-hover:scale-110 transition-transform">
          {themeConfig[theme].emoji}
        </span>
        <Palette className="w-4 h-4 text-white group-hover:scale-110 transition-transform hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl min-w-[200px] animate-bloom">
          <h4 className="font-quicksand font-semibold text-gray-800 mb-3 text-center">
            Garden Themes
          </h4>
          
          <div className="space-y-2">
            {Object.entries(themeConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => {
                  onThemeChange(key as Theme);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  theme === key
                    ? 'bg-pink-100 text-pink-800 ring-2 ring-pink-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{config.emoji}</span>
                <span className="font-quicksand text-sm">{config.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;