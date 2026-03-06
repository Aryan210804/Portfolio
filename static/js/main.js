/* ═══════════════════════════════════════════════════
   ARYAN KUMAR PORTFOLIO — MAIN JS
   Particles · Cursor · GSAP · Typing · Skill Bars
═══════════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════
// PAGE LOADER
// ══════════════════════════════════
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('hidden');
      // Start hero animations after loader
      initHeroAnimations();
    }
  }, 1200);
});

// ══════════════════════════════════
// CURSOR GLOW
// ══════════════════════════════════
function initCursor() {
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorDot = document.getElementById('cursor-dot');
  if (!cursorGlow || !cursorDot) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth glow follow
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // Hover effects
  const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-category-card, .contact-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
  });
}

// ══════════════════════════════════
// SCROLL PROGRESS BAR
// ══════════════════════════════════
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  }, { passive: true });
}

// ══════════════════════════════════
// NAVBAR SCROLL EFFECT
// ══════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ══════════════════════════════════
// MOBILE MENU
// ══════════════════════════════════
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  let isOpen = false;

  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    menu.classList.toggle('hidden', !isOpen);
    const lines = btn.querySelectorAll('.hamburger-line');
    if (isOpen) {
      lines[0].style.transform = 'translateY(8px) rotate(45deg)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      lines[2].style.width = '24px';
    } else {
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
      lines[2].style.width = '';
    }
  });

  // Close on nav link click
  menu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      isOpen = false;
      menu.classList.add('hidden');
      const lines = btn.querySelectorAll('.hamburger-line');
      lines.forEach(l => { l.style.transform = ''; l.style.opacity = ''; l.style.width = ''; });
    });
  });
}

// ══════════════════════════════════
// TYPING ANIMATION
// ══════════════════════════════════
function initTypingAnimation() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'intelligent AI systems',
    'full-stack web apps',
    'Python solutions',
    'ML-powered tools',
    'Android applications',
    'impactful digital experiences',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      delay = 50;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      delay = 100;
    }

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 1500);
}

// ══════════════════════════════════
// PARTICLE CANVAS
// ══════════════════════════════════
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.twinkle = Math.random() * Math.PI * 2;

      // Color: cyan, purple, white
      const colors = ['rgba(0,245,255,', 'rgba(139,92,246,', 'rgba(255,255,255,'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.twinkle += 0.02;
      this.opacity = (Math.sin(this.twinkle) * 0.25) + 0.25;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color + this.opacity + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Create particles
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.06;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = 'rgba(0,245,255,0.5)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }

      particles[i].update();
      particles[i].draw();
    }

    animFrame = requestAnimationFrame(animate);
  }

  animate();
}

// ══════════════════════════════════
// REVEAL ON SCROLL
// ══════════════════════════════════
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const parent = entry.target.parentElement;
        const siblings = [...parent.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, idx * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// ══════════════════════════════════
// SKILL BAR ANIMATIONS
// ══════════════════════════════════
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  const percents = document.querySelectorAll('.skill-percent');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target.closest('.skill-category-card');
        if (!container) return;

        container.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
          const targetWidth = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = targetWidth + '%';
          }, i * 150);
        });

        container.querySelectorAll('.skill-percent').forEach((pct, i) => {
          const targetVal = parseInt(pct.getAttribute('data-level'));
          let current = 0;
          setTimeout(() => {
            const interval = setInterval(() => {
              current += 2;
              if (current >= targetVal) {
                current = targetVal;
                clearInterval(interval);
              }
              pct.textContent = current + '%';
            }, 30);
          }, i * 150);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-category-card').forEach(card => observer.observe(card));
}

// ══════════════════════════════════
// GSAP ANIMATIONS (if available)
// ══════════════════════════════════
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero text stagger
  gsap.fromTo('.hero-badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' });
  gsap.fromTo('.hero-name', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
  gsap.fromTo('.hero-profile-card', { opacity: 0, scale: 0.9, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 1, delay: 0.8, ease: 'power3.out' });

  // Section titles — parallax
  gsap.utils.toArray('.section-orb').forEach(orb => {
    gsap.to(orb, {
      scrollTrigger: {
        trigger: orb.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
      y: -100,
      ease: 'none',
    });
  });

  // Project cards stagger on scroll
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 60, scale: 0.96 }, {
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      opacity: 1, y: 0, scale: 1,
      duration: 0.7, delay: i * 0.1, ease: 'power3.out',
    });
  });

  // Timeline items
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.fromTo(item, { opacity: 0, x: -40 }, {
      scrollTrigger: { trigger: item, start: 'top 85%', once: true },
      opacity: 1, x: 0,
      duration: 0.7, delay: i * 0.15, ease: 'power3.out',
    });
  });

  // Contact cards
  gsap.utils.toArray('.contact-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 40 }, {
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      opacity: 1, y: 0,
      duration: 0.6, delay: i * 0.15, ease: 'power3.out',
    });
  });
}

// ══════════════════════════════════
// HERO ANIMATIONS (After loader)
// ══════════════════════════════════
function initHeroAnimations() {
  // Fallback CSS-based animation if GSAP not done yet
  const heroEl = document.querySelector('#hero');
  if (heroEl) heroEl.style.opacity = '1';
}

// ══════════════════════════════════
// SMOOTH SCROLLING
// ══════════════════════════════════
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ══════════════════════════════════
// ACTIVE NAV LINK
// ══════════════════════════════════
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('text-white');
          link.classList.add('text-gray-400');
        });
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) {
          active.classList.remove('text-gray-400');
          active.classList.add('text-white');
        }
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));
}

// ══════════════════════════════════
// CARD TILT EFFECT
// ══════════════════════════════════
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card, .contact-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ══════════════════════════════════
// FLOATING GITHUB BTN VISIBILITY
// ══════════════════════════════════
function initFloatingBtn() {
  const btn = document.getElementById('floating-github');
  if (!btn) return;
  btn.style.opacity = '0';
  btn.style.transform = 'scale(0) translateY(10px)';
  btn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1) translateY(0)';
    } else {
      btn.style.opacity = '0';
      btn.style.transform = 'scale(0) translateY(10px)';
    }
  }, { passive: true });
}

// ══════════════════════════════════
// PROJECT FILTER TABS
// ══════════════════════════════════
function initProjectFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const grid = document.getElementById('projects-grid');
  if (!tabs.length || !grid) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter cards
      const cards = grid.querySelectorAll('.project-card');
      let visibleIndex = 0;

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          card.classList.remove('hidden-card');
          // Stagger the reveal
          card.style.transitionDelay = (visibleIndex * 60) + 'ms';
          card.style.opacity = '1';
          card.style.transform = '';
          visibleIndex++;
        } else {
          card.style.transitionDelay = '0ms';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.93)';
          // Delay adding hidden-card class until animation completes
          setTimeout(() => {
            if (card.getAttribute('data-category') !== filter && filter !== 'all') {
              card.classList.add('hidden-card');
            }
          }, 300);
        }
      });
    });
  });
}

// ══════════════════════════════════
// INIT ALL
// ══════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initTypingAnimation();
  initParticles();
  initScrollReveal();
  initSkillBars();
  initSmoothScroll();
  initActiveNav();
  initCardTilt();
  initFloatingBtn();

  // GSAP — runs after DOM, animations added on top
  setTimeout(initGSAP, 100);
});
