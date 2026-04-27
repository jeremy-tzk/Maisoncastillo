// Theme toggle
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', mode);
  function setIcon() {
    if (!toggle) return;
    toggle.innerHTML = mode === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  setIcon();
  toggle && toggle.addEventListener('click', () => {
    mode = mode === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', mode);
    setIcon();
  });
})();

// Burger menu
(function () {
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');
  if (!burger || !links) return;
  burger.addEventListener('click', () => {
    const isOpen = links.style.display === 'flex';
    links.style.display = isOpen ? 'none' : 'flex';
  });
})();

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Animated counters
(function () {
  const strip = document.querySelector('.hero__stat-strip');
  if (!strip) return;
  function animateCounter(el, target, suffix) {
    suffix = suffix || '';
    var startTime = null;
    var duration = 1800;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var statsObserver = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var nums = e.target.querySelectorAll('.hero__stat-number');
          nums[0] && animateCounter(nums[0], 500, '+');
          nums[1] && animateCounter(nums[1], 98, '%');
          nums[2] && (nums[2].textContent = '7j/7');
          statsObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statsObserver.observe(strip);
})();

// Contact form — envoi via PHP send_mail.php
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  var content = document.getElementById('formContent');
  var success = document.getElementById('formSuccess');
  var btn = form.querySelector('.form-submit');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!btn || !content || !success) return;

    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    var data = new FormData(form);

    fetch('send_mail.php', {
      method: 'POST',
      body: data
    })
    .then(function(resp) { return resp.json(); })
    .then(function(json) {
      if (json.success) {
        content.style.display = 'none';
        success.classList.add('visible');
      } else {
        alert('Erreur : ' + (json.error || 'Un problème est survenu.'));
        btn.disabled = false;
        btn.textContent = 'Envoyer ma demande de devis';
      }
    })
    .catch(function() {
      alert('Erreur réseau. Merci de réessayer.');
      btn.disabled = false;
      btn.textContent = 'Envoyer ma demande de devis';
    });
  });
})();
