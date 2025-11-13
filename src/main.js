// src/main.js - EBMS Application Entry Point
import { CustomerLogin } from './components/CustomerLogin.js';
import { ProductCatalog } from './components/ProductCatalog.js';
import { OrderBuilder } from './components/OrderBuilder.js';
import { Checkout } from './components/Checkout.js';
import { products } from './data/products.js';

const app = document.getElementById('app');

// App State
let currentCustomer = null;
let currentOrder = null;

// Render function - clears and displays new view
function render(view) {
  app.innerHTML = '';
  app.appendChild(view);
}

// Route handlers
function showLogin() {
  render(CustomerLogin({ onLogin: handleLogin }));
}

function handleLogin(customer) {
  currentCustomer = customer;
  showProductCatalog();
}

function showProductCatalog() {
  render(ProductCatalog({
    customer: currentCustomer,
    onNext: handleProductSelection,
    onReorderBlueprint: handleBlueprintReorder
  }));
}

function handleBlueprintReorder(blueprint) {
  // Reconstruct order lines from blueprint
  const orderLines = blueprint.orderLines.map(line => {
    const product = products.find(p => p.id === line.id);
    return { product, amount: line.amount };
  });

  const baseProduct = orderLines[0]?.product;
  if (!baseProduct) return;

  // Navigate to OrderBuilder with pre-filled order
  showOrderBuilderWithLines(baseProduct, orderLines);
}

function showOrderBuilderWithLines(baseProduct, orderLines) {
  render(OrderBuilder({
    baseProduct,
    initialOrderLines: orderLines,
    customer: currentCustomer,
    onCheckout: handleCheckout,
    onBack: showProductCatalog
  }));
}

function handleProductSelection(product) {
  currentOrder = { baseProduct: product };
  showOrderBuilder(product);
}

function showOrderBuilder(baseProduct) {
  render(OrderBuilder({
    baseProduct,
    customer: currentCustomer,
    onCheckout: handleCheckout,
    onBack: showProductCatalog
  }));
}

function handleCheckout(orderData) {
  showCheckout(orderData);
}

function showCheckout(orderData) {
  render(Checkout({
    orderData,
    onComplete: () => {
      alert('✅ Thank you! Your breakfast is on the way! 🚴‍♂️');
      showProductCatalog();
    },
    onBack: () => {
      const baseProduct = orderData.orderLines[0]?.product;
      showOrderBuilder(baseProduct);
    }
  }));
}

// Start the app
showLogin();
