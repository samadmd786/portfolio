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

/* Enhance the authored SVGs without changing their labels, geometry or edges. */
(function () {
  'use strict';
  document.querySelectorAll('#architecture .glass-panel > svg').forEach(function (svg) {
    const panel = svg.parentElement;
    panel.classList.add('diagram-viewer');
    const toolbar = document.createElement('div');
    toolbar.className = 'diagram-toolbar';
    toolbar.setAttribute('role', 'group');
    toolbar.setAttribute('aria-label', 'Architecture diagram controls');
    const caption = document.createElement('span');
    caption.className = 'diagram-caption';
    caption.textContent = 'EXPLORE THE SYSTEM';
    toolbar.append(caption);
    const stage = document.createElement('div');
    stage.className = 'diagram-stage';
    stage.tabIndex = 0;
    stage.setAttribute('role', 'region');
    stage.setAttribute('aria-label', 'Architecture canvas. Scroll to pan when zoomed.');
    panel.insertBefore(toolbar, svg);
    panel.insertBefore(stage, svg);
    stage.append(svg);
    const status = document.createElement('p');
    status.className = 'diagram-status';
    status.setAttribute('aria-live', 'polite');
    panel.append(status);
    const hint = 'Select a component to read its details. Zoom in and scroll to explore.';
    status.textContent = hint;
    const rects = Array.from(svg.querySelectorAll('rect')).filter(r => !r.closest('defs'));
    const texts = Array.from(svg.querySelectorAll('text'));
    const labels = new Map(rects.map(r => [r, []]));
    texts.forEach(function (text) {
      const x = Number(text.getAttribute('x')), y = Number(text.getAttribute('y'));
      const owners = rects.filter(function (r) {
        const box = r.getBBox();
        return x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height;
      }).sort((a,b) => a.getBBox().width*a.getBBox().height - b.getBBox().width*b.getBBox().height);
      if (owners[0]) labels.get(owners[0]).push(text.textContent.trim());
    });
    const edges = Array.from(svg.querySelectorAll('line,path,polyline')).filter(function (edge) {
      return !edge.closest('defs') && getComputedStyle(edge).markerEnd !== 'none';
    });
    edges.forEach(e => e.classList.add('diagram-edge'));
    let selected = null, zoom = 1;
    function clear() {
      selected = null;
      rects.forEach(r => {r.classList.remove('is-selected'); if (r.hasAttribute('aria-pressed')) r.setAttribute('aria-pressed', 'false');});
      edges.forEach(e => e.classList.remove('is-connected'));
      status.textContent = hint;
    }
    function select(rect) {
      if (selected === rect) { clear(); return; }
      clear(); selected = rect;
      rect.classList.add('is-selected'); rect.setAttribute('aria-pressed', 'true');
      status.textContent = labels.get(rect).join(' — ');
      const box = rect.getBBox();
      function touches(p) {
        const dx = Math.max(box.x-p.x, 0, p.x-box.x-box.width);
        const dy = Math.max(box.y-p.y, 0, p.y-box.y-box.height);
        return Math.hypot(dx,dy) <= 8;
      }
      edges.forEach(function (e) {
        const length = e.getTotalLength();
        e.classList.toggle('is-connected', touches(e.getPointAtLength(0)) || touches(e.getPointAtLength(length)));
      });
    }
    rects.forEach(function (rect) {
      if (!labels.get(rect).length) return;
      rect.classList.add('diagram-component');
      rect.setAttribute('tabindex', '0'); rect.setAttribute('role', 'button');
      rect.setAttribute('aria-label', labels.get(rect).join(' — '));
      rect.setAttribute('aria-pressed', 'false');
      rect.addEventListener('click', () => select(rect));
      rect.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {event.preventDefault(); select(rect);}
      });
    });
    function button(label, action, title) {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = label;
      b.setAttribute('aria-label', title || label); b.addEventListener('click', action); toolbar.append(b); return b;
    }
    function setZoom(value) {
      zoom = Math.max(1, Math.min(3, value)); svg.style.width = (zoom*100)+'%';
      reset.textContent = Math.round(zoom*100)+'% · Reset';
      minus.disabled = zoom <= 1; plus.disabled = zoom >= 3;
    }
    const minus = button('−', () => setZoom(zoom-.25), 'Zoom out');
    const plus = button('+', () => setZoom(zoom+.25), 'Zoom in');
    const reset = button('100% · Reset', function () {setZoom(1); clear(); stage.scrollTo(0,0);}, 'Reset zoom and selection');
    panel.addEventListener('keydown', e => {if (e.key === 'Escape') clear();});
    setZoom(1);
  });
}());
