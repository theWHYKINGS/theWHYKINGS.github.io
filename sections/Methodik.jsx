function Methodik({ acc }) {
  const methods = [
    ['Systemisches Coaching', 'Verhalten im Kontext denken — nicht isoliert.'],
    ['Psychologische Beratung', 'Fundiert statt gefühlt. Tiefe ohne Therapie.'],
    ['Organisationsentwicklung', 'Strukturen, die Führung tragen oder behindern.'],
    ['Ambidextrie · Beidhändiges Führen', 'Stabilität und Innovation gleichzeitig führen.'],
    ['Psychologische Sicherheit', 'Vertrauen ohne Harmonie-Kitsch.'],
    ['Musterarbeit', 'Wiederkehrende Dynamiken sichtbar und veränderbar machen.'],
    ['Rollen & Verantwortung', 'Klären, wer wofür wirklich einsteht.'],
    ['Executive Sparring', 'Reflexion auf Entscheider-Niveau, ohne Ego-Show.'],
  ];
  return (
    <section id="methodik" data-screen-label="Methodik" style={{ padding: '120px 40px', background: 'var(--neutral-50)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div className="twk-overline" style={{ color: acc.deep }}>04 / Methodische Substanz</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', marginTop: 14, marginBottom: 16, letterSpacing: '-0.02em' }}>
            Haltung allein reicht nicht.
          </h2>
          <p style={{ font: 'var(--text-lead)', color: 'var(--color-fg-muted)', margin: 0 }}>
            Meine Arbeit steht auf fundierten Grundlagen, nicht auf Meinung. Systemisch, psychologisch fundiert, an der Realität von Organisationen geprüft.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--color-border-strong)', borderLeft: '1px solid var(--color-border)' }} className="methodik-grid">
          {methods.map(([t, d]) => (
            <div key={t} style={{ padding: '26px 24px 30px', borderRight: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, margin: '0 0 8px', letterSpacing: '-0.005em', color: 'var(--color-fg)', lineHeight: 1.2 }}>{t}</h3>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--color-fg-muted)', lineHeight: 1.5 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Methodik = Methodik;
