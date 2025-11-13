// src/utils/luhn.js
export function validateCustomerNumber(num) {
  const digits = num.replace(/\D/g, '').split('').map(Number);
  if (digits.length !== 8) return false;

  let sum = 0;
  for (let i = 0; i < 7; i++) {
    sum += digits[i] * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === digits[7];
}
