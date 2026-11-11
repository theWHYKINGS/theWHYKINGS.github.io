#!/usr/bin/env python3
"""localize_assets.py — serve every third-party asset from this repo.

The Claude Design export pulls Jost + Albert Sans from fonts.googleapis.com /
fonts.gstatic.com and React, ReactDOM and Babel from unpkg.com. Each of those
requests sends the visitor's IP address to a third party — which our
Datenschutzerklärung explicitly says does not happen ("Die Google Fonts sind
lokal installiert. Eine Verbindung zu Servern von Google findet nicht statt").
The files are committed here instead (vendor/, assets/fonts/), and this script
rewrites the references after every pull — idempotently, on every deploy:

  * _ds/<ds>/tokens/fonts.css : the Google Fonts @import -> vendor/fonts-local.css
  * every page (scripts/pages.py): the three unpkg <script> tags -> /vendor/*.js
    (React 18.3.1 + ReactDOM 18.3.1 as the *production* builds, Babel
    standalone 7.29.0)

The vendored JS is byte-identical to what unpkg serves — pinned SRI hashes
below; the script refuses to rewrite anything if a file does not match. The
fonts are the .woff2 files Google serves for exactly the Google Fonts URL in
the design system's fonts.css (Jost + Albert Sans, 400–700, SIL OFL 1.1 — self-
hosting is explicitly allowed). They were generated once for the Academy site
and copied here; same design system, same URL.

A Design export that bumps a version no longer matches the pinned patterns, so
the unpkg tag stays in the page and verify_site.py blocks the deploy — that is
the cue to re-vendor (download the new build from unpkg, update the hash here).

    python3 scripts/localize_assets.py            # rewrite (run by deploy.sh)
    python3 scripts/localize_assets.py --check    # verify the vendored files only
"""
import base64
import hashlib
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pages import page_files, ROOT  # noqa: E402

# vendored file -> pinned SRI hash (sha384, as published for the unpkg build)
VENDOR = {
    "vendor/react.production.min.js":
        "sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z",
    "vendor/react-dom.production.min.js":
        "sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1",
    "vendor/babel.min.js":
        "sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y",
}
FONTS_LOCAL = "vendor/fonts-local.css"

# the exact unpkg tags the Design export ships (version-pinned on purpose),
# with whatever attributes (integrity, crossorigin, …) they carry
SCRIPT_TAGS = [
    (re.compile(r'<script src="https://unpkg\.com/react@18\.3\.1/umd/react\.(?:development|production\.min)\.js"[^>]*></script>'),
     "/vendor/react.production.min.js"),
    (re.compile(r'<script src="https://unpkg\.com/react-dom@18\.3\.1/umd/react-dom\.(?:development|production\.min)\.js"[^>]*></script>'),
     "/vendor/react-dom.production.min.js"),
    (re.compile(r'<script src="https://unpkg\.com/@babel/standalone@7\.29\.0/babel\.min\.js"[^>]*></script>'),
     "/vendor/babel.min.js"),
]
# preconnect / dns-prefetch hints would open a connection to Google before any consent
HINTS = re.compile(r'<link[^>]+rel="(?:preconnect|dns-prefetch)"[^>]+fonts\.(?:googleapis|gstatic)\.com[^>]*>\s*')
GOOGLE_IMPORT = re.compile(r"@import\s+url\(['\"]https://fonts\.googleapis\.com/[^)]*\);")


def check_vendor():
    """Return a list of problems with the vendored files (empty = all good)."""
    problems = []
    for rel, expected in VENDOR.items():
        f = ROOT / rel
        if not f.exists():
            problems.append(f"missing: {rel}")
            continue
        algo, want = expected.split("-", 1)
        got = base64.b64encode(hashlib.new(algo, f.read_bytes()).digest()).decode()
        if got != want:
            problems.append(f"hash mismatch: {rel} (not the unpkg build it is pinned to)")
    if not (ROOT / FONTS_LOCAL).exists():
        problems.append(f"missing: {FONTS_LOCAL}")
    else:
        css = (ROOT / FONTS_LOCAL).read_text(encoding="utf-8")
        for m in sorted(set(re.findall(r"url\(\.\./(assets/fonts/[^)]+)\)", css))):
            if not (ROOT / m).exists():
                problems.append(f"missing font file: {m}")
    return problems


def main():
    problems = check_vendor()
    if problems:
        print("  ! " + "\n  ! ".join(problems))
        print("  ! refusing to rewrite — re-vendor the files first")
        return 1

    changed = []

    # --- fonts ---
    css_files = list(ROOT.glob("_ds/*/tokens/fonts.css"))
    if not css_files:
        print("  ! no _ds/*/tokens/fonts.css found — skipping fonts")
    for css in css_files:
        s = css.read_text(encoding="utf-8")
        depth = len(css.relative_to(ROOT).parts) - 1               # …/tokens/fonts.css
        rel = "../" * depth + FONTS_LOCAL
        new, n = GOOGLE_IMPORT.subn(f"@import url('{rel}');", s)
        if n:
            css.write_text(new, encoding="utf-8")
            changed.append(f"{css.relative_to(ROOT).as_posix()} -> {rel}")
        elif rel not in s:
            print(f"  ! {css.relative_to(ROOT).as_posix()}: no Google Fonts @import and no local import "
                  f"— check the design system's fonts.css")

    # --- pages: unpkg scripts + font hints ---
    for p in page_files():
        html = p.read_text(encoding="utf-8")
        out = HINTS.sub("", html)
        for pattern, local in SCRIPT_TAGS:
            out = pattern.sub(f'<script src="{local}"></script>', out)
        if out != html:
            p.write_text(out, encoding="utf-8")
            changed.append(f"{p.relative_to(ROOT).as_posix()}: unpkg/Google hints -> /vendor")
        left = re.findall(r"https://unpkg\.com/[^\"'\s)]+", out)
        for url in left:
            print(f"  ! {p.relative_to(ROOT).as_posix()} still loads {url} (new version in the Design export?)")

    print("✓ localize_assets: " + ("; ".join(changed) if changed else "already local"))
    return 0


if __name__ == "__main__":
    if "--check" in sys.argv:
        probs = check_vendor()
        print("\n".join(probs) if probs else "✓ vendored files match their pinned hashes")
        raise SystemExit(1 if probs else 0)
    raise SystemExit(main())
