// src/components/ProductCatalog.js
import { products } from '../data/products.js';

export function ProductCatalog({ customer, onNext, onReorderBlueprint }) {
  const el = document.createElement('div');

  // Load blueprints from localStorage
  const blueprints = JSON.parse(localStorage.getItem('blueprints') || '[]');

  el.innerHTML = `
    <h1>Welcome back, ${customer.name}!</h1>
    <p>You've ordered ${customer.pastOrders} times.</p>

    ${blueprints.length > 0 ? `
      <div class="blueprint-section">
        <h3>Your Blueprints</h3>
        <div id="blueprint-list"></div>
      </div>
    ` : ''}

    <div class="filter-bar">
      <label>
        <input type="checkbox" id="cal-filter" />
        Show only &lt;300 cal
      </label>
    </div>
    <h2>Choose your breakfast</h2>
    <div class="product-grid" id="grid"></div>
    <button id="next-btn" class="mt-6" disabled>Continue to Order</button>
  `;

  const grid = el.querySelector('#grid');
  const nextBtn = el.querySelector('#next-btn');
  const calFilter = el.querySelector('#cal-filter');
  let selected = null;

  function renderProducts() {
    grid.innerHTML = '';
    const showLowCal = calFilter.checked;
    const filtered = showLowCal
      ? products.filter(p => p.calories < 300)
      : products;

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p class="calories">${p.calories} cal</p>
        <p class="price">€${p.price.toFixed(2)}</p>
      `;
      card.onclick = () => {
        document.querySelectorAll('.product-card').forEach(c => c.style.outline = '');
        card.style.outline = '2px solid #3b82f6';
        selected = p;
        nextBtn.disabled = false;
      };
      grid.appendChild(card);
    });
  }

  calFilter.onchange = () => {
    selected = null;
    nextBtn.disabled = true;
    renderProducts();
  };

  renderProducts();

  // Render blueprints
  const blueprintList = el.querySelector('#blueprint-list');
  if (blueprintList) {
    blueprints.forEach((blueprint) => {
      const btn = document.createElement('button');
      btn.className = 'blueprint-btn';
      btn.textContent = blueprint.name;
      btn.onclick = () => {
        if (onReorderBlueprint) {
          onReorderBlueprint(blueprint);
        }
      };
      blueprintList.appendChild(btn);
    });
  }

  nextBtn.onclick = () => onNext(selected);
  return el;
}
