// --- GLOBAL CART STATE & BADGE ---
function getCart() {
  const cart = localStorage.getItem('shopco_cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('shopco_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const badges = document.querySelectorAll('.cart-badge');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  badges.forEach(badge => {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  });
}

// --- DYNAMIC PRODUCT CLICK TRACKING ---
function setupProductClickTracking() {
  // Find all product cards on the page
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    // Add click event to each card
    card.addEventListener('click', function(e) {
      // Don't trigger if they clicked an "Add to cart" button or something inside
      if (e.target.tagName === 'BUTTON') return;
      
      // Extract data from the card
      const titleEl = this.querySelector('.product-title');
      const priceEl = this.querySelector('.product-price');
      const imgEl = this.querySelector('.product-img-wrapper img');
      const ratingEl = this.querySelector('.rating-score');

      const productData = {
        title: titleEl ? titleEl.textContent.trim() : 'Unknown Product',
        price: priceEl ? priceEl.textContent.trim().split(' ')[0] : '$0', // e.g. "$120"
        image: imgEl ? imgEl.getAttribute('src') : '',
        rating: ratingEl ? ratingEl.textContent.trim() : '5.0/5'
      };

      // Save to localStorage
      localStorage.setItem('shopco_current_product', JSON.stringify(productData));

      // Navigate to product page
      // Determine correct path depending on where we are
      if (window.location.pathname.includes('html/')) {
        window.location.href = 'product.html';
      } else {
        window.location.href = 'html/product.html';
      }
    });
    
    // Change cursor to pointer to indicate it's clickable
    card.style.cursor = 'pointer';
  });
}

// --- MOBILE MENU & SEARCH TOGGLE ---
function setupMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show-menu');
      // Hide search bar if it's open
      const searchBar = document.querySelector('.search-bar');
      if (searchBar) searchBar.classList.remove('show-search');
    });
  }

  const searchBtn = document.querySelector('.mobile-search');
  const searchBar = document.querySelector('.search-bar');

  if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent jump to top
      searchBar.classList.toggle('show-search');
      // Hide menu if it's open
      if (navLinks) navLinks.classList.remove('show-menu');
    });

    // Close search bar when clicking outside
    document.addEventListener('click', (e) => {
      if (searchBar.classList.contains('show-search')) {
        if (!searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
          searchBar.classList.remove('show-search');
        }
      }
    });
  }
}

// Run global logic on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  setupProductClickTracking();
  setupMobileMenu();
});
