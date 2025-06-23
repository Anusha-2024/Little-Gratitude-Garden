import { ComplimentMessage } from '../types';

export const compliments: ComplimentMessage[] = [
  { text: "You're blooming beautifully", emoji: "🌱" },
  { text: "Joy grows where gratitude flows", emoji: "✨" },
  { text: "Your heart is a garden of wonder", emoji: "🌺" },
  { text: "Gratitude makes everything beautiful", emoji: "🦋" },
  { text: "You're cultivating magic", emoji: "🪄" },
  { text: "Your soul is sunshine", emoji: "☀️" },
  { text: "Kindness blooms from within", emoji: "🌼" },
  { text: "You're growing something beautiful", emoji: "🌿" },
  { text: "Your gratitude lights up the world", emoji: "💫" },
  { text: "Every flower tells your story", emoji: "📖" },
  { text: "You're a garden of possibilities", emoji: "🌈" },
  { text: "Your heart knows how to bloom", emoji: "💖" }
];

export const getRandomCompliment = (): ComplimentMessage => {
  return compliments[Math.floor(Math.random() * compliments.length)];
};