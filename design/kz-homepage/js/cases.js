/* Cases list: category filter. Desktop = pills, mobile (≤767) = dropdown with the number of cases per category.
   One active filter; "All" shows every case. Each card lists its categories in data-cats ("SaaS|Web|B2B"). */
(function () {
  'use strict';
  var pills = document.querySelectorAll('.cs-filters .pill');
  var cards = document.querySelectorAll('.cs-list__items .case');
  var sel = document.querySelector('.cs-select');
  if (!pills.length) return;
  function apply(filter) {
    pills.forEach(function (p) {
      var on = p.dataset.filter === filter;
      p.classList.toggle('is-active', on);
      p.setAttribute('aria-pressed', String(on));
    });
    cards.forEach(function (c) {
      c.hidden = filter !== 'All' && c.dataset.cats.split('|').indexOf(filter) === -1;
    });
    if (sel) {
      sel.querySelector('.cs-select__val').textContent = filter;
      sel.querySelectorAll('[role=option]').forEach(function (o) { o.setAttribute('aria-selected', String(o.dataset.filter === filter)); });
    }
  }
  // Sticky filter bar: hairline once it sits under the header; a new filter brings the list start back into view
  var list = document.querySelector('.cs-list__items');
  function bar() { var f = document.querySelector('.cs-filters'); return f && f.offsetParent ? f : sel; }
  function stuck() {
    [document.querySelector('.cs-filters'), sel].forEach(function (b) {
      if (!b || !b.offsetParent) return;
      var top = parseFloat(getComputedStyle(b).top) || 0;
      b.classList.toggle('is-stuck', b.getBoundingClientRect().top <= top + 1 && list.getBoundingClientRect().top < top + b.offsetHeight + 1);
    });
  }
  window.addEventListener('scroll', stuck, { passive: true }); window.addEventListener('resize', stuck); stuck();
  function toList() {
    var b = bar(); if (!b || !b.classList.contains('is-stuck')) return;
    document.documentElement.style.setProperty('--bar-h', b.offsetHeight + 'px');
    list.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  pills.forEach(function (p) { p.addEventListener('click', function () { apply(p.dataset.filter); toList(); }); });

  if (sel) {
    var btn = sel.querySelector('.cs-select__btn');
    var setOpen = function (open) { sel.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!sel.classList.contains('is-open')); });
    sel.querySelectorAll('[role=option]').forEach(function (o) {
      o.addEventListener('click', function () { apply(o.dataset.filter); setOpen(false); btn.focus({ preventScroll: true }); toList(); });
      o.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); o.click(); }
        if (e.key === 'ArrowDown' && o.nextElementSibling) { e.preventDefault(); o.nextElementSibling.focus(); }
        if (e.key === 'ArrowUp' && o.previousElementSibling) { e.preventDefault(); o.previousElementSibling.focus(); }
      });
    });
    btn.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); sel.querySelector('[aria-selected=true]').focus(); } });
    document.addEventListener('click', function (e) { if (!sel.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sel.classList.contains('is-open')) { setOpen(false); btn.focus(); } });
  }
})();
