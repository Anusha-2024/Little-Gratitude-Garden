import { WeeklyProgress } from '../types';
import { startOfWeek, isSameWeek } from 'date-fns';

export const getWeeklyProgress = (flowers: any[]): WeeklyProgress => {
  const now = new Date();
  const weekStart = startOfWeek(now);
  
  const thisWeekFlowers = flowers.filter(flower => 
    isSameWeek(new Date(flower.timestamp), now)
  );

  return {
    weekStart,
    flowerCount: thisWeekFlowers.length
  };
};

export const getProgressPercentage = (count: number): number => {
  const maxWeeklyGoal = 21; // 3 flowers per day
  return Math.min((count / maxWeeklyGoal) * 100, 100);
};