(function () {
  'use strict';

  /* Header shadow on scroll */
  var header = document.querySelector('.header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 4); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Mobile menu */
  var burger = document.querySelector('.burger');
  var mMenu = document.querySelector('.mobile-menu');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    mMenu.setAttribute('aria-hidden', String(!open));
  }
  burger.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  mMenu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1100) setMenu(false); });

  /* Awards: arrow expands the strip to show all Clutch badges, click again to collapse */
  var awards = document.querySelector('.awards');
  var aNext = document.querySelector('.awards__next');
  if (awards && aNext) {
    var vp = awards.querySelector('.awards__viewport');
    var tr = awards.querySelector('.awards__track');
    aNext.addEventListener('click', function () {
      var open = !awards.classList.contains('is-open');
      awards.classList.toggle('is-open', open);
      aNext.setAttribute('aria-expanded', String(open));
      if (open) {
        var imgs = tr.querySelectorAll('img'), w = 0;
        imgs.forEach(function (im) { w += im.getBoundingClientRect().width; });
        vp.style.width = Math.ceil(w + 12 * (imgs.length - 1)) + 'px';
      } else {
        vp.style.width = '';
      }
    });
  }

  /* Services tabs — autoplay: the orange line fills the active tab, then the next service opens */
  var svc = document.querySelector('.services');
  if (svc) {
    var links = ['saas.html', 'mobile.html', 'web.html'];
    var DUR = 10000, current = 0, total = 3, timer = null;
    svc.style.setProperty('--svc-dur', DUR / 1000 + 's');
    var show = function (i) {
      current = (i + total) % total;
      svc.querySelectorAll('[data-panel]').forEach(function (el) {
        el.classList.toggle('is-active', +el.dataset.panel === current);
      });
      svc.querySelectorAll('[data-tab]').forEach(function (el) {
        var on = +el.dataset.tab === current;
        el.classList.remove('is-active');
        if (on) { void el.offsetWidth; el.classList.add('is-active'); } // restart progress animation
        el.setAttribute('aria-selected', String(on));
      });
      svc.querySelectorAll('.js-svc-link').forEach(function (a) { a.href = links[current]; });
      clearTimeout(timer);
      timer = setTimeout(function () { show(current + 1); }, DUR);
    };
    svc.addEventListener('click', function (e) {
      var t = e.target.closest('[data-tab]');
      var d = e.target.closest('[data-dir]');
      if (t) show(+t.dataset.tab);
      if (d) show(current + +d.dataset.dir);
    });
    show(0);
  }

  /* Generic accordions */
  document.querySelectorAll('.js-accordion').forEach(function (acc) {
    acc.addEventListener('click', function (e) {
      var head = e.target.closest('.acc-row__head, .faq__q');
      if (!head) return;
      var item = head.parentElement;
      var open = !item.classList.contains('is-open');
      acc.querySelectorAll(':scope > .is-open').forEach(function (o) { if (o !== item) { o.classList.remove('is-open'); o.firstElementChild.setAttribute('aria-expanded', 'false'); } });
      item.classList.toggle('is-open', open);
      head.setAttribute('aria-expanded', String(open));
    });
  });

  /* Team (mobile accordion) */
  document.querySelectorAll('.team__who').forEach(function (b) {
    b.addEventListener('click', function () {
      if (window.innerWidth > 767) return;
      b.parentElement.classList.toggle('is-open');
    });
  });

  /* Testimonials slider */
  var track = document.querySelector('.testi__track');
  if (track) {
    var prevs = document.querySelectorAll('.js-testi-prev');
    var nexts = document.querySelectorAll('.js-testi-next');
    var step = function () { var c = track.querySelector('.t-card'); return c ? c.offsetWidth + 10 : 300; };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      prevs.forEach(function (b) { b.disabled = track.scrollLeft <= 2; });
      nexts.forEach(function (b) { b.disabled = track.scrollLeft >= max; });
    };
    prevs.forEach(function (b) { b.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); }); });
    nexts.forEach(function (b) { b.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* Testimonial quotes: custom scrollbar + bottom fade */
  document.querySelectorAll('.t-card__scroll').forEach(function (box) {
    var txt = box.querySelector('.t-card__text'), thumb = box.querySelector('.t-card__bar i');
    var upd = function () {
      var sh = txt.scrollHeight, ch = txt.clientHeight, scrollable = sh > ch + 2;
      box.classList.toggle('is-scrollable', scrollable);
      if (!scrollable) return;
      var h = Math.max(30, ch * ch / sh);
      thumb.style.height = h + 'px';
      thumb.style.transform = 'translateY(' + (txt.scrollTop / (sh - ch)) * (ch - h) + 'px)';
      box.classList.toggle('is-end', txt.scrollTop >= sh - ch - 2);
    };
    txt.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    window.addEventListener('load', upd);
    upd();
  });

  /* Contact form: enable submit when required fields are valid */
  var form = document.querySelector('.form');
  if (form) {
    var btn = form.querySelector('button[type=submit]');
    var note = form.querySelector('.form__note');
    var check = function () {
      var ok = form.name.value.trim() && /\S+@\S+\.\S+/.test(form.email.value);
      btn.disabled = !ok;
    };
    form.addEventListener('input', check);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn.disabled) return;
      // TODO: connect to the real form endpoint (Webflow / Formspree / Netlify Forms).
      var body = 'Name: ' + form.name.value + '\nEmail: ' + form.email.value + '\n\n' + form.message.value;
      window.location.href = 'mailto:hello@kz.design?subject=' + encodeURIComponent('New request from kz.design') + '&body=' + encodeURIComponent(body);
      note.textContent = 'Thank you! Your email client should open now.';
    });
  }
})();
