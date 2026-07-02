function Problem({ acc }) {
  const tensions = [
    ['Stabilität sichern', 'und zugleich Bewegung ermöglichen.'],
    ['Klar entscheiden', 'und zugleich menschlich bleiben.'],
    ['Leistung fordern', 'und zugleich Vertrauen schützen.'],
    ['Tempo halten', 'und zugleich Reflexion ermöglichen.'],
    ['Verantwortung tragen', 'und zugleich bei dir selbst bleiben.'],
  ];
  return (
    <section id="problem" data-screen-label="Das Problem" style={{ padding: '120px 40px', background: 'var(--neutral-50)', color: 'var(--color-fg)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.deep }}>01 / Das eigentliche Problem</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3.2rem)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: 880, margin: '16px 0 20px' }}>
          Das Problem ist selten fehlendes Wissen.<br />Oft fehlt die <span style={{ color: acc.deep }}>Wahrheit im Raum</span>.
        </h2>
        <p style={{ font: 'var(--text-lead)', color: 'var(--color-fg-muted)', maxWidth: 600, marginBottom: 56 }}>
          Führung wird dort anspruchsvoll, wo zwei Dinge gleichzeitig wahr sind. Stabilität und Bewegung. Klarheit und Menschlichkeit. Leistung und Sicherheit. Tempo und Reflexion.<br /><br />Du brauchst nicht noch ein trendiges Framework.<br />Du brauchst einen Raum, in dem genau diese Spannungen ausgesprochen werden, Entscheidungen klarer werden und Führung wieder spürbar wird.
        </p>

        <div style={{ borderTop: '1px solid var(--color-border-strong)' }}>
          {tensions.map(([a, b], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 24, alignItems: 'baseline', padding: '22px 0', borderBottom: '1px solid var(--color-border)' }} className="tension-row">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: acc.deep }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.25rem,2vw,1.6rem)', letterSpacing: '-0.01em', color: 'var(--color-fg)' }}>{a}</span>
              </div>
              <div style={{ fontSize: 17, color: 'var(--color-fg-muted)', lineHeight: 1.5 }}>{b}</div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.4rem,2.4vw,2rem)', letterSpacing: '-0.01em', maxWidth: 760, marginTop: 48, lineHeight: 1.5 }}>
          Das ist kein Methodenproblem.<br />Das ist beidhändiges Führen unter realem Druck.<br />Und genau hier setze ich an.
        </p>
      </div>
    </section>
  );
}
window.Problem = Problem;
