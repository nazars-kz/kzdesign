/* Lottie on hover (About "What makes us different" cards, Approach phase visuals).
   Live behaviour (Webflow IX2 a-5 / a-6): the Lottie rests on frame 0,
   plays to 50% on hover (500ms, ease-in-out) and returns to 0 on mouse out.
   On touch screens it plays to 50% once the card scrolls into view. */
(function () {
  'use strict';
  if (!window.lottie) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;
  var ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };

  document.querySelectorAll('.js-lottie').forEach(function (box) {
    var anim = lottie.loadAnimation({ container: box, renderer: 'svg', loop: false, autoplay: false, path: box.dataset.src,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' } });
    var pos = 0, raf = null, ready = false;
    anim.addEventListener('DOMLoaded', function () { ready = true; anim.goToAndStop(0, true); });

    function tweenTo(target, ms) {
      if (!ready) return;
      cancelAnimationFrame(raf);
      var from = pos, start = null, total = anim.totalFrames - 1;
      if (reduce) ms = 0;
      function step(ts) {
        if (start === null) start = ts;
        var t = ms ? Math.min(1, (ts - start) / ms) : 1;
        pos = from + (target - from) * ease(t);
        anim.goToAndStop(pos * total, true);
        if (t < 1) raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    }

    var card = box.closest('.js-lottie-hover') || box;
    if (canHover) {
      card.addEventListener('mouseenter', function () { tweenTo(.5, 500); });
      card.addEventListener('mouseleave', function () { tweenTo(0, 500); });
    } else if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { var go = function () { ready ? tweenTo(.5, 500) : setTimeout(go, 200); }; go(); io.disconnect(); } });
      }, { threshold: .5 });
      io.observe(card);
    }
  });
})();
