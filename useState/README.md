# ⚡ Understanding `useState`

> **Mentor Note:** Until now, your components just *display* data — they're static. `useState` is what makes your app come alive. It lets React remember things and update the screen when they change.

---

## 1. What Is State?

**State** is data that your component *remembers* and that can *change over time*.

When state changes, React automatically re-renders the component to reflect the new value on screen. You don't touch the DOM yourself — React handles it.

**Examples of state in your e-commerce app:**
- The list of items in the cart (`cart`)
- Whether the cart panel is open or closed (`isCartOpen`)
- A search term the user is typing (`searchQuery`)

**Not everything is state.** Ask yourself:
> *"Does this data change? And does the UI need to update when it changes?"*

- Product list from `products.js` → doesn't change → **not state** (just a variable)
- Items added to the cart → changes on button click → **state** ✅

---

## 2. The `useState` Hook — Syntax

```jsx
import { useState } from 'react';

const [value, setValue] = useState(initialValue);
```

This gives you two things:
1. `value` — the current state (what React remembers)
2. `setValue` — a function to update it (triggers a re-render)

**Real example from your project:**

```jsx
// App.jsx
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  //     ↑          ↑            ↑
  //  current    setter fn   starts empty
  //   state
}
```

> `useState([])` means: *"Start with an empty array, and call it `cart`."*

---

## 3. How State Updates Work

You **never** modify state directly. You always use the setter function:

```jsx
// ❌ Wrong — React won't know the state changed
cart.push(newItem);

// ✅ Correct — React re-renders when you use setCart
setCart([...cart, newItem]);
```

The `[...cart, newItem]` syntax means:
- *"Give me everything currently in `cart`..."*
- *"...and add `newItem` at the end."*

This creates a **new array** instead of modifying the existing one — React needs a new reference to know something changed.

---

## 4. The `addToCart` Function

Here's the full pattern for Phase 03:

```jsx
// App.jsx
function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  return (
    <ProductList
      products={products}
      addToCart={addToCart}   // ← pass the function down
    />
  );
}
```

```jsx
// ProductCard.jsx — receives and uses it
function ProductCard({ name, price, addToCart }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>₱{price}</p>
      <button onClick={() => addToCart({ name, price })}>
        Add to Cart
      </button>
    </div>
  );
}
```

> **Flow:** Button clicked → `addToCart` runs in `App.jsx` → `setCart` updates the array → React re-renders → the cart count on screen updates automatically ✅

---

## 5. Displaying State — The Cart Count

Once you have state, displaying it is just JSX:

```jsx
// App.jsx — showing a live cart count
function App() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <p>🛒 {cart.length} items</p>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
}
```

`cart.length` updates automatically every time `setCart` is called.

---

## 6. The `removeFromCart` Function (Phase 04)

Removing an item means filtering it out of the array:

```jsx
function removeFromCart(productId) {
  setCart(cart.filter((item) => item.id !== productId));
}
```

`filter` returns a **new array** with every item except the one whose `id` matches. Pass this function down to `Cart`, and then to `CartItem`.

```jsx
// App.jsx
<Cart cart={cart} removeFromCart={removeFromCart} />
```

```jsx
// CartItem.jsx
function CartItem({ item, removeFromCart }) {
  return (
    <div>
      <span>{item.name} — ₱{item.price}</span>
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
}
```

---

## 7. Derived Values — No Extra State Needed (Phase 05)

Not everything needs to be stored in state. If a value can be **calculated** from existing state, just calculate it:

```jsx
// ❌ Don't do this — total doesn't need its own state
const [total, setTotal] = useState(0);

// ✅ Just derive it from cart state
const total = cart.reduce((sum, item) => sum + item.price, 0);
```

`reduce` loops through the cart, adding up each item's price.  
Display it like any other value:

```jsx
<p>Total: ₱{total.toLocaleString()}</p>
```

> **Rule:** If you find yourself doing `setX` every time you do `setCart`, you probably don't need `X` as state — just derive it.

