# 🔄 Understanding Props

> **Mentor Note:** If components are LEGO bricks, props are the instructions you hand each brick — telling it exactly what to display. Without props, every brick looks the same. With props, each one is unique.

---

## 1. What Are Props?

**Props** (short for *properties*) are how you pass data from a **parent** component down to a **child** component.

Think of it like a function with arguments:

```jsx
// A regular JavaScript function
function greet(name) {
  return "Hello, " + name;
}

greet("Kyle");   // → "Hello, Kyle"
greet("Maria");  // → "Hello, Maria"
```

```jsx
// A React component works the same way
function ProductCard(props) {
  return <h2>{props.name}</h2>;
}

<ProductCard name="Sneakers" />   // → renders "Sneakers"
<ProductCard name="T-shirt" />    // → renders "T-shirt"
```

> **One component, different data each time.** That's the power of props.

---

## 2. Why Are Props Important?

Without props, you'd have to write a separate component for every single product:

```jsx
// ❌ Without props — horrible, not scalable
function SneakersCard() { return <h2>Sneakers - ₱1,200</h2>; }
function TshirtCard()   { return <h2>T-shirt - ₱350</h2>; }
function BagCard()      { return <h2>Bag - ₱890</h2>; }
```

```jsx
// ✅ With props — one component, infinite products
function ProductCard(props) {
  return <h2>{props.name} - ₱{props.price}</h2>;
}
```

Props let you write a component **once** and reuse it with different data. That's the entire point.

---

## 3. How Data Flows: Parent → Child

In React, data only flows **one direction** — from parent down to child. Never the other way.

```
App.jsx  (has the data)
  │
  │  passes data via props
  ▼
ProductCard.jsx  (receives and displays it)
```

Here's the mental model:

```jsx
// App.jsx — the PARENT
// It knows the product data and passes it down
<ProductCard
  name="Sneakers"
  price={1200}
  description="Comfortable running shoes"
/>
```

```jsx
// ProductCard.jsx — the CHILD
// It receives whatever the parent sent
function ProductCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <span>₱{props.price}</span>
    </div>
  );
}
```

> **Rule:** The child never goes and grabs data itself. The parent hands it down.

---

## 4. Destructuring Props (Cleaner Syntax)

Instead of writing `props.name`, `props.price` everywhere, you can **destructure** at the top:

```jsx
// ❌ Verbose — works, but repetitive
function ProductCard(props) {
  return <h2>{props.name} - ₱{props.price}</h2>;
}

// ✅ Cleaner — destructure in the parameter
function ProductCard({ name, price, description }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <span>₱{price}</span>
    </div>
  );
}
```

Both work exactly the same. Most React developers prefer the destructured version — adopt it early.

---

## 5. Passing a Full Object as Props

In Phase 02, your `products.js` file will have an array of objects like this:

```js
// src/data/products.js
const products = [
  { id: 1, name: "Sneakers", price: 1200, description: "Comfortable running shoes" },
  { id: 2, name: "T-shirt", price: 350, description: "Premium cotton tee" },
  // ...more products
];
```

You can pass a whole object as a prop using the **spread operator**:

```jsx
// In App.jsx — spreading each product's fields as props
{products.map((product) => (
  <ProductCard key={product.id} {...product} />
))}
```

Or pass the whole object as one prop and access it inside:

```jsx
// Passing the whole object
<ProductCard key={product.id} product={product} />

// Inside ProductCard
function ProductCard({ product }) {
  return <h2>{product.name}</h2>;
}
```

> Both approaches are valid. The spread version is shorter. The object version is more explicit. Choose one and be consistent.

---

## 6. Passing Functions as Props

Props are not just for data — they can carry **functions** too. This is how a child component communicates *back* to its parent.

Remember: data flows down. But events (like a button click) need to travel back up. You do this by passing a function from the parent:

```jsx
// App.jsx — defines the function and passes it down
function App() {
  function addToCart(product) {
    // update the cart state here
  }

  return (
    <ProductCard
      name="Sneakers"
      price={1200}
      addToCart={addToCart}   // ← function passed as a prop
    />
  );
}
```

```jsx
// ProductCard.jsx — receives and calls the function
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

> **What just happened?**
> - `App.jsx` owns the cart state — it defines `addToCart`
> - `ProductCard` doesn't touch the state — it just calls the function when the button is clicked
> - The parent stays in control at all times ✅

---

## 7. The `key` Prop — Special and Required in Lists

When you use `.map()` to render a list of components, React needs a `key` prop on each one to tell them apart:

```jsx
{products.map((product) => (
  <ProductCard key={product.id} {...product} />
  //           ↑ always required in .map()
))}
```

**Rules for `key`:**
- Must be **unique** among siblings
- Use the item's `id` from your data — never use the array index if you can avoid it
- You do NOT access `key` inside the component — it's only for React internally

```jsx
// ❌ Avoid — index as key causes bugs when items reorder
{products.map((product, index) => (
  <ProductCard key={index} {...product} />
))}

// ✅ Use the actual unique ID
{products.map((product) => (
  <ProductCard key={product.id} {...product} />
))}
```

---

## 8. Common Beginner Mistakes With Props

### ❌ Mistake 1 — Forgetting to pass a prop

```jsx
// You pass "name" but forgot "price"
<ProductCard name="Sneakers" />

// Inside ProductCard, price will be undefined
<span>₱{price}</span>  // renders: ₱
```

**Fix:** Double-check every prop the component uses is being passed.

---

### ❌ Mistake 2 — Confusing state and props

| | Props | State |
|---|---|---|
| Where it comes from | Parent component | The component itself |
| Can the component change it? | ❌ No | ✅ Yes |
| Purpose | Receive data | Track changing data |

```jsx
// ❌ You CANNOT do this
function ProductCard({ price }) {
  price = price * 2;  // mutating a prop — never do this
}

// ✅ If you need to transform it, store it in a variable
function ProductCard({ price }) {
  const discountedPrice = price * 0.8;
  return <span>₱{discountedPrice}</span>;
}
```

---

### ❌ Mistake 3 — Passing numbers or booleans as strings

```jsx
// ❌ Wrong — price becomes the string "1200", not the number 1200
<ProductCard price="1200" />

// ✅ Correct — use curly braces for non-string values
<ProductCard price={1200} />
<ProductCard inStock={true} />
```

---

### ❌ Mistake 4 — Not using the function prop correctly

```jsx
// ❌ This calls addToCart immediately when the component renders
<button onClick={addToCart(product)}>Add to Cart</button>

// ✅ This calls it only when the button is clicked
<button onClick={() => addToCart(product)}>Add to Cart</button>
```

> Wrap function calls in an arrow function inside `onClick` when you need to pass arguments.

---

## 9. Your Phase 02 Task Recap

> **Goal:** Make `ProductCard` dynamic by passing real product data through props.

Steps to follow:
1. Create `src/data/products.js` with an array of 5+ product objects (id, name, price, description, image)
2. Import the array into `App.jsx`
3. Update `ProductCard` to accept and display props (name, price, description)
4. Use `.map()` in `App.jsx` to render one `<ProductCard />` per product
5. Add `key={product.id}` to each mapped element

**Done when:** All 5+ products from your array appear as separate cards on screen.

---

*Next up → open the `useState/` folder to learn how to make your app interactive.*
