function SpVertrauen({ acc }) {
  const vertraulich = [
    'Die Inhalte der Sessions sind vertraulich.',
    'Wenn ein Unternehmen das Mandat bezahlt, werden Ziele und organisatorische Rahmenbedingungen transparent geklärt.',
    'Gesprächsinhalte werden nicht ohne deine ausdrückliche Zustimmung an Arbeitgeber, Vorgesetzte oder HR weitergegeben.',
    'Die Trennung zwischen Auftraggeber und Mandant:in wird vor dem Start eindeutig vereinbart.',
  ];
  const fragen = [
    'Was hat sich konkret verändert?',
    'Was ist im Alltag bereits abrufbar?',
    'Wo greifen alte Muster weiterhin?',
    'Was braucht die nächste Entwicklungsphase?',
  ];
  const Check = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: 'none', marginTop: 4 }}>
      <path d="M5 12.5l4.2 4L19 7" stroke={acc.main} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const panel = { background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', display: 'flex', flexDirection: 'column' };
  const h2s = { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.45rem,2.1vw,1.8rem)', lineHeight: 1.15, letterSpacing: '-0.015em', margin: '0 0 16px' };
  return (
    <section id="vertraulichkeit" data-screen-label="Vertraulichkeit & Wirkung" style={{ padding: '110px 40px', background: 'var(--neutral-50)', color: 'var(--color-fg)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.deep, marginBottom: 28 }}>Vertraulichkeit &amp; Wirkung</div>
        <div className="sp-panels" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch' }}>
          <div style={panel}>
            <div style={{ height: 3, background: acc.main }}></div>
            <div style={{ padding: '32px 32px 30px', flex: 1 }}>
              <h2 style={h2s}>Was im Sparring gesagt wird, bleibt im Sparring.</h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {vertraulich.map((v, i) => (
                  <div key={i} style={{ display: 'flex', gap: 13, padding: '13px 0', borderTop: i === 0 ? 'none' : '1px solid var(--color-border)' }}>
                    <Check />
                    <span style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--color-fg-muted)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={panel}>
            <div style={{ height: 3, background: acc.main }}></div>
            <div style={{ padding: '32px 32px 30px', flex: 1 }}>
              <h2 style={h2s}>Fortschritt braucht mehr als ein gutes Gefühl.</h2>
              <p style={{ margin: '0 0 18px', fontSize: 15.5, lineHeight: 1.65, color: 'var(--color-fg-muted)' }}>
                Zu Beginn definieren wir die gewünschte Wirkung und beobachtbare Kriterien. Je nach Mandat können das klarere Entscheidungen sein, konsequentere Kommunikation, ein bewussterer Umgang mit Konflikten oder eine stabilere Führung unter Druck.
              </p>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-fg-subtle)', marginBottom: 4 }}>Nach dem ersten Monat und im weiteren Verlauf reflektieren wir</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {fragen.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '11px 0', borderBottom: i === fragen.length - 1 ? 'none' : '1px solid var(--color-border)' }}>
                    <span aria-hidden="true" style={{ color: acc.deep, fontWeight: 700, flex: 'none' }}>→</span>
                    <span style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--color-fg)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <p style={{ margin: '18px 0 0', fontSize: 13.5, lineHeight: 1.6, color: 'var(--color-fg-subtle)' }}>
                Was sich davon einstellt, hängt von deiner Situation und deiner Arbeit zwischen den Sessions ab. Garantierte Resultate gibt es nicht — wohl aber einen Rahmen, der Fortschritt sichtbar macht.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.SpVertrauen = SpVertrauen;