---

## 8. State Lives in the Right Component

Where you put state matters. Follow these two rules:

**Rule 1:** Put state in the component that **needs to use it**.

**Rule 2:** If *multiple* components need the same state, **lift it up** to their closest shared parent.

In your project:
```
App.jsx          ← holds `cart` state ✅ (both Navbar and Cart need it)
  ├── Navbar     ← needs cart.length (receives via props)
  ├── ProductList
  │   └── ProductCard  ← triggers addToCart (receives via props)
  └── Cart       ← needs the full cart array (receives via props)
      └── CartItem     ← triggers removeFromCart (receives via props)
```

> `App.jsx` is the right place because it's the parent of all components that touch the cart.

---

## 9. State vs. Props — Side by Side

| | `useState` | Props |
|---|---|---|
| Where it lives | Inside the component | Passed from parent |
| Who can change it | Only that component (via setter) | Nobody — read only |
| What it's for | Dynamic, changing data | Passing data downward |
| Changes trigger re-render | ✅ Yes | ✅ Yes (if parent re-renders) |

---

## 10. Common Beginner Mistakes With State

### ❌ Mistake 1 — Reading state right after setting it

```jsx
function addToCart(product) {
  setCart([...cart, product]);
  console.log(cart);  // ❌ still shows the OLD cart!
}
```

State updates happen **asynchronously**. The new value is only available on the next render.

**Fix:** Console.log in the JSX or use `useEffect` — but for now, just trust that `setCart` works.

---

### ❌ Mistake 2 — Mutating state directly

```jsx
// ❌ Mutating — React doesn't see the change
cart.push(product);
setCart(cart);  // still the same reference — no re-render!

// ✅ Always create a new array/object
setCart([...cart, product]);
```

---

### ❌ Mistake 3 — Creating state for things that don't change

```jsx
// ❌ Products don't change — no need for state
const [products, setProducts] = useState(productsData);

// ✅ Just use a regular variable or import
import products from './data/products';
```

---

### ❌ Mistake 4 — Forgetting `import { useState }`

```jsx
// ❌ Will throw: "useState is not defined"
const [cart, setCart] = useState([]);

// ✅ Always import at the top
import { useState } from 'react';
```

---

## 11. Your Phase 03 & 04 Task Recap

### Phase 03 — Add to Cart
1. Add `import { useState } from 'react'` to `App.jsx`
2. Create `const [cart, setCart] = useState([])`
3. Write an `addToCart(product)` function using `setCart([...cart, product])`
4. Pass `addToCart` as a prop to `ProductList` → `ProductCard`
5. Add a button in `ProductCard` that calls it on click
6. Display `{cart.length} items` somewhere visible

**Done when:** Clicking "Add to Cart" updates the count in real time.

---

### Phase 04 — Cart Display & Remove
1. Create `src/components/Cart.jsx`
2. Pass `cart` and `removeFromCart` as props to it
3. Inside `Cart`, loop through items with `.map()` and render `<CartItem />`
4. Show `"Your cart is empty"` if `cart.length === 0`
5. In each `CartItem`, add a Remove button that calls `removeFromCart(item.id)`

**Done when:** You can add and remove items, and the cart reflects the changes.

---

### Phase 05 — Total Price
1. Inside `Cart.jsx`, calculate total: `const total = cart.reduce(...)`
2. Display it at the bottom: `₱{total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
3. **Bonus:** Handle duplicates — instead of pushing a new item, increase its `quantity`

**Done when:** The total updates automatically as items are added and removed.

---

## 🎉 You've Covered the Core of React

With **components**, **props**, and **useState**, you now understand the three building blocks every React app is built on:

1. **Components** → Break the UI into small, focused pieces
2. **Props** → Pass data from parent to child
3. **State** → Make the app dynamic and interactive

Everything else in React (context, effects, routing) builds on top of these three concepts. Master them here, and the rest will come naturally.

---

*Good luck with your project — you're building real React skills. 🚀*  
*— Your Mentor*
