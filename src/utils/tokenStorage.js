// utils/tokenStorage.js
const TOKEN_KEY = 'auth_tokens';

// Store tokens securely
export const storeTokens = (tokens) => {
  try {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
};

// Retrieve tokens
export const getTokens = () => {
  try {
    const tokens = localStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    return null;
  }
};

// Remove tokens (on logout)
export const removeTokens = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing tokens:', error);
  }
};