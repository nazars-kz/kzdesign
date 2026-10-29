/* Service pages: partners logo marquee.
   Live behaviour: one row of 24 logos scrolls left continuously at ~80px/s. */
(function () {
  'use strict';
  var track = document.querySelector('.marquee__track');
  if (!track) return;
  var set = track.innerHTML;
  track.innerHTML = set + set + set; // 3 copies, like the live site
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var x = 0, last = null, speed = 80;
  function loop(ts) {
    if (last !== null) {
      var w = track.scrollWidth / 3;
      x -= speed * (ts - last) / 1000;
      if (-x >= w) x += w;
      track.style.transform = 'translate3d(' + x + 'px,0,0)';
    }
    last = ts;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
