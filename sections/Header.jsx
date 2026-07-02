function Header({ onNav, acc }) {
  const [open, setOpen] = React.useState(false);
  const links = [
    ['Das Problem', 'problem'], ['Haltung', 'prinzipien'], ['Angebote', 'angebote'],
    ['Methodik', 'methodik'], ['Über mich', 'ueber'],
  ];
  const wrap = {
    position: 'sticky', top: 0, zIndex: 50,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '15px 40px',
    background: 'rgba(18,18,18,0.82)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  };
  const go = (id) => { setOpen(false); onNav(id); };
  return (
    <header style={wrap} className="twk-header">
      <a href="#top" onClick={(e) => { e.preventDefault(); go('top'); }}
         style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <img src={acc.helm} alt="the WHYKINGS" style={{ height: 30 }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '0.01em', textTransform: 'uppercase', color: '#fff' }}>
          the WHYKINGS
        </span>
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="twk-desktop-nav">
        {links.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); onNav(id); }}
             style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: 500, color: 'rgba(255,255,255,0.78)', letterSpacing: '0.01em' }}>
            {label}
          </a>
        ))}
        <Button variant={acc.btn} size="sm" onClick={() => onNav('kontakt')}>Strategiegespräch</Button>
      </nav>

      <button className="twk-mobile-toggle" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, marginRight: -10, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
        <span className="twk-burger" data-open={open}></span>
      </button>

      <div className="twk-mobile-menu" data-open={open}>
        {links.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}
             style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.86)', padding: '14px 2px', borderBottom: '1px solid rgba(255,255,255,0.08)', letterSpacing: '0.01em' }}>
            {label}
          </a>
        ))}
        <div style={{ marginTop: 16 }}>
          <Button variant={acc.btn} size="lg" fullWidth onClick={() => go('kontakt')}>Strategiegespräch anfragen</Button>
        </div>
      </div>
    </header>
  );
}
window.Header = Header;
