// One Arise — golden particle field (Three.js)
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';

const canvas = document.getElementById('gl');
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
const mobile = innerWidth < 760;

let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' }); }
catch (e) { canvas.classList.add('nogl'); throw e; }
renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 200);
camera.position.set(0, 0, 12);

const U = { uTime: { value: 0 }, uScroll: { value: 0 }, uPix: { value: renderer.getPixelRatio() }, uFade: { value: 1 }, uMouse: { value: new THREE.Vector2() } };

/* ---------- streams: dots flowing in a funnel toward a glowing core ---------- */
const STREAMS = mobile ? 56 : 96, PER = mobile ? 70 : 110;
const n = STREAMS * PER;
const aAng = new Float32Array(n), aOff = new Float32Array(n), aRnd = new Float32Array(n), aRed = new Float32Array(n);
for (let s = 0; s < STREAMS; s++) {
  const ang = (s / STREAMS) * Math.PI * 2 + Math.random() * 0.04;
  const red = Math.random() < 0.18 ? 1 : 0;
  for (let p = 0; p < PER; p++) {
    const i = s * PER + p;
    aAng[i] = ang; aOff[i] = p / PER + Math.random() * 0.004; aRnd[i] = Math.random(); aRed[i] = red;
  }
}
const sg = new THREE.BufferGeometry();
sg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
sg.setAttribute('aAng', new THREE.BufferAttribute(aAng, 1));
sg.setAttribute('aOff', new THREE.BufferAttribute(aOff, 1));
sg.setAttribute('aRnd', new THREE.BufferAttribute(aRnd, 1));
sg.setAttribute('aRed', new THREE.BufferAttribute(aRed, 1));

const streamMat = new THREE.ShaderMaterial({
  uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  vertexShader: `
    uniform float uTime, uScroll, uPix;
    attribute float aAng, aOff, aRnd, aRed;
    varying float vA; varying float vRed;
    void main(){
      float t = fract(aOff - uTime*0.045);           // 0 = core (far), 1 = near camera
      float e = t*t;
      float r = mix(0.25, 16.0, e) * (1.0 + uScroll*0.6);
      float a = aAng + t*1.25 + sin(uTime*0.25 + aAng*3.0)*0.08*t;
      vec3 p = vec3(cos(a)*r, sin(a)*r*0.62, mix(-38.0, 11.0, t) + uScroll*10.0);
      p.y += sin(t*6.0 + uTime*0.6 + aAng)*0.35*t;
      vec4 mv = modelViewMatrix * vec4(p,1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = (1.3 + aRnd*1.9) * uPix * (15.0 / -mv.z);
      vA = smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.85, 1.0, t)) * (0.6 + aRnd*0.4);
      vRed = aRed;
    }`,
  fragmentShader: `
    uniform float uFade; varying float vA; varying float vRed;
    void main(){
      float d = length(gl_PointCoord-0.5);
      float m = smoothstep(0.5, 0.0, d);
      vec3 gold = vec3(0.95,0.78,0.40); vec3 red = vec3(0.55,0.72,0.95);
      gl_FragColor = vec4(mix(gold, red, vRed), m*vA*uFade);
    }`
});
scene.add(new THREE.Points(sg, streamMat));

/* ---------- dust nebula ---------- */
const DN = mobile ? 900 : 2200;
const dp = new Float32Array(DN * 3), dr = new Float32Array(DN), dc = new Float32Array(DN);
for (let i = 0; i < DN; i++) {
  const R = 4 + Math.pow(Math.random(), 0.7) * 34, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
  dp[i * 3] = R * Math.sin(ph) * Math.cos(th); dp[i * 3 + 1] = R * Math.sin(ph) * Math.sin(th) * 0.7; dp[i * 3 + 2] = -R * Math.abs(Math.cos(ph)) - 4;
  dr[i] = Math.random(); dc[i] = Math.random() < 0.25 ? 1 : 0;
}
const dg = new THREE.BufferGeometry();
dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
dg.setAttribute('aRnd', new THREE.BufferAttribute(dr, 1));
dg.setAttribute('aRed', new THREE.BufferAttribute(dc, 1));
const dustMat = new THREE.ShaderMaterial({
  uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  vertexShader: `
    uniform float uTime, uPix, uScroll; attribute float aRnd, aRed; varying float vA; varying float vRed;
    void main(){
      vec3 p = position;
      float a = uTime*0.02*(0.4+aRnd);
      p.xz = mat2(cos(a),-sin(a),sin(a),cos(a))*p.xz;
      p.y += sin(uTime*0.3 + aRnd*20.0)*0.3;
      p.z += uScroll*6.0;
      vec4 mv = modelViewMatrix*vec4(p,1.0);
      gl_Position = projectionMatrix*mv;
      gl_PointSize = (0.8+aRnd*2.2)*uPix*(16.0/-mv.z);
      vA = (0.25+0.75*abs(sin(uTime*0.8+aRnd*40.0)))*0.38; vRed=aRed;
    }`,
  fragmentShader: `
    uniform float uFade; varying float vA; varying float vRed;
    void main(){ float d=length(gl_PointCoord-0.5); float m=smoothstep(0.5,0.0,d);
      gl_FragColor=vec4(mix(vec3(1.0,0.86,0.55),vec3(0.50,0.68,0.92),vRed), m*vA*uFade); }`
});
scene.add(new THREE.Points(dg, dustMat));

