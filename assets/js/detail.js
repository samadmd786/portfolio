/* Shared scroll-reveal + count-up for all project detail pages */
(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── SCROLL REVEAL ──────────────────────────────── */
  if (!REDUCED) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });

    /* Section headings */
    document.querySelectorAll('section:not(#hero) .font-code.text-primary, section:not(#hero) h2')
      .forEach(function (el) { el.classList.add('sr-reveal'); obs.observe(el); });

    /* Architecture glass panel */
    document.querySelectorAll('section:not(#hero) .glass-panel:not(.step-card):not(.tech-card)')
      .forEach(function (el) { el.classList.add('sr-reveal'); obs.observe(el); });

    /* Step cards — staggered */
    document.querySelectorAll('.step-card').forEach(function (el, i) {
      el.classList.add('sr-reveal');
      el.style.setProperty('--sr-d', i * 45 + 'ms');
      obs.observe(el);
    });

    /* Tech cards — staggered */
    document.querySelectorAll('.tech-card').forEach(function (el, i) {
      el.classList.add('sr-reveal');
      el.style.setProperty('--sr-d', i * 35 + 'ms');
      obs.observe(el);
    });
  }

  /* ── COUNT-UP ───────────────────────────────────── */
  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var target = +el.dataset.count;
      var dur = 700;
      var t0 = performance.now();
      (function tick(now) {
        var p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(p * target);
        if (p < 1) requestAnimationFrame(tick);
      }(t0));
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    countObs.observe(el);
  });
}());
