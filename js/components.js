// Custom Components (Header & Footer)

class AppHeader extends HTMLElement {
  connectedCallback() {
    // Determine base path depending on where the HTML file is
    const isHtmlFolder = window.location.pathname.includes('/html/');
    const basePath = isHtmlFolder ? '../' : './';
    const cartLink = isHtmlFolder ? 'cart.html' : 'html/cart.html';

    this.innerHTML = `
      <!-- TOP PROMO -->
      <div class="top-promo">
        Sign up and get 20% off to your first order. <a href="#">Sign Up Now</a>
      </div>
    
      <!-- HEADER -->
      <header class="main-header">
        <div class="container">
          <i class="fa-solid fa-bars mobile-menu-btn"></i>
          <div class="logo">
            <a href="${basePath}index.html" style="text-decoration: none; color: inherit;">SHOP.CO</a>
          </div>
          <nav class="nav-links">
            <div class="dropdown">
              <a href="${basePath}html/category.html">Shop <i class="fa-solid fa-chevron-down" style="font-size:12px;"></i></a>
              <div class="dropdown-content">
                <a href="${basePath}html/category.html">Category</a>
                <a href="${basePath}html/product.html">Product Detail</a>
                <a href="${cartLink}">Cart</a>
              </div>
            </div>
            <a href="${basePath}index.html#on-sale">On Sale</a>
            <a href="${basePath}index.html#new-arrivals">New Arrivals</a>
            <a href="${basePath}index.html#brands">Brands</a>
          </nav>
          <div class="search-bar">
            <img src="${basePath}Images/searrrch.svg" alt="Search">
            <input type="text" placeholder="Search for products...">
          </div>
          <div class="header-icons">
            <a href="#" class="mobile-search"><img src="${basePath}Images/searrrch.svg" alt="Search"></a>
            <a href="${cartLink}">
              <img src="${basePath}Images/carticon.svg" alt="Cart">
              <span id="cart-badge" class="cart-badge">0</span>
            </a>
            <a href="#"><img src="${basePath}Images/usericon.svg" alt="User"></a>
          </div>
        </div>
      </header>
    `;
  }
}

class AppFooter extends HTMLElement {
  connectedCallback() {
    const isHtmlFolder = window.location.pathname.includes('/html/');
    const basePath = isHtmlFolder ? '../' : './';

    this.innerHTML = `
      <div class="container">
        <div class="newsletter-section">
          <div class="newsletter-box">
            <h2 class="newsletter-title">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
            <form class="newsletter-form" onsubmit="event.preventDefault();">
              <input type="email" placeholder="&#9993; Enter your email address">
              <button type="submit" class="btn-outline">Subscribe to Newsletter</button>
            </form>
          </div>
        </div>
      </div>
    
      <footer class="main-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col footer-brand">
              <div class="logo">SHOP.CO</div>
              <p>We have clothes that suits your style and which you're proud to wear. From women to men.</p>
              <div class="social-icons">
                <a href="#"><img src="${basePath}Images/twster.svg" alt="Twitter"></a>
                <a href="#"><img src="${basePath}Images/fbicon.svg" alt="Facebook"></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><img src="${basePath}Images/githubicon.svg" alt="GitHub"></a>
              </div>
            </div>
            <div class="footer-col">
              <h4>COMPANY</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Works</a></li>
                <li><a href="#">Career</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>HELP</h4>
              <ul>
                <li><a href="#">Customer Support</a></li>
                <li><a href="#">Delivery Details</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>FAQ</h4>
              <ul>
                <li><a href="#">Account</a></li>
                <li><a href="#">Manage Deliveries</a></li>
                <li><a href="#">Orders</a></li>
                <li><a href="#">Payment</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>RESOURCES</h4>
              <ul>
                <li><a href="#">Free eBook</a></li>
                <li><a href="#">Development Tutorial</a></li>
                <li><a href="#">How to - Blog</a></li>
                <li><a href="#">Youtube Playlist</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>Shop.co &copy; 2000-2023, All Rights Reserved</p>
            <div class="payment-methods">
              <img src="${basePath}Images/Visa.svg" alt="Visa">
              <img src="${basePath}Images/Mastercard.svg" alt="Mastercard">
              <img src="${basePath}Images/Paypal.svg" alt="Paypal">
              <img src="${basePath}Images/applepay.svg" alt="Apple Pay">
              <img src="${basePath}Images/G Pay.svg" alt="Google Pay">
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
