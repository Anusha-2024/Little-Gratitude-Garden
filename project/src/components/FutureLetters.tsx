import React, { useState } from 'react';
import { Mail, Calendar, Sparkles } from 'lucide-react';
import { FutureLetter } from '../types';

interface FutureLettersProps {
  letters: FutureLetter[];
  onAddLetter: (message: string, unlockDate: Date) => void;
  onUnlockLetter: (id: number) => void;
}

const FutureLetters: React.FC<FutureLettersProps> = ({ letters, onAddLetter, onUnlockLetter }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [message, setMessage] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [showUnlocked, setShowUnlocked] = useState<number | null>(null);

  const handleSubmit = () => {
    if (message.trim() && unlockDate) {
      onAddLetter(message.trim(), new Date(unlockDate));
      setMessage('');
      setUnlockDate('');
      setIsWriting(false);
    }
  };

  const handleUnlock = (letter: FutureLetter) => {
    onUnlockLetter(letter.id);
    setShowUnlocked(letter.id);
    setTimeout(() => setShowUnlocked(null), 5000);
  };

  const unlockedLetters = letters.filter(l => l.isUnlocked);
  const lockedLetters = letters.filter(l => !l.isUnlocked && new Date() >= new Date(l.unlockDate));

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="text-center mb-6">
        <h3 className="font-pacifico text-2xl text-white mb-2 drop-shadow-lg">
          Letters to Future You 💌
        </h3>
        <p className="text-white/80 font-quicksand">
          Write yourself a note to open later
        </p>
      </div>

      {!isWriting ? (
        <div className="text-center">
          <button
            onClick={() => setIsWriting(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Write a Letter
          </button>
        </div>
      ) : (
        <div className="card-glass animate-bloom">
          <div className="space-y-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Dear future me..."
              className="w-full h-32 bg-white/30 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
              maxLength={500}
            />
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5" />
                <span className="font-quicksand">Open on:</span>
              </div>
              <input
                type="date"
                value={unlockDate}
                onChange={(e) => setUnlockDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-white/30 backdrop-blur-sm border border-white/50 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || !unlockDate}
                className="btn-primary disabled:opacity-50"
              >
                Seal Letter ✉️
              </button>
              <button
                onClick={() => setIsWriting(false)}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ready to unlock letters */}
      {lockedLetters.length > 0 && (
        <div className="mt-6">
          <h4 className="font-quicksand text-lg text-white text-center mb-4">
            Ready to Open! ✨
          </h4>
          <div className="space-y-3">
            {lockedLetters.map(letter => (
              <div key={letter.id} className="card-glass">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl animate-bounce-gentle">💌</div>
                    <div className="text-white">
                      <p className="font-quicksand">Letter from {letter.createdAt.toLocaleDateString()}</p>
                      <p className="text-sm text-white/70">Ready to open!</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnlock(letter)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unlocked letter display */}
      {showUnlocked && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-bloom relative">
            <div className="absolute -top-2 -right-2 text-3xl animate-spin-slow">✨</div>
            <div className="absolute -bottom-2 -left-2 text-3xl animate-spin-slow">💫</div>
            
            <div className="text-center mb-6">
              <h4 className="font-pacifico text-2xl text-gray-800 mb-2">
                A Message from Past You 💕
              </h4>
            </div>
            
            {unlockedLetters.find(l => l.id === showUnlocked) && (
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
                <p className="text-gray-700 font-quicksand leading-relaxed">
                  {unlockedLetters.find(l => l.id === showUnlocked)?.message}
                </p>
              </div>
            )}
            
            <button
              onClick={() => setShowUnlocked(null)}
              className="w-full btn-primary"
            >
              Close with Love 💖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureLetters;