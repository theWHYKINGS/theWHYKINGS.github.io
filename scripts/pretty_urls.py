#!/usr/bin/env python3
"""pretty_urls.py — clean, human-friendly URLs for the multi-page site.

Claude Design names sub-page files uglily ('theWHYKINGS Sparring 1-1.html',
spaces/mixed case) and links "home" to 'theWHYKINGS Homepage.html'. This:
  1. renames each sub-page to a clean FILE name (e.g. sparring.html),
  2. rewrites links to it as the extensionless URL (e.g. `sparring`) — GitHub
     Pages serves sparring.html at both /sparring.html and /sparring,
  3. drops the homepage copy (sub-pages now link "home" to the site root '/'),
  4. points sub-page "home" links at '/'.

Runs after unpack, before inject_enhance. Idempotent. Add a sub-page by adding
one entry: design filename -> (hosted file, clean link).
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent

# design filename -> {"file": hosted filename, "url": link used from other pages}
SUBPAGES = {
    "theWHYKINGS Sparring 1-1.html": {"file": "sparring.html", "url": "sparring"},
}

# 1. rename each sub-page to its clean file name
for old_name, t in SUBPAGES.items():
    old = root / old_name
    if old.exists():
        (root / t["file"]).write_bytes(old.read_bytes())
        old.unlink()
        print(f"renamed '{old_name}' -> {t['file']}")

# 2. the homepage copy is obsolete (home links now point to '/')
copy = root / "theWHYKINGS Homepage.html"
if copy.exists():
    copy.unlink()
    print("removed obsolete homepage copy")

# 3. fix cross-page links in every top-level app page
for p in sorted(root.glob("*.html")):
    h = p.read_text(encoding="utf-8")
    out = h
    for old_name, t in SUBPAGES.items():
        out = out.replace(old_name, t["url"])          # link to sub-page -> clean URL
    out = out.replace("theWHYKINGS Homepage.html", "/")  # "home" links -> site root
    if out != h:
        p.write_text(out, encoding="utf-8")
        print(f"fixed links in {p.name}")
