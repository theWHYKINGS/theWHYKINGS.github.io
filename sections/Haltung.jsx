function Haltung({ acc }) {
  const da = [
    ['Der Mensch hinter der Führungsrolle', 'Nicht nur bessere Methoden — die eigenen Muster, die Haltung, die blinden Flecken und ihre Wirkung.'],
    ['Leader, die wirklich wachsen wollen', 'Keine Kosmetik. Menschen, die sich ehrlich hinterfragen und unbequeme Erkenntnisse nicht wegschieben.'],
    ['Klarheit unter realem Druck', 'Wenn Entscheidungen komplex werden und einfache Antworten nicht mehr reichen: Tiefe und ehrliches Denken statt noch ein Framework.'],
    ['Sparring auf Augenhöhe', 'Direkt, respektvoll und psychologisch fundiert. Fragen, die nicht immer bequem sind, aber weiterbringen.'],
    ['Wachstum, das Konsequenzen hat', 'Kein inspirierender Impuls für einen guten Moment, sondern Arbeit an Haltung, Verhalten und Führungspraxis.'],
  ];
  const nicht = [
    ['Fassaden polieren', 'Keine Rollenspiele ohne Tiefe, keine Theorie an der Person vorbei, keine Optimierung der Außenwirkung, während innen alles beim Alten bleibt.'],
    ['Wohlfühl-Coaching ohne Konsequenz', 'Wertschätzung ja, Schonung nein. Wer nur Bestätigung sucht, ist hier falsch.'],
    ['Patentrezepte von der Stange', 'Führung ist kein 5-Schritte-Modell. Menschen, Teams und Organisationen funktionieren nicht nach Schablone.'],
    ['Theorie ohne Praxis, Praxis ohne Tiefe', 'Weder Management-Sprech noch Dirty-Street-Romantik. Sondern psychologisches Verständnis, systemisches Denken und echte Führungspraxis.'],
    ['Guru-Gehabe', 'Keine Ratgeber-Pose, keine Abhängigkeit von meinem Rat, keine Ich-weiß-es-besser-Haltung. Sondern gemeinsame Arbeit an dem, was wirklich wirkt.'],
  ];

  const Check = ({ c }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.2 4L19 7" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const Cross = ({ c }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );

  const Panel = ({ kind, eyebrow, title, items }) => {
    const isDa = kind === 'da';
    const markColor = isDa ? acc.main : 'rgba(255,255,255,0.45)';
    return (
      <div style={{
        position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '100%',
        background: isDa ? 'var(--neutral-700)' : 'rgba(255,255,255,0.018)',
        border: isDa ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: isDa ? '0 24px 60px rgba(0,0,0,0.32)' : 'none',
      }}>
        <div style={{ height: 4, background: isDa ? acc.main : 'rgba(255,255,255,0.18)' }}></div>
        <div style={{ padding: '34px 34px 14px' }}>
          <div className="twk-overline" style={{ color: markColor, marginBottom: 10 }}>{eyebrow}</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.35rem,1.9vw,1.7rem)', margin: 0, letterSpacing: '-0.015em', color: isDa ? '#fff' : 'rgba(255,255,255,0.82)', lineHeight: 1.15 }}>
            {title}
          </h3>
        </div>
        <div style={{ padding: '0 34px 30px' }}>
          {items.map(([t, d], i) => (
            <div key={t} style={{ display: 'flex', gap: 16, padding: '20px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
              {isDa ? (
                <img src={acc.helm} alt="" aria-hidden="true" style={{ flex: 'none', width: 34, height: 'auto', objectFit: 'contain', marginTop: 5 }} />
              ) : (
                <span style={{
                  flex: 'none', width: 30, height: 30, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                  border: '1px solid rgba(255,255,255,0.18)',
                }}>
                  <Cross c={markColor} />
                </span>
              )}
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16.5, margin: '0 0 5px', lineHeight: 1.25, letterSpacing: '-0.005em', color: isDa ? '#fff' : 'rgba(255,255,255,0.78)' }}>{t}</h4>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: isDa ? 'rgba(255,255,255,0.62)' : 'rgba(255,255,255,0.46)' }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="haltung" data-screen-label="Haltung & Passung" style={{ padding: '120px 40px', background: 'var(--neutral-800)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div style={{ maxWidth: 760, marginBottom: 52 }}>
          <div className="twk-overline" style={{ color: acc.main }}>05 / Passung & Haltung</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', marginTop: 14, marginBottom: 16, letterSpacing: '-0.02em', color: '#fff' }}>
            Klarheit beginnt damit, ehrlich zu sagen, für wen ich da bin.
          </h2>
          <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            Gute Zusammenarbeit braucht Passung. Damit du weißt, worauf du dich einlässt — und worauf nicht.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'stretch' }} className="haltung-grid">
          <Panel kind="da" eyebrow="Worauf du dich einlässt" title="Wofür ich da bin" items={da} />
          <Panel kind="nicht" eyebrow="Und worauf nicht" title="Wofür ich nicht zu haben bin" items={nicht} />
        </div>
      </div>
    </section>
  );
}
window.Haltung = Haltung;
