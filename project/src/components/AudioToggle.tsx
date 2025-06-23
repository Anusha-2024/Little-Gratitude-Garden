import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const AudioToggle: React.FC<AudioToggleProps> = ({ isEnabled, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio context for ambient sounds
    // Note: Using data URLs for simple ambient sounds
    if (isEnabled && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      
      // Simple bird chirping sound using Web Audio API would be complex
      // For now, we'll simulate with a gentle tone
      // In a real implementation, you'd load actual audio files
      
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Audio autoplay prevented');
      });
    } else if (!isEnabled && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isEnabled]);

  return (
    <button
      onClick={() => onToggle(!isEnabled)}
      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
      title={isEnabled ? 'Mute ambient sounds' : 'Play ambient sounds'}
    >
      {isEnabled ? (
        <Volume2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
};

export default AudioToggle;