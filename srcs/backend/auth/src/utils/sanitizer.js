export function sanitizeString(input) {
  if (typeof input !== "string") return input;

  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

export function sanitizeEmail(email) {
  if (typeof email !== "string") return email;

  return email.toLowerCase().trim();
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone) {
  const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

export function sanitizePhoneNumber(phone) {
  if (typeof phone !== "string") return phone;

  return phone.replace(/[^\d+]/g, "");
}

export function sanitizeObject(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return sanitizeString(obj);

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === "object") {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export function isStrongPassword(password) {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return minLength && hasUpperCase && hasLowerCase && hasNumber;
}

export default {
  sanitizeString,
  sanitizeEmail,
  sanitizePhoneNumber,
  sanitizeObject,
  isValidEmail,
  isValidPhoneNumber,
  isStrongPassword,
};
