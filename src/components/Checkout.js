// src/components/Checkout.js
export function Checkout({ orderData, onComplete, onBack }) {
  const { customer, orderLines, totals } = orderData;
  const el = document.createElement('div');

  el.innerHTML = `
    <h1>Checkout</h1>
    <p><strong>${customer.name}</strong>, your order is ready!</p>

    <h2>Order Summary</h2>
    <div id="order-summary"></div>

    <div class="totals">
      <p><strong>Total: €${totals.totalPrice.toFixed(2)}</strong></p>
      <p><strong>Calories: ${totals.totalCal} cal</strong></p>
    </div>

    <div class="morale-payment">
      <p>Pay with a smile 😊</p>
      <button id="pay-btn">Confirm & Pay</button>
    </div>

    <div class="blueprint-save">
      <label>
        <input type="checkbox" id="save-blueprint" />
        Save as Blueprint for next time
      </label>
    </div>

    <button id="back-btn" class="mt-2">Back to Order</button>
  `;

  // Render order summary
  const summary = el.querySelector('#order-summary');
  orderLines.forEach(line => {
    const item = document.createElement('div');
    item.className = 'order-line';
    item.innerHTML = `<span>${line.product.name} × ${line.amount}</span>`;
    summary.appendChild(item);
  });

  // Event: Pay
  el.querySelector('#pay-btn').onclick = () => {
    const saveBlueprint = el.querySelector('#save-blueprint').checked;
    if (saveBlueprint) {
      const blueprint = {
        name: `Blueprint #${Date.now().toString().slice(-4)}`,
        orderLines: orderLines.map(l => ({ id: l.product.id, amount: l.amount }))
      };
      const blueprints = JSON.parse(localStorage.getItem('blueprints') || '[]');
      blueprints.push(blueprint);
      localStorage.setItem('blueprints', JSON.stringify(blueprints));
    }
    onComplete();
  };

  el.querySelector('#back-btn').onclick = onBack;

  return el;
}
