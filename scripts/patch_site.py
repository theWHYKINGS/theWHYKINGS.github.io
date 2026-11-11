#!/usr/bin/env python3
"""patch_site.py — production normalisation of the pulled Claude Design pages.

Idempotent; runs on every deploy after unpack. Design ships relative paths so the
package works at any web root; our host is the root of www.thewhykings.com, so:

  1. cross-page links (window.SITE) become root-absolute — importantly "home" is
     '/', not 'index.html', so Plausible doesn't count '/' and '/index.html'
     as two different pages
  2. the Sparring page's canonical / og:url / sitemap entry get a trailing slash
     (GitHub Pages serves /sparring-1-1/ and 301-redirects the slash-less URL)
  3. the old public URL /sparring (and /sparring.html) keeps working: a small
     redirect stub is written to sparring.html

Every expected pattern is checked; a missing one prints a warning so a changed
Design export doesn't silently skip a fix.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pages import ROOT, SITE  # noqa: E402

warnings = []


def patch(rel, replacements):
    p = ROOT / rel
    if not p.exists():
        warnings.append(f"{rel}: missing")
        return
    html = p.read_text(encoding="utf-8")
    out = html
    for old, new in replacements:
        if new in out:                       # already patched
            continue
        if old not in out:
            warnings.append(f"{rel}: expected pattern not found: {old[:70]!r}")
            continue
        out = out.replace(old, new)
    if out != html:
        p.write_text(out, encoding="utf-8")
        print(f"patched {rel}")


# 1+2. page heads
patch("index.html", [
    ("home: 'index.html', sparring: 'sparring-1-1/', legal: 'legal/'",
     "home: '/', sparring: '/sparring-1-1/', legal: '/legal/'"),
])
patch("sparring-1-1/index.html", [
    ("home: '../index.html', sparring: '#top', legal: '../legal/'",
     "home: '/', sparring: '#top', legal: '/legal/'"),
    (f'rel="canonical" href="{SITE}/sparring-1-1"', f'rel="canonical" href="{SITE}/sparring-1-1/"'),
    (f'property="og:url" content="{SITE}/sparring-1-1"', f'property="og:url" content="{SITE}/sparring-1-1/"'),
])
patch("sitemap.xml", [
    (f"<loc>{SITE}/sparring-1-1</loc>", f"<loc>{SITE}/sparring-1-1/</loc>"),
])

# 3. redirect stub for the previous URL /sparring
STUB = f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>Leadership Sparring 1:1 | the WHYKINGS</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="{SITE}/sparring-1-1/">
<meta http-equiv="refresh" content="0; url=/sparring-1-1/">
<script>location.replace('/sparring-1-1/' + location.search + location.hash);</script>
</head>
<body>
<p>Die Seite ist umgezogen: <a href="/sparring-1-1/">Leadership Sparring 1:1</a></p>
</body>
</html>
"""
stub = ROOT / "sparring.html"
if not stub.exists() or stub.read_text(encoding="utf-8") != STUB:
    stub.write_text(STUB, encoding="utf-8")
    print("wrote sparring.html (redirect /sparring -> /sparring-1-1/)")

for w in warnings:
    print("  ⚠ " + w)
if not warnings:
    print("patch_site: all patterns matched")
