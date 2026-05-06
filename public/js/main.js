// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Reveal on scroll ──
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
}

// ── FAQ accordion ──
function toggleFaq(index) {
  const item = document.getElementById(`faq-${index}`);
  if (!item) return;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Smooth CTA phone click tracking ──
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'phone_call', { event_category: 'CTA', event_label: link.href });
    }
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Contact');
    }
  });
});
