function SpDreiMonate({ acc }) {
  const cycle = ['Erkennen', 'Unterbrechen', 'Erproben', 'Reflektieren', 'Wiederholen', 'Verankern'];
  return (
    <section id="laufzeit" data-screen-label="Warum drei Monate" style={{ padding: '110px 40px', background: 'var(--neutral-800)', color: '#fff' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.main }}>06 / Warum kein Kurzformat</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', lineHeight: 1.06, letterSpacing: '-0.02em', color: '#fff', maxWidth: 820, margin: '16px 0 20px' }}>
          Erkenntnis verändert<br />noch kein <span style={{ color: acc.main }}>Verhalten</span>.
        </h2>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.25rem,2vw,1.6rem)', letterSpacing: '-0.01em', lineHeight: 1.35, color: 'rgba(255,255,255,0.92)', maxWidth: 720, margin: '0 0 18px' }}>
          Führung ist kein Download. Sie wird unter realen Bedingungen trainiert.
        </p>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.65)', maxWidth: 680, margin: '0 0 44px' }}>
          Ein einzelnes Gespräch kann Klarheit schaffen. Unter Druck greifen Menschen jedoch häufig wieder auf vertraute Muster zurück. Damit aus einer Erkenntnis eine belastbare Führungsroutine wird, braucht es Wiederholung, Anwendung, Reflexion und Korrektur.
        </p>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 18 }}>Der Entwicklungszyklus</div>
        <div className="sp-cycle" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 12px', marginBottom: 56 }}>
          {cycle.map((c, i) => (
            <React.Fragment key={c}>
              {i > 0 && <span aria-hidden="true" style={{ color: acc.main, fontSize: 17, fontWeight: 700 }}>→</span>}
              <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: acc.main }}>{i + 1}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.05rem,1.6vw,1.35rem)', letterSpacing: '-0.01em', color: '#fff' }}>{c}</span>
              </span>
            </React.Fragment>
          ))}
        </div>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', maxWidth: 760, margin: '0 0 44px' }}>
          <strong style={{ color: '#fff', fontWeight: 600 }}>Drei Monate sind kein Versprechen, dass Entwicklung danach abgeschlossen ist.</strong> Sie sind der Mindestzeitraum, in dem neue Entscheidungen und Verhaltensweisen mehrfach in der Realität erprobt werden können. Im Durchschnitt dauert ein Mandat bei mir rund ein Jahr.
        </p>
        <div style={{ background: 'var(--neutral-700)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ height: 3, background: acc.main }}></div>
          <div className="sp-contract" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            <div className="sp-contract-cell" style={{ padding: '30px 32px 26px', borderRight: '1px solid rgba(255,255,255,0.10)' }}>
              <div className="twk-overline" style={{ color: acc.main, marginBottom: 10 }}>Initialmandat · das Minimum</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.4rem,2.2vw,1.85rem)', letterSpacing: '-0.01em', color: '#fff' }}>Drei Monate</div>
              <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>Kürzere reguläre Mandate biete ich nicht an.</p>
            </div>
            <div className="sp-contract-cell" style={{ padding: '30px 32px 26px', borderRight: '1px solid rgba(255,255,255,0.10)' }}>
              <div className="twk-overline" style={{ color: acc.main, marginBottom: 10 }}>Durchschnittliches Mandat</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.4rem,2.2vw,1.85rem)', letterSpacing: '-0.01em', color: '#fff' }}>Rund ein Jahr</div>
              <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>Viele Mandant:innen arbeiten deutlich über das Initialmandat hinaus mit mir.</p>
            </div>
            <div style={{ padding: '30px 32px 26px' }}>
              <div className="twk-overline" style={{ color: acc.main, marginBottom: 10 }}>Einmaliges Ausstiegsfenster</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.4rem,2.2vw,1.85rem)', letterSpacing: '-0.01em', color: '#fff' }}>Nach den ersten vier Sessions</div>
              <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>Zum Ende des ersten Vertragsmonats.</p>
            </div>
          </div>
          <div style={{ padding: '24px 32px 28px', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)' }}>
              Die Arbeit ist auf drei Monate angelegt. Gleichzeitig muss die persönliche Passung stimmen. Wenn die Zusammenarbeit nach den ersten vier Sessions nicht trägt, kann das Mandat einmalig beendet werden. Ohne Rechtfertigung und ohne künstliche Bindung.
            </p>
            <p style={{ margin: '12px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Die verbindlichen Einzelheiten regelt die Mandatsvereinbarung.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
window.SpDreiMonate = SpDreiMonate;
