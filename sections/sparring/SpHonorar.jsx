function SpHonorar({ acc, onNav }) {
  const leistungen = [
    'vier persönliche Sessions à 60 Minuten pro Vertragsmonat',
    'wöchentlicher Rhythmus',
    'Durchführung online oder in München',
    'Strukturierung jeder Session mit dem GROWTH-Modell',
    'individuelle Transferaufgaben',
    'Kommunikation über WhatsApp Chat zwischen den Sessions',
    'telefonischer Austausch bei zeitkritischen beruflichen Situationen im vereinbarten Rahmen',
    'regelmäßige Reflexion von Ziel und Wirkung',
  ];
  const cards = [
    { tag: 'Unternehmensmandat · B2B', price: '2.000 €', mode: 'netto pro Vertragsmonat', vat: 'zuzüglich gesetzlicher Umsatzsteuer' },
    { tag: 'Selbstzahler:innen-Mandat · B2C', price: '2.100 €', mode: 'brutto pro Vertragsmonat', vat: 'inklusive gesetzlicher Umsatzsteuer' },
  ];
  const Check = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: 'none', marginTop: 4 }}>
      <path d="M5 12.5l4.2 4L19 7" stroke={acc.main} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <section id="honorar" data-screen-label="Honorar" style={{ padding: '110px 40px', background: 'var(--neutral-50)', color: 'var(--color-fg)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.deep }}>07 / Das Mandat</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', lineHeight: 1.06, letterSpacing: '-0.02em', maxWidth: 860, margin: '16px 0 48px' }}>
          Das Honorar gilt für die kontinuierliche Begleitung.<br /><span style={{ color: acc.deep }}>Nicht nur für die Gesprächszeit.</span>
        </h2>
        <div className="sp-price-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'stretch' }}>
          {cards.map((c) => (
            <div key={c.tag} style={{ display: 'flex', flexDirection: 'column', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
              <div style={{ height: 3, background: acc.main }}></div>
              <div style={{ padding: '30px 32px 32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="twk-overline" style={{ color: acc.deep, marginBottom: 20 }}>{c.tag}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.4rem,3.6vw,3.1rem)', letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--color-fg)' }}>{c.price}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, color: 'var(--color-fg)' }}>{c.mode}</span>
                </div>
                <div style={{ fontSize: 14.5, color: 'var(--color-fg-muted)', margin: '10px 0 22px' }}>{c.vat}</div>
                <div style={{ fontSize: 14, color: 'var(--color-fg-subtle)', marginBottom: 26 }}>Leistungsumfang identisch für beide Mandate — siehe unten.</div>
                <div style={{ marginTop: 'auto' }}>
                  <Button variant={acc.btn} size="lg" fullWidth onClick={() => onNav('kontakt')}>Kennenlernen anfragen</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px 30px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-fg-subtle)', marginBottom: 18 }}>Leistungsumfang — für beide Mandate identisch</div>
          <div className="sp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 48px' }}>
            {leistungen.map((l) => (
              <div key={l} style={{ display: 'flex', gap: 12 }}>
                <Check />
                <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-fg-muted)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ margin: '28px 0 0', fontSize: 15.5, lineHeight: 1.6, color: 'var(--color-fg)', maxWidth: 760 }}>
          <strong style={{ fontWeight: 600 }}>Initialmandat über drei Monate.</strong> Einmalige Ausstiegsmöglichkeit nach den ersten vier Sessions zum Ende des ersten Vertragsmonats.
        </p>
      </div>
    </section>
  );
}
window.SpHonorar = SpHonorar;
