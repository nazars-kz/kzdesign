(function () {
  'use strict';

  /* Header shadow on scroll */
  var header = document.querySelector('.header');
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 4); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Mega menus (desktop): [data-mega] buttons open the matching [data-mega-panel]; one at a time.
     Closes on a second click, a click outside, Esc, or when the window gets narrower than the desktop nav. */
  var megaBtns = document.querySelectorAll('[data-mega]');
  if (megaBtns.length) {
    // dim the page under the open panel so the menu gets the focus
    var dim = document.createElement('div');
    dim.className = 'mega-dim';
    dim.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dim);
    var setMega = function (name) {
      dim.classList.toggle('is-on', !!name);
      megaBtns.forEach(function (b) { b.setAttribute('aria-expanded', String(b.dataset.mega === name)); });
      document.querySelectorAll('[data-mega-panel]').forEach(function (p) { p.classList.toggle('is-open', p.dataset.megaPanel === name); });
    };
    megaBtns.forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        setMega(b.getAttribute('aria-expanded') === 'true' ? null : b.dataset.mega);
      });
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.mega__panel')) setMega(null); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var open = document.querySelector('[data-mega][aria-expanded="true"]');
      if (open) { setMega(null); open.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth <= 1100) setMega(null); });
  }

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
    var links = ['pages/saas.html', 'pages/mobile.html', 'pages/web.html']; // used on the homepage only
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

  /* Drag to scroll (mouse): press and pull the slider; a round "drag" cursor follows the mouse.
     Touch screens keep native swipe. Used on Testimonials and "Other case studies". */
  var dragTracks = document.querySelectorAll('.testi__track, .cother__track');
  if (dragTracks.length && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var cur = document.createElement('div');
    cur.className = 'drag-cursor';
    cur.setAttribute('aria-hidden', 'true');
    cur.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l-6 6 6 6"/></svg>' +
      '<span>Drag</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l6 6-6 6"/></svg>';
    document.body.appendChild(cur);
    var moveCur = function (e) { cur.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; };

    dragTracks.forEach(function (tr) {
      tr.classList.add('is-draggable');
      var down = false, moved = false, startX = 0, startLeft = 0, pid = null;
      var overLink = function (e) { return !!e.target.closest('a, button'); };
      tr.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { moveCur(e); cur.classList.add('is-on'); } });
      tr.addEventListener('pointerleave', function () { if (!down) cur.classList.remove('is-on'); });
      tr.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        moveCur(e);
        cur.classList.toggle('is-hidden', !down && overLink(e));
        if (!down) return;
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 4) { moved = true; tr.classList.add('is-dragging'); tr.setPointerCapture(pid); }
        if (moved) tr.scrollLeft = startLeft - dx;
      });
      tr.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        down = true; moved = false; startX = e.clientX; startLeft = tr.scrollLeft; pid = e.pointerId;
        cur.classList.add('is-down');
      });
      var end = function () {
        if (!down) return;
        down = false; cur.classList.remove('is-down');
        if (!moved) return;
        // land on the nearest card, then give scroll-snap back
        // a short pull (about a third of a card) is enough to move to the next one
        var cards = tr.children, pad = parseFloat(getComputedStyle(tr).scrollPaddingLeft) || 0, best = 0, bestD = Infinity;
        var w = cards[0] ? cards[0].offsetWidth : 0, aim = tr.scrollLeft + (tr.scrollLeft > startLeft ? .35 : -.35) * w;
        for (var i = 0; i < cards.length; i++) {
          var d = Math.abs(cards[i].offsetLeft - pad - aim);
          if (d < bestD) { bestD = d; best = cards[i].offsetLeft - pad; }
        }
        tr.classList.remove('is-dragging');
        tr.scrollTo({ left: best, behavior: 'smooth' });
        setTimeout(function () { moved = false; }, 0);
      };
      tr.addEventListener('pointerup', end);
      tr.addEventListener('pointercancel', end);
      tr.addEventListener('lostpointercapture', end);
      tr.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true); // a drag is not a click
      tr.addEventListener('dragstart', function (e) { e.preventDefault(); }); // no ghost images/links
    });
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
