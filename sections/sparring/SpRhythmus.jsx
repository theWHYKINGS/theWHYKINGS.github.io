function SpRhythmus({ acc }) {
  const loop = ['Live-Session', 'Transferaufgabe', 'Anwendung im Alltag', 'kurzer Austausch', 'nächste Live-Session'];
  const points = [
    'Jede Woche findet eine 60-minütige Face-to-Face-Session statt.',
    'Die Session erfolgt online oder persönlich in München.',
    'Am Ende jeder Session steht eine konkrete Transferaufgabe.',
    'Zwischen den Sessions werden Erkenntnisse im realen Arbeitsalltag getestet.',
    'Über den WhatsApp Chat kannst du Beobachtungen oder kurze Rückfragen teilen — sofern du diesen Kanal willst und er in deinem beruflichen Kontext zulässig ist.',
    'Bei einer zeitkritischen beruflichen Situation ist im vereinbarten Rahmen auch ein Telefonat möglich.',
  ];
  const chip = (last) => ({ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '13px 20px', borderRadius: 'var(--radius-md)', border: last ? `1px solid ${acc.main}` : '1px solid rgba(255,255,255,0.16)', background: last ? 'rgba(183,159,99,0.08)' : 'var(--neutral-700)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15.5, letterSpacing: '0.01em', color: last ? acc.main : '#fff' });
  return (
    <section id="rhythmus" data-screen-label="Rhythmus" style={{ padding: '110px 40px', background: 'var(--neutral-800)', color: '#fff' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.main }}>04 / So sieht ein Monat aus</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', lineHeight: 1.06, letterSpacing: '-0.02em', color: '#fff', maxWidth: 820, margin: '16px 0 20px' }}>
          Vier Sessions. Dazwischen findet<br />der <span style={{ color: acc.main }}>Transfer</span> statt.
        </h2>
        <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.6)', maxWidth: 620, marginBottom: 44 }}>
          Die Session ist der Taktgeber. Die Wirkung entsteht dazwischen — dort, wo du führst.
        </p>
        <div className="sp-loop" role="list" aria-label="Wiederkehrender Ablauf eines Monats" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 52 }}>
          {loop.map((l, i) => (
            <React.Fragment key={l}>
              {i > 0 && <span aria-hidden="true" style={{ color: acc.main, fontSize: 19, fontWeight: 700 }}><span className="sp-arrow-h">→</span><span className="sp-arrow-v">↓</span></span>}
              <span role="listitem" style={chip(i === loop.length - 1)}>{l}</span>
            </React.Fragment>
          ))}
        </div>
        <div className="sp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 56px', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 8 }}>
          {points.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span aria-hidden="true" style={{ color: acc.main, fontWeight: 700, flex: 'none' }}>→</span>
              <span style={{ fontSize: 15.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.78)' }}>{p}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 44, border: '1px solid rgba(255,255,255,0.14)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', maxWidth: 860 }}>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)' }}>
            <strong style={{ color: '#fff', fontWeight: 600 }}>Die Begleitung zwischen den Sessions ist Teil des Mandats.</strong> Sie ist keine 24/7-Rufbereitschaft. Umfang und Kommunikationsrahmen klären wir beim Start.
          </p>
        </div>
      </div>
    </section>
  );
}
window.SpRhythmus = SpRhythmus;
