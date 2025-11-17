// Content filtering to block phone numbers, emails, and social media handles

// Regex patterns for detecting prohibited content
const PHONE_PATTERNS = [
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, // US format: 123-456-7890
  /\b\d{10}\b/g, // 10 digits
  /\+\d{1,3}\s?\d{1,14}/g, // International format
  /\(\d{3}\)\s?\d{3}[-.]?\d{4}/g, // (123) 456-7890
];

const EMAIL_PATTERNS = [
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  /\b[A-Za-z0-9._%+-]+\s*@\s*[A-Za-z0-9.-]+\s*\.\s*[A-Z|a-z]{2,}\b/g, // With spaces
  /\b[A-Za-z0-9._%+-]+\s*\[\s*at\s*\]\s*[A-Za-z0-9.-]+/g, // email [at] domain
];

const SOCIAL_HANDLE_PATTERNS = [
  /@[A-Za-z0-9_]{1,30}\b/g, // Twitter/Instagram handles
  /\b(?:instagram|insta|ig|twitter|snap|snapchat|facebook|fb|whatsapp|telegram|discord|tiktok|youtube)\s*[:@]?\s*[A-Za-z0-9_]+/gi,
];

const URL_PATTERNS = [
  /https?:\/\/[^\s]+/g,
  /www\.[^\s]+/g,
  /\b[A-Za-z0-9-]+\.(com|net|org|io|co|app|me|xyz|tv)\b/gi,
];

// Obfuscation patterns people might use
const OBFUSCATION_PATTERNS = [
  /\b[A-Za-z0-9]\s+[A-Za-z0-9]\s+[A-Za-z0-9]\s+[A-Za-z0-9]/g, // Spaced out text
  /[A-Za-z0-9][._-][A-Za-z0-9][._-][A-Za-z0-9]/g, // Connected with symbols
];

/**
 * Check if message contains prohibited content
 * @param {string} message - The message to check
 * @returns {object} - { isAllowed: boolean, reason: string }
 */
export const checkMessage = (message) => {
  if (!message || message.trim().length === 0) {
    return { isAllowed: true };
  }

  // Check for phone numbers
  for (const pattern of PHONE_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isAllowed: false,
        reason: 'Phone numbers are not allowed. Please keep the conversation within the app.',
      };
    }
  }

  // Check for emails
  for (const pattern of EMAIL_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isAllowed: false,
        reason: 'Email addresses are not allowed. Please keep the conversation within the app.',
      };
    }
  }

  // Check for social media handles
  for (const pattern of SOCIAL_HANDLE_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isAllowed: false,
        reason: 'Social media handles are not allowed. Please keep the conversation within the app.',
      };
    }
  }

  // Check for URLs
  for (const pattern of URL_PATTERNS) {
    if (pattern.test(message)) {
      return {
        isAllowed: false,
        reason: 'Links are not allowed. Please keep the conversation within the app.',
      };
    }
  }

  return { isAllowed: true };
};

/**
 * Sanitize message for display
 * @param {string} message - The message to sanitize
 * @returns {string} - Sanitized message
 */
export const sanitizeMessage = (message) => {
  if (!message) return '';

  // Remove excessive whitespace
  let sanitized = message.replace(/\s+/g, ' ').trim();

  // Limit message length
  const MAX_LENGTH = 500;
  if (sanitized.length > MAX_LENGTH) {
    sanitized = sanitized.substring(0, MAX_LENGTH);
  }

  return sanitized;
};

/**
 * Check if user might be trying to bypass filters
 * @param {string} message - The message to check
 * @returns {boolean} - True if suspicious patterns detected
 */
export const detectObfuscation = (message) => {
  for (const pattern of OBFUSCATION_PATTERNS) {
    if (pattern.test(message)) {
      return true;
    }
  }
  return false;
};
