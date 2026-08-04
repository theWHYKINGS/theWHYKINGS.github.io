function SpMandat({ acc }) {
  const roles = [
    ['Spiegel', 'Blinde Flecken, Widersprüche und wiederkehrende Muster werden sichtbar.'],
    ['Sparringspartner', 'Entscheidungen, Annahmen und Argumente werden belastbar geprüft.'],
    ['Coach', 'Die Antwort wird nicht abgenommen. Die eigene Klarheit wird geschärft.'],
    ['Transferpartner', 'Erkenntnisse werden zwischen den Sessions im realen Führungsalltag erprobt.'],
  ];
  const not = ['Keine Unternehmensberatung mit vorgefertigten Lösungen', 'Kein Bestätigungsraum', 'Keine Psychotherapie', 'Keine permanente Rufbereitschaft'];
  return (
    <section id="mandat" data-screen-label="Das Arbeitsbündnis" style={{ padding: '110px 40px', background: 'var(--neutral-800)', color: '#fff' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.main }}>02 / Das Arbeitsbündnis</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', lineHeight: 1.06, letterSpacing: '-0.02em', color: '#fff', maxWidth: 820, margin: '16px 0 20px' }}>
          Du buchst kein Gespräch.<br />Du erteilst ein <span style={{ color: acc.main }}>Mandat</span>.
        </h2>
        <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.6)', maxWidth: 620, marginBottom: 48 }}>
          Ein Sparringsmandat ist ein Arbeitsbündnis mit klarem Auftrag. Ich übernehme darin vier Funktionen:
        </p>
        <div className="sp-cards-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {roles.map(([t, d], i) => (
            <div key={t} style={{ background: 'var(--neutral-700)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', padding: '26px 24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.16em', color: acc.main, marginBottom: 14 }}>{'0' + (i + 1)}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, margin: '0 0 9px', letterSpacing: '-0.01em', color: '#fff', lineHeight: 1.15 }}>{t}</h3>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.62)' }}>{d}</p>
            </div>
          ))}
        </div>
        <blockquote style={{ margin: '52px 0 0', paddingLeft: 24, borderLeft: `3px solid ${acc.main}`, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.35rem,2.3vw,1.9rem)', lineHeight: 1.35, letterSpacing: '-0.01em', color: '#fff', maxWidth: 880 }}>
          Ich entscheide nicht für dich. Ich sorge dafür, dass du klarer siehst, bewusster entscheidest und die Konsequenzen deiner Entscheidung tragen kannst.
        </blockquote>
        <div style={{ marginTop: 48, paddingTop: 26, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="twk-overline" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>Zur Abgrenzung</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
            {not.map((n) => (
              <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'rgba(255,255,255,0.65)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="rgba(255,255,255,0.4)" strokeWidth="2.4" strokeLinecap="round" /></svg>
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.SpMandat = SpMandat;
