function SpHero({ onNav, acc }) {
  // Gold hero: the WHYKINGS helm + a glowing brain as a pointer-reactive WebGL
  // background (desktop: full-bleed behind the text; phone: a band above the text).
  // The gold image is resolved via window.R so it works from /sparring-1-1/.
  // The static <img> of the same gold image is the fallback (no WebGL, reduced motion)
  // and bridges the load; the canvas fades in once its texture is ready.
  const secRef = React.useRef(null);
  const mediaRef = React.useRef(null);
  const cvRef = React.useRef(null);
  const gold = (acc && acc.main) || '#C9B27F';
  const GOLD = (typeof window !== 'undefined' && window.R) ? window.R('assets/hero-gold.webp') : 'assets/hero-gold.webp';
  const facts = [
    ['60 Minuten', 'pro Session'],
    ['4 Sessions', 'pro Vertragsmonat'],
    ['Online oder München', 'Face to Face'],
    ['3 Monate', 'Initialmandat · das Minimum'],
  ];

  // Which part of the gold image is shown ("window", as fractions of the image):
  //  - desktop: the animation fills the whole hero, slightly zoomed out
  //  - band layout (phone + tablet, ≤ 980px = the page's own single-column breakpoint):
  //    always the same window — the whole helm, ~48 % of the image width — whatever the
  //    band's shape is.
  // The WebGL shader and the static <img> both derive their framing from this one
  // function, so the picture never jumps when the canvas fades in.
  const IMG_AR = 1983 / 793, BAND_WINDOW = 0.476, BAND_FOCUS = 0.72, DESK_ZOOM = 1.08, DESK_FOCUS = 0.57;
  function viewWindow(r) {
    const band = window.innerWidth <= 980;
    const ra = r.width / r.height;
    const base = ra > IMG_AR ? 1 : ra / IMG_AR;               // cover: fraction of the image width shown at zoom 1
    const zoom = band ? BAND_WINDOW / base : DESK_ZOOM;
    const sx = base * zoom, sy = (ra > IMG_AR ? IMG_AR / ra : 1) * zoom;
    const want = band ? BAND_FOCUS : DESK_FOCUS;
    const cx = sx >= 1 ? 0.5 : Math.min(Math.max(want, sx / 2), 1 - sx / 2);   // never look past the image edge
    return { zoom, sx, sy, cx };
  }

  // Static fallback <img> (no WebGL / reduced motion / until the canvas fades in).
  React.useEffect(function () {
    const media = mediaRef.current;
    const img = media && media.querySelector('img');
    if (!img) return;
    function fit() {
      const r = media.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const w = viewWindow(r), W = r.width / w.sx, H = r.height / w.sy;
      img.style.cssText = 'position:absolute;max-width:none;width:' + W + 'px;height:' + H + 'px;left:' +
        (r.width / 2 - w.cx * W) + 'px;top:' + (r.height / 2 - 0.5 * H) + 'px;';
    }
    fit();
    window.addEventListener('resize', fit);
    return function () { window.removeEventListener('resize', fit); };
  }, []);

  React.useEffect(function () {
    const hero = secRef.current, media = mediaRef.current, cv = cvRef.current;
    if (!hero || !media || !cv) return;
    const RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (RM) return;
    let gl = null;
    try {
      gl = cv.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' })
        || cv.getContext('experimental-webgl');
    } catch (e) {}
    if (!gl) return;

    const FRAG = `precision highp float;varying vec2 vUv;uniform sampler2D uTex;uniform vec2 uRes,uImg,uM;uniform float uV,uT,uFocus,uScroll,uMob,uZoom;
vec2 cover(vec2 uv){float ra=uRes.x/uRes.y,ia=uImg.x/uImg.y;vec2 s=(ra>ia?vec2(1.,ia/ra):vec2(ra/ia,1.))*uZoom;
 float cx=s.x>=1.?.5:clamp(uFocus,s.x*.5,1.-s.x*.5);float cy=.5;return (uv-.5)*s+vec2(cx,cy);}
void main(){vec2 uv=vUv;vec2 asp=vec2(uRes.x/uRes.y,1.);
 vec2 d=(uv-uM)*asp;float r=length(d);
 float ring=sin(r*38.-uT*2.4)*exp(-r*4.5)*uV;
 vec2 dir=r>.0001?d/r:vec2(0.);
 vec2 off=dir*ring*.022/asp;
 off+=vec2(sin(uv.y*9.+uT*.6),cos(uv.x*7.-uT*.5))*.0016;
 uv=(uv-.5)*(1.-uScroll*.06)+.5;
 vec2 c=cover(uv);
 float ca=.0006+abs(ring)*.006;
 vec3 col;col.r=texture2D(uTex,c+off+dir*ca/asp).r;col.g=texture2D(uTex,c+off).g;col.b=texture2D(uTex,c+off-dir*ca/asp).b;
 float spot=exp(-r*r*16.)*(.10+uV*.5);col+=vec3(.95,.78,.45)*spot*.55;
 float vig=smoothstep(1.2,.2,length((vUv-.5)*vec2(1.,.8)));col*=mix(.6,1.,vig);
 gl_FragColor=vec4(col,1.);}`;
    const VERT = 'attribute vec2 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}';
    function sh(type, src) { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; }
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]), gl.STATIC_DRAW);
    const pl = gl.getAttribLocation(prog, 'position'), ul = gl.getAttribLocation(prog, 'uv');
    gl.enableVertexAttribArray(pl); gl.vertexAttribPointer(pl, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(ul); gl.vertexAttribPointer(ul, 2, gl.FLOAT, false, 16, 8);
    const U = {}; ['uTex', 'uRes', 'uImg', 'uM', 'uV', 'uT', 'uFocus', 'uScroll', 'uMob', 'uZoom'].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
    const tex = gl.createTexture(); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(U.uTex, 0);

    let imgW = 1983, imgH = 793, ready = false, raf = 0, running = false, visible = true, zoom = 1.08, focus = .57;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    // The canvas covers the media area (the full hero on desktop, the top band on phones/tablets).
    function size() {
      const r = media.getBoundingClientRect();
      cv.width = Math.max(1, Math.round(r.width * dpr)); cv.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, cv.width, cv.height);
      const w = viewWindow(r); zoom = w.zoom; focus = w.cx;
    }
    size();
    let tx = .57, ty = .5, mx = .57, my = .5, vel = 0, lx = .57, ly = .5, lastMove = 0;
    function onMove(e) {
      const r = media.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      const x = (e.clientX - r.left) / r.width, y = 1 - (e.clientY - r.top) / Math.max(1, Math.min(r.height, window.innerHeight));
      const dx = x - lx, dy = y - ly; vel = Math.min(1, vel + Math.hypot(dx, dy) * 6); lx = x; ly = y; tx = x; ty = y; lastMove = performance.now();
    }
    let tmo = 0; function onMoveT(e) { if (tmo) return; tmo = setTimeout(function () { tmo = 0; }, 16); onMove(e); }
    function frame(now) {
      raf = 0; if (!running) return; const t2 = now / 1000;
      if (now - lastMove > 2500) { tx = .57 + Math.sin(t2 * .3) * .1; ty = .5 + Math.cos(t2 * .27) * .1; vel = Math.max(vel, .12); }
      mx += (tx - mx) * .08; my += (ty - my) * .08; vel *= .94;
      gl.uniform2f(U.uRes, cv.width, cv.height); gl.uniform2f(U.uImg, imgW, imgH); gl.uniform2f(U.uM, mx, my);
      gl.uniform1f(U.uV, vel); gl.uniform1f(U.uT, t2);
      gl.uniform1f(U.uFocus, focus); gl.uniform1f(U.uZoom, zoom); gl.uniform1f(U.uMob, 0);
      gl.uniform1f(U.uScroll, Math.min(1, Math.max(0, (window.scrollY || 0) / Math.max(1, hero.offsetHeight))));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    }
    function start() { if (running || !ready || !visible || document.hidden) return; running = true; raf = requestAnimationFrame(frame); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
    const im = new Image();
    im.onload = function () { gl.bindTexture(gl.TEXTURE_2D, tex); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im); imgW = im.naturalWidth || imgW; imgH = im.naturalHeight || imgH; ready = true; hero.classList.add('gl-on'); cv.style.opacity = '1'; start(); };
    im.src = GOLD;
    window.addEventListener('pointermove', onMoveT, { passive: true });
    window.addEventListener('resize', size);
    let io = null;
    if (window.IntersectionObserver) { io = new IntersectionObserver(function (en) { visible = en[0].isIntersecting; visible ? start() : stop(); }, { threshold: 0 }); io.observe(hero); }
    function vis() { document.hidden ? stop() : start(); }
    document.addEventListener('visibilitychange', vis);
    cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); stop(); cv.style.opacity = '0'; });
    return function () {
      stop(); window.removeEventListener('pointermove', onMoveT); window.removeEventListener('resize', size);
      document.removeEventListener('visibilitychange', vis); if (io) io.disconnect(); hero.classList.remove('gl-on');
    };
  }, []);

  return (
    <section id="top" ref={secRef} data-screen-label="Hero" data-gold-hero="1" className="gh-hero">
      <style>{`
        .gh-hero { position: relative; background: #0b0a09; color: #fff; overflow: hidden; min-height: min(88vh, 780px); display: flex; flex-direction: column; }
        .gh-media { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .gh-media img, .gh-media canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
        .gh-media img { object-fit: cover; object-position: 70% 50%; }
        .gh-media canvas { opacity: 0; transition: opacity .6s ease; }
        .gh-shade { position: absolute; inset: 0; z-index: 1; background: linear-gradient(90deg, rgba(11,10,9,.97) 0%, rgba(11,10,9,.86) 26%, rgba(11,10,9,.32) 54%, rgba(11,10,9,0) 72%), linear-gradient(0deg, rgba(11,10,9,.8) 0%, rgba(11,10,9,0) 30%); }
        .gh-body { position: relative; z-index: 2; flex: 1; display: flex; align-items: center; }
        .gh-in { max-width: var(--container-xl); margin: 0 auto; padding: 110px 40px 64px; width: 100%; }
        .gh-facts { position: relative; z-index: 2; border-top: 1px solid rgba(255,255,255,.14); background: rgba(11,10,9,.55); backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px); }
        @media (max-width: 980px) {
          /* phone + tablet: the animation becomes a band above the text, so the whole helm stays visible and the copy stays readable */
          .gh-hero { min-height: 0; }
          .gh-media, .gh-shade { inset: 0 0 auto 0; height: min(50svh, 420px); }
          .gh-media img { object-position: 72% 50%; }
          .gh-shade { background: linear-gradient(0deg, #0b0a09 0%, rgba(11,10,9,0) 38%), linear-gradient(180deg, #0b0a09 0%, #0b0a09 13%, rgba(11,10,9,0) 36%); }
          .gh-in { padding: calc(min(50svh, 420px) - 18px) 26px 40px; }
        }
      `}</style>
      <div ref={mediaRef} aria-hidden="true" className="gh-media">
        <img src={GOLD} alt="" />
        <canvas ref={cvRef} />
      </div>
      <div aria-hidden="true" className="gh-shade" />

      <div className="gh-body">
        <div className="gh-in">
          <div style={{ maxWidth: 600 }}>
            <div className="twk-overline" style={{ color: gold }}>Leadership Sparring 1:1</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.95rem, 4.6vw, 3.5rem)', lineHeight: 1.04, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', margin: '18px 0 24px', overflowWrap: 'normal' }}>
              <span style={{ display: 'block' }}>Coachingimpulse,</span>
              <span style={{ display: 'block' }}>die Führung <span style={{ color: gold }}>verändern.</span></span>
            </h1>
            <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.80)', maxWidth: 560, marginBottom: 22 }}>
              Ein vertrauliches Mandat für Geschäftsführer:innen und Senior Leader, die unter Druck klar entscheiden, eigene Muster erkennen und Führung so trainieren wollen, dass sie im Alltag trägt.
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 34, color: 'rgba(255,255,255,0.62)', fontSize: 15.5, maxWidth: 560 }}>
              <span style={{ flex: 'none', width: 28, height: 1, background: 'rgba(255,255,255,0.3)', alignSelf: 'center' }}></span>
              <span>Keine Bühne. Kein fertiges Curriculum. Deine reale Situation bestimmt, woran wir arbeiten.</span>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Button variant={acc.btn} size="lg" onClick={() => onNav('kontakt')} iconRight={<span style={{ fontSize: 18 }}>→</span>}>Kennenlernen anfragen</Button>
              <Button variant="secondary" size="lg" onClick={() => onNav('ablauf')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.28)', background: 'transparent' }}>So läuft das Mandat ab</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="gh-facts">
        <div className="sp-facts" style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '26px 40px 30px' }}>
          {facts.map(([k, v], i) => (
            <div key={k} className="sp-fact" style={{ borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.14)', paddingLeft: i === 0 ? 0 : 28 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{k}</div>
              <div style={{ fontSize: 13.5, color: gold, marginTop: 4, letterSpacing: '0.04em' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.SpHero = SpHero;
