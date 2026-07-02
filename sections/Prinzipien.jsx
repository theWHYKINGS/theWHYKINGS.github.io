function Prinzipien({ acc }) {
  const items = [
    ['Wahrheit vor Harmonie', 'Nicht alles wird besser, wenn man es weicher formuliert. Entwicklung beginnt dort, wo das Unausgesprochene endlich sichtbar wird.'],
    ['Klarheit vor Scheinkonsens', 'Scheinbarer Konsens beruhigt kurzfristig und kostet langfristig Vertrauen, Tempo und Wirksamkeit. Wir machen sichtbar, was wirklich entschieden ist und was nur so aussieht.'],
    ['System vor Symptom', 'Verhalten entsteht nicht im luftleeren Raum. Wir schauen auf Muster, Rollen, Erwartungen und Dynamiken, nicht nur auf einzelne Reaktionen und Symptome.'],
    ['Verantwortung vor Schuld', 'Die Frage ist nicht, wer schuld ist. Die Frage ist, was jetzt gesehen, entschieden und getragen werden muss.'],
    ['Wachstum durch Reibung', 'Reflexion ohne Reibung verändert nichts. Wachstum entsteht dort, wo blinde Flecken sichtbar werden.'],
  ];
  return (
    <section id="prinzipien" data-screen-label="Haltung" style={{ position: 'relative', padding: '120px 40px', background: 'var(--neutral-800)', color: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'relative', maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div className="twk-overline" style={{ color: acc.main }}>02 / Wofür the WHYKINGS steht</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3.2rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff', maxWidth: 740, margin: '16px 0 20px' }}>
          Wahrheit vor Komfort. <span style={{ color: acc.main }}>Immer.</span>
        </h2>
        <p style={{ font: 'var(--text-lead)', color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 0 56px' }}>
          Nicht hart um der Härte willen. Sondern klar genug, damit echte Entwicklung möglich wird.
        </p>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          {items.map(([title, desc], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '88px 0.9fr 1.1fr', gap: 28, alignItems: 'start', padding: '30px 0', borderBottom: '1px solid rgba(255,255,255,0.12)' }} className="principle-row">
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem,3vw,2.6rem)', color: acc.main, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-0.01em', margin: 0, color: '#fff' }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 16.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Prinzipien = Prinzipien;
