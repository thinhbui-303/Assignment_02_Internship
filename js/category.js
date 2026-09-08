// --- CATEGORY PAGE SPECIFIC LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Filter Toggle ---
  const filterBtn = document.querySelector('.mobile-filter-btn');
  const sidebar = document.querySelector('.sidebar');
  const filterHeader = document.querySelector('.filter-header');

  if (filterBtn && sidebar) {
    filterBtn.addEventListener('click', () => {
      sidebar.classList.add('show-sidebar');
    });
    if (filterHeader) {
      filterHeader.addEventListener('click', () => {
        sidebar.classList.remove('show-sidebar');
      });
    }
  }

  // --- Price Slider Dual Range ---
  const sliderMin = document.getElementById('slider-min');
  const sliderMax = document.getElementById('slider-max');
  const sliderTrack = document.querySelector('.slider-track');
  const labelMin = document.getElementById('price-min-label');
  const labelMax = document.getElementById('price-max-label');
  const maxPrice = 500;

  function updateSlider(e) {
    let minVal = parseInt(sliderMin.value);
    let maxVal = parseInt(sliderMax.value);

    // Prevent sliders from crossing
    if (minVal >= maxVal) {
      if (e.target === sliderMin) {
        sliderMin.value = maxVal - 10;
        minVal = maxVal - 10;
      } else {
        sliderMax.value = minVal + 10;
        maxVal = minVal + 10;
      }
    }

    // Update track position and width
    const percent1 = (minVal / maxPrice) * 100;
    const percent2 = (maxVal / maxPrice) * 100;

    sliderTrack.style.left = percent1 + "%";
    sliderTrack.style.right = (100 - percent2) + "%";

    // Update labels text and position
    labelMin.textContent = "$" + minVal;
    labelMax.textContent = "$" + maxVal;
    
    labelMin.style.left = percent1 + "%";
    labelMax.style.left = percent2 + "%";
  }

  if (sliderMin && sliderMax) {
    sliderMin.addEventListener('input', updateSlider);
    sliderMax.addEventListener('input', updateSlider);
    // Initialize
    updateSlider({ target: sliderMin }); 
  }

  // --- Filter Options Interaction (Single Selection) ---
  
  // Categories (T-shirts, etc.)
  const filterItems = document.querySelectorAll('.filter-list li');
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      // Clear others
      filterItems.forEach(i => {
        i.style.fontWeight = 'normal';
        i.style.color = 'var(--gray-text)';
      });
      // Select this
      item.style.fontWeight = 'bold';
      item.style.color = 'var(--primary-color)';
    });
  });

  // Colors
  const colorCircles = document.querySelectorAll('.color-circle');
  colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      // Clear others
      colorCircles.forEach(c => c.innerHTML = '');
      // Select this
      circle.innerHTML = '&#10003;';
    });
  });

  // Sizes
  const sizePills = document.querySelectorAll('.size-pill');
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Clear others
      sizePills.forEach(p => p.classList.remove('active'));
      // Select this
      pill.classList.add('active');
    });
  });

  // --- Pagination Logic (Hide 9th item on mobile) ---
  const productCards = document.querySelectorAll('.category-grid .product-card');
  const pageBtns = document.querySelectorAll('.page-numbers .page-btn');
  const prevNextBtns = document.querySelectorAll('.btn-prev-next');
  let currentPage = 1;

  function renderPagination() {
    const isMobile = window.innerWidth <= 1024;
    const itemsPerPage = isMobile ? 8 : 9;

    productCards.forEach((card, index) => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      if (index >= startIndex && index < endIndex) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    pageBtns.forEach(btn => {
      if (parseInt(btn.textContent) === currentPage) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  window.addEventListener('resize', () => {
    // Optionally reset to page 1 on resize
    currentPage = 1;
    renderPagination();
  });

  pageBtns.forEach(btn => {
    if (!isNaN(parseInt(btn.textContent))) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = parseInt(btn.textContent);
        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });

  if (productCards.length > 0) {
    renderPagination();
  }
});
