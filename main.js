/* ================================================
   LOVING HOMES - Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Active nav link ──────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Hamburger menu ───────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    // Close menu when any nav link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── FAQ Accordion ────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Contact Form Validation ──────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.error-msg').forEach(el => { el.style.display = 'none'; });
      contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

      // Validate required fields
      const requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('error');
          const msg = field.parentElement.querySelector('.error-msg');
          if (msg) msg.style.display = 'block';
          valid = false;
        }
      });

      // Email format
      const emailField = contactForm.querySelector('[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          emailField.classList.add('error');
          const msg = emailField.parentElement.querySelector('.error-msg');
          if (msg) { msg.textContent = 'Please enter a valid email address.'; msg.style.display = 'block'; }
          valid = false;
        }
      }

      if (valid) {
        // Show confirmation
        contactForm.style.display = 'none';
        const confirmation = document.getElementById('form-confirmation');
        if (confirmation) { confirmation.style.display = 'block'; }
      }
    });

    // Remove error state on input
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', function () {
        this.classList.remove('error');
        const msg = this.parentElement.querySelector('.error-msg');
        if (msg) msg.style.display = 'none';
      });
    });
  }

  /* ── Smooth scroll for anchor links ──────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
