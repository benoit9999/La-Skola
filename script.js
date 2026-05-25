/* ============================================
   LA SKOLA — Premium Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. HERO LOAD ANIMATION =====
  const hero = document.querySelector('.hero');
  setTimeout(() => hero?.classList.add('loaded'), 100);

  // ===== 2. FLOATING PARTICLES =====
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = (Math.random() * 12 + 8) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.opacity = Math.random() * 0.4 + 0.1;
      particlesContainer.appendChild(particle);
    }
  }

  // ===== 3. NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const isCreations = document.querySelector('.gallery-section') !== null || window.location.pathname.includes('creations.html');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      navbar?.classList.add('scrolled');
      if (isCreations) {
        if (currentScroll > lastScroll && currentScroll > 200) {
          navbar?.classList.add('navbar-hidden');
        } else {
          navbar?.classList.remove('navbar-hidden');
        }
      }
    } else {
      navbar?.classList.remove('scrolled');
      if (isCreations) {
        navbar?.classList.remove('navbar-hidden');
      }
    }
    lastScroll = currentScroll;
  });

  // ===== 4. HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu?.classList.toggle('active');
    document.body.style.overflow = mobileMenu?.classList.contains('active') ? 'hidden' : '';
  });
  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      mobileMenu?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== 5. SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== 6. SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        let delay = 0;
        if (siblings) {
          const idx = Array.from(siblings).indexOf(entry.target);
          delay = idx * 100;
        }
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== 7. MENU CARD 3D TILT EFFECT =====
  const menuCards = document.querySelectorAll('.menu-card');
  menuCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      const inner = card.querySelector('.menu-card-inner');
      if (inner) {
        inner.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      const inner = card.querySelector('.menu-card-inner');
      if (inner) {
        inner.style.transform = '';
      }
    });
  });

  // ===== 8. MENU MODAL =====
  const menuModal = document.getElementById('menuModal');
  const menuModalImg = document.getElementById('menuModalImg');
  const menuModalClose = document.getElementById('menuModalClose');
  const menuModalBackdrop = document.getElementById('menuModalBackdrop');

  // Map card data-menu to arrays of images (multi-page)
  const menuImages = {
    'la-carte': [
      'la_skola_menu_v7.png',
      'la_skola_menu_entrees.png',
      'la_skola_menu_plats.png',
      'la_skola_menu_desserts.png'
    ],
    'vins': [
      'la_skola_menu_beige_brown.png',
      'la_skola_vins_page.png'
    ]
  };

  const menuModalPages = document.getElementById('menuModalPages');

  menuCards.forEach(card => {
    card.addEventListener('click', () => {
      const menuType = card.dataset.menu;
      const images = menuImages[menuType] || ['la_skola_menu_v7.png'];
      // Clear previous pages
      if (menuModalPages) {
        menuModalPages.innerHTML = '';
        images.forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = 'Menu La Skola';
          img.loading = 'lazy';
          menuModalPages.appendChild(img);
        });
      }
      menuModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeMenuModal() {
    menuModal?.classList.remove('active');
    document.body.style.overflow = '';
  }
  menuModalClose?.addEventListener('click', closeMenuModal);
  menuModalBackdrop?.addEventListener('click', closeMenuModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenuModal();
  });

  // ===== 9. CURSOR GLOW EFFECT =====
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // ===== 10. PARALLAX ON HERO =====
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (heroBg && window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.4;
      heroBg.style.transform = `scale(1.1) translateY(${offset}px)`;
    }
  });

  // ===== 11. LUNCH CARDS COUNTER ANIMATION =====
  const priceEl = document.querySelector('.lunchs-price');
  if (priceEl) {
    const priceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateValue(priceEl, 0, 13.50, 1200);
          priceObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    priceObserver.observe(priceEl);
  }

  function animateValue(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = start + (end - start) * eased;
      el.textContent = value.toFixed(2) + '€';
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ===== 12. IMAGE LAZY REVEAL =====
  const images = document.querySelectorAll('.about-image img, .raclette-image img, .events-image-grid img');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
        imgObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(1.1)';
    img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    imgObserver.observe(img);
  });

  // ===== 12b. TILT EFFECT ON IMAGES =====
  const tiltTargets = document.querySelectorAll('.about-image, .raclette-image, .events-image-grid .img-wrapper');
  if (window.innerWidth > 768) {
    tiltTargets.forEach(wrapper => {
      const img = wrapper.querySelector('img');
      if (!img) return;

      wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        const moveX = ((x - centerX) / centerX) * 8;
        const moveY = ((y - centerY) / centerY) * 8;

        wrapper.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        img.style.transform = `scale(1.08) translate(${moveX}px, ${moveY}px)`;
      });

      wrapper.addEventListener('mouseleave', () => {
        wrapper.style.transform = '';
        wrapper.style.transition = 'transform 0.5s ease';
        img.style.transform = '';
        img.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
          wrapper.style.transition = '';
          img.style.transition = '';
        }, 500);
      });
    });
  }

  // ===== 13. NAVBAR ACTIVE LINK HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.navbar-links a:not(.nav-cta)');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinksAll.forEach(link => {
      link.style.opacity = '0.6';
      if (link.getAttribute('href') === '#' + current) {
        link.style.opacity = '1';
      }
    });
  });

  // ===== 13b. NAVBAR THEME COLOR TRANSITIONS =====
  const themedSections = document.querySelectorAll('section[data-theme]');
  const themeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const theme = entry.target.dataset.theme;
        // Remove all theme classes
        navbar.classList.remove('theme-light', 'theme-dark', 'theme-green');
        // Add the new one
        navbar.classList.add('theme-' + theme);
      }
    });
  }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

  themedSections.forEach(section => themeObserver.observe(section));

  // ===== 14. MAGNETIC BUTTON EFFECT =====
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translateY(-2px) translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ===== 15. TEXT SPLIT ANIMATION FOR HERO TITLE =====
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    // Already animated via CSS keyframes
  }

  console.log('🎓 La Skola — Premium Demo Loaded');
});
