// --- PRODUCT DETAIL PAGE LOGIC ---

// Function to change the main image when a thumbnail is clicked
function changeImage(src, element) {
  // Update main image source
  const mainImg = document.getElementById('mainImage');
  if (mainImg) {
    mainImg.src = src;
  }

  // Update active state on thumbnails
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach(thumb => {
    thumb.classList.remove('active');
  });
  
  if (element) {
    element.classList.add('active');
  }
}

// Function to update quantity selector
function updateQty(change) {
  const qtyElement = document.getElementById('qty');
  if (qtyElement) {
    let currentQty = parseInt(qtyElement.innerText);
    currentQty += change;
    
    // Ensure quantity doesn't go below 1
    if (currentQty < 1) {
      currentQty = 1;
    }
    
    qtyElement.innerText = currentQty;
  }
}

// --- GENERAL LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
  // Add active state functionality to size pills
  const sizePills = document.querySelectorAll('.size-pill');
  sizePills.forEach(pill => {
    pill.addEventListener('click', function() {
      // Find all pills in the same group (parent)
      const siblings = this.parentElement.querySelectorAll('.size-pill');
      siblings.forEach(s => s.classList.remove('active'));
      
      // Add active to clicked pill
      this.classList.add('active');
    });
  });

  // Add active state functionality to color circles (product page)
  const colorCircles = document.querySelectorAll('.colors-options .color-circle');
  colorCircles.forEach(circle => {
    circle.addEventListener('click', function() {
      const siblings = this.parentElement.querySelectorAll('.color-circle');
      siblings.forEach(s => s.innerHTML = '');
      
      this.innerHTML = '&#10003;';
    });
  });
});
