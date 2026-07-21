/**
 * Validation utility for Dr. Shenouda Dental Clinic forms
 */

export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return false;
  }
  return true;
};

export const validatePhone = (phone) => {
  if (!phone) return false;
  // Egyptian and international formats: optional leading +, 7-15 digits (FR-004)
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  return phoneRegex.test(phone.trim());
};

export const validateEmail = (email) => {
  if (!email || email.trim() === '') return true; // Optional field (landing page)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Email required variant for the booking page where email is mandatory (FR-003, FR-005)
export const validateEmailRequired = (email) => {
  if (!email || email.trim() === '') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};
