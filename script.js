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

  // Menu Content JSON (actual menu from the new cards)
  const menuData = {
    'la-carte': {
      title: 'LA SKOLA',
      subtitle: "La Carte",
      sections: [
        {
          name: 'À se partager / Entrées',
          items: [
            {
              name: 'Duo de Croquettes aux crevettes',
              description: '2 pièces. (En version plat : 3 pièces pour 17,50€)',
              price: '13,50€'
            },
            {
              name: 'Croquettes aux fromages',
              description: '2 pièces. (En version plat : 3 pièces, salade et frites pour 16,50€)',
              price: '13,50€'
            },
            {
              name: 'Calamars frits',
              description: '4 pièces, accompagnés de sauce tartare.',
              price: '6,50€'
            },
            {
              name: 'Scampis frits',
              description: '4 pièces, accompagnés de sauce tartare.',
              price: '6,50€'
            },
            {
              name: 'Samosa aux légumes',
              description: '2 pièces, accompagnés de sauce chili douce.',
              price: '7,50€'
            },
            {
              name: 'Caviar d\'aubergine',
              description: 'Accompagné de crudités et de tranches de pain grillé.',
              price: '6,50€'
            },
            {
              name: 'Houmous maison',
              description: 'Accompagné de crudités et de tranches de pain grillé.',
              price: '6,50€'
            },
            {
              name: 'Tapenade d\'olives noires et de chèvre',
              description: 'Accompagné de crudités et de tranches de pain grillé.',
              price: '6,50€'
            },
            {
              name: 'Guacamole avocat/tomate',
              description: 'Accompagné de crudités et de tranches de pain grillé.',
              price: '6,50€'
            },
            {
              name: 'Caviar de betterave',
              description: 'Accompagné de crudités et de tranches de pain grillé.',
              price: '6,50€'
            },
            {
              name: 'Plateau de tous nos dips',
              description: 'Idéal à partager (pour 2 personnes).',
              price: '35,00€'
            }
          ]
        },
        {
          name: 'Salades',
          items: [
            {
              name: 'Salade croustillante de chèvre chaud',
              description: 'Salade mixte, tomate, pommes, raisins secs, noix croquantes et coulis de miel chaud à la fleur d\'oranger.',
              price: '16,00€'
            },
            {
              name: 'Salade de Burrata',
              description: 'Tomates, roquette, betteraves, avocat, patates douces, grenade, burrata à l\'huile de basilic parfumée.',
              price: '17,50€'
            },
            {
              name: 'Salade César au Poulet',
              description: 'Lanières de poulet, tomates, salade sucrine, œuf, anchois, sauce César, croûtons et parmesan.',
              price: '16,00€'
            },
            {
              name: 'Salade César aux Scampis',
              description: 'Salade, tomates, œuf, sauce César, anchois, croûtons et parmesan.',
              price: '16,50€'
            },
            {
              name: 'Salade Thaï au Poulet ou Bœuf',
              description: 'Salade sucrine, vermicelles de riz, menthe, coriandre, carottes, céleri, grenade, croquants.',
              price: '17,00€'
            }
          ]
        },
        {
          name: 'Pâtes',
          items: [
            {
              name: 'Pâtes fraîches à l\'encre de seiche',
              description: 'Tomates cerises, basilic, ail, huile d\'olive, vin blanc.',
              price: '13,50€'
            },
            {
              name: 'Spaghetti Burrata & Tomates',
              description: 'Burrata et crème de tomates ou au pesto et à l\'huile d\'olive au basilic, tomates cerises.',
              price: '18,50€'
            },
            {
              name: 'Pâtes aux Scampis',
              description: 'Pâtes fraîches à l\'encre de seiche. Une saveur marine avec du beurre à l\'ail, pesto et persil.',
              price: '19,50€'
            },
            {
              name: 'Pâtes au Saumon',
              description: 'Tagliatelles, sauce crémeuse, épinards, aneth, persil frais, parmesan râpé.',
              price: '20,50€'
            },
            {
              name: 'Spaghetti Bolognaise',
              description: 'Un grand classique cuisiné selon la recette traditionnelle.',
              price: '15,00€'
            }
          ]
        },
        {
          name: 'Poissons',
          items: [
            {
              name: 'Carpaccio de Saumon',
              description: 'Avocat, mangue et sauce au kiwi.',
              price: '18,50€'
            },
            {
              name: 'Filet de saumon poêlé',
              description: 'Sauce au beurre et à la ciboulette, tombés d\'épinards et pommes de terre rôties au four.',
              price: '23,50€'
            },
            {
              name: 'Encornets farcis à la Méditerranéenne',
              description: 'Calamars farcis au riz dans une délicieuse sauce tomate relevée.',
              price: '20,50€'
            }
          ]
        },
        {
          name: 'Plats',
          items: [
            {
              name: 'Tartare de Bœuf à l\'Américaine',
              description: 'Recette revisitée. Bœuf belge haché au couteau, assaisonné minute, présenté avec cornichons, câpres, œuf de caille, chips de pain noir, frites et salade.',
              price: '16,50€'
            },
            {
              name: 'Bœuf Argentin (250g)',
              description: 'Sauce poivre vert ou roquefort, servi avec salade et panier de frites.',
              price: '23,50€'
            },
            {
              name: 'Carbonnade Laquée et sa purée truffée',
              description: 'Joue de bœuf belge braisée lentement à la bière brune, servie avec une purée de pommes de terre à la truffe noire.',
              price: '20,50€'
            },
            {
              name: 'Suprême de Coucou de Malines au sirop de Liège',
              description: 'Purée de pommes de terre, chicons caramélisés et réduction de jus de volaille au sirop de Liège.',
              price: '21,50€'
            },
            {
              name: 'Boulettes "Façon Grand-Mère"',
              description: 'Servies avec pâtes fraîches ou frites, nappées de sauce tomate maison.',
              price: '19,50€'
            },
            {
              name: 'Chicons & Jambon d\'Ardenne',
              description: 'Endives braisées délicatement, sauce Mornay au fromage belge (type Chimay) revisitée, plus légère.',
              price: '18,50€'
            },
            {
              name: 'Hamburger d\'agneau',
              description: 'Fromage de chèvre, sauce tzatziki à l\'ail, tomates, salade et frites.',
              price: '22,50€'
            },
            {
              name: 'Pour les Loulous (Menu enfant)',
              description: 'Steak, boulette ou poulet | Purée ou frites | Ketchup | Compote et dessert.',
              price: '12,00€'
            }
          ]
        },
        {
          name: 'Desserts',
          items: [
            {
              name: 'Tiramisu Italien',
              description: 'Boudoirs, café, Amaretto.',
              price: '9,50€'
            },
            {
              name: 'Cheesecake au citron',
              description: 'Cream cheese Philadelphia. Un délicieux cheesecake, moelleux.',
              price: '8,00€'
            },
            {
              name: 'Moelleux au chocolat',
              description: 'Accompagné de sa boule de glace caramel beurre salé.',
              price: '9,00€'
            },
            {
              name: 'Mousse au chocolat noir',
              description: 'Servie avec crème fraîche.',
              price: '8,50€'
            },
            {
              name: 'Dame Blanche',
              description: 'Glace vanille, crème fraîche et chocolat chaud.',
              price: '8,50€'
            },
            {
              name: 'Dame Noire',
              description: 'Glace chocolat, crème fraîche et chocolat chaud.',
              price: '8,50€'
            }
          ]
        },
        {
          name: 'Crêpes & Gaufres',
          items: [
            {
              name: 'Crêpe Nature au sucre',
              description: 'Servie chaude. Uniquement entre 9h-12h et 15h-18h.',
              price: '5,50€'
            },
            {
              name: 'Crêpe au chocolat',
              description: 'Nappée de chocolat. Uniquement entre 9h-12h et 15h-18h.',
              price: '5,50€'
            },
            {
              name: 'Crêpe Mikado',
              description: 'Glace à la vanille et sauce au chocolat. Uniquement entre 9h-12h et 15h-18h.',
              price: '8,50€'
            },
            {
              name: 'Gaufre au sucre',
              description: 'Gaufre de Liège caramélisée.',
              price: '5,00€'
            },
            {
              name: 'Gaufre Crème Fraîche',
              description: 'Servie avec de la chantilly fraîche.',
              price: '5,50€'
            },
            {
              name: 'Gaufre au chocolat',
              description: 'Crème fraîche et chocolat chaud.',
              price: '6,50€'
            },
            {
              name: 'Gaufre Mikado',
              description: 'Glace à la vanille et sauce au chocolat.',
              price: '8,50€'
            },
            {
              name: 'Sélection de Glaces / Sorbets',
              description: 'Glaces : Vanille, chocolat, fraises, moka, pistache, caramel. Sorbets : Cassis, mangue, citron vert. (Boule au choix : 2,50€)',
              price: '2,50€ / boule'
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
          animateValue(priceEl, 0, 14.50, 1200);
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
