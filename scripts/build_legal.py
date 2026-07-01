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

pages = [
    ("src/legal/Impressum.html", "impressum.html"),
    ("src/legal/Datenschutz.html", "datenschutz.html"),
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

    # 5. fix links: homepage back-link, and cross-links to lowercase filenames
    html = re.sub(r"\.\./theWHYKINGS(?:%20| )Homepage\.html", "/", html)
    html = html.replace('href="Datenschutz.html"', 'href="datenschutz.html"')
    html = html.replace('href="Impressum.html"', 'href="impressum.html"')

    (root / out).write_text(html, encoding="utf-8")

    leftover = [p for p in ("_ds", "assets/", "data-omelette",
                            "theWHYKINGS Homepage", "wordmark-gold") if p in html]
    status = ("  ⚠ leftover refs: " + ", ".join(leftover)) if leftover else "  — self-contained"
    print(f"✓ {out} ({len(html)} bytes){status}")
