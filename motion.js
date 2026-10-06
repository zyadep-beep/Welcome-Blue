/* ===== One Arise — motion (GSAP + ScrollTrigger + SplitText + Lenis) ===== */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const isAr = () => document.documentElement.lang === 'ar';
  const html = document.documentElement;
  const hasG = !!(window.gsap && window.ScrollTrigger);
  if (hasG) { try { ScrollTrigger.config({ ignoreMobileResize: true }); } catch (e) {} }

  function finishLoader() { const l = $('#loader'); if (l) l.classList.add('gone'); html.classList.remove('is-loading'); html.classList.add('is-ready'); }
  if (!hasG || reduce) { finishLoader(); $$('.h-fade').forEach(e => e.style.opacity = 1); $$('.cnt').forEach(e => e.textContent = e.dataset.to); return; }

  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href'); if (id.length < 2) { if (lenis) { e.preventDefault(); lenis.scrollTo(0); } return; }
    const t = $(id); if (!t) return; e.preventDefault();
    lenis ? lenis.scrollTo(t, { offset: -20, duration: 1.6 }) : t.scrollIntoView({ behavior: 'smooth' });
  });
  document.addEventListener('modalopen', () => lenis && lenis.stop());
  document.addEventListener('modalclose', () => lenis && lenis.start());

  /* ---------- nav roll links ---------- */
  function rollLinks() { $$('.roll').forEach(a => { const t = a.textContent; a.innerHTML = `<span class="rl"><span>${t}</span><span>${t}</span></span>`; }); }

  /* ---------- preloader ---------- */
  gsap.set('.h-fade', { opacity: 0, y: 24 });
  const num = $('#ldNum'), cnt = { v: 0 };
  let loaded = document.readyState === 'complete';
  addEventListener('load', () => loaded = true);
  const ld = gsap.timeline();
  ld.to('.ld-word span', { y: 0, duration: 1, stagger: 0.06, ease: 'expo.out' }, 0.1)
    .fromTo('.ld-mark', { opacity: 0, scale: .8, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'expo.out' }, 0.1)
    .to(cnt, { v: 100, duration: 2, ease: 'power2.inOut', onUpdate: () => num.textContent = Math.round(cnt.v) }, 0);
  ld.eventCallback('onComplete', () => {
    const go = () => {
      const out = gsap.timeline({ onComplete: () => { finishLoader(); lenis && lenis.start(); ScrollTrigger.refresh(); } });
      out.to('.ld-in, .ld-count', { opacity: 0, y: -30, duration: .6, ease: 'power3.in' })
        .to('.ld-curtain', { scaleY: 1, duration: .7, ease: 'expo.inOut' }, '-=.2')
        .set('.loader', { background: 'transparent' })
        .to('.ld-curtain', { scaleY: 0, transformOrigin: 'top', duration: .8, ease: 'expo.inOut' })
        .add(() => { html.classList.add('is-ready'); heroIntro(); }, '-=.55');
    };
    if (loaded) go(); else { const iv = setInterval(() => { if (loaded) { clearInterval(iv); go(); } }, 100); setTimeout(() => { clearInterval(iv); if (!loaded) { loaded = true; go(); } }, 4000); }
  });

  /* ---------- split helpers ---------- */
  let splits = [];
  function splitWords(el) {
    const s = new SplitText(el, { type: 'words', wordsClass: 'w', mask: 'words' });
    splits.push(s); return s;
  }
  function heroIntro() {
    const h = $('#heroH');
    const parts = [];
    $$('.l1, .l2', h).forEach(el => {
      const s = isAr() ? new SplitText(el, { type: 'words', wordsClass: 'w', mask: 'words' }) : new SplitText(el, { type: 'chars,words', charsClass: 'c', wordsClass: 'w', mask: 'chars' });
      splits.push(s); parts.push(isAr() ? s.words : s.chars);
    });
    const tl = gsap.timeline();
    parts.forEach((p, i) => tl.from(p, { yPercent: 115, rotate: isAr() ? 0 : 8, duration: 1.3, stagger: isAr() ? 0.08 : 0.025, ease: 'expo.out' }, i * 0.18));
    tl.to('.h-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, 0.5);
  }

  /* ---------- scroll scenes ---------- */
  let ctx;
  function build() {
    ctx = gsap.context(() => {
      // hero → GL camera dolly + hero content parallax
      ScrollTrigger.create({ trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true,
        onUpdate: s => { window.__gl && window.__gl.setScroll(s.progress); } });
      gsap.to('.hero-in', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
      // GL fade per section
      const fadeAt = (sel, f) => ScrollTrigger.create({ trigger: sel, start: 'top 60%', end: 'bottom 40%', onToggle: s => s.isActive && window.__gl && window.__gl.setFade(f) });
      fadeAt('#hero', 1); fadeAt('#tri', 0.2); fadeAt('#about', 0.3); fadeAt('#services', 0.25); fadeAt('#demo', 0.15); fadeAt('#process', 0.55); fadeAt('#results', 0.8); fadeAt('#contact', 0.4);

      // triptych
      triptych();

      // statement words scrub
      const st = splitWords($('#stText'));
      gsap.set(st.words, { opacity: 0.32 });
      gsap.to(st.words, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '#stText', start: 'top 80%', end: 'bottom 45%', scrub: true } });

      // headings word reveal
      $$('.split-w').forEach(h => {
        const s = splitWords(h);
        gsap.from(s.words, { yPercent: 110, duration: 1.1, stagger: 0.05, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
      });

      // staircase
      const rows = $$('.st-row');
      rows.forEach((r, i) => {
        gsap.from(r, { x: (isAr() ? -1 : 1) * (120 + i * 40), opacity: 0, ease: 'power3.out', scrollTrigger: { trigger: r, start: 'top 95%', end: 'top 60%', scrub: 0.8 } });
        gsap.from($('.st-ic', r), { scale: 0, rotate: -90, ease: 'back.out(2)', duration: .8, scrollTrigger: { trigger: r, start: 'top 80%' } });
      });

      // marquee velocity
      const mq = $('#mq');
      let mqX = 0, vel = 0, dir = isAr() ? 1 : -1;
      gsap.set(mq, { animation: 'none' });
      const tick = () => { mqX += dir * (0.6 + Math.min(Math.abs(vel) / 40, 8)); const w = mq.scrollWidth / 2; if (Math.abs(mqX) > w) mqX = 0; gsap.set(mq, { x: mqX, skewX: gsap.utils.clamp(-12, 12, vel / -60) }); vel *= 0.9; };
      gsap.ticker.add(tick);
      ScrollTrigger.create({ trigger: '.marquee', start: 'top bottom', end: 'bottom top', onUpdate: s => { vel = s.getVelocity(); } });
      ctxTickers.push(tick);

      // horizontal process (desktop)
      const mm = gsap.matchMedia();
      mm.add('(min-width: 761px)', () => {
        const track = $('#hzTrack');
        const dist = () => Math.max(0, track.scrollWidth - innerWidth + 80);
        gsap.to(track, { x: () => (isAr() ? 1 : -1) * dist(), ease: 'none', scrollTrigger: { trigger: '#process', start: 'top top', end: () => '+=' + dist(), pin: '.hz-pin', scrub: 1, invalidateOnRefresh: true,
          onUpdate: s => gsap.set('#hzProg', { scaleX: s.progress }) } });
        $$('.hz-card').forEach(c => gsap.from($('.n', c), { yPercent: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '#process', start: 'top 40%' } }));
        $$('.hz-pic img').forEach(img => gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#process', start: 'top top', end: () => '+=' + dist(), scrub: true } }));
      });
      mm.add('(max-width: 760px)', () => {
        $('#hzTrack').style.cssText = 'flex-direction:column;width:auto';
        $$('.hz-card').forEach(c => gsap.from(c, { y: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 88%' } }));
        return () => { $('#hzTrack').style.cssText = ''; };
      });

      // big 24/7
      const bt = gsap.timeline({ scrollTrigger: { trigger: '.big-pin', start: 'top top', end: '+=120%', pin: true, scrub: 1 } });
      bt.fromTo('.big-num', { scale: 0.5, opacity: 0.5 }, { scale: 1, opacity: 1, ease: 'power2.out' })
        .fromTo('.big-cuts', { strokeWidth: 26 }, { strokeWidth: 7, ease: 'power2.out' }, 0)
        .fromTo('.big-fill', { attr: { y: 220 } }, { attr: { y: 0 }, ease: 'power2.inOut' }, 0)
        .from('.big-side.l', { x: () => -innerWidth * 0.3, opacity: 0, ease: 'power3.out' }, 0.25)
        .from('.big-side.r', { x: () => innerWidth * 0.3, opacity: 0, ease: 'power3.out' }, 0.25);
      ScrollTrigger.create({ trigger: '.nums', start: 'top 85%', once: true, onEnter: () => $$('.nums .cnt').forEach(e => window.countUp ? window.countUp(e) : (e.textContent = e.dataset.to)) });
      gsap.from('.nums > div', { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.nums', start: 'top 85%' } });

      // images parallax
      $$('.cta-img img').forEach(img => gsap.fromTo(img, { scale: 1.2, yPercent: -6 }, { scale: 1.05, yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
      gsap.from('.cta-img', { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: '.cta-img', start: 'top 80%' } });

      // demo container lift
      gsap.from('.phone, .panel', { y: 80, opacity: 0, rotateX: 8, transformPerspective: 1200, duration: 1.3, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.demo', start: 'top 85%' } });

      // bottom bar progress + active tag
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => gsap.set('#prog', { scaleX: s.progress }) });
      const tags = $$('.bb-tags span');
      [['#hero', 0], ['#services', 1], ['#demo', 0], ['#process', 2], ['#results', 3]].forEach(([sel, i]) => ScrollTrigger.create({ trigger: sel, start: 'top 50%', end: 'bottom 50%', onToggle: s => { if (s.isActive) tags.forEach((t, k) => t.classList.toggle('on', k === i)); } }));
    });
  }
  const ctxTickers = [];

  /* ---------- triptych ---------- */
  function triptych() {
    const stage = $('#triStage'), arches = $$('.arch', stage), imgs = arches.map(a => $('img', a));
    const st = { p: 0 };
    const lerp = (a, b, t) => a + (b - a) * t;
    function render() {
      const W = stage.clientWidth, H = stage.clientHeight, mob = W < 760;
      const w0 = mob ? W * 0.27 : Math.min(W * 0.17, 280), h0 = w0 * (mob ? 1.9 : 1.75), g0 = w0 * (mob ? 0.1 : 0.2);
      const e = gsap.parseEase('power2.inOut')(st.p);
      const w = lerp(w0, W / 3 + 1, e), h = lerp(h0, H, e), g = lerp(g0, 0, e), r = lerp(w0 / 2, 0, e);
      const total = 3 * w + 2 * g, x0 = (W - total) / 2, y = (H - h) / 2;
      arches.forEach((a, i) => {
        const x = x0 + i * (w + g);
        a.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${r}px ${r}px 0 0`;
        imgs[i].style.cssText = `width:${W}px;height:${H}px;left:${-x}px;top:${-y}px;transform:scale(${lerp(1.25, 1, e)})`;
      });
    }
    render();
    addEventListener('resize', render);
    const head = new SplitText('#triH > *', { type: 'words', wordsClass: 'w', mask: 'words' }); splits.push(head);
    const tl = gsap.timeline({ scrollTrigger: { trigger: '#tri', start: 'top top', end: '+=260%', pin: true, scrub: 1, anticipatePin: 1 } });
    tl.from(arches, { yPercent: 40, opacity: 0, stagger: 0.08, duration: 0.25, ease: 'power3.out' }, 0)
      .from(head.words, { yPercent: 110, stagger: 0.03, duration: 0.25, ease: 'power3.out' }, 0.05)
      .to('.arch-l', { opacity: 0, duration: 0.1 }, 0.42)
      .to(head.words, { yPercent: -110, stagger: 0.02, duration: 0.2, ease: 'power2.in' }, 0.45)
      .to(st, { p: 1, duration: 0.5, ease: 'none', onUpdate: render }, 0.4)
      .to('#triEnd', { opacity: 1, y: -20, duration: 0.2 }, 0.85)
      .to({}, { duration: 0.15 });
  }

  /* ---------- cursor + magnetic ---------- */
  function cursor() {
    if (!fine) return;
    document.body.classList.add('has-cursor');
    const c = $('.cursor'), dot = $('.c-dot'), ring = $('.c-ring'), lab = $('#cLabel');
    const xd = gsap.quickTo(dot, 'x', { duration: 0.1 }), yd = gsap.quickTo(dot, 'y', { duration: 0.1 });
    const xr = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' }), yr = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    addEventListener('pointermove', e => { xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY); });
    document.addEventListener('pointerover', e => {
      const l = e.target.closest('[data-cursor]'), h = e.target.closest('a,button,input,select,textarea,.chip,.tab');
      c.classList.toggle('label', !!(l && l.dataset.cursor)); if (l && l.dataset.cursor) lab.textContent = l.dataset.cursor;
      c.classList.toggle('hover', !!h && !(l && l.dataset.cursor));
    });
    // dialog sits in top layer; hide custom cursor while open
    document.addEventListener('modalopen', () => { c.style.opacity = 0; document.body.classList.remove('has-cursor'); });
    document.addEventListener('modalclose', () => { c.style.opacity = 1; document.body.classList.add('has-cursor'); });
    $$('.magnetic').forEach(m => {
      const xm = gsap.quickTo(m, 'x', { duration: 0.6, ease: 'elastic.out(1,.4)' }), ym = gsap.quickTo(m, 'y', { duration: 0.6, ease: 'elastic.out(1,.4)' });
      m.addEventListener('pointermove', e => { const r = m.getBoundingClientRect(); xm((e.clientX - r.left - r.width / 2) * 0.3); ym((e.clientY - r.top - r.height / 2) * 0.4); });
      m.addEventListener('pointerleave', () => { xm(0); ym(0); });
    });
  }

  /* ---------- Kuwait clock ---------- */
  function clock() {
    const el = $('#clock');
    const f = () => { try { el.textContent = 'KWT ' + new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuwait', hour: '2-digit', minute: '2-digit' }).format(new Date()); } catch (e) {} };
    f(); setInterval(f, 15000);
  }

  /* ---------- language rebuild ---------- */
  document.addEventListener('langbefore', () => {
    ctx && ctx.revert(); ctxTickers.splice(0).forEach(t => gsap.ticker.remove(t));
    splits.forEach(s => s.revert()); splits = [];
    gsap.set('.hero-in', { clearProps: 'all' });
  });
  document.addEventListener('langchange', () => {
    rollLinks();
    // re-split hero without intro delay
    $$('#heroH .l1, #heroH .l2').forEach(el => { const s = new SplitText(el, { type: 'words', wordsClass: 'w', mask: 'words' }); splits.push(s); gsap.from(s.words, { yPercent: 110, duration: 1, stagger: 0.06, ease: 'expo.out' }); });
    build(); ScrollTrigger.refresh();
  });

  rollLinks(); cursor(); clock();
  document.fonts && document.fonts.ready ? document.fonts.ready.then(build) : build();
})();
