// Needs js/vendor/three.min.js (three.js r160, MIT) loaded before it. Classic script, so it also works when the page is opened from disk.
(function () {

// K&Z 3D logo — interactive WebGL element.
// createKzLogo(THREE, container, options) -> { destroy }
function createKzLogo(THREE, container, options) {
  const o = Object.assign({
    color: '#FC814A',      // front face
    sideColor: '#E0612B',  // extruded sides
    depth: 1.2,            // thickness
    followPointer: true,   // tilt toward the cursor anywhere on the page
    tiltStrength: 0.35,    // radians at the edge of the screen
    drag: true,            // drag to spin, with inertia
    clickSpin: true,       // click / tap = full turn
    float: true,           // idle floating
    shadow: true,          // soft contact shadow under the logo
    shimmer: true,         // light band that sweeps across the mark
    shimmerColor: '#FFE6CF',
    shimmerEvery: 3.2,     // seconds between sweeps
    movingLights: true,    // highlights travel over the bevels; one follows the cursor
    glow: true,            // soft orange halo around the mark
    maxPixelRatio: 2,
    autoRotate: 0,         // radians per second of continuous spin (0 = rest in a 3/4 view)
  }, options || {});

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- renderer ----------
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, o.maxPixelRatio));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;outline:none;' +
    (o.glow ? 'filter:drop-shadow(0 0 28px ' + o.color + '59);' : '');
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'K&Z logo');
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 1.2, 17);
  camera.lookAt(0, 0, 0);

  // ---------- environment (soft studio reflections) ----------
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new THREE.Scene();
  room.add(new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0x1c1a18, side: THREE.BackSide })));
  const panel = (x, y, z, w, h, i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(i, i, i) }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); room.add(m);
  };
  panel(-6, 6, 6, 6, 3, 1.4); panel(7, 2, 3, 2, 8, 1.0); panel(0, -2, -8, 10, 3, 0.5);
  const envTex = pmrem.fromScene(room, 0.04).texture;
  scene.environment = envTex;

  // ---------- lights ----------
  const key = new THREE.DirectionalLight(0xfff1e6, 1.3); key.position.set(-4, 7, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffd2b8, 0.9); rim.position.set(6, -2, -5); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 1.1); fill.position.set(1, 3, 10); scene.add(fill);
  // travelling highlights
  const orbitA = new THREE.PointLight(0xfff4ea, o.movingLights ? 2.2 : 0, 0, 0);
  const orbitB = new THREE.PointLight(0xffb27f, o.movingLights ? 1.6 : 0, 0, 0);
  const cursorLight = new THREE.PointLight(0xffffff, o.movingLights ? 1.4 : 0, 0, 0);
  cursorLight.position.set(0, 2, 8);
  scene.add(orbitA, orbitB, cursorLight);

  // ---------- logo geometry (traced from the 402×126 mark) ----------
  const pts = [[2, 79], [201, 0], [201, 45], [400, 45], [201, 125], [201, 79]];
  const shape = new THREE.Shape();
  pts.forEach(([x, y], i) => {
    const X = (x - 201) / 40, Y = -(y - 62.5) / 40;
    i ? shape.lineTo(X, Y) : shape.moveTo(X, Y);
  });
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: o.depth, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.1, bevelSegments: 8, curveSegments: 1,
  });
  geo.center();
  geo.computeVertexNormals();

  const front = new THREE.MeshPhysicalMaterial({
    color: o.color, emissive: o.color, emissiveIntensity: 0.42,
    roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.06,
    sheen: 0.6, sheenColor: new THREE.Color('#FFC39C'), sheenRoughness: 0.35,
  });
  const side = new THREE.MeshPhysicalMaterial({
    color: o.sideColor, emissive: o.sideColor, emissiveIntensity: 0.12,
    roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.05,
  });

  // light sweep: a soft diagonal band with a bright core, added on top of shading
  const sweep = { pos: { value: -99 }, color: { value: new THREE.Color(o.shimmerColor) } };
  function addSweep(mat, strength) {
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uSweepPos = sweep.pos;
      sh.uniforms.uSweepColor = sweep.color;
      sh.vertexShader = 'varying vec3 vLocalPos;\n' + sh.vertexShader.replace(
        '#include <begin_vertex>', '#include <begin_vertex>\n vLocalPos = position;');
      sh.fragmentShader = 'uniform float uSweepPos; uniform vec3 uSweepColor; varying vec3 vLocalPos;\n' +
        sh.fragmentShader.replace('#include <opaque_fragment>', `#include <opaque_fragment>
          float d = dot(vLocalPos.xy, normalize(vec2(1.0, 0.45))) - uSweepPos;
          float band = exp(-d * d / 0.9) * 0.45 + exp(-d * d / 0.025) * 0.75;
          gl_FragColor.rgb += uSweepColor * band * ${strength.toFixed(2)};`);
    };
  }
  if (o.shimmer) { addSweep(front, 1.0); addSweep(side, 1.3); }
  const logo = new THREE.Mesh(geo, [front, side]);

  const pivot = new THREE.Group();   // pointer tilt + float
  const spinner = new THREE.Group(); // drag / click spin
  spinner.add(logo); pivot.add(spinner); scene.add(pivot);

  // ---------- contact shadow (works on any background) ----------
  let shadowMesh = null;
  if (o.shadow) {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(0,0,0,0.45)'); grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(11, 2.4),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.3;
    scene.add(shadowMesh);
  }

  // ---------- sizing: fit the logo to the box ----------
  function resize() {
    const w = container.clientWidth || 1, h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep ~13.5 units of width visible whatever the aspect
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const distForWidth = (13.5 / 2) / (Math.tan(vFov / 2) * camera.aspect);
    const distForHeight = (7.4 / 2) / Math.tan(vFov / 2);
    camera.position.z = Math.max(distForWidth, distForHeight);
    camera.updateProjectionMatrix();
    requestRender();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // ---------- interaction state ----------
  const tiltTarget = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };
  let spinY = -0.45, spinX = -0.2;   // resting 3/4 view
  const rest = { x: -0.2, y: -0.45 };
  let velY = 0, velX = 0;
  let dragging = false, moved = 0, lastX = 0, lastY = 0, lastT = 0;
  let hover = 0, hoverTarget = 0;
  let clickSpin = null; // {from, to, t0}
  let sweepStart = performance.now() + 600;
  const SWEEP_DUR = 1300;
  function triggerSweep() { if (o.shimmer && !reduceMotion) sweepStart = performance.now(); }
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();

  function hitTest(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    return raycaster.intersectObject(logo).length > 0;
  }

  function onWindowMove(e) {
    if (!o.followPointer || dragging) return;
    tiltTarget.y = ((e.clientX / window.innerWidth) * 2 - 1) * o.tiltStrength;
    tiltTarget.x = ((e.clientY / window.innerHeight) * 2 - 1) * o.tiltStrength * 0.6;
    requestRender();
  }
  function onCanvasMove(e) {
    if (dragging) {
      const now = performance.now(), dt = Math.max(1, now - lastT);
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      spinY += dx * 0.01; spinX += dy * 0.006;
      spinX = THREE.MathUtils.clamp(spinX, -0.9, 0.6);
      velY = (dx * 0.01) / dt * 16; velX = (dy * 0.006) / dt * 16;
      lastX = e.clientX; lastY = e.clientY; lastT = now;
      requestRender();
      return;
    }
    const over = hitTest(e);
    if (over && !hoverTarget) triggerSweep();
    hoverTarget = over ? 1 : 0;
    canvas.style.cursor = over ? (o.drag ? 'grab' : 'pointer') : '';
    requestRender();
  }
  function onDown(e) {
    if (!o.drag && !o.clickSpin) return;
    if (!hitTest(e)) return;
    dragging = o.drag; moved = 0; clickSpin = null;
    lastX = e.clientX; lastY = e.clientY; lastT = performance.now();
    velX = velY = 0;
    if (dragging) { canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; }
    canvas._downOnLogo = true;
  }
  function onUp(e) {
    const wasDown = canvas._downOnLogo; canvas._downOnLogo = false;
    if (dragging) { dragging = false; canvas.style.cursor = 'grab'; try { canvas.releasePointerCapture(e.pointerId); } catch (_) {} }
    if (wasDown && moved < 6 && o.clickSpin) startClickSpin();
    requestRender();
  }
  function onLeave() { hoverTarget = 0; if (!dragging) canvas.style.cursor = ''; requestRender(); }
  function startClickSpin() {
    velX = velY = 0;
    triggerSweep();
    clickSpin = { from: spinY, to: spinY + Math.PI * 2, t0: performance.now(), dur: reduceMotion ? 0 : 1100 };
  }
  function onKey(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startClickSpin(); requestRender(); } }

  window.addEventListener('pointermove', onWindowMove, { passive: true });
  canvas.addEventListener('pointermove', onCanvasMove);
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  canvas.addEventListener('pointerleave', onLeave);
  if (o.clickSpin) { canvas.tabIndex = 0; canvas.addEventListener('keydown', onKey); }

  // ---------- loop (pauses when off screen) ----------
  let visible = true, raf = 0, running = false;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) requestRender(); });
  io.observe(container);
  const easeOut = t => 1 - Math.pow(1 - t, 4);

  function requestRender() {
    if (!running && visible) { running = true; raf = requestAnimationFrame(frame); }
  }
  function frame(now) {
    running = false;
    const t = now / 1000;

    // pointer tilt (smoothed)
    tilt.x += (tiltTarget.x - tilt.x) * 0.08;
    tilt.y += (tiltTarget.y - tilt.y) * 0.08;

    // spin: click animation, inertia, or ease back to rest
    if (clickSpin) {
      const k = clickSpin.dur ? Math.min(1, (now - clickSpin.t0) / clickSpin.dur) : 1;
      spinY = clickSpin.from + (clickSpin.to - clickSpin.from) * easeOut(k);
      if (k >= 1) { spinY = clickSpin.to; clickSpin = null; }
    } else if (!dragging) {
      spinY += velY; spinX += velX;
      velY *= 0.94; velX *= 0.9;
      if (o.autoRotate && !reduceMotion && Math.abs(velY) < 0.02) {
        // continuous spin; a drag or a click just adds to it
        spinY += o.autoRotate * Math.min(0.05, (now - (frame.last || now)) / 1000);
        spinX += (rest.x - spinX) * 0.06;
      } else if (Math.abs(velY) < 0.0008 && Math.abs(velX) < 0.0008) {
        velX = velY = 0;
        // settle to the nearest resting turn
        const turns = Math.round((spinY - rest.y) / (Math.PI * 2));
        const targetY = rest.y + turns * Math.PI * 2;
        spinY += (targetY - spinY) * 0.06;
        spinX += (rest.x - spinX) * 0.06;
      }
    }

    hover += (hoverTarget - hover) * 0.12;
    const floatY = (o.float && !reduceMotion) ? Math.sin(t * 1.3) * 0.12 : 0;
    const sway = (o.float && !reduceMotion) ? Math.sin(t * 0.6) * 0.05 : 0;

    pivot.rotation.set(tilt.x, tilt.y + sway, 0);
    pivot.position.y = floatY + hover * 0.15;
    spinner.rotation.set(spinX, spinY, 0);
    const s = 1 + hover * 0.05;
    spinner.scale.set(s, s, s);
    front.emissiveIntensity = 0.35 + hover * 0.12;

    // light sweep
    if (o.shimmer && !reduceMotion) {
      let k = (now - sweepStart) / SWEEP_DUR;
      if (k > 1 + (o.shimmerEvery * 1000 - SWEEP_DUR) / SWEEP_DUR) { sweepStart = now; k = 0; }
      sweep.pos.value = k >= 0 && k <= 1 ? -7.5 + 15 * (k * k * (3 - 2 * k)) : -99;
    }
    // travelling highlights
    if (o.movingLights) {
      const a = reduceMotion ? 0.8 : t * 0.7, b = reduceMotion ? 2.4 : -t * 0.45 + 2;
      orbitA.position.set(Math.cos(a) * 9, 3 + Math.sin(a * 1.3) * 2.5, 4 + Math.sin(a) * 4);
      orbitB.position.set(Math.cos(b) * 8, -2 + Math.sin(b) * 2, 5 + Math.cos(b) * 3);
      cursorLight.position.set(tilt.y * 22, -tilt.x * 22 + 1.5, 7);
    }

    if (shadowMesh) {
      const lift = floatY + hover * 0.15;
      shadowMesh.material.opacity = 0.9 - lift * 0.8;
      const ss = 1 - lift * 0.15; shadowMesh.scale.set(ss, ss, ss);
    }

    renderer.render(scene, camera);
    frame.last = now;

    const settling = dragging || clickSpin || Math.abs(velY) > 0 ||
      Math.abs(tiltTarget.x - tilt.x) > 0.0005 || Math.abs(tiltTarget.y - tilt.y) > 0.0005 ||
      Math.abs(hoverTarget - hover) > 0.001 ||
      Math.abs(spinX - rest.x) > 0.001 ||
      Math.abs(rest.y + Math.round((spinY - rest.y) / (Math.PI * 2)) * Math.PI * 2 - spinY) > 0.001;
    const ambient = !reduceMotion && (o.float || o.shimmer || o.movingLights);
    if (visible && (ambient || settling)) requestRender();
  }

  resize();
  requestRender();

  return {
    canvas,
    spin: () => { startClickSpin(); requestRender(); },
    destroy() {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onWindowMove);
      geo.dispose(); front.dispose(); side.dispose(); envTex.dispose(); pmrem.dispose();
      if (shadowMesh) { shadowMesh.geometry.dispose(); shadowMesh.material.map.dispose(); shadowMesh.material.dispose(); }
      renderer.dispose(); canvas.remove();
    },
  };
}

window.mountKzLogo = function (container, options) { return createKzLogo(window.THREE, container, options); };
})();
