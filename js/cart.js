// --- CART PAGE LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
});

// Render the items in the cart
function renderCartItems() {
  const cartWrapper = document.querySelector('.cart-items-wrapper');
  if (!cartWrapper) return;
  
  const cart = typeof getCart === 'function' ? getCart() : [];
  
  if (cart.length === 0) {
    cartWrapper.innerHTML = '<p style="text-align:center; padding:20px; color:#666;">Your cart is empty.</p>';
    updateOrderSummary();
    return;
  }
  
  let html = '';
  cart.forEach((item, index) => {
    // Generate HTML for each item
    // The structure needs to match the hardcoded cart items
    html += `
      <div class="cart-item" data-index="${index}">
        <div class="item-img">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="item-details">
          <div class="item-title-row">
            <h3>${item.title}</h3>
            <button class="btn-delete" onclick="deleteCartItem(${index})">
              <img src="../Images/deleteicon.svg" alt="Delete">
            </button>
          </div>
          <p class="item-meta">Size: <span>${item.size}</span></p>
          <p class="item-meta">Color: <span>${item.color}</span></p>
          <div class="item-price-row">
            <div class="item-price">$${item.price}</div>
            <div class="item-qty">
              <button onclick="updateCartItemQty(${index}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="updateCartItemQty(${index}, 1)">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  cartWrapper.innerHTML = html;
  
  // Re-calculate totals
  updateOrderSummary();
}

// Update quantity for a specific item in cart
window.updateCartItemQty = function(index, change) {
  const cart = getCart();
  if (cart[index]) {
    cart[index].quantity += change;
    
    // If quantity goes below 1, we can either keep it at 1 or delete it
    // Let's keep it at 1 minimum for safety, require explicit delete
    if (cart[index].quantity < 1) {
      cart[index].quantity = 1;
    }
    
    saveCart(cart);
    renderCartItems();
    if (typeof updateCartBadge === 'function') updateCartBadge();
  }
};

// Delete item from cart
window.deleteCartItem = function(index) {
  const cart = getCart();
  if (cart[index]) {
    cart.splice(index, 1);
    saveCart(cart);
    renderCartItems();
    if (typeof updateCartBadge === 'function') updateCartBadge();
  }
};

// Calculate and update order summary
function updateOrderSummary() {
  const cart = getCart();
  let subtotal = 0;
  
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  
  // Logic based on original hardcoded numbers: 
  // Subtotal: $565, Discount (-20%): -$113, Delivery: $15, Total: $467
  const discountPercent = 0.20;
  let discount = subtotal * discountPercent;
  let deliveryFee = subtotal > 0 ? 15 : 0;
  let total = subtotal - discount + deliveryFee;
  
  // Select DOM elements
  const summaryRows = document.querySelectorAll('.summary-row span:last-child');
  const totalEl = document.querySelector('.summary-total span:last-child');
  
  if (summaryRows.length >= 3) {
    // subtotal
    summaryRows[0].textContent = '$' + subtotal.toFixed(0);
    // discount
    summaryRows[1].textContent = '-$' + discount.toFixed(0);
    // delivery
    summaryRows[2].textContent = '$' + deliveryFee;
  }
  
  if (totalEl) {
    totalEl.textContent = '$' + total.toFixed(0);
  }
}
