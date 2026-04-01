// ═══════════════════════════════════════════
// Agentic Summer — Inner Circle
// ═══════════════════════════════════════════

// ── Cities Carousel — Drag to scroll ──
(function () {
  'use strict';

  var carousel = document.getElementById('citiesCarousel');
  if (!carousel) return;

  // Clone cards for seamless loop
  var originalCards = Array.from(carousel.querySelectorAll('.city-card'));
  originalCards.forEach(function (card) {
    carousel.appendChild(card.cloneNode(true));
  });

  // Auto-scroll
  var scrollTimer = null;
  var SPEED = window.innerWidth <= 768 ? 0.4 : 0.8;

  function startScroll() {
    stopScroll();
    scrollTimer = setInterval(function () {
      carousel.scrollLeft += SPEED;
      var halfScroll = carousel.scrollWidth / 2;
      if (carousel.scrollLeft >= halfScroll) {
        carousel.scrollLeft -= halfScroll;
      }
    }, 16);
  }

  function stopScroll() {
    if (scrollTimer) {
      clearInterval(scrollTimer);
      scrollTimer = null;
    }
  }

  // Drag to scroll
  var isDragging = false;
  var startX = 0;
  var scrollStart = 0;
  var hasDragged = false;

  carousel.addEventListener('mousedown', function (e) {
    isDragging = true;
    hasDragged = false;
    startX = e.clientX;
    scrollStart = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing';
    stopScroll();
  });

  window.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    var diff = e.clientX - startX;
    if (Math.abs(diff) > 5) hasDragged = true;
    carousel.scrollLeft = scrollStart - diff;
  });

  window.addEventListener('mouseup', function () {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.cursor = 'grab';
    startScroll();
  });

  carousel.addEventListener('click', function (e) {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged = false;
    }
  }, true);

  // Pause on hover
  carousel.addEventListener('mouseenter', stopScroll);
  carousel.addEventListener('mouseleave', function () {
    if (!isDragging) startScroll();
  });

  // Touch
  carousel.addEventListener('touchstart', stopScroll);
  carousel.addEventListener('touchend', function () {
    setTimeout(startScroll, 2000);
  });

  // Off-screen pause
  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) startScroll();
    else stopScroll();
  }, { threshold: 0.1 });
  observer.observe(carousel);

  // Arrow buttons
  var prevBtn = document.getElementById('carouselPrev');
  var nextBtn = document.getElementById('carouselNext');

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      stopScroll();
      carousel.scrollBy({ left: -340, behavior: 'smooth' });
      setTimeout(startScroll, 2000);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      stopScroll();
      carousel.scrollBy({ left: 340, behavior: 'smooth' });
      setTimeout(startScroll, 2000);
    });
  }

  startScroll();
})();


// ── Reveal Lines — Scroll-triggered line-by-line ──
(function () {
  'use strict';

  var lines = document.querySelectorAll('.reveal-line');
  if (!lines.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var line = entry.target;
      var index = Array.prototype.indexOf.call(lines, line);
      setTimeout(function () {
        line.classList.add('is-visible');
      }, index * 150);
      observer.unobserve(line);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  lines.forEach(function (line) {
    observer.observe(line);
  });
})();


// ── Polaroid Stack — Scroll-locked stacking (mobile) ──
(function () {
  'use strict';

  var stack = document.getElementById('polaroidStack');
  if (!stack) return;

  var cards = Array.from(stack.querySelectorAll('.polaroid-stack__card'));
  if (!cards.length) return;

  function onScroll() {
    if (window.innerWidth > 768) return;

    var rect = stack.getBoundingClientRect();
    var scrollableHeight = stack.offsetHeight - window.innerHeight;
    var progress = -rect.top / scrollableHeight;
    progress = Math.max(0, Math.min(1, progress));

    cards.forEach(function (card, i) {
      var start = 0.15 + (i * 0.22);
      var end = start + 0.18;
      var cardProgress = (progress - start) / (end - start);
      cardProgress = Math.max(0, Math.min(1, cardProgress));

      var y = (1 - cardProgress) * 120;
      card.style.opacity = cardProgress > 0 ? '1' : '0';
      card.style.transform = 'translateY(' + y + '%) rotate(var(--rotation, 0deg))';
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


// ── Polaroids — Staggered Reveal (desktop) ──
(function () {
  'use strict';
  var polaroids = document.querySelectorAll('.polaroid');
  if (!polaroids.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var index = Array.prototype.indexOf.call(polaroids, el);
      setTimeout(function () { el.classList.add('is-visible'); }, index * 200);
      observer.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  polaroids.forEach(function (p) { observer.observe(p); });
})();


// ── Event Cards — Staggered Reveal ──
(function () {
  'use strict';
  var cards = document.querySelectorAll('.event-card');
  if (!cards.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var card = entry.target;
      var index = Array.prototype.indexOf.call(cards, card);
      setTimeout(function () { card.classList.add('is-visible'); }, index * 150);
      observer.unobserve(card);
    });
  }, { threshold: 0.15 });

  cards.forEach(function (card) { observer.observe(card); });
})();


// ── Section Video — Mute toggle ──
(function () {
  'use strict';

  var wrap = document.getElementById('videoWrap');
  var video = document.getElementById('sectionVideo');
  var muteBtn = document.getElementById('videoMute');

  if (!wrap || !video || !muteBtn) return;

  function toggleMute() {
    video.muted = !video.muted;
    wrap.classList.toggle('is-unmuted', !video.muted);
  }

  muteBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMute();
  });

  wrap.addEventListener('click', toggleMute);
})();


// ── FAQ Accordion ──
(function () {
  'use strict';
  var items = document.querySelectorAll('.faq__item');

  items.forEach(function (item) {
    item.querySelector('.faq__header').addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      items.forEach(function (o) { o.classList.remove('is-open'); });
      if (!isOpen) item.classList.add('is-open');
    });
  });
})();
