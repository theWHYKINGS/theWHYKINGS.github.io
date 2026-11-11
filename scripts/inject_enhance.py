#!/usr/bin/env python3
"""inject_enhance.py — ensure every page loads enhance.js (the production layer
that actually delivers the contact forms via Web3Forms).

Claude Design regenerates the pages, which drops our <script> tag, so this
re-adds it (idempotently) just before </body> on each page in scripts/pages.py.
The tag is root-absolute (/enhance.js) so it also works from /sparring-1-1/.

The URL carries a content hash (?v=…): browsers and GitHub Pages cache static
files for a while, and a stale enhance.js next to a fresh page would make the
forms misbehave. The hash changes whenever enhance.js does, so the tag is
rewritten here whenever it is out of date.

    python3 scripts/inject_enhance.py
"""
import hashlib
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pages import page_files, ROOT  # noqa: E402

js = ROOT / "enhance.js"
if not js.exists():
    raise SystemExit("inject_enhance: enhance.js is missing")
version = hashlib.sha1(js.read_bytes()).hexdigest()[:8]
TAG = f'<script defer src="/enhance.js?v={version}"></script>'
EXISTING = re.compile(r'<script defer src="/?enhance\.js[^"]*"></script>')

for p in page_files():
    html = p.read_text(encoding="utf-8")
    name = p.relative_to(ROOT).as_posix()
    if TAG in html:
        print(f"{name}: enhance.js already present (v={version})")
        continue
    if EXISTING.search(html):                       # outdated tag -> update in place
        html = EXISTING.sub(TAG, html)
        p.write_text(html, encoding="utf-8")
        print(f"{name}: enhance.js tag updated (v={version})")
        continue
    i = html.rfind("</body>")
    if i == -1:
        print(f"{name}: no </body> — skipped")
        continue
    html = html[:i] + "  " + TAG + "\n" + html[i:]
    p.write_text(html, encoding="utf-8")
    print(f"{name}: enhance.js injected (v={version})")
