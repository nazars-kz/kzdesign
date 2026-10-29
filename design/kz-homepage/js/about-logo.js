// About page: the 3D K&Z logo in the hero, spinning slowly (drag to turn, click for a full turn).
(function () {
  var el = document.getElementById('kz-logo-3d');
  if (!el || !window.THREE || !window.mountKzLogo) return;
  try {
    window.mountKzLogo(el, { autoRotate: 0.6, followPointer: true, drag: true, clickSpin: true, float: true, shimmer: true, movingLights: true, glow: true });
  } catch (e) { el.hidden = true; } // no WebGL: the hero just has no logo
})();
