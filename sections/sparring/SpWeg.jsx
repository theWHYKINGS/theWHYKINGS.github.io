function SpWeg({ acc }) {
  const steps = [
    ['Mandatsanfrage', 'Du beschreibst kurz deine Rolle, deine Situation und die Frage, die gerade Klarheit braucht.'],
    ['Kennenlernen', 'Ein unverbindliches Gespräch von 30 bis 45 Minuten. Ohne Verkaufsdruck. Wir sprechen über deine aktuelle Situation, das gewünschte Ergebnis — und darüber, ob die persönliche Arbeitsbeziehung trägt.'],
    ['Auftrags- und Zielklärung', 'Wenn die Passung stimmt, klären wir Ziele, Erwartungen, Vertraulichkeit, Kommunikationswege und beobachtbare Kriterien für Fortschritt.'],
    ['Mandat und Start', 'Die Mandatsvereinbarung wird geschlossen, die ersten vier Sessions werden terminiert — die Zusammenarbeit beginnt.'],
  ];
  return (
    <section id="ablauf" data-screen-label="Vom Kontakt zum Mandat" style={{ padding: '110px 40px', background: 'var(--color-bg)', color: 'var(--color-fg)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.deep }}>03 / Vom ersten Kontakt zum Mandat</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: 820, margin: '16px 0 56px' }}>
          Bevor das Sparring beginnt,<br />prüfen wir die <span style={{ color: acc.deep }}>Passung</span>.
        </h2>
        <div className="sp-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {steps.map(([t, d], i) => (
            <div key={t} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <span aria-hidden="true" style={{ flex: 'none', width: 44, height: 44, borderRadius: '50%', border: `1.5px solid ${acc.main}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: acc.deep }}>{'0' + (i + 1)}</span>
                {i < steps.length - 1 && <span className="sp-step-line" aria-hidden="true" style={{ flex: 1, height: 1, background: 'var(--color-border-strong)' }}></span>}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, margin: '0 0 9px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{t}</h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.62, color: 'var(--color-fg-muted)' }}>{d}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: '52px 0 0', paddingTop: 26, borderTop: '1px solid var(--color-border)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem,2.1vw,1.7rem)', letterSpacing: '-0.01em', lineHeight: 1.35, maxWidth: 760 }}>
          Nicht jede Anfrage wird zu einem Mandat.<br /><span style={{ color: acc.deep }}>Passung ist wichtiger als Auslastung.</span>
        </p>
      </div>
    </section>
  );
}
window.SpWeg = SpWeg;
