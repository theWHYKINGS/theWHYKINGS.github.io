function SpGrowth({ acc }) {
  const modules = [
    ['G', 'Goal', 'Was muss am Ende dieser Session klarer, entschieden oder anders sein?', false],
    ['R', 'Reality', 'Was ist tatsächlich der Fall? Welche Fakten, Emotionen, Rollen, Erwartungen und systemischen Dynamiken wirken?', false],
    ['O', 'Options', 'Welche Handlungsoptionen existieren jenseits des ersten Impulses und der vertrauten Reaktion?', false],
    ['W', 'Will / Way Forward', 'Welche Entscheidung wird getroffen? Was wird konkret getan, kommuniziert — oder bewusst nicht getan?', false],
    ['T', 'the WHYKINGS Insight', 'Welches übergeordnete Muster, Prinzip oder welcher blinde Fleck sollte über die konkrete Situation hinaus verstanden werden?', true],
    ['H', 'Homework / Transfer', 'Welcher konkrete Schritt oder welches Verhalten wird bis zur nächsten Session im Alltag erprobt?', true],
  ];
  return (
    <section id="growth" data-screen-label="GROWTH-Modell" style={{ padding: '110px 40px', background: 'var(--neutral-50)', color: 'var(--color-fg)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.deep }}>05 / Struktur jeder Session</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: 820, margin: '16px 0 20px' }}>
          Jede Session hat Struktur.<br />Aber kein <span style={{ color: acc.deep }}>Skript</span>.
        </h2>
        <p style={{ font: 'var(--text-lead)', color: 'var(--color-fg-muted)', maxWidth: 620, marginBottom: 48 }}>
          Jede Session folgt dem GROWTH-Modell — dem von the WHYKINGS um Transfer und Wirkung erweiterten GROW-Modell.
        </p>
        <div className="sp-growth-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {modules.map(([letter, title, q, twk]) => (
            <div key={letter} className="sp-card" style={{ position: 'relative', background: twk ? 'var(--gold-50)' : 'var(--color-bg)', border: '1px solid var(--color-border)', borderTop: twk ? `3px solid ${acc.main}` : '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '26px 26px 24px', boxShadow: 'var(--shadow-xs)' }}>
              {twk && <div style={{ position: 'absolute', top: 18, right: 22, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: acc.deep }}>the WHYKINGS Erweiterung</div>}
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 44, lineHeight: 1, color: acc.main, marginBottom: 14 }}>{letter}<span style={{ fontSize: 26 }}>.</span></div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, margin: '0 0 8px', letterSpacing: '-0.01em', lineHeight: 1.2, hyphens: 'auto' }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.62, color: 'var(--color-fg-muted)' }}>{q}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: '40px 0 0', fontSize: 16.5, lineHeight: 1.65, color: 'var(--color-fg-muted)', maxWidth: 760 }}>
          <strong style={{ color: 'var(--color-fg)', fontWeight: 600 }}>GROWTH gibt der Session einen klaren Anfang und ein verbindliches Ende.</strong> Die Gewichtung bleibt flexibel, weil reale Führungssituationen keinem starren Zeitplan folgen.
        </p>
      </div>
    </section>
  );
}
window.SpGrowth = SpGrowth;
