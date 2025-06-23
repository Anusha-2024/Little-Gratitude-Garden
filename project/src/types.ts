export interface Flower {
  id: number;
  message: string;
  timestamp: Date;
  type: string;
  emotion: EmotionType;
}

export type Theme = 'morning' | 'night' | 'cottagecore' | 'kawaii';

export type EmotionType = 'happy' | 'peaceful' | 'love' | 'sad';

export interface FutureLetter {
  id: number;
  message: string;
  unlockDate: Date;
  createdAt: Date;
  isUnlocked: boolean;
}

export interface SoundSettings {
  birds: boolean;
  rain: boolean;
  windChimes: boolean;
  piano: boolean;
  volume: number;
}

export interface WeeklyProgress {
  weekStart: Date;
  flowerCount: number;
}

export interface ComplimentMessage {
  text: string;
  emoji: string;
}