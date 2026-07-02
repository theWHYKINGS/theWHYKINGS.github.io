function Hero({ onNav, t, acc }) {
  const variants = {
    Klarheit: { lines: ['Führung unter Druck.', 'Klarheit ohne Theater.'], gold: 1 },
    Muster: { lines: ['Unter Druck zeigt sich', 'nicht dein Stil.', 'Sondern dein Muster.'], gold: 2 },
    Zumutung: { lines: ['Klarheit ist keine Härte.', 'Unklarheit ist', 'die eigentliche Zumutung.'], gold: 2 },
  };
  const v = variants[t.heroHeadline] || variants.Klarheit;
  const hsize = 'clamp(2.5rem, 5.4vw, 4.4rem)';

  return (
    <section id="top" data-screen-label="Hero" style={{ position: 'relative', background: 'var(--neutral-800)', color: '#fff', overflow: 'hidden' }}>
      {t.helm && (
        <img src={acc.helmWatermark} alt="" aria-hidden="true"
             style={{ position: 'absolute', right: -120, top: -40, width: 560, opacity: 0.07, pointerEvents: 'none' }} />
      )}
      <div style={{ position: 'relative', maxWidth: 'var(--container-xl)', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 56, alignItems: 'center', minHeight: 'min(86vh, 760px)' }} className="hero-grid">
        <div style={{ padding: '100px 0 96px' }} className="hero-text">
          <div className="twk-overline" style={{ color: acc.main }}>Leadership | Coaching · Sparring · Training</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: hsize, lineHeight: 1.0, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', margin: '18px 0 24px' }}>
            {v.lines.map((line, i) => (
              <span key={i} style={{ display: 'block', color: i === v.gold ? acc.main : '#fff' }}>{line}</span>
            ))}
          </h1>
          <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.76)', maxWidth: 520, marginBottom: 36 }}>
            Für Führungskräfte, die beidhändig führen müssen: Stabilität sichern und Bewegung ermöglichen. Leistung fordern und Vertrauen schützen. Entscheiden ohne sich selbst zu verlieren.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button variant={acc.btn} size="lg" onClick={() => onNav('kontakt')} iconRight={<span style={{ fontSize: 18 }}>→</span>}>Strategiegespräch anfragen</Button>
            <Button variant="secondary" size="lg" onClick={() => onNav('prinzipien')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.28)', background: 'transparent' }}>Wie ich arbeite</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 40, color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>
            <span style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.3)' }}></span>
            Für die richtigen Mandate. Bewusst nicht für jeden.
          </div>
        </div>

        <div style={{ position: 'relative', alignSelf: 'stretch', minHeight: 520, display: 'flex' }} className="hero-portrait-col">
          <div style={{ position: 'relative', flex: 1, margin: '64px 0', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--neutral-900)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <img src={window.R('uploads/Profilbild_Dominik_Haselbauer-24d6a503.jpg')} alt="Dominik Haselbauer" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 22%', filter: 'grayscale(1) contrast(1.06) brightness(0.92)' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '40px 24px 22px', background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)', pointerEvents: 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '0.01em', textTransform: 'uppercase' }}>Dominik Haselbauer</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Leadership Coach &amp; Executive Sparringspartner</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
