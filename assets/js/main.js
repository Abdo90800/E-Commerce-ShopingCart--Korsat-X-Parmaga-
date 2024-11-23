// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");
const totalPriceElement = document.querySelector(".total-price"); // Element to display the total price
const products = [
    { id: 1, title: "Nike Shoes", price: "$79.5", image: "assets/img/product1.jpg" },
    { id: 2, title: "Adidas Shoes", price: "$99.0", image: "assets/img/product2.jpg" },
    { id: 3, title: "Puma Shoes", price: "$85.0", image: "assets/img/product3.jpg" },
    { id: 4, title: "Puma Shoes", price: "$85.0", image: "assets/img/product3.jpg" },
    { id: 5, title: "Reebok Shoes", price: "$70.0", image: "assets/img/product4.jpg" },
    { id: 6, title: "Reebok Shoes", price: "$70.0", image: "assets/img/product1.jpg" },
    { id: 7, title: "Reebok Shoes", price: "$70.0", image: "assets/img/product3.jpg" },
    { id: 8, title: "Reebok Shoes", price: "$70.0", image: "assets/img/product4.jpg" }, { id: 3, title: "Puma Shoes", price: "$85.0", image: "assets/img/product3.jpg" },
    { id: 9, title: "Puma Shoes", price: "$85.0", image: "assets/img/product3.jpg" },
    { id: 10, title: "Reebok Shoes", price: "$70.0", image: "assets/img/product4.jpg" },
    { id: 11, title: "Reebok Shoes", price: "$70.0", image: "assets/img/product1.jpg" },
    { id: 12, title: "Reebok Shoes", price: "$70.0", image: "assets/img/product3.jpg" },
    { id: 13, title: "Reebok Shoes", price: "$70.0", image: "assets/img/product4.jpg" }, { id: 12, title: "Reebok Shoes", price: "$70.0", image: "assets/img/product3.jpg" },
    { id: 13, title: "Reebok Shoes", price: "$70.0", image: "assets/img/product4.jpg" },
];

// Retrieve cart items from localStorage on page load
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Save cart items to localStorage
function saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Open cart
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

// Close cart
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Render products in the shop
let productsDOM = document.querySelector(".shop-content");

function getData() {
    let productsUI = products.map((product) => {
        return `
            <div class="product-box">
                <img src="${product.image}" alt="" class="product-img">
                <h2 class="product-title">${product.title}</h2>
                <span class="product-price">${product.price}</span>
                <i class='bx bx-shopping-bag add-cart' onclick="addToCART(${product.id})"></i>
            </div>
        `;
    });
    productsDOM.innerHTML = productsUI.join("");
}

getData();

// Create HTML structure for cart items
function CartBoxComponent(title, price, imgSrc, id) {
    return `
      <div class="cart-box" data-id="${id}">
          <img src="${imgSrc}" alt="${title}" class="cart-img">
          <div class="detail-box">
              <div class="cart-product-title">${title}</div>
              <div class="cart-price">${price}</div>
              <input type="number" value="1" class="cart-quantity" onchange="updateTotalPrice()">
          </div>
          <i class='bx bxs-trash-alt cart-remove' onclick="handle_removeCartItem(this)"></i>
      </div>
    `;
}

// Add product to cart
function addToCART(id) {
    let addedProduct = products.find((product) => product.id === id);
    let isProductInCart = cartItems.some((product) => product.id === id);

    if (isProductInCart) {
        alert("This product is already in the cart!");
    } else {
        cartItems.push({...addedProduct, quantity: 1 }); // Add product with default quantity of 1

        // Add product to cart in DOM
        let newCartBox = document.createElement("div");
        newCartBox.innerHTML = CartBoxComponent(addedProduct.title, addedProduct.price, addedProduct.image, addedProduct.id);
        cartContent.appendChild(newCartBox); // Append new item without removing existing ones
    }

    saveToLocalStorage(); // Save cart to localStorage
    updateTotalPrice(); // Update total price
    updateCartCount(); // Update cart item count
}

// Remove product from cart
function handle_removeCartItem(e) {
    let productTitle = e.parentElement.querySelector(".cart-product-title").textContent;

    // Remove product from cart
    cartItems = cartItems.filter((product) => product.title !== productTitle);

    // Remove product from DOM
    e.parentElement.remove();

    saveToLocalStorage(); // Save cart after removal
    updateTotalPrice(); // Update total price
    updateCartCount(); // Update cart item count
}

// Update total price of items in the cart
function updateTotalPrice() {
    let totalPrice = 0;

    cartItems.forEach((product) => {
        let price = parseFloat(product.price.replace("$", ""));
        let quantity = document.querySelector(`.cart-box[data-id="${product.id}"] .cart-quantity`).value;
        totalPrice += price * quantity;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`; // Display total price
}

// Update the number of items in the cart
function updateCartCount() {
    const cartCount = document.querySelector("#cart-count");
    cartCount.textContent = cartItems.length;
}

// Check and render cart items when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // Render stored cart items in DOM
    cartItems.forEach((product) => {
        let newCartBox = document.createElement("div");
        newCartBox.innerHTML = CartBoxComponent(product.title, product.price, product.image, product.id);
        cartContent.appendChild(newCartBox); // Append stored items to cart DOM
    });

    updateTotalPrice(); // Update total price on page load
    updateCartCount(); // Update cart item count on page load
});

// Buy all items in the cart
let selectAll = document.querySelector(".btn-buy").addEventListener("click", () => {
    if (cartItems.length > 0) {
        alert("All items have been successfully applied!");
    } else {
        alert("The cart is empty. Please add items first.");
    }
});

// Remove all items from the cart
let removeAllItems = document.querySelector(".btn-Remove").addEventListener("click", () => {
    cartItems = [];
    document.querySelector(".cart-content").innerHTML = ""; // Clear all items from DOM
    saveToLocalStorage(); // Save empty cart to localStorage
    updateTotalPrice(); // Update total price
    updateCartCount(); // Update cart item count
});