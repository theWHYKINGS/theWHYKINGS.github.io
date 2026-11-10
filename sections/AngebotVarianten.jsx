function AngebotVariant({ variant, hover, items, acc, goTo }) {
  const hv = hover || 'Färbung';
  const mm = (e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px'); e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px'); };
  const iconSrc = (k) => window.R('assets/icons/icon-' + k + '.png');
  const cta = (s) => { const to = s.href || s.link; return to ? { as: 'a', href: to, target: s.href ? '_blank' : undefined, rel: s.href ? 'noopener noreferrer' : undefined } : { as: 'button', onClick: () => goTo('kontakt') }; };
  const Cta = ({ s, className, children, ...rest }) => { const p = cta(s); const Tag = p.as; const { as, ...r } = p; return <Tag className={className} aria-label={'Mehr erfahren: ' + s.tail} {...r} {...rest}>{children}</Tag>; };
  const rest = (s) => s.tail.replace(/^Leadership /, '');
  const head = (dark) => (
    <div style={{ marginBottom: 48, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '16px 56px', alignItems: 'end' }} className="ang-head">
      <div>
        <div className="twk-overline" style={{ color: dark ? 'var(--color-gold)' : acc.deep }}>03 / Leistungen</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', margin: '14px 0 0', letterSpacing: '-0.02em', color: dark ? '#fff' : undefined }}>Wie wir arbeiten können</h2>
      </div>
      <p style={{ font: 'var(--text-lead)', color: dark ? 'rgba(255,255,255,0.66)' : 'var(--color-fg-muted)', maxWidth: 480, margin: 0 }}>Drei Wege, ein Anspruch: Wirksamkeit statt nur nette Gespräche.</p>
    </div>
  );
  const css = `
.ang-head{} @media(max-width:860px){.ang-head{grid-template-columns:1fr!important}}
.ang-a{display:grid;grid-template-columns:64px minmax(0,1.1fr) minmax(0,1.3fr) 72px 44px;gap:0 40px;align-items:center;padding:36px 28px;border-top:1px solid rgba(255,255,255,.14);text-decoration:none;color:#fff;background:none;border-left:0;border-right:0;border-bottom:0;width:100%;text-align:left;font:inherit;cursor:pointer;position:relative;transition:background var(--dur-base) var(--ease-standard),padding var(--dur-base) var(--ease-standard)}
.ang-a:last-child{border-bottom:1px solid rgba(255,255,255,.14)}
.ang-a:hover,.ang-a:focus-visible{background:rgba(255,255,255,.05);padding-left:40px}
.ang-a:before{content:"";position:absolute;left:0;top:-1px;height:1px;width:0;background:var(--c);transition:width .5s var(--ease-standard)}
.ang-a:hover:before,.ang-a:focus-visible:before{width:100%}
.ang-a .arr{width:44px;height:44px;border:1px solid rgba(255,255,255,.28);border-radius:50%;display:grid;place-items:center;font-size:18px;transition:all var(--dur-base) var(--ease-standard)}
.ang-a:hover .arr,.ang-a:focus-visible .arr{background:var(--c);border-color:var(--c);transform:translateX(4px)}
@media(max-width:960px){.ang-a{grid-template-columns:48px minmax(0,1fr) 44px;gap:8px 20px;padding:28px 16px}.ang-a .a-claim{grid-column:2/3;grid-row:2}.ang-a .a-ico{display:none}.ang-a .arr{grid-column:3;grid-row:1/3}.ang-a:hover{padding-left:16px}}
.ang-b{display:flex;flex-direction:column;background:#fff;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);overflow:hidden;text-decoration:none;color:inherit;text-align:left;font:inherit;padding:0;cursor:pointer;transition:transform var(--dur-base) var(--ease-standard),box-shadow var(--dur-base) var(--ease-standard)}
[data-hv="Lift"] .ang-b:hover,[data-hv="Lift"] .ang-b:focus-visible{transform:translateY(-4px);box-shadow:0 18px 44px rgba(24,24,24,.14)}
.ang-b .stage:before{content:"";position:absolute;inset:0;opacity:0;transition:opacity .45s var(--ease-standard),transform .6s var(--ease-standard);pointer-events:none}
.ang-b .stage img,.ang-b .stage .no{position:relative}.ang-b .stage .no{position:absolute}
.ang-b .ttl2{background:linear-gradient(var(--c),var(--c)) 0 100%/0 2px no-repeat;transition:background-size .45s var(--ease-standard);padding-bottom:3px}
[data-hv="Fläche"] .ang-b .stage:before{background:var(--c);opacity:.0;transform:translateY(100%)}
[data-hv="Fläche"] .ang-b:hover .stage:before,[data-hv="Fläche"] .ang-b:focus-visible .stage:before{opacity:.2;transform:none}
[data-hv="Fläche"] .ang-b:hover .stage img{transform:scale(1.04)}
[data-hv="Ruhig"] .ang-b{transition:border-color var(--dur-base)}
[data-hv="Ruhig"] .ang-b:hover,[data-hv="Ruhig"] .ang-b:focus-visible{border-color:var(--c)}
[data-hv="Ruhig"] .ang-b:hover .stage img{transform:none}
[data-hv="Ruhig"] .ang-b:hover .ttl2,[data-hv="Ruhig"] .ang-b:focus-visible .ttl2{background-size:100% 2px}
[data-hv="Ruhig"] .ang-b .foot i{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;border:1px solid var(--neutral-300,#ccc);transition:all var(--dur-base) var(--ease-standard)}
[data-hv="Ruhig"] .ang-b:hover .foot i{background:var(--c);border-color:var(--c);color:#fff;transform:none}
[data-hv="Spotlight"] .ang-b .stage:before{background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--c) 38%,transparent),transparent 70%)}
[data-hv="Spotlight"] .ang-b:hover .stage:before,[data-hv="Spotlight"] .ang-b:focus-visible .stage:before{opacity:1}
[data-hv="Spotlight"] .ang-b:hover .stage img{transform:scale(1.03)}
[data-hv="Spotlight"] .ang-b:hover,[data-hv="Spotlight"] .ang-b:focus-visible{box-shadow:0 12px 32px rgba(24,24,24,.1)}
@media(prefers-reduced-motion:reduce){.ang-b *,.ang-b{transition:none!important}}
.ang-b .stage{position:relative;background:var(--neutral-900);height:240px;display:grid;place-items:center;overflow:hidden}
.ang-b .stage img{height:150px;width:auto;transition:transform .5s var(--ease-standard)}
.ang-b:hover .stage img{transform:scale(1.06)}
.ang-b .stage .no{position:absolute;top:22px;left:24px;font:700 15px var(--font-display);letter-spacing:.18em;color:var(--c)}
.ang-b .stage:after{content:"";position:absolute;left:0;right:0;bottom:0;height:4px;background:var(--c)}
.ang-b .body{padding:28px 28px 26px;display:flex;flex-direction:column;flex:1}
.ang-b{cursor:default}.ang-b .foot-wrap{margin-top:auto;padding-top:22px;display:flex}
.ang-b .foot{display:inline-flex;align-items:center;gap:10px;font:600 15px var(--font-body);color:var(--neutral-900);text-decoration:none;background:none;border:0;padding:6px 0;cursor:pointer;border-radius:4px}
.ang-b .foot-t{background:linear-gradient(currentColor,currentColor) 0 100%/100% 1px no-repeat;padding-bottom:2px;transition:background-size .3s var(--ease-standard)}
.ang-b .foot:hover .foot-t{background-size:0 1px}
.ang-b .foot:focus-visible{outline:none;box-shadow:var(--shadow-focus,0 0 0 3px rgba(183,159,99,.45))}
[data-hv="Färbung"] .ang-b{transition:background var(--dur-base) var(--ease-standard),border-color var(--dur-base) var(--ease-standard)}
[data-hv="Färbung"] .ang-b:hover,[data-hv="Färbung"] .ang-b:focus-within{background:var(--c);border-color:var(--c)}
[data-hv="Färbung"] .ang-b:hover .body *,[data-hv="Färbung"] .ang-b:focus-within .body *{color:var(--neutral-900)!important}
[data-hv="Färbung"] .ang-b:hover .dsc,[data-hv="Färbung"] .ang-b:focus-within .dsc{color:var(--neutral-900)!important}
[data-hv="Färbung"] .ang-b .foot:hover i{transform:translateX(4px)}
.ang-b .foot i{font-style:normal;font-size:18px;transition:transform var(--dur-base) var(--ease-standard)}
.ang-b .foot:hover i{transform:translateX(4px)}
.ang-c-wrap{display:flex;gap:12px;height:520px}
.ang-c{position:relative;flex:1 1 0;min-width:0;overflow:hidden;background:var(--neutral-900);border:1px solid rgba(255,255,255,.1);border-radius:var(--radius-lg);color:#fff;text-decoration:none;text-align:left;font:inherit;padding:0;cursor:pointer;transition:flex-grow .6s var(--ease-standard),border-color var(--dur-base)}
.ang-c-wrap:hover .ang-c,.ang-c-wrap:focus-within .ang-c{flex-grow:.7}
.ang-c-wrap .ang-c:hover,.ang-c-wrap .ang-c:focus-visible{flex-grow:2.4;border-color:var(--c)}
.ang-c .in{position:absolute;inset:0;padding:32px 32px 30px;display:flex;flex-direction:column}
.ang-c .ico{position:absolute;right:28px;top:28px;height:84px;width:auto;opacity:.9}
.ang-c .more{max-width:420px;opacity:.0;transform:translateY(10px);transition:opacity .35s var(--ease-standard),transform .35s var(--ease-standard)}
.ang-c:hover .more,.ang-c:focus-visible .more{opacity:1;transform:none;transition-delay:.18s}
.ang-c .ttl{white-space:nowrap}
@media(max-width:960px){.ang-c-wrap{flex-direction:column;height:auto}.ang-c{flex:none!important}.ang-c .in{position:relative;inset:auto;min-height:260px}.ang-c .more{opacity:1;transform:none}.ang-c .ttl{white-space:normal}}
`;
  const sec = { padding: '100px 40px' };
  const wrap = { maxWidth: 'var(--container-lg)', margin: '0 auto' };
  const ov = (s) => ({ '--c': s.color });

  if (variant === 'A') return (
    <section id="angebote" data-screen-label="Angebote" style={{ ...sec, background: 'var(--neutral-900)' }}>
      <style>{css}</style>
      <div style={wrap}>
        {head(true)}
        <div>
          {items.map((s) => (
            <Cta key={s.tail} s={s} className="ang-a" style={ov(s)}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: s.color }}>{s.n}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.05 }}>
                <span style={{ display: 'block', fontSize: 15, color: s.color, marginBottom: 6 }}>Leadership</span>
                <span style={{ display: 'block', fontSize: 'clamp(1.7rem,2.6vw,2.4rem)', letterSpacing: '-0.01em' }}>{rest(s)}</span>
              </span>
              <span className="a-claim">
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.claim}</span>
                <span style={{ display: 'block', color: 'rgba(255,255,255,0.64)', fontSize: 15, lineHeight: 1.55, maxWidth: 460 }}>{s.d}</span>
              </span>
              <img className="a-ico" src={iconSrc(s.icon)} alt="" aria-hidden="true" style={{ width: 72, height: 56, objectFit: 'contain', objectPosition: 'center' }} />
              <span className="arr" aria-hidden="true">→</span>
            </Cta>
          ))}
        </div>
      </div>
    </section>
  );

  if (variant === 'B') return (
    <section id="angebote" data-screen-label="Angebote" style={{ ...sec, background: 'var(--neutral-50)' }}>
      <style>{css}</style>
      <div style={wrap}>
        {head(false)}
        <div className="grid-3" data-hv={hv} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {items.map((s) => (
            <div key={s.tail} className="ang-b" style={ov(s)} onMouseMove={mm}>
              <span className="stage"><span className="no">{s.n}</span><img src={iconSrc(s.icon)} alt="" aria-hidden="true" /></span>
              <span className="body">
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.05 }}>
                  <span style={{ display: 'block', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: s.color === 'var(--color-gold)' ? acc.deep : s.color, marginBottom: 8 }} className="lbl">Leadership</span>
                  <span className="ttl2" style={{ display: 'inline', fontSize: 'clamp(1.7rem,2.4vw,2.1rem)', letterSpacing: '-0.01em' }}>{rest(s)}</span>
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, margin: '20px 0 8px' }}>{s.claim}</span>
                <span className="dsc" style={{ display: 'block', color: 'var(--color-fg-muted)', fontSize: 15, lineHeight: 1.55 }}>{s.d}</span>
                <span className="foot-wrap"><Cta s={s} className="foot"><span className="foot-t">Mehr erfahren</span><i aria-hidden="true">→</i></Cta></span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <section id="angebote" data-screen-label="Angebote" style={{ ...sec, background: 'var(--neutral-50)' }}>
      <style>{css}</style>
      <div style={wrap}>
        {head(false)}
        <div className="ang-c-wrap">
          {items.map((s) => (
            <Cta key={s.tail} s={s} className="ang-c" style={ov(s)}>
              <img className="ico" src={iconSrc(s.icon)} alt="" aria-hidden="true" />
              <span className="in">
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: s.color, lineHeight: 1 }}>{s.n}</span>
                <span className="ttl" style={{ marginTop: 'auto', fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.04, display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 15, color: s.color, marginBottom: 6 }}>Leadership</span>
                  <span style={{ display: 'block', fontSize: 'clamp(1.7rem,2.6vw,2.3rem)', letterSpacing: '-0.01em' }}>{rest(s)}</span>
                </span>
                <span className="more">
                  <span style={{ display: 'block', height: 1, background: 'rgba(255,255,255,.14)', margin: '20px 0 16px' }}></span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.claim}</span>
                  <span style={{ display: 'block', color: 'rgba(255,255,255,.66)', fontSize: 15, lineHeight: 1.55 }}>{s.d}</span>
                  <span style={{ display: 'block', marginTop: 18, color: s.color, fontWeight: 600, fontSize: 15 }}>Mehr erfahren →</span>
                </span>
              </span>
            </Cta>
          ))}
        </div>
      </div>
    </section>
  );
}
window.AngebotVariant = AngebotVariant;
