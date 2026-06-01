/* ── GLOBAL ─────────────────────────────────────────── */
const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── MOBILE MENU ────────────────────────────────────── */
function toggleMenu(btn) {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  const spans = btn.querySelectorAll('span');
  if (menu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}

function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.remove('open');
  document.body.style.overflow = '';
  const btn = document.querySelector('.hamburger');
  if (btn) btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

/* ── EXPERIENCE ACCORDION ───────────────────────────── */
function toggleExp(row) {
  const wasOpen = row.classList.contains('open');
  document.querySelectorAll('.exp-row').forEach(r => {
    r.classList.remove('open');
    r.setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    row.classList.add('open');
    row.setAttribute('aria-expanded', 'true');
  }
}

/* ── PARTICLE CANVAS ────────────────────────────────── */
const canvas = document.getElementById('particle-canvas');
const pctx   = canvas ? canvas.getContext('2d') : null;
let particles = [];
const PARTICLE_COUNT     = 70;
const CONNECTION_DISTANCE = 150;
const mouse = { x: null, y: null };

function initParticles() {
  if (!canvas) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.5 + 0.5
    });
  }
}

window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function animateParticles() {
  if (!pctx) return;
  pctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    if (mouse.x != null) {
      const dx = mouse.x - p.x, dy = mouse.y - p.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 150) { p.x -= dx * 0.01; p.y -= dy * 0.01; }
    }

    pctx.beginPath();
    pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    pctx.fillStyle = 'rgba(99,102,241,0.2)';
    pctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const p2  = particles[j];
      const dx2 = p.x - p2.x, dy2 = p.y - p2.y;
      const d2  = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      if (d2 < CONNECTION_DISTANCE) {
        pctx.beginPath();
        pctx.strokeStyle = `rgba(99,102,241,${(1 - d2 / CONNECTION_DISTANCE) * 0.15})`;
        pctx.lineWidth = 0.5;
        pctx.moveTo(p.x, p.y);
        pctx.lineTo(p2.x, p2.y);
        pctx.stroke();
      }
    }
  });
  requestAnimationFrame(animateParticles);
}

/* ── TYPEWRITER ─────────────────────────────────────── */
const TYPING_TEXT =
  'MS Computer Science from UChicago. At Vanguard I delivered 99.999% uptime handling ' +
  '100,000+ peak hourly logons and cut security incidents by 40% across a platform serving ' +
  'millions of users. I build cloud-native infrastructure, secure IAM pipelines, and agentic ' +
  'AI tools that reach production.';

function startTypewriter() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  let i = 0;
  function type() {
    if (i < TYPING_TEXT.length) {
      el.textContent += TYPING_TEXT.charAt(i++);
      setTimeout(type, 24);
    }
  }
  setTimeout(type, 600);
}

/* ── SCROLL REVEAL ──────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal-visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal-hidden').forEach(el => revealObs.observe(el));

/* ── COUNT-UP ───────────────────────────────────────── */
function animateCount(el) {
  const target   = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1600;
  const start    = performance.now();
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = (target * ease(t)).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = target.toFixed(decimals) + suffix;
  }
  requestAnimationFrame(frame);
}

const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      REDUCE_MOTION
        ? (e.target.textContent = parseFloat(e.target.dataset.target).toFixed(parseInt(e.target.dataset.decimals || '0')) + (e.target.dataset.suffix || ''))
        : animateCount(e.target);
      countObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

if (!REDUCE_MOTION) {
  document.querySelectorAll('.count-up').forEach(c => {
    const d = parseInt(c.dataset.decimals || '0', 10);
    c.textContent = (0).toFixed(d) + (c.dataset.suffix || '');
  });
}
document.querySelectorAll('.count-up').forEach(c => countObs.observe(c));

/* ── ACTIVE NAV ON SCROLL ───────────────────────────── */
const navLinks  = document.querySelectorAll('.nav-links-desktop a');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id ? '#6366f1' : '';
      });
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));

/* ── CONTACT FORM (Web3Forms) ───────────────────────── */
const contactForm    = document.getElementById('contactForm');
const formStatus     = document.getElementById('formStatus');
const formSubmitBtn  = document.getElementById('formSubmitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const bot = contactForm.querySelector('input[name="botcheck"]');
    if (bot && bot.checked) return;

    formSubmitBtn.disabled = true;
    formStatus.className = 'form-status loading show';
    formStatus.textContent = 'Sending...';

    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(contactForm) });
      const json = await res.json();
      if (json.success) {
        formStatus.className = 'form-status success show';
        formStatus.textContent = 'Message sent! I will get back to you soon.';
        contactForm.reset();
      } else throw new Error(json.message || 'Submission failed');
    } catch {
      formStatus.className = 'form-status error show';
      formStatus.textContent = 'Something went wrong. Please email samadmd6020@gmail.com directly.';
    } finally {
      formSubmitBtn.disabled = false;
    }
  });
}

/* ── PROJECT CARD CLICK-THROUGH ─────────────────────── */
document.querySelectorAll('.proj-card[data-href]').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return; // let internal links work normally
    const a = document.createElement('a');
    a.href = card.dataset.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  });
});

/* ── INIT ───────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  const firstRow = document.querySelector('.exp-row');
  if (firstRow) firstRow.classList.add('open');
});

window.addEventListener('load', () => {
  if (!REDUCE_MOTION) {
    initParticles();
    animateParticles();
    startTypewriter();
  }
});

window.addEventListener('resize', () => {
  if (!REDUCE_MOTION) initParticles();
});
