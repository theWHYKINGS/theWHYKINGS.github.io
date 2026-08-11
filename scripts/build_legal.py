#!/usr/bin/env python3
"""build_legal.py — turn the Claude Design legal exports (src/legal/*.html)
into clean, self-contained pages served at the site root.

Source pages link to ../_ds token CSS, legal.css, a logo image, and back to
"../theWHYKINGS Homepage.html", and carry the design-tool preview harness.
This strips all of that, inlines legal.css (which already has hardcoded
fallbacks for every design token), swaps the logo for a text wordmark, and
fixes the links — producing impressum.html + datenschutz.html at the root.

Re-run after pulling updated legal text from Claude Design:
    python3 scripts/build_legal.py
"""
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
legal_css = (root / "src/legal/legal.css").read_text(encoding="utf-8")

wordmark_css = """
/* injected by build_legal.py — text wordmark replaces the logo image */
.legal-bar a{text-decoration:none;}
.legal-wordmark{font-family:var(--font-display,"Jost",system-ui,sans-serif);
  font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:var(--color-gold,#b79f63);font-size:18px;line-height:1;text-decoration:none;}
"""

style_block = f"<style>\n{legal_css}\n{wordmark_css}\n</style>"

# Plausible Analytics clause — injected into the Datenschutz page below the
# "Analyse-Tools und Tools von Drittanbietern" heading (before the Hosting
# section). Kept here (not in the Claude Design source) so it survives every
# legal pull and always goes live together with the tracking tag. Cookieless,
# EU-hosted, no consent banner needed (Art. 6 Abs. 1 lit. f DSGVO).
PLAUSIBLE_CLAUSE = (
    '<h3>Plausible Analytics</h3>\n'
    '  <p>Diese Website nutzt den Analysedienst Plausible Analytics zur '
    'anonymisierten, statistischen Reichweitenmessung. Anbieter ist die '
    'Plausible Insights OÜ, Västriku tn 2, 50403 Tartu, Estland. Die '
    'Verarbeitung der Daten erfolgt ausschließlich auf Servern innerhalb der '
    'Europäischen Union.</p>\n'
    '  <p>Plausible setzt <strong>keine Cookies</strong> und speichert keine '
    'personenbezogenen Daten dauerhaft. Die Auswertung erfolgt vollständig '
    'anonymisiert – ein Rückschluss auf einzelne Besucher oder eine '
    'Zusammenführung mit anderen Daten ist nicht möglich. Es findet '
    'keine Weitergabe an Dritte statt.</p>\n'
    '  <p>Die Nutzung von Plausible erfolgt auf Grundlage von Art. 6 Abs. 1 '
    'lit. f DSGVO. Wir haben ein berechtigtes Interesse an der anonymisierten '
    'Analyse des Nutzerverhaltens, um unser Webangebot zu optimieren. Da keine '
    'Cookies gesetzt und keine Informationen auf Ihrem Endgerät '
    'gespeichert oder ausgelesen werden, ist eine Einwilligung nach '
    '§ 25 TDDDG nicht erforderlich.</p>\n'
    '  <p>Grundlage der Verarbeitung ist ein Vertrag über '
    'Auftragsverarbeitung (AVV) mit dem Anbieter. Weitere Informationen finden '
    'Sie in der Datenschutzerklärung von Plausible: '
    '<a href="https://plausible.io/data-policy" target="_blank" '
    'rel="noopener noreferrer">https://plausible.io/data-policy</a>.</p>\n'
    '  '
)

# Output paths match the links the Claude Design homepage footer points to
# (legal/Impressum.html, legal/Datenschutz.html).
pages = [
    ("src/legal/Impressum.html", "legal/Impressum.html"),
    ("src/legal/Datenschutz.html", "legal/Datenschutz.html"),
]

for src, out in pages:
    html = (root / src).read_text(encoding="utf-8")

    # 1. strip the design-tool preview harness (style + script)
    html = re.sub(r"<style data-omelette-injected>.*?</style>", "", html, flags=re.S)
    html = re.sub(r"<script data-omelette-injected>.*?</script>", "", html, flags=re.S)

    # 2. drop the dead ../_ds token stylesheet links (legal.css has fallbacks)
    html = re.sub(r'<link[^>]*href="[^"]*_ds[^"]*"[^>]*>\s*', "", html)

    # 3. inline legal.css (+ wordmark style) in place of its <link>
    html = re.sub(r'<link[^>]*href="legal\.css"[^>]*>', lambda m: style_block, html)

    # 4. logo image -> text wordmark (no binary asset dependency)
    html = re.sub(r"<img[^>]*wordmark-gold[^>]*>",
                  '<span class="legal-wordmark">the WHYKINGS</span>', html)

    # 5. fix the homepage back-link -> site root. The Impressum<->Datenschutz
    #    cross-links are siblings inside legal/, so they stay as-is.
    html = re.sub(r"\.\./theWHYKINGS(?:%20| )Homepage\.html", "/", html)

    # 6. inject the Plausible Analytics clause into the Datenschutz page
    #    (idempotent). Anchored before the Hosting section so it appears under
    #    "Analyse-Tools und Tools von Drittanbietern".
    if "Datenschutz" in src and "Plausible" not in html:
        anchor = '<h2><span class="num">02</span>Hosting</h2>'
        if anchor in html:
            html = html.replace(anchor, PLAUSIBLE_CLAUSE + anchor, 1)
            print("  + Plausible Analytics clause injected")
        else:
            print("  ⚠ Hosting anchor not found — Plausible clause NOT inserted")

    (root / out).parent.mkdir(parents=True, exist_ok=True)
    (root / out).write_text(html, encoding="utf-8")

    leftover = [p for p in ("_ds", "assets/", "data-omelette",
                            "theWHYKINGS Homepage", "wordmark-gold") if p in html]
    status = ("  ⚠ leftover refs: " + ", ".join(leftover)) if leftover else "  — self-contained"
    print(f"✓ {out} ({len(html)} bytes){status}")
