// ============================================
// ISYSTEM S.A.S - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- PARTICLES ----
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        animation-duration: ${Math.random() * 20 + 15}s;
        animation-delay: ${Math.random() * 15}s;
        opacity: ${Math.random() * 0.5 + 0.2};
      `;
      particlesContainer.appendChild(p);
    }
  }

  // ---- AOS (Animate on Scroll) ----
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  aosElements.forEach(el => aosObserver.observe(el));

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  // ---- PROGRESS BARS ANIMATION ----
  const progressBars = document.querySelectorAll('.pi-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.width;
      }
    });
  }, { threshold: 0.3 });

  progressBars.forEach(bar => barObserver.observe(bar));

  // ---- CONTACT FORM ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submitBtn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      const successMsg = document.getElementById('formSuccess');
      const errorMsg = document.getElementById('formError');

      // Show loading
      btnText.style.display = 'none';
      btnLoading.style.display = 'flex';
      submitBtn.disabled = true;
      successMsg.style.display = 'none';
      errorMsg.style.display = 'none';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          successMsg.style.display = 'flex';
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        // Fallback: open WhatsApp with form data
        const msg = `Hola, soy ${data.nombre} de ${data.empresa || 'mi empresa'}. Me interesa: ${data.servicio || 'sus servicios'}. ${data.mensaje || ''}`;
        window.open(`https://wa.me/573127362196?text=${encodeURIComponent(msg)}`, '_blank');
        successMsg.style.display = 'flex';
        successMsg.querySelector('p').textContent = '¡Te redirigimos a WhatsApp para continuar!';
      } finally {
        btnText.style.display = 'flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
      }
    });
  }

  // ---- NAVBAR ACTIVE LINK ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}`
        ? 'white'
        : '';
    });
  });

  // ---- Initial AOS for visible elements ----
  setTimeout(() => {
    aosElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('aos-animate');
      }
    });
  }, 100);

});
