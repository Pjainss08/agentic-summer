// ═══════════════════════════════════════════
// Agentic Summer — Inner Circle
// ═══════════════════════════════════════════

// ── Cities Carousel ──
(function () {
  'use strict';

  var carousel = document.getElementById('citiesCarousel');
  if (!carousel) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var originalCards = Array.from(carousel.querySelectorAll('.city-card'));
  var originalCount = originalCards.length;
  var MOBILE_BP = 768;

  // Clone cards enough times for seamless looping
  for (var c = 0; c < 4; c++) {
    originalCards.forEach(function (card) {
      carousel.appendChild(card.cloneNode(true));
    });
  }

  var cards = Array.from(carousel.querySelectorAll('.city-card'));
  var activeIndex = originalCount * 2;
  var autoTimer = null;
  var mobileTimer = null;
  var INTERVAL = 1800;

  // ── Desktop: center-focused staggered ──
  var BASE_W = 337;
  var BASE_H = 452;
  var GAP = 28;
  var scales = [1, 0.78, 0.6, 0.45];

  function applyDesktopBase() {
    carousel.style.cssText = '';
    cards.forEach(function (card) {
      card.style.cssText = '';
      card.style.width = BASE_W + 'px';
      card.style.height = BASE_H + 'px';
      card.style.position = 'absolute';
      card.style.bottom = '0';
      card.style.left = '50%';
      card.style.transformOrigin = 'bottom center';
      card.style.borderRadius = '16px';
      card.style.overflow = 'hidden';
    });
  }

  function layout(animate) {
    cards.forEach(function (card, i) {
      var diff = i - activeIndex;
      var absDiff = Math.abs(diff);

      if (absDiff > 2) {
        // Position hidden cards off-screen on their correct side
        // so they enter from the edge, not the center
        var hideOffset = (BASE_W * 1) / 2 + GAP + (BASE_W * 0.78) / 2 + GAP + (BASE_W * 0.6) / 2 + GAP + BASE_W;
        if (diff < 0) hideOffset = -hideOffset;
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.transform = 'translateX(calc(-50% + ' + hideOffset + 'px)) scale(0.45)';
        card.style.zIndex = '0';
        return;
      }

      var s = scales[Math.min(absDiff, scales.length - 1)];
      var offsetX = 0;
      for (var j = 0; j < absDiff; j++) {
        var sj = scales[Math.min(j, scales.length - 1)];
        var sjNext = scales[Math.min(j + 1, scales.length - 1)];
        offsetX += (BASE_W * sj) / 2 + GAP + (BASE_W * sjNext) / 2;
      }
      if (diff < 0) offsetX = -offsetX;

      if (animate === false) {
        card.style.transition = 'none';
      } else {
        card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s cubic-bezier(0.4,0,0.2,1)';
      }

      card.style.transform = 'translateX(calc(-50% + ' + offsetX + 'px)) scale(' + s + ')';
      card.style.opacity = absDiff <= 2 ? '1' : '0';
      card.style.pointerEvents = 'auto';
      card.style.zIndex = String(10 - absDiff);
    });
  }

  function normalizeIndex() {
    // Reset when we drift too far — happens invisibly since
    // cloned cards at the reset position look identical
    if (activeIndex >= originalCount * 3) {
      activeIndex -= originalCount;
      layout(false);
      void carousel.offsetHeight;
    } else if (activeIndex < originalCount) {
      activeIndex += originalCount;
      layout(false);
      void carousel.offsetHeight;
    }
  }

  function next() {
    activeIndex++;
    layout(true);
    setTimeout(normalizeIndex, 550);
  }

  function startDesktopAuto() {
    stopAll();
    autoTimer = setInterval(next, INTERVAL);
  }

  // ── Mobile: simple horizontal scroll ──
  var SPEED = 0.8;

  function applyMobileBase() {
    carousel.style.cssText = '';
    cards.forEach(function (card) {
      card.style.cssText = '';
      card.style.flexShrink = '0';
      card.style.position = 'relative';
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.style.width = '240px';
      card.style.height = '320px';
    });
    // Ensure scroll starts at beginning
    carousel.scrollLeft = 0;
  }

  function startMobileScroll() {
    stopAll();
    mobileTimer = setInterval(function () {
      carousel.scrollLeft += SPEED;
      var halfScroll = carousel.scrollWidth / 2;
      if (carousel.scrollLeft >= halfScroll) {
        carousel.scrollLeft -= halfScroll;
      }
    }, 16);
  }

  // ── Shared ──
  function stopAll() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    if (mobileTimer) { clearInterval(mobileTimer); mobileTimer = null; }
  }

  function isMobile() {
    return window.innerWidth <= MOBILE_BP;
  }

  function init() {
    stopAll();

    // Respect prefers-reduced-motion — show static layout, no auto-scroll
    if (prefersReducedMotion) {
      if (isMobile()) {
        applyMobileBase();
      } else {
        applyDesktopBase();
        activeIndex = originalCount * 2;
        layout(false);
      }
      return;
    }

    if (isMobile()) {
      applyMobileBase();
      startMobileScroll();
    } else {
      applyDesktopBase();
      activeIndex = originalCount * 2;
      layout(false);
      startDesktopAuto();
    }
  }

  // Pause/resume
  carousel.addEventListener('mouseenter', stopAll);
  carousel.addEventListener('mouseleave', function () {
    if (isMobile()) startMobileScroll();
    else startDesktopAuto();
  });
  carousel.addEventListener('touchstart', stopAll);
  carousel.addEventListener('touchend', function () {
    setTimeout(function () {
      if (isMobile()) startMobileScroll();
    }, 2000);
  });

  // Off-screen pause
  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (isMobile()) startMobileScroll();
      else startDesktopAuto();
    } else {
      stopAll();
    }
  }, { threshold: 0.1 });
  observer.observe(carousel);

  // Init + resize
  init();
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(init, 200);
  });
})();


// ── Polaroid Stack — Scroll-locked stacking (mobile/tablet) ──
(function () {
  'use strict';

  var stack = document.getElementById('polaroidStack');
  if (!stack) return;

  var cards = Array.from(stack.querySelectorAll('.polaroid-stack__card'));
  if (!cards.length) return;

  function onScroll() {
    if (window.innerWidth > 768) return;

    var rect = stack.getBoundingClientRect();
    // How far we've scrolled into the tall container
    // rect.top starts positive, goes negative as we scroll
    var scrollableHeight = stack.offsetHeight - window.innerHeight;
    var progress = -rect.top / scrollableHeight;
    progress = Math.max(0, Math.min(1, progress));

    // Each card needs ~25% of scroll to trigger
    // Card 1: 0.15, Card 2: 0.40, Card 3: 0.65, Card 4: 0.90
    cards.forEach(function (card, i) {
      var threshold = 0.15 + (i * 0.25);
      if (progress >= threshold) {
        card.classList.add('is-stacked');
      } else {
        card.classList.remove('is-stacked');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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
