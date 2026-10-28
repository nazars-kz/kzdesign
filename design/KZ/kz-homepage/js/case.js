/* Case page: "Other case studies" slider. Arrows scroll by one slide; disabled at the ends. */
(function () {
  'use strict';
  var track = document.querySelector('.cother__track');
  if (!track) return;
  var prev = document.querySelector('.cother__nav .round-btn--prev');
  var next = document.querySelector('.cother__nav .round-btn--next');
  function step() { var c = track.querySelector('.case'); return c ? c.offsetWidth + 20 : 600; }
  function update() {
    var max = track.scrollWidth - track.clientWidth - 2;
    if (prev) prev.disabled = track.scrollLeft <= 2;
    if (next) next.disabled = track.scrollLeft >= max;
  }
  if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step() }); });
  if (next) next.addEventListener('click', function () { track.scrollBy({ left: step() }); });
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
