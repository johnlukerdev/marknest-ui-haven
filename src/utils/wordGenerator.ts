
// Vowels and consonants for creating pronounceable words
const VOWELS = 'aeiou';
const CONSONANTS = 'bcdfghjklmnpqrstvwxyz';

// Common syllable patterns for more realistic words
const PATTERNS = [
  'cvc', 'cvvc', 'ccvc', 'cvcv', 'vcvc', 'cvccv'
];

/**
 * Generate a single random word of specified length
 */
function generateWord(length: number): string {
  // Choose a pattern that fits the length
  const availablePatterns = PATTERNS.filter(p => p.length <= length);
  const pattern = availablePatterns[Math.floor(Math.random() * availablePatterns.length)] || 'cvc';
  
  let word = '';
  
  for (let i = 0; i < pattern.length && word.length < length; i++) {
    const char = pattern[i];
    if (char === 'c') {
      word += CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
    } else if (char === 'v') {
      word += VOWELS[Math.floor(Math.random() * VOWELS.length)];
    }
  }
  
  // Fill remaining length with alternating consonants and vowels
  while (word.length < length) {
    if (word.length % 2 === 0) {
      word += CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
    } else {
      word += VOWELS[Math.floor(Math.random() * VOWELS.length)];
    }
  }
  
  return word.toLowerCase();
}

/**
 * Generate an array of unique random words
 */
export function generateRandomWords(count: number): string[] {
  const words = new Set<string>();
  const maxAttempts = count * 10; // Prevent infinite loops
  let attempts = 0;
  
  while (words.size < count && attempts < maxAttempts) {
    const length = Math.floor(Math.random() * 3) + 5; // 5-7 letters
    const word = generateWord(length);
    
    // Only add if it's not a duplicate and looks reasonable
    if (word.length >= 5 && word.length <= 7) {
      words.add(word);
    }
    attempts++;
  }
  
  return Array.from(words);
}

/**
 * Generate words specifically for secret key display (24 words in 4x6 grid)
 */
export function generateSecretKeyWords(): string[] {
  return generateRandomWords(24);
}
