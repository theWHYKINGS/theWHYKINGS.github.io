#!/usr/bin/env python3
"""inject_enhance.py — ensure every top-level app page loads enhance.js.

The homepage and any sub-pages (e.g. the Sparring 1:1 page) are regenerated
from Claude Design on every deploy, which drops our <script src="enhance.js">
tag. This re-adds it (idempotently) just before </body> on each top-level
*.html page that is a client-rendered app page (contains text/babel scripts) —
so the working contact form survives every pull. Legal pages (legal/) and the
homepage copy are handled separately.

    python3 scripts/inject_enhance.py
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent
TAG = '<script defer src="enhance.js"></script>'

pages = sorted(root.glob("*.html"))
for idx in pages:
    html = idx.read_text(encoding="utf-8")
    if "text/babel" not in html:          # only client-rendered app pages
        continue
    if 'src="enhance.js"' in html:
        print(f"{idx.name}: enhance.js already present")
        continue
    i = html.rfind("</body>")
    if i == -1:
        print(f"{idx.name}: no </body> — skipped")
        continue
    html = html[:i] + "  " + TAG + "\n" + html[i:]
    idx.write_text(html, encoding="utf-8")
    print(f"{idx.name}: enhance.js injected")
