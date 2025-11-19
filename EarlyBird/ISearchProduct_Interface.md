# Interface: SearchProduct Contract

**Version:** 2.0 (JavaScript Module Contract)

## Overview

This document defines the contract (interface) for the Product Search capability within the Application Core. In JavaScript, this is implemented via module exports in `src/data/products.js` (or a dedicated search service).

## The Contract

Any module providing product search capabilities must satisfy the following functional signature:

### `getProducts()`
- **Input:** None
- **Output:** `Array<Product>`
- **Description:** Returns the full catalog of available products.

### `searchProducts(criteria)`
- **Input:** `criteria` (Object)
    - `minCalories` (number, optional)
    - `maxCalories` (number, optional)
    - `type` (string, optional) - 'simple' or 'prepackaged'
- **Output:** `Array<Product>`
- **Description:** Returns products matching *all* provided criteria.

## Reference Implementation

```javascript
// src/services/productSearch.js (Hypothetical)

import { products } from '../data/products.js';

/**
 * Searches products based on criteria.
 * @param {Object} criteria 
 * @returns {Array}
 */
export function searchProducts(criteria = {}) {
  return products.filter(p => {
    if (criteria.minCalories && p.calories < criteria.minCalories) return false;
    if (criteria.maxCalories && p.calories > criteria.maxCalories) return false;
    if (criteria.type && p.type !== criteria.type) return false;
    return true;
  });
}
```

## Consumer Usage

The `ProductCatalog` React component acts as the consumer of this interface:

```javascript
import { searchProducts } from '../services/productSearch';

// Inside Component
const lowCalorieSnacks = searchProducts({ maxCalories: 300 });
```