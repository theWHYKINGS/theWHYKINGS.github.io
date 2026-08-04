function SpHeader({ onNav, acc }) {
  const [open, setOpen] = React.useState(false);
  const S = window.SITE || {};
  const home = S.home || 'index.html';
  const links = [['Ablauf', 'ablauf'], ['GROWTH', 'growth'], ['Honorar', 'honorar'], ['FAQ', 'faq']];
  const go = (id) => { setOpen(false); onNav(id); };
  return (
    <header className="twk-header" style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 40px', background: 'rgba(18,18,18,0.82)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <a href={home} aria-label="Zur Startseite von the WHYKINGS" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <img src={acc.helm} alt="" style={{ height: 30 }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '0.01em', color: '#fff' }}>the WHYKINGS</span>
      </a>
      <nav className="twk-desktop-nav" aria-label="Bereiche dieser Seite" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {links.map(([label, id]) => (
          <a key={id} href={'#' + id} onClick={(e) => { e.preventDefault(); onNav(id); }} style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: 500, color: 'rgba(255,255,255,0.78)', letterSpacing: '0.01em' }}>{label}</a>
        ))}
        <Button variant={acc.btn} size="sm" onClick={() => onNav('kontakt')}>Kennenlernen anfragen</Button>
      </nav>
      <button className="twk-mobile-toggle" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open} onClick={() => setOpen((o) => !o)} style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, marginRight: -10, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
        <span className="twk-burger" data-open={open}></span>
      </button>
      <div className="twk-mobile-menu" data-open={open}>
        {links.map(([label, id]) => (
          <a key={id} href={'#' + id} onClick={(e) => { e.preventDefault(); go(id); }} style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.86)', padding: '14px 2px', borderBottom: '1px solid rgba(255,255,255,0.08)', letterSpacing: '0.01em' }}>{label}</a>
        ))}
        <a href={home} style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.86)', padding: '14px 2px', borderBottom: '1px solid rgba(255,255,255,0.08)', letterSpacing: '0.01em' }}>← Zur Startseite</a>
        <div style={{ marginTop: 16 }}>
          <Button variant={acc.btn} size="lg" fullWidth onClick={() => go('kontakt')}>Kennenlernen anfragen</Button>
        </div>
      </div>
    </header>
  );
}
window.SpHeader = SpHeader;
