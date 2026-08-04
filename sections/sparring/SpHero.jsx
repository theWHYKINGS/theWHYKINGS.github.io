function SpHero({ onNav, acc }) {
  const facts = [
    ['60 Minuten', 'pro Session'],
    ['4 Sessions', 'pro Vertragsmonat'],
    ['Online oder München', 'Face to Face'],
    ['3 Monate', 'Initialmandat · das Minimum'],
  ];
  return (
    <section id="top" data-screen-label="Hero" style={{ position: 'relative', background: 'var(--neutral-800)', color: '#fff', overflow: 'hidden' }}>
      <img src={acc.helmWatermark} alt="" aria-hidden="true" style={{ position: 'absolute', right: -120, top: -40, width: 560, opacity: 0.07, pointerEvents: 'none' }} />
      <div className="hero-grid" style={{ position: 'relative', maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 56, alignItems: 'center' }}>
        <div className="hero-text" style={{ padding: '84px 0 72px' }}>
          <div className="twk-overline" style={{ color: acc.main }}>Leadership Sparring 1:1</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.05rem, 4.4vw, 3.6rem)', lineHeight: 1.02, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', margin: '18px 0 24px' }}>
            <span style={{ display: 'block' }}>Je größer die Verantwortung.</span>
            <span style={{ display: 'block' }}>Desto wichtiger ein Gegenüber,</span>
            <span style={{ display: 'block', color: acc.main }}>das nicht mitnickt.</span>
          </h1>
          <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.76)', maxWidth: 560, marginBottom: 22 }}>
            Ein vertrauliches Mandat für Geschäftsführer:innen und Senior Leader, die unter Druck klar entscheiden, eigene Muster erkennen und Führung so trainieren wollen, dass sie im Alltag trägt.
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 34, color: 'rgba(255,255,255,0.55)', fontSize: 15.5, maxWidth: 560 }}>
            <span style={{ flex: 'none', width: 28, height: 1, background: 'rgba(255,255,255,0.3)', alignSelf: 'center' }}></span>
            <span>Keine Bühne. Kein fertiges Curriculum. Deine reale Situation bestimmt, woran wir arbeiten.</span>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button variant={acc.btn} size="lg" onClick={() => onNav('kontakt')} iconRight={<span style={{ fontSize: 18 }}>→</span>}>Kennenlernen anfragen</Button>
            <Button variant="secondary" size="lg" onClick={() => onNav('ablauf')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.28)', background: 'transparent' }}>So läuft das Mandat ab</Button>
          </div>
        </div>
        <div className="hero-portrait-col" style={{ position: 'relative', alignSelf: 'stretch', minHeight: 480, display: 'flex' }}>
          <div style={{ position: 'relative', flex: 1, margin: '64px 0', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--neutral-900)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <img src={window.R('uploads/Profilbild_Dominik_Haselbauer-24d6a503.jpg')} alt="Dominik Haselbauer" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 22%', filter: 'grayscale(1) contrast(1.06) brightness(0.92)' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '40px 24px 22px', background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)', pointerEvents: 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '0.01em', textTransform: 'uppercase' }}>Dominik Haselbauer</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Dein Sparringspartner · Leadership Coach</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div className="sp-facts" style={{ maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '28px 40px 32px' }}>
          {facts.map(([k, v], i) => (
            <div key={k} className="sp-fact" style={{ borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)', paddingLeft: i === 0 ? 0 : 28 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{k}</div>
              <div style={{ fontSize: 13.5, color: acc.main, marginTop: 4, letterSpacing: '0.04em' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.SpHero = SpHero;
