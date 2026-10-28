/* Cases list: category filter pills. One active pill; "All" shows every case.
   Each card lists its categories in data-cats ("SaaS|Web|B2B"). */
(function () {
  'use strict';
  var pills = document.querySelectorAll('.cs-filters .pill');
  var cards = document.querySelectorAll('.cs-list__items .case');
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
  }
  pills.forEach(function (p) { p.addEventListener('click', function () { apply(p.dataset.filter); }); });
})();
