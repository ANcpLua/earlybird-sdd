// src/components/OrderBuilder.js
import { products } from '../data/products.js';

export function OrderBuilder({ baseProduct, initialOrderLines, customer, onCheckout, onBack }) {
  const el = document.createElement('div');
  const orderLines = initialOrderLines || (baseProduct.type === 'prepackaged'
    ? [{ product: baseProduct, amount: 1 }]
    : []);

  function calculateTotals() {
    const totalCal = orderLines.reduce((sum, line) => sum + (line.product.calories * line.amount), 0);
    const totalPrice = orderLines.reduce((sum, line) => sum + (line.product.price * line.amount), 0);
    return { totalCal, totalPrice };
  }

  function render() {
    const { totalCal, totalPrice } = calculateTotals();
    el.innerHTML = `
      <h1>Build Your Order</h1>
      <p><strong>${customer.name}</strong> — Base: ${baseProduct.name}</p>

      ${orderLines.length > 0 ? '<h2>Your Order</h2><div id="order-lines"></div>' : ''}

      <h2>Add Simple Items</h2>
      <div class="product-grid" id="simple-grid"></div>

      <div class="totals">
        <p><strong>Total Calories:</strong> ${totalCal} cal</p>
        <p><strong>Total Price:</strong> €${totalPrice.toFixed(2)}</p>
      </div>

      <button id="checkout-btn" class="mt-6">Proceed to Checkout</button>
      <button id="back-btn" class="mt-2">Back to Catalog</button>
    `;

    // Render current order lines
    const linesDiv = el.querySelector('#order-lines');
    if (linesDiv) {
      orderLines.forEach((line, i) => {
        const lineEl = document.createElement('div');
        lineEl.className = 'order-line';
        lineEl.innerHTML = `
          <span>${line.product.name} × ${line.amount}</span>
          <button data-index="${i}" class="remove-btn">Remove</button>
        `;
        linesDiv.appendChild(lineEl);
      });
    }

    // Render simple products
    const simpleGrid = el.querySelector('#simple-grid');
    const simpleProducts = products.filter(p => p.type === 'simple');
    simpleProducts.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p class="calories">${p.calories} cal</p>
        <p class="price">€${p.price.toFixed(2)}</p>
        <button data-id="${p.id}" class="add-btn">Add</button>
      `;
      simpleGrid.appendChild(card);
    });

    // Event listeners
    el.querySelectorAll('.add-btn').forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.id);
        const product = products.find(p => p.id === id);
        const existing = orderLines.find(l => l.product.id === id);
        if (existing) {
          existing.amount += 1;
        } else {
          orderLines.push({ product, amount: 1 });
        }
        render();
      };
    });

    el.querySelectorAll('.remove-btn').forEach(btn => {
      btn.onclick = () => {
        const index = parseInt(btn.dataset.index);
        orderLines.splice(index, 1);
        render();
      };
    });

    el.querySelector('#checkout-btn').onclick = () => {
      if (orderLines.length === 0) {
        alert('Please add at least one item.');
        return;
      }
      onCheckout({ customer, orderLines, totals: calculateTotals() });
    };

    el.querySelector('#back-btn').onclick = onBack;
  }

  render();
  return el;
}
