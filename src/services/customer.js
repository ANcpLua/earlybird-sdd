// src/services/customer.js
import { validateCustomerNumber } from '../utils/luhn.js';

const mockCustomers = {
  '38429730': { name: 'Anna Meier', pastOrders: 12 },
  '12345678': { name: 'Max Mustermann', pastOrders: 3 },
};

export function loginCustomer(number) {
  if (!validateCustomerNumber(number)) return { error: 'Invalid checksum' };
  const customer = mockCustomers[number];
  if (!customer) return { error: 'Customer not found' };
  return { customer };
}
