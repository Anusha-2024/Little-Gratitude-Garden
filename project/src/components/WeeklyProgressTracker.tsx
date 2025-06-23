import React from 'react';
import { TrendingUp } from 'lucide-react';
import { WeeklyProgress } from '../types';
import { getProgressPercentage } from '../utils/weeklyProgress';

interface WeeklyProgressTrackerProps {
  progress: WeeklyProgress;
}

const WeeklyProgressTracker: React.FC<WeeklyProgressTrackerProps> = ({ progress }) => {
  const percentage = getProgressPercentage(progress.flowerCount);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="text-center mb-8">
      <div className="card-glass inline-block">
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF69B4" />
                  <stop offset="100%" stopColor="#9370DB" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-pulse-soft">🌱</span>
            </div>
          </div>
          
          <div className="text-left">
            <div className="flex items-center gap-2 text-white mb-1">
              <TrendingUp className="w-5 h-5 text-pink-300" />
              <span className="font-quicksand font-semibold">This Week</span>
            </div>
            <p className="text-white/90 font-quicksand">
              You planted <span className="font-bold text-pink-200">{progress.flowerCount}</span> flower{progress.flowerCount !== 1 ? 's' : ''}!
            </p>
            {progress.flowerCount >= 7 && (
              <p className="text-pink-200 text-sm font-quicksand mt-1">
                Amazing consistency! 🌟
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgressTracker;