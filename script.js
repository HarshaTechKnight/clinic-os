/* ============================================================
   CLINICOS — script.js
   ============================================================ */

/* ── NAV ── */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  // Active link highlight
  const sections = document.querySelectorAll('section[id], div[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
  });
}, { threshold: 0.08 });
revealEls.forEach(el => revealIO.observe(el));

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const name = contactForm.querySelector('#f-name').value.trim();
    const phone = contactForm.querySelector('#f-phone').value.trim();
    if (!name || !phone) { showFormMsg('Please fill in your name and phone number.', false); return; }
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Simulate send → open WhatsApp with pre-filled message
    const type = contactForm.querySelector('#f-type').value;
    const msg = contactForm.querySelector('#f-msg').value.trim();
    const wa = `https://wa.me/917330937354?text=${encodeURIComponent(
      `Hi, I'm interested in ClinicOS.\nName: ${name}\nPhone: ${phone}\nFacility: ${type}\n${msg ? 'Message: '+msg : ''}`
    )}`;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      showFormMsg('Redirecting to WhatsApp…', true);
      setTimeout(() => window.open(wa, '_blank'), 800);
    }, 800);
  });
}

function showFormMsg(msg, ok) {
  let el = document.getElementById('form-msg');
  if (!el) {
    el = document.createElement('p');
    el.id = 'form-msg';
    el.style.cssText = 'margin-top:12px;font-size:0.82rem;font-weight:600;text-align:center;';
    contactForm.appendChild(el);
  }
  el.textContent = msg;
  el.style.color = ok ? '#5CC98A' : '#F07B2A';
}

/* ── WHATSAPP WIDGET ── */
const WA_NUM = '917330937354';
const WA_URL = `https://wa.me/${WA_NUM}`;
let waOpen = false;

function waToggle() {
  waOpen = !waOpen;
  document.getElementById('wa-panel').classList.toggle('open', waOpen);
  document.getElementById('wa-badge').style.display = waOpen ? 'none' : 'flex';
  document.getElementById('wa-tooltip').classList.add('gone');
}

function waGetTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function waAppendMsg(html, type) {
  const chat = document.getElementById('wa-chat');
  const wrap = document.createElement('div');
  wrap.className = `wm ${type}`;
  wrap.innerHTML = `<div class="wm-bub">${html}<div class="wm-time">${waGetTime()}</div></div>`;
  chat.insertBefore(wrap, document.getElementById('wa-typing'));
  chat.scrollTop = chat.scrollHeight;
}

function waShowTyping(v) {
  document.getElementById('wa-typing').className = v ? 'wm' : 'wm h';
  document.getElementById('wa-chat').scrollTop = 99999;
}

function waAppendOpenBtn(prefill) {
  const chat = document.getElementById('wa-chat');
  const wrap = document.createElement('div');
  wrap.className = 'wm bot';
  const url = prefill ? `${WA_URL}?text=${encodeURIComponent(prefill)}` : WA_URL;
  wrap.innerHTML = `<a href="${url}" target="_blank" style="display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;font-weight:600;font-size:0.78rem;padding:9px 15px;border-radius:20px;text-decoration:none;box-shadow:0 3px 10px rgba(37,211,102,0.35);" onmouseover="this.style.opacity='.88'" onmouseout="this.style.opacity='1'"><svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Continue on WhatsApp</a>`;
  chat.insertBefore(wrap, document.getElementById('wa-typing'));
  chat.scrollTop = 99999;
}

const WA_REPLIES = {
  demo:     'Great! 📅 We\'d love to give you a live demo at your facility. Click below to connect with us on WhatsApp.',
  hospital: 'The Hospital Edition supports 100–2,000+ patients/day with unlimited OPD counters, automated Telugu SMS, Receptionist & Doctor\'s Assistant roles. Starting at ₹2,999/month.',
  clinic:   'The Clinic Edition is perfect for independent doctors! It includes queue management, EMR, prescriptions, billing, GST invoices, and document storage. Starting at ₹999/month.',
  pricing:  '💰 Clinic Edition starts at ₹999/month. Hospital Edition starts at ₹2,999/month. 🎁 First 50 Vijayawada clinics can lock in ₹999/month for life!',
  sms:      'Yes! Patients receive 3 automatic SMS messages in Telugu (and English if preferred): on joining, 2 patients before their turn, and when their turn arrives. Zero staff effort.',
  offline:  'ClinicOS works fully offline. Everything saves locally on the Android device and syncs automatically when internet is restored. No data is ever lost.',
};

function waGetReply(t) {
  t = t.toLowerCase();
  if (t.includes('demo') || t.includes('book') || t.includes('try')) return [WA_REPLIES.demo, t];
  if (t.includes('hospital') || t.includes('government') || t.includes('ghh')) return [WA_REPLIES.hospital, null];
  if (t.includes('clinic') || t.includes('doctor') || t.includes('private')) return [WA_REPLIES.clinic, null];
  if (t.includes('price') || t.includes('cost') || t.includes('₹') || t.includes('pricing')) return [WA_REPLIES.pricing, null];
  if (t.includes('sms') || t.includes('telugu') || t.includes('message')) return [WA_REPLIES.sms, null];
  if (t.includes('offline') || t.includes('internet') || t.includes('network')) return [WA_REPLIES.offline, null];
  return [null, t];
}

function waSend() {
  const input = document.getElementById('wa-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  waAppendMsg(text, 'usr');
  document.getElementById('wa-quick').style.display = 'none';
  const [reply, prefill] = waGetReply(text);
  waShowTyping(true);
  setTimeout(() => {
    waShowTyping(false);
    if (reply) {
      waAppendMsg(reply + (prefill !== null ? '<br><br>💬 <strong>Connect with us:</strong>' : ''), 'bot');
      if (prefill !== null) waAppendOpenBtn(prefill ? `I want to book a demo for ClinicOS` : null);
    } else {
      waAppendMsg('Thanks for reaching out! Let\'s continue on WhatsApp where we can respond faster. 👇', 'bot');
      waAppendOpenBtn(text);
    }
  }, 1100);
}

function waSendQuick(t) {
  document.getElementById('wa-input').value = t;
  waSend();
}

// Expose to HTML
window.waToggle = waToggle;
window.waSend = waSend;
window.waSendQuick = waSendQuick;

// Tooltip auto-hide
setTimeout(() => {
  const tt = document.getElementById('wa-tooltip');
  if (tt) tt.classList.add('gone');
}, 5500);

document.getElementById('wa-fab').addEventListener('mouseenter', () => {
  setTimeout(() => {
    const tt = document.getElementById('wa-tooltip');
    if (tt) tt.classList.add('gone');
  }, 2500);
});

// Enter key in chat input
document.getElementById('wa-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') waSend();
});

/* ── ANIMATED COUNTERS (trust strip) ── */
function animateCounter(el, end, duration) {
  const start = 0;
  const range = end - start;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + range * eased).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('[data-counter]');
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, parseInt(e.target.dataset.counter), 1600);
      counterIO.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterIO.observe(el));