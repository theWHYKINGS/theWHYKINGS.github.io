function ThoughtLeadership({ acc }) {
  const channels = [
    ['LinkedIn', 'Impulse zu Führung unter Druck, Mustern und Verantwortung.'],
    ['Podcast', 'Gespräche über das, was unter der Oberfläche von Führung passiert.'],
    ['Artikel & Impulse', 'Längere Gedanken zu Ambidextrie, Sicherheit und Klarheit.'],
    ['GROWTH', 'Mein Denkmodell für Wachstum durch Reibung.'],
  ];
  return (
    <section id="inhalte" data-screen-label="Thought Leadership" style={{ padding: '120px 40px', background: 'var(--neutral-50)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 52 }}>
          <div className="twk-overline" style={{ color: acc.deep }}>08 / Gedanken & Inhalte</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem,3.6vw,2.8rem)', marginTop: 14, marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Ich verkaufe keine Führung.<br />Ich denke über sie nach.
          </h2>
          <p style={{ font: 'var(--text-lead)', color: 'var(--color-fg-muted)', margin: 0 }}>
            Was unter der Oberfläche von Führung passiert, lässt sich nicht in einen Satz pressen. Hier denke ich laut — offen, ohne Verkaufsabsicht.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--color-border-strong)' }}>
          {channels.map(([t, d], i) => (
            <div key={t} style={{ display: 'grid', gridTemplateColumns: '0.4fr 1.6fr', gap: 24, alignItems: 'baseline', padding: '24px 0', borderBottom: '1px solid var(--color-border)' }} className="tension-row">
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.25rem,1.9vw,1.55rem)', letterSpacing: '-0.01em', color: 'var(--color-fg)' }}>{t}</div>
              <div style={{ fontSize: 17, color: 'var(--color-fg-muted)', lineHeight: 1.5 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.ThoughtLeadership = ThoughtLeadership;
