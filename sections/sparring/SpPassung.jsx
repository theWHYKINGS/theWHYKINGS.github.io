function SpPassung({ acc }) {
  const passt = [
    'Verantwortung trägst und Entscheidungen mit Konsequenzen treffen musst',
    'ehrliches Feedback einem freundlichen Scheinkonsens vorziehst',
    'bereit bist, das eigene Verhalten zu hinterfragen',
    'zwischen den Sessions tatsächlich etwas ausprobieren willst',
    'keine Abhängigkeit vom Coach, sondern mehr eigene Klarheit suchst',
  ];
  const passtNicht = [
    'lediglich schnelle Tipps oder Bestätigung möchtest',
    'Entscheidungen an einen externen Ratgeber delegieren willst',
    'keine Zeit oder Bereitschaft für Transferaufgaben hast',
    'eine Psychotherapie oder psychologische Krisenversorgung benötigst',
    'permanente Erreichbarkeit erwartest',
  ];
  const Panel = ({ isDa, eyebrow, title, items }) => (
    <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '100%', background: isDa ? 'var(--neutral-700)' : 'rgba(255,255,255,0.018)', border: isDa ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(255,255,255,0.07)', boxShadow: isDa ? '0 24px 60px rgba(0,0,0,0.32)' : 'none' }}>
      <div style={{ height: 4, background: isDa ? acc.main : 'rgba(255,255,255,0.18)' }}></div>
      <div style={{ padding: '32px 32px 12px' }}>
        <div className="twk-overline" style={{ color: isDa ? acc.main : 'rgba(255,255,255,0.45)', marginBottom: 10 }}>{eyebrow}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem,1.9vw,1.6rem)', margin: 0, letterSpacing: '-0.015em', color: isDa ? '#fff' : 'rgba(255,255,255,0.82)', lineHeight: 1.2 }}>{title}</h3>
      </div>
      <div style={{ padding: '4px 32px 30px' }}>
        {items.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 15, padding: '15px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
            {isDa ? (
              <img src={acc.helm} alt="" aria-hidden="true" style={{ flex: 'none', width: 26, height: 'auto', objectFit: 'contain', marginTop: 1 }} />
            ) : (
              <span style={{ flex: 'none', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 0, border: '1px solid rgba(255,255,255,0.18)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="rgba(255,255,255,0.45)" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </span>
            )}
            <span style={{ fontSize: 15.5, lineHeight: 1.55, color: isDa ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)' }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <section id="passung" data-screen-label="Passung" style={{ padding: '110px 40px', background: 'var(--neutral-800)', color: '#fff' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <div className="twk-overline" style={{ color: acc.main }}>Passung</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', marginTop: 14, marginBottom: 16, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1.06 }}>
            Nicht für jeden.<br /><span style={{ color: acc.main }}>Genau deshalb</span> kann es wirken.
          </h2>
          <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            Ein Mandat wirkt nur, wenn Format und Erwartung zusammenpassen. Deshalb vorab in aller Klarheit:
          </p>
        </div>
        <div className="sp-panels" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'stretch' }}>
          <Panel isDa={true} eyebrow="Worauf du dich einlässt" title="Das Mandat passt, wenn du …" items={passt} />
          <Panel isDa={false} eyebrow="Und worauf nicht" title="Das Mandat passt nicht, wenn du …" items={passtNicht} />
        </div>
      </div>
    </section>
  );
}
window.SpPassung = SpPassung;
