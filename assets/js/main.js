// Mobile menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('mobile-open');
  }
  
  // Header opacity on scroll
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    header.style.background = window.scrollY > 100
      ? 'rgba(255, 255, 255, 0.98)'
      : 'rgba(255, 255, 255, 0.95)';
  });
  
  // Reveal-on-scroll (adds .visible to animated elements)
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);
  
  document.addEventListener('DOMContentLoaded', () => {
    // Observe animatable elements
    document.querySelectorAll('.card, .project-card, .team-member, .stat-card, .section-title')
      .forEach(el => observer.observe(el));
  
    // Highlight active nav link based on current file
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(a => {
      const href = a.getAttribute('href');
      if (href && (href === path || (path === '' && href.endsWith('index.html')))) {
        a.classList.add('active');
      }
    });
  
    // Contact form handling (on contact page)
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
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you within 24-48 hours at ${email}.`);
        form.reset();
      });
    }
  });
  