/**
 * ZM Constructions - Core Client-Side Security Shield
 * Mitigates OWASP Top 10 and common "Vibe-Coded" vulnerabilities.
 */

// 1. Prototype Pollution Defense
export function safeMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  if (!target || typeof target !== 'object') {
    target = Object.create(null);
  }

  const keys = Object.keys(source);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    
    // Ignore dangerous prototype pollution keys
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }

    const sourceVal = source[key];
    if (sourceVal && typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
      target[key] = safeMerge(target[key] || Object.create(null), sourceVal);
    } else {
      target[key] = sourceVal;
    }
  }
  return target;
}

// 2. SSTI, XSS, and SQLi String Sanitization
export function sanitizeString(val) {
  if (val === undefined || val === null) return '';
  
  // Enforce strict primitive type casting to mitigate NoSQL Injection (relational payloads)
  let str = String(val);
  
  // Cap length to prevent Buffer/Allocation exhaustion
  if (str.length > 500) {
    str = str.slice(0, 500);
  }

  // Escape HTML entities to prevent Reflected XSS
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/;/g, '') // Strip semicolons to block SQL statement splits
    .replace(/--/g, ''); // Strip comments
}

// 3. ReDoS (Catastrophic Backtracking) Regular Expression Validator
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  
  // Hard length cap to prevent ReDoS triggers on massive strings
  if (email.length > 100) return false;

  // Simple, linear non-backtracking regex for email validation
  // Avoids nested quantifiers like (a+)+
  const simpleEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return simpleEmailRegex.test(email);
}

// 4. Long Password DoS Mitigation
export function preparePassword(password) {
  if (!password || typeof password !== 'string') return '';
  
  // Hard cap password at 128 characters BEFORE sending to hashing/mock-auth
  // This blocks CPU-exhaustion hashing attacks (bcrypt/scrypt bottlenecks)
  return password.slice(0, 128);
}

// 5. Open Redirect Whitelist Validation
const WHitelisted_PAGES = [
  'home', 'about', 'services', 'projects', 'project-details', 
  'team', 'careers', 'blog', 'blog-details', 'contact', 'quote-request'
];

export function verifyRedirectPage(pageId) {
  if (!pageId || typeof pageId !== 'string') return 'home';
  const cleanId = pageId.toLowerCase().trim();
  return WHitelisted_PAGES.includes(cleanId) ? cleanId : 'home';
}
