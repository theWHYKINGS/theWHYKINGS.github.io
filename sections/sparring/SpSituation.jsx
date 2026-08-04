function SpSituation({ acc }) {
  const cases = [
    'Eine Entscheidung hat weitreichende Folgen, aber keine eindeutig richtige Lösung.',
    'Ein Konflikt wird vermieden, obwohl er längst Führung braucht.',
    'Die eigene Rolle verändert sich schneller als das eigene Verhalten.',
    'Hoher Druck führt wiederholt zu Reaktionen, die eigentlich überwunden werden sollten.',
    'Im Team oder in der Organisation wiederholen sich dieselben Dynamiken.',
    'Strategie, Menschlichkeit und wirtschaftliche Verantwortung scheinen gegeneinander zu arbeiten.',
  ];
  return (
    <section id="situation" data-screen-label="Führungssituation" style={{ padding: '110px 40px', background: 'var(--neutral-50)', color: 'var(--color-fg)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.deep }}>01 / Wenn Führung einsam wird</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: 860, margin: '16px 0 20px' }}>
          Du kannst vieles im Unternehmen klären.<br />Aber nicht alles <span style={{ color: acc.deep }}>im</span> Unternehmen.
        </h2>
        <p style={{ font: 'var(--text-lead)', color: 'var(--color-fg-muted)', maxWidth: 640, marginBottom: 52 }}>
          Je größer die Verantwortung, desto seltener wird ungefiltertes Feedback. Offenes Zweifeln wirkt schnell wie Unsicherheit, lautes Denken wie ein Signal. Was dann fehlt, ist kein Rat — sondern ein hierarchiefreier Raum, in dem du prüfen, verwerfen und ehrlich denken kannst, ohne Nebenwirkungen im eigenen System.
        </p>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-fg-subtle)', marginBottom: 6 }}>Typische Situationen, in denen ein Mandat relevant wird</div>
        <div className="sp-cases" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 56px', borderTop: '1px solid var(--color-border-strong)' }}>
          {cases.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 18, padding: '20px 0', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ flex: 'none', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: acc.deep }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 16.5, lineHeight: 1.55, color: 'var(--color-fg)' }}>{c}</span>
            </div>
          ))}
        </div>
        <p style={{ margin: '40px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.25rem,2vw,1.6rem)', letterSpacing: '-0.01em', lineHeight: 1.4, maxWidth: 760 }}>
          Nichts davon ist ungewöhnlich. Aber vieles davon lässt sich im eigenen System nicht ehrlich bearbeiten.
        </p>
      </div>
    </section>
  );
}
window.SpSituation = SpSituation;
