function CountUp({ value, color }) {
  const m = String(value).match(/^([^\d]*)([\d.]+)([^\d]*)$/);
  const prefix = m ? m[1] : '';
  const numStr = m ? m[2] : String(value);
  const suffix = m ? m[3] : '';
  const target = parseInt(numStr.replace(/\./g, ''), 10) || 0;
  const grouped = numStr.includes('.') || target >= 1000;
  const ref = React.useRef(null);
  const raf = React.useRef(null);
  const [display, setDisplay] = React.useState(0);

  const run = React.useCallback(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(target); return; }
    cancelAnimationFrame(raf.current);
    const dur = 1300; const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(target * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [target]);

  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    let fired = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && !fired) { fired = true; run(); } });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf.current); };
  }, [run]);

  const formatted = grouped ? display.toLocaleString('de-DE') : String(display);
  return (
    <div ref={ref} onMouseEnter={run} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem,3.4vw,2.8rem)', color, lineHeight: 1, cursor: 'default' }}>
      {prefix}{formatted}{suffix}
    </div>
  );
}

function Proof({ acc }) {
  const metrics = [
    ['14', 'Jahre in Führungskräfteentwicklung'],
    ['400', 'Führungskräfte begleitet'],
    ['55', 'Teams in Entwicklung begleitet'],
    ['50', 'Organisationen unterstützt'],
    ['4', 'Unternehmen mitgegründet und geführt'],
    ['5.000', 'Coachingeinheiten absolviert'],
  ];
  const testimonials = [
    { q: 'Ein echter Sparringspartner auf Augenhöhe. Er findet schnell einen echten Zugang zu Menschen und schafft Vertrauen, ohne an Klarheit zu verlieren.', name: 'Robin Stankovic', role: 'C-Level & General Manager · Transformation', img: 'Robin Stankovic.jpeg' },
    { q: 'Dominik schafft es, in kurzer Zeit auf den Punkt zu kommen. Keine hohlen Phrasen — klare Impulse, ehrliches Feedback und ein Blick von außen, der hilft, die eigenen blinden Flecken zu erkennen.', name: 'Hamit Kara', role: 'Managing Director · ChemNex GmbH', img: 'Hamit Kara.jpeg' },
    { q: 'Kein Coaching nach Schema, sondern eine Zusammenarbeit, die sich an meiner konkreten Situation orientiert. Das Ergebnis ist spürbar: klarere Entscheidungen.', name: 'Dr. Marian Dietzel', role: 'Geschäftsführer · Domino Bau- und Handels GmbH', img: 'Marian Dietzel.jpeg' },
    { q: 'Er schafft eine Atmosphäre, in der die wichtigen und auch unangenehmen Fragen auf den Tisch kommen — während Wertschätzung und Respekt oberste Priorität bleiben.', name: 'Felicitas Patricia Lotfi', role: 'Head of Sales & Revenue Operations · Taxdoo', img: 'Felicitas Lotfi.jpeg' },
    { q: 'Genau in den Momenten, in denen nicht die Strategie das Problem ist, sondern die eigene Klarheit, ist Dominik ein wertvoller Sparringspartner: kein Coaching-Bla, sondern klare Fragen, ehrliche Reflexion und echtes unternehmerisches Verständnis.', name: 'Daniel Rie', role: 'Unternehmer · Turnaround & Go-to-Market', img: 'Daniel Rie.jpeg' },
    { q: 'Was Dominik von anderen unterscheidet: Er versteht die Dynamiken komplexer Matrixorganisationen — und stellt die richtigen Fragen, präzise, ohne Umwege, mit echtem Interesse am Ergebnis. Für C-Level in komplexen Organisationen ein Sparringspartner auf Augenhöhe.', name: 'Bianca Wannemacher', role: 'Chief Product Officer · RTL News', img: 'Bianca Wannemacher.jpeg' },
  ];
  const logos = [
    { f: 'Bahn_Logo_weiß.png', n: 'Deutsche Bahn' },
    { f: 'Roche_logo_weiß.png', n: 'Roche' },
    { f: 'ProSiebenSat.1_Logo_weiß.png', n: 'ProSiebenSat.1' },
    { f: 'RTL_logo_weiß.png', n: 'RTL' },
    { f: '2025_Logo_stern.png', n: 'stern' },
    { f: 'ntv_Logo_weiß.png', n: 'ntv' },
    { f: 'Funke_Logo_weiß.png', n: 'FUNKE Mediengruppe' },
    { f: '2025_Logo_ZDF.png', n: 'ZDF' },
    { f: '2025_Logo_VHS.png', n: 'Volkshochschule' },
    { f: 'LBBW_Logo_weiß.png', n: 'LBBW' },
    { f: 'Uelzener_Logo_weiß.png', n: 'Uelzener Versicherungen' },
    { f: 'Gema_Logo_weiß.png', n: 'GEMA' },
    { f: 'TAXDOO_Logo_white.png', n: 'Taxdoo' },
    { f: 'SmartAIs_Logo_weiß.png', n: 'SmartAIs' },
    { f: 'Artisense_Logo_weiß.png', n: 'Artisense' },
    { f: 'sport.de_Logo_weiß.png', n: 'sport.de' },
    { f: 'wetter.de_Logo_weiß.png', n: 'wetter.de' },
  ];
  return (
    <section id="proof" data-screen-label="Proof" style={{ position: 'relative', padding: '120px 40px', background: 'var(--neutral-800)', color: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'relative', maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div className="twk-overline" style={{ color: acc.main }}>06 / Vertrauen</div>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', color: '#fff', margin: '14px 0 12px', letterSpacing: '-0.02em' }}>
          Vertrauen entsteht nicht durch große Worte.<br />Sondern durch echte Arbeit.
        </h2>
        <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.6)', maxWidth: 560, marginBottom: 48 }}>
          Seit 14 Jahren begleiten wir Führungskräfte, Teams und Organisationen in anspruchsvollen Entwicklungsprozessen. Die Zahlen zeigen nur einen Ausschnitt. Entscheidend ist die Arbeit dahinter: ehrlich, verbindlich und nah an der Realität von Führung.
        </p>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '44px 24px', paddingBottom: 48, marginBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.12)' }} className="proof-metrics">
          {metrics.map(([n, l]) => (
            <div key={l}>
              <CountUp value={n} color={acc.main} />
              <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.65)', marginTop: 8 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 24 }}>
            Ein Auszug an Organisationen, mit deren Führungskräften wir gearbeitet haben
          </div>
          <div className="twk-logo-marquee">
            <div className="twk-logo-track">
              {[...logos, ...logos].map((l, idx) => (
                <div key={l.f + idx} aria-hidden={idx >= logos.length} style={{ flex: '0 0 auto', height: 40, display: 'flex', alignItems: 'center' }}>
                  <img src={window.R('uploads/' + l.f)} alt={l.n} title={l.n} style={{ maxHeight: 34, width: 'auto', objectFit: 'contain', opacity: 0.72 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="grid-3">
          {testimonials.map((t) => (
            <div key={t.name} style={{ position: 'relative', borderRadius: 'var(--radius-lg)', background: 'var(--neutral-700)', border: '1px solid rgba(255,255,255,0.08)', padding: '30px 28px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, color: acc.main, lineHeight: 0.5, marginBottom: 14 }}>&ldquo;</div>
              <p style={{ margin: '0 0 22px', fontSize: 16.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.86)', flex: 1 }}>{t.q}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <img src={window.R('uploads/' + t.img)} alt={t.name} style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', border: `1px solid ${acc.main}`, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Proof = Proof;
