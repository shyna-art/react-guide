# 📦 Understanding the `components/` Folder

> **Mentor Note:** Think of this folder as your LEGO brick box. Every piece inside is reusable, has a single job, and you snap them together to build your UI.

---

## 1. What Is the `components/` Folder?

When you build a React app, you don't write everything in one giant file. Instead, you break your UI into small, focused pieces called **components**.

The `components/` folder is where all those pieces live.

**Think of it like this:**
- A webpage is a house 🏠
- Components are the rooms, doors, and windows
- `App.jsx` is the blueprint that arranges them

**What belongs inside `components/`?**
- Any piece of UI you'll reuse or want to keep separate
- Examples: `ProductCard`, `Navbar`, `Cart`, `CartItem`

**What does NOT belong here?**
- Data files (those go in `src/data/`)
- Utility functions (those go in `src/utils/`)
- Global styles (those stay in `index.css`)

---

## 2. Breaking Down UI Into Components

Before writing any code, look at the screen and ask:
> *"What are the distinct parts of this page?"*

For this e-commerce project, here's how to think about it:

```
App.jsx
├── Navbar          ← top bar with cart count
├── ProductList     ← the grid of all products
│   └── ProductCard ← a single product (used many times)
└── Cart            ← the cart panel
    └── CartItem    ← a single item in the cart
```

### Your 5 Components Explained

| Component | Job | Receives Props? | Has State? |
|-----------|-----|-----------------|------------|
| `ProductCard` | Shows one product | ✅ Yes (product data, addToCart) | ❌ No |
| `ProductList` | Renders all cards | ✅ Yes (products array, addToCart) | ❌ No |
| `Cart` | Shows cart contents & total | ✅ Yes (cart array, removeFromCart) | ❌ No |
| `CartItem` | Shows one cart row | ✅ Yes (item data, removeFromCart) | ❌ No |
| `Navbar` | Shows cart count | ✅ Yes (cartCount) | ❌ No |

> **Key insight:** Notice that only `App.jsx` has state. Everyone else just **displays** what they receive.

---

## 3. Component Relationships — Who Talks to Whom?

```
App.jsx  ← holds state: cart, products
  │
  ├── passes (products, addToCart) ──→ ProductList
  │                                        └── passes (product, addToCart) ──→ ProductCard
  │
  └── passes (cart, removeFromCart) ──→ Cart
                                           └── passes (item, removeFromCart) ──→ CartItem
```

Data always flows **downward** — from parent to child.  
A child component **never** directly changes its parent's data.  
It must call a function the parent passed down (like `addToCart`).

---

## 4. Best Practices

### ✅ Name components with PascalCase
```jsx
// ✅ Correct
function ProductCard() {}

// ❌ Wrong
function productcard() {}
function product_card() {}
```

### ✅ One component per file
```
components/
  ProductCard.jsx   ← only ProductCard here
  ProductList.jsx   ← only ProductList here
  Cart.jsx
  CartItem.jsx
```

### ✅ Keep components small and focused
If your component is doing more than one thing, it's time to split it.

**Ask yourself:** *"Can I describe this component in one sentence?"*
- `ProductCard` → "It displays one product's details and an Add to Cart button." ✅
- `App` → "It manages the cart state and renders every part of the page." ✅ (that's App's job)

### ✅ Make components reusable
A `ProductCard` should work for **any** product, not just one hardcoded item. That's what props are for (see the `props/` guide).

---

## 5. Common Beginner Mistakes

### ❌ Mistake 1 — Putting everything in `App.jsx`

```jsx
// ❌ Bad — App.jsx doing too much
function App() {
  return (
    <div>
      <div className="card">
        <h2>Sneakers</h2>
        <p>₱1,200</p>
        <button>Add to Cart</button>
      </div>
      <div className="card">
        <h2>T-shirt</h2>
        ...
      </div>
    </div>
  );
}
```

```jsx
// ✅ Good — delegate to components
function App() {
  return (
    <div>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
}
```

---

### ❌ Mistake 2 — Creating a new component for every tiny HTML element

Not everything needs its own component. A `<button>` inside a `ProductCard` does **not** need to be its own `AddToCartButton.jsx` — unless you reuse it in 3+ different places.

**Rule of thumb:**
> Create a new component when you find yourself copying the same JSX block more than once.

---

### ❌ Mistake 3 — Naming files inconsistently

```
components/
  productCard.jsx    ❌
  Product_List.jsx   ❌
  cart.jsx           ❌

  ProductCard.jsx    ✅
  ProductList.jsx    ✅
  Cart.jsx           ✅
```

React components must start with an uppercase letter — so the filename should match.

---

## 6. Your Phase 01 Task Recap

> **Goal:** Create and render your first component — `ProductCard` with hardcoded data.

Steps to follow:
1. Create the file `src/components/ProductCard.jsx`
2. Write a function that returns JSX (a product name, price, description)
3. Export it at the bottom: `export default ProductCard`
4. Import it into `App.jsx` and place it in the JSX

You are **not** using props yet. That comes in Phase 02.

---

*Next up → open the `props/` folder to learn how to make your components dynamic.*
