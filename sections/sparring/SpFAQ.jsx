function SpFAQ({ acc }) {
  const [open, setOpen] = React.useState(null);
  const items = [
    { q: 'Was unterscheidet Sparring von klassischem Coaching oder Beratung?', a: [
      'Beratung liefert Lösungen von außen. Klassisches Coaching arbeitet oft ausschließlich mit Fragen. Sparring verbindet beides auf Augenhöhe: Ich halte dagegen, prüfe deine Entscheidungen und Annahmen auf Belastbarkeit und mache Muster sichtbar — die Entscheidung selbst bleibt bei dir.',
      'Der zweite Unterschied ist der Transfer: Jede Session endet mit einer konkreten Transferaufgabe, die du bis zur nächsten Session im realen Führungsalltag erprobst. Es bleibt nicht beim guten Gespräch.',
    ]},
    { q: 'Wie läuft das unverbindliche Kennenlernen ab?', a: [
      'Nach deiner Anfrage melde ich mich persönlich bei dir. Das Kennenlernen dauert 30 bis 45 Minuten und ist ohne Verkaufsdruck. Wir sprechen über deine aktuelle Situation, das gewünschte Ergebnis und darüber, ob die persönliche Arbeitsbeziehung trägt.',
      'Am Ende wissen beide Seiten, ob ein gemeinsames Mandat sinnvoll ist. Wenn ja, folgt die Auftrags- und Zielklärung. Wenn nein, sage ich dir das offen.',
    ]},
    { q: 'Warum ist das Mandat auf drei Monate angelegt?', a: [
      'Ein einzelnes Gespräch kann Klarheit schaffen — unter Druck greifen Menschen jedoch häufig wieder auf vertraute Muster zurück. Damit aus Erkenntnis eine belastbare Führungsroutine wird, braucht es Wiederholung, Anwendung, Reflexion und Korrektur unter realen Bedingungen.',
      'Drei Monate sind dafür der Mindestzeitraum — kürzere reguläre Mandate biete ich deshalb nicht an. Nach oben ist die Zusammenarbeit offen: Im Durchschnitt dauert ein Mandat bei mir rund ein Jahr.',
    ]},
    { q: 'Wie funktioniert die Ausstiegsmöglichkeit nach dem ersten Monat?', a: [
      'Nach den ersten vier Sessions kannst du das Mandat einmalig zum Ende des ersten Vertragsmonats beenden — ohne Rechtfertigung und ohne künstliche Bindung. So bleibt die Arbeit auf drei Monate angelegt, ohne dass du dich an eine Zusammenarbeit bindest, die nicht trägt.',
      'Die verbindlichen Einzelheiten regelt die Mandatsvereinbarung.',
    ]},
    { q: 'Finden die Sessions online oder in München statt?', a: [
      'Beides ist möglich — du wählst. Jede Session findet Face to Face statt: online oder persönlich am Standort von the WHYKINGS in der Schleißheimer Str. 42 in München. Wie wir es konkret handhaben, klären wir beim Start.',
    ]},
    { q: 'Was bedeutet Begleitung zwischen den Sessions konkret?', a: [
      'Am Ende jeder Session steht eine konkrete Transferaufgabe, die du im Alltag erprobst. Zwischen den Sessions kannst du Beobachtungen oder kurze Rückfragen über den WhatsApp Chat teilen, sofern du diesen Kanal willst und er in deinem beruflichen Kontext zulässig ist. Bei einer zeitkritischen beruflichen Situation ist im vereinbarten Rahmen auch ein Telefonat möglich.',
      'Was die Begleitung nicht ist: eine 24/7-Rufbereitschaft. Umfang und Kommunikationsrahmen klären wir beim Start des Mandats.',
    ]},
    { q: 'Wie wird die Vertraulichkeit behandelt, wenn mein Unternehmen bezahlt?', a: [
      'Die Inhalte der Sessions sind vertraulich — auch gegenüber dem zahlenden Unternehmen. Ziele und organisatorische Rahmenbedingungen werden vor dem Start transparent geklärt; Gesprächsinhalte werden nicht ohne deine ausdrückliche Zustimmung an Arbeitgeber, Vorgesetzte oder HR weitergegeben.',
      'Die Trennung zwischen Auftraggeber und Mandant:in wird vor dem Start eindeutig vereinbart.',
    ]},
    { q: 'Ist das Sparring eine Psychotherapie oder Krisenhilfe?', a: [
      'Nein. Das Sparring ist ein berufliches Reflexions- und Entwicklungsformat für Führungsarbeit. Es ist keine Psychotherapie und keine medizinische oder psychologische Notfallversorgung.',
      'Wenn ich im Mandat von „zeitkritischen Situationen" spreche, meine ich dringliche berufliche Führungs- oder Entscheidungssituationen. Bei psychischen Krisen wende dich bitte an ärztliche oder psychotherapeutische Hilfe.',
    ]},
    { q: 'Unterscheidet sich der Leistungsumfang für B2B und Selbstzahler:innen?', a: [
      'Nein, der Leistungsumfang ist identisch. Der Unterschied liegt allein im Honorarmodell: Unternehmensmandate 2.000 Euro netto pro Vertragsmonat zuzüglich gesetzlicher Umsatzsteuer, Selbstzahler:innen 2.100 Euro brutto pro Vertragsmonat inklusive gesetzlicher Umsatzsteuer.',
    ]},
    { q: 'Entsteht durch die Mandatsanfrage bereits ein Vertrag?', a: [
      'Nein. Mit dem Formular fragst du lediglich ein unverbindliches Kennenlernen an — es entsteht kein Vertrag. Ein Mandat kommt erst zustande, wenn wir nach Kennenlernen und Auftragsklärung die Mandatsvereinbarung schließen.',
    ]},
  ];
  React.useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a.join(' ') } })),
    };
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'faq-jsonld';
    el.textContent = JSON.stringify(data);
    if (!document.getElementById('faq-jsonld')) document.head.appendChild(el);
    return () => { const ex = document.getElementById('faq-jsonld'); if (ex) ex.remove(); };
  }, []);
  return (
    <section id="faq" data-screen-label="FAQ" style={{ padding: '110px 40px', background: 'var(--neutral-50)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 44 }}>
          <div className="twk-overline" style={{ color: acc.deep }}>Fragen &amp; Antworten</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', marginTop: 14, marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Was du wissen solltest,<br />bevor du anfragst.
          </h2>
        </div>
        <div style={{ maxWidth: 860, borderBottom: '1px solid var(--color-border)' }}>
          {items.map((item, ii) => {
            const isOpen = open === ii;
            return (
              <div key={ii} style={{ borderTop: '1px solid var(--color-border)' }}>
                <button onClick={() => setOpen(isOpen ? null : ii)} aria-expanded={isOpen} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, background: 'none', border: 'none', cursor: 'pointer', padding: '21px 2px', textAlign: 'left' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17.5, color: 'var(--color-fg)', letterSpacing: '-0.005em', lineHeight: 1.3 }}>{item.q}</span>
                  <span aria-hidden="true" style={{ flex: 'none', width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--color-border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 400, lineHeight: 1, color: isOpen ? acc.deep : 'var(--color-fg-muted)', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)' }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 52px 24px 2px' }}>
                    {item.a.map((p, pi) => (
                      <p key={pi} style={{ margin: pi === item.a.length - 1 ? 0 : '0 0 12px', fontSize: 15, lineHeight: 1.65, color: 'var(--color-fg-muted)' }}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
window.SpFAQ = SpFAQ;
