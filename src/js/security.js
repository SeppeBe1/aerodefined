// security.js — XSS & input sanitization utilities
// Include in every page that handles user input

const Security = {
  // Escape HTML entities — prevents XSS
  escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  // Strip dangerous characters from inputs — SQL injection defense
  sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/['"`;\\]/g, '')          // strip SQL chars
      .replace(/<[^>]*>/g, '')           // strip HTML tags
      .replace(/javascript:/gi, '')      // strip JS protocol
      .replace(/on\w+\s*=/gi, '')        // strip event handlers
      .trim()
      .slice(0, 500);                    // hard length limit
  },

  // Validate email format
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
  },

  // Validate password strength
  isStrongPassword(pw) {
    return pw.length >= 8 &&
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /[0-9]/.test(pw);
  },

  // Rate limiting (client-side — server must also enforce)
  rateLimit: {},
  checkRateLimit(key, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    const now = Date.now();
    if (!this.rateLimit[key]) this.rateLimit[key] = { count: 0, reset: now + windowMs };
    if (now > this.rateLimit[key].reset) {
      this.rateLimit[key] = { count: 0, reset: now + windowMs };
    }
    this.rateLimit[key].count++;
    return this.rateLimit[key].count <= maxAttempts;
  },

  // CSP nonce generator (for inline scripts — to be set server-side ideally)
  generateToken() {
    const arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2,'0')).join('');
  },

  // Safe DOM text setter — never use innerHTML with user data
  setText(el, text) {
    if (el) el.textContent = this.escapeHTML(text);
  },

  // Validate search query
  sanitizeSearch(q) {
    return this.sanitizeInput(q)
      .replace(/[^a-zA-Z0-9\s\-.,()]/g, '') // allow only safe chars
      .slice(0, 100);
  }
};

export default Security;
