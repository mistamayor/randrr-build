// Avatar presets for user selection
export const AVATARS = [
  { id: 'gradient-1', name: 'Gradient', emoji: '🌈', gradient: ['#FF6B6B', '#4ECDC4'] },
  { id: 'red', name: 'Red Circle', emoji: '🔴', color: '#FF4444' },
  { id: 'person', name: 'Person', emoji: '👤', color: '#D4A574' },
  { id: 'robot', name: 'Robot', emoji: '🤖', color: '#A5B4C4' },
  { id: 'ghost', name: 'Ghost', emoji: '👻', color: '#D4E4E4' },
  { id: 'origami', name: 'Origami', emoji: '🦢', color: '#FFA500' },
  { id: 'cat', name: 'Cat', emoji: '🐱', color: '#8B7355' },
  { id: 'planet', name: 'Planet', emoji: '🪐', color: '#C4A484' },
  { id: 'game', name: 'Game', emoji: '🎮', color: '#6B7280' },
  { id: 'music', name: 'Music', emoji: '🎵', color: '#4B5563' },
  { id: 'book', name: 'Book', emoji: '📚', color: '#92400E' },
  { id: 'art', name: 'Art', emoji: '🎨', color: '#7C3AED' },
];

// Generate random username
export const generateUsername = () => {
  const adjectives = [
    'Silent', 'Cosmic', 'Mystic', 'Witty', 'Brave', 'Clever',
    'Swift', 'Noble', 'Gentle', 'Wise', 'Bold', 'Calm',
    'Bright', 'Lucky', 'Happy', 'Cool', 'Epic', 'Wild'
  ];

  const nouns = [
    'Explorer', 'Wanderer', 'Dreamer', 'Thinker', 'Seeker',
    'Warrior', 'Wizard', 'Phoenix', 'Dragon', 'Tiger',
    'Wolf', 'Eagle', 'Fox', 'Bear', 'Lion', 'Panda'
  ];

  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adj}${noun}_${randomNum}`;
};

export const getRandomAvatar = () => {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
};
