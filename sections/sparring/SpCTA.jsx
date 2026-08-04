function SpCTA({ acc }) {
  const S = window.SITE || {};
  const legal = S.legal || 'legal/';
  const [form, setForm] = React.useState({ name: '', email: '', rolle: '', org: '', frage: '', mandat: 'Unternehmensmandat (B2B)', ort: 'Online' });
  const [opened, setOpened] = React.useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const body = [
      'Mandatsanfrage — Leadership Sparring 1:1', '',
      'Name: ' + form.name,
      'E-Mail: ' + form.email,
      'Rolle: ' + form.rolle,
      'Organisation: ' + (form.org || '—'),
      'Mandat: ' + form.mandat,
      'Bevorzugter Rahmen: ' + form.ort, '',
      'Was soll gerade klarer werden?',
      form.frage,
    ].join('\n');
    window.location.href = 'mailto:info@thewhykings.com?subject=' + encodeURIComponent('Mandatsanfrage: Kennenlernen — Leadership Sparring 1:1') + '&body=' + encodeURIComponent(body);
    setOpened(true);
  };
  const expect = ['30 bis 45 Minuten', 'eine erste ehrliche Einschätzung', 'eine klare Entscheidung über den nächsten Schritt'];
  const legendStyle = { padding: 0, marginBottom: 8, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--color-fg)' };
  const radioRow = { display: 'flex', alignItems: 'center', gap: 10, minHeight: 40, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--color-fg)' };
  const Radio = ({ group, value }) => (
    <label style={radioRow}>
      <input type="radio" name={group} value={value} checked={form[group] === value} onChange={set(group)} style={{ accentColor: 'var(--gold-500)', width: 19, height: 19, margin: 0, cursor: 'pointer' }} />
      {value}
    </label>
  );
  return (
    <section id="kontakt" data-screen-label="Mandat anfragen" style={{ position: 'relative', padding: '120px 40px', background: 'var(--neutral-900)', color: '#fff', overflow: 'hidden' }}>
      <img src={acc.helmWatermark} alt="" aria-hidden="true" style={{ position: 'absolute', right: -90, bottom: -80, width: 420, opacity: 0.08, pointerEvents: 'none' }} />
      <div className="sp-cta-grid" style={{ position: 'relative', maxWidth: 'var(--container-lg)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 56, alignItems: 'start' }}>
        <div>
          <div className="twk-overline" style={{ color: acc.main }}>Mandat anfragen</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem,3.6vw,2.9rem)', color: '#fff', margin: '14px 0 18px', letterSpacing: '-0.02em', lineHeight: 1.08 }}>
            Bevor du ein Mandat erteilst, klären wir, ob ich es <span style={{ color: acc.main }}>annehmen sollte</span>.
          </h2>
          <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.74)', maxWidth: 460, marginBottom: 30 }}>
            Im ersten Gespräch schauen wir auf deine Situation, dein Ziel und unsere mögliche Zusammenarbeit. Ohne Verkaufsdruck. Am Ende wissen beide Seiten, ob ein gemeinsames Mandat sinnvoll ist.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {expect.map((x) => (
              <li key={x} style={{ display: 'flex', alignItems: 'baseline', gap: 12, fontSize: 15.5, color: 'rgba(255,255,255,0.82)' }}>
                <span aria-hidden="true" style={{ color: acc.main, fontWeight: 700 }}>→</span> {x}
              </li>
            ))}
          </ul>
        </div>
        <Card variant="elevated" padding="lg">
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Name" value={form.name} onChange={set('name')} placeholder="Dein Name" required />
            <Input label="E-Mail" type="email" value={form.email} onChange={set('email')} placeholder="du@firma.de" required />
            <Input label="Rolle" value={form.rolle} onChange={set('rolle')} placeholder="z. B. Geschäftsführerin, CTO, Bereichsleiter" required />
            <Input label="Organisation (optional)" value={form.org} onChange={set('org')} placeholder="Unternehmen" />
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-fg)' }}>Was soll gerade klarer werden?</span>
              <textarea value={form.frage} onChange={set('frage')} rows={4} required placeholder="Zwei, drei Sätze reichen." style={{ fontFamily: 'var(--font-body)', fontSize: 15, padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-strong)', resize: 'vertical', color: 'var(--color-fg)', background: 'var(--color-bg)' }}></textarea>
            </label>
            <div className="sp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={legendStyle}>Mandat</legend>
                <Radio group="mandat" value="Unternehmensmandat (B2B)" />
                <Radio group="mandat" value="Selbstzahler:in (B2C)" />
              </fieldset>
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={legendStyle}>Bevorzugter Rahmen</legend>
                <Radio group="ort" value="Online" />
                <Radio group="ort" value="Persönlich in München" />
              </fieldset>
            </div>
            <Button variant={acc.btn} type="submit" fullWidth size="lg">Kennenlernen anfragen</Button>
            {opened && (
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--color-fg)', background: 'var(--gold-50)', border: '1px solid var(--gold-200)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
                Dein E-Mail-Programm sollte sich mit der vorbereiteten Anfrage geöffnet haben. Falls nicht, schreib direkt an <a href="mailto:info@thewhykings.com" style={{ color: 'var(--gold-600)', fontWeight: 600 }}>info@thewhykings.com</a>.
              </p>
            )}
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--color-fg-subtle)' }}>
              Mit dem Absenden fragst du ein unverbindliches Kennenlernen an. Es entsteht kein Vertrag. Der Versand erfolgt über dein E-Mail-Programm an info@thewhykings.com. Hinweise zum Umgang mit deinen Daten findest du in der <a href={legal + 'Datenschutz.html'} style={{ color: 'var(--gold-600)', fontWeight: 600 }}>Datenschutzerklärung</a>.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
window.SpCTA = SpCTA;