/* ---------- glowing core + light streaks (sprites) ---------- */
function glowTex(stops) {
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128); stops.forEach(([o, col]) => g.addColorStop(o, col));
  x.fillStyle = g; x.fillRect(0, 0, 256, 256); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const coreTex = glowTex([[0, 'rgba(255,240,200,1)'], [0.12, 'rgba(243,200,110,.85)'], [0.4, 'rgba(212,140,55,.25)'], [1, 'rgba(0,0,0,0)']]);
const redTex = glowTex([[0, 'rgba(52,96,170,.55)'], [0.5, 'rgba(26,52,110,.18)'], [1, 'rgba(0,0,0,0)']]);
const mkSprite = (tex, s, z, op) => { const m = new THREE.SpriteMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: op }); const sp = new THREE.Sprite(m); sp.scale.set(s, s, 1); sp.position.z = z; scene.add(sp); return sp; };
const halo = mkSprite(redTex, 60, -40, 0.9);
const core = mkSprite(coreTex, 14, -36, 1);
const core2 = mkSprite(coreTex, 34, -38, 0.35);
// warm nebula fog clouds
const fogTex = glowTex([[0, 'rgba(24,48,96,.22)'], [0.5, 'rgba(18,36,80,.09)'], [1, 'rgba(0,0,0,0)']]);
const fogs = [];
for (let i = 0; i < 7; i++) { const f = mkSprite(i % 3 === 0 ? redTex : fogTex, 26 + Math.random() * 30, -20 - Math.random() * 20, 0.5); f.userData = { x: (Math.random() - .5) * 40, y: (Math.random() - .5) * 20, ph: Math.random() * 6 }; fogs.push(f); }

// streaks: thin stretched sprites drifting
const streakTex = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 16; const x = c.getContext('2d'); const g = x.createLinearGradient(0, 0, 256, 0); g.addColorStop(0, 'rgba(255,220,150,0)'); g.addColorStop(.5, 'rgba(255,225,160,.9)'); g.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = g; x.fillRect(0, 6, 256, 4); const t = new THREE.CanvasTexture(c); return t; })();
const streaks = [];
for (let i = 0; i < (mobile ? 6 : 12); i++) {
  const m = new THREE.SpriteMaterial({ map: streakTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0, rotation: Math.random() * Math.PI });
  const s = new THREE.Sprite(m); s.scale.set(4 + Math.random() * 6, 0.25, 1);
  s.userData = { ph: Math.random() * 10, sp: 0.15 + Math.random() * 0.25, x: (Math.random() - .5) * 24, y: (Math.random() - .5) * 14, z: -6 - Math.random() * 20 };
  scene.add(s); streaks.push(s);
}

/* ---------- interaction ---------- */
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
addEventListener('pointermove', e => { mouse.tx = (e.clientX / innerWidth - .5) * 2; mouse.ty = (e.clientY / innerHeight - .5) * 2; }, { passive: true });
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });

let scrollP = 0, fade = 1, visible = true;
window.__gl = {
  setScroll(p) { scrollP = p; },
  setFade(f) { fade = f; }
};
document.addEventListener('visibilitychange', () => visible = !document.hidden);

const clock = new THREE.Clock();
let t = 0;
function frame() {
  requestAnimationFrame(frame);
  if (!visible) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  t += reduce ? 0 : dt;
  mouse.x += (mouse.tx - mouse.x) * 0.04; mouse.y += (mouse.ty - mouse.y) * 0.04;
  U.uTime.value = t;
  U.uScroll.value += (scrollP - U.uScroll.value) * 0.08;
  U.uFade.value += (fade - U.uFade.value) * 0.08;
  camera.position.x = mouse.x * 1.4; camera.position.y = -mouse.y * 0.9;
  camera.lookAt(0, 3.2, -30);
  const pulse = 1 + Math.sin(t * 1.4) * 0.06;
  core.scale.setScalar(7 * pulse * (1 + U.uScroll.value * 0.8));
  core.material.opacity = 0.30 * U.uFade.value; core2.material.opacity = 0.08 * U.uFade.value; halo.material.opacity = 0.40 * U.uFade.value;
  core.position.z = core2.position.z = -36 + U.uScroll.value * 14;
  fogs.forEach(f => { const u = f.userData; f.position.x = u.x + Math.sin(t * 0.07 + u.ph) * 3; f.position.y = u.y + Math.cos(t * 0.05 + u.ph) * 2; f.material.opacity = 0.4 * U.uFade.value; });
  streaks.forEach(s => {
    const u = s.userData, k = (t * u.sp + u.ph) % 6;
    s.material.opacity = Math.max(0, Math.sin(k / 6 * Math.PI)) * 0.18 * U.uFade.value;
    s.position.set(u.x + k * 0.8, u.y + k * 0.25, u.z + U.uScroll.value * 6);
  });
  renderer.render(scene, camera);
}
frame();
canvas.classList.add('on');
