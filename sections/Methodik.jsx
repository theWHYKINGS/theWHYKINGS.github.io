function Methodik({ acc }) {
  const fields = [
    {
      n: '01', title: 'Leadership Coaching & Sparring',
      d: 'Ein Gegenüber auf Augenhöhe — kein Berater mit Folien. Ich stelle die Fragen, die dir sonst niemand stellt, und halte dagegen, wo andere nicken. Systemisch, psychologisch fundiert, direkt.',
      m: ['Executive Reflexion', 'Entscheidungsklarheit', 'Rollen- & Wertearbeit', 'Konfliktklärung', 'Feedback ohne Hierarchie'],
    },
    {
      n: '02', title: 'Mentale Stärke & Führen unter Druck',
      d: 'Führung entscheidet sich nicht in ruhigen Momenten. Ich arbeite mit Methoden aus dem Leistungssport — im Kopf und, wenn du willst, mit Handschuhen.',
      m: ['Selbst- & Stressregulation', 'Performance-Routinen', 'Fokus unter Druck', 'körperbasiertes Training', 'Umgang mit Rückschlägen'],
    },
    {
      n: '03', title: 'Team- & Organisationsentwicklung',
      d: 'Manchmal ist nicht die Person das Thema, sondern das System. Ich arbeite mit Teams und Organisationen, die gleichzeitig stabil liefern und sich neu erfinden müssen.',
      m: ['Teamdiagnose', 'psychologische Sicherheit', 'Rollenklärung', 'Führungskultur', 'Architektur statt Aktionismus'],
    },
    {
      n: '04', title: 'Führung in der digitalen Produktwelt',
      d: 'Ich habe selbst Jahre in digitalen Produktorganisationen gearbeitet — von der Strategie bis zur Auslieferung. Ich coache nicht über dein Spielfeld. Ich kenne es.',
      m: ['Produktstrategie', 'Outcome-Orientierung', 'Kundenzentrierung', 'Priorisierung', 'Business ↔ Entwicklung'],
    },
  ];
  const pairs = ['Klarheit & Menschlichkeit', 'Leistung & Sicherheit', 'Tempo & Reflexion'];

  return (
    <section id="methodik" data-screen-label="Methodik" style={{ padding: '120px 40px', background: 'var(--neutral-50)' }}>
      <style>{`
        .twk-method-card { transition: transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard); }
        .twk-method-card:hover { transform: translateY(-2px); box-shadow: 0 2px 4px rgba(24,24,24,0.06), 0 16px 34px rgba(24,24,24,0.10); }
      `}</style>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div style={{ maxWidth: 760, marginBottom: 52 }}>
          <div className="twk-overline" style={{ color: acc.deep }}>04 / Methodische Substanz</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', marginTop: 14, marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.04 }}>
            Kein Methodenkoffer. Ein System.
          </h2>
          <p style={{ font: 'var(--text-lead)', color: 'var(--color-fg-muted)', margin: 0 }}>
            Meine Arbeit speist sich aus mehreren Disziplinen — Psychologie, Systemik, Leistungssport und digitale Produktentwicklung. Aber sie folgt einem Prinzip: <strong style={{ color: 'var(--color-fg)', fontWeight: 700 }}>Gute Führung ist beidhändig.</strong>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px 4px', marginTop: 22, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1rem,1.4vw,1.2rem)', letterSpacing: '-0.005em', color: 'var(--color-fg)' }}>
            {pairs.map((p, i) => (
              <React.Fragment key={p}>
                {i > 0 && <span style={{ color: acc.main, margin: '0 12px' }}>·</span>}
                <span>{p}</span>
              </React.Fragment>
            ))}
          </div>
          <p style={{ margin: '16px 0 0', fontSize: 15, color: 'var(--color-fg-subtle)' }}>
            Wer nur eine Seite beherrscht, führt mit angezogener Handbremse.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="methodik-grid">
          {fields.map((f) => (
            <div key={f.n} className="twk-method-card" style={{
              position: 'relative', display: 'flex', flexDirection: 'column',
              background: 'var(--color-bg)', border: '1px solid var(--color-border)',
              borderTop: `3px solid ${acc.main}`, borderRadius: 'var(--radius-lg)',
              padding: '30px 30px 28px',
              boxShadow: '0 1px 2px rgba(24,24,24,0.04), 0 10px 24px rgba(24,24,24,0.05)',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.16em', color: acc.deep, marginBottom: 16 }}>{f.n}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.2rem,1.7vw,1.45rem)', margin: '0 0 12px', letterSpacing: '-0.01em', color: 'var(--color-fg)', lineHeight: 1.15 }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--color-fg-muted)' }}>{f.d}</p>
              <div style={{ marginTop: 'auto' }}>
                <div style={{ height: 1, background: 'var(--color-border)', margin: '22px 0 14px' }}></div>
                <div className="twk-overline" style={{ color: acc.deep, fontSize: 11, marginBottom: 9 }}>Arbeitsansätze</div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: 'var(--color-fg-subtle)' }}>{f.m.join('  ·  ')}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 820, margin: '44px 0 0' }}>
          <div style={{ height: 1, background: 'var(--color-border-strong)', marginBottom: 20 }}></div>
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.05rem,1.5vw,1.3rem)', letterSpacing: '-0.01em', lineHeight: 1.4, color: 'var(--color-fg)' }}>
            the WHYKINGS arbeitet an der Schnittstelle von Führung, Psychologie und digitaler Wertschöpfung — <span style={{ color: acc.deep }}>psychologisch fundiert, systemisch gedacht, nah an der Umsetzung.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
window.Methodik = Methodik;
