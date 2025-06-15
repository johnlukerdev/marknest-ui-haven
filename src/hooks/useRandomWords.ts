
import { useState, useEffect } from 'react';
import { generateSecretKeyWords } from '../utils/wordGenerator';

export function useRandomWords() {
  const [words, setWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const regenerateWords = () => {
    setIsLoading(true);
    // Add a small delay to show the loading state
    setTimeout(() => {
      const newWords = generateSecretKeyWords();
      setWords(newWords);
      setIsLoading(false);
    }, 100);
  };

  useEffect(() => {
    regenerateWords();
  }, []);

  return {
    words,
    isLoading,
    regenerateWords
  };
}
