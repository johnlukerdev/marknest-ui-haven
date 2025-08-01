
// Simple English words for secret key generation
const SIMPLE_WORDS = [
  'cat', 'dog', 'tree', 'book', 'run', 'smile', 'house', 'car',
  'bird', 'fish', 'sun', 'moon', 'star', 'light', 'dark', 'red',
  'blue', 'green', 'happy', 'sad', 'fast', 'slow', 'big', 'small',
  'water', 'fire', 'earth', 'wind', 'love', 'hope', 'dream', 'play',
  'work', 'sleep', 'eat', 'walk', 'jump', 'dance', 'sing', 'laugh',
  'cry', 'think', 'learn', 'teach', 'help', 'share', 'give', 'take',
  'build', 'break', 'fix', 'make', 'create', 'write', 'read', 'listen',
  'speak', 'see', 'hear', 'feel', 'touch', 'smell', 'taste', 'know',
  'find', 'lose', 'win', 'lose', 'start', 'stop', 'go', 'come',
  'stay', 'leave', 'open', 'close', 'push', 'pull', 'lift', 'drop',
  'warm', 'cold', 'hot', 'cool', 'fresh', 'old', 'new', 'clean',
  'dirty', 'soft', 'hard', 'smooth', 'rough', 'sweet', 'sour', 'bitter',
  'salt', 'sugar', 'bread', 'milk', 'fruit', 'flower', 'grass', 'cloud',
  'rain', 'snow', 'wind', 'storm', 'peace', 'quiet', 'noise', 'sound',
  'music', 'song', 'voice', 'word', 'story', 'poem', 'art', 'paint',
  'draw', 'color', 'shape', 'line', 'circle', 'square', 'heart', 'mind',
  'soul', 'body', 'hand', 'foot', 'eye', 'ear', 'nose', 'mouth',
  'hair', 'skin', 'bone', 'blood', 'life', 'death', 'birth', 'grow',
  'child', 'adult', 'young', 'old', 'man', 'woman', 'friend', 'family',
  'mother', 'father', 'sister', 'brother', 'baby', 'gift', 'party', 'game'
];

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate an array of unique random words
 */
export function generateRandomWords(count: number): string[] {
  const shuffled = shuffleArray(SIMPLE_WORDS);
  return shuffled.slice(0, Math.min(count, SIMPLE_WORDS.length));
}

/**
 * Generate words specifically for secret key display (24 words in 4x6 grid)
 */
export function generateSecretKeyWords(): string[] {
  return generateRandomWords(24);
}
