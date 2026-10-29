// Case pages: the 3D K&Z logo behind the "Get in touch" CTA. three.js (~650 KB) loads only when the block is near the screen.
(function () {
  var el = document.querySelector('[data-kz-logo]');
  if (!el) return;
  var base = (document.currentScript && document.currentScript.src || '').replace(/ccta-logo\.js.*$/, '');
  function load(src) { return new Promise(function (ok, no) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); }
  function mount() {
    var p = window.THREE ? Promise.resolve() : load(base + 'vendor/three.min.js');
    p.then(function () { return window.mountKzLogo ? null : load(base + 'kz-logo-3d.js'); })
     .then(function () {
       window.mountKzLogo(el, { autoRotate: 0.5, followPointer: true, drag: false, clickSpin: false, float: true, shimmer: true, movingLights: true, glow: true, shadow: false });
       el.classList.add('is-on');
     })
     .catch(function () { el.hidden = true; }); // no WebGL / script failed: the CTA just has no logo
  }
  if (!('IntersectionObserver' in window)) { mount(); return; }
  var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); mount(); } }, { rootMargin: '400px 0px' });
  io.observe(el);
})();
