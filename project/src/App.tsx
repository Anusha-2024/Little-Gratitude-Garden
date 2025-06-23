import React, { useState, useEffect, useRef } from 'react';
import { Download, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';
import FloatingClouds from './components/FloatingClouds';
import FlowerGarden from './components/FlowerGarden';
import EmotionSelector from './components/EmotionSelector';
import ComplimentDisplay from './components/ComplimentDisplay';
import FutureLetters from './components/FutureLetters';
import SoundMixer from './components/SoundMixer';
import ThemeSelector from './components/ThemeSelector';
import GratitudeTimeline from './components/GratitudeTimeline';
import WeeklyProgressTracker from './components/WeeklyProgressTracker';
import MagicalEffects from './components/MagicalEffects';
import { Flower, Theme, EmotionType, FutureLetter, SoundSettings, ComplimentMessage } from './types';
import { getFlowerForEmotion } from './utils/emotions';
import { getRandomCompliment } from './utils/compliments';
import { themeConfig } from './utils/themes';
import { getWeeklyProgress } from './utils/weeklyProgress';
import Footer from './components/Footer';

function App() {
  const [gratitudeText, setGratitudeText] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('happy');
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [isPlanting, setIsPlanting] = useState(false);
  const [theme, setTheme] = useState<Theme>('morning');
  const [showCompliment, setShowCompliment] = useState<ComplimentMessage | null>(null);
  const [futureLetters, setFutureLetters] = useState<FutureLetter[]>([]);
  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    birds: false,
    rain: false,
    windChimes: false,
    piano: false,
    volume: 50
  });
  const [showTimeline, setShowTimeline] = useState(false);
  const gardenRef = useRef<HTMLDivElement>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedFlowers = localStorage.getItem('gratitude-flowers');
    if (savedFlowers) {
      const parsedFlowers = JSON.parse(savedFlowers).map((flower: any) => ({
        ...flower,
        timestamp: new Date(flower.timestamp)
      }));
      setFlowers(parsedFlowers);
    }

    const savedLetters = localStorage.getItem('future-letters');
    if (savedLetters) {
      const parsedLetters = JSON.parse(savedLetters).map((letter: any) => ({
        ...letter,
        unlockDate: new Date(letter.unlockDate),
        createdAt: new Date(letter.createdAt)
      }));
      setFutureLetters(parsedLetters);
    }

    const savedTheme = localStorage.getItem('garden-theme');
    if (savedTheme) {
      setTheme(savedTheme as Theme);
    }

    const savedSounds = localStorage.getItem('sound-settings');
    if (savedSounds) {
      setSoundSettings(JSON.parse(savedSounds));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('gratitude-flowers', JSON.stringify(flowers));
  }, [flowers]);

  useEffect(() => {
    localStorage.setItem('future-letters', JSON.stringify(futureLetters));
  }, [futureLetters]);

  useEffect(() => {
    localStorage.setItem('garden-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sound-settings', JSON.stringify(soundSettings));
  }, [soundSettings]);

  // Check for unlockable letters
  useEffect(() => {
    const now = new Date();
    setFutureLetters(prev => prev.map(letter => {
      if (!letter.isUnlocked && now >= new Date(letter.unlockDate)) {
        return { ...letter, isUnlocked: true };
      }
      return letter;
    }));
  }, []);

  const plantFlower = () => {
    if (!gratitudeText.trim()) return;

    setIsPlanting(true);

    const newFlower: Flower = {
      id: Date.now(),
      message: gratitudeText.trim(),
      timestamp: new Date(),
      type: getFlowerForEmotion(selectedEmotion),
      emotion: selectedEmotion,
    };

    setTimeout(() => {
      setFlowers(prev => [...prev, newFlower]);
      setGratitudeText('');
      setIsPlanting(false);
      
      // Show compliment
      const compliment = getRandomCompliment();
      setShowCompliment(compliment);
    }, 500);
  };

  const addFutureLetter = (message: string, unlockDate: Date) => {
    const newLetter: FutureLetter = {
      id: Date.now(),
      message,
      unlockDate,
      createdAt: new Date(),
      isUnlocked: false
    };
    setFutureLetters(prev => [...prev, newLetter]);
  };

  const unlockLetter = (id: number) => {
    setFutureLetters(prev => prev.map(letter => 
      letter.id === id ? { ...letter, isUnlocked: true } : letter
    ));
  };

  const downloadGarden = async () => {
    if (!gardenRef.current) return;

    try {
      const canvas = await html2canvas(gardenRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.download = `gratitude-garden-${new Date().toLocaleDateString()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading garden:', error);
    }
  };

  const getThemeClasses = () => {
    return themeConfig[theme].background;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      plantFlower();
    }
  };

  const weeklyProgress = getWeeklyProgress(flowers);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeClasses()} relative overflow-hidden transition-all duration-1000`}>
      <FloatingClouds theme={theme} />
      <MagicalEffects flowerCount={flowers.length} theme={theme} />
      
      {/* Header Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <SoundMixer settings={soundSettings} onSettingsChange={setSoundSettings} />
        <ThemeSelector theme={theme} onThemeChange={setTheme} />
        <button
          onClick={downloadGarden}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
          title="Download Garden"
        >
          <Download className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10" ref={gardenRef}>
        {/* Title Section */}
        <div className="text-center mb-12 animate-float">
          <h1 className={`font-pacifico text-4xl md:text-6xl mb-4 drop-shadow-lg ${
            theme === 'morning' ? 'text-gray-800' : 'text-white'
          }`}>
            Little Gratitude Garden 🌷
          </h1>
          <p className={`font-quicksand text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
            theme === 'morning' ? 'text-gray-800/90' : 'text-white/90'
          }`}>
            Plant your joy, one flower at a time. Each bloom represents a moment of gratitude in your beautiful garden of appreciation.
          </p>
        </div>

        {/* Weekly Progress */}
        {flowers.length > 0 && (
          <WeeklyProgressTracker progress={weeklyProgress} />
        )}

        {/* Input Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="card-glass">
            <EmotionSelector 
              selectedEmotion={selectedEmotion}
              onEmotionChange={setSelectedEmotion}
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={gratitudeText}
                onChange={(e) => setGratitudeText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="I'm grateful for..."
                className="input-field flex-1 text-center sm:text-left"
                maxLength={200}
                disabled={isPlanting}
              />
              <button
                onClick={plantFlower}
                disabled={!gratitudeText.trim() || isPlanting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] relative overflow-hidden"
              >
                {isPlanting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">🌱</span>
                    Planting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Plant it 🌼
                  </span>
                )}
              </button>
            </div>
            
            {gratitudeText && (
              <div className="mt-3 text-sm text-white/70 text-center">
                {gratitudeText.length}/200 characters
              </div>
            )}
          </div>
        </div>

        {/* Compliment Display */}
        <div className="mb-8">
          <ComplimentDisplay 
            compliment={showCompliment}
            onComplete={() => setShowCompliment(null)}
          />
        </div>

        {/* Future Letters */}
        <FutureLetters
          letters={futureLetters}
          onAddLetter={addFutureLetter}
          onUnlockLetter={unlockLetter}
        />

        {/* Timeline Toggle */}
        {flowers.length > 0 && (
          <GratitudeTimeline
            flowers={flowers}
            isVisible={showTimeline}
            onToggle={() => setShowTimeline(!showTimeline)}
          />
        )}

        {/* Garden Section */}
        {!showTimeline && (
          <FlowerGarden flowers={flowers} theme={theme} />
        )}

        {/* Stats */}
        {flowers.length > 0 && !showTimeline && (
          <div className="text-center mt-8">
            <div className="card-glass inline-block">
              <div className="flex items-center gap-2 text-white">
                <Heart className="w-5 h-5 text-pink-300" />
                <span className="font-quicksand">
                  You've planted {flowers.length} flower{flowers.length !== 1 ? 's' : ''} of gratitude
                </span>
                <Heart className="w-5 h-5 text-pink-300" />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer theme={theme} />
    </div>
  );
}

export default App;