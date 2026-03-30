// ═══════════════════════════════════════════
// Agentic Summer — Inner Circle
// ═══════════════════════════════════════════

// ── Cities Carousel ──
(function () {
  'use strict';

  var carousel = document.getElementById('citiesCarousel');
  if (!carousel) return;

  var cards = Array.from(carousel.querySelectorAll('.city-card'));
  var total = cards.length;
  var activeIndex = 0;
  var autoTimer = null;
  var INTERVAL = 1800;

  // Base card size — responsive
  function getBaseSize() {
    if (window.innerWidth <= 480) return { w: 220, h: 300, gap: 16 };
    if (window.innerWidth <= 768) return { w: 260, h: 350, gap: 20 };
    return { w: 337, h: 452, gap: 25 };
  }

  var dims = getBaseSize();
  var BASE_W = dims.w;
  var BASE_H = dims.h;
  var GAP = dims.gap;

  // Scale per distance from center
  var scales = [1, 0.926, 0.863, 0.77];

  function updateBaseSize() {
    dims = getBaseSize();
    BASE_W = dims.w;
    BASE_H = dims.h;
    GAP = dims.gap;
    cards.forEach(function (card) {
      card.style.width = BASE_W + 'px';
      card.style.height = BASE_H + 'px';
    });
  }

  // Set base size on all cards once (no layout animation)
  cards.forEach(function (card) {
    card.style.width = BASE_W + 'px';
    card.style.height = BASE_H + 'px';
    card.style.position = 'absolute';
    card.style.bottom = '0';
    card.style.left = '50%';
    card.style.transformOrigin = 'bottom center';
  });

  function layout() {
    cards.forEach(function (card, i) {
      var diff = i - activeIndex;
      if (diff > Math.floor(total / 2)) diff -= total;
      if (diff < -Math.floor(total / 2)) diff += total;

      var absDiff = Math.abs(diff);

      if (absDiff > 3) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.transform = 'translateX(-50%) scale(0.7)';
        card.style.zIndex = '0';
        return;
      }

      var s = scales[Math.min(absDiff, scales.length - 1)];

      // Calculate horizontal offset from center
      var offsetX = 0;
      for (var j = 0; j < absDiff; j++) {
        var sj = scales[Math.min(j, scales.length - 1)];
        var sjNext = scales[Math.min(j + 1, scales.length - 1)];
        offsetX += (BASE_W * sj) / 2 + GAP + (BASE_W * sjNext) / 2;
      }
      if (diff < 0) offsetX = -offsetX;

      card.style.transform = 'translateX(calc(-50% + ' + offsetX + 'px)) scale(' + s + ')';
      card.style.opacity = absDiff <= 2 ? '1' : '0.5';
      card.style.pointerEvents = 'auto';
      card.style.zIndex = String(10 - absDiff);
    });
  }

  function goTo(index) {
    activeIndex = ((index % total) + total) % total;
    layout();
  }

  function next() {
    goTo(activeIndex + 1);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, INTERVAL);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Click left/right to navigate
  carousel.addEventListener('click', function (e) {
    var rect = carousel.getBoundingClientRect();
    var clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) {
      goTo(activeIndex - 1);
    } else {
      next();
    }
    stopAuto();
    startAuto();
  });

  // Pause when off-screen
  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      startAuto();
    } else {
      stopAuto();
    }
  }, { threshold: 0.1 });
  observer.observe(carousel);

  // Init
  activeIndex = Math.floor(total / 2);
  layout();
  window.addEventListener('resize', function () {
    updateBaseSize();
    layout();
  });
  startAuto();
})();


// ── Polaroids — Staggered Reveal ──
(function () {
  'use strict';

  var polaroids = document.querySelectorAll('.polaroid');
  if (!polaroids.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var el = entry.target;
      var index = Array.prototype.indexOf.call(polaroids, el);
      var delay = index * 200;

      setTimeout(function () {
        el.classList.add('is-visible');
      }, delay);

      observer.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  polaroids.forEach(function (p) {
    observer.observe(p);
  });
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
      var delay = index * 150;

      setTimeout(function () {
        card.classList.add('is-visible');
      }, delay);

      observer.unobserve(card);
    });
  }, { threshold: 0.15 });

  cards.forEach(function (card) {
    observer.observe(card);
  });
})();


// ── FAQ Accordion ──
(function () {
  'use strict';

  var items = document.querySelectorAll('.faq__item');

  items.forEach(function (item) {
    var header = item.querySelector('.faq__header');
    header.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close all others
      items.forEach(function (other) {
        other.classList.remove('is-open');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
})();
