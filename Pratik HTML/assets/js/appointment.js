/* ================================================
   PRATIK WANI ARCHITECTS — APPOINTMENT FORM JS
   Multi-step wizard with WhatsApp submission
   ================================================ */

(function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  let step = 1;
  const TOTAL = 4;

  const formData = {
    service: '', projectType: '', budget: '',
    date: '', time: '',
    name: '', phone: '', email: '', location: '', notes: ''
  };

  // DOM refs
  const steps   = form.querySelectorAll('.form-step');
  const circles = form.querySelectorAll('.step-circle');
  const labels  = form.querySelectorAll('.step-label');
  const fill    = form.querySelector('.appt-progress-fill');
  const btnBack = form.querySelector('.btn-back');
  const btnNext = form.querySelector('.btn-next');
  const btnSubmit = form.querySelector('.btn-submit');
  const successBox = form.querySelector('.success-box');
  const formBox    = form.querySelector('.appointment-form-box');

  /* Project type buttons */
  form.querySelectorAll('.project-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      form.querySelectorAll('.project-type-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      formData.projectType = btn.dataset.val;
    });
  });

  /* Time buttons */
  form.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      form.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      formData.time = btn.dataset.val;
    });
  });

  /* Form inputs auto-sync */
  form.querySelectorAll('[data-field]').forEach(el => {
    el.addEventListener('input', () => { formData[el.dataset.field] = el.value; });
    el.addEventListener('change', () => { formData[el.dataset.field] = el.value; });
  });

  function updateUI() {
    steps.forEach((s, i) => s.classList.toggle('active', i + 1 === step));
    circles.forEach((c, i) => {
      c.classList.toggle('done',   i + 1 < step);
      c.classList.toggle('active', i + 1 === step);
      c.innerHTML = i + 1 < step
        ? '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round"><polyline points="20 6 9 17 4 12"/></svg>'
        : (i + 1);
    });
    if (fill) fill.style.width = ((step - 1) / (TOTAL - 1) * 100) + '%';
    if (btnBack)   btnBack.style.visibility   = step > 1 ? 'visible' : 'hidden';
    if (btnNext)   btnNext.style.display      = step < TOTAL ? 'inline-block' : 'none';
    if (btnSubmit) btnSubmit.style.display    = step === TOTAL ? 'inline-block' : 'none';

    // Fill review panel
    if (step === 4) renderReview();
  }

  function renderReview() {
    const rv = form.querySelector('#review-data');
    if (!rv) return;
    rv.innerHTML = `
      <div class="review-item"><div class="review-key">Service</div><div class="review-val">${formData.service || '—'}</div></div>
      <div class="review-item"><div class="review-key">Project Type</div><div class="review-val">${formData.projectType || '—'}</div></div>
      <div class="review-item"><div class="review-key">Budget</div><div class="review-val">${formData.budget || '—'}</div></div>
      <div class="review-item"><div class="review-key">Date & Time</div><div class="review-val">${formData.date || '—'} ${formData.time ? 'at ' + formData.time : ''}</div></div>
      <div class="review-item"><div class="review-key">Name</div><div class="review-val">${formData.name || '—'}</div></div>
      <div class="review-item"><div class="review-key">Phone</div><div class="review-val">${formData.phone || '—'}</div></div>
    `;
  }

  function validate() {
    if (step === 1 && (!formData.service || !formData.projectType || !formData.budget)) {
      alert('Please fill in all fields: Service, Project Type, and Budget.'); return false;
    }
    if (step === 2 && (!formData.date || !formData.time)) {
      alert('Please select a date and time slot.'); return false;
    }
    if (step === 3 && (!formData.name || !formData.phone)) {
      alert('Please enter your name and phone number.'); return false;
    }
    return true;
  }

  if (btnNext) btnNext.addEventListener('click', () => { if (!validate()) return; step++; updateUI(); });
  if (btnBack) btnBack.addEventListener('click', () => { step = Math.max(1, step - 1); updateUI(); });

  if (btnSubmit) btnSubmit.addEventListener('click', () => {
    // Build WhatsApp message
    const msg = `*New Appointment Request – Pratik Wani Architects*

*Service:* ${formData.service}
*Project Type:* ${formData.projectType}
*Budget:* ${formData.budget}
*Date:* ${formData.date}
*Time:* ${formData.time}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}
*Location:* ${formData.location || 'N/A'}
*Notes:* ${formData.notes || 'None'}`;

    const waURL = `https://wa.me/918668805662?text=${encodeURIComponent(msg)}`;

    // Show success
    if (formBox) formBox.style.display = 'none';
    if (successBox) {
      successBox.classList.add('show');
      successBox.querySelector('.success-name').textContent = formData.name || 'there';
    }

    // Open WhatsApp
    setTimeout(() => window.open(waURL, '_blank'), 600);
  });

  // Reset
  const resetBtn = form.querySelector('.btn-book-another');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    Object.keys(formData).forEach(k => formData[k] = '');
    form.querySelectorAll('[data-field]').forEach(el => el.value = '');
    form.querySelectorAll('.selected').forEach(b => b.classList.remove('selected'));
    step = 1;
    if (formBox) formBox.style.display = '';
    if (successBox) successBox.classList.remove('show');
    updateUI();
  });

  updateUI();
})();

/* ---- CONTACT FORM ---- */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('[name="name"]').value;
    const phone   = form.querySelector('[name="phone"]').value;
    const email   = form.querySelector('[name="email"]').value;
    const service = form.querySelector('[name="service"]').value;
    const message = form.querySelector('[name="message"]').value;

    const msg = `*Contact Form – Pratik Wani Architects*

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email || 'N/A'}
*Service Interest:* ${service || 'N/A'}
*Message:* ${message}`;

    window.open(`https://wa.me/918668805662?text=${encodeURIComponent(msg)}`, '_blank');

    const success = document.getElementById('contact-success');
    if (success) success.classList.add('show');
    form.reset();
  });
})();
