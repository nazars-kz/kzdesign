/* Contact drawer (see css/drawer.css).
   Opens from any element with [data-drawer] ("book" | "message"); the header "Get in touch"
   buttons get it automatically. The link href stays as the no-JS fallback.

   Booking has no backend yet:
   - availability is mocked: Mon–Fri, 10:00–17:30 Europe/Tallinn, 30-min slots, ~25% marked busy,
     today's slots closer than 2h are closed, 8 weeks ahead;
   - times are shown in the visitor's own time zone.
   Submit: if window.KZ_FORMS_ENDPOINT is set, both forms POST JSON there;
   otherwise they open a prefilled email to hello@kz.design (same fallback as the homepage form).
   TODO: connect a real calendar (Cal.com / Google Calendar) and the forms endpoint. */
(function () {
  'use strict';

  var EMAIL = 'hello@kz.design';
  // site root, taken from this script's own URL, so pages in subfolders (cases/) find assets/
  var ROOT_URL = (document.currentScript && document.currentScript.src || '').replace(/js\/drawer\.js(\?.*)?$/, '');
  var OFFICE_TZ = 'Europe/Tallinn';
  var DAY_START = 10 * 60, DAY_END = 18 * 60, STEP = 30; // minutes in office time
  var WEEKS_AHEAD = 8;

  var ic = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9s1.3-6.3 3.8-9z"/></svg>',
    free: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
  };

  var NEEDS = ['SaaS', 'Mobile app', 'Web', 'Design system', 'UX audit', 'Discovery & strategy', 'Something else'];
  var BUDGETS = ['Under $10k', '$10–25k', '$25–50k', '$50k+', 'Not sure yet'];
  var SOURCES = ['Clutch', 'Google search', 'LinkedIn', 'Dribbble', 'Behance', 'Referral', 'Other'];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function chip(label, multi) { return '<button class="dw-chip" type="button" aria-pressed="false" data-v="' + esc(label) + '">' + (multi ? ic.plus : '') + esc(label) + '</button>'; }
  var person = '<div class="dw-person"><div class="dw-person__ava"><img src="' + ROOT_URL + 'assets/av-vlad.jpg" alt="Vlad Kyrieiev"></div><div><b>Vlad Kyrieiev</b><span>Founder &amp; CEO</span></div></div>';

  var html =
    '<div class="dw__overlay" data-dw-close></div>' +
    '<div class="dw__panel" role="dialog" aria-modal="true" aria-label="Get in touch" tabindex="-1">' +
      '<div class="dw__top">' +
        '<div class="dw__tabs" role="tablist">' +
          '<button class="dw__tab" type="button" role="tab" data-tab="book" aria-selected="true">Book a call</button>' +
          '<button class="dw__tab" type="button" role="tab" data-tab="message" aria-selected="false">Send a message</button>' +
        '</div>' +
        '<button class="dw__close" type="button" aria-label="Close" data-dw-close>' + ic.close + '</button>' +
      '</div>' +

      /* ===== Book a call ===== */
      '<div class="dw__pane is-active" data-pane="book" role="tabpanel">' +
        /* step 1: day + time */
        '<div class="dw__step is-active" data-step="pick">' +
          '<div class="dw__scroll">' + person +
            '<h2 class="dw-title">Book a call</h2>' +
            '<p class="dw-lead">No calls with sales. Contact us and get to chat with our CEO.</p>' +
            '<div class="dw-meta"><span>' + ic.clock + '30 min</span><span>' + ic.video + 'Google Meet</span><span>' + ic.free + 'Free</span></div>' +
            '<span class="dw-label">Pick a day</span>' +
            '<div class="dw-cal"><div class="dw-cal__head"><span class="dw-cal__month" aria-live="polite"></span>' +
              '<div class="dw-cal__nav"><button type="button" data-month="-1" aria-label="Previous month">' + ic.left + '</button><button type="button" data-month="1" aria-label="Next month">' + ic.right + '</button></div></div>' +
              '<div class="dw-cal__grid"></div></div>' +
            '<div class="dw-times" hidden>' +
              '<div class="dw-when"><div><b class="dw-when__day"></b><span class="dw-tz"></span></div>' +
                '<div class="dw-seg" role="group" aria-label="Time format"><button type="button" data-fmt="24" aria-pressed="true">24h</button><button type="button" data-fmt="12" aria-pressed="false">am/pm</button></div></div>' +
              '<div class="dw-slots"></div>' +
            '</div>' +
          '</div>' +
          '<div class="dw__foot"><div class="dw__sum is-empty" data-sum><b>Pick a day and time</b></div>' +
            '<button class="btn btn--light" type="button" data-go="details" disabled>Continue<i class="btn__arrow"></i></button></div>' +
        '</div>' +
        /* step 2: details */
        '<form class="dw__step dw-book" data-step="details" novalidate>' +
          '<div class="dw__scroll">' +
            '<button class="dw-back" type="button" data-go="pick">' + ic.left + 'Change time</button>' +
            '<h2 class="dw-title">Your details</h2>' +
            '<div class="dw-card"><b>Intro call with Vlad Kyrieiev</b><ul>' +
              '<li>' + ic.cal + '<span data-f="date"></span></li>' +
              '<li>' + ic.clock + '<span data-f="time"></span></li>' +
              '<li>' + ic.video + '<span>Google Meet <em>· link comes with the invite</em></span></li>' +
              '<li>' + ic.globe + '<span data-f="tz"></span></li>' +
            '</ul></div>' +
            '<div class="dw-fields" style="margin-top:24px">' +
              '<label class="field"><input type="text" name="name" placeholder=" " required autocomplete="name"><span class="req">Name<b>*</b></span></label>' +
              '<label class="field"><input type="email" name="email" placeholder=" " required autocomplete="email"><span class="req">Email<b>*</b></span></label>' +
              '<label class="field"><input type="text" name="company" placeholder="Company (optional)" autocomplete="organization"></label>' +
              '<label class="field"><textarea name="topic" placeholder="What would you like to discuss? · optional"></textarea></label>' +
            '</div>' +
          '</div>' +
          '<div class="dw__foot"><div class="dw__sum" data-sum></div>' +
            '<button class="btn btn--light" type="submit" disabled>Book call<i class="btn__arrow"></i></button></div>' +
        '</form>' +
        /* step 3: sent */
        '<div class="dw__step" data-step="done"><div class="dw-done">' +
          '<span class="dw-done__icon">' + ic.check + '</span>' +
          '<h2 class="dw-title">Your Form Was Successfully Submitted!</h2>' +
          '<p class="dw-lead" data-f="done"></p>' +
          '<button class="btn btn--accent" type="button" data-dw-again>Make another submission</button>' +
        '</div></div>' +
      '</div>' +

      /* ===== Send a message ===== */
      '<div class="dw__pane" data-pane="message" role="tabpanel">' +
        '<form class="dw__step is-active dw-msg" data-step="form" novalidate>' +
          '<div class="dw__scroll">' +
            '<h2 class="dw-title" style="margin-top:8px">Tell us what you’re building</h2>' +
            '<p class="dw-lead">We reply within one business day. Prefer email? <a href="mailto:' + EMAIL + '">' + EMAIL + '</a></p>' +
            '<span class="dw-label">What do you need?</span>' +
            '<div class="dw-chips" data-group="needs">' + NEEDS.map(function (n) { return chip(n, true); }).join('') + '</div>' +
            '<span class="dw-label">Budget <i>· optional</i></span>' +
            '<div class="dw-chips dw-chips--single" data-group="budget" data-single>' + BUDGETS.map(function (n) { return chip(n); }).join('') + '</div>' +
            '<div class="dw-fields" style="margin-top:28px">' +
              '<label class="field"><input type="text" name="name" placeholder=" " required autocomplete="name"><span class="req">Name<b>*</b></span></label>' +
              '<label class="field"><input type="email" name="email" placeholder=" " required autocomplete="email"><span class="req">Email<b>*</b></span></label>' +
              '<label class="field"><input type="text" name="company" placeholder="Company (optional)" autocomplete="organization"></label>' +
              '<label class="field"><select name="source" class="is-empty"><option value="">How did you hear about us?</option>' + SOURCES.map(function (s) { return '<option>' + esc(s) + '</option>'; }).join('') + '</select></label>' +
            '</div>' +
            '<div class="dw-more">' +
              '<button class="dw-more__btn" type="button">About the project<i>' + ic.plus + '</i></button>' +
              '<label class="field"><textarea name="about" placeholder="About the project: goals, stage, timeline"></textarea></label>' +
            '</div>' +
            '<div class="dw-checks">' +
              '<label class="dw-check"><input type="checkbox" name="nda"><i>' + ic.check + '</i>Send me an NDA before we talk</label>' +
              '<label class="dw-check"><input type="checkbox" name="privacy" required><i>' + ic.check + '</i><span>I agree to the <a href="https://www.kz.design/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a><b>*</b></span></label>' +
            '</div>' +
          '</div>' +
          '<div class="dw__foot"><span class="dw-replies">We reply within one business day</span>' +
            '<button class="btn btn--light" type="submit" disabled>Send message<i class="btn__arrow"></i></button></div>' +
        '</form>' +
        '<div class="dw__step" data-step="done"><div class="dw-done">' +
          '<span class="dw-done__icon">' + ic.check + '</span>' +
          '<h2 class="dw-title">Your Form Was Successfully Submitted!</h2>' +
          '<p class="dw-lead">We will be in touch with you shortly!</p>' +
          '<button class="btn btn--accent" type="button" data-dw-again>Make another submission</button>' +
        '</div></div>' +
      '</div>' +
    '</div>';

  /* One builder for both uses: the modal drawer (every page) and the embedded form ([data-contact-inline], Contact us page) */
  function setup(root, inline) {
  root.innerHTML = html;
  if (inline) {
    var pnl = root.querySelector('.dw__panel');
    pnl.removeAttribute('role'); pnl.removeAttribute('aria-modal'); pnl.removeAttribute('tabindex'); pnl.setAttribute('aria-label', 'Contact form');
    // Contact block: the message tab is the site's default contact form (same fields as before), shown first
    var tabs = root.querySelector('.dw__tabs');
    tabs.insertBefore(tabs.querySelector('[data-tab="message"]'), tabs.firstChild);
    root.querySelector('.dw-msg').innerHTML =
      '<div class="dw__scroll"><div class="dw-fields dw-fields--simple">' +
        '<label class="field"><input type="text" name="name" placeholder=" " required autocomplete="name"><span class="req">Name<b>*</b></span></label>' +
        '<label class="field"><input type="email" name="email" placeholder=" " required autocomplete="email"><span class="req">Email address<b>*</b></span></label>' +
        '<label class="field"><textarea name="about" placeholder="Message (optional)"></textarea></label>' +
      '</div></div>' +
      '<div class="dw__foot"><span class="dw-replies">We reply within one business day</span>' +
        '<button class="btn btn--light" type="submit" disabled>Submit<i class="btn__arrow"></i></button></div>';
  }
  var $ = function (s, el) { return (el || root).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || root).querySelectorAll(s)); };
  var panel = $('.dw__panel');

  /* ---------- Open / close ---------- */
  var lastFocus = null, closeTimer = null;
  function open(tab) {
    clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    setTab(tab || 'book');
    var sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.classList.add('dw-lock');
    if (sbw > 0) document.body.style.paddingRight = sbw + 'px';
    root.classList.remove('is-closing');
    root.setAttribute('aria-hidden', 'false');
    void root.offsetWidth;
    root.classList.add('is-open');
    document.body.classList.remove('menu-open');
    setTimeout(function () { (activeTab() || panel).focus({ preventScroll: true }); }, 50);
  }
  function close() {
    if (inline) { // embedded form (Contact us page): a sent pane resets
      $$('[data-pane]').forEach(function (p) { if ($('[data-step="done"].is-active', p)) resetPane(p.dataset.pane); });
      return;
    }
    if (!root.classList.contains('is-open')) return;
    root.classList.remove('is-open');
    root.classList.add('is-closing');
    root.setAttribute('aria-hidden', 'true');
    closeTimer = setTimeout(function () {
      root.classList.remove('is-closing');
      document.documentElement.classList.remove('dw-lock');
      document.body.style.paddingRight = '';
      // a sent form starts fresh next time
      $$('[data-pane]').forEach(function (p) { if ($('[data-step="done"].is-active', p)) resetPane(p.dataset.pane); });
    }, 600);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function activeTab() { return $('.dw__tab[aria-selected="true"]'); }

  if (!inline) {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-drawer]');
      if (t) { e.preventDefault(); open(t.getAttribute('data-drawer')); }
    });
    root.addEventListener('click', function (e) { if (e.target.closest('[data-dw-close]')) close(); });
    document.addEventListener('keydown', function (e) {
      if (!root.classList.contains('is-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') { // keep focus inside the panel
        var f = $$('button, a[href], input, select, textarea', panel).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    /* Header "Get in touch" buttons open the drawer */
    $$('.header__actions .btn', document).forEach(function (a) { a.setAttribute('data-drawer', 'book'); a.setAttribute('aria-haspopup', 'dialog'); });
  }

  /* ---------- Tabs / steps ---------- */
  function setTab(name) {
    $$('.dw__tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.tab === name)); });
    $$('[data-pane]').forEach(function (p) { p.classList.toggle('is-active', p.dataset.pane === name); });
  }
  function setStep(pane, step) {
    $$('[data-pane="' + pane + '"] > .dw__step').forEach(function (s) { s.classList.toggle('is-active', s.dataset.step === step); });
    var sc = $('[data-pane="' + pane + '"] > .dw__step.is-active .dw__scroll'); if (sc) sc.scrollTop = 0;
  }
  $('.dw__tabs').addEventListener('click', function (e) { var b = e.target.closest('.dw__tab'); if (b) setTab(b.dataset.tab); });
  $('.dw__tabs').addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var next = activeTab().dataset.tab === 'book' ? 'message' : 'book';
    setTab(next); $('.dw__tab[data-tab="' + next + '"]').focus();
  });

  /* ---------- Time helpers ---------- */
  var userTZ = (Intl.DateTimeFormat().resolvedOptions().timeZone) || OFFICE_TZ;
  var fmt24 = true;
  function tzOffsetMin(date, tz) { // minutes east of UTC for tz at instant `date`
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      .formatToParts(date).forEach(function (x) { p[x.type] = x.value; });
    var asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute);
    return Math.round((asUTC - Math.floor(date.getTime() / 60000) * 60000) / 60000);
  }
  function officeInstant(y, m, d, minutes) { // office wall time → Date
    var guess = new Date(Date.UTC(y, m, d, 0, minutes));
    return new Date(guess.getTime() - tzOffsetMin(guess, OFFICE_TZ) * 60000);
  }
  function officeToday() {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: OFFICE_TZ, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return new Date(+p.year, +p.month - 1, +p.day);
  }
  function fmtTime(date) { return new Intl.DateTimeFormat(fmt24 ? 'en-GB' : 'en-US', { timeZone: userTZ, hour: '2-digit', minute: '2-digit', hour12: !fmt24 }).format(date).replace(/^0(\d)(?=:\d\d\s?[AP]M)/, '$1'); }
  function fmtDay(date, opts) { return new Intl.DateTimeFormat('en-GB', Object.assign({ timeZone: userTZ }, opts)).format(date); }
  function gmtLabel(date) {
    var o = tzOffsetMin(date, userTZ), s = o < 0 ? '−' : '+', a = Math.abs(o);
    var city = userTZ.split('/').pop().replace(/_/g, ' ');
    return city + ' · GMT' + s + Math.floor(a / 60) + (a % 60 ? ':' + String(a % 60).padStart(2, '0') : '');
  }
  function busy(y, m, d, min) { // deterministic mock: ~25% of slots taken
    var h = (y * 372 + m * 31 + d) * 97 + min; h = Math.imul(h ^ (h >>> 7), 0x9E3779B1) >>> 0;
    return (h >>> 13) % 4 === 0;
  }
  function slotsFor(day) {
    var out = [], now = Date.now() + 2 * 3600e3;
    for (var t = DAY_START; t < DAY_END; t += STEP) {
      var at = officeInstant(day.getFullYear(), day.getMonth(), day.getDate(), t);
      out.push({ at: at, off: at.getTime() < now || busy(day.getFullYear(), day.getMonth(), day.getDate(), t) });
    }
    return out;
  }
  function dayOpen(day) {
    var wd = day.getDay();
    if (wd === 0 || wd === 6 || day < today || day > lastDay) return false;
    return slotsFor(day).some(function (s) { return !s.off; });
  }

  /* ---------- Calendar ---------- */
  var today = officeToday();
  var lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + WEEKS_AHEAD * 7);
  var view = new Date(today.getFullYear(), today.getMonth(), 1);
  var selDay = null, selSlot = null;
  var WD = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function renderCal() {
    $('.dw-cal__month').textContent = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(view);
    $('[data-month="-1"]').disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
    $('[data-month="1"]').disabled = new Date(view.getFullYear(), view.getMonth() + 1, 1) > lastDay;
    var g = WD.map(function (w) { return '<span class="dw-cal__wd">' + w + '</span>'; }).join('');
    var lead = (view.getDay() + 6) % 7, days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (var i = 0; i < lead; i++) g += '<span class="dw-cal__blank"></span>';
    for (var d = 1; d <= days; d++) {
      var day = new Date(view.getFullYear(), view.getMonth(), d), ok = dayOpen(day);
      var sel = selDay && +selDay === +day, isT = +day === +today;
      g += '<button class="dw-day' + (isT ? ' is-today' : '') + '" type="button" data-d="' + d + '"' + (ok ? '' : ' disabled') +
        ' aria-pressed="' + sel + '" aria-label="' + new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(day) + (ok ? '' : ', unavailable') + '">' + d + '</button>';
    }
    $('.dw-cal__grid').innerHTML = g;
  }
  function renderSlots() {
    var box = $('.dw-times');
    if (!selDay) { box.hidden = true; return; }
    box.hidden = false;
    var list = slotsFor(selDay);
    $('.dw-when__day').textContent = fmtDay(list[0].at, { weekday: 'long', day: 'numeric', month: 'long' });
    $('.dw-tz').textContent = gmtLabel(list[0].at);
    $('.dw-slots').innerHTML = list.map(function (s, i) {
      var on = selSlot && +selSlot === +s.at;
      return '<button class="dw-slot" type="button" data-i="' + i + '"' + (s.off ? ' disabled aria-label="' + fmtTime(s.at) + ', booked"' : '') + ' aria-pressed="' + !!on + '">' + fmtTime(s.at) + '</button>';
    }).join('');
  }
  function summary() {
    if (!selSlot) return '<b>Pick a day and time</b>';
    return '<b>' + fmtDay(selSlot, { weekday: 'short', day: 'numeric', month: 'short' }) + ', ' + fmtTime(selSlot) + '</b><span>30 min · Google Meet</span>';
  }
  function renderSum() {
    $$('[data-pane="book"] [data-sum]').forEach(function (s) { s.innerHTML = summary(); s.classList.toggle('is-empty', !selSlot); });
    $('[data-go="details"]').disabled = !selSlot;
  }
  function firstOpenDay() {
    for (var d = new Date(today); d <= lastDay; d.setDate(d.getDate() + 1)) if (dayOpen(d)) return new Date(d);
    return null;
  }

  $('.dw-cal__nav').addEventListener('click', function (e) {
    var b = e.target.closest('[data-month]'); if (!b) return;
    view = new Date(view.getFullYear(), view.getMonth() + +b.dataset.month, 1); renderCal();
  });
  $('.dw-cal__grid').addEventListener('click', function (e) {
    var b = e.target.closest('.dw-day'); if (!b) return;
    selDay = new Date(view.getFullYear(), view.getMonth(), +b.dataset.d); selSlot = null;
    renderCal(); renderSlots(); renderSum();
    var f = $('.dw-cal__grid [aria-pressed="true"]'); if (f) f.focus();
  });
  $('.dw-slots').addEventListener('click', function (e) {
    var b = e.target.closest('.dw-slot'); if (!b) return;
    selSlot = slotsFor(selDay)[+b.dataset.i].at;
    $$('.dw-slot').forEach(function (s) { s.setAttribute('aria-pressed', String(s === b)); });
    renderSum();
  });
  $('.dw-seg').addEventListener('click', function (e) {
    var b = e.target.closest('[data-fmt]'); if (!b) return;
    fmt24 = b.dataset.fmt === '24';
    $$('.dw-seg button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    renderSlots(); renderSum();
  });

  /* ---------- Booking details ---------- */
  var book = $('.dw-book');
  root.addEventListener('click', function (e) {
    var g = e.target.closest('[data-go]'); if (!g || g.disabled) return;
    if (g.dataset.go === 'details') {
      var end = new Date(selSlot.getTime() + 30 * 60000);
      $('[data-f="date"]', book).textContent = fmtDay(selSlot, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      $('[data-f="time"]', book).textContent = fmtTime(selSlot) + ' – ' + fmtTime(end);
      $('[data-f="tz"]', book).textContent = gmtLabel(selSlot);
      setStep('book', 'details');
      setTimeout(function () { book.name.focus({ preventScroll: true }); }, 60);
    } else setStep('book', 'pick');
  });

  function validEmail(v) { return /^\S+@\S+\.\S+$/.test(v.trim()); }
  function wireForm(form, extraOk) {
    var btn = form.querySelector('button[type=submit]');
    function check() { btn.disabled = !(form.name.value.trim() && validEmail(form.email.value) && (!extraOk || extraOk())); }
    form.addEventListener('input', check); form.addEventListener('change', check);
    form.email.addEventListener('blur', function () { form.email.parentNode.classList.toggle('is-error', !!form.email.value && !validEmail(form.email.value)); });
    form._check = check;
  }
  wireForm(book);

  /* ---------- Message form ---------- */
  var msg = $('.dw-msg');
  wireForm(msg, function () { return !msg.privacy || msg.privacy.checked; });
  $$('.dw-chips', msg).forEach(function (g) {
    g.addEventListener('click', function (e) {
      var c = e.target.closest('.dw-chip'); if (!c) return;
      var on = c.getAttribute('aria-pressed') !== 'true';
      if (g.hasAttribute('data-single')) $$('.dw-chip', g).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      c.setAttribute('aria-pressed', String(on));
    });
  });
  if (msg.source) msg.source.addEventListener('change', function () { msg.source.classList.toggle('is-empty', !msg.source.value); });
  if ($('.dw-more__btn', msg)) $('.dw-more__btn', msg).addEventListener('click', function () { var m = $('.dw-more', msg); m.classList.add('is-open'); msg.about.focus(); });
  function fv(n) { var f = msg.elements[n]; return f ? (f.type === 'checkbox' ? f.checked : f.value.trim()) : ''; }

  function picked(group) { return $$('[data-group="' + group + '"] [aria-pressed="true"]', msg).map(function (c) { return c.dataset.v; }); }

  function send(payload, subject, lines, done) {
    var ep = window.KZ_FORMS_ENDPOINT;
    if (ep) {
      fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
        .catch(function () { window.location.href = mailto(subject, lines); done(); });
    } else { window.location.href = mailto(subject, lines); done(); }
  }
  function mailto(subject, lines) {
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.filter(Boolean).join('\n'));
  }

  book.addEventListener('submit', function (e) {
    e.preventDefault(); if (book.querySelector('[type=submit]').disabled) return;
    var when = $('[data-f="date"]', book).textContent + ', ' + $('[data-f="time"]', book).textContent + ' (' + gmtLabel(selSlot) + ')';
    var d = { type: 'call', start: selSlot.toISOString(), duration: 30, timezone: userTZ, name: book.name.value.trim(), email: book.email.value.trim(), company: book.company.value.trim(), topic: book.topic.value.trim() };
    send(d, 'Intro call request: ' + when, ['Intro call with Vlad Kyrieiev', 'When: ' + when, 'Name: ' + d.name, 'Email: ' + d.email, d.company && 'Company: ' + d.company, d.topic && 'Topic: ' + d.topic], function () {
      $('[data-f="done"]', root).textContent = 'Vlad will confirm ' + when + ' and send the Google Meet invite to ' + d.email + '.';
      setStep('book', 'done');
    });
  });
  msg.addEventListener('submit', function (e) {
    e.preventDefault(); if (msg.querySelector('[type=submit]').disabled) return;
    var d = { type: 'message', needs: picked('needs'), budget: picked('budget')[0] || '', name: fv('name'), email: fv('email'), company: fv('company'), source: fv('source'), about: fv('about'), nda: fv('nda') };
    send(d, (inline ? 'Message from ' : 'New project: ') + d.name, ['Name: ' + d.name, 'Email: ' + d.email, d.company && 'Company: ' + d.company, d.needs.length && 'Needs: ' + d.needs.join(', '), d.budget && 'Budget: ' + d.budget, d.source && 'Heard from: ' + d.source, d.about && '\n' + d.about, d.nda && '\nPlease send an NDA before we talk.'], function () {
      setStep('message', 'done');
    });
  });

  function resetPane(name) {
    if (name === 'book') {
      book.reset(); book._check(); selSlot = null; selDay = firstOpenDay();
      if (selDay) view = new Date(selDay.getFullYear(), selDay.getMonth(), 1);
      renderCal(); renderSlots(); renderSum(); setStep('book', 'pick');
    } else {
      msg.reset(); msg._check(); if (msg.source) msg.source.classList.add('is-empty');
      $$('.dw-chip', msg).forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      if ($('.dw-more', msg)) $('.dw-more', msg).classList.remove('is-open'); setStep('message', 'form');
    }
  }
  resetPane('book');
  root.addEventListener('click', function (e) { // success step: "Make another submission" brings back an empty form
    var b = e.target.closest('[data-dw-again]'); if (!b) return;
    var p = b.closest('[data-pane]'); if (p) resetPane(p.dataset.pane);
  });
  if (inline) setTab('message');
  return { open: typeof open === 'function' ? open : null };
  }

  var modal = document.createElement('div');
  modal.className = 'dw';
  modal.id = 'contact-drawer';
  modal.setAttribute('aria-hidden', 'true');
  document.body.appendChild(modal);
  setup(modal, false);
  Array.prototype.forEach.call(document.querySelectorAll('[data-contact-inline]'), function (el) {
    el.classList.add('dw', 'dw--inline', 'is-open');
    setup(el, true);
  });
})();
