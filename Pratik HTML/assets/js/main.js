/* ================================================
   PRATIK WANI ARCHITECTS — MAIN JS
   Horizontal GSAP ScrollTrigger, Three.js Hero,
   Navbar, Testimonials, FAQ, Floating Buttons
   ================================================ */

/* ---- NAVBAR ---- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }
  if (mobileClose) {
    mobileClose.addEventListener('click', () => {
      hamburger && hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  // Close mobile menu on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger && hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlight
  const links = navbar.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.getAttribute('href') === window.location.pathname.split('/').pop() ||
        (window.location.pathname.endsWith('/') && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ---- FLOATING BUTTONS ---- */
(function initFloatingBtns() {
  const toTop = document.querySelector('.float-btn.totop');
  if (!toTop) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) toTop.classList.add('show');
    else toTop.classList.remove('show');
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ---- SCROLL-ACTIVATED ANIMATIONS ---- */
(function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up, .fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

/* ---- THREE.JS HERO BACKGROUND ---- */
(function initThreeHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  let renderer, scene, camera, particles, animId;

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Particle geometry
    const count = 1800;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 14;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xc8a96e,
      size: 0.025,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Ambient glow sphere
    const glowGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xc8a96e, transparent: true, opacity: 0.04, wireframe: false,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    let t = 0;
    function animate() {
      animId = requestAnimationFrame(animate);
      t += 0.004;
      particles.rotation.y = t * 0.1;
      particles.rotation.x = t * 0.04;
      glow.rotation.y = -t * 0.05;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // Hide CSS fallback
    const fallback = document.querySelector('.hero-orb-fallback');
    if (fallback) fallback.style.display = 'none';

  } catch (e) {
    console.warn('Three.js unavailable, using CSS fallback.');
  }
})();

/* ---- VERTICAL SCROLL: PROGRESS BAR + ACTIVE NAV + NAV CLICKS ---- */
(function initVerticalScroll() {
  const panels      = Array.from(document.querySelectorAll('.panel'));
  const navLinks    = Array.from(document.querySelectorAll('.nav-links a[data-panel], .nav-mobile a[data-panel]'));
  const progressBar = document.getElementById('progress-bar');

  /* --- scroll progress bar --- */
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* --- active nav via IntersectionObserver --- */
  if (panels.length && navLinks.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = panels.indexOf(entry.target);
          navLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
        }
      });
    }, { threshold: 0.45, rootMargin: '0px 0px -10% 0px' });

    panels.forEach(p => obs.observe(p));
  }

  /* --- nav clicks → smooth scroll --- */
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const idx    = parseInt(a.getAttribute('data-panel'), 10);
      const target = panels[idx];
      if (target) target.scrollIntoView({ behavior: 'smooth' });

      /* close mobile menu if open */
      const hamburger  = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobile-menu');
      if (hamburger)  hamburger.classList.remove('open');
      if (mobileMenu) { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }
    });
  });

  /* --- scroll-hint click: go to next panel --- */
  const hint = document.querySelector('.scroll-hint');
  if (hint) {
    hint.style.cursor = 'pointer';
    hint.addEventListener('click', () => panels[1]?.scrollIntoView({ behavior: 'smooth' }));
  }
})();

/* ---- TESTIMONIALS CAROUSEL ---- */
(function initTestimonials() {
  const container = document.getElementById('testimonials-carousel');
  if (!container) return;

  const slides = container.querySelectorAll('.t-slide');
  const dots = container.querySelectorAll('.t-dot');
  const prevBtn = container.parentElement.querySelector('.t-prev');
  const nextBtn = container.parentElement.querySelector('.t-next');
  let current = 0;
  let timer;

  function showSlide(idx) {
    slides.forEach((s, i) => {
      s.style.opacity = i === idx ? '1' : '0';
      s.style.transform = i === idx ? 'translateY(0)' : 'translateY(16px)';
      s.style.position = i === idx ? 'relative' : 'absolute';
      s.style.pointerEvents = i === idx ? 'auto' : 'none';
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    current = idx;
  }

  function next() { showSlide((current + 1) % slides.length); }
  function prev() { showSlide((current - 1 + slides.length) % slides.length); }

  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(timer); prev(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(timer); next(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(timer); showSlide(i); }));

  // Touch swipe
  let tx = 0;
  container.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  container.addEventListener('touchend', e => {
    const dx = tx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) { clearInterval(timer); dx > 0 ? next() : prev(); }
  }, { passive: true });

  slides.forEach(s => {
    s.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    s.style.position = 'absolute'; s.style.inset = '0';
    s.style.display = 'flex'; s.style.flexDirection = 'column';
    s.style.alignItems = 'center'; s.style.justifyContent = 'center';
  });
  container.style.position = 'relative';

  showSlide(0);
  timer = setInterval(next, 5000);
})();

/* ---- FAQ ACCORDION ---- */
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-question.open').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) { btn.classList.add('open'); ans.classList.add('open'); }
    });
  });
})();

/* ---- INPUT DATE COLOR SCHEME ---- */
document.querySelectorAll('input[type="date"]').forEach(el => {
  el.style.colorScheme = 'dark';
});
