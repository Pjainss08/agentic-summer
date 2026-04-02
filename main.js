// ═══════════════════════════════════════════
// Agentic Summer — Inner Circle
// ═══════════════════════════════════════════

// ── Cities Tabs — Filter by category ──
document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.cities__tab');
  var grid = document.getElementById('citiesGrid');
  if (!tabs.length || !grid) return;

  var cards = grid.querySelectorAll('.city-card');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      tabs.forEach(function (t) { t.classList.remove('cities__tab--active'); });
      tab.classList.add('cities__tab--active');

      var filter = tab.getAttribute('data-tab');
      cards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});


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
