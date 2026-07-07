function Angebote({ acc }) {
  const goTo = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); };
  const Icon = ({ kind }) => {
    const src = window.R(kind === 'helm' ? 'assets/icons/icon-helm.png' : kind === 'group' ? 'assets/icons/icon-group.png' : 'assets/icons/icon-glove.png');
    return <img src={src} alt="" aria-hidden="true" style={{ height: 64, width: 'auto', objectFit: 'contain', display: 'block' }} />;
  };
  const items = [
    {
      n: '01', tail: 'Leadership Sparring 1:1', color: 'var(--color-gold)', icon: 'helm',
      claim: 'Dein Spiegel. Dein Sparringspartner.',
      d: 'Vertrauliche 1:1-Begleitung für Geschäftsführer:innen und Senior Leader, die unter Druck klar entscheiden müssen.',
    },
    {
      n: '02', tail: 'Leadership Trainings', color: 'var(--twk-sage)', icon: 'group', href: 'https://www.thewhykingsacademy.com',
      claim: 'Ein Thema. Direkte Wirkung.',
      d: 'Fokussierte Formate für Führungsteams — ein Thema, in die Tiefe, mit sofortiger Wirkung in der Praxis.',
    },
    {
      n: '03', tail: 'Leadership Bootcamp', color: 'var(--twk-terracotta)', icon: 'glove', href: 'https://www.leaderjab.com',
      claim: 'Im Ring. In der Verantwortung.',
      d: 'Intensiv und fordernd: Führung üben, wo es knirscht — und Verantwortung real übernehmen.',
    },
  ];
  return (
    <section id="angebote" data-screen-label="Angebote" style={{ padding: '100px 40px', background: 'var(--neutral-50)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div style={{ marginBottom: 44 }}>
          <div className="twk-overline" style={{ color: acc.deep }}>03 / Leistungen</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', marginTop: 14, marginBottom: 0, letterSpacing: '-0.02em' }}>Wie wir arbeiten können</h2>
          <p style={{ font: 'var(--text-lead)', color: 'var(--color-fg-muted)', maxWidth: 600, margin: '20px 0 0' }}>
            Drei Wege, ein Anspruch: Wirksamkeit statt nur nette Gespräche.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="grid-3">
          {items.map((s) => (
            <div key={s.tail} className="twk-svc-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', background: 'var(--neutral-900)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ position: 'absolute', top: 8, right: 8, pointerEvents: 'none' }}>
                <Icon kind={s.icon} />
              </div>
              <div style={{ position: 'relative', padding: '32px 28px 30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: s.color, lineHeight: 1, marginBottom: 34 }}>{s.n}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.04 }}>
                  <span style={{ display: 'block', fontSize: 'clamp(0.95rem,1.3vw,1.15rem)', color: s.color, letterSpacing: '0.01em', marginBottom: 6 }}>Leadership</span>
                  <span style={{ display: 'block', fontSize: 'clamp(1.7rem,2.4vw,2.1rem)', color: '#fff' }}>{s.tail.replace(/^Leadership /, '')}</span>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '22px 0 18px' }}></div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.01em', marginBottom: 11 }}>{s.claim}</div>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.62)', fontSize: 14.5, lineHeight: 1.55 }}>{s.d}</p>
              </div>
              <button onClick={() => { if (s.href) { window.open(s.href, '_blank', 'noopener'); } else { goTo('kontakt'); } }} className="twk-svc-cta" style={{ border: 'none', cursor: 'pointer', background: s.color, color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '15px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span>Mehr erfahren</span>
                <span className="twk-svc-arrow" style={{ fontSize: 18, transition: 'transform var(--dur-base) var(--ease-standard)' }}>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Angebote = Angebote;
