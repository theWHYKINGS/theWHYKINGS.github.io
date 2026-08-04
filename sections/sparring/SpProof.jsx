function SpProof({ acc }) {
  const S = window.SITE || {};
  const home = S.home || 'index.html';
  const metrics = [
    ['14', 'Jahre in Führungskräfteentwicklung'],
    ['400', 'Führungskräfte begleitet'],
    ['5.000', 'Coachingeinheiten absolviert'],
  ];
  const testimonials = [
    { q: 'Kein Coaching nach Schema, sondern eine Zusammenarbeit, die sich an meiner konkreten Situation orientiert. Das Ergebnis ist spürbar: klarere Entscheidungen.', name: 'Dr. Marian Dietzel', role: 'Geschäftsführer · Domino Bau- und Handels GmbH', img: 'Marian Dietzel.jpeg' },
    { q: 'Dominik schafft es, in kurzer Zeit auf den Punkt zu kommen. Keine hohlen Phrasen — klare Impulse, ehrliches Feedback und ein Blick von außen, der hilft, die eigenen blinden Flecken zu erkennen.', name: 'Hamit Kara', role: 'Managing Director · ChemNex GmbH', img: 'Hamit Kara.jpeg' },
    { q: 'Was Dominik von anderen unterscheidet: Er versteht die Dynamiken komplexer Matrixorganisationen — und stellt die richtigen Fragen, präzise, ohne Umwege, mit echtem Interesse am Ergebnis. Für C-Level in komplexen Organisationen ein Sparringspartner auf Augenhöhe.', name: 'Bianca Wannemacher', role: 'Chief Product Officer · RTL News', img: 'Bianca Wannemacher.jpeg' },
  ];
  return (
    <section id="referenzen" data-screen-label="Vertrauen" style={{ padding: '110px 40px', background: 'var(--color-bg)', color: 'var(--color-fg)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.deep }}>Vertrauen</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: 820, margin: '16px 0 44px' }}>
          Was Mandant:innen über<br />die Zusammenarbeit sagen.
        </h2>
        <div className="sp-metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px 24px', paddingBottom: 40, marginBottom: 44, borderBottom: '1px solid var(--color-border)' }}>
          {metrics.map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.9rem,3vw,2.6rem)', color: acc.deep, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 14.5, color: 'var(--color-fg-muted)', marginTop: 8 }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="sp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ borderRadius: 'var(--radius-lg)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', padding: '30px 28px', display: 'flex', flexDirection: 'column' }}>
              <div aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, color: acc.main, lineHeight: 0.5, marginBottom: 14 }}>&ldquo;</div>
              <p style={{ margin: '0 0 22px', fontSize: 15.5, lineHeight: 1.6, color: 'var(--color-fg)', flex: 1 }}>{t.q}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <img src={window.R('uploads/' + t.img)} alt={t.name} style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${acc.main}`, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--color-fg)' }}>{t.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--color-fg-muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: '32px 0 0', fontSize: 15 }}>
          <a href={home + '#proof'} style={{ color: acc.deep, fontWeight: 600 }}>Alle Stimmen, Zahlen und Referenzen auf der Startseite →</a>
        </p>
      </div>
    </section>
  );
}
window.SpProof = SpProof;
