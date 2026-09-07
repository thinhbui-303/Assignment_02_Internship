// --- PRODUCT PAGE LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
  loadDynamicProduct();
  setupOptionSelectors();
  setupAddToCart();
  setupTabs();
});

// Tab switching logic
function setupTabs() {
  const tabs = document.querySelectorAll('.product-tabs .tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');

      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Hide all tab contents
      tabContents.forEach(tc => {
        tc.style.display = 'none';
        tc.classList.remove('active');
      });

      // Activate clicked tab
      tab.classList.add('active');

      // Show matching content
      const targetContent = document.getElementById('tab-' + target);
      if (targetContent) {
        targetContent.style.display = 'block';
        targetContent.classList.add('active');
      }
    });
  });
}

// Load product details from localStorage (if navigating from another page)
function loadDynamicProduct() {
  const currentProductStr = localStorage.getItem('shopco_current_product');
  if (currentProductStr) {
    try {
      const product = JSON.parse(currentProductStr);
      
      // Update Title
      const titleEl = document.querySelector('.product-title');
      if (titleEl && product.title) titleEl.textContent = product.title;
      
      // Update Price
      const priceEl = document.querySelector('.product-price');
      if (priceEl && product.price) {
        // Find existing discount badge if any
        const badge = priceEl.querySelector('.discount-badge');
        priceEl.innerHTML = `${product.price} `;
        if (badge) priceEl.appendChild(badge);
      }
      
      // Update Rating
      const ratingScoreEl = document.querySelector('.rating-score');
      if (ratingScoreEl && product.rating) ratingScoreEl.textContent = product.rating;

      // Update Main Image
      const mainImg = document.getElementById('mainImage');
      if (mainImg && product.image) {
        // The image path must be relative to product.html (inside html/ folder)
        // so it should always point to ../Images/
        let imgPath = product.image;
        const imagesIndex = imgPath.indexOf('Images/');
        if (imagesIndex !== -1) {
          imgPath = '../' + imgPath.substring(imagesIndex);
        }
        mainImg.src = imgPath;
      }

      // Update the breadcrumb
      const breadcrumbSpan = document.querySelector('.breadcrumbs span');
      if (breadcrumbSpan && product.title) {
        breadcrumbSpan.textContent = product.title;
      }
    } catch (e) {
      console.error("Error loading product data:", e);
    }
  }
}

// Function to change the main image when a thumbnail is clicked
window.changeImage = function(src, element) {
  const mainImg = document.getElementById('mainImage');
  if (mainImg) {
    mainImg.src = src;
  }

  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  
  if (element) {
    element.classList.add('active');
  }
};

// Function to update quantity selector
window.updateQty = function(change) {
  const qtyElement = document.getElementById('qty');
  if (qtyElement) {
    let currentQty = parseInt(qtyElement.innerText);
    currentQty += change;
    if (currentQty < 1) currentQty = 1;
    qtyElement.innerText = currentQty;
  }
};

// Setup size and color selectors
function setupOptionSelectors() {
  const sizePills = document.querySelectorAll('.size-pill');
  sizePills.forEach(pill => {
    pill.addEventListener('click', function() {
      const siblings = this.parentElement.querySelectorAll('.size-pill');
      siblings.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const colorCircles = document.querySelectorAll('.colors-options .color-circle');
  colorCircles.forEach(circle => {
    circle.addEventListener('click', function() {
      const siblings = this.parentElement.querySelectorAll('.color-circle');
      siblings.forEach(s => s.innerHTML = '');
      this.innerHTML = '&#10003;';
    });
  });
}

// Handle Add to Cart
function setupAddToCart() {
  const addToCartBtn = document.querySelector('.btn-add-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      // Collect product info
      const title = document.querySelector('.product-title').textContent.trim();
      const priceText = document.querySelector('.product-price').childNodes[0].textContent.trim();
      const price = parseFloat(priceText.replace('$', ''));
      const image = document.getElementById('mainImage').src;
      
      // Get selected size
      const activeSize = document.querySelector('.size-pill.active');
      const size = activeSize ? activeSize.textContent.trim() : 'Medium';
      
      // Get selected color (using background color style)
      const activeColor = document.querySelector('.color-circle:not(:empty)');
      let color = 'Unknown';
      if (activeColor) {
        const bg = activeColor.style.backgroundColor;
        color = bg === 'rgb(79, 70, 49)' ? 'Olive' : 
                bg === 'rgb(49, 79, 74)' ? 'Teal' : 
                bg === 'rgb(49, 52, 79)' ? 'Navy' : bg;
      } else {
        // Fallback for default selected color in html
        const firstColor = document.querySelector('.color-circle');
        if (firstColor) color = firstColor.style.backgroundColor;
      }
      
      const qty = parseInt(document.getElementById('qty').innerText);

      // Create cart item
      const item = {
        id: title + '_' + size + '_' + color, // unique identifier for the variant
        title: title,
        price: price,
        image: image,
        size: size,
        color: color,
        quantity: qty
      };

      // Get existing cart
      const cart = typeof getCart === 'function' ? getCart() : [];
      
      // Check if item already exists
      const existingItemIndex = cart.findIndex(i => i.id === item.id);
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += qty;
      } else {
        cart.push(item);
      }
      
      // Save and update
      if (typeof saveCart === 'function') saveCart(cart);
      if (typeof updateCartBadge === 'function') updateCartBadge();
      
      // Optional: Show a small visual feedback
      const originalText = addToCartBtn.textContent;
      addToCartBtn.innerHTML = 'Added to Cart &#10003;';
      addToCartBtn.style.backgroundColor = '#01AB31';
      
      setTimeout(() => {
        addToCartBtn.textContent = originalText;
        addToCartBtn.style.backgroundColor = '';
      }, 1500);
    });
  }
}
