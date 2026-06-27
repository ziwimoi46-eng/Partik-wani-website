/* ================================================
   PRATIK WANI ARCHITECTS — GALLERY JS
   Gallery filtering, featured cycling, lightbox
   ================================================ */

const GALLERY_DATA = [
  { src: 'assets/images/project-courtyard-exterior.jpg',  title: 'Courtyard Exterior',      cats: ['Residential', 'Commercial'] },
  { src: 'assets/images/project-memory-bedroom.jpg',      title: 'Memory Wall Bedroom',      cats: ['Bedrooms'] },
  { src: 'assets/images/project-sun-mural-living.jpg',    title: 'Sun Mural Living Area',    cats: ['Living Rooms'] },
  { src: 'assets/images/project-modern-dining.jpg',       title: 'Modern Dining Space',      cats: ['Interior Design'] },
  { src: 'assets/images/project-green-bedroom.jpg',       title: 'Green Accent Bedroom',     cats: ['Bedrooms'] },
  { src: 'assets/images/project-round-bed-suite.jpg',     title: 'Luxury Round Bed Suite',   cats: ['Bedrooms'] },
  { src: 'assets/images/project-blue-bedroom.jpg',        title: 'Blue Accent Bedroom',      cats: ['Bedrooms'] },
  { src: 'assets/images/project-golden-chandelier.jpg',   title: 'Golden Chandelier Space',  cats: ['Interior Design', 'Residential'] },
  { src: 'assets/images/project-building-exterior.jpg',   title: 'Building Exterior Night',  cats: ['Residential', 'Villas'] },
  { src: 'assets/images/project-garden-terrace.jpg',      title: 'Garden Terrace',           cats: ['Villas', 'Residential'] },
  { src: 'assets/images/project-tv-unit.jpg',             title: 'Contemporary TV Unit',     cats: ['Living Rooms', 'Office Interiors'] },
  { src: 'assets/images/project-monstera-dining.jpg',     title: 'Monstera Dining Wall',     cats: ['Interior Design'] },
  { src: 'assets/images/project-modular-kitchen.jpg',     title: 'Premium Modular Kitchen',  cats: ['Modular Kitchen'] },
];

/* ---- PANEL GALLERY (index.html) ---- */
(function initPanelGallery() {
  const featuredImg  = document.getElementById('gallery-featured-img');
  const featuredCat  = document.getElementById('gallery-featured-cat');
  const featuredTitle= document.getElementById('gallery-featured-title');
  const dotsWrap     = document.getElementById('gallery-dots');
  const thumbGrid    = document.getElementById('gallery-thumb-grid');
  const catButtons   = document.querySelectorAll('.gallery-cat-btn');
  const prevBtn      = document.getElementById('gallery-prev');
  const nextBtn      = document.getElementById('gallery-next');

  if (!featuredImg || !thumbGrid) return;

  let filtered = [...GALLERY_DATA];
  let featuredIdx = 0;
  let timer;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = filtered.map((_, i) =>
      `<div class="gallery-dot ${i === featuredIdx ? 'active' : ''}" data-idx="${i}"></div>`
    ).join('');
    dotsWrap.querySelectorAll('.gallery-dot').forEach(d => {
      d.addEventListener('click', () => { clearTimer(); setFeatured(+d.dataset.idx); });
    });
  }

  function renderThumbs() {
    thumbGrid.innerHTML = filtered.map((img, i) => `
      <div class="gallery-thumb ${i === featuredIdx ? 'active-thumb' : ''}" data-idx="${i}">
        <img src="${img.src}" alt="${img.title}" loading="lazy">
        <div class="gallery-thumb-overlay"></div>
      </div>
    `).join('');
    thumbGrid.querySelectorAll('.gallery-thumb').forEach(t => {
      t.addEventListener('mouseenter', () => setFeatured(+t.dataset.idx));
      t.addEventListener('click', () => openLightbox(+t.dataset.idx));
    });
  }

  function setFeatured(idx) {
    featuredIdx = ((idx % filtered.length) + filtered.length) % filtered.length;
    const img = filtered[featuredIdx];
    featuredImg.src = img.src;
    featuredImg.alt = img.title;
    if (featuredCat)   featuredCat.textContent  = img.cats[0];
    if (featuredTitle) featuredTitle.textContent = img.title;
    thumbGrid.querySelectorAll('.gallery-thumb').forEach((t, i) =>
      t.classList.toggle('active-thumb', i === featuredIdx)
    );
    dotsWrap && dotsWrap.querySelectorAll('.gallery-dot').forEach((d, i) =>
      d.classList.toggle('active', i === featuredIdx)
    );
  }

  function startTimer() {
    timer = setInterval(() => setFeatured(featuredIdx + 1), 3500);
  }
  function clearTimer() { clearInterval(timer); }

  if (prevBtn) prevBtn.addEventListener('click', () => { clearTimer(); setFeatured(featuredIdx - 1); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearTimer(); setFeatured(featuredIdx + 1); });

  // Touch swipe on featured
  let tx = 0;
  if (featuredImg.parentElement) {
    featuredImg.parentElement.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    featuredImg.parentElement.addEventListener('touchend', e => {
      const dx = tx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) { clearTimer(); dx > 0 ? setFeatured(featuredIdx + 1) : setFeatured(featuredIdx - 1); }
    }, { passive: true });
    featuredImg.parentElement.addEventListener('click', () => openLightbox(featuredIdx));
  }

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      filtered = cat === 'All' ? [...GALLERY_DATA] : GALLERY_DATA.filter(img => img.cats.includes(cat));
      featuredIdx = 0;
      renderThumbs();
      renderDots();
      setFeatured(0);
    });
  });

  renderThumbs();
  renderDots();
  setFeatured(0);
  startTimer();

  /* Lightbox */
  function openLightbox(idx) {
    window._galleryFiltered = filtered;
    window._galleryIdx = idx;
    openGlobalLightbox(filtered, idx);
  }
})();

