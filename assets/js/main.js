/* ===========================
   SPC site - main.js
   =========================== */

// ---- Mobile menu (exposed for onclick in HTML) ----
window.toggleMobileMenu = function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('mobile-open');
};

// ---- Header background on scroll ----
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return;
  header.style.background = window.scrollY > 100
    ? 'rgba(255, 255, 255, 0.98)'
    : 'rgba(255, 255, 255, 0.95)';
});

// ---- Reveal-on-scroll (IntersectionObserver) ----
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Observe common animated elements (exists-or-not safe)
  document
    .querySelectorAll('.card, .project-card, .team-member, .stat-card, .section-title, .split-section')
    .forEach(el => revealObserver.observe(el));

  // Highlight active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === path || (path === '' && href.endsWith('index.html')))) {
      a.classList.add('active');
    }
  });

  // Contact form handler (optional)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      const email = data.get('email');
      const affiliation = data.get('affiliation');
      const inquiry = data.get('inquiry-type');
      const message = data.get('message');

      if (!name || !email || !affiliation || !inquiry || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email}.`);
      form.reset();
    });
  }
});

// ---- Hero image: light preloader (optional) ----
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const bg = getComputedStyle(hero).backgroundImage;
    const match = bg && bg.match(/url\(["']?(.*?)["']?\)/i);
    if (match && match[1]) {
      const img = new Image();
      img.src = match[1];
      // no-op onload; browser will cache it and reduce flash
    }
  }
});

// ---- Carousel helper (preload + cross-fade, flicker-free) ----
function setupCarousel(idPrefix, images, intervalMs = 3000) {
  const imgA = document.getElementById(idPrefix + 'A');
  const imgB = document.getElementById(idPrefix + 'B');
  if (!imgA || !imgB || !Array.isArray(images) || images.length === 0) return;

  // Preload all images
  images.forEach(src => { const i = new Image(); i.src = src; });

  let showing = imgA, hidden = imgB, idx = 0;
  showing.src = images[0];
  showing.classList.add('is-active');
  hidden.classList.remove('is-active');

  function tick() {
    idx = (idx + 1) % images.length;
    const nextSrc = images[idx];

    const tmp = new Image();
    tmp.onload = () => {
      hidden.src = nextSrc;
      hidden.classList.add('is-active');
      showing.classList.remove('is-active');
      [showing, hidden] = [hidden, showing];
    };
    tmp.src = nextSrc;
  }

  return setInterval(tick, intervalMs);
}

// ---- Page-specific initializers (only run where elements exist) ----
window.addEventListener('load', () => {
  // INDEX page carousels
  setupCarousel('studentsImg', [
    'assets/img/about/confetti.jpg',
    'assets/img/about/spc-exec.jpg',
    'assets/img/about/spc-group.jpg',
    'assets/img/about/newbie.jpg'
  ], 3000);

  setupCarousel('companiesImg', [
    'assets/img/about/ibm.jpg',
    'assets/img/about/microsoft.jpg',
    'assets/img/about/netflix.jpg',
    'assets/img/about/nvidia.jpg'
  ], 3000);

  // ABOUT page carousels
  setupCarousel('missionImg', [
    'assets/img/about/BLC_Leadership_7.jpg',
    'assets/img/about/indiasummit.jpg',
    'assets/img/about/india2024.jpg',
    'assets/img/about/summit2024.jpg',
    'assets/img/about/banquet.jpg',
    'assets/img/about/banquet2.jpg'
  ], 3000);

  setupCarousel('benefitsImg', [
    'assets/img/about/retreat_fa24.jpg',
    'assets/img/about/sixflags.jpg',
    'assets/img/about/sixflags2.jpg',
    'assets/img/about/hiking.jpg'
  ], 3000);
});
