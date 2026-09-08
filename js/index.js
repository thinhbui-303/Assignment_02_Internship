// --- HOMEPAGE SPECIFIC LOGIC ---
// Product click tracking is already handled in global.js
console.log("Homepage JS loaded");

// --- TESTIMONIALS ARROW SLIDER ---
// Left/right arrows scroll the testimonials strip by exactly one card.
// On narrow screens each card is 100% wide, so this becomes a classic
// "1 item at a time, prev/next" carousel; on wider screens it just
// advances the horizontal scroll by one card's width.
(function initTestimonialsSlider() {
  const slider = document.querySelector(".testimonials-slider");
  const prevBtn = document.querySelector(".testimonials-arrows .arrow-btn:first-child");
  const nextBtn = document.querySelector(".testimonials-arrows .arrow-btn:last-child");

  if (!slider || !prevBtn || !nextBtn) return;

  function getStep() {
    const card = slider.querySelector(".testimonial-card");
    if (!card) return slider.clientWidth;
    const gap = parseFloat(getComputedStyle(slider).columnGap || getComputedStyle(slider).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function updateArrowState() {
    const maxScroll = slider.scrollWidth - slider.clientWidth - 1; // -1 for rounding
    prevBtn.disabled = slider.scrollLeft <= 0;
    nextBtn.disabled = slider.scrollLeft >= maxScroll;
  }

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  slider.addEventListener("scroll", updateArrowState);
  window.addEventListener("resize", updateArrowState);
  updateArrowState();
})();