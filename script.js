/* ============================================
   AFNAN TK — PORTFOLIO SCRIPT
============================================ */

// ── Scroll progress ──────────────────────────
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
}

// ── Navbar scroll state ───────────────────────
const nav = document.getElementById('nav');
function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}

// ── Mobile menu ───────────────────────────────
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('navMobile');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── IntersectionObserver — reveal on scroll ───
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Hero fade-in elements ─────────────────────
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

// Hero section fires immediately on load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    fadeEls.forEach(el => {
      if (isInViewport(el)) {
        el.classList.add('visible');
      } else {
        fadeObserver.observe(el);
      }
    });
  }, 100);
});

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// ── Skill bar animations ──────────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const targetWidth = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = targetWidth + '%';
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ── Ripple effect on buttons ──────────────────
document.querySelectorAll('.btn, .project-btn.primary').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// ── Contact form ──────────────────────────────
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    shakeForm();
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Sending…';

  // Simulate send
  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Send Message';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

function shakeForm() {
  const wrap = document.querySelector('.contact-form-wrap');
  wrap.style.animation = 'shake .4s ease';
  setTimeout(() => wrap.style.animation = '', 400);
}

// Inject shake keyframe
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);

// ── Smooth scroll for nav links ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Unified scroll handler ────────────────────
window.addEventListener('scroll', () => {
  updateProgress();
  updateNav();
}, { passive: true });

// Initial call
updateNav();
updateProgress();
