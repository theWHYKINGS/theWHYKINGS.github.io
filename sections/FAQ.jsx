function FAQ({ acc }) {
  const [open, setOpen] = React.useState(null);

  const linkStyle = { color: acc.deep, fontWeight: 600 };
  const groups = [
    {
      label: 'Zu the WHYKINGS',
      items: [
        {
          q: 'Woher kommt der Name \u201Ethe WHYKINGS\u201C?',
          a: [
            'Der Name ist eine Kombination aus WHY und VIKINGS. Beides steht f\u00FCr etwas, das uns antreibt.',
            'Das WHY geht auf Simon Sineks Arbeit zur\u00FCck \u2014 die \u00DCberzeugung, dass nachhaltige F\u00FChrung mit dem eigenen Warum beginnt. Wer den eigenen Antrieb kennt, f\u00FChrt anders.',
            'Die VIKINGS stehen f\u00FCr eine Haltung, keine \u00C4sthetik: Entdeckungsdrang und Handelsgeist, Mut und Entschlossenheit, Loyalit\u00E4t und Gemeinschaft \u2014 gepaart mit dem Willen zur Unabh\u00E4ngigkeit. Werte, die wir in jeder guten F\u00FChrungskraft wiederfinden.',
            'Zusammen beschreiben sie, worum es uns geht: F\u00FChrungskr\u00E4fte, die wissen, warum sie tun, was sie tun \u2014 und die Haltung haben, es konsequent umzusetzen.',
          ],
        },
        {
          q: 'Welche Werte vertretet ihr?',
          a: [
            ['Integrit\u00E4t \u2014', 'Was in unseren Gespr\u00E4chen gesagt wird, bleibt dort. Ehrlichkeit ist f\u00FCr uns keine Tugend, sondern Voraussetzung.'],
            ['Professionalit\u00E4t \u2014', 'Wir bilden uns kontinuierlich weiter und halten, was wir zusagen. Verl\u00E4sslichkeit ist kein Bonus, sondern Standard.'],
            ['Ergebnisorientierung \u2014', 'Wir arbeiten nicht auf angenehme Gespr\u00E4che hin, sondern auf sp\u00FCrbaren Fortschritt. Gemeinsam definieren wir, woran wir das festmachen.'],
            ['Vertrauen \u2014', 'Unsere Mandant:innenbeziehungen sind langfristig. Das setzt voraus, dass wir konsequent auf Augenh\u00F6he agieren \u2014 auch wenn es unbequem wird.'],
            ['Nachhaltigkeit \u2014', 'Kurzfristige Erfolge interessieren uns wenig. Was wir entwickeln, soll tragen \u2014 in der n\u00E4chsten Rolle, in der n\u00E4chsten Krise, im n\u00E4chsten Jahrzehnt.'],
            ['Empathie \u2014', 'Wir h\u00F6ren zu, bevor wir einsch\u00E4tzen. Jede F\u00FChrungskraft bringt eine andere Geschichte mit \u2014 die verstehen wir als Ausgangspunkt, nicht als Hindernis.'],
            ['Innovationsbereitschaft \u2014', 'Wir hinterfragen unsere eigenen Methoden. Was gestern funktioniert hat, muss morgen nicht mehr das Richtige sein.'],
          ],
        },
        {
          q: 'Was meint ihr mit \u201Ebewusst unbequem und kein Komfort\u201C?',
          a: [
            'Alles halb so wild \u2014 aber durchaus ernst gemeint. Was du bei uns nicht findest: Ja-Sager, Wellness-Coaching oder Best\u00E4tigung um ihrer selbst willen. Unser Ma\u00DFstab ist dein Fortschritt \u2014 und der entsteht selten in der Komfortzone.',
            'Das bedeutet konkret: Wir arbeiten an dem, was wirklich relevant ist \u2014 abgestimmt auf dein Potenzial, dein Tempo und deine aktuelle Situation. Gerade im 1:1 Coaching wird es Momente geben, die unbequem sind. Momente, in denen du an Grenzen st\u00F6\u00DFt. Und lernst, sie zu verschieben.',
          ],
        },
      ],
    },
    {
      label: 'Zum Angebot & zur Abgrenzung',
      items: [
        {
          q: 'Was ist der Unterschied zwischen Sparring 1:1, Trainings und Boot Camp?',
          a: [
            'Alle drei Formate entwickeln F\u00FChrungskr\u00E4fte \u2014 aber auf unterschiedliche Weise und mit unterschiedlichem Anspruch.',
            ['Sparring 1:1', 'ist die intensivste und individuellste Form der Zusammenarbeit. Ein vertraulicher Rahmen, in dem du mit einem erfahrenen Sparringspartner an deinen konkreten F\u00FChrungsthemen arbeitest \u2014 regelm\u00E4\u00DFig, langfristig und vollst\u00E4ndig auf deine Situation zugeschnitten.'],
            ['Trainings', 'sind thematisch fokussiert und zeitlich begrenzt. Kein laufendes Programm, sondern ein kompaktes Format mit einem klaren Schwerpunkt \u2014 f\u00FCr alle, die an einem konkreten Thema arbeiten wollen, ohne langfristige Begleitung.'],
            ['Boot Camp (LeaderJab)', 'ist das intensivste Format: ein Monat, zwei Disziplinen \u2014 beidh\u00E4ndiges F\u00FChren und Boxen. K\u00F6rper und Geist werden gleichzeitig gefordert. F\u00FCr F\u00FChrungskr\u00E4fte, die bereit sind, beide Seiten ernstzunehmen.'],
          ],
        },
        {
          q: 'F\u00FCr wen ist welches Format das Richtige?',
          a: [
            'Das h\u00E4ngt weniger von der Rolle ab als von der Frage, was du gerade brauchst.',
            ['Sparring 1:1', 'ist das richtige Format, wenn du einen vertraulichen Raum suchst, um deine konkreten F\u00FChrungsthemen zu bearbeiten \u2014 ohne Gruppe, ohne festes Curriculum, daf\u00FCr mit voller Aufmerksamkeit. Besonders geeignet f\u00FCr F\u00FChrungskr\u00E4fte, die bereits Verantwortung tragen und gezielt an ihrer Wirkung, ihren Entscheidungen oder ihrer Haltung arbeiten wollen.'],
            ['Trainings', 'passen, wenn ein konkretes Thema im Vordergrund steht und du oder dein Team dazu kompaktes, direkt anwendbares Handwerkszeug mitnehmen wollt \u2014 ohne langfristige Bindung.'],
            ['Boot Camp (LeaderJab)', 'ist f\u00FCr F\u00FChrungskr\u00E4fte, die offen sind f\u00FCr ein ungew\u00F6hnliches Format \u2014 und die neben der kognitiven auch die physische Dimension von Belastbarkeit und Haltung erfahren wollen. Grundlegende Fitness wird vorausgesetzt, Boxerfahrung nicht.'],
          ],
        },
        {
          q: 'K\u00F6nnen Formate kombiniert werden?',
          a: [
            'Selbstverst\u00E4ndlich. Der Weg unserer Mandant:innen f\u00FChrt oft \u00FCber ein Training zum 1:1 Coaching \u2014 so, wie es f\u00FCr dich passt. Wir freuen uns auf jede neue Herausforderung, die wir mit dir angehen k\u00F6nnen.',
          ],
        },
      ],
    },
    {
      label: 'Organisatorisches',
      items: [
        {
          q: 'Wo finden die Formate statt?',
          a: [
            'Die meisten Formate finden online statt \u2014 unkompliziert per Google Meet, ohne Anreise und ohne Zeitverlust. Wer das pers\u00F6nliche Gespr\u00E4ch bevorzugt: 1:1 Coachings k\u00F6nnen auf Wunsch auch vor Ort in der Schlei\u00DFheimer Str. 42 in M\u00FCnchen stattfinden.',
            'Eine Ausnahme ist das Boot Camp LeaderJab \u2014 der Boxing-Teil findet grunds\u00E4tzlich vor Ort statt, aktuell ausschlie\u00DFlich in M\u00FCnchen.',
            'F\u00FCr exklusive Unternehmensformate kommen wir auf Wunsch auch direkt zu euch.',
          ],
        },
        {
          q: 'Wie nehme ich Kontakt auf?',
          a: [
            <React.Fragment key="contact">Gerne einfach eine E-Mail an <a href="mailto:info@thewhykings.com" style={linkStyle}>info@thewhykings.com</a> schicken — oder per WhatsApp bzw. Anruf an <a href="tel:+491634781138" style={linkStyle}>+49&nbsp;163&nbsp;4781138</a>.</React.Fragment>,
          ],
        },
      ],
    },
  ];

  const renderPara = (p, i, last) => {
    const style = { margin: last ? 0 : '0 0 12px', fontSize: 15, lineHeight: 1.65, color: 'var(--color-fg-muted)' };
    if (Array.isArray(p)) {
      return <p key={i} style={style}><strong style={{ color: 'var(--color-fg)', fontWeight: 600 }}>{p[0]}</strong> {p[1]}</p>;
    }
    return <p key={i} style={style}>{p}</p>;
  };

  return (
    <section id="faq" data-screen-label="FAQ" style={{ padding: '120px 40px', background: 'var(--neutral-50)' }}>
      <div style={{ maxWidth: 'var(--container-lg)', margin: '0 auto' }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <div className="twk-overline" style={{ color: acc.deep }}>08 / Fragen &amp; Antworten</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.1rem,4vw,3rem)', marginTop: 14, marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Was du wissen willst, bevor wir sprechen.
          </h2>
          <p style={{ font: 'var(--text-lead)', color: 'var(--color-fg-muted)', margin: 0 }}>
            Klare Antworten auf das, was am häufigsten kommt. Alles andere klären wir im Gespräch.
          </p>
        </div>

        <div style={{ maxWidth: 860 }}>
          {groups.map((g, gi) => (
            <div key={g.label} style={{ marginBottom: gi < groups.length - 1 ? 44 : 0 }}>
              <div className="twk-overline" style={{ color: acc.deep, marginBottom: 6 }}>{g.label}</div>
              <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                {g.items.map((item, ii) => {
                  const key = gi + '-' + ii;
                  const isOpen = open === key;
                  return (
                    <div key={key} style={{ borderTop: '1px solid var(--color-border)' }}>
                      <button
                        onClick={() => setOpen(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, background: 'none', border: 'none', cursor: 'pointer', padding: '21px 2px', textAlign: 'left' }}
                      >
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17.5, color: 'var(--color-fg)', letterSpacing: '-0.005em', lineHeight: 1.3 }}>{item.q}</span>
                        <span aria-hidden="true" style={{
                          flex: 'none', width: 28, height: 28, borderRadius: '50%',
                          border: '1px solid var(--color-border-strong)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 17, fontWeight: 400, lineHeight: 1,
                          color: isOpen ? acc.deep : 'var(--color-fg-muted)',
                          transform: isOpen ? 'rotate(45deg)' : 'none',
                          transition: 'transform var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)',
                        }}>+</span>
                      </button>
                      {isOpen && (
                        <div style={{ padding: '0 52px 24px 2px' }}>
                          {item.a.map((p, pi) => renderPara(p, pi, pi === item.a.length - 1))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.FAQ = FAQ;
