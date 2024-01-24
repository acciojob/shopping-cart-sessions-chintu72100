// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Check if cart data exists in session storage
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listener to all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      addToCart(productId);
      renderCart();
    });
  });
}

// Render cart list
function renderCart() {
  // Clear previous cart items
  cartList.innerHTML = "";

  // Render new cart items
  cart.forEach((cartItem) => {
    const li = document.createElement("li");
    li.innerHTML = `${cartItem.name} - $${cartItem.price} <button class="remove-from-cart-btn" data-id="${cartItem.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listener to all "Remove" buttons in the cart
  const removeFromCartButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      removeFromCart(productId);
      renderCart();
    });
  });

  // Save the updated cart data to session storage
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
  const productToAdd = products.find((product) => product.id === productId);
  if (productToAdd) {
    cart.push({ id: productToAdd.id, name: productToAdd.name, price: productToAdd.price });
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
}

// Clear cart
function clearCart() {
  cart = [];
  renderCart();
}

// Add event listener to "Clear Cart" button
clearCartBtn.addEventListener("click", () => {
  clearCart();
});

// Initial render
renderProducts();
renderCart();
