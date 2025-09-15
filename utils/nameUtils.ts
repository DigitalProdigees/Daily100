/**
 * Utility functions for name handling
 */

/**
 * Extracts a display name from an email address
 * Takes the part before @ and capitalizes the first letter
 * @param email - The email address
 * @returns The extracted and formatted name
 */
export const extractNameFromEmail = (email: string | null): string => {
  if (!email) return 'User';
  
  const namePart = email.split('@')[0];
  
  // Remove special characters but keep letters and numbers
  const cleanName = namePart.replace(/[^a-zA-Z0-9]/g, '');
  
  // If no characters found, return a default
  if (!cleanName) return 'User';
  
  // If it's all numbers, return the numbers as is
  if (/^\d+$/.test(cleanName)) {
    return cleanName;
  }
  
  // If it contains letters, capitalize first letter and make rest lowercase
  const lettersOnly = cleanName.replace(/[^a-zA-Z]/g, '');
  if (lettersOnly) {
    return lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase();
  }
  
  // Fallback to the cleaned name
  return cleanName;
};

/**
 * Gets a display name from user data
 * Prioritizes displayName, then falls back to email extraction
 * @param user - User object with displayName and email
 * @returns The best available display name
 */
export const getDisplayName = (user: { displayName?: string | null; email?: string | null } | null): string => {
  if (!user) return 'User';
  
  if (user.displayName && user.displayName.trim()) {
    return user.displayName.trim();
  }
  
  return extractNameFromEmail(user.email);
};