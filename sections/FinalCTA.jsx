function FinalCTA({ acc }) {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };
  const expect = [
    '30–45 Minuten, ruhig. ehrlich und ohne Verkaufsdruck.',
    'Eine erste, klare Einschätzung, was gerade wirklich wichtig für dich ist.',
    'Transparenz, falls ich nicht der passende Sparringspartner bin.',
  ];
  return (
    <section id="kontakt" data-screen-label="Kontakt" style={{ position: 'relative', padding: '120px 40px', background: 'var(--neutral-900)', color: '#fff', overflow: 'hidden' }}>
      {true && (
        <img src={acc.helmWatermark} alt="" aria-hidden="true"
             style={{ position: 'absolute', right: -90, bottom: -80, width: 420, opacity: 0.08, pointerEvents: 'none' }} />
      )}
      <div style={{ position: 'relative', maxWidth: 'var(--container-md)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }} className="finalcta-grid">
        <div>
          <div className="twk-overline" style={{ color: acc.main }}>Strategiegespräch</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,3.8vw,3rem)', color: '#fff', margin: '14px 0 18px', letterSpacing: '-0.02em', lineHeight: 1.08 }}>
            Lass uns gemeinsam klären, was jetzt sinnvoll ist.
          </h2>
          <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.74)', maxWidth: 440, marginBottom: 30 }}>
            Ein erstes Gespräch ist kein Verkaufstermin. Wir schauen gemeinsam auf deine Situation, deine Fragen und darauf, ob meine Begleitung für dich hilfreich wäre.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {expect.map((x) => (
              <li key={x} style={{ display: 'flex', alignItems: 'baseline', gap: 12, fontSize: 15.5, color: 'rgba(255,255,255,0.82)' }}>
                <span style={{ color: acc.main, fontWeight: 700 }}>→</span> {x}
              </li>
            ))}
          </ul>
          <Button variant="secondary" onClick={() => window.open('https://www.linkedin.com', '_blank')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.28)', background: 'transparent' }}>LinkedIn ansehen</Button>
        </div>

        <Card variant="elevated" padding="lg">
          {sent ? (
            <div style={{ textAlign: 'center', padding: '28px 8px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: acc.deep }}>Danke, {form.name || 'bis gleich'}.</div>
              <p style={{ color: 'var(--color-fg-muted)', marginTop: 8, marginBottom: 20 }}>Deine Anfrage ist da. Ich melde mich innerhalb von zwei Werktagen — persönlich.</p>
              <Button variant="secondary" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}>Noch eine senden</Button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="Name" value={form.name} onChange={set('name')} placeholder="Dein Name" required />
              <Input label="E-Mail" type="email" value={form.email} onChange={set('email')} placeholder="du@firma.de" required />
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-fg)' }}>Beschreibe kurz was dich gerade beschäftigt</span>
                <textarea value={form.message} onChange={set('message')} rows={4} placeholder="Ein paar Sätze reichen: Wo stehst du gerade, was soll klarer werden?"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 15, padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-strong)', resize: 'vertical', color: 'var(--twk-white)' }} />
              </label>
              <Button variant={acc.btn} type="submit" fullWidth size="lg">Strategiegespräch anfragen</Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}
window.FinalCTA = FinalCTA;
