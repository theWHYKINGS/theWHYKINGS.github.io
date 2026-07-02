function Footer({ acc }) {
  const cols = [
    ['Navigation', [['Das Problem', 'problem'], ['Haltung', 'prinzipien'], ['Angebote', 'angebote'], ['Methodik', 'methodik'], ['Über mich', 'ueber']]],
    ['Angebote', [['Leadership Sparring 1:1', 'angebote'], ['Leadership Trainings', 'angebote'], ['Leadership Boot Camp', 'angebote']]],
  ];
  const iconWrap = { flexShrink: 0, width: 18, height: 18, display: 'block' };
  const PlaneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={iconWrap}><path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9 22 2Z" /></svg>);
  const PhoneIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={iconWrap}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>);
  const PinIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={iconWrap}><path d="M20 10c0 4.4-8 12-8 12s-8-7.6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>);
  return (
    <footer style={{ background: 'var(--neutral-800)', color: 'rgba(255,255,255,0.7)', padding: '40px 40px 36px', borderTop: '1px solid rgba(255,255,255,0.10)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 32 }} className="footer-grid">
        <div>
          <img src={window.R('assets/logos/wordmark-gold.png')} alt="theWHYKINGS" style={{ height: 58, marginBottom: 18 }} />
          <p style={{ fontSize: 14.5, maxWidth: 280, margin: 0, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>
            Seit 14 Jahren an der Seite der ambitioniertesten Führungskräfte Deutschlands.
          </p>
          <a href="https://www.dggp.org/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', flexDirection: 'column', gap: 10, marginTop: 26, textDecoration: 'none' }}>
            <img src={window.R('assets/logos/dggp.png')} alt="DGGP — Deutsche Gesellschaft für Gesundheit und Prävention e.V." style={{ height: 30, width: 'auto', display: 'block' }} />
            <span style={{ fontSize: 13, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.6)' }}>Mitglied des DGGP</span>
          </a>
        </div>
        {cols.map(([h, links]) => (
          <div key={h}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: acc.main, marginBottom: 14 }}>{h}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(([l, id]) => (
                <li key={l}>
                  <a href={`#${id}`} onClick={(e) => { e.preventDefault(); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); }}
                     style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: acc.main, marginBottom: 14 }}>Kontakt</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="mailto:info@thewhykings.com?subject=Anfrage%20%C3%BCber%20thewhykings.com" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--color-gold)', color: '#fff', borderRadius: 'var(--radius-md)', padding: '13px 16px', fontSize: 14.5, fontWeight: 600, textDecoration: 'none', transition: 'background var(--dur-base) var(--ease-standard)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gold-500)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-gold)'}>
              <PlaneIcon /><span>info@thewhykings.com</span>
            </a>
            <a href="tel:+491634781138" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 'var(--radius-md)', padding: '13px 16px', fontSize: 14.5, textDecoration: 'none', transition: 'border-color var(--dur-base) var(--ease-standard)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}>
              <PhoneIcon /><span>+49 163 4781138</span>
            </a>
            <a href="https://www.google.com/maps/search/?api=1&query=Schlei%C3%9Fheimer%20Str.%2042%2C%2080333%20M%C3%BCnchen" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 'var(--radius-md)', padding: '13px 16px', textDecoration: 'none', transition: 'border-color var(--dur-base) var(--ease-standard)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}>
              <span style={{ marginTop: 1, color: 'rgba(255,255,255,0.85)' }}><PinIcon /></span>
              <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>
                <div style={{ fontWeight: 600 }}>Schleißheimer Str. 42</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>80333 München (Maxvorstadt)</div>
              </div>
            </a>
            </div>
          </div>
        </div>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
        <span>© 2026 the WHYKINGS · Dominik Haselbauer</span>
        <span style={{ display: 'flex', gap: 18 }}>
          <a href="legal/Impressum.html" style={{ color: 'rgba(255,255,255,0.5)' }}>Impressum</a>
          <a href="legal/Datenschutz.html" style={{ color: 'rgba(255,255,255,0.5)' }}>Datenschutz</a>
        </span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