/* ---- PAGE GALLERY (portfolio.html / gallery.html) ---- */
(function initPageGallery() {
  const grid = document.getElementById('page-gallery-grid');
  if (!grid) return;

  const cards = grid.querySelectorAll('.gallery-card');
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      cards.forEach(card => {
        const cats = card.dataset.cats.split(',');
        card.classList.toggle('hidden', cat !== 'All' && !cats.includes(cat));
      });
    });
  });

  // Lightbox from cards
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      const visible = [...cards].filter(c => !c.classList.contains('hidden'));
      const visIdx = visible.indexOf(card);
      const imgs = visible.map(c => ({
        src: c.querySelector('img').src,
        title: c.querySelector('h3') ? c.querySelector('h3').textContent : '',
        cats: [c.querySelector('span') ? c.querySelector('span').textContent : ''],
      }));
      openGlobalLightbox(imgs, visIdx >= 0 ? visIdx : 0);
    });
  });
})();

/* ---- GLOBAL LIGHTBOX ---- */
function openGlobalLightbox(imgs, startIdx) {
  let lb = document.getElementById('lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="lightbox-close" id="lb-close">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <button class="lightbox-prev" id="lb-prev">
        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="lightbox-next" id="lb-next">
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div class="lightbox-img-wrap">
        <img class="lightbox-img" id="lb-img" src="" alt="">
        <div class="lightbox-caption">
          <h3 id="lb-title"></h3>
          <span id="lb-cat"></span>
        </div>
        <div class="lightbox-dots" id="lb-dots"></div>
      </div>
    `;
    document.body.appendChild(lb);

    document.getElementById('lb-close').addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.getElementById('lb-prev').addEventListener('click', () => showLb(current - 1));
    document.getElementById('lb-next').addEventListener('click', () => showLb(current + 1));

    // Keyboard
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowRight') showLb(current + 1);
      if (e.key === 'ArrowLeft')  showLb(current - 1);
      if (e.key === 'Escape')     closeLb();
    });

    // Touch swipe
    let tx = 0;
    lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      const dx = tx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 50) dx > 0 ? showLb(current + 1) : showLb(current - 1);
    }, { passive: true });
  }

  let current = startIdx;
  let dataset = imgs;

  function showLb(idx) {
    current = ((idx % dataset.length) + dataset.length) % dataset.length;
    const item = dataset[current];
    document.getElementById('lb-img').src = item.src;
    document.getElementById('lb-img').alt = item.title || '';
    document.getElementById('lb-title').textContent = item.title || '';
    document.getElementById('lb-cat').textContent = (item.cats || []).join(' · ');
    const dots = document.getElementById('lb-dots');
    dots.innerHTML = dataset.map((_, i) =>
      `<div class="lb-dot ${i === current ? 'active' : ''}" data-i="${i}"></div>`
    ).join('');
    dots.querySelectorAll('.lb-dot').forEach(d => d.addEventListener('click', () => showLb(+d.dataset.i)));
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  dataset = imgs;
  showLb(startIdx);
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

window.openGlobalLightbox = openGlobalLightbox;
