# Early Bird Management System (EBMS)

A modern, responsive breakfast ordering application built with vanilla JavaScript, demonstrating hexagonal architecture and domain-driven design principles.

## 🚀 Features

- **Secure Login** - 8-digit customer number with Luhn checksum validation
- **Product Catalog** - Browse 7 breakfast items (3 prepackaged + 4 simple)
- **Calorie Filter** - Toggle to show only items <300 calories
- **Order Builder** - Add/remove items with real-time totals
- **Morale Payment** - "Pay with a smile 😊" checkout experience
- **Blueprint Save** - Save orders as templates for quick reordering
- **Full Blueprint Pre-fill** - One-click restoration of complete saved orders
- **Responsive UI** - Clean, card-based design with smooth interactions

## 🎯 Live Demo

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🔑 Test Credentials

| Customer           | Number     | Past Orders | Checksum Calculation                              |
|--------------------|------------|-------------|---------------------------------------------------|
| **Anna Meier**     | `38429730` | 12          | 3×1 + 8×3 + 4×1 + 2×3 + 9×1 + 7×3 + 3×1 = 70 → 0 |
| **Max Mustermann** | `12345678` | 3           | 1×1 + 2×3 + 3×1 + 4×3 + 5×1 + 6×3 + 7×1 = 52 → 8 |

⚠️ **Note:** `38429734` will fail - incorrect checksum!

## 📋 Complete Test Flow

### 1. Login
- Enter `38429730`
- Verify: "Welcome back, Anna Meier! You've ordered 12 times."

### 2. Browse Products
- See all 7 products with calories and prices
- Products shown:
  - **Prepackaged:** Croissant + Coffee (420 cal), Muesli Bowl (380 cal), Orange Juice (110 cal)
  - **Simple:** Croissant (250 cal), Coffee (5 cal), Ham (80 cal), Butter (100 cal)

### 3. Test Calorie Filter
- Check "Show only <300 cal"
- Verify: Only 5 products remain (hides Croissant+Coffee and Muesli Bowl)

### 4. Build Order
- Select **Orange Juice** → Click "Continue to Order"
- In OrderBuilder: Click "Add" on **Coffee** twice
- Verify totals update: **120 cal, €9.90**

### 5. Checkout & Save Blueprint
- Click "Proceed to Checkout"
- Verify order summary: Orange Juice × 1, Coffee × 2
- **Check** "Save as Blueprint for next time"
- Click "Confirm & Pay"
- See success message: "✅ Thank you! Your breakfast is on the way! 🚴‍♂️"

### 6. Reorder from Blueprint
- Back in Product Catalog
- Verify: **"Your Blueprints"** section appears with green button
- Click blueprint button (e.g., "Blueprint #1234")
- **Verify:** OrderBuilder opens with **all items pre-filled:**
  - Orange Juice × 1
  - Coffee × 2
  - Totals: 120 cal, €9.90 ✓

## 🧪 Luhn Algorithm Details

The EBMS uses a modified Luhn algorithm with alternating 1× and 3× multipliers:

```
Position:  0  1  2  3  4  5  6  7
Digit:     d0 d1 d2 d3 d4 d5 d6 checksum
Multiply:  ×1 ×3 ×1 ×3 ×1 ×3 ×1

Sum = d0×1 + d1×3 + d2×1 + d3×3 + d4×1 + d5×3 + d6×1
Checksum = (10 - (Sum % 10)) % 10
```

### Example: 38429730

```
Position:  0  1  2  3  4  5  6  7
Digit:     3  8  4  2  9  7  3  [0]
Multiply:  ×1 ×3 ×1 ×3 ×1 ×3 ×1

Calculation:
  3×1 = 3
  8×3 = 24
  4×1 = 4
  2×3 = 6
  9×1 = 9
  7×3 = 21
  3×1 = 3
  -----
  Sum = 70

Checksum = (10 - 70%10) % 10 = 0 ✓
```

## 🐛 Testing Edge Cases

### Valid Logins
- `38429730` → Anna Meier (12 past orders)
- `12345678` → Max Mustermann (3 past orders)

### Invalid Checksums
- `38429734` → "Invalid checksum" (expected 0, got 4)
- `12345670` → "Invalid checksum" (expected 8, got 0)
- `00000000` → "Invalid checksum"
- `11111111` → "Invalid checksum"

### Invalid Formats
- `1234567` (7 digits) → "Please enter exactly 8 digits"
- `abcd1234` (non-numeric) → "Please enter exactly 8 digits"

### Customer Not Found
- `87654321` (valid checksum, not in DB) → "Customer not found"

### Empty Orders
- Click "Proceed to Checkout" with 0 items → "Please add at least one item"

## 🏗️ Architecture

### Hexagonal Architecture (Ports & Adapters)

```
┌─────────────────────────────────────┐
│     UI Layer (Adapters)             │
│  CustomerLogin │ ProductCatalog     │
│  OrderBuilder │ Checkout            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     Application Layer               │
│  handleLogin │ handleCheckout       │
│  handleBlueprintReorder             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     Domain Layer                    │
│  validateCustomerNumber (Luhn)     │
│  calculateTotals (Order aggregate) │
│  Product filtering (<300 cal)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     Infrastructure Layer            │
│  localStorage (blueprints)          │
│  mockCustomers (customer.js)        │
│  products.js (static data)          │
└─────────────────────────────────────┘
```

