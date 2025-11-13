// src/components/CustomerLogin.js
import { loginCustomer } from '../services/customer.js';

export function CustomerLogin({ onLogin }) {
  const el = document.createElement('div');
  el.innerHTML = `
    <h1>Early Bird Management System</h1>
    <p class="text-center text-gray-600 mb-6">Enter your 8-digit customer number</p>

    <label>Customer Number</label>
    <input id="cust-num" type="text" maxlength="8" placeholder="e.g. 38429734" />

    <button id="login-btn">Login</button>
    <p id="error" class="error"></p>
  `;

  const input = el.querySelector('#cust-num');
  const btn = el.querySelector('#login-btn');
  const error = el.querySelector('#error');

  btn.onclick = () => {
    const num = input.value.trim();
    error.textContent = '';

    if (!/^\d{8}$/.test(num)) {
      error.textContent = 'Please enter exactly 8 digits.';
      return;
    }

    const result = loginCustomer(num);
    if (result.error) {
      error.textContent = result.error;
    } else {
      onLogin(result.customer);
    }
  };

  return el;
}
