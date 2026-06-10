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
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        let delay = 0;
        if (siblings) {
          const idx = Array.from(siblings).indexOf(entry.target);
          // If there are many siblings (e.g. gallery), stagger using a smaller step and modulo 
          // to avoid accumulating huge delays. Otherwise stagger by 60ms.
          const step = siblings.length > 5 ? 50 : 60;
          const group = siblings.length > 5 ? 3 : siblings.length;
          delay = (idx % group) * step;
        }
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

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
  const menuModalClose = document.getElementById('menuModalClose');
  const menuModalBackdrop = document.getElementById('menuModalBackdrop');
  const menuModalPages = document.getElementById('menuModalPages');

  // Menu Content JSON (actual menu from Gillian-Menu-MA-2.pdf and wine menu)
  const menuData = {
    'la-carte': {
      title: 'LA SKOLA',
      subtitle: "Carte d'Hiver",
      sections: [
        {
          name: 'Entrées',
          items: [
            {
              name: 'Croquettes de crevettes grises',
              description: 'De la Mer du Nord, sur un lit de salade et une mayonnaise au piment d\'Espelette.',
              price: '13,5€'
            },
            {
              name: 'Tartines rustiques',
              description: 'À la terrine de gibier de faisan. Pain noix croustillant frotté à l’ail, confit de chutney (groseilles, airelles, cassis) sur une salade.',
              price: '13,5€'
            },
            {
              name: 'Croustillant de Boudin Noir',
              description: 'Boudin noir déstructuré et enroulé dans une feuille de brick croustillante, accompagné d\'une compotée de pommes "Boskoop" au beurre et d\'une réduction de cidre belge artisanal.',
              price: '13,5€'
            }
          ]
        },
        {
          name: 'Salades',
          items: [
            {
              name: 'Salade de Chèvre Chaud',
              description: 'Mélange de mesclun frais accompagné de pommes croquantes et de noix. Le fromage de chèvre chaud apporte une touche fondante, relevée par un filet de miel et de fruits secs pour une note sucrée-salée.',
              price: '16,5€'
            },
            {
              name: 'Salade Thaï',
              description: 'De poulet ou de bœuf, composée de légumes croquants et colorés, vermicelles de riz, menthe et coriandre fraîche. Le choix entre poulet ou bœuf permet d’adapter le plat selon vos envies.',
              price: '17,5€'
            }
          ]
        },
        {
          name: 'Plats Principaux',
          items: [
            {
              name: 'Tartare de Bœuf à l\'Américaine',
              description: 'Recette revisitée. Bœuf belge haché au couteau, assaisonné minute, présenté avec des cornichons et câpres confits, un jaune d\'œuf de caille basse température, chips de pain noir et frites.',
              price: '16,5€'
            },
            {
              name: 'Carbonnade Laquée',
              description: 'Joue de bœuf belge braisée lentement à la bière brune, laquée au jus de cuisson réduit, servie avec une purée de pommes de terre Bintje à la truffe noire et petits légumes glacés.',
              price: '20,5€'
            },
            {
              name: 'Waterzooi de la Mer',
              description: 'Filet de poisson local (cabillaud, sole) et petites crevettes roses dans un bouillon crémeux de légumes (carottes, poireaux, céleri) transformé en une écume légère et parfumée.',
              price: '25,5€'
            },
            {
              name: 'Suprême de Coucou de Malines',
              description: 'Suprême de poulet de Malines cuit parfaitement, accompagné d\'un stoemp de saison de chicons caramélisés et d\'une réduction de jus de volaille au sirop de Liège (goût sucré-salé).',
              price: '21,5€'
            },
            {
              name: 'Chicons & Jambon d\'Ardenne',
              description: 'Endives braisées délicatement servies avec une chips de jambon d\'Ardenne ultra-croustillante et une sauce Mornay au fromage belge (type Chimay) revisitée, plus légère.',
              price: '19,5€'
            },
            {
              name: 'Boulettes "Façon Grand-Mère"',
              description: 'Grosses boulettes de bœuf et porc hachés, poêlées, servies avec une sauce tomate maison revisitée avec des tomates confites et basilic frais, accompagnées de pâtes fraîches "al dente".',
              price: '20,5€'
            },
            {
              name: 'Duo de Boudin Noir & Blanc',
              description: 'Tranches de boudin noir et blanc poêlées, servies avec une demi-pomme rôtie et caramélisée, accompagnées d\'une onctueuse sauce d’oignons caramélisés pour un équilibre parfait entre le sucré et le salé.',
              price: '20,5€'
            },
            {
              name: 'Spaghetti Bolognaise',
              description: 'Un grand classique de la cuisine italienne : des spaghetti al dente nappés d’une sauce riche et savoureuse à base de bœuf de bœuf mijoté, tomates, oignons et herbes aromatiques.',
              price: '13,5€'
            }
          ]
        },
        {
          name: 'Desserts',
          items: [
            {
              name: 'Trio de Crèmes Brûlées',
              description: 'Vanille, chocolat et pistache.',
              price: '8,5€'
            },
            {
              name: 'Tiramisu',
              description: 'Une version revisitée du tiramisu classique, remplaçant les boudoirs par un gâteau au chocolat sans gluten trempés dans le Cointreau et du café, avec une crème mascarpone onctueuse.',
              price: '9,5€'
            },
            {
              name: 'Profiteroles Traditionnelles',
              description: 'À la vanille Bourbon, servies avec une sauce au chocolat chaud.',
              price: '9,5€'
            },
            {
              name: 'Coup Belle-Hélène',
              description: 'Glace vanille, poires et chocolat chaud.',
              price: '9,5€'
            },
            {
              name: 'Dame Blanche',
              description: 'Glace vanille, crème fraîche et chocolat chaud.',
              price: '8,5€'
            },
            {
              name: 'Dame Noire',
              description: 'Glace chocolat, crème fraîche et chocolat chaud.',
              price: '8,5€'
            }
          ]
        },
        {
          name: 'Crêpes Maison',
          items: [
            {
              name: 'Crêpes Nature',
              description: 'Saupoudrées de sucre.',
              price: '5,5€'
            },
            {
              name: 'Crêpes du Chocolatier',
              description: 'Chocolat chaud et chantilly.',
              price: '6,5€'
            },
            {
              name: 'Crêpes du Glacier',
              description: 'Glace vanille, chocolat chaud et chantilly.',
              price: '8,5€'
            },
            {
              name: 'Crêpes Bell-Hélène',
              description: 'Poires chaudes, glace vanille, chocolat chaud et chantilly.',
              price: '9,5€'
            }
          ]
        },
        {
          name: 'Gaufres de Liège',
          items: [
            {
              name: 'Gaufre au Sucre',
              description: 'Gaufre caramélisée.',
              price: '5€'
            },
            {
              name: 'Gaufre Crème Fraîche',
              description: 'Servie chaude avec chantilly.',
              price: '5,5€'
            },
            {
              name: 'Gaufre au Chocolat',
              description: 'Crème fraîche et chocolat chaud.',
              price: '6,5€'
            },
            {
              name: 'Gaufre au Glacier',
              description: 'Glace vanille, crème fraîche et chocolat chaud.',
              price: '8,5€'
            }
          ]
        },
        {
          name: 'Glaces, Sorbets & Formules',
          items: [
            {
              name: 'Sélection de Glaces & Sorbets',
              description: 'Glace : Vanille, chocolat, moka, pistache, caramel beurre salé. Sorbet : Cassis, fraise, mangue, citron vert.',
              price: '2€ / boule'
            },
            {
              name: 'Plat du Jour (Midi)',
              description: 'Découvrez notre plat du jour, disponible du lundi au vendredi, de midi à 18h.',
              price: '13,5€'
            },
            {
              name: 'Menu Enfant',
              description: 'Au choix : Crispy Chicken & Frites, Fish & Chips ou Spaghetti Bolognaise.',
              price: '8,5€'
            },
            {
              name: 'Menu de Noël Gourmand',
              description: 'Saisonnier. Autour de la fondue suisse et de la raclette.',
              price: 'Sur Demande'
            }
          ]
        }
      ]
    },
    'vins': {
      title: 'LA SKOLA',
      subtitle: 'La Carte des Vins',
      sections: [
        {
          name: 'Rouges',
          items: [
            {
              name: 'Château Margaux 2018',
              description: 'Grand Cru Classé de Bordeaux. Robe intense, notes florales et boisées, bouche d\'une élégance rare et tanins soyeux.',
              price: '65€'
            },
            {
              name: 'Chianti Classico Riserva',
              description: 'Toscane, Italie. Vin rouge de caractère, aux arômes de petits fruits rouges mûrs, de violette et d\'épices, idéal avec des viandes.',
              price: '38€'
            },
            {
              name: 'Côtes du Rhône Villages',
              description: 'Vallée du Rhône. Structuré, rond et équilibré, révélant des arômes de fruits des bois et une subtile touche poivrée.',
              price: '28€'
            }
          ]
        },
        {
          name: 'Blancs',
          items: [
            {
              name: 'Chablis Premier Cru',
              description: 'Bourgogne. Vin blanc d\'exception, minéralité tendue, arômes d\'agrumes et de silex avec une longue finale rafraîchissante.',
              price: '42€'
            },
            {
              name: 'Sancerre Loire',
              description: 'Vallée de la Loire. Sauvignon blanc typique, arômes d\'agrumes et de fleurs blanches avec une belle vivacité fruitée.',
              price: '32€'
            },
            {
              name: 'Riesling Grand Cru',
              description: 'Alsace. Sec, racé, avec un nez expressif de citron vert et de fruits mûrs, très élégant et équilibré en bouche.',
              price: '35€'
            }
          ]
        },
        {
          name: 'Bulles',
          items: [
            {
              name: 'Champagne Brut Réserve',
              description: 'Robe dorée, nez fruité et brioché, bulles d\'une grande finesse apportant fraîcheur et délicatesse.',
              price: '55€'
            },
            {
              name: 'Prosecco di Valdobbiadene',
              description: 'Vénétie, Italie. Léger, pétillant et fruité, révélant des notes de poire et de pêche blanche, parfait pour l\'apéritif.',
              price: '28€'
            }
          ]
        }
      ]
    }
  };

  // Helper to render HTML menu structure matching premiere-page-menu.jpeg cover style
  function renderHTMLMenu(menuType) {
    const data = menuData[menuType];
    if (!data) return '';

    let sectionsHtml = '';
    data.sections.forEach(section => {
      let itemsHtml = '';
      section.items.forEach(item => {
        itemsHtml += `
          <div class="skola-menu-item">
            <div class="skola-menu-item-header">
              <span class="skola-menu-item-name">${item.name}</span>
              <span class="skola-menu-item-spacer"></span>
              <span class="skola-menu-item-price">${item.price}</span>
            </div>
            ${item.description ? `<p class="skola-menu-item-desc">${item.description}</p>` : ''}
          </div>
        `;
      });

      sectionsHtml += `
        <div class="skola-menu-section">
          <h3 class="skola-menu-section-title">${section.name}</h3>
          <div class="skola-menu-section-divider"></div>
          <div class="skola-menu-section-items">
            ${itemsHtml}
          </div>
        </div>
      `;
    });

    return `
      <div class="skola-menu-wrapper">
        <!-- Deco borders & Art-deco corners -->
        <div class="skola-menu-inner-border"></div>
        <div class="skola-menu-corner skola-menu-corner-tl"></div>
        <div class="skola-menu-corner skola-menu-corner-tr"></div>
        <div class="skola-menu-corner skola-menu-corner-bl"></div>
        <div class="skola-menu-corner skola-menu-corner-br"></div>

        <!-- Menu Header -->
        <div class="skola-menu-header">
          <h2 class="skola-menu-title">${data.title}</h2>
          <p class="skola-menu-subtitle">— ${data.subtitle.toUpperCase()} —</p>
          <div class="skola-menu-header-ornament"></div>
        </div>

        <!-- Menu Grid Layout -->
        <div class="skola-menu-grid">
          ${sectionsHtml}
        </div>
      </div>
    `;
  }

  menuCards.forEach(card => {
    card.addEventListener('click', () => {
      const menuType = card.dataset.menu;
      const menuModalContent = menuModal?.querySelector('.menu-modal-content');
      
      if (menuModalPages) {
        menuModalPages.innerHTML = '';
        
        if (menuData[menuType]) {
          // Add custom class for premium HTML layout and inject content
          menuModalContent?.classList.add('has-html-menu');
          menuModalPages.innerHTML = renderHTMLMenu(menuType);
        } else {
          // Fallback to images (if needed)
          menuModalContent?.classList.remove('has-html-menu');
          const img = document.createElement('img');
          img.src = 'img/cartes-plats.webp';
          img.alt = 'Menu La Skola';
          menuModalPages.appendChild(img);
        }
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