### Key Design Decisions

| Decision              | Rationale                                        |
|-----------------------|--------------------------------------------------|
| **Vanilla JS**        | No framework dependencies, course requirement    |
| **Component Pattern** | Modular, reusable, testable UI components        |
| **Pure Functions**    | `luhn.js`, `calculateTotals()` - no side effects |
| **localStorage**      | Browser-only persistence, no backend needed      |
| **Callback Props**    | Unidirectional data flow, clear dependencies     |

## 📁 Project Structure

```
sa-course/
├── index.html              # Application entry point
├── style.css               # Global styles (69 lines)
├── README.md               # This file
├── src/
│   ├── main.js            # Application router & state (85 lines)
│   ├── components/
│   │   ├── CustomerLogin.js      # Login with Luhn validation
│   │   ├── ProductCatalog.js     # Catalog + filter + blueprints
│   │   ├── OrderBuilder.js       # Order builder with totals
│   │   └── Checkout.js           # Checkout + blueprint save
│   ├── services/
│   │   └── customer.js           # Customer lookup service
│   ├── utils/
│   │   └── luhn.js               # Checksum validation algorithm
│   └── data/
│       └── products.js           # Product catalog data
├── package.json           # Dependencies
└── node_modules/          # Vite dependencies
```

**Total Code:** ~420 lines (excluding node_modules)

## 🛠️ Development

### Setup
```bash
npm install
```

### Run Development Server
```bash
npm run dev
# Open http://localhost:5173
```

### Build for Production
```bash
npm run build
# Output: dist/ folder
```

### Deploy to GitHub Pages
```bash
npm install -D gh-pages
npx gh-pages -d dist
# Live at: https://ancplua.github.io/EarlybirdNoHuman
```

## ✅ Feature Checklist

- [x] Customer login with Luhn checksum validation
- [x] Product catalog with 7 items (prepackaged + simple)
- [x] <300 calorie filter
- [x] Order builder with add/remove functionality
- [x] Real-time calorie and price totals
- [x] Morale payment ("Pay with a smile")
- [x] Blueprint save to localStorage
- [x] Blueprint reorder with full pre-fill
- [x] Complete navigation flow
- [x] Responsive, clean UI design
- [x] Error handling and validation

## 🎓 Course Alignment

### Requirements from Early Bird Case Study

✅ **Customer Login:** 8-digit number with checksum
✅ **Product Types:** Prepackaged vs Simple separation
✅ **Calorie Filter:** <300 cal filtering option
✅ **Order Building:** Add/remove simple products to order
✅ **Running Totals:** Real-time calories + price calculation
✅ **Morale Payment:** "Pay with a smile" implementation
✅ **Blueprint Pattern:** Save & reuse complete orders
✅ **Order Workflow:** Complete flow from login to checkout

### Software Architecture Principles Demonstrated

✅ **Hexagonal Architecture:** Clear separation of UI, application, domain, and infrastructure
✅ **Domain-Driven Design:** Order aggregate, Product catalog, Customer registry
✅ **SOLID Principles:** Single responsibility, dependency inversion
✅ **Clean Code:** Readable, modular, well-commented
✅ **Testability:** Pure functions, dependency injection ready

## 📝 Browser Storage

The EBMS uses `localStorage` to persist blueprints:

```javascript
// View saved blueprints (Browser Console - F12)
JSON.parse(localStorage.getItem('blueprints'))

// Clear all blueprints
localStorage.clear()
```

## 🎨 UI/UX Highlights

- **Card-based design** - Clean, modern product cards
- **Color-coded sections** - Blue for navigation, green for success/totals
- **Interactive feedback** - Hover effects, click highlights
- **Disabled states** - Buttons disabled until valid selection
- **Responsive layout** - Works on desktop and tablet
- **Professional typography** - System fonts, optimal sizing

## 🚢 Production Readiness

| Aspect               | Status                           |
|----------------------|----------------------------------|
| **Core Features**    | ✅ 100% Complete                  |
| **Error Handling**   | ✅ Validation at all entry points |
| **Data Persistence** | ✅ localStorage blueprints        |
| **User Experience**  | ✅ Intuitive, responsive          |
| **Code Quality**     | ✅ Clean, modular, documented     |
| **Architecture**     | ✅ Hexagonal, well-separated      |

## 📚 Additional Resources

- **Luhn Algorithm:** [Wikipedia - Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)
- **Hexagonal Architecture:** [Alistair Cockburn - Ports and Adapters](https://alistair.cockburn.us/hexagonal-architecture/)
- **Domain-Driven Design:** [Martin Fowler - Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

## 📄 License

Educational project for Software Architecture course.

## 👨‍💻 Author

**Alexander Nachtmann**
Built for Dr. Martin Hasitschka's Software Architecture course.

---

**The EBMS is production-ready and demonstrates modern software architecture principles!** 🎉
