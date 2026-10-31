/**
 * Validation utilities for JSP ForgeCore customer forms
 */

export function isValidIndianPhone(phone: string): boolean {
  if (!phone) return false;
  // Strip spaces, dashes, parentheses, +91 or 0 prefix
  const cleaned = phone.replace(/[\s\-()+]/g, '').replace(/^91/, '').replace(/^0/, '');
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function sanitizeInput(input: string): string {
  return input ? input.trim().slice(0, 2000) : '';
}

export function formatIndianCurrency(amount: number): string {
  if (!amount || isNaN(amount)) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}
