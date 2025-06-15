
/**
 * Utility functions for managing Secret Key storage in browser's localStorage
 * The key is stored locally only - no server sync or external storage
 */

const SECRET_KEY_STORAGE_KEY = 'marknest_secret_key';

/**
 * Save the Secret Key to localStorage
 * @param secretKey - The secret key string to save
 */
export const saveSecretKey = (secretKey: string): void => {
  try {
    localStorage.setItem(SECRET_KEY_STORAGE_KEY, secretKey);
    console.log('Secret key saved to localStorage');
  } catch (error) {
    console.error('Failed to save secret key:', error);
  }
};

/**
 * Retrieve the Secret Key from localStorage
 * @returns The stored secret key or null if not found
 */
export const getStoredSecretKey = (): string | null => {
  try {
    const storedKey = localStorage.getItem(SECRET_KEY_STORAGE_KEY);
    return storedKey;
  } catch (error) {
    console.error('Failed to retrieve secret key:', error);
    return null;
  }
};

/**
 * Clear the Secret Key from localStorage
 */
export const clearStoredSecretKey = (): void => {
  try {
    localStorage.removeItem(SECRET_KEY_STORAGE_KEY);
    console.log('Secret key cleared from localStorage');
  } catch (error) {
    console.error('Failed to clear secret key:', error);
  }
};

/**
 * Check if a Secret Key exists in storage
 * @returns boolean indicating if key exists
 */
export const hasStoredSecretKey = (): boolean => {
  return getStoredSecretKey() !== null;
};
