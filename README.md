 
# ⚛️ React + Vite E-Commerce Learning Guide

> A beginner-friendly guide to learning React by building a simple e-commerce app from scratch.  
> You will fork this repo, set up your own project, and follow the phases step by step.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Step 1 — Fork this Repository](#step-1--fork-this-repository)
- [Step 2 — Clone Your Fork](#step-2--clone-your-fork)
- [Step 3 — Create Your Vite + React Project](#step-3--create-your-vite--react-project)
- [Step 4 — Run the Development Server](#step-4--run-the-development-server)
- [Step 5 — Project Structure](#step-5--project-structure)
- [📚 Learning Guides](#-learning-guides)
- [Learning Phases](#learning-phases)
- [How to Submit Your Work](#how-to-submit-your-work)
- [Tips & Reminders](#tips--reminders)

---

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

| Tool | Purpose | Download |
|------|---------|---------|
| [Node.js](https://nodejs.org/) (v18+) | Required to run Vite and install packages | https://nodejs.org |
| [Git](https://git-scm.com/) | Version control | https://git-scm.com |
| [Visual Studio Code](https://code.visualstudio.com/) | Code editor | https://code.visualstudio.com |

To verify your installations, open a terminal and run:

```bash
node -v
npm -v
git --version
```

You should see version numbers printed for each. If any command fails, install the missing tool first.

---

## Step 1 — Fork this Repository

Forking creates your own personal copy of this repository under your GitHub account. You will do all your work there.

1. Make sure you are **logged in to GitHub**
2. Click the **Fork** button at the top-right of this page

   ![Fork button location](https://docs.github.com/assets/cb-79331/mw-1440/images/help/repository/fork-button.webp)

3. Under "Owner", select **your own GitHub account**
4. Leave the repository name as-is (or rename it if you prefer)
5. Click **Create fork**

You now have your own copy at: `https://github.com/YOUR-USERNAME/react-guide`

---

## Step 2 — Clone Your Fork

Cloning downloads the repository to your local machine so you can work on it.

1. On **your forked repository** page, click the green **Code** button
2. Copy the HTTPS URL (e.g. `https://github.com/YOUR-USERNAME/react-guide.git`)
3. Open a terminal on your computer and run:

```bash
# Replace YOUR-USERNAME with your actual GitHub username
git clone https://github.com/YOUR-USERNAME/react-guide.git

# Navigate into the folder
cd react-guide
```

4. Open the folder in VS Code:

```bash
code .
```

---

## Step 3 — Create Your Vite + React Project

Now you will scaffold a new React project using Vite **inside your cloned folder**.

Run the following command in your terminal (make sure you are inside the `react-guide` folder):

```bash
npm create vite@latest . -- --template react
```

> **Note:** The `.` means "create the project in the current folder". If it asks you to confirm overwriting, type `y` and press Enter.

Then install all dependencies:

```bash
npm install
```

> **What just happened?**  
> Vite generated all the starter files React needs — `main.jsx`, `App.jsx`, and the `index.html` entry point. Think of it like scaffolding for a building.

---

## Step 4 — Run the Development Server

Start the local development server:

```bash
npm run dev
```

You should see output like this:

```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and go to **http://localhost:5173**. You should see the default Vite + React welcome page.

> **Tip:** The dev server has **hot reload** — every time you save a file, the browser updates automatically. You do not need to refresh manually.

To stop the server, press `Ctrl + C` in the terminal.

---

## Step 5 — Project Structure

After setup, your folder should look like this:

```
react-guide/
├── public/               ← Static files (favicon, etc.)
├── src/
│   ├── assets/           ← Images and static assets
│   ├── components/       ← 📁 Create this folder for your components
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── Cart.jsx
│   │   └── CartItem.jsx
│   ├── data/             ← 📁 Create this folder for mock data
│   │   └── products.js
│   ├── App.jsx           ← Root component (your main file)
│   ├── App.css
│   ├── index.css
│   └── main.jsx          ← Entry point (do not modify this)
├── index.html
├── package.json
└── vite.config.js
```

> **Important:** The `components/` and `data/` folders do not exist yet — you will create them yourself as part of the learning phases below.

---

## 📚 Learning Guides

Before diving into the phases, read the dedicated guide for each concept. These guides explain the *why* behind each step so you understand what you are doing — not just copy code.

| Guide | What you will learn | Read before |
|-------|---------------------|-------------|
| [`Components/README.md`](./Components/README.md) | What the `components/` folder is, how to break UI into pieces, component relationships, best practices, common mistakes | Phase 01 |
| [`props/README.md`](./props/README.md) | What props are, data flow, destructuring, passing functions, the `key` prop, common mistakes | Phase 02 |
| [`useState/README.md`](./useState/README.md) | What state is, `useState` syntax, `addToCart`, `removeFromCart`, derived values, common mistakes | Phase 03–05 |

---

## Learning Phases

Work through each phase in order. Do not skip ahead — each phase builds on the last.

### Phase 01 — Your First Component
**Goal:** Render a static `ProductCard` component on the screen.

> 📖 **Read first:** [`Components/README.md`](./Components/README.md) — sections 1, 2, and 4 (best practices)

- Clean up `App.jsx` (delete the boilerplate content)
- Create `src/components/ProductCard.jsx`
- Display a hardcoded product name, price, and description
- Import and render it in `App.jsx`

**Done when:** You can see a product card in the browser.

---

### Phase 02 — Props and Product Listing
**Goal:** Make `ProductCard` reusable by passing data through props.

> 📖 **Read first:** [`props/README.md`](./props/README.md) — all sections

- Create `src/data/products.js` with an array of 5+ product objects
- Each product should have: `id`, `name`, `price`, `description`, `image`
- Update `ProductCard` to receive and display props
- Use `.map()` in `App.jsx` to render one card per product
- Remember to add a `key` prop to each mapped element

**Done when:** All products from your array appear as separate cards.

---

### Phase 03 — useState and Add to Cart
**Goal:** Make the "Add to Cart" button functional using React state.

> 📖 **Read first:** [`useState/README.md`](./useState/README.md) — sections 1–4

- Add a button to `ProductCard`
- Create a `cart` state in `App.jsx` using `useState`
- Write an `addToCart` function and pass it as a prop to `ProductCard`
- Show a cart item count somewhere visible (e.g. `"🛒 3 items"`)

**Done when:** Clicking "Add to Cart" updates the counter in real time.

---

### Phase 04 — Cart Display and Remove Item
**Goal:** Show what is in the cart and allow removal.

> 📖 **Re-read:** [`useState/README.md`](./useState/README.md) — section 6 (`removeFromCart`) and [`Components/README.md`](./Components/README.md) — section 3 (component relationships)

- Create `src/components/Cart.jsx`
- Pass the `cart` array to `Cart` as a prop
- Display each cart item's name and price
- Show `"Your cart is empty"` when there are no items
- Add a `removeFromCart` function in `App.jsx` and pass it down
- Show a "Remove" button next to each cart item

**Done when:** You can add and remove items, and the cart reflects the changes.

---

### Phase 05 — Total Price
**Goal:** Compute and display the total price without storing it in state.

> 📖 **Re-read:** [`useState/README.md`](./useState/README.md) — section 7 (derived values — no extra state needed)

- Use `.reduce()` on the cart array to calculate the total
- Display the total at the bottom of the cart
- Format it nicely (e.g. `₱1,250.00`)
- **Bonus:** Prevent duplicates — increase a `quantity` field instead of adding a new entry

**Done when:** The total updates automatically as you add and remove items.

---

## How to Submit Your Work

After completing each phase, save and push your changes to your forked repository:

```bash
# Stage all your changes
git add .

# Write a commit message describing what you did
git commit -m "Phase 03: Add to cart with useState"

# Push to your fork on GitHub
git push origin main
```

> **Good commit message habits:**
> - Be specific: `"Phase 02: Add props to ProductCard"` ✅
> - Avoid vague messages: `"updated stuff"` ❌

Your mentor will review your progress by visiting your forked repository on GitHub.

---

## Tips & Reminders

**React rules to remember:**
- Never mutate state directly — always use the setter function: `setCart([...cart, item])`
- Every element in a `.map()` needs a unique `key` prop
- State updates do not happen instantly — do not read a state variable right after calling its setter
- Keep state as close to where it is needed as possible; only "lift it up" when two components need the same data

**Git habits:**
- Commit after finishing each phase, not just at the very end
- Use clear, descriptive commit messages
- Push regularly so your work is backed up on GitHub

**When you are stuck:**
1. Read the error message in the browser console carefully
2. Re-read the relevant phase instructions
3. Try explaining your code out loud, line by line
4. Ask your mentor — but be ready to describe what you already tried

---

