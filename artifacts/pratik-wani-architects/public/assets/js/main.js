/* ================================================
   PRATIK WANI ARCHITECTS — MAIN JS
   Vertical Scroll Edition
   Three.js Hero, Navbar, Testimonials, FAQ,
   Floating Buttons, Scroll-activated animations
   ================================================ */

/* ---- NAVBAR ---- */
(function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose= document.getElementById('mobile-close');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
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
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger && hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* ---- FLOATING BUTTONS ---- */
(function initFloatingBtns() {
  const toTop = document.querySelector('.float-btn.totop');
  if (!toTop) return;
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ---- SCROLL-ACTIVATED ANIMATIONS ---- */
(function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up, .fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.10 });
  els.forEach(el => obs.observe(el));
})();

/* ---- THREE.JS HERO BACKGROUND ---- */
(function initThreeHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const count = 1800;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 14;
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0xc8a96e, size: 0.025, transparent: true, opacity: 0.55, sizeAttenuation: true });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    const glowGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xc8a96e, transparent: true, opacity: 0.04 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    let t = 0;
    (function animate() {
      requestAnimationFrame(animate);
      t += 0.004;
      particles.rotation.y = t * 0.1;
      particles.rotation.x = t * 0.04;
      glow.rotation.y = -t * 0.05;
      renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    const fallback = document.querySelector('.hero-orb-fallback');
    if (fallback) fallback.style.display = 'none';
  } catch (e) {
    console.warn('Three.js unavailable, using CSS fallback.');
  }
})();

/* ---- VERTICAL SCROLL — progress bar + active nav + smooth nav clicks ---- */
(function initVerticalScroll() {
  const panels      = Array.from(document.querySelectorAll('.panel'));
  const progressBar = document.getElementById('progress-bar');
  const navLinks    = Array.from(document.querySelectorAll('.nav-links a[data-panel]'));

  if (!panels.length) return;

  /* Scroll progress bar */
  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.body.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight * 100) : 0) + '%';
  }, { passive: true });

  /* Active nav via IntersectionObserver */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = panels.indexOf(entry.target);
      if (idx === -1) return;
      navLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
    });
  }, { threshold: 0.35 });

  panels.forEach(p => observer.observe(p));

  /* Nav link clicks → smooth scroll to panel */
  function scrollToPanel(idx) {
    if (panels[idx]) {
      panels[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  document.querySelectorAll('.nav-links a[data-panel], .nav-mobile a[data-panel]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const idx = parseInt(a.getAttribute('data-panel'), 10);
      scrollToPanel(idx);
    });
  });
})();

/* ---- TESTIMONIALS CAROUSEL ---- */
(function initTestimonials() {
  const container = document.getElementById('testimonials-carousel');
  if (!container) return;

  const slides  = container.querySelectorAll('.t-slide');
  const dots    = container.querySelectorAll('.t-dot');
  const prevBtn = container.parentElement.querySelector('.t-prev');
  const nextBtn = container.parentElement.querySelector('.t-next');
  let current = 0, timer;

  slides.forEach(s => {
    Object.assign(s.style, {
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      position: 'absolute', inset: '0',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    });
  });
  container.style.position = 'relative';

  function showSlide(idx) {
    slides.forEach((s, i) => {
      s.style.opacity   = i === idx ? '1' : '0';
      s.style.transform = i === idx ? 'translateY(0)' : 'translateY(16px)';
      s.style.pointerEvents = i === idx ? 'auto' : 'none';
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    current = idx;
  }

  const next = () => showSlide((current + 1) % slides.length);
  const prev = () => showSlide((current - 1 + slides.length) % slides.length);

  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(timer); prev(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(timer); next(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(timer); showSlide(i); }));

  let tx = 0;
  container.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  container.addEventListener('touchend', e => {
    const dx = tx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) { clearInterval(timer); dx > 0 ? next() : prev(); }
  }, { passive: true });

  showSlide(0);
  timer = setInterval(next, 5000);
})();

/* ---- FAQ ACCORDION ---- */
(function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-question.open').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling && b.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) { btn.classList.add('open'); ans.classList.add('open'); }
    });
  });
})();

/* ---- DATE INPUT COLOR SCHEME ---- */
document.querySelectorAll('input[type="date"]').forEach(el => { el.style.colorScheme = 'dark'; });
