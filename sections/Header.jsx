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
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '0.01em', color: '#fff' }}>
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
        <a href="https://www.linkedin.com/in/dominik-haselbauer-01614284/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn-Profil von Dominik Haselbauer" title="LinkedIn" style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
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
        <a href="https://www.linkedin.com/in/dominik-haselbauer-01614284/" target="_blank" rel="noopener noreferrer"
           style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.86)', padding: '14px 2px', borderBottom: '1px solid rgba(255,255,255,0.08)', letterSpacing: '0.01em' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
        <div style={{ marginTop: 16 }}>
          <Button variant={acc.btn} size="lg" fullWidth onClick={() => go('kontakt')}>Strategiegespräch anfragen</Button>
        </div>
      </div>
    </header>
  );
}
window.Header = Header;
