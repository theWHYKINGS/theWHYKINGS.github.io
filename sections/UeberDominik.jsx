function UeberDominik({ acc }) {
  return (
    <section id="ueber" data-screen-label="Über Dominik" style={{ padding: '120px 40px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 64, alignItems: 'start' }} className="ueber-grid">
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--neutral-800)', aspectRatio: '4 / 5' }}>
            <img src={window.R('uploads/427A3354.jpg')} alt="Dominik Haselbauer" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 28%' }} />
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: 'var(--color-fg-subtle)', letterSpacing: '0.04em' }}>
            Dominik Haselbauer · Leadership Coach, Executive Sparringspartner &amp; Organisationsentwickler
          </div>
        </div>

        <div>
          <div className="twk-overline" style={{ color: acc.deep }}>07 / Über mich</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem,3.4vw,2.8rem)', margin: '14px 0 22px', letterSpacing: '-0.02em', lineHeight: 1.08 }}>
            Ich verkaufe keine bessere Version von Führung.<br /><span style={{ color: acc.deep }}>Ich helfe dir, der Realität nicht länger auszuweichen.</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 620, fontSize: 16.5, lineHeight: 1.65, color: 'var(--color-fg-muted)' }}>
            <p style={{ margin: 0 }}>
              Ich arbeite mit Menschen, die Verantwortung tragen und wenig Geduld für Coaching-Blabla haben. Mein Gegenüber sind Geschäftsführer:innen und Senior Leader, die nicht Bestätigung suchen, sondern jemanden, der ehrlich genug ist, das Unbequeme auszusprechen.
            </p>
            <p style={{ margin: 0 }}>
              Meine Überzeugung: Die meisten Führungsprobleme sind keine Wissensprobleme. Sie sind Muster-, Rollen- und Verantwortungsthemen. Deshalb verbinde ich psychologische Tiefe mit der Realität von Organisationen — direkt, aber nie destruktiv.
            </p>
            <p style={{ margin: 0 }}>
              Wenn ich vom <em style={{ fontStyle: 'normal', color: 'var(--color-fg)', fontWeight: 600 }}>Wir</em> spreche, ist das kein Marketing. Gute Führungsentwicklung ist kein Soloprojekt: Hinter the WHYKINGS steht ein Netzwerk erfahrener Menschen, das meine Arbeit schärft und professioneller macht. Die Verantwortung für die Beziehung zu unseren Mandant:innen bleibt bei mir.
            </p>
          </div>

          <blockquote style={{ margin: '32px 0 0', paddingLeft: 22, borderLeft: `3px solid ${acc.deep}`, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem,2vw,1.7rem)', lineHeight: 1.3, letterSpacing: '-0.01em', color: 'var(--color-fg)' }}>
            „Klarheit ist keine Härte. Unklarheit ist die eigentliche Zumutung."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
window.UeberDominik = UeberDominik;
