import { EmotionType } from '../types';

export const emotionConfig = {
  happy: {
    emoji: '😊',
    flower: '🌻',
    name: 'Happy',
    color: 'from-yellow-200 to-orange-200'
  },
  peaceful: {
    emoji: '😌',
    flower: '🪻',
    name: 'Peaceful',
    color: 'from-purple-200 to-blue-200'
  },
  love: {
    emoji: '💕',
    flower: '🌹',
    name: 'Love',
    color: 'from-pink-200 to-red-200'
  },
  sad: {
    emoji: '😢',
    flower: '🌸',
    name: 'Gentle',
    color: 'from-blue-200 to-indigo-200'
  }
};

export const getFlowerForEmotion = (emotion: EmotionType): string => {
  return emotionConfig[emotion].flower;
};