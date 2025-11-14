(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();function O(e){const n=e.replace(/\D/g,"").split("").map(Number);if(n.length!==8)return!1;let s=0;for(let t=0;t<7;t++)s+=n[t]*(t%2===0?1:3);return(10-s%10)%10===n[7]}const B={38429730:{name:"Anna Meier",pastOrders:12},12345678:{name:"Max Mustermann",pastOrders:3}};function q(e){if(!O(e))return{error:"Invalid checksum"};const n=B[e];return n?{customer:n}:{error:"Customer not found"}}function P({onLogin:e}){const n=document.createElement("div");n.innerHTML=`
    <h1>Early Bird Management System</h1>
    <p class="text-center text-gray-600 mb-6">Enter your 8-digit customer number</p>

    <label>Customer Number</label>
    <input id="cust-num" type="text" maxlength="8" placeholder="e.g. 38429734" />

    <button id="login-btn">Login</button>
    <p id="error" class="error"></p>
  `;const s=n.querySelector("#cust-num"),i=n.querySelector("#login-btn"),t=n.querySelector("#error");return i.onclick=()=>{const r=s.value.trim();if(t.textContent="",!/^\d{8}$/.test(r)){t.textContent="Please enter exactly 8 digits.";return}const o=q(r);o.error?t.textContent=o.error:e(o.customer)},n}const g=[{id:1,name:"Croissant + Coffee",type:"prepackaged",calories:420,price:5.9},{id:2,name:"Muesli Bowl",type:"prepackaged",calories:380,price:6.5},{id:3,name:"Orange Juice",type:"prepackaged",calories:110,price:2.9},{id:4,name:"Croissant",type:"simple",calories:250,price:2.2},{id:5,name:"Coffee",type:"simple",calories:5,price:3.5},{id:6,name:"Ham",type:"simple",calories:80,price:1.2},{id:7,name:"Butter",type:"simple",calories:100,price:.8}];function M({customer:e,onNext:n,onReorderBlueprint:s}){const i=document.createElement("div"),t=JSON.parse(localStorage.getItem("blueprints")||"[]");i.innerHTML=`
    <h1>Welcome back, ${e.name}!</h1>
    <p>You've ordered ${e.pastOrders} times.</p>

    ${t.length>0?`
      <div class="blueprint-section">
        <h3>Your Blueprints</h3>
        <div id="blueprint-list"></div>
      </div>
    `:""}

    <div class="filter-bar">
      <label>
        <input type="checkbox" id="cal-filter" />
        Show only &lt;300 cal
      </label>
    </div>
    <h2>Choose your breakfast</h2>
    <div class="product-grid" id="grid"></div>
    <button id="next-btn" class="mt-6" disabled>Continue to Order</button>
  `;const r=i.querySelector("#grid"),o=i.querySelector("#next-btn"),f=i.querySelector("#cal-filter");let p=null;function d(){r.innerHTML="",(f.checked?g.filter(h=>h.calories<300):g).forEach(h=>{const c=document.createElement("div");c.className="product-card",c.innerHTML=`
        <h3>${h.name}</h3>
        <p class="calories">${h.calories} cal</p>
        <p class="price">€${h.price.toFixed(2)}</p>
      `,c.onclick=()=>{document.querySelectorAll(".product-card").forEach(u=>u.style.outline=""),c.style.outline="2px solid #3b82f6",p=h,o.disabled=!1},r.appendChild(c)})}f.onchange=()=>{p=null,o.disabled=!0,d()},d();const m=i.querySelector("#blueprint-list");return m&&t.forEach(l=>{const a=document.createElement("button");a.className="blueprint-btn",a.textContent=l.name,a.onclick=()=>{s&&s(l)},m.appendChild(a)}),o.onclick=()=>n(p),i}function x({baseProduct:e,initialOrderLines:n,customer:s,onCheckout:i,onBack:t}){const r=document.createElement("div"),o=n||(e.type==="prepackaged"?[{product:e,amount:1}]:[]);function f(){const d=o.reduce((l,a)=>l+a.product.calories*a.amount,0),m=o.reduce((l,a)=>l+a.product.price*a.amount,0);return{totalCal:d,totalPrice:m}}function p(){const{totalCal:d,totalPrice:m}=f();r.innerHTML=`
      <h1>Build Your Order</h1>
      <p><strong>${s.name}</strong> — Base: ${e.name}</p>

      ${o.length>0?'<h2>Your Order</h2><div id="order-lines"></div>':""}

      <h2>Add Simple Items</h2>
      <div class="product-grid" id="simple-grid"></div>

      <div class="totals">
        <p><strong>Total Calories:</strong> ${d} cal</p>
        <p><strong>Total Price:</strong> €${m.toFixed(2)}</p>
      </div>

      <button id="checkout-btn" class="mt-6">Proceed to Checkout</button>
      <button id="back-btn" class="mt-2">Back to Catalog</button>
    `;const l=r.querySelector("#order-lines");l&&o.forEach((c,u)=>{const b=document.createElement("div");b.className="order-line",b.innerHTML=`
          <span>${c.product.name} × ${c.amount}</span>
          <button data-index="${u}" class="remove-btn">Remove</button>
        `,l.appendChild(b)});const a=r.querySelector("#simple-grid");g.filter(c=>c.type==="simple").forEach(c=>{const u=document.createElement("div");u.className="product-card",u.innerHTML=`
        <h3>${c.name}</h3>
        <p class="calories">${c.calories} cal</p>
        <p class="price">€${c.price.toFixed(2)}</p>
        <button data-id="${c.id}" class="add-btn">Add</button>
      `,a.appendChild(u)}),r.querySelectorAll(".add-btn").forEach(c=>{c.onclick=()=>{const u=parseInt(c.dataset.id),b=g.find(k=>k.id===u),S=o.find(k=>k.product.id===u);S?S.amount+=1:o.push({product:b,amount:1}),p()}}),r.querySelectorAll(".remove-btn").forEach(c=>{c.onclick=()=>{const u=parseInt(c.dataset.index);o.splice(u,1),p()}}),r.querySelector("#checkout-btn").onclick=()=>{if(o.length===0){alert("Please add at least one item.");return}i({customer:s,orderLines:o,totals:f()})},r.querySelector("#back-btn").onclick=t}return p(),r}function w({orderData:e,onComplete:n,onBack:s}){const{customer:i,orderLines:t,totals:r}=e,o=document.createElement("div");o.innerHTML=`
    <h1>Checkout</h1>
    <p><strong>${i.name}</strong>, your order is ready!</p>

    <h2>Order Summary</h2>
    <div id="order-summary"></div>

    <div class="totals">
      <p><strong>Total: €${r.totalPrice.toFixed(2)}</strong></p>
      <p><strong>Calories: ${r.totalCal} cal</strong></p>
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
  `;const f=o.querySelector("#order-summary");return t.forEach(p=>{const d=document.createElement("div");d.className="order-line",d.innerHTML=`<span>${p.product.name} × ${p.amount}</span>`,f.appendChild(d)}),o.querySelector("#pay-btn").onclick=()=>{if(o.querySelector("#save-blueprint").checked){const d={name:`Blueprint #${Date.now().toString().slice(-4)}`,orderLines:t.map(l=>({id:l.product.id,amount:l.amount}))},m=JSON.parse(localStorage.getItem("blueprints")||"[]");m.push(d),localStorage.setItem("blueprints",JSON.stringify(m))}n()},o.querySelector("#back-btn").onclick=s,o}const L=document.getElementById("app");let v=null;function y(e){L.innerHTML="",L.appendChild(e)}function N(){y(P({onLogin:T}))}function T(e){v=e,C()}function C(){y(M({customer:v,onNext:A,onReorderBlueprint:H}))}function H(e){const n=e.orderLines.map(i=>({product:g.find(r=>r.id===i.id),amount:i.amount})),s=n[0]?.product;s&&I(s,n)}function I(e,n){y(x({baseProduct:e,initialOrderLines:n,customer:v,onCheckout:E,onBack:C}))}function A(e){$(e)}function $(e){y(x({baseProduct:e,customer:v,onCheckout:E,onBack:C}))}function E(e){F(e)}function F(e){y(w({orderData:e,onComplete:()=>{alert("✅ Thank you! Your breakfast is on the way! 🚴‍♂️"),C()},onBack:()=>{const n=e.orderLines[0]?.product;$(n)}}))}N();
