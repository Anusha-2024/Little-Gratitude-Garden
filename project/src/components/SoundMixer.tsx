import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { SoundSettings } from '../types';

interface SoundMixerProps {
  settings: SoundSettings;
  onSettingsChange: (settings: SoundSettings) => void;
}

const SoundMixer: React.FC<SoundMixerProps> = ({ settings, onSettingsChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const sounds = [
    { key: 'birds', name: 'Birds', emoji: '🐦' },
    { key: 'rain', name: 'Rain', emoji: '🌧️' },
    { key: 'windChimes', name: 'Wind Chimes', emoji: '🎐' },
    { key: 'piano', name: 'Lo-fi Piano', emoji: '🎹' },
  ];

  useEffect(() => {
    // In a real implementation, you would load actual audio files
    // For now, we'll simulate the audio management
    sounds.forEach(sound => {
      const isEnabled = settings[sound.key as keyof SoundSettings] as boolean;
      if (isEnabled && !audioRefs.current[sound.key]) {
        // Create audio element (would load actual files in production)
        audioRefs.current[sound.key] = new Audio();
        audioRefs.current[sound.key].loop = true;
        audioRefs.current[sound.key].volume = settings.volume / 100;
      } else if (!isEnabled && audioRefs.current[sound.key]) {
        audioRefs.current[sound.key].pause();
        delete audioRefs.current[sound.key];
      }
    });

    // Update volume for all playing sounds
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = settings.volume / 100;
    });
  }, [settings]);

  const toggleSound = (soundKey: string) => {
    onSettingsChange({
      ...settings,
      [soundKey]: !settings[soundKey as keyof SoundSettings]
    });
  };

  const hasAnySoundEnabled = sounds.some(sound => settings[sound.key as keyof SoundSettings]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
        title="Sound Mixer"
      >
        {hasAnySoundEnabled ? (
          <Volume2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl min-w-[200px] animate-bloom">
          <h4 className="font-quicksand font-semibold text-gray-800 mb-3 text-center">
            Ambient Sounds
          </h4>
          
          <div className="space-y-2 mb-4">
            {sounds.map(sound => (
              <button
                key={sound.key}
                onClick={() => toggleSound(sound.key)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${
                  settings[sound.key as keyof SoundSettings]
                    ? 'bg-pink-100 text-pink-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{sound.emoji}</span>
                <span className="font-quicksand text-sm">{sound.name}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-3">
            <label className="block text-sm font-quicksand text-gray-700 mb-2">
              Volume: {settings.volume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.volume}
              onChange={(e) => onSettingsChange({ ...settings, volume: parseInt(e.target.value) })}
              className="w-full accent-pink-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundMixer;